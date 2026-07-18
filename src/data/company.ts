// Single source of truth for real contact details. Never hardcode these in components.

export const COMPANY = {
  name: 'Crest Range Properties',
  /** Address lines are rendered on separate lines everywhere they appear. */
  addressLines: [
    'Office F6-01, Zig Zag Towers',
    'Al Zahiya (Tourist Club Area)',
    'Opposite Abu Dhabi Mall',
    'Abu Dhabi, UAE',
  ],
  phones: [
    { display: '+971 2 546 6332', tel: '+97125466332' },
    { display: '+971 54 705 3421', tel: '+971547053421' },
  ],
  /** The mobile line is the WhatsApp-capable number. */
  whatsapp: '971547053421',
  email: 'info@crestrangeproperties.com',
  website: 'www.crestrangeproperties.com',
  /** Hours are rendered on separate lines, never run together. */
  hoursLines: ['Monday–Saturday, 9:00–18:00', 'Viewings by appointment, seven days'],
  mapQuery: 'Zig Zag Towers, Al Zahiya, Abu Dhabi',
  social: {
    instagram: 'https://www.instagram.com/crestrangeproperties',
    facebook: 'https://www.facebook.com/crestrangeproperties',
    linkedin: 'https://www.linkedin.com/company/crestrangeproperties',
    tiktok: 'https://www.tiktok.com/@crestrangeproperties',
    youtube: 'https://www.youtube.com/@crestrangeproperties',
  },
} as const

export const waLink = (text?: string) =>
  `https://wa.me/${COMPANY.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`

export const telLink = (n: string) => `tel:${n}`
export const mailLink = (subject?: string) =>
  `mailto:${COMPANY.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`
