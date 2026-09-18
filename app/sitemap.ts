import type { MetadataRoute } from 'next';
import projectsData from '@/data/projects.json';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...projectsData.map((project) => ({
      url: `${SITE_URL}/projects/${project.id}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    })),
  ];
}
