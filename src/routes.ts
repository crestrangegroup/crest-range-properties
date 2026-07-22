// Every page has its own real URL. These constants are the single source of
// truth so links, redirects and active-nav checks can never drift apart.

/** Element id of the team section on the About page. */
export const TEAM_ANCHOR = 'team'
/** Element id of the Vision & Mission section on the About page (preview fix 5). */
export const VISION_ANCHOR = 'vision'

export const ROUTES = {
  home: '/',
  listings: '/listings',
  buy: '/buy',
  rent: '/rent',
  sell: '/sell',
  property: (slug: string) => `/property/${slug}`,
  propertyPattern: '/property/:slug',
  about: '/about',
  /** Team is a section of the About page, not a page of its own. */
  team: '/about#team',
  /** Vision & Mission is a section of the About page (preview fix 5). */
  vision: '/about#vision',
  /** Kept as a redirect so older links and any shared URLs still resolve. */
  teamLegacy: '/team',
  /** Dedicated bio page per team member (content batch Item 1.5). */
  teamMember: (id: string) => `/team/${id}`,
  teamMemberPattern: '/team/:id',
  /** Public Careers page (admin-side posting management is a later batch). */
  careers: '/careers',
  services: '/services',
  /** Unlisted page hosting the Property Management proposal form. */
  proposal: '/services/request-a-proposal',
  contact: '/contact',
  terms: '/terms',
  privacy: '/privacy',
} as const
