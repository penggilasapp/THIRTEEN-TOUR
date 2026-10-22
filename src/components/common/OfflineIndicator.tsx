import React from 'react';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import { WifiOff, Compass } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2.5 rounded-2xl bg-[#0D201A] border border-amber-500/60 px-4 py-2 text-xs font-medium text-amber-200 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom duration-300">
      <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
      <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
      <div>
        <span className="font-bold text-white block text-[11px]">Offline Mode (Network Disconnected)</span>
        <span className="text-[10px] text-emerald-200/80">
          Tour route data, itineraries, &amp; field safety guides cached locally.
        </span>
      </div>
    </div>
  );
};
