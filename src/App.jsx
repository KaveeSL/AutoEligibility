import { useCallback, useEffect, useState } from 'react'
import Header from './components/Header'
import MetadataForm from './components/MetadataForm'
import FileUpload from './components/FileUpload'
import StatsSummary from './components/StatsSummary'
import DataPreview from './components/DataPreview'
import Toast from './components/Toast'
import { getMissingMetadataFields } from './utils/metadata'

const INITIAL_METADATA = {
  moduleCode: '',
  moduleName: '',
  semester: '',
}

export default function App() {
  const [metadata, setMetadata] = useState(INITIAL_METADATA)
  const [file, setFile] = useState(null)
  const [rows, setRows] = useState([])
  const [fileError, setFileError] = useState(null)
  const [parseError, setParseError] = useState(null)
  const [isParsing, setIsParsing] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [toast, setToast] = useState(null)

  const handleMetadataChange = (field, value) => {
    setMetadata((prev) => ({ ...prev, [field]: value }))
  }

  const handleMetadataReset = () => {
    setMetadata(INITIAL_METADATA)
  }

  const handleFileSelect = (selectedFile, error) => {
    setFile(selectedFile)
    setFileError(error)
    if (!selectedFile) setRows([])
  }

  const handleClearFile = () => {
    setFile(null)
    setRows([])
    setFileError(null)
    setParseError(null)
  }

  useEffect(() => {
    if (!file) return

    let cancelled = false
    setIsParsing(true)
    setParseError(null)

    import('./utils/excelParser')
      .then(({ parseEligibilityFile }) => parseEligibilityFile(file))
      .then((data) => {
        if (!cancelled) setRows(data)
      })
      .catch((err) => {
        if (!cancelled) {
          setParseError(err.message)
          setRows([])
        }
      })
      .finally(() => {
        if (!cancelled) setIsParsing(false)
      })

    return () => {
      cancelled = true
    }
  }, [file])

  const handleDownload = useCallback(async () => {
    const missing = getMissingMetadataFields(metadata)
    if (missing.length) {
      const fields = missing.join(', ')
      setToast(`Please fill in ${fields} before exporting.`)
      return
    }

    if (!rows.length) {
      setToast('Please upload a file before exporting.')
      return
    }

    setIsGenerating(true)
    try {
      const { downloadEligibilityPDF } = await import('./utils/pdfGenerator')
      await downloadEligibilityPDF({
        moduleCode: metadata.moduleCode.trim(),
        moduleName: metadata.moduleName.trim(),
        semester: metadata.semester.trim(),
        rows,
      })
    } catch {
      setParseError('PDF generation failed. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }, [metadata, rows])

  return (
    <div className="flex min-h-svh flex-col bg-gradient-to-b from-slate-100 via-slate-50 to-amber-50/20">
      <Header />

      <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 px-4 py-8 md:px-6">
        <MetadataForm
          values={metadata}
          onChange={handleMetadataChange}
          onReset={handleMetadataReset}
        />
        <FileUpload
          file={file}
          onFileSelect={handleFileSelect}
          onClear={handleClearFile}
          error={fileError}
        />

        {isParsing && (
          <div className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-center text-sm text-indigo-700">
            Parsing spreadsheet…
          </div>
        )}

        {parseError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700">
            {parseError}
          </div>
        )}

        <StatsSummary rows={rows} />

        <DataPreview
          rows={rows}
          onDownload={handleDownload}
          isGenerating={isGenerating}
        />
      </main>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  )
}
