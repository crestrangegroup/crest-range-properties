// Country dial codes with the expected national-number digit count, used by
// the searchable country-code selector on every form. Default is +971.

export interface Country {
  name: string
  code: string
  digits: number
}

const raw: [string, string, number][] = [
  ['United Arab Emirates', '+971', 9], ['Saudi Arabia', '+966', 9], ['Qatar', '+974', 8],
  ['Kuwait', '+965', 8], ['Bahrain', '+973', 8], ['Oman', '+968', 8], ['Egypt', '+20', 10],
  ['Jordan', '+962', 9], ['Lebanon', '+961', 8], ['Iraq', '+964', 10], ['Syria', '+963', 9],
  ['Yemen', '+967', 9], ['India', '+91', 10], ['Pakistan', '+92', 10], ['Bangladesh', '+880', 10],
  ['Sri Lanka', '+94', 9], ['Nepal', '+977', 10], ['Philippines', '+63', 10], ['China', '+86', 11],
  ['Hong Kong', '+852', 8], ['Taiwan', '+886', 9], ['Russia', '+7', 10], ['Kazakhstan', '+7', 10],
  ['United Kingdom', '+44', 10], ['Ireland', '+353', 9], ['France', '+33', 9], ['Germany', '+49', 11],
  ['Spain', '+34', 9], ['Portugal', '+351', 9], ['Italy', '+39', 10], ['Netherlands', '+31', 9],
  ['Belgium', '+32', 9], ['Switzerland', '+41', 9], ['Austria', '+43', 10], ['Sweden', '+46', 9],
  ['Norway', '+47', 8], ['Denmark', '+45', 8], ['Finland', '+358', 9], ['Poland', '+48', 9],
  ['Czechia', '+420', 9], ['Greece', '+30', 10], ['Romania', '+40', 9], ['Ukraine', '+380', 9],
  ['Turkey', '+90', 10], ['United States', '+1', 10], ['Canada', '+1', 10], ['Mexico', '+52', 10],
  ['Brazil', '+55', 11], ['Argentina', '+54', 10], ['Chile', '+56', 9], ['Colombia', '+57', 10],
  ['Australia', '+61', 9], ['New Zealand', '+64', 9], ['Japan', '+81', 10], ['South Korea', '+82', 10],
  ['Singapore', '+65', 8], ['Malaysia', '+60', 9], ['Indonesia', '+62', 10], ['Thailand', '+66', 9],
  ['Vietnam', '+84', 9], ['Nigeria', '+234', 10], ['Ghana', '+233', 9], ['Kenya', '+254', 9],
  ['Uganda', '+256', 9], ['Tanzania', '+255', 9], ['South Africa', '+27', 9], ['Ethiopia', '+251', 9],
  ['Morocco', '+212', 9], ['Algeria', '+213', 9], ['Tunisia', '+216', 8], ['Libya', '+218', 9],
  ['Sudan', '+249', 9], ['Israel', '+972', 9], ['Iran', '+98', 10], ['Afghanistan', '+93', 9],
]

export const COUNTRIES: Country[] = raw.map(([name, code, digits]) => ({ name, code, digits }))

export const DEFAULT_CODE = '+971'

export const digitsFor = (code: string) =>
  COUNTRIES.find((c) => c.code === code)?.digits ?? 9
