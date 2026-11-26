import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ArrowRight, CheckCircle2 } from 'lucide-react'
import IndustrialChallengeCTA from '../components/ui/IndustrialChallengeCTA'

export default function IndustrialRefrigerationSolutions() {
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
      title: 'Ammonia Screw Compressor Packages',
      desc: 'High-COP twin-screw ammonia (NH3) compressor packages engineered for heavy-duty industrial cold storage and processing.',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '02 / 08',
      title: 'Reciprocating Refrigeration Packages',
      desc: 'Robust open-type and semi-hermetic reciprocating compressor units engineered for flexible staged refrigeration loads.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '03 / 08',
      title: 'Continuous Blast Freezing Tunnels',
      desc: 'Rapid IQF and blast freezing tunnels (-35°C to -40°C) preserving product cellular structure in poultry, meat, and vegetables.',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '04 / 08',
      title: 'Controlled Atmosphere (CA) Cold Stores',
      desc: 'Turnkey hermetic cold rooms with precise humidity, O2, and CO2 monitoring for prolonged avocado and fruit export shelf life.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '05 / 08',
      title: 'Evaporative Condensers & Cooling Towers',
      desc: 'Induced-draft evaporative condensers delivering superior heat rejection efficiency and minimal water consumption in warm climates.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '06 / 08',
      title: 'Secondary Glycol & Brine Chilling Skids',
      desc: 'Compact, pre-piped secondary coolant pumping skids designed for safe, indirect chilling in food and beverage plants.',
      image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '07 / 08',
      title: 'Process Gas Liquefaction Packages',
      desc: 'Heavy-duty multi-stage cooling skids engineered for CO2 recovery, LPG handling, and industrial chemical boil-off re-liquefaction.',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '08 / 08',
      title: 'Refrigeration Plant Automation & Gas Safety',
      desc: 'PLC-based centralized compressor sequencing, automated defrost scheduling, and certified ammonia leak detection safety systems.',
      image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80'
    }
  ]

  const industries = [
    {
      id: 'horticulture-export',
      tabName: 'Horticulture & Fresh Produce Export',
      tag: 'AGRICULTURE & FRESH EXPORT',
      title: 'Unbroken Cold Chain for Kenya’s Fresh Export Hubs',
      desc: 'Delivering precision pre-cooling systems, hydrocoolers, and humidity-managed cold storage rooms designed to secure the shelf-life and premium export value of avocados, fresh cut flowers, green beans, and mangoes destined for European and global markets.',
      features: [
        'Forced-air rapid pre-cooling rooms bringing produce to 2°C in hours',
        'High-humidity evaporators preventing dehydration and weight loss in flowers',
        'Energy-efficient multi-compressor sequencing reducing plant power tariffs',
        'Integrated cold room temperature telemetry for export certification audits'
      ],
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'dairy-beverage',
      tabName: 'Dairy & Beverage Processing',
      tag: 'DAIRY, BEVERAGE & BREWING',
      title: 'Hygienic Temperature Control for Dairies & Breweries',
      desc: 'Engineered ammonia and glycol refrigeration packages providing precise cooling for milk pasteurization, beer fermentation, wort chilling, and hygienic refrigerated holding tanks.',
      features: [
        'Rapid milk chilling from 35°C to 4°C protecting milk bacteriological quality',
        'Sub-zero glycol brine chilling systems for glycol fermentation jackets',
        'Ice bank thermal energy storage capitalizing on off-peak electricity tariffs',
        'Stainless steel evaporators and hygienic, food-grade sanitary piping'
      ],
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'meat-poultry',
      tabName: 'Meat & Poultry Processing',
      tag: 'MEAT, POULTRY & SEAFOOD',
      title: 'Industrial Blast Freezing & Abattoir Cold Logistics',
      desc: 'High-capacity refrigeration systems for carcass chill rooms, blast freezing tunnels (-35°C), and refrigerated deboning halls engineered to strict food safety and hygiene protocols.',
      features: [
        'Rapid continuous air blast freezing preventing large ice crystal formation',
        'Carcass chilling rooms designed for minimal surface drying and shrinkage',
        'Reliable oil-flooded screw compressors engineered for heavy refrigeration loads',
        'Safe ammonia distribution with computerized emergency vent systems'
      ],
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'chemicals-pharma',
      tabName: 'Chemical & Pharmaceutical',
      tag: 'CHEMICALS & PHARMACEUTICALS',
      title: 'Precision Process Cooling & Low-Temp Storage',
      desc: 'Certified explosion-proof and cleanroom refrigeration systems providing continuous low-temperature cooling for chemical reactors, solvent recovery, and active pharmaceutical ingredient (API) storage.',
      features: [
        'ATEX / IECEx compliant explosion-proof electrical assemblies',
        'Ultra-low temperature multi-stage cascade refrigeration skids',
        'Dual-refrigerant loop redundancy preventing single-point failure risks',
        'cGMP and FDA compliant temperature data logging and reporting'
      ],
      image: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=1000&q=80'
    }
  ]

  const currentSector = industries[activeIndustryIndex]

  return (
    <div className="font-sans min-h-screen bg-slate-50 text-slate-800">
      {/* 1. Hero Section */}
      <div className="pt-28 sm:pt-32 pb-6 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative w-full min-h-[450px] py-16 rounded-3xl overflow-hidden bg-slate-900 text-white flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
            alt="Industrial Refrigeration Solutions"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="max-w-4xl mx-auto px-6 relative z-20 text-center space-y-6">
            <span className="eyebrow block">
              HOME / INDUSTRIAL SOLUTIONS / INDUSTRIAL REFRIGERATION
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Industrial Refrigeration Solutions
            </h1>
            <p className="text-slate-200 max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed font-normal">
              Turnkey industrial refrigeration, cold chain storage, and blast freezing solutions engineered with Kirloskar Pneumatic. Delivering maximum thermodynamic efficiency, ultra-low operating costs, and continuous temperature integrity across Kenya and East Africa.
            </p>
          </div>
        </section>
      </div>

      {/* 2. Solutions Carousel Section */}
      <section className="py-16 px-4 max-w-[1360px] mx-auto my-6 font-sans">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">

          {/* Left Solid Brand Card */}
          <div className="w-full lg:w-[320px] bg-brand-primary text-white rounded-3xl p-8 flex flex-col justify-between items-start shadow-lg flex-shrink-0 min-h-[420px]">
            <div className="space-y-4 text-start">
              <h2 className="text-3xl font-extrabold tracking-tight leading-tight">
                High-Efficiency Cold Chain & Process Cooling Systems
              </h2>
              <p className="text-slate-100 text-sm leading-relaxed">
                From high-capacity ammonia screw compressor packages to controlled atmosphere cold stores, our engineering team designs solutions engineered for high ambient African climates.
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
                  className="w-[280px] sm:w-[310px] h-[370px] sm:h-[400px] rounded-3xl overflow-hidden relative shadow-md hover:shadow-xl transition-all duration-300 flex-shrink-0 snap-start block group"
                >
                  <div className="absolute top-4 right-4 z-20 text-[11px] font-bold text-white/90 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 tracking-wider">
                    {item.num}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 z-10"></div>

                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

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
              <div className="flex-1 max-w-xs bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-brand-primary h-full transition-all duration-300 rounded-full"
                  style={{ width: `${Math.max(12, scrollProgress * 100)}%` }}
                ></div>
              </div>

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

      {/* 3. Trusted Technology Partners Section (Kirloskar Pneumatic) */}
      <section className="py-12 px-4 max-w-[1360px] mx-auto my-4 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white border border-slate-100 rounded-3xl p-8 sm:p-12 shadow-sm">
          <div className="lg:col-span-7 space-y-4 text-start">
            <span className="eyebrow block">
              PARTNERS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Trusted Technology Partners Driving Refrigeration Excellence
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base max-w-xl">
              In partnership with Kirloskar Pneumatic, we deliver industry-leading ammonia screw compressors, reciprocating chilling units, and complete turnkey cooling installations tested to global engineering standards.
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

          {/* Right Partner Logo Card -> Click goes to respective products page */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <Link
              to="/solutions/industrial-refrigeration/kirloskar-pneumatic"
              className="bg-white border border-slate-200/80 hover:border-brand-primary/60 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center w-full max-w-[320px] h-[150px] group overflow-hidden"
              title="Explore Kirloskar Pneumatic Products"
            >
              <img
                src="/PARTNERS LOGO/KIRLOSKAR PNEUMATIC.jpg"
                alt="Kirloskar Pneumatic"
                className="h-16 sm:h-20 w-auto max-w-[85%] max-h-[85px] object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Industries We Serve Section */}
      <section className="py-16 px-4 max-w-[1360px] mx-auto my-6 font-sans">
        <div className="text-center space-y-3 mb-12">
          <span className="eyebrow block">
            SECTORS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Industries we serve
          </h2>
          <p className="text-slate-550 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Our industrial refrigeration engineering experience covers multiple specialized sectors, delivering optimized solutions for strict requirements.
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
          <div className="lg:col-span-6 w-full">
            <div className="rounded-2xl overflow-hidden h-[300px] sm:h-[400px] shadow-sm relative group bg-slate-900">
              <img
                src={currentSector.image}
                alt={currentSector.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

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

      {/* 5. Bottom CTA Section */}
      <IndustrialChallengeCTA bgImage="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80" />
    </div>
  )
}

