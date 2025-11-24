'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { LanguageSelector } from '@/components/ui/language-selector';
import { useLocaleParams } from '@/lib/locale-utils';

export default function HomePage() {
  const t = useTranslations();
  const { createLocaleUrl } = useLocaleParams();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-900">Papalem</div>
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <div className="space-x-2">
              <Link href={createLocaleUrl('/sign-in')}>
                <Button variant="outline" size="sm">
                  {t('common.signIn')}
                </Button>
              </Link>
              <Link href={createLocaleUrl('/sign-up')}>
                <Button size="sm">{t('common.signUp')}</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16"></div>
    </main>
  );
}
