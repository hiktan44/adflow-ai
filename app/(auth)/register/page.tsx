import type { Metadata } from 'next'
import LoginForm from '@/components/auth/LoginForm'

export const metadata: Metadata = {
  title: 'Kayıt Ol',
  description: 'AdFlow AI ile ücretsiz hesap oluşturun. İlk 5 kreativ bedava.',
}

export default function RegisterPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Ücretsiz Başlayın</h1>
        <p className="text-[#9CA3AF]">
          İlk 5 kreativiniz tamamen ücretsiz. Kredi kartı gerekmez.
        </p>
      </div>
      <LoginForm mode="register" />
    </>
  )
}
