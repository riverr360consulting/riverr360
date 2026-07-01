import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MetaPixel from '@/components/MetaPixel';
import CookieConsent from '@/components/CookieConsent';
import { getSiteSettings } from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  adjustFontFallback: true,
  preload: true,
});

// generateMetadata replaces the static `export const metadata` object
// so we can pull the title/description from the database at request time.
export function generateMetadata(): Metadata {
  const settings = getSiteSettings();

  return {
    metadataBase: new URL('https://riverr360.com'),
    alternates: { canonical: '/' },
    title: {
      default: settings.siteTitle,
      template: '%s | Riverr360',
    },
    description: settings.siteDesc,
    keywords: ['revenue leakage', 'consulting', 'marketing solutions', 'business growth'],
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://riverr360.com',
      siteName: 'Riverr360',
      title: settings.siteTitle,
      description: settings.siteDesc,
    },
    twitter: {
      card: 'summary_large_image',
      title: settings.siteTitle,
      description: settings.siteDesc,
    },
    robots: { index: true, follow: true },
  };
}

// Inline critical CSS for above-the-fold first paint, before the full
// Tailwind stylesheet (imported via globals.css) loads.
//
// IMPORTANT: this must stay minimal and must NEVER redefine a class name
// that Tailwind/globals.css also defines (e.g. .container-custom, .btn-primary,
// .max-w-*, .grid-cols-*, spacing/color utilities, etc). Because this is a
// separate <style> tag from the compiled Tailwind stylesheet, Tailwind's
// @layer ordering guarantees do NOT apply across the two — whichever one
// happens to be later in the rendered <head> wins for any class defined in
// both, regardless of what Tailwind's own layer order says. Duplicating
// utility classes here previously caused real bugs (blog page width/images
// intermittently overridden by this block). Only bare element-level resets
// belong here.
const CRITICAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; line-height: 1.5; -webkit-text-size-adjust: 100%; }
  body { margin: 0; font-family: Inter, system-ui, -apple-system, sans-serif; background: #fff; color: #111827; -webkit-font-smoothing: antialiased; }
  img, svg { display: block; max-width: 100%; }
  a { color: inherit; text-decoration: none; }
  strong { font-weight: 700; }
  button { cursor: pointer; border: none; background: none; }
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = getSiteSettings();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preload" href="/images/logo.png" as="image" type="image/png" />
        <style dangerouslySetInnerHTML={{ __html: CRITICAL_CSS }} />
      </head>
      <body className={inter.className}>
        {/* MetaPixel now reads pixel ID from DB-backed settings */}
        <MetaPixel pixelId={settings.metaPixelId} />

        {settings.gtmId && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${settings.gtmId}');`,
            }}
          />
        )}

        <Header />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
