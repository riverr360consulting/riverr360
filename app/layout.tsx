import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NewsletterPopup from "@/components/NewsletterPopup";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Riverr360 Digital Marketing | Stop Wasting Your Marketing Budget",
  description: "Data-driven digital marketing solutions to plug revenue leaks. SEO, PPC, conversion optimization, and analytics that deliver ROI.",
  keywords: ["digital marketing", "marketing roi", "conversion optimization", "ppc management", "seo services", "marketing analytics"],
  authors: [{ name: "Riverr360 Digital Marketing" }],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: "Riverr360 Digital Marketing | Stop Wasting Your Marketing Budget",
    description: "Data-driven digital marketing solutions to plug revenue leaks and maximize ROI.",
    type: "website",
    locale: "en_US",
    images: ['/images/logo.png'],
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
        {children}
        <NewsletterPopup />
      </body>
    </html>
  );
}
