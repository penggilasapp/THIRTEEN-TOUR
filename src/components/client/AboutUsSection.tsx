import React from 'react';
import { useTour } from '../../context/TourContext';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  Users, 
  HeartHandshake, 
  Sparkles, 
  Crown, 
  Compass, 
  Building,
  Truck,
  Mountain,
  Lock,
  ArrowRight
} from 'lucide-react';

export const AboutUsSection: React.FC = () => {
  const { partners, openInquireForPackage } = useTour();

  return (
    <section id="about-us" className="py-24 bg-[#FAF9F6] text-stone-800 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
            <Building className="w-3.5 h-3.5 text-emerald-700" />
            <span>About Us &amp; Operational Governance</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Playfair_Display'] text-slate-900">
            Profile, Service Approach &amp; Partner Standards
          </h2>

          <p className="text-stone-600 text-sm leading-relaxed">
            THIRTEEN Operator Tour is an asset-light hybrid tour operator engineered to connect discerning international travelers with verified, high-touch Indonesian expeditions across Bali, Mount Bromo, Mount Ijen, and Yogyakarta.
          </p>
        </div>

        {/* 1. Brand Profile & Core Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-['Playfair_Display'] text-slate-900">
              Company Profile
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              We bridge international bespoke travel standards with grassroots local mastery across Indonesia's most dramatic landscapes. Every itinerary is engineered with zero rigid mass tourism bureaucracy, providing fluid pacing and genuine cultural depth.
            </p>
            <div className="pt-2 text-[11px] text-emerald-800 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Registered Indonesian Tour Operator Entity</span>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-['Playfair_Display'] text-slate-900">
              Service Approach
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              100% strictly private expeditions. We reject the crowded tour-bus model. Operating on a tailored quotation philosophy, every journey is custom-calculated to your exact party size with guaranteed locked rates and personal flexibility.
            </p>
            <div className="pt-2 text-[11px] text-emerald-800 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Customer Service SLA &lt; 15 Minutes Response</span>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-['Playfair_Display'] text-slate-900">
              Audited Partner Standards
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every local vendor passes strict periodic audits: certified guide licensing, 4x4 mechanical inspections, dual-cartridge sulfur respirators, and eco-conscious trail practices.
            </p>
            <div className="pt-2 text-[11px] text-emerald-800 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{partners.length} Active Certified Local Partners</span>
            </div>
          </div>
        </div>

        {/* 2. Three Service Tiers Comparison */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-800">
              Service Tier Architecture
            </span>
            <h3 className="text-2xl font-bold font-['Playfair_Display'] text-slate-900 mt-1">
              Three Distinct Levels of Luxury &amp; Pacing
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Essential */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Essential Tier</span>
                <Compass className="w-5 h-5 text-stone-400" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Essential Private</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Seamless core logistics, dedicated private chauffeur, licensed guides, and clean highland lodge suites for active independent explorers.
              </p>
              <ul className="space-y-2 text-xs text-stone-700 pt-2 border-t border-stone-100">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Private air-conditioned MPV &amp; fuel</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Licensed local English-speaking guide</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Official national park conservation permits</li>
              </ul>
            </div>

            {/* Private Signature */}
            <div className="p-6 rounded-3xl bg-[#0F2922] text-white space-y-4 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 px-3 py-1 bg-emerald-500 text-emerald-950 font-bold text-[10px] rounded-bl-xl uppercase tracking-wider">
                Most Popular
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">Signature Tier</span>
                <Sparkles className="w-5 h-5 text-emerald-300" />
              </div>
              <h4 className="text-lg font-bold font-['Playfair_Display'] text-white">Private Signature</h4>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                Full private luxury with boutique heritage resorts, dedicated 4x4 Toyota Land Cruisers, and gourmet sunrise picnics atop calderas.
              </p>
              <ul className="space-y-2 text-xs text-emerald-100/90 pt-2 border-t border-emerald-800">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> Executive luxury van / premium SUV</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> Private 4x4 Toyota Land Cruiser</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> 4 &amp; 5-star handpicked boutique lodges</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> 3M dual-cartridge respirators for Ijen</li>
              </ul>
            </div>

            {/* Premium Concierge */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Concierge Tier</span>
                <Crown className="w-5 h-5 text-amber-600" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Premium Concierge</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Ultra-luxe bespoke travel with 24/7 private concierge liaison, premier sanctuary villas with private pools, and VIP airport fast-track.
              </p>
              <ul className="space-y-2 text-xs text-stone-700 pt-2 border-t border-stone-100">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> VIP fast-track airport greeting</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Premier suites (Amanjiwo / Plataran / Mandapa)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Private culinary kurator &amp; senior historian</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Door-to-door luggage handling</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. Partner Standards Showcase */}
        <div className="p-8 rounded-3xl bg-white border border-stone-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Audited Network</span>
              <h3 className="text-xl font-bold font-['Playfair_Display'] text-slate-900 mt-0.5">
                Sustainable Local Partner Standards
              </h3>
            </div>
            <button
              onClick={() => openInquireForPackage()}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl bg-[#0F2922] text-white text-xs font-bold hover:bg-[#153A30] transition-colors self-start sm:self-center cursor-pointer"
            >
              <span>Consult Travel Designer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-800">
                <Truck className="w-5 h-5" />
              </div>
              <h5 className="font-bold text-xs text-slate-900">Chauffeur Transport Fleet</h5>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Mandatory periodic roadworthiness certification (KIR), sanitised cabins, all-passenger safety belts, and veteran mountain drivers.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-800">
                <Mountain className="w-5 h-5" />
              </div>
              <h5 className="font-bold text-xs text-slate-900">Alpine &amp; Cultural Guides</h5>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                HPI/APGI officially licensed, multilingual, certified in wilderness First Aid, and deeply committed to natural conservation.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-800">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h5 className="font-bold text-xs text-slate-900">Bromo 4x4 Fleet</h5>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Maintained Toyota Land Cruisers piloted by local indigenous Tengger drivers holding official TNBTS park association licenses.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-800">
                <Building className="w-5 h-5" />
              </div>
              <h5 className="font-bold text-xs text-slate-900">Boutique Stays &amp; Lodges</h5>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Curated sanctuaries blending authentic vernacular Indonesian architecture with international hygiene and hospitality standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
