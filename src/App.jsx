import CustomCursor from './components/CustomCursor';
import Gamification from './components/Gamification';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import VirtualTryOn from './components/VirtualTryOn';
import HairstyleAI from './components/HairstyleAI'; // Import
import Gallery from './components/Gallery';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Booking from './components/Booking';
import Team from './components/Team';
import ContactFooter from './components/ContactFooter';

function App() {
  return (
    <div className="relative min-h-screen bg-pearl selection:bg-rose-200">
      <CustomCursor />
      <Gamification />
      <Navbar />

      <main>
        <Hero />
        <Services />
        <HairstyleAI />
        <VirtualTryOn />
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
