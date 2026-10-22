import React from 'react';
import { useTour } from '../../context/TourContext';
import { 
  Wifi, 
  Battery, 
  Compass, 
  Lock, 
  Sparkles, 
  Smartphone
} from 'lucide-react';

export const MobileSimulatorContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { deviceMode, setDeviceMode, viewMode, setViewMode, openInquireForPackage } = useTour();

  if (deviceMode !== 'mobile_sim') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-stone-200/70 flex flex-col items-center justify-center py-6 px-2 sm:px-4">
      {/* Simulator Control floating banner */}
      <div className="mb-4 flex items-center justify-between gap-4 bg-white border border-stone-300/80 px-4 py-2 rounded-2xl text-xs text-stone-700 shadow-md max-w-md w-full">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-emerald-800" />
          <span className="font-semibold text-slate-900">Mobile Device Simulator (iPhone 16 Pro)</span>
        </div>
        <button
          onClick={() => setDeviceMode('responsive')}
          className="text-xs text-emerald-800 hover:text-emerald-950 font-bold underline"
        >
          Exit to Fullscreen Web
        </button>
      </div>

      {/* Realistic Smartphone Frame */}
      <div className="w-full max-w-[410px] h-[844px] bg-[#FAF9F6] rounded-[50px] border-[10px] border-slate-900 shadow-[0_20px_60px_rgba(0,0,0,0.3)] relative flex flex-col overflow-hidden ring-1 ring-slate-800/40">
        {/* iOS Dynamic Island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-slate-950 rounded-full z-50 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-slate-900 mr-2 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
          </div>
          <div className="w-2 h-2 rounded-full bg-slate-900"></div>
        </div>

        {/* Mobile Top Status Bar */}
        <div className="h-11 bg-white/90 backdrop-blur-md px-6 flex items-center justify-between text-[11px] text-slate-800 font-semibold z-40 shrink-0 select-none border-b border-stone-100">
          <span>09:41</span>
          <div className="flex items-center gap-2">
            <Wifi className="w-3 h-3" />
            <Battery className="w-3.5 h-3.5 text-slate-800" />
          </div>
        </div>

        {/* App Content Body */}
        <div className="grow overflow-y-auto overscroll-contain bg-[#FAF9F6] pb-16">
          {children}
        </div>

        {/* Mobile App Native Bottom Navigation Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-stone-200 px-6 flex items-center justify-around text-[10px] text-stone-500 z-50 shadow-lg">
          <button
            onClick={() => setViewMode('client')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              viewMode === 'client' ? 'text-emerald-900 font-bold' : 'hover:text-slate-900'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Discover</span>
          </button>

          <button
            onClick={() => openInquireForPackage()}
            className="flex flex-col items-center gap-1 text-emerald-900 font-bold"
          >
            <div className="w-7 h-7 rounded-full bg-[#0F2922] text-white flex items-center justify-center shadow-md -mt-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            </div>
            <span>Inquire</span>
          </button>

          <button
            onClick={() => setViewMode('admin')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              viewMode === 'admin' ? 'text-emerald-900 font-bold' : 'hover:text-slate-900'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Operator</span>
          </button>
        </div>

        {/* iPhone Home Indicator Line */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-stone-400 rounded-full z-50"></div>
      </div>
    </div>
  );
};
