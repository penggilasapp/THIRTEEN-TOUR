import React from 'react';
import { useTour } from '../../context/TourContext';
import { Check, Sparkles, ShieldCheck, Crown, Compass, ArrowRight } from 'lucide-react';

export const ServiceTiersSection: React.FC = () => {
  const { openInquireForPackage } = useTour();

  const tiers = [
    {
      id: 'essential',
      name: 'Essential Tier',
      tagline: 'Authentic & Verified',
      description: 'Ideal for independent adventurers seeking verified logistics and certified mountain safety without excessive luxury frills.',
      icon: Compass,
      highlights: [
        'Dedicated air-conditioned private vehicle with licensed driver',
        'Certified English-speaking local mountain & site guides',
        'Handpicked authentic boutique guesthouses & 3-star character lodges',
        'All mandatory national park entry fees & safety permits included',
        'Standard 3M gas respirators for Mount Ijen crater ascent'
      ],
      idealFor: 'Couples & small groups prioritizing adventure and value'
    },
    {
      id: 'private',
      name: 'Private Tier (Core Standard)',
      tagline: 'Elevated Comfort & Pacing',
      popular: true,
      description: 'Our signature standard. Seamless private comfort, premier 4-star mountain chalets, and dedicated travel specialist concierge.',
      icon: Sparkles,
      highlights: [
        'Premium late-model private MPV (Toyota Innova Zenix Hybrid or similar)',
        'Private 4x4 Toyota Land Cruiser for Mount Bromo caldera sunrise',
        'Hand-selected premier highland resorts (e.g. Jiwa Jawa, Dialoog Banyuwangi)',
        'Senior local specialists with cultural & geological mastery',
        'Chilled bottled mineral water, artisan snacks & wet towels in vehicles',
        '24/7 dedicated travel specialist support via WhatsApp'
      ],
      idealFor: 'Discerning couples, families, and photographers'
    },
    {
      id: 'premium_concierge',
      name: 'Premium Concierge',
      tagline: 'Ultra-Luxury & VIP Access',
      description: 'The pinnacle of bespoke Indonesian travel. 5-star heritage sanctuaries, private historians, and VIP airport fast-track.',
      icon: Crown,
      highlights: [
        'Executive luxury transport (Toyota Alphard / VIP HiAce Premio)',
        'Exclusive dawn access passes before public monument opening (Borobudur)',
        'Luxury 5-star suites & villas (Amanjiwo, Mandapa, Plataran Bromo)',
        'Private university archaeologist / senior vulcanologist private accompaniment',
        'VIP fast-track immigration and luggage handling at major airports',
        'Tailored private degustation banquets & champagne crater toasts'
      ],
      idealFor: 'Honeymooners, executives, and luxury collectors'
    }
  ];

  return (
    <section id="service-tiers" className="py-24 bg-[#FAF9F6] text-slate-800 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
            <Crown className="w-3.5 h-3.5 text-emerald-700" />
            <span>Decision Record #020</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Playfair_Display'] text-slate-900">
            Three Distinct Tiers of Craftsmanship
          </h2>

          <p className="text-stone-600 text-sm leading-relaxed">
            Every THIRTEEN expedition is 100% private. Choose the service tier that matches your desired level of hospitality, vehicle specification, and lodging caliber.
          </p>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.id}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all relative ${
                  tier.popular
                    ? 'bg-white border-2 border-emerald-800 shadow-xl'
                    : 'bg-white border border-stone-200 hover:border-stone-300 shadow-sm'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-[#0F2922] text-white shadow-md">
                      Most Requested Standard
                    </span>
                  </div>
                )}

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase font-bold text-emerald-800 tracking-wider">
                        {tier.tagline}
                      </span>
                      <h3 className="text-xl font-bold font-['Playfair_Display'] text-slate-900 mt-0.5">
                        {tier.name}
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {tier.description}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-stone-100">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400">
                      Included Tier Inclusions
                    </span>
                    <ul className="space-y-2">
                      {tier.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-stone-700">
                          <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8 space-y-4">
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-[11px] text-stone-600">
                    <span className="font-semibold text-stone-800">Best For: </span>
                    <span>{tier.idealFor}</span>
                  </div>

                  <button
                    onClick={() => openInquireForPackage()}
                    className={`w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      tier.popular
                        ? 'bg-[#0F2922] hover:bg-[#153A30] text-white shadow-md'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                    }`}
                  >
                    <span>Request {tier.name} Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
