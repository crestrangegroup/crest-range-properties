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

// The Anthropic call is made with plain fetch rather than the npm SDK: the
// Deno edge runtime resolves `npm:` specifiers at cold boot, and pulling the
// full SDK in made the function fail to boot (503 on the CORS preflight, before
// any handler code ran). The Messages API is a single POST, so the SDK bought
// us nothing here.
import { createClient } from 'npm:@supabase/supabase-js@2'

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages'
const ANTHROPIC_VERSION = '2023-06-01'

interface AnthropicRequest {
  model: string
  max_tokens: number
  system: string
  messages: { role: 'user' | 'assistant'; content: string }[]
  thinking?: { type: 'disabled' }
  output_config?: Record<string, unknown>
}

async function callAnthropic(apiKey: string, body: AnthropicRequest): Promise<string> {
  const res = await fetch(ANTHROPIC_URL, {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': ANTHROPIC_VERSION,
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const json = await res.json()
  if (!res.ok || json.error) {
    throw new Error(`Anthropic ${res.status}: ${JSON.stringify(json.error ?? json).slice(0, 300)}`)
  }
  return (json.content ?? [])
    .filter((b: { type: string }) => b.type === 'text')
    .map((b: { text: string }) => b.text)
    .join('')
}

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
Hours Monday to Friday 10:00 to 18:00. Viewings by appointment, seven days a week.
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
Tone: warm, direct, human. Text like a real agent on live chat: keep replies SHORT and conversational, usually one or two sentences and rarely more than 40 words. Lead with the one thing that matters and stop; do not pack several points into a long paragraph. When two separate points genuinely both belong, you may split them into two short messages separated by a single blank line, the way a person fires off a quick follow-up. Plain prose, no lists.
You have just taken over from the Concierge. Do not greet the visitor again and do not reintroduce yourself after your first message.
Continue naturally on the actual topic for two or three exchanges before asking for the visitor's name (for example "May I know your name, please?"). Never ask abruptly or immediately.
Once you know their name, use it naturally but not in every message.
Ask for a mobile number when it fits naturally, framed as a reason ("so I can have someone call you"). Ask for email only if it comes up naturally.
You are already speaking to the visitor, so the handoff has happened. Leave connect false; it is not yours to set.
If you are told a returning visitor may have spoken to us before, treat that as a soft hint only, never as proof. Ask to verify, for example "Have we spoken before? Can I get your name and number, just to check our records?" Only confirm you recognise them once the name and number they give actually match the stored record. If they do not match, treat it as a brand new conversation and never claim to recognise them.
When the name and number DO match the stored record, say so warmly and carry the earlier context forward by referring to what they were looking at last time, then ask whether they are still after the same thing. Never say you cannot find their number when a matching record was provided to you.

Short replies: when the visitor answers with a brief acknowledgement such as "yes", "ok", "ok cool", "sure" or "thanks", they are agreeing, not asking you to repeat yourself. Do not restate the callback promise, the timeframe or anything you have already said in this conversation. Move forward with one new, specific thing, or simply acknowledge briefly and stop. Never send a message that is a paraphrase of one you have already sent.

Endings: when the visitor says something warm or final such as "thanks, you have been great", "appreciate it", "have a good evening", "bye" or "you can close the chat", acknowledge what they actually said before anything else. Respond to the warmth genuinely and in your own words, vary how you do it, then close. Do not jump straight to a stock sign-off, and do not ask another question once they have clearly finished.
Set closing to true on that final farewell message so the session ends cleanly and nothing follows it.
Whenever you know the visitor's name and mobile number, return them in visitorName and visitorPhone so we can recognise them if they come back.`

const REPLY_SCHEMA = {
  type: 'object',
  properties: {
    reply: {
      type: 'string',
      description: 'The message to send to the visitor, in English. Keep it short and conversational, usually one or two sentences; a single blank line may separate two brief messages when both points matter.',
    },
    connect: {
      type: 'boolean',
      description: 'True only when the visitor has accepted an offer to be connected to an agent. Only the Concierge may set this. Once James is speaking the handoff has already happened, so it must stay false.',
    },
    summary: {
      type: 'string',
      description: "One sentence quoting the visitor's actual request in their own words. Empty unless connect is true.",
    },
    closing: {
      type: 'boolean',
      description:
        'True only when this reply is a farewell and the conversation is finished. The client ends the session and cancels all idle timers, so nothing can speak after it.',
    },
    visitorName: {
      type: 'string',
      description: "The visitor's name if they have given it, otherwise empty.",
    },
    visitorPhone: {
      type: 'string',
      description: "The visitor's mobile number exactly as they gave it, otherwise empty.",
    },
  },
  required: ['reply', 'connect', 'summary', 'closing', 'visitorName', 'visitorPhone'],
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

    const {
      mode,
      sessionId,
      history = [],
      detail = '',
      returningHint = null,
      avoidEcho = '',
      knownVisitor = null,
    } = await req.json()

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
    let closing = false
    let visitorName = ''
    let visitorPhone = ''

    /** Digits only, so "058 554 1822" and "+971585541822" compare equal. */
    const digits = (s: unknown) => String(s || '').replace(/\D/g, '').slice(-9)

    // The stored record for this browser, given to James on EVERY agent turn -
    // not only at handoff. The number is included so that when the visitor
    // types it he can actually compare and confirm the match.
    const record = knownVisitor || returningHint
    const known = record?.name
      ? `\nOur records for this browser show a previous visitor named "${record.name}"${
          record.phone ? ` with mobile number "${record.phone}" (digits ${digits(record.phone)})` : ''
        }, who was previously interested in: "${record.summary || 'not recorded'}". This is a soft hint, not proof. Ask them to confirm their name and number. If what they give matches this record (compare phone numbers by their last 9 digits, ignoring spaces and country code), confirm you recognise them and refer back to what they were looking at. If it does not match, treat them as new.`
      : ''

    if (mode === 'agent-open') {
      // James's opening line must reflect the visitor's most recent real input,
      // never a generic placeholder.
      const hint = known
      // The Concierge's last line, so James can deliberately not echo it.
      const echo = avoidEcho
        ? `\nThe Concierge's final message to this visitor was: "${avoidEcho}". You are a different person picking up the same conversation, so do NOT reuse its phrasing, structure or opinion. If it already praised the area or quoted a price, do not repeat either. Say something it did not say: move the conversation forward with a concrete next step or a specific question.`
        : ''
      reply = await callAnthropic(apiKey, {
        model: MODEL,
        max_tokens: 300,
        thinking: { type: 'disabled' },
        system: `${AGENT_SYSTEM}${hint}${echo}`,
        messages: [
          {
            role: 'user',
            content: `The visitor was just connected to you. Their most recent real request was: "${detail}". Write your very first message. Start directly, for example "Hi, my name is James..." then reference their actual request specifically. Do not ask for their name yet.`,
          },
        ],
      })
    } else {
      const messages = toApiMessages(history as Msg[])
      if (!messages.length) return json({ reply: '', connect: false, summary: '' })

      const text = await callAnthropic(apiKey, {
        model: MODEL,
        max_tokens: 512,
        thinking: { type: 'disabled' },
        output_config: { format: { type: 'json_schema', schema: REPLY_SCHEMA }, effort: 'low' },
        system: mode === 'agent' ? `${AGENT_SYSTEM}${known}` : CONCIERGE_SYSTEM,
        messages,
      })
      try {
        const parsed = JSON.parse(text)
        reply = parsed.reply ?? ''
        connect = Boolean(parsed.connect)
        summary = parsed.summary ?? ''
        closing = Boolean(parsed.closing)
        visitorName = parsed.visitorName ?? ''
        visitorPhone = parsed.visitorPhone ?? ''
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

      // ---- lead row: exactly one per conversation.
      //
      // `connect` means "the visitor accepted the handoff", which is a
      // Concierge-phase event. But it lives in the shared reply schema and the
      // model kept returning true on ordinary agent-phase turns too, so every
      // turn minted another lead row and another email. One real conversation
      // produced eight. Hence both guards: only the Concierge may open a lead,
      // and only if this session does not already have one.
      const { data: sess } = await supabase
        .from('chat_sessions')
        .select('lead_id, notified_at, visitor_name, visitor_phone, summary')
        .eq('id', sid)
        .single()

      let leadId: string | null = sess?.lead_id ?? null

      if (connect && mode === 'concierge' && !leadId) {
        const { data: lead } = await supabase
          .from('leads')
          .insert({
            kind: 'chat',
            message: summary || detail || 'Agent Live Chat conversation',
            meta: { session_id: sid },
          })
          .select('id')
          .single()
        leadId = lead?.id ?? null
        if (leadId) await supabase.from('chat_sessions').update({ lead_id: leadId }).eq('id', sid)
      }

      // Keep the visitor's details on the session as James learns them, so the
      // notification below can be sent with real contact details rather than
      // the placeholders that were available at handoff time.
      const name = visitorName || sess?.visitor_name || ''
      const phone = visitorPhone || sess?.visitor_phone || ''
      if ((visitorName && visitorName !== sess?.visitor_name) ||
          (visitorPhone && visitorPhone !== sess?.visitor_phone)) {
        await supabase
          .from('chat_sessions')
          .update({ visitor_name: name || null, visitor_phone: phone || null })
          .eq('id', sid)
        if (leadId) {
          await supabase
            .from('leads')
            .update({ first_name: name || null, phone: phone || null })
            .eq('id', leadId)
        }
      }

      // ---- notification: exactly one per conversation, and only once it is
      // worth sending. Waiting for contact details (or for the visitor to say
      // goodbye) is what stops the empty "Name: - Mobile: -" emails: at handoff
      // James has not asked for a name yet, so there is nothing to report.
      const worthSending = Boolean(name && phone) || closing
      if (leadId && !sess?.notified_at && worthSending) {
        // Claim the notification first. If two turns race, only the one whose
        // conditional update matches an un-notified row proceeds.
        const { data: claimed } = await supabase
          .from('chat_sessions')
          .update({ notified_at: new Date().toISOString() })
          .eq('id', sid)
          .is('notified_at', null)
          .select('id')

        if (claimed?.length) {
          // Awaited, NOT fire-and-forget. The edge isolate is torn down as soon
          // as the handler returns, which was killing the request before its
          // body flushed: send-email received no body, fell back to an empty
          // data object, and mailed out a notification with every field "-".
          try {
            const res = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-email`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
                'content-type': 'application/json',
              },
              body: JSON.stringify({
                type: 'lead_notification',
                data: {
                  name: name || 'Website visitor',
                  mobile: phone || '-',
                  summary: summary || sess?.summary || detail || 'Agent Live Chat conversation',
                  source: 'Agent Live Chat',
                },
              }),
            })
            if (!res.ok) {
              console.error('[agent-chat] notify rejected', res.status, await res.text())
              // Release the claim so a later turn can retry.
              await supabase.from('chat_sessions').update({ notified_at: null }).eq('id', sid)
            }
          } catch (e) {
            console.error('[agent-chat] notify failed', e)
            await supabase.from('chat_sessions').update({ notified_at: null }).eq('id', sid)
          }
        }
      }
    }

    return json({ reply, connect, summary, closing, visitorName, visitorPhone, sessionId: sid })
  } catch (err) {
    console.error('[agent-chat]', err)
    return json({ error: String(err) }, 500)
  }
})
