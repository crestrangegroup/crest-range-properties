import { useI18n } from '../i18n/I18nProvider'
import { PARTNERS } from '../data/content'
import Marquee from './Marquee'

/**
 * "Our Partners" logo marquee. Rendered on both the Home and Services pages
 * (preview fix 13) from a single source so the two stay identical. Logos are
 * the official hi-res files supplied by the client.
 */
export default function PartnerMarquee() {
  const { t } = useI18n()
  return (
    <Marquee
      label={t.partnersH}
      durationSec={45}
      className="partners-marquee"
      items={PARTNERS.map((p) => (
        <div className={`partner-item${p.big ? ' partner-big' : ''}`}>
          <img
            src={p.logo}
            alt={p.name}
            loading="lazy"
            onError={(e) => {
              // Never show a broken image: fall back to the partner name.
              const el = e.currentTarget
              el.style.display = 'none'
              const label = el.nextElementSibling as HTMLElement | null
              if (label) label.style.display = 'block'
            }}
          />
          <span className="partner-fallback">{p.name}</span>
        </div>
      ))}
    />
  )
}
