const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17.5 15L19.5 17L21.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19.5 17V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'URL\'den Ürün Verisi',
    description:
      'Shopify, Amazon veya Trendyol linkini yapıştırın. Ürün görseli, başlık ve fiyat bilgisi saniyeler içinde otomatik çekilir.',
    gradient: 'from-violet-500/20 to-purple-500/10',
    borderColor: 'border-violet-500/30',
    iconColor: 'text-violet-400',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M16 3.5C16 3.5 21 5.5 21 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'AI Arka Plan Sihirbazı',
    description:
      'DALL-E 3 ile stüdyo kalitesinde sahneler. Ürün fotoğrafınızın arka planı otomatik temizlenir, profesyonel bir ortama yerleştirilir.',
    gradient: 'from-pink-500/20 to-rose-500/10',
    borderColor: 'border-pink-500/30',
    iconColor: 'text-pink-400',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="13" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Otomatik Boyutlandırma',
    description:
      'Instagram Post (1080×1080), Story (1080×1920) ve Square formatlarında tek tıkla kreativler. Platforma özel optimal boyutlar.',
    gradient: 'from-blue-500/20 to-cyan-500/10',
    borderColor: 'border-blue-500/30',
    iconColor: 'text-blue-400',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Dinamik Reklam Metni',
    description:
      'GPT-4o ile dönüşüm odaklı başlık ve açıklama. Platform bazlı optimizasyon: Instagram için kısa, Google için detaylı metinler.',
    gradient: 'from-amber-500/20 to-orange-500/10',
    borderColor: 'border-amber-500/30',
    iconColor: 'text-amber-400',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 12.5C7 12.5 8.5 14 12 14C15.5 14 17 12.5 17 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 9H9.01M15 9H15.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Marka Kiti Entegrasyonu',
    description:
      'Logonuzu, renk paletinizi ve fontlarınızı bir kez kaydedin. Tüm kreativlere otomatik uygulanır. Her seferinde tutarlı marka görünümü.',
    gradient: 'from-emerald-500/20 to-teal-500/10',
    borderColor: 'border-emerald-500/30',
    iconColor: 'text-emerald-400',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: '60 Saniyede Hazır',
    description:
      'Rakipler saatler alır. AdFlow AI ile URL girişinden yayına hazır reklam setine tek tık. Tasarım bilgisi gerektirmez.',
    gradient: 'from-purple-500/20 to-violet-500/10',
    borderColor: 'border-purple-500/30',
    iconColor: 'text-purple-400',
  },
]

export default function LandingFeatures() {
  return (
    <section id="features" className="py-24 px-4" aria-label="Özellikler">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <span className="text-sm text-[#9CA3AF]">Güçlü Özellikler</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Her Şey Otomatik,{' '}
            <span className="gradient-text">Siz Sadece Satın Alın</span>
          </h2>
          <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto">
            Canva gibi manuel araçların sizi yavaşlatmasına izin vermeyin.
            AdFlow AI, sıfır tasarım becerisini profesyonel kreativlere dönüştürür.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <article
              key={feature.title}
              className={`glass rounded-2xl p-6 border ${feature.borderColor} hover:border-opacity-60 transition-all group hover:-translate-y-1`}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} border ${feature.borderColor} flex items-center justify-center mb-5 ${feature.iconColor} group-hover:scale-110 transition-transform`}
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-[#9CA3AF] leading-relaxed">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
