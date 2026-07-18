// Demo listing data. Photos are area-accurate; all other fields are realistic
// Abu Dhabi formats. This is replaced by live Supabase data once the admin
// panel is populated - see src/lib/listings.ts for the merge.

export type Purpose = 'sale' | 'rent'

export interface Listing {
  slug: string
  photo: string
  gallery: string[]
  title: string
  area: string
  addr: string
  type: 'Villa' | 'Penthouse' | 'Apartment' | 'Townhouse' | 'Commercial'
  purpose: Purpose
  price: number
  beds: number
  baths: number
  sqft: number
  /** Map position as a percentage of the schematic Abu Dhabi map. */
  x: number
  y: number
  /** Team member id of the listing agent. */
  agent: string
  permit: string
  mapQ: string
  desc: string
  highlight: string
  prime: string
  feats: string[]
  amen: string[]
}

const GALLERY = ['/images/listings/gallery-a.jpg', '/images/listings/gallery-b.jpg']

export const LISTINGS: Listing[] = [
  {
    slug: 'saadiyat-villa',
    photo: '/images/listings/saadiyat-villa.jpg',
    gallery: GALLERY,
    title: 'Signature Beach Villa',
    area: 'Saadiyat Island',
    addr: 'Villa 22, Hidd Al Saadiyat, Saadiyat Island',
    type: 'Villa',
    purpose: 'sale',
    price: 11500000,
    beds: 5,
    baths: 6,
    sqft: 7200,
    x: 48,
    y: 20,
    agent: 'duruoha',
    permit: '202400318842',
    mapQ: 'Hidd Al Saadiyat, Saadiyat Island, Abu Dhabi',
    desc: 'A private beachfront villa in Saadiyat’s most guarded enclave: double-height living, a west-facing infinity pool, staff quarters and direct sand access. Homes here trade off-market — this one won’t wait.',
    highlight: 'Private beach | Vacant on transfer | Motivated seller',
    prime: 'Hidd Al Saadiyat holds the island’s most protected stretch of sand — Louvre Abu Dhabi in 8 minutes, downtown in 20, and the beach at the end of the garden.',
    feats: ['Private beach access', 'Infinity pool', 'Smart home', 'Maid’s room', '3-car garage', 'Beach club membership'],
    amen: ['Saadiyat Beach Club', 'Gym & spa', '24/7 security', 'Landscaped gardens', 'Covered parking'],
  },
  {
    slug: 'corniche-ph',
    photo: '/images/listings/corniche-ph.jpg',
    gallery: GALLERY,
    title: 'Corniche Sky Penthouse',
    area: 'Corniche',
    addr: 'Penthouse 4101, Bay Residences, Corniche Road West',
    type: 'Penthouse',
    purpose: 'sale',
    price: 18900000,
    beds: 4,
    baths: 5,
    sqft: 6100,
    x: 18,
    y: 42,
    agent: 'fatoki',
    permit: '202400296117',
    mapQ: 'Corniche Road West, Abu Dhabi',
    desc: 'Full-floor penthouse over the Corniche with 270° Gulf views, a 1,400 sqft terrace and private elevator lobby. One of four ever released in this tower.',
    highlight: 'Full floor | 270° sea view | One of four ever released',
    prime: 'The Corniche is Abu Dhabi’s classic address — eight kilometres of waterfront, minutes from the CBD and Qasr Al Hosn.',
    feats: ['Private elevator', '270° sea view', '1,400 sqft terrace', 'Concierge tower', 'Wine room'],
    amen: ['Valet parking', 'Residents’ lounge', 'Infinity pool', 'Concierge 24/7', 'Private cinema'],
  },
  {
    slug: 'mamsha-apt',
    photo: '/images/listings/mamsha-apt.jpg',
    gallery: GALLERY,
    title: 'Mamsha Al Saadiyat Residence',
    area: 'Saadiyat Island',
    addr: 'Apartment 312, Building 5, Mamsha Al Saadiyat',
    type: 'Apartment',
    purpose: 'sale',
    price: 5200000,
    beds: 3,
    baths: 4,
    sqft: 2380,
    x: 44,
    y: 26,
    agent: 'duruoha',
    permit: '202400307251',
    mapQ: 'Mamsha Al Saadiyat, Saadiyat Island, Abu Dhabi',
    desc: 'Beachfront living steps from the Louvre Abu Dhabi. Corner unit, full-height glazing, and a rental history that outperforms the community average by 12%.',
    highlight: 'Beachfront | Corner unit | Strong rental history',
    prime: 'Mamsha Al Saadiyat is the district’s cultural seafront — the Louvre, beach clubs and boardwalk dining below your balcony.',
    feats: ['Beachfront', 'Corner unit', 'Louvre district', '320 sqft balcony', 'High rental demand'],
    amen: ['Direct beach access', 'Boardwalk retail', 'Gym & pools', 'Basement parking'],
  },
  {
    slug: 'yas-townhouse',
    photo: '/images/listings/yas-townhouse.jpg',
    gallery: GALLERY,
    title: 'Yas Acres Garden Townhouse',
    area: 'Yas Island',
    addr: 'TH-27, The Dahlias, Yas Acres, Yas Island',
    type: 'Townhouse',
    purpose: 'sale',
    price: 3150000,
    beds: 3,
    baths: 4,
    sqft: 2650,
    x: 76,
    y: 34,
    agent: 'duruoha',
    permit: '202400284903',
    mapQ: 'Yas Acres, Yas Island, Abu Dhabi',
    desc: 'Golf-course-facing townhouse with a landscaped garden and single-row privacy. Handed over 2024, still under developer warranty — turn-key for end users or yield hunters.',
    highlight: 'Golf view | Single row | Developer warranty',
    prime: 'Yas Acres sits on Yas Island’s quiet north shore — golf at the door, schools in the community, and the island’s entertainment five minutes away.',
    feats: ['Golf course view', 'Single row', 'Landscaped garden', 'Developer warranty', 'Community pools'],
    amen: ['Golf club', 'Community pools', 'Schools nearby', 'Cycling tracks', 'Retail plaza'],
  },
  {
    slug: 'waters-edge',
    photo: '/images/listings/waters-edge.jpg',
    gallery: GALLERY,
    title: 'Water’s Edge Waterfront Suite',
    area: 'Yas Island',
    addr: 'Apartment 908, Building 4, Water’s Edge, Yas Bay',
    type: 'Apartment',
    purpose: 'sale',
    price: 985000,
    beds: 1,
    baths: 1,
    sqft: 720,
    x: 81,
    y: 46,
    agent: 'fatoki',
    permit: '202400335580',
    mapQ: 'Water’s Edge, Yas Bay, Yas Island, Abu Dhabi',
    desc: 'The entry ticket to Yas Island waterfront. Tenanted at AED 68k/yr — a 6.9% gross yield from day one, with Etihad Arena and Yas Bay on your doorstep.',
    highlight: 'Tenanted 6.9% yield | Waterfront promenade',
    prime: 'Water’s Edge fronts the Yas Bay promenade — Etihad Arena, dining and the beach within a short walk.',
    feats: ['Waterfront promenade', 'Tenanted 6.9% yield', 'Yas Bay district', 'Gym & pools'],
    amen: ['Promenade retail', 'Gym & pools', 'BBQ decks', 'Covered parking'],
  },
  {
    slug: 'reem-2br',
    photo: '/images/listings/reem-2br.jpg',
    gallery: GALLERY,
    title: 'Sky Tower Two-Bedroom',
    area: 'Al Reem Island',
    addr: 'Apartment 3304, Sky Tower, Shams Abu Dhabi, Al Reem Island',
    type: 'Apartment',
    purpose: 'rent',
    price: 120000,
    beds: 2,
    baths: 3,
    sqft: 1450,
    x: 42,
    y: 36,
    agent: 'okafor',
    permit: '202400341276',
    mapQ: 'Sky Tower, Shams Abu Dhabi, Al Reem Island, Abu Dhabi',
    desc: 'High floor in Reem’s landmark tower: sea-and-skyline views, chiller included, and Boutik Mall in the podium. Available now, up to 4 cheques.',
    highlight: 'Chiller free | High floor | 4 cheques',
    prime: 'Al Reem Island is skyline living minutes from the CBD — bridges straight into Al Maryah’s financial district.',
    feats: ['Chiller included', 'High floor', '4 cheques', 'Mall in podium', 'Sea view'],
    amen: ['Boutik Mall podium', 'Infinity pool', 'Gym', '24/7 security'],
  },
  {
    slug: 'raha-1br',
    photo: '/images/listings/raha-1br.jpg',
    gallery: GALLERY,
    title: 'Al Bandar Marina Apartment',
    area: 'Al Raha Beach',
    addr: 'Apartment 214, Al Naseem B, Al Bandar, Al Raha Beach',
    type: 'Apartment',
    purpose: 'rent',
    price: 95000,
    beds: 1,
    baths: 2,
    sqft: 980,
    x: 66,
    y: 62,
    agent: 'abe',
    permit: '202400327648',
    mapQ: 'Al Bandar, Al Raha Beach, Abu Dhabi',
    desc: 'Marina-front one-bed in Al Bandar with a wraparound balcony over the yachts. Walk to the beach, 15 minutes to the airport. Fully maintained community.',
    highlight: 'Marina view | Wraparound balcony | Available now',
    prime: 'Al Raha Beach lines the E10 corridor — beach, marina and retail in one masterplan, 15 minutes from the airport.',
    feats: ['Marina view', 'Wraparound balcony', 'Beach access', 'Covered parking'],
    amen: ['Marina berths', 'Beach access', 'Gym & pools', 'Cafés & retail'],
  },
  {
    slug: 'maryah-office',
    photo: '/images/listings/maryah-office.jpg',
    gallery: GALLERY,
    title: 'Full-Floor Grade A Office',
    area: 'Al Maryah Island',
    addr: 'Level 9, Gate Precinct Building 4, ADGM Square, Al Maryah Island',
    type: 'Commercial',
    purpose: 'rent',
    price: 1450000,
    beds: 0,
    baths: 0,
    sqft: 12400,
    x: 34,
    y: 42,
    agent: 'njeri',
    permit: '202400352019',
    mapQ: 'Al Maryah Island, Abu Dhabi',
    desc: 'A full fitted floor in Abu Dhabi’s financial district — ADGM-licensed address, raised floors, 40 parking bays and panoramic water views on three sides.',
    highlight: 'ADGM address | Fitted | 40 parking bays',
    prime: 'Al Maryah Island is Abu Dhabi’s financial free zone — ADGM courts, The Galleria and five-star hotels on the doorstep.',
    feats: ['ADGM address', 'Fitted & furnished', '40 parking bays', 'Raised floors', 'Triple aspect'],
    amen: ['The Galleria access', 'Conference facilities', 'Valet parking', '24/7 building services'],
  },
]

export const PROPERTY_TYPES = ['Villa', 'Apartment', 'Penthouse', 'Townhouse', 'Commercial'] as const
export const COMMUNITIES = [
  'Saadiyat Island',
  'Yas Island',
  'Al Reem Island',
  'Al Raha Beach',
  'Corniche',
  'Al Maryah Island',
  'Al Zahiya',
  'Khalifa City',
]
