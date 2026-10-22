import React from 'react';
import { TourPackage } from '../../types/tour';
import { 
  X, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  Compass, 
  Mountain, 
  Car, 
  Activity, 
  Utensils, 
  Bed, 
  ArrowRight
} from 'lucide-react';

interface TourRouteDetailModalProps {
  pkg: TourPackage | null;
  onClose: () => void;
  onInquire: (pkgId: string) => void;
  selectedCurrency?: string;
  onCurrencyChange?: (currency: 'USD' | 'IDR') => void;
}

export const TourRouteDetailModal: React.FC<TourRouteDetailModalProps> = ({
  pkg,
  onClose,
  onInquire
}) => {
  if (!pkg) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div 
        className="bg-white border border-stone-200 rounded-3xl w-full max-w-4xl text-stone-800 shadow-2xl relative overflow-hidden my-auto max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-tour-title"
      >
        {/* Modal Top Header with Dark Forest Green Gradient */}
        <div className="relative px-4 sm:px-6 py-4 sm:py-6 border-b border-stone-200 flex items-start justify-between bg-gradient-to-r from-[#0B2019] to-[#123126] text-white shrink-0">
          <div className="space-y-1.5 max-w-2xl min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-emerald-300 flex-wrap">
              <span className="font-mono bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                {pkg.code}
              </span>
              <span>•</span>
              <span>{pkg.indicativeDuration}</span>
              <span>•</span>
              <span className="capitalize">{pkg.serviceTier.replace('_', ' ')} Service Tier</span>
            </div>

            <h3 id="modal-tour-title" className="text-lg sm:text-2xl md:text-3xl font-extrabold font-['Playfair_Display'] text-white leading-tight">
              {pkg.title}
            </h3>

            <div className="flex items-center gap-1.5 text-xs text-emerald-200/90 pt-0.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Destination Region: {pkg.destinationName}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close route details"
            className="p-2.5 rounded-xl text-emerald-200/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0 ml-3 min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
          {/* Waypoint Route Progression Banner */}
          {pkg.routeWaypoints && pkg.routeWaypoints.length > 0 && (
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                <span className="flex items-center gap-2 uppercase tracking-wider text-[11px] text-emerald-900">
                  <Compass className="w-4 h-4 text-emerald-700" />
                  <span>Route Progression &amp; Checkpoints</span>
                </span>
                <span className="font-mono text-xs text-stone-500">{pkg.routeWaypoints.length} Sequence Points</span>
              </div>

              <div className="flex items-center gap-2 flex-wrap text-xs font-medium pt-1">
                {pkg.routeWaypoints.map((wp, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex items-center gap-1.5 bg-white border border-stone-200/90 px-3 py-1.5 rounded-xl shadow-2xs">
                      <span className="w-4 h-4 rounded-full bg-emerald-900 text-white text-[10px] font-mono flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <span className="font-semibold text-stone-800">{wp}</span>
                    </div>
                    {idx < pkg.routeWaypoints!.length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {pkg.routeSummary && (
                <p className="text-[11px] text-stone-600 italic pt-1">
                  Full itinerary corridor: {pkg.routeSummary}
                </p>
              )}
            </div>
          )}

          {/* Quotation Policy Card (Tailored Pricing) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#F6F8F5] border border-emerald-900/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-emerald-900 tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-800" />
                <span>Tailored Pricing Policy</span>
              </span>
              <p className="text-sm font-semibold text-slate-900">
                Bespoke Quotation Shaped to Your Travel Preferences
              </p>
              <p className="text-xs text-stone-600 max-w-xl leading-relaxed">
                Every journey is quoted according to your itinerary, group size, travel dates, accommodation preferences, and operational requirements.
              </p>
            </div>

            <button
              onClick={() => {
                const id = pkg.id;
                onClose();
                onInquire(id);
              }}
              className="px-5 py-2.5 rounded-xl bg-[#0F2922] hover:bg-[#153A30] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer self-start sm:self-center shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>Request a Quote</span>
            </button>
          </div>

          {/* Technical Specifications Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <div className="flex items-center gap-1.5 text-stone-500 text-[10px] uppercase font-bold">
                <Mountain className="w-3.5 h-3.5 text-emerald-700" />
                <span>Terrain &amp; Environment</span>
              </div>
              <p className="text-xs font-semibold text-stone-800">
                {pkg.terrainType || 'Volcanic Caldera & Mountain Ridge'}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <div className="flex items-center gap-1.5 text-stone-500 text-[10px] uppercase font-bold">
                <Activity className="w-3.5 h-3.5 text-emerald-700" />
                <span>Physical Readiness</span>
              </div>
              <p className="text-xs font-semibold text-stone-800">
                {pkg.fitnessLevel || 'Moderate'}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <div className="flex items-center gap-1.5 text-stone-500 text-[10px] uppercase font-bold">
                <Car className="w-3.5 h-3.5 text-emerald-700" />
                <span>Expedition Fleet</span>
              </div>
              <p className="text-xs font-semibold text-stone-800 line-clamp-2">
                {pkg.fleetType || 'Dedicated 4x4 Land Cruiser & Executive Van'}
              </p>
            </div>
          </div>

          {/* Experience Narrative */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
              Expedition Overview &amp; Narrative
            </h4>
            <p className="text-stone-700 leading-relaxed text-xs sm:text-sm">
              {pkg.experienceNarrative}
            </p>
          </div>

          {/* Day by Day Detailed Timeline */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>Day-by-Day Route Itinerary</span>
              <span className="font-normal text-stone-500 text-[11px] lowercase">
                ({pkg.durationDays} days / {pkg.durationNights} nights)
              </span>
            </h4>

            <div className="space-y-4">
              {pkg.itineraryDays.map((day) => (
                <div key={day.dayNumber} className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-stone-200/80">
                    <div>
                      <span className="font-extrabold text-emerald-950 text-sm">
                        Day {day.dayNumber}: {day.title}
                      </span>
                      <p className="text-xs text-stone-600 italic mt-0.5">{day.subtitle}</p>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-stone-600 shrink-0">
                      <span className="flex items-center gap-1 font-medium">
                        <Bed className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{day.stayLocation}</span>
                      </span>
                    </div>
                  </div>

                  {/* Schedule items */}
                  <div className="space-y-2 pt-1">
                    {day.schedule.map((sc, scIdx) => (
                      <div key={scIdx} className="flex items-start gap-2.5 text-xs">
                        <span className="font-mono tabular-nums text-emerald-900 bg-emerald-100/70 border border-emerald-300/50 px-2 py-0.5 rounded text-[11px] font-bold shrink-0 mt-0.5">
                          {sc.time}
                        </span>
                        <div className="min-w-0 flex-1">
                          <span className="text-stone-800 font-medium">{sc.activity}</span>
                          <span className="text-stone-500 text-[11px] ml-1.5 font-normal">
                            ({sc.location})
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Day Meals info */}
                  {day.meals && day.meals.length > 0 && (
                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-900 pt-2 border-t border-stone-200/60 font-medium">
                      <Utensils className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Included Dining: {day.meals.join(' · ')}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions and Exclusions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
              <h5 className="font-bold text-emerald-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Inclusions</span>
              </h5>
              <ul className="space-y-1.5 text-xs text-stone-700">
                {pkg.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold shrink-0">•</span>
                    <span className="text-[11px] leading-relaxed">{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <h5 className="font-bold text-stone-700 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-stone-500" />
                <span>Exclusions</span>
              </h5>
              <ul className="space-y-1.5 text-xs text-stone-600">
                {pkg.exclusions.map((exc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-stone-400 font-bold shrink-0">•</span>
                    <span className="text-[11px] leading-relaxed">{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Safety & Protocol Mandates */}
          {pkg.safetyMandates.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs space-y-2">
              <div className="font-bold text-amber-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <span>Field Safety Standards &amp; Physical Preparation</span>
              </div>
              <ul className="space-y-1 text-amber-950 text-[11px]">
                {pkg.safetyMandates.map((sm, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-700 font-bold shrink-0">•</span>
                    <span className="leading-relaxed">{sm}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="px-4 sm:px-6 py-4 bg-[#FAF9F6] border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <span className="text-xs text-stone-500 hidden md:inline">
            Every expedition is operated strictly as a private journey with verified local guides.
          </span>

          <div className="flex flex-col-reverse sm:flex-row items-center gap-2.5 sm:gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold cursor-pointer min-h-[44px] flex items-center justify-center"
            >
              Close
            </button>
            <button
              onClick={() => {
                const id = pkg.id;
                onClose();
                onInquire(id);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0F2922] hover:bg-[#153A30] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>Request a Personalized Quote</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
