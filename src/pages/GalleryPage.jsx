import Gallery from '../components/Gallery';
import TransformationCompare from '../components/TransformationCompare';
import AITaggedGallery from '../components/AITaggedGallery';
import FadeIn from '../components/ui/FadeIn';
import PageBentoHeader from '../components/ui/PageBentoHeader';
import { Camera, Star, TrendingUp } from 'lucide-react';

const GalleryPage = () => {
    return (
        <div className="min-h-screen bg-[#121110] text-white selection:bg-primary selection:text-black">
            <PageBentoHeader
                title={<>VISIONARY<br /><span className="text-primary">RESULTS</span></>}
                badge="The Portfolio"
                description="Witness the cinematic transformations that define the Radiance aesthetic. Our work is where precision meets poetry."
                image="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200"
                disableImageFilter={true}
                stats={[
                    { label: "Elite Clients", value: "5000+", description: "Satisfied individuals across Bangladesh." },
                    { label: "Recognition", value: "12", description: "Awards for bridal and avant-garde artistry." },
                    { label: "Success Rate", value: "98%", description: "Client retention and satisfaction benchmark." }
                ]}
            />

            {/* Transformation Compare - The "Wow" Factor */}
            <div className="relative z-20">
                <TransformationCompare />
            </div>

            {/* AI-Tagged Gallery - The "Utility" / functional exploration */}
            <div className="relative z-10 border-t border-white/5">
                <AITaggedGallery />
            </div>

            {/* Curated Gallery - The "Vibe" / Editorial */}
            <div className="relative z-10 border-t border-white/5">
                <Gallery />
            </div>

            {/* CTA Section */}
            <section className="py-32 bg-[#1A1A1A] border-t border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <FadeIn>
                        <div className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full mb-8">
                            <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
                                <Star size={12} fill="currentColor" />
                                Your Turn
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-8xl font-sans font-black text-white mb-8 uppercase tracking-tighter leading-[0.8]">
                            Your <span className="text-primary italic font-serif">Legacy</span> <br />Begins Here
                        </h2>
                        <p className="text-gray-400 text-xs mb-12 uppercase tracking-[0.3em] font-bold max-w-lg mx-auto leading-loose">
                            Join thousands of satisfied clients who've discovered their radiant self through our artistry.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="bg-white text-black px-12 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary hover:text-white transition-all shadow-2xl hover:-translate-y-1"
                            >
                                Secure Your Look
                            </button>
                            <button
                                onClick={() => window.location.href = '/virtual-try-on'}
                                className="bg-white/5 backdrop-blur-md border border-white/10 text-white px-12 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/10 transition-all hover:-translate-y-1"
                            >
                                Launch Virtual Studio
                            </button>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
};

export default GalleryPage;
