import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import { COMMUNITIES, PROPERTY_TYPES, Purpose } from '../data/listings'
import { useListings } from '../lib/ListingsProvider'
import ListingCard from '../components/ListingCard'
import PageHead from '../components/PageHead'

interface Props {
  /** Set by the /buy and /rent routes; hides the purpose switch. */
  forcedPurpose?: Purpose
}

export default function Listings({ forcedPurpose }: Props) {
  const { t, area } = useI18n()
  // Filters live in the URL, so a filtered view is shareable and survives a
  // refresh or a back/forward step exactly as the visitor left it.
  const [params, setParams] = useSearchParams()
  const { listings } = useListings()

  const purpose = forcedPurpose ?? (params.get('purpose') as Purpose | null)
  const community = params.get('community') ?? ''
  const type = params.get('type') ?? ''
  const beds = params.get('beds') ?? ''
  const maxPrice = params.get('maxPrice') ?? ''

  const set = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: false })
  }

  const results = useMemo(
    () =>
      listings.filter((l) => {
        if (purpose && l.purpose !== purpose) return false
        if (community && l.area !== community) return false
        if (type && l.type !== type) return false
        if (beds && l.beds < Number(beds)) return false
        if (maxPrice && l.price > Number(maxPrice)) return false
        return true
      }),
    [listings, purpose, community, type, beds, maxPrice],
  )

  const title = forcedPurpose === 'sale' ? t.navBuy : forcedPurpose === 'rent' ? t.navRent : t.listingsH

  return (
    <>
      <PageHead
        title={`${title} · ${t.city}`}
        description={`${results.length} ${t.propsWord} - ${t.listingsH}`}
      />

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <p className="kicker">{t.city}</p>
          <h1 className="h2">{title}</h1>
          <p className="lede" style={{ marginTop: 10 }}>
            {results.length} {t.propsWord} · {t.updatedToday}
          </p>

          <div
            className="grid"
            style={{
              gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))',
              gap: 12,
              marginTop: 26,
              paddingBottom: 26,
              borderBottom: '1px solid var(--line)',
            }}
          >
            {!forcedPurpose && (
              <div className="field">
                <label className="label" htmlFor="p-purpose">
                  {t.navListings}
                </label>
                <select id="p-purpose" className="select" value={purpose ?? ''} onChange={(e) => set('purpose', e.target.value)}>
                  <option value="">{t.allPill}</option>
                  <option value="sale">{t.navBuy}</option>
                  <option value="rent">{t.navRent}</option>
                </select>
              </div>
            )}
            <div className="field">
              <label className="label" htmlFor="p-community">
                {t.fCommunity}
              </label>
              <select id="p-community" className="select" value={community} onChange={(e) => set('community', e.target.value)}>
                <option value="">{t.allPill}</option>
                {COMMUNITIES.map((c) => (
                  <option key={c} value={c}>
                    {area(c)}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label className="label" htmlFor="p-type">
                {t.fType}
              </label>
              <select id="p-type" className="select" value={type} onChange={(e) => set('type', e.target.value)}>
                <option value="">{t.allPill}</option>
                {PROPERTY_TYPES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label className="label" htmlFor="p-beds">
                {t.fBeds}
              </label>
              <select id="p-beds" className="select" value={beds} onChange={(e) => set('beds', e.target.value)}>
                <option value="">{t.allPill}</option>
                {['1', '2', '3', '4', '5'].map((b) => (
                  <option key={b} value={b}>
                    {b}+
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label className="label" htmlFor="p-price">
                {t.fPrice}
              </label>
              <input
                id="p-price"
                className="input"
                inputMode="numeric"
                dir="ltr"
                placeholder="AED"
                value={maxPrice}
                onChange={(e) => set('maxPrice', e.target.value.replace(/\D/g, ''))}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          {results.length ? (
            <div className="grid grid-3">
              {results.map((l) => (
                <ListingCard key={l.slug} listing={l} />
              ))}
            </div>
          ) : (
            <div className="stack" style={{ gap: 16, alignItems: 'flex-start' }}>
              <p className="lede">{t.noResults}</p>
              <button className="btn btn-outline btn-inline" onClick={() => setParams(new URLSearchParams())}>
                {t.clearFilters}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
