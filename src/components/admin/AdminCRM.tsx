import React, { useState } from 'react';
import { useTour } from '../../context/TourContext';
import { BookingInquiry, PipelineStatus, Quotation } from '../../types/tour';
import { 
  Search, 
  Sparkles, 
  DollarSign, 
  Calendar, 
  X, 
  Send, 
  Check, 
  ShieldCheck 
} from 'lucide-react';

export const AdminCRM: React.FC<{ onOpenItineraryBuilder: (bookingId: string) => void }> = ({ onOpenItineraryBuilder }) => {
  const { 
    bookings, 
    updatePipelineStatus, 
    saveQuotation, 
    verifyPayment, 
    addFollowUpLog
  } = useTour();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedBooking, setSelectedBooking] = useState<BookingInquiry | null>(null);

  // Quotation Builder Modal state
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteCurrency, setQuoteCurrency] = useState<'USD' | 'EUR' | 'AUD' | 'IDR'>('USD');
  const [baseCostIdr, setBaseCostIdr] = useState<number>(14000000);
  const [markupPercent, setMarkupPercent] = useState<number>(28);
  const [quoteNotes, setQuoteNotes] = useState<string>('Includes dedicated private luxury chauffeur, certified mountain guides, and all national park permits.');
  
  // Payment Verification Modal state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentType, setPaymentType] = useState<'deposit' | 'balance'>('deposit');
  const [paymentRef, setPaymentRef] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'bank_transfer' | 'electronic_wise' | 'credit_card_gateway'>('bank_transfer');

  // Follow-up state
  const [newFollowUpNote, setNewFollowUpNote] = useState('');
  const [newFollowUpChannel, setNewFollowUpChannel] = useState<'email' | 'whatsapp' | 'phone'>('email');

  // Filtered Bookings
  const filteredBookings = bookings.filter(b => {
    const matchesSearch = 
      b.bookingRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.tripDetails.destinationName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || b.pipelineStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenQuoteBuilder = (b: BookingInquiry) => {
    setSelectedBooking(b);
    if (b.quotation) {
      setQuoteCurrency(b.quotation.currency);
      setBaseCostIdr(b.quotation.baseCostIdr);
      setMarkupPercent(b.quotation.markupPercent);
      setQuoteNotes(b.quotation.notes);
    } else {
      setQuoteCurrency('USD');
      setBaseCostIdr(15000000);
      setMarkupPercent(28);
      setQuoteNotes('Full private package inclusive of chauffeured vehicle, certified guides, permits, and boutique lodgings.');
    }
    setShowQuoteModal(true);
  };

  const handleSaveAndDispatchQuote = () => {
    if (!selectedBooking) return;
    
    const rates: Record<string, number> = {
      USD: 16000,
      EUR: 17200,
      AUD: 10400,
      IDR: 1
    };

    const rate = rates[quoteCurrency] || 16000;
    const totalPriceIdr = Math.round(baseCostIdr * (1 + markupPercent / 100));
    const totalPriceCurrency = quoteCurrency === 'IDR' 
      ? totalPriceIdr 
      : Math.round(totalPriceIdr / rate);

    const depositAmountCurrency = Math.round(totalPriceCurrency * 0.3);
    const balanceAmountCurrency = totalPriceCurrency - depositAmountCurrency;

    const newQuotation: Quotation = {
      version: selectedBooking.quotation ? selectedBooking.quotation.version + 1 : 1,
      currency: quoteCurrency,
      exchangeRateIdrToCurrency: rate,
      baseCostIdr,
      markupPercent,
      totalPriceIdr,
      totalPriceCurrency,
      depositPercent: 30,
      depositAmountCurrency,
      balanceAmountCurrency,
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      notes: quoteNotes,
      lineItems: selectedBooking.quotation?.lineItems || [
        { id: 'li-1', description: 'Private chauffeured executive transport & fuel', costIdr: Math.round(baseCostIdr * 0.3), category: 'transport' },
        { id: 'li-2', description: 'Hand-picked boutique mountain lodging suites', costIdr: Math.round(baseCostIdr * 0.4), category: 'accommodation' },
        { id: 'li-3', description: 'Certified mountain & site guides + safety respirators', costIdr: Math.round(baseCostIdr * 0.2), category: 'guide_permits' },
        { id: 'li-4', description: 'National park conservation permits & VIP entry fees', costIdr: Math.round(baseCostIdr * 0.1), category: 'activities' }
      ],
      sentAt: new Date().toISOString()
    };

    saveQuotation(selectedBooking.id, newQuotation);
    setShowQuoteModal(false);
    const updated = bookings.find(b => b.id === selectedBooking.id);
    if (updated) setSelectedBooking(updated);
  };

  const handleExecutePaymentVerification = () => {
    if (!selectedBooking || !paymentRef.trim()) return;
    verifyPayment(selectedBooking.id, paymentType, paymentRef.trim(), paymentMethod);
    setShowPaymentModal(false);
    setPaymentRef('');
    const updated = bookings.find(b => b.id === selectedBooking.id);
    if (updated) setSelectedBooking(updated);
  };

  const handleAddFollowUp = () => {
    if (!selectedBooking || !newFollowUpNote.trim()) return;
    addFollowUpLog(selectedBooking.id, {
      specialist: 'Travel Designer Staff',
      channel: newFollowUpChannel,
      summary: newFollowUpNote.trim()
    });
    setNewFollowUpNote('');
    const updated = bookings.find(b => b.id === selectedBooking.id);
    if (updated) setSelectedBooking(updated);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
          <input
            type="text"
            placeholder="Search reference, guest name, destination..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-3.5 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-800 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-[11px] text-stone-400 font-medium shrink-0">Filter:</span>
          {[
            { id: 'all', label: 'All Inquiries' },
            { id: 'new_inquiry', label: 'New' },
            { id: 'quotation_sent', label: 'Quotation Sent' },
            { id: 'payment_pending', label: 'Payment Pending' },
            { id: 'confirmed', label: 'Confirmed' },
            { id: 'in_progress', label: 'In Progress' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                statusFilter === f.id
                  ? 'bg-[#0F2922] text-white'
                  : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200/80'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-700">
            <thead className="bg-[#FAF9F6] border-b border-stone-200 text-[11px] uppercase tracking-wider text-stone-500 font-bold">
              <tr>
                <th className="py-3.5 px-4">Ref & Customer</th>
                <th className="py-3.5 px-4">Route & Destination</th>
                <th className="py-3.5 px-4">Window & Pax</th>
                <th className="py-3.5 px-4">Quotation & Payment</th>
                <th className="py-3.5 px-4">Pipeline Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-stone-400">
                    No bookings found matching query.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-stone-50 transition-colors">
                    {/* Customer */}
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-emerald-900">{b.bookingRef}</div>
                      <div className="font-semibold text-slate-900 mt-0.5">{b.customer.name}</div>
                      <div className="text-[11px] text-stone-500">{b.customer.country} • {b.customer.email}</div>
                    </td>

                    {/* Route */}
                    <td className="py-3.5 px-4 max-w-[220px]">
                      <div className="font-semibold text-stone-900 truncate">{b.tripDetails.packageTitle}</div>
                      <div className="text-[11px] text-emerald-800 font-medium capitalize">
                        {b.tripDetails.serviceTier.replace('_', ' ')} Tier • {b.tripDetails.tourType.replace('_', ' ')}
                      </div>
                    </td>

                    {/* Dates & Pax */}
                    <td className="py-3.5 px-4">
                      <div className="font-mono text-stone-800">{b.tripDetails.startDate}</div>
                      <div className="text-[11px] text-stone-500">{b.tripDetails.paxCount} Guests ({b.tripDetails.adults}A, {b.tripDetails.children}C)</div>
                    </td>

                    {/* Quotation & Payment */}
                    <td className="py-3.5 px-4">
                      {b.quotation ? (
                        <div>
                          <div className="font-mono font-bold text-slate-900">
                            {b.quotation.currency} ${b.quotation.totalPriceCurrency.toLocaleString()}
                          </div>
                          <div className="text-[10px] text-stone-500">
                            Dep: {b.paymentDetails.depositPaid ? (
                              <span className="text-emerald-700 font-bold">Paid</span>
                            ) : (
                              <span className="text-amber-700 font-semibold">Pending</span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <span className="text-stone-400 italic text-[11px]">No quote yet</span>
                      )}
                    </td>

                    {/* Pipeline Status Dropdown */}
                    <td className="py-3.5 px-4">
                      <select
                        value={b.pipelineStatus}
                        onChange={(e) => updatePipelineStatus(b.id, e.target.value as PipelineStatus)}
                        className={`text-xs rounded-lg px-2.5 py-1 font-semibold border cursor-pointer outline-none ${
                          b.pipelineStatus === 'confirmed' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                          b.pipelineStatus === 'quotation_sent' ? 'bg-sky-50 text-sky-800 border-sky-300' :
                          b.pipelineStatus === 'payment_pending' ? 'bg-amber-50 text-amber-900 border-amber-300' :
                          b.pipelineStatus === 'new_inquiry' ? 'bg-rose-50 text-rose-800 border-rose-300' :
                          'bg-stone-100 text-stone-700 border-stone-200'
                        }`}
                      >
                        <option value="new_inquiry">New Inquiry</option>
                        <option value="reviewing">Under Review</option>
                        <option value="quotation_sent">Quotation Sent</option>
                        <option value="payment_pending">Payment Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="lost">Lost</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right space-x-1.5">
                      <button
                        onClick={() => setSelectedBooking(b)}
                        className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium text-xs transition-colors"
                      >
                        Details
                      </button>

                      <button
                        onClick={() => handleOpenQuoteBuilder(b)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-semibold text-xs transition-colors border border-emerald-200"
                      >
                        Quote
                      </button>

                      <button
                        onClick={() => onOpenItineraryBuilder(b.id)}
                        className="px-2.5 py-1 rounded-lg bg-[#0F2922] hover:bg-[#153A30] text-white font-medium text-xs transition-colors"
                      >
                        Itinerary ({b.itinerary.length}d)
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Drawer / Modal */}
      {selectedBooking && !showQuoteModal && !showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-end p-0 sm:p-4">
          <div className="bg-white border-l sm:border border-stone-200 w-full sm:max-w-2xl h-full sm:h-[92vh] sm:rounded-3xl p-6 text-stone-800 shadow-2xl flex flex-col justify-between overflow-y-auto">
            {/* Top */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-emerald-900 text-base">{selectedBooking.bookingRef}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 capitalize">
                      Source: {selectedBooking.leadSource.replace('_', ' ')}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-['Playfair_Display'] text-slate-900 mt-1">
                    {selectedBooking.customer.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Customer Contact & Origin */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-stone-400 uppercase text-[10px] font-semibold block">Email</span>
                  <span className="text-stone-800 font-medium truncate block mt-0.5">{selectedBooking.customer.email}</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-stone-400 uppercase text-[10px] font-semibold block">Phone / WhatsApp</span>
                  <span className="text-stone-800 font-medium block mt-0.5">{selectedBooking.customer.phone || 'Not provided'}</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-stone-400 uppercase text-[10px] font-semibold block">Country & Language</span>
                  <span className="text-stone-800 font-medium block mt-0.5">
                    {selectedBooking.customer.country} ({selectedBooking.customer.preferredLanguage.toUpperCase()})
                  </span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-stone-400 uppercase text-[10px] font-semibold block">Assigned Specialist</span>
                  <span className="text-emerald-800 font-medium block mt-0.5">{selectedBooking.assignedSpecialist}</span>
                </div>
              </div>

              {/* Trip Preferences & Fitness */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs space-y-2">
                <div className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Expedition Specifications
                </div>
                <div className="grid grid-cols-2 gap-2 text-stone-700">
                  <div>Destination: <strong className="text-slate-900">{selectedBooking.tripDetails.destinationName}</strong></div>
                  <div>Travel Window: <strong className="text-slate-900">{selectedBooking.tripDetails.startDate} to {selectedBooking.tripDetails.endDate}</strong></div>
                  <div>Party Size: <strong className="text-slate-900">{selectedBooking.tripDetails.paxCount} Guests</strong></div>
                  <div>Fitness Level: <strong className="text-emerald-800 capitalize">{selectedBooking.tripDetails.fitnessLevel.replace('_', ' ')}</strong></div>
                </div>

                {selectedBooking.tripDetails.specialRequests && (
                  <div className="pt-2 border-t border-stone-200 text-[11px]">
                    <span className="text-stone-500 block uppercase font-bold text-[10px]">Client Wishlist / Special Notes:</span>
                    <p className="text-stone-800 italic mt-0.5">{selectedBooking.tripDetails.specialRequests}</p>
                  </div>
                )}

                {selectedBooking.tripDetails.dietaryRestrictions && (
                  <div className="text-[11px] text-amber-900">
                    <strong>Dietary / Medical:</strong> {selectedBooking.tripDetails.dietaryRestrictions}
                  </div>
                )}
              </div>

              {/* Quotation & Payment Management Section */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 uppercase text-xs tracking-wider flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-emerald-800" />
                    <span>Quotation & Financial Status</span>
                  </span>

                  <button
                    onClick={() => handleOpenQuoteBuilder(selectedBooking)}
                    className="px-3 py-1 bg-[#0F2922] hover:bg-[#153A30] text-white font-bold rounded-lg text-xs transition-colors"
                  >
                    {selectedBooking.quotation ? 'Edit Quote' : '+ Build Quote'}
                  </button>
                </div>

                {selectedBooking.quotation ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-stone-200">
                      <div>
                        <div className="text-base font-bold font-mono text-emerald-950">
                          {selectedBooking.quotation.currency} ${selectedBooking.quotation.totalPriceCurrency.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-stone-500">
                          IDR {selectedBooking.quotation.totalPriceIdr.toLocaleString()} (Cost: IDR {selectedBooking.quotation.baseCostIdr.toLocaleString()} + {selectedBooking.quotation.markupPercent}% margin)
                        </div>
                      </div>
                      <div className="text-right text-[11px]">
                        <div>30% Dep: <strong>${selectedBooking.quotation.depositAmountCurrency}</strong></div>
                        <div className="text-stone-500">Valid until: {selectedBooking.quotation.validUntil}</div>
                      </div>
                    </div>

                    {/* Payment status and verify button */}
                    <div className="flex items-center justify-between pt-2 border-t border-stone-200 text-xs">
                      <div>
                        <span className="text-stone-500">Deposit Status: </span>
                        {selectedBooking.paymentDetails.depositPaid ? (
                          <span className="text-emerald-700 font-bold">Paid ({selectedBooking.paymentDetails.depositReference})</span>
                        ) : (
                          <span className="text-amber-800 font-semibold">Unpaid</span>
                        )}
                      </div>

                      {!selectedBooking.paymentDetails.depositPaid && (
                        <button
                          onClick={() => {
                            setPaymentType('deposit');
                            setShowPaymentModal(true);
                          }}
                          className="px-3 py-1 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-lg text-xs transition-colors"
                        >
                          Verify Deposit Wire
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-stone-500 italic text-xs">
                    No quotation created yet. Click "Build Quote" to generate cost-based proposal.
                  </p>
                )}
              </div>

              {/* Follow-up Communication Log */}
              <div className="space-y-3">
                <span className="font-bold text-slate-900 uppercase text-xs tracking-wider block">
                  Communication & Audit Log
                </span>

                <div className="flex gap-2">
                  <select
                    value={newFollowUpChannel}
                    onChange={(e) => setNewFollowUpChannel(e.target.value as any)}
                    className="bg-stone-50 border border-stone-200 text-xs rounded-xl px-2.5 py-1.5 text-stone-700"
                  >
                    <option value="email">Email</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="phone">Phone</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Log client call, email reply, or quotation discussion..."
                    value={newFollowUpNote}
                    onChange={(e) => setNewFollowUpNote(e.target.value)}
                    className="grow bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-800 focus:bg-white"
                  />
                  <button
                    onClick={handleAddFollowUp}
                    className="px-3.5 py-1.5 bg-[#0F2922] hover:bg-[#153A30] text-white rounded-xl text-xs font-semibold"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {selectedBooking.followUps.map((fu) => (
                    <div key={fu.id} className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-0.5">
                      <div className="flex items-center justify-between text-[10px] text-stone-400">
                        <span className="font-semibold text-stone-700 capitalize">{fu.channel} • {fu.specialist}</span>
                        <span>{new Date(fu.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-stone-800 text-[11px]">{fu.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-stone-200 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold"
              >
                Close Drawer
              </button>

              <button
                onClick={() => {
                  const bId = selectedBooking.id;
                  setSelectedBooking(null);
                  onOpenItineraryBuilder(bId);
                }}
                className="px-5 py-2 rounded-xl bg-[#0F2922] hover:bg-[#153A30] text-white font-bold text-xs flex items-center gap-2 shadow-xs"
              >
                <Calendar className="w-4 h-4 text-emerald-300" />
                <span>Open Itinerary Builder ({selectedBooking.itinerary.length} Days)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quotation Builder Modal */}
      {showQuoteModal && selectedBooking && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-3xl w-full max-w-lg p-6 text-stone-800 shadow-2xl relative">
            <button
              onClick={() => setShowQuoteModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-['Playfair_Display'] text-slate-900">
                  Costing & Quotation Engine
                </h3>
                <p className="text-xs text-stone-500">
                  Decision Record #008 & #011 (Cost-Based + Margin Formulation)
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-700 uppercase text-[10px] font-bold mb-1">
                  Client International Currency
                </label>
                <select
                  value={quoteCurrency}
                  onChange={(e) => setQuoteCurrency(e.target.value as any)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800"
                >
                  <option value="USD">USD ($ - Benchmark 1 USD = 16,000 IDR)</option>
                  <option value="EUR">EUR (€ - Benchmark 1 EUR = 17,200 IDR)</option>
                  <option value="AUD">AUD (A$ - Benchmark 1 AUD = 10,400 IDR)</option>
                  <option value="IDR">IDR (Indonesian Rupiah Local Base)</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 uppercase text-[10px] font-bold mb-1">
                  Internal Base Cost in IDR (Vendor Rates + Transport + Guides)
                </label>
                <input
                  type="number"
                  step="500000"
                  value={baseCostIdr}
                  onChange={(e) => setBaseCostIdr(Number(e.target.value))}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-900 font-mono text-sm"
                />
                <span className="text-[10px] text-stone-500 mt-0.5 block">
                  Formatted: IDR {baseCostIdr.toLocaleString()}
                </span>
              </div>

              <div>
                <div className="flex justify-between text-stone-700 uppercase text-[10px] font-bold mb-1">
                  <span>Target Margin / Markup</span>
                  <span className="text-emerald-800 font-bold">{markupPercent}%</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="50"
                  value={markupPercent}
                  onChange={(e) => setMarkupPercent(Number(e.target.value))}
                  className="w-full accent-emerald-800 cursor-pointer"
                />
              </div>

              {/* Calculated Outputs Preview */}
              <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-stone-500">Total Price IDR:</span>
                  <span className="font-mono font-bold text-stone-800">
                    IDR {Math.round(baseCostIdr * (1 + markupPercent / 100)).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between border-t border-stone-200 pt-1.5">
                  <span className="text-emerald-900 font-semibold">Total Client Price ({quoteCurrency}):</span>
                  <span className="font-mono font-bold text-base text-emerald-950">
                    {quoteCurrency} ${quoteCurrency === 'IDR' ? Math.round(baseCostIdr * (1 + markupPercent / 100)).toLocaleString() : Math.round((baseCostIdr * (1 + markupPercent / 100)) / (quoteCurrency === 'EUR' ? 17200 : quoteCurrency === 'AUD' ? 10400 : 16000)).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-stone-500">
                  <span>Required 30% Deposit:</span>
                  <span>
                    {quoteCurrency} ${Math.round((quoteCurrency === 'IDR' ? (baseCostIdr * (1 + markupPercent / 100)) : (baseCostIdr * (1 + markupPercent / 100)) / (quoteCurrency === 'EUR' ? 17200 : quoteCurrency === 'AUD' ? 10400 : 16000)) * 0.3).toLocaleString()}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-stone-700 uppercase text-[10px] font-bold mb-1">
                  Proposal Inclusions & Specialist Notes
                </label>
                <textarea
                  rows={2}
                  value={quoteNotes}
                  onChange={(e) => setQuoteNotes(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-800 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowQuoteModal(false)}
                  className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAndDispatchQuote}
                  className="px-5 py-2 rounded-xl bg-[#0F2922] hover:bg-[#153A30] text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Save & Dispatch Quotation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Verification Modal */}
      {showPaymentModal && selectedBooking && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-3xl w-full max-w-md p-6 text-stone-800 shadow-2xl relative">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-['Playfair_Display'] text-slate-900">Verify Payment</h3>
                <p className="text-xs text-stone-500">Section 8: Bank wire or electronic verification</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-700 uppercase text-[10px] font-bold mb-1">
                  Payment Milestone
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentType('deposit')}
                    className={`py-2 rounded-xl border text-xs font-bold transition-all ${
                      paymentType === 'deposit'
                        ? 'border-emerald-800 bg-emerald-50 text-emerald-950 font-bold'
                        : 'border-stone-200 bg-stone-50 text-stone-600'
                    }`}
                  >
                    30% Initial Deposit
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentType('balance')}
                    className={`py-2 rounded-xl border text-xs font-bold transition-all ${
                      paymentType === 'balance'
                        ? 'border-emerald-800 bg-emerald-50 text-emerald-950 font-bold'
                        : 'border-stone-200 bg-stone-50 text-stone-600'
                    }`}
                  >
                    Remaining Balance
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-stone-700 uppercase text-[10px] font-bold mb-1">
                  Payment Channel
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800"
                >
                  <option value="bank_transfer">BCA Escrow Wire Transfer</option>
                  <option value="electronic_wise">Wise / Multi-currency Electronic</option>
                  <option value="credit_card_gateway">Credit Card Gateway</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 uppercase text-[10px] font-bold mb-1">
                  Bank Reference / Transaction ID *
                </label>
                <input
                  type="text"
                  placeholder="e.g. TRX-BCA-88910294 or Wise Transfer #991823"
                  value={paymentRef}
                  onChange={(e) => setPaymentRef(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-900 font-mono"
                />
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-600">
                Verifying this payment advances the booking to <strong>CONFIRMED</strong> and triggers the digital expedition voucher for the client.
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExecutePaymentVerification}
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Confirm Verification</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
