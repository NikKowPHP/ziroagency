import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { locales, type Locale } from '@/i18n'
import { ClientWrapper } from './client-wrapper'
import Script from 'next/script'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  return {
    alternates: {
      canonical: `https://ziro.agency/${locale}`,
      languages: {
        'en-US': '/en',
        'pl-PL': '/pl',
      },
    },
    title: {
      default: locale === 'en' ? 
        'ZIRO Agency | Professional Web Design & Development' : 
        'ZIRO Agency | Profesjonalne Projektowanie i Rozwój Stron',
      template: '%s | ZIRO Agency',
    },
    description: locale === 'en' ? 
      'Expert web design and development services for businesses. Custom solutions, responsive design, and modern web applications.' :
      'Profesjonalne usługi projektowania i tworzenia stron internetowych dla firm. Rozwiązania na zamówienie, responsywny design i nowoczesne aplikacje.',
  }
}

const renderGoogleAnalytics = () => {
  const gaKey = process.env.NEXT_PUBLIC_GA_ID;
  return gaKey && (
    
      <>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gaKey}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaKey}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </>
    )
  
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params

  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  let messages
  try {
    messages = (await import(`@/messages/${locale}.json`)).default
  } catch (error) {
    console.error(error)
    notFound()
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.variable}>
       {renderGoogleAnalytics()}
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClientWrapper>
            <main>{children}</main>
          </ClientWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

