import { useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Scissors, Sparkles, Wand2 } from 'lucide-react';
import { RefreshCw } from 'lucide-react';

const HairstyleFinder = lazy(() => import('./hairstyle/HairstyleFinder'));

const HairstyleAI = () => {
    const [isStarted, setIsStarted] = useState(false);

    return (
        <section className="relative">
            {!isStarted ? (
                <div className="relative min-h-[80vh] bg-rose-50 flex items-center justify-center overflow-hidden">
                    {/* Background Decor */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-200/20 rounded-full blur-[120px] pointer-events-none" />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="text-center z-10 px-6 max-w-3xl"
                    >
                        <div className="inline-flex items-center gap-2 mb-6 bg-white px-6 py-2 rounded-full border border-primary/10 shadow-sm">
                            <Scissors size={16} className="text-primary" />
                            <span className="text-xs font-bold uppercase tracking-widest text-primary">AI Consultant</span>
                        </div>

                        <h2 className="text-5xl md:text-7xl font-script text-charcoal mb-8">
                            Discover Your <span className="text-primary">Perfect Cut</span>
                        </h2>

                        <p className="text-gray-500 text-lg leading-relaxed mb-10">
                            Unsure which style suits your face shape? Our AI analyzes your facial geometry
                            to recommend cuts that enhance your natural beauty.
                        </p>

                        <button
                            onClick={() => setIsStarted(true)}
                            className="group relative px-12 py-5 bg-charcoal text-white rounded-2xl text-xs font-black uppercase tracking-[0.3em] hover:bg-primary transition-all shadow-xl active:scale-95"
                        >
                            <span className="flex items-center gap-3">
                                <Wand2 size={18} /> Begin Analysis
                            </span>
                        </button>
                    </motion.div>
                </div>
            ) : (
                <Suspense fallback={
                    <div className="h-screen w-full flex items-center justify-center bg-rose-50 text-primary">
                        <div className="flex flex-col items-center animate-pulse">
                            <RefreshCw className="w-12 h-12 animate-spin mb-6" />
                            <p className="font-serif text-2xl">Loading Hair Styler...</p>
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
