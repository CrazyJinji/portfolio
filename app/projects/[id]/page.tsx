import projectsData from '@/data/projects.json';
import { notFound } from 'next/navigation';
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