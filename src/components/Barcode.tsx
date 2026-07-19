interface Props {
  /** Seed for the bar pattern. Same value always renders the same barcode. */
  value: string
  height?: number
  className?: string
}

/**
 * Decorative placeholder barcode.
 *
 * IMPORTANT: this is a visual placeholder only. The bars are derived from the
 * permit string so that a given listing always renders the same pattern and
 * different listings look different, but it is NOT a real symbology (Code 128,
 * EAN, etc.) and will not scan. Replace with a real encoder before this is
 * presented as a verifiable permit barcode.
 *
 * Rendered as inline SVG so there is no external image dependency and it stays
 * crisp at any size.
 */
export default function Barcode({ value, height = 46, className }: Props) {
  const seed = (value || '0').padEnd(12, '0')
  // Repeat the seed so short permit numbers still fill the strip.
  const chars = seed.repeat(3).slice(0, 34)

  const bars: { x: number; w: number }[] = []
  let x = 0

  // Leading guard pair, as on a real symbol.
  bars.push({ x, w: 1 })
  x += 3
  bars.push({ x, w: 1 })
  x += 4

  for (let i = 0; i < chars.length; i++) {
    const d = chars.charCodeAt(i)
    const barW = 1 + (d % 3) // 1..3
    const gapW = 1 + ((d + i) % 3) // 1..3
    bars.push({ x, w: barW })
    x += barW + gapW
  }

  // Trailing guard pair.
  x += 2
  bars.push({ x, w: 1 })
  x += 3
  bars.push({ x, w: 1 })
  x += 1

  const total = x

  return (
    <svg
      className={className}
      viewBox={`0 0 ${total} ${height}`}
      // Stretch to the card width; bar proportions are decorative anyway.
      preserveAspectRatio="none"
      width="100%"
      height={height}
      role="img"
      aria-label="Decorative permit barcode"
      style={{ display: 'block' }}
    >
      <rect width={total} height={height} fill="#fff" />
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={2} width={b.w} height={height - 4} fill="var(--ink)" />
      ))}
    </svg>
  )
}
