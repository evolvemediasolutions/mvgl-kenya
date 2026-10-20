import { Link } from 'react-router-dom'
import { MapPin, Briefcase, Clock, ArrowRight } from 'lucide-react'
import IndustrialChallengeCTA from '../components/ui/IndustrialChallengeCTA'

export default function OpenPositions() {
  const positions = [
    {
      id: 'automation-sales-engineer',
      title: 'Sales Engineer – Industrial Automation & Control',
      department: 'Automation & Control Division',
      location: 'Nairobi, Kenya',
      type: 'Full-Time',
      experience: '3–5 Years',
      description: 'Responsible for technical sales and customer solution architecture for Rockwell Automation PLCs, VFDs, and industrial networking hardware across Kenyan manufacturers.'
    },
    {
      id: 'compressor-service-engineer',
      title: 'Field Service Engineer – Air & Gas Compression',
      department: 'Mechanical Solutions Division',
      location: 'Nairobi, Kenya (with regional field travel)',
      type: 'Full-Time',
      experience: '4+ Years',
      description: 'Hands-on commissioning, preventive maintenance, troubleshooting, and overhaul of screw compressors, centrifugal units, and process gas systems.'
    },
    {
      id: 'hvac-application-engineer',
      title: 'Applications Engineer – Refrigeration & Process Cooling',
      department: 'Cooling & HVAC Division',
      location: 'Nairobi, Kenya',
      type: 'Full-Time',
      experience: '3+ Years',
      description: 'Technical equipment selection, heat-load calculations, and quotation development for industrial chillers and cold chain refrigeration projects.'
    }
  ]

  return (
    <div className="font-sans min-h-screen bg-white text-[#222222]">
      {/* Hero */}
      <div className="pt-28 sm:pt-32 pb-6 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative w-full h-[450px] rounded-3xl overflow-hidden bg-[#222222] text-white flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
            alt="Open Positions at MVGL Kenya"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ED1C24] bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20">
              CAREERS / OPEN POSITIONS
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Current Career Opportunities in Kenya
            </h1>
            <p className="text-slate-200 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Explore available positions and join an engineering team committed to driving industrial advancement across East Africa.
            </p>
          </div>
        </section>
      </div>

      {/* Positions Listing */}
      <section className="py-20 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {positions.map((pos) => (
            <div
              key={pos.id}
              className="bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-lg hover:border-[#ED1C24] transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6 text-left"
            >
              <div className="space-y-3 max-w-2xl">
                <span className="text-xs font-bold text-[#ED1C24] uppercase tracking-wider bg-red-50 px-3 py-1 rounded-full border border-red-100">
                  {pos.department}
                </span>
                <h3 className="text-2xl font-black text-[#222222] tracking-tight">
                  {pos.title}
                </h3>
                <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1.5 bg-[#F5F5F5] px-3 py-1.5 rounded-lg border border-slate-200/60">
                    <MapPin className="h-4 w-4 text-[#ED1C24]" />
                    {pos.location}
                  </span>
                  <span className="flex items-center gap-1.5 bg-[#F5F5F5] px-3 py-1.5 rounded-lg border border-slate-200/60">
                    <Clock className="h-4 w-4 text-[#ED1C24]" />
                    {pos.type}
                  </span>
                  <span className="flex items-center gap-1.5 bg-[#F5F5F5] px-3 py-1.5 rounded-lg border border-slate-200/60">
                    <Briefcase className="h-4 w-4 text-[#ED1C24]" />
                    Experience: {pos.experience}
                  </span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed pt-1">
                  {pos.description}
                </p>
              </div>

              <div className="flex-shrink-0">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#ED1C24] hover:bg-[#D0171E] text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-colors shadow-md"
                >
                  Apply Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <IndustrialChallengeCTA />
    </div>
  )
}
