import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0F0F13] flex">
      {/* Left: Form panel */}
      <div className="flex-1 flex flex-col justify-center px-8 py-12 lg:px-16 max-w-md mx-auto lg:mx-0 lg:max-w-lg w-full">
        <Link href="/" className="flex items-center gap-2 mb-12" aria-label="AdFlow AI ana sayfa">
          <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
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
        {children}
      </div>

      {/* Right: Visual panel */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden" aria-hidden="true">
        {/* Gradient background */}
        <div className="absolute inset-0 gradient-bg opacity-10" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(124,58,237,0.15), transparent)',
          }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(#7C3AED 1px, transparent 1px), linear-gradient(90deg, #7C3AED 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Content */}
        <div className="relative flex flex-col items-center justify-center p-16 w-full">
          <div className="glass rounded-3xl p-8 max-w-sm w-full border border-[#7C3AED]/30 shadow-[0_0_48px_rgba(124,58,237,0.2)]">
            {/* Mock creative preview */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { label: 'Instagram Post', h: 'aspect-square' },
                { label: 'Story', h: 'aspect-[9/16]' },
              ].map(({ label, h }, i) => (
                <div
                  key={label}
                  className={`${h} rounded-xl overflow-hidden relative`}
                  style={{
                    background: `linear-gradient(135deg, hsl(${260 + i * 30}, 70%, 25%), hsl(${320 + i * 15}, 60%, 20%))`,
                  }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                    <div className="w-10 h-10 rounded-lg bg-white/10 mb-2 animate-float" style={{ animationDelay: `${i * 1}s` }} />
                    <div className="w-14 h-1.5 rounded-full bg-white/30 mb-1" />
                    <div className="w-10 h-1 rounded-full bg-white/20" />
                  </div>
                  <div className="absolute bottom-1.5 left-0 right-0 text-center">
                    <span className="text-[9px] text-white/60 bg-white/10 px-1.5 py-0.5 rounded-full">{label}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse-slow" />
              <span className="text-sm font-medium text-white">3 kreativ oluşturuldu</span>
            </div>
            <p className="text-xs text-[#9CA3AF]">48 saniyede tamamlandı · Yayına hazır</p>
          </div>

          <div className="mt-8 text-center">
            <p className="text-2xl font-bold text-white mb-2">
              60 Saniyede
              <span className="gradient-text"> Reklam Seti</span>
            </p>
            <p className="text-[#9CA3AF] text-sm">
              Tasarımcı beklemeye son. AI halleder.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
