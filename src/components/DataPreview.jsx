import { CheckCircle2, Download, Eye, Loader2, XCircle } from 'lucide-react'
import { ELIGIBLE_REGEX, NOT_ELIGIBLE_REGEX } from '../utils/eligibility'

function EligibilityBadge({ status }) {
  if (ELIGIBLE_REGEX.test(status)) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-200">
        <CheckCircle2 className="h-3 w-3" />
        Eligible
      </span>
    )
  }
  if (NOT_ELIGIBLE_REGEX.test(status)) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-800 ring-1 ring-red-200">
        <XCircle className="h-3 w-3" />
        Not Eligible
      </span>
    )
  }
  return <span className="text-sm text-slate-600">{status}</span>
}

export default function DataPreview({ rows, onDownload, isGenerating }) {
  if (!rows?.length) return null

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
            <Eye className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div className="text-left">
            <h2 className="text-lg font-semibold text-slate-900">Data Preview</h2>
            <p className="text-sm text-slate-500">Verify records before exporting</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onDownload}
          disabled={isGenerating}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:from-indigo-700 hover:to-indigo-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating PDF…
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Download PDF
            </>
          )}
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full min-w-[540px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 font-semibold text-slate-600">#</th>
              <th className="px-4 py-3 font-semibold text-slate-600">Reg No</th>
              <th className="px-4 py-3 font-semibold text-slate-600">Name with Initials</th>
              <th className="px-4 py-3 font-semibold text-slate-600">Eligibility</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, index) => (
              <tr key={`${row.regNo}-${index}`} className="transition hover:bg-slate-50/80">
                <td className="px-4 py-3 text-slate-400">{index + 1}</td>
                <td className="px-4 py-3 text-xs text-slate-700">{row.regNo}</td>
                <td className="px-4 py-3 text-slate-800">{row.name}</td>
                <td className="px-4 py-3">
                  <EligibilityBadge status={row.eligibility} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
