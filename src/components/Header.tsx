import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ROUTES } from '../routes'
import { useI18n, LANGS, LangCode } from '../i18n/I18nProvider'
import { useChat } from './chat/ChatProvider'
import { Chevron, Globe, Menu, Close, Chat } from './Icons'
import './Header.css'

/** Languages shown inline; the rest live behind the globe menu. */
const INLINE: LangCode[] = ['en', 'ar']

export default function Header() {
  const { t, lang, setLang } = useI18n()
  const { open: openChat } = useChat()
  const { pathname } = useLocation()
  const [aboutOpen, setAboutOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  // Any navigation closes every transient menu.
  useEffect(() => {
    setMobileOpen(false)
    setAboutOpen(false)
    setLangOpen(false)
  }, [pathname])

  // Click-away for the "more languages" menu.
  useEffect(() => {
    if (!langOpen) return
    const onDoc = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [langOpen])

  const more = LANGS.filter((l) => !INLINE.includes(l.code))

  const primary: [string, string][] = [
    [ROUTES.home, t.navHome],
    [ROUTES.services, t.navServices],
    [ROUTES.contact, t.navContact],
  ]
  const listingLinks: [string, string][] = [
    [ROUTES.listings, t.navListings],
    [ROUTES.buy, t.navBuy],
    [ROUTES.rent, t.navRent],
    [ROUTES.sell, t.navSell],
  ]

  return (
    <header className="hdr">
      <div className="hdr-in">
        <Link to={ROUTES.home} className="hdr-logo" aria-label={t.navHome}>
          <img className="mark" src="/images/logo-mark.png" alt="" />
          <img className="word" src="/images/logo-wordmark.png" alt="Crest Range Properties" />
        </Link>

        <nav className="hdr-nav" aria-label={t.navPrimary}>
          <NavLink to={ROUTES.home} end className={({ isActive }) => `nav-a${isActive ? ' active' : ''}`}>
            {t.navHome}
          </NavLink>

          <div className="drop" onMouseEnter={() => setAboutOpen(true)} onMouseLeave={() => setAboutOpen(false)}>
            <NavLink
              to={ROUTES.about}
              className={({ isActive }) => `nav-a${isActive ? ' active' : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: 5 }}
            >
              {t.navAbout}
              <Chevron size={11} />
            </NavLink>
            {aboutOpen && (
              <div className="drop-panel">
                <div className="drop-inner">
                  <Link className="drop-item" to={ROUTES.about}>
                    {t.navAbout}
                  </Link>
                  {/* Preview fix 5: order matches the page's section order
                      (Founder's Message → Vision & Mission → Team). */}
                  <Link className="drop-item" to={ROUTES.vision}>
                    {t.navVision}
                  </Link>
                  <Link className="drop-item" to={ROUTES.team}>
                    {t.footTeam}
                  </Link>
                  {/* Careers: separate route, not an anchor scroll. */}
                  <Link className="drop-item" to={ROUTES.careers}>
                    {t.navCareers}
                  </Link>
                </div>
              </div>
            )}
          </div>

          {primary.slice(1).map(([to, label]) => (
            <NavLink key={to} to={to} className={({ isActive }) => `nav-a${isActive ? ' active' : ''}`}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hdr-right">
          {/* Listings, Buy, Rent and Sell are four direct items, not a dropdown. */}
          <div className="hdr-links">
            {listingLinks.map(([to, label]) => (
              <NavLink key={to} to={to} className={({ isActive }) => `nav-a${isActive ? ' active' : ''}`}>
                {label}
              </NavLink>
            ))}
          </div>

          <div className="lang" ref={langRef}>
            {LANGS.filter((l) => INLINE.includes(l.code)).map((l) => (
              <button key={l.code} className={lang === l.code ? 'on' : ''} onClick={() => setLang(l.code)}>
                {l.native}
              </button>
            ))}
            <div className="lang-more">
              <button
                onClick={() => setLangOpen((v) => !v)}
                aria-label={t.langMore}
                aria-expanded={langOpen}
                className={more.some((l) => l.code === lang) ? 'on' : ''}
                style={{ display: 'flex', alignItems: 'center', gap: 4 }}
              >
                <Globe size={15} />
                <Chevron size={11} />
              </button>
              {langOpen && (
                <div className="lang-panel">
                  {more.map((l) => (
                    <button
                      key={l.code}
                      className={lang === l.code ? 'on' : ''}
                      onClick={() => {
                        setLang(l.code)
                        setLangOpen(false)
                      }}
                    >
                      {l.native}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button className="btn btn-chat btn-inline" onClick={openChat}>
            <Chat size={15} />
            {t.chatCta}
          </button>
        </div>

        <button
          className="hdr-burger"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={t.menuLbl}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <Close size={20} /> : <Menu size={22} />}
        </button>
      </div>

      <div className={`hdr-mobile${mobileOpen ? ' open' : ''}`}>
        <div className="group">
          {[[ROUTES.home, t.navHome], [ROUTES.about, t.navAbout], [ROUTES.vision, t.navVision], [ROUTES.team, t.footTeam], [ROUTES.careers, t.navCareers], [ROUTES.services, t.navServices], [ROUTES.contact, t.navContact]].map(
            ([to, label]) => (
              <NavLink key={to} to={to} end={to === ROUTES.home} className={({ isActive }) => `m-link${isActive ? ' active' : ''}`}>
                {label}
              </NavLink>
            ),
          )}
        </div>

        <div className="group">
          <div className="group-label">{t.navListings}</div>
          {listingLinks.map(([to, label]) => (
            <NavLink key={to} to={to} className={({ isActive }) => `m-link${isActive ? ' active' : ''}`}>
              {label}
            </NavLink>
          ))}
        </div>

        <div className="group">
          <div className="group-label">{t.langMore}</div>
          <div className="m-langs">
            {LANGS.map((l) => (
              <button key={l.code} className={lang === l.code ? 'on' : ''} onClick={() => setLang(l.code)}>
                {l.native}
              </button>
            ))}
          </div>
        </div>

        <button
          className="btn btn-chat"
          style={{ width: '100%', marginTop: 14 }}
          onClick={() => {
            setMobileOpen(false)
            openChat()
          }}
        >
          <Chat size={15} />
          {t.chatCta}
        </button>
      </div>
    </header>
  )
}
