import projectsData from '@/data/projects.json';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ProjectClient from './ProjectClient';

// תצורת מקטעי ניתוב (Route Segment Config)
export const dynamicParams = false;

// מחולל נתיבים סטטיים לטובת SSG
export function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id,
  }));
}

// הפרדת הטיפוסים כדי למנוע קריסת AST במנוע Turbopack
type ProjectPageProps = {
  params: Promise<{ id: string }>;
};

/**
 * בלי זה כל דף פרויקט יורש את ה-title והתיאור של הלייאאוט,
 * וכל התוצאות בגוגל נראות זהות.
 * העברית היא ברירת המחדל כי זה מה שהשרת מרנדר.
 */
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);

  if (!project) return {};

  const title = project.title.he;
  const description = project.shortDescription.he;
  const url = `/projects/${project.id}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      locale: 'he_IL',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

// קומפוננטת שרת אסינכרונית
export default async function ProjectPage({ params }: ProjectPageProps) {
  // פתיחת ההבטחה (Unwrapping the Promise)
  const resolvedParams = await params;
  
  // שליפת נתונים ברמת השרת
  const project = projectsData.find((p) => p.id === resolvedParams.id);
  
  if (!project) {
    notFound(); 
  }

  return <ProjectClient project={project} />;
}