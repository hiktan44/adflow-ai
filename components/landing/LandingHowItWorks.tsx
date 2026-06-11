const steps = [
  {
    number: '01',
    title: 'Ürün Linkini Yapıştırın',
    description:
      'Shopify mağazanızdan, Amazon veya Trendyol listinginden ürün URL\'ini kopyalayıp yapıştırın. AdFlow AI gerisini halleder.',
    detail: 'Desteklenen platformlar: Shopify, Amazon, Trendyol',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M4 7h20M4 14h12M4 21h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'AI Analiz Ediyor',
    description:
      'Yapay zeka ürün görselini, başlığını ve fiyatını çeker. Arka planı temizler ve sahne oluşturur. GPT-4o reklam metnini yazar.',
    detail: 'Ortalama süre: 45-60 saniye',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M14 8v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Format Seçin',
    description:
      'Instagram Post, Story veya Square formatını seçin. Platforma özel boyutlandırma otomatiktir — tek tıkla üçünü birden alın.',
    detail: 'Instagram, Facebook, TikTok, Google Ads',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
        <rect x="15" y="3" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
        <rect x="3" y="15" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
        <rect x="15" y="15" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'İndirin & Yayınlayın',
    description:
      'Kreativleriniz hazır. Yüksek çözünürlüklü PNG olarak indirin ve reklam yöneticisine yükleyin. Tasarımcı beklemeye gerek yok.',
    detail: 'PNG, yüksek çözünürlük',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 4v14M8 12l6 6 6-6M4 22h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export default function LandingHowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 px-4 relative"
      aria-label="Nasıl çalışır"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 50%, #7C3AED, transparent)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <span className="text-sm text-[#9CA3AF]">Süreç</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            4 Adımda{' '}
            <span className="gradient-text">Reklam Seti Hazır</span>
          </h2>
          <p className="text-lg text-[#9CA3AF] max-w-xl mx-auto">
            Teknik bilgi gerektirmiyor. Tasarım programı öğrenmeye gerek yok.
            Sadece linki girin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, index) => (
            <article
              key={step.number}
              className="glass rounded-2xl p-8 border border-[#2D2D3D] hover:border-[#7C3AED]/40 transition-all group"
            >
              <div className="flex items-start gap-5">
                <div className="shrink-0">
                  <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] group-hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all">
                    {step.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl font-black gradient-text opacity-30 leading-none">
                      {step.number}
                    </span>
                    <h3 className="text-xl font-semibold text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-[#9CA3AF] leading-relaxed mb-3">
                    {step.description}
                  </p>
                  <div className="inline-flex items-center gap-1.5 glass px-3 py-1.5 rounded-lg">
                    <div className="w-1.5 h-1.5 rounded-full gradient-bg" aria-hidden="true" />
                    <span className="text-xs text-[#9CA3AF]">{step.detail}</span>
                  </div>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden" aria-hidden="true" />
              )}
            </article>
          ))}
        </div>

        {/* Comparison table */}
        <div className="mt-16 glass rounded-3xl p-8 border border-[#2D2D3D]">
          <h3 className="text-xl font-bold text-white text-center mb-8">
            Rakiplerle Karşılaştırma
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full" role="table">
              <thead>
                <tr className="text-left">
                  <th className="pb-4 pr-6 text-[#9CA3AF] font-medium text-sm">Özellik</th>
                  <th className="pb-4 px-4 text-center">
                    <div className="gradient-text font-bold">AdFlow AI</div>
                  </th>
                  <th className="pb-4 px-4 text-center text-[#9CA3AF] font-medium text-sm">Canva</th>
                  <th className="pb-4 px-4 text-center text-[#9CA3AF] font-medium text-sm">AdCreative.ai</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2D2D3D]">
                {[
                  ['URL\'den Otomatik Veri Çekme', true, false, false],
                  ['AI Arka Plan Temizleme', true, false, true],
                  ['Reklam Metni Üretimi', true, false, true],
                  ['60 Saniyede Hazır', true, false, false],
                  ['Ücretsiz Başlangıç', true, true, false],
                  ['Marka Kiti Entegrasyonu', true, true, true],
                ].map(([feature, adflow, canva, adcreative]) => (
                  <tr key={String(feature)}>
                    <td className="py-3 pr-6 text-sm text-[#9CA3AF]">{String(feature)}</td>
                    <td className="py-3 px-4 text-center">
                      {adflow ? (
                        <span className="text-[#10B981] text-lg" aria-label="Evet">✓</span>
                      ) : (
                        <span className="text-[#EF4444] text-lg" aria-label="Hayır">✗</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {canva ? (
                        <span className="text-[#10B981] text-lg" aria-label="Evet">✓</span>
                      ) : (
                        <span className="text-[#EF4444] text-lg" aria-label="Hayır">✗</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {adcreative ? (
                        <span className="text-[#10B981] text-lg" aria-label="Evet">✓</span>
                      ) : (
                        <span className="text-[#EF4444] text-lg" aria-label="Hayır">✗</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
