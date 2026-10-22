import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  ArrowLeft, ArrowRight, Calendar, Clock, User, Share2, Check, 
  ChevronRight, ArrowUpRight, CheckCircle2, ShieldCheck, 
  Zap, Cpu, Activity, Gauge, Layers, Sparkles, Wrench, FileText
} from 'lucide-react'
import IndustrialChallengeCTA from '../components/ui/IndustrialChallengeCTA'
import { fetchFromStrapi, getStrapiMediaUrl, extractStrapiText, getCachedStrapiData, setCachedStrapiData } from '../services/strapi'

interface InsightArticle {
  id: string
  slug: string
  title: string
  category: string
  publishedDate: string
  author: string
  readTime: string
  excerpt: string
  content: string
  image: string
  isFeatured?: boolean
}

// Fallback articles to guarantee rich content if Strapi is offline
const fallbackInsights: InsightArticle[] = [
  {
    id: 'building-resilient-industrial-supply-chains-in-east-africa',
    slug: 'building-resilient-industrial-supply-chains-in-east-africa',
    title: 'Building Resilient Industrial Supply Chains in East Africa',
    category: 'SUPPLY CHAIN',
    publishedDate: 'June 25, 2026',
    author: 'MVGL Supply Chain Desk',
    readTime: '6 min read',
    excerpt: 'Strategies for securing critical OEM components, spare parts, and continuous technical support in a fast-moving regional market.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    content: `Industrial operations across Kenya, Uganda, and Tanzania increasingly face dynamic geopolitical and logistical pressures. For manufacturing and process facilities, unscheduled equipment downtime due to missing replacement components can cost tens of thousands of dollars per day.

### The True Cost of Equipment Downtime
In heavy industries such as cement manufacturing, sugar processing, beverage bottling, and petrochemical refining, reliability is synonymous with profitability. A critical compressor breakdown or an automation PLC trip cannot afford a multi-week lead time for imported spares.

### Key Pillars of Modern Industrial Procurement
1. **Pre-emptive Buffer Stocking:** Maintaining localized inventory for high-wear components such as mechanical seals, compressor valves, filtration cartridges, and variable speed drive control boards.
2. **Authorized OEM Partnerships:** Sourcing certified genuine parts directly from vetted European and global manufacturers to prevent counterfeit parts from entering critical processes.
3. **Condition-Based Spares Triggering:** Leveraging IoT vibration analysis and thermal imaging data to forecast maintenance cycles weeks ahead of failure, enabling planned procurement rather than frantic emergency orders.

### The Role of MVGL Kenya
MVGL Kenya partners with leading multinational OEMs to maintain robust regional logistics hubs in Nairobi and Mombasa. By providing technical consultation alongside parts distribution, we ensure industrial plants across East Africa maintain uninterrupted operational momentum.`
  },
  {
    id: 'smart-technologies-for-manufacturing-optimization',
    slug: 'smart-technologies-for-manufacturing-optimization',
    title: 'Smart Technologies for Manufacturing Optimization',
    category: 'DIGITALIZATION',
    publishedDate: 'June 20, 2026',
    author: 'Dr. A. Mwangi, Head of IoT Systems',
    readTime: '5 min read',
    excerpt: 'How IoT telemetry and real-time process monitoring minimize unplanned equipment downtime.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    content: `The fourth industrial revolution is no longer an abstract concept for East African manufacturing. Plants from Athi River to Kisumu are outfitting legacy machinery with smart sensors and cloud telemetry architectures.

### Continuous Machine Health Monitoring
Rather than adhering to rigid calendar-based maintenance schedules, smart telemetry allows plant managers to monitor real-time variables:
- Bearing vibration spectra and acoustic emissions
- Winding temperature curves on continuous duty motors
- Pressure differential across hydraulic and air filters
- Power quality, harmonic distortion, and phase balance

### Concrete ROI Metrics
Plants that have adopted smart sensor integration report a 25% reduction in overall maintenance expenditure and an average 35% drop in catastrophic breakdown incidents within the first year of deployment.`
  },
  {
    id: 'modernizing-plant-control-with-connected-industrial-drives',
    slug: 'modernizing-plant-control-with-connected-industrial-drives',
    title: 'Modernizing Plant Control with Connected Industrial Drives',
    category: 'AUTOMATION',
    publishedDate: 'June 15, 2026',
    author: 'MVGL Automation Team',
    readTime: '4 min read',
    excerpt: 'Integrating variable frequency drives and PLCs to maximize motor efficiency and torque control.',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
    content: `Electric motors account for over 65% of all electrical energy consumed in industrial processing plants. Running fixed-speed motors with mechanical dampers or throttle valves introduces tremendous energy waste.

### The Advantage of Smart Variable Speed Control
By matching motor speed dynamically to process demand, Variable Frequency Drives (VFDs) reduce power consumption by up to 40% on centrifugal pumps and fan packages. Furthermore, modern drives provide:
- Soft starting that eliminates damaging mechanical shock and inrush current
- Real-time torque monitoring to detect mechanical binding or dry-run conditions
- Seamless fieldbus integration via Profinet, Modbus TCP, and Ethernet/IP into central SCADA systems.`
  },
  {
    id: 'advanced-frp-grp-composites-in-corrosive-environments',
    slug: 'advanced-frp-grp-composites-in-corrosive-environments',
    title: 'Advanced FRP/GRP Composites in Corrosive Environments',
    category: 'MATERIALS',
    publishedDate: 'June 10, 2026',
    author: 'Engineering Materials Specialist',
    readTime: '5 min read',
    excerpt: 'Why non-metallic piping and storage tanks outlast traditional metals in chemical and coastal facilities.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    content: `In coastal industrial zones like Mombasa and industrial wastewater treatment plants, metallic piping and carbon steel tanks face relentless galvanic and chemical corrosion.

### Non-Metallic Solutions
Fiber-Reinforced Polymers (FRP) and Glass-Reinforced Plastic (GRP) composites deliver exceptional strength-to-weight ratios with total immunity to electrochemical rusting. 

Key advantages include:
- Zero corrosion allowance required in wall thickness calculations
- Smooth internal surface finish that lowers pumping head loss and eliminates scaling
- 50+ year design life with negligible exterior painting or cathodic protection costs.`
  },
  {
    id: 'optimizing-industrial-cooling-for-regional-cold-chains',
    slug: 'optimizing-industrial-cooling-for-regional-cold-chains',
    title: 'Optimizing Industrial Cooling for Regional Cold Chains',
    category: 'ENERGY',
    publishedDate: 'May 28, 2026',
    author: 'Cooling & Refrigeration Team',
    readTime: '6 min read',
    excerpt: 'High-efficiency industrial chiller configurations engineered for tropical and high-ambient climates.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    content: `Kenya’s fresh produce and horticultural export sector depends completely on unbroken temperature management from farm packhouses to Jomo Kenyatta International Airport.

### Tropical Ambient Engineering
Standard commercial chillers struggle when ambient temperatures exceed 38°C. MVGL provides customized industrial chillers featuring:
- High-efficiency twin-screw compressors with stepless slide valve capacity control
- Microchannel aluminum condensers with protective anti-corrosion coatings
- Low Global Warming Potential (GWP) refrigerants compliant with Montreal Protocol Kigali amendments
- Integrated thermal energy storage (TES) and ice banks to capitalize on off-peak electricity tariffs.`
  },
  {
    id: 'air-audit-best-practices-uncovering-hidden-energy-waste',
    slug: 'air-audit-best-practices-uncovering-hidden-energy-waste',
    title: 'Air Audit Best Practices: Uncovering Hidden Energy Waste',
    category: 'COMPRESSION',
    publishedDate: 'May 15, 2026',
    author: 'Compressed Air Technical Desk',
    readTime: '5 min read',
    excerpt: 'Comprehensive system audits revealing pressure drops, leaks, and variable speed savings opportunities.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    content: `Compressed air is often called "the fourth utility," yet it is also the most expensive. In typical manufacturing plants, only 10% to 15% of the electrical energy consumed by an air compressor is converted into usable pneumatic work; the rest is dissipated as heat and system leaks.

### Conducting a Professional Air Audit
A comprehensive audit evaluates four main system areas:
1. **Air Generation:** Measuring specific power consumption (kW per 100 CFM) across varying plant loads.
2. **Air Treatment:** Monitoring pressure drops across coalescing filters and verifying dryer pressure dewpoint performance.
3. **Distribution Piping:** Detecting leaks using ultrasonic listening devices and eliminating artificial pressure drops.
4. **End-Use Applications:** Eliminating open blow-offs and optimizing pneumatic cylinder operating pressures.`
  },
  {
    id: 'nfpa-20-standards-in-containerized-fire-pump-systems',
    slug: 'nfpa-20-standards-in-containerized-fire-pump-systems',
    title: 'NFPA 20 Standards in Containerized Fire Pump Systems',
    category: 'LIFE SAFETY',
    publishedDate: 'May 02, 2026',
    author: 'Fire Protection Engineering Desk',
    readTime: '4 min read',
    excerpt: 'Ensuring turnkey compliance and rapid commissioning for industrial and commercial fire protection.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    content: `When a fire incident occurs in an industrial warehouse, chemical storage terminal, or power plant, life safety systems must operate with 100% reliability.

### Turnkey Containerized Fire Packages
Custom prefabricated containerized pump houses offer massive advantages over traditional site-built pump rooms:
- Built and certified to strict NFPA 20 and UL/FM standards
- Factory pre-piped, pre-wired, and fully tested prior to shipping
- Dual drive systems combining electric motor and emergency diesel engine backup
- Automatic weekly test run timers and remote telemetry integration.`
  }
]

interface BlockItem {
  number?: string
  title?: string
  description?: string
}

interface ArticleBlock {
  type: 'heading' | 'paragraph' | 'numbered-grid' | 'bullet-list'
  level?: number
  text?: string
  items?: BlockItem[]
}

// Robust article content parser
function parseArticleBlocks(content: string): ArticleBlock[] {
  if (!content) return []
  const lines = content.replace(/\r\n/g, '\n').split('\n')
  const blocks: ArticleBlock[] = []
  let i = 0

  while (i < lines.length) {
    const rawLine = lines[i]
    const line = rawLine.trim()

    if (!line) {
      i++
      continue
    }

    // Heading 3
    if (line.startsWith('### ')) {
      blocks.push({
        type: 'heading',
        level: 3,
        text: line.replace(/^###\s+/, '').trim()
      })
      i++
      continue
    }

    // Heading 2
    if (line.startsWith('## ')) {
      blocks.push({
        type: 'heading',
        level: 2,
        text: line.replace(/^##\s+/, '').trim()
      })
      i++
      continue
    }

    // Numbered list item: e.g. "1. **Air Generation:** Measuring..."
    if (/^\d+\.\s+/.test(line)) {
      const items: BlockItem[] = []
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        const itemLine = lines[i].trim()
        const numMatch = itemLine.match(/^(\d+)\.\s+(.*)$/)
        const num = numMatch ? numMatch[1] : String(items.length + 1)
        const rest = numMatch ? numMatch[2] : itemLine

        let title = ''
        let desc = rest

        const boldMatch = rest.match(/^\*\*(.*?)\*\*[:\-]?\s*(.*)$/)
        if (boldMatch) {
          title = boldMatch[1].replace(/[:\-]$/, '').trim()
          desc = boldMatch[2].trim()
        } else {
          const colonMatch = rest.match(/^([^:]{2,40}):\s*(.*)$/)
          if (colonMatch) {
            title = colonMatch[1].trim()
            desc = colonMatch[2].trim()
          }
        }

        items.push({
          number: num.padStart(2, '0'),
          title: title || `Pillar ${num}`,
          description: desc || rest
        })
        i++
      }
      blocks.push({
        type: 'numbered-grid',
        items
      })
      continue
    }

    // Bullet list item: e.g. "- **Title:** desc" or "- desc"
    if (/^[-*•]\s+/.test(line)) {
      const items: BlockItem[] = []
      while (i < lines.length && /^[-*•]\s+/.test(lines[i].trim())) {
        const itemLine = lines[i].trim()
        const clean = itemLine.replace(/^[-*•]\s+/, '').trim()

        let title = ''
        let desc = clean

        const boldMatch = clean.match(/^\*\*(.*?)\*\*[:\-]?\s*(.*)$/)
        if (boldMatch) {
          title = boldMatch[1].replace(/[:\-]$/, '').trim()
          desc = boldMatch[2].trim()
        } else {
          const colonMatch = clean.match(/^([^:]{2,40}):\s*(.*)$/)
          if (colonMatch) {
            title = colonMatch[1].trim()
            desc = colonMatch[2].trim()
          }
        }

        items.push({
          title,
          description: desc
        })
        i++
      }
      blocks.push({
        type: 'bullet-list',
        items
      })
      continue
    }

    // Normal paragraph text
    const paraLines: string[] = []
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith('##') &&
      !/^\d+\.\s+/.test(lines[i].trim()) &&
      !/^[-*•]\s+/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i].trim())
      i++
    }

    const fullPara = paraLines.join(' ')
    if (fullPara) {
      blocks.push({
        type: 'paragraph',
        text: fullPara
      })
    }
  }

  return blocks
}

// Format inline markdown (bold asterisks) into safe React elements
function formatInlineMarkdown(text: string) {
  if (!text) return null
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return part
  })
}

// Dynamic icons for engineering cards
function getPillarIcon(title: string = '', idx: number) {
  const lower = title.toLowerCase()
  if (lower.includes('generation') || lower.includes('power') || lower.includes('energy')) return Zap
  if (lower.includes('treatment') || lower.includes('dewpoint') || lower.includes('filter')) return Activity
  if (lower.includes('piping') || lower.includes('distribution') || lower.includes('leak')) return Gauge
  if (lower.includes('end-use') || lower.includes('cylinder') || lower.includes('application')) return Cpu
  if (lower.includes('oem') || lower.includes('partner') || lower.includes('procurement')) return ShieldCheck
  if (lower.includes('stock') || lower.includes('buffer') || lower.includes('spares')) return Layers
  if (lower.includes('vibration') || lower.includes('thermal') || lower.includes('iot')) return Activity
  const list = [Cpu, Gauge, Activity, Zap, Layers, Sparkles]
  return list[idx % list.length]
}

export default function InsightDetail() {
  const { slug } = useParams<{ slug: string }>()
  const targetSlug = (slug || '').toLowerCase()
  const cachedInsights = getCachedStrapiData<InsightArticle>('insights_mapped') || []
  const initialFound = 
    cachedInsights.find(a => a.slug.toLowerCase() === targetSlug || a.id.toLowerCase() === targetSlug) ||
    fallbackInsights.find(a => a.slug.toLowerCase() === targetSlug || a.id.toLowerCase() === targetSlug) ||
    null

  const [article, setArticle] = useState<InsightArticle | null>(initialFound)
  const [allArticles, setAllArticles] = useState<InsightArticle[]>(cachedInsights.length > 0 ? cachedInsights : fallbackInsights)
  const [otherArticles, setOtherArticles] = useState<InsightArticle[]>(() => {
    const pool = cachedInsights.length > 0 ? cachedInsights : fallbackInsights
    return pool.filter(a => a.slug !== (initialFound ? initialFound.slug : slug)).slice(0, 3)
  })
  const [loading, setLoading] = useState(!initialFound)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    async function loadInsight() {
      try {
        const strapiInsights = await fetchFromStrapi<any>('insights')
        let allInsights: InsightArticle[] = []

        if (strapiInsights && strapiInsights.length > 0) {
          const mapped: InsightArticle[] = strapiInsights.map((item: any, idx: number) => {
            const rawTitle = item.title || 'Untitled Insight'
            const autoSlug = item.slug || rawTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `insight-${item.id}`
            const defaultImg = fallbackInsights[idx % fallbackInsights.length]?.image || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80'
            const coverUrl = item.coverImage?.url ? getStrapiMediaUrl(item.coverImage.url) : defaultImg

            return {
              id: String(item.documentId || item.id),
              slug: autoSlug,
              title: rawTitle,
              category: item.category || 'Technical Insights',
              publishedDate: item.publishedDate || item.publishedAt ? new Date(item.publishedDate || item.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently Published',
              author: item.author || 'MVGL Kenya Editorial',
              readTime: item.readTime || '5 min read',
              excerpt: extractStrapiText(item.excerpt) || '',
              content: extractStrapiText(item.content) || '',
              image: coverUrl,
              isFeatured: Boolean(item.isFeatured)
            }
          })
          allInsights = mapped
          setCachedStrapiData('insights_mapped', mapped)
        } else {
          allInsights = fallbackInsights
        }

        setAllArticles(allInsights)

        const target = (slug || '').toLowerCase()
        const found = allInsights.find(a => 
          a.slug.toLowerCase() === target ||
          a.id.toLowerCase() === target ||
          a.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') === target
        ) || fallbackInsights.find(a =>
          a.slug.toLowerCase() === target ||
          a.id.toLowerCase() === target ||
          a.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') === target
        ) || null

        setArticle(found)
        const pool = allInsights.length > 1 ? allInsights : fallbackInsights
        setOtherArticles(pool.filter(a => a.slug !== (found ? found.slug : slug)).slice(0, 3))
      } catch (err) {
        console.warn('Error loading insight article from Strapi, using fallback', err)
      } finally {
        setLoading(false)
      }
    }

    loadInsight()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] font-sans">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#ED1C24] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-600 font-semibold text-sm">Loading engineering perspective...</p>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] font-sans p-6 text-center">
        <div className="max-w-md space-y-4">
          <h1 className="text-4xl font-extrabold text-slate-900">Perspective Not Found</h1>
          <p className="text-slate-600 text-sm">
            The article you are looking for does not exist or may have been relocated.
          </p>
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#ED1C24] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs hover:bg-[#D0171E] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Insights
          </Link>
        </div>
      </div>
    )
  }

  // Parse structured blocks from markdown/text
  const contentBlocks = parseArticleBlocks(article.content)

  // Find previous and next articles
  const currentIdx = allArticles.findIndex(a => a.slug === article.slug)
  const prevArticle = currentIdx > 0 ? allArticles[currentIdx - 1] : null
  const nextArticle = currentIdx >= 0 && currentIdx < allArticles.length - 1 ? allArticles[currentIdx + 1] : null

  return (
    <div className="font-sans min-h-screen bg-[#F8FAFC] text-[#222222]">
      
      {/* 1. Hero Section (Site Design Hierarchy) */}
      <div className="pt-28 sm:pt-32 pb-6 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative w-full min-h-[440px] rounded-3xl overflow-hidden bg-slate-950 text-white flex items-center shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-black/60 z-10"></div>
          <img
            src={article.image}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="max-w-5xl mx-auto px-6 sm:px-12 py-16 relative z-20 space-y-6 text-left w-full">
            
            {/* Breadcrumb & Navigation */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link
                to="/insights"
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white uppercase tracking-wider transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to All Insights</span>
              </Link>

              <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-[#ED1C24] text-white shadow-md">
                {article.category}
              </span>
            </div>

            {/* Eyebrow */}
            <span className="eyebrow block">
              INSIGHTS / {article.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white max-w-4xl">
              {article.title}
            </h1>

            {/* Key Meta row and Share Button */}
            <div className="flex flex-wrap items-center justify-between gap-6 pt-4 border-t border-white/10">
              <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-200">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#ED1C24]" />
                  <span className="font-semibold">{article.publishedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#ED1C24]" />
                  <span className="font-semibold">{article.readTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-[#ED1C24]" />
                  <span className="font-semibold">{article.author}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleShare}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors backdrop-blur-md flex items-center gap-2 cursor-pointer border border-white/20"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Share2 className="h-4 w-4" />}
                  <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
                </button>
              </div>
            </div>

          </div>
        </section>
      </div>

      {/* 2. Main Content & Sidebar Grid */}
      <section className="pb-20 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column (Article Content) */}
          <article className="lg:col-span-8 space-y-8 text-left">
            
            {/* Executive Summary Card */}
            {article.excerpt && (
              <div className="relative bg-white border-l-4 border-l-[#ED1C24] border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="eyebrow block">EXECUTIVE SUMMARY</span>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#ED1C24]" />
                    Engineering Brief
                  </span>
                </div>
                <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed italic">
                  "{article.excerpt}"
                </p>
              </div>
            )}

            {/* Article Main Body Card */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
              
              {/* Structured Article Blocks */}
              <div className="space-y-6">
                {contentBlocks.map((block, idx) => {
                  
                  // 1. Section Heading
                  if (block.type === 'heading') {
                    return (
                      <div key={idx} className="pt-8 pb-3 border-b border-slate-100 first:pt-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-2 h-2 rounded-full bg-[#ED1C24]"></span>
                          <span className="text-[11px] font-black uppercase tracking-wider text-[#ED1C24]">
                            Technical Focus
                          </span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                          {block.text}
                        </h3>
                      </div>
                    )
                  }

                  // 2. Numbered Engineering Pillar Grid (2-Column Cards)
                  if (block.type === 'numbered-grid') {
                    return (
                      <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                        {block.items?.map((item, itemIdx) => {
                          const IconComp = getPillarIcon(item.title, itemIdx)
                          return (
                            <div
                              key={itemIdx}
                              className="group relative bg-white border border-slate-200/90 hover:border-[#ED1C24] rounded-2xl p-6 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                            >
                              <div>
                                <div className="flex items-center justify-between mb-4">
                                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-red-50 text-[#ED1C24] border border-red-100">
                                    Pillar {item.number || `0${itemIdx + 1}`}
                                  </span>
                                  <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#ED1C24] group-hover:bg-red-50/50 group-hover:border-red-100 transition-colors">
                                    <IconComp className="w-4 h-4" />
                                  </div>
                                </div>

                                <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#ED1C24] transition-colors mb-2">
                                  {item.title}
                                </h4>

                                <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">
                                  {formatInlineMarkdown(item.description || '')}
                                </p>
                              </div>

                              <div className="pt-4">
                                <div className="w-8 h-1 bg-slate-200 group-hover:w-full group-hover:bg-[#ED1C24] rounded-full transition-all duration-300"></div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )
                  }

                  // 3. Bullet List (Engineering Specifications & Benefits Grid)
                  if (block.type === 'bullet-list') {
                    return (
                      <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-6">
                        {block.items?.map((item, bIdx) => (
                          <div
                            key={bIdx}
                            className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:border-[#ED1C24]/50 hover:shadow-xs transition-all duration-200"
                          >
                            <div className="w-7 h-7 rounded-xl bg-red-50 text-[#ED1C24] flex items-center justify-center flex-shrink-0 mt-0.5 border border-red-100">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div className="space-y-1">
                              {item.title && (
                                <h5 className="font-bold text-slate-900 text-sm sm:text-base">
                                  {item.title}
                                </h5>
                              )}
                              <p className="text-slate-600 text-sm leading-relaxed">
                                {formatInlineMarkdown(item.description || '')}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  }

                  // 4. Lead Editorial Paragraph (First Paragraph Styling)
                  if (idx === 0) {
                    return (
                      <div
                        key={idx}
                        className="relative bg-gradient-to-br from-slate-50 via-white to-red-50/20 border-l-4 border-l-[#ED1C24] border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <span className="w-2 h-2 rounded-full bg-[#ED1C24]"></span>
                          <span className="text-[11px] font-black uppercase tracking-wider text-[#ED1C24]">
                            Industrial Benchmark & Context
                          </span>
                        </div>
                        <p className="text-slate-800 text-base sm:text-lg leading-relaxed font-normal">
                          {formatInlineMarkdown(block.text || '')}
                        </p>
                      </div>
                    )
                  }

                  // 5. Standard Content Paragraph
                  return (
                    <p key={idx} className="text-slate-700 text-base sm:text-[17px] leading-relaxed font-normal">
                      {formatInlineMarkdown(block.text || '')}
                    </p>
                  )
                })}
              </div>

              {/* In-Plant Engineering Consultation Card */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-black text-white p-6 sm:p-8 border border-slate-800 shadow-lg my-8">
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="space-y-2 max-w-xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#ED1C24] text-white">
                      <Wrench className="w-3 h-3" />
                      Engineering Advisory
                    </div>
                    <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      Need an In-Plant Audit for Your Facility?
                    </h4>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      Our certified application engineers conduct comprehensive on-site audits across air systems, automation, and fluid power to uncover inefficiencies and eliminate downtime.
                    </p>
                  </div>
                  <Link
                    to="/contact"
                    className="px-6 py-3.5 bg-[#ED1C24] hover:bg-[#D0171E] text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer whitespace-nowrap flex-shrink-0"
                  >
                    <span>Schedule In-Plant Audit</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Author Attribution & Technical Desk Card */}
              <div className="pt-8 border-t border-slate-100">
                <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ED1C24] to-[#B7151B] text-white font-black text-xl flex items-center justify-center shadow-sm flex-shrink-0">
                      {article.author.charAt(0)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-extrabold text-slate-900 text-base">{article.author}</h4>
                        <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          <ShieldCheck className="w-3 h-3" />
                          Verified Technical Desk
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 font-medium">
                        MVGL Kenya Industrial Engineering Division &bull; Regional Operations Desk
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <button
                      onClick={handleShare}
                      className="flex-1 md:flex-initial px-4 py-2.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs rounded-xl transition-all shadow-2xs flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-50"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-slate-500" />}
                      <span>{copied ? 'Link Copied!' : 'Share Perspective'}</span>
                    </button>
                    <Link
                      to="/contact"
                      className="flex-1 md:flex-initial px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                    >
                      <span>Ask Question</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Previous / Next Perspective Navigation */}
              {(prevArticle || nextArticle) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  {prevArticle ? (
                    <Link
                      to={`/insights/${prevArticle.slug}`}
                      className="group p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#ED1C24] hover:shadow-md transition-all text-left flex flex-col justify-between"
                    >
                      <div>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-[#ED1C24] transition-colors mb-1.5">
                          <ArrowLeft className="w-3.5 h-3.5" />
                          Previous Perspective
                        </span>
                        <h5 className="font-bold text-slate-900 text-sm group-hover:text-[#ED1C24] transition-colors line-clamp-2">
                          {prevArticle.title}
                        </h5>
                      </div>
                    </Link>
                  ) : <div />}

                  {nextArticle && (
                    <Link
                      to={`/insights/${nextArticle.slug}`}
                      className="group p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#ED1C24] hover:shadow-md transition-all text-right flex flex-col justify-between"
                    >
                      <div>
                        <span className="inline-flex items-center justify-end gap-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-[#ED1C24] transition-colors mb-1.5 w-full">
                          Next Perspective
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                        <h5 className="font-bold text-slate-900 text-sm group-hover:text-[#ED1C24] transition-colors line-clamp-2">
                          {nextArticle.title}
                        </h5>
                      </div>
                    </Link>
                  )}
                </div>
              )}

            </div>

          </article>

          {/* Right Column (Sidebar Quick Overview & Related Insights) */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Quick Overview Card */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5 text-left">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Article Overview
              </h3>

              <div className="space-y-4 text-sm">
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Category</div>
                  <div className="font-bold text-[#ED1C24] text-sm sm:text-base">{article.category}</div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Date Published</div>
                  <div className="font-semibold text-slate-800">{article.publishedDate}</div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Estimated Reading Time</div>
                  <div className="font-semibold text-slate-800">{article.readTime}</div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Published By</div>
                  <div className="font-semibold text-slate-800">{article.author}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  to="/contact"
                  className="w-full py-3 bg-[#ED1C24] hover:bg-[#D0171E] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-2 text-center"
                >
                  Discuss with Our Engineers
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Relevant Engineering Solutions */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4 text-left">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                Relevant Engineering Solutions
              </h3>

              <div className="space-y-2.5">
                {[
                  { name: 'Air & Gas Solutions', path: '/solutions/air-gas-solutions' },
                  { name: 'Industrial Automation', path: '/solutions/industrial-automation' },
                  { name: 'Refrigeration & HVAC', path: '/solutions/refrigeration-hvac-solutions' },
                  { name: 'Non-Metallic Solutions', path: '/solutions/non-metallic-solutions' },
                  { name: 'Fire Pump Solutions', path: '/solutions/fire-pump-solutions' }
                ].map((sol, idx) => (
                  <Link
                    key={idx}
                    to={sol.path}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-xs font-semibold text-slate-700 hover:text-[#ED1C24] group"
                  >
                    <span>{sol.name}</span>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#ED1C24] group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Other Insights */}
            {otherArticles.length > 0 && (
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5 text-left">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                  More Perspectives
                </h3>

                <div className="space-y-4">
                  {otherArticles.map((other) => (
                    <Link
                      key={other.id}
                      to={`/insights/${other.slug}`}
                      className="block p-3 rounded-2xl border border-slate-100 hover:border-[#ED1C24]/30 hover:bg-slate-50/60 transition-all group"
                    >
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#ED1C24]">
                        {other.category}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#ED1C24] transition-colors leading-snug mt-1">
                        {other.title}
                      </h4>
                      <span className="text-[11px] text-slate-400 font-medium block mt-1.5">
                        {other.publishedDate}
                      </span>
                    </Link>
                  ))}
                </div>

                <Link
                  to="/insights"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ED1C24] hover:underline pt-2"
                >
                  <span>View All Perspectives</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}

          </aside>

        </div>
      </section>

      {/* 3. Bottom Industrial CTA */}
      <IndustrialChallengeCTA />

    </div>
  )
}
