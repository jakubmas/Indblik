import { headers } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

import { defaultLocale, type Locale, locales } from './lib/i18n-config';

export default getRequestConfig(async () => {
  const headersList = await headers();

  // Get locale from middleware header or fallback to URL param detection
  let locale = headersList.get('x-locale') as Locale;

  if (!locale) {
    // Fallback: try to get from URL params if middleware didn't set header
    const url = headersList.get('x-url') || '';
    const urlParams = new URLSearchParams(url.split('?')[1] || '');
    locale = (urlParams.get('lang') as Locale) || defaultLocale;
  }

  // Validate that the locale is valid
  if (!locales.includes(locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
    timeZone: 'Europe/Copenhagen',
  };
});
