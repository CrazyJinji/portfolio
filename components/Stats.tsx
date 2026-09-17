'use client';

import { useAppContext } from '@/context/AppContext';
import { motion, animate, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

// תת-קומפוננטה לניהול האנימציה מחוץ ל-React Render Cycle
function Counter({ from, to }: { from: number; to: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView && nodeRef.current) {
      const controls = animate(from, to, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (value) => {
          if (nodeRef.current) nodeRef.current.textContent = Math.round(value).toString();
        }
      });
      return controls.stop;
    }
  }, [inView, from, to]);

  return <span ref={nodeRef} />;
}

export default function Stats() {
  const { lang } = useAppContext();
  
  const stats = [
    { value: 7, label: lang === 'he' ? 'שנות ניסיון במערכות מורכבות' : 'Years of System Experience' },
    { value: 3, label: lang === 'he' ? 'פרויקטי חומרה ותוכנה' : 'Hardware & Software Projects' },
    { value: 3, label: lang === 'he' ? 'שפות תכנות עיקריות' : 'Core Programming Languages' }
  ];

  return (
    <section className="py-12 border-t border-border/30">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center md:items-start p-6 bg-surface/20 rounded-2xl border border-border/40 backdrop-blur-sm">
            <div className="text-4xl font-black font-mono text-foreground flex items-center">
              <Counter from={0} to={stat.value} />
              <span className="text-accent ms-1">+</span>
            </div>
            <p className="text-muted mt-2 text-sm md:text-base text-center md:text-start">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}