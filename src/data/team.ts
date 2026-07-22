// Real Crest Range roster. Names stay in Latin script in every language -
// they are never transliterated. Role labels ARE translated (see i18n `roles`).
//
// Bios are English for now; a translation pass follows once the copy is signed
// off (see the content batch decision). Bio text is sourced verbatim from the
// official Company Profile, lightly adapted for the web.

export interface TeamMember {
  id: string
  name: string
  photo: string
  email: string
  /** Click-to-call number. Individual mobiles where the client supplied one. */
  phone: string
  /** WhatsApp-capable number (mobiles are; the office landline is not). */
  whatsapp: string
  /** Full bio shown on the member's dedicated page. Empty falls back to a note. */
  bio?: string
  /** Not yet publishable: no photo/final designation supplied by the client. */
  comingSoon?: boolean
}

const MAIN_PHONE = '+97125466332'
const MOBILE = '+971547053421'

export const TEAM: TeamMember[] = [
  {
    id: 'fatoki',
    name: 'Olatubosun Fatoki',
    photo: '/images/team/fatoki.png',
    email: 'info@crestrangeproperties.com',
    phone: MAIN_PHONE,
    whatsapp: MOBILE,
    // Fatoki's dedicated bio is pending; his page falls back to the Founder's
    // Welcome message he authored in the Company Profile.
    bio: '',
  },
  {
    id: 'dimka',
    name: 'Zipporah Dimka',
    photo: '/images/team/dimka.png',
    email: 'info@crestrangeproperties.com',
    phone: MAIN_PHONE,
    whatsapp: MOBILE,
    bio: 'She is a dynamic and versatile professional who has been on an incredible journey through the realms of business. Armed with a degree in economics, she initially took off on her career in aviation, where she learned to navigate the core of people relations with precision and grace. She is a powerhouse of ideas and innovation. Her vibrant personality is as colorful as her dedication to the business of Real Estate. With a zest for life and an unwavering dedication to adding value wherever she treads, Zipporah is a dynamic force in both her professional and personal spheres.',
  },
  {
    id: 'duruoha',
    name: 'Henry Duruoha',
    photo: '/images/team/duruoha.png',
    email: 'info@crestrangeproperties.com',
    // Item 1.4: individual mobile.
    phone: '+971547053424',
    whatsapp: '+971547053424',
    bio: 'Henry is a seasoned real estate sales manager with a deep-rooted understanding of the real estate landscape in Saadiyat Island, Muroor, Yas Island, and Abu Dhabi. His comprehensive knowledge of these areas, coupled with his passion for the industry, has made him a respected figure in the local real estate community. Henry’s passion for singing is the soundtrack of his life. In the world of property, Henry knows that finding a home is like hitting the perfect note in a song. His attention to detail and commitment to his clients reflect the same precision and care he puts into his singing.',
  },
  {
    id: 'okafor',
    name: 'Joshua Nonso Okafor',
    photo: '/images/team/okafor.png',
    email: 'info@crestrangeproperties.com',
    phone: MAIN_PHONE,
    whatsapp: MOBILE,
    bio: 'Before venturing into real estate, Joshua’s career path led him into the exciting world of event management. This background instilled in him the art of meticulous planning, flawless execution, and the ability to turn clients’ dreams into reality — a skill set that seamlessly translates into his role as a Senior Real Estate Officer. Joshua’s multifaceted talents don’t stop there. In his free time, he’s an avid music enthusiast and a true maestro with various musical instruments. Experience the unique blend of passion, faith, and determination.',
  },
  {
    id: 'abe',
    name: 'Elizabeth Abe',
    photo: '/images/team/abe.png',
    email: 'info@crestrangeproperties.com',
    // Item 1.4: individual mobile.
    phone: '+971547053423',
    whatsapp: '+971547053423',
    bio: 'Elizabeth is on a mission to redefine the perception of real estate agents. She firmly believes that the antiquated notion of agents as mere “roadside” intermediaries should be abolished. Instead, she views herself as a trusted advisor, a facilitator of dreams, and a guardian of her clients’ interests. Her dedication to breaking this stereotype and fostering a more transparent and client-centric real estate experience is the driving force behind her exceptional service. She is also a certified nurse, and this healthcare background has instilled in her a profound sense of empathy and service — qualities that seamlessly translate into her role as a real estate professional.',
  },
  {
    id: 'njeri',
    name: 'Rose Njeri',
    photo: '/images/team/njeri.png',
    email: 'info@crestrangeproperties.com',
    phone: MAIN_PHONE,
    whatsapp: MOBILE,
    bio: 'Meet Rose Njeri, your go-to real estate agent from Kenya, who effortlessly balances warmth and expertise. Soft-spoken yet razor-sharp, Njeri knows the Abu Dhabi real estate market like the back of her hand. Her calm demeanor and focused approach make the process of finding the perfect home seamless and stress-free. With Njeri, you’ll experience a personalized, professional journey where your needs are understood and met with precision. Whether it’s a cozy apartment or a luxury villa, she’s got you covered — helping you find the right home, effortlessly and efficiently.',
  },
  {
    // Item 1.2: new member #7.
    id: 'smith',
    name: 'Prince Smith',
    photo: '/images/team/smith.png',
    email: 'info@crestrangeproperties.com',
    phone: MAIN_PHONE,
    whatsapp: MOBILE,
    bio: 'Prince Smith is the reliable, versatile professional you need in real estate. Starting his sales career early, he honed a sharp instinct for spotting opportunities and closing deals. Whether he’s helping clients find their dream homes or cheering on his favorite F1 team, Prince brings unmatched energy and focus to everything he does. Beyond work, Prince values quality time with his family, a commitment that reflects in his interactions with clients and colleagues, treating them like part of his extended family. Whether you’re looking to buy, sell, or simply explore Abu Dhabi’s market, Prince is ready to guide you through every step with care and precision.',
  },
  {
    // Item 1.3: new member #8 — photo and final designation pending from client.
    // Held in a coming-soon state; must not publish live without a photo.
    id: 'gift',
    name: 'Gift Ofejiro',
    photo: '',
    email: 'info@crestrangeproperties.com',
    // Item 1.4: individual mobile supplied ahead of the photo/title.
    phone: '+971547053586',
    whatsapp: '+971547053586',
    bio: '',
    comingSoon: true,
  },
]

export const byId = (id: string) => TEAM.find((m) => m.id === id) || TEAM[0]
