// Real Crest Range roster. Names stay in Latin script in every language -
// they are never transliterated. Role labels ARE translated (see i18n `roles`).

export interface TeamMember {
  id: string
  name: string
  photo: string
  email: string
  phone: string
  whatsapp: string
}

const MAIN_PHONE = '+97125466332'
const MOBILE = '+971547053421'

export const TEAM: TeamMember[] = [
  { id: 'fatoki', name: 'Olatubosun Fatoki', photo: '/images/team/fatoki.png', email: 'info@crestrangeproperties.com', phone: MAIN_PHONE, whatsapp: MOBILE },
  { id: 'dimka', name: 'Zipporah Dimka', photo: '/images/team/dimka.png', email: 'info@crestrangeproperties.com', phone: MAIN_PHONE, whatsapp: MOBILE },
  { id: 'duruoha', name: 'Henry Duruoha', photo: '/images/team/duruoha.png', email: 'info@crestrangeproperties.com', phone: MAIN_PHONE, whatsapp: MOBILE },
  { id: 'okafor', name: 'Joshua Nonso Okafor', photo: '/images/team/okafor.png', email: 'info@crestrangeproperties.com', phone: MAIN_PHONE, whatsapp: MOBILE },
  { id: 'abe', name: 'Elizabeth Abe', photo: '/images/team/abe.png', email: 'info@crestrangeproperties.com', phone: MAIN_PHONE, whatsapp: MOBILE },
  { id: 'njeri', name: 'Rose Njeri', photo: '/images/team/njeri.png', email: 'info@crestrangeproperties.com', phone: MAIN_PHONE, whatsapp: MOBILE },
]

export const byId = (id: string) => TEAM.find((m) => m.id === id) || TEAM[0]
