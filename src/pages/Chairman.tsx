import IndustrialChallengeCTA from '../components/ui/IndustrialChallengeCTA'

export default function Chairman() {
  const message = [
    "At MVGL Kenya, we pursue our business objectives with integrity and commitment of the highest order, and we recognize that our success is built on our people and enduring client partnerships.",
    "As a growing regional organization, our focus remains firmly market-oriented, with customer satisfaction, operational reliability, and engineering precision at the centre of everything we do.",
    "Our inclusive work culture encourages expertise and a passion for service—qualities that allow us to deliver meaningful competitive advantages to our industrial customers across Kenya and East Africa.",
    "With strong global technology partnerships and an agile, multidisciplinary engineering team, MVGL Kenya is positioned to continue expanding capabilities and driving sustainable regional growth."
  ]

  return (
    <div className="font-sans min-h-screen bg-slate-50 text-[#222222]">
      {/* Hero Section */}
      <div className="pt-28 sm:pt-32 pb-6 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative w-full h-[450px] rounded-3xl overflow-hidden bg-[#222222] text-white flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=1200&q=80"
            alt="Chairman Message MVGL Kenya"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center space-y-4">
            <span className="eyebrow block">
              HOME / ABOUT US / CHAIRMAN MESSAGE
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Engineering Expertise & Serving with Passion
            </h1>
          </div>
        </section>
      </div>

      {/* Message Content Section */}
      <section className="py-24 px-4 max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Chairman Image Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-md">
              <div className="absolute inset-0 bg-[#ED1C24] rounded-3xl transform translate-x-4 translate-y-4 -z-10 opacity-15 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
              <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-100 bg-white">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"
                  alt="Chairman of the Board"
                  className="w-full h-[450px] object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div className="p-6 bg-[#222222] text-white text-left">
                  <h3 className="text-xl font-bold">
                    Chairman of the Board
                  </h3>
                  <p className="text-sm text-[#ED1C24] font-semibold mt-1">
                    Multivista Global / MVGL Kenya
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Letter/Message on the Right */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-2">
              <span className="eyebrow block">
                CHAIRMAN'S MESSAGE
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] tracking-tight leading-tight">
                Commitment to Sustainable Industrial Development
              </h2>
            </div>
            
            <div className="relative pl-6 border-l-4 border-[#ED1C24]">
              <span className="absolute left-0 top-0 text-7xl text-[#ED1C24]/20 font-serif leading-none select-none">“</span>
              <div className="space-y-6 pt-4 text-slate-700 leading-relaxed text-base sm:text-lg">
                {message.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      <IndustrialChallengeCTA bgImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" />

    </div>
  )
}
