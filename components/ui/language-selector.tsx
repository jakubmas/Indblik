'use client';

import { Globe } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Suspense, useTransition } from 'react';

import { COOKIE_MAX_AGE_ONE_YEAR } from '@/lib/constants';
import {
  defaultLocale,
  localeFlags,
  localeNames,
  locales,
} from '@/lib/i18n-config';

const languages = locales.map((code) => ({
  code,
  name: localeNames[code],
  flag: localeFlags[code],
}));

function LanguageSelectorInner() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newLocale = event.target.value;

    try {
      localStorage.setItem('preferredLocale', newLocale);
    } catch {
      // localStorage might not be available (SSR, private mode, etc.)
      // Continue anyway - cookie will still work for persistence
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          'localStorage not available, using cookie only for preference storage',
        );
      }
    }
    document.cookie = `preferredLocale=${newLocale}; path=/; max-age=${COOKIE_MAX_AGE_ONE_YEAR}`;

    // Update URL with lang parameter
    const params = new URLSearchParams(searchParams.toString());

    if (newLocale === defaultLocale) {
      // Remove lang param for default locale (clean URLs)
      params.delete('lang');
    } else {
      // Add lang param for non-default locales
      params.set('lang', newLocale);
    }

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

    startTransition(() => {
      router.push(newUrl);
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <Globe className="h-4 w-4 text-gray-600" />
      <select
        value={locale}
        onChange={handleLanguageChange}
        disabled={isPending}
        className="text-sm bg-transparent border-none outline-none cursor-pointer text-gray-700 hover:text-gray-900"
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.flag} {language.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export function LanguageSelector() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center space-x-2">
          <Globe className="h-4 w-4 text-gray-600" />
          <select
            disabled
            className="text-sm bg-transparent border-none outline-none text-gray-700"
          >
            <option>
              {localeFlags[defaultLocale]} {localeNames[defaultLocale]}
            </option>
          </select>
        </div>
      }
    >
      <LanguageSelectorInner />
    </Suspense>
  );
}
