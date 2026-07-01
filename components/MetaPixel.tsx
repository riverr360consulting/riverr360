'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: (...args: unknown[]) => void;
  }
}

/**
 * Inner component – needs to be wrapped in <Suspense> because it uses
 * useSearchParams(), which suspends during SSR in Next.js App Router.
 */
function MetaPixelInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Fire a PageView event on every client-side navigation
  useEffect(() => {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'PageView');
    }
  }, [pathname, searchParams]);

  return null;
}

interface MetaPixelProps {
  pixelId: string;
}

/**
 * Drop <MetaPixel pixelId="..." /> into your root layout once.
 * It loads the fbevents script and tracks every page view automatically.
 */
export default function MetaPixel({ pixelId }: MetaPixelProps) {
  if (!pixelId) return null;

  return (
    <>
      {/* ── Meta Pixel base code ── */}
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `,
        }}
      />

      {/* ── NoScript fallback (shown when JS is disabled) ── */}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>

      {/* ── SPA route-change tracker ── */}
      <Suspense fallback={null}>
        <MetaPixelInner />
      </Suspense>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Helper functions – call these anywhere in your app to track custom events
// ─────────────────────────────────────────────────────────────────────────────

/** Track a standard or custom Meta event */
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', eventName, params);
  }
}

/** Track a contact form submission */
export function trackContact() {
  trackEvent('Contact');
}

/** Track a lead (e.g. newsletter sign-up) */
export function trackLead(params?: Record<string, unknown>) {
  trackEvent('Lead', params);
}

/** Track when someone views a key page (e.g. case study) */
export function trackViewContent(contentName: string, contentCategory?: string) {
  trackEvent('ViewContent', {
    content_name: contentName,
    content_category: contentCategory,
  });
}
