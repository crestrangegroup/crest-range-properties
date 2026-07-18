import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import './carousel.css'

interface Props {
  children: ReactNode[]
  /** Auto-advance interval in ms. Listings run fast, insights noticeably slower. */
  intervalMs: number
  /** Slides visible at once on desktop; always 1 on mobile. */
  visible?: number
  label: string
}

export default function Carousel({ children, intervalMs, visible = 3, label }: Props) {
  const slides = children.filter(Boolean)
  const [idx, setIdx] = useState(0)
  const [perView, setPerView] = useState(visible)
  const paused = useRef(false)
  const touchX = useRef<number | null>(null)

  // Responsive slide count. One slide per view on phones so nothing overflows.
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth
      setPerView(w < 720 ? 1 : w < 1024 ? Math.min(2, visible) : visible)
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [visible])

  const pages = Math.max(1, slides.length - perView + 1)
  const clamp = useCallback((n: number) => ((n % pages) + pages) % pages, [pages])

  useEffect(() => {
    setIdx((i) => clamp(i))
  }, [pages, clamp])

  useEffect(() => {
    if (pages <= 1) return
    const id = window.setInterval(() => {
      if (!paused.current) setIdx((i) => clamp(i + 1))
    }, intervalMs)
    return () => clearInterval(id)
  }, [intervalMs, pages, clamp])

  const go = (n: number) => setIdx(clamp(n))

  return (
    <div
      className="carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onTouchStart={(e) => {
        paused.current = true
        touchX.current = e.touches[0].clientX
      }}
      onTouchEnd={(e) => {
        paused.current = false
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 45) go(idx + (dx < 0 ? 1 : -1))
        touchX.current = null
      }}
    >
      <div className="carousel-viewport">
        <div
          className="carousel-track"
          style={{
            transform: `translateX(calc(${-idx * (100 / perView)}% - ${idx * 0}px))`,
            // Logical direction is handled by the parent; the track itself is
            // laid out in document order so RTL mirrors automatically.
          }}
        >
          {slides.map((child, i) => (
            <div className="carousel-slide" key={i} style={{ flex: `0 0 ${100 / perView}%` }} aria-hidden={i < idx || i >= idx + perView}>
              {child}
            </div>
          ))}
        </div>
      </div>

      {pages > 1 && (
        <div className="carousel-dots">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              className={i === idx ? 'on' : ''}
              onClick={() => go(i)}
              aria-label={`${label} ${i + 1} of ${pages}`}
              aria-current={i === idx}
            />
          ))}
        </div>
      )}
    </div>
  )
}
