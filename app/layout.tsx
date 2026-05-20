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
  // Only load the weights you actually use — cuts font payload
  weight: ['400', '500', '600', '700'],
  display: 'swap', // prevents font from being render-blocking too
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

// Critical above-the-fold CSS inlined so the browser can paint immediately
// without waiting for the external stylesheet to download.
// ─────────────────────────────────────────────────────────────────────────────
// HOW TO UPDATE: Open Chrome DevTools → Coverage tab → reload the page →
// copy the CSS rules that are marked as "used" for the first viewport, and
// paste them here. Everything else stays in globals.css (loaded async below).
// ─────────────────────────────────────────────────────────────────────────────
const CRITICAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    margin: 0;
    padding: 0;
    font-family: Inter, system-ui, -apple-system, sans-serif;
    background: #fff;
    color: #0f172a;
    -webkit-font-smoothing: antialiased;
  }
  /* Header / nav placeholder — prevents layout shift before CSS loads */
  header {
    position: sticky;
    top: 0;
    z-index: 50;
    width: 100%;
    background: #fff;
  }
  main { min-height: 100vh; }
  img, video { max-width: 100%; height: auto; display: block; }
  a { color: inherit; text-decoration: none; }
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/*
          1. Inline critical CSS — zero extra network round-trip,
             browser can start painting immediately.
        */}
        <style dangerouslySetInnerHTML={{ __html: CRITICAL_CSS }} />

        {/*
          2. Load the full stylesheet NON-blocking via media trick.
             - media="print" makes the browser fetch it at low priority
               (non-render-blocking).
             - onLoad switches it to media="all" so it applies once downloaded.
             - <noscript> fallback ensures it still loads without JS.
        */}
        <link
          rel="stylesheet"
          href="/_next/static/css/bbf1d802b98f061b.css"
          media="print"
          // @ts-ignore — onLoad on link is valid HTML, TS just doesn't know it
          onLoad="this.media='all'"
        />
        <noscript>
          <link rel="stylesheet" href="/_next/static/css/bbf1d802b98f061b.css" />
        </noscript>
      </head>

      <body className={inter.className}>
        {/* Meta Pixel */}
        <MetaPixel />

        {/* Google Tag Manager — afterInteractive keeps it off the critical path */}
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
