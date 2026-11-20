import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { 
  fetchGraphQL, 
  GET_EVENTS_QUERY, 
  GET_POSTS_QUERY, 
  GET_CAREERS_QUERY 
} from './services/wordpress'
import { fetchProductsFromWordPress } from './data/products'
import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Solutions from './pages/Solutions'
import Partners from './pages/Partners'
import PartnerDetail from './pages/PartnerDetail'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Chairman from './pages/Chairman'
import Sustainability from './pages/Sustainability'
import Careers from './pages/Careers'
import Insights from './pages/Insights'
import InsightDetail from './pages/InsightDetail'
import WhyMVGL from './pages/WhyMVGL'
import OpenPositions from './pages/OpenPositions'
import JobDetail from './pages/JobDetail'
import AirGasSolutions from './pages/AirGasSolutions'
import AutomationControlSolutions from './pages/AutomationControlSolutions'
import RefrigerationHvacSolutions from './pages/RefrigerationHvacSolutions'
import NonMetallicSolutions from './pages/NonMetallicSolutions'
import FirePumpSolutions from './pages/FirePumpSolutions'
import PowerGenerationSolutions from './pages/PowerGenerationSolutions'
import IndustrialRefrigerationSolutions from './pages/IndustrialRefrigerationSolutions'
import PowerElectronicsSolutions from './pages/PowerElectronicsSolutions'
import WarehouseMaterialHandlingSolutions from './pages/WarehouseMaterialHandlingSolutions'
import SolutionDetail from './pages/SolutionDetail'

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
  // Pre-fetch all WordPress collections via GraphQL in background for 0ms instant page transitions
  useEffect(() => {
    fetchProductsFromWordPress().catch(() => {})
    fetchGraphQL(GET_CAREERS_QUERY).catch(() => {})
    fetchGraphQL(GET_POSTS_QUERY).catch(() => {})
    fetchGraphQL(GET_EVENTS_QUERY).catch(() => {})
  }, [])

  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          {/* Main Clean English Routes */}
          <Route path="/" element={<PageLayout><Home /></PageLayout>} />
          <Route path="/about" element={<PageLayout><About /></PageLayout>} />
          <Route path="/chairman" element={<PageLayout><Chairman /></PageLayout>} />
          
          {/* 8 Core Industrial Solutions Routes */}
          <Route path="/solutions" element={<PageLayout><Solutions /></PageLayout>} />
          
          {/* 1. Power Generation (Kirloskar Powergen) */}
          <Route path="/solutions/power-generation" element={<PageLayout><PowerGenerationSolutions /></PageLayout>} />

          {/* 2. Air & Gas (Kirloskar Pneumatic) */}
          <Route path="/solutions/air-gas" element={<PageLayout><AirGasSolutions /></PageLayout>} />
          <Route path="/solutions/air-gas-solutions" element={<PageLayout><AirGasSolutions /></PageLayout>} />

          {/* 3. Industrial Refrigeration (Kirloskar Pneumatic) */}
          <Route path="/solutions/industrial-refrigeration" element={<PageLayout><IndustrialRefrigerationSolutions /></PageLayout>} />

          {/* 4. HVAC & Process Cooling (Kirloskar Chillers) */}
          <Route path="/solutions/hvac-process-cooling" element={<PageLayout><RefrigerationHvacSolutions /></PageLayout>} />
          <Route path="/solutions/refrigeration-hvac-solutions" element={<PageLayout><RefrigerationHvacSolutions /></PageLayout>} />
          <Route path="/solutions/refrigeration-hvac" element={<PageLayout><RefrigerationHvacSolutions /></PageLayout>} />

          {/* 5. Industrial Pumping (SPP Pumps) */}
          <Route path="/solutions/industrial-pumping" element={<PageLayout><FirePumpSolutions /></PageLayout>} />
          <Route path="/solutions/fire-pump-solutions" element={<PageLayout><FirePumpSolutions /></PageLayout>} />
          <Route path="/solutions/fire-pump-solution" element={<PageLayout><FirePumpSolutions /></PageLayout>} />

          {/* 6. Industrial Automation (Rockwell Automation) */}
          <Route path="/solutions/industrial-automation" element={<PageLayout><AutomationControlSolutions /></PageLayout>} />
          <Route path="/solutions/automation-control" element={<PageLayout><AutomationControlSolutions /></PageLayout>} />

          {/* 7. Power Electronics (Fuji Electronics) */}
          <Route path="/solutions/power-electronics" element={<PageLayout><PowerElectronicsSolutions /></PageLayout>} />

          {/* 8. Warehouse & Material Handling (Xoog) */}
          <Route path="/solutions/warehouse-material-handling" element={<PageLayout><WarehouseMaterialHandlingSolutions /></PageLayout>} />

          {/* Supplementary Composites */}
          <Route path="/solutions/non-metallic-solutions" element={<PageLayout><NonMetallicSolutions /></PageLayout>} />
          <Route path="/solutions/non-metallic-solution" element={<PageLayout><NonMetallicSolutions /></PageLayout>} />

          {/* Nested Partner Detail under Solutions -> Directly opens respective partner products */}
          <Route path="/solutions/:solutionSlug/:partnerSlug" element={<PageLayout><PartnerDetail /></PageLayout>} />

          {/* Dynamic Fallback Solution Route */}
          <Route path="/solutions/:slug" element={<PageLayout><SolutionDetail /></PageLayout>} />
          
          {/* Partners Routes */}
          <Route path="/partners" element={<PageLayout><Partners /></PageLayout>} />
          <Route path="/partners/:slug" element={<PageLayout><PartnerDetail /></PageLayout>} />
          
          {/* Company & Content Pages */}
          <Route path="/industries" element={<Navigate to="/solutions" replace />} />
          <Route path="/events" element={<PageLayout><Events /></PageLayout>} />
          <Route path="/events/:slug" element={<PageLayout><EventDetail /></PageLayout>} />
          <Route path="/contact" element={<PageLayout><Contact /></PageLayout>} />
          <Route path="/sustainability" element={<PageLayout><Sustainability /></PageLayout>} />
          <Route path="/careers" element={<PageLayout><Careers /></PageLayout>} />
          <Route path="/why-mvgl" element={<PageLayout><WhyMVGL /></PageLayout>} />
          <Route path="/why-3t" element={<Navigate to="/why-mvgl" replace />} />
          <Route path="/open-positions" element={<PageLayout><OpenPositions /></PageLayout>} />
          <Route path="/open-positions/:slug" element={<PageLayout><JobDetail /></PageLayout>} />
          <Route path="/insights" element={<PageLayout><Insights /></PageLayout>} />
          <Route path="/insights/:slug" element={<PageLayout><InsightDetail /></PageLayout>} />

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
