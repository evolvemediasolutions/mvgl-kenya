import { industriesData } from '../data/industries'
import IndustrialChallengeCTA from '../components/ui/IndustrialChallengeCTA'

export default function Industries() {
  return (
    <div className="font-sans min-h-screen bg-white text-[#222222]">
      {/* Industries Hero */}
      <div className="pt-28 sm:pt-32 pb-6 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative w-full h-[450px] rounded-3xl overflow-hidden bg-[#222222] text-white flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80"
            alt="Industries Served by MVGL Kenya"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ED1C24] bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20">
              HOME / INDUSTRIES
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Engineering Expertise Across Industry
            </h1>
            <p className="text-slate-200 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Empowering core industrial, manufacturing, and infrastructure sectors across Kenya and East Africa with highly reliable, standard-compliant engineering packages and responsive local service.
            </p>
          </div>
        </section>
      </div>

      {/* Industries List */}
      <section className="py-20 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industriesData.map((ind) => (
            <div
              key={ind.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md hover:border-[#ED1C24] transition-all duration-300 flex flex-col h-full text-left"
            >
              <div className="h-56 overflow-hidden relative">
                <img
                  src={ind.image}
                  alt={ind.name.en}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow space-y-3">
                <h3 className="text-xl font-bold text-[#222222]">{ind.name.en}</h3>
                <p className="text-sm text-slate-600 leading-relaxed flex-grow">
                  {ind.description.en}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reusable Challenge CTA */}
      <IndustrialChallengeCTA bgImage="https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=1200&q=80" />

    </div>
  )
}
