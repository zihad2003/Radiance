import { Suspense, lazy } from 'react';
import FadeIn from '../components/ui/FadeIn';
import SEO from '../components/SEO';
import { Sparkles, Zap, Shield, Award } from 'lucide-react';
import AIBeautyAnalyzer from '../components/AIBeautyAnalyzer';

const VirtualTryOn = lazy(() => import('../components/VirtualTryOn'));
const HairstyleAI = lazy(() => import('../components/HairstyleAI'));
import MakeupTutorialGenerator from '../components/MakeupTutorialGenerator';

const VirtualTryOnPage = () => {
    return (
        <div className="min-h-screen bg-pearl pt-24">
            <SEO
                title="Virtual Try-On Studio | Radiance Beauty AI"
                description="Try thousands of makeup looks and hairstyles in real-time with our AI-powered virtual studio. See it, love it, book it."
                keywords="virtual beauty try on, AI hairstyle finder, online makeup test, virtual salon Dhaka"
            />
            {/* Page Header */}
            <section className="py-16 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent">
                <div className="container mx-auto px-6 text-center">
                    <FadeIn>
                        <div className="inline-block px-6 py-2 bg-white rounded-full shadow-md mb-6">
                            <span className="text-primary font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                                <Zap size={14} fill="currentColor" />
                                AI-Powered Beauty
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-serif italic mb-6 bg-gradient-to-r from-primary via-accent to-gold bg-clip-text text-transparent">
                            Virtual Try-On Studio
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            Experience the future of beauty with our AI-powered virtual try-on technology.
                            Try thousands of makeup looks in real-time, save your favorites, and shop the products.
                        </p>
                    </FadeIn>

                    {/* Features */}
                    <FadeIn delay={0.2}>
                        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                    <Sparkles className="text-primary" size={24} />
                                </div>
                                <h3 className="font-bold mb-2">Real-Time AR</h3>
                                <p className="text-sm text-gray-500">
                                    See makeup applied instantly with advanced face tracking
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                    <Shield className="text-accent" size={24} />
                                </div>
                                <h3 className="font-bold mb-2">Privacy First</h3>
                                <p className="text-sm text-gray-500">
                                    All processing happens locally - your images never leave your device
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                    <Award className="text-gold" size={24} />
                                </div>
                                <h3 className="font-bold mb-2">Save & Share</h3>
                                <p className="text-sm text-gray-500">
                                    Save your favorite looks and export high-quality images
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* AI Beauty Analyzer - NEW! */}
            <FadeIn>
                <AIBeautyAnalyzer />
            </FadeIn>

            {/* Virtual Try-On Component */}
            <Suspense fallback={
                <div className="h-96 w-full flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-primary font-serif italic text-xl">Loading AI Studio...</p>
                    </div>
                </div>
            }>
                <FadeIn>
                    <VirtualTryOn />
                </FadeIn>
            </Suspense>

            {/* Hairstyle AI Component */}
            <Suspense fallback={
                <div className="h-96 w-full flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-accent font-serif italic text-xl">Loading Hairstyle AI...</p>
                    </div>
                </div>
            }>
                <FadeIn>
                    <HairstyleAI />
                </FadeIn>
            </Suspense>

            {/* Makeup Tutorial Generator - NEW! */}
            <FadeIn>
                <MakeupTutorialGenerator />
            </FadeIn>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-primary to-accent text-white">
                <div className="container mx-auto px-6 text-center">
                    <FadeIn>
                        <h2 className="text-4xl md:text-5xl font-serif italic mb-6">
                            Love Your Look?
                        </h2>
                        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                            Book an appointment with our expert stylists to recreate your perfect look in person
                        </p>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="bg-white text-primary px-12 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-pearl transition-all shadow-2xl hover:scale-105"
                        >
                            Book Now
                        </button>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
};

export default VirtualTryOnPage;
