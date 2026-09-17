'use client';
import React, { useState } from 'react';
import { 
  Globe, Search, MapPin, Building, Percent, BellRing, Umbrella, 
  Rocket, Plane, ShieldCheck, Dumbbell, Waves, Martini, Utensils, Sun 
} from 'lucide-react';

export default function AtlasPrimeMainMock() {
  const [lang, setLang] = useState<'he' | 'en' | 'ru'>('he');
  const isRtl = lang === 'he';

  // צבעי המערכת
  const bgMain = 'bg-[#0B121F]';
  const bgCard = 'bg-[#151F32]';
  const accentGold = 'text-[#C5A572]';
  const borderSubtle = 'border-[#23314B]';

  return (
    <div className={`min-h-full ${bgMain} text-slate-200 w-full ${isRtl ? 'text-right' : 'text-left'} font-sans pb-10`} dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* פאנל שליטה i18n (לפורטפוליו) */}
      <div className="fixed top-20 right-4 z-50 bg-[#151F32]/90 backdrop-blur-md border border-[#23314B] rounded-xl p-2 shadow-2xl flex flex-col gap-2" dir="ltr">
        <div className="text-[10px] text-slate-400 font-mono text-center mb-1 flex items-center justify-center gap-1"><Globe size={12}/> i18n Demo</div>
        <button onClick={() => setLang('he')} className={`px-4 py-1.5 rounded text-xs font-bold transition-all ${lang === 'he' ? 'bg-[#C5A572] text-[#0B121F]' : 'bg-slate-800 text-white'}`}>HE</button>
        <button onClick={() => setLang('en')} className={`px-4 py-1.5 rounded text-xs font-bold transition-all ${lang === 'en' ? 'bg-[#C5A572] text-[#0B121F]' : 'bg-slate-800 text-white'}`}>EN</button>
      </div>

      {/* Navbar */}
      <nav className="border-b border-[#23314B] bg-[#0B121F]/90 backdrop-blur-md sticky top-0 z-40 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="text-center leading-none">
            <Globe className="mx-auto mb-1 text-slate-400" size={20} />
            <span className="text-[10px] font-bold tracking-widest text-slate-300">ATLAS<br/>PRIME</span>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium">
          <span className="hover:text-white cursor-pointer">דף הבית</span>
          <div className="border border-[#23314B] bg-[#151F32] px-3 py-1.5 rounded-md flex items-center gap-2 text-xs">
            <Globe size={14} /> HE 
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section 1: Hero & Filter */}
        <section className="pt-20 pb-16 text-center">
          <h1 className={`${accentGold} text-5xl md:text-6xl font-serif font-bold mb-4 tracking-wide`}>Sea Breeze Resort</h1>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">באקו, אזרבייג'ן</h2>
          <p className="text-slate-400 mb-12">הזדמנות ההשקעה שלכם בעיר הריזורט היוקרתית ביותר על חוף הים הכספי.</p>
          
          {/* Filter Bar */}
          <div className={`${bgCard} border ${borderSubtle} p-4 rounded-xl flex flex-wrap gap-4 items-end shadow-lg`}>
            <div className="flex-1 min-w-[150px]">
              <label className="block text-xs text-slate-400 mb-2 font-medium">בחרו את ההשקעה שלכם</label>
              <select className={`w-full bg-transparent border ${borderSubtle} rounded-md p-2.5 text-sm text-slate-300 outline-none`}>
                <option>כל סוגי הסוויטות</option>
              </select>
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="block text-xs text-slate-400 mb-2 invisible">סוג נוף</label>
              <select className={`w-full bg-transparent border ${borderSubtle} rounded-md p-2.5 text-sm text-slate-300 outline-none`}>
                <option>כל סוגי הנוף</option>
              </select>
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="block text-xs text-slate-400 mb-2 invisible">תקציב</label>
              <input type="text" placeholder="תקציב מקסימלי (₪)" className={`w-full bg-transparent border ${borderSubtle} rounded-md p-2.5 text-sm text-slate-300 outline-none`} />
            </div>
            <button className="bg-[#1E293B] hover:bg-[#2A3B54] text-slate-300 text-sm font-medium px-6 py-2.5 rounded-md transition-colors border border-[#23314B]">
              נקה סינון
            </button>
          </div>
        </section>

        {/* Section 2: Property Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {[1, 2].map((item) => (
            <div key={item} className={`${bgCard} border ${borderSubtle} rounded-2xl overflow-hidden shadow-xl hover:border-[#C5A572]/50 transition-colors`}>
              <div className="h-48 bg-slate-800 relative">
                {/* Placeholder for image */}
                <div className="absolute top-3 right-3 bg-[#C5A572] text-[#0B121F] text-xs font-bold px-3 py-1 rounded-md shadow-md">
                  זמין להשקעה
                </div>
                <div className="absolute bottom-3 left-3 bg-[#0B121F]/80 backdrop-blur-sm border border-[#23314B] text-xs font-medium px-3 py-1.5 rounded-md flex items-center gap-2">
                  <MapPin size={12} className={accentGold} /> Sea Breeze, Baku
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-2">בדיקה{item === 2 ? '2' : ''}</h3>
                <p className="text-sm text-slate-400 mb-6">סוויטת 2 חדרי שינה | קו ראשון לים</p>
                <div className="grid grid-cols-3 gap-2 border-t border-[#23314B] pt-4 text-center">
                  <div>
                    <span className="block text-[10px] text-slate-500 mb-1">מחיר השקעה</span>
                    <span className="text-sm font-bold text-white">₪12M</span>
                  </div>
                  <div className="border-x border-[#23314B]">
                    <span className="block text-[10px] text-slate-500 mb-1">תשואה צפויה</span>
                    <span className="text-sm font-bold text-green-400">~ 10%</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 mb-1">שטח</span>
                    <span className="text-sm font-bold text-white">120 מ"ר</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Section 3: Business Model */}
        <section className={`${bgCard} border ${borderSubtle} rounded-3xl p-10 mb-24 relative overflow-hidden`}>
          <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#C5A572] to-transparent opacity-50" />
          <h2 className="text-3xl font-bold text-center text-white mb-12">המודל העסקי: הכנסה פסיבית בראש שקט</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center mb-16">
            <div className="flex flex-col items-center">
              <Rocket size={40} className={`${accentGold} mb-4`} />
              <h3 className="text-lg font-bold text-white mb-2">פוטנציאל השבחה</h3>
              <p className="text-xs text-slate-400 leading-relaxed">קנייה בשלבים מוקדמים מבטיחה עליית ערך משמעותית עם האכלוס.</p>
            </div>
            <div className="flex flex-col items-center">
              <Umbrella size={40} className={`${accentGold} mb-4`} />
              <h3 className="text-lg font-bold text-white mb-2">ימי נופש לבעלים</h3>
              <p className="text-xs text-slate-400 leading-relaxed">נהנים מהשקעה מניבה, וגם מחופשה שנתית בסוויטה שלכם.</p>
            </div>
            <div className="flex flex-col items-center">
              <BellRing size={40} className={`${accentGold} mb-4`} />
              <h3 className="text-lg font-bold text-white mb-2">ניהול מלונאי מלא</h3>
              <p className="text-xs text-slate-400 leading-relaxed">חברת הניהול של הריזורט מטפלת באורחים, בניקיון ובתחזוקה.</p>
            </div>
            <div className="flex flex-col items-center">
              <Percent size={40} className={`${accentGold} mb-4`} />
              <h3 className="text-lg font-bold text-white mb-2">~10% תשואה צפויה</h3>
              <p className="text-xs text-slate-400 leading-relaxed">צפי תשואה שנתית גבוהה משכירות תיירותית.</p>
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto border-t border-[#23314B] pt-10">
            <h2 className="text-2xl font-bold text-white mb-4">למה להשקיע בבאקו?</h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-8">
              באקו, בירת אזרבייג'ן, הפכה בשנים האחרונות ל"דובאי של הקווקז". עם צמיחה כלכלית מואצת, פיתוח תשתיות מסיבי והשקעות ענק, היא מושכת תיירות בינלאומית מכל העולם.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-3 bg-[#0B121F] border border-[#23314B] px-5 py-3 rounded-xl">
                <ShieldCheck className={accentGold} />
                <div className="text-right">
                  <h4 className="text-sm font-bold text-white">בטוח וידידותי לישראלים</h4>
                  <p className="text-[10px] text-slate-500">מדינה חילונית, בטוחה במיוחד ובעלת קשרים חמים עם ישראל.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-[#0B121F] border border-[#23314B] px-5 py-3 rounded-xl">
                <Plane className={accentGold} />
                <div className="text-right">
                  <h4 className="text-sm font-bold text-white">קרוב ונגיש</h4>
                  <p className="text-[10px] text-slate-500">רק כ-3 שעות טיסה ישירה מתל אביב.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Amenities */}
        <section className="mb-24 text-center">
          <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Waves className={accentGold} /> ברוכים הבאים ל- Sea Breeze
          </h2>
          <p className="text-sm text-slate-400 mb-12 max-w-2xl mx-auto">
            הרבה יותר מעוד פרויקט נדל"ן. עיר-ריזורט אקסקלוסיבית המשתרעת על רצועת חוף פרטית מרהיבה בים הכספי, ומציעה לאורחיה ולמשקיעים חווית פרימיום ברמה עולמית.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { icon: <Dumbbell/>, title: 'כושר וספא VIP', desc: 'מרכזי בריאות, טיפולים יומיים ומתקני ספורט פרימיום.' },
              { icon: <Waves/>, title: 'בריכות אינסוף', desc: 'מתחמי מים ענקיים המשקיפים אל האופק והים.' },
              { icon: <Martini/>, title: 'מועדוני חוף', desc: 'חיי פנאי תוססים, ברים על המים ואווירת חופש אמיתית.' },
              { icon: <Utensils/>, title: 'מסעדות שף', desc: 'מגוון קולינרי בינלאומי ברמה הגבוהה ביותר.' },
              { icon: <Sun/>, title: 'טיילת וחוף פרטי', desc: 'קילומטרים של חופי ים מטופחים וטיילת מרהיבה.' }
            ].map((item, idx) => (
              <div key={idx} className={`${bgCard} border ${borderSubtle} p-6 rounded-2xl flex flex-col items-center hover:bg-[#1E293B] transition-colors`}>
                <div className="w-12 h-12 rounded-full bg-[#0B121F] flex items-center justify-center mb-4 border border-[#23314B] text-white">
                  {item.icon}
                </div>
                <h4 className="text-sm font-bold text-white mb-2">{item.title}</h4>
                <p className="text-[10px] text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Contact Form */}
        <section className="max-w-xl mx-auto mb-20 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">מתעניינים בהשקעה?</h2>
          <p className="text-sm text-slate-400 mb-8">השאירו פרטים ונשלח לכם את התוכנית העסקית המלאה.</p>
          
          <form className="flex flex-col gap-4">
            <input type="text" placeholder="שם מלא" className={`w-full bg-[#151F32] border ${borderSubtle} rounded-lg p-3 text-sm text-white outline-none focus:border-[#C5A572] transition-colors`} />
            <input type="email" placeholder="אימייל" className={`w-full bg-[#151F32] border ${borderSubtle} rounded-lg p-3 text-sm text-white outline-none focus:border-[#C5A572] transition-colors`} />
            <input type="tel" placeholder="מספר טלפון" className={`w-full bg-[#151F32] border ${borderSubtle} rounded-lg p-3 text-sm text-white outline-none focus:border-[#C5A572] transition-colors`} />
            <textarea placeholder="הודעה (אופציונלי)" rows={3} className={`w-full bg-[#151F32] border ${borderSubtle} rounded-lg p-3 text-sm text-white outline-none focus:border-[#C5A572] transition-colors`} />
            <button type="button" className="w-full bg-[#C5A572] hover:bg-[#b09365] text-[#0B121F] font-bold py-3.5 rounded-lg transition-colors mt-2">
              שלח פרטים
            </button>
          </form>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#23314B] bg-[#0B121F] pt-12 pb-6 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div className="flex flex-col items-start gap-4">
            <div className="text-center leading-none inline-block">
              <Globe className="mx-auto mb-1 text-slate-400" size={24} />
              <span className="text-xs font-bold tracking-widest text-slate-300">ATLAS PRIME</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              סוכנות הנדל"ן המובילה למציאת נכסי יוקרה והבתים המושלמים עבורכם. אנו מלווים אתכם כל הדרך עד למפתח, במקצועיות, שקיפות ואמינות.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-4">קישורים מהירים</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li className="hover:text-[#C5A572] cursor-pointer transition-colors">דף הבית</li>
              <li className="hover:text-[#C5A572] cursor-pointer transition-colors">נכסים למכירה</li>
              <li className="hover:text-[#C5A572] cursor-pointer transition-colors">אודותינו</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-4">יצירת קשר</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li className="flex items-center gap-2"><span className="text-[#C5A572]">📞</span> טלפון: 050-12345678</li>
              <li className="flex items-center gap-2"><span className="text-[#C5A572]">✉️</span> אימייל: info@atlasprime.co.il</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-[10px] text-slate-600 border-t border-[#23314B] pt-6">
          © 2026 ATLAS PRIME. כל הזכויות שמורות.
        </div>
      </footer>

    </div>
  );
}