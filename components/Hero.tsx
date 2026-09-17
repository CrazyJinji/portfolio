'use client';

import { useAppContext } from '@/context/AppContext';
import { motion, type TargetAndTransition } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  const { t, lang } = useAppContext();

  // הגדרת אנימציית הריחוף הרציף לאלמנט הוויזואלי
  const floatingAnimation: TargetAndTransition = {
    y: ['-10px', '10px', '-10px'],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  };

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 min-h-[85vh] flex items-center">
      
      {/* פריסת גריד דו-עמודית */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 w-full items-center">
        
        {/* עמודת טקסט ופעולות (ימין ב-RTL) */}
        <div className="flex flex-col items-start relative z-10 order-2 lg:order-1">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/80 border border-border/80 mb-8 backdrop-blur-md shadow-sm"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
            </span>
            <span className="text-sm font-mono font-semibold text-foreground/90">
              {lang === 'he' 
                ? 'זמין לפרויקטים חדשים' 
                : 'Available for new projects'}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[1.1] mb-6"
          >
            <span className="text-foreground">
              {lang === 'he' ? 'הנדסאי אלקטרוניקה' : 'Practical Electronic Engineer &'}
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-blue-500">
              {lang === 'he' ? 'ומערכות RF.' : 'RF Systems.'}
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted max-w-lg leading-relaxed mb-10"
          >
            {lang === 'he' 
              ? 'אני לאון קרסניק. מגשר על הפער שבין חומרה פיזית לארכיטקטורת תוכנה, תוך יצירת פתרונות מהירים, יציבים ומבוססי נתונים.' 
              : "I'm Leon Krasnik. Bridging the gap between physical hardware and digital architecture, creating fast, robust, and data-driven solutions."}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a 
              href="#projects" 
              className="group flex items-center gap-2 px-8 py-4 rounded-full bg-foreground text-background font-bold hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-foreground/20"
            >
              {t.projects.title || (lang === 'he' ? 'צפייה בפרויקטים' : 'View Projects')}
              <svg className="w-5 h-5 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            
            <a 
  href={lang === 'he' ? '/cv/Leon_Krasnik_CV_HE.pdf' : '/cv/Leon_Krasnik_CV_EN.pdf'} 
  download
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 px-8 py-4 rounded-full bg-surface border-2 border-border text-foreground font-bold hover:bg-surface-hover hover:border-accent/50 hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-sm"
>
  <svg className="w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
  {lang === 'he' ? t.hero.cv_he : t.hero.cv_en}
</a>
          </motion.div>
        </div>

        {/* עמודה ויזואלית מרחפת (שמאל ב-RTL) */}
<motion.div 
  initial={{ opacity: 0, filter: "blur(20px)" }}
  animate={{ opacity: 1, filter: "blur(0px)" }}
  transition={{ duration: 0.8, delay: 0.2 }}
  className="relative flex justify-center lg:justify-end items-center order-1 lg:order-2 w-full h-[400px] lg:h-[500px]"
>
  {/* בסיס זוהר (Glow Base) */}
  <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-blue-500/20 rounded-full blur-[80px] -z-10" />
  
  {/* אלמנט מרחף הכולל את תמונת הפרופיל */}
  <motion.div 
  animate={floatingAnimation}
  className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-[2rem] border border-border/50 shadow-2xl overflow-hidden flex items-center justify-center bg-surface"
>
  {/* תמונת הפרופיל - ארכיטקטורת Fill ו-Priority */}
  <Image 
    src="/profile.png" 
    alt="Leon Krasnik" 
    fill
    priority
    sizes="(max-width: 1024px) 18rem, 24rem"
    className="object-cover transition-transform duration-500 hover:scale-105" 
    draggable={false}
  />
</motion.div>

  {/* תגיות צפות סביב האלמנט הוויזואלי ליצירת עומק */}
  <motion.div 
    animate={{ y: ["10px", "-10px", "10px"] }} 
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    className="absolute top-10 right-10 px-4 py-2 bg-surface/90 backdrop-blur-md border border-border rounded-xl shadow-lg font-mono text-xs text-foreground"
  >
    TypeScript / Python
  </motion.div>
  
  <motion.div 
    animate={{ y: ["-15px", "15px", "-15px"] }} 
    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    className="absolute bottom-10 left-10 px-4 py-2 bg-surface/90 backdrop-blur-md border border-border rounded-xl shadow-lg font-mono text-xs text-foreground"
  >
    RF Engineering
  </motion.div>
</motion.div>
      </div>
    </section>
  );
}