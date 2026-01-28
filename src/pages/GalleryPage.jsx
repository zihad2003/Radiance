import Gallery from '../components/Gallery';
import TransformationCompare from '../components/TransformationCompare';
import AITaggedGallery from '../components/AITaggedGallery';
import FadeIn from '../components/ui/FadeIn';
import PageBentoHeader from '../components/ui/PageBentoHeader';
import { Camera, Star, TrendingUp } from 'lucide-react';

const GalleryPage = () => {
    return (
        <div className="min-h-screen bg-[#121110] text-white">
            <PageBentoHeader
                title={<>VISIONARY<br /><span className="text-primary">RESULTS</span></>}
                badge="The Portfolio"
                description="Witness the cinematic transformations that define the Radiance aesthetic. Our work is where precision meets poetry."
                image="https://images.unsplash.com/photo-1595475038784-bbe4766e9afa?q=80&w=1200"
                stats={[
                    { label: "Elite Clients", value: "5000+", description: "Satisfied individuals across Bangladesh." },
                    { label: "Recognition", value: "12", description: "Awards for bridal and avant-garde artistry." },
                    { label: "Success Rate", value: "98%", description: "Client retention and satisfaction benchmark." }
                ]}
            />

            {/* AI-Tagged Gallery */}
            <div className="container mx-auto px-6 mb-24">
                <FadeIn>
                    <div className="mb-16">
                        <h2 className="text-4xl font-sans font-black uppercase tracking-tighter mb-4 text-white">The Archive</h2>
                        <div className="h-1 w-20 bg-primary"></div>
                    </div>
                    <AITaggedGallery />
                </FadeIn>
            </div>

            {/* Transformation Compare */}
            <div className="container mx-auto px-6 mb-24">
                <FadeIn>
                    <TransformationCompare />
                </FadeIn>
            </div>

            {/* CTA Section */}
            <section className="py-24 bg-[#1A1A1A] border-y border-white/5">
                <div className="container mx-auto px-6 text-center">
                    <FadeIn>
                        <h2 className="text-5xl md:text-7xl font-sans font-black text-white mb-8 uppercase tracking-tighter">
                            Your <span className="text-primary">Legacy</span> Begins
                        </h2>
                        <p className="text-gray-400 text-[10px] mb-12 uppercase tracking-[0.4em] font-bold">
                            Join thousands of satisfied clients who've discovered their radiant self
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="bg-white text-black px-12 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary hover:text-white transition-all shadow-2xl"
                            >
                                Secure Your Look
                            </button>
                            <button
                                onClick={() => window.location.href = '/virtual-try-on'}
                                className="bg-white/5 backdrop-blur-md border border-white/10 text-white px-12 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/10 transition-all"
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
