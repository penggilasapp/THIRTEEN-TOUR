import React, { useState } from 'react';
import { useTour } from '../../context/TourContext';
import { 
  FileText, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MessageCircle, 
  Printer, 
  ChevronDown,
  ChevronUp,
  X,
  CreditCard,
  Building,
  Sparkles
} from 'lucide-react';

export const ClientPortalView: React.FC = () => {
  const { 
    bookings, 
    activeBookingRefForClient, 
    setActiveBookingRefForClient
  } = useTour();

  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  if (!activeBookingRefForClient) return null;

  const booking = bookings.find(b => b.bookingRef === activeBookingRefForClient);

  if (!booking) {
    return (
      <div className="bg-stone-100 border-b border-stone-200 py-8 px-4 text-center">
        <p className="text-stone-600 text-sm">Booking reference {activeBookingRefForClient} not found.</p>
        <button
          onClick={() => setActiveBookingRefForClient(null)}
          className="mt-3 px-4 py-1.5 rounded-lg bg-stone-800 text-white text-xs"
        >
          Dismiss
        </button>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Booking Confirmed</span>;
      case 'quotation_sent':
        return <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 border border-sky-200 text-xs font-semibold flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> Quotation Ready</span>;
      case 'payment_pending':
        return <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Awaiting Deposit</span>;
      case 'in_progress':
        return <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200 text-xs font-semibold">In Progress</span>;
      case 'completed':
        return <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-200 text-xs font-semibold">Completed</span>;
      default:
        return <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-700 border border-stone-200 text-xs font-semibold">Under Review</span>;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#FAF9F6] border-b border-stone-200 text-stone-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Top Control Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 font-mono font-bold text-lg">
              TT
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-stone-500">Client Itinerary Portal</span>
                <span className="text-stone-300">•</span>
                <span className="font-mono text-xs font-bold text-emerald-800">{booking.bookingRef}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-['Playfair_Display'] text-slate-900">
                {booking.tripDetails.packageTitle}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {getStatusBadge(booking.pipelineStatus)}
            
            <button
              onClick={handlePrint}
              title="Print Voucher & Itinerary"
              className="p-2 rounded-xl bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 transition-colors shadow-xs"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveBookingRefForClient(null)}
              className="p-2 rounded-xl bg-white border border-stone-200 hover:bg-stone-50 text-stone-500 hover:text-stone-800 transition-colors shadow-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Booking Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 py-6 border-b border-stone-200 text-xs">
          <div className="p-3.5 rounded-2xl bg-white border border-stone-200/90 shadow-xs">
            <span className="text-stone-400 text-[11px] uppercase font-semibold block">Primary Guest</span>
            <span className="text-stone-900 font-bold text-sm mt-0.5 block">{booking.customer.name}</span>
            <span className="text-stone-500 text-[11px]">{booking.customer.country}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-stone-200/90 shadow-xs">
            <span className="text-stone-400 text-[11px] uppercase font-semibold block">Expedition Window</span>
            <span className="text-stone-900 font-bold text-sm mt-0.5 block">{booking.tripDetails.startDate}</span>
            <span className="text-stone-500 text-[11px]">to {booking.tripDetails.endDate}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-stone-200/90 shadow-xs">
            <span className="text-stone-400 text-[11px] uppercase font-semibold block">Party Size & Tier</span>
            <span className="text-stone-900 font-bold text-sm mt-0.5 block">{booking.tripDetails.paxCount} Guests</span>
            <span className="text-emerald-800 text-[11px] uppercase font-semibold">{booking.tripDetails.serviceTier.replace('_', ' ')}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-stone-200/90 shadow-xs">
            <span className="text-stone-400 text-[11px] uppercase font-semibold block">Assigned Specialist</span>
            <span className="text-stone-900 font-bold text-sm mt-0.5 block">{booking.assignedSpecialist}</span>
            <span className="text-emerald-700 text-[11px] flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> 24/7 Concierge Support
            </span>
          </div>
        </div>

        {/* Main 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
          {/* Left Column (2 Cols): Active Day-by-Day Itinerary */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-['Playfair_Display'] text-slate-900 flex items-center gap-2">
                  <span>Day-by-Day Expedition Schedule</span>
                  <span className="text-xs font-sans font-medium px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700">
                    {booking.itinerary.length} Days Planned
                  </span>
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Private pacing. Schedules are customized and coordinated directly with certified local guides.
                </p>
              </div>
            </div>

            {booking.itinerary.length === 0 ? (
              <div className="p-8 rounded-3xl bg-white border border-stone-200 text-center space-y-3 shadow-xs">
                <Clock className="w-8 h-8 text-emerald-800 mx-auto" />
                <h4 className="font-bold text-slate-900">Custom Itinerary in Preparation</h4>
                <p className="text-xs text-stone-600 max-w-md mx-auto">
                  Our senior travel designer is mapping out your custom schedule, verifying driver routes and booking private mountain guides. Your itinerary will appear here automatically once finalized.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {booking.itinerary.map((day) => {
                  const isExpanded = expandedDay === day.dayNumber;
                  return (
                    <div
                      key={day.dayNumber}
                      className="rounded-3xl bg-white border border-stone-200 overflow-hidden shadow-xs transition-all"
                    >
                      {/* Day Header Accordion Toggle */}
                      <button
                        onClick={() => setExpandedDay(isExpanded ? null : day.dayNumber)}
                        className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-stone-50/70 transition-colors"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col items-center justify-center text-emerald-800 shrink-0">
                            <span className="text-[9px] font-bold uppercase tracking-wider">Day</span>
                            <span className="text-base font-extrabold leading-none">{day.dayNumber}</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono text-stone-500">{day.date}</span>
                              {day.safetyChecklistVerified && (
                                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                                  <ShieldCheck className="w-3 h-3" /> Safety Verified
                                </span>
                              )}
                            </div>
                            <h4 className="font-bold text-slate-900 text-sm sm:text-base mt-0.5">
                              {day.title}
                            </h4>
                            <p className="text-xs text-stone-500 line-clamp-1">{day.subtitle}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {isExpanded ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
                        </div>
                      </button>

                      {/* Day Expanded Details */}
                      {isExpanded && (
                        <div className="px-5 pb-5 pt-2 border-t border-stone-100 space-y-4 text-xs">
                          {/* Stay Location */}
                          {day.stayLocation && (
                            <div className="flex items-center gap-2 text-stone-700 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                              <Building className="w-4 h-4 text-emerald-800 shrink-0" />
                              <span>Overnight Accommodation: <strong className="text-stone-900">{day.stayLocation}</strong></span>
                            </div>
                          )}

                          {/* Activities Timeline */}
                          <div className="space-y-3 relative pl-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                            {day.activities.map((act) => (
                              <div key={act.id} className="relative">
                                <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-emerald-700 border-2 border-white"></span>
                                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                                  <span className="font-mono font-bold text-emerald-800 text-xs shrink-0">{act.time}</span>
                                  <div>
                                    <p className="text-stone-800 font-medium text-xs leading-relaxed">{act.activity}</p>
                                    <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-500">
                                      <span className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3 text-stone-400" /> {act.location}
                                      </span>
                                      {act.partnerName && (
                                        <span className="text-emerald-800 font-medium">
                                          • Assigned: {act.partnerName}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Driver / Guide Note & Emergency */}
                          {(day.driverNotes || day.emergencyContact) && (
                            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-[11px] text-stone-600 space-y-1">
                              {day.driverNotes && (
                                <div><strong className="text-slate-900">Logistics & Driver Note:</strong> {day.driverNotes}</div>
                              )}
                              {day.emergencyContact && (
                                <div className="flex items-center gap-1.5 text-stone-500">
                                  <Phone className="w-3 h-3 text-emerald-700" />
                                  <span>Day Emergency Dispatch: <span className="font-mono text-stone-900">{day.emergencyContact}</span></span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column (1 Col): Quotation, Payment & Concierge Card */}
          <div className="space-y-6">
            {/* Quotation & Pricing Summary */}
            <div className="p-5 rounded-3xl bg-white border border-stone-200 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-800" />
                  <span>Personalized Quotation</span>
                </h4>
                {booking.quotation && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-stone-100 text-stone-600 font-mono">
                    v{booking.quotation.version}
                  </span>
                )}
              </div>

              {booking.quotation ? (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80">
                    <span className="text-[11px] text-emerald-900/80 font-medium block">Total Expedition Value</span>
                    <div className="text-2xl font-bold font-mono text-emerald-950 mt-0.5">
                      {booking.quotation.currency} ${booking.quotation.totalPriceCurrency.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-stone-500 mt-1 block">
                      Guaranteed Fixed Rate • All taxes &amp; national park permits included
                    </span>
                  </div>

                  {/* Payment Milestone Status */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50">
                      <div>
                        <div className="font-semibold text-stone-800">
                          Initial Deposit ({booking.quotation.depositPercent}%)
                        </div>
                        <div className="text-[11px] text-stone-500">
                          {booking.quotation.currency} ${booking.quotation.depositAmountCurrency.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        {booking.paymentDetails.depositPaid ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[10px] flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Paid
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold text-[10px]">
                            Pending
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50">
                      <div>
                        <div className="font-semibold text-stone-800">Remaining Balance</div>
                        <div className="text-[11px] text-stone-500">
                          {booking.quotation.currency} ${booking.quotation.balanceAmountCurrency.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        {booking.paymentDetails.balancePaid ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[10px] flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Paid
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-stone-200 text-stone-600 font-semibold text-[10px]">
                            Due 14 Days Prior
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Payment CTA button */}
                  {!booking.paymentDetails.depositPaid && (
                    <button
                      onClick={() => setShowPaymentModal(true)}
                      className="w-full py-2.5 rounded-xl bg-[#0F2922] hover:bg-[#153A30] text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
                    >
                      <Building className="w-4 h-4" />
                      <span>View Payment & Wire Instructions</span>
                    </button>
                  )}

                  {/* Line Items Breakdown */}
                  <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-600 space-y-1.5">
                    <span className="font-semibold text-stone-800 uppercase tracking-wider text-[10px] block">
                      Included Package Coverage
                    </span>
                    {booking.quotation.lineItems.map((li) => (
                      <div key={li.id} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-700 shrink-0 mt-0.5" />
                        <span>{li.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-stone-50 text-xs text-stone-600 text-center space-y-2">
                  <p>Our travel designer is currently reviewing your route requirements and partner availability.</p>
                  <p className="text-emerald-800 font-medium">Expected Quotation SLA: Within 4-12 Hours</p>
                </div>
              )}
            </div>

            {/* Travel Concierge & WhatsApp Support */}
            <div className="p-5 rounded-3xl bg-white border border-stone-200 space-y-3 shadow-xs">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span>Dedicated Travel Specialist</span>
              </h4>
              <p className="text-xs text-stone-600">
                Have adjustments or want to modify your pace? Reach your personal designer directly:
              </p>
              
              <div className="space-y-2">
                <a
                  href={`https://wa.me/6281234567890?text=Hello%20THIRTEEN%20Operator%20Tour,%20I%20am%20inquiring%20about%20my%20booking%20ref%20${booking.bookingRef}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Live Concierge</span>
                </a>

                <a
                  href={`mailto:concierge@thirteen-tour.com?subject=Inquiry%20Update%20Ref%20${booking.bookingRef}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Travel Specialist</span>
                </a>
              </div>
            </div>

            {/* Safety & Certified Partner Guarantee */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-900 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>THIRTEEN Partner Assurance</span>
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Every vehicle, private guide, and equipment station has passed strict licensing and safety audits. In Bromo, 4x4 vehicles are certified with high-altitude braking systems. In Ijen, all guests receive industrial dual-filter acid respirators.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Wire Instructions Modal */}
      {showPaymentModal && booking.quotation && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-3xl w-full max-w-lg p-6 text-stone-800 shadow-2xl relative">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-['Playfair_Display'] text-slate-900">Payment & Wire Details</h3>
                <p className="text-xs text-stone-500">Compliant with Indonesian FX & Tour Operator Regulations</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                <span className="text-emerald-900/80 uppercase text-[10px] font-semibold block">Deposit Due Now (30%)</span>
                <span className="text-xl font-bold font-mono text-emerald-950 block mt-0.5">
                  {booking.quotation.currency} ${booking.quotation.depositAmountCurrency.toLocaleString()}
                </span>
                <span className="text-[11px] text-stone-500">
                  (Equivalent to IDR {Math.round(booking.quotation.totalPriceIdr * 0.3).toLocaleString()})
                </span>
              </div>

              {/* Wire details */}
              <div className="space-y-2.5 p-3.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-700">
                <div className="font-bold text-slate-900 text-xs mb-1">Official Escrow Bank Account:</div>
                <div className="flex justify-between border-b border-stone-200/80 pb-1.5">
                  <span className="text-stone-500">Bank Name</span>
                  <span className="font-semibold text-stone-900">Bank Central Asia (BCA) - Indonesia</span>
                </div>
                <div className="flex justify-between border-b border-stone-200/80 pb-1.5">
                  <span className="text-stone-500">Account Name</span>
                  <span className="font-semibold text-stone-900">PT THIRTEEN OPERATOR TOUR INDONESIA</span>
                </div>
                <div className="flex justify-between border-b border-stone-200/80 pb-1.5">
                  <span className="text-stone-500">Account Number (IDR)</span>
                  <span className="font-mono font-bold text-emerald-900">822-019-3381</span>
                </div>
                <div className="flex justify-between border-b border-stone-200/80 pb-1.5">
                  <span className="text-stone-500">SWIFT / BIC Code</span>
                  <span className="font-mono text-stone-800">CENAIDJA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Payment Reference</span>
                  <span className="font-mono font-bold text-emerald-900">{booking.bookingRef}</span>
                </div>
              </div>

              {/* Wise note */}
              <div className="p-3 bg-stone-100 border border-stone-200 rounded-xl text-[11px] text-stone-700">
                <strong>International Wire & Wise Transfer:</strong> Wise payments are accepted to our verified multi-currency account. Please include your Booking Reference <strong>{booking.bookingRef}</strong> in the transfer remarks.
              </div>

              <button
                onClick={() => setShowPaymentModal(false)}
                className="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs transition-colors"
              >
                Close Instructions
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
