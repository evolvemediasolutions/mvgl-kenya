import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Solutions from './pages/Solutions'
import Partners from './pages/Partners'
import PartnerDetail from './pages/PartnerDetail'
import Events from './pages/Events'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Chairman from './pages/Chairman'
import Sustainability from './pages/Sustainability'
import Careers from './pages/Careers'
import Insights from './pages/Insights'
import WhyMVGL from './pages/WhyMVGL'
import OpenPositions from './pages/OpenPositions'
import AirGasSolutions from './pages/AirGasSolutions'
import AutomationControlSolutions from './pages/AutomationControlSolutions'
import RefrigerationHvacSolutions from './pages/RefrigerationHvacSolutions'
import NonMetallicSolutions from './pages/NonMetallicSolutions'
import FirePumpSolutions from './pages/FirePumpSolutions'

function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow animate-fade-in">{children}</main>
      <Footer />
    </div>
  )
}

function LegacyLocaleRedirect() {
  const location = useLocation()
  const cleanPath = location.pathname.replace(/^\/(?:en|ar)(?:\/|$)/, '/')
  return <Navigate to={cleanPath + location.search + location.hash} replace />
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          {/* Main Clean English Routes */}
          <Route path="/" element={<PageLayout><Home /></PageLayout>} />
          <Route path="/about" element={<PageLayout><About /></PageLayout>} />
          <Route path="/chairman" element={<PageLayout><Chairman /></PageLayout>} />
          
          {/* Solutions Routes */}
          <Route path="/solutions" element={<PageLayout><Solutions /></PageLayout>} />
          <Route path="/solutions/air-gas-solutions" element={<PageLayout><AirGasSolutions /></PageLayout>} />
          <Route path="/solutions/refrigeration-hvac-solutions" element={<PageLayout><RefrigerationHvacSolutions /></PageLayout>} />
          <Route path="/solutions/refrigeration-hvac" element={<PageLayout><RefrigerationHvacSolutions /></PageLayout>} />
          <Route path="/solutions/automation-control" element={<PageLayout><AutomationControlSolutions /></PageLayout>} />
          <Route path="/solutions/industrial-automation" element={<PageLayout><AutomationControlSolutions /></PageLayout>} />
          <Route path="/solutions/non-metallic-solutions" element={<PageLayout><NonMetallicSolutions /></PageLayout>} />
          <Route path="/solutions/non-metallic-solution" element={<PageLayout><NonMetallicSolutions /></PageLayout>} />
          <Route path="/solutions/fire-pump-solutions" element={<PageLayout><FirePumpSolutions /></PageLayout>} />
          <Route path="/solutions/fire-pump-solution" element={<PageLayout><FirePumpSolutions /></PageLayout>} />
          
          {/* Nested Partner Detail under Solutions */}
          <Route path="/solutions/:solutionSlug/:partnerSlug" element={<PageLayout><PartnerDetail /></PageLayout>} />
          
          {/* Partners Routes */}
          <Route path="/partners" element={<PageLayout><Partners /></PageLayout>} />
          <Route path="/partners/:slug" element={<PageLayout><PartnerDetail /></PageLayout>} />
          
          {/* Company & Content Pages */}
          <Route path="/industries" element={<Navigate to="/solutions" replace />} />
          <Route path="/events" element={<PageLayout><Events /></PageLayout>} />
          <Route path="/contact" element={<PageLayout><Contact /></PageLayout>} />
          <Route path="/sustainability" element={<PageLayout><Sustainability /></PageLayout>} />
          <Route path="/careers" element={<PageLayout><Careers /></PageLayout>} />
          <Route path="/why-mvgl" element={<PageLayout><WhyMVGL /></PageLayout>} />
          <Route path="/why-3t" element={<Navigate to="/why-mvgl" replace />} />
          <Route path="/open-positions" element={<PageLayout><OpenPositions /></PageLayout>} />
          <Route path="/insights" element={<PageLayout><Insights /></PageLayout>} />

          {/* Legacy Locale Redirects (e.g. /en/about -> /about, /ar/solutions -> /solutions) */}
          <Route path="/en/*" element={<LegacyLocaleRedirect />} />
          <Route path="/ar/*" element={<LegacyLocaleRedirect />} />
          <Route path="/en" element={<Navigate to="/" replace />} />
          <Route path="/ar" element={<Navigate to="/" replace />} />

          {/* Fallback 404 Route */}
          <Route path="*" element={<PageLayout><NotFound /></PageLayout>} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
