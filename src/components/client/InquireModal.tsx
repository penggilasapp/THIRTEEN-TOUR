import React, { useState, useEffect } from 'react';
import { useTour } from '../../context/TourContext';
import { 
  X, 
  Sparkles, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  HeartHandshake,
  FileCheck2,
  Copy
} from 'lucide-react';

export const InquireModal: React.FC = () => {
  const { 
    inquireModalOpen, 
    setInquireModalOpen, 
    preselectedPackageId, 
    packages, 
    destinations, 
    createInquiry,
    setActiveBookingRefForClient
  } = useTour();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Form Fields
  const [selectedDestinationId, setSelectedDestinationId] = useState<string>('dest-bromo');
  const [selectedPackageId, setSelectedPackageId] = useState<string>('');
  const [serviceTier, setServiceTier] = useState<'essential' | 'private' | 'premium_concierge'>('private');
  
  // Dates & Pax
  const [startDate, setStartDate] = useState<string>('2026-11-20');
  const [endDate, setEndDate] = useState<string>('2026-11-23');
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);

  // Preferences
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string>('');
  const [fitnessLevel, setFitnessLevel] = useState<'easy' | 'moderate' | 'active_adventurous'>('moderate');

  // Customer Contact
  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerCountry, setCustomerCountry] = useState<string>('United Kingdom');
  const [preferredLanguage, setPreferredLanguage] = useState<'en' | 'id' | 'de' | 'fr' | 'nl' | 'zh'>('en');

  // Validation
  const [validationError, setValidationError] = useState<string>('');

  useEffect(() => {
    if (preselectedPackageId) {
      const pkg = packages.find(p => p.id === preselectedPackageId);
      if (pkg) {
        setSelectedPackageId(pkg.id);
        setSelectedDestinationId(pkg.destinationId);
        setServiceTier(pkg.serviceTier);
      }
    } else {
      setSelectedPackageId('');
    }
  }, [preselectedPackageId, packages]);

  if (!inquireModalOpen) return null;

  const handleNext = () => {
    setValidationError('');
    if (step === 1) {
      if (!selectedDestinationId) {
        setValidationError('Please choose a destination.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!startDate) {
        setValidationError('Please select your preferred arrival date.');
        return;
      }
      if (adults < 1) {
        setValidationError('At least 1 adult guest required.');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');
    if (!customerName.trim() || !customerEmail.trim()) {
      setValidationError('Please fill in your name and email address so we can send your quotation.');
      return;
    }

    const bookingRef = createInquiry({
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim(),
      customerPhone: customerPhone.trim(),
      customerCountry,
      preferredLanguage,
      destinationId: selectedDestinationId,
      packageId: selectedPackageId || undefined,
      serviceTier,
      startDate,
      endDate,
      adults,
      children,
      specialRequests,
      dietaryRestrictions,
      leadSource: 'website_seo'
    });

    setSubmittedRef(bookingRef);
  };

  const handleCopyRef = () => {
    if (submittedRef) {
      navigator.clipboard.writeText(submittedRef);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleViewLiveItinerary = () => {
    if (submittedRef) {
      setActiveBookingRefForClient(submittedRef);
      setInquireModalOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleClose = () => {
    setInquireModalOpen(false);
    setSubmittedRef(null);
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-6 overflow-y-auto">
      <div className="bg-white border border-stone-200 rounded-3xl w-full max-w-2xl text-stone-800 shadow-2xl relative overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header bar */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF9F6] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-['Playfair_Display'] text-slate-900 leading-snug">
                Request a Bespoke Private Quotation
              </h3>
              <p className="text-[11px] sm:text-xs text-stone-500">
                THIRTEEN Operator Tour • Tailored Travel Design
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close inquiry dialog"
            className="p-2.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Stepper */}
        {!submittedRef && (
          <div className="px-4 sm:px-6 py-3 bg-white border-b border-stone-100 shrink-0">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className={`flex items-center gap-1.5 ${step >= 1 ? 'text-emerald-800 font-bold' : 'text-stone-400'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                  step >= 1 ? 'bg-[#0F2922] text-white' : 'bg-stone-100 text-stone-500'
                }`}>1</span>
                <span className="hidden sm:inline">Destination</span>
              </span>
              <span className="h-px w-3 sm:w-12 bg-stone-200"></span>
              <span className={`flex items-center gap-1.5 ${step >= 2 ? 'text-emerald-800 font-bold' : 'text-stone-400'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                  step >= 2 ? 'bg-[#0F2922] text-white' : 'bg-stone-100 text-stone-500'
                }`}>2</span>
                <span className="hidden sm:inline">Dates &amp; Guests</span>
              </span>
              <span className="h-px w-3 sm:w-12 bg-stone-200"></span>
              <span className={`flex items-center gap-1.5 ${step >= 3 ? 'text-emerald-800 font-bold' : 'text-stone-400'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                  step >= 3 ? 'bg-[#0F2922] text-white' : 'bg-stone-100 text-stone-500'
                }`}>3</span>
                <span className="hidden sm:inline">Preferences</span>
              </span>
              <span className="h-px w-3 sm:w-12 bg-stone-200"></span>
              <span className={`flex items-center gap-1.5 ${step >= 4 ? 'text-emerald-800 font-bold' : 'text-stone-400'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                  step >= 4 ? 'bg-[#0F2922] text-white' : 'bg-stone-100 text-stone-500'
                }`}>4</span>
                <span className="hidden sm:inline">Contact</span>
              </span>
            </div>

            {/* Mobile Active Step Subtitle */}
            <div className="sm:hidden text-center text-[11px] font-semibold text-emerald-950 mt-1.5">
              Step {step} of 4: {step === 1 ? 'Destination & Package' : step === 2 ? 'Dates & Guests' : step === 3 ? 'Preferences & Activity' : 'Contact Details'}
            </div>
          </div>
        )}

        {/* Content body */}
        <div className="p-6 overflow-y-auto grow">
          {validationError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
              {validationError}
            </div>
          )}

          {submittedRef ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center mx-auto shadow-sm">
                <FileCheck2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-2xl font-bold font-['Playfair_Display'] text-slate-900">
                  Inquiry Dispatched Successfully
                </h4>
                <p className="text-stone-600 text-sm max-w-md mx-auto mt-2">
                  Thank you, <span className="text-slate-900 font-semibold">{customerName}</span>. Your bespoke travel inquiry has been registered with our senior travel designer.
                </p>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 max-w-sm mx-auto text-left">
                <div className="text-[11px] text-stone-500 uppercase font-semibold">Your Tracking Reference</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xl font-mono font-bold text-emerald-900">{submittedRef}</span>
                  <button
                    onClick={handleCopyRef}
                    className="p-1.5 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 transition-colors flex items-center gap-1 text-xs"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl max-w-md mx-auto text-xs text-stone-700 space-y-2 text-left">
                <div className="flex items-center gap-2 font-semibold text-emerald-900">
                  <HeartHandshake className="w-4 h-4" />
                  <span>The THIRTEEN Bespoke Protocol:</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-stone-600 text-[11px]">
                  <li>CS verifies certified partner availability & route safety (Decision #021).</li>
                  <li>A personalized quotation with itemized costing will be generated and emailed.</li>
                  <li>No commitment until you review and confirm your customized itinerary.</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={handleViewLiveItinerary}
                  className="px-6 py-3 rounded-xl bg-[#0F2922] hover:bg-[#153A30] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Track in Client Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleClose}
                  className="px-5 py-3 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200 text-xs font-semibold"
                >
                  Close & Explore More
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* STEP 1: Destination & Package */}
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wider">
                      Select Primary Destination
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {destinations.map(d => (
                        <div
                          key={d.id}
                          onClick={() => {
                            setSelectedDestinationId(d.id);
                            const pkg = packages.find(p => p.destinationId === d.id);
                            setSelectedPackageId(pkg ? pkg.id : '');
                          }}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                            selectedDestinationId === d.id
                              ? 'border-emerald-800 bg-emerald-50/50 shadow-xs'
                              : 'border-stone-200 bg-stone-50 hover:bg-white hover:border-stone-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-sm text-slate-900">{d.name}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                              d.status === 'core' ? 'bg-emerald-100 text-emerald-800' :
                              d.status === 'development' ? 'bg-sky-100 text-sky-800' :
                              'bg-stone-200 text-stone-700'
                            }`}>
                              {d.status === 'core' ? 'Core Phase 1' : d.status === 'development' ? 'In Development' : 'Expansion'}
                            </span>
                          </div>
                          <p className="text-xs text-stone-500 mt-1 line-clamp-2">{d.tagline}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Matching Packages */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wider">
                      Select Curated Expedition or Custom Route
                    </label>
                    <div className="space-y-2">
                      <div
                        onClick={() => setSelectedPackageId('')}
                        className={`p-3 rounded-xl border cursor-pointer text-xs transition-all flex items-center justify-between ${
                          selectedPackageId === ''
                            ? 'border-emerald-800 bg-emerald-50/50 text-emerald-950 font-medium'
                            : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-white'
                        }`}
                      >
                        <div>
                          <div className="font-semibold text-slate-900">Custom Tailored Route (Build from Scratch)</div>
                          <div className="text-[11px] text-stone-500">Our travel designer will compose a 100% custom day-by-day itinerary</div>
                        </div>
                        {selectedPackageId === '' && <Check className="w-4 h-4 text-emerald-800" />}
                      </div>

                      {packages
                        .filter(p => !selectedDestinationId || p.destinationId === selectedDestinationId || p.destinationName.toLowerCase().includes('overland'))
                        .map(pkg => (
                          <div
                            key={pkg.id}
                            onClick={() => {
                              setSelectedPackageId(pkg.id);
                              setServiceTier(pkg.serviceTier);
                            }}
                            className={`p-3 rounded-xl border cursor-pointer text-xs transition-all flex items-center justify-between ${
                              selectedPackageId === pkg.id
                                ? 'border-emerald-800 bg-emerald-50/50 text-emerald-950'
                                : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-white'
                            }`}
                          >
                            <div>
                              <div className="font-semibold text-slate-900 flex items-center gap-2">
                                <span>{pkg.title}</span>
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-stone-200 text-stone-700 font-mono">
                                  {pkg.indicativeDuration}
                                </span>
                              </div>
                              <div className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">
                                {pkg.shortDescription}
                              </div>
                            </div>
                            {selectedPackageId === pkg.id && <Check className="w-4 h-4 text-emerald-800 shrink-0" />}
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Service Tier selection */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wider">
                      Service Tier Framework (Decision #020)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        { id: 'essential', label: 'Essential', desc: 'Verified local drivers, certified guides, standard heritage stays' },
                        { id: 'private', label: 'Private (Core)', desc: 'Dedicated private luxury chauffeur, hand-picked lodges, 24/7 CS' },
                        { id: 'premium_concierge', label: 'Premium Concierge', desc: '5-star suites, private historian, VIP airport fast-track' }
                      ].map(tier => (
                        <div
                          key={tier.id}
                          onClick={() => setServiceTier(tier.id as any)}
                          className={`p-3 rounded-xl border cursor-pointer text-xs transition-all ${
                            serviceTier === tier.id
                              ? 'border-emerald-800 bg-emerald-50/50'
                              : 'border-stone-200 bg-stone-50 hover:bg-white'
                          }`}
                        >
                          <div className="font-bold text-slate-900">{tier.label}</div>
                          <div className="text-[11px] text-stone-500 mt-1">{tier.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Dates & Guests */}
              {step === 2 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider">
                        Estimated Arrival Date
                      </label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-emerald-800 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider">
                        Estimated Departure Date
                      </label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-emerald-800 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider">
                        Adults (12+ yrs)
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="w-10 h-10 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-base"
                        >
                          -
                        </button>
                        <span className="text-base font-bold text-stone-900 w-8 text-center">{adults}</span>
                        <button
                          type="button"
                          onClick={() => setAdults(adults + 1)}
                          className="w-10 h-10 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-base"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider">
                        Children (under 12)
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setChildren(Math.max(0, children - 1))}
                          className="w-10 h-10 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-base"
                        >
                          -
                        </button>
                        <span className="text-base font-bold text-stone-900 w-8 text-center">{children}</span>
                        <button
                          type="button"
                          onClick={() => setChildren(children + 1)}
                          className="w-10 h-10 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-base"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-600">
                    <span className="font-semibold text-slate-900">Notice on Private Pacing:</span> All THIRTEEN tours are operated as private parties. You will never be joined by strangers; your vehicles, guides, and schedules are exclusively yours.
                  </div>
                </div>
              )}

              {/* STEP 3: Preferences & Safety */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider">
                      Physical Activity & Fitness Level
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        { id: 'easy', title: 'Gentle & Leisurely', desc: 'No steep ascents, comfortable walking paces' },
                        { id: 'moderate', title: 'Moderate', desc: 'Able to walk stairs and temple grounds comfortably' },
                        { id: 'active_adventurous', title: 'Active / Alpine', desc: 'Comfortable with midnight volcano hikes & rugged terrain' }
                      ].map(lvl => (
                        <div
                          key={lvl.id}
                          onClick={() => setFitnessLevel(lvl.id as any)}
                          className={`p-3 rounded-xl border cursor-pointer text-xs transition-all ${
                            fitnessLevel === lvl.id
                              ? 'border-emerald-800 bg-emerald-50/50'
                              : 'border-stone-200 bg-stone-50 hover:bg-white'
                          }`}
                        >
                          <div className="font-bold text-slate-900">{lvl.title}</div>
                          <div className="text-[11px] text-stone-500 mt-1">{lvl.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider">
                      Special Interests & Requests
                    </label>
                    <textarea
                      rows={3}
                      value={specialRequests}
                      onChange={e => setSpecialRequests(e.target.value)}
                      placeholder="e.g. Dedicated landscape photography focus, romantic honeymoon anniversary surprises, private tea masterclass, request for senior volcanologist guide..."
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-800 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider">
                      Dietary Preferences or Medical Notes
                    </label>
                    <input
                      type="text"
                      value={dietaryRestrictions}
                      onChange={e => setDietaryRestrictions(e.target.value)}
                      placeholder="e.g. Vegetarian, Halal, Nut allergy, Gluten-sensitive, Asthma (for Ijen gas checks)"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-800 focus:bg-white"
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: Customer Contact Info */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={e => setCustomerName(e.target.value)}
                        placeholder="e.g. Alexander Mitchell"
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-800 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={customerEmail}
                        onChange={e => setCustomerEmail(e.target.value)}
                        placeholder="alexander@domain.com"
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-800 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider">
                        Phone / WhatsApp (with Country Code)
                      </label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={e => setCustomerPhone(e.target.value)}
                        placeholder="e.g. +44 7911 123456"
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-800 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider">
                        Country of Residence
                      </label>
                      <input
                        type="text"
                        value={customerCountry}
                        onChange={e => setCustomerCountry(e.target.value)}
                        placeholder="e.g. United Kingdom, Australia, USA, Netherlands"
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-800 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider">
                        Preferred Communication Language
                      </label>
                      <select
                        value={preferredLanguage}
                        onChange={e => setPreferredLanguage(e.target.value as any)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-emerald-800"
                      >
                        <option value="en">English (Default)</option>
                        <option value="id">Bahasa Indonesia</option>
                        <option value="de">Deutsch (German)</option>
                        <option value="fr">Français (French)</option>
                        <option value="nl">Nederlands (Dutch)</option>
                        <option value="zh">Mandarin</option>
                      </select>
                    </div>
                    <div className="flex items-center text-xs text-stone-500 p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                      <span>Inquiries are acknowledged automatically; human designers prepare quotation costing during business hours.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer actions */}
        {!submittedRef && (
          <div className="px-4 sm:px-6 py-4 bg-[#FAF9F6] border-t border-stone-200 flex items-center justify-between shrink-0">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((step - 1) as any)}
                className="px-4 py-2.5 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200 text-xs font-semibold flex items-center gap-1.5 transition-colors min-h-[44px] cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div></div>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl bg-[#0F2922] hover:bg-[#153A30] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm min-h-[44px] cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2.5 rounded-xl bg-[#0F2922] hover:bg-[#153A30] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md min-h-[44px] cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>Submit Bespoke Inquiry</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
