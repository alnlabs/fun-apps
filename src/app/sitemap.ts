import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: '/',
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: '/mahabharatham',
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: '/mahabharatham/community',
      changeFrequency: 'daily',
      priority: 0.7,
    },
  ]
}
