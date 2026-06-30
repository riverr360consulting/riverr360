import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
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

const CRITICAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; line-height: 1.5; -webkit-text-size-adjust: 100%; }
  body { margin: 0; font-family: Inter, system-ui, -apple-system, sans-serif; background: #fff; color: #111827; -webkit-font-smoothing: antialiased; }
  img, svg { display: block; max-width: 100%; }
  a { color: inherit; text-decoration: none; }
  strong { font-weight: 700; }
  button { cursor: pointer; border: none; background: none; }
  .sticky { position: sticky; } .top-0 { top: 0; } .z-50 { z-index: 50; }
  .flex { display: flex; } .inline-flex { display: inline-flex; } .inline-block { display: inline-block; }
  .hidden { display: none; } .grid { display: grid; } .block { display: block; }
  .items-center { align-items: center; } .items-start { align-items: flex-start; }
  .justify-between { justify-content: space-between; } .justify-center { justify-content: center; }
  .flex-col { flex-direction: column; } .flex-shrink-0 { flex-shrink: 0; } .flex-wrap { flex-wrap: wrap; }
  .gap-2{gap:.5rem}.gap-3{gap:.75rem}.gap-4{gap:1rem}.gap-5{gap:1.25rem}
  .space-x-8>*+*{margin-left:2rem}.space-y-4>*+*{margin-top:1rem}
  .h-9{height:2.25rem}.h-10{height:2.5rem}.h-16{height:4rem}.w-6{width:1.5rem}.w-9{width:2.25rem}.h-6{height:1.5rem}.w-auto{width:auto}
  .max-w-2xl{max-width:42rem}.max-w-3xl{max-width:48rem}.max-w-5xl{max-width:64rem}.max-w-7xl{max-width:80rem}
  .mx-auto{margin-left:auto;margin-right:auto}.w-full{width:100%}.min-h-\\[1lh\\]{min-height:1lh}
  .p-2{padding:.5rem}.p-5{padding:1.25rem}.px-3{padding-left:.75rem;padding-right:.75rem}.px-4{padding-left:1rem;padding-right:1rem}
  .px-6{padding-left:1.5rem;padding-right:1.5rem}.px-8{padding-left:2rem;padding-right:2rem}
  .py-1\\.5{padding-top:.375rem;padding-bottom:.375rem}.py-3{padding-top:.75rem;padding-bottom:.75rem}
  .py-4{padding-top:1rem;padding-bottom:1rem}.py-6{padding-top:1.5rem;padding-bottom:1.5rem}.py-16{padding-top:4rem;padding-bottom:4rem}
  .mb-1{margin-bottom:.25rem}.mb-4{margin-bottom:1rem}.mb-6{margin-bottom:1.5rem}.mb-8{margin-bottom:2rem}.mb-10{margin-bottom:2.5rem}.mb-16{margin-bottom:4rem}.mt-0\\.5{margin-top:.125rem}
  .text-xs{font-size:.75rem;line-height:1rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-base{font-size:1rem;line-height:1.5rem}
  .text-xl{font-size:1.25rem;line-height:1.75rem}.text-3xl{font-size:1.875rem;line-height:2.25rem}.text-5xl{font-size:3rem;line-height:1}
  .font-semibold{font-weight:600}.font-bold{font-weight:700}.text-center{text-align:center}.leading-tight{line-height:1.25}.leading-relaxed{line-height:1.625}
  .bg-white{background-color:#fff}.text-gray-500{color:#6b7280}.text-gray-600{color:#4b5563}.text-gray-700{color:#374151}.text-gray-900{color:#111827}
  .text-primary-600{color:#2563eb}.text-green-600{color:#16a34a}.text-blue-600{color:#2563eb}.text-purple-600{color:#9333ea}.text-red-600{color:#dc2626}
  .bg-green-100{background-color:#dcfce7}.bg-blue-100{background-color:#dbeafe}.bg-purple-100{background-color:#f3e8ff}.bg-red-100{background-color:#fee2e2}
  .border-gray-100{border-color:#f3f4f6}.border-gray-200{border-color:#e5e7eb}.border-gray-300{border-color:#d1d5db}
  .border{border-width:1px;border-style:solid}.border-2{border-width:2px;border-style:solid}
  .rounded-full{border-radius:9999px}.rounded-lg{border-radius:.5rem}.rounded-xl{border-radius:.75rem}.rounded-2xl{border-radius:1rem}
  .shadow-sm{box-shadow:0 1px 2px 0 rgba(0,0,0,.05)}.shadow-md{box-shadow:0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -2px rgba(0,0,0,.1)}
  .bg-gradient-to-br{background-image:linear-gradient(to bottom right,var(--tw-gradient-stops))}
  .from-primary-50{--tw-gradient-from:#eff6ff;--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to,rgba(239,246,255,0))}
  .via-white{--tw-gradient-stops:var(--tw-gradient-from),#fff,var(--tw-gradient-to,rgba(255,255,255,0))}.to-purple-50{--tw-gradient-to:#faf5ff}
  .btn-primary{display:inline-flex;align-items:center;justify-content:center;background-color:#2563eb;color:#fff;font-weight:600;padding:.75rem 2rem;border-radius:.5rem;transition:background-color .2s}
  .btn-primary:hover{background-color:#1d4ed8}
  .btn-secondary{display:inline-flex;align-items:center;justify-content:center;background-color:#fff;color:#2563eb;font-weight:600;padding:.75rem 2rem;border-radius:.5rem;border:2px solid #2563eb;transition:background-color .2s}
  .container-custom{max-width:80rem;margin-left:auto;margin-right:auto;padding-left:1rem;padding-right:1rem}.section-padding{padding-top:4rem;padding-bottom:4rem}
  .grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}
  .transition-colors{transition-property:color,background-color,border-color;transition-duration:.15s}.transition-all{transition-property:all;transition-duration:.15s}
  .duration-200{transition-duration:.2s}.transition-transform{transition-property:transform;transition-duration:.15s}
  .hover\\:text-primary-600:hover{color:#2563eb}.hover\\:scale-105:hover{transform:scale(1.05)}.hover\\:border-primary-400:hover{border-color:#60a5fa}
  @media (min-width:640px){.sm\\:flex-row{flex-direction:row}.sm\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.container-custom{padding-left:1.5rem;padding-right:1.5rem}}
  @media (min-width:768px){.md\\:flex{display:flex}.md\\:hidden{display:none}.md\\:block{display:block}.md\\:h-12{height:3rem}.md\\:py-24{padding-top:6rem;padding-bottom:6rem}.md\\:text-2xl{font-size:1.5rem;line-height:2rem}.md\\:text-6xl{font-size:3.75rem;line-height:1}.md\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.section-padding{padding-top:6rem;padding-bottom:6rem}.container-custom{padding-left:1.5rem;padding-right:1.5rem}}
  @media (min-width:1024px){.container-custom{padding-left:2rem;padding-right:2rem}}
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
        <link
          rel="stylesheet"
          href="/_next/static/css/aaa50ee16a6d65d6.css"
          media="print"
          // @ts-ignore
          onLoad="this.media='all';this.onload=null"
        />
        <noscript>
          <link rel="stylesheet" href="/_next/static/css/aaa50ee16a6d65d6.css" />
        </noscript>
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
