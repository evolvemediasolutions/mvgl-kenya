import { Link } from 'react-router-dom'
import { ArrowRight, Briefcase, Users } from 'lucide-react'
import IndustrialChallengeCTA from '../components/ui/IndustrialChallengeCTA'

export default function Careers() {
  return (
    <div className="font-sans min-h-screen bg-white text-[#222222]">
      {/* Hero */}
      <div className="pt-28 sm:pt-32 pb-6 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative w-full h-[450px] rounded-3xl overflow-hidden bg-[#222222] text-white flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
            alt="Careers at MVGL Kenya"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ED1C24] bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20">
              HOME / CAREERS
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Build Your Career with MVGL Kenya
            </h1>
            <p className="text-slate-200 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Join a dedicated engineering community powering manufacturing, energy, and process industries across Kenya and East Africa.
            </p>
          </div>
        </section>
      </div>

      {/* Main Options Grid */}
      <section className="py-20 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Why MVGL */}
          <div className="bg-[#F5F5F5] border border-slate-200 rounded-3xl p-8 sm:p-10 space-y-6 flex flex-col justify-between hover:shadow-lg hover:border-[#ED1C24] transition-all">
            <div className="space-y-4">
              <div className="p-3 bg-red-50 rounded-2xl w-fit text-[#ED1C24]">
                <Users className="h-6 w-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#222222]">
                Why Join MVGL Kenya?
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Discover our work culture, professional development pathways, safety-first philosophy, and how our teams deliver critical engineering value across the region.
              </p>
            </div>
            <div>
              <Link
                to="/why-mvgl"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#ED1C24] hover:bg-[#D0171E] text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-all shadow-md"
              >
                Learn About Life at MVGL
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Open Positions */}
          <div className="bg-[#F5F5F5] border border-slate-200 rounded-3xl p-8 sm:p-10 space-y-6 flex flex-col justify-between hover:shadow-lg hover:border-[#ED1C24] transition-all">
            <div className="space-y-4">
              <div className="p-3 bg-red-50 rounded-2xl w-fit text-[#ED1C24]">
                <Briefcase className="h-6 w-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#222222]">
                Current Openings
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Explore available technical, sales engineering, project management, and field service opportunities based in Nairobi, Kenya.
              </p>
            </div>
            <div>
              <Link
                to="/open-positions"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#222222] hover:bg-[#333333] text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-all shadow-md"
              >
                View Open Positions
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      <IndustrialChallengeCTA />
    </div>
  )
}
