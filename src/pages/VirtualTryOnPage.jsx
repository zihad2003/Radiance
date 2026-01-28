import { Suspense, lazy } from 'react';
import FadeIn from '../components/ui/FadeIn';
import SEO from '../components/SEO';
import PageBentoHeader from '../components/ui/PageBentoHeader';
import { Sparkles, Zap, Shield, Award, Camera, Layers, Wand2 } from 'lucide-react';
import AIBeautyAnalyzer from '../components/AIBeautyAnalyzer';

const VirtualTryOn = lazy(() => import('../components/VirtualTryOn'));
const HairstyleAI = lazy(() => import('../components/HairstyleAI'));
import MakeupTutorialGenerator from '../components/MakeupTutorialGenerator';

const VirtualTryOnPage = () => {
    return (
        <div className="min-h-screen bg-[#121110] text-white">
            <SEO
                title="Virtual Try-On Studio | Radiance Beauty AI"
                description="Try thousands of makeup looks and hairstyles in real-time with our AI-powered virtual studio. See it, love it, book it."
                keywords="virtual beauty try on, AI hairstyle finder, online makeup test, virtual salon Dhaka"
            />

            <PageBentoHeader
                title={<>VIRTUAL<br /><span className="text-primary italic">MIRROR</span></>}
                badge="Neural Simulation"
                description="Synthesize thousands of cinematic looks in real-time. Our proprietary 468-point face mesh ensures laboratory-grade precision."
                image="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1200"
                stats={[
                    { label: "Spatial Tracking", value: "34ms", description: "Ultra-low latency landmark detection system." },
                    { label: "Secure Vision", value: "100%", description: "All biometric data is processed locally and never stored." },
                    { label: "Style Library", value: "12k+", description: "Hyper-realistic textures from luxury brand partners." }
                ]}
            />

            {/* AI Beauty Analyzer Section */}
            <div className="container mx-auto px-6 mb-32">
                <FadeIn>
                    <div className="flex items-center gap-6 mb-12">
                        <div className="bento-ribbon text-primary">
                            <Layers size={14} fill="currentColor" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Biometric Scan</span>
                        </div>
                        <h2 className="text-3xl font-sans font-black uppercase tracking-tighter text-white">SKIN INTELLIGENCE</h2>
                        <div className="flex-1 h-px bg-white/5" />
                    </div>
                    <AIBeautyAnalyzer />
                </FadeIn>
            </div>

            {/* Makeup Studio Section */}
            <div className="container mx-auto px-6 mb-32">
                <div className="flex items-center gap-6 mb-12">
                    <div className="bento-ribbon text-primary">
                        <Wand2 size={14} fill="currentColor" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">AR Engine</span>
                    </div>
                    <h2 className="text-3xl font-sans font-black uppercase tracking-tighter text-white">MAKEUP STUDIO</h2>
                    <div className="flex-1 h-px bg-white/5" />
                </div>
                <Suspense fallback={
                    <div className="h-[600px] w-full bento-card flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-20 h-20 border-8 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-8"></div>
                            <p className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">RECALIBRATING NEURAL STUDIO...</p>
                        </div>
                    </div>
                }>
                    <FadeIn>
                        <VirtualTryOn />
                    </FadeIn>
                </Suspense>
            </div>

            {/* Hairstyle AI Section */}
            <div className="container mx-auto px-6 mb-32">
                <div className="flex items-center gap-6 mb-12">
                    <div className="bento-ribbon text-primary">
                        <Zap size={14} fill="currentColor" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Hair Lab</span>
                    </div>
                    <h2 className="text-3xl font-sans font-black uppercase tracking-tighter text-white">HAIR ARCHITECTURE</h2>
                    <div className="flex-1 h-px bg-white/5" />
                </div>
                <Suspense fallback={
                    <div className="h-[600px] w-full bento-card flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-20 h-20 border-8 border-[#C5A059]/10 border-t-[#C5A059] rounded-full animate-spin mx-auto mb-8"></div>
                            <p className="text-[#C5A059] font-black uppercase tracking-[0.4em] text-[10px]">SYNTHESIZING HAIR MESH...</p>
                        </div>
                    </div>
                }>
                    <FadeIn>
                        <HairstyleAI />
                    </FadeIn>
                </Suspense>
            </div>

            {/* Makeup Tutorial Section */}
            <div className="container mx-auto px-6 mb-32">
                <div className="flex items-center gap-6 mb-12">
                    <div className="bento-ribbon text-primary">
                        <Sparkles size={14} fill="currentColor" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Learning Hub</span>
                    </div>
                    <h2 className="text-3xl font-sans font-black uppercase tracking-tighter text-white">TUTORIAL GENERATOR</h2>
                    <div className="flex-1 h-px bg-white/5" />
                </div>
                <FadeIn>
                    <MakeupTutorialGenerator />
                </FadeIn>
            </div>

            {/* Elite CTA Board */}
            <section className="pb-32 container mx-auto px-6">
                <div className="bento-card p-20 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 opacity-20">
                        <img src="https://images.unsplash.com/photo-1596462502278-27bfaf433393?q=80&w=1200" className="w-full h-full object-cover grayscale" alt="CTA" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-transparent to-[#121110]" />
                    </div>
                    <FadeIn>
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-6xl md:text-8xl font-sans font-black text-white mb-10 uppercase tracking-tighter leading-tight drop-shadow-2xl">
                                VISUALIZE <br />
                                YOUR <span className="text-primary italic text-shadow-glow">LEGACY</span>
                            </h2>
                            <p className="text-gray-500 text-[11px] font-bold uppercase tracking-[0.5em] mb-12 leading-loose">
                                Your digital session is complete. Now experience the physical manifestation of your vision with our master stylists.
                            </p>
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="bg-white text-black px-16 py-6 rounded-3xl text-[11px] font-black uppercase tracking-[0.5em] hover:bg-primary hover:text-white transition-all shadow-2xl relative overflow-hidden"
                            >
                                <span className="relative z-10">RESERVE STUDIO TIME</span>
                            </button>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
};

export default VirtualTryOnPage;
