import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, ArrowRight, ChevronDown, MapPin, SlidersHorizontal, RefreshCw } from 'lucide-react'
import IndustrialChallengeCTA from '../components/ui/IndustrialChallengeCTA'
import { fetchFromStrapi, getStrapiMediaUrl, getCachedStrapiData, setCachedStrapiData } from '../services/strapi'

export interface UnifiedItem {
  id: string
  slug: string
  type: 'event' | 'article'
  badge: string // e.g. 'UPCOMING', 'PAST', 'ONGOING', 'BLOG', 'PRESS RELEASE'
  badgeType: 'event-upcoming' | 'event-past' | 'event-ongoing' | 'blog'
  title: string
  description: string
  date: string
  rawDate: string
  time?: string
  location?: string
  category: string
  image: string
  link: string
  isExternal?: boolean
}

// Default fallback items to ensure the page is always rich and functional
const defaultUnifiedItems: UnifiedItem[] = [
  {
    id: 'industry-innovation-now-to-next-2026',
    slug: 'industry-innovation-now-to-next-2026',
    type: 'event',
    badge: 'PAST',
    badgeType: 'event-past',
    title: 'Industry Innovation: Now to Next 2026',
    description: 'A flagship Multivista platform bringing manufacturers, OEMs, system integrators and technology partners together to explore the next phase of industrial transformation.',
    date: 'June 11, 2026',
    rawDate: '2026-06-11',
    time: '9:00 AM - 4:00 PM',
    location: 'Hilton Hotel, Chennai',
    category: 'Innovation & Technology',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    link: '/events/industry-innovation-now-to-next-2026'
  },
  {
    id: 'building-resilient-industrial-supply-chains',
    slug: 'building-resilient-industrial-supply-chains',
    type: 'article',
    badge: 'BLOG',
    badgeType: 'blog',
    title: 'Building Resilient Industrial Supply Chains',
    description: 'Strategies for procurement optimization and reliable lifecycle support across key industrial and manufacturing markets.',
    date: 'Jun 14, 2026',
    rawDate: '2026-06-14',
    category: 'SUPPLY CHAIN',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    link: '/insights'
  },
  {
    id: 'smart-infrastructure-next-generation',
    slug: 'smart-infrastructure-next-generation',
    type: 'article',
    badge: 'BLOG',
    badgeType: 'blog',
    title: 'Smart Infrastructure for the Next Generation of Industry',
    description: 'Connected technologies supporting digital transformation and energy efficiency across industrial facilities and utility plants.',
    date: 'Jun 14, 2026',
    rawDate: '2026-06-14',
    category: 'INFRASTRUCTURE',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    link: '/insights'
  },
  {
    id: 'east-africa-industrial-expo-2026',
    slug: 'east-africa-industrial-expo-2026',
    type: 'event',
    badge: 'UPCOMING',
    badgeType: 'event-upcoming',
    title: 'East Africa Industrial & Manufacturing Expo 2026',
    description: 'Showcasing our latest industrial automation, compressed air packages, and smart control technologies directly to plant operations teams across Kenya.',
    date: 'October 14 - 16, 2026',
    rawDate: '2026-10-14',
    time: '8:30 AM - 5:00 PM',
    location: 'Kenyatta International Convention Centre (KICC), Nairobi',
    category: 'Industrial Expo',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80',
    link: '/events/east-africa-industrial-expo-2026'
  },
  {
    id: 'reducing-carbon-footprint-cooling',
    slug: 'reducing-carbon-footprint-cooling',
    type: 'article',
    badge: 'BLOG',
    badgeType: 'blog',
    title: 'Reducing Carbon Footprint in Process Cooling & Cold Storage',
    description: 'How modern screw chiller configurations reduce energy consumption by up to 30% in food and horticultural supply chains across East Africa.',
    date: 'May 28, 2026',
    rawDate: '2026-05-28',
    category: 'SUSTAINABILITY',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    link: '/sustainability'
  }
]

export default function Events() {
  const [items, setItems] = useState<UnifiedItem[]>(() => {
    const cached = getCachedStrapiData<UnifiedItem>('events_unified_mapped')
    return (cached && cached.length > 0) ? cached : defaultUnifiedItems
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<'all' | 'article' | 'event'>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest')

  // Fetch dynamic events and insights from Strapi
  useEffect(() => {
    async function loadDynamicContent() {
      try {
        const [strapiEvents, strapiInsights] = await Promise.all([
          fetchFromStrapi<any>('events'),
          fetchFromStrapi<any>('insights')
        ])

        const dynamicEvents: UnifiedItem[] = (strapiEvents || []).map((e: any) => {
          const status = (e.eventStatus || 'Upcoming').toUpperCase()
          const badgeType = status.includes('PAST') || status.includes('COMPLETED')
            ? 'event-past'
            : status.includes('ONGOING')
            ? 'event-ongoing'
            : 'event-upcoming'

          return {
            id: `strapi-event-${e.documentId || e.id}`,
            slug: e.slug || `event-${e.id}`,
            type: 'event',
            badge: status,
            badgeType,
            title: e.title || 'Untitled Event',
            description: e.description || '',
            date: e.dateDisplay || e.startDate || 'Upcoming',
            rawDate: e.startDate || '2026-10-01',
            time: e.boothNumber ? `Booth: ${e.boothNumber}` : undefined,
            location: e.location || 'Nairobi, Kenya',
            category: e.eventType || 'Event',
            image: e.coverImage?.url
              ? getStrapiMediaUrl(e.coverImage.url)
              : 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
            link: `/events/${e.slug || e.id}`
          }
        })

        const dynamicArticles: UnifiedItem[] = (strapiInsights || []).map((a: any) => ({
          id: `strapi-insight-${a.documentId || a.id}`,
          slug: a.slug || `insight-${a.id}`,
          type: 'article',
          badge: (a.category?.includes('Press') ? 'PRESS RELEASE' : 'BLOG').toUpperCase(),
          badgeType: 'blog',
          title: a.title || 'Untitled Article',
          description: a.excerpt || a.description || '',
          date: a.publishedDate || '2026',
          rawDate: a.publishedDate || '2026-06-01',
          category: (a.category || 'INSIGHTS').toUpperCase(),
          image: a.coverImage?.url
            ? getStrapiMediaUrl(a.coverImage.url)
            : 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
          link: '/insights'
        }))

        if (dynamicEvents.length > 0 || dynamicArticles.length > 0) {
          // Prioritize dynamic items from Strapi over mock items
          const eventsToUse = dynamicEvents.length > 0
            ? dynamicEvents
            : defaultUnifiedItems.filter(d => d.type === 'event')
          const articlesToUse = dynamicArticles.length > 0
            ? dynamicArticles
            : defaultUnifiedItems.filter(d => d.type === 'article')
          const combined = [...eventsToUse, ...articlesToUse]
          setCachedStrapiData('events_unified_mapped', combined)
          setItems(combined)
        }
      } catch (err) {
        console.warn('[Events] Error loading Strapi content, using default data.', err)
      }
    }

    loadDynamicContent()
  }, [])

  // Calculate live counts for the pills
  const counts = useMemo(() => {
    const total = items.length
    const articles = items.filter(i => i.type === 'article').length
    const events = items.filter(i => i.type === 'event').length
    return { total, articles, events }
  }, [items])

  // Extract unique categories for the dropdown
  const categories = useMemo(() => {
    const cats = new Set(items.map(i => i.category.trim()).filter(Boolean))
    return Array.from(cats)
  }, [items])

  // Filtering and Sorting
  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        // Tab type filter
        if (selectedType !== 'all' && item.type !== selectedType) {
          return false
        }
        // Category dropdown filter
        if (selectedCategory !== 'all' && item.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false
        }
        // Search query filter
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase()
          const matchTitle = item.title.toLowerCase().includes(q)
          const matchDesc = item.description.toLowerCase().includes(q)
          const matchLoc = item.location?.toLowerCase().includes(q)
          const matchCat = item.category.toLowerCase().includes(q)
          if (!matchTitle && !matchDesc && !matchLoc && !matchCat) {
            return false
          }
        }
        return true
      })
      .sort((a, b) => {
        const dateA = new Date(a.rawDate).getTime() || 0
        const dateB = new Date(b.rawDate).getTime() || 0
        return sortBy === 'newest' ? dateB - dateA : dateA - dateB
      })
  }, [items, selectedType, selectedCategory, searchTerm, sortBy])

  const resetFilters = () => {
    setSearchTerm('')
    setSelectedType('all')
    setSelectedCategory('all')
    setSortBy('newest')
  }

  return (
    <div className="font-sans min-h-screen bg-[#F8FAFC] text-[#222222]">
      
      {/* 1. Hero Section */}
      <div className="pt-28 sm:pt-32 pb-6 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative w-full h-[400px] sm:h-[430px] rounded-3xl overflow-hidden bg-[#1E293B] text-white flex items-center justify-center shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/75 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80"
            alt="MVGL Kenya Events & Expos"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center space-y-4">
            <span className="eyebrow block">
              HOME / EVENTS &amp; INSIGHTS
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Events, Expos &amp; Industry News
            </h1>
            <p className="text-slate-200 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Explore upcoming industrial expos, regional engineering summits, technical updates, and thought-leadership articles from MVGL Kenya.
            </p>
          </div>
        </section>
      </div>

      {/* 2. Main Content & Filter Container */}
      <section className="py-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Search & Filter Control Box (Matches Screenshot) */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-xs space-y-5">
          
          {/* Top Row: Search Input + Type Pill Buttons */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-grow max-w-full lg:max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search news, articles & events..."
                className="w-full pl-11 pr-4 py-2.5 sm:py-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ED1C24]/20 focus:border-[#ED1C24] transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter Pills with Badge Counters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none flex-shrink-0">
              
              {/* All Pill */}
              <button
                onClick={() => setSelectedType('all')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  selectedType === 'all'
                    ? 'bg-[#ED1C24] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>All</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                  selectedType === 'all'
                    ? 'bg-white/25 text-white'
                    : 'bg-white text-slate-700'
                }`}>
                  {counts.total}
                </span>
              </button>

              {/* News & Articles Pill */}
              <button
                onClick={() => setSelectedType('article')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  selectedType === 'article'
                    ? 'bg-[#ED1C24] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>News &amp; Articles</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                  selectedType === 'article'
                    ? 'bg-white/25 text-white'
                    : 'bg-white text-slate-700'
                }`}>
                  {counts.articles}
                </span>
              </button>

              {/* Events Pill */}
              <button
                onClick={() => setSelectedType('event')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  selectedType === 'event'
                    ? 'bg-[#ED1C24] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>Events</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                  selectedType === 'event'
                    ? 'bg-white/25 text-white'
                    : 'bg-white text-slate-700'
                }`}>
                  {counts.events}
                </span>
              </button>

            </div>

          </div>

          {/* Bottom Row: Dropdowns + Showing Count */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-slate-100 text-xs sm:text-sm">
            
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              {/* Category Dropdown */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 rounded-lg px-3.5 py-2 pr-8 text-xs font-semibold text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#ED1C24] cursor-pointer"
                >
                  <option value="all">All Topics &amp; Categories</option>
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-white border border-slate-200 rounded-lg px-3.5 py-2 pr-8 text-xs font-semibold text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#ED1C24] cursor-pointer"
                >
                  <option value="newest">Sort: Newest First</option>
                  <option value="oldest">Sort: Oldest First</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>

              {(searchTerm || selectedType !== 'all' || selectedCategory !== 'all') && (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#ED1C24] hover:underline cursor-pointer ml-1"
                >
                  <RefreshCw className="h-3 w-3" />
                  Reset
                </button>
              )}
            </div>

            {/* Showing Count */}
            <div className="text-slate-500 font-medium text-xs">
              Showing <span className="font-bold text-slate-800">{filteredItems.length}</span> of <span className="font-bold text-slate-800">{items.length}</span> items
            </div>

          </div>

        </div>

        {/* 3. Cards Grid (3 Columns on Desktop, Responsive) */}
        {filteredItems.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4 shadow-xs">
            <SlidersHorizontal className="h-10 w-10 text-slate-300 mx-auto" />
            <h3 className="text-xl font-bold text-slate-800">No matching items found</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              We couldn't find anything matching your search criteria. Try modifying your filters or clearing search terms.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-[#ED1C24] text-white font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#D0171E] transition-colors cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => {
              const isEvent = item.type === 'event'

              return (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 text-left"
                >
                  {/* Top Image Container */}
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Floating Pill Badge (Top Left - Exactly like Screenshot) */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-sm backdrop-blur-md ${
                        item.badgeType === 'event-past'
                          ? 'bg-slate-900/80 text-white border border-white/20'
                          : item.badgeType === 'event-upcoming'
                          ? 'bg-[#ED1C24] text-white shadow-red-500/30'
                          : item.badgeType === 'event-ongoing'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white/95 text-slate-800 border border-slate-200'
                      }`}>
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                    
                    <div className="space-y-2.5">
                      {/* Meta Information Line */}
                      {isEvent ? (
                        <div className="text-xs text-slate-500 font-medium flex flex-wrap items-center gap-1.5 leading-snug">
                          <span>{item.date}</span>
                          {item.time && (
                            <>
                              <span className="text-slate-300">•</span>
                              <span>{item.time}</span>
                            </>
                          )}
                          {item.location && (
                            <>
                              <span className="text-slate-300">•</span>
                              <span className="truncate max-w-[200px]">{item.location}</span>
                            </>
                          )}
                        </div>
                      ) : (
                        <div className="text-xs text-slate-500 font-bold tracking-wider uppercase">
                          <span className="text-slate-700">{item.category}</span>
                          <span className="mx-2 text-slate-300">•</span>
                          <span>{item.date}</span>
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#ED1C24] transition-colors leading-snug line-clamp-2">
                        <Link to={item.link}>
                          {item.title}
                        </Link>
                      </h3>

                      {/* Description */}
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3 font-normal">
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom Link Action */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        to={item.link}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#ED1C24] hover:text-[#D0171E] transition-colors group-hover:translate-x-1 duration-200 cursor-pointer"
                      >
                        <span>{isEvent ? 'View Event' : 'Read More'}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>

                      {isEvent && item.location && (
                        <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-slate-400" />
                          <span className="truncate max-w-[120px]">{item.location.split(',')[0]}</span>
                        </span>
                      )}
                    </div>

                  </div>
                </div>
              )
            })}
          </div>
        )}

      </section>

      {/* 4. Bottom Industrial CTA */}
      <IndustrialChallengeCTA bgImage="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80" />

    </div>
  )
}
