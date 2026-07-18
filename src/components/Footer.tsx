import { Link } from 'react-router-dom'
import { ROUTES } from '../routes'
import { useI18n } from '../i18n/I18nProvider'
import { COMPANY, mailLink, telLink } from '../data/company'
import { Instagram, Facebook, LinkedIn, TikTok, YouTube } from './Icons'

const SOCIALS = [
  { href: COMPANY.social.instagram, label: 'Instagram', Icon: Instagram },
  { href: COMPANY.social.facebook, label: 'Facebook', Icon: Facebook },
  { href: COMPANY.social.linkedin, label: 'LinkedIn', Icon: LinkedIn },
  { href: COMPANY.social.tiktok, label: 'TikTok', Icon: TikTok },
  { href: COMPANY.social.youtube, label: 'YouTube', Icon: YouTube },
]

export default function Footer() {
  const { t, addressLines, hoursLines } = useI18n()
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
    <footer className="dark" style={{ paddingTop: 'clamp(44px,6vw,72px)' }}>
      <div className="wrap">
        <div
          className="grid"
          style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: 32, paddingBottom: 40 }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <img src="/images/logo-mark-light.png" alt="" style={{ height: 38 }} />
              <img src="/images/logo-text-light.png" alt="Crest Range Properties" style={{ height: 30 }} />
            </div>
            <p className="muted" style={{ fontSize: 14, maxWidth: '34ch', margin: 0 }}>
              {t.aboutH}
            </p>
            <div className="row" style={{ gap: 10, marginTop: 18 }}>
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="icon-btn"
                  style={{ borderColor: 'var(--dark-line)', color: 'var(--on-dark)' }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--sans)', fontSize: 11.5, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--gold-bright)', marginBottom: 14 }}>
              {t.footExplore}
            </h4>
            <div className="stack" style={{ gap: 9 }}>
              {explore.map(([to, label]) => (
                <Link key={to} to={to} style={{ color: 'var(--on-dark)', fontSize: 14 }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--sans)', fontSize: 11.5, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--gold-bright)', marginBottom: 14 }}>
              {t.footCompany}
            </h4>
            <div className="stack" style={{ gap: 9 }}>
              {company.map(([to, label]) => (
                <Link key={to} to={to} style={{ color: 'var(--on-dark)', fontSize: 14 }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--sans)', fontSize: 11.5, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--gold-bright)', marginBottom: 14 }}>
              {t.contactH}
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
            paddingBlock: 18,
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
