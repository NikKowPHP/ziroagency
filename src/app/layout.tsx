import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/components/layout/header/header'
import { Footer } from '@/components/layout/footer/footer'
import '@/styles/globals.css'
import { LanguageSwitcher } from '@/components/ui/language-switcher/language-switcher'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Ziro Health',
    template: '%s | Ziro Health',
  },
  description: 'Healthcare platform for modern practices',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      <LanguageSwitcher />
      </body>
    </html>
  )
}
