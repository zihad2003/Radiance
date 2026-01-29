import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, Sparkles, Palette, Download, Info, X, Sun, Gem, Heart, Flame } from 'lucide-react';
import { analyzeSkinTone } from '../utils/skinToneAnalysis';
import {
    applyARLipstick,
    applyAREyeshadow,
    applyARBlush,
    applyAREyeliner,
    applyARHighlighter,
    analyzeFaceShape
} from '../utils/arFilters';
import { useAction } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useToast } from '../context/ToastContext';

const AIBeautyAnalyzer = () => {
    const analyzeSkinBackend = useAction(api.skinAnalysis.analyze);
    const { error: toastError, info } = useToast();
    const [mode, setMode] = useState('idle'); // 'idle', 'camera', 'upload'
    const [analysis, setAnalysis] = useState(null);
    const [faceShape, setFaceShape] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [cameraError, setCameraError] = useState(null);

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);

    // AR Filter presets
    const filterPresets = [
        {
            id: 'natural',
            name: 'Natural Glow',
            icon: <Sun strokeWidth={1.5} />,
            filters: {
                lipstick: { color: '#FFB6C1', opacity: 0.5, finish: 'satin' },
                blush: { color: '#FFB6C1', opacity: 0.4 },
                highlighter: { intensity: 'subtle' }
            }
        },
        {
            id: 'glam',
            name: 'Glamorous',
            icon: <Gem strokeWidth={1.5} />,
            filters: {
                lipstick: { color: '#DC143C', opacity: 0.8, finish: 'glossy' },
                eyeshadow: { color: '#8B4513', opacity: 0.7, finish: 'shimmer' },
                eyeliner: { style: 'winged', thickness: 2 },
                blush: { color: '#FF69B4', opacity: 0.6 },
                highlighter: { intensity: 'intense' }
            }
        },
        {
            id: 'soft',
            name: 'Soft & Sweet',
            icon: <Heart strokeWidth={1.5} />,
            filters: {
                lipstick: { color: '#FFB6C1', opacity: 0.6, finish: 'matte' },
                eyeshadow: { color: '#DDA0DD', opacity: 0.5, finish: 'matte' },
                blush: { color: '#FFB6C1', opacity: 0.5 }
            }
        },
        {
            id: 'bold',
            name: 'Bold & Fierce',
            icon: <Flame strokeWidth={1.5} />,
            filters: {
                lipstick: { color: '#8B0000', opacity: 0.9, finish: 'matte' },
                eyeshadow: { color: '#000000', opacity: 0.8, finish: 'metallic' },
                eyeliner: { style: 'cat-eye', thickness: 3 },
                blush: { color: '#CD5C5C', opacity: 0.7 }
            }
        }
    ];

    // Start camera
    const startCamera = async () => {
        setCameraError(null);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    frameRate: { ideal: 30, max: 30 },
                    facingMode: 'user'
                }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error('Camera access denied:', error);
            setCameraError('Permission missing. Click the lock icon in your URL bar to allow camera access.');
            setMode('idle');
        }
    };

    // Stop camera
    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
        }
    };

    // Analyze skin tone from current frame
    const analyzeSkin = async () => {
        setLoading(true);
        try {
            const source = mode === 'camera' ? videoRef.current : canvasRef.current;
            if (!source) throw new Error("No image source available");

            const result = await analyzeSkinTone(source);

            // --- BACKEND AI ANALYSIS ---
            info("Running advanced dermatological scan...");
            const base64Image = canvasRef.current.toDataURL('image/jpeg', 0.8);
            const cloudAnalysis = await analyzeSkinBackend({ image: base64Image });

            // Merge results
            setAnalysis({
                ...result,
                cloud: cloudAnalysis
            });
            setShowResults(true);
        } catch (error) {
            console.error('Analysis error:', error);
            toastError("Dermatological scan failed. Using local color match instead.");
        } finally {
            setLoading(false);
        }
    };

    // Handle file upload
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setMode('upload');
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = canvasRef.current;
                if (canvas) {
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    analyzeSkin();
                }
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    };

    // Apply AR filters (placeholder - would integrate with MediaPipe)
    const applyFilters = (landmarks) => {
        if (!canvasRef.current || !selectedFilter) return;

        const ctx = canvasRef.current.getContext('2d');
        const preset = filterPresets.find(f => f.id === selectedFilter);

        if (!preset) return;

        // Apply each filter in the preset
        if (preset.filters.lipstick) {
            applyARLipstick(ctx, landmarks, preset.filters.lipstick);
        }
        if (preset.filters.eyeshadow) {
            applyAREyeshadow(ctx, landmarks, preset.filters.eyeshadow);
        }
        if (preset.filters.blush) {
            applyARBlush(ctx, landmarks, preset.filters.blush);
        }
        if (preset.filters.eyeliner) {
            applyAREyeliner(ctx, landmarks, preset.filters.eyeliner);
        }
        if (preset.filters.highlighter) {
            applyARHighlighter(ctx, landmarks, preset.filters.highlighter);
        }
    };

    useEffect(() => {
        if (mode === 'camera') {
            startCamera();
        } else {
            stopCamera();
        }
        return () => stopCamera();
    }, [mode]);

    useEffect(() => {
        if (showResults) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            // Also ensure Lenis (smooth scroll) is paused if global accessible, but basic overflow hidden usually catches it.
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showResults]);

    return (
        <section className="py-20 bg-[#050505] relative overflow-hidden min-h-screen">
            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-3 gap-8 items-start">

                    {/* Left Column: Controls & Filters */}
                    <div className="lg:col-span-1 space-y-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gold text-[10px] font-bold uppercase tracking-widest mb-4">
                                <Sparkles size={12} />
                                Skin Intelligence
                            </div>
                            <h2 className="text-3xl font-serif text-white mb-2">
                                AI Beauty Analyzer
                            </h2>
                            <p className="text-white/40 text-sm leading-relaxed mb-6">
                                Advanced computer vision analyzes your unique skin metrics to create a hyper-personalized beauty profile.
                            </p>

                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={() => setMode('camera')}
                                    className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border flex items-center gap-2 ${mode === 'camera'
                                        ? 'bg-white text-black border-white'
                                        : 'bg-transparent text-white border-white/20 hover:border-white'
                                        }`}
                                >
                                    <Camera size={14} /> Live Cam
                                </button>
                                <button
                                    onClick={() => {
                                        setMode('upload');
                                        fileInputRef.current?.click();
                                    }}
                                    className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border flex items-center gap-2 ${mode === 'upload'
                                        ? 'bg-white text-black border-white'
                                        : 'bg-transparent text-white border-white/20 hover:border-white'
                                        }`}
                                >
                                    <Upload size={14} /> Upload
                                </button>
                            </div>
                        </div>

                        {/* Filter Presets Vertical List */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4 border-b border-white/10 pb-2">AR Filters</h3>
                            <div className="space-y-3">
                                {filterPresets.map(preset => (
                                    <button
                                        key={preset.id}
                                        onClick={() => setSelectedFilter(preset.id)}
                                        className={`w-full p-4 rounded-xl border transition-all flex items-center gap-4 group ${selectedFilter === preset.id
                                            ? 'bg-white/10 border-gold/50'
                                            : 'bg-transparent border-white/5 hover:bg-white/5 hover:border-white/20'
                                            }`}
                                    >
                                        <div className={`p-2 rounded-full ${selectedFilter === preset.id ? 'bg-gold text-black' : 'bg-white/5 text-white group-hover:bg-white/10'}`}>
                                            {preset.icon}
                                        </div>
                                        <div className="text-left">
                                            <div className={`text-sm font-medium ${selectedFilter === preset.id ? 'text-white' : 'text-white/70'}`}>{preset.name}</div>
                                            <div className="text-[10px] text-white/30 uppercase tracking-wider">Tap to apply</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Camera/Canvas Area */}
                    <div className="lg:col-span-2">
                        <div className="relative bg-black/40 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/3] backdrop-blur-sm group">

                            {/* Idle State - "Turn on Camera" */}
                            {mode === 'idle' && !cameraError && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0A0A0A]/80 z-30">
                                    <div className="p-8 rounded-full bg-white/5 mb-6 border border-white/10">
                                        <Camera size={48} className="text-white/20" />
                                    </div>
                                    <h3 className="text-white font-serif italic text-2xl mb-2">Ready to Visualize?</h3>
                                    <p className="text-white/40 text-sm mb-8 max-w-sm text-center">Enable your camera to experience our real-time AI beauty analysis engine.</p>
                                    <button
                                        onClick={() => setMode('camera')}
                                        className="px-10 py-4 bg-primary text-black rounded-full font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-glow"
                                    >
                                        Activate Mirror
                                    </button>
                                </div>
                            )}

                            {/* Error State */}
                            {cameraError && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0A0A0A]/90 z-30">
                                    <Info size={48} className="text-red-500 mb-6" />
                                    <h3 className="text-white font-bold uppercase tracking-widest mb-2">Access Denied</h3>
                                    <p className="text-white/40 text-sm max-w-md text-center mb-8">{cameraError}</p>
                                    <button
                                        onClick={() => setMode('camera')}
                                        className="px-8 py-3 border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all text-xs font-bold uppercase tracking-widest"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            )}

                            {/* Video Element */}
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                muted
                                className={`w-full h-full object-cover transition-opacity duration-700 ${mode === 'camera' ? 'opacity-100' : 'opacity-0 hidden'}`}
                            />

                            {/* Upload Canvas */}
                            <canvas
                                ref={canvasRef}
                                className={`w-full h-full object-contain ${mode === 'upload' ? 'block' : 'hidden'}`}
                            />

                            {/* Scanning Overlay Effect (Only when active) */}
                            {mode !== 'idle' && !cameraError && (
                                <div className="absolute inset-0 pointer-events-none bg-scan-line opacity-10" />
                            )}

                            {/* Overlay Controls */}
                            {mode !== 'idle' && !cameraError && (
                                <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 z-20">
                                    <button
                                        onClick={analyzeSkin}
                                        disabled={loading}
                                        className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-gold hover:text-black hover:border-gold transition-all shadow-glow hover:scale-105 disabled:opacity-50 flex items-center gap-3"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                                                Analyzing...
                                            </>
                                        ) : (
                                            <>
                                                <Palette size={16} />
                                                Analyze Skin Tone
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* AR Filter Presets */}
                        <div className="mt-12">
                            <h3 className="text-xl font-serif italic mb-6 text-center text-white">Try AR Filters</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {filterPresets.map(preset => (
                                    <button
                                        key={preset.id}
                                        onClick={() => setSelectedFilter(preset.id)}
                                        className={`p-6 rounded-2xl transition-all border group relative overflow-hidden ${selectedFilter === preset.id
                                            ? 'bg-gold/10 border-gold text-white shadow-[0_0_30px_rgba(245,230,200,0.1)]'
                                            : 'bg-white/5 border-white/5 text-white/60 hover:border-gold/30 hover:bg-white/10'
                                            }`}
                                    >
                                        <div className={`text-4xl mb-4 transition-transform duration-300 ${selectedFilter === preset.id ? 'scale-110' : 'group-hover:scale-110'}`}>{preset.icon}</div>
                                        <div className={`font-bold text-xs uppercase tracking-widest ${selectedFilter === preset.id ? 'text-gold' : 'text-white/80'}`}>{preset.name}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* End Right Column */}

                </div>
                {/* End Grid */}

                {/* Hidden file input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                />

                {/* Results Modal */}
                <AnimatePresence>
                    {showResults && analysis && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
                            onClick={() => setShowResults(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-[#0A0A0A] border border-white/10 rounded-[2rem] max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl"
                            >
                                {/* Header */}
                                <div className="bg-white/5 border-b border-white/5 p-8 text-white flex items-center justify-between sticky top-0 z-10 backdrop-blur-xl">
                                    <div>
                                        <h2 className="text-3xl font-serif italic mb-1 text-gradient-gold">Your Beauty Profile</h2>
                                        <p className="text-xs text-white/40 uppercase tracking-widest">Personalized AI Analysis</p>
                                    </div>
                                    <button
                                        onClick={() => setShowResults(false)}
                                        className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 hover:rotate-90 transition-all text-white/50 hover:text-white"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="p-8 space-y-8">
                                    {/* Skin Tone Analysis */}
                                    <div className="bg-white/5 rounded-3xl p-8 border border-white/5">
                                        <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-white">
                                            <Palette className="text-gold" size={20} />
                                            Skin Tone Analysis
                                        </h3>
                                        <div className="flex flex-col md:flex-row items-center gap-8">
                                            <div
                                                className="w-32 h-32 rounded-full shadow-[0_0_40px_rgba(0,0,0,0.5)] border-4 border-white/10 ring-4 ring-black/50"
                                                style={{ backgroundColor: analysis.skinColor.hex }}
                                            />
                                            <div className="text-center md:text-left">
                                                <p className="text-2xl font-serif italic mb-3 text-white">{analysis.description}</p>
                                                <div className="space-y-1">
                                                    <p className="text-sm text-white/60">
                                                        Undertone: <span className="font-bold capitalize text-gold">{analysis.undertone}</span>
                                                    </p>
                                                    <p className="text-sm text-white/60">
                                                        Hex Code: <span className="font-mono text-white/40 bg-white/5 px-2 py-0.5 rounded ml-2">{analysis.skinColor.hex}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Product Recommendations */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {Object.entries(analysis.recommendations).map(([category, products]) => (
                                            <div key={category} className="bg-white/5 border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-all">
                                                <h4 className="font-bold capitalize mb-6 text-gold text-lg border-b border-white/5 pb-2">
                                                    {category}
                                                </h4>
                                                <ul className="space-y-4">
                                                    {products.map((product, index) => (
                                                        <li key={index} className="text-sm text-white/70 flex items-start gap-3 group">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-gold/50 mt-1.5 group-hover:bg-gold transition-colors" />
                                                            {product}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA */}
                                    <div className="mt-8 text-center pb-4">
                                        <button
                                            onClick={() => setShowResults(false)}
                                            className="bg-[#F5E6C8] text-black px-12 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white transition-all shadow-glow hover:scale-105"
                                        >
                                            Try These Recommendations
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default AIBeautyAnalyzer;
