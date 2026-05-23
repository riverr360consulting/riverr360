/** @type {import('next').NextConfig} */
const nextConfig = {
  // ─── Target modern browsers only ─────────────────────────────────────────────
  // Stops Next.js/SWC from transpiling ES6+ features (arrow functions, async/await,
  // optional chaining, etc.) that all modern browsers have supported natively for
  // years. Saves ~24 KiB of unnecessary polyfill/transform overhead per Lighthouse.
  //
  // "last 2 chrome versions, last 2 firefox versions, last 2 safari versions" covers
  // ~95%+ of real traffic. Adjust if you have analytics showing significant legacy
  // browser usage (IE11, very old iOS Safari, etc.).
  experimental: {
    browsersListForSwc: true,
  },
  // ─── Compression ─────────────────────────────────────────────────────────────
  compress: true,

  // ─── Image optimisation ──────────────────────────────────────────────────────
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/avif', 'image/webp'], // serve modern formats automatically
  },

  // ─── HTTP headers ────────────────────────────────────────────────────────────
  async headers() {
    return [
      {
        // Cache static Next.js assets forever (they're content-hashed)
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache HTML pages at edge for 1 day, serve stale while revalidating
        // This cuts the 551ms TTFB for repeat / CDN-cached visitors
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=86400, stale-while-revalidate=59',
          },
        ],
      },
    ];
  },

  // ─── Redirects ───────────────────────────────────────────────────────────────
  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index.php',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
