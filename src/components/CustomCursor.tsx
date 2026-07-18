import { useEffect, useRef } from 'react'

/** Ring + centre-dot cursor in the site accent colour. Pointer devices only -
 *  it is never enabled on touch, where hiding the cursor would do nothing
 *  useful and the `cursor: none` rule would be pointless. */
export default function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null)
  const dot = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)')
    if (!fine.matches) return

    document.body.classList.add('crc-cursor')
    let raf = 0
    let x = -100
    let y = -100

    const move = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        if (ring.current) {
          ring.current.style.transform = `translate(${x - 17}px, ${y - 17}px)`
          ring.current.style.opacity = '1'
        }
        if (dot.current) {
          dot.current.style.transform = `translate(${x - 2.5}px, ${y - 2.5}px)`
          dot.current.style.opacity = '1'
        }
      })
    }

    const leave = () => {
      if (ring.current) ring.current.style.opacity = '0'
      if (dot.current) dot.current.style.opacity = '0'
    }

    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
      document.body.classList.remove('crc-cursor')
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const shared: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 9999,
    opacity: 0,
  }

  return (
    <>
      <div
        ref={ring}
        aria-hidden
        style={{
          ...shared,
          width: 34,
          height: 34,
          border: '1.5px solid var(--gold-bright)',
          boxShadow: 'inset 0 0 0 1px rgba(20,18,13,.18)',
          transition: 'opacity .3s',
        }}
      />
      <div
        ref={dot}
        aria-hidden
        style={{
          ...shared,
          width: 5,
          height: 5,
          background: 'var(--gold-bright)',
          boxShadow: '0 0 0 1px rgba(20,18,13,.28)',
        }}
      />
    </>
  )
}
