import React, { useState } from 'react';
import { useTour } from '../../context/TourContext';
import { EXPERIENCES_DATA } from '../../data/experienceData';
import { TRAVEL_ARTICLES_DATA } from '../../data/guideData';
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
  Download, 
  Copy, 
  Check, 
  Database, 
  FileJson, 
  Layers, 
  Compass, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  HelpCircle,
  FileSpreadsheet,
  Code2,
  FolderArchive,
  Terminal,
  ExternalLink
} from 'lucide-react';
import JSZip from 'jszip';

interface DataExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type DatasetTab = 
  | 'zip-guide'
  | 'all'
  | 'packages'
  | 'bookings'
  | 'destinations'
  | 'experiences'
  | 'guides'
  | 'faqs'
  | 'policies'
  | 'partners'
  | 'codemap';

export const DataExportModal: React.FC<DataExportModalProps> = ({ isOpen, onClose }) => {
  const { packages, destinations, partners, bookings } = useTour();
  const [activeTab, setActiveTab] = useState<DatasetTab>('zip-guide');
  const [copied, setCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);

  if (!isOpen) return null;

  const getDatasetObject = () => {
    switch (activeTab) {
      case 'packages':
        return {
          title: 'THIRTEEN Operator Tour - Packages & Overland Itineraries',
          exportedAt: new Date().toISOString(),
          count: packages.length,
          packages
        };
      case 'bookings':
        return {
          title: 'THIRTEEN Operator Tour - CRM Leads & Booking Records',
          exportedAt: new Date().toISOString(),
          count: bookings.length,
          bookings
        };
      case 'destinations':
        return {
          title: 'THIRTEEN Operator Tour - Destinations Portfolio',
          exportedAt: new Date().toISOString(),
          count: destinations.length,
          destinations
        };
      case 'experiences':
        return {
          title: 'THIRTEEN Operator Tour - Nature, Culture & Adventure Experiences',
          exportedAt: new Date().toISOString(),
          count: EXPERIENCES_DATA.length,
          experiences: EXPERIENCES_DATA
        };
      case 'guides':
        return {
          title: 'THIRTEEN Operator Tour - Travel Guides & Field Intel',
          exportedAt: new Date().toISOString(),
          count: TRAVEL_ARTICLES_DATA.length,
          articles: TRAVEL_ARTICLES_DATA
        };
      case 'faqs':
        return {
          title: 'THIRTEEN Operator Tour - Frequently Asked Questions (Booking & Requirements)',
          exportedAt: new Date().toISOString(),
          count: FAQS_DATA.length,
          faqs: FAQS_DATA
        };
      case 'policies':
        return {
          title: 'THIRTEEN Operator Tour - Governance & Policies',
          exportedAt: new Date().toISOString(),
          bookingInfo: BOOKING_INFO_DATA,
          cancellationPolicy: CANCELLATION_POLICY_DATA,
          termsAndConditions: TERMS_CONDITIONS_DATA,
          privacyPolicy: PRIVACY_POLICY_DATA,
          contactInfo: CONTACT_INFO_DATA
        };
      case 'partners':
        return {
          title: 'THIRTEEN Operator Tour - Certified Local Partner Network',
          exportedAt: new Date().toISOString(),
          count: partners.length,
          partners
        };
      case 'codemap':
        return {
          title: 'THIRTEEN Operator Tour - Source Code Architecture & Data Schema',
          framework: 'React 19 + TypeScript + Tailwind CSS 4 + Vite',
          dataPath: 'src/data/',
          dataFiles: [
            { file: 'src/data/mockData.ts', description: 'Destinations and default tour packages' },
            { file: 'src/data/packagesData.ts', description: 'Overland itinerary packages & daily schedules' },
            { file: 'src/data/experienceData.ts', description: 'Curated natural & cultural micro-experiences' },
            { file: 'src/data/guideData.ts', description: 'Field guides, travel requirements, mountain safety' },
            { file: 'src/data/policyData.ts', description: 'FAQs, booking terms, cancellation schedules, contacts' },
            { file: 'src/data/partnersData.ts', description: 'Local certified partner network directory' }
          ]
        };
      case 'all':
      case 'zip-guide':
      default:
        return {
          metadata: {
            app: 'THIRTEEN Operator Tour',
            tagline: 'Hybrid Tour Operator - Bali, Mount Bromo, Mount Ijen, Yogyakarta',
            exportedAt: new Date().toISOString(),
            schemaVersion: '1.0.0'
          },
          destinations,
          packages,
          experiences: EXPERIENCES_DATA,
          travelGuides: TRAVEL_ARTICLES_DATA,
          faqs: FAQS_DATA,
          bookingInfo: BOOKING_INFO_DATA,
          cancellationPolicy: CANCELLATION_POLICY_DATA,
          termsAndConditions: TERMS_CONDITIONS_DATA,
          privacyPolicy: PRIVACY_POLICY_DATA,
          contactInfo: CONTACT_INFO_DATA,
          certifiedPartners: partners,
          sampleBookings: bookings
        };
    }
  };

  const currentData = getDatasetObject();
  const jsonString = JSON.stringify(currentData, null, 2);
  const dataByteSize = new Blob([jsonString]).size;
  const formattedSize = dataByteSize > 1024 
    ? `${(dataByteSize / 1024).toFixed(1)} KB` 
    : `${dataByteSize} bytes`;

  // 1. Download full project source code zip from public asset
  const handleDownloadSourceCodeZip = () => {
    const link = document.createElement('a');
    link.href = '/thirteen-operator-tour-source.zip';
    link.download = `thirteen-operator-tour-source-code-${new Date().toISOString().slice(0, 10)}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Convert array to CSV
  const generateCSV = (tabType: string = activeTab): string | null => {
    if (tabType === 'packages') {
      const headers = ['ID', 'Code', 'Title', 'Destination', 'Duration_Days', 'Service_Tier', 'Price_USD', 'Price_IDR', 'Description'];
      const rows = packages.map(p => [
        `"${p.id}"`,
        `"${p.code}"`,
        `"${p.title.replace(/"/g, '""')}"`,
        `"${p.destinationName}"`,
        p.durationDays,
        `"${p.serviceTier}"`,
        p.indicativePriceUsd || 0,
        p.indicativePriceIdr || 0,
        `"${(p.shortDescription || '').replace(/"/g, '""')}"`
      ]);
      return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    }

    if (tabType === 'bookings') {
      const headers = ['Booking_Ref', 'Guest_Name', 'Guest_Email', 'Guest_Phone', 'Country', 'Package_Title', 'Start_Date', 'Pax_Count', 'Status', 'Total_Price'];
      const rows = bookings.map(b => [
        `"${b.bookingRef}"`,
        `"${(b.customer?.name || '').replace(/"/g, '""')}"`,
        `"${b.customer?.email || ''}"`,
        `"${b.customer?.phone || ''}"`,
        `"${b.customer?.country || ''}"`,
        `"${(b.tripDetails?.packageTitle || '').replace(/"/g, '""')}"`,
        `"${b.tripDetails?.startDate || ''}"`,
        b.tripDetails?.paxCount || 1,
        `"${b.pipelineStatus}"`,
        b.quotation?.totalPriceCurrency || b.quotation?.totalPriceIdr || ''
      ]);
      return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    }

    if (tabType === 'destinations') {
      const headers = ['ID', 'Name', 'Tagline', 'Status', 'Highlights', 'Description'];
      const rows = destinations.map(d => [
        `"${d.id}"`,
        `"${d.name.replace(/"/g, '""')}"`,
        `"${(d.tagline || '').replace(/"/g, '""')}"`,
        `"${d.status || 'core'}"`,
        `"${(d.highlights || []).join('; ').replace(/"/g, '""')}"`,
        `"${(d.description || '').replace(/"/g, '""')}"`
      ]);
      return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    }

    return null;
  };

  // 2. Dynamically build a Data Bundle ZIP with JSZip
  const handleDownloadDataBundleZip = async () => {
    try {
      setIsZipping(true);
      const zip = new JSZip();

      // Folder structure inside data zip
      const dataFolder = zip.folder('data-json');
      const csvFolder = zip.folder('data-csv');

      // Add JSON files
      dataFolder?.file('all_bundle_data.json', JSON.stringify({
        metadata: {
          app: 'THIRTEEN Operator Tour',
          exportedAt: new Date().toISOString()
        },
        destinations,
        packages,
        experiences: EXPERIENCES_DATA,
        travelGuides: TRAVEL_ARTICLES_DATA,
        faqs: FAQS_DATA,
        policies: {
          bookingInfo: BOOKING_INFO_DATA,
          cancellationPolicy: CANCELLATION_POLICY_DATA,
          termsAndConditions: TERMS_CONDITIONS_DATA,
          privacyPolicy: PRIVACY_POLICY_DATA,
          contactInfo: CONTACT_INFO_DATA
        },
        partners,
        bookings
      }, null, 2));

      dataFolder?.file('packages.json', JSON.stringify(packages, null, 2));
      dataFolder?.file('destinations.json', JSON.stringify(destinations, null, 2));
      dataFolder?.file('experiences.json', JSON.stringify(EXPERIENCES_DATA, null, 2));
      dataFolder?.file('travel_guides.json', JSON.stringify(TRAVEL_ARTICLES_DATA, null, 2));
      dataFolder?.file('faqs_and_policies.json', JSON.stringify({
        faqs: FAQS_DATA,
        bookingInfo: BOOKING_INFO_DATA,
        cancellation: CANCELLATION_POLICY_DATA,
        terms: TERMS_CONDITIONS_DATA,
        privacy: PRIVACY_POLICY_DATA,
        contact: CONTACT_INFO_DATA
      }, null, 2));
      dataFolder?.file('partners.json', JSON.stringify(partners, null, 2));
      dataFolder?.file('crm_bookings.json', JSON.stringify(bookings, null, 2));

      // Add CSV files
      const pkgCsv = generateCSV('packages');
      if (pkgCsv) csvFolder?.file('packages.csv', pkgCsv);

      const bkgCsv = generateCSV('bookings');
      if (bkgCsv) csvFolder?.file('crm_bookings.csv', bkgCsv);

      const dstCsv = generateCSV('destinations');
      if (dstCsv) csvFolder?.file('destinations.csv', dstCsv);

      // Add instructions readme
      zip.file('README_DATA.txt', `THIRTEEN Operator Tour - Data Bundle
Export Date: ${new Date().toUTCString()}

File Structure:
1. data-json/ : Structured JSON datasets for PostgreSQL, SQLite, MongoDB, or Firebase.
2. data-csv/  : Formatted CSV spreadsheets for Microsoft Excel or Google Sheets.

Contact THIRTEEN Operator Tour for custom bespoke integrations.`);

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = `thirteen-data-bundle-${new Date().toISOString().slice(0, 10)}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to create data zip:', err);
      alert('An error occurred while generating the ZIP bundle.');
    } finally {
      setIsZipping(false);
    }
  };

  const handleDownloadJSON = () => {
    const filename = `thirteen_${activeTab}_data_${new Date().toISOString().slice(0, 10)}.json`;
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadCSV = () => {
    const csvContent = generateCSV();
    if (!csvContent) return;
    const filename = `thirteen_${activeTab}_export_${new Date().toISOString().slice(0, 10)}.csv`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs: { id: DatasetTab; label: string; icon: React.ComponentType<{ className?: string }>; count?: number }[] = [
    { id: 'zip-guide', label: '📦 ZIP Bundle & Guide', icon: FolderArchive },
    { id: 'all', label: 'All Bundled JSON', icon: Database },
    { id: 'packages', label: 'Tour Packages', icon: Layers, count: packages.length },
    { id: 'bookings', label: 'CRM & Bookings', icon: FileSpreadsheet, count: bookings.length },
    { id: 'destinations', label: 'Destinations', icon: Compass, count: destinations.length },
    { id: 'experiences', label: 'Experiences', icon: Sparkles, count: EXPERIENCES_DATA.length },
    { id: 'guides', label: 'Travel Guides', icon: BookOpen, count: TRAVEL_ARTICLES_DATA.length },
    { id: 'faqs', label: 'FAQs & Policies', icon: HelpCircle, count: FAQS_DATA.length },
    { id: 'partners', label: 'Partners', icon: ShieldCheck, count: partners.length },
    { id: 'codemap', label: 'Source Architecture', icon: Code2 }
  ];

  const hasCSV = ['packages', 'bookings', 'destinations'].includes(activeTab);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white border border-stone-200 rounded-3xl w-full max-w-4xl text-stone-800 shadow-2xl relative overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF9F6] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100/80 border border-emerald-300 flex items-center justify-center text-emerald-900 shadow-xs">
              <FolderArchive className="w-5 h-5 text-emerald-800" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800">
                THIRTEEN Operator Tour • Data &amp; Source Archive Hub
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-['Playfair_Display'] text-slate-900">
                Export Source Code &amp; Data (.ZIP)
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Highlight Quick Action Banners: 2 Direct ZIP Download Buttons */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0D201A] to-[#16382E] text-white shrink-0 border-b border-emerald-950">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30 uppercase tracking-wider">
                  One-Click Export
                </span>
                <span className="text-xs text-emerald-200/70 hidden sm:inline">• Production-Ready &amp; Verified</span>
              </div>
              <h4 className="font-bold text-white text-base">
                Select Archive Package to Download:
              </h4>
              <p className="text-emerald-100/70 text-xs">
                Open directly on your computer, import into spreadsheet tools, or run with Vite.
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap justify-center shrink-0">
              {/* Option 1: Full Project Source Code ZIP */}
              <button
                onClick={handleDownloadSourceCodeZip}
                className="px-4 py-2.5 rounded-xl bg-white text-emerald-950 hover:bg-emerald-50 text-xs font-bold transition-all flex items-center gap-2 shadow-md hover:scale-102 active:scale-98 cursor-pointer min-h-[44px]"
                title="Download full project (React 19 + TypeScript + Tailwind 4 + Vite) ready to run"
              >
                <FolderArchive className="w-4 h-4 text-emerald-800" />
                <span>Download Source Code (.ZIP)</span>
              </button>

              {/* Option 2: Data Bundle ZIP */}
              <button
                onClick={handleDownloadDataBundleZip}
                disabled={isZipping}
                className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white border border-emerald-500/50 text-xs font-bold transition-all flex items-center gap-2 shadow-md hover:scale-102 active:scale-98 cursor-pointer disabled:opacity-50 min-h-[44px]"
                title="Download all JSON & CSV datasets"
              >
                <Database className="w-4 h-4 text-emerald-200" />
                <span>{isZipping ? 'Generating ZIP...' : 'Download Data Bundle (.ZIP)'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Tabs Bar */}
        <div className="px-6 py-2.5 bg-stone-100 border-b border-stone-200 overflow-x-auto flex items-center gap-1.5 shrink-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0F2922] text-white shadow-2xs'
                    : 'bg-white/80 text-stone-600 hover:bg-white hover:text-stone-900 border border-stone-200/70'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-300' : 'text-stone-500'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 grow bg-[#FAF9F6]">
          {activeTab === 'zip-guide' ? (
            /* ZIP Guide View */
            <div className="space-y-6">
              {/* Card 1: Contents of Source Code ZIP */}
              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
                    <FolderArchive className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                      1. Complete Source Code Archive (thirteen-operator-tour-source.zip)
                    </h4>
                    <p className="text-xs text-stone-500">
                      File size ~140 KB (clean compression excluding node_modules directory).
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700">
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1">
                    <span className="font-bold text-emerald-950 block">Frontend &amp; UI Architecture</span>
                    <p className="text-stone-500 text-[11px]">
                      All client pages (Home, Destinations, Experiences, Tours, FAQ, About Us, Contact) and CRM Admin operations console.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1">
                    <span className="font-bold text-emerald-950 block">Complete Source Datasets</span>
                    <p className="text-stone-500 text-[11px]">
                      The <code className="text-emerald-800 font-semibold">src/data/</code> directory containing overland itineraries, quotation matrices, cancellation policies, and FAQs.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1">
                    <span className="font-bold text-emerald-950 block">Build &amp; Run Configurations</span>
                    <p className="text-stone-500 text-[11px]">
                      Preconfigured <code className="text-emerald-800 font-semibold">package.json</code>, <code className="text-emerald-800 font-semibold">vite.config.ts</code>, and <code className="text-emerald-800 font-semibold">tsconfig.json</code>.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1">
                    <span className="font-bold text-emerald-950 block">Developer Documentation</span>
                    <p className="text-stone-500 text-[11px]">
                      Self-contained instructions for local setup, development commands, and production build.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-stone-100 flex-wrap gap-2">
                  <span className="text-xs text-stone-500">
                    Click the button below to download the package archive:
                  </span>
                  <button
                    onClick={handleDownloadSourceCodeZip}
                    className="px-4 py-2.5 min-h-[44px] rounded-xl bg-[#0F2922] hover:bg-[#16382E] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Download className="w-4 h-4 text-emerald-400" />
                    <span>Download Project ZIP</span>
                  </button>
                </div>
              </div>

              {/* Card 2: How to Run Locally */}
              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center text-slate-700">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                      2. How to Run Locally (3 Simple Steps)
                    </h4>
                    <p className="text-xs text-stone-500">
                      Run in Visual Studio Code, macOS/Linux Terminal, or Windows Command Prompt / PowerShell.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center text-[10px]">1</span>
                      <span>Extract the ZIP Archive</span>
                    </div>
                    <p className="text-[11px] text-stone-500 pl-7">
                      Right click <code className="text-emerald-900 font-semibold bg-stone-100 px-1 py-0.5 rounded">thirteen-operator-tour-source.zip</code> and select "Extract All".
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center text-[10px]">2</span>
                      <span>Open a terminal in the folder and install dependencies:</span>
                    </div>
                    <div className="pl-7">
                      <div className="bg-[#091A14] text-emerald-300 font-mono text-xs px-4 py-2.5 rounded-xl border border-emerald-950 select-all">
                        npm install
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center text-[10px]">3</span>
                      <span>Start the development server:</span>
                    </div>
                    <div className="pl-7">
                      <div className="bg-[#091A14] text-emerald-300 font-mono text-xs px-4 py-2.5 rounded-xl border border-emerald-950 select-all">
                        npm run dev
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1">
                        The app will be available in your browser at <code className="text-emerald-900 font-semibold">http://localhost:3000</code>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* JSON / Data Code Viewer */
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600">
                <span className="font-mono text-[11px] text-stone-500">
                  Format: <strong>JSON (UTF-8)</strong> • Size: <strong>{formattedSize}</strong> • Lines: <strong>{jsonString.split('\n').length}</strong>
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 font-medium text-xs shadow-2xs transition-all cursor-pointer min-h-[36px]"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-stone-500" />}
                    <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
                  </button>

                  {hasCSV && (
                    <button
                      onClick={handleDownloadCSV}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 hover:bg-emerald-100 font-semibold text-xs shadow-2xs transition-all cursor-pointer min-h-[36px]"
                      title="Export tabular format for Excel or Google Sheets"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Download .CSV</span>
                    </button>
                  )}

                  <button
                    onClick={handleDownloadJSON}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-2xs transition-all cursor-pointer min-h-[36px]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .JSON</span>
                  </button>
                </div>
              </div>

              {/* Code Viewer Container */}
              <div className="relative rounded-2xl bg-[#091A14] text-emerald-100 p-4 font-mono text-[11px] sm:text-xs leading-relaxed max-h-[44vh] overflow-auto border border-emerald-950/80 shadow-inner">
                <pre className="whitespace-pre overflow-x-auto text-emerald-200/90">
                  {jsonString}
                </pre>
              </div>

              {/* Quick File & Code Structure Guide */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200 text-xs text-stone-600 space-y-2">
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-emerald-800" />
                  <span>Source Dataset File Architecture:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-stone-600 pt-1">
                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
                    <span className="font-bold text-emerald-900 block">src/data/packagesData.ts</span>
                    <span className="text-stone-500">Overland itineraries across Bali, Bromo, Ijen, Yogyakarta, day schedules, and inclusions.</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
                    <span className="font-bold text-emerald-900 block">src/data/policyData.ts</span>
                    <span className="text-stone-500">Booking procedures, travel requirements, refund &amp; cancellation policies, and contacts.</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
                    <span className="font-bold text-emerald-900 block">src/data/experienceData.ts</span>
                    <span className="text-stone-500">Curated micro-experiences (Bromo Sunrise, Ijen Blue Fire, Banyuwangi Coffee Culture).</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
                    <span className="font-bold text-emerald-900 block">src/data/guideData.ts</span>
                    <span className="text-stone-500">Field guides, acclimatization advice, and certified safety respirator protocols.</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-white border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <span className="text-xs text-stone-500 text-center sm:text-left">
            Ready for local execution, spreadsheet import, or standalone hosting deployment.
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors cursor-pointer min-h-[44px] flex items-center justify-center text-center"
            >
              Close
            </button>
            <button
              onClick={handleDownloadSourceCodeZip}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0F2922] hover:bg-[#153A30] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm min-h-[44px] text-center"
            >
              <FolderArchive className="w-3.5 h-3.5 text-emerald-400" />
              <span>Download Project ZIP</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
