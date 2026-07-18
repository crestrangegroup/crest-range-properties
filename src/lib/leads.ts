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

  // Fire-and-forget: the enquiry is already saved, so a failed notification
  // must not surface as a failed submission to the visitor.
  void invokeFn('send-email', {
    type: payload.kind === 'contact' ? 'contact_confirmation' : 'lead_notification',
    lead: row,
  })

  return true
}

export async function subscribeNewsletter(email: string): Promise<boolean> {
  return submitLead({ kind: 'newsletter', email })
}
