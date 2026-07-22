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
  /** Hours are rendered on separate lines, never run together.
   *  The footer and Contact page read these from i18n (t.hoursVal); this stays
   *  in sync as the canonical English source. */
  hoursLines: ['Monday – Friday, 10:00 AM – 6:00 PM', 'Viewings by appointment—7 days a week'],
  mapQuery: 'Zig Zag Towers, Al Zahiya, Abu Dhabi',
  /** Display order is set in Footer.tsx: LinkedIn, Instagram, TikTok, Threads,
   *  Facebook, YouTube. */
  social: {
    linkedin: 'https://www.linkedin.com/company/crest-range-properties-llc/',
    instagram: 'https://www.instagram.com/crestrangeproperties',
    tiktok: 'https://www.tiktok.com/@crestrangeproperties',
    threads: 'https://www.threads.com/@crestrangeproperties',
    facebook: 'https://www.facebook.com/crestrangeproperties',
    // The trailing dot is part of the channel handle, not a typo.
    youtube: 'https://www.youtube.com/@Crestrangeproperties.',
  },
} as const

export const waLink = (text?: string) =>
  `https://wa.me/${COMPANY.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`

export const telLink = (n: string) => `tel:${n}`

/** Human-readable form of a raw tel number, e.g. +97125466332 -> +971 2 546 6332.
 *  Falls back to the raw value if it isn't one of the company numbers. */
export const displayPhone = (tel: string) =>
  COMPANY.phones.find((p) => p.tel === tel)?.display ?? tel
export const mailLink = (subject?: string) =>
  `mailto:${COMPANY.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`
