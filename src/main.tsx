import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register Service Worker for PWA offline caching in remote expedition areas
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  try {
    registerSW({
      immediate: true,
      onNeedRefresh() {
        console.log('THIRTEEN Tour PWA: New updates available.');
      },
      onOfflineReady() {
        console.log('THIRTEEN Tour PWA: Content and trip schedules cached for offline use.');
      },
    });
  } catch (e) {
    // Fallback registration if virtual import behaves differently in dev
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.warn('SW registration fallback:', err);
    });
  }
}

createRoot(document.getElementById('root')!).render(<App />);
