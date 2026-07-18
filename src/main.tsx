import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { I18nProvider } from './i18n/I18nProvider'
import './styles.css'

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
