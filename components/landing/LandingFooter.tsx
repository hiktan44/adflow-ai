import Link from 'next/link'

export default function LandingFooter() {
  return (
    <footer className="border-t border-[#2D2D3D] py-12 px-4" role="contentinfo">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 gradient-bg rounded-lg flex items-center justify-center">
              <svg width="15" height="15" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path
                  d="M3 14L8 4L11 10L14 6L16 9"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="font-bold text-white">
              Ad<span className="gradient-text">Flow</span> AI
            </span>
          </div>

          <nav aria-label="Footer navigasyon">
            <ul className="flex flex-wrap items-center justify-center gap-6" role="list">
              {[
                { label: 'Özellikler', href: '#features' },
                { label: 'Nasıl Çalışır', href: '#how-it-works' },
                { label: 'Fiyatlar', href: '#pricing' },
                { label: 'Gizlilik', href: '#' },
                { label: 'Kullanım Koşulları', href: '#' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#9CA3AF] hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="text-sm text-[#9CA3AF]">
            &copy; {new Date().getFullYear()} AdFlow AI. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  )
}
