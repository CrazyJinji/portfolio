import { AppProvider } from '@/context/AppContext';
import './globals.css';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';

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
  title: 'Leon Krasnik - Practical Electronic Engineer & RF Engineer',
  description: 'Portfolio and Resume of Leon Krasnik',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}>
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