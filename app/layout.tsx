import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getLocale, getMessages } from 'next-intl/server';
import { Suspense } from 'react';
import { Toaster } from 'sonner';

import { LocaleProvider } from '@/components/providers/locale-provider';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
});

// TODO : Update metadata when creating home page
export const metadata: Metadata = {
  title: 'Papalem - Event Management',
  description:
    'Professional event management platform for creating and managing events',
  keywords: ['events', 'management', 'platform', 'papalem'],
  authors: [{ name: 'Papalem Team' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>
          <LocaleProvider messages={messages}>{children}</LocaleProvider>
        </Suspense>
        <Toaster />
      </body>
    </html>
  );
}
