import { useState, useRef, useEffect, useMemo } from 'react';
import {
    Camera, Upload, RefreshCw, X, Check, Share2, Download,
    Sparkles, Search, Sliders, Heart, Info, ChevronRight,
    ChevronLeft, Maximize2, Move, ZoomIn, Palette, Scissors
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { initFaceDetection, detectFaceLandmarks, calculateFaceShape } from '../../utils/faceDetection';
import { hairstyles, hairColors, faceShapesData } from '../../data/hairstyles';
import GlassCard from '../ui/GlassCard';
import PinkButton from '../ui/PinkButton';
import HairOverlay from './HairOverlay';
import './HairStudio.css';

const HairstyleFinder = () => {
    // Mode & Interaction State
    const [mode, setMode] = useState('upload'); // 'upload', 'camera', 'studio'
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("Long");
    const [showComparison, setShowComparison] = useState(false);
    const [showFaceGuide, setShowFaceGuide] = useState(false);

    // Data State
    const [imageSrc, setImageSrc] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [selectedStyle, setSelectedStyle] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [favorites, setFavorites] = useState([]);

    // Transform State
    const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1, rotate: 0 });
    const [opacity, setOpacity] = useState(1);
    const [colorSettings, setColorSettings] = useState({ hue: 0, saturation: 1, brightness: 1 });

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const containerRef = useRef(null);
    const [detector, setDetector] = useState(null);

    useEffect(() => {
        initFaceDetection().then(setDetector);
        // Load favorites from local storage
        const saved = localStorage.getItem('radiance_fav_hair');
        if (saved) setFavorites(JSON.parse(saved));
    }, []);

    // --- CAMERA ACTIONS ---
    const startCamera = async () => {
        setIsCameraActive(true);
        setMode('camera');
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user', width: 1280, height: 720 }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }
        } catch (e) {
            console.error(e);
            alert("Camera access denied.");
            setMode('upload');
            setIsCameraActive(false);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(t => t.stop());
        }
        setIsCameraActive(false);
    };

    const capturePhoto = () => {
        if (!videoRef.current || !canvasRef.current) return;
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0);
        const img = canvas.toDataURL('image/png');
        setImageSrc(img);
        setMode('studio');
        stopCamera();
        processImage(img);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setImageSrc(ev.target.result);
                setMode('studio');
                processImage(ev.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const processImage = async (dataUrl) => {
        if (!detector) return;
        setIsAnalyzing(true);
        const img = new Image();
        img.src = dataUrl;
        img.onload = async () => {
            const faces = await detector.estimateFaces(img);
            if (faces.length > 0) {
                const face = faces[0];
                const shape = calculateFaceShape(face.keypoints);
                setAnalysis({
                    shape,
                    box: face.box,
                    keypoints: face.keypoints,
                    originalWidth: img.width,
                    originalHeight: img.height,
                    confidence: Math.round(face.score * 100) || 98
                });
                // Auto-select first recommended style
                const rec = hairstyles.find(h => h.faceShapes.includes(shape));
                if (rec) setSelectedStyle(rec);
            } else {
                alert("Face not detected. Try a better angle.");
                setMode('upload');
                setImageSrc(null);
            }
            setIsAnalyzing(false);
        };
    };

    // --- FILTERING & SEARCH ---
    const categories = ["Short", "Medium", "Long", "Bridal"];

    const filteredStyles = useMemo(() => {
        return hairstyles.filter(h => {
            const matchQuery = h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                h.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchCat = h.length.toLowerCase() === activeCategory.toLowerCase() ||
                (activeCategory === "Bridal" && h.tags.includes("wedding"));
            return matchQuery && matchCat;
        });
    }, [searchQuery, activeCategory]);

    const recommendedStyles = useMemo(() => {
        if (!analysis) return [];
        return hairstyles.filter(h => h.faceShapes.includes(analysis.shape)).slice(0, 6);
    }, [analysis]);

    // --- FAVORITES ---
    const toggleFavorite = (styleId) => {
        const newFavs = favorites.includes(styleId)
            ? favorites.filter(id => id !== styleId)
            : [...favorites, styleId];
        setFavorites(newFavs);
        localStorage.setItem('radiance_fav_hair', JSON.stringify(newFavs));
    };

    // --- EXPORT ---
    const handleDownload = () => {
        // Logic to combine canvas and overlay (simplified)
        alert("Preparing your makeover preview for download...");
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#F3E5F5] to-[#E1BEE7] animate-gradient-xy pt-24 pb-12 overflow-hidden font-sans relative">
            {/* Floating Hair Accessories (Decorative) */}
            <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5 }}
                className="absolute top-40 left-10 opacity-20 hidden lg:block"
            >
                <Scissors size={48} className="text-primary" />
            </motion.div>
            <motion.div
                animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 7, delay: 1 }}
                className="absolute bottom-40 right-10 opacity-20 hidden lg:block"
            >
                <Sparkles size={64} className="text-primary" />
            </motion.div>

            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] bg-purple-400/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 mb-4 bg-white/80 backdrop-blur-md px-5 py-2 rounded-full border border-primary/20 shadow-sm"
                    >
                        <Scissors className="w-4 h-4 text-primary" />
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Virtual Hair Studio</span>
                    </motion.div>
                    <h2 className="text-5xl md:text-7xl font-script text-[#2D2D2D] mb-4">Discover Your Glow</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Experience our AI-powered style consultation. Find the perfect cut that complements your unique facial features.
                    </p>
                </div>

                {/* Studio Interface */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* LEFT PANEL: Categories & Style Grid */}
                    <div className="lg:col-span-3 space-y-6">
                        <GlassCard className="p-4">
                            <div className="relative mb-6">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search styles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-gray-50/50 border border-gray-100 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ring-0 transition-all"
                                />
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border
                                            ${activeCategory === cat
                                                ? 'bg-primary text-white border-primary shadow-md transform scale-105'
                                                : 'bg-white text-gray-500 border-gray-100 hover:border-primary/30'}
                                        `}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Available Styles</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    {filteredStyles.map(style => (
                                        <motion.div
                                            key={style.id}
                                            whileHover={{ y: -5 }}
                                            onClick={() => setSelectedStyle(style)}
                                            className={`relative aspect-[3/4] rounded-xl cursor-pointer overflow-hidden border-2 group
                                                ${selectedStyle?.id === style.id ? 'border-primary ring-2 ring-primary/20' : 'border-transparent'}
                                            `}
                                        >
                                            <img
                                                src={`https://images.unsplash.com/photo-1595476108010-b4d1f8bc2b1f?auto=format&fit=crop&q=80&w=200`}
                                                alt={style.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                                            <div className="absolute bottom-2 left-2 right-2">
                                                <p className="text-[10px] font-bold text-white line-clamp-1">{style.name}</p>
                                                {style.trending && (
                                                    <span className="absolute top-2 left-2 trending-badge">Trending</span>
                                                )}
                                                <div className="flex items-center justify-between mt-1">
                                                    <span className="text-[8px] text-white/70 uppercase">{style.texture}</span>
                                                    {favorites.includes(style.id) && <Heart className="w-2.5 h-2.5 fill-primary text-primary" />}
                                                </div>
                                            </div>
                                            {style.maintenance === 'high' && (
                                                <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-sm p-1 rounded-full">
                                                    <Sparkles className="w-2 h-2 text-gold" />
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </GlassCard>
                    </div>

                    {/* CENTER PANEL: Interactive Canvas */}
                    <div className="lg:col-span-6 space-y-6">
                        <div className="relative group">
                            <GlassCard className="aspect-[4/5] md:aspect-[3/4] flex items-center justify-center overflow-hidden p-2 relative">
                                {!imageSrc && mode === 'upload' && (
                                    <div className="text-center p-12">
                                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Upload className="w-8 h-8 text-primary" />
                                        </div>
                                        <h4 className="text-xl font-bold mb-2">Upload Your Portrait</h4>
                                        <p className="text-sm text-gray-500 mb-8 max-w-xs mx-auto">Use a well-lit photo looking directly at the camera for best AI results.</p>

                                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                            <PinkButton onClick={startCamera} icon={Camera}>Open Camera</PinkButton>
                                            <button
                                                onClick={() => fileInputRef.current.click()}
                                                className="px-8 py-3 bg-white border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary/5 transition-all text-sm"
                                            >
                                                Select File
                                            </button>
                                        </div>
                                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
                                    </div>
                                )}

                                {mode === 'camera' && (
                                    <div className="w-full h-full relative rounded-2xl overflow-hidden bg-black">
                                        <video ref={videoRef} className="w-full h-full object-cover -scale-x-100" />
                                        <div className="absolute inset-0 border-[40px] border-black/40 pointer-events-none">
                                            <div className="w-full h-full border-2 border-white/50 border-dashed rounded-[50px] flex items-center justify-center">
                                                <div className="text-white/30 text-[10px] uppercase tracking-widest font-bold">Align face here</div>
                                            </div>
                                        </div>
                                        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-6">
                                            <button
                                                onClick={() => setMode('upload')}
                                                className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white"
                                            >
                                                <X className="w-6 h-6" />
                                            </button>
                                            <button
                                                onClick={capturePhoto}
                                                className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-4 border-primary"
                                            >
                                                <div className="w-12 h-12 bg-primary rounded-full" />
                                            </button>
                                            <button
                                                className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white"
                                            >
                                                <RefreshCw className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {imageSrc && (mode === 'studio') && (
                                    <div className="w-full h-full relative rounded-2xl overflow-hidden" ref={containerRef}>
                                        <img
                                            src={imageSrc}
                                            alt="Preview"
                                            className={`w-full h-full object-contain transition-all duration-500
                                                ${isAnalyzing ? 'blur-sm grayscale' : ''}
                                            `}
                                        />

                                        {/* AI Scanning Animation */}
                                        <AnimatePresence>
                                            {isAnalyzing && (
                                                <motion.div
                                                    initial={{ top: '0%' }}
                                                    animate={{ top: '100%' }}
                                                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                                    className="absolute left-0 right-0 h-1 bg-primary z-10 shadow-[0_0_20px_rgba(183,110,121,0.8)]"
                                                />
                                            )}
                                        </AnimatePresence>

                                        {/* Hairstyle Overlay */}
                                        <AnimatePresence>
                                            {analysis && selectedStyle && !isAnalyzing && (
                                                <HairOverlay
                                                    style={selectedStyle}
                                                    color={selectedColor}
                                                    analysis={analysis}
                                                    transform={transform}
                                                    opacity={opacity}
                                                    {...colorSettings}
                                                />
                                            )}
                                        </AnimatePresence>

                                        {/* UI Overlays */}
                                        <div className="absolute top-4 right-4 flex flex-col gap-3">
                                            <button
                                                onClick={() => { setImageSrc(null); setMode('upload'); setAnalysis(null); }}
                                                className="p-3 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full text-white transition-all shadow-xl"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => setShowFaceGuide(!showFaceGuide)}
                                                className={`p-3 backdrop-blur-md rounded-full transition-all shadow-xl
                                                    ${showFaceGuide ? 'bg-primary text-white' : 'bg-black/30 text-white hover:bg-black/50'}
                                                `}
                                            >
                                                <Maximize2 className="w-5 h-5" />
                                            </button>
                                        </div>

                                        {/* Bottom Control Bar */}
                                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 bg-white/90 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-2xl border border-white">
                                            <div className="flex items-center gap-2 pr-4 border-r border-gray-100">
                                                <button onClick={handleDownload} className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-all">
                                                    <Download className="w-5 h-5" />
                                                </button>
                                                <button className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-all">
                                                    <Share2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => toggleFavorite(selectedStyle?.id)}
                                                    className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-all"
                                                >
                                                    <Heart className={`w-5 h-5 ${favorites.includes(selectedStyle?.id) ? 'fill-primary' : ''}`} />
                                                </button>
                                                <button
                                                    className="px-4 py-2 bg-primary text-white text-[10px] font-bold rounded-lg shadow-lg hover:shadow-primary/30 active:scale-95 transition-all"
                                                    onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                                                >
                                                    BOOK APPOINTMENT
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <canvas ref={canvasRef} className="hidden" />
                            </GlassCard>

                            {/* FACE GUIDE OVERLAY */}
                            <AnimatePresence>
                                {showFaceGuide && analysis && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 50 }}
                                        className="absolute top-1/2 -right-64 -translate-y-1/2 w-60 z-50 pointer-events-auto"
                                    >
                                        <GlassCard className="p-5 !bg-primary text-white shadow-2xl border-none">
                                            <div className="flex items-center justify-between mb-4">
                                                <h5 className="font-bold text-[10px] tracking-widest uppercase">Facial Geometry</h5>
                                                <Check className="w-4 h-4" />
                                            </div>
                                            <div className="mb-4">
                                                <p className="text-3xl font-script capitalize">{analysis.shape}</p>
                                                <p className="text-[10px] opacity-70 mt-1">Confidence: {analysis.confidence}%</p>
                                            </div>
                                            <div className="space-y-3 pt-4 border-t border-white/20 text-xs leading-relaxed italic">
                                                {faceShapesData[analysis.shape]?.description}
                                            </div>
                                            <PinkButton
                                                className="w-full mt-6 !bg-white !text-primary py-2.5 text-[10px]"
                                                onClick={() => setShowFaceGuide(false)}
                                            >
                                                GOT IT
                                            </PinkButton>
                                        </GlassCard>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* RIGHT PANEL: Refinement Controls */}
                    <div className="lg:col-span-3 space-y-6">
                        {analysis ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                {/* Color Picker */}
                                <GlassCard className="p-5">
                                    <div className="flex items-center justify-between mb-6">
                                        <h5 className="font-bold text-gray-800 flex items-center gap-2">
                                            <Palette className="w-4 h-4 text-primary" /> Transform Color
                                        </h5>
                                        <button className="text-[10px] text-gray-400 font-bold hover:text-primary">RESET</button>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Categories of colors */}
                                        <div className="space-y-3">
                                            <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Select Tint</p>
                                            <div className="flex flex-wrap gap-2.5">
                                                {hairColors.map(c => (
                                                    <button
                                                        key={c.name}
                                                        onClick={() => setSelectedColor(c)}
                                                        className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 shadow-sm
                                                            ${selectedColor?.name === c.name ? 'border-primary ring-2 ring-primary/20 scale-110' : 'border-white'}
                                                        `}
                                                        style={{ background: c.hex }}
                                                        title={c.name}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-4 pt-4 border-t border-gray-100">
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase">
                                                    <span>Opacity</span>
                                                    <span>{Math.round(opacity * 100)}%</span>
                                                </div>
                                                <input
                                                    type="range" min="0" max="1" step="0.01"
                                                    value={opacity} onChange={(e) => setOpacity(parseFloat(e.target.value))}
                                                    className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase">
                                                    <span>Brightness</span>
                                                    <span>{Math.round(colorSettings.brightness * 100)}%</span>
                                                </div>
                                                <input
                                                    type="range" min="0" max="2" step="0.1"
                                                    value={colorSettings.brightness} onChange={(e) => setColorSettings(s => ({ ...s, brightness: parseFloat(e.target.value) }))}
                                                    className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </GlassCard>

                                {/* Fine-Tuning Controls */}
                                <GlassCard className="p-5">
                                    <h5 className="font-bold text-gray-800 flex items-center gap-2 mb-6">
                                        <Move className="w-4 h-4 text-primary" /> Adjustment Tools
                                    </h5>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase">Scale</label>
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => setTransform(p => ({ ...p, scale: p.scale - 0.05 }))} className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100"><X className="w-3 h-3 rotate-45" /></button>
                                                <span className="flex-1 text-center text-xs font-bold">{Math.round(transform.scale * 100)}%</span>
                                                <button onClick={() => setTransform(p => ({ ...p, scale: p.scale + 0.05 }))} className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100"><Maximize2 className="w-3 h-3" /></button>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase">Heigh-Pos</label>
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => setTransform(p => ({ ...p, y: p.y - 1 }))} className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100">↑</button>
                                                <span className="flex-1 text-center text-xs font-bold">{transform.y}</span>
                                                <button onClick={() => setTransform(p => ({ ...p, y: p.y + 1 }))} className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100">↓</button>
                                            </div>
                                        </div>
                                    </div>

                                    <PinkButton
                                        className="w-full mt-6 py-3 text-xs flex items-center justify-center gap-2"
                                        onClick={() => setTransform({ x: 0, y: 0, scale: 1, rotate: 0 })}
                                    >
                                        <RefreshCw className="w-3 h-3" /> RESET PLACEMENT
                                    </PinkButton>
                                </GlassCard>

                                {/* Recommendations based on Shape */}
                                <div className="space-y-3">
                                    <h5 className="font-bold text-gray-800 text-sm px-1">Best For Your Face</h5>
                                    <div className="grid grid-cols-3 gap-2">
                                        {recommendedStyles.map(style => (
                                            <div
                                                key={style.id}
                                                onClick={() => setSelectedStyle(style)}
                                                className="aspect-square rounded-lg bg-gray-100 overflow-hidden cursor-pointer hover:ring-2 ring-primary transition-all"
                                            >
                                                <img src={`https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100`} alt={style.name} className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-primary/20 rounded-3xl opacity-50">
                                <Info className="w-8 h-8 text-primary/40 mb-4" />
                                <p className="text-sm font-medium text-gray-400">Analysis pending portrait upload</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* AI Consultation Modal Simulation */}
            <div className="fixed bottom-6 right-6 z-50">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-16 h-16 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center border-4 border-white"
                >
                    <Sparkles className="w-8 h-8" />
                </motion.button>
            </div>
        </section>
    );
};

export default HairstyleFinder;
