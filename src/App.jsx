import { useState, Suspense, lazy, useEffect } from 'react';
import SmoothScroll from './components/ui/SmoothScroll';
import ErrorBoundary from './components/ui/ErrorBoundary';
import { RewardsProvider } from './context/RewardsContext';
import CustomCursor from './components/CustomCursor';
import Gamification from './components/Gamification';
import FadeIn from './components/ui/FadeIn';
import ScrollProgress from './components/ui/ScrollProgress';
import BackToTop from './components/ui/BackToTop';
import Navbar from './components/Navbar';
import ChatBot from './components/ChatBot';
import ConvexMigrator from './components/ConvexMigrator';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import TransformationCompare from './components/TransformationCompare';
import Shop from './components/Shop';
import Pricing from './components/Pricing';
import BeautyStories from './components/BeautyStories';
import BookingWizard from './components/BookingWizard';
import Team from './components/Team';
import ContactFooter from './components/ContactFooter';
import ExcellenceSection from './components/ExcellenceSection';
import { AdminLogin, Dashboard } from './components/admin/Dashboard';
import { AnimatePresence } from 'framer-motion';
import SEO from './components/SEO';
import BrowserCompatibilityWarning from './components/BrowserCompatibilityWarning';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import OfflineIndicator from './components/OfflineIndicator';
import { initAnalytics, trackPageView } from './utils/analytics';

const VirtualTryOn = lazy(() => import('./components/VirtualTryOn'));
const HairstyleAI = lazy(() => import('./components/HairstyleAI'));

function App() {
  const [selectedService, setSelectedService] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    // Initialize Analytics
    initAnalytics();
    trackPageView(window.location.pathname);

    const handler = () => setShowAdmin(true);
    window.addEventListener('open-admin', handler);
    return () => window.removeEventListener('open-admin', handler);
  }, []);

  const handleBookService = (serviceName) => {
    setSelectedService(serviceName);
    setShowBooking(true);
  };

  return (
    <RewardsProvider>
      <ErrorBoundary>
        {/* Global SEO Metadata */}
        <SEO />

        {/* Browser Compatibility Warning */}
        <BrowserCompatibilityWarning />

        {/* PWA Install Prompt */}
        <PWAInstallPrompt />

        {/* Offline Indicator */}
        <OfflineIndicator />

        <SmoothScroll>
          <div className="relative min-h-screen bg-pearl selection:bg-rose-200">
            <CustomCursor />
            <Gamification />
            <ScrollProgress />
            <BackToTop />
            <ChatBot />
            <ConvexMigrator />
            <Navbar />

            <main>
              <Hero />
              <FadeIn>
                <Services onBook={handleBookService} />
              </FadeIn>
              <FadeIn delay={0.2}>
                <ExcellenceSection />
              </FadeIn>
              <Suspense fallback={<div className="h-96 w-full flex items-center justify-center text-primary font-serif">Loading AI Salon...</div>}>
                <FadeIn>
                  <HairstyleAI />
                </FadeIn>
                <FadeIn>
                  <VirtualTryOn />
                </FadeIn>
              </Suspense>
              <FadeIn>
                <Gallery />
              </FadeIn>
              <FadeIn>
                <TransformationCompare />
              </FadeIn>
              <FadeIn>
                <Shop />
              </FadeIn>
              <FadeIn>
                <Pricing />
              </FadeIn>
              <FadeIn>
                <BeautyStories />
              </FadeIn>
              <FadeIn>
                <Team />
              </FadeIn>
              <ContactFooter />
            </main>
          </div>
        </SmoothScroll>

        {/* Booking Wizard Modal */}
        <BookingWizard
          isOpen={showBooking}
          onClose={() => setShowBooking(false)}
          initialService={selectedService}
        />

        {/* Admin Modal Overlay */}
        <AnimatePresence>
          {showAdmin && (
            <div className="fixed inset-0 z-[100] bg-white">
              {!isAdminLoggedIn ? (
                <AdminLogin onLogin={() => setIsAdminLoggedIn(true)} />
              ) : (
                <Dashboard onClose={() => { setShowAdmin(false); setIsAdminLoggedIn(false); }} />
              )}
              <button
                onClick={() => setShowAdmin(false)}
                className="fixed top-4 right-4 z-[110] bg-gray-100 p-2 rounded-full hover:bg-red-100 text-gray-500 hover:text-red-500"
              >
                ✕
              </button>
            </div>
          )}
        </AnimatePresence>
      </ErrorBoundary>
    </RewardsProvider>
  );
}

export default App;
