import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  // Auto-detect from Accept-Language header → maps to browser lang
  localeDetection: true,
});

export const config = {
  // Run on all paths except static assets & API routes
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
