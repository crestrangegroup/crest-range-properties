import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import AgentLiveChat from './components/chat/AgentLiveChat'
import { ChatProvider } from './components/chat/ChatProvider'
import { ListingsProvider } from './lib/ListingsProvider'
import { ROUTES } from './routes'

import Home from './pages/Home'
import Listings from './pages/Listings'
import PropertyDetail from './pages/PropertyDetail'
import Sell from './pages/Sell'
import About from './pages/About'
import Services from './pages/Services'
import Proposal from './pages/Proposal'
import Contact from './pages/Contact'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import NotFound from './pages/NotFound'

/** Reset scroll on navigation, but leave hard refreshes and back/forward alone
 *  so the browser can restore the previous scroll position itself. */
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const navType = (window.performance?.getEntriesByType?.('navigation')?.[0] as any)?.type
  useEffect(() => {
    if (navType === 'reload') return
    // A hash target owns the scroll position (e.g. /about#team), so don't
    // yank the page back to the top and fight the anchor.
    if (hash) return
    window.scrollTo(0, 0)
  }, [pathname, hash, navType])
  return null
}

export default function App() {
  return (
    <ListingsProvider>
    <ChatProvider>
      <ScrollToTop />
      <CustomCursor />
      <div className="stack" style={{ minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path={ROUTES.home} element={<Home />} />
            <Route path={ROUTES.listings} element={<Listings />} />
            {/* Buy and Rent are their own URLs, pre-filtered - not a dropdown. */}
            <Route path={ROUTES.buy} element={<Listings forcedPurpose="sale" />} />
            <Route path={ROUTES.rent} element={<Listings forcedPurpose="rent" />} />
            <Route path={ROUTES.propertyPattern} element={<PropertyDetail />} />
            <Route path={ROUTES.sell} element={<Sell />} />
            <Route path={ROUTES.about} element={<About />} />
            {/* Team merged into About; keep the old URL working. */}
            <Route path={ROUTES.teamLegacy} element={<Navigate to={ROUTES.team} replace />} />
            <Route path={ROUTES.services} element={<Services />} />
            <Route path={ROUTES.proposal} element={<Proposal />} />
            <Route path={ROUTES.contact} element={<Contact />} />
            <Route path={ROUTES.terms} element={<Terms />} />
            <Route path={ROUTES.privacy} element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <AgentLiveChat />
    </ChatProvider>
    </ListingsProvider>
  )
}
