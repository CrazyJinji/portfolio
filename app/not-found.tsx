'use client';

import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';

export default function NotFound() {
  const { t } = useAppContext();

  return (
    <main className="max-w-4xl mx-auto px-6 min-h-[70vh] flex flex-col items-center justify-center text-center">
      <p className="font-mono text-6xl md:text-7xl font-black text-accent mb-6">404</p>

      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
        {t.notFound.title}
      </h1>

      <p className="text-muted text-lg max-w-md mb-10">{t.notFound.lead}</p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-foreground text-background font-bold hover:scale-105 active:scale-95 transition-transform duration-200 shadow-lg shadow-foreground/20"
      >
        {t.notFound.back}
      </Link>
    </main>
  );
}
