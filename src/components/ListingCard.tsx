import { Link } from 'react-router-dom'
import type { Listing } from '../data/listings'
import { ROUTES } from '../routes'
import { useI18n } from '../i18n/I18nProvider'
import { fmtPrice, fmtSqft } from '../lib/format'
import { byId } from '../data/team'
import { waLink, telLink, mailLink } from '../data/company'
import { Bed, Bath, Area, Pin, Phone, Mail, WhatsApp } from './Icons'

export default function ListingCard({ listing }: { listing: Listing }) {
  const { t, tListing } = useI18n()
  // Translated copy for display; the original slug/price/agent stay canonical.
  const l = tListing(listing)
  const agent = byId(listing.agent)
  const url = ROUTES.property(listing.slug)

  const enquiry = `Hello Crest Range, I'd like details on "${listing.title}" (${listing.addr}).`

  return (
    <article className="card">
      <Link to={url} className="card-media" aria-label={l.title}>
        <img src={listing.photo} alt={l.title} loading="lazy" width={800} height={600} />
        <img className="watermark" src="/images/logo-mark-light.png" alt="" aria-hidden />
        <span className="tag">{listing.purpose === 'rent' ? t.tagRent : t.tagSell}</span>
      </Link>

      <div className="stack" style={{ padding: 16, gap: 10, flex: 1 }}>
        <Link to={url} style={{ color: 'var(--ink)' }}>
          <h3 className="h3" style={{ fontSize: 19 }}>
            {l.title}
          </h3>
        </Link>

        <div className="row muted" style={{ gap: 6, fontSize: 13.5 }}>
          <Pin size={14} />
          <span>{l.area}</span>
        </div>

        {/* Commercial units have no bed/bath count - show only what applies. */}
        <div className="row muted" style={{ gap: 16, fontSize: 13.5 }}>
          {listing.beds > 0 && (
            <span className="row" style={{ gap: 6 }}>
              <Bed size={15} /> {listing.beds}
            </span>
          )}
          {listing.baths > 0 && (
            <span className="row" style={{ gap: 6 }}>
              <Bath size={15} /> {listing.baths}
            </span>
          )}
          <span className="row" style={{ gap: 6 }}>
            <Area size={15} /> {fmtSqft(listing.sqft)}
          </span>
        </div>

        <div style={{ fontFamily: 'var(--serif)', fontSize: 21, marginTop: 'auto', paddingTop: 8 }}>
          {fmtPrice(listing)}
        </div>

        <div className="row" style={{ gap: 8, justifyContent: 'space-between' }}>
          <div className="icon-row">
            <a className="icon-btn" href={telLink(agent.phone)} aria-label={`${t.callBtn} ${agent.name}`} title={t.callBtn}>
              <Phone size={16} />
            </a>
            <a className="icon-btn" href={mailLink(listing.title)} aria-label={`${t.emailBtn} ${agent.name}`} title={t.emailBtn}>
              <Mail size={16} />
            </a>
            <a
              className="icon-btn"
              href={waLink(enquiry)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.whatsBtn} ${agent.name}`}
              title={t.whatsBtn}
            >
              <WhatsApp size={16} />
            </a>
          </div>
          <a className="btn btn-wa btn-inline" href={waLink(enquiry)} target="_blank" rel="noopener noreferrer" style={{ padding: '10px 14px' }}>
            <WhatsApp size={14} />
            {t.whatsBtn}
          </a>
        </div>
      </div>
    </article>
  )
}
