import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import { ROUTES } from '../routes'
import { TESTIMONIALS } from '../data/content'
import Carousel from '../components/Carousel'
import PageHead from '../components/PageHead'
import { COMPANY } from '../data/company'

export default function About() {
  const { t, tTestimonial, addressLines } = useI18n()

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
            <Link className="btn btn-primary btn-inline" to={ROUTES.team}>
              {t.footTeam}
            </Link>
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
