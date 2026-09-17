'use client';


import React, { createContext, useContext, useState, useEffect } from 'react';
import he from '../locales/he.json';
import en from '../locales/en.json';

type Theme = 'light' | 'dark';
type Lang = 'he' | 'en';

interface AppContextType {
  theme: Theme;
  lang: Lang;
  t: typeof he;
  toggleTheme: () => void;
  toggleLang: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [lang, setLang] = useState<Lang>('he');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // אתחול צד לקוח למניעת Hydration mismatch
    const storedTheme = localStorage.getItem('theme') as Theme || 'dark';
    const storedLang = localStorage.getItem('lang') as Lang || 'he';
    setTheme(storedTheme);
    setLang(storedLang);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    
    // ניהול Theme
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);

    // ניהול i18n ו-RTL/LTR
    root.setAttribute('dir', lang === 'he' ? 'rtl' : 'ltr');
    root.setAttribute('lang', lang);
    localStorage.setItem('lang', lang);

  }, [theme, lang, mounted]);

 const toggleTheme = () => setTheme((prev: Theme) => (prev === 'light' ? 'dark' : 'light'));
 const toggleLang = () => setLang((prev: Lang) => (prev === 'he' ? 'en' : 'he'));

  const t = lang === 'he' ? he : en;

  // מניעת רינדור עד לסיום טעינת ההעדפות בלקוח
  if (!mounted) return <div className="min-h-screen bg-slate-900" />;

  return (
    <AppContext.Provider value={{ theme, lang, t, toggleTheme, toggleLang }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};