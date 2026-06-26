import { useEffect } from 'react'
import { AlertCircle, X } from 'lucide-react'

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4500)
    return () => clearTimeout(timer)
  }, [message, onClose])

  return (
    <div
      role="alert"
      className="toast-enter fixed top-6 right-6 z-50 flex max-w-sm items-start gap-3 rounded-xl border border-red-700 bg-red-600 px-4 py-3 shadow-lg shadow-red-900/30"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-700/50 text-white">
        <AlertCircle className="h-4 w-4" />
      </div>
      <p className="flex-1 pt-0.5 text-left text-sm font-medium text-white">{message}</p>
      <button
        type="button"
        onClick={onClose}
        className="shrink-0 rounded-md p-1 text-red-200 transition hover:bg-red-700 hover:text-white"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
