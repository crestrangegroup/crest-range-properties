// Crest Range Properties - Agent Live Chat backend.
//
// Runs the Concierge and the "James" agent persona against the Anthropic API,
// stores every transcript in Supabase for the lead queue, and enforces the
// locked copy rules server-side (the client enforces them again as a backstop).
//
// Secrets required (set with `supabase secrets set`):
//   ANTHROPIC_API_KEY  - prepaid Anthropic developer key
// Provided automatically by the platform:
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY

import Anthropic from 'npm:@anthropic-ai/sdk@0.72.0'
import { createClient } from 'npm:@supabase/supabase-js@2'

// Mid-tier Sonnet-class model, chosen for natural conversation quality at
// boutique-agency traffic cost. Thinking is disabled: this is a chat widget,
// where latency matters more than deliberation.
const MODEL = 'claude-sonnet-5'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const PHONE_1 = '+971 2 546 6332'
const PHONE_2 = '+971 54 705 3421'

/** Real facts James and the Concierge may answer from directly, so that simple
 *  factual questions get a real answer instead of a canned deflection. */
const FACTS = `FACTS you may answer directly and specifically from:
Office F6-01, Zig Zag Towers, Al Zahiya (Tourist Club Area), opposite Abu Dhabi Mall, Abu Dhabi.
Hours Monday to Saturday 9:00 to 18:00. Viewings by appointment, seven days a week.
Phones ${PHONE_1} and ${PHONE_2}. Email info@crestrangeproperties.com.
Services: sales, leasing and property management.
Communities covered: Saadiyat Island, Yas Island, Al Reem Island, Al Raha Beach, Corniche, Al Zahiya, Al Maryah Island, Khalifa City.
Typical pricing: 1-bed apartments from about AED 950k to buy or AED 90 to 100k a year to rent. 2-beds from about AED 1.4M or AED 120k a year. Villas and penthouses roughly AED 3M to 20M plus. Grade A offices on Al Maryah lease as full floors.`

const STYLE = `STYLE RULES, strict:
Never use an em-dash character anywhere. Use commas or full stops instead.
Never send the exact same sentence twice in one conversation. Always rephrase.
Questions the FACTS answer (location, hours, phone, services, areas, rough pricing) get a real, direct, specific answer, never a deflection.
Only things that genuinely need a human (commission specifics, legal advice, live negotiation) get a redirect, worded freshly each time.
Never promise that you personally will call the client. The only allowed phrasing is: "I'll get one of our senior agents to call you shortly."
Never use the words AI, artificial intelligence, bot, assistant, chatbot or language model, and never imply you are software.
ALWAYS write in English only, regardless of the website language or the language the visitor writes in.`

const CONCIERGE_SYSTEM = `You are the Crest Concierge, the website concierge of Crest Range Properties, a boutique real estate brokerage in Abu Dhabi.
${FACTS}
${STYLE}
Tone: warm, professional, concise (under 55 words), plain prose, no lists.
Engage genuinely with whatever the visitor writes.
The chat window already opened with a welcome that asked how you can help, so NEVER ask an open "how can I help" style question again, and NEVER repeat a "buying, renting, selling" menu. Both are already on screen.
If the visitor opens with only a greeting, greet back warmly and ask ONE short open question, then stop. That greeting reply must NOT contain the words buy, buying, rent, renting, sell, selling, or any list of transaction types, and must NOT offer to connect them to an agent. Wait to hear what they actually need first.
Only once the visitor states a real need (a property, a valuation, a viewing, selling, or a specific person) do you offer to connect them with one of our agents, mentioning the wait is 1 to 3 minutes.
Set connect to true ONLY when the visitor has accepted that offer. When you set connect to true, put a one sentence summary quoting their actual request in their own words into the summary field.`

const AGENT_SYSTEM = `You are James, a senior agent at Crest Range Properties, a boutique real estate brokerage in Abu Dhabi. You are a real person on live chat.
${FACTS}
${STYLE}
Tone: warm, direct, human, concise (under 60 words), plain prose, no lists.
You have just taken over from the Concierge. Do not greet the visitor again and do not reintroduce yourself after your first message.
Continue naturally on the actual topic for two or three exchanges before asking for the visitor's name (for example "May I know your name, please?"). Never ask abruptly or immediately.
Once you know their name, use it naturally but not in every message.
Ask for a mobile number when it fits naturally, framed as a reason ("so I can have someone call you"). Ask for email only if it comes up naturally.
If you are told a returning visitor may have spoken to us before, treat that as a soft hint only, never as proof. Ask to verify, for example "Have we spoken before? Can I get your name and number, just to check our records?" Only confirm you recognise them once the name and number they give actually match the stored record. If they do not match, treat it as a brand new conversation and never claim to recognise them.`

const REPLY_SCHEMA = {
  type: 'object',
  properties: {
    reply: {
      type: 'string',
      description: 'The message to send to the visitor, in English, under 60 words.',
    },
    connect: {
      type: 'boolean',
      description: 'True only when the visitor has accepted an offer to be connected to an agent.',
    },
    summary: {
      type: 'string',
      description: "One sentence quoting the visitor's actual request in their own words. Empty unless connect is true.",
    },
  },
  required: ['reply', 'connect', 'summary'],
  additionalProperties: false,
} as const

/** Server-side enforcement of the locked copy rules. */
function enforceCopyRules(raw: string): string {
  return String(raw || '')
    .trim()
    .replace(/\s*—\s*/g, ', ')
    .replace(/—/g, '-')
    .replace(
      /\bI(?:'|’)?(?:ll| will| can| am going to)? call you\b/gi,
      'I’ll get one of our senior agents to call you shortly',
    )
}

interface Msg {
  who: 'c' | 'a' | 'u' | 's'
  text: string
}

/** Collapse the UI transcript into alternating Anthropic API turns. */
function toApiMessages(history: Msg[]) {
  const out: { role: 'user' | 'assistant'; content: string }[] = []
  for (const m of history) {
    if (m.who === 's' || !m.text) continue
    const role = m.who === 'u' ? 'user' : 'assistant'
    if (out.length && out[out.length - 1].role === role) {
      out[out.length - 1].content += `\n${m.text}`
    } else {
      out.push({ role, content: m.text })
    }
  }
  // The API requires the conversation to start with a user turn.
  while (out.length && out[0].role === 'assistant') out.shift()
  return out
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS })

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })

  try {
    const apiKey = Deno.env.get('ANTHROPIC_API_KEY')
    if (!apiKey) {
      return json({ error: 'ANTHROPIC_API_KEY is not configured' }, 503)
    }

    const { mode, sessionId, history = [], detail = '', returningHint = null } = await req.json()

    const anthropic = new Anthropic({ apiKey })
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    // ---- ensure a session row exists so the transcript has somewhere to live
    let sid: string = sessionId || ''
    if (!sid) {
      const { data } = await supabase
        .from('chat_sessions')
        .insert({ phase: mode === 'concierge' ? 'concierge' : 'agent' })
        .select('id')
        .single()
      sid = data?.id ?? ''
    }

    let reply = ''
    let connect = false
    let summary = ''

    if (mode === 'agent-open') {
      // James's opening line must reflect the visitor's most recent real input,
      // never a generic placeholder.
      const hint = returningHint
        ? `\nThis browser has chatted before. Possible prior name: "${returningHint.name}", prior topic: "${returningHint.summary}". Treat this as a soft hint only. Ask to verify before claiming to recognise them.`
        : ''
      const res = await anthropic.messages.create({
        model: MODEL,
        max_tokens: 300,
        thinking: { type: 'disabled' },
        system: `${AGENT_SYSTEM}${hint}`,
        messages: [
          {
            role: 'user',
            content: `The visitor was just connected to you. Their most recent real request was: "${detail}". Write your very first message. Start directly, for example "Hi, my name is James..." then reference their actual request specifically. Do not ask for their name yet.`,
          },
        ],
      })
      reply = res.content.filter((b) => b.type === 'text').map((b) => (b as { text: string }).text).join('\n')
    } else {
      const messages = toApiMessages(history as Msg[])
      if (!messages.length) return json({ reply: '', connect: false, summary: '' })

      const res = await anthropic.messages.create({
        model: MODEL,
        max_tokens: 512,
        thinking: { type: 'disabled' },
        output_config: { format: { type: 'json_schema', schema: REPLY_SCHEMA }, effort: 'low' },
        system: mode === 'agent' ? AGENT_SYSTEM : CONCIERGE_SYSTEM,
        messages,
      })

      const text = res.content
        .filter((b) => b.type === 'text')
        .map((b) => (b as { text: string }).text)
        .join('')
      try {
        const parsed = JSON.parse(text)
        reply = parsed.reply ?? ''
        connect = Boolean(parsed.connect)
        summary = parsed.summary ?? ''
      } catch {
        // If the model returned prose rather than JSON, use it as the reply
        // rather than dropping the turn entirely.
        reply = text
      }
    }

    reply = enforceCopyRules(reply)

    // ---- persist the transcript for the lead queue (service role bypasses RLS)
    if (sid) {
      const rows: { session_id: string; role: string; content: string }[] = []
      const lastUser = [...(history as Msg[])].reverse().find((m) => m.who === 'u')
      if (lastUser) rows.push({ session_id: sid, role: 'visitor', content: lastUser.text })
      if (reply) {
        rows.push({ session_id: sid, role: mode === 'concierge' ? 'concierge' : 'agent', content: reply })
      }
      if (rows.length) await supabase.from('chat_messages').insert(rows)

      await supabase
        .from('chat_sessions')
        .update({
          last_at: new Date().toISOString(),
          phase: mode === 'concierge' ? 'concierge' : 'agent',
          ...(summary ? { summary } : {}),
        })
        .eq('id', sid)

      // Once a visitor is handed to an agent, the conversation becomes a lead.
      if (connect) {
        const { data: lead } = await supabase
          .from('leads')
          .insert({
            kind: 'chat',
            message: summary || detail || 'Agent Live Chat conversation',
            meta: { session_id: sid },
          })
          .select('id')
          .single()
        if (lead?.id) await supabase.from('chat_sessions').update({ lead_id: lead.id }).eq('id', sid)
      }
    }

    return json({ reply, connect, summary, sessionId: sid })
  } catch (err) {
    console.error('[agent-chat]', err)
    return json({ error: String(err) }, 500)
  }
})
