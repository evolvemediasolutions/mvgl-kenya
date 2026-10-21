import { eventsData } from '../data/events'
import { Calendar, MapPin } from 'lucide-react'
import IndustrialChallengeCTA from '../components/ui/IndustrialChallengeCTA'

export default function Events() {
  return (
    <div className="font-sans min-h-screen bg-white text-[#222222]">
      {/* Events Hero */}
      <div className="pt-28 sm:pt-32 pb-6 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative w-full h-[450px] rounded-3xl overflow-hidden bg-[#222222] text-white flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80"
            alt="MVGL Kenya Events & Expos"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center space-y-4">
            <span className="eyebrow block">
              HOME / EVENTS &amp; EXPOS
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Connect. Collaborate. Innovate.
            </h1>
            <p className="text-slate-200 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Building lasting industrial partnerships and sharing technical know-how through active participation in regional engineering conferences and exhibitions across Kenya and East Africa.
            </p>
          </div>
        </section>
      </div>

      {/* Events List */}
      <section className="py-20 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8">
          {eventsData.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md hover:border-[#ED1C24] transition-all duration-300 flex flex-col lg:flex-row text-left"
            >
              <div className="lg:w-1/3 h-64 lg:h-auto overflow-hidden relative">
                <img src={ev.image} alt={ev.title.en} className="w-full h-full object-cover" />
              </div>
              <div className="p-8 lg:w-2/3 space-y-4 flex flex-col justify-center">
                <h3 className="text-2xl font-black text-[#222222]">{ev.title.en}</h3>
                <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-600">
                  <div className="flex items-center gap-1.5 bg-[#F5F5F5] px-3.5 py-2 rounded-lg border border-slate-200/60">
                    <Calendar className="h-4 w-4 text-[#ED1C24]" />
                    <span>{ev.date.en}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#F5F5F5] px-3.5 py-2 rounded-lg border border-slate-200/60">
                    <MapPin className="h-4 w-4 text-[#ED1C24]" />
                    <span>{ev.location.en}</span>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{ev.description.en}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <IndustrialChallengeCTA bgImage="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80" />

    </div>
  )
}
