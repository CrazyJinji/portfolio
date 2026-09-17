'use client';

import React, { useState } from 'react';
import { 
  Activity, AlertTriangle, FileText, LayoutDashboard, 
  PlusCircle, ClipboardList, History, Search, Users, LogOut, ArrowLeft 
} from 'lucide-react';

export default function LabSystemMock() {
  // Mock Data - Hardcoded to match your screenshot perfectly
  const activeTasksCount = 0;
  const expiringTasks = [
    { id: '1', sn: '1234', displayDate: '01/09/2027' },
    { id: '2', sn: '5678', displayDate: '01/03/2027' },
    { id: '3', sn: '91011', displayDate: '29/08/2027' }
  ];
  const drafts = [
    { id: 'd1', serialNumber: '4321', fighterName: 'ישראל ישראלי', completedPercentage: 13, remainingPercentage: 87, time: '23:13' }
  ];

  return (
    <div className="flex h-full w-full bg-slate-50 font-sans" dir="rtl">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#0A1526] text-slate-300 flex flex-col shrink-0 shadow-2xl z-20">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center font-bold text-white shadow-lg">
            <Activity size={20} />
          </div>
          <div>
            <h1 className="text-white font-bold tracking-wide">מעבדה</h1>
            <p className="text-xs text-slate-400">שלום, משתמש</p>
          </div>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-600/20 text-blue-400 rounded-xl font-bold border border-blue-500/20 transition-all">
            <LayoutDashboard size={18} /> לוח בקרה
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800/50 rounded-xl font-medium transition-all text-sm">
            <PlusCircle size={18} /> קליטה ובדיקה
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800/50 rounded-xl font-medium transition-all text-sm">
            <ClipboardList size={18} /> משימות בטיפול
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800/50 rounded-xl font-medium transition-all text-sm">
            <History size={18} /> היסטוריית טיפולים
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800/50 rounded-xl font-medium transition-all text-sm">
            <Search size={18} /> איתור מכשיר
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800/50 rounded-xl font-medium transition-all text-sm mt-4 border-t border-slate-800 pt-4">
            <Users size={18} /> ניהול משתמשים
          </a>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium px-2 w-full">
            <LogOut size={16} className="rtl:rotate-180" /> התנתק מהמערכת
          </button>
        </div>
      </aside>

      {/* Main Content Area - Dashboard */}
      <main className="flex-1 overflow-y-auto p-8 lg:p-12 text-slate-800">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <header>
            <h2 className="text-3xl font-bold text-slate-900">לוח בקרה - מעבדה</h2>
            <p className="text-slate-500 mt-1">תמונת מצב בזמן אמת של עומס הטיפולים במעבדה.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Active Tasks Widget */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-5 justify-end flex-row-reverse text-left">
              <div className="p-4 bg-blue-50 text-blue-600 rounded-full">
                <Activity size={32} />
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-slate-500">מכשירים בטיפול כרגע במעבדה</p>
                <p className="text-4xl font-black text-slate-800">{activeTasksCount}</p>
              </div>
            </div>

            {/* Battery Warning Widget */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-yellow-400 relative overflow-hidden flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-1.5 h-full bg-yellow-400"></div>
              <div className="flex items-center gap-5">
                <div className="p-4 bg-yellow-50 text-yellow-600 rounded-full">
                  <AlertTriangle size={32} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">התראת תוקף סוללות פנימיות</p>
                  <p className="text-3xl font-black text-slate-800 flex items-baseline gap-2">
                    {expiringTasks.length} <span className="text-sm font-bold text-slate-500">מכשירים יפוגו בקרוב</span>
                  </p>
                </div>
              </div>
              <div className="mt-5 pt-5 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-400 mb-3">מספרי מספר סידורי לריענון יזום (6-12 חודשים):</h4>
                <div className="flex flex-wrap gap-2">
                  {expiringTasks.map(task => (
                    <span key={task.id} className="px-3 py-1.5 bg-yellow-50/50 border border-yellow-200 text-yellow-800 text-xs rounded-lg font-mono font-bold shadow-sm">
                      מספר סידורי {task.sn} (עד {task.displayDate})
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Drafts Widget */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-purple-200">
            <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-3 flex items-center gap-2 text-purple-700">
              <FileText size={20} />
              טיוטות פתוחות בהמתנה
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {drafts.map((draft) => (
                <div key={draft.id} className="bg-purple-50/30 border border-purple-100 rounded-xl p-5 flex flex-col justify-between shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 left-0 h-1.5 bg-purple-100">
                    <div className="h-full bg-purple-500 transition-all" style={{ width: `${draft.completedPercentage}%` }} />
                  </div>
                  <div className="pt-2">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-bold px-2.5 py-1 bg-purple-100 text-purple-700 rounded-md font-mono">
                        מספר סידורי {draft.serialNumber}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono font-medium">
                        עודכן: {draft.time}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-700 mb-5">
                      <span className="text-slate-400 font-medium">בעל מכשיר:</span> {draft.fighterName}
                    </p>
                    <div className="flex justify-between items-center text-xs font-bold mb-1">
                      <span className="text-purple-700">{draft.completedPercentage}% הושלם</span>
                      <span className="text-slate-400">נותרו {draft.remainingPercentage}%</span>
                    </div>
                  </div>
                  <button className="mt-5 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-lg transition-colors shadow-md shadow-purple-600/20">
                    המשך טיפול בטופס
                    <ArrowLeft size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Distribution Widget */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-3">התפלגות ציוד נוכחי במעבדה</h3>
            <p className="text-slate-500 text-sm font-medium">אין כרגע ציוד פתוח במעבדה.</p>
          </div>

        </div>
      </main>

    </div>
  );
}