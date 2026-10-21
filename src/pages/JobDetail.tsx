import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useParams, Link } from 'react-router-dom'
import { 
  ArrowLeft, MapPin, Briefcase, Tag, Share2, 
  CheckCircle2, UploadCloud, X, Check, FileText, ChevronRight
} from 'lucide-react'
import IndustrialChallengeCTA from '../components/ui/IndustrialChallengeCTA'
import { fetchFromStrapi, parseStrapiList, extractStrapiText } from '../services/strapi'

interface JobPosition {
  id: string
  slug: string
  title: string
  department: string
  location: string
  experience: string
  jobType: string
  jobCode: string
  summary: string
  responsibilities: string[]
  requirements: string[]
}

const fallbackPositions: JobPosition[] = [
  {
    id: 'project-manager-smart-infrastructure',
    slug: 'project-manager-smart-infrastructure',
    title: 'Project Manager, Smart Infrastructure',
    department: 'Engineering & Technical',
    location: 'Chennai, India',
    experience: '10+ Years Exp',
    jobType: 'Full-time',
    jobCode: 'VM153',
    summary: 'Lead cross-functional engineering and industrial turnkey projects from scope definition through site commissioning across smart infrastructure and manufacturing clients.',
    responsibilities: [
      'Manage complex multi-disciplinary industrial turnkey projects from scope definition to final handover',
      'Coordinate on-site implementation of variable speed drives, PLC control panels, and compressor packages',
      'Act as prime technical liaison between client facility teams, consultants, and international OEMs',
      'Ensure strict adherence to quality, safety (EHS), schedule, and budget milestones',
      'Supervise factory acceptance testing (FAT), site acceptance testing (SAT), and client sign-off'
    ],
    requirements: [
      'Bachelor’s Degree in Electrical, Mechanical, or Mechatronics Engineering',
      'Minimum 10+ years of industrial project management experience in manufacturing or infrastructure',
      'PMP or Prince2 certification strongly preferred',
      'Proven expertise in managing technical contractors and commissioning teams',
      'Strong client communication and contractual negotiation capability'
    ]
  },
  {
    id: 'supply-chain-analyst',
    slug: 'supply-chain-analyst',
    title: 'Supply Chain Analyst',
    department: 'Supply Chain & Operations',
    location: 'Mumbai, India',
    experience: '3-5 Years Exp',
    jobType: 'Full-time',
    jobCode: 'VM152',
    summary: 'Optimize procurement schedules, spare parts inventory control, and regional logistics for heavy industrial equipment and replacement components.',
    responsibilities: [
      'Analyze demand forecasts for critical compressor, chiller, and automation spares across Kenya',
      'Manage OEM procurement lead times, shipping documentation, and customs clearance protocols',
      'Implement inventory replenishment models to eliminate unscheduled plant downtime for clients',
      'Evaluate supplier performance metrics and logistics cost efficiency'
    ],
    requirements: [
      'Degree in Supply Chain Management, Logistics, Business, or Industrial Engineering',
      '3–5 years of supply chain or inventory analytics experience in industrial engineering sectors',
      'Proficiency in ERP systems (SAP, Oracle, or Microsoft Dynamics)',
      'Strong quantitative analysis and inventory modeling skills'
    ]
  },
  {
    id: 'robotics-application-specialist',
    slug: 'robotics-application-specialist',
    title: 'Robotics Application Specialist',
    department: 'Engineering & Technical',
    location: 'Bengaluru, India',
    experience: '5-10 Years Exp',
    jobType: 'Full-time',
    jobCode: 'VM151',
    summary: 'Design, program, and commission robotic automation cells and automated material handling systems for manufacturing and packaging plants.',
    responsibilities: [
      'Architect robotic cell layouts, end-of-arm tooling specifications, and safety fencing integrations',
      'Program and optimize multi-axis industrial robots and motion controllers',
      'Integrate robotic controllers with plant PLCs, SCADA, and safety interlock architectures',
      'Conduct customer factory acceptance testing (FAT) and site commissioning'
    ],
    requirements: [
      'Degree in Mechatronics, Robotics, Electrical, or Instrumentation Engineering',
      '5–10 years hands-on experience in robotic automation programming and commissioning',
      'Proficiency with industrial robot programming and vision systems',
      'Strong problem-solving capability in high-speed manufacturing environments'
    ]
  },
  {
    id: 'sales-engineer-distribution',
    slug: 'sales-engineer-distribution',
    title: 'Sales Engineer, Distribution',
    department: 'Sales & Business Development',
    location: 'New Delhi, India',
    experience: '3-5 Years Exp',
    jobType: 'Full-time',
    jobCode: 'VM150',
    summary: 'Drive B2B technical sales of certified industrial pumps, piping systems, and energy-efficient utilities across industrial distribution channels.',
    responsibilities: [
      'Identify and develop new business accounts within manufacturing, food & beverage, and processing sectors',
      'Prepare technical equipment proposals, heat-load calculations, and commercial tenders',
      'Conduct technical presentations and product demonstrations for engineering consultants and plant heads',
      'Manage key account relationships and achieve designated quarterly revenue targets'
    ],
    requirements: [
      'Degree or Diploma in Mechanical or Electrical Engineering',
      '3–5 years of proven technical sales experience in industrial equipment or machinery distribution',
      'Strong commercial acumen and consultative relationship-building skills',
      'Valid driving license and willingness to travel regionally'
    ]
  },
  {
    id: 'compressor-service-engineer',
    slug: 'compressor-service-engineer',
    title: 'Field Service Engineer – Air & Gas Compression',
    department: 'Field Service & Commissioning',
    location: 'Nairobi, Kenya',
    experience: '4+ Years Exp',
    jobType: 'Full-time',
    jobCode: 'VM149',
    summary: 'Hands-on commissioning, preventive maintenance, troubleshooting, and overhaul of screw compressors, centrifugal units, and process gas systems.',
    responsibilities: [
      'Perform scheduled preventive maintenance and overhauls on rotary screw and reciprocating compressors',
      'Troubleshoot pneumatic, mechanical, and electrical control system faults on-site',
      'Execute vibration analysis, oil sampling, and efficiency performance testing',
      'Deliver detailed technical field service reports and customer maintenance recommendations'
    ],
    requirements: [
      'Diploma or Degree in Mechanical Engineering',
      '4+ years hands-on field experience with industrial air compressors and compressed gas systems',
      'Strong diagnostic skills and familiarity with compressor PLC controllers',
      'Ability to handle emergency breakdown calls with safety compliance'
    ]
  },
  {
    id: 'hvac-application-engineer',
    slug: 'hvac-application-engineer',
    title: 'Applications Engineer – Refrigeration & Process Cooling',
    department: 'Engineering & Technical',
    location: 'Nairobi, Kenya',
    experience: '3+ Years Exp',
    jobType: 'Full-time',
    jobCode: 'VM148',
    summary: 'Technical equipment selection, heat-load calculations, and quotation development for industrial chillers and cold chain refrigeration projects.',
    responsibilities: [
      'Analyze customer thermal cooling requirements and perform accurate heat-load calculations',
      'Select optimum chiller configurations (air-cooled, water-cooled, centrifugal, screw) and heat exchangers',
      'Collaborate with OEM engineering desks to tailor customized cooling packages for demanding climates',
      'Support sales teams during technical client discussions and engineering consultations'
    ],
    requirements: [
      'Bachelor’s Degree in Mechanical or Refrigeration Engineering',
      '3+ years experience in commercial or industrial HVAC and process cooling design',
      'Familiarity with ASHRAE, AHRI standards, and eco-friendly refrigerants',
      'Proficiency in CAD and thermal calculation software'
    ]
  }
]

export default function JobDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [job, setJob] = useState<JobPosition | null>(null)
  const [otherJobs, setOtherJobs] = useState<JobPosition[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  // Apply Modal state
  const [isApplyOpen, setIsApplyOpen] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [coverNote, setCoverNote] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    async function loadJob() {
      setLoading(true)
      try {
        const strapiCareers = await fetchFromStrapi<any>('careers')
        let allJobs: JobPosition[] = []

        if (strapiCareers && strapiCareers.length > 0) {
          const mapped: JobPosition[] = strapiCareers.map((c: any, idx: number) => {
            const rawTitle = c.jobTitle || c.title || 'Untitled Position'
            const autoSlug = c.slug || rawTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `career-${c.id}`
            return {
              id: String(c.documentId || c.id),
              slug: autoSlug,
              title: rawTitle,
              department: c.department || 'Engineering & Technical',
              location: c.location || 'Nairobi, Kenya',
              experience: c.experienceLevel || '3+ Years Exp',
              jobType: c.jobType || 'Full-time',
              jobCode: c.jobCode || `VM${153 - idx}`,
              summary: extractStrapiText(c.summary) || '',
              responsibilities: parseStrapiList(c.responsibilities),
              requirements: parseStrapiList(c.requirements)
            }
          })
          allJobs = mapped
        } else {
          allJobs = fallbackPositions
        }

        const target = (slug || '').toLowerCase()
        const found = allJobs.find(j => 
          j.slug.toLowerCase() === target ||
          j.id.toLowerCase() === target ||
          j.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') === target
        ) || fallbackPositions.find(j =>
          j.slug.toLowerCase() === target ||
          j.id.toLowerCase() === target ||
          j.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') === target
        ) || null

        setJob(found)
        const pool = allJobs.length > 1 ? allJobs : fallbackPositions
        setOtherJobs(pool.filter(j => j.slug !== (found ? found.slug : slug)).slice(0, 3))
      } catch (err) {
        console.warn('Error fetching career details, using fallback', err)
        const target = (slug || '').toLowerCase()
        const found = fallbackPositions.find(j => 
          j.slug.toLowerCase() === target ||
          j.id.toLowerCase() === target ||
          j.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') === target
        ) || null
        setJob(found)
        setOtherJobs(fallbackPositions.filter(j => j.slug !== (found ? found.slug : slug)).slice(0, 3))
      } finally {
        setLoading(false)
      }
    }

    loadJob()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  // Lock body scroll when apply modal is open
  useEffect(() => {
    if (isApplyOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isApplyOpen])

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName.trim() || !email.trim()) return

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1200)
  }

  const resetModalState = () => {
    setIsApplyOpen(false)
    setIsSubmitted(false)
    setFullName('')
    setEmail('')
    setPhone('')
    setCoverNote('')
    setSelectedFile(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] font-sans">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#ED1C24] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-600 font-semibold text-sm">Loading position details...</p>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] font-sans p-6 text-center">
        <div className="max-w-md space-y-4">
          <h1 className="text-4xl font-extrabold text-slate-900">Position Not Found</h1>
          <p className="text-slate-600 text-sm">
            The job opening you are looking for does not exist or may have been filled.
          </p>
          <Link
            to="/open-positions"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#ED1C24] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs hover:bg-[#D0171E] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Open Positions
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="font-sans min-h-screen bg-[#F8FAFC] text-[#222222]">
      
      {/* 1. Hero Section (Follows Site Design Hierarchy) */}
      <div className="pt-28 sm:pt-32 pb-6 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative w-full min-h-[420px] rounded-3xl overflow-hidden bg-slate-950 text-white flex items-center shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-black/60 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1400&q=80"
            alt={job.title}
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="max-w-5xl mx-auto px-6 sm:px-12 py-16 relative z-20 space-y-6 text-left w-full">
            
            {/* Breadcrumb & Navigation */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link
                to="/open-positions"
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white uppercase tracking-wider transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to All Open Positions</span>
              </Link>

              <span className="px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-[#ED1C24] text-white shadow-md">
                {job.jobType}
              </span>
            </div>

            {/* Eyebrow */}
            <span className="eyebrow block">
              CAREERS / {job.department.toUpperCase()}
            </span>

            {/* Job Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white max-w-4xl">
              {job.title}
            </h1>

            {/* Key Meta row and Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-6 pt-4 border-t border-white/10">
              <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-200">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#ED1C24]" />
                  <span className="font-semibold">{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-[#ED1C24]" />
                  <span className="font-semibold">{job.experience}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-[#ED1C24]" />
                  <span className="font-bold text-white tracking-wider">{job.jobCode}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsApplyOpen(true)}
                  className="px-7 py-3 bg-[#ED1C24] hover:bg-[#D0171E] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  Apply Now
                </button>
                <button
                  onClick={handleShare}
                  className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors backdrop-blur-md flex items-center gap-2 cursor-pointer border border-white/20"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Share2 className="h-4 w-4" />}
                  <span>{copied ? 'Copied!' : 'Share'}</span>
                </button>
              </div>
            </div>

          </div>
        </section>
      </div>

      {/* 2. Main Content & Sidebar Grid */}
      <section className="pb-20 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (Job Details) */}
          <div className="lg:col-span-8 space-y-8 text-left">
            
            {/* Overview / About the Role */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
              <span className="eyebrow block">ROLE OVERVIEW</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                About this Role
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-normal">
                {job.summary}
              </p>
            </div>

            {/* Key Responsibilities */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
              <span className="eyebrow block">DUTIES & DELIVERABLES</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Key Responsibilities
              </h2>
              <div className="space-y-3.5 pt-1">
                {job.responsibilities.map((resp, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#ED1C24] flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                      {resp}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements & Qualifications */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
              <span className="eyebrow block">QUALIFICATIONS</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Requirements & Experience
              </h2>
              <div className="space-y-3.5 pt-1">
                {job.requirements.map((req, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#ED1C24] flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                      {req}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* What We Offer / Work Culture */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
              <span className="eyebrow block">WHY JOIN MVGL KENYA</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                What We Offer
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {[
                  {
                    title: 'Global OEM Exposure',
                    desc: 'Work directly with industry-leading European and global engineering manufacturers.'
                  },
                  {
                    title: 'Career Advancement',
                    desc: 'Continuous training, technical certifications, and pathways for senior leadership.'
                  },
                  {
                    title: 'Competitive Package',
                    desc: 'Industry-standard compensation, performance rewards, and comprehensive health coverage.'
                  },
                  {
                    title: 'Dynamic Industrial Projects',
                    desc: 'Deliver high-impact mission-critical solutions shaping East Africa’s industrial sector.'
                  }
                ].map((perk, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <h3 className="font-bold text-slate-900 text-sm">{perk.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{perk.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (Sidebar Quick Facts & Actions) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Facts Card */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 text-left">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">
                Job Overview
              </h3>

              <div className="space-y-4 text-sm">
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Job Code</div>
                  <div className="font-bold text-[#ED1C24] text-base">{job.jobCode}</div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Department</div>
                  <div className="font-semibold text-slate-800">{job.department}</div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Location</div>
                  <div className="font-semibold text-slate-800">{job.location}</div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Experience Level</div>
                  <div className="font-semibold text-slate-800">{job.experience}</div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Employment Type</div>
                  <div className="font-semibold text-slate-800">{job.jobType}</div>
                </div>
              </div>

              {/* Sidebar Apply CTA */}
              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => setIsApplyOpen(true)}
                  className="w-full py-3.5 bg-[#ED1C24] hover:bg-[#D0171E] text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer text-center"
                >
                  Apply for this role
                </button>
              </div>
            </div>

            {/* Other Open Positions */}
            {otherJobs.length > 0 && (
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5 text-left">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Other Openings
                </h3>

                <div className="space-y-4">
                  {otherJobs.map((other) => (
                    <Link
                      key={other.id}
                      to={`/open-positions/${other.slug}`}
                      className="block p-3.5 rounded-xl border border-slate-100 hover:border-[#ED1C24]/30 hover:bg-slate-50/60 transition-all group"
                    >
                      <h4 className="text-sm font-bold text-slate-800 group-hover:text-[#ED1C24] transition-colors leading-snug">
                        {other.title}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-slate-500 mt-2 font-medium">
                        <span>{other.location}</span>
                        <span className="font-bold text-[#ED1C24]">{other.jobCode}</span>
                      </div>
                    </Link>
                  ))}
                </div>

                <Link
                  to="/open-positions"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ED1C24] hover:underline pt-2"
                >
                  <span>View All Open Positions</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* 3. Popup Modal (Matches Screenshot 2 Exactly, Centered in Viewport & Mobile) */}
      {isApplyOpen && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
          style={{ minHeight: '100vh' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) resetModalState()
          }}
        >
          <div 
            className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-7 shadow-2xl relative text-left my-auto max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
          >
            
            {/* Header (Screenshot 2: Title + dynamic subtitle + Close X) */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-slate-900 leading-snug">
                  Apply for this role
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                  {job.title}
                </p>
              </div>

              <button
                type="button"
                onClick={resetModalState}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            {isSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <Check className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Application Submitted!</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Thank you for applying for <span className="font-semibold text-slate-800">{job.title}</span>. Our recruitment team will review your application and contact you soon.
                </p>
                <button
                  type="button"
                  onClick={resetModalState}
                  className="mt-4 px-6 py-2.5 bg-[#ED1C24] hover:bg-[#D0171E] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className="pt-4 space-y-4">
                
                {/* Full Name * */}
                <div className="space-y-1.5">
                  <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                    Full Name <span className="text-[#ED1C24]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#ED1C24] focus:border-[#ED1C24] transition-all"
                  />
                </div>

                {/* Email * and Phone (2 columns) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                      Email <span className="text-[#ED1C24]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#ED1C24] focus:border-[#ED1C24] transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#ED1C24] focus:border-[#ED1C24] transition-all"
                    />
                  </div>
                </div>

                {/* Résumé (PDF or Word) */}
                <div className="space-y-1.5">
                  <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                    Résumé (PDF or Word)
                  </label>
                  
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border border-dashed border-slate-300 rounded-xl p-4 text-center cursor-pointer hover:border-slate-400 transition-colors bg-white flex items-center justify-start gap-3 group"
                  >
                    <div className="text-slate-400 group-hover:text-slate-600">
                      <UploadCloud className="h-5 w-5 text-sky-500" />
                    </div>

                    {selectedFile ? (
                      <div className="flex items-center justify-between flex-grow text-left">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-[#ED1C24]" />
                          <span className="text-xs sm:text-sm text-slate-800 font-semibold truncate max-w-[220px]">
                            {selectedFile.name}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs sm:text-sm text-slate-500 font-normal">
                        Choose a file...
                      </span>
                    )}
                  </div>
                </div>

                {/* Cover note */}
                <div className="space-y-1.5">
                  <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                    Cover note
                  </label>
                  <textarea
                    rows={4}
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#ED1C24] focus:border-[#ED1C24] transition-all resize-y"
                  />
                </div>

                {/* Submit Application Button (Primary Red) */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#ED1C24] hover:bg-[#D0171E] text-white font-semibold text-sm sm:text-base rounded-xl transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>,
        document.body
      )}

      {/* 4. Bottom Industrial CTA */}
      <IndustrialChallengeCTA />

    </div>
  )
}
