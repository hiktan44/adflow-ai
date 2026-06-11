import { createClient } from '@/lib/supabase/server'
import { STRIPE_PLANS } from '@/lib/stripe/client'

export const metadata = { title: 'Plan & Faturalama' }

export default async function BillingPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; canceled?: string }>
}) {
  const { success, canceled } = await searchParams
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan, stripe_customer_id')
    .eq('id', user!.id)
    .single()

  const currentPlan = profile?.plan ?? 'free'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Plan & Faturalama</h1>
        <p className="text-[#9CA3AF] mt-1">Abonelik planınızı yönetin.</p>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] text-sm">
          Ödemeniz başarıyla alındı. Planınız güncellendi!
        </div>
      )}
      {canceled && (
        <div className="p-4 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] text-sm">
          Ödeme işlemi iptal edildi.
        </div>
      )}

      <div className="glass rounded-2xl p-6 border border-[#2D2D3D]">
        <p className="text-[#9CA3AF] text-sm">Mevcut Plan</p>
        <p className="text-white font-bold text-2xl mt-1 capitalize">{currentPlan}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(Object.entries(STRIPE_PLANS) as [keyof typeof STRIPE_PLANS, (typeof STRIPE_PLANS)[keyof typeof STRIPE_PLANS]][]).map(
          ([key, plan]) => (
            <div
              key={key}
              className={`glass rounded-2xl p-6 border ${
                currentPlan === key ? 'border-[#7C3AED]' : 'border-[#2D2D3D]'
              }`}
            >
              <p className="text-white font-semibold text-lg">{plan.name}</p>
              <p className="text-[#9CA3AF] mt-1">
                ${(plan.amount / 100).toFixed(0)}/{plan.currency === 'usd' ? 'ay' : 'mo'}
              </p>
              {currentPlan !== key && (
                <form action="/api/billing/checkout" method="POST" className="mt-4">
                  <input type="hidden" name="plan" value={key} />
                  <button
                    type="submit"
                    className="w-full gradient-bg text-white font-medium py-2.5 rounded-xl hover:opacity-90 transition-opacity text-sm"
                  >
                    {key === 'pro' ? "Pro'ya Geç" : "Agency'e Geç"}
                  </button>
                </form>
              )}
              {currentPlan === key && (
                <p className="mt-4 text-sm text-[#10B981] font-medium">✓ Mevcut Planınız</p>
              )}
            </div>
          )
        )}
      </div>
    </div>
  )
}
