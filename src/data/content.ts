// Neighbourhood guides, market-insight articles and testimonials.
// English base text; translations are merged from src/i18n/content.js by slug.

export interface Hood {
  slug: string
  photo: string
  name: string
  blurb: string
}

export const HOODS: Hood[] = [
  { slug: 'saadiyat', photo: '/images/hoods/saadiyat.jpg', name: 'Saadiyat Island', blurb: 'Museums, beach clubs, the island of record prices.' },
  { slug: 'yas', photo: '/images/hoods/yas.jpg', name: 'Yas Island', blurb: 'Entertainment capital with waterfront value plays.' },
  { slug: 'reem', photo: '/images/hoods/reem.jpg', name: 'Al Reem Island', blurb: 'Skyline living, minutes from the CBD.' },
  { slug: 'corniche', photo: '/images/hoods/corniche.jpg', name: 'Corniche', blurb: 'The classic address on the water.' },
]

export interface Article {
  slug: string
  photo: string
  tag: string
  title: string
  date: string
  read: string
}

export const ARTICLES: Article[] = [
  { slug: 'q2', photo: '/images/articles/q2.jpg', tag: 'Market report', title: 'Abu Dhabi Q2 2026: villa prices up 9.4% — and still undervalued', date: 'Jul 2026', read: '6 min' },
  { slug: 'saadiyat-yas', photo: '/images/articles/saadiyat-yas.jpg', tag: 'Investor guide', title: 'Saadiyat vs Yas: where the smart money is moving this year', date: 'Jun 2026', read: '8 min' },
  { slug: 'offplan', photo: '/images/articles/offplan.jpg', tag: 'New launches', title: 'Five off-plan launches worth your deposit this summer', date: 'Jun 2026', read: '5 min' },
  { slug: 'golden', photo: '/images/articles/golden.jpg', tag: 'Guides', title: 'Golden Visa through property: the 2026 rules, explained', date: 'May 2026', read: '7 min' },
  { slug: 'cheques', photo: '/images/articles/cheques.jpg', tag: 'Renting', title: 'One cheque or four? How payment terms move Abu Dhabi rents', date: 'May 2026', read: '4 min' },
]

export interface Testimonial {
  q: string
  who: string
  role: string
}

export const TESTIMONIALS: Testimonial[] = [
  { q: 'Listed on a Tuesday, three offers by Friday, closed above asking. I have bought and sold in three countries — never this fast.', who: 'R. Al Suwaidi', role: 'Sold, Saadiyat Beach Villas' },
  { q: 'I viewed remotely from London on a video walkthrough, negotiated on WhatsApp and signed in a week. 7.1% net yield, exactly as projected.', who: 'James B.', role: 'Investor, Al Reem Island' },
  { q: 'Their concierge answered at 11pm, booked my viewing for 9am, and the agent already knew my budget and shortlist. Seamless.', who: 'Mariam K.', role: 'Rented, Al Raha Beach' },
]

/** Homepage hero rotation. Local files only - no external CDN at runtime. */
export const HERO_IMAGES = [
  { src: '/images/hero/al-reem-island.jpg', label: 'Al Reem Island' },
  { src: '/images/hero/emirates-palace.jpg', label: 'Emirates Palace · Corniche' },
  { src: '/images/hero/yas-island.jpg', label: 'Yas Island · Waterfront Residences' },
  { src: '/images/hero/louvre-saadiyat.jpg', label: 'Saadiyat Island · Louvre Abu Dhabi', pos: 'center 58%' },
  { src: '/images/hero/jubail-island.jpg', label: 'Al Jubail Island · Mangrove Waterfront' },
]

/** Trust bar. "AED 1.2B+ Transacted" was removed per the build brief. */
export const STATS = [
  { value: '480+', key: 'statHomes' as const },
  { value: '62%', key: 'statReturn' as const },
  { value: '60 min', key: 'statResponse' as const },
]
