'use client';

import { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const { t, lang } = useAppContext();
  
  // ניהול הנתונים והסטטוס (Controlled Component)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // לוגיקת השליחה מול ה-API האמיתי
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // אנו מעבירים את ה-subject גם כשדה phone כדי לתמוך בארכיטקטורת ה-API שבנינו
        body: JSON.stringify({ ...formData, phone: formData.subject }), 
      });

      if (!res.ok) throw new Error('Network failure');
      
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' }); // איפוס
      
      setTimeout(() => setStatus('idle'), 3000); // חזרה למצב התחלתי
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000); // איפוס השגיאה לאחר 3 שניות
    }
  };

  // מחלקות CSS משותפות לשדות הקלט לשמירה על עקביות (DRY)
  const inputClasses = "w-full bg-background/50 border border-border/50 rounded-xl px-4 py-3 text-foreground placeholder:text-muted/70 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200";
  const labelClasses = "block text-sm font-medium text-foreground/90 mb-2";

  return (
    <div className="w-full max-w-2xl mx-auto mt-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-surface/30 backdrop-blur-md border border-border/60 rounded-3xl p-8 shadow-lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* שורה 1: שם ודוא"ל (גריד מפוצל במסכים רחבים) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className={labelClasses}>
                {t.contactForm?.name || (lang === 'he' ? 'שם' : 'Name')}
              </label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t.contactForm?.namePlaceholder || 'Your name'} 
                className={inputClasses} 
              />
            </div>
            <div>
              <label htmlFor="email" className={labelClasses}>
                {t.contactForm?.email || (lang === 'he' ? 'דוא"ל' : 'Email')}
              </label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required
                dir="ltr" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder={t.contactForm?.emailPlaceholder || 'your@email.com'} 
                className={`${inputClasses} ${lang === 'he' ? 'text-end placeholder:text-end' : ''}`} 
              />
            </div>
          </div>

          {/* שורה 2: נושא */}
          <div>
            <label htmlFor="subject" className={labelClasses}>
              {t.contactForm?.subject || (lang === 'he' ? 'נושא' : 'Subject')}
            </label>
            <input 
              type="text" 
              id="subject" 
              name="subject" 
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder={t.contactForm?.subjectPlaceholder || "What's this about?"} 
              className={inputClasses} 
            />
          </div>

          {/* שורה 3: תוכן ההודעה */}
          <div>
            <label htmlFor="message" className={labelClasses}>
              {t.contactForm?.message || (lang === 'he' ? 'הודעה' : 'Message')}
            </label>
            <textarea 
              id="message" 
              name="message" 
              rows={5} 
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder={t.contactForm?.messagePlaceholder || "Tell me about your project..."} 
              className={`${inputClasses} resize-y min-h-[120px]`} 
            ></textarea>
          </div>

          {/* כפתור שליחה */}
          <div className="pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={status === 'loading'}
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 text-white font-semibold shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:bg-blue-500 hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : status === 'success' ? (
                <span>✔️</span>
              ) : status === 'error' ? (
                <span>❌</span>
              ) : (
                <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}

              {status === 'loading' ? (t.contactForm?.sending || (lang === 'he' ? 'שולח...' : 'Sending...')) : 
               status === 'success' ? (lang === 'he' ? 'ההודעה נשלחה' : 'Message Sent') :
               status === 'error' ? (lang === 'he' ? 'שגיאה בשליחה' : 'Error Sending') :
               (t.contactForm?.send || (lang === 'he' ? 'שליחת הודעה' : 'Send Message'))}
            </motion.button>
          </div>

        </form>
      </motion.div>
    </div>
  );
}