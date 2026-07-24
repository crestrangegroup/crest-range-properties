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
    // Round 3 team update: confirmed individual email + mobile.
    email: 'bosun.f@crestrangeproperties.com',
    phone: '+971547053421',
    whatsapp: '+971547053421',
    // Bio supplied verbatim by the client (2026-07). NOTE: it refers to him as
    // "Founder and CEO"; his confirmed site title stays "Founder & Managing
    // Partner / Consultant" everywhere else pending explicit reconciliation.
    bio: `Olatubosun Fatoki approaches real estate with a clear sense of purpose: to offer clients a standard of service that is thoughtful, consistent, and deeply personal.\n\nAs the Founder and CEO of Crest Range Properties, his work is shaped by a belief that real estate is not simply about transactions, but about people, timing, and trust. In a market as dynamic as Abu Dhabi, that perspective has guided the steady growth of the company since its establishment in 2020. Under his leadership, Crest Range Properties has built a reputation for its measured approach; one that values clarity, discretion, and long-term relationships. The firm advises a diverse portfolio of clients, from residents and first-time buyers to landlords and investors.\n\nBosun's professional foundation spans multiple client-focused industries, bringing with it a strong understanding of sales, communication, and operational precision. This cross-sector experience informs the company's day-to-day ethos: attentive, detail-oriented, and quietly dependable. Rather than redefining the market, Crest Range positions itself within it, with intention. The focus is not on scale for its own sake, but on delivering a level of service that clients return to and refer.\n\nAt the heart of the company is a simple idea: "Finding Home Away from Home." It reflects an understanding that for many, property is more than an asset, it is where life settles, evolves, and continues. For Bosun, that responsibility is not taken lightly. It is what continues to shape both the company and the experience it offers.`,
  },
  {
    id: 'dimka',
    name: 'Zipporah Dimka',
    photo: '/images/team/dimka.png',
    // Email is intentionally the shared info@ inbox (confirmed). Mobile shared
    // with Henry Duruoha (0547053424) - confirmed correct, not an error.
    email: 'info@crestrangeproperties.com',
    phone: '+971547053424',
    whatsapp: '+971547053424',
    // Bio supplied verbatim by the client (2026-07).
    bio: `A powerhouse of ideas, Zipporah is a dynamic and versatile professional known for her sharp thinking, quick adaptability, and ability to bring clarity to complex situations. With a natural curiosity, a strategic mindset, and an exceptional eye for detail, she approaches every challenge with precision, creativity, and purpose.\n\nArmed with a degree in Economics, Zipporah began her career in aviation, where she developed a strong foundation in people management, service excellence, and operational discipline. In her role as an HR & Administrative Manager and Compliance Officer, Zipporah combines her passion for people with a strong understanding of governance, risk management, and organizational efficiency. She is known for balancing structure with approachability, ensuring policies are upheld while fostering a workplace culture built on trust, communication, and collaboration.\n\nDriven by continuous improvement and a commitment to excellence, Zipporah brings energy, insight, and attention to detail into everything she does. Her ability to think strategically while staying connected to the human side of business makes her a valuable force in building stronger teams and more resilient organizations.`,
  },
  {
    id: 'duruoha',
    name: 'Henry Duruoha',
    photo: '/images/team/duruoha.png',
    // Mobile shared with Zipporah Dimka (0547053424) - confirmed correct.
    email: 'henry.d@crestrangeproperties.com',
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
    email: 'Elizabeth.a@crestrangeproperties.com',
    phone: '+971547053423',
    whatsapp: '+971547053423',
    // Bio supplied verbatim by the client (2026-07).
    bio: `Elizabeth represents a new generation of real estate professionals; the ones who see the role as far more than closing transactions.\n\nShe believes real estate is about people first: understanding their goals, protecting their interests, and guiding them through decisions that are often deeply personal. Her approach is built on trust, transparency, and creating an experience where clients feel genuinely supported. Her background as a certified nurse adds another dimension to the way she works. It has shaped her natural ability to listen, understand, and care, qualities that allow her to connect with people beyond the property itself.\n\nBlending empathy with strategy, Elizabeth approaches every client relationship as an advisor, advocate, and partner. She brings clarity to complex decisions and ensures every step of the journey is handled with intention. Beyond her professional expertise, Elizabeth is defined by the energy she brings into every interaction; hardworking in her commitment, cheerful in her approach, and effortlessly stylish in her expression. She believes that professionalism and personality can exist together, creating a service experience that feels both elevated and genuine. Representing the next generation of real estate, she combines knowledge with heart, proving that great service is not only about what you achieve, but how you make people feel along the way.`,
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
    // Round 10: photo and designation now supplied, so Gift is a full member.
    id: 'gift',
    name: 'Gift Ofejiro',
    photo: '/images/team/gift.png',
    email: 'gift.o@crestrangeproperties.com',
    phone: '+971547053586',
    whatsapp: '+971547053586',
    bio: 'Before transitioning into real estate full-time, Gift built her career in the world of professional modeling, where confidence, presentation, and building genuine connections were at the heart of everything she did. Today, she brings that same passion and people-first approach to helping clients find the perfect place to call home. With a keen eye for detail and a commitment to exceptional service, Gift believes that every property journey should feel effortless, personal, and exciting. Whether you’re searching for your first home or your next investment, she’s dedicated to making the experience as rewarding as the destination.',
  },
]

export const byId = (id: string) => TEAM.find((m) => m.id === id) || TEAM[0]
