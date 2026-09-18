import { AppProvider } from '@/context/AppContext';
import './globals.css';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION } from '@/lib/site';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'], 
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  // metadataBase הוא מה שהופך נתיב יחסי כאן לכתובת מלאה.
  // בלעדיו Next מזהיר בבילד ותגיות ה-OG יוצאות שבורות.
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  keywords: [
    'Leon Krasnik',
    'לאון קרסניק',
    'הנדסאי אלקטרוניקה',
    'RF',
    'RF engineer',
    'satellite communication',
    'system design',
    'Next.js',
    'TypeScript',
    'portfolio',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: '/',
    locale: 'he_IL',
    alternateLocale: ['en_US'],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

/**
 * רץ סינכרונית לפני ה-paint הראשון ומיישם את ההעדפות השמורות על תגית ה-html.
 * בלעדיו היה flash של ערכת נושא ושל כיוון כתיבה שגויים עד שה-React עולה.
 * ה-markup מהשרת נשאר he/rtl, ולכן צריך suppressHydrationWarning על ה-html.
 */
const THEME_INIT_SCRIPT = `(function(){try{
var r=document.documentElement;
var t=localStorage.getItem('theme')||'dark';
var l=localStorage.getItem('lang')||'he';
if(t==='dark'){r.classList.add('dark')}else{r.classList.remove('dark')}
r.setAttribute('lang',l);
r.setAttribute('dir',l==='he'?'rtl':'ltr');
}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="he"
      dir="rtl"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body
        suppressHydrationWarning // Inject directive here to bypass extension mutations
        className="font-sans antialiased min-h-screen relative bg-background text-foreground transition-colors duration-300" 
      >
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-background">
          <div className="absolute top-[-10%] start-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-accent/10 dark:bg-accent/5 blur-[120px] transform-gpu" />
          <div className="absolute bottom-[-10%] end-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-[100px] transform-gpu" />
        </div>

        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}