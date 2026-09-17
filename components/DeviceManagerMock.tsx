'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// הגדרת טיפוסי הנתונים למכשיר
interface Device {
  id: string;
  name: string;
  status: 'Online' | 'Offline' | 'Rebooting';
  battery: number;
  ip: string;
}

// נתוני התחלה מדומים
const INITIAL_DEVICES: Device[] = [
  { id: 'DEV-001', name: 'Alpha Sensor', status: 'Online', battery: 85, ip: '192.168.1.10' },
  { id: 'DEV-002', name: 'Beta Controller', status: 'Offline', battery: 0, ip: '192.168.1.11' },
  { id: 'DEV-003', name: 'Gamma Gateway', status: 'Online', battery: 100, ip: '192.168.1.12' },
];

export default function DeviceManagerMock() {
  const [devices, setDevices] = useState<Device[]>(INITIAL_DEVICES);
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);

  // סימולציית קריאת API להפעלת מכשיר מחדש
  const handleReboot = async (id: string) => {
    // שלב 1: שינוי סטטוס ל-Rebooting (UI Optimistic Update)
    setDevices(prev => prev.map(d => d.id === id ? { ...d, status: 'Rebooting' } : d));
    
    // שלב 2: סימולציית זמן רשת ופעולת חומרה (1.5 שניות)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // שלב 3: החזרת המכשיר למצב אונליין
    setDevices(prev => prev.map(d => d.id === id ? { ...d, status: 'Online', battery: 100 } : d));
  };

  // סימולציית טעינת נתונים כללית
  const handleRefresh = async () => {
    setIsGlobalLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setDevices([...INITIAL_DEVICES]); // איפוס לנתוני המקור
    setIsGlobalLoading(false);
  };

  return (
    <div className="w-full h-full bg-[#0f172a] text-slate-200 p-6 font-sans overflow-y-auto">
      
      {/* Header מדומה של המערכת */}
      <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Device Fleet Dashboard</h2>
          <p className="text-slate-400 text-sm">Live System Mockup</p>
        </div>
        <button 
          onClick={handleRefresh}
          disabled={isGlobalLoading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
        >
          {isGlobalLoading ? 'Syncing...' : 'Refresh Data'}
        </button>
      </div>

      {/* טבלת הנתונים */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800 text-slate-400 text-sm">
              <th className="p-4 font-medium">Device ID</th>
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Battery</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device) => (
              <motion.tr 
                key={device.id}
                layout // מאפשר אנימציה חלקה בעת שינוי סטייט
                className="border-t border-slate-700/50 hover:bg-slate-700/30 transition-colors"
              >
                <td className="p-4 font-mono text-sm">{device.id}</td>
                <td className="p-4">{device.name}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center inline-flex gap-2 w-fit
                    ${device.status === 'Online' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                      device.status === 'Offline' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
                      'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}`}
                  >
                    {device.status === 'Rebooting' && (
                      <span className="w-2 h-2 rounded-full border-2 border-yellow-400 border-t-transparent animate-spin" />
                    )}
                    {device.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="w-full bg-slate-700 rounded-full h-2 max-w-[100px]">
                    <div 
                      className={`h-2 rounded-full ${device.battery > 20 ? 'bg-green-500' : 'bg-red-500'}`}
                      style={{ width: `${device.battery}%` }}
                    />
                  </div>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleReboot(device.id)}
                    disabled={device.status === 'Rebooting'}
                    className="text-sm px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded-md transition-colors disabled:opacity-50"
                  >
                    Reboot
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}