import { BookOpen, Calendar, Hash, RotateCcw } from 'lucide-react'

const FIELDS = [
  {
    id: 'moduleCode',
    label: 'Module Code',
    placeholder: 'e.g. IT1010',
    icon: Hash,
  },
  {
    id: 'moduleName',
    label: 'Module Name',
    placeholder: 'e.g. Introduction to Programming',
    icon: BookOpen,
  },
  {
    id: 'semester',
    label: 'Semester',
    placeholder: 'e.g. Semester I 2025/2026',
    icon: Calendar,
  },
]

export default function MetadataForm({ values, onChange, onReset }) {
  const hasValues = Object.values(values).some((value) => value.trim())

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <BookOpen className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div className="text-left">
            <h2 className="text-lg font-semibold text-slate-900">Module Details</h2>
            <p className="text-sm text-slate-500">These appear in the PDF header</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onReset}
          disabled={!hasValues}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {FIELDS.map(({ id, label, placeholder, icon: Icon }) => (
          <label key={id} className="group text-left">
            <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
              <Icon className="h-3.5 w-3.5 text-slate-400 group-focus-within:text-indigo-500" />
              {label}
            </span>
            <input
              type="text"
              value={values[id]}
              onChange={(e) => onChange(id, e.target.value.toUpperCase())}
              placeholder={placeholder}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm uppercase text-slate-900 outline-none transition placeholder:normal-case placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
          </label>
        ))}
      </div>
    </section>
  )
}
