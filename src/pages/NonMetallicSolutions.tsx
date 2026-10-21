import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ArrowRight, CheckCircle2 } from 'lucide-react'
import IndustrialChallengeCTA from '../components/ui/IndustrialChallengeCTA'

export default function NonMetallicSolutions() {
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
      title: 'FRP & GRP Piping Systems',
      desc: 'High-strength, corrosion-resistant composite piping engineered for demanding process fluids.',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '02 / 08',
      title: 'Chemical Storage Tanks',
      desc: 'Custom-engineered composite tanks and process vessels offering superior chemical resistance.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '03 / 08',
      title: 'Underground Tanks (UGST)',
      desc: 'Robust double-wall underground tanks engineered for fuel, chemical, and effluent containment.',
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '04 / 08',
      title: 'Molded & Pultruded Gratings',
      desc: 'Slip-resistant, non-corrosive FRP gratings and walkways for hazardous plant floors.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '05 / 08',
      title: 'FRP Cable Trays & Raceways',
      desc: 'Non-conductive, fire-retardant cable management systems designed for chemical zones.',
      image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '06 / 08',
      title: 'Structural Pultruded Profiles',
      desc: 'Lightweight, ultra-durable composite beams, channels, and structural sections.',
      image: 'https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '07 / 08',
      title: 'FRP Ladders & Safety Cages',
      desc: 'Non-sparking, dielectric safety ladders designed for safe access in harsh facilities.',
      image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '08 / 08',
      title: 'Lighting Poles & Meter Boxes',
      desc: 'Weatherproof, corrosion-proof lighting poles and enclosures for municipal and industrial utilities.',
      image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'
    }
  ]

  const industries = [
    {
      id: 'chemical-petrochemical',
      tabName: 'Chemical & Petrochemical',
      tag: 'CHEMICAL & PETROCHEMICAL',
      title: 'Extreme Corrosion Resistance for Aggressive Chemical Media',
      desc: 'Providing non-metallic composite piping, dual-laminate reactors, scrubbers, and acid storage tanks engineered to resist acids, alkalis, solvents, and corrosive process vapors across severe industrial operating units.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      features: [
        'High Chemical Inertness to Concentrated Acids & Alkalis',
        'Dual-Laminate & Custom Vinyl Ester Resin Systems',
        'Zero Corrosion-Induced Wall Degradation or Wall Thinning',
        'Seamless Integration with Existing Plant Flanges and Systems'
      ]
    },
    {
      id: 'water-wastewater',
      tabName: 'Water & Wastewater Treatment',
      tag: 'WATER & WASTEWATER',
      title: 'Durable, Long-Life Infrastructure for Treatment & Sewage',
      desc: 'Delivering large-diameter GRP intake headers, sea water outfall lines, sewage manholes, weir troughs, and chemical dosing tanks impervious to microbial corrosion and chloride attack in modern treatment facilities.',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
      features: [
        'High Hydraulic Flow Coefficients (Low Friction Loss)',
        '50+ Year Design Life in Aggressive Saline & Sewage Media',
        'Biogenic Sulfide & Microbially Induced Corrosion Immunity',
        'Lightweight Modular Installation with Minimal Heavy Craneage'
      ]
    },
    {
      id: 'oil-gas-offshore',
      tabName: 'Oil & Gas / Offshore',
      tag: 'OIL & GAS / OFFSHORE',
      title: 'Lightweight Composite Solutions for Marine & Platform Facilities',
      desc: 'Delivering fire-resistant FRP deck gratings, offshore handrail systems, high-pressure composite flowlines, and seawater cooling lines engineered to survive salt spray, UV exposure, and intense marine conditions.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      features: [
        'Up to 70% Weight Reduction Compared to Steel Structures',
        'USCG Level-1 & Level-2 Fire-Retardant Certified Materials',
        'Superior Resistance to Salt Spray, Marine Atmospheres & UV',
        'Zero Hot Work Permitting Required for Maintenance & Cutting'
      ]
    },
    {
      id: 'power-desalination',
      tabName: 'Power Generation & Utilities',
      tag: 'POWER GENERATION & UTILITIES',
      title: 'Thermal & Chemical Stability for Critical Utility Plants',
      desc: 'Supplying circulating water cooling lines, flue gas desulfurization (FGD) scrubbers, demineralized water vessels, and non-conductive cable support systems for thermal, combined-cycle, and industrial power utilities.',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
      features: [
        'High Operating Temperature Stability up to 180°C',
        'Electrically Non-Conductive & Dielectric Protection',
        'Erosion Resistance to Slurries & Particulate Flow',
        'Optimized Pressure Rating for High Discharge Headers'
      ]
    },
    {
      id: 'infrastructure-utilities',
      tabName: 'Infrastructure & Utilities',
      tag: 'INFRASTRUCTURE & UTILITIES',
      title: 'Low-Maintenance Structural FRP for Smart Cities & Municipalities',
      desc: 'Engineered composite light poles, utility meter boxes, pedestrian bridge components, and architectural louvers delivering aesthetic excellence, vandal resistance, and total rust immunity in municipal environments.',
      image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
      features: [
        'High Impact Strength & Passive Safety Breakaway Poles',
        'UV-Stabilized Pigmentation with Zero Repainting Costs',
        'Radio Frequency Transparent for Smart Metering & 5G',
        'Custom Geometric & Structural Architectural Profiles'
      ]
    },
    {
      id: 'marine-ports',
      tabName: 'Marine & Ports',
      tag: 'MARINE & PORTS',
      title: 'Seawater-Proof Jetty, Dock & Berthing Facilities',
      desc: 'Deploying non-corrosive floating dock decking, composite piling fenders, jetty catwalks, and fueling line enclosures built to withstand continuous splash zones, tidal variations, and marine organisms.',
      image: 'https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=800&q=80',
      features: [
        'Zero Degradation from Barnacles & Marine Growth Exposure',
        'Non-Slip High Traction Surfaces Even When Submerged',
        'Elastic Impact Energy Absorption for Vessel Berthing',
        'Significant Reduction in Port Lifecycle Maintenance Costs'
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
            src="https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=1200&q=80"
            alt="Non Metallic Solution"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="max-w-4xl mx-auto px-6 relative z-20 text-center space-y-6">
            <span className="eyebrow block">
              HOME / INDUSTRIAL SOLUTIONS / NON METALLIC SOLUTION
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Non Metallic Solution
            </h1>
            <p className="text-slate-200 max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed font-normal">
              Delivering comprehensive non-metallic, FRP, and GRP composite systems, we provide advanced corrosion-resistant piping, chemical storage tanks, gratings, and structural solutions engineered for harsh industrial, infrastructure, and marine environments across Kenya and East Africa.
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
                Delivering composite piping, chemical containment, gratings, and structural technologies that support corrosion-free and future-ready industrial operations.
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
              We collaborate with global non-metallic and composite pioneers to deliver validated engineering systems that solve severe corrosion challenges across Kenya and East Africa.
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

          {/* Right Partner Logo Card (EPP Composites) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <Link
              to="/solutions/non-metallic-solutions/epp-composites"
              className="bg-white border border-slate-200/80 hover:border-brand-primary/50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center w-full max-w-[280px] sm:max-w-[320px] h-[150px] group"
            >
              <img
                src="/PARTNERS LOGO/EPP.jpg"
                alt="EPP Composites"
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
            Our engineering expertise in non-metallic materials spans critical industries, delivering composite solutions that permanently eliminate corrosion.
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

        {/* Selected Industry Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-sm transition-all duration-300">
          {/* Left Image */}
          <div className="lg:col-span-6 w-full">
            <div className="rounded-2xl overflow-hidden h-[300px] sm:h-[400px] shadow-sm relative group bg-slate-900">
              <img
                src={currentSector.image}
                alt={currentSector.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right Details */}
          <div className="lg:col-span-6 space-y-5 text-start">
            <span className="eyebrow block">
              {currentSector.tag}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {currentSector.title}
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {currentSector.desc}
            </p>

            {/* Key capabilities */}
            <div className="space-y-2.5 pt-2">
              {currentSector.features.map((feat, fidx) => (
                <div key={fidx} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-xs sm:text-sm font-medium">{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-secondary hover:bg-brand-primary text-white font-bold rounded-lg transition-colors text-xs sm:text-sm uppercase tracking-wider"
              >
                Request Industry Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Industrial Challenge CTA */}
      <IndustrialChallengeCTA bgImage="https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=1200&q=80" />
    </div>
  )
}
