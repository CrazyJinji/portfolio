import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // דפי ה-mockup אינם תוכן אמיתי ואין טעם שיתחרו בדפי הפרויקט על האינדוקס
      disallow: ['/api/', '/demo/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
