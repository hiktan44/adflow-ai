import { createClient } from '@/lib/supabase/server'

export const metadata = { title: 'Dashboard' }

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan, credits_used, full_name')
    .eq('id', user!.id)
    .single()

  const creditsRemaining =
    profile?.plan === 'free' ? Math.max(0, 5 - (profile?.credits_used ?? 0)) : null

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Hoş geldiniz{profile?.full_name ? `, ${profile.full_name}` : ''}!
        </h1>
        <p className="text-[#9CA3AF] mt-1">Reklam kreatifleri oluşturmaya başlayın.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass rounded-2xl p-6 border border-[#2D2D3D]">
          <p className="text-[#9CA3AF] text-sm">Plan</p>
          <p className="text-white font-semibold text-xl mt-1 capitalize">
            {profile?.plan ?? 'free'}
          </p>
        </div>

        {creditsRemaining !== null && (
          <div className="glass rounded-2xl p-6 border border-[#2D2D3D]">
            <p className="text-[#9CA3AF] text-sm">Kalan Kredi</p>
            <p className="text-white font-semibold text-xl mt-1">
              {creditsRemaining} / 5
            </p>
          </div>
        )}

        <div className="glass rounded-2xl p-6 border border-[#2D2D3D]">
          <p className="text-[#9CA3AF] text-sm">Kullanılan Kredi</p>
          <p className="text-white font-semibold text-xl mt-1">
            {profile?.credits_used ?? 0}
          </p>
        </div>
      </div>

      <div className="glass rounded-2xl p-8 border border-[#2D2D3D] text-center">
        <p className="text-[#9CA3AF]">
          Kreativ oluşturmak için sol menüden{' '}
          <span className="text-[#A78BFA]">Kreativ Oluştur</span> seçeneğine tıklayın.
        </p>
      </div>
    </div>
  )
}
