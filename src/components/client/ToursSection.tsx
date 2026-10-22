import React, { useState } from 'react';
import { useTour } from '../../context/TourContext';
import { TourPackage, TourType } from '../../types/tour';
import { TourRouteCard } from './TourRouteCard';
import { TourRouteDetailModal } from './TourRouteDetailModal';
import { 
  Compass, 
  MapPin, 
  Layers
} from 'lucide-react';

export const ToursSection: React.FC = () => {
  const { packages, openInquireForPackage } = useTour();
  const [inspectingPackage, setInspectingPackage] = useState<TourPackage | null>(null);
  const [selectedTourType, setSelectedTourType] = useState<'all' | TourType>('all');
  const [selectedDestinationFilter, setSelectedDestinationFilter] = useState<string>('all');

  // Available unique destination options for filtering
  const destinationOptions = [
    { id: 'all', label: 'All Regions' },
    { id: 'dest-bromo', label: 'Bromo & East Java' },
    { id: 'dest-bali', label: 'Bali & Islands' },
    { id: 'dest-yogyakarta', label: 'Yogyakarta & Central Java' }
  ];

  const filteredPackages = packages
    .filter(p => p.active)
    .filter(p => selectedTourType === 'all' || p.tourType === selectedTourType)
    .filter(p => {
      if (selectedDestinationFilter === 'all') return true;
      if (selectedDestinationFilter === 'dest-bromo') {
        return p.destinationId === 'dest-bromo' || p.destinationName.toLowerCase().includes('bromo');
      }
      if (selectedDestinationFilter === 'dest-bali') {
        return p.destinationId === 'dest-bali' || p.destinationName.toLowerCase().includes('bali');
      }
      if (selectedDestinationFilter === 'dest-yogyakarta') {
        return p.destinationId === 'dest-yogyakarta' || p.destinationName.toLowerCase().includes('yogyakarta');
      }
      return true;
    });

  return (
    <section id="tours" className="py-20 sm:py-24 bg-white text-slate-800 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5 text-emerald-700" />
            <span>Official Expedition &amp; Tour Catalogue</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Playfair_Display'] text-slate-900 leading-tight">
            Tailored Expeditions &amp; Curated Routes
          </h2>

          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-2xl">
            Explore private journeys across Java and Bali, with routes shaped around your destinations, travel dates, and personal preferences. Every expedition includes guaranteed 4x4 vehicles, certified local guides, and tailored pacing.
          </p>
        </div>

        {/* Dual Filtering Controls */}
        <div className="space-y-4 pt-2">
          {/* 1. Format Filter Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-stone-200">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <Layers className="w-4 h-4 text-emerald-800" />
              <span>Expedition Format:</span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              {[
                { id: 'all', label: `All Formats (${packages.filter(p => p.active).length})` },
                { id: 'fixed_package', label: 'Scheduled Packages' },
                { id: 'custom_private', label: 'Custom Private' },
                { id: 'modular_tour', label: 'Modular Tours' },
                { id: 'multiday_expedition', label: 'Multi-Day Expeditions' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTourType(tab.id as any)}
                  className={`px-3.5 py-2 min-h-[40px] sm:min-h-[36px] rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center justify-center ${
                    selectedTourType === tab.id
                      ? 'bg-[#0F2922] text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200/70 hover:text-stone-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Destination Region Filter Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 font-semibold text-stone-600">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>Filter by Destination Region:</span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              {destinationOptions.map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => setSelectedDestinationFilter(dest.id)}
                  className={`px-3.5 py-2 min-h-[38px] sm:min-h-[36px] rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center justify-center ${
                    selectedDestinationFilter === dest.id
                      ? 'bg-emerald-800 text-white font-bold'
                      : 'bg-stone-50 border border-stone-200 text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  {dest.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Counter Results & Reset */}
        <div className="flex items-center justify-between text-xs text-stone-500 px-1">
          <span>
            Showing <strong>{filteredPackages.length}</strong> active expedition routes
          </span>
          {(selectedTourType !== 'all' || selectedDestinationFilter !== 'all') && (
            <button
              onClick={() => {
                setSelectedTourType('all');
                setSelectedDestinationFilter('all');
              }}
              className="text-emerald-800 hover:text-emerald-950 font-semibold underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Packages / Routes Cards Grid with Consistent UI */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredPackages.map((pkg) => (
            <TourRouteCard
              key={pkg.id}
              pkg={pkg}
              onInspect={(p) => setInspectingPackage(p)}
              onInquire={(id) => openInquireForPackage(id)}
              viewDetailsLabel="View Itinerary"
              inquireLabel="Request a Personalized Quote"
            />
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="text-center py-16 bg-[#FAF9F6] border border-stone-200 rounded-3xl p-8 space-y-4">
            <Compass className="w-10 h-10 text-stone-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">No matching routes found</h3>
            <p className="text-xs text-stone-600 max-w-md mx-auto">
              No expeditions match your current filter criteria. Reset the filters to view our full collection of journeys.
            </p>
            <button
              onClick={() => {
                setSelectedTourType('all');
                setSelectedDestinationFilter('all');
              }}
              className="px-4 py-2 rounded-xl bg-[#0F2922] text-white text-xs font-bold hover:bg-emerald-900 transition-colors cursor-pointer"
            >
              Show All Routes
            </button>
          </div>
        )}
      </div>

      {/* Unified Route Detail Modal */}
      <TourRouteDetailModal
        pkg={inspectingPackage}
        onClose={() => setInspectingPackage(null)}
        onInquire={(id) => openInquireForPackage(id)}
      />
    </section>
  );
};
