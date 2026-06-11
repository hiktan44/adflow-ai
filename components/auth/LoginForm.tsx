'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { loginAction, registerAction, type AuthResult } from '@/actions/auth'

interface LoginFormProps {
  mode: 'login' | 'register'
}

export default function LoginForm({ mode }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const action = mode === 'login' ? loginAction : registerAction

  const [state, formAction, isPending] = useActionState<AuthResult | null, FormData>(
    action,
    null
  )

  const errorMessage = state && 'error' in state ? state.error : null

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {mode === 'register' && (
        <div>
          <label
            htmlFor="full_name"
            className="block text-sm font-medium text-[#9CA3AF] mb-2"
          >
            Ad Soyad
          </label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            placeholder="Adınız Soyadınız"
            className="w-full glass rounded-xl px-4 py-3 text-white placeholder-[#6B7280] border border-[#2D2D3D] focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#7C3AED] transition-colors"
            aria-required="true"
          />
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[#9CA3AF] mb-2"
        >
          E-posta
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="siz@ornek.com"
          className="w-full glass rounded-xl px-4 py-3 text-white placeholder-[#6B7280] border border-[#2D2D3D] focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#7C3AED] transition-colors"
          aria-required="true"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-[#9CA3AF] mb-2"
        >
          Şifre
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            required
            minLength={8}
            placeholder="En az 8 karakter"
            className="w-full glass rounded-xl px-4 py-3 pr-12 text-white placeholder-[#6B7280] border border-[#2D2D3D] focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#7C3AED] transition-colors"
            aria-required="true"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-white transition-colors"
            aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
          >
            {showPassword ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M2 9s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M2 2l14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M2 9s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="flex items-center gap-3 p-4 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-[#EF4444]" aria-hidden="true">
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 5v3M8 10.5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="text-sm text-[#EF4444]">{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full gradient-bg text-white font-semibold py-3.5 rounded-full hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-[0_0_24px_rgba(124,58,237,0.4)] hover:shadow-[0_0_32px_rgba(124,58,237,0.6)]"
        aria-busy={isPending}
      >
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="8"
                cy="8"
                r="6"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="30"
                strokeDashoffset="10"
              />
            </svg>
            {mode === 'login' ? 'Giriş yapılıyor...' : 'Hesap oluşturuluyor...'}
          </span>
        ) : mode === 'login' ? (
          'Giriş Yap'
        ) : (
          'Hesap Oluştur'
        )}
      </button>

      <p className="text-center text-sm text-[#9CA3AF]">
        {mode === 'login' ? (
          <>
            Hesabınız yok mu?{' '}
            <Link href="/register" className="text-[#A78BFA] hover:underline">
              Ücretsiz kayıt olun
            </Link>
          </>
        ) : (
          <>
            Zaten hesabınız var mı?{' '}
            <Link href="/login" className="text-[#A78BFA] hover:underline">
              Giriş yapın
            </Link>
          </>
        )}
      </p>
    </form>
  )
}
