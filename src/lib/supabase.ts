import { createClient } from '@supabase/supabase-js'

// Public (publishable) credentials only. Row Level Security is what protects
// the data - the anon key is safe to ship in the browser bundle. Anything
// privileged (Anthropic key, Resend key) lives in Edge Function secrets.
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const isSupabaseConfigured = Boolean(url && anonKey)

if (!isSupabaseConfigured && import.meta.env.DEV) {
  console.warn(
    '[crest-range] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set. ' +
      'Listings fall back to bundled demo data and form submissions are skipped.',
  )
}

export const supabase = isSupabaseConfigured
  ? createClient(url as string, anonKey as string, {
      auth: { persistSession: false },
    })
  : null

/** Invoke a deployed Edge Function, returning null instead of throwing so the
 *  UI can degrade gracefully when the backend is unreachable. */
export async function invokeFn<T = any>(name: string, body: unknown): Promise<T | null> {
  if (!supabase) return null
  try {
    const { data, error } = await supabase.functions.invoke(name, { body })
    if (error) {
      console.error(`[crest-range] ${name} failed`, error)
      return null
    }
    return data as T
  } catch (e) {
    console.error(`[crest-range] ${name} threw`, e)
    return null
  }
}
