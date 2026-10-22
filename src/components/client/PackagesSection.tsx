import React, { useState } from 'react';
import { useTour } from '../../context/TourContext';
import { TourPackage } from '../../types/tour';
import { TourRouteCard } from './TourRouteCard';
import { TourRouteDetailModal } from './TourRouteDetailModal';
import { Compass } from 'lucide-react';

export const PackagesSection: React.FC = () => {
  const { packages, openInquireForPackage } = useTour();
  const [inspectingPackage, setInspectingPackage] = useState<TourPackage | null>(null);

  return (
    <section id="packages" className="py-24 bg-white text-slate-800 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5 text-emerald-700" />
            <span>Featured Expeditions &amp; Packages</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Playfair_Display'] text-slate-900">
            Tailored Journeys Across Java &amp; Bali
          </h2>

          <p className="text-stone-600 text-sm leading-relaxed">
            Every journey is operated 100% privately with premium fleet standards, verified local guides, and tailored itineraries shaped around your schedule.
          </p>
        </div>

        {/* Packages Cards Grid with unified TourRouteCard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {packages.filter(p => p.active).map((pkg) => (
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
      </div>

      {/* Unified Tour Route Detail Modal */}
      <TourRouteDetailModal
        pkg={inspectingPackage}
        onClose={() => setInspectingPackage(null)}
        onInquire={(id) => openInquireForPackage(id)}
      />
    </section>
  );
};
