import React, { useState } from 'react';
import { HeroSection } from './HeroSection';
import { useTour } from '../../context/TourContext';
import { EXPERIENCES_DATA } from '../../data/experienceData';
import { TRAVEL_ARTICLES_DATA } from '../../data/guideData';
import { HowItWorksSection } from './HowItWorksSection';
import { FAQSection } from './FAQSection';
import { TourPackage } from '../../types/tour';
import { TourRouteCard } from './TourRouteCard';
import { TourRouteDetailModal } from './TourRouteDetailModal';
import { 
  ArrowRight, 
  MapPin, 
  Compass, 
  Sparkles, 
  Clock, 
  ChevronRight,
  ShieldCheck,
  Palmtree,
  Mountain,
  CheckCircle2,
  Phone
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { 
    destinations, 
    packages, 
    setClientPage, 
    openInquireForPackage,
    navigateToDestinationRoute
  } = useTour();

  const [inspectingPackage, setInspectingPackage] = useState<TourPackage | null>(null);
  const [activeRegionTab, setActiveRegionTab] = useState<'bali' | 'java'>('bali');

  const featuredPackages = packages.filter(p => p.active).slice(0, 2);
  const baliDestinations = destinations.filter(d => d.regionId === 'bali');
  const javaDestinations = destinations.filter(d => d.regionId === 'java');
  const featuredExperiences = EXPERIENCES_DATA.slice(0, 3);
  const featuredArticles = TRAVEL_ARTICLES_DATA.slice(0, 2);

  return (
    <div className="space-y-0">
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. FEATURED TOURS */}
      <section className="py-14 sm:py-20 bg-white border-b border-stone-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-emerald-900">
                <Compass className="w-4 h-4 text-emerald-800" />
                <span>Featured Private Tours</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-['Playfair_Display'] text-slate-900">
                Curated Expeditions &amp; Routes
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm max-w-xl leading-relaxed">
                Operated strictly 100% private with dedicated 4x4 vehicles, certified local guides, and tailored quotation pricing.
              </p>
            </div>

            <button
              onClick={() => setClientPage('tours')}
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-900 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100/80 px-5 py-3 rounded-xl border border-emerald-200 transition-all cursor-pointer self-start sm:self-center"
            >
              <span>Explore All Tours</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
            {featuredPackages.map((pkg) => (
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
      </section>

      {/* 3. EXPLORE BALI & EXPLORE JAVA */}
      <section className="py-14 sm:py-20 bg-[#FAF9F6] border-b border-stone-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-emerald-900">
                <Sparkles className="w-4 h-4 text-emerald-800" />
                <span>Two Distinct Worlds</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-['Playfair_Display'] text-slate-900">
                Explore Bali &amp; Java
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                From the clifftop temples and coastal enclaves of Bali to the volcanic calderas, eternal waterfalls, and royal heritage of Java.
              </p>
            </div>

            {/* Region Switcher Tabs */}
            <div className="w-full sm:w-auto flex p-1.5 rounded-2xl bg-white border border-stone-200 shadow-2xs self-start md:self-center">
              <button
                onClick={() => setActiveRegionTab('bali')}
                className={`flex-1 sm:flex-initial justify-center px-3.5 sm:px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer min-h-[44px] ${
                  activeRegionTab === 'bali'
                    ? 'bg-[#0F2922] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Palmtree className="w-3.5 h-3.5 shrink-0" />
                <span>Explore Bali ({baliDestinations.length})</span>
              </button>
              <button
                onClick={() => setActiveRegionTab('java')}
                className={`flex-1 sm:flex-initial justify-center px-3.5 sm:px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer min-h-[44px] ${
                  activeRegionTab === 'java'
                    ? 'bg-[#0F2922] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Mountain className="w-3.5 h-3.5 shrink-0" />
                <span>Explore Java ({javaDestinations.length})</span>
              </button>
            </div>
          </div>

          {/* Regional Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {(activeRegionTab === 'bali' ? baliDestinations : javaDestinations).map((dest) => (
              <div
                key={dest.id}
                onClick={() => {
                  navigateToDestinationRoute(dest.regionId as any, dest.slug);
                }}
                className="group rounded-3xl bg-white border border-stone-200 overflow-hidden hover:shadow-xl hover:border-emerald-700/40 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-36 sm:h-44 overflow-hidden bg-stone-900">
                    <img
                      src={dest.coverImage || dest.heroImage}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold bg-[#0F2922]/90 text-white backdrop-blur-xs uppercase tracking-wider">
                      {dest.heroBadge || (dest.regionId === 'bali' ? 'Bali Subdestination' : 'Java Expedition')}
                    </span>
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <h3 className="text-xl font-bold font-['Playfair_Display']">
                        {dest.name}
                      </h3>
                      <p className="text-[11px] text-emerald-200 line-clamp-1 mt-0.5">
                        {dest.tagline}
                      </p>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 space-y-2">
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {dest.shortDescription || dest.description}
                    </p>
                    {dest.highlights && dest.highlights.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        {dest.highlights.slice(0, 2).map((hl: string, i: number) => (
                          <div key={i} className="flex items-start gap-1.5 text-[11px] text-stone-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{hl}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-3 sm:p-4 pt-0 flex items-center justify-between text-[11px] font-bold text-emerald-900 border-t border-stone-100 mt-2">
                  <span className="pt-3 group-hover:translate-x-1 transition-transform flex items-center gap-1.5">
                    <span>View Destination Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="pt-3 text-[11px] text-stone-400 font-normal">
                    Private Journey
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Regional Footer CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-white border border-stone-200">
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Want to combine {activeRegionTab === 'bali' ? 'Bali' : 'Java'} with other destinations?
              </h4>
              <p className="text-xs text-stone-600 mt-0.5">
                Our overland expeditions connect Yogyakarta, Mount Bromo, Ijen Crater, and Bali via private 4x4 vehicles and scenic rail.
              </p>
            </div>
            <button
              onClick={() => openInquireForPackage(undefined, activeRegionTab === 'bali' ? 'dest-bali' : 'dest-bromo')}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#0F2922] hover:bg-[#153A30] text-white text-xs font-bold whitespace-nowrap transition-all cursor-pointer shadow-xs min-h-[44px] flex items-center justify-center text-center"
            >
              Request Custom Route Quote
            </button>
          </div>
        </div>
      </section>

      {/* 4. SIGNATURE EXPERIENCES */}
      <section className="py-14 sm:py-20 bg-white border-b border-stone-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-emerald-900">
                <Sparkles className="w-4 h-4 text-emerald-800" />
                <span>Nature, Culture &amp; Adventure</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-['Playfair_Display'] text-slate-900">
                Signature Experiences
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm max-w-xl leading-relaxed">
                Hand-picked private excursions led by certified alpine miner guides, cultural historians, and experienced 4x4 drivers.
              </p>
            </div>

            <button
              onClick={() => setClientPage('experiences')}
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-900 hover:text-emerald-950 bg-stone-50 hover:bg-stone-100 px-5 py-3 rounded-xl border border-stone-200 transition-all cursor-pointer self-start sm:self-center min-h-[44px]"
            >
              <span>View All Experiences</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {featuredExperiences.map((exp) => (
              <div
                key={exp.id}
                onClick={() => setClientPage('experiences')}
                className="group rounded-3xl bg-[#FAF9F6] border border-stone-200 overflow-hidden hover:shadow-xl hover:border-emerald-700/40 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-stone-900">
                    <img
                      src={exp.coverImage}
                      alt={exp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0F2922] text-white">
                      {exp.categoryLabel}
                    </span>
                    <span className="absolute bottom-3 left-4 text-xs font-semibold text-emerald-200 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-300" />
                      <span>{exp.destination}</span>
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="text-base font-bold font-['Playfair_Display'] text-slate-900 group-hover:text-emerald-900 transition-colors line-clamp-1">
                      {exp.title}
                    </h3>
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
                <div className="p-5 pt-0 flex items-center justify-between text-xs text-stone-500 border-t border-stone-100 mt-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{exp.duration}</span>
                  </span>
                  <span className="font-bold text-emerald-900 flex items-center gap-1 pt-1">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW JOURNEY PLANNING WORKS */}
      <HowItWorksSection />

      {/* 6. TRAVEL GUIDES & FIELD INTEL */}
      <section className="py-14 sm:py-20 bg-[#FAF9F6] border-b border-stone-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-emerald-900">
                <Sparkles className="w-4 h-4 text-emerald-800" />
                <span>Expedition Intelligence</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-['Playfair_Display'] text-slate-900">
                Travel Guides &amp; Field Advice
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm max-w-xl leading-relaxed">
                Practical insights to prepare for volcanic terrains, sacred temple sanctums, and executive rail journeys across Indonesia.
              </p>
            </div>

            <button
              onClick={() => setClientPage('travel-guide')}
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-900 hover:text-emerald-950 bg-white hover:bg-stone-100 px-5 py-3 rounded-xl border border-stone-200 transition-all cursor-pointer self-start sm:self-center shadow-2xs"
            >
              <span>Explore All Travel Guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {featuredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => setClientPage('travel-guide')}
                className="group rounded-3xl bg-white border border-stone-200 overflow-hidden hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="relative h-56 overflow-hidden bg-stone-900">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold bg-[#0F2922] text-white">
                    {article.destinationTag}
                  </span>
                  <span className="absolute bottom-3 left-4 text-xs text-emerald-200">
                    {article.readingTime} • {article.publishDate}
                  </span>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-bold font-['Playfair_Display'] text-slate-900 group-hover:text-emerald-900 transition-colors line-clamp-1">
                    {article.title}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                  <div className="pt-2 text-xs font-bold text-emerald-900 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <FAQSection />

      {/* 8. FINAL PLAN YOUR JOURNEY CTA */}
      <section className="py-16 sm:py-20 bg-[#0B2019] text-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img
            src="https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=2200&q=80"
            alt="Java Volcano Mist"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-emerald-200 text-xs font-bold tracking-wider uppercase border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Tailored Journeys Across Java &amp; Bali</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Playfair_Display'] text-white leading-tight">
            Ready to Begin Your Private Expedition?
          </h2>

          <p className="text-xs sm:text-base text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
            Every journey is quoted according to your itinerary, group size, travel dates, accommodation preferences, and operational requirements. Connect with our senior travel designer today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => openInquireForPackage()}
              className="w-full sm:w-auto px-8 py-4 min-h-[48px] rounded-xl bg-white text-emerald-950 hover:bg-emerald-50 text-xs font-bold uppercase tracking-wider transition-all shadow-xl cursor-pointer flex items-center justify-center"
            >
              Request a Personalized Quote
            </button>
            <button
              onClick={() => setClientPage('tours')}
              className="w-full sm:w-auto px-7 py-4 min-h-[48px] rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider border border-white/20 transition-all cursor-pointer flex items-center justify-center"
            >
              Explore Our Tours
            </button>
          </div>
        </div>
      </section>

      {/* Unified Tour Route Detail Modal */}
      <TourRouteDetailModal
        pkg={inspectingPackage}
        onClose={() => setInspectingPackage(null)}
        onInquire={(id) => openInquireForPackage(id)}
      />
    </div>
  );
};
