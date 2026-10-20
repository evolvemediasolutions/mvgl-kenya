import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { solutionsData } from '../../data/solutions'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path: string) => {
    const current = location.pathname
    if (path === '/') {
      return current === '/' || current === '/en' || current === '/en/'
    }
    return current.startsWith(path)
  }

  const navItems = [
    {
      id: 'about',
      label: 'About Us',
      path: '/about',
      dropdown: [
        { label: 'Our Story', path: '/about#story' },
        { label: 'Vision & Mission', path: '/about#vision-mission' },
        { label: "Chairman's Message", path: '/chairman' },
        { label: 'Our Culture', path: '/about#culture' },
        { label: 'Brand Identity', path: '/about#identity' }
      ]
    },
    {
      id: 'solutions',
      label: 'Industrial Solutions',
      path: '/solutions',
      dropdown: solutionsData.map((s) => ({
        label: s.title.en,
        path: `/solutions/${s.slug}`
      }))
    },
    {
      id: 'partners',
      label: 'Partners',
      path: '/partners'
    },
    {
      id: 'industries',
      label: 'Industries',
      path: '/industries'
    },
    {
      id: 'events',
      label: 'Events',
      path: '/events'
    },
    {
      id: 'sustainability',
      label: 'Sustainability',
      path: '/sustainability'
    },
    {
      id: 'careers',
      label: 'Careers',
      path: '/careers',
      dropdown: [
        { label: 'Why MVGL Kenya', path: '/why-mvgl' },
        { label: 'Open Positions', path: '/open-positions' }
      ]
    },
    {
      id: 'insights',
      label: 'Insights',
      path: '/insights'
    }
  ]

  return (
    <header className={`top-0 left-0 right-0 z-50 w-full transition-all duration-300 font-sans ${
      isScrolled 
        ? 'fixed py-0 px-0 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm' 
        : 'absolute py-4 px-4 sm:px-6 lg:px-8 bg-transparent'
    }`}>
      <nav className={`transition-all duration-300 max-w-[1360px] mx-auto ${
        isScrolled 
          ? 'bg-transparent border-none shadow-none rounded-none px-4 sm:px-6 lg:px-8' 
          : 'bg-white/95 backdrop-blur-md border border-slate-100 shadow-md rounded-full px-6 sm:px-8'
      }`}>
        <div className={`flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'h-16 sm:h-20' : 'h-20'
        }`}>
          
          {/* MVGL Kenya Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/LOGO/mvgl-kenya-logo.svg" 
                alt="MVGL Kenya Logo" 
                className={`w-auto object-contain transition-all duration-300 ${
                  isScrolled ? 'h-11 sm:h-12' : 'h-12 sm:h-14'
                }`}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div
                key={item.id}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => navigate(item.path)}
                  className={`px-3.5 py-2 text-[12px] font-semibold transition-colors flex items-center gap-1 rounded-md uppercase tracking-wider cursor-pointer ${
                    isActive(item.path) 
                      ? 'text-[#ED1C24] font-bold bg-red-50/80' 
                      : 'text-[#222222] hover:text-[#ED1C24] hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                  {item.dropdown && (
                    <ChevronDown className={`h-3.5 w-3.5 text-slate-400 group-hover:text-[#ED1C24] transition-transform duration-150 ${
                      activeDropdown === item.id ? 'rotate-180 text-[#ED1C24]' : ''
                    } group-hover:rotate-180`} />
                  )}
                </button>

                {/* Dropdown Menu */}
                {item.dropdown && (
                  <div 
                    className={`absolute top-full left-0 pt-1.5 w-64 z-50 transition-all duration-150 ease-out ${
                      activeDropdown === item.id 
                        ? 'opacity-100 visible translate-y-0 pointer-events-auto' 
                        : 'opacity-0 invisible -translate-y-1 pointer-events-none'
                    } group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto`}
                  >
                    <div className="rounded-xl bg-white shadow-xl border border-slate-100 py-2 overflow-hidden ring-1 ring-black/5">
                      {item.dropdown.map((sub, idx) => (
                        <Link
                          key={idx}
                          to={sub.path}
                          onClick={() => setActiveDropdown(null)}
                          className="block px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[#222222] hover:bg-red-50/70 hover:text-[#ED1C24] transition-colors border-l-2 border-transparent hover:border-[#ED1C24]"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Action button (Contact CTA) */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/contact"
              className="flex items-center justify-center px-6 h-11 bg-[#ED1C24] hover:bg-[#D0171E] text-white text-[12px] font-bold rounded-lg shadow-md hover:shadow-red-500/20 transition-all duration-200 uppercase tracking-wider"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-[#222222] hover:text-[#ED1C24] hover:bg-slate-100 focus:outline-none"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="lg:hidden mt-2 border border-slate-100 bg-white rounded-2xl shadow-lg p-3 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <div key={item.id} className="space-y-1">
                <button
                  onClick={() => {
                    if (!item.dropdown) {
                      navigate(item.path)
                      setIsOpen(false)
                    } else {
                      setActiveDropdown(activeDropdown === item.id ? null : item.id)
                    }
                  }}
                  className="w-full text-left px-3 py-2 text-sm font-bold uppercase tracking-wide text-[#222222] hover:text-[#ED1C24] hover:bg-red-50/50 rounded-md flex items-center justify-between"
                >
                  {item.label}
                  {item.dropdown && (
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${activeDropdown === item.id ? 'rotate-180 text-[#ED1C24]' : ''}`} />
                  )}
                </button>

                {/* Sub items */}
                {item.dropdown && activeDropdown === item.id && (
                  <div className="pl-4 pr-2 space-y-1 bg-slate-50/70 py-1.5 rounded-md">
                    {item.dropdown.map((sub, idx) => (
                      <Link
                        key={idx}
                        to={sub.path}
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 hover:text-[#ED1C24]"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 pb-2 border-t border-slate-200 mt-2 px-1">
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block text-center w-full py-3 bg-[#ED1C24] hover:bg-[#D0171E] text-white font-bold uppercase tracking-wider rounded-lg shadow-md"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
