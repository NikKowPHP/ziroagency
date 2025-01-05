import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale, pathnames } from './i18n';

export default createMiddleware({
  defaultLocale,
  locales,
  pathnames,
  localePrefix: 'always'
});

// Match all paths except api, static files, etc
export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … if they contain a dot (e.g. favicon.ico)
    '/((?!api|_next|_vercel|.*\\.[^/]*$).*)',
    // However, match all pathnames within /api/auth
    '/api/auth/:path*'
  ]
}; 