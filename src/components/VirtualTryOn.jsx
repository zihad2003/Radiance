import { Suspense, lazy, useState } from 'react';
import { RefreshCw, Camera, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const MakeupStudio = lazy(() => import('./makeup/MakeupStudio'));

const VirtualTryOn = () => {
    const [isStarted, setIsStarted] = useState(false);
    const [isPreloading, setIsPreloading] = useState(false);

    const handleStartExperience = async () => {
        setIsPreloading(true);
        try {
            // Explicitly preload the AI logic and heavy dependencies
            // This matches the "Solution" pattern of dynamic imports on demand
            const { initFaceDetection } = await import('../utils/faceDetection');
            await initFaceDetection();
            setIsStarted(true);
        } catch (error) {
            console.error("Failed to load AI models:", error);
            // Allow entry anyway, inner components handle errors
            setIsStarted(true);
        } finally {
            setIsPreloading(false);
        }
    };

    return (
        <section id="experience" className="relative min-h-screen bg-black overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=2000')] bg-cover bg-center opacity-40 blur-sm pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

            {!isStarted ? (
                <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="max-w-2xl"
                    >
                        <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">AI-Powered Experience</span>
                        <h2 className="text-5xl md:text-7xl font-serif text-white italic mb-8">
                            Virtual <span className="text-primary">Studio</span>
                        </h2>
                        <p className="text-white/60 text-lg leading-relaxed mb-12 max-w-xl mx-auto">
                            Experience our luxury cosmetics on your own skin in real-time.
                            Uses advanced computer vision for hyper-realistic texture matching.
                        </p>

                        <button
                            onClick={handleStartExperience}
                            disabled={isPreloading}
                            className="group relative px-10 py-5 bg-white text-black rounded-full text-xs font-black uppercase tracking-[0.3em] hover:bg-primary hover:text-white transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(244,63,94,0.6)] overflow-hidden disabled:opacity-70 disabled:cursor-wait"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                {isPreloading ? (
                                    <>
                                        <RefreshCw size={18} className="animate-spin" /> Loading Engine...
                                    </>
                                ) : (
                                    <>
                                        <Camera size={18} /> Enter Studio
                                    </>
                                )}
                            </span>
                        </button>

                        <div className="mt-12 flex items-center justify-center gap-8 text-[10px] text-white/40 uppercase tracking-widest font-bold">
                            <span className="flex items-center gap-2"><Sparkles size={12} className="text-gold" /> Real-time 4K</span>
                            <span className="flex items-center gap-2"><Sparkles size={12} className="text-gold" /> Privacy Focused</span>
                        </div>
                    </motion.div>
                </div>
            ) : (
                <Suspense fallback={
                    <div className="flex h-screen w-full items-center justify-center bg-black text-rose-50 z-50 relative">
                        <div className="flex flex-col items-center">
                            <RefreshCw className="w-12 h-12 text-primary animate-spin mb-6" />
                            <p className="font-serif text-2xl animate-pulse">Initializing Neural Engine...</p>
                            <p className="text-xs text-white/40 mt-3 uppercase tracking-widest">Loading TensorFlow Backend</p>
                        </div>
                    </div>
                }>
                    <MakeupStudio />
                </Suspense>
            )}
        </section>
    );
};

export default VirtualTryOn;
