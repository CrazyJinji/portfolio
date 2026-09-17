'use client';
import React, { useState } from 'react';
import { Globe } from 'lucide-react';

// פונקציות העזר المקוריות
const getViewText = (viewType: string, lang: string) => {
  if (lang === 'he') {
    switch (viewType) {
      case 'sea': return 'קו ראשון לים 🌊';
      case 'pool': return 'נוף לבריכה 🏊‍♂️';
      case 'garden': return 'נוף לפארק 🌳';
      default: return 'נוף מרהיב ✨';
    }
  } else if (lang === 'ru') {
    switch (viewType) {
      case 'sea': return 'Первая линия у моря 🌊';
      case 'pool': return 'Вид на бассейн 🏊‍♂️';
      case 'garden': return 'Вид на парк 🌳';
      default: return 'Захватывающий вид ✨';
    }
  } else {
    switch (viewType) {
      case 'sea': return 'First Line to Sea 🌊';
      case 'pool': return 'Pool View 🏊‍♂️';
      case 'garden': return 'Park View 🌳';
      default: return 'Spectacular View ✨';
    }
  }
};

const getSuiteName = (rooms: number | string, lang: string) => {
  const num = Number(rooms);
  if (lang === 'he') {
    if (num === 1) return 'סוויטת סטודיו';
    if (num === 2) return 'סוויטת חדר שינה וסלון';
    if (num === 3) return 'סוויטת 2 חדרי שינה';
    if (num >= 4) return 'פנטהאוז יוקרתי';
    return `${rooms} חדרים`;
  } else if (lang === 'ru') {
    if (num === 1) return 'Студия';
    if (num === 2) return 'Сьют с 1 спальней';
    if (num === 3) return 'Сьют с 2 спальнями';
    if (num >= 4) return 'Роскошный пентхаус';
    return `${rooms} Комнаты`;
  } else {
    if (num === 1) return 'Studio Suite';
    if (num === 2) return '1 Bedroom Suite';
    if (num === 3) return '2 Bedroom Suite';
    if (num >= 4) return 'Luxury Penthouse';
    return `${rooms} Rooms`;
  }
};

// Mock Data - המחליף את קריאת ה-API לשרת ה-Django
const MOCK_PROPERTY = {
  id: 1,
  title_he: 'ריזורט Sea Breeze - סוויטת יוקרה',
  title_en: 'Sea Breeze Resort - Luxury Suite',
  title_ru: 'Курорт Sea Breeze - Роскошный люкс',
  description_he: 'הזדמנות יוצאת דופן להשקעה בריזורט Sea Breeze היוקרתי. סוויטה מעוצבת בניהול מלונאי מלא המעניקה למשקיעים הכנסה פסיבית בראש שקט, לצד ימי נופש שנתיים לבעלים.',
  description_en: 'An extraordinary investment opportunity in the luxurious Sea Breeze Resort. A designed suite under full hotel management, providing investors with peace of mind passive income alongside annual vacation days for the owners.',
  description_ru: 'Необыкновенная возможность для инвестиций в роскошном курорте Sea Breeze. Дизайнерский сьют под полным гостиничным управлением, обеспечивающий инвесторам пассивный доход без забот.',
  rooms: 3,
  view_type: 'sea',
  price: 1850000,
  sq_meters: 85,
  is_active: true,
  // שימוש בתמונת פלייסחולדר יוקרתית מאחר והשרת המקורי עשוי להיות כבוי
  image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1600&q=80'
};

export default function AtlasPrimeMock() {
  // ניהול שפה לוקאלי להדגמת היכולות למראיין, ללא תלות בקונטקסט החיצוני
  const [lang, setLang] = useState<'he' | 'en' | 'ru'>('he');
  const isRtl = lang === 'he';
  const property = MOCK_PROPERTY;

  const displayTitle = lang === 'he' ? property.title_he 
                     : lang === 'ru' ? property.title_ru 
                     : property.title_en;
                     
  const displayDescription = lang === 'he' ? property.description_he 
                           : lang === 'ru' ? property.description_ru 
                           : property.description_en;

  return (
    <div className={`min-h-full bg-[#121C2B] text-white w-full ${isRtl ? 'text-right' : 'text-left'} relative font-sans`} dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* פאנל שליטה להדגמה - כלי ארכיטקטוני המציג את הלוגיקה שלך */}
      <div className="fixed top-20 right-4 z-50 bg-[#1A2639] border border-gray-600 rounded-xl p-2 shadow-2xl flex flex-col gap-2" dir="ltr">
        <div className="text-[10px] text-gray-400 font-mono text-center mb-1 flex items-center justify-center gap-1"><Globe size={12}/> i18n Demo</div>
        <button onClick={() => setLang('he')} className={`px-4 py-2 rounded text-sm font-bold transition-all ${lang === 'he' ? 'bg-[#C5A572] text-[#121C2B]' : 'bg-gray-800 text-white hover:bg-gray-700'}`}>עברית (RTL)</button>
        <button onClick={() => setLang('en')} className={`px-4 py-2 rounded text-sm font-bold transition-all ${lang === 'en' ? 'bg-[#C5A572] text-[#121C2B]' : 'bg-gray-800 text-white hover:bg-gray-700'}`}>English (LTR)</button>
        <button onClick={() => setLang('ru')} className={`px-4 py-2 rounded text-sm font-bold transition-all ${lang === 'ru' ? 'bg-[#C5A572] text-[#121C2B]' : 'bg-gray-800 text-white hover:bg-gray-700'}`}>Русский (LTR)</button>
      </div>

      <div className="max-w-4xl mx-auto bg-[#1A2639] rounded-2xl shadow-2xl overflow-hidden border border-gray-700 my-10 relative z-10">
        
        {/* תמונת הסוויטה */}
        <div className="h-[300px] md:h-[450px] w-full relative">
          <img src={property.image} alt={displayTitle} className="w-full h-full object-cover" />
          <div className={`absolute top-4 ${isRtl ? 'right-4' : 'left-4'} bg-[#C5A572] text-[#121C2B] font-bold px-6 py-2 rounded-lg shadow-lg whitespace-nowrap`}>
            {property.is_active 
              ? (lang === 'he' ? 'זמין להשקעה' : lang === 'ru' ? 'Доступно' : 'Available') 
              : (lang === 'he' ? 'נמכר' : lang === 'ru' ? 'Продано' : 'Sold')}
          </div>
          <div className={`absolute bottom-4 ${isRtl ? 'left-4' : 'right-4'} bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-gray-600 font-medium tracking-wide`}>
            📍 Sea Breeze Resort, Baku 🇦🇿
          </div>
        </div>

        {/* פרטי ההשקעה */}
        <div className="p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{displayTitle}</h1>
          <p className="text-xl md:text-2xl text-[#C5A572] mb-8 font-medium">
            {getSuiteName(property.rooms, lang)} | {getViewText(property.view_type, lang)}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 bg-[#121C2B] p-4 md:p-6 rounded-xl border border-gray-700 mb-10">
            <div className="text-center">
              <span className="block text-gray-400 text-xs md:text-sm mb-2">{lang === 'he' ? 'מחיר השקעה' : lang === 'ru' ? 'Цена инвестиции' : 'Investment Price'}</span>
              <span className="text-xl md:text-2xl font-bold text-[#C5A572]" dir="ltr">₪{Number(property.price).toLocaleString()}</span>
            </div>
            <div className={`text-center ${isRtl ? 'border-r' : 'border-l'} border-gray-700`}>
              <span className="block text-gray-400 text-xs md:text-sm mb-2">{lang === 'he' ? 'תשואה צפויה' : lang === 'ru' ? 'Ожидаемый ROI' : 'Expected ROI'}</span>
              <span className="text-xl md:text-2xl font-bold text-green-400" dir="ltr">~ 10%</span>
            </div>
            <div className={`text-center ${isRtl ? 'border-r' : 'border-l'} border-gray-700 mt-4 md:mt-0`}>
              <span className="block text-gray-400 text-xs md:text-sm mb-2">{lang === 'he' ? 'שטח הסוויטה' : lang === 'ru' ? 'Площадь сьюта' : 'Suite Area'}</span>
              <span className="text-xl md:text-2xl font-bold text-white">{property.sq_meters} {lang === 'he' ? 'מ"ר' : lang === 'ru' ? 'кв.м' : 'sqm'}</span>
            </div>
            <div className={`text-center ${isRtl ? 'border-r' : 'border-l'} border-gray-700 mt-4 md:mt-0`}>
              <span className="block text-gray-400 text-xs md:text-sm mb-2">{lang === 'he' ? 'מודל ניהול' : lang === 'ru' ? 'Управление' : 'Management'}</span>
              <span className="text-lg md:text-xl font-bold text-white">{lang === 'he' ? 'מלונאי מלא 🛎️' : lang === 'ru' ? 'Полное гостиничное 🛎️' : 'Full Hotel 🛎️'}</span>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#C5A572] mb-4">
              {lang === 'he' ? 'על ההשקעה' : lang === 'ru' ? 'Об инвестиции' : 'About the Investment'}
            </h2>
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap text-lg">
              {displayDescription}
            </p>
          </div>
          
          {/* Mock Contact Form Area */}
          <div className="border border-gray-700 bg-[#121C2B] p-8 rounded-2xl shadow-inner relative overflow-hidden text-center opacity-70">
            <div className="absolute top-0 right-0 left-0 h-1 bg-[#C5A572]"></div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {lang === 'he' ? 'לקבלת התוכנית העסקית המלאה' : lang === 'ru' ? 'Получить полный бизнес-план' : 'Get the Full Business Plan'}
            </h3>
            <p className="text-gray-400 mb-4">
              {lang === 'he' ? 'טופס יצירת הקשר הושבת בסביבת ההדגמה.' : 'Contact form is disabled in demo environment.'}
            </p>
            <button disabled className="bg-gray-700 text-gray-400 font-bold py-3 px-8 rounded-lg cursor-not-allowed">
              Submit (Mock)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}