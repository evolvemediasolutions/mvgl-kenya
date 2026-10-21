import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ArrowRight, CheckCircle2 } from 'lucide-react'
import IndustrialChallengeCTA from '../components/ui/IndustrialChallengeCTA'

export default function AutomationControlSolutions() {
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
      title: 'Programmable Controllers (PLCs)',
      desc: 'High-performance control systems engineered for demanding industrial sequencing and logic.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '02 / 08',
      title: 'Variable Frequency Drives (VFDs)',
      desc: 'Intelligent motor control delivering precise torque, velocity, and energy savings.',
      image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '03 / 08',
      title: 'Distributed I/O & RTUs',
      desc: 'Ruggedized modular I/O and remote telemetry units built for extreme environments.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '04 / 08',
      title: 'Industrial Network Solutions',
      desc: 'Deterministic communication backbones bridging OT field devices to enterprise systems.',
      image: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '05 / 08',
      title: 'Condition Monitoring',
      desc: 'Real-time vibration and machine health analytics enabling predictive maintenance.',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '06 / 08',
      title: 'Industrial Computers & HMIs',
      desc: 'Sunlight-readable touchscreens and industrial computing hardware for shop floor control.',
      image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '07 / 08',
      title: 'Power & Circuit Protection',
      desc: 'Reliable relays, contactors, and circuit protection safeguarding electrical equipment.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '08 / 08',
      title: 'Industrial Wireless & Remote Access',
      desc: 'Cybersecure cloud-ready gateways and wireless telemetry for connected plants.',
      image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80'
    }
  ]

  const industries = [
    {
      id: 'automotive',
      tabName: 'Automotive & Assembly',
      tag: 'AUTOMOTIVE & ASSEMBLY',
      title: 'Driving Next-Gen Smart Manufacturing in Automotive',
      desc: 'Deploying high-speed synchronized motion control, robotics integration, and deterministic EtherNet/IP networks to maximize line throughput and zero-defect quality across body, paint, and assembly shops.',
      features: [
        'High-speed coordinated motion and multi-axis robotics',
        'Real-time automated traceability & MES integration',
        'Integrated functional safety controllers & light curtains',
        'Predictive vibration monitoring on stamping and welding lines'
      ],
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'oil-gas',
      tabName: 'Oil, Gas & Petrochemical',
      tag: 'OIL & GAS / PETROCHEMICAL',
      title: 'Mission-Critical Control for Hazardous Environments',
      desc: 'Delivering SIL-rated safety instrumented systems (SIS), distributed control systems (DCS), and explosion-proof telemetry architectures engineered to safeguard upstream wellheads, pipelines, and downstream refining units.',
      features: [
        'SIL 2 & SIL 3 certified emergency shutdown (ESD) systems',
        'Solar-powered remote telemetry RTUs for remote pipelines',
        'Hazardous area Class I Div 2 / ATEX rated hardware',
        'Seamless integration with SCADA and industrial historian'
      ],
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'power-energy',
      tabName: 'Power & Energy Utilities',
      tag: 'POWER & UTILITIES',
      title: 'Grid-Ready Automation for Power Generation & Distribution',
      desc: 'Enabling intelligent turbine control, substation automation, and smart grid telemetry conforming to IEC 61850 protocols for thermal, renewable, and combined cycle utilities.',
      features: [
        'IEC 61850 compliant substation automation switches',
        'High-availability dual redundant controller architectures',
        'Precision turbine speed governors and generator synchronization',
        'Integrated power metering and harmonic distortion monitoring'
      ],
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'water-wastewater',
      tabName: 'Water & Wastewater',
      tag: 'WATER & WASTEWATER',
      title: 'Optimizing Pumping & Treatment Networks',
      desc: 'Implementing distributed SCADA telemetry, VFD pump energy management, and automated chemical dosing controls across municipal desalination and water treatment facilities.',
      features: [
        'Variable speed pump sequencing reducing kW/m³ water treated',
        'Long-range cellular & radio telemetry RTUs for remote lift stations',
        'Automated chlorine dosing and continuous turbidity analysis',
        'Comprehensive multi-station graphical SCADA dashboards'
      ],
      image: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'food-bev',
      tabName: 'Food, Beverage & Pharma',
      tag: 'FOOD, BEVERAGE & PHARMA',
      title: 'Sanitary Control, Batch Compliance & Serialization',
      desc: 'Supplying 21 CFR Part 11 compliant recipe management, CIP/SIP cycle automation, and washdown-rated motion hardware ensuring hygienic food and drug safety standards.',
      features: [
        'ISA-88 batch control and 21 CFR Part 11 electronic records',
        'IP69K stainless steel washdown HMIs and servo drives',
        'High-speed vision inspection and product serialization',
        'CIP/SIP automated validation and cycle reporting'
      ],
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'metals-mining',
      tabName: 'Metals, Mining & Heavy Industry',
      tag: 'METALS & HEAVY INDUSTRY',
      title: 'Heavy-Duty Drive & Control Solutions for Extreme Demands',
      desc: 'Engineered medium-voltage VFD systems, crusher torque control, and robust optical communication backbones built to withstand high dust, vibration, and thermal shocks in mining and smelting plants.',
      features: [
        'Medium-voltage PowerFlex drive systems for large kilns & mills',
        'Conformal coating on all PCBs for dust and moisture resistance',
        'Heavy torque load sharing between multiple motors',
        'Extreme temperature rated industrial networking hardware'
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
            src="https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=1200&q=80"
            alt="Automation & Control Solutions"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="max-w-4xl mx-auto px-6 relative z-20 text-center space-y-6">
            <span className="eyebrow block">
              HOME / INDUSTRIAL SOLUTIONS / AUTOMATION & CONTROL
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Automation & Control Solutions
            </h1>
            <p className="text-slate-200 max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed font-normal">
              Delivering intelligent automation, integrated control, and resilient industrial connectivity systems, we provide complete solutions that optimize critical manufacturing and infrastructure operations with maximum uptime, cybersecurity, and productivity across Kenya and East Africa.
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
                Integrated Control & Automation for Demanding Operations
              </h2>
              <p className="text-slate-100 text-sm leading-relaxed">
                Delivering programmable automation, smart variable speed drives, rugged industrial networking, and predictive condition analytics for modern smart plants.
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

      {/* 3. Trusted Technology Partners Section (Rockwell, HMS, ProSoft) */}
      <section className="py-12 px-4 max-w-[1360px] mx-auto my-4 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white border border-slate-100 rounded-3xl p-8 sm:p-12 shadow-sm">
          {/* Left Text Info */}
          <div className="lg:col-span-6 space-y-4 text-start">
            <span className="eyebrow block">
              PARTNERS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Trusted Technology Partners Driving Industrial Transformation
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base max-w-xl">
              We collaborate with global automation and industrial communication leaders to deliver validated control architectures, smart drives, and connectivity systems across Kenya and East Africa.
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

          {/* Right 3 Partner Logo Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Rockwell Automation */}
            <Link
              to="/solutions/automation-control/rockwell-automation"
              className="bg-white border border-slate-200/80 hover:border-brand-primary/60 rounded-2xl p-6 shadow-2xs hover:shadow-md transition-all duration-300 flex items-center justify-center h-[140px] sm:h-[150px] group overflow-hidden"
              title="Rockwell Automation"
            >
              <img
                src="/PARTNERS LOGO/ROCKWELL AUTOMATION.png"
                alt="Rockwell Automation"
                className="h-16 sm:h-20 w-auto max-w-[85%] object-contain scale-[1.75] group-hover:scale-[1.85] transition-transform duration-300"
              />
            </Link>

            {/* HMS Networks */}
            <Link
              to="/solutions/automation-control/hms-networks"
              className="bg-white border border-slate-200/80 hover:border-brand-primary/60 rounded-2xl p-6 shadow-2xs hover:shadow-md transition-all duration-300 flex items-center justify-center h-[140px] sm:h-[150px] group overflow-hidden"
              title="HMS Networks"
            >
              <img
                src="/LOGO/HMS_logo.png"
                alt="HMS Networks"
                className="h-14 sm:h-18 w-auto max-w-[85%] object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </Link>

            {/* ProSoft Technology */}
            <Link
              to="/solutions/automation-control/prosoft-technology"
              className="bg-white border border-slate-200/80 hover:border-brand-primary/60 rounded-2xl p-6 shadow-2xs hover:shadow-md transition-all duration-300 flex items-center justify-center h-[140px] sm:h-[150px] group overflow-hidden"
              title="ProSoft Technology"
            >
              <img
                src="/PARTNERS LOGO/PROSOFT TECHNOLOGIES.png"
                alt="ProSoft Technology"
                className="h-16 sm:h-20 w-auto max-w-[85%] object-contain scale-[1.45] group-hover:scale-[1.55] transition-transform duration-300"
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

      {/* 5. Bottom CTA Section */}
      <IndustrialChallengeCTA bgImage="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80" />
    </div>
  )
}
