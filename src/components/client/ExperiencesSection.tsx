import React, { useState } from 'react';
import { EXPERIENCES_DATA, ExperienceItem } from '../../data/experienceData';
import { useTour } from '../../context/TourContext';
import { 
  Sparkles, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Flame, 
  Compass, 
  Footprints,
  Trees,
  Landmark,
  X
} from 'lucide-react';

export const ExperiencesSection: React.FC = () => {
  const { openInquireForPackage } = useTour();
  const [activeCategory, setActiveCategory] = useState<'all' | 'nature' | 'culture' | 'adventure'>('all');
  const [selectedExp, setSelectedExp] = useState<ExperienceItem | null>(null);

  const filteredExperiences = activeCategory === 'all'
    ? EXPERIENCES_DATA
    : EXPERIENCES_DATA.filter(item => item.category === activeCategory);

  return (
    <section id="experiences" className="py-24 bg-[#FAF9F6] text-stone-800 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Signature Indonesian Experiences</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Playfair_Display'] text-slate-900">
            Exploration of Nature, Culture &amp; Adventure
          </h2>

          <p className="text-stone-600 text-sm leading-relaxed">
            From the rare electric blue flames of an active sulfur crater to the serene dawn meditation at Borobudur. Every private experience is conducted with uncompromising safety standards and local mastery.
          </p>

          {/* Category Filter Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-[#0F2922] text-white shadow-xs'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>All Experiences ({EXPERIENCES_DATA.length})</span>
            </button>

            <button
              onClick={() => setActiveCategory('nature')}
              className={`px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeCategory === 'nature'
                  ? 'bg-[#0F2922] text-white shadow-xs'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              <Trees className="w-3.5 h-3.5 text-emerald-600" />
              <span>Nature</span>
            </button>

            <button
              onClick={() => setActiveCategory('culture')}
              className={`px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeCategory === 'culture'
                  ? 'bg-[#0F2922] text-white shadow-xs'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              <Landmark className="w-3.5 h-3.5 text-amber-600" />
              <span>Culture</span>
            </button>

            <button
              onClick={() => setActiveCategory('adventure')}
              className={`px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeCategory === 'adventure'
                  ? 'bg-[#0F2922] text-white shadow-xs'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-rose-600" />
              <span>Adventure</span>
            </button>
          </div>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredExperiences.map((exp) => (
            <div
              key={exp.id}
              className="rounded-3xl bg-white border border-stone-200 overflow-hidden hover:shadow-xl hover:border-emerald-700/40 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={exp.coverImage}
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0F2922] text-white shadow-xs">
                      {exp.categoryLabel}
                    </span>
                    {exp.badge && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-slate-800 border border-stone-200 backdrop-blur-md">
                        {exp.badge}
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-4 left-5 right-5">
                    <div className="flex items-center gap-1.5 text-xs text-emerald-200 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                      <span>{exp.destination}</span>
                    </div>
                    <h3 className="text-lg font-bold font-['Playfair_Display'] text-white mt-1 line-clamp-1">
                      {exp.title}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-4">
                  <p className="text-xs text-stone-500 italic font-medium">
                    "{exp.tagline}"
                  </p>

                  <p className="text-xs text-stone-700 leading-relaxed line-clamp-3">
                    {exp.description}
                  </p>

                  {/* Meta Specs */}
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{exp.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Footprints className="w-3.5 h-3.5 text-amber-700" />
                      <span className="font-medium text-stone-800">{exp.fitnessRating}</span>
                    </div>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="space-y-1.5 pt-2">
                    {exp.keyHighlights.slice(0, 2).map((hl, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-stone-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 flex items-center gap-3">
                <button
                  onClick={() => setSelectedExp(exp)}
                  className="w-1/2 min-h-[44px] py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors text-center cursor-pointer flex items-center justify-center"
                >
                  Details &amp; Safety
                </button>
                <button
                  onClick={() => openInquireForPackage(exp.destinationId)}
                  className="w-1/2 min-h-[44px] py-2.5 px-3 rounded-xl bg-[#0F2922] hover:bg-[#153A30] text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                >
                  <span>Inquire</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Detail Modal */}
      {selectedExp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-stone-200 rounded-3xl w-full max-w-2xl text-stone-800 shadow-2xl relative overflow-hidden my-auto max-h-[90vh] flex flex-col">
            {/* Header with image banner */}
            <div className="relative h-48 sm:h-64 overflow-hidden shrink-0">
              <img
                src={selectedExp.coverImage}
                alt={selectedExp.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />
              
              <button
                onClick={() => setSelectedExp(null)}
                className="absolute top-4 right-4 p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-stone-900 backdrop-blur-md transition-all shadow-md cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-xs uppercase font-bold tracking-wider text-emerald-300">
                  {selectedExp.categoryLabel} • {selectedExp.duration}
                </span>
                <h3 className="text-2xl font-bold font-['Playfair_Display'] text-white mt-1">
                  {selectedExp.title}
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
                  Experience Overview
                </h4>
                <p className="text-stone-700 leading-relaxed text-xs">
                  {selectedExp.description}
                </p>
              </div>

              {/* Highlights */}
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
                  Key Journey Highlights
                </h4>
                <ul className="space-y-2">
                  {selectedExp.keyHighlights.map((hl, i) => (
                    <li key={i} className="flex items-start gap-2 text-stone-700 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Safety & Gear */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
                <div className="font-bold text-emerald-950 text-xs flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Safety Protocols &amp; Equipment Provided</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {selectedExp.safetyAndGear}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
              <span className="text-xs text-stone-500 text-center sm:text-left">
                Fitness Rating: <strong>{selectedExp.fitnessRating}</strong>
              </span>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setSelectedExp(null)}
                  className="w-1/2 sm:w-auto px-4 py-2.5 min-h-[44px] rounded-xl bg-white border border-stone-200 text-stone-700 text-xs font-semibold hover:bg-stone-100 cursor-pointer flex items-center justify-center"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const destId = selectedExp.destinationId;
                    setSelectedExp(null);
                    openInquireForPackage(destId);
                  }}
                  className="w-1/2 sm:w-auto px-5 py-2.5 min-h-[44px] rounded-xl bg-[#0F2922] hover:bg-[#153A30] text-white text-xs font-bold shadow-sm cursor-pointer flex items-center justify-center text-center"
                >
                  Design This Journey
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
