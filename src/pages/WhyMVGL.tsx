import { Link } from 'react-router-dom'
import { 
  Heart, 
  BookOpen, 
  Users, 
  TrendingUp, 
  ArrowRight
} from 'lucide-react'

export default function WhyMVGL() {
  const growthReasons = [
    {
      icon: <Heart className="h-6 w-6 text-brand-primary" />,
      title: 'Meaningful Work',
      desc: 'Contribute to high-impact projects that drive industrial efficiency, automation progress, and positive economic development across Kenya and East Africa.'
    },
    {
      icon: <BookOpen className="h-6 w-6 text-brand-primary" />,
      title: 'Continuous Learning',
      desc: 'Expand your capabilities through specialized technical training, global OEM certifications, and hands-on guidance from seasoned engineering leaders.'
    },
    {
      icon: <Users className="h-6 w-6 text-brand-primary" />,
      title: 'Collaborative Culture',
      desc: 'Work alongside experienced engineering professionals in an inclusive, supportive, and safety-first environment where every voice is respected.'
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-brand-primary" />,
      title: 'Career Progression',
      desc: 'Build a long-term career with transparent advancement paths structured to help you reach your full technical, managerial, and commercial potential.'
    }
  ]

  const values = [
    'Integrity',
    'Excellence',
    'Customer Focus',
    'Innovation',
    'Collaboration'
  ]

  return (
    <div className="font-sans min-h-screen bg-slate-50 text-[#222222]">
      
      {/* 1. Hero Section */}
      <div className="pt-28 sm:pt-32 pb-6 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative w-full h-[450px] rounded-3xl overflow-hidden bg-[#222222] text-white flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
            alt="Life at MVGL Kenya"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="max-w-4xl mx-auto px-6 relative z-20 text-center space-y-6">
            <span className="eyebrow block">
              CAREERS / WHY MVGL KENYA
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Build Your Future with MVGL Kenya
            </h1>
            <p className="text-slate-200 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Be part of a team that is driving industrial innovation, engineering excellence, and customer success across Kenya and East Africa. Discover opportunities to grow.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a 
                href="#growth" 
                className="px-6 py-3 bg-[#ED1C24] hover:bg-[#D0171E] text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-colors duration-200 shadow-md"
              >
                Explore Opportunities
              </a>
              <Link 
                to="/contact" 
                className="px-6 py-3 border border-white hover:bg-white/10 text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* 2. Why You'll Grow Here */}
      <section id="growth" className="py-20 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 text-start">
        <div className="space-y-3 mb-16 text-center max-w-3xl mx-auto">
          <span className="eyebrow block">
            GROWTH & VALUES
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#222222] tracking-tight leading-tight">
            Why You'll Grow Here
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            At MVGL Kenya, you will work with leading technologies across industrial automation, process engineering, compressed air, and advanced materials. Every role plays a vital part in helping our regional clients succeed.
          </p>
        </div>

        {/* 4 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {growthReasons.map((reason, idx) => (
            <div key={idx} className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 space-y-4">
              <div className="h-12 w-12 bg-red-50 rounded-2xl flex items-center justify-center">
                {reason.icon}
              </div>
              <h3 className="text-lg font-bold text-[#222222] tracking-tight">
                {reason.title}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {reason.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Build More Than a Career Banner */}
      <section className="py-24 relative overflow-hidden bg-[#222222] text-white flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-black/75 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80" 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="max-w-3xl mx-auto px-6 relative z-20 space-y-6">
          <span className="eyebrow block">
            OUR MISSION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Build More Than a Career
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Whether you are starting your career or looking to take the next step, we offer a place where you can challenge yourself, develop your skills, and build a career you are proud of.
          </p>
          <a 
            href="#positions" 
            className="inline-flex px-6 py-3 bg-[#ED1C24] hover:bg-[#D0171E] text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-colors duration-200 shadow-md"
          >
            Explore Opportunities
          </a>
        </div>
      </section>

      {/* 4. Driven by Purpose. United by Values. */}
      <section className="py-20 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 text-start border-b border-slate-100">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-3">
            <span className="eyebrow block">
              OUR VALUES
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#222222] tracking-tight leading-tight">
              Driven by Purpose. United by Values.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Integrity, excellence, customer focus, innovation, and collaboration are at the core of everything we do. These values guide our decisions and define how we deliver industrial value across Kenya.
            </p>
          </div>

          {/* Capsule Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {values.map((val, idx) => (
              <span 
                key={idx} 
                className="px-5 py-2.5 bg-white border border-slate-200 hover:border-brand-primary hover:text-brand-primary transition-colors text-slate-700 text-xs font-bold rounded-full uppercase tracking-wider shadow-xs"
              >
                {val}
              </span>
            ))}
          </div>

          <Link 
            to="/about" 
            className="px-5 py-2.5 border border-brand-primary text-brand-primary hover:bg-red-50 font-bold rounded-lg text-xs uppercase tracking-wider transition-colors duration-200 inline-flex items-center gap-2"
          >
            Learn More About Our Culture
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* 5. Life at MVGL Kenya */}
      <section id="culture" className="py-20 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 text-start">
        <div className="space-y-3 mb-12 text-center max-w-3xl mx-auto">
          <span className="eyebrow block">
            LIFE AT MVGL KENYA
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#222222] tracking-tight leading-tight">
            Where People and Engineering Innovation Thrive
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            We foster an environment where people learn from each other, contribute to shared achievements, and deliver dependable engineering solutions that shape East Africa's industrial landscape.
          </p>
        </div>

        {/* 4 Image Collage */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 space-y-6">
            <div className="h-64 sm:h-80 rounded-3xl overflow-hidden shadow-sm relative group">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                alt="Engineering Collaboration" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="h-64 sm:h-80 rounded-3xl overflow-hidden shadow-sm relative group">
              <img 
                src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80" 
                alt="Engineering analytics" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
          <div className="md:col-span-4 space-y-6">
            <div className="h-64 sm:h-80 md:h-[332px] rounded-3xl overflow-hidden shadow-sm relative group">
              <img 
                src="https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&w=600&q=80" 
                alt="Brainstorming Solutions" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="h-64 sm:h-80 md:h-[332px] rounded-3xl overflow-hidden shadow-sm relative group">
              <img 
                src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=600&q=80" 
                alt="Industrial Facility" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Shape the Future of Industry CTA */}
      <section id="positions" className="py-20 bg-[#ED1C24] text-white w-full text-center relative overflow-hidden">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-white/10 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Shape the Future of Industry With Us
          </h2>
          <p className="text-white/90 text-sm max-w-xl mx-auto leading-relaxed">
            Join a team committed to technical innovation, engineering excellence, and continuous growth. Discover opportunities where your expertise can make an impact.
          </p>
          <div className="pt-2">
            <Link 
              to="/open-positions"
              className="inline-flex px-6 py-3 bg-white text-[#ED1C24] font-bold rounded-lg text-xs uppercase tracking-wider transition-colors hover:bg-slate-50 shadow-md"
            >
              Explore Open Positions
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
