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

// ברירות המחדל חייבות להיות זהות לערכים שהשרת מרנדר ולערכים שב-layout.tsx,
// אחרת הרינדור הראשון בלקוח לא יתאים ל-HTML שהגיע מהשרת.
const DEFAULT_THEME: Theme = 'dark';
const DEFAULT_LANG: Lang = 'he';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);
  const [hydrated, setHydrated] = useState(false);

  // שלב 1: קריאת ההעדפות השמורות אחרי ההידרציה.
  // הרינדור הראשון בלקוח זהה לזה של השרת, ולכן אין hydration mismatch.
  // הסקריפט ב-layout.tsx כבר יישם את הערכים האלה על תגית ה-html לפני ה-paint,
  // אז מה שקורה כאן הוא רק סנכרון של ה-state של React למה שכבר על המסך.
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const storedLang = localStorage.getItem('lang') as Lang | null;

    if (storedTheme === 'light' || storedTheme === 'dark') setTheme(storedTheme);
    if (storedLang === 'he' || storedLang === 'en') setLang(storedLang);

    setHydrated(true);
  }, []);

  // שלב 2: החלה ושמירה. מדלג על המעבר הראשון כדי לא לדרוס
  // את הערך השמור לפני שהספקנו לקרוא אותו.
  useEffect(() => {
    if (!hydrated) return;

    const root = document.documentElement;

    root.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);

    root.setAttribute('dir', lang === 'he' ? 'rtl' : 'ltr');
    root.setAttribute('lang', lang);
    localStorage.setItem('lang', lang);
  }, [theme, lang, hydrated]);

  const toggleTheme = () => setTheme((prev: Theme) => (prev === 'light' ? 'dark' : 'light'));
  const toggleLang = () => setLang((prev: Lang) => (prev === 'he' ? 'en' : 'he'));

  const t = lang === 'he' ? he : en;

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
