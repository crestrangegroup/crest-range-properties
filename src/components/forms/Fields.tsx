import { useI18n } from '../../i18n/I18nProvider'
import { PROPERTY_TYPES } from '../../data/listings'

/** First name / last name. No form on the site uses a single "full name" field. */
export function NameFields({
  first,
  last,
  onFirst,
  onLast,
  required = true,
}: {
  first: string
  last: string
  onFirst: (v: string) => void
  onLast: (v: string) => void
  required?: boolean
}) {
  const { t } = useI18n()
  return (
    <>
      <div className="field">
        <label className="label" htmlFor="firstName">
          {t.formFirst}
          {required && ' *'}
        </label>
        <input
          id="firstName"
          className="input"
          value={first}
          required={required}
          autoComplete="given-name"
          onChange={(e) => onFirst(e.target.value)}
        />
      </div>
      <div className="field">
        <label className="label" htmlFor="lastName">
          {t.formLast}
          {required && ' *'}
        </label>
        <input
          id="lastName"
          className="input"
          value={last}
          required={required}
          autoComplete="family-name"
          onChange={(e) => onLast(e.target.value)}
        />
      </div>
    </>
  )
}

/** Native date input: opens a calendar picker on click and still accepts typing. */
export function DateField({
  value,
  onChange,
  id = 'date',
  label,
}: {
  value: string
  onChange: (v: string) => void
  id?: string
  label?: string
}) {
  const { t } = useI18n()
  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label || t.formDate}
      </label>
      <input
        id={id}
        type="date"
        className="input date-input"
        value={value}
        min={new Date().toISOString().slice(0, 10)}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

/** Property type with an "Other" option that reveals a free-text field. */
export function PropertyTypeField({
  type,
  other,
  onType,
  onOther,
}: {
  type: string
  other: string
  onType: (v: string) => void
  onOther: (v: string) => void
}) {
  const { t } = useI18n()
  return (
    <>
      <div className="field">
        <label className="label" htmlFor="propType">
          {t.formProp}
        </label>
        <select id="propType" className="select" value={type} onChange={(e) => onType(e.target.value)}>
          {PROPERTY_TYPES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>
      </div>
      {type === 'Other' && (
        <div className="field">
          <label className="label" htmlFor="propOther">
            {t.formOther}
          </label>
          <input id="propOther" className="input" value={other} onChange={(e) => onOther(e.target.value)} />
        </div>
      )}
    </>
  )
}

export function EmailField({
  value,
  onChange,
  required,
}: {
  value: string
  onChange: (v: string) => void
  required?: boolean
}) {
  const { t } = useI18n()
  return (
    <div className="field">
      <label className="label" htmlFor="email">
        {t.formEmail}
        {required && ' *'}
      </label>
      <input
        id="email"
        type="email"
        className="input"
        value={value}
        required={required}
        autoComplete="email"
        dir="ltr"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
