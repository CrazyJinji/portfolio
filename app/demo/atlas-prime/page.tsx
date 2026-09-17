import AtlasPrimeMainMock from '@/components/AtlasPrimeMainMock';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AtlasPrimeDemoPage() {
  return (
    <main className="w-screen h-screen flex flex-col overflow-hidden bg-[#0A111A]">
      
      {/* Top Navigation Bar */}
      <div className="bg-slate-900 border-b border-slate-800 h-12 flex items-center justify-between shrink-0 px-4 z-50">
        <div className="flex items-center gap-3">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-slate-400 font-mono text-xs tracking-wider">ATLAS PRIME - MAIN PAGE MOCKUP</span>
        </div>
        
        <Link 
          href="/projects/atlas-prime-real-estate" 
          className="text-sm font-bold text-white hover:text-blue-300 flex items-center gap-2 transition-colors bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg"
          dir="rtl"
        >
          <ArrowRight size={16} />
          חזור לקורות החיים 
        </Link>
      </div>
      
      {/* Mockup Canvas */}
      <div className="flex-1 overflow-auto custom-scrollbar">
         <AtlasPrimeMainMock />
      </div>
      
    </main>
  );
}