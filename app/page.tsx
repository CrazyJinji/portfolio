'use client';

import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';
import Stats from '@/components/Stats';
import Contact from '@/components/Contact';
import ContactForm from '@/components/ContactForm';
import { useAppContext } from '@/context/AppContext';
import { Moon, Sun } from 'lucide-react';

export default function Home() {
  const { toggleLang, toggleTheme, lang, theme, t } = useAppContext();

  return (
    <div className="flex flex-col min-h-screen">
      {/* תפריט ניווט צף */}
      <header className="sticky top-0 z-50 w-full bg-background/70 backdrop-blur-lg border-b border-border/50 shadow-sm transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
         <div className="flex items-center">
  <a 
    href="/" 
    aria-label={t.nav.home}
    className="block transition-transform hover:scale-105 active:scale-95 duration-200"
  >
    <img 
      src="/LK-Logo.png"
      alt="Leon Krasnik Logo" 
      className="h-12 md:h-16 w-auto object-contain dark:invert dark:brightness-200 transition-all duration-300" 
      draggable="false"
    />
  </a>
</div>
          <div className="flex items-center gap-4">
            
            <button 
              onClick={toggleLang}
              className="px-3 py-1 rounded-md bg-surface border border-border/50 font-medium text-sm transition-colors hover:bg-surface-hover"
              aria-label={t.nav.toggleLanguage}
            >
              {lang === 'he' ? 'EN' : 'עב'}
            </button>
            
            <div className="w-px h-6 bg-border mx-2" />

            <button 
              onClick={toggleTheme}
              className="p-2 rounded-md bg-surface border border-border/50 text-lg transition-colors hover:bg-surface-hover cursor-pointer flex items-center justify-center"
              aria-label={t.nav.toggleTheme}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </header>

      {/* גוף העמוד */}
      <main className="flex-grow max-w-4xl mx-auto px-6 w-full">
        <Hero />
        <Stats />
        <Skills />
        <Experience />
        <Projects />
        <ContactForm />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}