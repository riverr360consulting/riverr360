import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MetaPixel from '@/components/MetaPixel';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Riverr360 | Revenue Leakage Consulting',
    template: '%s | Riverr360',
  },
  description:
    'Riverr360 helps businesses identify and fix revenue leakage through strategic consulting and data-driven solutions.',
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
      <body className={inter.className}>
        {/* ── Meta Pixel (loads after page is interactive, tracks all routes) ── */}
        <MetaPixel />
      {/* Google Tag Manager */}
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
      </body>
    </html>
  );
}
