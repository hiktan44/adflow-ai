import Link from 'next/link'

export default function LandingCTA() {
  return (
    <section className="py-24 px-4" aria-label="Harekete geçin">
      <div className="max-w-4xl mx-auto">
        <div className="relative glass rounded-3xl p-12 text-center border border-[#7C3AED]/30 overflow-hidden">
          {/* Glow effects */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 blur-3xl opacity-20 pointer-events-none"
            style={{ background: 'linear-gradient(180deg, #7C3AED, transparent)' }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 right-1/4 w-64 h-32 blur-3xl opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #EC4899, transparent)' }}
            aria-hidden="true"
          />

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              İlk Kreatifinizi{' '}
              <span className="gradient-text">Şimdi Oluşturun</span>
            </h2>
            <p className="text-lg text-[#9CA3AF] mb-10 max-w-xl mx-auto">
              Tasarımcı beklemeye son. İlk 5 kreativiniz tamamen ücretsiz.
              Kredi kartı gerekmez.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 gradient-bg text-white font-semibold px-10 py-4 rounded-full hover:opacity-90 transition-all shadow-[0_0_32px_rgba(124,58,237,0.5)] hover:scale-105"
              >
                Ücretsiz Başla
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto text-[#9CA3AF] hover:text-white transition-colors text-sm py-4"
              >
                Zaten hesabım var →
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-[#9CA3AF]">
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7l3.5 3.5L12 4" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Kredi kartı yok
              </div>
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7l3.5 3.5L12 4" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                İstediğinizde iptal
              </div>
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7l3.5 3.5L12 4" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                60 saniyede ilk kreatifiniz
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
