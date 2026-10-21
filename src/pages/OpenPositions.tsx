import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, MapPin, Briefcase, ChevronDown, SlidersHorizontal, RefreshCw } from 'lucide-react'
import IndustrialChallengeCTA from '../components/ui/IndustrialChallengeCTA'
import { fetchFromStrapi, parseStrapiList, extractStrapiText } from '../services/strapi'

export interface JobPosition {
  id: string
  slug: string
  title: string
  department: string
  location: string
  experience: string
  jobType: string
  jobCode: string
  summary: string
  responsibilities?: string[]
  requirements?: string[]
}

const defaultPositions: JobPosition[] = [
  {
    id: 'project-manager-smart-infrastructure',
    slug: 'project-manager-smart-infrastructure',
    title: 'Project Manager, Smart Infrastructure',
    department: 'Smart Infrastructure & Engineering',
    location: 'Chennai, India',
    experience: '10+ Years Exp',
    jobType: 'Full-time',
    jobCode: 'VM153',
    summary: 'Lead end-to-end industrial infrastructure projects, coordination with OEM engineering partners, field installation, and client commissioning across East Africa.',
    responsibilities: [
      'Manage complex multi-disciplinary industrial turnkey projects from scope definition to final handover',
      'Coordinate on-site implementation of variable speed drives, PLC control panels, and compressor packages',
      'Act as prime technical liaison between client facility teams, consultants, and international OEMs',
      'Ensure strict adherence to quality, safety (EHS), schedule, and budget milestones'
    ],
    requirements: [
      'Bachelor’s Degree in Electrical, Mechanical, or Mechatronics Engineering',
      'Minimum 10+ years of industrial project management experience in manufacturing or infrastructure',
      'PMP or Prince2 certification strongly preferred',
      'Proven expertise in managing technical contractors and commissioning teams'
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
      'Valid driving license and willingness to travel regionally within Kenya'
    ]
  },
  {
    id: 'compressor-service-engineer',
    slug: 'compressor-service-engineer',
    title: 'Field Service Engineer – Air & Gas Compression',
    department: 'Mechanical Solutions Division',
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
    department: 'Cooling & HVAC Division',
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

export default function OpenPositions() {
  const [positions, setPositions] = useState<JobPosition[]>(defaultPositions)
  const [loading, setLoading] = useState(true)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedDesignation, setSelectedDesignation] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')

  useEffect(() => {
    async function loadCareers() {
      try {
        const strapiCareers = await fetchFromStrapi<any>('careers')
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

          setPositions(mapped)
        }
      } catch (err) {
        console.warn('Error loading careers from Strapi, using defaults.', err)
      } finally {
        setLoading(false)
      }
    }
    loadCareers()
  }, [])

  // Unique departments/designations
  const designations = useMemo(() => {
    const set = new Set(positions.map(p => p.department).filter(Boolean))
    return Array.from(set)
  }, [positions])

  // Unique locations
  const locations = useMemo(() => {
    const set = new Set(positions.map(p => p.location).filter(Boolean))
    return Array.from(set)
  }, [positions])

  // Filtered jobs
  const filteredPositions = useMemo(() => {
    return positions.filter(pos => {
      // Keyword search (searches title, department, location, summary, code)
      if (searchKeyword.trim()) {
        const q = searchKeyword.toLowerCase()
        const matchTitle = pos.title.toLowerCase().includes(q)
        const matchDept = pos.department.toLowerCase().includes(q)
        const matchLoc = pos.location.toLowerCase().includes(q)
        const matchCode = pos.jobCode.toLowerCase().includes(q)
        if (!matchTitle && !matchDept && !matchLoc && !matchCode) return false
      }

      // Designation dropdown
      if (selectedDesignation !== 'all' && pos.department !== selectedDesignation) {
        return false
      }

      // Location dropdown
      if (selectedLocation !== 'all' && pos.location !== selectedLocation) {
        return false
      }

      return true
    })
  }, [positions, searchKeyword, selectedDesignation, selectedLocation])

  const resetFilters = () => {
    setSearchKeyword('')
    setSelectedDesignation('all')
    setSelectedLocation('all')
  }

  return (
    <div className="font-sans min-h-screen bg-[#F8FAFC] text-[#222222]">
      
      {/* 1. Hero Section (Follows Site Design Hierarchy) */}
      <div className="pt-28 sm:pt-32 pb-6 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative w-full h-[400px] sm:h-[430px] rounded-3xl overflow-hidden bg-[#1E293B] text-white flex items-center justify-center shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/80 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=80"
            alt="Current Openings at MVGL Kenya"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center space-y-4">
            <span className="eyebrow block">
              HOME / CAREERS / OPEN POSITIONS
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Build Your Career with MVGL Kenya
            </h1>
            <p className="text-slate-200 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-normal">
              Join an elite industrial engineering community powering high-efficiency manufacturing, compressed air systems, and industrial automation across East Africa.
            </p>
          </div>
        </section>
      </div>

      {/* 2. Current Openings & Search Section (Matches Screenshot 1) */}
      <section className="pt-8 sm:pt-12 pb-12 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="eyebrow block">
          CURRENT OPENINGS
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Find Your Next Opportunity
        </h1>
        <p className="text-slate-600 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed font-normal">
          Discover exciting opportunities across engineering, industrial automation, manufacturing, operations, sales, corporate functions and more. Search by keyword, department or location to find the role that's right for you.
        </p>

        {/* 2. Search & Filter Bar (Matches Screenshot 1) */}
        <div className="pt-6 max-w-5xl mx-auto">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-stretch md:items-center gap-3">
            
            {/* Input with Search Icon */}
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Search By Keyword/location..."
                className="w-full pl-11 pr-4 py-2.5 sm:py-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#ED1C24] transition-all"
              />
              {searchKeyword && (
                <button
                  onClick={() => setSearchKeyword('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Select Designation Dropdown */}
            <div className="relative md:w-60 flex-shrink-0">
              <select
                value={selectedDesignation}
                onChange={(e) => setSelectedDesignation(e.target.value)}
                className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 sm:py-3 pr-9 text-xs sm:text-sm font-medium text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#ED1C24] cursor-pointer"
              >
                <option value="all">Select Designation</option>
                {designations.map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Select Location Dropdown */}
            <div className="relative md:w-56 flex-shrink-0">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 sm:py-3 pr-9 text-xs sm:text-sm font-medium text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#ED1C24] cursor-pointer"
              >
                <option value="all">Select Location</option>
                {locations.map((loc, i) => (
                  <option key={i} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Search Button (Styled with Primary Brand Color) */}
            <button
              onClick={() => {}}
              className="px-8 py-2.5 sm:py-3 bg-[#ED1C24] hover:bg-[#D0171E] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs hover:shadow-md flex items-center justify-center cursor-pointer flex-shrink-0"
            >
              Search
            </button>

          </div>
        </div>
      </section>

      {/* 3. Job Listings Container */}
      <section className="pb-20 max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Results Counter Line (Matches Screenshot 1) */}
        <div className="flex items-center justify-between text-left">
          <div className="text-slate-800 font-semibold text-sm sm:text-base">
            We Found <span className="font-bold text-[#ED1C24]">{filteredPositions.length} Jobs</span>
          </div>

          {(searchKeyword || selectedDesignation !== 'all' || selectedLocation !== 'all') && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ED1C24] hover:underline cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Reset Filters
            </button>
          )}
        </div>

        {/* Job Cards (Horizontal Rows Matching Screenshot 1) */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-8 h-8 border-3 border-[#ED1C24] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-slate-400 text-xs font-semibold">Loading open positions...</p>
          </div>
        ) : filteredPositions.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4 shadow-xs">
            <SlidersHorizontal className="h-10 w-10 text-slate-300 mx-auto" />
            <h3 className="text-xl font-bold text-slate-800">No positions found</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              We couldn't find any roles matching your current search criteria. Try modifying your search or clearing your filters.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-[#ED1C24] text-white font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#D0171E] transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPositions.map((pos) => (
              <div
                key={pos.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left group"
              >
                {/* Left: Job Title */}
                <div className="md:w-[42%]">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#ED1C24] transition-colors leading-snug">
                    <Link to={`/open-positions/${pos.slug}`}>
                      {pos.title}
                    </Link>
                  </h3>
                </div>

                {/* Middle: Location, Experience, Job Code */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-500 font-medium md:flex-grow">
                  
                  {/* Location */}
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <MapPin className="h-4 w-4 text-slate-400 flex-shrink-0" />
                    <span>{pos.location}</span>
                  </div>

                  {/* Experience */}
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <Briefcase className="h-4 w-4 text-slate-400 flex-shrink-0" />
                    <span>{pos.experience}</span>
                  </div>

                  {/* Job Code Badge */}
                  <div className="text-[#ED1C24] font-bold tracking-wider text-xs whitespace-nowrap">
                    {pos.jobCode}
                  </div>

                </div>

                {/* Right: More Detail Button */}
                <div className="flex-shrink-0 pt-2 md:pt-0">
                  <Link
                    to={`/open-positions/${pos.slug}`}
                    className="w-full md:w-auto inline-flex items-center justify-center px-6 py-2.5 bg-[#ED1C24] hover:bg-[#D0171E] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs hover:shadow-md cursor-pointer whitespace-nowrap"
                  >
                    More Detail
                  </Link>
                </div>

              </div>
            ))}
          </div>
        )}

      </section>

      {/* 4. Bottom Industrial CTA */}
      <IndustrialChallengeCTA />

    </div>
  )
}
