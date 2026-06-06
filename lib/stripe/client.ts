import Stripe from 'stripe'

export const STRIPE_PLANS = {
  pro: {
    priceId: process.env.STRIPE_PRO_PRICE_ID ?? '',
    name: 'Pro Plan',
    amount: 2900,
    currency: 'usd',
  },
  agency: {
    priceId: process.env.STRIPE_AGENCY_PRICE_ID ?? '',
    name: 'Agency Plan',
    amount: 9900,
    currency: 'usd',
  },
} as const

export type PlanType = 'free' | 'pro' | 'agency'

let _stripe: Stripe | undefined

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-02-24.acacia',
      typescript: true,
    })
  }
  return _stripe
}

export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string
): Stripe.Event {
  return getStripe().webhooks.constructEvent(
    payload,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  )
}

export default { getStripe }
