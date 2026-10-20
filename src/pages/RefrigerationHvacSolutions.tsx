import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ArrowRight, CheckCircle2 } from 'lucide-react'
import IndustrialChallengeCTA from '../components/ui/IndustrialChallengeCTA'

export default function RefrigerationHvacSolutions() {
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
      title: 'Water-Cooled Chillers',
      desc: 'High-efficiency centrifugal and screw chillers engineered for large-scale process and district cooling.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '02 / 08',
      title: 'Air-Cooled Chillers',
      desc: 'Robust, compact air-cooled chiller systems engineered to withstand severe ambient operating temperatures.',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '03 / 08',
      title: 'Ammonia Screw Packages',
      desc: 'Heavy-duty natural refrigerant screw compressor packages delivering superior COP and eco-compliance.',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '04 / 08',
      title: 'Cold Storage & Blast Freezers',
      desc: 'Turnkey industrial cold room engineering, spiral freezers, and deep-freeze logistics infrastructure.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '05 / 08',
      title: 'Process Gas Cooling',
      desc: 'Custom-built refrigeration systems for petrochemical refineries, gas recovery, and chemical synthesis.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '06 / 08',
      title: 'Evaporative Condensers',
      desc: 'Advanced heat rejection systems offering low water consumption and maximum thermodynamic efficiency.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '07 / 08',
      title: 'District Cooling Equipment',
      desc: 'Large tonnage modular chillers and thermal energy storage solutions for central district energy plants.',
      image: 'https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '08 / 08',
      title: 'Retrofit & Energy Auditing',
      desc: 'Compressor overhauls, refrigerant conversions, and smart automation retrofits maximizing plant lifecycle.',
      image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80'
    }
  ]

  const industries = [
    {
      id: 'food-beverage',
      tabName: 'Food, Beverage & Cold Chain',
      tag: 'FOOD, BEVERAGE & COLD CHAIN',
      title: 'Preserving Freshness & Food Safety Across Cold Chains',
      desc: 'Deploying ultra-reliable ammonia screw compressor packages, automated spiral blast freezers, and hygienic cold rooms to maintain critical temperatures from processing to distribution.',
      features: [
        'High COP ammonia and eco-refrigerant screw compressor packages',
        'Automated spiral blast freezers and multi-temperature staging rooms',
        'Hygienic clean air distribution and AHUs for food processing areas',
        '24/7 continuous thermal logging and automated alarm monitoring'
      ],
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'petrochemical',
      tabName: 'Oil, Gas & Petrochemical',
      tag: 'OIL, GAS & PETROCHEMICAL',
      title: 'Severe-Duty Process Refrigeration & Gas Liquefaction',
      desc: 'Custom engineered refrigeration skids built to API standards for boil-off gas reliquefaction, chemical reactor cooling, and explosive hazardous area operations.',
      features: [
        'API 619 compliant screw refrigeration skids with explosion-proof controls',
        'Titanium and duplex corrosion-resistant heat exchangers for sour gas',
        'High-ambient cooling design with sand separation filters',
        'Boil-off gas (BOG) recovery and hydrocarbon condensation packages'
      ],
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'power-energy',
      tabName: 'Power & Energy Utilities',
      tag: 'POWER & ENERGY UTILITIES',
      title: 'Gas Turbine Inlet Cooling & Thermal Energy Storage',
      desc: 'Maximizing gas turbine power output during peak temperatures using inlet air cooling (TIAC) and high-density thermal storage systems.',
      features: [
        'Turbine Inlet Air Cooling (TIAC) with instantaneous chilling',
        'Thermal Energy Storage (TES) ice banks for off-peak load shifting',
        'High-capacity evaporative condensers with zero-water loss systems',
        'Automated thermodynamic modulation and turbine output optimization'
      ],
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'water-district',
      tabName: 'Water & District Cooling',
      tag: 'WATER & DISTRICT COOLING',
      title: 'Mega-Tonnage District Cooling & Central Chilled Water Plants',
      desc: 'Providing ultra-high efficiency water-cooled centrifugal and screw chillers in series-counterflow configurations for sustainable city-scale cooling networks.',
      features: [
        'Centrifugal chillers with VFDs up to 3,000 TR per single unit',
        'Series-counterflow plant designs delivering extreme Delta-T efficiency',
        'Integration with seawater or treated sewage effluent (TSE) cooling',
        'Centralized SCADA integration and AI-driven plant sequencing'
      ],
      image: 'https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'pharma',
      tabName: 'Food, Beverage & Pharma',
      tag: 'PHARMACEUTICALS & BIOTECH',
      title: 'Precision Cleanroom HVAC & Ultra-Low Cascade Systems',
      desc: 'Delivering cGMP-compliant cleanroom air handling systems, close-tolerance humidity control, and ultra-low temperature cascades (-80°C) for vaccine and biologic storage.',
      features: [
        'cGMP and FDA validated cleanroom air conditioning and filtration',
        'Ultra-low temperature cascade freezers (-40°C down to -80°C)',
        'Precision psychrometric control (RH ±2% and Temp ±0.5°C)',
        'Comprehensive DQ/IQ/OQ/PQ validation packages and calibration'
      ],
      image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'metals-heavy',
      tabName: 'Metals, Mining & Heavy Industry',
      tag: 'METALS, MINING & HEAVY INDUSTRY',
      title: 'Heavy Process Fluid Chillers & Extreme Ambient Cooling',
      desc: 'Providing robust closed-loop process cooling for blast furnaces, metal extrusion, plastics molding, and severe-environment control room pressurization.',
      features: [
        'Heavy-duty air-cooled and water-cooled closed-loop fluid chillers',
        'Corrosion-resistant copper-nickel and epoxy-coated coils',
        'Continuous duty operation in demanding climatic conditions',
        'Redundant dual-circuit compressors and automated failover pumps'
      ],
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=80'
    }
  ]

  const currentSector = industries[activeIndustryIndex]

  return (
    <div className="font-sans min-h-screen bg-slate-50 text-slate-800">
      
      {/* 1. Hero Section */}
      <div className="pt-28 sm:pt-32 pb-6 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative w-full min-h-[450px] py-16 rounded-3xl overflow-hidden bg-slate-900 text-white flex items-center justify-center">
          <div className="absolute inset-0 bg-black/65 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80"
            alt="Refrigeration & HVAC Solutions"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="max-w-4xl mx-auto px-6 relative z-20 text-center space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
              HOME / INDUSTRIAL SOLUTIONS / REFRIGERATION & HVAC SOLUTIONS
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Refrigeration & HVAC Solutions
            </h1>
            <p className="text-slate-200 max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed font-normal">
              Delivering comprehensive industrial refrigeration, process cooling, and large-scale HVAC systems, we provide robust solutions engineered for high-efficiency temperature control in demanding industrial and commercial environments across Kenya and East Africa.
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
                Engineering Solutions for Critical Cooling & Refrigeration
              </h2>
              <p className="text-slate-100 text-sm leading-relaxed">
                Delivering advanced process chillers, refrigeration packages, ammonia systems, and energy-efficient cooling solutions engineered for continuous industrial operations.
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
          <div className="lg:col-span-6 space-y-4 text-start">
            <span className="text-xs font-bold text-brand-primary uppercase tracking-widest block">
              PARTNERS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Trusted Technology Partners Driving Cooling Excellence
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base max-w-xl">
              We collaborate with world-renowned refrigeration and HVAC leaders to deliver validated, energy-efficient cooling solutions built to withstand extreme climatic conditions across Kenya and East Africa.
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

          {/* Right 2 Partner Logo Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Kirloskar Pneumatic */}
            <Link
              to="/solutions/refrigeration-hvac-solutions/kirloskar-pneumatic"
              className="bg-white border border-slate-200/80 hover:border-brand-primary/60 rounded-2xl p-6 shadow-2xs hover:shadow-md transition-all duration-300 flex items-center justify-center h-[140px] sm:h-[150px] group overflow-hidden"
              title="Kirloskar Pneumatic"
            >
              <img
                src="/PARTNERS LOGO/KIRLOSKAR PNEUMATIC.jpg"
                alt="Kirloskar Pneumatic"
                className="h-16 sm:h-20 w-auto max-w-[85%] object-contain scale-100 group-hover:scale-105 transition-transform duration-300"
              />
            </Link>

            {/* Kirloskar Chillers */}
            <Link
              to="/solutions/refrigeration-hvac-solutions/kirloskar-chillers"
              className="bg-white border border-slate-200/80 hover:border-brand-primary/60 rounded-2xl p-6 shadow-2xs hover:shadow-md transition-all duration-300 flex items-center justify-center h-[140px] sm:h-[150px] group overflow-hidden"
              title="Kirloskar Chillers"
            >
              <img
                src="/PARTNERS LOGO/KCPL.jpg"
                alt="Kirloskar Chillers"
                className="h-16 sm:h-20 w-auto max-w-[85%] object-contain scale-100 group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Industries We Serve Section */}
      <section className="py-16 px-4 max-w-[1360px] mx-auto my-6 font-sans">
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest block">
            SECTORS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Industries we serve
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Our engineering experience covers multiple specialized sectors, delivering optimized solutions for strict requirements.
          </p>
        </div>

        {/* Tab Navigation Bar */}
        <div className="flex items-center border border-slate-200 rounded-xl overflow-x-auto scrollbar-none bg-white shadow-xs mb-8">
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
            <span className="text-xs font-bold text-brand-primary uppercase tracking-widest block">
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
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary hover:bg-brand-secondary text-white font-bold rounded-lg transition-colors text-xs sm:text-sm uppercase tracking-wider shadow-sm"
              >
                <span>REQUEST INDUSTRY CONSULTATION</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bottom Call to Action Section */}
      <IndustrialChallengeCTA />

    </div>
  )
}
