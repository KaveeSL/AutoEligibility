import { CheckCircle2, Users, XCircle } from 'lucide-react'
import { countEligibility } from '../utils/eligibility'

const CARDS = [
  {
    key: 'total',
    label: 'Total Students',
    icon: Users,
    accent: 'indigo',
    getValue: (counts) => counts.total,
  },
  {
    key: 'eligible',
    label: 'Eligible',
    icon: CheckCircle2,
    accent: 'emerald',
    getValue: (counts) => counts.eligible,
  },
  {
    key: 'notEligible',
    label: 'Not Eligible',
    icon: XCircle,
    accent: 'red',
    getValue: (counts) => counts.notEligible,
  },
]

const ACCENT_STYLES = {
  indigo: {
    card: 'border-indigo-100 bg-indigo-50/60',
    icon: 'bg-indigo-100 text-indigo-600',
    value: 'text-indigo-900',
  },
  emerald: {
    card: 'border-emerald-100 bg-emerald-50/60',
    icon: 'bg-emerald-100 text-emerald-600',
    value: 'text-emerald-900',
  },
  red: {
    card: 'border-red-100 bg-red-50/60',
    icon: 'bg-red-100 text-red-600',
    value: 'text-red-900',
  },
}

export default function StatsSummary({ rows }) {
  if (!rows?.length) return null

  const counts = countEligibility(rows)

  return (
    <section className="grid gap-4 sm:grid-cols-3">
      {CARDS.map(({ key, label, icon: Icon, accent, getValue }) => {
        const styles = ACCENT_STYLES[accent]
        return (
          <div
            key={key}
            className={`rounded-2xl border p-5 shadow-sm ${styles.card}`}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-sm font-medium text-slate-600">{label}</p>
                <p className={`mt-1 text-3xl font-bold tabular-nums ${styles.value}`}>
                  {getValue(counts)}
                </p>
              </div>
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${styles.icon}`}>
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
