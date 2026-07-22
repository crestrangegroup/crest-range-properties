import { Link } from 'react-router-dom'
import { ROUTES } from '../routes'
import { useI18n } from '../i18n/I18nProvider'
import { COMPANY, mailLink, telLink } from '../data/company'
import { useChat } from './chat/ChatProvider'
import { InstagramColor, Facebook, LinkedIn, TikTok, Threads, YouTube } from './Icons'

/** Fixed display order: LinkedIn, Instagram, TikTok, Threads, Facebook, YouTube.
 *  Item C: real brand colors, footer only. Rendered as white chips so every
 *  brand glyph (including the black TikTok/Threads marks) stays legible on the
 *  dark footer; Instagram carries its own gradient. `color` feeds the glyph via
 *  currentColor. This treatment is intentionally scoped here and nowhere else. */
const SOCIALS = [
  { href: COMPANY.social.linkedin, label: 'LinkedIn', Icon: LinkedIn, color: '#0A66C2' },
  { href: COMPANY.social.instagram, label: 'Instagram', Icon: InstagramColor, color: undefined },
  { href: COMPANY.social.tiktok, label: 'TikTok', Icon: TikTok, color: '#010101' },
  { href: COMPANY.social.threads, label: 'Threads', Icon: Threads, color: '#010101' },
  { href: COMPANY.social.facebook, label: 'Facebook', Icon: Facebook, color: '#1877F2' },
  { href: COMPANY.social.youtube, label: 'YouTube', Icon: YouTube, color: '#FF0000' },
]

export default function Footer() {
  const { t, addressLines, hoursLines } = useI18n()
  const { open: openChat } = useChat()
  const year = new Date().getFullYear()

  const explore: [string, string][] = [
    [ROUTES.listings, t.navListings],
    [ROUTES.buy, t.navBuy],
    [ROUTES.rent, t.navRent],
    [ROUTES.sell, t.navSell],
  ]
  const company: [string, string][] = [
    [ROUTES.about, t.navAbout],
    [ROUTES.team, t.footTeam],
    [ROUTES.services, t.navServices],
    [ROUTES.contact, t.navContact],
  ]

  return (
    <footer className="dark" style={{ paddingTop: 'clamp(28px,3.4vw,44px)' }}>
      <div className="wrap">
        <div
          className="grid"
          style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 'clamp(18px,2.4vw,28px)', paddingBottom: 'clamp(20px,2.6vw,28px)' }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <img src="/images/logo-mark-light.png" alt="" style={{ height: 38 }} />
              <img src="/images/logo-text-light.png" alt="Crest Range Properties" style={{ height: 30 }} />
            </div>
            <p className="muted" style={{ fontSize: 13.5, maxWidth: '34ch', margin: 0 }}>
              {t.aboutH}
            </p>
            <div className="row" style={{ gap: 8, marginTop: 14 }}>
              {SOCIALS.map(({ href, label, Icon, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="icon-btn"
                  style={{ background: '#fff', borderColor: 'transparent', color }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--sans)', fontSize: 11.5, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--gold-bright)', marginBottom: 10 }}>
              {t.footExplore}
            </h4>
            <div className="stack" style={{ gap: 7 }}>
              {explore.map(([to, label]) => (
                <Link key={to} to={to} style={{ color: 'var(--on-dark)', fontSize: 14 }}>
                  {label}
                </Link>
              ))}
              {/* Fifth item, below Sell. Not a route: it opens the chat widget,
                  exactly like the header button, so it is a button styled to
                  sit with the links rather than a Link to nowhere. */}
              <button
                type="button"
                onClick={openChat}
                style={{
                  font: 'inherit',
                  fontSize: 14,
                  color: 'var(--on-dark)',
                  background: 'none',
                  border: 0,
                  padding: 0,
                  textAlign: 'start',
                  cursor: 'pointer',
                }}
              >
                {t.chatCta}
              </button>
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--sans)', fontSize: 11.5, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--gold-bright)', marginBottom: 10 }}>
              {t.footCompany}
            </h4>
            <div className="stack" style={{ gap: 7 }}>
              {company.map(([to, label]) => (
                <Link key={to} to={to} style={{ color: 'var(--on-dark)', fontSize: 14 }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--sans)', fontSize: 11.5, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--gold-bright)', marginBottom: 10 }}>
              {/* Item B: footer contact heading stays "Contact"; the longer
                  "Talk to Crest Range Properties" is the Contact page H1 (t.contactH). */}
              {t.footContact}
            </h4>
            {/* Address and hours always render on separate lines, never run together. */}
            <address className="muted" style={{ fontStyle: 'normal', fontSize: 14, lineHeight: 1.75 }}>
              {addressLines.map((line) => (
                <div key={line}>{line}</div>
              ))}
              <div style={{ marginTop: 12 }}>
                {COMPANY.phones.map((p) => (
                  <div key={p.tel}>
                    <a href={telLink(p.tel)} style={{ color: 'var(--on-dark)' }}>
                      {p.display}
                    </a>
                  </div>
                ))}
                <div>
                  <a href={mailLink()} style={{ color: 'var(--on-dark)' }}>
                    {COMPANY.email}
                  </a>
                </div>
              </div>
              <div style={{ marginTop: 12 }}>
                {hoursLines.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
            </address>
          </div>
        </div>

        <div
          className="row"
          style={{
            borderTop: '1px solid var(--dark-line)',
            paddingBlock: 12,
            justifyContent: 'space-between',
            fontSize: 13,
            gap: 14,
          }}
        >
          <span className="muted">
            © {year} {COMPANY.name}. {t.rights}
          </span>
          <span className="row" style={{ gap: 18 }}>
            <Link to={ROUTES.terms} style={{ color: 'var(--on-dark)' }}>
              {t.footTerms}
            </Link>
            <Link to={ROUTES.privacy} style={{ color: 'var(--on-dark)' }}>
              {t.footPrivacy}
            </Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
