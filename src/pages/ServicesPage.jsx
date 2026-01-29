import Services from '../components/Services';
import Pricing from '../components/Pricing';
import FadeIn from '../components/ui/FadeIn';
import SkinHealthAnalyzer from '../components/SkinHealthAnalyzer';
import PageBentoHeader from '../components/ui/PageBentoHeader';
import { Clock, Award, Heart, Shield, ChevronRight } from 'lucide-react';

const ServicesPage = ({ onBook }) => {
    return (
        <div className="min-h-screen bg-[#121110] text-white selection:bg-primary selection:text-black">
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

            {/* AI Skin Analysis Section */}
            <SkinHealthAnalyzer />

            {/* Services Selection Section */}
            <Services onBook={onBook} />

            {/* Pricing Section */}
            <Pricing onBook={onBook} />

            {/* CTA Section */}
            <section className="py-32 bg-[#0A0A0A] border-t border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
                <div className="container mx-auto px-6 text-center relative z-10">
                    <FadeIn>
                        <h2 className="text-5xl md:text-8xl font-sans font-black text-white mb-8 uppercase tracking-tighter leading-[0.9]">
                            Ready to <span className="text-primary italic font-serif">Transform?</span>
                        </h2>
                        <p className="text-gray-500 text-[10px] mb-12 uppercase tracking-[0.4em] font-bold max-w-lg mx-auto leading-relaxed">
                            Book your exclusive appointment today and experience the Radiance difference.
                        </p>
                        <button
                            onClick={() => onBook && onBook(null)}
                            className="bg-white text-black px-12 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary hover:text-white transition-all shadow-2xl flex items-center gap-3 mx-auto"
                        >
                            Secure Appointment <ChevronRight size={14} />
                        </button>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;
