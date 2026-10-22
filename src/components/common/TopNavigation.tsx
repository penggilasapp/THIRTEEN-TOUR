import React, { useState } from 'react';
import { useTour } from '../../context/TourContext';
import { 
  FileText, 
  Smartphone, 
  Monitor, 
  Lock, 
  Menu, 
  X,
  Sparkles,
  RefreshCw,
  Search,
  ChevronRight,
  Check,
  Download
} from 'lucide-react';
import { DataExportModal } from './DataExportModal';
import { PWAInstallButton } from './PWAInstallButton';

export const TopNavigation: React.FC = () => {
  const { 
    viewMode, 
    setViewMode, 
    deviceMode, 
    setDeviceMode, 
    selectedCurrency, 
    setSelectedCurrency, 
    openInquireForPackage,
    setActiveBookingRefForClient,
    bookings,
    resetToDefaults,
    clientPage,
    setClientPage
  } = useTour();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [trackerModalOpen, setTrackerModalOpen] = useState(false);
  const [dataExportModalOpen, setDataExportModalOpen] = useState(false);
  const [lookupRef, setLookupRef] = useState('');
  const [lookupError, setLookupError] = useState('');

  const handleTrackBooking = (refToTrack?: string) => {
    const target = refToTrack || lookupRef.trim();
    if (!target) {
      setLookupError('Please enter your Booking Reference (e.g. TT-2026-081)');
      return;
    }
    const found = bookings.find(b => b.bookingRef.toLowerCase() === target.toLowerCase());
    if (found) {
      setActiveBookingRefForClient(found.bookingRef);
      setTrackerModalOpen(false);
      setLookupError('');
      if (viewMode !== 'client') setViewMode('client');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setLookupError(`Booking reference "${target}" not found. Try demo ref: TT-2026-081 or TT-2026-064`);
    }
  };

  return (
    <>
      {/* Top Utility Bar - Only shown in Admin Operational Mode */}
      {viewMode === 'admin' && (
        <div className="bg-[#0D201A] text-emerald-100/90 text-xs py-2 px-4 border-b border-emerald-950 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 font-semibold tracking-wider text-emerald-200 uppercase text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              THIRTEEN Operations CRM
            </span>
            <span className="hidden md:inline text-emerald-700">·</span>
            <span className="hidden md:inline text-emerald-200/70 text-[11px]">
              Authorized Operator Workspace
            </span>
          </div>

          {/* Admin Controls: View Mode, Device Simulator, Export, Reset */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="bg-[#142B23] p-0.5 rounded-lg border border-emerald-800/50 flex items-center">
              <button
                onClick={() => setViewMode('client')}
                className="px-2.5 py-1 rounded text-xs font-medium transition-all text-emerald-200/80 hover:text-white"
              >
                ← Return to Public Website
              </button>
              <button
                onClick={() => setViewMode('admin')}
                className="px-2.5 py-1 rounded text-xs font-medium transition-all flex items-center gap-1 bg-emerald-600 text-white font-semibold shadow-xs"
              >
                <Lock className="w-3 h-3" />
                Admin Portal
              </button>
            </div>

            {/* Device Mode Switcher */}
            <div className="bg-[#142B23] p-0.5 rounded-lg border border-emerald-800/50 hidden sm:flex items-center">
              <button
                onClick={() => setDeviceMode('responsive')}
                title="Responsive Desktop View"
                className={`p-1 rounded text-xs transition-all ${
                  deviceMode === 'responsive' ? 'bg-white text-emerald-950' : 'text-emerald-300/70 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDeviceMode('mobile_sim')}
                title="Mobile Device Simulator"
                className={`p-1 rounded text-xs transition-all ${
                  deviceMode === 'mobile_sim' ? 'bg-emerald-500 text-emerald-950 font-bold' : 'text-emerald-300/70 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Export / Download Source Data & ZIP */}
            <button
              onClick={() => setDataExportModalOpen(true)}
              title="Download Full Project ZIP & Export Data"
              className="bg-[#142B23] hover:bg-emerald-800/60 border border-emerald-800/50 text-emerald-200 text-xs rounded px-2.5 py-1 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline font-medium text-[11px]">Export &amp; ZIP</span>
            </button>

            {/* Reset Demo Data */}
            <button
              onClick={() => {
                if (confirm('Reset tour operator demo state to initial defaults?')) {
                  resetToDefaults();
                }
              }}
              title="Reset Demo Data"
              className="text-emerald-300/60 hover:text-emerald-100 p-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Brand Header */}
      {viewMode === 'client' && (
        <header className="bg-white/95 backdrop-blur-md border-b border-stone-200/80 text-stone-900 sticky top-0 z-40 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2">
            {/* Logo */}
            <div 
              onClick={() => setClientPage('home')}
              className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0"
              title="Return to Home"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#0F2922] to-[#1A4237] flex items-center justify-center text-white font-serif font-black text-lg sm:text-xl tracking-tight shadow-sm group-hover:scale-105 transition-transform">
                13
              </div>
              <div>
                <div className="font-extrabold tracking-wider text-base sm:text-lg text-slate-900 font-['Playfair_Display']">
                  THIRTEEN
                </div>
                <div className="text-[10px] text-stone-500 tracking-widest uppercase font-medium hidden sm:block">
                  Bespoke Indonesian Expeditions
                </div>
              </div>
            </div>

            {/* Desktop Navigation Menu: Clean & Dedicated Pages (1024px+) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-semibold text-stone-600">
              {[
                { id: 'home', label: 'Home' },
                { id: 'destinations', label: 'Destinations' },
                { id: 'experiences', label: 'Experiences' },
                { id: 'tours', label: 'Tours' },
                { id: 'travel-guide', label: 'Travel Guide' },
                { id: 'about-us', label: 'About Us' },
                { id: 'contact', label: 'Contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setClientPage(item.id as any)}
                  className={`px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                    clientPage === item.id
                      ? 'bg-emerald-50 text-emerald-950 font-bold border border-emerald-200/90 shadow-2xs'
                      : 'hover:text-emerald-900 hover:bg-stone-100/80'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Client Itinerary Portal Button */}
              <button
                onClick={() => setTrackerModalOpen(true)}
                className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200/80 transition-colors cursor-pointer min-h-[40px]"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-800" />
                <span>Track Itinerary</span>
              </button>

              {/* Primary CTA: PLAN YOUR JOURNEY */}
              <button
                onClick={() => openInquireForPackage()}
                className="inline-flex items-center gap-1.5 text-xs font-bold px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#0F2922] text-white hover:bg-[#153A30] shadow-sm transition-all cursor-pointer uppercase tracking-wider min-h-[40px] sm:min-h-[44px]"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                <span>Plan<span className="hidden sm:inline"> Your Journey</span></span>
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                className="lg:hidden p-2 rounded-xl text-stone-700 hover:text-stone-900 hover:bg-stone-100 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile drop menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 space-y-1.5 shadow-xl max-h-[calc(100vh-5rem)] overflow-y-auto">
              {[
                { id: 'home', label: 'Home' },
                { id: 'destinations', label: 'Destinations' },
                { id: 'experiences', label: 'Experiences' },
                { id: 'tours', label: 'Tours' },
                { id: 'travel-guide', label: 'Travel Guide' },
                { id: 'about-us', label: 'About Us' },
                { id: 'contact', label: 'Contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setClientPage(item.id as any);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-between min-h-[44px] ${
                    clientPage === item.id
                      ? 'bg-emerald-50 text-emerald-950 font-bold border border-emerald-200/90'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <span className="text-sm">{item.label}</span>
                  {clientPage === item.id && (
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  )}
                </button>
              ))}
              <div className="pt-3 border-t border-stone-200 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openInquireForPackage();
                  }}
                  className="w-full flex items-center justify-center gap-2 text-xs font-bold py-3.5 rounded-xl bg-[#0F2922] text-white uppercase tracking-wider min-h-[44px] shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Plan Your Journey</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setTrackerModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 text-xs font-semibold py-3 rounded-xl bg-stone-100 text-stone-800 min-h-[44px]"
                >
                  <FileText className="w-4 h-4 text-emerald-800" />
                  <span>Track Booking / Itinerary</span>
                </button>
              </div>
            </div>
          )}
        </header>
      )}

      {/* Booking Tracker / Client Voucher Lookup Modal */}
      {trackerModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-3xl w-full max-w-md p-6 text-stone-800 shadow-2xl relative">
            <button
              onClick={() => {
                setTrackerModalOpen(false);
                setLookupError('');
              }}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-['Playfair_Display'] text-slate-900">Guest Itinerary Portal</h3>
                <p className="text-xs text-stone-500">Access your live quotation, schedule & vouchers</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Enter Booking Reference
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={lookupRef}
                    onChange={(e) => {
                      setLookupRef(e.target.value);
                      setLookupError('');
                    }}
                    placeholder="e.g. TT-2026-081"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-700 focus:bg-white"
                  />
                  <button
                    onClick={() => handleTrackBooking()}
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-[#0F2922] hover:bg-[#153A30] text-white font-bold text-xs rounded-lg transition-colors"
                  >
                    Look Up
                  </button>
                </div>
                {lookupError && (
                  <p className="text-xs text-rose-600 mt-1.5">{lookupError}</p>
                )}
              </div>

              {/* Sample Pre-loaded Bookings Quick Select */}
              <div className="pt-3 border-t border-stone-200">
                <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-2">
                  Or select a demo booking to inspect:
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {bookings.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => handleTrackBooking(b.bookingRef)}
                      className="w-full text-left p-2.5 rounded-xl bg-stone-50 border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50/50 transition-all flex items-center justify-between group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-800 group-hover:text-emerald-900 flex items-center gap-2">
                          <span>{b.bookingRef}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                            b.pipelineStatus === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                            b.pipelineStatus === 'quotation_sent' ? 'bg-sky-100 text-sky-800' :
                            b.pipelineStatus === 'payment_pending' ? 'bg-amber-100 text-amber-800' :
                            'bg-stone-200 text-stone-700'
                          }`}>
                            {b.pipelineStatus.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="text-[11px] text-stone-500 mt-0.5 truncate max-w-[260px]">
                          {b.customer.name} ({b.customer.country}) • {b.tripDetails.destinationName}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-800 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Source Data Export & Download Modal */}
      <DataExportModal
        isOpen={dataExportModalOpen}
        onClose={() => setDataExportModalOpen(false)}
      />
    </>
  );
};
