import { useI18n } from '../i18n/I18nProvider'
import { COMPANY } from '../data/company'
import PageHead from '../components/PageHead'
import './legal.css'

const UPDATED = 'July 2026'

export default function Terms() {
  const { t } = useI18n()

  return (
    <>
      <PageHead title={t.footTerms} description={`${t.footTerms} — ${COMPANY.name}`} />

      <section className="section">
        <div className="wrap legal">
          <p className="kicker">{COMPANY.name}</p>
          <h1 className="h2">{t.footTerms}</h1>
          <p className="muted" style={{ marginTop: 8 }}>
            Last updated: {UPDATED}
          </p>
          {/* Legal pages are served in English in every language version. */}
          <p className="legal-note muted">{t.legalNote}</p>

          <h2>1. About these terms</h2>
          <p>
            These terms govern your use of {COMPANY.website} (the “Site”), operated by {COMPANY.name}, a real
            estate brokerage based at {COMPANY.addressLines.join(', ')}. By using the Site you agree to these
            terms. If you do not agree, please do not use the Site.
          </p>

          <h2>2. What we do</h2>
          <p>
            {COMPANY.name} provides residential and commercial property sales, leasing and property management
            services in the Emirate of Abu Dhabi. We act as a broker between buyers, sellers, landlords and
            tenants. We are not a party to any sale or tenancy contract you enter into with a counterparty, and
            we do not act as a mortgage lender, valuer, or legal or tax adviser.
          </p>

          <h2>3. Property information</h2>
          <p>
            Listings on the Site are provided for general information. Prices, availability, service charges,
            dimensions, floor plans, photography and community details are supplied by owners, developers or
            third parties and may change without notice. Photography may include representative imagery of a
            community rather than the specific unit. Nothing on the Site is an offer, an invitation to treat, or
            a warranty as to the condition, title or value of any property. You should verify all material
            details, including measurements and permitted use, before committing to a transaction.
          </p>

          <h2>4. Advertisement permits</h2>
          <p>
            Properties advertised by {COMPANY.name} carry an advertisement permit number where one is required
            under Abu Dhabi Real Estate Centre (ADREC) rules. The permit number shown against a listing relates
            to that advertisement only and is not a statement about the legal title of the property.
          </p>

          <h2>5. Marketing and telemarketing consent</h2>
          <p>
            Where you provide your contact details through a form, our live chat, WhatsApp or by email, you
            consent to us contacting you about your enquiry. In line with UAE Cabinet Decision No. 56 of 2024 on
            the regulation of telemarketing, we will only make marketing calls to you where you have given prior
            consent, we will identify ourselves at the start of the call, and we will not call outside permitted
            hours. You may withdraw consent at any time by replying to any message from us or by writing to{' '}
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>, and we will stop marketing contact without
            affecting any active transaction.
          </p>

          <h2>6. Agent Live Chat</h2>
          <p>
            The Site offers a live chat service that connects you with our team. Conversations are recorded and
            stored so that an agent can follow up with the context of your enquiry. Do not share passwords,
            payment card details, bank account numbers or copies of identity documents through the chat. Guidance
            given in chat is general and does not replace formal written advice or a signed agreement.
          </p>

          <h2>7. Fees</h2>
          <p>
            Brokerage commission, agency fees, security deposits and any management fees are set out in the
            written agreement applicable to your transaction. No fee is payable to {COMPANY.name} unless it is
            recorded in that agreement.
          </p>

          <h2>8. Acceptable use</h2>
          <p>
            You may not scrape, republish or resell listing content, use the Site to send unsolicited marketing,
            attempt to gain unauthorised access to our systems, or submit information you know to be false. We may
            suspend access where we reasonably believe the Site is being misused.
          </p>

          <h2>9. Intellectual property</h2>
          <p>
            The Site's text, layout, branding, logos and photography are owned by {COMPANY.name} or used under
            licence. You may view and print pages for your own use in evaluating a property. Any other
            reproduction requires our written permission.
          </p>

          <h2>10. Third-party services</h2>
          <p>
            The Site embeds mapping from Google Maps and links to third-party platforms such as WhatsApp. Those
            services are governed by their own terms and privacy policies, and we are not responsible for their
            content or availability.
          </p>

          <h2>11. Liability</h2>
          <p>
            We take reasonable care to keep the Site accurate and available, but we do not guarantee that it will
            be uninterrupted or error free. To the extent permitted by law, {COMPANY.name} is not liable for
            indirect or consequential loss, or for loss arising from your reliance on listing information that
            you have not independently verified. Nothing in these terms limits liability that cannot be limited
            under UAE law.
          </p>

          <h2>12. Governing law</h2>
          <p>
            These terms are governed by the laws of the United Arab Emirates as applied in the Emirate of Abu
            Dhabi. The courts of Abu Dhabi have exclusive jurisdiction over any dispute arising from them.
          </p>

          <h2>13. Contact</h2>
          <address>
            {COMPANY.name}
            <br />
            {COMPANY.addressLines.map((l) => (
              <span key={l}>
                {l}
                <br />
              </span>
            ))}
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
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
