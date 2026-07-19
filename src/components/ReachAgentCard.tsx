import { useI18n } from '../i18n/I18nProvider'
import { byId } from '../data/team'
import { waLink, telLink, mailLink, displayPhone } from '../data/company'
import { Mail, Phone, WhatsApp } from './Icons'
import './ReachAgentCard.css'

interface Props {
  /** Team member id of the listing agent. */
  agentId: string
  /** Subject line for the email action. */
  subject: string
  /** Prefilled WhatsApp message. */
  enquiry: string
}

/**
 * Compact "Reach the agent" card.
 *
 * Single source of truth so every placement stays identical: kicker, agent
 * identity with an uppercase gold role, the phone number as plain text, then
 * Email / Call / WhatsApp in one row at matching weight, with WhatsApp kept as
 * the outlined gold CTA.
 */
export default function ReachAgentCard({ agentId, subject, enquiry }: Props) {
  const { t, role } = useI18n()
  const agent = byId(agentId)

  return (
    <div className="card agent-card">
      <p className="agent-kicker">{t.reachAgent}</p>

      <div className="agent-id">
        <img
          className="agent-photo"
          src={agent.photo}
          alt={agent.name}
          width={46}
          height={46}
          loading="lazy"
        />
        <div style={{ minWidth: 0 }}>
          {/* Real names are never translated or transliterated. */}
          <strong className="agent-name">{agent.name}</strong>
          <div className="agent-role">{role(agent.id)}</div>
        </div>
      </div>

      <a className="agent-phone" href={telLink(agent.phone)}>
        {displayPhone(agent.phone)}
      </a>

      {/* Order is Email, Call, WhatsApp. */}
      <div className="agent-actions">
        <a className="btn btn-outline btn-compact" href={mailLink(subject)}>
          <Mail size={13} />
          {t.emailBtn}
        </a>
        <a className="btn btn-outline btn-compact" href={telLink(agent.phone)}>
          <Phone size={13} />
          {t.callBtn}
        </a>
        <a
          className="btn btn-wa btn-compact"
          href={waLink(enquiry)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsApp size={13} />
          {t.whatsBtn}
        </a>
      </div>
    </div>
  )
}
