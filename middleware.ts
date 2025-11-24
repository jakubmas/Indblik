import { NextRequest, NextResponse } from 'next/server';

import { defaultLocale, type Locale, locales } from '@/lib/i18n-config';

function getLocaleFromRequest(request: NextRequest): Locale {
  // Check URL parameter first - it represents current user intent
  const urlLang = request.nextUrl.searchParams.get('lang') as Locale;
  if (urlLang && locales.includes(urlLang)) {
    return urlLang;
  }

  // Check for stored user preference in cookies
  const storedLocale = request.cookies.get('preferredLocale')?.value as Locale;
  if (storedLocale && locales.includes(storedLocale)) {
    return storedLocale;
  }

  // Fall back to browser language detection
  const acceptLanguage = request.headers.get('accept-language') || '';
  for (const locale of locales) {
    if (acceptLanguage.includes(locale)) {
      return locale;
    }
  }

  return defaultLocale;
}

export function middleware(req: NextRequest) {
  // Handle locale detection and URL rewriting
  const detectedLocale = getLocaleFromRequest(req);
  const currentLang = req.nextUrl.searchParams.get('lang');

  // If we detected a non-default locale and there's no lang param, add it
  if (detectedLocale !== defaultLocale && !currentLang) {
    const url = req.nextUrl.clone();
    url.searchParams.set('lang', detectedLocale);
    return NextResponse.redirect(url);
  }

  // If we detected default locale and there's a lang param for default, remove it
  if (detectedLocale === defaultLocale && currentLang === defaultLocale) {
    const url = req.nextUrl.clone();
    url.searchParams.delete('lang');
    return NextResponse.redirect(url);
  }

  // Add the detected locale as a header for the i18n config to read
  const response = NextResponse.next();
  response.headers.set('x-locale', detectedLocale);
  return response;
}

export const config = {
  matcher: [
    // Regex pattern to exclude specific routes and file types from middleware:
    // - _next: Next.js internal files
    // - api, trpc: API routes
    // - favicon.ico, robots.txt, sitemap.xml: special files
    // - Static assets: css, js, images, fonts, docs, etc.
    '/((?!_next|api|trpc|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:css|js|json|jpg|jpeg|webp|png|gif|svg|ttf|woff|woff2|ico|csv|docx?|xlsx?|zip|webmanifest)$).*)',
  ],
};
