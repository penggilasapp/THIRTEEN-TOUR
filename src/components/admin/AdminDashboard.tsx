import React, { useState } from 'react';
import { useTour } from '../../context/TourContext';
import { AdminCRM } from './AdminCRM';
import { AdminItineraryBuilder } from './AdminItineraryBuilder';
import { AdminPartners } from './AdminPartners';
import { AdminPackages } from './AdminPackages';
import { AdminAnalytics } from './AdminAnalytics';
import { 
  Users, 
  Calendar, 
  Compass, 
  ShieldCheck, 
  BarChart3, 
  ArrowLeft, 
  Eye, 
  Clock, 
  DollarSign,
  Download
} from 'lucide-react';
import { DataExportModal } from '../common/DataExportModal';

export const AdminDashboard: React.FC = () => {
  const { setViewMode, bookings } = useTour();
  const [activeTab, setActiveTab] = useState<'crm' | 'itinerary' | 'packages' | 'partners' | 'analytics'>('crm');
  const [selectedBookingForItinerary, setSelectedBookingForItinerary] = useState<string | undefined>(undefined);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  const handleOpenItineraryForBooking = (bookingId: string) => {
    setSelectedBookingForItinerary(bookingId);
    setActiveTab('itinerary');
  };

  const pendingQuotes = bookings.filter(b => b.pipelineStatus === 'new_inquiry' || b.pipelineStatus === 'reviewing').length;
  const pendingPayments = bookings.filter(b => b.pipelineStatus === 'payment_pending').length;

  return (
    <div className="min-h-screen bg-[#F4F5F6] text-slate-800 flex flex-col font-sans">
      {/* Top Admin Header */}
      <header className="bg-[#0D201A] text-white border-b border-emerald-950 px-4 sm:px-8 py-4 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode('client')}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-200 hover:text-white transition-colors"
              title="Return to Public Website"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-emerald-300">THIRTEEN OPERATOR TOUR</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-800/80 text-emerald-200 font-semibold border border-emerald-700/60">
                  Operations Console
                </span>
              </div>
              <h1 className="text-lg font-bold font-['Playfair_Display'] text-white">
                Tour Booking & Itinerary Management Hub
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick counters */}
            {pendingQuotes > 0 && (
              <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-200 border border-rose-400/30 text-xs font-semibold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-rose-300" />
                <span>{pendingQuotes} New Inquiries</span>
              </span>
            )}

            {pendingPayments > 0 && (
              <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/30 text-xs font-semibold flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-amber-300" />
                <span>{pendingPayments} Pending Wires</span>
              </span>
            )}

            <button
              onClick={() => setExportModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 hover:text-white border border-emerald-700/50 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer min-h-[38px]"
              title="Export All Source Datasets (JSON & CSV)"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export Data</span>
            </button>

            <button
              onClick={() => setViewMode('client')}
              className="px-3.5 py-1.5 rounded-xl bg-white text-emerald-950 hover:bg-emerald-50 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer min-h-[38px]"
            >
              <Eye className="w-3.5 h-3.5 text-emerald-800" />
              <span>Client Portal</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto mt-4 flex items-center gap-2 border-t border-emerald-900/60 pt-3 overflow-x-auto">
          {[
            { id: 'crm', label: 'Bookings & CRM Leads', icon: Users, badge: bookings.length },
            { id: 'itinerary', label: 'Itinerary Operations', icon: Calendar },
            { id: 'packages', label: 'Tour Catalogue', icon: Compass },
            { id: 'partners', label: 'Verified Partners', icon: ShieldCheck },
            { id: 'analytics', label: 'Metrics & Performance', icon: BarChart3 }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 shrink-0 cursor-pointer min-h-[40px] ${
                  isActive
                    ? 'bg-white text-emerald-950 font-bold shadow-xs'
                    : 'text-emerald-200/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-900' : 'text-emerald-300'}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-emerald-100 text-emerald-950 font-bold' : 'bg-white/15 text-white'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Tab Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 grow w-full">
        {activeTab === 'crm' && (
          <AdminCRM onOpenItineraryBuilder={handleOpenItineraryForBooking} />
        )}

        {activeTab === 'itinerary' && (
          <AdminItineraryBuilder initialBookingId={selectedBookingForItinerary} />
        )}

        {activeTab === 'packages' && (
          <AdminPackages />
        )}

        {activeTab === 'partners' && (
          <AdminPartners />
        )}

        {activeTab === 'analytics' && (
          <AdminAnalytics />
        )}
      </main>

      {/* Export Data Modal */}
      <DataExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
      />
    </div>
  );
};
