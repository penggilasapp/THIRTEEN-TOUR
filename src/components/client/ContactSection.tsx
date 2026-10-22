import React, { useState } from 'react';
import { CONTACT_INFO_DATA } from '../../data/policyData';
import { useTour } from '../../context/TourContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  ExternalLink,
  HelpCircle
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { createInquiry, setClientPage } = useTour();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [destination, setDestination] = useState('dest-bromo');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      createInquiry({
        customerName: name,
        customerEmail: email,
        customerPhone: phone || '+6281234567890',
        customerCountry: 'United Kingdom',
        preferredLanguage: 'en',
        destinationId: destination,
        serviceTier: 'private',
        startDate: '2026-11-20',
        endDate: '2026-11-23',
        adults: 2,
        children: 0,
        specialRequests: message || 'Customer inquiry submitted via Contact Form',
        leadSource: 'website_seo'
      });
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" className="py-24 bg-[#FAF9F6] text-stone-800 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
            <span>Customer Support &amp; Concierge Assistance</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Playfair_Display'] text-slate-900">
            Contact Information &amp; Guest Support
          </h2>

          <p className="text-stone-600 text-sm leading-relaxed">
            {CONTACT_INFO_DATA.subheadline}
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct channels & Offices (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Priority Box */}
            <div className="p-6 rounded-3xl bg-[#0F2922] text-white space-y-4 shadow-md">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                24/7 Rapid Response Desk
              </span>
              <h3 className="text-xl font-bold font-['Playfair_Display'] text-white">
                WhatsApp Emergency &amp; Concierge Liaison
              </h3>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                Connect directly with our designated Duty Manager for instant consultation, real-time fleet availability, or urgent in-journey assistance.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/6281234567890?text=${encodeURIComponent('Hello THIRTEEN Concierge, I would like to consult on a private Indonesian expedition.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs transition-colors shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>24/7 Priority WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>

                <a
                  href={`mailto:${CONTACT_INFO_DATA.reservationEmail}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors"
                >
                  <Mail className="w-4 h-4 text-emerald-300" />
                  <span>Email Reservations</span>
                </a>
              </div>

              <div className="pt-2 border-t border-emerald-800/80 flex items-center gap-2 text-[11px] text-emerald-300">
                <Clock className="w-3.5 h-3.5" />
                <span>{CONTACT_INFO_DATA.operatingHours}</span>
              </div>
            </div>

            {/* Offices List */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Operational Desks &amp; Field Hubs
              </h4>

              {CONTACT_INFO_DATA.offices.map((office, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white border border-stone-200 space-y-1 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>{office.city}</span>
                  </div>
                  <p className="text-[11px] text-stone-600 pl-5 leading-relaxed">
                    {office.address}
                  </p>
                  <span className="text-[10px] text-emerald-800 font-medium pl-5 block">
                    {office.role}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick FAQ Knowledge Base Card */}
            <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-950">
                <HelpCircle className="w-4 h-4 text-emerald-700" />
                <span>Frequently Asked Questions</span>
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Need fast information regarding visa-on-arrival, 30% deposit milestones, Mount Ijen respirator standards, or luggage transfers?
              </p>
              <button
                type="button"
                onClick={() => setClientPage('faq')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 hover:underline pt-1 cursor-pointer"
              >
                <span>Explore FAQ &amp; Requirements</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Customer Assistance Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-stone-200 shadow-sm flex flex-col justify-between">
            {formSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-['Playfair_Display'] text-slate-900">
                  Message Dispatched to Travel Designer
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{name}</strong>! Your inquiry has been routed to our expedition team. A dedicated Travel Designer will follow up via email / WhatsApp in under 15 minutes.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setName('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-[#0F2922] text-white text-xs font-bold hover:bg-[#153A30] transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold font-['Playfair_Display'] text-slate-900">
                    Guest Assistance &amp; Custom Expedition Consultation
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Tell us about your upcoming travel vision. Initial consultation and bespoke itinerary crafting are 100% complimentary.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Jessica Sterling"
                      className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-stone-200 text-base sm:text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-stone-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jessica@example.com"
                      className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-stone-200 text-base sm:text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-stone-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      WhatsApp / Mobile Phone
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+44 7123 456789"
                      className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-stone-200 text-base sm:text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-stone-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Primary Destination of Interest
                    </label>
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-stone-200 text-base sm:text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-stone-50"
                    >
                      <option value="dest-bromo">Mount Bromo (Caldera Sunrise &amp; Sea of Sand)</option>
                      <option value="dest-ijen">Mount Ijen (Blue Fire &amp; Acidic Lake)</option>
                      <option value="dest-bali">Bali (Highlands, Munduk &amp; Ubud)</option>
                      <option value="dest-yogyakarta">Yogyakarta (Borobudur &amp; Jomblang Cave)</option>
                      <option value="dest-overland">Trans-Island Overland (Java to Bali)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Expedition Details / Special Requests
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share your ideal travel window, estimated party size, dietary preferences, or specific physical preparation questions..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-base sm:text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-stone-50 leading-relaxed"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Your private information is encrypted &amp; never shared</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-3 min-h-[44px] rounded-xl bg-[#0F2922] hover:bg-[#153A30] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-50 text-center"
                  >
                    {isSubmitting ? (
                      <span>Sending Inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Send Consultation Request</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
