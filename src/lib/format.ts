import type { Listing } from '../data/listings'

/** Prices are always shown in AED with Western digits, in every language. */
export const fmtPrice = (l: Pick<Listing, 'price' | 'purpose'>) =>
  l.purpose === 'rent'
    ? `AED ${l.price.toLocaleString('en-US')} / yr`
    : `AED ${l.price.toLocaleString('en-US')}`

export const fmtShort = (l: Pick<Listing, 'price' | 'purpose'>) => {
  if (l.purpose === 'rent') {
    return l.price >= 1_000_000
      ? `${(l.price / 1e6).toFixed(2).replace(/0$/, '')}M/yr`
      : `${Math.round(l.price / 1000)}K/yr`
  }
  return l.price >= 1e6
    ? `AED ${(l.price / 1e6).toFixed(l.price % 1e6 ? 2 : 0).replace(/\.?0+$/, '')}M`
    : `AED ${Math.round(l.price / 1000)}K`
}

export const fmtSqft = (n: number) => `${n.toLocaleString('en-US')} sqft`
