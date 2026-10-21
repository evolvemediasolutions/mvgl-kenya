import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { parseProductSpecs, type Product } from '../../data/products'

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen || !product) return null

  // Extract specifications list
  const rawSpecs = product.specs || product.shortDescription || ''
  const specItems = parseProductSpecs(rawSpecs)

  // Explore URL: robust normalization for external links (with or without https://) or internal paths
  const rawUrl = (product.exploreUrl || product.brochure || '').trim()
  let exploreTargetUrl = `/contact?subject=Explore:+${encodeURIComponent(product.title)}`
  let isExternalExplore = false

  if (rawUrl) {
    if (/^(https?:\/\/|mailto:|tel:)/i.test(rawUrl)) {
      exploreTargetUrl = rawUrl
      isExternalExplore = true
    } else if (rawUrl.startsWith('/') || rawUrl.startsWith('#')) {
      exploreTargetUrl = rawUrl
      isExternalExplore = false
    } else if (rawUrl.includes('.')) {
      // e.g. "www.rockwellautomation.com" or "rockwellautomation.com/..."
      exploreTargetUrl = `https://${rawUrl}`
      isExternalExplore = true
    } else {
      exploreTargetUrl = `/${rawUrl}`
      isExternalExplore = false
    }
  }

  const modalContent = (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden text-left border border-slate-100 animate-scale-in relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. Header Section */}
        <div className="p-6 sm:p-8 pb-5 flex items-start justify-between gap-4 border-b border-slate-100">
          <div className="space-y-1 pr-4">
            <span className="text-xs font-black uppercase tracking-wider text-[#ED1C24] block">
              {product.tag || product.partner}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
              {product.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer flex-shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. Specifications Body */}
        <div className="px-6 sm:px-8 py-5 max-h-[60vh] overflow-y-auto">
          <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 pb-3 border-b border-slate-100">
            SPECIFICATIONS
          </div>

          <div className="divide-y divide-slate-100">
            {specItems.length > 0 ? (
              specItems.map((spec, idx) => (
                <div 
                  key={idx}
                  className="py-3.5 text-sm sm:text-base font-medium text-slate-800 leading-snug"
                >
                  {spec}
                </div>
              ))
            ) : (
              <div className="py-4 text-sm text-slate-500 italic">
                {product.shortDescription || 'Standard certified OEM specifications apply.'}
              </div>
            )}
          </div>
        </div>

        {/* 3. Footer Action Buttons */}
        <div className="p-6 sm:p-8 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-4 sm:gap-6 bg-slate-50/50">
          {isExternalExplore ? (
            <a
              href={exploreTargetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#ED1C24] hover:bg-[#D0171E] text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Product</span>
              <span>&rarr;</span>
            </a>
          ) : (
            <Link
              to={exploreTargetUrl}
              onClick={onClose}
              className="px-6 py-3 bg-[#ED1C24] hover:bg-[#D0171E] text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Product</span>
              <span>&rarr;</span>
            </Link>
          )}

          <Link
            to={`/contact?subject=Inquiry:+${encodeURIComponent(product.title + ' (' + (product.tag || product.partner) + ')')}`}
            onClick={onClose}
            className="text-sm font-semibold text-[#ED1C24] hover:text-[#D0171E] hover:underline flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Inquire about this product</span>
            <span>&rarr;</span>
          </Link>
        </div>

      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
