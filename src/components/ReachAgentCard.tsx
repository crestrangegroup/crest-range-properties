import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import { byId } from '../data/team'
import { ROUTES } from '../routes'
import { waLink, telLink, mailTo, displayPhone } from '../data/company'
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

      {/* Item 1.5: agent identity links to the member's dedicated bio page. */}
      <Link to={ROUTES.teamMember(agent.id)} className="agent-id" style={{ color: 'inherit' }}>
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
      </Link>

      <a className="agent-phone" href={telLink(agent.phone)}>
        {displayPhone(agent.phone)}
      </a>

      {/* Order is Email, Call, WhatsApp. */}
      <div className="agent-actions">
        <a className="btn btn-outline btn-compact" href={mailTo(agent.email, subject)}>
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
