import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react'
import { EN, Dict } from './en'
import { UI } from './ui.js'
import { CONTENT } from './content.js'
import type { Listing } from '../data/listings'
import type { Article, Hood, Testimonial } from '../data/content'

export const LANGS = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'ar', label: 'Arabic', native: 'العربية' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'zh', label: 'Mandarin', native: '简体中文' },
  { code: 'ru', label: 'Russian', native: 'Русский' },
  { code: 'fr', label: 'French', native: 'Français' },
  { code: 'es', label: 'Spanish', native: 'Español' },
] as const

export type LangCode = (typeof LANGS)[number]['code']

const STORAGE_KEY = 'crc-lang'
const isLang = (v: unknown): v is LangCode => LANGS.some((l) => l.code === v)

interface I18nValue {
  lang: LangCode
  setLang: (l: LangCode) => void
  t: Dict
  dir: 'ltr' | 'rtl'
  isRtl: boolean
  /** Translate an Abu Dhabi community name (listings, filters, map). */
  area: (englishName: string) => string
  /** Translate a team role by member id. */
  role: (memberId: string) => string
  /** Translate a team member's bio by member id (empty string if none). */
  bio: (memberId: string) => string
  /** Translate a Careers dropdown option label; the English value stays canonical. */
  careerOpt: (englishValue: string) => string
  /** Office address, already translated, split into display lines. */
  addressLines: string[]
  /** Opening hours, already translated, split into display lines. */
  hoursLines: string[]
  tListing: (l: Listing) => Listing
  tHood: (h: Hood) => Hood
  tArticle: (a: Article) => Article
  tTestimonial: (x: Testimonial, index: number) => Testimonial
}

const Ctx = createContext<I18nValue | null>(null)

function readInitialLang(): LangCode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isLang(stored)) return stored
  } catch {
    /* storage unavailable (private mode) - fall through to English */
  }
  return 'en'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(readInitialLang)

  const setLang = (l: LangCode) => {
    setLangState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* non-fatal */
    }
  }

  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  // Drive direction and lang from the root element so CSS logical properties,
  // font stacks and screen readers all follow the selected language.
  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
  }, [lang, dir])

  const value = useMemo<I18nValue>(() => {
    const pack = lang === 'en' ? null : ((UI as any)[lang] ?? null)
    const t: Dict = pack ? { ...EN, ...pack } : EN
    const bundle = lang === 'en' ? {} : ((CONTENT as any)[lang] ?? {})

    const areas: Record<string, string> = pack?.areas ?? {}
    const roles: Record<string, string> = { ...EN.roles, ...(pack?.roles ?? {}) }
    const bios: Record<string, string> = pack?.bios ?? {}
    const careerOpts: Record<string, string> = pack?.careerOpts ?? {}
    const testimonials: string[] = pack?.testimonials ?? []

    // Each helper merges the translated fields over the English base. Doing it
    // here, rather than at each render site, is what stops English titles,
    // address lines and community names leaking into the other six languages.
    return {
      lang,
      setLang,
      t,
      dir,
      isRtl: dir === 'rtl',
      area: (name) => areas[name] || name,
      role: (id) => roles[id] || '',
      // Translated bio if present; empty falls back to the English bio at the
      // render site (member.bio), so a missing translation never blanks the page.
      bio: (id) => bios[id] || '',
      // Translated option label; the English value it maps from stays the stored,
      // canonical value so back-office lead data is unaffected by site language.
      careerOpt: (value) => careerOpts[value] || value,
      addressLines: t.addrVal.split('\n'),
      hoursLines: t.hoursVal.split('\n'),
      tListing: (l) => {
        const tr = bundle.listings?.[l.slug]
        // `area` is not part of the listings bundle - it comes from the shared
        // community map, so it has to be translated separately or it stays English.
        return { ...l, ...(tr ?? {}), area: areas[l.area] || l.area }
      },
      tHood: (h) => {
        // hoods[slug] is the translated blurb string; the name comes from `areas`.
        const blurb = bundle.hoods?.[h.slug]
        return { ...h, name: areas[h.name] || h.name, blurb: blurb || h.blurb }
      },
      tArticle: (a) => ({ ...a, ...(bundle.articles?.[a.slug] ?? {}) }),
      // Positional translation of the quote text only. The client's name (`who`)
      // is a real personal name and is never translated; a missing entry falls
      // back to the English quote rather than blanking it.
      tTestimonial: (x, i) => ({ ...x, q: testimonials[i] || x.q }),
    }
  }, [lang, dir])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useI18n() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useI18n must be used inside <I18nProvider>')
  return v
}
