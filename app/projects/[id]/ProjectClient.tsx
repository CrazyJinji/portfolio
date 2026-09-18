'use client';

import { useAppContext } from '@/context/AppContext';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Project } from '@/types';

interface ProjectClientProps {
  project: Project;
}

export default function ProjectClient({ project }: ProjectClientProps) {
  const { lang, t } = useAppContext();

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 min-h-screen">
      <Link 
        href="/#projects" 
        className="inline-flex items-center text-accent hover:text-accent-hover font-mono text-sm mb-12 transition-colors"
      >
        <span aria-hidden="true" className="rtl:rotate-180 inline-block me-1">&larr;</span>
        {t.projects.back}
      </Link>

      <motion.article 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="mb-12 border-b border-border/50 pb-8">
          <div className="text-sm font-mono text-accent mb-4">
            {project.category} // {project.year}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
            {project.title[lang as keyof typeof project.title]}
          </h1>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech) => (
              <span 
                key={tech} 
                className="px-4 py-1.5 text-sm font-medium rounded-lg bg-surface border border-border text-foreground shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </header>

        <section className="prose prose-slate dark:prose-invert max-w-none text-muted leading-relaxed mb-10">
          <p className="text-lg">
            {project.fullDescription?.[lang] || project.shortDescription[lang as keyof typeof project.shortDescription]}
          </p>
        </section>

        {project.demoUrl && (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    transition={{ delay: 0.3 }}
    className="flex items-center gap-4 mt-8"
  >
    {/* שימוש בתגית עוגן טבעית במקום הנתב של Next.js למניעת התנגשויות Cache */}
    <a 
      href={project.demoUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-foreground text-background font-medium hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-foreground/20"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
      {t.projects.liveDemo}
    </a>
  </motion.div>
)}
      </motion.article>
    </main>
  );
}