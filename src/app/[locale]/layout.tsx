import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import {Header} from '@/components/layout/header/header';
import {Footer} from '@/components/layout/footer/footer';
import {LanguageSwitcher} from '@/components/ui/language-switcher/language-switcher';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import {locales, type Locale} from '@/i18n';
import {requestLocale} from '@/i18n/request-locale';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params
}: {
  params: {locale: Locale}
}) {
  const locale = await requestLocale();
  
  if (!locales.includes(locale as any)) {
    notFound();
  }

  return {
    title: {
      default: 'Ziro Health',
      template: '%s | Ziro Health',
    },
    description: 'Healthcare platform for modern practices',
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {locale: Locale};
}) {
  const locale = await requestLocale();
  
  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
          <LanguageSwitcher />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

