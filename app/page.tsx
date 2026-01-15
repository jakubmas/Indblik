'use client';

import { Dialog, DialogPanel } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import {
  Bars3Icon,
  BoltIcon,
  HeartIcon,
  ShieldCheckIcon,
  SparklesIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { LanguageSelector } from '@/components/ui/language-selector';

function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = useTranslations();

  const navigation = [
    { name: t('navigation.about'), href: '#about' },
    { name: t('navigation.services'), href: '#services' },
    { name: t('navigation.faq'), href: '#faq' },
    {
      name: t('common.contactMe'),
      href: 'https://system.easypractice.net/book/inblik-hypnose',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  ];

  const processFeatures = [
    {
      name: t('about.process.points.0'),
      icon: ShieldCheckIcon,
    },
    {
      name: t('about.process.points.1'),
      icon: HeartIcon,
    },
    {
      name: t('about.process.points.2'),
      icon: SparklesIcon,
    },
    {
      name: t('about.process.points.3'),
      icon: BoltIcon,
    },
  ];

  const serviceCategories = [
    {
      title: t('services.mental.title'),
      items: t.raw('services.mental.items') as string[],
      icon: HeartIcon,
    },
    {
      title: t('services.behavioral.title'),
      items: t.raw('services.behavioral.items') as string[],
      icon: BoltIcon,
    },
    {
      title: t('services.physical.title'),
      items: t.raw('services.physical.items') as string[],
      icon: ShieldCheckIcon,
    },
    {
      title: t('services.development.title'),
      items: t.raw('services.development.items') as string[],
      icon: SparklesIcon,
    },
  ];

  const pricingTiers = [
    {
      name: t('pricing.intro.title'),
      id: 'intro',
      price: t('pricing.intro.duration'),
      description: t('pricing.intro.description'),
      features: [
        '15 minutes consultation',
        'Get to know each other',
        'Ask any questions',
      ],
      cta: t('common.contactMe'),
      mostPopular: false,
    },
    {
      name: t('pricing.single.title'),
      id: 'single',
      price: t('pricing.single.price'),
      duration: t('pricing.single.duration'),
      description: t('pricing.single.description'),
      features: [
        'Individual session',
        'Tailored to your needs',
        'Professional guidance',
        'Safe environment',
      ],
      cta: t('common.bookSession'),
      mostPopular: false,
    },
    {
      name: t('pricing.package.title'),
      id: 'package',
      price: t('pricing.package.price'),
      savings: t('pricing.package.savings'),
      description: t('pricing.package.description'),
      features: [
        'Five comprehensive sessions',
        'Deep transformation work',
        'Spaced for integration',
        'Ongoing support',
      ],
      cta: t('common.bookSession'),
      mostPopular: true,
    },
  ];

  const faqs = t.raw('faq.questions') as Array<{
    question: string;
    answer: string;
  }>;

  return (
    <div className="bg-white">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <nav
            aria-label="Global"
            className="flex items-center justify-between py-6"
          >
            <div className="flex lg:flex-1">
              <div className="-m-1.5 p-1.5">
                <span className="sr-only">Indblik</span>
                <Image
                  src="/logo.svg"
                  alt="Indblik Hypnoterapi logo - Certificeret hypnoterapeut i Randers"
                  width={200}
                  height={70}
                  className="h-16 w-auto"
                  priority
                />
              </div>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.target}
                  rel={item.rel}
                  className="text-sm/6 font-semibold text-gray-900"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-6 lg:items-center">
              <LanguageSelector />
            </div>
          </nav>
        </div>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <div className="-m-1.5 p-1.5">
                <span className="sr-only">Indblik</span>
                <Image
                  src="/logo.svg"
                  alt="Indblik Hypnoterapi logo - Certificeret hypnoterapeut i Randers"
                  width={200}
                  height={70}
                  className="h-16 w-auto"
                  priority
                />
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      target={item.target}
                      rel={item.rel}
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <div className="-mx-3 px-3">
                    <LanguageSelector />
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <main>
        {/* Hero section */}
        <section
          className="relative isolate px-6 pt-14 lg:px-8"
          aria-labelledby="hero-heading"
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
            />
          </div>
          <div className="mx-auto max-w-2xl min-h-screen flex flex-col justify-center py-16">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full bg-white/25 px-4 py-1.5 text-sm/6 text-gray-600 inset-ring inset-ring-gray-900/10">
                {t('hero.tagline')}{' '}
                <a
                  href="#about"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  <span aria-hidden="true" className="absolute inset-0" />
                  {t('common.readMore')} <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
            <div className="text-center">
              <h1
                id="hero-heading"
                className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl"
              >
                {t('hero.headline')}
              </h1>
              <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                {t('hero.subheadline')}
              </p>
              <p className="mt-6 text-lg/8 text-gray-700">
                {t('hero.description')}
              </p>
              <div className="mt-10 flex items-center justify-center">
                <a
                  href="https://system.easypractice.net/book/inblik-hypnose"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {t('hero.cta')}
                </a>
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
            />
          </div>
        </section>

        {/* About section */}
        <section
          id="about"
          className="mx-auto mt-16 max-w-7xl px-6 lg:px-8"
          aria-labelledby="about-heading"
        >
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2
              id="about-heading"
              className="text-base/7 font-semibold text-indigo-600"
            >
              {t('about.headline')}
            </h2>
            <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
              {t('about.process.title')}
            </p>
            <p className="mt-6 text-lg/8 text-gray-600">
              {t('about.description')}
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {processFeatures.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base/7 font-semibold text-gray-900">
                    <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                      <feature.icon
                        aria-hidden="true"
                        className="size-6 text-white"
                      />
                    </div>
                    {feature.name}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Therapist section */}
        <section
          className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8"
          aria-labelledby="therapist-heading"
        >
          <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-4">
              <div className="relative overflow-hidden rounded-3xl bg-gray px-6 pb-9 pt-64 shadow-2xl sm:px-12 lg:max-w-lg lg:px-8 lg:pb-8 xl:px-10 xl:pb-10">
                <Image
                  alt="Erna - Certificeret hypnoterapeut og grundlægger af Indblik Hypnoterapi i Randers"
                  src="/images/erna.jpg"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
                {/* <div className="absolute inset-0 bg-pink-100 mix-blend-multiply" /> */}
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 -ml-16 -translate-x-1/2 -translate-y-1/2 transform-gpu blur-3xl"
                >
                  <div
                    style={{
                      clipPath:
                        'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="aspect-1097/845 w-274.25 bg-linear-to-r from-[#ff4694] to-[#776fff] opacity-[0.45]"
                  />
                </div>
                <figure className="relative isolate">
                  <blockquote className="mt-6 text-xl/8 font-semibold text-white">
                    <p>&ldquo;{t('therapist.mission')}&rdquo;</p>
                  </blockquote>
                  <figcaption className="mt-6 text-sm/6 text-gray-300">
                    <strong className="font-semibold text-white">
                      {t('therapist.name')}
                    </strong>
                    , {t('therapist.title')}
                  </figcaption>
                </figure>
              </div>
            </div>
            <div>
              <div className="text-base/7 text-gray-700 lg:max-w-lg">
                <p className="text-base/7 font-semibold text-indigo-600">
                  {t('therapist.headline')}
                </p>
                <h2
                  id="therapist-heading"
                  className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl"
                >
                  {t('therapist.name')}
                </h2>
                <div className="max-w-xl">
                  <p className="mt-6">{t('therapist.description')}</p>
                  <p className="mt-8">{t('therapist.experience')}</p>
                  <p className="mt-8">{t('therapist.mission')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services section */}
        <section
          id="services"
          className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8"
          aria-labelledby="services-heading"
        >
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2
              id="services-heading"
              className="text-base/7 font-semibold text-indigo-600"
            >
              {t('navigation.services')}
            </h2>
            <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
              {t('services.headline')}
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-4xl grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:max-w-6xl lg:grid-cols-4 xl:gap-12">
            {serviceCategories.map((category) => (
              <div key={category.title} className="flex flex-col h-full">
                <div className="flex items-start gap-x-3 mb-6">
                  <category.icon
                    className="h-6 w-6 text-indigo-600 flex-shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <h3 className="text-lg/8 font-semibold text-gray-900 min-h-[3.5rem] flex items-center">
                    {category.title}
                  </h3>
                </div>
                <ul className="space-y-3 flex-grow">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-start">
                      <CheckIcon
                        className="h-6 w-6 flex-none text-indigo-600 mt-0.5"
                        aria-hidden="true"
                      />
                      <span className="ml-3 text-sm/6 text-gray-600">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing section */}
        <section
          id="pricing"
          className="relative isolate bg-white py-24 sm:py-32 lg:py-40"
          aria-labelledby="pricing-heading"
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            />
          </div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h2
                id="pricing-heading"
                className="text-base/7 font-semibold text-indigo-600"
              >
                {t('navigation.pricing')}
              </h2>
              <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">
                {t('pricing.headline')}
              </p>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
              {t('pricing.subtitle')}
            </p>

            {/* Free intro call */}
            <div className="mx-auto mt-16 max-w-2xl rounded-3xl bg-white ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
              <div className="p-8 sm:p-10 lg:flex-auto">
                <h3 className="text-3xl font-semibold tracking-tight text-gray-900">
                  {t('pricing.intro.title')}
                </h3>
                <p className="mt-6 text-base/7 text-gray-600">
                  {t('pricing.intro.description')}
                </p>
                <div className="mt-10 flex items-center gap-x-4">
                  <h4 className="flex-none text-sm/6 font-semibold text-indigo-600">
                    {t('pricing.whatsIncluded')}
                  </h4>
                  <div className="h-px flex-auto bg-gray-100" />
                </div>
                <ul className="mt-8 grid grid-cols-1 gap-4 text-sm/6 text-gray-600 sm:grid-cols-2 sm:gap-6">
                  <li className="flex gap-x-3">
                    <CheckIcon
                      aria-hidden="true"
                      className="h-6 w-5 flex-none text-indigo-600"
                    />
                    {t('pricing.intro.features.conversation')}
                  </li>
                  <li className="flex gap-x-3">
                    <CheckIcon
                      aria-hidden="true"
                      className="h-6 w-5 flex-none text-indigo-600"
                    />
                    {t('pricing.intro.features.questions')}
                  </li>
                  <li className="flex gap-x-3">
                    <CheckIcon
                      aria-hidden="true"
                      className="h-6 w-5 flex-none text-indigo-600"
                    />
                    {t('pricing.intro.features.chemistry')}
                  </li>
                  <li className="flex gap-x-3">
                    <CheckIcon
                      aria-hidden="true"
                      className="h-6 w-5 flex-none text-indigo-600"
                    />
                    {t('pricing.intro.features.call')}
                  </li>
                </ul>
              </div>
              <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:shrink-0">
                <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                  <div className="mx-auto max-w-xs px-8">
                    <p className="text-base font-semibold text-gray-600">
                      {t('pricing.intro.duration')}
                    </p>
                    <p className="mt-6 flex items-baseline justify-center gap-x-2">
                      <span className="text-5xl font-semibold tracking-tight text-gray-900">
                        Free
                      </span>
                    </p>
                    <a
                      href="https://system.easypractice.net/book/inblik-hypnose"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      {t('hero.cta')}
                    </a>
                    <p className="mt-6 text-xs/5 text-gray-600">
                      {t('pricing.noObligation')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Paid services */}
            <div className="mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              {pricingTiers
                .filter((tier) => tier.id !== 'intro')
                .map((tier, tierIdx) => (
                  <div
                    key={tier.id}
                    className={classNames(
                      tier.mostPopular
                        ? 'lg:z-10 lg:rounded-b-none'
                        : 'lg:mt-8',
                      tierIdx === 0 ? 'lg:rounded-r-none' : '',
                      tierIdx === pricingTiers.length - 1
                        ? 'lg:rounded-l-none'
                        : '',
                      'flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10',
                    )}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-x-4">
                        <h3
                          id={tier.id}
                          className={classNames(
                            tier.mostPopular
                              ? 'text-indigo-600'
                              : 'text-gray-900',
                            'text-lg/8 font-semibold',
                          )}
                        >
                          {tier.name}
                        </h3>
                        {tier.mostPopular ? (
                          <p className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs/5 font-semibold text-indigo-600">
                            {t('pricing.mostPopular')}
                          </p>
                        ) : null}
                      </div>
                      <p className="mt-4 text-sm/6 text-gray-600">
                        {tier.description}
                      </p>
                      <p className="mt-6 flex items-baseline gap-x-1">
                        <span className="text-4xl font-semibold tracking-tight text-gray-900">
                          {tier.price}
                        </span>
                        {tier.duration && (
                          <span className="text-sm/6 font-semibold text-gray-600">
                            {tier.duration}
                          </span>
                        )}
                      </p>
                      {tier.savings && (
                        <p className="text-sm/6 text-gray-500 mt-2">
                          {tier.savings}
                        </p>
                      )}
                      <ul className="mt-8 space-y-3 text-sm/6 text-gray-600">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex gap-x-3">
                            <CheckIcon
                              aria-hidden="true"
                              className="h-6 w-5 flex-none text-indigo-600"
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <a
                      href="https://system.easypractice.net/book/inblik-hypnose"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-describedby={tier.id}
                      className={classNames(
                        tier.mostPopular
                          ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500'
                          : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
                        'mt-8 block rounded-md px-3 py-2 text-center text-sm/6 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                      )}
                    >
                      {tier.cta}
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* FAQ section */}
        <section id="faq" className="bg-white" aria-labelledby="faq-heading">
          <div className="mx-auto max-w-7xl px-6 pb-24 sm:pb-32 lg:px-8 lg:pb-40">
            <h2
              id="faq-heading"
              className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl"
            >
              {t('faq.headline')}
            </h2>
            <dl className="mt-20 divide-y divide-gray-900/10">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="py-8 first:pt-0 last:pb-0 lg:grid lg:grid-cols-12 lg:gap-8"
                >
                  <dt className="text-base/7 font-semibold text-gray-900 lg:col-span-5">
                    {faq.question}
                  </dt>
                  <dd className="mt-4 lg:col-span-7 lg:mt-0">
                    <p className="text-base/7 text-gray-600">{faq.answer}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Contact section */}
        <section
          id="contact"
          className="relative isolate px-6 lg:px-8"
          aria-labelledby="contact-heading"
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="mx-auto aspect-1155/678 w-288.75 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            />
          </div>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="contact-heading"
              className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl"
            >
              {t('contact.headline')}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-600">
              {t('pricing.booking.location')}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="https://system.easypractice.net/book/inblik-hypnose"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {t('hero.cta')}
              </a>
            </div>
            <div className="mt-6 space-y-2 text-sm text-gray-600">
              <p>{t('pricing.booking.payment')}</p>
              <p>{t('pricing.booking.confirmation')}</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative mx-auto mt-32 max-w-7xl px-6 lg:px-8">
        <div className="border-t border-gray-900/10 py-16">
          <div className="flex items-center justify-center">
            <Image
              src="/logo.svg"
              alt="Indblik Hypnoterapi - Professionel hypnoterapi i Randers, Danmark"
              width={220}
              height={80}
              className="h-20 w-auto"
            />
          </div>
          <p className="mt-4 text-center text-sm text-gray-600">
            {t('footer.description')}
          </p>
        </div>
      </footer>
    </div>
  );
}
