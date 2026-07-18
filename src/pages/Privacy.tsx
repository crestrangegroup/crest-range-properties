import { useI18n } from '../i18n/I18nProvider'
import { COMPANY } from '../data/company'
import PageHead from '../components/PageHead'
import './legal.css'

const UPDATED = 'July 2026'
const DPO_EMAIL = 'privacy@crestrangeproperties.com'

export default function Privacy() {
  const { t } = useI18n()

  return (
    <>
      <PageHead title={t.footPrivacy} description={`${t.footPrivacy} — ${COMPANY.name}`} />

      <section className="section">
        <div className="wrap legal">
          <p className="kicker">{COMPANY.name}</p>
          <h1 className="h2">{t.footPrivacy}</h1>
          <p className="muted" style={{ marginTop: 8 }}>
            Last updated: {UPDATED}
          </p>
          <p className="legal-note muted">{t.legalNote}</p>

          <h2>1. Who we are</h2>
          <p>
            {COMPANY.name} is the data controller for personal data collected through {COMPANY.website}. Our
            office is at {COMPANY.addressLines.join(', ')}. Privacy questions and requests go to{' '}
            <a href={`mailto:${DPO_EMAIL}`}>{DPO_EMAIL}</a>.
          </p>

          <h2>2. What we collect</h2>
          <ul>
            <li>
              <strong>Enquiry details</strong> you submit through a contact form, a viewing request, a valuation
              request or a proposal request: first name, last name, email address, mobile number, property type
              and any message you write.
            </li>
            <li>
              <strong>Live chat transcripts</strong>, including the messages you send and any name or number you
              share during the conversation.
            </li>
            <li>
              <strong>Newsletter subscriptions</strong>: your email address.
            </li>
            <li>
              <strong>Technical data</strong>: your browser type, approximate location derived from IP address,
              and the pages you view, used to keep the Site working and to understand which listings are of
              interest.
            </li>
          </ul>
          <p>
            We do not ask for identity documents, payment card numbers or bank details through the Site. Please do
            not send them through the contact form or live chat.
          </p>

          <h2>3. Why we use it</h2>
          <ul>
            <li>To respond to your enquiry and arrange viewings or valuations.</li>
            <li>To provide brokerage, leasing and property management services you have asked for.</li>
            <li>To send market updates and property suggestions, where you have consented.</li>
            <li>To meet our legal, regulatory and anti-money-laundering obligations.</li>
            <li>To improve the Site and our service quality.</li>
          </ul>

          <h2>4. Consent and marketing</h2>
          <p>
            We rely on your consent for marketing communications. Consistent with UAE Cabinet Decision No. 56 of
            2024, we will not make marketing calls without your prior consent, we will identify ourselves on every
            call, and we will honour a request to stop. You can withdraw consent at any time by emailing{' '}
            <a href={`mailto:${DPO_EMAIL}`}>{DPO_EMAIL}</a> or by replying to any message. Withdrawing marketing
            consent does not stop operational messages about a transaction already in progress.
          </p>

          <h2>5. Who we share it with</h2>
          <p>
            We share personal data only where necessary: with the {COMPANY.name} agent handling your enquiry;
            with our hosting, database and email providers who process data on our instructions; with landlords,
            owners or developers where you have asked us to progress an enquiry on a specific property; and with
            authorities or regulators where the law requires it. We do not sell personal data.
          </p>

          <h2>6. International transfers</h2>
          <p>
            Some of our service providers store data on servers outside the UAE. Where that happens we use
            providers that apply recognised safeguards and contractual protections for the data they hold on our
            behalf.
          </p>

          <h2>7. How long we keep it</h2>
          <p>
            Enquiry records and chat transcripts are kept for up to 24 months from your last contact with us,
            unless you become a client, in which case records are kept for the period required by UAE brokerage
            and anti-money-laundering rules. Newsletter data is kept until you unsubscribe.
          </p>

          <h2>8. Your rights</h2>
          <p>
            Subject to UAE data protection law, you may ask us to give you a copy of your personal data, correct
            it if it is wrong, delete it where we have no ongoing need to keep it, restrict or object to how we
            use it, or withdraw consent. Write to <a href={`mailto:${DPO_EMAIL}`}>{DPO_EMAIL}</a> and we will
            respond within 30 days. If you are not satisfied with our response you may raise the matter with the
            competent UAE authority.
          </p>

          <h2>9. Security</h2>
          <p>
            Data is transmitted over encrypted connections and stored in access-controlled systems with
            row-level security, so that records are only readable by the accounts that need them. No system is
            perfectly secure, and we ask you not to send sensitive identity or financial information through the
            Site.
          </p>

          <h2>10. Cookies and analytics</h2>
          <p>
            The Site uses only the storage it needs to function, such as remembering your chosen language and
            keeping a live chat conversation open while you move between pages. This is stored in your browser and
            is cleared when you clear site data. Embedded Google Maps may set its own cookies under Google's
            privacy policy.
          </p>

          <h2>11. Changes</h2>
          <p>
            We will update this page when our practices change and will revise the date at the top. Material
            changes affecting how we use your data will be notified to you directly where we hold your contact
            details.
          </p>

          <h2>12. Contact</h2>
          <address>
            {COMPANY.name}
            <br />
            {COMPANY.addressLines.map((l) => (
              <span key={l}>
                {l}
                <br />
              </span>
            ))}
            <a href={`mailto:${DPO_EMAIL}`}>{DPO_EMAIL}</a>
            <br />
            {COMPANY.phones.map((p) => (
              <span key={p.tel}>
                {p.display}
                <br />
              </span>
            ))}
          </address>
        </div>
      </section>
    </>
  )
}
