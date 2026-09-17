'use client';

import { useAppContext } from '@/context/AppContext';
import { motion, Variants } from 'framer-motion';
import resumeData from '@/data/resume.json';

export default function Experience() {
  const { lang } = useAppContext();
  
  // Type Assertion מרוכז למניעת קוד כפול בתוך פונקציית הרינדור
  const currentLang = lang as 'he' | 'en';

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: currentLang === 'he' ? 20 : -20 },
    show: { 
      opacity: 1, 
      x: 0, 
      transition: { type: "spring", stiffness: 260, damping: 20 } 
    }
  };

  return (
    <section id="experience" className="py-24 border-t border-border/30 scroll-mt-24 relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Employment Experience Column */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <h3 className="text-3xl font-bold text-foreground font-mono tracking-tight">
              {currentLang === 'he' ? 'ניסיון תעסוקתי' : 'Experience'}
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-border/80 to-transparent" />
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            /* תוקנה התנגשות המחלקות: שימוש ב-11.5px למרכוז מדויק תחת רכיב של 24px */
            className="space-y-8 relative before:absolute before:inset-0 before:start-[11.5px] before:h-full before:w-px before:bg-border/50"
          >
            {resumeData.experience.map((item) => (
              <motion.div variants={itemVariants} key={item.id} className="relative ps-10">
                <div className="absolute start-0 top-1.5 w-6 h-6 rounded-full bg-surface border-2 border-accent flex items-center justify-center shadow-[0_0_10px_rgba(var(--accent),0.2)]">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>
                
                <div className="text-xs font-mono text-accent mb-1">{item.period}</div>
                <h4 className="text-xl font-bold text-foreground mb-1">
                  {item.role[currentLang]}
                </h4>
                <div className="text-sm font-medium text-foreground/80 mb-3">
                  {item.organization[currentLang]}
                </div>
                <p className="text-muted leading-relaxed text-sm">
                  {item.description[currentLang]}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Education Column */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <h3 className="text-3xl font-bold text-foreground font-mono tracking-tight">
              {currentLang === 'he' ? 'השכלה והכשרה' : 'Education'}
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-border/80 to-transparent" />
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-8 relative before:absolute before:inset-0 before:start-[11.5px] before:h-full before:w-px before:bg-border/50"
          >
            {resumeData.education.map((item) => (
              <motion.div variants={itemVariants} key={item.id} className="relative ps-10">
                <div className="absolute start-0 top-1.5 w-6 h-6 rounded-full bg-surface border-2 border-muted flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-muted" />
                </div>
                
                <div className="text-xs font-mono text-muted mb-1">{item.period}</div>
                <h4 className="text-lg font-bold text-foreground mb-1">
                  {item.degree[currentLang]}
                </h4>
                <div className="text-sm font-medium text-foreground/80">
                  {item.organization[currentLang]}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}