import { FormEvent, useState } from 'react'
import { useI18n } from '../i18n/I18nProvider'
import { useChat } from '../components/chat/ChatProvider'
import { COMMUNITIES } from '../data/listings'
import { TESTIMONIALS } from '../data/content'
import Carousel from '../components/Carousel'
import { NameFields } from '../components/forms/Fields'
import PhoneField, { phoneValid } from '../components/forms/PhoneField'
import { DEFAULT_CODE } from '../data/countries'
import { submitLead } from '../lib/leads'
import { COMPANY, waLink, telLink } from '../data/company'
import { Check, Phone, WhatsApp, Chat } from '../components/Icons'
import PageHead from '../components/PageHead'

/** Indicative AED/sqft by community, used for the instant valuation range.
 *  Deliberately returns a RANGE, never a single number presented as a quote. */
const PSF: Record<string, number> = {
  'Saadiyat Island': 2450,
  'Yas Island': 1580,
  'Al Reem Island': 1420,
  'Al Raha Beach': 1350,
  Corniche: 1900,
  'Al Maryah Island': 2100,
  'Al Zahiya': 1250,
  'Khalifa City': 980,
}
const SQFT_BY_BEDS: Record<string, number> = { '1': 780, '2': 1350, '3': 2100, '4': 3200, '5': 5200 }

export default function Sell() {
  const { t, area } = useI18n()
  const { open: openChat } = useChat()

  const [community, setCommunity] = useState('Saadiyat Island')
  const [beds, setBeds] = useState('3')
  const [estimate, setEstimate] = useState<[number, number] | null>(null)

  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [code, setCode] = useState(DEFAULT_CODE)
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const reveal = () => {
    const psf = PSF[community] ?? 1400
    const sqft = SQFT_BY_BEDS[beds] ?? 1500
    const mid = psf * sqft
    setEstimate([Math.round(mid * 0.93), Math.round(mid * 1.07)])
  }

  const onRequestCall = async (e: FormEvent) => {
    e.preventDefault()
    if (!first.trim() || !last.trim() || !phoneValid(code, phone)) {
      setError(t.formRequired)
      return
    }
    setError('')
    const ok = await submitLead({
      kind: 'valuation',
      firstName: first,
      lastName: last,
      phoneCode: code,
      phone,
      message: `Valuation request: ${beds} bed in ${community}`,
      meta: { community, beds, estimate },
    })
    if (ok) setSent(true)
  }

  const steps = [
    [t.sellStep1, t.sellStep1D],
    [t.sellStep2, t.sellStep2D],
    [t.sellStep3, t.sellStep3D],
    [t.sellStep4, t.sellStep4D],
  ]

  return (
    <>
      <PageHead title={t.navSell} description={t.sellIntro} />

      <section className="section">
        <div className="wrap">
          <p className="kicker">{t.sellKicker}</p>
          <h1 className="h2" style={{ maxWidth: '18ch' }}>
            {t.sellH}
          </h1>
          <p className="lede" style={{ marginTop: 16 }}>
            {t.sellIntro}
          </p>
        </div>
      </section>

      {/* Instant valuation */}
      <section className="section" style={{ background: 'var(--surface)', borderBlock: '1px solid var(--line)', paddingTop: 0 }}>
        <div className="wrap">
          <div className="card" style={{ padding: 'clamp(22px,3.4vw,40px)', marginTop: -1 }}>
            <h2 className="h3">{t.valPanelH}</h2>
            <p className="muted" style={{ marginTop: 8, maxWidth: '58ch' }}>
              {t.valPanelP}
            </p>

            <div className="form-grid" style={{ marginTop: 22 }}>
              <div className="field">
                <label className="label" htmlFor="v-community">
                  {t.fCommunity}
                </label>
                <select id="v-community" className="select" value={community} onChange={(e) => { setCommunity(e.target.value); setEstimate(null) }}>
                  {COMMUNITIES.map((c) => (
                    <option key={c} value={c}>
                      {area(c)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label className="label" htmlFor="v-beds">
                  {t.fBeds}
                </label>
                <select id="v-beds" className="select" value={beds} onChange={(e) => { setBeds(e.target.value); setEstimate(null) }}>
                  {['1', '2', '3', '4', '5'].map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {!estimate ? (
              <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={reveal}>
                {t.valBtn}
              </button>
            ) : (
              <div style={{ marginTop: 24, borderTop: '1px solid var(--line)', paddingTop: 22 }}>
                <p className="label" style={{ margin: 0 }}>
                  {t.valEstToday}
                </p>
                <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(26px,4vw,40px)', margin: '8px 0 0' }} dir="ltr">
                  AED {estimate[0].toLocaleString('en-US')} – {estimate[1].toLocaleString('en-US')}
                </p>

                <div style={{ marginTop: 26 }}>
                  <h3 className="h3" style={{ fontSize: 19 }}>
                    {t.valWant}
                  </h3>
                  {sent ? (
                    <p className="row" style={{ gap: 8, color: 'var(--gold)', marginTop: 12 }}>
                      <Check size={17} />
                      {t.formSentP}
                    </p>
                  ) : (
                    <form className="stack" style={{ gap: 14, marginTop: 14, maxWidth: 520 }} onSubmit={onRequestCall}>
                      <div className="form-grid">
                        <NameFields first={first} last={last} onFirst={setFirst} onLast={setLast} />
                      </div>
                      <PhoneField code={code} phone={phone} onCode={setCode} onPhone={setPhone} required />
                      {error && <p className="field-error">{error}</p>}
                      <button className="btn btn-primary" type="submit">
                        {t.reqCall}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="kicker">{t.sellHowK}</p>
              <h2 className="h2">{t.sellHowH}</h2>
            </div>
          </div>
          <div className="grid grid-4">
            {steps.map(([name, desc], i) => (
              <div key={name}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 40, color: 'var(--gold)', lineHeight: 1 }}>
                  0{i + 1}
                </div>
                <h3 className="h3" style={{ fontSize: 19, marginTop: 10 }}>
                  {name}
                </h3>
                <p className="muted" style={{ fontSize: 14.5, marginTop: 8 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why + testimonials */}
      <section className="section" style={{ background: 'var(--surface)', borderBlock: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="kicker">{t.sellWhyK}</p>
              <h2 className="h2">{t.sellWhyH}</h2>
              <p className="lede" style={{ marginTop: 12 }}>
                {t.sellWhyP}
              </p>
            </div>
          </div>
          <Carousel intervalMs={9000} visible={2} label={t.sellTestiH}>
            {TESTIMONIALS.map((raw, i) => (
              <blockquote key={raw.who} className="card" style={{ padding: 26, margin: 0, gap: 16, justifyContent: 'space-between' }}>
                <p style={{ fontFamily: 'var(--serif)', fontSize: 18, lineHeight: 1.5, margin: 0 }}>“{raw.q}”</p>
                <footer style={{ fontSize: 13.5 }}>
                  <strong>{raw.who}</strong>
                  <div className="muted">{raw.role}</div>
                </footer>
              </blockquote>
            ))}
          </Carousel>
        </div>
      </section>

      <section className="section dark">
        <div className="wrap stack" style={{ gap: 16, alignItems: 'flex-start' }}>
          <h2 className="h2" style={{ color: '#fff' }}>
            {t.sellCtaH}
          </h2>
          <p className="muted" style={{ maxWidth: '52ch', margin: 0 }}>
            {t.sellCtaP}
          </p>
          <div className="row" style={{ gap: 10, marginTop: 10 }}>
            <button className="btn btn-gold btn-inline" onClick={openChat}>
              <Chat size={15} />
              {t.sCtaChat}
            </button>
            <a className="btn btn-wa on-dark btn-inline" href={waLink('Hello Crest Range, I would like a valuation.')} target="_blank" rel="noopener noreferrer">
              <WhatsApp size={15} />
              {t.whatsBtn}
            </a>
            <a className="btn btn-wa on-dark btn-inline" href={telLink(COMPANY.phones[0].tel)}>
              <Phone size={15} />
              {t.callBtn}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
