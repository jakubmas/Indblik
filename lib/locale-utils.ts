'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';

import { defaultLocale } from '@/lib/i18n-config';

/**
 * Client-side hook for creating locale-aware URLs
 */
export function useLocaleParams() {
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createLocaleUrl = (
    path: string,
    additionalParams?: Record<string, string>,
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    // Add additional params if provided
    if (additionalParams) {
      Object.entries(additionalParams).forEach(([key, value]) => {
        params.set(key, value);
      });
    }

    // Handle locale parameter
    if (locale === defaultLocale) {
      // Remove lang param for default locale (clean URLs)
      params.delete('lang');
    } else {
      // Add lang param for non-default locales
      params.set('lang', locale);
    }

    const queryString = params.toString();
    return queryString ? `${path}?${queryString}` : path;
  };

  const getCurrentUrl = () => createLocaleUrl(pathname);

  const getCurrentLocaleParam = () =>
    locale === defaultLocale ? null : locale;

  return {
    createLocaleUrl,
    getCurrentUrl,
    getCurrentLocaleParam,
    locale,
    pathname,
  };
}
