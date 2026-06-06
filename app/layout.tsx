import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'AdFlow AI — Ürün Linkinden Reklam Kreatifleri',
    template: '%s | AdFlow AI',
  },
  description:
    'E-ticaret satıcıları için URL&apos;den saniyeler içinde yüksek dönüşümlü reklam kreatifleri. Shopify, Amazon, Trendyol destekli. GPT-4o + DALL-E 3 ile güçlendirilmiş.',
  keywords: [
    'reklam kreatifleri',
    'AI reklam',
    'e-ticaret',
    'Shopify reklam',
    'Instagram reklam',
    'AdCreative',
    'dropshipping',
  ],
  authors: [{ name: 'AdFlow AI' }],
  creator: 'AdFlow AI',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: '/',
    siteName: 'AdFlow AI',
    title: 'AdFlow AI — Ürün Linkinden Reklam Kreatifleri',
    description:
      'E-ticaret satıcıları için URL\'den saniyeler içinde yüksek dönüşümlü reklam kreatifleri.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'AdFlow AI — URL\'den Reklam Kreatifleri',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AdFlow AI — Ürün Linkinden Reklam Kreatifleri',
    description: 'E-ticaret satıcıları için 60 saniyede yayına hazır reklam setleri.',
    images: ['/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
