import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface IndustrialChallengeCTAProps {
  bgImage?: string
}

export default function IndustrialChallengeCTA({ bgImage }: IndustrialChallengeCTAProps) {
  const defaultBg = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
  const background = bgImage || defaultBg

  return (
    <section className="relative bg-[#222222] text-white py-24 px-4 overflow-hidden border-t border-slate-800 w-full">
      <div className="absolute inset-0 bg-black/75 z-10"></div>
      <img
        src={background}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="max-w-4xl mx-auto text-center relative z-20 space-y-6">
        <span className="eyebrow block">
          PARTNER WITH MVGL KENYA
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Have an Industrial Challenge?
        </h2>
        <p className="text-slate-300 leading-relaxed max-w-2xl mx-auto text-sm sm:text-base">
          From selecting the right equipment to engineering support and on-site implementation, our engineering team in Kenya is ready to help you optimize your operations.
        </p>
        <div className="pt-4">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#ED1C24] hover:bg-[#D0171E] text-white font-bold rounded-lg shadow-lg hover:shadow-red-500/25 transition-all uppercase tracking-wider text-xs sm:text-sm cursor-pointer"
          >
            Talk to Our Experts
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
