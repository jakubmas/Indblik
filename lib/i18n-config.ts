/**
 * Shared internationalization configuration
 *
 * To add a new locale:
 * 1. Add the locale code to the `locales` array
 * 2. Add the display name to `localeNames`
 * 3. Add the flag emoji to `localeFlags`
 * 4. Create the corresponding message file in `/messages/{locale}.json`
 * 5. Update the message cache in `/components/providers/locale-provider.tsx`
 */

export const locales = ['dk', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'dk';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  dk: 'Dansk',
} as const;

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  dk: '🇩🇰',
} as const;
