import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Shield, TrendingUp, Users, Heart, Zap, Briefcase, Award, CheckCircle2 } from 'lucide-react'
import IndustrialChallengeCTA from '../components/ui/IndustrialChallengeCTA'

export default function About() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.substring(1)
      const element = document.getElementById(targetId)
      if (element) {
        const headerOffset = 90
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }
  }, [location])

  const timeline = [
    {
      year: '2008',
      title: 'Foundation & Industrial Beginnings',
      desc: 'Multivista Global expanded its international footprint to deliver specialized technical equipment, precision fluid handling, and industrial components to growing regional industries.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
    },
    {
      year: '2014',
      title: 'Strategic OEM Partnerships',
      desc: 'Formed strategic alliances with global tier-one manufacturers including Rockwell Automation, Kirloskar, SPP Pumps, and EPP Composites to provide certified high-efficiency technologies.',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80'
    },
    {
      year: '2018',
      title: 'Turnkey Engineering Capabilities',
      desc: 'Evolved into a comprehensive engineering solutions provider, delivering full skid packaging, air & gas compression packages, process cooling, and integrated automation systems.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80'
    },
    {
      year: '2026',
      title: "MVGL Kenya & East African Leadership",
      desc: 'Serving as a critical partner for Kenya and East Africa\'s industrial manufacturing, utilities, cold chain logistics, and infrastructure development with localized technical support.',
      image: 'https://images.unsplash.com/photo-1531535934200-870a25721de9?auto=format&fit=crop&w=600&q=80'
    }
  ]

  const cultureCards = [
    {
      title: 'Be Empowered',
      desc: 'We encourage initiative and innovation. We trust the integrity and skills of our people and support them in delivering distinctive customer service.',
      icon: <Zap className="h-6 w-6 text-[#ED1C24]" />
    },
    {
      title: 'Safety First',
      desc: 'Safety is a way of living. The wellbeing of our colleagues, clients, and partner facilities remains fundamental to every engineering solution we implement.',
      icon: <Shield className="h-6 w-6 text-[#ED1C24]" />
    },
    {
      title: 'One Team',
      desc: 'We approach challenges collaboratively, combining deep engineering expertise across disciplines to develop reliable and efficient systems.',
      icon: <Users className="h-6 w-6 text-[#ED1C24]" />
    },
    {
      title: 'Operational Excellence',
      desc: 'We strive for continuous improvement. Working closely with our OEM partners, we strengthen local capabilities while celebrating engineering milestones.',
      icon: <TrendingUp className="h-6 w-6 text-[#ED1C24]" />
    },
    {
      title: 'Customer Partnership',
      desc: 'We care about our clients and OEM partners, demonstrating commitment through reliable lifecycle support, rapid response, and transparent relationships.',
      icon: <Heart className="h-6 w-6 text-[#ED1C24]" />
    },
    {
      title: 'Accountability & Ownership',
      desc: 'Every team member has a stake in MVGL Kenya\'s success. We value accountability, clear communication, and delivering on our commitments.',
      icon: <Briefcase className="h-6 w-6 text-[#ED1C24]" />
    }
  ]

  const brandElements = [
    {
      title: 'Engineering Precision',
      desc: 'Our mark embodies technological rigor, premium quality, and dependable performance across critical operations.',
      icon: <Award className="h-5 w-5" />
    },
    {
      title: 'Red & Charcoal Palette',
      desc: 'Vibrant red evokes energy and commitment, balanced by dark charcoal representing industrial strength and longevity.',
      icon: <CheckCircle2 className="h-5 w-5" />
    },
    {
      title: 'Growth & Progress',
      desc: 'Represents our dedication to advancing regional industry, upgrading infrastructure, and supporting sustainable economic progress.',
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      title: 'Client Partnership',
      desc: 'Built around enduring relationships, high uptime, and responsive technical service across Kenya and East Africa.',
      icon: <Heart className="h-5 w-5" />
    }
  ]

  return (
    <div className="font-sans min-h-screen bg-slate-50 text-[#222222]">
      
      {/* 1. Hero Section */}
      <div className="pt-28 sm:pt-32 pb-6 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative w-full h-[450px] rounded-3xl overflow-hidden bg-[#222222] text-white flex items-center justify-center">
          <div className="absolute inset-0 bg-black/65 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80"
            alt="About MVGL Kenya"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center space-y-4">
            <span className="eyebrow block">
              HOME / ABOUT US
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Creating Value Through Engineering Excellence
            </h1>
            <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto">
              Delivering dependable industrial products, engineering expertise and responsive customer support to industries across Kenya.
            </p>
          </div>
        </section>
      </div>

      {/* 2. Intro Section */}
      <section className="py-20 px-4 max-w-[1360px] mx-auto text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <span className="eyebrow block mb-2">
              INTRODUCING MVGL KENYA
            </span>
            <h2 className="text-3xl font-extrabold text-[#222222] tracking-tight leading-tight">
              Engineering Solutions. Dependable Regional Support.
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-6 text-slate-650 text-base sm:text-lg leading-relaxed">
            <p>
              MVGL Kenya brings world-class industrial product distribution, engineering solutions, and lifecycle support to Kenya and East Africa. Our portfolio covers compressed air & gas systems, industrial refrigeration, process chilled water, HVAC chillers, life-safety fire pump houses, advanced automation, and corrosion-resistant composite piping.
            </p>
            <p className="text-slate-600 text-sm sm:text-base border-t border-slate-200 pt-6">
              We partner with clients across Manufacturing, Agriculture, Food & Beverage, Steel, Mining, Cement, Pharmaceuticals, Energy, Cold Chain Logistics, and Infrastructure development.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Our Story / Journey Section */}
      <section id="story" className="py-24 bg-white px-4 border-t border-b border-slate-100">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side (Sticky on desktop) */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-4 text-left">
            <span className="eyebrow block">
              OUR JOURNEY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] tracking-tight leading-tight">
              The Path That Built Our Foundation
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              A journey defined by exceptional engineers, enduring OEM alliances, and a commitment to keeping East African industries moving forward.
            </p>
          </div>

          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Right Side (Timeline track) */}
          <div className="lg:col-span-7 relative border-l-2 border-slate-200 pl-8 space-y-16 py-4">
            {timeline.map((item) => (
              <div key={item.year} className="relative group">
                
                {/* Node indicator */}
                <div className="absolute -left-[41px] top-6 h-4 w-4 rounded-full bg-[#222222] border-2 border-white group-hover:bg-[#ED1C24] transition-colors duration-300 z-10"></div>
                
                {/* Milestone card */}
                <div className="bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden text-left">
                  <div className="pt-8 px-6 sm:px-8 pb-6 space-y-2">
                    <span className="text-3xl font-black text-[#ED1C24] block tracking-tight">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-bold text-[#222222]">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  
                  <div className="w-full h-60 sm:h-72 overflow-hidden border-t border-slate-100">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Our Approach & Principles Section */}
      <section className="py-24 px-4 max-w-[1360px] mx-auto text-left">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="eyebrow block">
              OUR APPROACH
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] tracking-tight leading-tight">
              Engineered Around Customer Success
            </h2>
            <div className="space-y-4 text-slate-700 text-base leading-relaxed">
              <p>
                At MVGL Kenya, our focus extends beyond simply supplying machinery. We work as long-term engineering partners to provide solutions and support services that are reliable, energy-efficient, and economically viable.
              </p>
              <p className="text-slate-500 text-sm border-t border-slate-200 pt-4">
                Our multidisciplinary team combines engineering depth, OEM technical certifications, and responsive local field support to maximize facility uptime.
              </p>
            </div>
          </div>

          <div className="bg-[#222222] text-white rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-lg space-y-6">
            <span className="eyebrow block">
              OUR PRINCIPLES
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Operational Excellence & Total Transparency
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              These principles guide every stage of our customer relationship—from preliminary technical audits and system selection to installation, commissioning, and preventive maintenance.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Vision & Mission Section */}
      <section id="vision-mission" className="py-24 bg-white px-4 border-t border-b border-slate-100 font-sans">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Vision Card */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl min-h-[340px] flex flex-col justify-end p-8 sm:p-10 group border border-slate-800">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-[#222222]/40 z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
              alt="MVGL Kenya Vision"
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="relative z-20 space-y-3 text-left">
              <span className="eyebrow block">
                VISION
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Our Vision
              </h3>
              <p className="text-slate-200 leading-relaxed text-sm max-w-xl">
                To set the benchmark across Kenya and East Africa for engineering excellence, reliable technical support, and accessible world-class industrial technologies that spur industrial growth.
              </p>
            </div>
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#ED1C24] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>

          {/* Mission Card */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl min-h-[340px] flex flex-col justify-end p-8 sm:p-10 group border border-slate-800">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-[#222222]/40 z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
              alt="MVGL Kenya Mission"
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="relative z-20 space-y-3 text-left">
              <span className="eyebrow block">
                MISSION
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Our Mission
              </h3>
              <p className="text-slate-200 leading-relaxed text-sm max-w-xl">
                To create enduring value for our clients by providing robust engineering solutions, world-class equipment packages, and responsive lifecycle service that ensure safety, efficiency, and sustainability.
              </p>
            </div>
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#ED1C24] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>

        </div>
      </section>

      {/* 6. Our Culture Section */}
      <section id="culture" className="py-24 px-4 max-w-[1360px] mx-auto text-left">
        <div className="space-y-12 mb-16">
          <div className="max-w-3xl space-y-4">
            <span className="eyebrow block">
              OUR PEOPLE & CULTURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] tracking-tight">
              Stronger Together Through Shared Values
            </h2>
            <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
              Our culture shapes how we think, collaborate, and serve our industrial partners. It creates an environment where people are empowered to take ownership and solve complex challenges.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cultureCards.map((card, idx) => (
            <div 
              key={idx}
              className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 space-y-4 group cursor-pointer"
            >
              <div className="p-3 bg-red-50 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>
              <h3 className="text-lg font-bold text-[#222222] group-hover:text-[#ED1C24] transition-colors">
                {card.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Brand Identity Section */}
      <section id="identity" className="py-24 bg-white border-t border-slate-100 relative overflow-hidden font-sans">
        <div className="max-w-[1360px] mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Logo Display */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="eyebrow block">
              OUR BRAND IDENTITY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] tracking-tight leading-tight">
              An Identity Built Around Value, Innovation & Trust
            </h2>
            
            <div className="bg-slate-50 border border-slate-200 p-8 rounded-3xl shadow-sm flex items-center justify-center max-w-sm mx-auto lg:mx-0 relative overflow-hidden group">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative z-10">
                <img 
                  src="/NEW LOGO/logo2.png" 
                  alt="MVGL Kenya Logo" 
                  className="max-h-24 w-auto object-contain transform group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
            </div>
          </div>

          {/* Right Column: Brand Elements explanation */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {brandElements.map((el, idx) => (
              <div 
                key={idx}
                className="bg-slate-50/70 border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-[#ED1C24] hover:bg-white transition-all duration-300 group cursor-pointer space-y-4"
              >
                <div className="text-[#ED1C24] p-2.5 bg-white border border-slate-100 rounded-xl w-fit shadow-xs">
                  {el.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-[#222222] group-hover:text-[#ED1C24] transition-colors">
                    {el.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {el.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <IndustrialChallengeCTA bgImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80" />

    </div>
  )
}
