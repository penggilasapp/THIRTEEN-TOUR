import React, { useState } from 'react';
import { useTour } from '../../context/TourContext';
import { Region, Destination, TourPackage } from '../../types/tour';
import { TourRouteCard } from './TourRouteCard';
import { TourRouteDetailModal } from './TourRouteDetailModal';
import { 
  Compass, 
  MapPin, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Check, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  ChevronRight, 
  Home as HomeIcon,
  Layers,
  Camera,
  Info
} from 'lucide-react';

export const DestinationsSection: React.FC = () => {
  const { 
    regions, 
    destinations, 
    selectedRegionSlug, 
    selectedDestinationSlug, 
    navigateToDestinationRoute,
    packages, 
    openInquireForPackage,
    setClientPage 
  } = useTour();

  const [inspectingPackage, setInspectingPackage] = useState<TourPackage | null>(null);

  // Active region and destination if selected
  const activeRegion = regions.find(r => r.slug === selectedRegionSlug) || null;
  const activeDestination = destinations.find(
    d => d.regionId === selectedRegionSlug && d.slug === selectedDestinationSlug
  ) || null;

  // Filter destinations for current region
  const regionalDestinations = selectedRegionSlug
    ? destinations.filter(d => d.regionId === selectedRegionSlug)
    : [];

  // Official tour packages related to the active destination
  const relatedPackages = activeDestination
    ? packages.filter(p => 
        p.active && (
          p.destinationId === activeDestination.id ||
          p.destinationName.toLowerCase().includes(activeDestination.name.toLowerCase()) ||
          (p.routeWaypoints && p.routeWaypoints.some(wp => wp.toLowerCase().includes(activeDestination.name.toLowerCase()))) ||
          (activeDestination.regionId === 'bali' && p.destinationId === 'dest-bali') ||
          (activeDestination.regionId === 'java' && (p.destinationId === 'dest-bromo' || p.destinationId === 'dest-ijen' || p.destinationId === 'dest-yogyakarta'))
        )
      )
    : [];

  // =========================================================================
  // VIEW 3: INDIVIDUAL DESTINATION DETAIL PAGE (/destinations/:region/:slug)
  // =========================================================================
  if (activeRegion && activeDestination) {
    return (
      <div className="bg-[#FAF9F6] min-h-screen text-slate-800 pb-24">
        {/* Breadcrumb Navigation Bar */}
        <div className="bg-white border-b border-stone-200 px-4 sm:px-6 lg:px-8 py-3.5 sticky top-0 z-30 shadow-2xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
            <nav className="flex items-center gap-1.5 flex-wrap text-stone-600">
              <button
                onClick={() => setClientPage('home')}
                className="hover:text-emerald-900 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <HomeIcon className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              <button
                onClick={() => navigateToDestinationRoute(null, null)}
                className="hover:text-emerald-900 transition-colors cursor-pointer"
              >
                Destinations
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              <button
                onClick={() => navigateToDestinationRoute(activeRegion.slug as any, null)}
                className="hover:text-emerald-900 transition-colors font-medium cursor-pointer"
              >
                {activeRegion.name}
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              <span className="font-bold text-emerald-950">{activeDestination.name}</span>
            </nav>

            <button
              onClick={() => navigateToDestinationRoute(activeRegion.slug as any, null)}
              className="hidden sm:inline-flex items-center gap-1.5 text-stone-600 hover:text-emerald-900 font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to {activeRegion.name}</span>
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative h-[420px] sm:h-[500px] overflow-hidden bg-slate-950">
          <img
            src={activeDestination.heroImage || activeDestination.coverImage}
            alt={activeDestination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />

          <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12">
            <div className="max-w-3xl space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0F2922] text-white border border-emerald-700/50 uppercase tracking-wider">
                  {activeRegion.name} Region
                </span>
                {activeDestination.heroBadge && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 text-slate-800 backdrop-blur-md">
                    {activeDestination.heroBadge}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-['Playfair_Display'] text-white leading-tight">
                {activeDestination.name}
              </h1>

              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-light">
                {activeDestination.tagline || activeDestination.shortDescription}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => openInquireForPackage(undefined, activeDestination.id)}
                  className="w-full sm:w-auto px-6 py-3.5 min-h-[44px] rounded-xl bg-[#0F2922] hover:bg-[#153A30] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer uppercase tracking-wider text-center"
                >
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                  <span>Plan Your Journey to {activeDestination.name}</span>
                </button>

                <button
                  onClick={() => navigateToDestinationRoute(activeRegion.slug as any, null)}
                  className="w-full sm:w-auto px-4 py-3.5 min-h-[44px] rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs backdrop-blur-md transition-all cursor-pointer flex items-center justify-center text-center"
                >
                  <span>Explore Other {activeRegion.name} Destinations</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Destination Content Body */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
          {/* 1. Overview Narrative & Practical Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-emerald-900 block mb-1">
                  Destination Dossier
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-['Playfair_Display'] text-slate-900">
                  About {activeDestination.name}
                </h2>
              </div>

              <p className="text-sm sm:text-base text-stone-700 leading-relaxed whitespace-pre-line">
                {activeDestination.longDescription || activeDestination.description}
              </p>

              {/* Signature Curated Experiences */}
              <div className="pt-4 space-y-4">
                <h3 className="text-lg font-bold font-['Playfair_Display'] text-slate-900 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-emerald-800" />
                  <span>Signature Curated Experiences</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(activeDestination.experiences || activeDestination.highlights || []).map((exp, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-2xs flex items-start gap-3"
                    >
                      <Check className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                      <span className="text-xs text-stone-700 leading-relaxed font-medium">
                        {exp}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Practical Information Sidebar */}
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-5">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-950 uppercase tracking-wider pb-3 border-b border-stone-100">
                  <Info className="w-4 h-4 text-emerald-800" />
                  <span>Verified Travel Logistics</span>
                </div>

                <div className="space-y-4 text-xs text-stone-700">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Location &amp; Access</span>
                    <p className="font-medium text-stone-800 leading-relaxed">
                      {activeDestination.practicalInformation}
                    </p>
                  </div>

                  {activeDestination.climateSafetyNotes && (
                    <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-[11px] text-amber-950 space-y-1">
                      <div className="font-bold flex items-center gap-1.5 text-amber-900">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                        <span>Field Environment Protocol</span>
                      </div>
                      <p className="leading-relaxed">
                        {activeDestination.climateSafetyNotes}
                      </p>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      onClick={() => openInquireForPackage(undefined, activeDestination.id)}
                      className="w-full py-3 rounded-xl bg-[#0F2922] hover:bg-[#153A30] text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer uppercase tracking-wider"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Plan Your Journey</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Photo Gallery */}
          {activeDestination.galleryImages && activeDestination.galleryImages.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-emerald-900 block mb-1">
                    Visual Chronicle
                  </span>
                  <h3 className="text-2xl font-bold font-['Playfair_Display'] text-slate-900">
                    Captures of {activeDestination.name}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-stone-500">
                  <Camera className="w-4 h-4 text-emerald-800" />
                  <span>Authentic Field Photography</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[activeDestination.heroImage || activeDestination.coverImage, ...activeDestination.galleryImages].slice(0, 3).map((img, i) => (
                  <div key={i} className="h-64 rounded-3xl overflow-hidden bg-slate-900 shadow-sm border border-stone-200 group">
                    <img
                      src={img}
                      alt={`${activeDestination.name} scenery ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Official Tour Routes Covering this Destination */}
          {relatedPackages.length > 0 && (
            <div className="space-y-6 pt-6 border-t border-stone-200">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-emerald-900 block mb-1">
                    Curated Itineraries
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-['Playfair_Display'] text-slate-900">
                    Official Expedition Routes Featuring {activeDestination.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1">
                    All routes operate strictly 100% private with dedicated 4x4 vehicles, certified local guides, and tailored pricing.
                  </p>
                </div>

                <button
                  onClick={() => setClientPage('tours')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 self-start sm:self-auto cursor-pointer"
                >
                  <span>Browse Full Tour Catalogue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {relatedPackages.map(pkg => (
                  <TourRouteCard
                    key={pkg.id}
                    pkg={pkg}
                    onInspect={p => setInspectingPackage(p)}
                    onInquire={id => openInquireForPackage(id, activeDestination.id)}
                    viewDetailsLabel="View Itinerary"
                    inquireLabel="Request a Personalized Quote"
                  />
                ))}
              </div>
            </div>
          )}

          {/* 4. Bottom Plan Your Journey CTA Banner */}
          <div className="rounded-3xl bg-gradient-to-r from-[#0B2019] to-[#123126] text-white p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl text-center md:text-left">
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-300">
                Tailored Travel Design
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold font-['Playfair_Display'] leading-tight">
                Discover {activeDestination.name} Your Way
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                Connect with our senior travel designer to craft a private journey tailored around your preferred dates, pacing, boutique lodge stays, and private vehicle logistics.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
              <button
                onClick={() => openInquireForPackage(undefined, activeDestination.id)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-[#0B2019] hover:bg-emerald-50 font-bold text-xs shadow-md transition-all cursor-pointer uppercase tracking-wider text-center"
              >
                Plan Your Journey
              </button>
              <button
                onClick={() => navigateToDestinationRoute(activeRegion.slug as any, null)}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs transition-all cursor-pointer text-center"
              >
                Back to {activeRegion.name}
              </button>
            </div>
          </div>
        </div>

        {/* Route Inspection Modal */}
        <TourRouteDetailModal
          pkg={inspectingPackage}
          onClose={() => setInspectingPackage(null)}
          onInquire={id => openInquireForPackage(id, activeDestination.id)}
        />
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: REGIONAL LANDING PAGE (/destinations/bali or /destinations/java)
  // =========================================================================
  if (activeRegion && !activeDestination) {
    return (
      <div className="bg-[#FAF9F6] min-h-screen text-slate-800 pb-24">
        {/* Breadcrumb Navigation Bar */}
        <div className="bg-white border-b border-stone-200 px-4 sm:px-6 lg:px-8 py-3.5 sticky top-0 z-30 shadow-2xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
            <nav className="flex items-center gap-1.5 flex-wrap text-stone-600">
              <button
                onClick={() => setClientPage('home')}
                className="hover:text-emerald-900 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <HomeIcon className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              <button
                onClick={() => navigateToDestinationRoute(null, null)}
                className="hover:text-emerald-900 transition-colors cursor-pointer"
              >
                Destinations
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              <span className="font-bold text-emerald-950">{activeRegion.name}</span>
            </nav>

            <button
              onClick={() => navigateToDestinationRoute(null, null)}
              className="hidden sm:inline-flex items-center gap-1.5 text-stone-600 hover:text-emerald-900 font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Regions</span>
            </button>
          </div>
        </div>

        {/* Regional Hero Section */}
        <div className="relative h-[360px] sm:h-[420px] overflow-hidden bg-slate-950">
          <img
            src={activeRegion.heroImage}
            alt={activeRegion.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

          <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#0F2922] text-white border border-emerald-700/50 uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5 text-emerald-300" />
                <span>Regional Portfolio</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold font-['Playfair_Display'] text-white">
                {activeRegion.name === 'Bali' ? 'Bali: The Island of Temples & Sanctuaries' : 'Java: The Volcanic & Cultural Spine'}
              </h1>

              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-light">
                {activeRegion.description}
              </p>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => openInquireForPackage(undefined, activeRegion.id === 'bali' ? 'dest-bali' : 'dest-bromo')}
                  className="w-full sm:w-auto px-5 py-3 min-h-[44px] rounded-xl bg-[#0F2922] hover:bg-[#153A30] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer uppercase tracking-wider text-center"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Plan a {activeRegion.name} Journey</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Destinations Catalogue */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-900 block mb-1">
                {activeRegion.name} Catalogue
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-['Playfair_Display'] text-slate-900">
                {activeRegion.name === 'Bali' 
                  ? 'Five Approved Bali Subdestinations' 
                  : 'Seven Approved Java Primary Destinations'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
                {activeRegion.name === 'Bali'
                  ? 'Explore each distinctive pocket of Bali, from coastal surf sanctuaries to high-altitude volcanic calderas.'
                  : 'From world-renowned volcanic calderas and sulfur craters to thousand-stream waterfalls and royal kingdoms.'}
              </p>
            </div>

            <div className="text-xs text-stone-500 font-medium">
              Showing <strong>{regionalDestinations.length}</strong> destinations in {activeRegion.name}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regionalDestinations.map(dest => (
              <div
                key={dest.id}
                className="group rounded-3xl bg-white border border-stone-200/90 overflow-hidden hover:shadow-xl hover:border-emerald-800/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative h-60 overflow-hidden bg-slate-900">
                    <img
                      src={dest.heroImage || dest.coverImage}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#0F2922] text-white border border-emerald-700/40">
                        {dest.heroBadge || (activeRegion.name === 'Bali' ? 'Bali Subdestination' : 'Primary Destination')}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-5 right-5">
                      <h3 className="text-2xl font-bold font-['Playfair_Display'] text-white">
                        {dest.name}
                      </h3>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
                      {dest.shortDescription}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-stone-100">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
                        Signature Curated Experiences
                      </span>
                      {(dest.experiences || dest.highlights || []).slice(0, 2).map((exp, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-stone-700">
                          <Check className="w-3.5 h-3.5 text-emerald-800 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{exp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-6 pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-stone-100 mt-2">
                  <button
                    onClick={() => navigateToDestinationRoute(activeRegion.slug as any, dest.slug)}
                    className="text-xs text-emerald-900 hover:text-emerald-950 font-bold flex items-center gap-1.5 transition-colors pt-2 sm:pt-3 cursor-pointer min-h-[44px]"
                  >
                    <span>View Destination Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => openInquireForPackage(undefined, dest.id)}
                    className="sm:mt-3 px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-[#0F2922] text-emerald-900 hover:text-white border border-emerald-200 text-xs font-bold transition-all cursor-pointer min-h-[44px] flex items-center justify-center"
                  >
                    Plan Journey
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Regional Call to Action */}
          <div className="rounded-3xl bg-gradient-to-r from-[#0B2019] to-[#123126] text-white p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 mt-16">
            <div className="space-y-3 max-w-xl text-center md:text-left">
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-300">
                Custom Overland Route Planning
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-['Playfair_Display']">
                Looking to Combine {activeRegion.name} with Other Regions?
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                Our bespoke journeys frequently bridge Java and Bali via private executive rail, private 4x4 Land Cruisers, and private ferry straits crossings.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
              <button
                onClick={() => openInquireForPackage(undefined, activeRegion.id === 'bali' ? 'dest-bali' : 'dest-bromo')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-[#0B2019] hover:bg-emerald-50 font-bold text-xs shadow-md transition-all cursor-pointer uppercase tracking-wider text-center"
              >
                Plan Your Journey
              </button>
              <button
                onClick={() => navigateToDestinationRoute(null, null)}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs transition-all cursor-pointer text-center"
              >
                View All Regions
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 1: TOP-LEVEL REGIONAL DIRECTORY (/destinations)
  // Shows EXACTLY two top-level cards: Bali and Java
  // =========================================================================
  return (
    <section id="destinations" className="py-16 sm:py-24 bg-[#FAF9F6] text-slate-800 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-stone-600">
          <button
            onClick={() => setClientPage('home')}
            className="hover:text-emerald-900 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <HomeIcon className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="font-bold text-emerald-950">Destinations</span>
        </nav>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-bold text-emerald-900 uppercase tracking-widest flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-800" />
              <span>Regional Destination Directory</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-['Playfair_Display'] text-slate-900 leading-tight">
              Bali &amp; Java Expeditions
            </h1>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Two distinct geographical and cultural worlds. Choose a region below to explore our verified destinations, curated experiences, and private overland routes.
            </p>
          </div>

          <div className="text-xs font-semibold text-stone-500">
            <span>2 Core Geographic Regions • 12 Approved Destinations</span>
          </div>
        </div>

        {/* EXACTLY TWO TOP-LEVEL REGIONAL ENTRY CARDS: BALI & JAVA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {regions.map(reg => {
            const regionDestList = destinations.filter(d => d.regionId === reg.id);
            const isBali = reg.id === 'bali';

            return (
              <div
                key={reg.id}
                onClick={() => navigateToDestinationRoute(reg.slug as any, null)}
                className="group rounded-3xl bg-white border border-stone-200/90 overflow-hidden hover:shadow-2xl hover:border-emerald-800/40 transition-all duration-500 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Hero Cover Image */}
                  <div className="relative h-80 sm:h-96 overflow-hidden bg-slate-950">
                    <img
                      src={reg.heroImage}
                      alt={reg.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

                    {/* Regional Badge */}
                    <div className="absolute top-5 left-5">
                      <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#0F2922] text-white border border-emerald-700/50 shadow-sm uppercase tracking-wider">
                        {isBali ? 'Regional Landing Page' : 'Regional Landing Page'}
                      </span>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 space-y-2">
                      <span className="text-xs uppercase tracking-widest text-emerald-300 font-bold">
                        {isBali ? '5 Approved Subdestinations' : '7 Approved Primary Destinations'}
                      </span>
                      <h2 className="text-3xl sm:text-4xl font-extrabold font-['Playfair_Display'] text-white">
                        {reg.name}
                      </h2>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-8 space-y-5">
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                      {reg.description}
                    </p>

                    {/* Subdestination Pill Preview */}
                    <div className="space-y-2 pt-2 border-t border-stone-100">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
                        {isBali ? 'Featured Bali Subdestinations:' : 'Featured Java Destinations:'}
                      </span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {regionDestList.map(d => (
                          <span
                            key={d.id}
                            className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 text-xs font-medium"
                          >
                            {d.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-6 sm:p-8 pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-stone-100 mt-2">
                  <div className="text-xs font-bold text-emerald-900 group-hover:text-emerald-700 flex items-center gap-2 transition-colors pt-2 sm:pt-3 min-h-[44px]">
                    <span>Explore {reg.name} Regional Directory</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateToDestinationRoute(reg.slug as any, null);
                    }}
                    className="sm:mt-3 px-5 py-2.5 rounded-xl bg-[#0F2922] hover:bg-[#153A30] text-white text-xs font-bold transition-all shadow-sm cursor-pointer min-h-[44px] flex items-center justify-center"
                  >
                    View Destinations
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Plan Your Journey Call to Action */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0B2019] to-[#123126] text-white p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 mt-12">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-300">
              Bespoke Journey Planning
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold font-['Playfair_Display']">
              Plan Your Journey Across Java &amp; Bali
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
              Every itinerary is quoted and custom-tailored to your party size, preferred accommodation, and route cadence. Tell us where you want to explore.
            </p>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <button
              onClick={() => openInquireForPackage()}
              className="w-full md:w-auto px-7 py-3.5 rounded-xl bg-white text-[#0B2019] hover:bg-emerald-50 font-bold text-xs shadow-md transition-all cursor-pointer uppercase tracking-wider text-center"
            >
              Plan Your Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
