import { useState, useRef } from 'react'
import { 
  ShieldCheck, 
  Globe, 
  TrendingUp, 
  Cpu, 
  Leaf, 
  ChevronLeft, 
  ChevronRight,
  ArrowRight,
  FileText
} from 'lucide-react'

export default function Sustainability() {
  const [activeTab, setActiveTab] = useState<'all' | 'sustainability' | 'social' | 'governance' | 'operational'>('all')
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      const progress = scrollLeft / (scrollWidth - clientWidth)
      setScrollProgress(progress || 0)
    }
  }

  const scrollSlider = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -320 : 320
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }

  const values = [
    {
      icon: <ShieldCheck className="h-6 w-6 text-[#ED1C24]" />,
      title: 'Decades of Excellence',
      desc: 'Delivering responsible industrial engineering services to help regional manufacturing and utilities progress sustainably.'
    },
    {
      icon: <Globe className="h-6 w-6 text-[#ED1C24]" />,
      title: 'Global Partnerships',
      desc: 'Supporting customers across Kenya with energy-efficient, environmentally compliant technologies from global OEMs.'
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-[#ED1C24]" />,
      title: 'ESG Commitment',
      desc: 'Embedding environmental, social, and governance principles into our long-term regional engineering strategy.'
    },
    {
      icon: <Cpu className="h-6 w-6 text-[#ED1C24]" />,
      title: 'Operational Excellence',
      desc: 'Continuous improvement in safety, resource conservation, and rigorous quality management.'
    }
  ]

  const pillars = [
    {
      slug: 'quality-management',
      title: 'Quality Management System',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
    },
    {
      slug: 'international-standards',
      title: 'International Standards & Compliance',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80'
    },
    {
      slug: 'process-optimization',
      title: 'Process Energy Optimization',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80'
    }
  ]

  const insights = [
    {
      id: 1,
      category: 'sustainability',
      tag: 'SUSTAINABILITY',
      title: 'Reducing Carbon Footprint in Process Cooling',
      desc: 'How modern screw chiller configurations reduce energy consumption by up to 30% in food and horticultural cold chains.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 2,
      category: 'social',
      tag: 'SOCIAL IMPACT',
      title: 'Empowering Technical Talent in Kenya',
      desc: 'Our technical training programs helping build the next generation of Kenyan engineers and technical specialists.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 3,
      category: 'governance',
      tag: 'GOVERNANCE',
      title: 'Supply Chain Transparency and Integrity',
      desc: 'Establishing strict ethics guidelines for sourcing, compliance, and OEM partner evaluation.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 4,
      category: 'operational',
      tag: 'OPERATIONAL',
      title: 'Zero Harm: Safety-First Engineering Protocols',
      desc: 'Implementing stringent safety management protocols across on-site compressor, chiller, and pump installations.',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=400&q=80'
    }
  ]

  const filteredInsights = activeTab === 'all' 
    ? insights 
    : insights.filter(item => item.category === activeTab)

  return (
    <div className="font-sans min-h-screen bg-white text-[#222222]">
      
      {/* 1. Hero Section */}
      <div className="pt-28 sm:pt-32 pb-6 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative w-full h-[450px] rounded-3xl overflow-hidden bg-[#222222] text-white flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80"
            alt="Sustainability at MVGL Kenya"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="max-w-4xl mx-auto px-6 relative z-20 text-center space-y-6">
            <span className="eyebrow block">
              SUSTAINABILITY &amp; ESG
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Engineering Solutions for a Sustainable Future
            </h1>
            <p className="text-slate-200 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              We are dedicated to driving industrial efficiency, reducing environmental footprint, and maintaining the highest governance standards across Kenya.
            </p>
          </div>
        </section>
      </div>

      {/* 2. Values Section */}
      <section className="py-20 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="space-y-3 mb-16 text-center max-w-3xl mx-auto">
          <span className="eyebrow block">
            OUR COMMITMENT
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#222222] tracking-tight leading-tight">
            Sustainability Anchored in Operational Excellence
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Our approach combines environmental stewardship, safety-first operating protocols, and strict governance to ensure lasting value for our clients and communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((val, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md hover:border-[#ED1C24] transition-all space-y-4">
              <div className="h-12 w-12 bg-red-50 rounded-2xl flex items-center justify-center">
                {val.icon}
              </div>
              <h3 className="text-lg font-bold text-[#222222] tracking-tight">
                {val.title}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Slider Section: Quality, Standards & Optimization */}
      <section className="py-20 bg-[#F5F5F5] border-t border-b border-slate-200/70">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            <div className="w-full lg:w-[320px] bg-[#222222] text-white rounded-3xl p-8 flex flex-col justify-between items-start shadow-xl flex-shrink-0 min-h-[400px]">
              <div className="space-y-4">
                <span className="eyebrow block">FRAMEWORK</span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                  Certified Standards & Continuous Optimization
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Adhering to international quality, environmental, and occupational safety benchmarks across every engineering project.
                </p>
              </div>
              <a 
                href="#esg" 
                className="px-6 py-2.5 bg-[#ED1C24] text-white font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#D0171E] transition-colors shadow-md"
              >
                Learn More
              </a>
            </div>

            <div className="flex-1 flex flex-col justify-between overflow-hidden">
              <div 
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {pillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="w-[280px] sm:w-[320px] h-[360px] rounded-3xl overflow-hidden relative shadow-md hover:shadow-xl transition-all flex-shrink-0 snap-start block group cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10"></div>
                    <img 
                      src={pillar.image} 
                      alt={pillar.title} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute bottom-6 left-6 right-6 z-20 text-left">
                      <span className="eyebrow block mb-1 text-[11px]">PILLAR {idx + 1}</span>
                      <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                        {pillar.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200">
                <div className="flex-1 max-w-xs bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#ED1C24] h-full transition-all duration-300 rounded-full"
                    style={{ width: `${Math.max(10, scrollProgress * 100)}%` }}
                  ></div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => scrollSlider('left')}
                    className="p-2 border border-slate-300 rounded-lg bg-white text-[#222222] hover:border-[#ED1C24] hover:text-[#ED1C24] transition-colors cursor-pointer"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => scrollSlider('right')}
                    className="p-2 border border-slate-300 rounded-lg bg-white text-[#222222] hover:border-[#ED1C24] hover:text-[#ED1C24] transition-colors cursor-pointer"
                    aria-label="Next"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Partnering for a Sustainable Tomorrow */}
      <section id="esg" className="py-20 bg-white text-left w-full">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="space-y-3 text-center max-w-3xl mx-auto">
            <span className="eyebrow block">
              OUR PARTNERSHIPS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#222222] tracking-tight leading-tight">
              Partnering for a Sustainable Tomorrow
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We believe sustainability is a shared responsibility. By working closely with our clients and OEM partners, we create lasting, positive environmental and social impact across Kenya.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Mockup Badges */}
            <div className="lg:col-span-6 flex justify-center items-center relative h-[300px]">
              <div className="h-44 w-44 rounded-full bg-white border border-slate-200 shadow-md flex flex-col items-center justify-center p-6 text-center space-y-2 z-20">
                <ShieldCheck className="h-8 w-8 text-[#ED1C24]" />
                <span className="text-xs font-bold text-slate-800">MVGL KENYA</span>
                <span className="text-[10px] font-extrabold text-[#ED1C24] tracking-wider">COMMITTED ESG</span>
              </div>
              <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-slate-50 border border-slate-200 shadow-sm flex flex-col items-center justify-center p-4 text-center space-y-1 z-10">
                <Leaf className="h-6 w-6 text-emerald-600" />
                <span className="text-xs font-bold text-slate-800">Energy Eff.</span>
              </div>
              <div className="absolute bottom-10 right-10 h-32 w-32 rounded-full bg-slate-50 border border-slate-200 shadow-sm flex flex-col items-center justify-center p-4 text-center space-y-1 z-10">
                <Cpu className="h-6 w-6 text-[#222222]" />
                <span className="text-xs font-bold text-slate-800">Smart Control</span>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="eyebrow block">
                OUR ESG POLICY
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#222222] tracking-tight leading-tight">
                Our Environmental, Social &amp; Governance Policy
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Our environmental, social, and governance policy frames our approach to sustainable business growth, ensuring that all our engineering services, products, and supply chain partners align with verified values of safety, conservation, and ethical integrity.
              </p>
              <button className="px-6 py-3 bg-[#ED1C24] hover:bg-[#D0171E] text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-colors duration-200 inline-flex items-center gap-2 shadow-md">
                <FileText className="h-4 w-4" />
                Read ESG Policy Summary
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Sustainability Insights */}
      <section className="py-20 bg-[#F5F5F5] border-t border-slate-200 text-left w-full">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-3">
            <span className="eyebrow block">
              LATEST ARTICLES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#222222] tracking-tight leading-tight">
              Sustainability &amp; Efficiency Insights
            </h2>
            <p className="text-slate-600 text-sm max-w-2xl">
              Explore perspectives and technical briefs relating to sustainable technologies, energy conservation, and efficient industrial operations across Kenya.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 pb-4 border-b border-slate-200">
            {(['all', 'sustainability', 'social', 'governance', 'operational'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                  activeTab === tab 
                    ? 'bg-[#ED1C24] text-white shadow-sm' 
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-[#ED1C24]'
                }`}
              >
                {tab === 'all' && 'All'}
                {tab === 'sustainability' && 'Sustainability'}
                {tab === 'social' && 'Social Impact'}
                {tab === 'governance' && 'Governance'}
                {tab === 'operational' && 'Operational'}
              </button>
            ))}
          </div>

          {/* Insights Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredInsights.map((item) => (
              <div 
                key={item.id} 
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:border-[#ED1C24] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="h-44 overflow-hidden relative">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <span className="inline-flex px-2 py-0.5 bg-red-50 text-[#ED1C24] text-[9px] font-black rounded uppercase tracking-wider border border-red-100">
                      {item.tag}
                    </span>
                    <h3 className="text-sm font-bold text-[#222222] leading-snug group-hover:text-[#ED1C24] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                      {item.desc}
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0 border-t border-slate-100">
                  <span className="flex items-center gap-1.5 text-[#ED1C24] font-bold text-[10px] uppercase tracking-wider">
                    Read More
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
