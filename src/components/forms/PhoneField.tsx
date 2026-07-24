import { useEffect, useMemo, useRef, useState } from 'react'
import { COUNTRIES, DEFAULT_CODE, digitsFor } from '../../data/countries'
import { useI18n } from '../../i18n/I18nProvider'
import { Chevron } from '../Icons'
import './forms.css'

interface Props {
  code: string
  phone: string
  onCode: (c: string) => void
  onPhone: (p: string) => void
  id?: string
  required?: boolean
}

/** Searchable country-code selector defaulting to +971, with the number field
 *  hard-limited to the selected country's digit count. Used by every form on
 *  the site - no form uses a plain text mobile input. */
export default function PhoneField({ code, phone, onCode, onPhone, id = 'phone', required }: Props) {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const wrapRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const digits = digitsFor(code)

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase()
    if (!needle) return COUNTRIES
    return COUNTRIES.filter(
      (c) => c.name.toLowerCase().includes(needle) || c.code.includes(needle),
    )
  }, [q])

  useEffect(() => {
    if (!open) return
    searchRef.current?.focus()
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const choose = (c: string) => {
    onCode(c)
    // Trim any digits that no longer fit the newly selected country.
    onPhone(phone.slice(0, digitsFor(c)))
    setOpen(false)
    setQ('')
  }

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {t.formPhone}
        {required && ' *'}
      </label>
      <div className="phone-row" ref={wrapRef}>
        <div className="phone-code">
          <button type="button" className="phone-code-btn" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
            {code}
            <Chevron size={12} />
          </button>
          {open && (
            <div className="phone-panel">
              <input
                ref={searchRef}
                className="phone-search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t.searchCountry}
                aria-label={t.searchCountry}
                dir="ltr"
              />
              <div className="phone-list">
                {list.map((c) => (
                  <button type="button" key={`${c.name}${c.code}`} onClick={() => choose(c.code)}>
                    <span>{c.name}</span>
                    <span className="muted">{c.code}</span>
                  </button>
                ))}
                {!list.length && <div className="phone-empty muted">No match</div>}
              </div>
            </div>
          )}
        </div>
        <input
          id={id}
          className="input"
          value={phone}
          inputMode="numeric"
          autoComplete="tel-national"
          dir="ltr"
          required={required}
          placeholder={`${digits} digits`}
          onChange={(e) => onPhone(e.target.value.replace(/\D/g, '').slice(0, digits))}
        />
      </div>
    </div>
  )
}

export const defaultPhone = { code: DEFAULT_CODE, phone: '' }

/** A mobile number is valid only at the exact digit count for its country. */
export const phoneValid = (code: string, phone: string) => phone.length === digitsFor(code)
