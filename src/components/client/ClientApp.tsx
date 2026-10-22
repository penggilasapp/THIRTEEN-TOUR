import React from 'react';
import { useTour } from '../../context/TourContext';
import { HomeView } from './HomeView';
import { DestinationsSection } from './DestinationsSection';
import { ExperiencesSection } from './ExperiencesSection';
import { ToursSection } from './ToursSection';
import { AboutUsSection } from './AboutUsSection';
import { TravelGuideSection } from './TravelGuideSection';
import { ContactSection } from './ContactSection';
import { FAQSection } from './FAQSection';
import { ClientPortalView } from './ClientPortalView';
import { Footer } from './Footer';
import { ChevronRight, Home, ArrowLeft } from 'lucide-react';

export const ClientApp: React.FC = () => {
  const { clientPage, setClientPage } = useTour();

  const getPageInfo = () => {
    switch (clientPage) {
      case 'destinations':
        return {
          title: 'Destinations',
          subtitle: 'Bali, Mount Bromo, Mount Ijen & Yogyakarta'
        };
      case 'experiences':
        return {
          title: 'Experiences',
          subtitle: 'Curated Exploration of Nature, Culture & Adventure'
        };
      case 'tours':
        return {
          title: 'Tours & Expeditions',
          subtitle: 'Fixed Packages, Custom Private Tours, Modular Tours & Multi-Day Expeditions'
        };
      case 'about-us':
        return {
          title: 'About Us',
          subtitle: 'Company Profile, Service Approach & Audited Partner Standards'
        };
      case 'travel-guide':
        return {
          title: 'Travel Guide',
          subtitle: 'Authoritative Articles, Field Intel & Preparation Guides'
        };
      case 'contact':
        return {
          title: 'Contact',
          subtitle: 'Customer Assistance, Office Hubs & Priority Concierge'
        };
      case 'faq':
        return {
          title: 'Frequently Asked Questions',
          subtitle: 'Comprehensive Guidance on Booking, Visas, Mountain Safety & Overland Logistics'
        };
      default:
        return null;
    }
  };

  const pageInfo = getPageInfo();

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-800 flex flex-col font-sans selection:bg-emerald-800 selection:text-white scroll-smooth">
      {/* Live Itinerary / Booking Tracker Drawer */}
      <ClientPortalView />

      <main className="grow">
        {clientPage === 'home' ? (
          <HomeView />
        ) : (
          <div className="space-y-0">
            {/* Dedicated Page Breadcrumb Navigation Header */}
            {pageInfo && clientPage !== 'destinations' && (
              <div className="bg-[#0B2019] text-white border-b border-emerald-950/80 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    {/* Breadcrumb Trail */}
                    <nav className="flex items-center gap-2 text-xs text-emerald-200/80 mb-2">
                      <button
                        onClick={() => setClientPage('home')}
                        className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Home className="w-3.5 h-3.5" />
                        <span>Home</span>
                      </button>
                      <ChevronRight className="w-3.5 h-3.5 text-emerald-400/60" />
                      <span className="font-semibold text-white">{pageInfo.title}</span>
                    </nav>

                    <h1 className="text-2xl sm:text-4xl font-extrabold font-['Playfair_Display'] text-white">
                      {pageInfo.title}
                    </h1>
                    <p className="text-xs sm:text-sm text-emerald-100/70 mt-1 max-w-2xl leading-relaxed">
                      {pageInfo.subtitle}
                    </p>
                  </div>

                  <button
                    onClick={() => setClientPage('home')}
                    className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all self-start sm:self-auto cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Home</span>
                  </button>
                </div>
              </div>
            )}

            {/* Render Dedicated Page Component */}
            {clientPage === 'destinations' && <DestinationsSection />}
            {clientPage === 'experiences' && <ExperiencesSection />}
            {clientPage === 'tours' && <ToursSection />}
            {clientPage === 'about-us' && <AboutUsSection />}
            {clientPage === 'travel-guide' && <TravelGuideSection />}
            {clientPage === 'contact' && <ContactSection />}
            {clientPage === 'faq' && <FAQSection showHeader={false} />}
          </div>
        )}
      </main>

      {/* Footer: FAQ, Booking Information, Cancellation Policy, Terms & Conditions, Privacy Policy, Contact Information, Social Media */}
      <Footer />
    </div>
  );
};
