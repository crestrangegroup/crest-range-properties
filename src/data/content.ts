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
  /** Real headshot where the client supplied one; otherwise initials are shown. */
  photo?: string
}

// Item 9: the seven real client testimonials from the Company Profile, attributed
// by their position on the page (verified via layout coordinates, not flat text).
//
// NOTE for client review (Item 9 is not final): the wording is reproduced
// faithfully from the profile and contains a couple of source typos worth
// confirming before launch — "real statement agency" (Maria Palma, likely "real
// estate agency") and "proffessional" (Lekoko Kenosi). Left verbatim rather than
// silently editing an attributed quote.
// Round 5 (fix 32): nine testimonials. Five carry a real headshot; the rest fall
// back to two-letter initials. Deshani Gounden and Inshirah Tahir are new.
export const TESTIMONIALS: Testimonial[] = [
  { q: 'My experience with Henry was God sent. I say this because Henry not only took into account my requirements but he dove in and got me exactly what I wanted within 3 days. He is patient and so humble in his approach. Never forcing me to go for just any apartment. I have been in Abu Dhabi for almost 9 years and I have never dealt with such a pleasant, kind and genuinely caring real estate agent before. He is definitely a rare find.', who: 'Deshani Gounden', role: '', photo: '/images/testimonials/deshani-gounden.png' },
  { q: 'Extremely professional and collaborative experience with Crest Range Properties. Elizabeth Abe was a pleasure to work with, extremely kind, communicative and patient especially if you are someone new to the city. She is a calming presence to do the whole process with and I could not recommend her enough. Overall very happy with the experience.', who: 'Inshirah Tahir', role: '', photo: '/images/testimonials/inshirah-tahir.png' },
  { q: 'We had the pleasure of working with this real statement agency. They were super quick and responsive. They will not make you waste any time. I highly recommend them!!', who: 'Maria Palma', role: '' },
  { q: 'Excellence demonstrated all through finding the right apartment for me and assistance with movement and connections. Crest Range properties is simply the best.', who: 'Dr Martha Banfa', role: '', photo: '/images/testimonials/dr-martha-banfa.png' },
  { q: 'Very supportive company, responsive to messages and secured my house quickly. Thanks Henry!', who: 'Nicki Williams', role: '' },
  { q: 'Excellent team of dedicated proffessional real estate company. I highly recommend anyone seeking accommodation in Abu Dhabi to contact them.', who: 'Lekoko Kenosi', role: '' },
  { q: '100% would recommend! From my very first meeting the team were extremely helpful. I had a long list of things I need in an apartment and they managed to check every one of those requirements. Communication was always clear and there were never any grey areas. The team always goes the extra mile to answer my thousands of questions. Even after a year of moving in, the team is still super helpful.', who: 'Marni Venter', role: '', photo: '/images/testimonials/marni-venter.png' },
  { q: 'The team are all very helpful, they helped me look for an apartment and made the process really easy. I worked with Elizabeth and it was really comfortable getting the apartment I was searching for.', who: 'Alreem Almarzouqi', role: '' },
  { q: 'John was extraordinarily diligent, patient, and always looking after our interests to ensure we found a home that could accommodate our family. His assistance went well beyond showing apartments, townhouses and villas. There was a high amount of handholding required given we were new to the UAE and he was there every step of the way to guide us. Extremely patient, and I can’t say enough good things about the way he and his company operated — even after technically their job was completed!', who: 'Peter Travnicek', role: '', photo: '/images/testimonials/peter-travnicek.png' },
]

/** Item 8: partners shown in the logo marquee (Home + Services). `logo` points
 *  at the official high-resolution file supplied by the client. Round 4 (fix 28)
 *  swapped in tighter-cropped files and a black-on-transparent Huspy SVG, so
 *  every logo now sits in a normal white tile (no dark special-case). */
export interface Partner {
  name: string
  logo: string
  /** Round 8 (fix 37): explicit rendered max-height in px. Default is 68.
   *  PF +30% (88); Binghati/Reportage/Object 1 +80% (122); Q Holding +50% (102,
   *  uncropped file); Ohana +70% (116). Very wide logos may be limited by the
   *  narrower tile width before reaching these heights. */
  h?: number
}

export const PARTNERS: Partner[] = [
  { name: 'Property Finder', logo: '/images/partners/property-finder.png', h: 88 },
  { name: 'ALDAR', logo: '/images/partners/aldar.png' },
  // Asteco supplied an SVG; preferred over the PNG for crispness at any size.
  { name: 'Asteco', logo: '/images/partners/asteco.svg' },
  { name: 'Reportage', logo: '/images/partners/reportage.png', h: 122 },
  { name: 'Q Holding', logo: '/images/partners/q-holding.png', h: 102 },
  { name: 'Mudon', logo: '/images/partners/mudon.png' },
  // Round 4: black-on-transparent wordmark (was white-on-black last round).
  { name: 'Huspy', logo: '/images/partners/huspy.svg' },
  { name: 'Binghati', logo: '/images/partners/binghati.png', h: 122 },
  { name: 'Object 1', logo: '/images/partners/object1.png', h: 122 },
  { name: 'Ohana', logo: '/images/partners/ohana.png', h: 116 },
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
