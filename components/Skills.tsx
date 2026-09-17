'use client';

import { useAppContext } from '@/context/AppContext';
import { motion } from 'framer-motion';

const SKILLS_DATA = {
  hardware: ['DVM', 'Oscilloscope', 'Spectrum Analyzer', 'Multimeter', 'RF Test Equipment'],
  programming: ['TSX / TypeScript', 'React', 'Next.js', 'Python', 'C++', 'C#', 'Tailwind CSS'],
  domains: ['RF Communication', 'Satellite Systems', 'System Design & Integration', 'SAP']
};

export default function Skills() {
  const { t, lang } = useAppContext();

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-24 relative">
      <div className="flex items-center gap-4 mb-12">
        <h3 className="text-3xl font-bold text-foreground font-mono tracking-tight">
          {t.skills.title}
        </h3>
        <div className="h-px flex-1 bg-gradient-to-r from-border/80 to-transparent" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* עמודה 1: חומרה */}
        <div className="bg-surface/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:bg-surface/50 transition-colors">
          <h4 className="text-lg font-bold mb-6 text-foreground flex items-center gap-3">
            <span className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
            </span>
            {t.skills.hardware}
          </h4>
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex flex-wrap gap-2">
            {SKILLS_DATA.hardware.map(tech => (
              <motion.span variants={item} key={tech} className="px-3 py-1.5 text-xs font-mono font-medium rounded-md bg-background border border-border/60 text-muted shadow-sm">
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
        
        {/* עמודה 2: תוכנה */}
        <div className="bg-surface/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:bg-surface/50 transition-colors">
          <h4 className="text-lg font-bold mb-6 text-foreground flex items-center gap-3">
            <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            </span>
            {t.skills.programming}
          </h4>
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex flex-wrap gap-2">
            {SKILLS_DATA.programming.map(tech => (
              <motion.span variants={item} key={tech} className="px-3 py-1.5 text-xs font-mono font-medium rounded-md bg-background border border-border/60 text-muted shadow-sm">
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* עמודה 3: תחומי התמחות */}
        <div className="bg-surface/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:bg-surface/50 transition-colors">
          <h4 className="text-lg font-bold mb-6 text-foreground flex items-center gap-3">
            <span className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            </span>
            {t.skills.domains}
          </h4>
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex flex-wrap gap-2">
            {SKILLS_DATA.domains.map(tech => (
              <motion.span variants={item} key={tech} className="px-3 py-1.5 text-xs font-mono font-medium rounded-md bg-background border border-border/60 text-muted shadow-sm">
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}