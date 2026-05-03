import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MetaPixel from '@/components/MetaPixel';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Riverr360 | Digital Marketing Revenue Leakage Consultation',
    template: '%s | Riverr360',
  },
  description:
    'Riverr360 helps businesses identify and fix revenue leakage through strategic consulting and data-driven solutions.',
  keywords: ['revenue leakage', 'consulting', 'marketing solutions', 'business growth'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://riverr360.vercel.app',
    siteName: 'Riverr360',
    title: 'Riverr360 | Revenue Leakage Consulting',
    description:
      'Riverr360 helps businesses identify and fix revenue leakage through strategic consulting.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Riverr360 | Revenue Leakage Consulting',
    description:
      'Riverr360 helps businesses identify and fix revenue leakage through strategic consulting.',
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

        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
