import { FileSpreadsheet, FileText, ShieldCheck, Sparkles, Zap } from 'lucide-react'
import logo from '../assets/logo.png'
import { APP_CONFIG } from '../config'

const FEATURES = [
  { icon: FileSpreadsheet, label: 'Excel & CSV', color: 'text-amber-600 bg-amber-50 border-amber-200' },
  { icon: ShieldCheck, label: 'Moodle-ready PDFs', color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
  { icon: FileText, label: 'Institutional format', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
]

export default function Header() {
  return (
    <header className="relative overflow-hidden border-b border-amber-200/70 bg-gradient-to-br from-white via-amber-50/30 to-indigo-50/40">
      {/* Background pattern & shapes */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Dot grid */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.35]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dot-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#d97706" fillOpacity="0.25" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-grid)" />
        </svg>

        {/* Large blobs */}
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-bl from-amber-200/60 to-amber-400/20 blur-2xl" />
        <div className="absolute -left-16 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-indigo-200/40 blur-2xl" />
        <div className="absolute bottom-0 right-1/4 h-32 w-32 rounded-full bg-emerald-200/30 blur-xl" />

        {/* Geometric shapes */}
        <div className="absolute left-[8%] top-6 h-10 w-10 rotate-45 rounded-lg border-2 border-amber-300/40 bg-amber-100/20" />
        <div className="absolute right-[12%] top-10 h-6 w-6 rounded-full border-2 border-dashed border-indigo-300/50" />
        <div className="absolute bottom-8 left-[18%] h-0 w-0 border-l-[10px] border-r-[10px] border-b-[18px] border-l-transparent border-r-transparent border-b-amber-400/30" />
        <div className="absolute bottom-12 right-[8%] h-14 w-14 rotate-12 border border-indigo-200/60 bg-indigo-50/40" style={{ clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }} />
        <div className="absolute right-[30%] top-4 h-3 w-3 rounded-full bg-amber-400/50" />
        <div className="absolute left-[42%] bottom-6 h-2 w-2 rounded-full bg-indigo-400/40" />
        <div className="absolute left-[55%] top-8 h-2 w-2 rounded-full bg-emerald-400/40" />

        {/* Diagonal accent lines */}
        <div className="absolute left-0 top-0 h-24 w-px bg-gradient-to-b from-amber-400/50 to-transparent" />
        <div className="absolute right-0 top-0 h-32 w-px bg-gradient-to-b from-indigo-300/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />

        {/* Floating ring */}
        <div className="absolute right-[20%] bottom-4 h-20 w-20 rounded-full border border-amber-200/50" />
        <div className="absolute right-[20%] bottom-4 h-20 w-20 rounded-full border border-indigo-200/30 scale-75" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-10">
          {/* Logo cluster */}
          <div className="relative shrink-0">
            <div className="absolute -inset-6 rounded-full border border-dashed border-amber-300/40" />
            <div className="absolute -inset-3 rounded-full border border-indigo-200/50" />
            <div className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-white shadow-md shadow-amber-200">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <div className="absolute -bottom-1 -left-2 flex h-6 w-6 items-center justify-center rounded-md rotate-12 bg-indigo-500 text-white shadow-sm">
              <Zap className="h-3 w-3" />
            </div>
            <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-amber-300/50 to-indigo-300/30 blur-lg" />
            <img
              src={logo}
              alt="University of Moratuwa"
              className="relative h-24 w-24 rounded-full object-contain bg-white ring-4 ring-white shadow-lg shadow-amber-100 md:h-28 md:w-28"
            />
          </div>

          {/* Title block */}
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-200/80 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-amber-800 shadow-sm backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              {APP_CONFIG.faculty}
            </div>

            <h1 className="relative text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              <span className="bg-gradient-to-r from-slate-900 via-amber-800 to-indigo-900 bg-clip-text text-transparent">
                {APP_CONFIG.name}
              </span>
              <span className="absolute -right-4 -top-2 hidden text-amber-400/60 lg:inline">✦</span>
            </h1>

            <p className="mt-3 max-w-xl text-sm text-slate-600 md:text-base">{APP_CONFIG.tagline}</p>

            <div className="mt-3 flex items-center justify-center gap-2 lg:justify-start">
              <div className="h-px w-8 bg-gradient-to-r from-amber-400 to-transparent" />
              <p className="text-sm font-medium text-slate-700">{APP_CONFIG.institution}</p>
              <div className="h-px w-8 bg-gradient-to-l from-indigo-400 to-transparent" />
            </div>
          </div>

          {/* Side accent card */}
          <div className="hidden shrink-0 lg:block">
            <div className="relative rounded-2xl border border-white/80 bg-white/60 p-4 shadow-lg shadow-amber-100/50 backdrop-blur-sm">
              <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-amber-400" />
              <div className="absolute -bottom-1 -left-1 h-2 w-2 rounded-sm rotate-45 bg-indigo-400/60" />
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Powered by</p>
              <p className="mt-1 text-lg font-bold text-slate-800">CODL · UoM</p>
              <div className="mt-2 flex gap-1">
                <div className="h-1 flex-1 rounded-full bg-amber-400" />
                <div className="h-1 flex-1 rounded-full bg-indigo-400" />
                <div className="h-1 flex-1 rounded-full bg-emerald-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Feature pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
          {FEATURES.map(({ icon: Icon, label, color }) => (
            <span
              key={label}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium shadow-sm backdrop-blur-sm transition hover:scale-[1.02] ${color}`}
            >
              <Icon className="h-4 w-4" strokeWidth={1.75} />
              {label}
            </span>
          ))}
        </div>
      </div>
    </header>
  )
}
