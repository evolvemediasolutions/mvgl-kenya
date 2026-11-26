import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ArrowRight, CheckCircle2 } from 'lucide-react'
import IndustrialChallengeCTA from '../components/ui/IndustrialChallengeCTA'

export default function WarehouseMaterialHandlingSolutions() {
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
      title: 'Autonomous Mobile Robots (AMRs)',
      desc: 'LiDAR SLAM navigated autonomous robots (300 kg - 1500 kg payload) transporting pallets and totes with zero floor magnetic strips.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '02 / 08',
      title: 'Automated Guided Vehicles (AGVs)',
      desc: 'Laser-guided automated forklifts and tuggers engineered for continuous, high-payload pallet movements in manufacturing dispatch.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '03 / 08',
      title: 'Automated Storage & Retrieval (ASRS)',
      desc: 'High-bay crane and multi-shuttle ASRS systems maximizing cubic warehouse storage density and picking speed.',
      image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '04 / 08',
      title: 'Intelligent Roller Conveyor Lines',
      desc: 'Zero-pressure accumulation (ZPA) motorized roller conveyors with modular curved, diverter, and merging sections.',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '05 / 08',
      title: 'Robotic Palletizing Cells',
      desc: 'Articulated 4-axis and 6-axis robotic palletizers equipped with customized vacuum, clamping, and mechanical grippers.',
      image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '06 / 08',
      title: 'High-Speed Cross-Belt Sorters',
      desc: 'High-throughput parcel and carton cross-belt sorting loops capable of sorting over 12,000 items per hour with 99.99% accuracy.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '07 / 08',
      title: 'Vertical Lift Modules (VLMs)',
      desc: 'Goods-to-person enclosed automated vertical carousel towers saving up to 85% of warehouse footprint for small parts.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '08 / 08',
      title: 'Warehouse Execution Software (WES)',
      desc: 'Intelligent supervisory software interfacing seamlessly with SAP, Oracle, and enterprise ERPs for dynamic robotic task allocation.',
      image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80'
    }
  ]

  const industries = [
    {
      id: 'fmcg-beverage',
      tabName: 'FMCG & Beverage Distribution',
      tag: 'FAST MOVING CONSUMER GOODS',
      title: 'High-Velocity Palletizing & Automated Warehouse Logistics',
      desc: 'Delivering end-of-line packaging automation, high-speed sorting loops, and robotic palletizing systems engineered to eliminate shipping bottlenecks and ensure rapid truck turnarounds in FMCG hubs.',
      features: [
        'Robotic end-of-line case packing and automated stretch wrapping',
        'Dynamic buffer conveyors decoupling processing lines from dock loading',
        'Zero-error carton scanning, dimensioning, and automated routing',
        'Seamless integration with warehouse management systems (WMS)'
      ],
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'ecommerce-retail',
      tabName: 'E-Commerce & Retail Fulfillment',
      tag: 'E-COMMERCE & MULTI-CHANNEL FULFILLMENT',
      title: 'Intelligent Goods-to-Person Robotic Order Fulfillment',
      desc: 'Deploying autonomous mobile robot (AMR) fleets and vertical carousel systems that bring inventory directly to picking stations, multiplying human picking speed by up to 400% with zero mispicks.',
      features: [
        'Fleet coordination algorithms optimizing picking paths in real-time',
        'Scalable AMR fleets easily adapted to seasonal peak sales spikes',
        'Pick-to-light and put-wall sortation for multi-order batch processing',
        'Compact modular designs maximizing cubic storage efficiency'
      ],
      image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'cold-storage-logistics',
      tabName: 'Cold Storage & Fresh Logistics',
      tag: 'COLD STORAGE & REFRIGERATED FULFILLMENT',
      title: 'Deep-Freeze Automated Storage & Shuttle Systems',
      desc: 'Ruggedized automated storage cranes and pallet shuttles engineered to operate down to -30°C, reducing human exposure to sub-zero environments while accelerating pallet loading in cold chain facilities.',
      features: [
        'Cold-rated lubricants, enclosed heated electronics, and frost-proof sensors',
        'High-density pallet shuttle systems tripling cold room storage capacity',
        'Automated rapid roll-up airlock doors minimizing cold air losses',
        'Continuous 24/7 robotic operations without manual cold breaks'
      ],
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'automotive-heavy',
      tabName: 'Automotive & Heavy Assembly',
      tag: 'AUTOMOTIVE & COMPONENT ASSEMBLY',
      title: 'Automated Internal Tuggers & Line-Side Delivery',
      desc: 'Deploying automated guided vehicles (AGVs) and heavy-duty roller conveyors delivering raw materials, stamping blanks, and sub-assemblies just-in-time (JIT) directly to assembly workstations.',
      features: [
        'Automated line-side replenishment reducing plant forklift traffic',
        'Heavy-payload AGVs (up to 3,000 kg) for engine and chassis transit',
        '360° laser safety scanners with certified emergency braking',
        'Synchronized conveyor pacing matching assembly line takt times'
      ],
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80'
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
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"
            alt="Warehouse & Material Handling Solutions"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="max-w-4xl mx-auto px-6 relative z-20 text-center space-y-6">
            <span className="eyebrow block">
              HOME / INDUSTRIAL SOLUTIONS / WAREHOUSE & MATERIAL HANDLING
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Warehouse & Material Handling Solutions
            </h1>
            <p className="text-slate-200 max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed font-normal">
              Pioneering smart internal logistics, robotic material handling, and automated storage in partnership with Xoog. Transforming warehouses and manufacturing facilities into high-throughput, automated fulfillment environments across Kenya and East Africa.
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
                Robotic Automation & Internal Logistics
              </h2>
              <p className="text-slate-100 text-sm leading-relaxed">
                From autonomous mobile transport robots to automated high-bay racking and intelligent sortation systems, we accelerate supply chain fulfillment speed.
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

      {/* 3. Trusted Technology Partners Section (Xoog) */}
      <section className="py-12 px-4 max-w-[1360px] mx-auto my-4 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white border border-slate-100 rounded-3xl p-8 sm:p-12 shadow-sm">
          <div className="lg:col-span-7 space-y-4 text-start">
            <span className="eyebrow block">
              PARTNERS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Trusted Technology Partners Driving Logistics Innovation
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base max-w-xl">
              In strategic partnership with Xoog, we engineer cutting-edge warehouse automation, autonomous mobile robots (AMRs), and smart internal logistics architectures built for continuous material movement.
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
              to="/solutions/warehouse-material-handling/xoog"
              className="bg-white border border-slate-200/80 hover:border-brand-primary/60 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center w-full max-w-[320px] h-[150px] group overflow-hidden"
              title="Explore Xoog Products"
            >
              <img
                src="/PARTNERS LOGO/XOOG LOGO.svg"
                alt="Xoog"
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
            Our material handling and robotics engineering experience covers multiple specialized sectors, delivering optimized solutions for strict requirements.
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
      <IndustrialChallengeCTA bgImage="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80" />
    </div>
  )
}
