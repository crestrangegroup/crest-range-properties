import { FormEvent, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import { ROUTES } from '../routes'
import { JOB_POSTINGS } from '../data/careers'
import { submitLead } from '../lib/leads'
import { NameFields, EmailField } from '../components/forms/Fields'
import PhoneField, { phoneValid } from '../components/forms/PhoneField'
import { DEFAULT_CODE } from '../data/countries'
import { Check, Close, Pin } from '../components/Icons'
import PageHead from '../components/PageHead'

/**
 * Public Careers page. Content is hardcoded for now (one sample posting);
 * JOB_POSTINGS is an array so real postings drop in later once the admin panel
 * manages them, with no rebuild. The "Apply" flow opens a lightweight modal
 * that submits through the existing lead-notification pathway.
 *
 * NOTE: the CV file is collected but not transmitted — attaching/storing it
 * needs Supabase Storage + an Edge Function change (backend, out of this
 * frontend batch). The team is still notified of the applicant's contact
 * details and the CV's filename. See the report accompanying this change.
 */
export default function Careers() {
  const { t } = useI18n()

  // Which role's application modal is open: a posting id, 'general', or null.
  const [applyFor, setApplyFor] = useState<string | null>(null)

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
              <button className="btn btn-primary btn-inline" style={{ marginTop: 6 }} onClick={() => setApplyFor('general')}>
                {t.jobApply}
              </button>
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
                      <button className="btn btn-primary btn-inline" onClick={() => setApplyFor(job.id)}>
                        {t.jobApply}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {applyFor && (
        <ApplyModal
          roleId={applyFor}
          roleTitle={applyFor === 'general' ? '' : t[JOB_POSTINGS.find((j) => j.id === applyFor)?.titleKey ?? 'jobSampleTitle']}
          onClose={() => setApplyFor(null)}
        />
      )}
    </>
  )
}

/** Lightweight application modal. Submits via the shared lead pathway. */
function ApplyModal({ roleId, roleTitle, onClose }: { roleId: string; roleTitle: string; onClose: () => void }) {
  const { t } = useI18n()
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState(DEFAULT_CODE)
  const [phone, setPhone] = useState('')
  const [cvName, setCvName] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [sent, setSent] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!first.trim() || !last.trim() || !email.trim() || !phoneValid(code, phone)) {
      setError(t.formRequired)
      return
    }
    setError('')
    setBusy(true)
    // The CV file itself is not uploaded (needs Storage + an Edge Function
    // change); we forward the applicant's details and the CV filename so the
    // team is still notified. `career` is an accepted lead kind (no schema/RLS
    // change required — the public insert policy does not restrict kind).
    const ok = await submitLead({
      kind: 'career',
      firstName: first,
      lastName: last,
      email,
      phoneCode: code,
      phone,
      message: [
        `Careers application: ${roleTitle || 'General interest'}`,
        cvName ? `CV attached by applicant: ${cvName} (file not transmitted — pending Storage)` : 'No CV file attached',
      ].join(' | '),
      meta: { role: roleId, cvName: cvName || null },
    })
    setBusy(false)
    if (ok) setSent(true)
    else setError(t.formRequired)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.jobApplyH}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(20, 18, 13, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <div
        className="card"
        onClick={(e) => e.stopPropagation()}
        style={{ width: 'min(520px, 100%)', maxHeight: '90dvh', overflowY: 'auto', padding: 'clamp(22px,4vw,32px)' }}
      >
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div>
            <p className="kicker" style={{ margin: 0 }}>
              {t.jobApplyH}
            </p>
            {roleTitle && (
              <h2 className="h3" style={{ fontSize: 21, marginTop: 4 }}>
                {roleTitle}
              </h2>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label={t.closeBtn}
            className="icon-btn"
            style={{ flex: 'none' }}
          >
            <Close size={16} />
          </button>
        </div>

        {sent ? (
          <div className="stack" style={{ gap: 12, marginTop: 20 }}>
            <p className="row" style={{ gap: 8, margin: 0, fontFamily: 'var(--serif)', fontSize: 20, color: 'var(--gold)' }}>
              <Check size={18} />
              {t.appSentH}
            </p>
            <p className="muted" style={{ margin: 0 }}>
              {t.appSentP}
            </p>
            <button className="btn btn-outline btn-inline" style={{ marginTop: 6 }} onClick={onClose}>
              {t.appBack}
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="stack" style={{ gap: 16, marginTop: 20 }}>
            <div className="form-grid">
              <NameFields first={first} last={last} onFirst={setFirst} onLast={setLast} />
            </div>
            <EmailField value={email} onChange={setEmail} required />
            <PhoneField code={code} phone={phone} onCode={setCode} onPhone={setPhone} required id="app-phone" />
            <div className="field">
              <label className="label" htmlFor="app-cv">
                {t.appCv}
              </label>
              <input
                ref={fileRef}
                id="app-cv"
                type="file"
                accept=".pdf,.doc,.docx,application/pdf"
                onChange={(e) => setCvName(e.target.files?.[0]?.name ?? '')}
                style={{ fontSize: 14 }}
              />
              <span className="muted" style={{ fontSize: 12 }}>
                {t.appCvHint}
              </span>
            </div>
            {error && <p className="field-error">{error}</p>}
            <button className="btn btn-primary" type="submit" disabled={busy}>
              {t.appSend}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
