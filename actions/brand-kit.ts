'use server'

import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

const saveBrandKitSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1).max(50),
  logo_url: z
    .string()
    .url()
    .refine((u) => u.startsWith('https://'), 'Logo URL must use HTTPS')
    .optional(),
  primary_color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  secondary_color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  font_family: z.enum(['Inter', 'Poppins', 'Montserrat', 'Roboto']),
  is_default: z.boolean().optional(),
})

export type BrandKitResult =
  | { error: string }
  | { brand_kit: BrandKitRecord }

export interface BrandKitRecord {
  id: string
  user_id: string
  name: string
  logo_url: string | null
  primary_color: string
  secondary_color: string
  font_family: string
  is_default: boolean
  created_at: string
  updated_at: string
}

export async function saveBrandKitAction(input: unknown): Promise<BrandKitResult> {
  const parsed = saveBrandKitSchema.safeParse(input)
  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? 'Geçersiz form verisi' }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: 'Oturum açmanız gerekiyor' }

  if (parsed.data.is_default) {
    await supabase
      .from('brand_kits')
      .update({ is_default: false })
      .eq('user_id', user.id)
  }

  if (parsed.data.id) {
    const { data, error } = await supabase
      .from('brand_kits')
      .update({
        name: parsed.data.name,
        logo_url: parsed.data.logo_url ?? null,
        primary_color: parsed.data.primary_color,
        secondary_color: parsed.data.secondary_color,
        font_family: parsed.data.font_family,
        is_default: parsed.data.is_default ?? false,
      })
      .eq('id', parsed.data.id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) return { error: 'Marka kiti güncellenemedi' }
    return { brand_kit: data as BrandKitRecord }
  }

  const { data, error } = await supabase
    .from('brand_kits')
    .insert({
      user_id: user.id,
      name: parsed.data.name,
      logo_url: parsed.data.logo_url ?? null,
      primary_color: parsed.data.primary_color,
      secondary_color: parsed.data.secondary_color,
      font_family: parsed.data.font_family,
      is_default: parsed.data.is_default ?? false,
    })
    .select()
    .single()

  if (error) return { error: 'Marka kiti kaydedilemedi' }
  return { brand_kit: data as BrandKitRecord }
}

export async function deleteBrandKitAction(
  brandKitId: unknown
): Promise<{ success: true } | { error: string }> {
  const parsed = z.string().uuid().safeParse(brandKitId)
  if (!parsed.success) return { error: 'Geçersiz marka kiti ID' }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: 'Oturum açmanız gerekiyor' }

  const { error } = await supabase
    .from('brand_kits')
    .delete()
    .eq('id', parsed.data)
    .eq('user_id', user.id)

  if (error) return { error: 'Marka kiti silinemedi' }
  return { success: true }
}
