import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase } from './supabase'
import { LISTINGS, Listing } from '../data/listings'

interface ListingsValue {
  listings: Listing[]
  loading: boolean
  /** True when the list came from Supabase rather than the bundled demo data. */
  live: boolean
}

const Ctx = createContext<ListingsValue>({ listings: LISTINGS, loading: false, live: false })

/** Map a `listings` row to the shape the UI renders. Translations are keyed by
 *  slug, so a row keeps its translated copy as long as the slug matches. */
function fromRow(r: any): Listing {
  return {
    slug: r.slug,
    photo: r.photo || '/images/listings/saadiyat-villa.jpg',
    gallery: Array.isArray(r.gallery) && r.gallery.length
      ? r.gallery
      : ['/images/listings/gallery-a.jpg', '/images/listings/gallery-b.jpg'],
    title: r.title,
    area: r.area,
    addr: r.address,
    type: r.property_type,
    purpose: r.purpose,
    price: Number(r.price),
    beds: r.beds ?? 0,
    baths: r.baths ?? 0,
    sqft: r.sqft ?? 0,
    x: Number(r.map_x ?? 50),
    y: Number(r.map_y ?? 50),
    agent: r.agent_id || 'fatoki',
    permit: r.permit || '',
    mapQ: r.map_query || `${r.area}, Abu Dhabi`,
    desc: r.description || '',
    highlight: r.highlight || '',
    prime: r.prime || '',
    feats: Array.isArray(r.features) ? r.features : [],
    amen: Array.isArray(r.amenities) ? r.amenities : [],
  }
}

/**
 * Loads published listings from Supabase once at startup. If the backend is
 * unreachable or returns nothing, the bundled demo data is used instead, so the
 * site never renders an empty listings page.
 */
export function ListingsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ListingsValue>({
    listings: LISTINGS,
    loading: Boolean(supabase),
    live: false,
  })

  useEffect(() => {
    if (!supabase) return
    let cancelled = false

    supabase
      .from('listings')
      .select('*')
      .eq('published', true)
      .order('price', { ascending: false })
      .then(({ data, error }) => {
        if (cancelled) return
        if (error || !data?.length) {
          if (error) console.error('[crest-range] listings fetch failed', error)
          setState({ listings: LISTINGS, loading: false, live: false })
          return
        }
        setState({ listings: data.map(fromRow), loading: false, live: true })
      })

    return () => {
      cancelled = true
    }
  }, [])

  return <Ctx.Provider value={state}>{children}</Ctx.Provider>
}

export const useListings = () => useContext(Ctx)
