import { FormEvent, useState } from 'react'
import { useI18n } from '../i18n/I18nProvider'
import { NameFields, EmailField, PropertyTypeField, DateField } from '../components/forms/Fields'
import PhoneField, { phoneValid } from '../components/forms/PhoneField'
import { DEFAULT_CODE } from '../data/countries'
import { submitLead } from '../lib/leads'
import { Check } from '../components/Icons'
import PageHead from '../components/PageHead'

/** Unlisted page reached from the Services > Property Management CTA. */
export default function Proposal() {
  const { t } = useI18n()
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState(DEFAULT_CODE)
  const [phone, setPhone] = useState('')
  const [type, setType] = useState('Apartment')
  const [other, setOther] = useState('')
  const [date, setDate] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!first.trim() || !last.trim() || !email.trim() || !phoneValid(code, phone)) {
      setError(t.formRequired)
      return
    }
    setError('')
    setBusy(true)
    const ok = await submitLead({
      kind: 'proposal',
      firstName: first,
      lastName: last,
      email,
      phoneCode: code,
      phone,
      propertyType: type,
      propertyOther: other,
      preferredDate: date,
      message,
    })
    setBusy(false)
    if (ok) setSent(true)
    else setError(t.formRequired)
  }

  return (
    <>
      <PageHead title={t.sCtaForm} description={t.propIntro} />

      <section className="section">
        <div className="wrap" style={{ maxWidth: 780 }}>
          <p className="kicker">{t.s3Name}</p>
          <h1 className="h2">{t.sCtaForm}</h1>
          <p className="lede" style={{ marginTop: 14 }}>
            {t.propIntro}
          </p>

          {sent ? (
            <div className="form-sent stack" style={{ gap: 10, marginTop: 30 }}>
              <p className="row" style={{ gap: 8, margin: 0, fontFamily: 'var(--serif)', fontSize: 22 }}>
                <Check size={18} />
                {t.formSentH}
              </p>
              <p className="muted" style={{ margin: 0 }}>
                {t.formSentP}
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="stack" style={{ gap: 16, marginTop: 30 }}>
              <div className="form-grid">
                <NameFields first={first} last={last} onFirst={setFirst} onLast={setLast} />
              </div>
              <div className="form-grid">
                <EmailField value={email} onChange={setEmail} required />
                <PhoneField code={code} phone={phone} onCode={setCode} onPhone={setPhone} required />
              </div>
              <div className="form-grid">
                <PropertyTypeField type={type} other={other} onType={setType} onOther={setOther} />
              </div>
              <DateField value={date} onChange={setDate} />
              <div className="field">
                <label className="label" htmlFor="pm-msg">
                  {t.formMsg}
                </label>
                <textarea id="pm-msg" className="textarea" value={message} onChange={(e) => setMessage(e.target.value)} />
              </div>
              {error && <p className="field-error">{error}</p>}
              <button className="btn btn-primary" type="submit" disabled={busy}>
                {t.formSend}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
