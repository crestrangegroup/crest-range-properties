import { ReactNode } from 'react'

interface Props {
  /** Each item renders once, then again as a seamless-loop clone. */
  items: ReactNode[]
  /** Seconds for one full pass. Larger = slower. */
  durationSec: number
  /** Accessible label for the scrolling region. */
  label: string
  /** Extra class on the outer element (variant styling hooks). */
  className?: string
}

/**
 * Continuous auto-scroll marquee. The track holds the item list twice, so a
 * translateX(-50%) animation lands on an identical frame and loops with no
 * snap-back. Hovering the region pauses it (see `.marquee:hover` in the
 * stylesheet); individual items handle their own hover zoom.
 *
 * Deliberately CSS-driven, not JS: the earlier scroll/rAF-based carousels were
 * unreliable in headless/hidden documents. A pure CSS animation just runs.
 */
export default function Marquee({ items, durationSec, label, className = '' }: Props) {
  return (
    <div className={`marquee ${className}`.trim()} role="region" aria-label={label}>
      <div className="marquee-track" style={{ animationDuration: `${durationSec}s` }}>
        {[...items, ...items].map((node, i) => (
          // The second half is a visual clone: hide it from assistive tech so
          // the list is not announced twice.
          <div className="marquee-cell" key={i} aria-hidden={i >= items.length}>
            {node}
          </div>
        ))}
      </div>
    </div>
  )
}
