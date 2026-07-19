import { useEffect, useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import { ROUTES } from '../routes'
import { COMMUNITIES, PROPERTY_TYPES } from '../data/listings'
import { useListings } from '../lib/ListingsProvider'
import { HOODS, ARTICLES, HERO_IMAGES, STATS } from '../data/content'
import ListingCard from '../components/ListingCard'
import Carousel from '../components/Carousel'
import { subscribeNewsletter } from '../lib/leads'
import { Check } from '../components/Icons'
import './home.css'

/** Featured listings rotate briskly; market insights noticeably slower. */
const LISTINGS_INTERVAL = 4500
const INSIGHTS_INTERVAL = 11000
const HERO_INTERVAL = 7000

export default function Home() {
  const { t, tHood, tArticle, area } = useI18n()
  const navigate = useNavigate()
  const [heroIdx, setHeroIdx] = useState(0)
  const { listings } = useListings()

  const [community, setCommunity] = useState('')
  const [type, setType] = useState('')
  const [beds, setBeds] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    const id = window.setInterval(() => setHeroIdx((i) => (i + 1) % HERO_IMAGES.length), HERO_INTERVAL)
    return () => clearInterval(id)
  }, [])

  const onSearch = (e: FormEvent) => {
    e.preventDefault()
    // The search simply composes a URL - the Listings page owns the filtering,
    // so the result is a real, shareable, refreshable address.
    const q = new URLSearchParams()
    if (community) q.set('community', community)
    if (type) q.set('type', type)
    if (beds) q.set('beds', beds)
    if (maxPrice) q.set('maxPrice', maxPrice)
    navigate(`${ROUTES.listings}${q.toString() ? `?${q}` : ''}`)
  }

  const onSubscribe = async (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    await subscribeNewsletter(email.trim())
    setSubscribed(true)
    setEmail('')
  }

  const featured = listings.slice(0, 6)

  return (
    <>
      {/* 1 - Hero + search */}
      <section className="hero">
        {HERO_IMAGES.map((img, i) => (
          <img
            key={img.src}
            className={`hero-img${i === heroIdx ? ' on' : ''}`}
            src={img.src}
            alt=""
            style={{ objectPosition: (img as any).pos || 'center' }}
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchPriority={i === 0 ? 'high' : 'low'}
          />
        ))}
        <div className="hero-body">
          <div className="wrap">
            <p className="kicker" style={{ color: 'var(--gold-bright)' }}>
              {t.heroK}
            </p>
            <h1 className="h1">{t.heroH}</h1>
            <p>{t.heroP}</p>

            <form className="search-bar" onSubmit={onSearch}>
              <div className="field">
                <label className="label" htmlFor="f-community">
                  {t.fCommunity}
                </label>
                <select id="f-community" className="select" value={community} onChange={(e) => setCommunity(e.target.value)}>
                  <option value="">{t.allPill}</option>
                  {COMMUNITIES.map((c) => (
                    <option key={c} value={c}>
                      {area(c)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label className="label" htmlFor="f-type">
                  {t.fType}
                </label>
                <select id="f-type" className="select" value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="">{t.allPill}</option>
                  {PROPERTY_TYPES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label className="label" htmlFor="f-beds">
                  {t.fBeds}
                </label>
                <select id="f-beds" className="select" value={beds} onChange={(e) => setBeds(e.target.value)}>
                  <option value="">{t.allPill}</option>
                  {['1', '2', '3', '4', '5'].map((b) => (
                    <option key={b} value={b}>
                      {b}+
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label className="label" htmlFor="f-price">
                  {t.fPrice}
                </label>
                <input
                  id="f-price"
                  className="input"
                  inputMode="numeric"
                  placeholder="AED"
                  value={maxPrice}
                  dir="ltr"
                  onChange={(e) => setMaxPrice(e.target.value.replace(/\D/g, ''))}
                />
              </div>
              <button className="btn btn-primary search-submit" type="submit" style={{ minHeight: 45 }}>
                {t.searchBtn}
              </button>
            </form>
          </div>
        </div>
        <span className="hero-caption">{HERO_IMAGES[heroIdx].label}</span>
      </section>

      {/* 2 - Trust stats */}
      <section className="stats" aria-label={t.statHomes}>
        {STATS.map((s) => (
          <div key={s.key}>
            <div className="v">{s.value}</div>
            <div className="k">{t[s.key]}</div>
          </div>
        ))}
      </section>

      {/* 3 - Featured listings carousel */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="kicker">{t.featuredK}</p>
              <h2 className="h2">{t.featuredH}</h2>
            </div>
            <Link className="btn btn-outline btn-inline" to={ROUTES.listings}>
              {t.viewAll}
            </Link>
          </div>
          <Carousel intervalMs={LISTINGS_INTERVAL} visible={3} label={t.featuredH}>
            {featured.map((l) => (
              <ListingCard key={l.slug} listing={l} />
            ))}
          </Carousel>
        </div>
      </section>

      {/* 4 - Neighbourhood guides */}
      <section className="section" style={{ background: 'var(--surface)', borderBlock: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="kicker">{t.hoodsK}</p>
              <h2 className="h2">{t.hoodsH}</h2>
            </div>
          </div>
          <div className="grid grid-4">
            {HOODS.map((raw) => {
              const h = tHood(raw)
              return (
                /* Not a link: no dedicated guide page exists yet. The "Guide"
                   label below is purely visual. */
                <div key={raw.slug} className="hood">
                  <img src={raw.photo} alt={h.name} loading="lazy" />
                  <span className="cap">
                    <h3>{h.name}</h3>
                    <p>{h.blurb}</p>
                    <span className="hood-guide" aria-hidden>
                      {t.guide} <span aria-hidden>→</span>
                    </span>
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5 - Market insights carousel */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="kicker">{t.insightsK}</p>
              <h2 className="h2">{t.insightsH}</h2>
            </div>
          </div>
          <Carousel intervalMs={INSIGHTS_INTERVAL} visible={3} label={t.insightsH}>
            {ARTICLES.map((raw) => {
              const a = tArticle(raw)
              return (
                <article key={raw.slug} className="card">
                  <div className="card-media" style={{ aspectRatio: '16 / 10' }}>
                    <img src={raw.photo} alt={a.title} loading="lazy" />
                  </div>
                  <div className="stack" style={{ padding: 16, gap: 8 }}>
                    <span className="kicker" style={{ margin: 0 }}>
                      {a.tag}
                    </span>
                    <h3 className="h3" style={{ fontSize: 18 }}>
                      {a.title}
                    </h3>
                    <span className="muted" style={{ fontSize: 13 }}>
                      {raw.date} · {raw.read}
                    </span>
                  </div>
                </article>
              )
            })}
          </Carousel>
        </div>
      </section>

      {/* 6 - Newsletter */}
      <section className="dark">
        <div className="wrap news">
          <h2 className="h3" style={{ color: '#fff', margin: 0, maxWidth: '28ch' }}>
            {t.newsH}
          </h2>
          {subscribed ? (
            <p className="row" style={{ color: 'var(--gold-bright)', gap: 8, margin: 0 }}>
              <Check size={17} />
              {t.subscribedMsg}
            </p>
          ) : (
            <form onSubmit={onSubscribe}>
              <input
                className="input"
                type="email"
                required
                dir="ltr"
                aria-label={t.formEmail}
                placeholder={t.formEmail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="btn btn-gold" type="submit">
                {t.subscribe}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
