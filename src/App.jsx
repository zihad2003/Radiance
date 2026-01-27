import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SmoothScroll from './components/ui/SmoothScroll';
import ErrorBoundary from './components/ui/ErrorBoundary';
import { RewardsProvider } from './context/RewardsContext';
import CustomCursor from './components/CustomCursor';
import Gamification from './components/Gamification';
import ScrollProgress from './components/ui/ScrollProgress';
import BackToTop from './components/ui/BackToTop';
import Navbar from './components/Navbar';
import ChatBot from './components/ChatBot';
import ConvexMigrator from './components/ConvexMigrator';
import BookingWizard from './components/BookingWizard';
import ContactFooter from './components/ContactFooter';
import { AdminLogin, Dashboard } from './components/admin/Dashboard';
import { AnimatePresence } from 'framer-motion';
import SEO from './components/SEO';
import BrowserCompatibilityWarning from './components/BrowserCompatibilityWarning';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import OfflineIndicator from './components/OfflineIndicator';
import { initAnalytics, trackPageView } from './utils/analytics';

// Page Imports
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import VirtualTryOnPage from './pages/VirtualTryOnPage';
import GalleryPage from './pages/GalleryPage';
import ShopPage from './pages/ShopPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AIMakeoverPage from './pages/AIMakeoverPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Track page views on route change
function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return null;
}

function AppContent() {
  const [selectedService, setSelectedService] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    // Initialize Analytics
    initAnalytics();

    const handler = () => setShowAdmin(true);
    window.addEventListener('open-admin', handler);
    return () => window.removeEventListener('open-admin', handler);
  }, []);

  const handleBookService = (serviceName) => {
    setSelectedService(serviceName);
    setShowBooking(true);
  };

  return (
    <>
      {/* Global SEO Metadata */}
      <SEO />

      {/* Browser Compatibility Warning */}
      <BrowserCompatibilityWarning />

      {/* PWA Install Prompt */}
      <PWAInstallPrompt />

      {/* Offline Indicator */}
      <OfflineIndicator />

      {/* Analytics Tracker */}
      <AnalyticsTracker />

      {/* Scroll to Top on Route Change */}
      <ScrollToTop />

      <SmoothScroll>
        <div className="relative min-h-screen bg-pearl selection:bg-rose-200">
          <CustomCursor />
          <Gamification />
          <ScrollProgress />
          <BackToTop />
          <ChatBot />
          <ConvexMigrator />
          <Navbar />

          {/* Main Routes */}
          <main>
            <Routes>
              <Route path="/" element={<HomePage onBook={handleBookService} />} />
              <Route path="/services" element={<ServicesPage onBook={handleBookService} />} />
              <Route path="/virtual-try-on" element={<VirtualTryOnPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/ai-makeover" element={<AIMakeoverPage />} />
              <Route path="/contact" element={<ContactPage />} />
              {/* Fallback to home */}
              <Route path="*" element={<HomePage onBook={handleBookService} />} />
            </Routes>
          </main>

          {/* Footer on all pages */}
          <ContactFooter />
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
              aria-label="Close Admin Panel"
            >
              ✕
            </button>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <RewardsProvider>
      <ErrorBoundary>
        <Router>
          <AppContent />
        </Router>
      </ErrorBoundary>
    </RewardsProvider>
  );
}

export default App;
