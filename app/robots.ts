import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/keystatic/', '/api/'],
    },
    sitemap: 'https://www.riverr360.com/sitemap.xml', // Update with your actual domain
  };
}
