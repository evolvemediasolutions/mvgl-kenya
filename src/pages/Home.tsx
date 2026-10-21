import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Lightbulb, Users, RefreshCw, ChevronLeft, ChevronRight, Cpu, Settings } from 'lucide-react'
import { solutionsData } from '../data/solutions'
import IndustrialChallengeCTA from '../components/ui/IndustrialChallengeCTA'

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      eyebrow: 'INDUSTRIAL ENGINEERING SOLUTIONS',
      title: "Engineering Solutions That Keep Kenya's Industries Moving",
      desc: 'Delivering world-class industrial equipment, precision engineering expertise, and dependable regional technical support across East Africa.',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=80',
      primaryBtn: { text: 'Explore Solutions', path: '/solutions' },
      secondaryBtn: { text: 'Contact Our Team', path: '/contact' }
    },
    {
      eyebrow: 'COMPREHENSIVE UTILITIES & COOLING',
      title: 'Reliable Compressed Air, Process Gas & Industrial HVAC',
      desc: 'High-efficiency screw compressors, specialized gas systems, and industrial chiller packages engineered for peak uptime and harsh operating environments.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80',
      primaryBtn: { text: 'Air & Gas Solutions', path: '/solutions/air-gas-solutions' },
      secondaryBtn: { text: 'Refrigeration & HVAC', path: '/solutions/refrigeration-hvac-solutions' }
    },
    {
      eyebrow: 'INTELLIGENT AUTOMATION & COMPOSITES',
      title: 'Next-Gen Industrial Automation & Advanced Composites',
      desc: 'Empowering East African manufacturers with certified Rockwell Automation controls, resilient industrial networks, and corrosion-resistant FRP/GRP composite piping.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80',
      primaryBtn: { text: 'Automation & Control', path: '/solutions/automation-control' },
      secondaryBtn: { text: 'Our Principal Partners', path: '/partners' }
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6500)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      const totalScroll = scrollWidth - clientWidth
      if (totalScroll > 0) {
        setScrollProgress(scrollLeft / totalScroll)
      }
    }
  }

  const scrollSlider = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340 // card width + gap
      const dirFactor = direction === 'left' ? -1 : 1
      scrollRef.current.scrollBy({ left: scrollAmount * dirFactor, behavior: 'smooth' })
    }
  }

  const solutions = [
    {
      title: 'Air & Gas Solutions',
      desc: 'Delivering reliable compressed air and process gas systems engineered for critical industrial duty.',
      slug: 'air-gas-solutions'
    },
    {
      title: 'Refrigeration & HVAC Solutions',
      desc: 'Industrial refrigeration compressors, chillers, and large-scale HVAC temperature control.',
      slug: 'refrigeration-hvac-solutions'
    },
    {
      title: 'Automation & Control Solutions',
      desc: 'Intelligent automation, integrated PLCs/PACs, smart drives, and resilient industrial networking.',
      slug: 'automation-control'
    },
    {
      title: 'Non Metallic Solution',
      desc: 'Advanced FRP/GRP composite piping, chemical storage tanks, and structural profiles for corrosion resistance.',
      slug: 'non-metallic-solutions'
    },
    {
      title: 'Fire Pump Solutions',
      desc: 'FM-Approved and UL-Listed packaged fire pumps and pre-packaged containerized pump houses.',
      slug: 'fire-pump-solutions'
    }
  ]

  const principles = [
    {
      title: 'Integrity',
      desc: 'Doing business responsibly, delivering transparent engineering advice and accountable service.',
      icon: <Shield className="h-6 w-6 text-[#ED1C24]" />
    },
    {
      title: 'Engineering Excellence',
      desc: 'Delivering precision solutions built around operating efficiency, durability, and OEM compliance.',
      icon: <Lightbulb className="h-6 w-6 text-[#ED1C24]" />
    },
    {
      title: 'Customer Partnership',
      desc: 'Building enduring relationships through responsive regional support and proactive lifecycle care.',
      icon: <Users className="h-6 w-6 text-[#ED1C24]" />
    },
    {
      title: 'Continuous Improvement',
      desc: 'Strengthening regional capabilities alongside our global principal manufacturing partners.',
      icon: <RefreshCw className="h-6 w-6 text-[#ED1C24]" />
    }
  ]

  const events = [
    {
      title: 'Engage to Excel',
      desc: 'Bringing plant managers and engineering stakeholders together to exchange technical insights.'
    },
    {
      title: 'Partnering for Success',
      desc: 'Building strong alliances between regional industries and global OEM technology leaders.'
    },
    {
      title: 'V-Connect Kenya',
      desc: 'Connecting manufacturing expertise, automation technologies, and East African industrial opportunities.'
    },
    {
      title: 'Technology Day',
      desc: 'Hands-on demonstrations of energy-saving compressors, industrial IoT, and smart controls.'
    },
    {
      title: 'East Africa Industrial Expos',
      desc: 'Participating in specialized trade exhibitions highlighting advanced composites and utility solutions.'
    }
  ]

  const partnerLogos = [
    { name: 'Rockwell Automation', image: '/PARTNERS LOGO/ROCKWELL AUTOMATION.png', slug: 'rockwell-automation', scale: 'scale-[1.45]' },
    { name: 'Allen Bradley', image: '/PARTNERS LOGO/ALLEN BRADLEY.png', slug: 'rockwell-automation', scale: 'scale-[1.45]' },
    { name: 'FactoryTalk', image: '/PARTNERS LOGO/FACTORY TALK.png', slug: 'rockwell-automation', scale: 'scale-115' },
    { name: 'EPP Composites', image: '/PARTNERS LOGO/EPP.jpg', slug: 'epp-composites', scale: 'scale-100' },
    { name: 'SPP Pumps', image: '/PARTNERS LOGO/SPP.jpg', slug: 'spp-pumps', scale: 'scale-100' },
    { name: 'Kirloskar Pneumatic', image: '/PARTNERS LOGO/KIRLOSKAR PNEUMATIC.jpg', slug: 'kirloskar-pneumatic', scale: 'scale-100' },
    { name: 'Kirloskar Chillers', image: '/PARTNERS LOGO/KCPL.jpg', slug: 'kirloskar-chillers', scale: 'scale-100' },
    { name: 'HMS Networks', image: '/LOGO/HMS_logo.png', slug: 'hms-networks', scale: 'scale-90' },
    { name: 'ProSoft Technology', image: '/PARTNERS LOGO/PROSOFT TECHNOLOGIES.png', slug: 'prosoft-technology', scale: 'scale-120' },
    { name: 'Lifecycle IQ Services', image: '/PARTNERS LOGO/LIFECYCLE IQ SERVICES.webp', slug: 'rockwell-automation', scale: 'scale-115' }
  ]

  return (
    <div className="font-sans min-h-screen bg-white text-[#222222] overflow-x-hidden">
      
      {/* 1. Hero Section Slider (3 Slides) */}
      <section className="relative w-full h-screen overflow-hidden bg-[#222222] text-white select-none">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <div className="absolute inset-0 bg-black/65 z-10"></div>
            <img
              src={slide.image}
              alt={slide.title}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[7000ms] ease-out ${
                idx === currentSlide ? 'scale-105' : 'scale-100'
              }`}
            />
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-3xl space-y-6 text-left">
                  <span className="eyebrow block">
                    {slide.eyebrow}
                  </span>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg text-slate-200 max-w-2xl leading-relaxed">
                    {slide.desc}
                  </p>
                  <div className="pt-4 flex flex-wrap gap-4">
                    <Link
                      to={slide.primaryBtn.path}
                      className="px-8 py-3.5 bg-[#ED1C24] hover:bg-[#D0171E] text-white font-bold rounded-lg shadow-lg hover:shadow-red-500/20 transition-all uppercase tracking-wider text-xs"
                    >
                      {slide.primaryBtn.text}
                    </Link>
                    <Link
                      to={slide.secondaryBtn.path}
                      className="px-8 py-3.5 bg-transparent border border-white hover:bg-white/10 text-white font-bold rounded-lg transition-colors uppercase tracking-wider text-xs"
                    >
                      {slide.secondaryBtn.text}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Prev/Next Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 h-12 w-12 rounded-full bg-black/40 hover:bg-[#ED1C24] text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 h-12 w-12 rounded-full bg-black/40 hover:bg-[#ED1C24] text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Slide Indicators / Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === currentSlide
                  ? 'w-10 h-2.5 bg-[#ED1C24]'
                  : 'w-2.5 h-2.5 bg-white/50 hover:bg-white'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. Workplace / Leadership Stats Section */}
      <section className="py-24 bg-white font-sans text-center w-full">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 mb-16 text-center">
            <span className="eyebrow block">
              ENGINEERING EXCELLENCE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#222222] tracking-tight">
              Creating Value Through Engineering Expertise
            </h2>
            <p className="text-slate-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
              MVGL Kenya brings together global technology partnerships, industrial expertise, and customer-focused support to deliver reliable engineering solutions across East Africa.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Card 1 */}
            <div className="bg-[#F5F5F5] border border-slate-200/80 rounded-3xl p-8 space-y-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-[#ED1C24]">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-[#ED1C24] text-white shadow-sm">
                <ArrowRight className="h-6 w-6 transform -rotate-45" />
              </div>
              <div className="space-y-2">
                <p className="text-4xl sm:text-5xl font-black text-[#222222] tracking-tight">7+</p>
                <p className="text-slate-600 text-sm font-semibold">
                  Global Principal Partners
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#F5F5F5] border border-slate-200/80 rounded-3xl p-8 space-y-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-[#ED1C24]">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-[#ED1C24] text-white shadow-sm">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="8"></circle>
                </svg>
              </div>
              <div className="space-y-2">
                <p className="text-4xl sm:text-5xl font-black text-[#222222] tracking-tight">15+</p>
                <p className="text-slate-600 text-sm font-semibold">
                  Industrial Sectors Served
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#F5F5F5] border border-slate-200/80 rounded-3xl p-8 space-y-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-[#ED1C24]">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-[#ED1C24] text-white shadow-sm">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </div>
              <div className="space-y-2">
                <p className="text-4xl sm:text-5xl font-black text-[#222222] tracking-tight">5</p>
                <p className="text-slate-600 text-sm font-semibold">
                  Core Solution Disciplines
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Engineering Capabilities Section */}
      <section className="py-24 bg-[#F5F5F5] font-sans text-left w-full border-t border-b border-slate-200/70">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4 mb-16">
            <span className="eyebrow block">
              ENGINEERING CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#222222] tracking-tight">
              Solutions Built for Modern Industry
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              From automation and industrial connectivity to gas compression, process cooling, fluid pumping, and advanced composites, MVGL Kenya delivers dependable engineering for demanding environments.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 flex flex-col transition-all duration-300 hover:shadow-md hover:border-[#ED1C24]">
              <div className="h-64 overflow-hidden rounded-2xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80" 
                  alt="Automation & Connectivity" 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-4 flex-grow flex flex-col justify-start">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-[#ED1C24] text-white">
                  <Cpu className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-[#222222]">
                  Automation & Connectivity
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Integrated automation, smart PLCs, motor control centers, and industrial communication protocols that enhance machine connectivity, uptime, and operational performance.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 flex flex-col transition-all duration-300 hover:shadow-md hover:border-[#ED1C24]">
              <div className="h-64 overflow-hidden rounded-2xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80" 
                  alt="Mechanical & Process Solutions" 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-4 flex-grow flex flex-col justify-start">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-[#ED1C24] text-white">
                  <Settings className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-[#222222]">
                  Mechanical & Process Solutions
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Engineered technologies for compressed air, process gas compression, industrial refrigeration, chiller packages, and certified fire protection pump houses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Partner Logo Strip */}
      <section className="bg-white py-16 border-b border-slate-100 my-10 overflow-hidden font-sans">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="eyebrow block">
            GLOBAL TECHNOLOGY. REGIONAL EXPERTISE.
          </span>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm">
            Partnering with world-renowned manufacturers to deliver certified engineering technologies for Kenya's manufacturing and infrastructure sectors.
          </p>
        </div>

        <div className="relative mt-10 w-full overflow-hidden py-4 bg-[#F5F5F5]/60">
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>

          <div className="animate-marquee-ltr">
            {[...partnerLogos, ...partnerLogos].map((logo, idx) => (
              <Link
                key={idx}
                to={`/partners/${logo.slug}`}
                className={`mx-5 sm:mx-8 flex items-center justify-center h-16 w-28 sm:w-32 filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 flex-shrink-0 ${logo.scale || ''}`}
              >
                <img
                  src={logo.image}
                  alt={logo.name}
                  className="max-h-full max-w-full object-contain"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. About MVGL Kenya */}
      <section className="py-24 px-4 max-w-[1360px] mx-auto my-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-red-50 rounded-3xl -z-10 transform -rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
            <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-red-200/50 rounded-full blur-xl -z-10"></div>
            
            <div className="relative h-[480px] rounded-2xl overflow-hidden shadow-xl border border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80"
                alt="MVGL Kenya industrial expertise"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-6 left-6 bg-[#222222]/90 backdrop-blur-md px-6 py-4 rounded-xl border border-white/10 text-white z-20">
                <p className="text-[#ED1C24] text-2xl font-black">15+</p>
                <p className="text-slate-300 text-xs font-bold uppercase tracking-wider">
                  Years Engineering Expertise
                </p>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-6 text-left">
            <div className="space-y-3">
              <span className="eyebrow block">
                ABOUT MVGL KENYA
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#222222] tracking-tight leading-tight">
                Creating Measurable Value for Our Customers
              </h2>
            </div>
            
            <div className="space-y-5 text-slate-600 leading-relaxed text-base">
              <p>
                As an established industrial solutions provider in Kenya and East Africa, MVGL delivers world-class equipment, engineering design, and responsive after-sales support to critical manufacturing facilities.
              </p>
              <p>
                Our comprehensive capabilities cover oil-injected and oil-free compressed air, industrial refrigeration packages, chilled-water HVAC solutions, process gas packages, certified fire pumps, smart automation, and corrosion-resistant composites.
              </p>
            </div>

            <div className="pt-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#ED1C24] hover:bg-[#D0171E] text-white font-bold rounded-lg shadow-md hover:shadow-red-500/20 transition-all text-xs uppercase tracking-wider"
              >
                Discover Our Story
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Solutions Slider Section */}
      <section className="py-20 px-4 max-w-[1360px] mx-auto my-10 font-sans">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          
          {/* Left Red Card */}
          <div className="w-full lg:w-[320px] bg-[#ED1C24] text-white rounded-3xl p-8 flex flex-col justify-between items-start shadow-xl flex-shrink-0 min-h-[420px]">
            <div className="space-y-4">
              <span className="eyebrow block !text-white/80">PORTFOLIO</span>
              <h2 className="text-3xl font-black tracking-tight leading-tight">
                Engineering Solutions for Critical Operations
              </h2>
              <p className="text-white/90 text-sm leading-relaxed">
                Delivering automation, utilities, robotics, and process technologies that support efficient, reliable, and future-ready industrial operations.
              </p>
            </div>
            <Link
              to="/solutions"
              className="mt-6 px-6 py-3 bg-white text-[#ED1C24] font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-slate-50 transition-colors shadow-md"
            >
              View All Solutions
            </Link>
          </div>

          {/* Right Scrollable Row */}
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {solutions.map((sol) => {
                const solData = solutionsData.find(s => s.slug === sol.slug)
                const bgImage = solData ? solData.image : 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80'

                return (
                  <Link
                    key={sol.slug}
                    to={`/solutions/${sol.slug}`}
                    className="w-[280px] sm:w-[300px] h-[340px] rounded-3xl overflow-hidden relative shadow-md hover:shadow-xl transition-all flex-shrink-0 snap-start block group"
                  >
                    <div className="absolute top-4 right-4 z-20 h-8 w-8 bg-white/20 hover:bg-white/45 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10"></div>
                    <img 
                      src={bgImage} 
                      alt={sol.title} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    
                    <div className="absolute bottom-6 left-6 right-6 z-20 text-left">
                      <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                        {sol.title}
                      </h3>
                      <p className="text-xs text-slate-300 line-clamp-2 mt-2">
                        {sol.desc}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* Slider Navigation */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
              <div className="flex-1 max-w-xs bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-[#ED1C24] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${Math.max(10, scrollProgress * 100)}%` }}
                ></div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollSlider('left')}
                  className="h-10 w-10 bg-[#222222] text-white hover:bg-[#ED1C24] active:scale-95 rounded-lg flex items-center justify-center transition-all shadow-sm cursor-pointer"
                  aria-label="Previous solution"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => scrollSlider('right')}
                  className="h-10 w-10 bg-[#222222] text-white hover:bg-[#ED1C24] active:scale-95 rounded-lg flex items-center justify-center transition-all shadow-sm cursor-pointer"
                  aria-label="Next solution"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. Vision / Mission Section */}
      <section className="py-20 px-4 max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 my-12 font-sans">
        
        {/* Vision Card */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl min-h-[300px] flex flex-col justify-end p-8 sm:p-10 group border border-slate-800">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-[#222222]/40 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
            alt="MVGL Kenya Vision"
            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="relative z-20 space-y-3 text-left">
            <span className="eyebrow block">
              OUR VISION
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Setting the Regional Benchmark
            </h3>
            <p className="text-slate-200 leading-relaxed text-sm max-w-xl">
              To become East Africa's leader in customer service and technical support by providing direct access to world-class OEM products representing verified quality and operational efficiency.
            </p>
          </div>
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#ED1C24] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </div>

        {/* Mission Card */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl min-h-[300px] flex flex-col justify-end p-8 sm:p-10 group border border-slate-800">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-[#222222]/40 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
            alt="MVGL Kenya Mission"
            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="relative z-20 space-y-3 text-left">
            <span className="eyebrow block">
              OUR MISSION
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Creating Sustainable Customer Value
            </h3>
            <p className="text-slate-200 leading-relaxed text-sm max-w-xl">
              To create enduring value for our customers through dependable engineering solutions, reliable equipment packages, and responsive technical services across Kenya and East Africa.
            </p>
          </div>
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#ED1C24] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </div>

      </section>

      {/* 8. Core Principles Section */}
      <section className="bg-[#222222] text-white py-20 px-4 my-10 relative overflow-hidden font-sans">
        <div className="max-w-[1360px] mx-auto space-y-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3 text-left">
              <span className="eyebrow block">
                THE MVGL WAY
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Operational Excellence. Built on Transparency.
              </h2>
            </div>
            <p className="lg:col-span-5 text-slate-300 text-base leading-relaxed text-left lg:max-w-sm lg:justify-self-end">
              Our approach is anchored by two core principles: operational excellence and total transparency. They guide how we work from initial consultation to installation and lifecycle maintenance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((pr, idx) => (
              <div 
                key={idx} 
                className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm space-y-4 hover:-translate-y-1.5 hover:bg-white/10 hover:border-[#ED1C24] transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer group text-left"
              >
                <div className="transform group-hover:scale-110 transition-transform duration-300">{pr.icon}</div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#ED1C24] transition-colors">{pr.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{pr.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Events Section */}
      <section className="py-20 px-4 max-w-[1360px] mx-auto my-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="eyebrow block">
            MVGL EVENTS & EXPOS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#222222] tracking-tight">
            Connect. Collaborate. Innovate.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((ev, idx) => (
            <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#ED1C24] transition-all space-y-3 text-left">
              <h3 className="text-lg font-bold text-[#222222]">{ev.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{ev.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#ED1C24] hover:bg-[#D0171E] text-white font-bold rounded-lg transition-colors shadow-md text-xs uppercase tracking-wider"
          >
            Explore Events & Exhibitions
          </Link>
        </div>
      </section>

      {/* 10. Final CTA */}
      <IndustrialChallengeCTA bgImage="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80" />

    </div>
  )
}
