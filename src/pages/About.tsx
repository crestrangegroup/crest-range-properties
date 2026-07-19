import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import { ROUTES, TEAM_ANCHOR } from '../routes'
import { TESTIMONIALS } from '../data/content'
import { TEAM } from '../data/team'
import Carousel from '../components/Carousel'
import PageHead from '../components/PageHead'
import { COMPANY, waLink, telLink, mailLink } from '../data/company'
import { Phone, Mail, WhatsApp } from '../components/Icons'

export default function About() {
  const { t, tTestimonial, addressLines, role } = useI18n()
  const { hash } = useLocation()

  // Team lives on this page now, so #team has to be scrolled to manually:
  // the browser only auto-jumps for anchors present on first paint.
  useEffect(() => {
    if (hash !== `#${TEAM_ANCHOR}`) return
    const el = document.getElementById(TEAM_ANCHOR)
    if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }, [hash])

  return (
    <>
      <PageHead title={t.navAbout} description={t.aboutP1} />

      <section className="section">
        <div className="wrap">
          <p className="kicker">{t.aboutK}</p>
          <h1 className="h2" style={{ maxWidth: '18ch' }}>
            {t.aboutH}
          </h1>
          <p className="lede" style={{ marginTop: 18 }}>
            {t.aboutP1}
          </p>

          <div className="row" style={{ gap: 12, marginTop: 28 }}>
            <a className="btn btn-primary btn-inline" href={`#${TEAM_ANCHOR}`}>
              {t.footTeam}
            </a>
            <Link className="btn btn-outline btn-inline" to={ROUTES.contact}>
              {t.navContact}
            </Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)', borderBlock: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="grid grid-3">
            {[
              [t.s1Name, t.s1Desc],
              [t.s2Name, t.s2Desc],
              [t.s3Name, t.s3Desc],
            ].map(([name, desc]) => (
              <div key={name}>
                <h3 className="h3" style={{ marginBottom: 10 }}>
                  {name}
                </h3>
                <p className="muted" style={{ margin: 0, fontSize: 15 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials are a rotating carousel, never a static grid. */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">{t.testiH}</h2>
          </div>
          <Carousel intervalMs={9000} visible={2} label={t.testiH}>
            {TESTIMONIALS.map((raw, i) => {
              const c = tTestimonial(raw, i)
              return (
                <blockquote
                  key={raw.who}
                  className="card"
                  style={{ padding: 26, margin: 0, gap: 16, justifyContent: 'space-between' }}
                >
                  <p style={{ fontFamily: 'var(--serif)', fontSize: 19, lineHeight: 1.5, margin: 0 }}>“{c.q}”</p>
                  <footer style={{ fontSize: 13.5 }}>
                    {/* Client names are real personal names and stay in Latin script. */}
                    <strong>{raw.who}</strong>
                    <div className="muted">{c.role}</div>
                  </footer>
                </blockquote>
              )
            })}
          </Carousel>
        </div>
      </section>

      {/* Our Team - merged in from the former standalone /team route. The
          header's About dropdown and the footer both anchor here. */}
      <section
        className="section"
        id={TEAM_ANCHOR}
        style={{ background: 'var(--surface)', borderBlock: '1px solid var(--line)', scrollMarginTop: 'calc(var(--header-h) + 12px)' }}
      >
        <div className="wrap">
          <p className="kicker">{t.footTeam}</p>
          <h2 className="h2" style={{ maxWidth: '20ch' }}>
            {t.teamH}
          </h2>
          <p className="lede" style={{ marginTop: 16 }}>
            {t.teamP}
          </p>

          <div className="grid grid-3" style={{ marginTop: 40 }}>
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
                <h3 className="h3" style={{ fontSize: 20, marginTop: 18 }}>
                  {m.name}
                </h3>
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

      <section className="section dark">
        <div className="wrap">
          <h2 className="h2" style={{ color: '#fff' }}>
            {t.contactH}
          </h2>
          <div style={{ marginTop: 18, lineHeight: 1.8 }} className="muted">
            {addressLines.map((l) => (
              <div key={l}>{l}</div>
            ))}
          </div>
          <Link className="btn btn-gold btn-inline" to={ROUTES.contact} style={{ marginTop: 24 }}>
            {t.navContact}
          </Link>
        </div>
      </section>
    </>
  )
}
