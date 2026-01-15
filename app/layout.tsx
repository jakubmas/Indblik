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

export const metadata: Metadata = {
  title: 'Indblik Hypnoterapi - Certificeret Hypnoterapeut i Randers | Erna',
  description:
    'Certificeret hypnoterapi i Randers. Specialiseret i stress, angst, lavt selvværd og personlig udvikling. Book gratis introsamtale med Erna hos Indblik.',
  keywords: [
    'hypnoterapi Randers',
    'hypnoterapeut Randers',
    'hypnose Randers',
    'terapi Randers',
    'angstbehandling',
    'stresshåndtering',
    'selvværd',
    'hypnoterapi Danmark',
    'Erna hypnoterapeut',
    'Indblik Randers',
    'mental sundhed Randers',
    'personlig udvikling',
    'søvnproblemer behandling',
    'hypnose mod stress',
  ],
  authors: [{ name: 'Erna', url: 'https://indblik.dk' }],
  creator: 'Indblik Hypnoterapi',
  publisher: 'Indblik',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://indblik.dk'),
  alternates: {
    canonical: '/',
    languages: {
      'da-DK': '/',
      'en-US': '/en',
    },
  },
  openGraph: {
    title: 'Indblik Hypnoterapi - Certificeret Hypnoterapeut i Randers',
    description:
      'Find ro og balance gennem professionel hypnoterapi i Randers. Specialiseret i stress, angst og personlig udvikling. Book gratis introsamtale.',
    url: 'https://indblik.dk',
    siteName: 'Indblik Hypnoterapi',
    images: [
      {
        url: '/images/erna.jpg',
        width: 1200,
        height: 630,
        alt: 'Erna - Certificeret hypnoterapeut ved Indblik i Randers',
      },
    ],
    locale: 'da_DK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Indblik Hypnoterapi - Certificeret Hypnoterapeut i Randers',
    description:
      'Find ro og balance gennem professionel hypnoterapi i Randers. Book gratis introsamtale.',
    images: ['/images/erna.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/android-chrome-512x512.png',
      },
    ],
  },
  manifest: '/site.webmanifest',
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HealthBusiness',
    '@id': 'https://indblik.dk',
    name: 'Indblik Hypnoterapi',
    description:
      'Certificeret hypnoterapi i Randers. Specialiseret i stress, angst, lavt selvværd og personlig udvikling.',
    url: 'https://indblik.dk',
    telephone: '+45XXXXXXXX',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Randers',
      addressRegion: 'Midtjylland',
      postalCode: '8900',
      addressCountry: 'DK',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 56.4607,
      longitude: 10.0365,
    },
    image: 'https://indblik.dk/images/erna.jpg',
    priceRange: '800-5000 DKK',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
    founder: {
      '@type': 'Person',
      name: 'Erna',
      jobTitle: 'Certificeret Hypnoterapeut',
      image: 'https://indblik.dk/images/erna.jpg',
    },
    areaServed: {
      '@type': 'City',
      name: 'Randers',
    },
    knowsLanguage: ['Danish', 'English'],
    paymentAccepted: ['Cash', 'MobilePay', 'Bank Transfer'],
    currenciesAccepted: 'DKK',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '1',
    },
  };

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>
          <LocaleProvider messages={messages}>{children}</LocaleProvider>
        </Suspense>
        <Toaster />
      </body>
    </html>
  );
}
