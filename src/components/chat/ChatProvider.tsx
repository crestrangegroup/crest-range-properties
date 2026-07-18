import { createContext, useCallback, useContext, useEffect, useRef, useState, ReactNode } from 'react'
import { invokeFn } from '../../lib/supabase'
import { EN } from '../../i18n/en'
import { COMPANY } from '../../data/company'

export type Who = 'c' | 'a' | 'u' | 's'
export interface Msg {
  who: Who
  text: string
}

export type Phase = 'concierge' | 'waiting' | 'agent'

/** Stored lead used only as a SOFT hint that this browser has chatted before.
 *  It is never treated as proof of identity - the agent must verify. */
interface StoredLead {
  name: string
  phone: string
  summary: string
  at: number
}

const CHAT_KEY = 'crc-chat-v1'
const LEADS_KEY = 'crc-leads-v1'

/** Simulated connect delay. The visitor is told 1 to 3 minutes. */
const AGENT_WAIT_MS = 120_000
const IDLE_CHECKIN_MS = 180_000
const IDLE_CLOSING_MS = 60_000
const IDLE_HANGUP_MS = 12_000

const CHECKINS = ['Are you still there?', 'Still with me? No rush at all.', 'Just checking you are still around.']
const CLOSINGS = [
  `It seems you have stepped away, so I will close this chat for now. Open it again whenever you are ready, or call us on ${COMPANY.phones[0].display} and we will pick this right up.`,
  `Seems you got pulled away, so I will end our chat here for now. You can start a fresh one any time, or reach us directly on ${COMPANY.phones[0].display}.`,
  `No problem at all, I will wrap this conversation up for now. We are only a message away whenever suits you, or on ${COMPANY.phones[0].display}.`,
]
const REPHRASE = [
  'Sorry, let me put that more clearly. What matters most to you here, budget, area or timing?',
  'Let me come at that differently. Tell me a bit more about what you need and I will be specific.',
  'Actually, let me be more precise. Which part should I dig into first?',
]

/** Hard guarantee of the locked copy rules, applied to every outgoing message
 *  regardless of what the model returned:
 *  - no em-dash anywhere
 *  - James never implies he will personally call the client back */
export function enforceCopyRules(raw: string): string {
  let s = String(raw || '').trim()
  s = s.replace(/\s*—\s*/g, ', ').replace(/—/g, '-')
  s = s.replace(
    /\bI(?:'| a|’a)?m going to call you\b|\bI will call you\b|\bI'll call you\b|\bI’ll call you\b|\bI can call you\b/gi,
    'I’ll get one of our senior agents to call you shortly',
  )
  return s
}

interface ChatValue {
  open: () => void
  close: () => void
  minimize: () => void
  isOpen: boolean
  minimized: boolean
  hasConversation: boolean
  unread: number
  msgs: Msg[]
  phase: Phase
  typing: boolean
  busy: boolean
  input: string
  setInput: (v: string) => void
  send: (text: string) => void
  confirmClose: boolean
  askClose: () => void
  cancelClose: () => void
  endConversation: () => void
}

const Ctx = createContext<ChatValue | null>(null)

const readLeads = (): StoredLead[] => {
  try {
    return JSON.parse(localStorage.getItem(LEADS_KEY) || '[]')
  } catch {
    return []
  }
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [phase, setPhase] = useState<Phase>('concierge')
  const [typing, setTyping] = useState(false)
  const [busy, setBusy] = useState(false)
  const [input, setInput] = useState('')
  const [unread, setUnread] = useState(0)
  const [confirmClose, setConfirmClose] = useState(false)

  const sessionId = useRef<string>('')
  const summary = useRef('')
  const idle1 = useRef<number>()
  const idle2 = useRef<number>()
  const idle3 = useRef<number>()
  const joinT = useRef<number>()
  const pick = useRef(0)
  const openRef = useRef(isOpen)
  openRef.current = isOpen

  // Restore an in-flight conversation so it survives navigation between pages.
  // sessionStorage (not localStorage) means it resets on tab close, by design.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(CHAT_KEY)
      if (raw) {
        const s = JSON.parse(raw)
        setMsgs(s.msgs || [])
        setPhase(s.phase || 'concierge')
        summary.current = s.summary || ''
        sessionId.current = s.sessionId || ''
        // A conversation that was mid-wait when the page changed resumes waiting.
        if (s.phase === 'waiting' && s.waitUntil) {
          const left = Math.max(3000, s.waitUntil - Date.now())
          joinT.current = window.setTimeout(() => joinAgent(), left)
        }
      }
    } catch {
      /* ignore malformed state */
    }
    return () => {
      ;[idle1, idle2, idle3, joinT].forEach((r) => r.current && clearTimeout(r.current))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const persist = useCallback(
    (next: Msg[], nextPhase: Phase, waitUntil = 0) => {
      try {
        sessionStorage.setItem(
          CHAT_KEY,
          JSON.stringify({
            msgs: next,
            phase: nextPhase,
            summary: summary.current,
            sessionId: sessionId.current,
            waitUntil,
          }),
        )
      } catch {
        /* storage full or unavailable - conversation still works in memory */
      }
    },
    [],
  )

  const pushBot = useCallback(
    (who: Exclude<Who, 'u'>, text: string) => {
      const clean = enforceCopyRules(text)
      if (!clean) return
      setMsgs((cur) => {
        // Never send the identical sentence twice in a row - rephrase instead.
        const recentBot = cur.filter((m) => m.who === 'a' || m.who === 'c').slice(-4).map((m) => m.text)
        const final = recentBot.includes(clean) ? REPHRASE[pick.current++ % REPHRASE.length] : clean
        const next = [...cur, { who, text: final }]
        persist(next, phase)
        return next
      })
      if (!openRef.current) setUnread((n) => n + 1)
    },
    [persist, phase],
  )

  const clearIdle = () => {
    ;[idle1, idle2, idle3].forEach((r) => r.current && clearTimeout(r.current))
  }

  const endConversation = useCallback(() => {
    clearIdle()
    if (joinT.current) clearTimeout(joinT.current)
    try {
      sessionStorage.removeItem(CHAT_KEY)
    } catch {
      /* ignore */
    }
    summary.current = ''
    sessionId.current = ''
    setConfirmClose(false)
    setIsOpen(false)
    setMinimized(false)
    setMsgs([])
    setPhase('concierge')
    setTyping(false)
    setBusy(false)
    setUnread(0)
  }, [])

  /** 3 minutes silent -> check in. 1 more minute -> closing line. Then close. */
  const bumpIdle = useCallback(() => {
    clearIdle()
    idle1.current = window.setTimeout(() => {
      setMsgs((cur) => {
        if (!cur.some((m) => m.who === 'u')) return cur
        const who: Who = phase === 'agent' ? 'a' : 'c'
        const next = [...cur, { who, text: CHECKINS[pick.current++ % CHECKINS.length] }]
        persist(next, phase)
        if (!openRef.current) setUnread((n) => n + 1)
        return next
      })
      idle2.current = window.setTimeout(() => {
        const who: Who = phase === 'agent' ? 'a' : 'c'
        setMsgs((cur) => {
          const next = [...cur, { who, text: CLOSINGS[pick.current++ % CLOSINGS.length] }]
          persist(next, phase)
          if (!openRef.current) setUnread((n) => n + 1)
          return next
        })
        idle3.current = window.setTimeout(() => endConversation(), IDLE_HANGUP_MS)
      }, IDLE_CLOSING_MS)
    }, IDLE_CHECKIN_MS)
  }, [phase, persist, endConversation])

  /** Most recent substantive thing the visitor said - what James must open on. */
  const lastUserDetail = (list: Msg[]) => {
    const us = list.filter((m) => m.who === 'u').map((m) => m.text.trim())
    for (let i = us.length - 1; i >= 0; i--) {
      const x = us[i]
      if (x.length >= 12 && !/^(hi|hello|hey|yes|yeah|ok|okay|sure|please|thanks|thank you|go ahead|fine)[!,. ]*$/i.test(x)) {
        return x
      }
    }
    return us[us.length - 1] || ''
  }

  const joinAgent = useCallback(() => {
    setPhase('agent')
    setTyping(true) // typing indicator is shown for James only, never the Concierge
    window.setTimeout(async () => {
      const detail = summary.current || lastUserDetail(msgs)
      const knownLead = readLeads().slice(-1)[0]
      const res = await invokeFn<{ reply?: string }>('agent-chat', {
        mode: 'agent-open',
        sessionId: sessionId.current,
        detail,
        // A returning browser is a hint only. The agent verifies before ever
        // claiming to recognise anyone.
        returningHint: knownLead ? { name: knownLead.name, summary: knownLead.summary } : null,
        history: msgs,
      })
      setTyping(false)
      pushBot(
        'a',
        res?.reply ||
          `Hi, my name is James. You mentioned ${detail || 'you were looking for something in Abu Dhabi'}. Let me help you with that.`,
      )
      bumpIdle()
    }, 1600)
  }, [msgs, pushBot, bumpIdle])

  const send = useCallback(
    (text: string) => {
      const body = text.trim()
      if (!body) return
      const next: Msg[] = [...msgs, { who: 'u', text: body }]
      setMsgs(next)
      setInput('')
      setBusy(true)
      persist(next, phase)
      bumpIdle()

      // While waiting for an agent the visitor can still type; those messages
      // are kept as context for James rather than answered by the Concierge.
      if (phase === 'waiting') {
        setBusy(false)
        return
      }

      if (phase === 'agent') setTyping(true)
      ;(async () => {
        const res = await invokeFn<{ reply?: string; connect?: boolean; summary?: string; sessionId?: string }>(
          'agent-chat',
          { mode: phase === 'agent' ? 'agent' : 'concierge', sessionId: sessionId.current, history: next },
        )
        if (res?.sessionId) sessionId.current = res.sessionId
        setTyping(false)
        setBusy(false)

        if (!res?.reply) {
          pushBot(
            phase === 'agent' ? 'a' : 'c',
            `Sorry, I lost that for a moment. Could you send it once more, or call us on ${COMPANY.phones[0].display}?`,
          )
          return
        }

        pushBot(phase === 'agent' ? 'a' : 'c', res.reply)

        if (res.connect && phase === 'concierge') {
          summary.current = res.summary || lastUserDetail(next)
          setTimeout(() => {
            pushBot('c', EN.connecting)
            setPhase('waiting')
            persist(next, 'waiting', Date.now() + AGENT_WAIT_MS)
            joinT.current = window.setTimeout(() => joinAgent(), AGENT_WAIT_MS)
          }, 700)
        }
        bumpIdle()
      })()
    },
    [msgs, phase, persist, pushBot, bumpIdle, joinAgent],
  )

  const open = useCallback(() => {
    setIsOpen(true)
    setMinimized(false)
    setUnread(0)
    setConfirmClose(false)
    setMsgs((cur) => {
      if (cur.length) return cur
      // Fixed opening line, no time-of-day variation. Always English.
      return [
        { who: 'c', text: 'Marhaba! (Welcome)' },
        { who: 'c', text: EN.chatIntro },
      ]
    })
  }, [])

  const minimize = useCallback(() => {
    setIsOpen(false)
    setMinimized(true)
    setConfirmClose(false)
  }, [])

  const close = useCallback(() => {
    // Closing an ACTIVE conversation asks first; an untouched one just closes.
    if (msgs.some((m) => m.who === 'u')) setConfirmClose(true)
    else endConversation()
  }, [msgs, endConversation])

  const value: ChatValue = {
    open,
    close,
    minimize,
    isOpen,
    minimized,
    hasConversation: msgs.some((m) => m.who === 'u'),
    unread,
    msgs,
    phase,
    typing,
    busy,
    input,
    setInput,
    send,
    confirmClose,
    askClose: () => setConfirmClose(true),
    cancelClose: () => setConfirmClose(false),
    endConversation,
  }

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useChat() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useChat must be used inside <ChatProvider>')
  return v
}
