import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import { ROUTES, TEAM_ANCHOR, VISION_ANCHOR } from '../routes'
import { TESTIMONIALS } from '../data/content'
import { TEAM } from '../data/team'
import Carousel from '../components/Carousel'
import PageHead from '../components/PageHead'
import { COMPANY, waLink, telLink, mailTo } from '../data/company'
import { Phone, Mail, WhatsApp } from '../components/Icons'

/** Initials for the testimonial avatar badge, skipping honorifics. */
function testimonialInitials(name: string) {
  const words = name.split(/\s+/).filter((w) => !/^(dr|mr|mrs|ms|prof)\.?$/i.test(w))
  return words.slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '').join('')
}

export default function About() {
  const { t, addressLines, role } = useI18n()
  const { hash } = useLocation()
  const founder = TEAM.find((m) => m.id === 'fatoki') || TEAM[0]

  // Team and Vision & Mission are sections of this page, so their anchors
  // (#team, #vision) have to be scrolled to manually: the browser only
  // auto-jumps for anchors present on first paint.
  //
  // A single scroll is not enough. Lazy-loaded imagery above the section keeps
  // resolving after mount, which grows the page and leaves the earlier scroll
  // pointing at the wrong offset. So re-assert the position for a short window
  // until the target actually settles under the header.
  useEffect(() => {
    // Read window.location directly rather than the router's hash: on a full
    // page load the router reported an empty hash here, so both this and
    // ScrollToTop mis-fired and the page stayed at the top.
    const targetId = window.location.hash.replace(/^#/, '')
    if (targetId !== TEAM_ANCHOR && targetId !== VISION_ANCHOR) return

    // Staged re-asserts rather than a requestAnimationFrame loop: React's
    // mount/cleanup/remount cycle cancelled the rAF before it ever fired, so
    // the page silently stayed at the top. Timeouts survive that, and the
    // repeats absorb the layout shift from imagery above this section loading
    // in after mount.
    const settle = () => {
      const el = document.getElementById(targetId)
      if (!el) return
      // Header height plus the section's scroll-margin. Outside this band means
      // the layout moved under us, so re-assert.
      if (Math.abs(el.getBoundingClientRect().top - 88) > 24) {
        el.scrollIntoView({ block: 'start' })
      }
    }

    const timers = [0, 60, 180, 400, 800, 1400].map((d) => window.setTimeout(settle, d))
    window.addEventListener('load', settle)

    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener('load', settle)
    }
  }, [hash])

  return (
    <>
      <PageHead title={t.navAbout} description={t.aboutP1} />

      <section className="section">
        <div className="wrap">
          <p className="kicker">{t.aboutK}</p>
          <h1 className="h2" style={{ maxWidth: '18ch' }}>
            {t.aboutH}
          </h1>
          <p className="lede" style={{ marginTop: 18 }}>
            {t.aboutP1}
          </p>

          <div className="row" style={{ gap: 12, marginTop: 28 }}>
            <a className="btn btn-primary btn-inline" href={`#${TEAM_ANCHOR}`}>
              {t.footTeam}
            </a>
            <Link className="btn btn-outline btn-inline" to={ROUTES.contact}>
              {t.navContact}
            </Link>
          </div>
        </div>
      </section>

      {/* Item 3: Founder's Welcome — two columns, tinted to stand apart from the
          plain intro above. Headshot on one side, message on the other. */}
      <section className="section" style={{ background: 'var(--surface)', borderBlock: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="split" style={{ alignItems: 'center', gap: 'clamp(24px,4vw,52px)' }}>
            <div style={{ flex: 'none' }}>
              <img
                src={founder.photo}
                alt={founder.name}
                width={300}
                height={340}
                style={{ width: '100%', maxWidth: 300, aspectRatio: '5 / 6', objectFit: 'cover', borderRadius: 8 }}
              />
            </div>
            <div style={{ minWidth: 0 }}>
              <p className="kicker">{t.welcomeK}</p>
              <blockquote style={{ margin: 0 }}>
                <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(17px,1.4vw,20px)', lineHeight: 1.6 }}>
                  {t.welcomeP}
                </p>
                <footer style={{ marginTop: 18 }}>
                  {/* Real names are never translated or transliterated. */}
                  <strong style={{ display: 'block' }}>{t.welcomeName}</strong>
                  <span className="muted" style={{ fontSize: 13.5 }}>
                    {t.welcomeRole}
                  </span>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Item 6: Vision & Mission. Anchor target for the About dropdown (fix 5). */}
      <section className="section" id={VISION_ANCHOR} style={{ scrollMarginTop: 'calc(var(--header-h) + 12px)' }}>
        <div className="wrap">
          <p className="kicker">{t.vmK}</p>
          <div className="grid grid-2" style={{ marginTop: 20 }}>
            {[
              [t.visionH, t.visionP],
              [t.missionH, t.missionP],
            ].map(([h, p]) => (
              <div key={h} className="card" style={{ padding: 28, gap: 12 }}>
                <h2 className="h3" style={{ fontSize: 22 }}>
                  {h}
                </h2>
                <p className="muted" style={{ margin: 0, fontSize: 15.5, lineHeight: 1.65 }}>
                  {p}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview fix 1: the Sales / Leasing / Property Management descriptions
          live only on the Services page. The former duplicate block here has
          been removed. */}

      {/* Testimonials (fix 23): gold kicker + serif heading, equal-height cards
          with a bold gold quote-mark and a gold-outlined initial badge. */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="kicker">{t.testiK}</p>
              <h2 className="h2">{t.testiH}</h2>
            </div>
          </div>
          <Carousel intervalMs={9000} visible={3} label={t.testiH} arrows>
            {TESTIMONIALS.map((c) => (
              // Testimonials are English-only for now, so the raw entry is used
              // directly (no positional translation merge).
              <figure key={c.who} className="tcard">
                <div className="tcard-avatar">
                  {c.photo ? (
                    <img src={c.photo} alt={c.who} loading="lazy" width={88} height={88} />
                  ) : (
                    // Two-letter initials where no headshot was supplied (fix 32).
                    <span aria-hidden>{testimonialInitials(c.who)}</span>
                  )}
                </div>
                <div className="tcard-stars" aria-label="Rated 5 out of 5">
                  {'★★★★★'}
                </div>
                <blockquote className="tcard-q">{c.q}</blockquote>
                <figcaption className="tcard-cap">
                  {/* Client names are real personal names and stay in Latin script. */}
                  <strong className="tcard-name">{c.who}</strong>
                  {c.role && <span className="muted tcard-role">{c.role}</span>}
                </figcaption>
              </figure>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Our Team - merged in from the former standalone /team route. The
          header's About dropdown and the footer both anchor here. */}
      <section
        className="section"
        id={TEAM_ANCHOR}
        style={{ background: 'var(--surface)', borderBlock: '1px solid var(--line)', scrollMarginTop: 'calc(var(--header-h) + 12px)' }}
      >
        <div className="wrap">
          <p className="kicker">{t.footTeam}</p>
          <h2 className="h2" style={{ maxWidth: '20ch' }}>
            {t.teamH}
          </h2>
          <p className="lede" style={{ marginTop: 16 }}>
            {t.teamP}
          </p>

          <div className="grid grid-3" style={{ marginTop: 40 }}>
            {TEAM.map((m) => (
              <article key={m.id} className="card" style={{ alignItems: 'center', textAlign: 'center', padding: 28 }}>
                {/* Item 1.5: photo + name link to the member's dedicated bio page. */}
                <Link to={ROUTES.teamMember(m.id)} aria-label={m.name} style={{ display: 'block', color: 'inherit' }}>
                  {m.photo && !m.comingSoon ? (
                    <img
                      src={m.photo}
                      alt={m.name}
                      loading="lazy"
                      width={132}
                      height={132}
                      style={{ width: 132, height: 132, borderRadius: '50%', objectFit: 'cover', display: 'block', margin: '0 auto' }}
                    />
                  ) : (
                    // Gift Ofejiro: photo pending — neutral placeholder, never a broken image.
                    <div
                      aria-hidden
                      style={{
                        width: 132,
                        height: 132,
                        borderRadius: '50%',
                        margin: '0 auto',
                        background: 'var(--bg)',
                        border: '1px solid var(--line)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--serif)',
                        fontSize: 34,
                        color: 'var(--gold)',
                      }}
                    >
                      {m.name.split(/\s+/).slice(0, 2).map((w) => w[0]).join('')}
                    </div>
                  )}
                  {/* Real names are never translated or transliterated. */}
                  <h3 className="h3" style={{ fontSize: 20, marginTop: 18 }}>
                    {m.name}
                  </h3>
                </Link>
                <p className="muted" style={{ fontSize: 13.5, margin: '8px 0 10px', minHeight: '2.6em' }}>
                  {role(m.id)}
                </p>
                {/* Preview fix 2: always-visible affordance that the card opens a
                    full bio page. Hidden for members still in a coming-soon
                    state (no profile to open yet). */}
                {!m.comingSoon && (
                  <Link
                    to={ROUTES.teamMember(m.id)}
                    className="view-profile"
                    style={{ marginBottom: 16 }}
                    aria-label={`${t.viewProfile}: ${m.name}`}
                  >
                    {t.viewProfile} <span aria-hidden>→</span>
                  </Link>
                )}
                <div className="icon-row" style={{ justifyContent: 'center' }}>
                  <a className="icon-btn" href={telLink(m.phone)} aria-label={`${t.callBtn} ${m.name}`} title={t.callBtn}>
                    <Phone size={16} />
                  </a>
                  <a className="icon-btn" href={mailTo(m.email, `Enquiry for ${m.name}`)} aria-label={`${t.emailBtn} ${m.name}`} title={t.emailBtn}>
                    <Mail size={16} />
                  </a>
                  <a
                    className="icon-btn"
                    href={waLink(`Hello ${m.name}, I'd like to speak with you about a property.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t.whatsBtn} ${m.name}`}
                    title={t.whatsBtn}
                  >
                    <WhatsApp size={16} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Careers feature, item 4 (redesigned in fix 19): premium dark two-column
          teaser after the team section - copy + skyline photo, gold CTA. */}
      {/* Fix 43: section height reduced ~30% (0.7 x the default section padding). */}
      <section className="section work-teaser-sec" style={{ paddingBlock: 'clamp(34px,4.9vw,67px)' }}>
        <div className="wrap">
          <div className="work-teaser">
            <div className="work-teaser-copy">
              <p className="kicker" style={{ margin: 0, color: 'var(--gold-bright)' }}>
                {t.workK}
              </p>
              <h2 className="h2" style={{ color: 'var(--on-dark)', marginTop: 10 }}>
                {t.workH}
              </h2>
              <p style={{ color: 'rgba(247,244,236,0.72)', margin: '14px 0 0', fontSize: 16, lineHeight: 1.6, maxWidth: '46ch' }}>
                {t.workP}
              </p>
              <Link to={ROUTES.careers} className="btn btn-gold btn-inline" style={{ marginTop: 24, alignSelf: 'flex-start' }}>
                {t.workCta} <span aria-hidden>→</span>
              </Link>
            </div>
            <img className="work-teaser-photo" src="/images/hero/dubai-marina-skyline.jpg" alt={t.workH} loading="lazy" />
          </div>
        </div>
      </section>

      {/* Fix 33: light section (rhythm: light -> dark Careers -> light -> dark
          footer). Fix 36 (round 9): further reduced height, content spread across
          a row so the band reads full rather than sparse. */}
      <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', paddingBlock: 'clamp(16px,2vw,22px)' }}>
        <div className="wrap">
          <div className="about-contact-row">
            <h2 className="h2" style={{ margin: 0 }}>{t.contactH}</h2>
            <div className="muted" style={{ lineHeight: 1.55, fontSize: 13.5 }}>
              {addressLines.map((l) => (
                <div key={l}>{l}</div>
              ))}
            </div>
            <Link className="btn btn-primary btn-inline" to={ROUTES.contact} style={{ flex: 'none' }}>
              {t.navContact}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
