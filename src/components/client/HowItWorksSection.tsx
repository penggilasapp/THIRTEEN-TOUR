import React from 'react';
import { useTour } from '../../context/TourContext';
import { FileText, UserCheck, Calculator, CheckCircle2, Compass, Sparkles, ArrowRight } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const { openInquireForPackage } = useTour();

  const steps = [
    {
      num: '01',
      title: 'Share Your Vision',
      subtitle: 'Tailored Inquiry',
      desc: 'Select your preferred destinations across Java and Bali, travel dates, party size, and private comfort tier.',
      icon: FileText
    },
    {
      num: '02',
      title: 'Route Design & Audit',
      subtitle: 'Travel Specialist Consultation',
      desc: 'A dedicated travel designer crafts your route, verifying mountain safety conditions, scenic pacing, and private chauffeur logistics.',
      icon: UserCheck
    },
    {
      num: '03',
      title: 'Personalized Quotation',
      subtitle: 'Transparent Tailored Costing',
      desc: 'Receive a clear, itemized proposal based on your itinerary, group size, boutique lodge selections, and vehicle class.',
      icon: Calculator
    },
    {
      num: '04',
      title: 'Confirm & Finalize',
      subtitle: 'Secured Reservation',
      desc: 'Confirm your private reservation with dedicated booking terms. Receive your comprehensive expedition brief and 24/7 concierge contacts.',
      icon: CheckCircle2
    },
    {
      num: '05',
      title: 'Seamless Journey',
      subtitle: 'Dedicated Private Chauffeur & Guides',
      desc: 'Your private team greets you upon arrival. Experience Indonesia with total flexibility, safety, and personal attention throughout.',
      icon: Compass
    }
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-24 bg-white text-slate-800 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
      <div className="max-w-7xl mx-auto space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-800" />
            <span>How Journey Planning Works</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Playfair_Display'] text-slate-900">
            A Thoughtful, Tailored Journey from Start to Finish
          </h2>

          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            Every THIRTEEN expedition is custom-designed around your pace and preferences. Here is how we turn your travel aspirations into an extraordinary private overland journey.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 relative">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.num}
                className="p-6 rounded-3xl bg-[#FAF9F6] border border-stone-200 flex flex-col justify-between hover:shadow-md hover:border-emerald-700/40 transition-all relative group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-bold text-stone-300 group-hover:text-emerald-900 transition-colors">
                      {st.num}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-emerald-900 shadow-2xs">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-base font-['Playfair_Display']">
                      {st.title}
                    </h4>
                    <p className="text-[11px] text-emerald-900 font-medium uppercase tracking-wider mt-0.5">
                      {st.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Plan Your Journey CTA Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0B2019] to-[#123126] text-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-3xl font-extrabold font-['Playfair_Display'] text-white">
              Ready to Plan Your Private Journey?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 max-w-xl">
              Connect with our travel designer to begin crafting a tailored itinerary across Java and Bali tailored to your preferred dates and group.
            </p>
          </div>

          <button
            onClick={() => openInquireForPackage()}
            className="px-8 py-3.5 rounded-xl bg-white text-emerald-950 hover:bg-emerald-50 font-bold text-xs uppercase tracking-wider shadow-lg transition-all shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span>Plan Your Journey</span>
            <ArrowRight className="w-4 h-4 text-emerald-900" />
          </button>
        </div>
      </div>
    </section>
  );
};
