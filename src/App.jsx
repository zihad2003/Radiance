import { Suspense, lazy } from 'react';
import CustomCursor from './components/CustomCursor';
import Gamification from './components/Gamification';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Booking from './components/Booking';
import Team from './components/Team';
import ContactFooter from './components/ContactFooter';

const VirtualTryOn = lazy(() => import('./components/VirtualTryOn'));
const HairstyleAI = lazy(() => import('./components/HairstyleAI'));

function App() {
  return (
    <div className="relative min-h-screen bg-pearl selection:bg-rose-200">
      <CustomCursor />
      <Gamification />
      <Navbar />

      <main>
        <Hero />
        <Services />
        <Suspense fallback={<div className="h-96 w-full flex items-center justify-center text-primary font-serif">Loading AI Salon...</div>}>
          <HairstyleAI />
          <VirtualTryOn />
        </Suspense>
        <Gallery />
        <Pricing />
        <Testimonials />
        <Booking />
        <Team />
        <ContactFooter />
      </main>
    </div>
  );
}

export default App;
