'use client';

import { useAppContext } from '@/context/AppContext';
import { motion } from 'framer-motion';

export default function Contact() {
  const { t, lang } = useAppContext();

  const contacts = [
    {
      name: 'Email',
      value: 'amir9006@gmail.com',
      link: 'mailto:amir9006@gmail.com',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
      )
    },
    {
      name: 'LinkedIn',
      value: 'Leon Krasnik',
      link: 'https://www.linkedin.com/in/leon-krasnik-456146264/',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      )
    },
    {
      name: 'GitHub',
      value: 'Source Code',
      link: 'https://github.com/CrazyJinji',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12"/></svg>
      )
    }
  ];

  return (
    <section id="contact" className="py-24 border-t border-border/30 scroll-mt-24">
      <div className="flex flex-col items-center text-center mb-16">
        <h3 className="text-4xl font-black text-foreground mb-4">
          {lang === 'he' ? 'בואו נדבר' : "Let's Talk"}
        </h3>
        <p className="text-muted text-lg max-w-lg">
          {lang === 'he' 
            ? 'זמין להזדמנויות חדשות בתחומי פיתוח תוכנה, אלקטרוניקה ושילוב מערכות.' 
            : "I'm available for new opportunities bridging software, electronics, and system integration."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contacts.map((contact, i) => (
          <motion.a
            key={contact.name}
            href={contact.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 300, damping: 20 }}
            whileHover={{ y: -5 }}
            className="flex flex-col items-center p-8 bg-surface/30 backdrop-blur-md border border-border/60 rounded-2xl hover:bg-surface/60 transition-colors shadow-sm"
          >
            <div className="p-4 bg-background rounded-full border border-border/50 text-foreground mb-4">
              {contact.icon}
            </div>
            <h4 className="font-bold text-foreground text-lg mb-1">{contact.name}</h4>
            <span className="text-sm font-mono text-muted">{contact.value}</span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}