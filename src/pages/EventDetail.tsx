import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, MapPin, ArrowLeft, Share2, CheckCircle2, Building, ExternalLink } from 'lucide-react'
import IndustrialChallengeCTA from '../components/ui/IndustrialChallengeCTA'
import { fetchFromStrapi, getStrapiMediaUrl, getCachedStrapiData, setCachedStrapiData } from '../services/strapi'
import { eventsData } from '../data/events'

interface EventDetailData {
  id: string
  slug: string
  title: string
  eventType: string
  eventStatus: string
  dateDisplay: string
  startDate?: string
  endDate?: string
  location: string
  boothNumber?: string
  description: string
  image: string
  registrationUrl?: string
}

export default function EventDetail() {
  const { slug } = useParams<{ slug: string }>()
  const targetSlug = (slug || '').toLowerCase()
  const cachedEvents = getCachedStrapiData<EventDetailData>('events_mapped') || []
  const initialFound: EventDetailData | null = 
    cachedEvents.find(e => e.slug.toLowerCase() === targetSlug || e.id.toLowerCase() === targetSlug) ||
    (() => {
      const local = eventsData.find(e => e.id.toLowerCase() === targetSlug)
      if (local) {
        return {
          id: local.id,
          slug: local.id,
          title: local.title.en,
          eventType: 'Industrial Expo',
          eventStatus: 'UPCOMING',
          dateDisplay: local.date.en,
          location: local.location.en,
          boothNumber: 'Stand B12',
          description: local.description.en,
          image: local.image
        }
      }
      return null
    })()

  const [event, setEvent] = useState<EventDetailData | null>(initialFound)
  const [loading, setLoading] = useState(!initialFound)
  const [otherEvents, setOtherEvents] = useState<EventDetailData[]>(() => {
    return cachedEvents.filter(e => e.slug !== slug).slice(0, 3)
  })
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    async function loadEvent() {
      setLoading(true)
      try {
        // 1. Try to fetch from Strapi
        const strapiEvents = await fetchFromStrapi<any>('events')
        
        let foundEvent: EventDetailData | null = null
        const mappedEvents: EventDetailData[] = (strapiEvents || []).map((e: any) => ({
          id: String(e.documentId || e.id),
          slug: e.slug || `event-${e.id}`,
          title: e.title || 'Untitled Event',
          eventType: e.eventType || 'Industrial Expo',
          eventStatus: (e.eventStatus || 'Upcoming').toUpperCase(),
          dateDisplay: e.dateDisplay || e.startDate || 'Upcoming',
          startDate: e.startDate,
          endDate: e.endDate,
          location: e.location || 'Nairobi, Kenya',
          boothNumber: e.boothNumber || 'MVGL Stand',
          description: e.description || '',
          image: e.coverImage?.url
            ? getStrapiMediaUrl(e.coverImage.url)
            : 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
          registrationUrl: e.registrationUrl
        }))

        if (mappedEvents.length > 0) {
          setCachedStrapiData('events_mapped', mappedEvents)
        }

        // Match by slug, ID, or normalized title slug
        const targetSlug = (slug || '').toLowerCase()
        foundEvent = mappedEvents.find(e => 
          e.slug.toLowerCase() === targetSlug || 
          e.id.toLowerCase() === targetSlug ||
          e.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') === targetSlug
        ) || null

        // If not found in Strapi, check fallback local data
        if (!foundEvent) {
          const local = eventsData.find(e => e.id === slug)
          if (local) {
            foundEvent = {
              id: local.id,
              slug: local.id,
              title: local.title.en,
              eventType: 'Industrial Expo',
              eventStatus: 'UPCOMING',
              dateDisplay: local.date.en,
              location: local.location.en,
              boothNumber: 'Stand B12',
              description: local.description.en,
              image: local.image
            }
          }
        }

        setEvent(foundEvent)
        setOtherEvents(mappedEvents.filter(e => e.slug !== slug).slice(0, 3))
      } catch (err) {
        console.warn('Error fetching event details', err)
      } finally {
        setLoading(false)
      }
    }

    loadEvent()
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#ED1C24] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-600 font-semibold text-sm">Loading event details...</p>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans p-6 text-center">
        <div className="max-w-md space-y-4">
          <h1 className="text-4xl font-extrabold text-slate-900">Event Not Found</h1>
          <p className="text-slate-600 text-sm">
            The event you are looking for does not exist or has been relocated.
          </p>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#ED1C24] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm hover:bg-[#D0171E] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Events
          </Link>
        </div>
      </div>
    )
  }

  const isPast = event.eventStatus.includes('PAST') || event.eventStatus.includes('COMPLETED')

  return (
    <div className="font-sans min-h-screen bg-[#F8FAFC] text-[#222222]">
      
      {/* 1. Hero Section */}
      <div className="pt-28 sm:pt-32 pb-6 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative w-full min-h-[420px] rounded-3xl overflow-hidden bg-slate-950 text-white flex items-center shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/60 z-10"></div>
          <img
            src={event.image}
            alt={event.title}
            onError={(e) => {
              e.currentTarget.onerror = null
              e.currentTarget.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80'
            }}
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="max-w-5xl mx-auto px-6 sm:px-12 py-16 relative z-20 space-y-6 text-left w-full">
            
            {/* Breadcrumb & Navigation */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link
                to="/events"
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white uppercase tracking-wider transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Events</span>
              </Link>

              <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider backdrop-blur-md ${
                isPast 
                  ? 'bg-slate-800/80 text-slate-200 border border-slate-700'
                  : 'bg-[#ED1C24] text-white shadow-md'
              }`}>
                {event.eventStatus}
              </span>
            </div>

            {/* Eyebrow */}
            <span className="eyebrow block">
              {event.eventType}
            </span>

            {/* Event Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white max-w-4xl">
              {event.title}
            </h1>

            {/* Key Meta row */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-200 pt-2 border-t border-white/10">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#ED1C24]" />
                <span className="font-semibold">{event.dateDisplay}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#ED1C24]" />
                <span className="font-semibold">{event.location}</span>
              </div>
              {event.boothNumber && (
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-[#ED1C24]" />
                  <span className="font-semibold">{event.boothNumber}</span>
                </div>
              )}
            </div>

          </div>
        </section>
      </div>

      {/* 2. Main Content & Sidebar Grid */}
      <section className="py-12 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Full Event Information */}
          <div className="lg:col-span-8 space-y-10 text-left">
            
            {/* Overview Card */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-xs space-y-6">
              <span className="eyebrow block">EVENT OVERVIEW</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                About this Event
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base font-normal">
                <p>{event.description}</p>
                <p>
                  MVGL Kenya (Multivista Global) brings together technical specialists, operations managers, and OEM representatives to demonstrate state-of-the-art industrial technology designed to maximize equipment efficiency, reduce plant lifecycle downtime, and accelerate sustainable growth across East Africa.
                </p>
              </div>

              {/* Event Features */}
              <div className="pt-6 border-t border-slate-100 space-y-3">
                <h3 className="text-base font-bold text-slate-900">What to Expect:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {[
                    'Live equipment demonstrations & smart drives',
                    'Direct consultations with technical application engineers',
                    'Energy audits and lifecycle optimization strategies',
                    'OEM certified replacement parts & service showcases',
                    'Networking with regional engineering leaders'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-[#ED1C24] flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Featured Technologies Card */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-xs space-y-6">
              <span className="eyebrow block">SOLUTIONS ON DISPLAY</span>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Featured Industrial Technologies
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Explore hands-on demonstrations and technical specifications from our world-class OEM technology partners:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  { title: 'Automation & Intelligent Control', desc: 'Rockwell Automation Allen-Bradley PLCs, variable speed drives, and HMS Networks gateways.', link: '/solutions/automation-control' },
                  { title: 'Compressed Air & Gas Solutions', desc: 'Kirloskar reciprocating and screw air packages delivering oil-free precision.', link: '/solutions/air-gas-solutions' },
                  { title: 'Industrial Chillers & Cold Chain', desc: 'High-efficiency screw and centrifugal process water chillers.', link: '/solutions/refrigeration-hvac-solutions' },
                  { title: 'Non-Metallic Composite Piping', desc: 'EPP Composites GRP/GRE chemical storage and corrosion-free piping.', link: '/solutions/non-metallic-solutions' }
                ].map((tech, idx) => (
                  <div key={idx} className="p-5 bg-slate-50 border border-slate-200/70 rounded-2xl space-y-2 hover:border-[#ED1C24]/50 transition-colors">
                    <h4 className="font-bold text-slate-900 text-sm">{tech.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{tech.desc}</p>
                    <Link to={tech.link} className="inline-flex items-center gap-1 text-xs font-bold text-[#ED1C24] hover:underline pt-1">
                      <span>Explore Solution</span>
                      <ArrowLeft className="h-3 w-3 rotate-180" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Quick Facts & CTA */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
            
            {/* Quick Facts Card */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-md space-y-6 text-left">
              <h3 className="text-lg font-black text-slate-900 tracking-tight pb-4 border-b border-slate-100 flex items-center justify-between">
                <span>Event Information</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                  isPast ? 'bg-slate-100 text-slate-600' : 'bg-emerald-50 text-emerald-700'
                }`}>
                  {event.eventStatus}
                </span>
              </h3>

              <div className="space-y-5 text-sm">
                
                {/* Date */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-red-50 text-[#ED1C24] rounded-xl flex-shrink-0">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Date &amp; Schedule</span>
                    <span className="font-bold text-slate-800 text-sm">{event.dateDisplay}</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-red-50 text-[#ED1C24] rounded-xl flex-shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Venue</span>
                    <span className="font-bold text-slate-800 text-sm leading-snug">{event.location}</span>
                  </div>
                </div>

                {/* Booth */}
                {event.boothNumber && (
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl flex-shrink-0">
                      <Building className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">MVGL Booth / Stand</span>
                      <span className="font-bold text-slate-800 text-sm">{event.boothNumber}</span>
                    </div>
                  </div>
                )}

              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                {event.registrationUrl ? (
                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 bg-[#ED1C24] hover:bg-[#D0171E] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Register to Attend</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ) : (
                  <Link
                    to="/contact"
                    className="w-full py-3.5 bg-[#ED1C24] hover:bg-[#D0171E] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request Booth Meeting</span>
                    <ArrowLeft className="h-4 w-4 rotate-180" />
                  </Link>
                )}

                <button
                  onClick={handleShare}
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Share2 className="h-4 w-4 text-slate-500" />
                  <span>{copied ? 'Link Copied!' : 'Share Event'}</span>
                </button>
              </div>

            </div>

            {/* Need Help Box */}
            <div className="bg-[#222222] text-white rounded-3xl p-6 text-left space-y-3 shadow-md">
              <span className="eyebrow block">QUESTIONS?</span>
              <h4 className="font-extrabold text-base">Plan Your Visit with MVGL</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect directly with our engineering team to pre-book a dedicated technical session or product demo at this event.
              </p>
              <Link
                to="/contact"
                className="inline-block pt-1 text-xs font-bold text-[#ED1C24] hover:underline"
              >
                Contact Event Coordinators &rarr;
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Other Events & Expos Section */}
      {otherEvents.length > 0 && (
        <section className="py-16 bg-white border-t border-slate-200/80 text-left">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-2">
              <span className="eyebrow block">EXPLORE MORE</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Other Upcoming Events &amp; Expos
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherEvents.map((oe) => (
                <Link
                  key={oe.id}
                  to={`/events/${oe.slug}`}
                  className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl overflow-hidden hover:shadow-md hover:border-[#ED1C24] transition-all flex flex-col justify-between group"
                >
                  <div className="h-44 overflow-hidden relative">
                    <img 
                      src={oe.image} 
                      alt={oe.title} 
                      onError={(e) => {
                        e.currentTarget.onerror = null
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                      {oe.eventStatus}
                    </span>
                  </div>
                  <div className="p-5 space-y-2 flex-grow flex flex-col justify-between">
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-500 uppercase">{oe.dateDisplay}</span>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-[#ED1C24] transition-colors line-clamp-2">
                        {oe.title}
                      </h4>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#ED1C24] pt-2">
                      View Event &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Bottom CTA */}
      <IndustrialChallengeCTA bgImage={event.image} />

    </div>
  )
}
