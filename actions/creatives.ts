'use server'

import { z } from 'zod'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { generateAdCopy, generateBackgroundPrompt, generateBackgroundImage } from '@/lib/openai/client'
import { uploadImageFromUrl, removeBackground, buildCreativeUrl } from '@/lib/cloudinary/client'

const FREE_PLAN_LIMIT = 5

const generateSchema = z.object({
  product_id: z.string().uuid(),
  template_types: z.array(z.enum(['instagram_post', 'story', 'square'])).min(1),
  brand_kit_id: z.string().uuid().optional(),
  platform: z.enum(['instagram', 'facebook', 'tiktok', 'google']),
})

const deleteSchema = z.object({
  creative_id: z.string().uuid(),
})

export type CreativeResult =
  | { error: string }
  | { creatives: CreativeRecord[]; job_ids: string[] }

export interface CreativeRecord {
  id: string
  product_id: string
  template_type: string
  platform: string
  image_url: string | null
  headline: string | null
  description: string | null
  status: string
  created_at: string
}

export async function generateCreativesAction(
  input: unknown
): Promise<CreativeResult> {
  const parsed = generateSchema.safeParse(input)
  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? 'Geçersiz istek' }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: 'Oturum açmanız gerekiyor' }

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan, credits_used')
    .eq('id', user.id)
    .single()

  if (!profile) return { error: 'Profil bulunamadı' }

  if (profile.plan === 'free' && profile.credits_used >= FREE_PLAN_LIMIT) {
    return { error: 'CREDIT_LIMIT_EXCEEDED' }
  }

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', parsed.data.product_id)
    .eq('user_id', user.id)
    .single()

  if (!product) return { error: 'Ürün bulunamadı' }

  const createdCreatives: CreativeRecord[] = []
  const jobIds: string[] = []

  for (const templateType of parsed.data.template_types) {
    const { data: creative, error: insertError } = await supabase
      .from('creatives')
      .insert({
        user_id: user.id,
        product_id: parsed.data.product_id,
        brand_kit_id: parsed.data.brand_kit_id ?? null,
        template_type: templateType,
        platform: parsed.data.platform,
        status: 'generating',
      })
      .select()
      .single()

    if (insertError || !creative) continue

    createdCreatives.push(creative as CreativeRecord)
    jobIds.push(creative.id)

    generateCreativeAsync(
      creative.id,
      product as ProductRow,
      templateType,
      parsed.data.platform,
      user.id
    ).catch(async () => {
      await supabase
        .from('creatives')
        .update({ status: 'failed' })
        .eq('id', creative.id)
    })
  }

  if (createdCreatives.length > 0) {
    await supabase
      .from('profiles')
      .update({ credits_used: profile.credits_used + createdCreatives.length })
      .eq('id', user.id)
  }

  return { creatives: createdCreatives, job_ids: jobIds }
}

interface ProductRow {
  id: string
  title: string
  description: string | null
  price: number | null
  currency: string
  image_urls: string[]
}

async function generateCreativeAsync(
  creativeId: string,
  product: ProductRow,
  templateType: 'instagram_post' | 'story' | 'square',
  platform: string,
  userId: string
): Promise<void> {
  const supabase = await createServiceClient()

  const [adCopy, bgPrompt] = await Promise.all([
    generateAdCopy(
      product.title,
      product.description ?? '',
      product.price,
      product.currency,
      platform
    ),
    generateBackgroundPrompt(product.title, platform),
  ])

  const bgImageUrl = await generateBackgroundImage(bgPrompt)

  let finalImageUrl: string | null = null

  if (product.image_urls.length > 0) {
    const uploaded = await uploadImageFromUrl(
      product.image_urls[0],
      `adflow-ai/users/${userId}/products`
    )
    const noBgUrl = await removeBackground(uploaded.publicId)
    const uploadedNoBg = await uploadImageFromUrl(
      noBgUrl,
      `adflow-ai/users/${userId}/processed`
    )
    finalImageUrl = await buildCreativeUrl(uploadedNoBg.publicId, templateType, bgImageUrl)
  } else {
    const bgUploaded = await uploadImageFromUrl(
      bgImageUrl,
      `adflow-ai/users/${userId}/backgrounds`
    )
    finalImageUrl = bgUploaded.url
  }

  await supabase
    .from('creatives')
    .update({
      image_url: finalImageUrl,
      headline: adCopy.headline,
      description: adCopy.description,
      status: 'ready',
    })
    .eq('id', creativeId)
}

export async function deleteCreativeAction(
  input: unknown
): Promise<{ success: true } | { error: string }> {
  const parsed = deleteSchema.safeParse(input)
  if (!parsed.success) return { error: 'Geçersiz kreativ ID' }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: 'Oturum açmanız gerekiyor' }

  const { error } = await supabase
    .from('creatives')
    .delete()
    .eq('id', parsed.data.creative_id)
    .eq('user_id', user.id)

  if (error) return { error: 'Kreativ silinemedi' }

  return { success: true }
}
