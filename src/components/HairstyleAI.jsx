import { useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Scissors, Sparkles, Wand2 } from 'lucide-react';
import { RefreshCw } from 'lucide-react';

const HairstyleFinder = lazy(() => import('./hairstyle/HairstyleFinder'));

const HairstyleAI = () => {
    const [isStarted, setIsStarted] = useState(false);

    return (
        <section className="relative bg-[#050505] min-h-screen">
            {!isStarted ? (
                <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
                    {/* Background Decor */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="text-center z-10 px-6 max-w-3xl"
                    >
                        <div className="inline-flex items-center gap-2 mb-6 bg-white/5 px-6 py-2 rounded-full border border-white/10 shadow-sm backdrop-blur-md">
                            <Scissors size={16} className="text-gold" />
                            <span className="text-xs font-bold uppercase tracking-widest text-gold">AI Consultant</span>
                        </div>

                        <h2 className="text-5xl md:text-7xl font-serif italic text-white mb-8">
                            Discover Your <span className="text-gradient-gold">Perfect Cut</span>
                        </h2>

                        <p className="text-white/40 text-lg leading-relaxed mb-10 font-light">
                            Unsure which style suits your face shape? Our AI analyzes your facial geometry
                            to recommend cuts that enhance your natural beauty.
                        </p>

                        <button
                            onClick={() => setIsStarted(true)}
                            className="group relative px-12 py-5 bg-[#F5E6C8] text-black rounded-full text-xs font-black uppercase tracking-[0.3em] hover:bg-white transition-all shadow-glow hover:scale-105 active:scale-95 border-none"
                        >
                            <span className="flex items-center gap-3">
                                <Wand2 size={18} /> Begin Analysis
                            </span>
                        </button>
                    </motion.div>
                </div>
            ) : (
                <Suspense fallback={
                    <div className="h-screen w-full flex items-center justify-center bg-[#050505] text-gold">
                        <div className="flex flex-col items-center">
                            <RefreshCw className="w-12 h-12 animate-spin mb-6 text-gold" />
                            <p className="font-serif italic text-2xl text-white">Loading Hair Styler...</p>
                        </div>
                    </div>
                }>
                    <HairstyleFinder />
                </Suspense>
            )}
        </section>
    );
};

export default HairstyleAI;
