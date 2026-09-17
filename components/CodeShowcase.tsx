'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Code2, Cpu, Zap, Globe } from 'lucide-react'; // נוסף Globe

interface CodeSnippet {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  code: string;
}

const snippets: CodeSnippet[] = [
  {
    id: 'opt-filtering',
    title: 'O(1) Boundary Calculation & O(N) Filtering',
    icon: <Zap size={18} />,
    description: 'מניעת חישובי תאריכים מיותרים בתוך לולאת הסינון על ידי חישוב גבולות ה-Timestamp מראש, שימוש ב-useMemo למניעת רינדור עודף.',
    code: `const filteredTasks = useMemo(() => {
  // 1. חישוב גבולות התאריכים מראש (מחוץ ללולאה) O(1)
  let startTimestamp = 0;
  let endTimestamp = Infinity;

  if (startDate) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    startTimestamp = start.getTime();
  }

  // 2. ריצת סינון O(N) מבלי להקצות אובייקטים חדשים
  return tasks.filter(task => {
    const matchesSearch = task.device.serialNumber.toLowerCase().includes(searchLower);
    const taskTime = new Date(task.expectedCompletion).getTime();
    const matchesDate = taskTime >= startTimestamp && taskTime <= endTimestamp;

    return matchesSearch && matchesDate;
  });
}, [tasks, searchTerm, startDate, endDate]);`
  },
  {
    id: 'offline-sync',
    title: 'Offline-First & Idempotency',
    icon: <Cpu size={18} />,
    description: 'הבטחת אמינות נתונים בסביבה דלת-קליטה באמצעות תור סנכרון מקומי (IndexedDB) והזרקת X-Idempotency-Key למניעת כפילויות בשרת.',
    code: `const processSaveQueue = useCallback(async () => {
  if (isSyncingRef.current) return;
  isSyncingRef.current = true;

  try {
    while (hasPendingSaveRef.current) {
      hasPendingSaveRef.current = false;
      const currentData = latestDraftDataRef.current;
      
      const syncIdempotencyKey = crypto.randomUUID();
      const reqHeaders = { 'X-Idempotency-Key': syncIdempotencyKey };

      try {
        const res = await apiClient.post('/api/drafts', payload, { headers: reqHeaders });
        updateCloudDraftId(res.data.id);
      } catch (err) {
        if (axios.isAxiosError(err) && !err.response) {
          // Network Error - Fallback to Local DB Queue
          dbService.enqueueRequest('/api/drafts', 'POST', payload);
        }
      }
    }
  } finally {
    isSyncingRef.current = false;
  }
}, []);`
  },
  {
    id: 'dynamic-i18n-layout',
    title: 'Dynamic Multilingual UI & RTL Routing',
    icon: <Globe size={18} />,
    description: 'מערכת דינמית להתאמת ממשק משתמש (UI) ותוכן בהתאם לוקאליזציה. המערכת מחשבת כיווניות (RTL/LTR), מתרגמת משתנים דינמיים, ושולפת נתונים מ-API חיצוני (Django REST) על בסיס העדפות השפה של הלקוח.',
    code: `// Dynamic i18n Layout & Data Fetching
export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState<any>(null);
  
  // Custom Hook for global language context
  const { lang, isRtl } = useLanguage(); 

  useEffect(() => {
    if (id) {
      // Client-side fetch to external Django REST framework
      fetch(\`https://dashboard.atlas-prime.co.il/api/properties/\${id}/\`)
        .then(res => res.json())
        .then(data => setProperty(data));
    }
  }, [id]);

  // Fallback translation chain based on available backend data
  const displayTitle = lang === 'he' ? property.title_he 
                     : lang === 'ru' ? (property.title_ru || property.title_en || property.title_he)
                     : (property.title_en || property.title_he);

  return (
    // Dynamic Document Direction (RTL/LTR)
    <main className={\`\${isRtl ? 'text-right' : 'text-left'}\`} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto bg-[#1A2639]">
          <h1 className="text-4xl font-bold">{displayTitle}</h1>
          <p className="text-2xl text-[#C5A572]">
            {getSuiteName(property.rooms, lang)} | {getViewText(property.view_type, lang)}
          </p>
      </div>
    </main>
  );
}`
  }
];

export default function CodeShowcase() {
  const [activeSnippet, setActiveSnippet] = useState<string>(snippets[0].id);

  return (
    <div className="w-full max-w-5xl mx-auto my-16 bg-surface/30 backdrop-blur-md border border-border/50 rounded-2xl overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-border/50 flex items-center gap-3">
        <Code2 className="text-accent" />
        <h3 className="text-2xl font-bold text-foreground">Engineering Highlights</h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[400px]">
        {/* תפריט צד */}
        <div className="bg-background/50 border-e border-border/50 p-4 space-y-2">
          {snippets.map((snippet) => (
            <button
              key={snippet.id}
              onClick={() => setActiveSnippet(snippet.id)}
              className={`w-full text-start p-3 rounded-xl flex flex-col gap-2 transition-all ${
                activeSnippet === snippet.id 
                  ? 'bg-accent/10 border-accent/30 border text-accent' 
                  : 'text-muted hover:bg-surface/50 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {snippet.icon} {snippet.title}
              </div>
            </button>
          ))}
        </div>
        
        {/* תצוגת הקוד */}
        <div className="lg:col-span-2 p-0 bg-[#1E1E1E]">
          {snippets.map((snippet) => snippet.id === activeSnippet && (
            <div key={snippet.id} className="h-full flex flex-col animate-fade-in">
              <div className="p-4 bg-surface text-sm text-foreground/80 border-b border-border/20">
                {snippet.description}
              </div>
              <div className="flex-1 overflow-auto custom-scrollbar text-sm" dir="ltr">
                <SyntaxHighlighter 
                  language="typescript" 
                  style={vscDarkPlus} 
                  customStyle={{ margin: 0, padding: '1.5rem', background: 'transparent' }}
                >
                  {snippet.code}
                </SyntaxHighlighter>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}