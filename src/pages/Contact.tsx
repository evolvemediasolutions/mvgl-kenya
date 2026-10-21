import { useState, type FormEvent } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'

interface FormData {
  name: string
  company: string
  email: string
  phone: string
  interest: string
  message: string
}

interface FormErrors {
  name?: string
  company?: string
  email?: string
  interest?: string
  message?: string
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const interestOptions = [
    { value: 'air-gas-solutions', label: 'Air & Gas Solutions' },
    { value: 'refrigeration-hvac-solutions', label: 'Refrigeration & HVAC Solutions' },
    { value: 'automation-control', label: 'Automation & Control Solutions' },
    { value: 'non-metallic-solutions', label: 'Non Metallic Solution' },
    { value: 'fire-pump-solutions', label: 'Fire Pump Solutions' }
  ]

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'This field is required.'
    if (!formData.company.trim()) newErrors.company = 'This field is required.'
    
    if (!formData.email.trim()) {
      newErrors.email = 'This field is required.'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.'
    }
    
    if (!formData.interest) newErrors.interest = 'This field is required.'
    if (!formData.message.trim()) newErrors.message = 'This field is required.'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitStatus('submitting')

    // Simulate API Submission
    setTimeout(() => {
      setSubmitStatus('success')
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        interest: '',
        message: ''
      })
    }, 1200)
  }

  return (
    <div className="font-sans min-h-screen bg-slate-50 text-[#222222]">
      
      {/* Contact Header */}
      <div className="pt-28 sm:pt-32 pb-6 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative w-full h-[450px] rounded-3xl overflow-hidden bg-[#222222] text-white flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1517840901100-8179e982acb7?auto=format&fit=crop&w=1200&q=80"
            alt="MVGL Kenya Contact"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center space-y-4">
            <span className="eyebrow block">
              HOME / CONTACT US
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              How Can We Help Your Business?
            </h1>
            <p className="text-slate-200 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Whether you are evaluating a new industrial system, upgrading an existing facility or looking for a specific engineering technology in Kenya, connect with our team.
            </p>
          </div>
        </section>
      </div>

      {/* Main Grid: Form + Address Info */}
      <section className="py-20 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Address and details */}
          <div className="lg:col-span-1 space-y-8 bg-white border border-slate-100 p-8 rounded-2xl shadow-sm">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-[#222222]">MVGL Kenya</h3>
              <span className="eyebrow block">
                KENYA HEAD OFFICE &bull; NAIROBI
              </span>
            </div>

            <div className="space-y-6 text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#ED1C24] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[#222222]">Office Address</p>
                  <p className="mt-1 leading-relaxed">
                    Multivista Global (Kenya)<br />
                    Commercial Business District,<br />
                    Nairobi, Kenya<br />
                    <span className="text-xs text-slate-400 italic">(Official building/office details to be confirmed)</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-[#ED1C24] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[#222222]">Email</p>
                  <a href="mailto:info@mvgl-kenya.com" className="text-[#ED1C24] hover:underline block mt-1 font-medium">
                    info@mvgl-kenya.com
                  </a>
                  <span className="text-xs text-slate-400 italic">(Inquiries routed directly to regional technical desk)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-[#ED1C24] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[#222222]">Phone</p>
                  <p className="text-slate-800 font-medium block mt-1">
                    +254 (0) 20 [To be confirmed]
                  </p>
                  <span className="text-xs text-slate-400 italic">Please use the enquiry form below for verified direct response</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white border border-slate-100 p-8 rounded-2xl shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="eyebrow block">ENQUIRY FORM</span>
              <h3 className="text-2xl font-bold text-[#222222]">
                Send Us a Message
              </h3>
            </div>

            {submitStatus === 'success' ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold">
                Thank you. Your enquiry has been submitted successfully to MVGL Kenya. Our team will contact you shortly.
              </div>
            ) : submitStatus === 'error' ? (
              <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-sm font-semibold">
                Something went wrong. Please try again.
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-5 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="font-semibold text-slate-700">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-lg border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ED1C24]/20 ${
                      errors.name ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 focus:border-[#ED1C24]'
                    }`}
                  />
                  {errors.name && <p className="text-rose-500 text-xs font-semibold">{errors.name}</p>}
                </div>

                {/* Company name */}
                <div className="space-y-1.5">
                  <label htmlFor="company" className="font-semibold text-slate-700">
                    Company Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-lg border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ED1C24]/20 ${
                      errors.company ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 focus:border-[#ED1C24]'
                    }`}
                  />
                  {errors.company && <p className="text-rose-500 text-xs font-semibold">{errors.company}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="font-semibold text-slate-700">
                    Work Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-lg border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ED1C24]/20 ${
                      errors.email ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 focus:border-[#ED1C24]'
                    }`}
                  />
                  {errors.email && <p className="text-rose-500 text-xs font-semibold">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="font-semibold text-slate-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="+254 ..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ED1C24]/20 border-slate-200 focus:border-[#ED1C24]"
                  />
                </div>
              </div>

              {/* Interest dropdown */}
              <div className="space-y-1.5">
                <label htmlFor="interest" className="font-semibold text-slate-700">
                  I'm Interested In <span className="text-rose-500">*</span>
                </label>
                <select
                  id="interest"
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-lg border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ED1C24]/20 ${
                    errors.interest ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 focus:border-[#ED1C24]'
                  }`}
                >
                  <option value="">Select an area of interest</option>
                  {interestOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.interest && <p className="text-rose-500 text-xs font-semibold">{errors.interest}</p>}
              </div>

              {/* Requirement Text */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="font-semibold text-slate-700">
                  Message / Requirement <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us about your project or equipment requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-lg border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ED1C24]/20 ${
                    errors.message ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 focus:border-[#ED1C24]'
                  }`}
                />
                {errors.message && <p className="text-rose-500 text-xs font-semibold">{errors.message}</p>}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitStatus === 'submitting'}
                  className="px-8 py-3.5 bg-[#ED1C24] hover:bg-[#D0171E] text-white font-bold rounded-lg shadow-md hover:shadow-red-500/20 transition-all duration-200 disabled:opacity-50 cursor-pointer uppercase tracking-wider text-xs"
                >
                  {submitStatus === 'submitting' ? 'Submitting...' : 'Submit Enquiry'}
                </button>
              </div>
            </form>
          </div>

        </div>
      </section>

    </div>
  )
}
