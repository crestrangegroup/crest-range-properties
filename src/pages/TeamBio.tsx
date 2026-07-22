import { Link, Navigate, useParams } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import { TEAM } from '../data/team'
import { ROUTES, TEAM_ANCHOR } from '../routes'
import { COMPANY, waLink, telLink, mailLink, displayPhone } from '../data/company'
import { ArrowLeft, Phone, Mail, WhatsApp } from '../components/Icons'
import PageHead from '../components/PageHead'

/** Initials fallback for a member whose photo is not yet supplied. */
function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

export default function TeamBio() {
  const { id } = useParams()
  const { t, role } = useI18n()
  const member = TEAM.find((m) => m.id === id)

  // Unknown id: send them to the team section rather than a dead page.
  if (!member) return <Navigate to={ROUTES.team} replace />

  const title = role(member.id)
  // Fatoki has no separate bio yet; his own Founder's Welcome message stands in.
  const bio = member.bio || (member.id === 'fatoki' ? t.welcomeP : '')
  const enquiry = `Hello ${member.name}, I'd like to speak with you about a property.`

  return (
    <>
      <PageHead title={`${member.name} · ${COMPANY.name}`} description={title || t.teamMemberH} />

      <section className="section">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <Link
            to={ROUTES.team}
            className="row muted"
            style={{ gap: 8, fontSize: 13.5, marginBottom: 26 }}
          >
            <ArrowLeft size={15} />
            {t.bioBack}
          </Link>

          <div className="split" style={{ alignItems: 'start', gap: 'clamp(24px,4vw,48px)' }}>
            {/* Portrait, or an initials placeholder while the photo is pending. */}
            <div style={{ flex: 'none' }}>
              {member.photo && !member.comingSoon ? (
                <img
                  src={member.photo}
                  alt={member.name}
                  width={260}
                  height={260}
                  style={{ width: '100%', maxWidth: 260, aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: 8 }}
                />
              ) : (
                <div
                  aria-hidden
                  style={{
                    width: '100%',
                    maxWidth: 260,
                    aspectRatio: '1 / 1',
                    borderRadius: 8,
                    background: 'var(--surface)',
                    border: '1px solid var(--line)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--serif)',
                    fontSize: 64,
                    color: 'var(--gold)',
                  }}
                >
                  {initials(member.name)}
                </div>
              )}
            </div>

            <div style={{ minWidth: 0 }}>
              <p className="kicker">{t.footTeam}</p>
              {/* Real names are never translated or transliterated. */}
              <h1 className="h2" style={{ marginTop: 4 }}>
                {member.name}
              </h1>
              <p
                style={{
                  textTransform: 'uppercase',
                  letterSpacing: '.12em',
                  fontSize: 12.5,
                  color: 'var(--gold)',
                  marginTop: 6,
                }}
              >
                {title}
              </p>

              {bio ? (
                <p className="lede" style={{ marginTop: 20, fontSize: 16.5 }}>
                  {bio}
                </p>
              ) : (
                <p className="muted" style={{ marginTop: 20 }}>
                  {/* Gift Ofejiro: bio pending alongside the photo and title. */}
                  A full profile for {member.name} is coming soon.
                </p>
              )}

              <div style={{ marginTop: 24, lineHeight: 1.9 }} className="muted">
                <div>
                  <a href={mailLink(`Enquiry for ${member.name}`)} style={{ color: 'inherit' }}>
                    {member.email}
                  </a>
                </div>
                <div dir="ltr">
                  <a href={telLink(member.phone)} style={{ color: 'inherit' }}>
                    {displayPhone(member.phone)}
                  </a>
                </div>
              </div>

              {/* Same interaction pattern as the "Reach the Agent" card. */}
              <div className="row" style={{ gap: 10, marginTop: 22, flexWrap: 'wrap' }}>
                <a className="btn btn-outline btn-inline" href={telLink(member.phone)}>
                  <Phone size={15} />
                  {t.callBtn}
                </a>
                <a className="btn btn-outline btn-inline" href={mailLink(`Enquiry for ${member.name}`)}>
                  <Mail size={15} />
                  {t.emailBtn}
                </a>
                <a
                  className="btn btn-wa btn-inline"
                  href={waLink(enquiry)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsApp size={15} />
                  {t.whatsBtn}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
