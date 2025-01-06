import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NotFound() {
  const t = useTranslations('404');

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-xl text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-8">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          {t('title')}
        </h2>
        <p className="text-gray-600 mb-8">
          {t('description')}
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          {t('backHome')}
        </Link>
      </div>
    </div>
  );
} 