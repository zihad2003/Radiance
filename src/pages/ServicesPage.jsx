import Services from '../components/Services';
import Pricing from '../components/Pricing';
import FadeIn from '../components/ui/FadeIn';
import SkinHealthAnalyzer from '../components/SkinHealthAnalyzer';
import PageBentoHeader from '../components/ui/PageBentoHeader';
import { Clock, Award, Heart, Shield, ChevronRight } from 'lucide-react';

const ServicesPage = ({ onBook }) => {
    return (
        <div className="min-h-screen bg-[#121110] text-white">
            <PageBentoHeader
                title={<>PREMIUM<br /><span className="text-primary">ARTISTRY</span></>}
                badge="Boutique Excellence"
                description="From cinematic makeup transformations to scientific skin therapy. Every service is a masterclass in radiance."
                image="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200"
                stats={[
                    { label: "Expert Team", value: "20+", description: "Certified professionals with international training." },
                    { label: "Clinics", value: "05", description: "State-of-the-art facilities across the city." },
                    { label: "Satisfaction", value: "99%", description: "Highly rated experiences by our elite clientele." }
                ]}
            />

            {/* AI Skin Analysis */}
            <div className="container mx-auto px-6 mb-24">
                <FadeIn>
                    <SkinHealthAnalyzer />
                </FadeIn>
            </div>

            {/* Services Grid */}
            <div className="container mx-auto px-6 mb-24 text-white">
                <FadeIn>
                    <div className="mb-16">
                        <h2 className="text-4xl font-sans font-black uppercase tracking-tighter mb-4">The Selection</h2>
                        <div className="h-1 w-20 bg-primary"></div>
                    </div>
                    <Services onBook={onBook} />
                </FadeIn>
            </div>

            {/* Pricing Section */}
            <div className="container mx-auto px-6 mb-24">
                <FadeIn>
                    <Pricing />
                </FadeIn>
            </div>

            {/* CTA Section */}
            <section className="py-24 bg-[#1A1A1A] border-y border-white/5">
                <div className="container mx-auto px-6 text-center">
                    <FadeIn>
                        <h2 className="text-5xl md:text-7xl font-sans font-black text-white mb-8 uppercase tracking-tighter">
                            Ready to <span className="text-primary">Transform?</span>
                        </h2>
                        <p className="text-gray-400 text-[10px] mb-12 uppercase tracking-[0.4em] font-bold">
                            Book your appointment today and experience the Radiance difference
                        </p>
                        <button
                            onClick={() => onBook && onBook(null)}
                            className="bg-white text-black px-12 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary hover:text-white transition-all shadow-2xl"
                        >
                            Secure Appointment
                        </button>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;
