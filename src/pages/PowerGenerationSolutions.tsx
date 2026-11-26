import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ArrowRight, CheckCircle2 } from 'lucide-react'
import IndustrialChallengeCTA from '../components/ui/IndustrialChallengeCTA'

export default function PowerGenerationSolutions() {
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
      title: 'Heavy-Duty Diesel Gensets',
      desc: 'High-reliability diesel generator packages (15 kVA to 3000+ kVA) for continuous prime and mission-critical standby power.',
      image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '02 / 08',
      title: 'Gas-Powered Generator Packages',
      desc: 'Eco-friendly, low-emission natural gas and biogas generators engineered for combined heat and power (CHP) installations.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '03 / 08',
      title: 'Automatic Mains Failure (AMF) Panels',
      desc: 'Intelligent transfer switches and AMF control cubicles delivering sub-second emergency changeover when grid power fails.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '04 / 08',
      title: 'Multi-Genset Synchronizing Panels',
      desc: 'Digital load sharing, auto-synchronization, and peak-shaving control switchgear for multi-megawatt captive power plants.',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '05 / 08',
      title: 'Acoustic Soundproof Enclosures',
      desc: 'Heavy-gauge galvanized steel soundproof canopies engineered for extreme weather resistance and low decibel compliance.',
      image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '06 / 08',
      title: 'Containerized Power Modules',
      desc: 'ISO containerized power generation modules with pre-installed cooling, ventilation, and fire suppression for fast site deployment.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '07 / 08',
      title: 'Hybrid Microgrid & Solar Support',
      desc: 'Hybrid controller architectures interfacing diesel gensets with photovoltaic arrays and battery energy storage systems.',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '08 / 08',
      title: 'Remote Generator SCADA & Telemetry',
      desc: 'Cloud-enabled IoT telemetry providing real-time fuel monitoring, thermal logging, engine diagnostics, and predictive alerts.',
      image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80'
    }
  ]

  const industries = [
    {
      id: 'hospitals-healthcare',
      tabName: 'Healthcare & Hospitals',
      tag: 'HEALTHCARE & LIFE CRITICAL',
      title: 'Zero-Interruption Emergency Power for Critical Healthcare',
      desc: 'Providing turnkey emergency power solutions with automatic transfer systems, low-noise acoustic enclosures, and redundant diesel generator banks safeguarding ICUs, operating theaters, and medical diagnostic equipment across Kenya.',
      features: [
        'Sub-10 second emergency changeover compliant with hospital codes',
        'Hospital-grade ultra-silent soundproof acoustic canopies (65-70 dBA)',
        'Dual-redundant fuel delivery and bulk storage management',
        'Automatic weekly diagnostic self-test cycles and real-time remote telemetry'
      ],
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'data-centers-telecom',
      tabName: 'Data Centers & Telecom',
      tag: 'DATA CENTERS & MISSION CRITICAL',
      title: 'Tier III & IV Uptime Power for Digital Infrastructure',
      desc: 'High-availability diesel and gas generator packages engineered for continuous 24/7 duty, harmonic tolerance, and high load step capability in regional data centers and telecommunications networks.',
      features: [
        'Continuous data center power rating with unlimited annual run hours',
        'High transient load acceptance (G2/G3 ISO 8528 compliance)',
        'Seamless synchronization with dual utility feeds and static UPS systems',
        'Fuel filtration and polishing systems ensuring contamination-free diesel'
      ],
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'manufacturing-plants',
      tabName: 'Manufacturing & Heavy Industry',
      tag: 'MANUFACTURING & INDUSTRIAL',
      title: 'Continuous Captive Power for Industrial Operations',
      desc: 'Heavy-duty prime power sets and peak-lopping generators designed to protect high-tonnage manufacturing, cement production, plastics extrusion, and metal fabrication from expensive grid outages and voltage fluctuations.',
      features: [
        'Heavy-duty electronic governors delivering rapid frequency recovery',
        'Multi-unit automated load sharing and intelligent peak-shaving switchgear',
        'Robust tropicalized radiators engineered for 50°C high-ambient conditions',
        'Comprehensive maintenance agreements and regional spares inventory in Nairobi'
      ],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'commercial-real-estate',
      tabName: 'Commercial & Infrastructure',
      tag: 'COMMERCIAL REAL ESTATE & CIVIL',
      title: 'Turnkey Power for Airports, High-Rises & Mega-Malls',
      desc: 'Compact, low-vibration soundproof generator packages engineered for basements, rooftops, and utility substations in commercial centers, modern high-rises, and transport terminals across East Africa.',
      features: [
        'Modular footprints optimized for space-constrained building basements',
        'Vibration isolation pads preventing building structural resonance',
        'Compliant exhaust routing, catalytic converters, and soot arrestors',
        'BMS integration over Modbus and BACnet for central facilities management'
      ],
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'mining-remote',
      tabName: 'Mining & Remote Sites',
      tag: 'MINING & REMOTE EXTRACTION',
      title: 'Rugged Off-Grid Power for Remote Industrial Sites',
      desc: 'Heavy-duty containerized power plants engineered for remote quarries, mining concessions, and off-grid processing camps where grid infrastructure is unavailable or unstable.',
      features: [
        'ISO containerized modules ready for rapid multi-megawatt site scaling',
        'Heavy two-stage air intake filters for high-dust mining environments',
        'Extended oil sump systems enabling 1,000+ hour service intervals',
        'Autonomous black-start capability without external electrical supply'
      ],
      image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1000&q=80'
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
            src="https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=80"
            alt="Power Generation Solutions"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="max-w-4xl mx-auto px-6 relative z-20 text-center space-y-6">
            <span className="eyebrow block">
              HOME / INDUSTRIAL SOLUTIONS / POWER GENERATION
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Power Generation Solutions
            </h1>
            <p className="text-slate-200 max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed font-normal">
              Delivering heavy-duty, fuel-efficient prime and standby electrical power packages in partnership with Kirloskar Powergen. Engineered to guarantee 24/7 continuous operations for critical manufacturing, hospitals, data centers, and regional infrastructure across Kenya and East Africa.
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
                Continuous & Standby Power for Critical Operations
              </h2>
              <p className="text-slate-100 text-sm leading-relaxed">
                From compact emergency standby sets to multi-megawatt synchronized power stations, our engineering team delivers reliable turnkey energy packages.
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

      {/* 3. Trusted Technology Partners Section (Kirloskar Powergen) */}
      <section className="py-12 px-4 max-w-[1360px] mx-auto my-4 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white border border-slate-100 rounded-3xl p-8 sm:p-12 shadow-sm">
          <div className="lg:col-span-7 space-y-4 text-start">
            <span className="eyebrow block">
              PARTNERS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Trusted Technology Partners Driving Power Reliability
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base max-w-xl">
              In strategic partnership with Kirloskar Powergen, we engineer, supply, commission, and service heavy-duty generator packages designed to withstand the harshest African industrial environments.
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
              to="/solutions/power-generation/kirloskar-powergen"
              className="bg-white border border-slate-200/80 hover:border-brand-primary/60 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center w-full max-w-[320px] h-[150px] group overflow-hidden"
              title="Explore Kirloskar Powergen Products"
            >
              <img
                src="/PARTNERS LOGO/KIRLOSKAR POWERGEN.jpg"
                alt="Kirloskar Powergen"
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
            Our power generation engineering experience covers multiple specialized sectors, delivering optimized solutions for strict requirements.
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
      <IndustrialChallengeCTA bgImage="https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=80" />
    </div>
  )
}
