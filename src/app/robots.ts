import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/mahabharatham', '/mahabharatham/community'],
        disallow: ['/mahabharatham/mine', '/mahabharatham/c/'],
      },
    ],
    // sitemap URL is relative — Next.js resolves it against metadataBase
    sitemap: '/sitemap.xml',
  }
}
