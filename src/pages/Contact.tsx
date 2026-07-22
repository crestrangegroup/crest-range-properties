import { FormEvent, useState } from 'react'
import { useI18n } from '../i18n/I18nProvider'
import { COMPANY, waLink, telLink, mailLink } from '../data/company'
import { NameFields, EmailField } from '../components/forms/Fields'
import PhoneField, { phoneValid } from '../components/forms/PhoneField'
import { DEFAULT_CODE } from '../data/countries'
import { submitLead } from '../lib/leads'
import { Phone, Mail, WhatsApp, Check } from '../components/Icons'
import PageHead from '../components/PageHead'

export default function Contact() {
  const { t, addressLines, hoursLines } = useI18n()
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState(DEFAULT_CODE)
  const [phone, setPhone] = useState('')
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
      kind: 'contact',
      firstName: first,
      lastName: last,
      email,
      phoneCode: code,
      phone,
      message,
    })
    setBusy(false)
    if (ok) setSent(true)
    else setError(t.formRequired)
  }

  return (
    <>
      <PageHead title={t.navContact} description={COMPANY.addressLines.join(', ')} />

      <section className="section">
        <div className="wrap">
          <p className="kicker">{t.navContact}</p>
          <h1 className="h2">{t.contactH}</h1>

          <div className="split split-form" style={{ marginTop: 34 }}>
            <div className="stack" style={{ gap: 26 }}>
              <div>
                <h2 className="label" style={{ fontFamily: 'var(--sans)' }}>
                  {t.addrH}
                </h2>
                {/* Separate lines, never run together. */}
                <address style={{ fontStyle: 'normal', lineHeight: 1.8, marginTop: 8 }}>
                  {addressLines.map((l) => (
                    <div key={l}>{l}</div>
                  ))}
                </address>
              </div>

              <div>
                <h2 className="label" style={{ fontFamily: 'var(--sans)' }}>
                  {t.phoneH}
                </h2>
                <div className="stack" style={{ gap: 4, marginTop: 8 }}>
                  {COMPANY.phones.map((p) => (
                    <a key={p.tel} href={telLink(p.tel)} style={{ color: 'var(--ink)' }}>
                      {p.display}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="label" style={{ fontFamily: 'var(--sans)' }}>
                  {t.emailH}
                </h2>
                <a href={mailLink()} style={{ color: 'var(--ink)', display: 'inline-block', marginTop: 8 }}>
                  {COMPANY.email}
                </a>
              </div>

              <div>
                <h2 className="label" style={{ fontFamily: 'var(--sans)' }}>
                  {t.hoursH}
                </h2>
                <div style={{ lineHeight: 1.8, marginTop: 8 }}>
                  {hoursLines.map((l) => (
                    <div key={l}>{l}</div>
                  ))}
                </div>
              </div>

              <div className="row" style={{ gap: 10 }}>
                <a className="btn btn-outline btn-inline" href={telLink(COMPANY.phones[0].tel)}>
                  <Phone size={15} />
                  {t.callBtn}
                </a>
                <a className="btn btn-outline btn-inline" href={mailLink()}>
                  <Mail size={15} />
                  {t.emailBtn}
                </a>
                <a className="btn btn-wa btn-inline" href={waLink()} target="_blank" rel="noopener noreferrer">
                  <WhatsApp size={15} />
                  {t.whatsBtn}
                </a>
              </div>
            </div>

            <div>
              {sent ? (
                <div className="form-sent stack" style={{ gap: 10 }}>
                  <p className="row" style={{ gap: 8, margin: 0, fontFamily: 'var(--serif)', fontSize: 21 }}>
                    <Check size={18} />
                    {t.formSentH}
                  </p>
                  <p className="muted" style={{ margin: 0 }}>
                    {t.formSentP}
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="stack" style={{ gap: 16 }}>
                  <div className="form-grid">
                    <NameFields first={first} last={last} onFirst={setFirst} onLast={setLast} />
                  </div>
                  <EmailField value={email} onChange={setEmail} required />
                  <PhoneField code={code} phone={phone} onCode={setCode} onPhone={setPhone} required />
                  <div className="field">
                    <label className="label" htmlFor="msg">
                      {t.formMsg}
                    </label>
                    <textarea id="msg" className="textarea" value={message} onChange={(e) => setMessage(e.target.value)} />
                  </div>
                  {error && <p className="field-error">{error}</p>}
                  <button className="btn btn-primary" type="submit" disabled={busy}>
                    {t.formSend}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Preview fix 8: center and zoom on the office (Zig Zag Towers) with a
          marker, rather than a wide city view. output=embed drops a pin on the
          geocoded query; the specific building name + z=17 keeps it tight. */}
      <section aria-label={t.addrH} style={{ height: 'clamp(280px,42vw,440px)' }}>
        <iframe
          title={`${COMPANY.name} on Google Maps`}
          src={`https://www.google.com/maps?q=${encodeURIComponent(COMPANY.mapQuery)}&z=17&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ border: 0, width: '100%', height: '100%', display: 'block' }}
        />
      </section>
    </>
  )
}
