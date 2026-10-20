import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#222222] text-white flex items-center justify-center font-sans p-6 text-center">
      <div className="space-y-6 max-w-md">
        <h1 className="text-7xl font-black text-[#ED1C24]">404</h1>
        <h2 className="text-2xl font-bold text-white">
          Page Not Found
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex px-8 py-3.5 bg-[#ED1C24] hover:bg-[#D0171E] text-white font-bold rounded-lg shadow-lg hover:shadow-red-500/20 text-xs uppercase tracking-wider transition-all"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
