import Link from 'next/link'

export default function LandingHero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 px-4"
      aria-label="Hero bölümü"
    >
      {/* Gradient orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7C3AED, transparent)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #EC4899, transparent)' }}
        aria-hidden="true"
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#7C3AED 1px, transparent 1px), linear-gradient(90deg, #7C3AED 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse-slow" aria-hidden="true" />
          <span className="text-sm text-[#9CA3AF]">
            60 saniyede yayına hazır reklam kreatifleri
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fade-in-up animate-delay-100">
          <span className="text-white">Ürün Linkini Verin,</span>
          <br />
          <span className="gradient-text">Reklam Kampanyanızı</span>
          <br />
          <span className="text-white">Hazırlayalım.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-[#9CA3AF] max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up animate-delay-200">
          Shopify, Amazon veya Trendyol linkini yapıştırın. Yapay zeka ürün görselinizi
          analiz etsin, arka planı temizlesin ve{' '}
          <span className="text-white font-medium">
            Instagram, TikTok, Facebook
          </span>{' '}
          için yüksek dönüşümlü reklam setinizi otomatik oluştursun.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up animate-delay-300">
          <Link
            href="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 gradient-bg text-white font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-all shadow-[0_0_32px_rgba(124,58,237,0.5)] hover:shadow-[0_0_48px_rgba(124,58,237,0.7)] hover:scale-105"
          >
            <span>Ücretsiz Dene — İlk 5 Kreativ Bedava</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <Link
            href="#how-it-works"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 glass text-white font-medium px-8 py-4 rounded-full hover:bg-[rgba(255,255,255,0.08)] transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M6 8l2.5 2L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Nasıl Çalışır?
          </Link>
        </div>

        {/* Social proof */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-[#9CA3AF] animate-fade-in-up animate-delay-400">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-[#0F0F13] gradient-bg flex items-center justify-center text-white text-xs font-bold"
                  aria-hidden="true"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span>2.400+ satıcı kullanıyor</span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-[#2D2D3D]" aria-hidden="true" />
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#F59E0B" aria-hidden="true">
                <path d="M7 1l1.5 3.5L12 5l-2.5 2.5.6 3.5L7 9.5l-3.1 1.5.6-3.5L2 5l3.5-.5L7 1z" />
              </svg>
            ))}
            <span className="ml-1">4.9/5 puan</span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-[#2D2D3D]" aria-hidden="true" />
          <span>Kredi kartı gerektirmez</span>
        </div>

        {/* Mock UI preview */}
        <div className="relative mt-20 animate-fade-in-up animate-delay-400">
          <div className="glass rounded-3xl p-6 max-w-3xl mx-auto shadow-[0_32px_64px_rgba(0,0,0,0.6)]">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-[#EF4444]" aria-hidden="true" />
              <div className="w-3 h-3 rounded-full bg-[#F59E0B]" aria-hidden="true" />
              <div className="w-3 h-3 rounded-full bg-[#10B981]" aria-hidden="true" />
              <div className="flex-1 glass rounded-md h-6 ml-4 flex items-center px-3">
                <span className="text-xs text-[#9CA3AF]">https://example.myshopify.com/products/...</span>
              </div>
            </div>

            {/* URL input */}
            <div className="glass rounded-xl p-4 mb-4 flex items-center gap-3">
              <div className="flex-1 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#9CA3AF] shrink-0" aria-hidden="true">
                  <path d="M6 8a2 2 0 100-4 2 2 0 000 4zM14 8a6 6 0 11-12 0 6 6 0 0112 0z" fill="currentColor" fillOpacity="0.5" />
                  <path d="M9 8h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="text-sm text-[#9CA3AF]">https://shop.myshopify.com/products/wireless-earbuds</span>
              </div>
              <div className="gradient-bg text-white text-sm font-medium px-4 py-2 rounded-lg shrink-0">
                Analiz Et
              </div>
            </div>

            {/* Generated creatives preview */}
            <div className="grid grid-cols-3 gap-3">
              {['Instagram Post', 'Story', 'Square'].map((type, i) => (
                <div
                  key={type}
                  className="rounded-xl overflow-hidden aspect-square relative"
                  style={{
                    background: `linear-gradient(135deg, hsl(${260 + i * 20}, 70%, ${20 + i * 5}%), hsl(${320 + i * 10}, 60%, ${15 + i * 5}%))`,
                  }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
                    <div className="w-12 h-12 rounded-lg bg-white/10 mb-2 animate-float" style={{ animationDelay: `${i * 0.8}s` }} aria-hidden="true" />
                    <div className="w-16 h-2 rounded-full bg-white/30 mb-1" aria-hidden="true" />
                    <div className="w-12 h-1.5 rounded-full bg-white/20" aria-hidden="true" />
                  </div>
                  <div className="absolute bottom-2 left-0 right-0 text-center">
                    <span className="text-[10px] text-white/70 bg-white/10 px-2 py-0.5 rounded-full">{type}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom stats */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#2D2D3D]">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#10B981]" aria-hidden="true" />
                <span className="text-xs text-[#9CA3AF]">3 kreativ üretildi — 47 saniye</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#9CA3AF]">Tümünü İndir</span>
                <div className="w-6 h-6 gradient-bg rounded-md flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M6 1v7M3 5l3 3 3-3M1 10h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative glow */}
          <div
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-2/3 h-20 blur-3xl opacity-30 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, #7C3AED, #EC4899)' }}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  )
}
