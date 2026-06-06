import { createClient } from '@/lib/supabase/server'

export const metadata = { title: 'Marka Kiti' }

export default async function BrandKitPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: brandKits } = await supabase
    .from('brand_kits')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Marka Kiti</h1>
        <p className="text-[#9CA3AF] mt-1">Marka renklerinizi ve fontlarınızı yönetin.</p>
      </div>

      {!brandKits || brandKits.length === 0 ? (
        <div className="glass rounded-2xl p-12 border border-[#2D2D3D] text-center">
          <p className="text-[#9CA3AF]">Henüz marka kiti oluşturmadınız.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {brandKits.map((kit) => (
            <div key={kit.id} className="glass rounded-2xl p-6 border border-[#2D2D3D] space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-white font-semibold">{kit.name}</p>
                {kit.is_default && (
                  <span className="text-xs px-2 py-0.5 rounded-full gradient-bg text-white">
                    Varsayılan
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg border border-[#2D2D3D]"
                  style={{ backgroundColor: kit.primary_color }}
                  title={kit.primary_color}
                />
                <div
                  className="w-8 h-8 rounded-lg border border-[#2D2D3D]"
                  style={{ backgroundColor: kit.secondary_color }}
                  title={kit.secondary_color}
                />
                <span className="text-[#9CA3AF] text-sm">{kit.font_family}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
