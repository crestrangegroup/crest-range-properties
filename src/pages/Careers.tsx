import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import { ROUTES } from '../routes'
import { JOB_POSTINGS } from '../data/careers'
import { Pin } from '../components/Icons'
import PageHead from '../components/PageHead'

/**
 * Public Careers page. Content is hardcoded for now (one sample posting);
 * JOB_POSTINGS is an array so real postings drop in later once the admin panel
 * manages them, with no rebuild. "Apply" navigates to the full-page application
 * form (fix 34), which submits through the existing lead-notification pathway.
 */
export default function Careers() {
  const { t } = useI18n()

  /** Full-page apply route for a given posting id (or a general application). */
  const applyHref = (role: string) => `${ROUTES.careersApply}?role=${encodeURIComponent(role)}`

  const why = [
    [t.careersWhy1H, t.careersWhy1P],
    [t.careersWhy2H, t.careersWhy2P],
    [t.careersWhy3H, t.careersWhy3P],
  ]

  return (
    <>
      <PageHead title={t.navCareers} description={t.careersLead} />

      {/* Hero — copy beside a skyline photo (fix 20). */}
      <section className="section">
        <div className="wrap">
          <div className="careers-hero">
            <div className="careers-hero-copy">
              <p className="kicker">{t.careersK}</p>
              <h1 className="h2" style={{ maxWidth: '15ch' }}>
                {t.careersH}
              </h1>
              <p className="lede" style={{ marginTop: 18, maxWidth: '52ch' }}>
                {t.careersLead}
              </p>
            </div>
            <div className="careers-hero-photo" role="img" aria-label={t.careersK} />
          </div>
        </div>
      </section>

      {/* What it's like here — dark gold-numeral pillars (fix 20), so the page
          stays rich even with no live vacancies. */}
      <section className="section" style={{ background: 'var(--surface)', borderBlock: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">{t.careersWhyH}</h2>
          </div>
          <div className="grid grid-3">
            {why.map(([h, p], i) => (
              <div key={h} className="careers-pillar">
                <span className="careers-pillar-num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="h3" style={{ fontSize: 19 }}>
                  {h}
                </h3>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">{t.careersOpenH}</h2>
          </div>

          {JOB_POSTINGS.length === 0 ? (
            // Premium empty state: no live vacancies, but invite an introduction.
            <div className="card" style={{ padding: 'clamp(28px,4vw,44px)', textAlign: 'center', alignItems: 'center', gap: 14 }}>
              <h3 className="h3" style={{ fontSize: 22 }}>
                {t.careersNoneH}
              </h3>
              <p className="muted" style={{ margin: 0, maxWidth: '52ch', fontSize: 15.5 }}>
                {t.careersNoneP}
              </p>
              <Link className="btn btn-primary btn-inline" style={{ marginTop: 6 }} to={applyHref('general')}>
                {t.jobApply}
              </Link>
            </div>
          ) : (
            <div className="stack" style={{ gap: 18 }}>
              {JOB_POSTINGS.map((job) => (
                <article key={job.id} className="job-card" style={{ padding: 'clamp(22px,3vw,32px)', gap: 14 }}>
                  <div className="split" style={{ alignItems: 'start', gap: 'clamp(18px,3vw,40px)' }}>
                    <div style={{ minWidth: 0 }}>
                      <h3 className="h3" style={{ fontSize: 22 }}>
                        {t[job.titleKey]}
                      </h3>
                      <div className="row" style={{ gap: 16, marginTop: 8, fontSize: 13.5 }}>
                        <span className="row muted" style={{ gap: 6 }}>
                          <Pin size={14} />
                          {t[job.locationKey]}
                        </span>
                        <span
                          style={{
                            textTransform: 'uppercase',
                            letterSpacing: '.12em',
                            fontSize: 11.5,
                            color: 'var(--gold)',
                          }}
                        >
                          {t[job.typeKey]}
                        </span>
                      </div>
                      <p className="muted" style={{ marginTop: 14, fontSize: 15, lineHeight: 1.65 }}>
                        {t[job.summaryKey]}
                      </p>
                      <ul className="stack" style={{ gap: 8, margin: '14px 0 0', paddingInlineStart: 18 }}>
                        {(t[job.bulletsKey] as readonly string[]).map((b) => (
                          <li key={b} style={{ fontSize: 14.5 }}>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div style={{ flex: 'none' }}>
                      <Link className="btn btn-primary btn-inline" to={applyHref(job.id)}>
                        {t.jobApply}
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
