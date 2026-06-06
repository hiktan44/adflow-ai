'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'
import { getStripe, STRIPE_PLANS } from '@/lib/stripe/client'

const checkoutSchema = z.object({
  plan: z.enum(['pro', 'agency']),
})

export async function createCheckoutSessionAction(
  input: unknown
): Promise<{ error: string } | never> {
  const parsed = checkoutSchema.safeParse(input)
  if (!parsed.success) return { error: 'Geçersiz plan seçimi' }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: 'Oturum açmanız gerekiyor' }

  const { data: profile } = await supabase
    .from('profiles')
    .select('email, stripe_customer_id')
    .eq('id', user.id)
    .single()

  if (!profile) return { error: 'Profil bulunamadı' }

  const planConfig = STRIPE_PLANS[parsed.data.plan]
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: 'subscription',
    line_items: [{ price: planConfig.priceId, quantity: 1 }],
    success_url: `${baseUrl}/billing?success=true`,
    cancel_url: `${baseUrl}/billing?canceled=true`,
    metadata: { user_id: user.id, plan: parsed.data.plan },
    customer_email: profile.stripe_customer_id ? undefined : profile.email,
  }

  if (profile.stripe_customer_id) {
    sessionParams.customer = profile.stripe_customer_id
  }

  const session = await getStripe().checkout.sessions.create(sessionParams)

  if (!session.url) return { error: 'Ödeme sayfası oluşturulamadı' }

  redirect(session.url)
}

export async function createPortalSessionAction(): Promise<{ error: string } | never> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: 'Oturum açmanız gerekiyor' }

  const { data: profile } = await supabase
    .from('profiles')
    .select('stripe_customer_id')
    .eq('id', user.id)
    .single()

  if (!profile?.stripe_customer_id) {
    return { error: 'NO_SUBSCRIPTION' }
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  const portalSession = await getStripe().billingPortal.sessions.create({
    customer: profile.stripe_customer_id,
    return_url: `${baseUrl}/billing`,
  })

  redirect(portalSession.url)
}
