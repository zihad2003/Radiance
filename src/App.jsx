import { useState, Suspense, lazy, useEffect } from 'react';
import SmoothScroll from './components/ui/SmoothScroll';
import { RewardsProvider } from './context/RewardsContext';
import CustomCursor from './components/CustomCursor';
import Gamification from './components/Gamification';
import FadeIn from './components/ui/FadeIn';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Shop from './components/Shop';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import BookingWizard from './components/BookingWizard';
import Team from './components/Team';
import ContactFooter from './components/ContactFooter';
import ExcellencePillars from './components/ExcellencePillars';
import { AdminLogin, Dashboard } from './components/admin/Dashboard'; // Import Admin
import { AnimatePresence } from 'framer-motion';

const VirtualTryOn = lazy(() => import('./components/VirtualTryOn'));
const HairstyleAI = lazy(() => import('./components/HairstyleAI'));

function App() {
  const [selectedService, setSelectedService] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
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
      <SmoothScroll>
        <div className="relative min-h-screen bg-pearl selection:bg-rose-200">
          <CustomCursor />
          <Gamification />
          <Navbar />

          <main>
            <Hero />
            <FadeIn>
              <Services onBook={handleBookService} />
            </FadeIn>
            <FadeIn delay={0.2}>
              <ExcellencePillars />
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
              <Shop />
            </FadeIn>
            <FadeIn>
              <Pricing />
            </FadeIn>
            <FadeIn>
              <Testimonials />
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
    </RewardsProvider>
  );
}

export default App;
