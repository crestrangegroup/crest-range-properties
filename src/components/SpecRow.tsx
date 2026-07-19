import { useI18n } from '../i18n/I18nProvider'
import { Bed, Bath, Area } from './Icons'
import type { Listing } from '../data/listings'

interface Props {
  listing: Pick<Listing, 'beds' | 'baths' | 'sqft'>
  /** Icon size; the label scales with the surrounding font size. */
  size?: number
  gap?: number
  className?: string
  style?: React.CSSProperties
}

/**
 * Bed / bath / area spec row with full text labels, e.g.
 * "4 Bedrooms · 5 Bathrooms · 6,100 Sq Ft".
 *
 * Shared by the listing card and the detail page so the two can never drift.
 * Commercial units have no bed/bath count, so those entries are omitted rather
 * than shown as zero.
 */
export default function SpecRow({ listing, size = 15, gap = 16, className, style }: Props) {
  const { t } = useI18n()

  const items = [
    listing.beds > 0 && {
      key: 'beds',
      icon: <Bed size={size} />,
      text: `${listing.beds} ${listing.beds === 1 ? t.bedroom : t.bedrooms}`,
    },
    listing.baths > 0 && {
      key: 'baths',
      icon: <Bath size={size} />,
      text: `${listing.baths} ${listing.baths === 1 ? t.bathroom : t.bathrooms}`,
    },
    {
      key: 'sqft',
      icon: <Area size={size} />,
      text: `${listing.sqft.toLocaleString('en-US')} ${t.sqftLabel}`,
    },
  ].filter(Boolean) as { key: string; icon: JSX.Element; text: string }[]

  return (
    <div className={`row ${className ?? ''}`} style={{ gap, ...style }}>
      {items.map((i) => (
        <span className="row" key={i.key} style={{ gap: 7, whiteSpace: 'nowrap' }}>
          {i.icon}
          {i.text}
        </span>
      ))}
    </div>
  )
}
