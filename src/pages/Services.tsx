import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import { useChat } from '../components/chat/ChatProvider'
import { ROUTES } from '../routes'
import { COMPANY, waLink, telLink, mailLink } from '../data/company'
import { Phone, Mail, WhatsApp, Chat } from '../components/Icons'
import PartnerMarquee from '../components/PartnerMarquee'
import PageHead from '../components/PageHead'

export default function Services() {
  const { t } = useI18n()
  const { open: openChat } = useChat()

  const disciplines = [
    { n: '01', name: t.s1Name, desc: t.s1Desc, bullets: t.s1B, form: false },
    { n: '02', name: t.s2Name, desc: t.s2Desc, bullets: t.s2B, form: false },
    { n: '03', name: t.s3Name, desc: t.s3Desc, bullets: t.s3B, form: true },
  ]

  return (
    <>
      <PageHead title={t.navServices} description={t.svcH} />

      <section className="section">
        <div className="wrap">
          <p className="kicker">{t.svcK}</p>
          <h1 className="h2">{t.svcH}</h1>
          {/* Preview fix 12: above-the-fold services strip, directly under the
              tagline. Premium spaced labels with hairline dividers. */}
          <div className="svc-strip" aria-label={t.svcH}>
            <span>{t.s1Name}</span>
            <i aria-hidden />
            <span>{t.s2Name}</span>
            <i aria-hidden />
            <span>{t.s3Name}</span>
          </div>
        </div>
      </section>

      {disciplines.map((d, i) => (
        <section
          key={d.n}
          className="section"
          style={{
            background: i % 2 === 0 ? 'var(--surface)' : 'transparent',
            borderTop: '1px solid var(--line)',
          }}
        >
          <div className="wrap">
            <div className="split">
              <div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 54, color: 'var(--gold)', lineHeight: 1 }}>{d.n}</div>
                <h2 className="h2" style={{ marginTop: 12 }}>
                  {d.name}
                </h2>
                <p className="lede" style={{ marginTop: 14 }}>
                  {d.desc}
                </p>
              </div>

              <div>
                <h3 className="label" style={{ fontFamily: 'var(--sans)' }}>
                  {t.included}
                </h3>
                <ul className="stack" style={{ gap: 10, margin: '14px 0 26px', paddingInlineStart: 18 }}>
                  {(d.bullets as string[]).map((b) => (
                    <li key={b} style={{ fontSize: 15 }}>
                      {b}
                    </li>
                  ))}
                </ul>

                {d.form ? (
                  /* Property Management is the only discipline that uses a form,
                     and it navigates to its own unlisted page rather than a modal. */
                  <Link className="btn btn-primary btn-inline" to={ROUTES.proposal}>
                    {t.sCtaForm}
                  </Link>
                ) : (
                  /* Sales and Leasing get four direct actions, no form. */
                  <div className="row" style={{ gap: 10 }}>
                    <button className="btn btn-primary btn-inline" onClick={openChat}>
                      <Chat size={15} />
                      {t.sCtaChat}
                    </button>
                    <a
                      className="btn btn-wa btn-inline"
                      href={waLink(`Hello Crest Range Properties, I'd like to talk about ${d.name}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsApp size={15} />
                      {t.whatsBtn}
                    </a>
                    <a className="btn btn-outline btn-inline" href={telLink(COMPANY.phones[0].tel)}>
                      <Phone size={15} />
                      {t.callBtn}
                    </a>
                    <a className="btn btn-outline btn-inline" href={mailLink(`${d.name} enquiry`)}>
                      <Mail size={15} />
                      {t.emailBtn}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Preview fix 13: Our Partners marquee, same component as the Home page.
          Fix 37: compact padding to keep the section short. */}
      <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', paddingBlock: 'clamp(16px,2vw,22px)' }}>
        <div className="wrap">
          <div className="sec-head" style={{ marginBottom: 6 }}>
            <div>
              <p className="kicker">{t.partnersK}</p>
              <h2 className="h2">{t.partnersH}</h2>
            </div>
          </div>
        </div>
        <PartnerMarquee />
      </section>

      {/* Dedicated WhatsApp CTA: small eyebrow, serif headline, outlined button.
          Fix 40: distinct band tone so it doesn't blend into the footer.
          Fix 47: height halved (0.5 x the default section padding). */}
      <section className="section dark cta-band" style={{ paddingBlock: 'clamp(24px,3.5vw,48px)' }}>
        <div className="wrap stack" style={{ alignItems: 'center', textAlign: 'center', gap: 14 }}>
          <p className="kicker" style={{ color: 'var(--gold-bright)', margin: 0 }}>
            {t.waEyebrow}
          </p>
          <h2 className="h2" style={{ color: '#fff' }}>
            {t.waHeadline}
          </h2>
          <a
            className="btn btn-wa on-dark btn-inline"
            href={waLink('Hello Crest Range Properties, I have a question.')}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginTop: 8 }}
          >
            <WhatsApp size={15} />
            {t.whatsBtn}
          </a>
        </div>
      </section>
    </>
  )
}
