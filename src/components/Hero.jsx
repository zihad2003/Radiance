import { useRef, lazy, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import OptimizedImage from './ui/OptimizedImage';

const BeautyScene = lazy(() => import('./3d/BeautyScene'));

const Hero = () => {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 200]);

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#050505]">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0 parallax-hero">
                <OptimizedImage
                    src="/assets/hero/bridal_hero.png"
                    alt="Radiance Luxury Bridal"
                    className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                    priority={true}
                    useWebP={true}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#050505]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent opacity-50" />
                <Suspense fallback={null}>
                    <BeautyScene />
                </Suspense>
            </div>

            {/* Overlay Content */}
            <motion.div
                className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center pointer-events-none"
                style={{ y }}
            >
                <div className="pointer-events-auto p-12 glass-card rounded-[4rem] max-w-5xl mx-4 shadow-3xl border border-white/10 bg-black/30 backdrop-blur-md relative overflow-hidden group">
                    {/* Ambient Glow */}
                    <div className="absolute -top-32 -left-32 w-64 h-64 bg-gold/20 rounded-full blur-[100px] group-hover:bg-gold/30 transition-all duration-1000" />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="mb-6 relative inline-block"
                    >
                        <h1 className="text-7xl md:text-9xl font-script text-transparent bg-clip-text bg-gradient-to-r from-[#F5E6C8] to-[#C5A059] drop-shadow-sm p-4 leading-tight">
                            Radiance
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="text-xl md:text-2xl text-white/80 mb-10 font-sans font-light tracking-wide max-w-2xl mx-auto leading-relaxed"
                    >
                        The ultimate AI-powered beauty sanctuary. <br />
                        <span className="italic text-gold">Discover your glow.</span>
                    </motion.p>

                    <div className="flex justify-center gap-6">
                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                boxShadow: [
                                    "0px 0px 0px 0px rgba(197, 160, 89, 0)",
                                    "0px 0px 20px 5px rgba(197, 160, 89, 0.4)",
                                    "0px 0px 0px 0px rgba(197, 160, 89, 0)"
                                ]
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{
                                duration: 2,
                                delay: 1,
                                boxShadow: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                            }}
                            onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-10 py-4 bg-gradient-to-r from-[#C5A059] to-[#F5E6C8] text-black rounded-full text-lg font-semibold tracking-widest shadow-lg interactive hover:brightness-110"
                        >
                            VIRTUAL TRY-ON
                        </motion.button>
                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.5, delay: 1.1 }}
                            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-10 py-4 bg-transparent text-white border-2 border-white/20 rounded-full text-lg font-semibold tracking-widest shadow-md hover:bg-white/10 transition-colors duration-300 interactive"
                        >
                            BOOK NOW
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-1 h-12 bg-gradient-to-b from-gold to-transparent rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
