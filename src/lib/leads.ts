import { supabase, invokeFn } from './supabase'

export type LeadKind = 'contact' | 'proposal' | 'viewing' | 'valuation' | 'newsletter' | 'callback'

export interface LeadPayload {
  kind: LeadKind
  firstName?: string
  lastName?: string
  email?: string
  phoneCode?: string
  phone?: string
  propertyType?: string
  propertyOther?: string
  preferredDate?: string
  message?: string
  /** Slug of the listing the enquiry came from, when relevant. */
  listingSlug?: string
  meta?: Record<string, unknown>
}

/**
 * Persist a lead, then trigger the transactional email. The row is written
 * first so an email outage can never lose the enquiry.
 *
 * Returns true when the lead was stored (or when the backend is not configured
 * yet, so local development still shows the success state).
 */
export async function submitLead(payload: LeadPayload): Promise<boolean> {
  if (!supabase) {
    console.info('[crest-range] Supabase not configured - lead not sent:', payload)
    return true
  }

  const row = {
    kind: payload.kind,
    first_name: payload.firstName ?? null,
    last_name: payload.lastName ?? null,
    email: payload.email ?? null,
    phone: payload.phone ? `${payload.phoneCode ?? ''}${payload.phone}` : null,
    property_type:
      payload.propertyType === 'Other' ? payload.propertyOther || 'Other' : payload.propertyType ?? null,
    preferred_date: payload.preferredDate || null,
    message: payload.message ?? null,
    listing_slug: payload.listingSlug ?? null,
    meta: payload.meta ?? {},
  }

  const { error } = await supabase.from('leads').insert(row)
  if (error) {
    console.error('[crest-range] lead insert failed', error)
    return false
  }

  // The send-email function reads `data`, not `lead`, and its templates use
  // name/mobile/summary rather than the database column names. Sending the raw
  // row under the wrong key meant every template rendered "-" for every field
  // and, for contact_confirmation, resolved to an empty recipient list, so the
  // function rejected the call with 400 and no email was ever sent.
  const name = [payload.firstName, payload.lastName].filter(Boolean).join(' ').trim()
  const data = {
    name: name || undefined,
    mobile: row.phone || undefined,
    email: payload.email || undefined,
    summary: leadSummary(payload),
    source: SOURCE_LABEL[payload.kind],
  }

  // Fire-and-forget: the enquiry is already saved, so a failed notification
  // must not surface as a failed submission to the visitor.
  //
  // Two separate emails, deliberately. The internal notification always goes to
  // the team (LEADS_NOTIFY_TO); the confirmation only goes to the visitor's own
  // address. Previously a contact enquiry sent ONLY the visitor confirmation,
  // so nobody on the team was ever notified about it.
  void invokeFn('send-email', { type: 'lead_notification', data })
  // A newsletter signup is not an enquiry, so it must not receive the
  // "one of our team will be in touch shortly" confirmation.
  if (payload.email && payload.kind !== 'newsletter') {
    void invokeFn('send-email', { type: 'contact_confirmation', data })
  }

  return true
}

/** Human-readable label for the notification subject line. */
const SOURCE_LABEL: Record<LeadKind, string> = {
  contact: 'Contact form',
  proposal: 'Request a proposal',
  viewing: 'Property viewing request',
  valuation: 'Sell page valuation request',
  newsletter: 'Newsletter signup',
  callback: 'Callback request',
}

/** One line describing what the visitor actually asked for. */
function leadSummary(p: LeadPayload): string {
  const bits = [
    p.propertyType === 'Other' ? p.propertyOther || 'Other' : p.propertyType,
    p.listingSlug && `Listing: ${p.listingSlug}`,
    p.preferredDate && `Preferred date: ${p.preferredDate}`,
    p.message,
  ].filter(Boolean)
  return bits.join(' | ') || SOURCE_LABEL[p.kind]
}

export async function subscribeNewsletter(email: string): Promise<boolean> {
  return submitLead({ kind: 'newsletter', email })
}
