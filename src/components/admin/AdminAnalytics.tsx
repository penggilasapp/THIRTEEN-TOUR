import React from 'react';
import { useTour } from '../../context/TourContext';
import { 
  BarChart3, 
  ArrowUpRight
} from 'lucide-react';

export const AdminAnalytics: React.FC = () => {
  const { bookings } = useTour();

  const totalInquiries = bookings.length;
  const confirmedBookings = bookings.filter(b => b.pipelineStatus === 'confirmed' || b.pipelineStatus === 'in_progress' || b.pipelineStatus === 'completed').length;
  const quotesDispatched = bookings.filter(b => b.quotation).length;

  const conversionQuoteToConfirmed = quotesDispatched > 0 ? Math.round((confirmedBookings / quotesDispatched) * 100) : 0;
  const totalPipelineUSD = bookings.reduce((sum, b) => sum + (b.quotation ? b.quotation.totalPriceCurrency : 0), 0);

  // Inquiries by channel
  const channels = [
    { name: 'Website Organic / SEO', count: bookings.filter(b => b.leadSource === 'website_seo').length, color: 'bg-emerald-700' },
    { name: 'Partner Agency Referrals', count: bookings.filter(b => b.leadSource === 'partner_agency').length, color: 'bg-indigo-700' },
    { name: 'Instagram & Social Media', count: bookings.filter(b => b.leadSource === 'instagram_social').length, color: 'bg-rose-600' },
    { name: 'Direct Word-of-Mouth', count: bookings.filter(b => b.leadSource === 'direct_referral').length, color: 'bg-amber-600' }
  ];

  return (
    <div className="space-y-6 text-stone-800">
      {/* Top Banner */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
          <BarChart3 className="w-4 h-4" />
          <span>Section 12: Suggested Evaluation Metrics</span>
        </div>
        <p className="text-xs text-stone-500 mt-0.5">
          Performance baseline covering qualified leads, conversion funnel, response times, and margin contribution.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-1 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-stone-400 block">Total Inquiries</span>
          <div className="text-2xl font-extrabold font-mono text-slate-900">{totalInquiries}</div>
          <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> 100% qualified leads
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-1 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-stone-400 block">Quotation Pipeline Value</span>
          <div className="text-2xl font-extrabold font-mono text-emerald-900">
            ${totalPipelineUSD.toLocaleString()} USD
          </div>
          <span className="text-[10px] text-stone-500 font-mono">
            ~IDR {Math.round(totalPipelineUSD * 16000).toLocaleString()}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-1 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-stone-400 block">Funnel: Quote → Booking</span>
          <div className="text-2xl font-extrabold font-mono text-emerald-700">
            {conversionQuoteToConfirmed}%
          </div>
          <span className="text-[11px] text-stone-500">
            {confirmedBookings} of {quotesDispatched} quotes confirmed
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-1 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-stone-400 block">Average CS Response SLA</span>
          <div className="text-2xl font-extrabold font-mono text-sky-800">
            1.8 Hours
          </div>
          <span className="text-[11px] text-stone-500">
            Target SLA: &lt; 4.0 Hours (Decision #016)
          </span>
        </div>
      </div>

      {/* Funnel & Channel Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Channel Ingestion */}
        <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-4 shadow-xs">
          <h4 className="text-sm font-bold text-slate-900 font-['Playfair_Display']">
            Inquiries by Channel (Section 6 & 12)
          </h4>

          <div className="space-y-3 text-xs">
            {channels.map((ch, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-stone-700">
                  <span>{ch.name}</span>
                  <span className="font-mono font-bold text-slate-900">{ch.count} leads</span>
                </div>
                <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                  <div
                    className={`h-full ${ch.color}`}
                    style={{ width: `${totalInquiries > 0 ? (ch.count / totalInquiries) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-4 shadow-xs">
          <h4 className="text-sm font-bold text-slate-900 font-['Playfair_Display']">
            Conversion Rate Funnel
          </h4>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-stone-700 font-medium block">1. Total Inbound Inquiries</span>
                <span className="text-xs text-stone-500">Website lead capture & social DM</span>
              </div>
              <span className="font-mono font-bold text-slate-900 text-sm">{totalInquiries}</span>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-stone-700 font-medium block">2. Tailored Quotations Sent</span>
                <span className="text-xs text-stone-500">Passed specialist route & safety audit</span>
              </div>
              <span className="font-mono font-bold text-emerald-900 text-sm">{quotesDispatched}</span>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-stone-700 font-medium block">3. Confirmed Bookings (Deposit Paid)</span>
                <span className="text-xs text-stone-500">Verified bank escrow wire or Wise</span>
              </div>
              <span className="font-mono font-bold text-emerald-700 text-sm">{confirmedBookings}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
