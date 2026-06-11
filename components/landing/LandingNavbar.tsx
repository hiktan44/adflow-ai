import Link from 'next/link'

export default function LandingNavbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-30 px-4 py-4"
      aria-label="Ana navigasyon"
    >
      <div className="max-w-6xl mx-auto glass rounded-2xl px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group" aria-label="AdFlow AI ana sayfa">
          <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center shadow-[0_0_16px_rgba(124,58,237,0.5)]">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path
                d="M3 14L8 4L11 10L14 6L16 9"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="font-bold text-lg text-white">
            Ad<span className="gradient-text">Flow</span> AI
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#features"
            className="text-sm text-[#9CA3AF] hover:text-white transition-colors"
          >
            Özellikler
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm text-[#9CA3AF] hover:text-white transition-colors"
          >
            Nasıl Çalışır
          </Link>
          <Link
            href="#pricing"
            className="text-sm text-[#9CA3AF] hover:text-white transition-colors"
          >
            Fiyatlar
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden sm:block text-sm text-[#9CA3AF] hover:text-white transition-colors px-4 py-2"
          >
            Giriş Yap
          </Link>
          <Link
            href="/register"
            className="text-sm font-medium gradient-bg text-white px-5 py-2 rounded-full hover:opacity-90 transition-opacity shadow-[0_0_16px_rgba(124,58,237,0.4)]"
          >
            Ücretsiz Başla
          </Link>
        </div>
      </div>
    </nav>
  )
}
