import { FormEvent, ReactNode, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import { ROUTES } from '../routes'
import {
  JOB_POSTINGS,
  QUALIFICATIONS,
  VISA_STATUSES,
  SALARY_BANDS,
  SALARY_EXPECTATIONS,
  NOTICE_PERIODS,
} from '../data/careers'
import { COUNTRY_NAMES } from '../data/nationalities'
import { submitLead } from '../lib/leads'
import PhoneField, { phoneValid } from '../components/forms/PhoneField'
import { DEFAULT_CODE } from '../data/countries'
import { ArrowLeft, Check, User, Mail, Doc, LinkedIn } from '../components/Icons'
import PageHead from '../components/PageHead'
import './careers-apply.css'

/** Rounded input with a left-aligned icon inside (fix 34 visual direction). */
function IconInput({
  id,
  label,
  icon,
  value,
  onChange,
  type = 'text',
  ...rest
}: {
  id: string
  label: ReactNode
  icon: ReactNode
  value: string
  onChange: (v: string) => void
  type?: string
  [k: string]: unknown
}) {
  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <div className="ai-input">
        <span className="ai-icon" aria-hidden>
          {icon}
        </span>
        <input id={id} className="input" type={type} value={value} onChange={(e) => onChange(e.target.value)} {...rest} />
      </div>
    </div>
  )
}

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
  optionLabel,
}: {
  id: string
  label: ReactNode
  value: string
  onChange: (v: string) => void
  options: readonly string[]
  placeholder: string
  /** Optional label translator; the option's English value is always submitted. */
  optionLabel?: (englishValue: string) => string
}) {
  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <select id={id} className="select" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {optionLabel ? optionLabel(o) : o}
          </option>
        ))}
      </select>
    </div>
  )
}

/** Full-page job application form. Same submission pathway as before (career
 *  lead + notification); the CV file itself is still deferred to the admin
 *  batch (Storage + Edge Function). */
export default function CareersApply() {
  const { t, careerOpt } = useI18n()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const roleId = params.get('role') || 'general'
  const roleTitle = roleId === 'general' ? '' : t[JOB_POSTINGS.find((j) => j.id === roleId)?.titleKey ?? 'jobSampleTitle']

  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState(DEFAULT_CODE)
  const [phone, setPhone] = useState('')
  const [nationality, setNationality] = useState('')
  const [qualification, setQualification] = useState('')
  const [visa, setVisa] = useState('')
  const [curSalary, setCurSalary] = useState('')
  const [expSalary, setExpSalary] = useState('')
  const [notice, setNotice] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [cvName, setCvName] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [sent, setSent] = useState(false)

  const optional = ` (${t.appOptional})`

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    // Required: name, email, phone, nationality, qualification, visa, salary
    // expectations, CV. (Current salary, notice period, LinkedIn are optional.)
    if (
      !first.trim() ||
      !last.trim() ||
      !email.trim() ||
      !phoneValid(code, phone) ||
      !nationality ||
      !qualification ||
      !visa ||
      !expSalary ||
      !cvName
    ) {
      setError(t.formRequired)
      return
    }
    setError('')
    setBusy(true)
    const details = [
      `Role: ${roleTitle || 'General interest'}`,
      `Nationality: ${nationality}`,
      `Qualification: ${qualification}`,
      `Visa: ${visa}`,
      curSalary && `Current salary: ${curSalary}`,
      `Expected salary: ${expSalary}`,
      notice && `Notice: ${notice}`,
      linkedin && `LinkedIn: ${linkedin}`,
      cvName ? `CV: ${cvName} (file not transmitted — pending Storage)` : 'No CV',
    ].filter(Boolean)
    const ok = await submitLead({
      kind: 'career',
      firstName: first,
      lastName: last,
      email,
      phoneCode: code,
      phone,
      message: `Careers application | ${details.join(' | ')}`,
      meta: { role: roleId, nationality, qualification, visa, curSalary, expSalary, notice, linkedin, cvName: cvName || null },
    })
    setBusy(false)
    if (ok) setSent(true)
    else setError(t.formRequired)
  }

  return (
    <>
      <PageHead title={`${t.jobApplyH}${roleTitle ? ` · ${roleTitle}` : ''}`} description={t.appLead} />

      <section className="section">
        <div className="wrap" style={{ maxWidth: 780 }}>
          <Link to={ROUTES.careers} className="row muted" style={{ gap: 8, fontSize: 13.5, marginBottom: 22 }}>
            <ArrowLeft size={15} />
            {t.appBack}
          </Link>

          <p className="kicker">{t.jobApplyH}</p>
          <h1 className="h2">{roleTitle || t.navCareers}</h1>
          <p className="lede" style={{ marginTop: 14, maxWidth: '52ch' }}>
            {t.appLead}
          </p>

          {sent ? (
            <div className="card apply-card" style={{ marginTop: 28, alignItems: 'center', textAlign: 'center', gap: 12 }}>
              <p className="row" style={{ gap: 8, margin: 0, fontFamily: 'var(--serif)', fontSize: 22, color: 'var(--gold)' }}>
                <Check size={20} />
                {t.appSentH}
              </p>
              <p className="muted" style={{ margin: 0, maxWidth: '46ch' }}>
                {t.appSentP}
              </p>
              <button className="btn btn-outline btn-inline" style={{ marginTop: 6 }} onClick={() => navigate(ROUTES.careers)}>
                {t.appBack}
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="apply-card card" style={{ marginTop: 28 }}>
              {/* Section: Personal information */}
              <div className="apply-sec-head">
                <span className="apply-badge" aria-hidden>
                  <User size={16} />
                </span>
                <h2 className="h3" style={{ fontSize: 18 }}>
                  {t.appSecPersonal}
                </h2>
              </div>
              <div className="apply-grid">
                <IconInput id="ap-first" label={t.formFirst} icon={<User size={15} />} value={first} onChange={setFirst} autoComplete="given-name" />
                <IconInput id="ap-last" label={t.formLast} icon={<User size={15} />} value={last} onChange={setLast} autoComplete="family-name" />
                <IconInput id="ap-email" label={t.appEmail} icon={<Mail size={15} />} value={email} onChange={setEmail} type="email" autoComplete="email" dir="ltr" />
                <PhoneField code={code} phone={phone} onCode={setCode} onPhone={setPhone} required id="ap-phone" />
                <SelectField id="ap-nat" label={t.appNationality} value={nationality} onChange={setNationality} options={COUNTRY_NAMES} placeholder={t.appSelect} />
              </div>

              {/* Section: Application details */}
              <div className="apply-sec-head" style={{ marginTop: 26 }}>
                <span className="apply-badge" aria-hidden>
                  <Doc size={16} />
                </span>
                <h2 className="h3" style={{ fontSize: 18 }}>
                  {t.appSecDetails}
                </h2>
              </div>
              <div className="apply-grid">
                <SelectField id="ap-qual" label={t.appQualification} value={qualification} onChange={setQualification} options={QUALIFICATIONS} placeholder={t.appSelect} optionLabel={careerOpt} />
                <SelectField id="ap-visa" label={t.appVisa} value={visa} onChange={setVisa} options={VISA_STATUSES} placeholder={t.appSelect} optionLabel={careerOpt} />
                <SelectField id="ap-cursal" label={`${t.appCurrentSalary}${optional}`} value={curSalary} onChange={setCurSalary} options={SALARY_BANDS} placeholder={t.appSelect} optionLabel={careerOpt} />
                <SelectField id="ap-expsal" label={t.appSalaryExpect} value={expSalary} onChange={setExpSalary} options={SALARY_EXPECTATIONS} placeholder={t.appSelect} optionLabel={careerOpt} />
                <SelectField id="ap-notice" label={`${t.appNotice}${optional}`} value={notice} onChange={setNotice} options={NOTICE_PERIODS} placeholder={t.appSelect} optionLabel={careerOpt} />
                <IconInput id="ap-li" label={`${t.appLinkedIn}${optional}`} icon={<LinkedIn size={15} />} value={linkedin} onChange={setLinkedin} type="url" dir="ltr" placeholder="https://" />
                <div className="field apply-cv">
                  <label className="label" htmlFor="ap-cv">{t.appCv}</label>
                  <div className="ai-input">
                    <span className="ai-icon" aria-hidden>
                      <Doc size={15} />
                    </span>
                    <input id="ap-cv" type="file" accept=".pdf,.doc,.docx,application/pdf" onChange={(e) => setCvName(e.target.files?.[0]?.name ?? '')} />
                  </div>
                  <span className="muted" style={{ fontSize: 12 }}>{t.appCvHint}</span>
                </div>
              </div>

              {error && <p className="field-error" style={{ marginTop: 16 }}>{error}</p>}
              <div className="stack" style={{ gap: 6, marginTop: 22 }}>
                <button className="btn btn-primary" type="submit" disabled={busy}>
                  {t.appSend}
                </button>
                <span className="muted" style={{ fontSize: 12, textAlign: 'center' }}>{t.appSendSub}</span>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
