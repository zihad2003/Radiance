import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, Sparkles, RefreshCw } from 'lucide-react';

const BeforeAfterSlider = () => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerRef = useRef(null);

    const handleMouseMove = (e) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
            const percentage = (x / rect.width) * 100;
            setSliderPosition(percentage);
        }
    };

    const handleTouchMove = (e) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
            const percentage = (x / rect.width) * 100;
            setSliderPosition(percentage);
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden cursor-ew-resize select-none shadow-2xl"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
        >
            {/* After Image (Background) */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1000&auto=format&fit=crop")', // Colorful makeup
                }}
            >
                <div className="absolute top-8 right-8 bg-charcoal/80 text-white px-4 py-2 rounded-full backdrop-blur-md">
                    AFTER
                </div>
            </div>

            {/* Before Image (Foreground - Clipped) */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1000&auto=format&fit=crop")',
                    filter: 'grayscale(100%) brightness(0.9)', // Simulated "Before"
                    clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
                }}
            >
                <div className="absolute top-8 left-8 bg-white/80 text-charcoal px-4 py-2 rounded-full backdrop-blur-md">
                    BEFORE
                </div>
            </div>

            {/* Slider Handle */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize hover:shadow-[0_0_20px_rgba(255,255,255,0.8)] transition-shadow"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg text-primary">
                    <RefreshCw size={20} className="animate-spin-slow" />
                </div>
            </div>
        </div>
    );
};

const ARModal = ({ isOpen, onClose }) => {
    const [selectedFilter, setSelectedFilter] = useState('natural');
    const videoRef = useRef(null);

    // In a real app, we would access the camera here. 
    // For demo, we'll placeholder it.

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                onClick={onClose}
            />

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-4xl bg-charcoal rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
                <div className="relative aspect-video bg-gray-900 flex items-center justify-center overflow-hidden">
                    {/* Simulated Camera Feed */}
                    <img
                        src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=2070&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-80"
                        alt="Camera Feed"
                    />
                    <div className="absolute inset-0 pointer-events-none">
                        {/* Face Tracking Overlay Simulation */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-80 border-2 border-white/30 rounded-[50%] animate-pulse" />
                        <div className="absolute top-4 right-4 flex space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                            <span className="text-xs text-white uppercase tracking-widest">Live</span>
                        </div>
                    </div>

                    {/* Filter applied overlay */}
                    <div
                        className="absolute inset-0 mix-blend-overlay transition-colors duration-500"
                        style={{
                            backgroundColor:
                                selectedFilter === 'rose' ? '#B76E79' :
                                    selectedFilter === 'gold' ? '#D4AF37' :
                                        selectedFilter === 'vamp' ? '#4a0404' : 'transparent',
                            opacity: 0.3
                        }}
                    />
                </div>

                {/* Controls */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
                    <h3 className="text-white text-center mb-6 font-serif text-xl">Select a Look</h3>
                    <div className="flex justify-center space-x-6 overflow-x-auto pb-4">
                        {['natural', 'rose', 'gold', 'vamp'].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setSelectedFilter(filter)}
                                className={`
                            w-16 h-16 rounded-full border-2 overflow-hidden transition-all duration-300 transform hover:scale-110
                            ${selectedFilter === filter ? 'border-primary ring-4 ring-primary/30 scale-110' : 'border-white/50'}
                        `}
                            >
                                <div
                                    className="w-full h-full"
                                    style={{
                                        backgroundColor:
                                            filter === 'natural' ? '#F4E4D7' :
                                                filter === 'rose' ? '#B76E79' :
                                                    filter === 'gold' ? '#D4AF37' : '#4a0404'
                                    }}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-white/20 rounded-full text-white transition-colors"
                >
                    <X size={24} />
                </button>
            </motion.div>
        </div>
    );
};

const VirtualTryOn = () => {
    const [isArOpen, setIsArOpen] = useState(false);

    return (
        <section id="experience" className="py-24 bg-white relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <div className="w-full md:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-sm font-sans uppercase tracking-[0.3em] text-primary mb-4">Innovation</h2>
                            <h3 className="text-5xl font-serif text-charcoal mb-6 leading-tight">
                                Try It Before <br /> You Wear It.
                            </h3>
                            <p className="text-charcoal/70 text-lg mb-8 leading-relaxed">
                                Unsure about that bold new lip color? Experiment with our virtual mirror.
                                See how different shades and styles look on you in real-time before making a decision.
                            </p>

                            <button
                                onClick={() => setIsArOpen(true)}
                                className="group flex items-center space-x-3 px-8 py-4 bg-charcoal text-white rounded-full hover:bg-primary transition-all duration-300 shadow-xl hover:shadow-2xl interactive"
                            >
                                <Camera size={20} />
                                <span className="uppercase tracking-widest text-sm font-semibold">Launch AR Mirror</span>
                            </button>

                            <div className="mt-12 grid grid-cols-3 gap-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="aspect-square rounded-2xl bg-secondary/30 overflow-hidden cursor-pointer hover:ring-2 ring-primary transition-all">
                                        <img
                                            src={`https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                                            alt="Look preview"
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <div className="w-full md:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            {/* Decorative Elements */}
                            <div className="absolute -top-10 -right-10 w-full h-full border-2 border-primary/20 rounded-3xl z-0" />

                            <BeforeAfterSlider />

                            <div className="absolute -bottom-6 -left-6 z-20 bg-white p-4 rounded-xl shadow-xl flex items-center space-x-4 animate-bounce-slow">
                                <Sparkles className="text-gold" />
                                <span className="font-serif italic text-charcoal">Drag to compare</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isArOpen && <ARModal isOpen={isArOpen} onClose={() => setIsArOpen(false)} />}
            </AnimatePresence>
        </section>
    );
};

export default VirtualTryOn;
