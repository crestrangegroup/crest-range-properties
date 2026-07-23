// Inline SVG icons. Kept as real paths (no icon font, no external sprite) so
// nothing depends on a network fetch at runtime.

interface P {
  size?: number
  className?: string
}

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
})

export const Phone = ({ size = 17, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
  </svg>
)

export const Mail = ({ size = 17, className }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 6 10-6" />
  </svg>
)

export const WhatsApp = ({ size = 17, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" className={className}>
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.6 0a6.7 6.7 0 0 1-2-1.2 7.4 7.4 0 0 1-1.4-1.7c-.1-.3 0-.4.1-.5l.4-.5.3-.4v-.4l-.8-1.9c-.2-.4-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.6 4c.6.3 1.1.4 1.5.5a3.6 3.6 0 0 0 1.6.1 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z" />
  </svg>
)

export const Bed = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M2 18v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5M2 18v2M22 18v2M2 13V7M6 11V9a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2M13 11V9a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2" />
  </svg>
)

export const Bath = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M3 12h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3ZM6 12V5a2 2 0 0 1 3.4-1.4M6 19l-1 2M18 19l1 2" />
  </svg>
)

export const Area = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M3 3h18v18H3zM9 3v18M3 9h18" />
  </svg>
)

export const Pin = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

export const Chat = ({ size = 20, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.7-.8L3 20.5l1.4-4.2A8.4 8.4 0 0 1 3 11.5a8.4 8.4 0 0 1 9-8.4 8.4 8.4 0 0 1 9 8.4Z" />
  </svg>
)

export const Close = ({ size = 18, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
)

export const Minus = ({ size = 18, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M5 12h14" />
  </svg>
)

export const Chevron = ({ size = 14, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export const ArrowLeft = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
)

export const ArrowRight = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

export const User = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M20 21a8 8 0 0 0-16 0" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

export const Doc = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
    <path d="M14 2v6h6M9 13h6M9 17h6" />
  </svg>
)

export const Globe = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" />
  </svg>
)

export const Menu = ({ size = 22, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
)

export const Send = ({ size = 17, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M22 2 11 13M22 2l-7 20-4-9-9-4Z" />
  </svg>
)

export const Check = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

/* ---- social ---- */

export const Instagram = ({ size = 17, className }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
)

/** Instagram in its real brand gradient (footer). currentColor can't express a
 *  gradient, so this variant carries its own <defs>. Unique gradient id per
 *  render size keeps multiple instances from clashing. */
export const InstagramColor = ({ size = 17, className }: P) => {
  const gid = `ig-grad-${size}`
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden focusable="false" className={className}>
      <defs>
        <linearGradient id={gid} x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F58529" />
          <stop offset="0.35" stopColor="#DD2A7B" />
          <stop offset="0.7" stopColor="#8134AF" />
          <stop offset="1" stopColor="#515BD4" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" stroke={`url(#${gid})`} strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke={`url(#${gid})`} strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1.2" fill={`url(#${gid})`} />
    </svg>
  )
}

export const Facebook = ({ size = 17, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" className={className}>
    <path d="M14 9h3V6h-3a4 4 0 0 0-4 4v2H8v3h2v7h3v-7h2.5l.5-3h-3v-2a1 1 0 0 1 1-1Z" />
  </svg>
)

export const LinkedIn = ({ size = 17, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" className={className}>
    <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3zM10 9h3.8v1.7a4.2 4.2 0 0 1 3.7-2c3 0 4.5 1.9 4.5 5.3V21h-4v-6.3c0-1.6-.6-2.6-2-2.6s-2.2 1-2.2 2.6V21h-3.8Z" />
  </svg>
)

export const TikTok = ({ size = 17, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" className={className}>
    <path d="M16.5 2h-3v13.2a2.6 2.6 0 1 1-2.2-2.6v-3a5.6 5.6 0 1 0 5.2 5.6V9.3a6.9 6.9 0 0 0 4 1.3V7.5a3.9 3.9 0 0 1-4-3.9V2Z" />
  </svg>
)

export const Threads = ({ size = 17, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" className={className}>
    <path d="M16.5 11.4c-.1 0-.2-.1-.3-.1-.2-3.2-1.9-5-4.8-5a4.7 4.7 0 0 0-4 1.9l1.7 1.2a2.6 2.6 0 0 1 2.3-1.1c.9 0 1.5.3 1.9.8.3.4.5.9.6 1.5a11 11 0 0 0-2.4-.1c-2.5.1-4.1 1.6-4 3.6a3.2 3.2 0 0 0 1.2 2.4 3.8 3.8 0 0 0 2.5.8c1.3 0 2.3-.5 3-1.4.5-.7.8-1.6 1-2.7.6.4 1 .9 1.2 1.5.3.9.4 2.3-.8 3.5-1 1-2.3 1.5-4.1 1.5-2 0-3.6-.7-4.6-1.9-1-1.2-1.5-2.9-1.5-5.1s.5-3.9 1.5-5.1c1-1.2 2.5-1.9 4.6-1.9 2.1 0 3.6.7 4.6 2 .5.6.9 1.4 1.1 2.4l2-.5c-.3-1.2-.8-2.3-1.5-3.2-1.4-1.7-3.5-2.6-6.2-2.6-2.6 0-4.7.9-6.2 2.6C4.8 6.6 4 9 4 12s.8 5.4 2.3 7.1c1.5 1.7 3.6 2.6 6.2 2.6 2.3 0 4.2-.6 5.6-1.9 1.8-1.7 1.8-3.9 1.2-5.3-.4-1-1.2-1.8-2.3-2.4zm-4.6 3.9c-.8 0-1.6-.4-1.7-1.2 0-.6.4-1.3 1.9-1.4h.5c.6 0 1.1 0 1.6.1-.2 2.1-1.2 2.5-2.3 2.5z" />
  </svg>
)

export const QrMatrix = ({ size = 36, className }: P) => {
  // Decorative placeholder QR-style matrix. NOT a real QR code and NOT
  // scannable - it encodes nothing at all. It sits next to the words "Scan to
  // verify this listing", so replace it with a real encoder (or soften that
  // copy) before launch.
  // Fixed 21x21 module grid with the three finder squares of a real symbol.
  const M = 21
  const finder = (ox: number, oy: number) => [
    <rect key={`f${ox}${oy}`} x={ox} y={oy} width={7} height={7} fill="none" stroke="var(--ink)" strokeWidth={1} />,
    <rect key={`c${ox}${oy}`} x={ox + 2} y={oy + 2} width={3} height={3} fill="var(--ink)" />,
  ]
  const inFinder = (x: number, y: number) =>
    (x < 8 && y < 8) || (x > M - 9 && y < 8) || (x < 8 && y > M - 9)
  const cells = []
  for (let y = 0; y < M; y++) {
    for (let x = 0; x < M; x++) {
      if (inFinder(x, y)) continue
      // Deterministic pattern so the matrix never changes between renders.
      if (((x * 7 + y * 13 + ((x * y) % 5)) % 3) === 0) {
        cells.push(<rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="var(--ink)" />)
      }
    }
  }
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={`-1 -1 ${M + 2} ${M + 2}`}
      role="img"
      aria-label="Decorative permit QR placeholder"
      style={{ display: 'block', flex: 'none' }}
    >
      <rect x={-1} y={-1} width={M + 2} height={M + 2} fill="#fff" />
      {cells}
      {finder(0, 0)}
      {finder(M - 7, 0)}
      {finder(0, M - 7)}
    </svg>
  )
}

export const YouTube = ({ size = 17, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" className={className}>
    <path d="M23 12s0-3.4-.4-5a2.6 2.6 0 0 0-1.8-1.8C19.1 4.7 12 4.7 12 4.7s-7.1 0-8.8.5A2.6 2.6 0 0 0 1.4 7C1 8.6 1 12 1 12s0 3.4.4 5a2.6 2.6 0 0 0 1.8 1.8c1.7.5 8.8.5 8.8.5s7.1 0 8.8-.5a2.6 2.6 0 0 0 1.8-1.8c.4-1.6.4-5 .4-5ZM9.8 15.3V8.7l5.7 3.3Z" />
  </svg>
)
