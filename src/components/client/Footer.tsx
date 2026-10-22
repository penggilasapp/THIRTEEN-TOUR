import React, { useState } from 'react';
import { useTour } from '../../context/TourContext';
import { CONTACT_INFO_DATA } from '../../data/policyData';
import { PolicyModal, PolicyModalType } from './PolicyModal';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Lock, 
  HelpCircle, 
  FileText, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRight,
  Instagram,
  Youtube,
  Download,
  Database
} from 'lucide-react';
import { DataExportModal } from '../common/DataExportModal';

export const Footer: React.FC = () => {
  const { setViewMode, setClientPage } = useTour();
  const [activePolicyModal, setActivePolicyModal] = useState<PolicyModalType>(null);
  const [dataExportOpen, setDataExportOpen] = useState(false);

  return (
    <>
      <footer className="bg-[#091A14] text-emerald-100/70 text-xs border-t border-emerald-950 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* 1. Brand Info & Statement */}
            <div className="space-y-4">
              <div 
                onClick={() => setClientPage('home')}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-xl bg-white text-[#091A14] flex items-center justify-center font-black text-lg font-serif shadow-sm group-hover:scale-105 transition-transform">
                  13
                </div>
                <div>
                  <div className="font-extrabold text-white text-base font-['Playfair_Display']">
                    THIRTEEN
                  </div>
                  <div className="text-[10px] text-emerald-300 font-sans tracking-widest uppercase">
                    Bespoke Indonesian Expeditions
                  </div>
                </div>
              </div>

              <p className="text-emerald-100/70 text-xs leading-relaxed">
                Asset-light hybrid tour operator delivering bespoke, certified private expeditions across Bali, Mount Bromo, Mount Ijen, and Yogyakarta.
              </p>

              <div className="text-[11px] text-emerald-400/70 font-sans">
                Tailored Journeys Across Java &amp; Bali • Registered Operator
              </div>

              {/* Admin Portal & Data Export Gateways */}
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => setViewMode('admin')}
                  className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 text-xs flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Access Operator Admin Portal</span>
                </button>

                <button
                  onClick={() => setDataExportOpen(true)}
                  className="py-2 px-3 rounded-xl bg-emerald-900/40 hover:bg-emerald-900/80 text-emerald-200 border border-emerald-800/60 text-xs flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Export Data &amp; Project Archive</span>
                </button>
              </div>
            </div>

            {/* 2. Customer Resources (FAQ & Booking Info & Pages) */}
            <div className="space-y-3">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                Guest Support &amp; Bookings
              </h4>
              <ul className="space-y-2.5 text-xs text-emerald-100/80">
                <li>
                  <button
                    onClick={() => setClientPage('faq')}
                    className="hover:text-white transition-colors flex items-center gap-2 text-left cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Frequently Asked Questions (FAQ)</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePolicyModal('booking_info')}
                    className="hover:text-white transition-colors flex items-center gap-2 text-left cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Booking Information &amp; Flow</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setClientPage('destinations')}
                    className="hover:text-white transition-colors flex items-center gap-2 text-left cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Destinations (Bali, Bromo, Ijen, Yogyakarta)</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setClientPage('experiences')}
                    className="hover:text-white transition-colors flex items-center gap-2 text-left cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Curated Natural &amp; Cultural Experiences</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setClientPage('tours')}
                    className="hover:text-white transition-colors flex items-center gap-2 text-left cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Private Tour &amp; Expedition Catalog</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setClientPage('about-us')}
                    className="hover:text-white transition-colors flex items-center gap-2 text-left cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                    <span>About Us &amp; Standards</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setClientPage('travel-guide')}
                    className="hover:text-white transition-colors flex items-center gap-2 text-left cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Field Articles &amp; Destination Guides</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setClientPage('contact')}
                    className="hover:text-white transition-colors flex items-center gap-2 text-left cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Contact Information &amp; Support</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* 3. Operational Policies (Cancellation, Terms, Privacy) */}
            <div className="space-y-3">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                Official Policies
              </h4>
              <ul className="space-y-2.5 text-xs text-emerald-100/80">
                <li>
                  <button
                    onClick={() => setActivePolicyModal('cancellation')}
                    className="hover:text-white transition-colors flex items-center gap-2 text-left cursor-pointer"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    <span>Cancellation &amp; Refund Policy</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePolicyModal('terms')}
                    className="hover:text-white transition-colors flex items-center gap-2 text-left cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Terms &amp; Conditions of Service</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePolicyModal('privacy')}
                    className="hover:text-white transition-colors flex items-center gap-2 text-left cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Guest Data Privacy Policy</span>
                  </button>
                </li>
                <li className="pt-1 text-[11px] text-emerald-400/70">
                  <span>Tailored Quotation Terms • Flexible Reservations</span>
                </li>
                <li className="text-[11px] text-emerald-400/70">
                  <span>Certified Alpine Safety Respirators for Mount Ijen</span>
                </li>
              </ul>
            </div>

            {/* 4. Contact Information & Social Media */}
            <div className="space-y-4">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                Contact Information
              </h4>

              <div className="space-y-2 text-xs text-emerald-100/90">
                <div className="flex items-start gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-300 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white">{CONTACT_INFO_DATA.phoneWhatsApp}</span>
                    <span className="text-[10px] text-emerald-300 block">24/7 Priority WhatsApp</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Mail className="w-3.5 h-3.5 text-emerald-300 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white">{CONTACT_INFO_DATA.reservationEmail}</span>
                    <span className="text-[10px] text-emerald-300/80 block">Reservations &amp; Custom Quotations</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-300 shrink-0 mt-0.5" />
                  <span className="text-emerald-100/80">Sanur (Bali) • Banyuwangi • Yogyakarta</span>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="pt-2 border-t border-emerald-900/60 space-y-2">
                <h5 className="text-[11px] font-bold text-white uppercase tracking-wider">
                  Official Channels
                </h5>
                <div className="flex items-center gap-2 flex-wrap">
                  {CONTACT_INFO_DATA.socialMedia.map((sm, i) => (
                    <a
                      key={i}
                      href={sm.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] flex items-center gap-1.5 transition-colors border border-white/10"
                    >
                      {sm.name.includes('Instagram') && <Instagram className="w-3 h-3 text-pink-400" />}
                      {sm.name.includes('YouTube') && <Youtube className="w-3 h-3 text-red-400" />}
                      {sm.name.includes('WhatsApp') && <Phone className="w-3 h-3 text-emerald-400" />}
                      <span>{sm.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Credits & Legal Compliance */}
          <div className="pt-8 border-t border-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-emerald-300/60">
            <div>
              © 2026 THIRTEEN Operator Tour. All rights reserved. Registered Indonesian Hybrid Tour Operator.
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setActivePolicyModal('terms')} className="hover:text-white cursor-pointer">
                Terms &amp; Conditions
              </button>
              <span>•</span>
              <button onClick={() => setActivePolicyModal('privacy')} className="hover:text-white cursor-pointer">
                Privacy Policy
              </button>
              <span>•</span>
              <button onClick={() => setActivePolicyModal('cancellation')} className="hover:text-white cursor-pointer">
                Cancellation Policy
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Policy Document Modal */}
      <PolicyModal
        type={activePolicyModal}
        onClose={() => setActivePolicyModal(null)}
      />

      {/* Source Data Export Modal */}
      <DataExportModal
        isOpen={dataExportOpen}
        onClose={() => setDataExportOpen(false)}
      />
    </>
  );
};
