import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, Sparkles, Palette, Download, Info, X } from 'lucide-react';
import { analyzeSkinTone } from '../utils/skinToneAnalysis';
import {
    applyARLipstick,
    applyAREyeshadow,
    applyARBlush,
    applyAREyeliner,
    applyARHighlighter,
    analyzeFaceShape
} from '../utils/arFilters';

const AIBeautyAnalyzer = () => {
    const [mode, setMode] = useState('camera'); // 'camera' or 'upload'
    const [analysis, setAnalysis] = useState(null);
    const [faceShape, setFaceShape] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(null);

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);

    // AR Filter presets
    const filterPresets = [
        {
            id: 'natural',
            name: 'Natural Glow',
            icon: '✨',
            filters: {
                lipstick: { color: '#FFB6C1', opacity: 0.5, finish: 'satin' },
                blush: { color: '#FFB6C1', opacity: 0.4 },
                highlighter: { intensity: 'subtle' }
            }
        },
        {
            id: 'glam',
            name: 'Glamorous',
            icon: '💄',
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
            icon: '🌸',
            filters: {
                lipstick: { color: '#FFB6C1', opacity: 0.6, finish: 'matte' },
                eyeshadow: { color: '#DDA0DD', opacity: 0.5, finish: 'matte' },
                blush: { color: '#FFB6C1', opacity: 0.5 }
            }
        },
        {
            id: 'bold',
            name: 'Bold & Fierce',
            icon: '🔥',
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
            alert('Please allow camera access to use this feature');
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
            const result = await analyzeSkinTone(source);
            setAnalysis(result);
            setShowResults(true);
        } catch (error) {
            console.error('Analysis error:', error);
            alert(error.message || 'Failed to analyze skin tone');
        } finally {
            setLoading(false);
        }
    };

    // Handle file upload
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                analyzeSkin();
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
        }
        return () => stopCamera();
    }, [mode]);

    return (
        <section className="py-20 bg-gradient-to-b from-white to-pearl">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-6 py-2 bg-gradient-to-r from-primary to-accent rounded-full shadow-lg mb-6"
                    >
                        <span className="text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                            <Sparkles size={14} fill="currentColor" />
                            AI Beauty Analyzer
                        </span>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-serif italic mb-4">
                        Discover Your Perfect Colors
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Our AI analyzes your skin tone and face shape to recommend the perfect makeup shades and techniques just for you
                    </p>
                </div>

                {/* Mode Selector */}
                <div className="flex justify-center gap-4 mb-8">
                    <button
                        onClick={() => setMode('camera')}
                        className={`px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm transition-all flex items-center gap-2 ${mode === 'camera'
                            ? 'bg-primary text-white shadow-lg'
                            : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <Camera size={18} />
                        Use Camera
                    </button>
                    <button
                        onClick={() => {
                            setMode('upload');
                            fileInputRef.current?.click();
                        }}
                        className={`px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm transition-all flex items-center gap-2 ${mode === 'upload'
                            ? 'bg-primary text-white shadow-lg'
                            : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <Upload size={18} />
                        Upload Photo
                    </button>
                </div>

                {/* Camera/Canvas Area */}
                <div className="max-w-4xl mx-auto">
                    <div className="relative bg-charcoal rounded-3xl overflow-hidden shadow-2xl aspect-video">
                        {mode === 'camera' ? (
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                muted
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <canvas
                                ref={canvasRef}
                                className="w-full h-full object-contain"
                            />
                        )}

                        {/* Overlay Controls */}
                        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4">
                            <button
                                onClick={analyzeSkin}
                                disabled={loading}
                                className="bg-white text-primary px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-pearl transition-all shadow-2xl hover:scale-105 disabled:opacity-50 flex items-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <Palette size={18} />
                                        Analyze Skin Tone
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* AR Filter Presets */}
                    <div className="mt-8">
                        <h3 className="text-xl font-bold mb-4 text-center">Try AR Filters</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {filterPresets.map(preset => (
                                <button
                                    key={preset.id}
                                    onClick={() => setSelectedFilter(preset.id)}
                                    className={`p-4 rounded-2xl transition-all ${selectedFilter === preset.id
                                        ? 'bg-primary text-white shadow-lg scale-105'
                                        : 'bg-white hover:bg-gray-50 shadow'
                                        }`}
                                >
                                    <div className="text-3xl mb-2">{preset.icon}</div>
                                    <div className="font-bold text-sm">{preset.name}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

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
                            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4"
                            onClick={() => setShowResults(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                            >
                                {/* Header */}
                                <div className="bg-gradient-to-r from-primary to-accent p-6 text-white flex items-center justify-between sticky top-0 z-10">
                                    <div>
                                        <h2 className="text-2xl font-serif italic mb-1">Your Beauty Profile</h2>
                                        <p className="text-xs text-white/70">Personalized AI Analysis</p>
                                    </div>
                                    <button
                                        onClick={() => setShowResults(false)}
                                        className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="p-8">
                                    {/* Skin Tone Analysis */}
                                    <div className="mb-8">
                                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                            <Palette className="text-primary" size={24} />
                                            Skin Tone Analysis
                                        </h3>
                                        <div className="bg-pearl rounded-2xl p-6">
                                            <div className="flex items-center gap-6 mb-4">
                                                <div
                                                    className="w-24 h-24 rounded-full shadow-lg border-4 border-white"
                                                    style={{ backgroundColor: analysis.skinColor.hex }}
                                                />
                                                <div>
                                                    <p className="text-lg font-bold mb-2">{analysis.description}</p>
                                                    <p className="text-sm text-gray-600">
                                                        Undertone: <span className="font-bold capitalize">{analysis.undertone}</span>
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        Hex: <span className="font-mono">{analysis.skinColor.hex}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Product Recommendations */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {Object.entries(analysis.recommendations).map(([category, products]) => (
                                            <div key={category} className="bg-white rounded-2xl p-6 shadow-lg">
                                                <h4 className="font-bold capitalize mb-3 text-primary">
                                                    {category}
                                                </h4>
                                                <ul className="space-y-2">
                                                    {products.map((product, index) => (
                                                        <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                                                            <span className="text-primary">•</span>
                                                            {product}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA */}
                                    <div className="mt-8 text-center">
                                        <button
                                            onClick={() => setShowResults(false)}
                                            className="bg-primary text-white px-12 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-accent transition-all shadow-2xl hover:scale-105"
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
