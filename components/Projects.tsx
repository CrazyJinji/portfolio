'use client';

import { useAppContext } from '@/context/AppContext';
import projectsData from '@/data/projects.json';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

// אכיפת טיפוסים למניעת שגיאות Broadening במנוע האנימציה
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 300, damping: 24 } 
  }
};

export default function Projects() {
  const { t, lang } = useAppContext();
  const currentLang = lang as 'he' | 'en';

  // הגדרת ה-ID "projects" ברמת השורש קריטית לעגינת הגלילה (Anchor Navigation)
  // השימוש ב-scroll-mt-24 מונע הסתרה של הכותרת על ידי ה-Navbar הצף
  return (
    <section id="projects" className="py-16 border-t border-border/30 scroll-mt-24">
      <h3 className="text-3xl font-bold mb-8 text-foreground">
        {t.projects.title}
      </h3>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {projectsData.map((project) => (
          <Link href={`/projects/${project.id}`} key={project.id} className="block group">
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="relative bg-surface/40 backdrop-blur-md border border-border/60 rounded-xl p-6 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_24px_-8px_rgba(0,0,0,0.4)] hover:bg-surface/60 transition-all duration-300 flex flex-col h-full cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute top-0 bottom-0 start-0 w-1 bg-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top rounded-s-xl" />
              
              <div className="relative z-10 text-sm font-mono text-accent mb-2">
                {project.category} // {project.year}
              </div>
              
              <h4 className="relative z-10 text-xl font-bold text-foreground mb-3">
  {/* שימוש ב-Assertion ישיר של שפות הפרויקט במקום typeof */}
  {project.title?.[currentLang] || t.projects.untitled}
</h4>

<p className="relative z-10 text-muted mb-6 flex-grow leading-relaxed">
  {project.shortDescription?.[currentLang] || t.projects.noDescription}
</p>
              
              <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
                {project.technologies.map(tech => (
                  <span 
                    key={tech} 
                    className="px-3 py-1 text-xs font-medium rounded-md bg-background/50 border border-border text-foreground/80 shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </section>
  );
}