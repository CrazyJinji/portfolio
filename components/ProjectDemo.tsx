'use client';

import { motion } from 'framer-motion';
import DeviceManagerMock from './DeviceManagerMock';

interface ProjectDemoProps {
  title: string;
  type: 'video' | 'iframe' | 'mock'; // הוספת mock
  src?: string;
  externalLink?: string;
}

export default function ProjectDemo({ title, type, src, externalLink }: ProjectDemoProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="w-full max-w-5xl mx-auto my-16 rounded-2xl overflow-hidden border border-border/50 bg-surface/30 backdrop-blur-md shadow-2xl"
    >
      {/* תפריט הדפדפן העליון (כמו קודם) */}
      <div className="flex items-center px-4 py-3 bg-background/80 border-b border-border/50">
        <div className="flex gap-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-surface px-4 py-1.5 rounded-md text-xs font-mono text-muted flex items-center gap-2 max-w-sm w-full truncate border border-border/30">
             {/* ... */}
             demo.device-management.local
          </div>
        </div>
      </div>

      {/* אזור התוכן: גובה קבוע כדי לדמות חלון אפליקציה */}
      <div className="relative h-[500px] bg-background w-full overflow-hidden">
        {type === 'mock' && <DeviceManagerMock />}
        {/* קוד ה-video וה-iframe שהיה כאן נשאר ללא שינוי עבור שימושים אחרים */}
      </div>
    </motion.div>
  );
}