import { createClient } from '@/lib/supabase/server'

export const metadata = { title: 'Kreativlerim' }

export default async function CreativesPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: creatives } = await supabase
    .from('creatives')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Kreativlerim</h1>
        <p className="text-[#9CA3AF] mt-1">Oluşturduğunuz tüm reklam kreatifleri.</p>
      </div>

      {!creatives || creatives.length === 0 ? (
        <div className="glass rounded-2xl p-12 border border-[#2D2D3D] text-center">
          <p className="text-[#9CA3AF]">Henüz kreativ oluşturmadınız.</p>
          <a
            href="/create"
            className="inline-block mt-4 px-6 py-2.5 gradient-bg text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            İlk Kreativinizi Oluşturun
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {creatives.map((creative) => (
            <div
              key={creative.id}
              className="glass rounded-2xl border border-[#2D2D3D] overflow-hidden"
            >
              {creative.image_url ? (
                <img
                  src={creative.image_url}
                  alt={creative.headline ?? 'Kreativ'}
                  className="w-full aspect-square object-cover"
                />
              ) : (
                <div className="w-full aspect-square bg-[#232333] flex items-center justify-center">
                  {creative.status === 'generating' ? (
                    <p className="text-[#9CA3AF] text-sm">Oluşturuluyor...</p>
                  ) : (
                    <p className="text-[#EF4444] text-sm">Oluşturulamadı</p>
                  )}
                </div>
              )}
              <div className="p-4">
                <p className="text-white font-medium text-sm truncate">
                  {creative.headline ?? '—'}
                </p>
                <p className="text-[#9CA3AF] text-xs mt-1 truncate">
                  {creative.description ?? ''}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-[#6B7280] capitalize">{creative.platform}</span>
                  <span className="text-[#2D2D3D]">·</span>
                  <span className="text-xs text-[#6B7280] capitalize">{creative.template_type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
