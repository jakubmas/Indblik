'use client';

import { useSearchParams } from 'next/navigation';
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { ReactNode, useEffect, useMemo } from 'react';

import { COOKIE_MAX_AGE_ONE_YEAR } from '@/lib/constants';
import { defaultLocale, type Locale, locales } from '@/lib/i18n-config';

import dkMessages from '../../messages/dk.json';
// Preload messages to avoid repeated imports
import enMessages from '../../messages/en.json';

interface LocaleProviderProps {
  children: ReactNode;
  messages: AbstractIntlMessages;
}

// Cache for preloaded messages
const messageCache: Record<Locale, typeof enMessages> = {
  en: enMessages,
  dk: dkMessages,
};

export function LocaleProvider({ children, messages }: LocaleProviderProps) {
  const searchParams = useSearchParams();

  // Sync localStorage with cookie on client side
  useEffect(() => {
    let userChoice: Locale | null = null;
    try {
      userChoice = localStorage.getItem('preferredLocale') as Locale;
    } catch {
      // localStorage might not be available (SSR, private browsing, etc.)
      if (process.env.NODE_ENV === 'development') {
        console.warn('localStorage not available for reading preferences');
      }
      userChoice = null;
    }

    // Sync localStorage with cookie if needed
    if (userChoice && locales.includes(userChoice)) {
      document.cookie = `preferredLocale=${userChoice}; path=/; max-age=${COOKIE_MAX_AGE_ONE_YEAR}`;
    }
  }, []);

  // Determine locale from URL params
  const detectedLocale: Locale = useMemo(() => {
    const urlLang = searchParams.get('lang') as Locale;

    // If URL parameter exists and is valid, use it
    if (urlLang && locales.includes(urlLang)) {
      return urlLang;
    }

    // If no URL parameter, it means default locale (English) was chosen
    // The middleware ensures non-default locales always have URL params
    return defaultLocale;
  }, [searchParams]);

  // Use cached messages for the detected locale
  const currentMessages = useMemo(
    () => messageCache[detectedLocale] || messages,
    [detectedLocale, messages],
  );

  return (
    <NextIntlClientProvider 
      messages={currentMessages} 
      locale={detectedLocale}
      timeZone="Europe/Copenhagen"
    >
      {children}
    </NextIntlClientProvider>
  );
}
