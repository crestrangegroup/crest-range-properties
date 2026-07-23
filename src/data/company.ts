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
  /** Verified coordinates of the Crest Range Properties LLC Google listing at
   *  Zig Zag Tower (fix 26). Place ID: ChIJCVav2_hnXj4Rm17f_viY_vw. */
  mapLat: 24.4953501,
  mapLng: 54.3793768,
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
 *  Company numbers use their curated display; any other UAE mobile (the team's
 *  individual numbers) is grouped as +971 5X XXX XXXX. Falls back to raw. */
export const displayPhone = (tel: string) => {
  const known = COMPANY.phones.find((p) => p.tel === tel)?.display
  if (known) return known
  const d = tel.replace(/\D/g, '')
  // +9715XXXXXXXX -> +971 5X XXX XXXX
  if (d.length === 12 && d.startsWith('9715')) {
    return `+971 ${d.slice(3, 5)} ${d.slice(5, 8)} ${d.slice(8)}`
  }
  return tel
}

/** mailto to the shared inbox. */
export const mailLink = (subject?: string) =>
  `mailto:${COMPANY.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`

/** mailto to a specific recipient (e.g. an individual team member). */
export const mailTo = (email: string, subject?: string) =>
  `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`
