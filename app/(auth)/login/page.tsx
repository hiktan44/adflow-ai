import type { Metadata } from 'next'
import LoginForm from '@/components/auth/LoginForm'

export const metadata: Metadata = {
  title: 'Giriş Yap',
  description: 'AdFlow AI hesabınıza giriş yapın.',
}

export default function LoginPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Tekrar Hoşgeldiniz</h1>
        <p className="text-[#9CA3AF]">
          Hesabınıza giriş yapın, reklam kreativlerinizi oluşturmaya devam edin.
        </p>
      </div>
      <LoginForm mode="login" />
    </>
  )
}
