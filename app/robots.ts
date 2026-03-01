import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://devory.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/admin',
          '/api/',
          '/auth',
          '/auth/',
          '/onboarding',
          '/onboarding/',
          '/dashboard',
          '/dashboard/',
          '/profile',
          '/profile/',
          '/saved',
          '/saved/',
          '/community/new',
          '/community/notifications',
          '/community/saved',
          '/community/following',
        ],
      },
      {
        userAgent: 'GPTBot',
        disallow: ['/'],
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: ['/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
