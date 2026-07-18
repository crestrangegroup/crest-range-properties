// Every page has its own real URL. These constants are the single source of
// truth so links, redirects and active-nav checks can never drift apart.

export const ROUTES = {
  home: '/',
  listings: '/listings',
  buy: '/buy',
  rent: '/rent',
  sell: '/sell',
  property: (slug: string) => `/property/${slug}`,
  propertyPattern: '/property/:slug',
  about: '/about',
  team: '/team',
  services: '/services',
  /** Unlisted page hosting the Property Management proposal form. */
  proposal: '/services/request-a-proposal',
  contact: '/contact',
  terms: '/terms',
  privacy: '/privacy',
} as const
