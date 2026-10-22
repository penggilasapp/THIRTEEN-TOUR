import React from 'react';
import { useTour } from '../../context/TourContext';
import { ShieldCheck, CheckCircle2, Award, Star } from 'lucide-react';

export const CertifiedPartnerSection: React.FC = () => {
  const { partners } = useTour();

  return (
    <section id="safety-network" className="py-24 bg-[#FAF9F6] text-slate-800 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-bold text-emerald-800 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Section 9: Certified Partner Network</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-['Playfair_Display'] text-slate-900">
              Asset-Light Excellence, Locally Rooted
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              We do not rely on generic booking platforms. Under Decision #005, THIRTEEN operates through a strictly audited network of verified local transport alliances, mountain miner guilds, and heritage scholars.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-stone-200 text-xs space-y-1 shadow-xs">
            <div className="text-emerald-800 font-bold flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>100% Audit Compliance</span>
            </div>
            <p className="text-stone-500 text-[11px]">
              Every partner is verified for vehicle safety, commercial permits, and high-altitude emergency response.
            </p>
          </div>
        </div>

        {/* Partners Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {partners.slice(0, 3).map((partner) => (
            <div
              key={partner.id}
              className="p-5 rounded-2xl bg-white border border-stone-200 hover:shadow-lg transition-all space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold uppercase tracking-wider">
                  {partner.destination}
                </span>
                <div className="flex items-center gap-1 text-xs text-amber-700 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{partner.safetyRating.toFixed(1)} Safety Rating</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm font-['Playfair_Display']">
                  {partner.name}
                </h4>
                <p className="text-xs text-stone-500 mt-1">
                  Lead: <span className="text-stone-700 font-medium">{partner.contactPerson}</span>
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 text-[11px] text-stone-600">
                <span className="text-stone-400 block uppercase font-mono text-[9px]">Verified Equipment & Fleet</span>
                <span className="text-stone-800 font-medium mt-0.5 block">{partner.vehicleFleetOrEquipment || partner.rateCardSummary}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-[10px] text-stone-500">
                <span className="font-mono">Permit: {partner.licenseNumber}</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Audited
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 4 Pillars of Partner Verification */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs shadow-xs">
          <div className="space-y-2">
            <span className="font-bold text-emerald-900 text-xs block">1. Legal & Identity Verification</span>
            <p className="text-stone-600 text-[11px] leading-relaxed">
              Official commercial transportation permits, tour operator endorsements, and mountain guide syndicate registrations.
            </p>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-emerald-900 text-xs block">2. Fleet & Gear Certification</span>
            <p className="text-stone-600 text-[11px] leading-relaxed">
              Mandatory brake and roll-cage inspections for Bromo 4x4 jeeps; certified 3M dual-filter gas respirators for Mount Ijen.
            </p>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-emerald-900 text-xs block">3. Clear Contractual SLA</span>
            <p className="text-stone-600 text-[11px] leading-relaxed">
              Written agreements covering punctuality, passenger safety, insurance coverage, and transparent cancellation protocols.
            </p>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-emerald-900 text-xs block">4. Redundancy & Alternates</span>
            <p className="text-stone-600 text-[11px] leading-relaxed">
              Pre-approved backup transport and alternative guides ready for deployment in case of sudden mechanical or volcanic alerts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
