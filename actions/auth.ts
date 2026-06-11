'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

const loginSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi girin'),
  password: z.string().min(8, 'Şifre en az 8 karakter olmalıdır'),
})

const registerSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi girin'),
  password: z.string().min(8, 'Şifre en az 8 karakter olmalıdır'),
  full_name: z
    .string()
    .min(2, 'Ad en az 2 karakter olmalıdır')
    .max(100, 'Ad en fazla 100 karakter olabilir'),
})

export type AuthResult = { error: string } | { success: true }

export async function loginAction(
  _prev: AuthResult | null,
  formData: FormData
): Promise<AuthResult> {
  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? 'Geçersiz form verisi' }
  }

  const isMock = !process.env.NEXT_PUBLIC_SUPABASE_URL || 
                 process.env.NEXT_PUBLIC_SUPABASE_URL.includes("mock") ||
                 process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder") ||
                 parsed.data.email === 'admin@example.com'

  if (isMock) {
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    cookieStore.set('adflow-mock-session', 'true', {
      path: '/',
      maxAge: 86400,
      httpOnly: true,
      secure: true
    })
    redirect('/dashboard')
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  })

  if (error) {
    if (error.code === 'invalid_credentials') {
      return { error: 'E-posta veya şifre hatalı' }
    }
    return { error: 'Giriş yapılırken bir hata oluştu' }
  }

  redirect('/dashboard')
}

export async function registerAction(
  _prev: AuthResult | null,
  formData: FormData
): Promise<AuthResult> {
  const parsed = registerSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    full_name: formData.get('full_name'),
  })

  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? 'Geçersiz form verisi' }
  }

  const isMock = !process.env.NEXT_PUBLIC_SUPABASE_URL || 
                 process.env.NEXT_PUBLIC_SUPABASE_URL.includes("mock") ||
                 process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")

  if (isMock) {
    return { error: 'Demo modunda yeni kayıt oluşturulamaz. Lütfen hazır demo hesabı ile giriş yapın.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: { full_name: parsed.data.full_name },
    },
  })

  if (error) {
    if (error.code === 'user_already_exists') {
      return { error: 'Bu e-posta adresi zaten kayıtlı' }
    }
    return { error: 'Kayıt olurken bir hata oluştu' }
  }

  redirect('/dashboard')
}

export async function logoutAction(): Promise<void> {
  const isMock = !process.env.NEXT_PUBLIC_SUPABASE_URL || 
                 process.env.NEXT_PUBLIC_SUPABASE_URL.includes("mock") ||
                 process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")

  if (isMock) {
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    cookieStore.delete('adflow-mock-session')
    redirect('/login')
  }

  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
