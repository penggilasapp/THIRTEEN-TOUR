/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TourProvider, useTour } from './context/TourContext';
import { TopNavigation } from './components/common/TopNavigation';
import { ClientApp } from './components/client/ClientApp';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { InquireModal } from './components/client/InquireModal';
import { MobileSimulatorContainer } from './components/mobile/MobileSimulatorContainer';
import { OfflineIndicator } from './components/common/OfflineIndicator';

const MainAppContent: React.FC = () => {
  const { viewMode } = useTour();

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-slate-800 flex flex-col font-sans selection:bg-emerald-800 selection:text-white">
      <TopNavigation />

      <MobileSimulatorContainer>
        {viewMode === 'client' ? (
          <ClientApp />
        ) : (
          <AdminDashboard />
        )}
      </MobileSimulatorContainer>

      {/* Global Inquire Modal */}
      <InquireModal />

      {/* Offline Status Alert for remote regions (Bromo/Ijen) */}
      <OfflineIndicator />
    </div>
  );
};

export default function App() {
  return (
    <TourProvider>
      <MainAppContent />
    </TourProvider>
  );
}
