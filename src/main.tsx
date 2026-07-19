// The global stylesheet MUST be imported before App, so that the base layer
// loads before any page or component CSS.
//
// When it was imported last, the dev server and the production bundler
// disagreed: Vite's dev server injects modules in import order, putting
// styles.css last (global beats page CSS), while the production build emitted
// it third (page CSS beats global). Any page-level class overriding a global
// class at equal specificity therefore resolved one way locally and the other
// way live. Importing it first makes "global first, specific later" true in
// both environments.
import './styles.css'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { I18nProvider } from './i18n/I18nProvider'

// The app manages its own scroll position (ScrollToTop, and the #team anchor on
// About). Leaving this on "auto" lets the browser restore a stale offset after
// our scroll has already run.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

const el = document.getElementById('root')
if (!el) throw new Error('Root element #root is missing from index.html')

createRoot(el).render(
  <React.StrictMode>
    {/* BrowserRouter gives every page a real URL. Netlify serves index.html for
        all paths (see netlify.toml) so deep links and hard refreshes resolve
        to the right page instead of falling back to Home. */}
    <BrowserRouter>
      <I18nProvider>
        <App />
      </I18nProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
