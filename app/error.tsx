'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#0F0F13] flex items-center justify-center px-4">
      <div className="glass rounded-2xl p-10 text-center max-w-md w-full border border-[#EF4444]/30">
        <div className="w-16 h-16 rounded-2xl bg-[#EF4444]/10 border border-[#EF4444]/30 flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-[#EF4444]" aria-hidden="true">
            <path
              d="M14 9v5M14 18h.01M6.5 4h15l2.5 4.5-11 15-11-15L6.5 4z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Bir Hata Oluştu</h1>
        <p className="text-[#9CA3AF] mb-6">
          Beklenmedik bir hata oluştu. Lütfen tekrar deneyin.
        </p>
        {error.digest && (
          <p className="text-xs text-[#9CA3AF]/60 font-mono mb-6">
            Hata kodu: {error.digest}
          </p>
        )}
        <button
          onClick={reset}
          className="w-full gradient-bg text-white font-medium py-3 rounded-full hover:opacity-90 transition-opacity"
        >
          Tekrar Dene
        </button>
      </div>
    </div>
  )
}
