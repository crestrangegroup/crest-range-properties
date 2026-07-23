import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from './Icons'
import { TESTIMONIALS } from '../data/content'
import { useI18n } from '../i18n/I18nProvider'
import './stacked-testimonials.css'

/** 2-letter initials, skipping honorifics (matches the main testimonials). */
function initials(name: string) {
  const words = name.split(/\s+/).filter((w) => !/^(dr|mr|mrs|ms|prof)\.?$/i.test(w))
  return words.slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '').join('')
}

const INTERVAL = 6000

/**
 * Sell-page testimonials (fix 39): a single card on a layered "deck", auto-
 * advancing, with circular prev/next arrows. Same content as elsewhere; this is
 * a visual/interaction treatment in the site's black/gold palette.
 */
export default function StackedTestimonials() {
  const { tTestimonial } = useI18n()
  const items = TESTIMONIALS
  const n = items.length
  const [idx, setIdx] = useState(0)
  const paused = useRef(false)

  const go = (d: number) => setIdx((i) => (((i + d) % n) + n) % n)

  useEffect(() => {
    const id = window.setInterval(() => {
      if (!paused.current) setIdx((i) => (i + 1) % n)
    }, INTERVAL)
    return () => clearInterval(id)
  }, [n])

  const c = tTestimonial(items[idx], idx)

  return (
    <div
      className="stk"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <button className="stk-arrow" onClick={() => go(-1)} aria-label={`${c.who}: previous testimonial`}>
        <ArrowLeft size={16} />
      </button>

      <div className="stk-deck">
        <span className="stk-ghost g2" aria-hidden />
        <span className="stk-ghost g1" aria-hidden />
        <blockquote className="stk-card" key={idx}>
          <div className="stk-stars" aria-label="Rated 5 out of 5">
            {'★★★★★'}
          </div>
          <p className="stk-q">{c.q}</p>
          <footer className="stk-foot">
            {c.photo ? (
              <img className="stk-photo" src={c.photo} alt={c.who} loading="lazy" width={46} height={46} />
            ) : (
              <span className="stk-photo stk-init" aria-hidden>
                {initials(c.who)}
              </span>
            )}
            <span>
              <strong className="stk-name">{c.who}</strong>
              {c.role && <span className="muted stk-role">{c.role}</span>}
            </span>
          </footer>
        </blockquote>
      </div>

      <button className="stk-arrow" onClick={() => go(1)} aria-label={`${c.who}: next testimonial`}>
        <ArrowRight size={16} />
      </button>
    </div>
  )
}
