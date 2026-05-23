/** @type {import('next').NextConfig} */
const nextConfig = {
  // ─── Critical CSS inlining (eliminates render-blocking CSS chain) ───────────
  // Uses 'critters' under the hood to inline above-the-fold CSS and defer the rest.
  // This directly fixes the 1,027ms critical path latency flagged by Lighthouse.
  experimental: {
    optimizeCss: true,
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
