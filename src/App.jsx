import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SmoothScroll from './components/ui/SmoothScroll';
import ErrorBoundary from './components/ui/ErrorBoundary';
import { RewardsProvider } from './context/RewardsContext';
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
import { useShopStore } from './store/useShopStore';
import CartSlideOut from './components/CartSlideOut';
import PaymentGateway from './components/payment/PaymentGateway';
import UserProfile from './components/user/UserProfile';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/ui/LoadingScreen';

// Page Imports
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import VirtualTryOnPage from './pages/VirtualTryOnPage';
import GalleryPage from './pages/GalleryPage';
import ShopPage from './pages/ShopPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AIMakeoverPage from './pages/AIMakeoverPage';
import AuthPage from './pages/AuthPage';
import AccountPage from './pages/AccountPage';
import ProtectedRoute from './components/ProtectedRoute';

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
  const [showProfile, setShowProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Default to loading state
  const { isCartOpen, setCartOpen, isPaymentOpen, setPaymentOpen } = useShopStore();

  useEffect(() => {
    // Initialize Analytics
    initAnalytics();

    const adminHandler = () => setShowAdmin(true);
    const profileHandler = () => setShowProfile(true);
    window.addEventListener('open-admin', adminHandler);
    window.addEventListener('open-profile', profileHandler);
    return () => {
      window.removeEventListener('open-admin', adminHandler);
      window.removeEventListener('open-profile', profileHandler);
    };
  }, []);

  const handleBookService = (serviceName) => {
    setSelectedService(serviceName);
    setShowBooking(true);
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
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
            {/* Custom Cursor */}
            <CustomCursor />

            <div className="relative min-h-screen bg-[#121110] selection:bg-primary selection:text-black">
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
                  <Route path="/ai-makeover" element={
                    <ProtectedRoute>
                      <AIMakeoverPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/account" element={
                    <ProtectedRoute>
                      <AccountPage />
                    </ProtectedRoute>
                  } />
                  {/* Fallback to home */}
                  <Route path="*" element={<HomePage onBook={handleBookService} />} />
                </Routes>
              </main>

              {/* Footer on all pages */}
              <ContactFooter />
            </div>
          </SmoothScroll>

          {/* Global Shop Components */}
          <CartSlideOut
            isOpen={isCartOpen}
            onClose={() => setCartOpen(false)}
            onCheckout={() => {
              setCartOpen(false);
              setPaymentOpen(true);
            }}
          />

          {isPaymentOpen && (
            <PaymentGateway
              onClose={() => setPaymentOpen(false)}
              onSuccess={() => {
                // handle success if needed
              }}
            />
          )}

          {/* Booking Wizard Modal */}
          <BookingWizard
            isOpen={showBooking}
            onClose={() => setShowBooking(false)}
            initialService={selectedService}
          />

          <AnimatePresence>
            {showProfile && (
              <UserProfile
                isOpen={showProfile}
                onClose={() => setShowProfile(false)}
                onOpenAdmin={() => setShowAdmin(true)}
              />
            )}
          </AnimatePresence>

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
      )}
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
