import { useEffect, useRef } from 'react'
import { useChat } from './ChatProvider'
import { useI18n } from '../../i18n/I18nProvider'
import { EN } from '../../i18n/en'
import { Chat, Close, Minus, Send } from '../Icons'
import './chat.css'

export default function AgentLiveChat() {
  const { t } = useI18n()
  const c = useChat()
  const scrollRef = useRef<HTMLDivElement>(null)

  // Keep the newest message in view as the conversation grows.
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [c.msgs, c.typing, c.isOpen])

  // Lift the launcher above the footer while the footer is on screen, so it
  // never covers the contact details. Only the collapsed bubble moves: the open
  // window is tall and raising it would push its header off screen.
  useEffect(() => {
    const root = document.documentElement

    // Deliberately not throttled with requestAnimationFrame: rAF is suspended
    // while a document is hidden, which silently disables this. A single
    // getBoundingClientRect per scroll event is cheap enough.
    const update = () => {
      const footer = document.querySelector('footer')
      if (!footer) return
      const overlap = Math.max(0, window.innerHeight - footer.getBoundingClientRect().top)
      root.style.setProperty('--chat-lift', `${Math.round(overlap)}px`)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      root.style.removeProperty('--chat-lift')
    }
  }, [])

  if (!c.isOpen) {
    return (
      <button className="crc-bubble" onClick={c.open} style={{ position: 'fixed' }}>
        <Chat size={19} />
        {/* Once a conversation is under way the label invites the visitor back in. */}
        <span className="lbl">{c.hasConversation ? t.contChat : t.chatCta}</span>
        {c.unread > 0 && <span className="crc-badge">{c.unread}</span>}
      </button>
    )
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    c.send(c.input)
  }

  return (
    <div className="crc-win" role="dialog" aria-label={t.chatTitle}>
      <div className="crc-head">
        <div>
          <div className="who">{t.chatTitle}</div>
          <div className="status">{t.chatOnline}</div>
        </div>
        <div className="acts">
          <button onClick={c.minimize} aria-label={t.minBtn} title={t.minBtn}>
            <Minus size={17} />
          </button>
          <button onClick={c.close} aria-label={t.closeBtn} title={t.closeBtn}>
            <Close size={17} />
          </button>
        </div>
      </div>

      <div className="crc-scroll" ref={scrollRef}>
        {c.msgs.map((m, i) => {
          if (m.who === 'u') {
            return (
              <div key={i} className="crc-msg me">
                {m.text}
              </div>
            )
          }
          // Name the speaker the first time each side takes over the thread.
          const prev = c.msgs[i - 1]
          const showFrom = !prev || prev.who !== m.who
          return (
            <div key={i} className="crc-msg bot">
              {showFrom && <span className="from">{m.who === 'a' ? 'James' : EN.chatTitle}</span>}
              {m.text}
            </div>
          )
        })}

        {/* Typing indicator is shown for James only, never for the Concierge. */}
        {c.typing && (
          <div className="crc-typing">
            <i />
            <i />
            <i />
            <span>{t.typingLbl}</span>
          </div>
        )}
      </div>

      <form className="crc-foot" onSubmit={onSubmit}>
        <input
          value={c.input}
          onChange={(e) => c.setInput(e.target.value)}
          /* This is the ONLY place on the site that instructs the visitor to
             type in English. It must not appear on any other input. */
          placeholder={EN.chatPlaceholder}
          aria-label={EN.chatPlaceholder}
          dir="ltr"
          lang="en"
          autoComplete="off"
        />
        <button type="submit" disabled={!c.input.trim()} aria-label="Send">
          <Send size={17} />
        </button>
      </form>

      {c.confirmClose && (
        <div className="crc-confirm">
          <div className="box">
            <p>{t.closeQ}</p>
            <button className="btn btn-primary" onClick={c.endConversation}>
              {t.closeBtn}
            </button>
            <button className="btn btn-outline" onClick={c.minimize}>
              {t.minBtn}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
