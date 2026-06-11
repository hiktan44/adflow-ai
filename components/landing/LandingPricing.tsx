import Link from 'next/link'

const plans = [
  {
    name: 'Ücretsiz',
    price: '$0',
    period: '/ay',
    description: 'Denemek için ideal. Hiçbir şey girmeden başlayın.',
    features: [
      '5 kreativ üretimi',
      '3 şablon formatı',
      'Temel AI arka plan',
      'GPT-4o reklam metni',
      'PNG indirme',
    ],
    limitations: ['Marka kiti yok', 'API erişimi yok'],
    cta: 'Ücretsiz Başla',
    ctaHref: '/register',
    highlighted: false,
    badge: null,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/ay',
    description: 'Büyüyen mağazalar ve butik e-ticaret sahipleri için.',
    features: [
      'Sınırsız kreativ üretimi',
      'Tüm şablon formatları',
      'Gelişmiş AI arka plan',
      'GPT-4o reklam metni',
      'Marka kiti entegrasyonu',
      'PNG + WebP indirme',
      'Öncelikli destek',
    ],
    limitations: [],
    cta: 'Pro Planı Başlat',
    ctaHref: '/register?plan=pro',
    highlighted: true,
    badge: 'En Popüler',
  },
  {
    name: 'Agency',
    price: '$99',
    period: '/ay',
    description: 'Dijital pazarlama ajansları ve çok sayıda hesap yönetenleri için.',
    features: [
      'Sınırsız kreativ üretimi',
      'Tüm şablon formatları',
      'Gelişmiş AI arka plan',
      'GPT-4o reklam metni',
      '10 Marka kiti',
      'API erişimi',
      'Toplu kreativ üretimi',
      '7/24 öncelikli destek',
    ],
    limitations: [],
    cta: 'Agency Planı Başlat',
    ctaHref: '/register?plan=agency',
    highlighted: false,
    badge: null,
  },
]

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-[#10B981]" aria-hidden="true">
    <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-[#9CA3AF]" aria-hidden="true">
    <path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export default function LandingPricing() {
  return (
    <section id="pricing" className="py-24 px-4" aria-label="Fiyatlandırma">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <span className="text-sm text-[#9CA3AF]">Fiyatlandırma</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Sizi Yavaşlatmayan{' '}
            <span className="gradient-text">Fiyatlar</span>
          </h2>
          <p className="text-lg text-[#9CA3AF] max-w-xl mx-auto">
            Kredi kartı olmadan başlayın. İstediğinizde yükseltin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative rounded-3xl p-8 ${
                plan.highlighted
                  ? 'gradient-bg shadow-[0_0_48px_rgba(124,58,237,0.4)]'
                  : 'glass border border-[#2D2D3D]'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-white text-[#7C3AED] text-xs font-bold px-4 py-1.5 rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={`text-lg font-semibold mb-1 ${
                    plan.highlighted ? 'text-white' : 'text-white'
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="flex items-end gap-1 mb-2">
                  <span
                    className={`text-5xl font-black ${
                      plan.highlighted ? 'text-white' : 'gradient-text'
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-sm mb-2 ${
                      plan.highlighted ? 'text-white/70' : 'text-[#9CA3AF]'
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>
                <p
                  className={`text-sm ${
                    plan.highlighted ? 'text-white/80' : 'text-[#9CA3AF]'
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              <Link
                href={plan.ctaHref}
                className={`block w-full text-center font-semibold py-3 rounded-full mb-6 transition-all ${
                  plan.highlighted
                    ? 'bg-white text-[#7C3AED] hover:bg-white/90'
                    : 'gradient-bg text-white hover:opacity-90 shadow-[0_0_16px_rgba(124,58,237,0.3)]'
                }`}
              >
                {plan.cta}
              </Link>

              <ul className="space-y-3" role="list">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckIcon />
                    <span
                      className={`text-sm ${
                        plan.highlighted ? 'text-white/90' : 'text-[#9CA3AF]'
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
                {plan.limitations.map((limitation) => (
                  <li key={limitation} className="flex items-center gap-3">
                    <XIcon />
                    <span className="text-sm text-[#9CA3AF]/60">{limitation}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="text-center text-sm text-[#9CA3AF] mt-8">
          Tüm planlar aylık faturalandırılır. İstediğiniz zaman iptal edebilirsiniz.
          Yıllık ödeme için{' '}
          <Link href="/register" className="text-[#A78BFA] hover:underline">
            %20 indirim
          </Link>{' '}
          uygulanır.
        </p>
      </div>
    </section>
  )
}
