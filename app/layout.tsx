import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Outfit, Great_Vibes, Amatic_SC } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-outfit',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
})

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-great-vibes',
})

const amaticSc = Amatic_SC({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-amatic',
})

export const metadata: Metadata = {
  title: 'StockCheck Outlet',
  description: 'Scan QR atau tekan butang untuk akses folder outlet StockCheck.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#96714F',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ms"
      className={`${outfit.variable} ${fraunces.variable} ${greatVibes.variable} ${amaticSc.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
