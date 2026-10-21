import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ArrowRight, CheckCircle2 } from 'lucide-react'
import IndustrialChallengeCTA from '../components/ui/IndustrialChallengeCTA'

export default function AirGasSolutions() {
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
      title: 'Air Compressors',
      desc: 'Efficient air compressors engineered for continuous industrial duty.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '02 / 08',
      title: 'Gas Compressors',
      desc: 'Reliable gas compression for demanding process applications.',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '03 / 08',
      title: 'Compressed Air Systems',
      desc: 'Complete compressed air systems designed for performance.',
      image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '04 / 08',
      title: 'Air Treatment',
      desc: 'Air treatment that protects equipment and improves quality.',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '05 / 08',
      title: 'Dryers & Filters',
      desc: 'Dryers and filters that deliver clean, dry compressed air.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '06 / 08',
      title: 'Gas Generation',
      desc: 'On-site gas generation for consistent, cost-effective supply.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '07 / 08',
      title: 'Air Distribution',
      desc: 'Efficient distribution systems for plant-wide air delivery.',
      image: 'https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '08 / 08',
      title: 'Service & Maintenance',
      desc: 'Expert service that maximizes uptime and efficiency.',
      image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80'
    }
  ]

  const industries = [
    {
      id: 'aerospace',
      tabName: 'Aerospace',
      tag: 'AEROSPACE',
      title: 'Enabling Precision Across Aerospace Operations',
      desc: 'Delivering ultra-pure compressed air, customized nitrogen generation, and specialized test-bench pressure systems built to meet rigorous aerospace performance and safety standards.',
      features: [
        'High-purity breathing and instrument air',
        'Nitrogen generation for fuel tank inerting & tire filling',
        'High-pressure test-bench booster systems',
        'Zero-oil risk certified compression equipment'
      ],
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'auto-component',
      tabName: 'Auto Component',
      tag: 'AUTO COMPONENT',
      title: 'Optimizing Efficiency in Auto Component Manufacturing',
      desc: 'Providing continuous, high-efficiency compressed air systems for precision machining, stamping, robotic clamping, and electronics assembly in automotive tier suppliers.',
      features: [
        'Stable pressure for CNC machining and robotic automation',
        'Dry air preventing corrosion in precision metal parts',
        'Variable speed compressors lowering energy costs',
        'Modular air distribution networks'
      ],
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'automotive',
      tabName: 'Automotive',
      tag: 'AUTOMOTIVE',
      title: 'Driving Performance on Automotive Production Lines',
      desc: 'Supplying heavy-duty industrial compressor packages, paint-booth moisture-free air treatment, and automated assembly tool pneumatics for vehicle manufacturing plants.',
      features: [
        'Ultra-clean air for flawless paint finishing',
        'Continuous pneumatic power for robotic assembly lines',
        'Centralized plant-wide utility monitoring',
        'High uptime guarantee with redundant backup configurations'
      ],
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'brewery-bottling',
      tabName: 'Brewery & Bottling',
      tag: 'BREWERY & BOTTLING',
      title: 'Hygienic Air & Gas Solutions for Bottling Lines',
      desc: '100% oil-free Class 0 air compressors, CO2 recovery and compression, high-pressure PET blow-molding air, and sterile filtration ensuring uncontaminated beverage packaging.',
      features: [
        'ISO 8573-1 Class 0 oil-free air certification',
        '40-bar high-pressure boosters for PET bottle blowing',
        'CO2 gas compression and purification packages',
        'Sterile micro-filtration removing airborne contaminants'
      ],
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'buildings-infrastructure',
      tabName: 'Buildings & Infrastructure',
      tag: 'BUILDINGS & INFRASTRUCTURE',
      title: 'Powering Critical Utility & Infrastructure Systems',
      desc: 'Central utility air compressors, construction air supplies, pneumatic automation for facilities, and aeration systems supporting large-scale commercial and civil developments.',
      features: [
        'Centralized utility air for mega-projects & airports',
        'Low-noise rotary screw units for commercial basements',
        'Wastewater aeration and water treatment blowers',
        'Energy audit and smart pressure management'
      ],
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'cement',
      tabName: 'Cement',
      tag: 'CEMENT',
      title: 'Heavy-Duty Air Solutions for Harsh Cement Plants',
      desc: 'Engineered rotary screw and low-pressure blower systems designed for pneumatic conveying, silo fluidization, and dust suppression in extreme, high-particulate conditions.',
      features: [
        'High-dust tolerant heavy filtration assemblies',
        'Energy-efficient pneumatic raw meal & cement transport',
        'Reliable aeration blowers for bulk blending silos',
        'Ruggedized outdoor enclosures and heat resistance'
      ],
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'chemical-fertilizer',
      tabName: 'Chemical & Fertilizer',
      tag: 'CHEMICAL & FERTILIZER',
      title: 'Corrosion-Resistant Gas Compression & Process Utilities',
      desc: 'Specialized API-compliant process gas compressors, dry instrument air packages, and inert gas generation handling aggressive and toxic gases with maximum plant safety.',
      features: [
        'API 619 screw & API 618 reciprocating gas packages',
        'Nitrogen generation for safety purging and blanketing',
        'Explosion-proof ATEX / IECEx certified controls',
        'Corrosion-resistant materials and exotic alloys'
      ],
      image: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'consumer-process-goods',
      tabName: 'Consumer Process Goods',
      tag: 'CONSUMER PROCESS GOODS',
      title: 'Clean & Efficient Utilities for Consumer Manufacturing',
      desc: 'High-speed automated packaging air, nitrogen inerting for shelf-life extension, and energy-optimized compressors delivering reliable uptime for FMCG facilities.',
      features: [
        'Fast response pneumatic supply for high-speed cartoners',
        'Nitrogen flushing systems for fresh packaging',
        'Smart variable flow compressors reducing kWh per unit',
        'Predictive maintenance monitoring systems'
      ],
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80'
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
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
            alt="Air & Gas Solutions"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="max-w-4xl mx-auto px-6 relative z-20 text-center space-y-6">
            <span className="eyebrow block">
              HOME / INDUSTRIAL SOLUTIONS / AIR &amp; GAS SOLUTIONS
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Air & Gas Solutions
            </h1>
            <p className="text-slate-200 max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed font-normal">
              Delivering reliable compressed air and gas systems, we provide complete solutions that support critical industrial processes with maximum efficiency and uptime. Our innovative technologies and engineering expertise help industries such as Manufacturing, Agriculture, Food & Beverage, Infrastructure, and Processing achieve sustainable, safe, and dependable operations across Kenya and East Africa.
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
                Engineering Solutions for Critical Industrial Operations
              </h2>
              <p className="text-slate-100 text-sm leading-relaxed">
                Delivering automation, utilities, robotics, and process technologies that support efficient and future-ready industrial operations.
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
          <div className="lg:col-span-7 space-y-4 text-start">
            <span className="eyebrow block">
              PARTNERS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Trusted Technology Partners Driving Innovation
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base max-w-xl">
              We collaborate with global technology leaders to deliver validated automation and industrial systems that meet strict industry quality benchmarks.
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

          {/* Right Partner Logo Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <Link
              to="/solutions/air-gas-solutions/kirloskar-pneumatic"
              className="bg-white border border-slate-200/80 hover:border-brand-primary/50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center w-full max-w-[280px] sm:max-w-[320px] h-[150px] group"
            >
              <img
                src="/PARTNERS LOGO/KIRLOSKAR PNEUMATIC.jpg"
                alt="Kirloskar Pneumatic"
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
          <p className="text-slate-550 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Our engineering experience covers multiple specialized sectors, delivering optimized solutions for strict requirements.
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
      <IndustrialChallengeCTA bgImage="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80" />
    </div>
  )
}
