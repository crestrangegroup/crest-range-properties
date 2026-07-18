# Crest Range Properties

Production website for Crest Range Properties, a boutique real estate brokerage
in Al Zahiya, Abu Dhabi. React + Vite + React Router, backed by Supabase.

## Why this is a rebuild

The previous version was a Claude Design `.dc.html` runtime export. It used
state-based navigation, so no page had its own URL, browser back/forward did
nothing, and refreshing any page dropped you back on Home. That could not be
patched, so this is real React source with real client-side routing.

## Getting started

Requires Node 20+.

```bash
npm install
cp .env.example .env.local   # fill in the Supabase URL and anon key
npm run dev                  # http://localhost:5173
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server, exposed on the LAN so real phones can hit it |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | `tsc --noEmit` |

## Architecture

```
src/
  routes.ts              Single source of truth for every URL
  App.tsx                Route table
  i18n/                  7 languages; ui.js + content.js ported from the design export
  data/                  Listings, team, company contact details, countries
  lib/                   Supabase client, listings provider, lead submission
  components/            Header, Footer, cards, carousel, forms, Agent Live Chat
  pages/                 One component per route
supabase/functions/
  agent-chat/            Concierge + James personas, transcript storage
```

### Routing

Every page has its own URL: `/`, `/listings`, `/buy`, `/rent`, `/sell`,
`/property/:slug`, `/about`, `/team`, `/services`,
`/services/request-a-proposal`, `/contact`, `/terms`, `/privacy`.

Listing filters live in the query string, so a filtered view is shareable and
survives a refresh. `netlify.toml` serves `index.html` for every path, which is
what makes deep links and hard refreshes work in production.

### Images

Every image is a real file under `public/images/`, committed to the repo. There
is no CDN dependency and no data-URI workaround: `assetsInlineLimit` is set to
`0` so the build never inlines an asset.

### Internationalisation

English, Arabic, Hindi, Mandarin, Russian, French and Spanish. Arabic renders
RTL via `dir` on the root element; the CSS uses logical properties throughout,
so there is no separate RTL stylesheet.

Everything the visitor **reads** is translated, including listing titles,
addresses, community names, neighbourhood guides, articles and testimonials.
Everything the visitor **types** stays English, in every language.

Translations merge in `I18nProvider`, keyed by slug. Note that a listing's
`area` is not part of the per-listing bundle: it comes from the shared `areas`
map and must be translated separately.

### Backend

Supabase project `zxptxpyszmwdayrtjsfj`. Row Level Security is enabled on every
table. The public site uses the anon key, which may only read **published**
listings and insert leads as fresh queue entries. Leads and chat transcripts are
never readable anonymously.

Listings load from Supabase and fall back to the bundled demo data if the
backend is unreachable, so the listings page never renders empty.

Form submissions write to `leads` first and then trigger the `send-email` Edge
Function, so an email outage cannot lose an enquiry.

### Agent Live Chat

A Concierge greets the visitor, and after they state a real need it offers to
connect them to "James", a senior agent persona. Conversations persist across
page navigation via `sessionStorage` and reset when the tab closes.

Locked copy rules are enforced **in code**, not just in the prompt: no em-dash
in any chat message, never a promise that James will personally call back, and
the conversation is always English regardless of the site language.

Requires the `ANTHROPIC_API_KEY` secret on the Supabase project:

```bash
supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
```

Until it is set, `agent-chat` returns 503 and the chat shows a fallback message
with the office phone number.

## Deployment

Netlify site `crest-range-properties`, building from `main`. Required build
environment variables: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

## Content notes

The listings are demo data: photography is area-accurate rather than of the
specific unit, while addresses, prices and permit numbers use realistic Abu
Dhabi formats. This data is intended to be replaced through the admin panel.

Legal pages are served in English in every language version.
