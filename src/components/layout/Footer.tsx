import { Link } from 'react-router-dom'
import { solutionsData } from '../../data/solutions'
import { partnersData } from '../../data/partners'

export default function Footer() {
  const quickLinks = [
    { label: 'Our Story', path: '/about#story' },
    { label: 'Vision & Mission', path: '/about#vision-mission' },
    { label: "Chairman's Message", path: '/chairman' },
    { label: 'Our Culture', path: '/about#culture' },
    { label: 'Events & Expos', path: '/events' },
    { label: 'Contact Us', path: '/contact' }
  ]

  return (
    <footer className="bg-[#222222] text-slate-300 py-16 px-4 font-sans border-t border-white/10">
      <div className="max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Branding & Logo */}
        <div className="space-y-4">
          <Link to="/" className="inline-flex items-center bg-white px-3.5 py-2 rounded-xl shadow-xs hover:opacity-95 transition-opacity">
            <img 
              src="/NEW LOGO/logo2.png" 
              alt="MVGL Kenya Logo" 
              className="h-11 w-auto object-contain"
            />
          </Link>
          <p className="text-sm leading-relaxed text-slate-300">
            Engineering Solutions That Keep Kenya's Industries Moving. Delivering global technology partnerships and critical industrial solutions across East Africa.
          </p>
          <div className="text-xs text-slate-400 pt-4">
            &copy; {new Date().getFullYear()} MVGL Kenya. All rights reserved.
          </div>
        </div>

        {/* Solutions Links */}
        <div>
          <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ED1C24]"></span>
            SOLUTIONS
          </h3>
          <ul className="space-y-3 text-sm">
            {solutionsData.map((sol) => (
              <li key={sol.id}>
                <Link
                  to={`/solutions/${sol.slug}`}
                  className="hover:text-[#ED1C24] transition-colors"
                >
                  {sol.title.en}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ED1C24]"></span>
            COMPANY
          </h3>
          <ul className="space-y-3 text-sm">
            {quickLinks.map((link, idx) => (
              <li key={idx}>
                <Link to={link.path} className="hover:text-[#ED1C24] transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Partners Links */}
        <div>
          <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ED1C24]"></span>
            PARTNERS
          </h3>
          <ul className="space-y-3 text-sm">
            {partnersData.map((partner) => (
              <li key={partner.id}>
                <Link
                  to={`/partners/${partner.slug}`}
                  className="hover:text-[#ED1C24] transition-colors"
                >
                  {partner.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </footer>
  )
}
