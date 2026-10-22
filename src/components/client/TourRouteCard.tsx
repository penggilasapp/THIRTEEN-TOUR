import React from 'react';
import { TourPackage, TourType } from '../../types/tour';
import { 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Compass, 
  Car, 
  Mountain, 
  Activity,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface TourRouteCardProps {
  pkg: TourPackage;
  onInspect: (pkg: TourPackage) => void;
  onInquire: (pkgId: string) => void;
  viewDetailsLabel?: string;
  inquireLabel?: string;
  selectedCurrency?: string;
  onCurrencyToggle?: () => void;
}

export const TourRouteCard: React.FC<TourRouteCardProps> = ({
  pkg,
  onInspect,
  onInquire,
  viewDetailsLabel = 'View Itinerary',
  inquireLabel = 'Request a Personalized Quote'
}) => {
  const getTourTypeLabel = (type: TourType) => {
    switch (type) {
      case 'fixed_package':
        return 'Scheduled Package';
      case 'custom_private':
        return 'Custom Private Tour';
      case 'modular_tour':
        return 'Modular Tour';
      case 'multiday_expedition':
        return 'Multi-Day Expedition';
      default:
        return 'Private Expedition';
    }
  };

  return (
    <div className="group rounded-3xl bg-[#FAF9F6] border border-stone-200/90 overflow-hidden hover:shadow-xl hover:border-emerald-800/40 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Cover Image & Scrim Header */}
        <div className="relative h-52 sm:h-64 overflow-hidden bg-slate-900">
          <img
            src={pkg.coverImage}
            alt={pkg.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {/* Measured Scrim for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent" />

          {/* Top Metadata Badges */}
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between gap-1.5 flex-wrap">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-[#0F2922] text-white shadow-sm border border-emerald-800/40">
                {pkg.indicativeDuration}
              </span>
              <span className="px-2 sm:px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-white/95 text-slate-800 border border-stone-200 shadow-2xs backdrop-blur-md">
                {getTourTypeLabel(pkg.tourType)}
              </span>
            </div>

            <span className="px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold bg-slate-900/80 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
              {pkg.code}
            </span>
          </div>

          {/* Bottom Title & Destination Lockup */}
          <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-6 right-4 sm:right-6">
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-emerald-200 font-medium mb-1 flex-wrap">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{pkg.destinationName}</span>
              </div>
              <span className="text-emerald-400/60 hidden xs:inline">·</span>
              <span className="capitalize text-emerald-300/90">{pkg.serviceTier.replace('_', ' ')} Service Tier</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold font-['Playfair_Display'] text-white leading-tight">
              {pkg.title}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Route Waypoint Stepper Bar */}
          {pkg.routeWaypoints && pkg.routeWaypoints.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-[11px] font-semibold text-emerald-950">
                <span className="flex items-center gap-1.5 uppercase tracking-wider text-[10px] text-stone-500 font-bold">
                  <Compass className="w-3.5 h-3.5 text-emerald-800" />
                  <span>Expedition Route Progression</span>
                </span>
                <span className="font-mono text-[10px] text-stone-400">{pkg.routeWaypoints.length} Checkpoints</span>
              </div>
              
              {/* Waypoints Flow */}
              <div className="flex items-center gap-1.5 flex-wrap text-xs text-stone-700 font-medium pt-1">
                {pkg.routeWaypoints.map((wp, idx) => (
                  <React.Fragment key={idx}>
                    <span className={`px-2 py-0.5 rounded-md text-[11px] ${
                      idx === 0 || idx === pkg.routeWaypoints!.length - 1
                        ? 'bg-emerald-50 text-emerald-950 font-bold border border-emerald-200/70'
                        : 'bg-stone-100 text-stone-700'
                    }`}>
                      {wp}
                    </span>
                    {idx < pkg.routeWaypoints!.length - 1 && (
                      <ArrowRight className="w-3 h-3 text-stone-400 shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            {pkg.shortDescription}
          </p>

          {/* Route Technical Specifications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/70 flex items-start gap-2 min-w-0">
              <Mountain className="w-3.5 h-3.5 text-emerald-800 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Terrain &amp; Environment</span>
                <span className="text-[11px] font-medium text-stone-800 line-clamp-1">
                  {pkg.terrainType || 'Volcanic Caldera & Highlands'}
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/70 flex items-start gap-2 min-w-0">
              <Activity className="w-3.5 h-3.5 text-emerald-800 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Physical Level</span>
                <span className="text-[11px] font-medium text-stone-800">
                  {pkg.fitnessLevel || 'Moderate'}
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/70 flex items-start gap-2 col-span-1 sm:col-span-2 min-w-0">
              <Car className="w-3.5 h-3.5 text-emerald-800 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Expedition Fleet</span>
                <span className="text-[11px] font-medium text-stone-800 truncate block">
                  {pkg.fleetType || 'Dedicated 4x4 & Private Chauffeur'}
                </span>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="space-y-1.5 pt-2 border-t border-stone-200/60">
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
              Route Highlights
            </span>
            {pkg.highlights.slice(0, 3).map((h, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-stone-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-800 shrink-0 mt-0.5" />
                <span className="line-clamp-2 leading-relaxed">{h}</span>
              </div>
            ))}
          </div>

          {/* Tailored Pricing Policy Block (Strictly No Public Tour Prices) */}
          <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-emerald-900 tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Tailored Pricing</span>
              </span>
              <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider">
                Private Guarantee
              </span>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Every journey is quoted according to your itinerary, group size, travel dates, accommodation preferences, and operational requirements.
            </p>

            <div className="pt-1.5 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 flex-wrap gap-1">
              <span className="text-emerald-900 font-medium">All-inclusive private logistics &amp; certified guides</span>
              <span className="text-stone-400">Customizable</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 sm:p-6 pt-0 flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3">
        <button
          onClick={() => onInspect(pkg)}
          className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs min-h-[44px]"
        >
          <Clock className="w-3.5 h-3.5 text-emerald-800" />
          <span>{viewDetailsLabel}</span>
        </button>

        <button
          onClick={() => onInquire(pkg.id)}
          className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-[#0F2922] hover:bg-[#153A30] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
          <span>{inquireLabel}</span>
        </button>
      </div>
    </div>
  );
};
