import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ArrowRight, CheckCircle2 } from 'lucide-react'
import IndustrialChallengeCTA from '../components/ui/IndustrialChallengeCTA'

export default function FirePumpSolutions() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeIndustryIndex, setActiveIndustryIndex] = useState(0)

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      const maxScroll = scrollWidth - clientWidth
      if (maxScroll > 0) {
        const progress = Math.abs(scrollLeft) / maxScroll
        setScrollProgress(Math.min(1, Math.max(0, progress)))
      }
    }
  }

  const scrollSlider = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -340 : 340
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }

  const solutionItems = [
    {
      num: '01 / 08',
      title: 'Packaged Fire Pump Sets',
      desc: 'High-capacity, UL-listed and FM-approved packaged pump sets designed for continuous industrial reliability.',
      image: '/PRODUCTS/SPP PUMPS/PACKAGED FIRE SETS.jpg'
    },
    {
      num: '02 / 08',
      title: 'Vertical Turbine Fire Pumps',
      desc: 'Engineered for sub-surface water sources, deep sumps, reservoirs, and marine seawater intake applications.',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '03 / 08',
      title: 'End Suction Fire Pump Packages',
      desc: 'Compact footprint, highly reliable single-stage fire pumps optimized for commercial buildings and industrial complexes.',
      image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '04 / 08',
      title: 'Pre-Packaged Fire Pump Houses',
      desc: 'Fully pre-packaged, skid-mounted fire pump enclosures equipped with integrated piping, power, and controls.',
      image: '/PRODUCTS/SPP PUMPS/PRE-PACKAGED PUMP HOUSES.jpg'
    },
    {
      num: '05 / 08',
      title: 'Diesel Engine Driven Pump Sets',
      desc: 'Heavy-duty emergency diesel sets with dual battery cranking and automated NFPA-compliant test controllers.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '06 / 08',
      title: 'Electric Motor Driven Pump Sets',
      desc: 'High-efficiency electric motor driven fire pumps featuring soft-starting and automatic transfer switch (ATS) integration.',
      image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '07 / 08',
      title: 'Jockey & Pressure Maintenance Pumps',
      desc: 'High-head multistage pumps maintaining constant system pressure and preventing unnecessary main pump start cycles.',
      image: 'https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '08 / 08',
      title: 'Offshore & Marine Deluge Systems',
      desc: 'Corrosion-resistant Super Duplex and Nickel-Aluminum Bronze fire pumps engineered for harsh offshore marine environments.',
      image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80'
    }
  ]

  const industries = [
    {
      id: 'oil-gas-refineries',
      tabName: 'Oil & Gas / Refineries',
      tag: 'OIL & GAS / REFINERIES',
      title: 'Certified Deluge & High-Volume Fire Water for Hydrocarbon Facilities',
      desc: 'Providing NFPA 20, UL-listed, and FM-approved fire pump packages engineered for high-risk petroleum storage, tank farms, upstream operations, and processing terminals where safety and zero failure rates are non-negotiable.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      features: [
        'Full NFPA 20 & API Compliance with Certified Test Data',
        'Heavy-Duty Diesel & Electric Driven Redundant Systems',
        'High-Flow Horizontal Split-Case & Vertical Turbine Configurations',
        'Explosion-Proof Instrumentation for Zone 1 & Zone 2 Hazardous Areas'
      ]
    },
    {
      id: 'commercial-highrise',
      tabName: 'Commercial & High-Rise',
      tag: 'COMMERCIAL & HIGH-RISE',
      title: 'High-Pressure Fire Suppression for Modern Architectural Landmarks',
      desc: 'Delivering compact, high-efficiency vertical and end-suction fire pump sets designed to meet stringent civil defense codes, ensuring reliable pressure delivery across high-rise buildings and multi-zone distribution networks.',
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
      features: [
        'Compact Modular Skid Footprint for Plant Rooms',
        'Multi-Stage High-Head Pressure Delivery for High-Rises',
        'Automated Weekly Self-Testing and Status Logging',
        'Integrated Jockey Pump Sets for Static Pressure Stability'
      ]
    },
    {
      id: 'petrochemicals-chemical',
      tabName: 'Petrochemicals & Chemicals',
      tag: 'PETROCHEMICALS & CHEMICALS',
      title: 'Rapid-Response Foam & Water Fire Protection for Chemical Plants',
      desc: 'Engineered fire water packages built with specialized metallurgy to handle corrosive industrial water supplies, providing instantaneous deluge response for chemical processing columns, bulk loading gantries, and volatile solvent storage.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      features: [
        'Corrosion-Resistant Impellers and Shaft Sleeves',
        'Foam Proportioning & Water Deluge Integration',
        'Dual Redundant Diesel Starting Circuits',
        'Severe Chemical Environment Paint and Coating Specifications'
      ]
    },
    {
      id: 'power-utilities',
      tabName: 'Power & Utilities',
      tag: 'POWER & UTILITIES',
      title: 'Uncompromised Fire Safety for Power Plants and Major Substations',
      desc: 'Safeguarding heavy power generation assets, step-up transformer yards, and grid substations with dedicated high-volume fire water pump sets capable of high-discharge spray cooling under emergency fault conditions.',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
      features: [
        'Transformer Deluge Spray High-Discharge Rates',
        'Seismic and Vibration Certified Pump Packages',
        'Remote Telemetry and SCADA Monitoring Interface',
        'Dual Fuel/Electric Driver Redundancy'
      ]
    },
    {
      id: 'manufacturing-warehousing',
      tabName: 'Industrial & Warehousing',
      tag: 'INDUSTRIAL & WAREHOUSING',
      title: 'Pre-Engineered Containerized Pump Houses for Logistics Hubs',
      desc: 'Plug-and-play containerized fire pump houses designed for mega logistics distribution hubs, automated warehousing, and manufacturing facilities, drastically slashing civil works and onsite commissioning timelines.',
      image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
      features: [
        'Factory Tested & Pre-Wired Turnkey Packaged Enclosures',
        'Integrated Lighting, Ventilation, and Heating Systems',
        'Rapid Site Installation with Minimal Civil Concrete Requirements',
        'ESFR Sprinkler System High-Volume Water Flow Support'
      ]
    },
    {
      id: 'offshore-renewables',
      tabName: 'Offshore & Marine',
      tag: 'OFFSHORE & MARINE',
      title: 'Extreme Marine Alloy Fire Pumps for Seawater Immersion',
      desc: 'Manufactured with Nickel-Aluminum Bronze (NAB), Super Duplex, and Titanium materials to resist pitting and bio-fouling, delivering mission-critical fire safety on offshore facilities, ports, and coastal berths.',
      image: 'https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=800&q=80',
      features: [
        'Super Duplex & NAB Construction for Seawater Immersion',
        'Deep Submerged Column Vertical Turbine Engineering',
        'ATEX / IECEx Explosion-Proof Certifications',
        'Extreme Reliability Under Marine Wave Dynamic Loads'
      ]
    }
  ]

  const currentSector = industries[activeIndustryIndex]

  return (
    <div className="font-sans min-h-screen bg-slate-50">
      {/* 1. Hero Section */}
      <div className="pt-28 sm:pt-32 pb-6 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative w-full min-h-[450px] py-16 rounded-3xl overflow-hidden bg-slate-900 text-white flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
            alt="Fire Pump Solutions"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="max-w-4xl mx-auto px-6 relative z-20 text-center space-y-6">
            <span className="eyebrow block">
              HOME / INDUSTRIAL SOLUTIONS / FIRE PUMP SOLUTIONS
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Fire Pump Solutions
            </h1>
            <p className="text-slate-200 max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed font-normal">
              Delivering comprehensive FM-Approved and UL-Listed fire pump packages, we provide certified emergency fire protection and water delivery systems engineered to safeguard human lives and critical assets across Kenya and East Africa.
            </p>
          </div>
        </section>
      </div>

      {/* 2. Engineering Solutions Section (Solid Brand Left Box + Horizontal Carousel) */}
      <section className="py-12 px-4 max-w-[1360px] mx-auto my-4 font-sans">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          
          {/* Left Solid Brand Card */}
          <div className="w-full lg:w-[320px] bg-brand-primary text-white rounded-3xl p-8 flex flex-col justify-between items-start shadow-lg flex-shrink-0 min-h-[420px]">
            <div className="space-y-4 text-start">
              <h2 className="text-3xl font-extrabold tracking-tight leading-tight">
                Engineering Solutions for Critical Industrial Operations
              </h2>
              <p className="text-slate-100 text-sm leading-relaxed">
                Delivering FM-Approved and UL-Listed fire pump packages, containerized pump houses, and emergency water pumping systems that safeguard critical assets and human lives.
              </p>
            </div>
            <Link
              to="/contact"
              className="mt-6 px-6 py-2.5 bg-white text-brand-primary font-bold text-sm rounded-xl hover:bg-slate-100 transition-colors shadow-sm"
            >
              Contact Engineering Team
            </Link>
          </div>

          {/* Right Scrollable Carousel */}
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {solutionItems.map((item, idx) => (
                <div
                  key={idx}
                  className="w-[280px] sm:w-[310px] h-[370px] sm:h-[400px] rounded-3xl overflow-hidden relative shadow-md hover:shadow-xl transition-all duration-300 flex-shrink-0 snap-start block group bg-slate-900"
                >
                  {/* Item number badge */}
                  <div className="absolute top-4 right-4 z-20 text-[11px] font-bold text-white/90 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 tracking-wider">
                    {item.num}
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 z-10"></div>
                  
                  {/* Background Image */}
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  
                  {/* Bottom Text Content */}
                  <div className="absolute bottom-6 left-6 right-6 z-20 text-start space-y-1.5">
                    <h3 className="text-xl font-extrabold text-white tracking-tight leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Slider Navigation & Progress Line */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
              {/* Progress Line */}
              <div className="flex-1 max-w-xs bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-brand-primary h-full transition-all duration-300 rounded-full"
                  style={{ width: `${Math.max(12, scrollProgress * 100)}%` }}
                ></div>
              </div>

              {/* Arrow controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollSlider('left')}
                  className="h-10 w-10 bg-brand-primary text-white hover:bg-brand-secondary active:scale-95 rounded-xl flex items-center justify-center transition-all shadow-sm cursor-pointer"
                  aria-label="Previous items"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => scrollSlider('right')}
                  className="h-10 w-10 bg-brand-primary text-white hover:bg-brand-secondary active:scale-95 rounded-xl flex items-center justify-center transition-all shadow-sm cursor-pointer"
                  aria-label="Next items"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Trusted Technology Partners Section */}
      <section className="py-12 px-4 max-w-[1360px] mx-auto my-4 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white border border-slate-100 rounded-3xl p-8 sm:p-12 shadow-sm">
          {/* Left Text Info */}
          <div className="lg:col-span-7 space-y-4 text-start">
            <span className="eyebrow block">
              PARTNERS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Trusted Technology Partners Driving Innovation
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base max-w-xl">
              We collaborate with global centrifugal pump and fire protection leaders to deliver validated engineering packages that safeguard lives, assets, and operations across Kenya and East Africa.
            </p>
            <div className="pt-2">
              <Link
                to="/partners"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary hover:bg-brand-secondary text-white font-bold rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-xs sm:text-sm uppercase tracking-wider"
              >
                View All Partners
              </Link>
            </div>
          </div>

          {/* Right Partner Logo Card (SPP Pumps) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <Link
              to="/solutions/fire-pump-solutions/spp-pumps"
              className="bg-white border border-slate-200/80 hover:border-brand-primary/50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center w-full max-w-[280px] sm:max-w-[320px] h-[150px] group"
            >
              <img
                src="/PARTNERS LOGO/SPP.jpg"
                alt="SPP Pumps"
                className="max-h-16 max-w-[200px] object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Industries We Serve Section */}
      <section className="py-16 px-4 max-w-[1360px] mx-auto my-6 font-sans">
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="eyebrow block">
            SECTORS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Industries we serve
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Our engineering expertise in fire protection pumping covers critical industries, delivering fully certified, high-reliability emergency systems.
          </p>
        </div>

        {/* Tab Navigation Bar */}
        <div className="flex items-center border border-slate-200 rounded-xl overflow-x-auto scrollbar-none bg-white shadow-sm mb-8">
          {industries.map((ind, index) => {
            const isActive = activeIndustryIndex === index
            return (
              <button
                key={ind.id}
                onClick={() => setActiveIndustryIndex(index)}
                className={`px-6 py-3.5 text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 border-r border-slate-200 last:border-r-0 cursor-pointer flex-shrink-0 ${
                  isActive
                    ? 'bg-brand-primary text-white shadow-inner'
                    : 'text-slate-700 hover:text-brand-primary hover:bg-slate-50'
                }`}
              >
                {ind.tabName}
              </button>
            )
          })}
        </div>

        {/* Tab Content Box */}
        <div className="bg-white border border-slate-100 rounded-3xl p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-start">
              <span className="eyebrow block">
                {currentSector.tag}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {currentSector.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {currentSector.desc}
              </p>

              {/* Feature Checklist */}
              <div className="space-y-3 pt-2">
                {currentSector.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-800">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Explore Sector Button */}
              <div className="pt-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary hover:bg-brand-secondary text-white font-bold rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-xs sm:text-sm uppercase tracking-wider"
                >
                  <span>Request Engineering Consultation</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right Sector Image */}
            <div className="lg:col-span-5 h-[340px] sm:h-[400px] rounded-2xl overflow-hidden relative shadow-md">
              <img
                src={currentSector.image}
                alt={currentSector.tabName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white text-start">
                <span className="text-xs uppercase tracking-widest text-slate-300 font-bold block">
                  SPECIALIZED SECTOR
                </span>
                <span className="text-lg font-bold">
                  {currentSector.tabName}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bottom CTA Section */}
      <IndustrialChallengeCTA bgImage="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80" />
    </div>
  )
}
