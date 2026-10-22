import React, { useState } from 'react';
import { TRAVEL_ARTICLES_DATA, TravelArticle } from '../../data/guideData';
import { useTour } from '../../context/TourContext';
import { 
  BookOpen, 
  Clock, 
  MapPin, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  Calendar, 
  Sparkles, 
  X, 
  Share2,
  HelpCircle
} from 'lucide-react';

export const TravelGuideSection: React.FC = () => {
  const { setClientPage } = useTour();
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [readingArticle, setReadingArticle] = useState<TravelArticle | null>(null);

  const filteredArticles = selectedTag === 'all'
    ? TRAVEL_ARTICLES_DATA
    : TRAVEL_ARTICLES_DATA.filter(a => a.destinationTag.toLowerCase().includes(selectedTag.toLowerCase()));

  return (
    <section id="travel-guide" className="py-24 bg-white text-stone-800 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
            <span>Travel Guides &amp; Destination Intel</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Playfair_Display'] text-slate-900">
            Authoritative Expedition Guides &amp; Intel
          </h2>

          <p className="text-stone-600 text-sm leading-relaxed">
            In-depth operational field intelligence from our expedition curators: physical preparation for Mount Ijen, Bromo golden season photography, sanctuary temple etiquette, and overland logistics.
          </p>

          {/* Filter Chips */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {['all', 'Bromo', 'Ijen', 'Bali', 'Yogyakarta', 'Overland Java-Bali'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 min-h-[40px] rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                  selectedTag === tag
                    ? 'bg-[#0F2922] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {tag === 'all' ? 'All Guides' : tag}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="rounded-3xl bg-[#FAF9F6] border border-stone-200 overflow-hidden hover:shadow-xl hover:border-emerald-700/40 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Article Cover */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0F2922] text-white shadow-xs">
                      {article.destinationTag}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-slate-800 border border-stone-200 backdrop-blur-md">
                      {article.category}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-6 right-6">
                    <div className="flex items-center gap-3 text-[11px] text-emerald-200 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-emerald-300" />
                        {article.readingTime}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-emerald-300" />
                        {article.publishDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold font-['Playfair_Display'] text-slate-900 group-hover:text-emerald-900 transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>

                  {/* Author credit */}
                  <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between text-xs text-stone-500">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px]">
                        {article.author.charAt(0)}
                      </div>
                      <div>
                        <span className="font-semibold text-stone-800 block text-[11px]">{article.author}</span>
                        <span className="text-[10px] text-stone-400">{article.authorRole}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => setReadingArticle(article)}
                  className="w-full py-2.5 px-4 min-h-[44px] rounded-xl bg-white hover:bg-stone-100 text-emerald-950 border border-stone-200 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-2xs group-hover:bg-[#0F2922] group-hover:text-white group-hover:border-[#0F2922] cursor-pointer"
                >
                  <span>Read Complete Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* FAQ Hub Banner */}
        <div className="rounded-3xl bg-[#FAF9F6] border border-stone-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold font-['Playfair_Display'] text-slate-900">
                Have Questions About Travel Requirements &amp; Health Permits?
              </h3>
              <p className="text-xs text-stone-600 max-w-xl leading-relaxed">
                Check our official FAQ Knowledge Base for comprehensive answers on Indonesia e-VoA visas, Mount Ijen medical certificates, packing checklists, and 30% deposit milestones.
              </p>
            </div>
          </div>

          <button
            onClick={() => setClientPage('faq')}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#0F2922] hover:bg-[#153A30] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-xs"
          >
            <span>View Full FAQ Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Article Reader Modal */}
      {readingArticle && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white border border-stone-200 rounded-3xl w-full max-w-3xl text-stone-800 shadow-2xl relative overflow-hidden my-auto max-h-[90vh] flex flex-col">
            {/* Header image */}
            <div className="relative h-60 sm:h-72 overflow-hidden shrink-0">
              <img
                src={readingArticle.coverImage}
                alt={readingArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

              <button
                onClick={() => setReadingArticle(null)}
                className="absolute top-4 right-4 p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-stone-900 backdrop-blur-md transition-all shadow-md cursor-pointer"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-emerald-950">
                    {readingArticle.destinationTag}
                  </span>
                  <span className="text-xs text-emerald-200">
                    {readingArticle.readingTime} • {readingArticle.publishDate}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-['Playfair_Display'] text-white">
                  {readingArticle.title}
                </h3>
              </div>
            </div>

            {/* Scrollable Article Body */}
            <div className="p-4 sm:p-8 overflow-y-auto space-y-6 text-stone-700 leading-relaxed text-xs sm:text-sm">
              {/* Author bio */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <div className="w-10 h-10 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {readingArticle.author.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">{readingArticle.author}</div>
                  <div className="text-xs text-stone-500">{readingArticle.authorRole} • THIRTEEN Editorial Team</div>
                </div>
              </div>

              {/* Paragraphs */}
              <div className="space-y-4">
                {readingArticle.contentParagraphs.map((para, i) => (
                  <p key={i} className="text-stone-700 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              {/* Key Tips Checklist */}
              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
                <h4 className="font-bold text-emerald-950 text-xs sm:text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Key Field Takeaways &amp; Checklists</span>
                </h4>
                <ul className="space-y-2">
                  {readingArticle.keyTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-stone-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-[#FAF9F6] border-t border-stone-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
              <span className="text-xs text-stone-500 text-center sm:text-left">
                THIRTEEN Operator Tour Knowledge Base
              </span>
              <button
                onClick={() => setReadingArticle(null)}
                className="w-full sm:w-auto px-5 py-2.5 min-h-[44px] rounded-xl bg-[#0F2922] text-white text-xs font-bold hover:bg-[#153A30] transition-colors cursor-pointer flex items-center justify-center text-center"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
