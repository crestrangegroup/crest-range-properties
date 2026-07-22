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
  /** Optional context label (community / relationship). The Company Profile
   *  testimonials carry no such label, so these are left blank for now. */
  role: string
}

// Item 9: the seven real client testimonials from the Company Profile, attributed
// by their position on the page (verified via layout coordinates, not flat text).
//
// NOTE for client review (Item 9 is not final): the wording is reproduced
// faithfully from the profile and contains a couple of source typos worth
// confirming before launch — "real statement agency" (Maria Palma, likely "real
// estate agency") and "proffessional" (Lekoko Kenosi). Left verbatim rather than
// silently editing an attributed quote.
export const TESTIMONIALS: Testimonial[] = [
  { q: 'We had the pleasure of working with this real statement agency. They were super quick and responsive. They will not make you waste any time. I highly recommend them!!', who: 'Maria Palma', role: '' },
  { q: 'Excellence demonstrated all through finding the right apartment for me and assistance with movement and connections. Crest Range properties is simply the best.', who: 'Dr Martha Banfa', role: '' },
  { q: 'Very supportive company, responsive to messages and secured my house quickly. Thanks Henry!', who: 'Nicki Williams', role: '' },
  { q: 'Excellent team of dedicated proffessional real estate company. I highly recommend anyone seeking accommodation in Abu Dhabi to contact them.', who: 'Lekoko Kenosi', role: '' },
  { q: '100% would recommend! From my very first meeting the team were extremely helpful. I had a long list of things I need in an apartment and they managed to check every one of those requirements. Communication was always clear and there were never any grey areas. The team always goes the extra mile to answer my thousands of questions. Even after a year of moving in, the team is still super helpful.', who: 'Marni Venter', role: '' },
  { q: 'The team are all very helpful, they helped me look for an apartment and made the process really easy. I worked with Elizabeth and it was really comfortable getting the apartment I was searching for.', who: 'Alreem Almarzouqi', role: '' },
  { q: 'John was extraordinarily diligent, patient, and always looking after our interests to ensure we found a home that could accommodate our family. His assistance went well beyond showing apartments, townhouses and villas. There was a high amount of handholding required given we were new to the UAE and he was there every step of the way to guide us. Extremely patient, and I can’t say enough good things about the way he and his company operated — even after technically their job was completed!', who: 'Peter Travnicek', role: '' },
]

/** Item 8: partners shown in the homepage logo carousel. `logo` points at an
 *  interim image extracted from the Company Profile, flagged to be swapped for
 *  an official high-resolution file. Order matches the brief. */
export interface Partner {
  name: string
  logo: string
}

export const PARTNERS: Partner[] = [
  { name: 'Property Finder', logo: '/images/partners/property-finder.png' },
  { name: 'PROVIS', logo: '/images/partners/provis.png' },
  { name: 'Asteco', logo: '/images/partners/asteco.png' },
  { name: 'dubizzle', logo: '/images/partners/dubizzle.png' },
  { name: 'Holo', logo: '/images/partners/holo.png' },
  { name: 'Siadah Development', logo: '/images/partners/siadah.png' },
  { name: 'ALDAR', logo: '/images/partners/aldar.png' },
  { name: 'Q Holding', logo: '/images/partners/q-holding.png' },
  { name: 'Huspy', logo: '/images/partners/huspy.png' },
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
  // Item A: response time unified on 15 minutes.
  { value: '15 min', key: 'statResponse' as const },
]
