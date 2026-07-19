import { FormEvent, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import { useListings } from '../lib/ListingsProvider'
import { byId } from '../data/team'
import { ROUTES } from '../routes'
import { fmtPrice, fmtSqft } from '../lib/format'
import { COMPANY, waLink, telLink, mailLink } from '../data/company'
import ListingCard from '../components/ListingCard'
import Barcode from '../components/Barcode'
import PageHead from '../components/PageHead'
import { NameFields } from '../components/forms/Fields'
import { DateField } from '../components/forms/Fields'
import PhoneField, { phoneValid } from '../components/forms/PhoneField'
import { DEFAULT_CODE } from '../data/countries'
import { submitLead } from '../lib/leads'
import { ArrowLeft, Bed, Bath, Area, Pin, Phone, Mail, WhatsApp, Check } from '../components/Icons'
import NotFound from './NotFound'

export default function PropertyDetail() {
  const { slug } = useParams()
  const { t, tListing, role } = useI18n()

  const { listings, loading } = useListings()
  const listing = listings.find((l) => l.slug === slug)

  // Hooks must run before any early return, so all state is declared up front.
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [code, setCode] = useState(DEFAULT_CODE)
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState('')
  const [error, setError] = useState('')
  const [booked, setBooked] = useState(false)

  const [mPrice, setMPrice] = useState(listing?.price ?? 2_400_000)
  const [mDown, setMDown] = useState(20)
  const [mYears, setMYears] = useState(25)
  const [mRate, setMRate] = useState(3.99)

  const monthly = useMemo(() => {
    const loan = mPrice * (1 - mDown / 100)
    const r = mRate / 100 / 12
    const n = mYears * 12
    if (r === 0) return loan / n
    return (loan * r) / (1 - Math.pow(1 + r, -n))
  }, [mPrice, mDown, mYears, mRate])

  const related = useMemo(
    () =>
      listing
        ? listings
            .filter((l) => l.slug !== listing.slug && l.area === listing.area)
            .concat(listings.filter((l) => l.slug !== listing.slug && l.area !== listing.area))
            .slice(0, 3)
        : [],
    [listings, listing],
  )

  // Don't flash "not found" while live listings are still arriving.
  if (!listing) return loading ? null : <NotFound />

  const l = tListing(listing)
  const agent = byId(listing.agent)
  const enquiry = `Hello Crest Range, I'd like details on "${listing.title}" (${listing.addr}).`

  const onBook = async (e: FormEvent) => {
    e.preventDefault()
    if (!first.trim() || !last.trim() || !phoneValid(code, phone)) {
      setError(t.formRequired)
      return
    }
    setError('')
    const ok = await submitLead({
      kind: 'viewing',
      firstName: first,
      lastName: last,
      phoneCode: code,
      phone,
      preferredDate: date,
      listingSlug: listing.slug,
      message: `Viewing request for ${listing.title}`,
    })
    if (ok) setBooked(true)
  }

  return (
    <>
      <PageHead title={l.title} description={l.desc.slice(0, 155)} />

      <section className="section" style={{ paddingBottom: 24 }}>
        <div className="wrap">
          <Link to={ROUTES.listings} className="row" style={{ gap: 7, color: 'var(--ink-mute)', fontSize: 13.5 }}>
            <ArrowLeft size={15} />
            {t.back}
          </Link>

          <h1 className="h2" style={{ marginTop: 18 }}>
            {l.title}
          </h1>
          <p className="row muted" style={{ gap: 7, marginTop: 10 }}>
            <Pin size={15} />
            {l.addr}
          </p>
        </div>
      </section>

      {/* Gallery: one large frame plus two supporting shots. */}
      <section className="wrap">
        <div className="split split-gallery">
          <div className="card-media" style={{ aspectRatio: '16 / 11', borderRadius: 'var(--radius)' }}>
            <img src={listing.photo} alt={l.title} width={1200} height={825} />
            <img className="watermark" src="/images/logo-mark-light.png" alt="" aria-hidden style={{ width: 110 }} />
            <span className="tag">{listing.purpose === 'rent' ? t.tagRent : t.tagSell}</span>
          </div>
          <div className="grid" style={{ gridTemplateColumns: 'minmax(0,1fr)', gap: 12 }}>
            {listing.gallery.map((g, i) => (
              <div key={g} className="card-media" style={{ aspectRatio: '16 / 10', borderRadius: 'var(--radius)' }}>
                <img src={g} alt={`${l.title} ${i + 2}`} loading="lazy" />
                <img className="watermark" src="/images/logo-mark-light.png" alt="" aria-hidden style={{ width: 64 }} />
              </div>
            ))}
          </div>
        </div>
        <p className="muted" style={{ marginTop: 14, fontSize: 14 }}>
          {l.highlight}
        </p>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="split split-sidebar">
            <div className="stack" style={{ gap: 34 }}>
              <div>
                <div className="row" style={{ gap: 26, paddingBottom: 20, borderBottom: '1px solid var(--line)' }}>
                  {listing.beds > 0 && (
                    <span className="row" style={{ gap: 8 }}>
                      <Bed size={17} /> {listing.beds}
                    </span>
                  )}
                  {listing.baths > 0 && (
                    <span className="row" style={{ gap: 8 }}>
                      <Bath size={17} /> {listing.baths}
                    </span>
                  )}
                  <span className="row" style={{ gap: 8 }}>
                    <Area size={17} /> {fmtSqft(listing.sqft)}
                  </span>
                  <span style={{ fontFamily: 'var(--serif)', fontSize: 26, marginInlineStart: 'auto' }} dir="ltr">
                    {fmtPrice(listing)}
                  </span>
                </div>
              </div>

              <div>
                <h2 className="h3">{t.aboutProp}</h2>
                <p style={{ marginTop: 12 }}>{l.desc}</p>
                <ul className="grid grid-2" style={{ marginTop: 18, paddingInlineStart: 18, gap: 8 }}>
                  {(l.feats as string[]).map((f) => (
                    <li key={f} style={{ fontSize: 15 }}>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="h3">{t.amenitiesH}</h2>
                <ul className="grid grid-2" style={{ marginTop: 12, paddingInlineStart: 18, gap: 8 }}>
                  {(l.amen as string[]).map((a) => (
                    <li key={a} style={{ fontSize: 15 }}>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="h3">{t.primeH}</h2>
                <p style={{ marginTop: 12 }}>{l.prime}</p>
              </div>

              <div style={{ height: 320, borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--line)' }}>
                <iframe
                  title={`${l.title} location`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(listing.mapQ)}&z=15&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0, width: '100%', height: '100%', display: 'block' }}
                />
              </div>

              {/* Mortgage calculator */}
              <div className="card" style={{ padding: 24 }}>
                <h2 className="h3">{t.mortH}</h2>
                <div className="stack" style={{ gap: 16, marginTop: 16 }}>
                  {[
                    { label: t.fPrice, value: mPrice, set: setMPrice, min: 500000, max: 25000000, step: 50000, fmt: (v: number) => `AED ${v.toLocaleString('en-US')}` },
                    { label: t.mDownL, value: mDown, set: setMDown, min: 10, max: 60, step: 5, fmt: (v: number) => `${v}%` },
                    { label: t.mTermL, value: mYears, set: setMYears, min: 5, max: 30, step: 1, fmt: (v: number) => `${v} yrs` },
                    { label: t.mRateL, value: mRate, set: setMRate, min: 2, max: 7, step: 0.05, fmt: (v: number) => `${v.toFixed(2)}%` },
                  ].map((f) => (
                    <div key={f.label} className="field">
                      <div className="row" style={{ justifyContent: 'space-between' }}>
                        <span className="label">{f.label}</span>
                        <span style={{ fontSize: 14 }} dir="ltr">
                          {f.fmt(f.value)}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={f.min}
                        max={f.max}
                        step={f.step}
                        value={f.value}
                        onChange={(e) => f.set(Number(e.target.value))}
                        style={{ accentColor: 'var(--ink)', width: '100%' }}
                        aria-label={f.label}
                      />
                    </div>
                  ))}
                  <div style={{ borderTop: '1px solid var(--line)', paddingTop: 16 }}>
                    <span className="label">{t.monthly}</span>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: 30, marginTop: 6 }} dir="ltr">
                      AED {Math.round(monthly).toLocaleString('en-US')}
                    </div>
                    <p className="muted" style={{ fontSize: 12.5, marginTop: 6 }}>
                      {t.ratesNote}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="stack" style={{ gap: 20, position: 'sticky', top: 'calc(var(--header-h) + 16px)' }}>
              <div className="card" style={{ padding: 22 }}>
                <h2 className="h3" style={{ fontSize: 19 }}>
                  {t.reachAgent}
                </h2>
                <div className="row" style={{ gap: 13, marginTop: 16 }}>
                  <img
                    src={agent.photo}
                    alt={agent.name}
                    width={62}
                    height={62}
                    style={{ width: 62, height: 62, borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <strong style={{ fontSize: 15 }}>{agent.name}</strong>
                    <div className="muted" style={{ fontSize: 13 }}>
                      {role(agent.id)}
                    </div>
                  </div>
                </div>
                {/* Order is Email, Call, WhatsApp. */}
                <div className="stack" style={{ gap: 8, marginTop: 18 }}>
                  <a className="btn btn-outline" href={mailLink(listing.title)}>
                    <Mail size={15} />
                    {t.emailBtn}
                  </a>
                  <a className="btn btn-outline" href={telLink(agent.phone)}>
                    <Phone size={15} />
                    {t.callBtn}
                  </a>
                  <a className="btn btn-wa" href={waLink(enquiry)} target="_blank" rel="noopener noreferrer">
                    <WhatsApp size={15} />
                    {t.whatsBtn}
                  </a>
                </div>
              </div>

              <div className="card" style={{ padding: 22 }}>
                <h2 className="h3" style={{ fontSize: 19 }}>
                  {t.bookH}
                </h2>
                <p className="muted" style={{ fontSize: 13.5, marginTop: 6 }}>
                  {t.bookSub}
                </p>
                {booked ? (
                  <div className="stack" style={{ gap: 8, marginTop: 16 }}>
                    <p className="row" style={{ gap: 8, margin: 0, color: 'var(--gold)' }}>
                      <Check size={17} />
                      {t.bookedH}
                    </p>
                    <p className="muted" style={{ margin: 0, fontSize: 13.5 }}>
                      {t.bookedP}
                    </p>
                  </div>
                ) : (
                  <form className="stack" style={{ gap: 13, marginTop: 16 }} onSubmit={onBook}>
                    <NameFields first={first} last={last} onFirst={setFirst} onLast={setLast} />
                    <PhoneField code={code} phone={phone} onCode={setCode} onPhone={setPhone} required id="book-phone" />
                    <DateField value={date} onChange={setDate} id="book-date" />
                    {error && <p className="field-error">{error}</p>}
                    <button className="btn btn-primary" type="submit">
                      {t.bookBtn}
                    </button>
                  </form>
                )}
              </div>

              <div className="card" style={{ padding: 20 }}>
                <h2 className="label" style={{ fontFamily: 'var(--sans)' }}>
                  {t.verifiedH}
                </h2>
                <p className="muted" style={{ fontSize: 13, marginTop: 8 }}>
                  {t.verifiedP}
                </p>
                {/* Placeholder barcode - decorative, not scannable. See Barcode.tsx. */}
                <div
                  style={{
                    marginTop: 14,
                    padding: '8px 10px',
                    background: '#fff',
                    border: '1px solid var(--line-strong)',
                    borderRadius: 'var(--radius)',
                  }}
                >
                  <Barcode value={listing.permit} height={46} />
                </div>
                <p style={{ fontSize: 13, marginTop: 10 }}>
                  {t.permitNo} <span dir="ltr">{listing.permit}</span>
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">{t.relatedH}</h2>
          </div>
          <div className="grid grid-3">
            {related.map((r) => (
              <ListingCard key={r.slug} listing={r} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
