import React from 'react';
import { 
  FAQS_DATA, 
  BOOKING_INFO_DATA, 
  CANCELLATION_POLICY_DATA, 
  TERMS_CONDITIONS_DATA, 
  PRIVACY_POLICY_DATA, 
  CONTACT_INFO_DATA 
} from '../../data/policyData';
import { 
  X, 
  HelpCircle, 
  FileText, 
  AlertTriangle, 
  ShieldCheck, 
  Lock, 
  Phone, 
  CheckCircle2, 
  Printer
} from 'lucide-react';

export type PolicyModalType = 'faq' | 'booking_info' | 'cancellation' | 'terms' | 'privacy' | 'contact_info' | null;

interface PolicyModalProps {
  type: PolicyModalType;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white border border-stone-200 rounded-3xl w-full max-w-3xl text-stone-800 shadow-2xl relative overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-stone-200 flex items-center justify-between gap-3 bg-[#FAF9F6] shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 shrink-0">
              {type === 'faq' && <HelpCircle className="w-5 h-5" />}
              {type === 'booking_info' && <FileText className="w-5 h-5" />}
              {type === 'cancellation' && <AlertTriangle className="w-5 h-5 text-amber-700" />}
              {type === 'terms' && <ShieldCheck className="w-5 h-5" />}
              {type === 'privacy' && <Lock className="w-5 h-5" />}
              {type === 'contact_info' && <Phone className="w-5 h-5" />}
            </div>
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800 block truncate">
                THIRTEEN Operator Tour • Operational Governance
              </span>
              <h3 className="text-base sm:text-2xl font-bold font-['Playfair_Display'] text-slate-900 truncate">
                {type === 'faq' && 'Frequently Asked Questions (FAQ)'}
                {type === 'booking_info' && BOOKING_INFO_DATA.title}
                {type === 'cancellation' && CANCELLATION_POLICY_DATA.title}
                {type === 'terms' && TERMS_CONDITIONS_DATA.title}
                {type === 'privacy' && PRIVACY_POLICY_DATA.title}
                {type === 'contact_info' && 'Contact Information & 24/7 Concierge'}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handlePrint}
              title="Print Policy Document"
              className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 cursor-pointer"
              aria-label="Print document"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm">
          {/* FAQ CONTENT */}
          {type === 'faq' && (
            <div className="space-y-6">
              <p className="text-xs text-stone-600 leading-relaxed">
                Official guidance addressing frequently asked questions regarding bespoke private expeditions, transparent costing, and alpine safety protocols across Indonesia.
              </p>
              <div className="space-y-4">
                {FAQS_DATA.map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        Q
                      </span>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                        {item.question}
                      </h4>
                    </div>
                    <div className="flex items-start gap-2.5 pt-1 pl-7 text-xs text-stone-600 leading-relaxed">
                      <span>{item.answer}</span>
                    </div>
                    <div className="pl-7 pt-1">
                      <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        {item.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BOOKING INFO CONTENT */}
          {type === 'booking_info' && (
            <div className="space-y-6">
              <p className="text-xs text-stone-600 leading-relaxed">
                {BOOKING_INFO_DATA.subtitle}. Every confirmed expedition adheres to our Phase 1 Business Foundation:
              </p>
              <div className="space-y-4">
                {BOOKING_INFO_DATA.steps.map((st) => (
                  <div key={st.step} className="p-5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0F2922] text-white flex items-center justify-center font-bold text-sm shrink-0">
                      {st.step}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{st.title}</h4>
                      <p className="text-xs text-stone-600 leading-relaxed">{st.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CANCELLATION POLICY CONTENT */}
          {type === 'cancellation' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                {CANCELLATION_POLICY_DATA.notice}
              </div>

              <div className="space-y-4">
                {CANCELLATION_POLICY_DATA.rules.map((rule, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{rule.period}</h4>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0F2922] text-emerald-200">
                        {rule.refundRate}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">{rule.details}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TERMS & CONDITIONS CONTENT */}
          {type === 'terms' && (
            <div className="space-y-5">
              <p className="text-xs text-stone-600 leading-relaxed">
                These general conditions govern all confirmed participants registered under an official THIRTEEN Operator Tour itinerary voucher:
              </p>
              {TERMS_CONDITIONS_DATA.sections.map((sec, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{sec.title}</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">{sec.content}</p>
                </div>
              ))}
            </div>
          )}

          {/* PRIVACY POLICY CONTENT */}
          {type === 'privacy' && (
            <div className="space-y-5">
              <p className="text-xs text-stone-600 leading-relaxed">
                Guest identity and passport privacy compliance standards:
              </p>
              {PRIVACY_POLICY_DATA.sections.map((sec, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{sec.title}</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">{sec.content}</p>
                </div>
              ))}
            </div>
          )}

          {/* CONTACT INFO CONTENT */}
          {type === 'contact_info' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-[#0F2922] text-white space-y-3">
                <h4 className="font-bold text-sm text-emerald-300">Direct Concierge Channels</h4>
                <div className="space-y-1.5 text-xs text-emerald-100">
                  <p>Priority WhatsApp: <strong>{CONTACT_INFO_DATA.phoneWhatsApp}</strong></p>
                  <p>Reservations Email: <strong>{CONTACT_INFO_DATA.reservationEmail}</strong></p>
                  <p>Duty Emergency Desk: <strong>{CONTACT_INFO_DATA.emergencyEmail}</strong></p>
                  <p>Service Hours: <strong>{CONTACT_INFO_DATA.operatingHours}</strong></p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Official Operational Offices</h4>
                {CONTACT_INFO_DATA.offices.map((of, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                    <div className="font-bold text-xs text-slate-900">{of.city}</div>
                    <div className="text-xs text-stone-600">{of.address}</div>
                    <div className="text-[10px] text-emerald-800 font-semibold">{of.role}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-[#FAF9F6] border-t border-stone-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
          <span className="text-[11px] text-stone-500 text-center sm:text-left">
            Compliant with Indonesian Tourism &amp; Conservation Regulations
          </span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 min-h-[44px] rounded-xl bg-[#0F2922] text-white text-xs font-bold hover:bg-[#153A30] cursor-pointer flex items-center justify-center text-center"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
};
