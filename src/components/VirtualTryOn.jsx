import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, Sparkles, RefreshCw, Loader2 } from 'lucide-react';
import Webcam from 'react-webcam';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import '@mediapipe/face_mesh';




const filters = {
    natural: {
        color: null,
        opacity: 0,
        mode: 'source-over',
        name: 'Natural'
    },
    gaye_holud: {
        color: '#FFD700', // Gold
        opacity: 0.3,
        mode: 'overlay',
        name: 'Gaye Holud'
    },
    biye_crimson: {
        color: '#8A0303', // Deep Red
        opacity: 0.7,
        mode: 'multiply',
        name: 'Biye Crimson'
    },
    bou_pink: {
        color: '#E91E63', // Rani Pink
        opacity: 0.6,
        mode: 'multiply',
        name: 'Bou Pink'
    },
    dhaka_party: {
        color: '#4a0404', // Dark
        opacity: 0.8,
        mode: 'multiply',
        name: 'Dhaka Party'
    }
};

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
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [model, setModel] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [cameraError, setCameraError] = useState(null);



    // Load Model
    useEffect(() => {
        const loadModel = async () => {
            try {
                // Load the faceLandmarksDetection model assets.
                const model = await faceLandmarksDetection.createDetector(
                    faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
                    {
                        runtime: 'mediapipe',
                        solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
                        refineLandmarks: true, // For better lip tracking
                    }
                );
                setModel(model);
                setIsLoading(false);
            } catch (err) {
                console.error("Failed to load model:", err);
                setIsLoading(false); // Stop loading anyway
            }
        };

        if (isOpen) {
            loadModel();
        } else {
            setModel(null);
            setIsLoading(true);
        }
    }, [isOpen]);

    // Detection Loop
    useEffect(() => {
        let animationFrameId;

        const detect = async () => {
            if (
                webcamRef.current &&
                webcamRef.current.video &&
                webcamRef.current.video.readyState === 4 &&
                model
            ) {
                const video = webcamRef.current.video;
                const videoWidth = video.videoWidth;
                const videoHeight = video.videoHeight;

                // Match canvas to video dimensions
                if (canvasRef.current) {
                    canvasRef.current.width = videoWidth;
                    canvasRef.current.height = videoHeight;

                    const ctx = canvasRef.current.getContext('2d');

                    try {
                        // Detect faces
                        const predictions = await model.estimateFaces(video);
                        if (predictions.length > 0) {
                            drawMakeup(predictions[0], ctx, selectedFilter);
                        } else {
                            ctx.clearRect(0, 0, videoWidth, videoHeight);
                        }
                    } catch (e) {
                        console.error("Detection error", e);
                    }
                }
            }
            animationFrameId = requestAnimationFrame(detect);
        };

        if (model && !isLoading && isOpen) {
            detect();
        }

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [model, isLoading, selectedFilter, isOpen]);

    const drawMakeup = (prediction, ctx, filterName) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        const filter = filters[filterName];
        if (!filter || !filter.color) return;

        const keypoints = prediction.keypoints;

        // Upper Lip Path
        ctx.beginPath();
        // Outer Upper
        const upperOuter = [61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291];
        // Inner Upper (reversed logic for drawing back)
        const upperInnerReversed = [308, 415, 310, 311, 312, 13, 82, 81, 80, 191, 78];

        // Start at 61
        ctx.moveTo(keypoints[61].x, keypoints[61].y);
        upperOuter.slice(1).forEach(id => ctx.lineTo(keypoints[id].x, keypoints[id].y));

        // Trace back along inner lip
        upperInnerReversed.forEach(id => ctx.lineTo(keypoints[id].x, keypoints[id].y));
        ctx.closePath();

        ctx.fillStyle = filter.color;
        ctx.save();
        ctx.globalAlpha = filter.opacity;
        ctx.globalCompositeOperation = filter.mode;
        // Blur context for softness
        ctx.filter = 'blur(2px)';
        ctx.fill();
        ctx.restore();

        // Lower Lip Path
        ctx.beginPath();
        // Outer Lower
        const lowerOuter = [61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291];
        // Inner Lower (reversed logic for drawing back)
        const lowerInnerReversed = [308, 324, 318, 402, 317, 14, 87, 178, 88, 95, 78];

        ctx.moveTo(keypoints[61].x, keypoints[61].y);
        lowerOuter.slice(1).forEach(id => ctx.lineTo(keypoints[id].x, keypoints[id].y));

        // Trace back along inner lip
        lowerInnerReversed.forEach(id => ctx.lineTo(keypoints[id].x, keypoints[id].y));
        ctx.closePath();

        ctx.fillStyle = filter.color;
        ctx.save();
        ctx.globalAlpha = filter.opacity;
        ctx.globalCompositeOperation = filter.mode;
        ctx.filter = 'blur(2px)';
        ctx.fill();
        ctx.restore();
    };


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
                className="relative w-full max-w-4xl bg-charcoal rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col items-center"
            >
                <div className="relative aspect-video bg-gray-900 w-full overflow-hidden">
                    {/* Webcam */}
                    {!cameraError ? (
                        <Webcam
                            ref={webcamRef}
                            className="absolute inset-0 w-full h-full object-cover mirror-x"
                            mirrored={true}
                            onUserMediaError={() => setCameraError("Cannot access camera")}
                            videoConstraints={{
                                facingMode: "user"
                            }}
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-white">
                            <p>{cameraError}</p>
                        </div>
                    )}

                    {/* Canvas Overlay for Makeup */}
                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full object-cover mirror-x pointer-events-none"
                        style={{ transform: 'scaleX(-1)' }} // Canvas needs manual flipping if not handled by Webcam prop (Webcam prop only flips video element)
                    />

                    {/* Check if loading */}
                    {isLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-20">
                            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                            <p className="text-white font-serif tracking-wider">Loading AI Model...</p>
                        </div>
                    )}

                    <div className="absolute top-4 right-4 flex space-x-2 z-10">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-xs text-white uppercase tracking-widest shadow-sm">Live</span>
                    </div>
                </div>

                {/* Controls */}
                <div className="w-full p-8 bg-gradient-to-t from-black/90 to-charcoal border-t border-white/5">
                    <h3 className="text-white text-center mb-6 font-serif text-xl">Select a Look</h3>
                    <div className="flex justify-center space-x-6 overflow-x-auto pb-4 custom-scrollbar">
                        {Object.keys(filters).map((filterKey) => (
                            <button
                                key={filterKey}
                                onClick={() => setSelectedFilter(filterKey)}
                                className={`
                            w-16 h-16 rounded-full border-2 overflow-hidden transition-all duration-300 transform hover:scale-110 flex-shrink-0
                            ${selectedFilter === filterKey ? 'border-primary ring-4 ring-primary/30 scale-110' : 'border-white/50'}
                        `}
                            >
                                <div
                                    className="w-full h-full flex items-center justify-center"
                                    style={{
                                        backgroundColor:
                                            filterKey === 'natural' ? '#F4E4D7' :
                                                filterKey === 'gaye_holud' ? '#FFD700' :
                                                    filterKey === 'biye_crimson' ? '#8A0303' :
                                                        filterKey === 'bou_pink' ? '#E91E63' : '#4a0404'
                                    }}
                                >
                                    {filterKey === 'natural' && <span className="text-charcoal text-[10px] font-bold">RESET</span>}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-white/20 rounded-full text-white transition-colors z-20"
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
                                    <div key={i} className="aspect-square rounded-2xl bg-secondary/30 overflow-hidden cursor-pointer hover:ring-2 ring-primary transition-all" onClick={() => setIsArOpen(true)}>
                                        <img
                                            src={`https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=200&auto=format&fit=crop`}
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
