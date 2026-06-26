import { useCallback, useRef, useState } from 'react'
import { CloudUpload, FileSpreadsheet, X } from 'lucide-react'

const ACCEPTED_TYPES = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
  'application/vnd.ms-excel',
]
const ACCEPTED_EXTENSIONS = ['.xlsx', '.csv']

function isValidFile(file) {
  const extension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase()
  return ACCEPTED_EXTENSIONS.includes(extension) || ACCEPTED_TYPES.includes(file.type)
}

export default function FileUpload({ file, onFileSelect, onClear, error }) {
  const inputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFiles = useCallback(
    (files) => {
      const selected = files?.[0]
      if (!selected) return
      if (!isValidFile(selected)) {
        onFileSelect(null, 'Only .xlsx and .csv files are accepted.')
        return
      }
      onFileSelect(selected, null)
    },
    [onFileSelect],
  )

  const onDrop = useCallback(
    (e) => {
      e.preventDefault()
      setIsDragging(false)
      handleFiles(e.dataTransfer.files)
    },
    [handleFiles],
  )

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
          <CloudUpload className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <div className="text-left">
          <h2 className="text-lg font-semibold text-slate-900">Upload Eligibility Data</h2>
          <p className="text-sm text-slate-500">Drag & drop or browse for Excel / CSV files</p>
        </div>
      </div>

      {!file ? (
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          className={`relative cursor-pointer rounded-2xl border-2 border-dashed px-6 py-12 text-center transition ${
            isDragging
              ? 'border-indigo-400 bg-indigo-50/60'
              : 'border-slate-200 bg-slate-50/50 hover:border-indigo-300 hover:bg-indigo-50/30'
          }`}
        >
          <div className="pointer-events-none mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
            <FileSpreadsheet className="h-8 w-8 text-indigo-500" strokeWidth={1.5} />
          </div>
          <p className="text-sm font-medium text-slate-700">
            Drop your file here, or{' '}
            <span className="text-indigo-600 underline-offset-2 hover:underline">browse</span>
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Supports .xlsx and .csv · Reg No, Name with Initials, Eligibility
          </p>
          <input
            ref={inputRef}
            type="file"
            accept=".xlsx,.csv"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      ) : (
        <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm">
              <FileSpreadsheet className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-slate-800">{file.name}</p>
              <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClear}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white hover:text-slate-600"
            aria-label="Remove file"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {error && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-left text-sm text-red-700">{error}</p>
      )}
    </section>
  )
}
