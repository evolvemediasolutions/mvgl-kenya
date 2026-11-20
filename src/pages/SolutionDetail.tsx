import { useState, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Building2, Package, ChevronRight } from 'lucide-react'
import { solutionsData } from '../data/solutions'
import { partnersData } from '../data/partners'
import { fetchProductsFromWordPress, getInitialWordPressProducts, type Product } from '../data/products'
import IndustrialChallengeCTA from '../components/ui/IndustrialChallengeCTA'
import ProductModal from '../components/ui/ProductModal'

export default function SolutionDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [products, setProducts] = useState<Product[]>(getInitialWordPressProducts)

  // Find solution matching slug or alias
  const solution = solutionsData.find(
    s => s.slug.toLowerCase() === (slug || '').toLowerCase() || s.id.toLowerCase() === (slug || '').toLowerCase()
  )

  useEffect(() => {
    fetchProductsFromWordPress().then(res => {
      if (res && res.length > 0) {
        setProducts(res)
      }
    })
  }, [])

  if (!solution) {
    // If not found in solutionsData, fallback to main solutions page
    return <Navigate to="/solutions" replace />
  }

  // Get associated partners
  const associatedPartners = partnersData.filter(p =>
    solution.partners.includes(p.id) || solution.partners.includes(p.slug)
  )

  // Filter products relevant to this solution or its partners
  const relevantProducts = products.filter(p => {
    const pSol = (p.solution || '').toLowerCase()
    const pPart = (p.partnerSlug || '').toLowerCase()
    const solTitle = solution.title.en.toLowerCase()
    const solSlug = solution.slug.toLowerCase()
    
    return (
      pSol.includes(solSlug) ||
      solSlug.includes(pSol) ||
      pSol.includes(solTitle) ||
      solTitle.includes(pSol) ||
      solution.partners.some(partId => pPart.includes(partId) || partId.includes(pPart))
    )
  })

  return (
    <div className="font-sans min-h-screen bg-white text-[#222222]">
      {/* 1. Hero Banner */}
      <div className="pt-28 sm:pt-32 pb-6 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative w-full h-[420px] rounded-3xl overflow-hidden bg-[#222222] text-white flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img
            src={solution.image}
            alt={solution.title.en}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center space-y-4">
            <span className="eyebrow block">
              HOME / SOLUTIONS / {solution.category.toUpperCase()}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {solution.title.en}
            </h1>
            <p className="text-slate-200 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              {solution.description.en}
            </p>
          </div>
        </section>
      </div>

      {/* 2. Key Capabilities & Features */}
      <section className="py-16 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 sm:p-12">
          <div className="max-w-3xl mb-10 text-left">
            <span className="eyebrow block mb-2">
              ENGINEERING EXCELLENCE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#222222]">
              Key Engineering Capabilities
            </h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed">
              Our {solution.title.en} solutions are deployed in compliance with stringent international engineering standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solution.features.en.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-red-300 transition-colors text-left"
              >
                <div className="p-2 bg-red-50 text-[#ED1C24] rounded-xl flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{feat}</h3>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-relaxed">
                    Designed for heavy-duty industrial uptime, energy optimization, and continuous process integrity.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Strategic OEM Technology Partner */}
      {associatedPartners.length > 0 && (
        <section className="py-12 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-slate-200 rounded-3xl p-8 sm:p-10 bg-white shadow-sm text-left">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <span className="eyebrow block">
                  STRATEGIC PRINCIPAL OEM
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  Powered by {associatedPartners.map(p => p.name).join(' & ')}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {associatedPartners[0]?.longDescription?.en || associatedPartners[0]?.description?.en}
                </p>
              </div>

              <div className="flex flex-col items-center gap-4 flex-shrink-0">
                <Link
                  to={`/partners/${associatedPartners[0]?.slug}`}
                  className="px-6 py-3 bg-[#ED1C24] hover:bg-[#D0171E] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors inline-flex items-center gap-2 shadow-md"
                >
                  <Building2 className="h-4 w-4" />
                  Explore Partner Profile
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Products Catalog from WordPress CMS */}
      <section className="py-16 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="eyebrow block mb-2">
              LIVE CMS PRODUCT CATALOG
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#222222]">
              Featured {solution.title.en} Equipment
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Real-time product inventory managed through WordPress WPGraphQL.
            </p>
          </div>

          <Link
            to="/partners"
            className="text-[#ED1C24] hover:text-[#D0171E] font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5"
          >
            All OEM Partners
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {relevantProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relevantProducts.map(prod => (
              <div
                key={prod.id}
                onClick={() => setSelectedProduct(prod)}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
              >
                <div className="h-56 bg-slate-100 relative overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    onError={e => {
                      e.currentTarget.onerror = null
                      e.currentTarget.src = '/NEW LOGO/logo2.png'
                      e.currentTarget.classList.add('opacity-40', 'p-6')
                    }}
                  />
                  {prod.tag && (
                    <span className="absolute top-3 left-3 bg-[#0f172a] text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                      {prod.tag}
                    </span>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-grow text-left">
                  <span className="text-xs font-semibold text-[#ED1C24] uppercase tracking-wider mb-1">
                    {prod.partner}
                  </span>
                  <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-[#ED1C24] transition-colors line-clamp-2">
                    {prod.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 mb-4 leading-relaxed flex-grow">
                    {prod.shortDescription}
                  </p>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900">
                    <span className="inline-flex items-center gap-1 text-[#ED1C24] group-hover:translate-x-1 transition-transform">
                      View Specs & Details <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                    {prod.brochure && (
                      <span className="text-slate-400 font-normal">Brochure Available</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
            <Package className="h-10 w-10 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-600 text-sm">Products for this solution can be published directly from your WordPress CMS.</p>
          </div>
        )}
      </section>

      {/* 5. Industrial Challenge CTA */}
      <IndustrialChallengeCTA bgImage={solution.image} />

      {/* 6. Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  )
}
