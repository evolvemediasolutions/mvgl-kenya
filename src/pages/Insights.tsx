import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { solutionsData } from '../data/solutions'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { fetchFromStrapi, getStrapiMediaUrl, extractStrapiText } from '../services/strapi'

interface BlogPost {
  id: string | number
  slug: string
  tag: string
  title: string
  desc: string
  date: string
  image: string
}

const defaultFeaturedPost: BlogPost = {
  id: 'building-resilient-industrial-supply-chains-in-east-africa',
  slug: 'building-resilient-industrial-supply-chains-in-east-africa',
  tag: 'SUPPLY CHAIN',
  title: 'Building Resilient Industrial Supply Chains in East Africa',
  desc: 'Strategies for securing critical OEM components, spare parts, and continuous technical support in a fast-moving regional market.',
  date: 'June 25, 2026',
  image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
}

const defaultPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'smart-technologies-for-manufacturing-optimization',
    tag: 'DIGITALIZATION',
    title: 'Smart Technologies for Manufacturing Optimization',
    desc: 'How IoT telemetry and real-time process monitoring minimize unplanned equipment downtime.',
    date: 'June 20, 2026',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    slug: 'modernizing-plant-control-with-connected-industrial-drives',
    tag: 'AUTOMATION',
    title: 'Modernizing Plant Control with Connected Industrial Drives',
    desc: 'Integrating variable frequency drives and PLCs to maximize motor efficiency and torque control.',
    date: 'June 15, 2026',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    slug: 'advanced-frp-grp-composites-in-corrosive-environments',
    tag: 'MATERIALS',
    title: 'Advanced FRP/GRP Composites in Corrosive Environments',
    desc: 'Why non-metallic piping and storage tanks outlast traditional metals in chemical and coastal facilities.',
    date: 'June 10, 2026',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    slug: 'optimizing-industrial-cooling-for-regional-cold-chains',
    tag: 'ENERGY',
    title: 'Optimizing Industrial Cooling for Regional Cold Chains',
    desc: 'High-efficiency industrial chiller configurations engineered for tropical and high-ambient climates.',
    date: 'May 28, 2026',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 5,
    slug: 'air-audit-best-practices-uncovering-hidden-energy-waste',
    tag: 'COMPRESSION',
    title: 'Air Audit Best Practices: Uncovering Hidden Energy Waste',
    desc: 'Comprehensive system audits revealing pressure drops, leaks, and variable speed savings opportunities.',
    date: 'May 15, 2026',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 6,
    slug: 'nfpa-20-standards-in-containerized-fire-pump-systems',
    tag: 'LIFE SAFETY',
    title: 'NFPA 20 Standards in Containerized Fire Pump Systems',
    desc: 'Ensuring turnkey compliance and rapid commissioning for industrial and commercial fire protection.',
    date: 'May 02, 2026',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80'
  }
]

export default function Insights() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  const [featuredPost, setFeaturedPost] = useState<BlogPost>(defaultFeaturedPost)
  const [posts, setPosts] = useState<BlogPost[]>(defaultPosts)

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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const solutions = [
    {
      title: 'Air & Gas Solutions',
      slug: 'air-gas-solutions'
    },
    {
      title: 'Refrigeration & HVAC Solutions',
      slug: 'refrigeration-hvac-solutions'
    },
    {
      title: 'Automation & Control Solutions',
      slug: 'automation-control'
    },
    {
      title: 'Non Metallic Solution',
      slug: 'non-metallic-solutions'
    },
    {
      title: 'Fire Pump Solutions',
      slug: 'fire-pump-solutions'
    }
  ]

  useEffect(() => {
    async function loadInsights() {
      try {
        const strapiInsights = await fetchFromStrapi<any>('insights')
        if (strapiInsights && strapiInsights.length > 0) {
          const mapped: BlogPost[] = strapiInsights.map((item: any, idx: number) => {
            const rawTitle = item.title || 'Untitled Insight'
            const autoSlug = item.slug || rawTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `insight-${item.id}`
            const defaultImg = defaultPosts[idx % defaultPosts.length]?.image || defaultFeaturedPost.image
            const coverUrl = item.coverImage?.url ? getStrapiMediaUrl(item.coverImage.url) : defaultImg
            const dateStr = item.publishedDate || (item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recently Published')

            return {
              id: String(item.documentId || item.id),
              slug: autoSlug,
              tag: item.category || 'TECHNICAL INSIGHTS',
              title: rawTitle,
              desc: extractStrapiText(item.excerpt) || '',
              date: dateStr,
              image: coverUrl,
              isFeatured: Boolean(item.isFeatured)
            }
          })

          const feat = mapped.find(m => (m as any).isFeatured) || mapped[0]
          setFeaturedPost(feat)
          setPosts(mapped.filter(m => m.slug !== feat.slug))
        }
      } catch (err) {
        console.warn('Error fetching insights from Strapi, using defaults', err)
      }
    }
    loadInsights()
  }, [])

  return (
    <div className="font-sans min-h-screen bg-white text-[#222222]">

      {/* 1. Hero Banner */}
      <div className="pt-28 sm:pt-32 pb-6 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative w-full h-[450px] rounded-3xl overflow-hidden bg-[#222222] text-white flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"
            alt="MVGL Kenya Insights"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="max-w-4xl mx-auto px-6 relative z-20 text-center space-y-6">
            <span className="eyebrow block">
              HOME / INSIGHTS &amp; PERSPECTIVES
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Engineering Insights &amp; Perspectives
            </h1>
            <p className="text-slate-200 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Stay informed with industry trends, engineering advancements, and expert analyses across manufacturing, automation, compressed air, and process cooling in Kenya.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="#featured"
                className="px-6 py-3 bg-[#ED1C24] hover:bg-[#D0171E] text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-colors duration-200 shadow-md"
              >
                Explore Insights
              </a>
              <Link
                to="/contact"
                className="px-6 py-3 border border-white hover:bg-white/10 text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-colors duration-200"
              >
                Talk to an Expert
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* 2. Featured Post Section */}
      <section id="featured" className="py-16 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="space-y-2 mb-10">
          <span className="eyebrow block">
            FEATURED INSIGHT
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#222222] tracking-tight leading-tight">
            Ideas Driving Industrial Efficiency
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl">
            Explore technical notes from our engineering team to stay ahead in a fast-evolving East African industrial landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group">
          <Link to={`/insights/${featuredPost.slug}`} className="lg:col-span-7 h-72 sm:h-96 lg:h-full relative overflow-hidden block">
            <img
              src={featuredPost.image}
              alt={featuredPost.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </Link>
          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-center space-y-6 bg-white text-left">
            <span className="inline-flex px-3 py-1 bg-red-50 text-[#ED1C24] text-[10px] font-black rounded-md uppercase tracking-wider self-start border border-red-100">
              {featuredPost.tag}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#222222] leading-snug group-hover:text-[#ED1C24] transition-colors">
              <Link to={`/insights/${featuredPost.slug}`}>
                {featuredPost.title}
              </Link>
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {featuredPost.desc}
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-slate-400 text-xs font-semibold">{featuredPost.date}</span>
              <Link
                to={`/insights/${featuredPost.slug}`}
                className="text-xs font-bold text-[#ED1C24] hover:text-[#D0171E] uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform"
              >
                Full Brief <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Articles Grid */}
      <section className="py-16 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="space-y-2 mb-10">
          <span className="eyebrow block">
            ALL PERSPECTIVES
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#222222] tracking-tight leading-tight">
            Latest Industry Articles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:border-[#ED1C24] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 text-left"
            >
              <div>
                <Link to={`/insights/${post.slug}`} className="h-52 overflow-hidden relative block">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <div className="p-6 sm:p-8 space-y-3">
                  <span className="inline-flex px-2.5 py-0.5 bg-red-50 text-[#ED1C24] text-[10px] font-black rounded uppercase tracking-wider border border-red-100">
                    {post.tag}
                  </span>
                  <h3 className="text-lg font-bold text-[#222222] leading-snug group-hover:text-[#ED1C24] transition-colors">
                    <Link to={`/insights/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {post.desc}
                  </p>
                </div>
              </div>
              <div className="px-6 sm:px-8 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-semibold">
                <span>{post.date}</span>
                <Link
                  to={`/insights/${post.slug}`}
                  className="text-[#ED1C24] hover:text-[#D0171E] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  Read <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Solutions Slider Section */}
      <section className="py-20 bg-[#F5F5F5] border-t border-b border-slate-200/70">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            
            <div className="w-full lg:w-[320px] bg-[#222222] text-white rounded-3xl p-8 flex flex-col justify-between items-start shadow-xl flex-shrink-0 min-h-[400px]">
              <div className="space-y-4">
                <span className="eyebrow block">DISCOVER</span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                  Applied Engineering Across Disciplines
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Delivering proven technology packages engineered for optimal uptime and durability in demanding conditions.
                </p>
              </div>
              <Link
                to="/solutions"
                className="px-6 py-2.5 bg-[#ED1C24] text-white font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#D0171E] transition-colors shadow-md"
              >
                View Solutions
              </Link>
            </div>

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
                      className="w-[280px] sm:w-[300px] h-[340px] rounded-3xl overflow-hidden relative shadow-md hover:shadow-xl transition-all flex-shrink-0 snap-start block group cursor-pointer"
                    >
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
                      </div>
                    </Link>
                  )
                })}
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
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => scrollSlider('right')}
                    className="p-2 border border-slate-300 rounded-lg bg-white text-[#222222] hover:border-[#ED1C24] hover:text-[#ED1C24] transition-colors cursor-pointer"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Newsletter Banner */}
      <section id="subscribe" className="py-16 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#ED1C24] text-white rounded-3xl py-16 sm:py-20 px-8 sm:px-12 relative overflow-hidden shadow-xl text-center space-y-6 w-full">
          <div className="max-w-4xl mx-auto space-y-6 relative z-10">
            <div className="space-y-3">
              <span className="eyebrow block !text-white/80">TECHNICAL UPDATES</span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                Stay Ahead with MVGL Kenya Insights
              </h2>
              <p className="text-white/90 text-sm max-w-xl mx-auto">
                Knowledge-driven innovation. Subscribe to receive periodic briefs on emerging industrial equipment technologies, energy efficiency tips, and engineering best practices in Kenya.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 pt-2">
              {subscribed ? (
                <div className="w-full py-3 px-4 bg-white/20 rounded-lg text-sm font-bold text-white border border-white/30">
                  ✓ Subscribed successfully! Thank you for connecting with MVGL Kenya.
                </div>
              ) : (
                <>
                  <input 
                    type="email" 
                    required
                    placeholder="Enter your work email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow px-4 py-3 bg-white text-[#222222] placeholder-slate-400 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-[#222222] hover:bg-[#333333] text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer"
                  >
                    Subscribe
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </section>

    </div>
  )
}
