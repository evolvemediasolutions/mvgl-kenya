import { Link } from 'react-router-dom'
import { partnersData } from '../data/partners'
import { ArrowRight } from 'lucide-react'
import IndustrialChallengeCTA from '../components/ui/IndustrialChallengeCTA'

export default function Partners() {
  return (
    <div className="font-sans min-h-screen bg-white text-[#222222]">
      {/* Partners Hero */}
      <div className="pt-28 sm:pt-32 pb-6 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative w-full h-[450px] rounded-3xl overflow-hidden bg-[#222222] text-white flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80"
            alt="MVGL Kenya Technology Partners"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center space-y-4">
            <span className="eyebrow block">
              HOME / PARTNERS
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Global Technology Leaders. Regional Excellence.
            </h1>
            <p className="text-slate-200 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              We collaborate with world-class technology leaders to deliver cutting-edge engineering solutions customized for Kenya and East African industrial markets.
            </p>
          </div>
        </section>
      </div>

      {/* Partners List */}
      <section className="py-24 px-4 max-w-[1360px] mx-auto font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side (Sticky on desktop) */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-4 text-left">
            <span className="eyebrow block">
              OUR STRATEGIC OEM ALIGNMENT
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#222222] tracking-tight leading-tight">
              Integrated Solutions Engineered by World Leaders
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We work side-by-side with global technology leaders to deliver tailored industrial equipment and engineering integration that meet the highest operational standards.
            </p>
          </div>

          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Right Side (Scrolling card stack) */}
          <div className="lg:col-span-7 relative border-l-2 border-slate-200 pl-8 space-y-16 py-4">
            {partnersData.map((partner) => {
              const localLogo = (() => {
                switch (partner.slug) {
                  case 'rockwell-automation':
                    return '/PARTNERS LOGO/ROCKWELL AUTOMATION.png'
                  case 'epp-composites':
                    return '/PARTNERS LOGO/EPP.jpg'
                  case 'spp-pumps':
                    return '/PARTNERS LOGO/SPP.jpg'
                  case 'kirloskar-pneumatic':
                    return '/PARTNERS LOGO/KIRLOSKAR PNEUMATIC.jpg'
                  case 'kirloskar-chillers':
                    return '/PARTNERS LOGO/KCPL.jpg'
                  case 'hms-networks':
                    return '/LOGO/HMS_logo.png'
                  case 'prosoft-technology':
                    return '/PARTNERS LOGO/PROSOFT TECHNOLOGIES.png'
                  default:
                    return partner.logo
                }
              })()

              return (
                <div key={partner.id} className="relative group">
                  
                  {/* Timeline node */}
                  <div className="absolute -left-[41px] top-6 h-4 w-4 rounded-full bg-[#222222] border-2 border-white group-hover:bg-[#ED1C24] transition-colors duration-300 z-10"></div>
                  
                  {/* Partner Card */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-[#ED1C24] transition-all space-y-6 text-left">
                    <div className="space-y-2">
                      <span className="eyebrow block">
                        PRINCIPAL OEM
                      </span>
                      <h3 className="text-2xl font-black text-[#222222] tracking-tight">
                        {partner.name}
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-sm">
                        {partner.description.en}
                      </p>
                    </div>

                    <div className="border-t border-slate-100 pt-6">
                      <div className="h-44 bg-[#F5F5F5] rounded-2xl flex items-center justify-center p-6 border border-slate-200/80 relative overflow-hidden group">
                        <img 
                          src={localLogo} 
                          alt={partner.name} 
                          className="max-h-24 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 relative z-10" 
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <Link
                        to={`/partners/${partner.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#ED1C24] hover:bg-[#D0171E] text-white font-bold rounded-lg transition-colors text-xs uppercase tracking-wider shadow-sm"
                      >
                        Explore Partner Portfolio
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* Reusable Challenge CTA */}
      <IndustrialChallengeCTA bgImage="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80" />

    </div>
  )
}
