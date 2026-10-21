import { Link } from 'react-router-dom'
import { solutionsData } from '../data/solutions'
import { ArrowRight } from 'lucide-react'
import IndustrialChallengeCTA from '../components/ui/IndustrialChallengeCTA'

export default function Solutions() {
  return (
    <div className="font-sans min-h-screen bg-white text-[#222222]">
      {/* Solutions Hero */}
      <div className="pt-28 sm:pt-32 pb-6 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative w-full h-[450px] rounded-3xl overflow-hidden bg-[#222222] text-white flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
            alt="MVGL Kenya Industrial Solutions"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center space-y-4">
            <span className="eyebrow block">
              HOME / INDUSTRIAL SOLUTIONS
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Engineering Solutions That Deliver Results
            </h1>
            <p className="text-slate-200 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              A comprehensive suite of engineering and industrial solutions designed to meet the demands of critical applications across Kenya and East African markets.
            </p>
          </div>
        </section>
      </div>

      {/* Solutions Showcase List */}
      <section className="py-20 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {solutionsData.map((sol, idx) => {
          const isEven = idx % 2 === 0
          return (
            <div
              key={sol.id}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                isEven ? '' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Text Area */}
              <div className="lg:w-1/2 space-y-6 text-left">
                <span className="eyebrow block">
                  {sol.category.toUpperCase()}
                </span>
                <h2 className="text-3xl font-black text-[#222222] tracking-tight">{sol.title.en}</h2>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{sol.description.en}</p>
                
                {/* Bullet lists */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700 text-left">
                  {sol.features.en.map((feat, fidx) => (
                    <li key={fidx} className="flex items-start gap-2">
                      <span className="text-[#ED1C24] font-bold mt-0.5">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 text-left">
                  <Link
                    to={`/solutions/${sol.slug}`}
                    className="inline-flex items-center gap-2 px-7 py-3 bg-[#ED1C24] hover:bg-[#D0171E] text-white font-bold rounded-lg transition-colors shadow-md hover:shadow-red-500/20 text-xs uppercase tracking-wider"
                  >
                    Explore Solution
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Image Area */}
              <div className="lg:w-1/2 w-full">
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-md border border-slate-200">
                  <img
                    src={sol.image}
                    alt={sol.title.en}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          )
        })}
      </section>

      {/* Reusable Challenge CTA */}
      <IndustrialChallengeCTA bgImage="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80" />

    </div>
  )
}
