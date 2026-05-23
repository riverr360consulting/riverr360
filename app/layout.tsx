import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MetaPixel from '@/components/MetaPixel';
import CookieConsent from '@/components/CookieConsent';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  // Preload the font so it's fetched early — reduces layout shift
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://riverr360.com'),

  alternates: {
    canonical: '/',
  },

  title: {
    default: 'Riverr360 | Revenue Leakage Framework for Your Business Growth',
    template: '%s | Riverr360',
  },

  description:
    'Riverr360 helps businesses identify and fix revenue leakage through strategic 360 Revenue Leakage Framework and data-driven solutions.',

  keywords: ['revenue leakage', 'consulting', 'marketing solutions', 'business growth'],

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://riverr360.com',
    siteName: 'Riverr360',
    title: 'Riverr360 | R360 Revenue Leakage Framework for Your Business Growth',
    description:
      'Riverr360 helps businesses identify and fix revenue leakage through strategic framework and process.',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Riverr360 | R360 Revenue Leakage Framework for Your Business Growth',
    description:
      'Riverr360 helps businesses identify and fix revenue leakage through strategic process and framework.',
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/*
         * ── Preconnect to critical origins ────────────────────────────────────
         * Establishes TCP+TLS handshakes early so font/resource fetches don't
         * pay a full round-trip penalty when the browser discovers them later.
         */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/*
         * ── DNS prefetch for third-party scripts ──────────────────────────────
         * Cheaper than preconnect — just resolves DNS early for FB/GTM origins.
         */}
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/*
         * ── Preload hero image / logo ─────────────────────────────────────────
         * Tells the browser to fetch the LCP image as soon as possible,
         * before it parses the full HTML. Update path if your logo differs.
         */}
        <link rel="preload" href="/images/logo.png" as="image" type="image/png" />

        {/*
         * ── NO manual CSS link here ───────────────────────────────────────────
         * Previously a hardcoded /_next/static/css/<hash>.css was loaded here,
         * but that hash changes on every build and would silently break.
         *
         * Instead, `experimental.optimizeCss: true` in next.config.js handles
         * this automatically — it inlines critical CSS and defers the rest
         * without any hardcoded filenames.
         *
         * DO NOT add a manual <link rel="stylesheet"> for Next.js CSS chunks.
         */}
      </head>

      <body className={inter.className}>
        {/*
         * ── Meta Pixel ────────────────────────────────────────────────────────
         * MetaPixel component should use next/script with strategy="lazyOnload"
         * or "afterInteractive" to keep it off the critical path.
         * See: app/components/MetaPixel.tsx
         */}
        <MetaPixel />

        {/*
         * ── Google Tag Manager ────────────────────────────────────────────────
         * afterInteractive fires after hydration — never blocks first paint.
         */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PB2BCL8J');`,
          }}
        />

        <Header />
        <main>{children}</main>
        <Footer />

        <CookieConsent />
      </body>
    </html>
  );
}
