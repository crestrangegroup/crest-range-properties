import { useI18n } from '../i18n/I18nProvider'
import { TEAM } from '../data/team'
import { waLink, telLink, mailLink } from '../data/company'
import { Phone, Mail, WhatsApp } from '../components/Icons'
import PageHead from '../components/PageHead'

export default function Team() {
  const { t, role } = useI18n()

  return (
    <>
      <PageHead title={t.footTeam} description={t.teamP} />

      <section className="section">
        <div className="wrap">
          <p className="kicker">{t.footTeam}</p>
          <h1 className="h2" style={{ maxWidth: '20ch' }}>
            {t.teamH}
          </h1>
          <p className="lede" style={{ marginTop: 16 }}>
            {t.teamP}
          </p>

          <div className="grid grid-3" style={{ marginTop: 44 }}>
            {TEAM.map((m) => (
              <article key={m.id} className="card" style={{ alignItems: 'center', textAlign: 'center', padding: 28 }}>
                <img
                  src={m.photo}
                  alt={m.name}
                  loading="lazy"
                  width={132}
                  height={132}
                  style={{ width: 132, height: 132, borderRadius: '50%', objectFit: 'cover' }}
                />
                {/* Real names are never translated or transliterated. */}
                <h2 className="h3" style={{ fontSize: 20, marginTop: 18 }}>
                  {m.name}
                </h2>
                <p className="muted" style={{ fontSize: 13.5, margin: '8px 0 18px', minHeight: '2.6em' }}>
                  {role(m.id)}
                </p>
                <div className="icon-row" style={{ justifyContent: 'center' }}>
                  <a className="icon-btn" href={telLink(m.phone)} aria-label={`${t.callBtn} ${m.name}`} title={t.callBtn}>
                    <Phone size={16} />
                  </a>
                  <a className="icon-btn" href={mailLink(`Enquiry for ${m.name}`)} aria-label={`${t.emailBtn} ${m.name}`} title={t.emailBtn}>
                    <Mail size={16} />
                  </a>
                  <a
                    className="icon-btn"
                    href={waLink(`Hello ${m.name}, I'd like to speak with you about a property.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t.whatsBtn} ${m.name}`}
                    title={t.whatsBtn}
                  >
                    <WhatsApp size={16} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
