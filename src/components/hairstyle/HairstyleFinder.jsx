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
import html2canvas from 'html2canvas';
import { getFromStorage, saveToStorage } from '../../utils/storage';

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
        const saved = getFromStorage('radiance_fav_hair');
        if (saved) setFavorites(saved);
    }, []);

    // --- CAMERA ACTIONS ---
    const startCamera = async () => {
        setIsCameraActive(true);
        setMode('camera');
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
        saveToStorage('radiance_fav_hair', newFavs);
    };



    // --- EXPORT ---
    const handleDownload = async () => {
        if (!containerRef.current) return;

        try {
            const canvas = await html2canvas(containerRef.current, {
                useCORS: true,
                scale: 2, // High res
                backgroundColor: null,
            });

            const link = document.createElement('a');
            link.download = `radiance-hairstyle-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (err) {
            console.error("Download failed:", err);
            alert("Could not save image. Please try again.");
        }
    };

    return (
        <section className="min-h-screen bg-[#050505] pt-24 pb-12 overflow-hidden font-sans relative selection:bg-gold/30 text-white">
            {/* Ambient Background Glow */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-gold/10 rounded-full blur-[150px] pointer-events-none" />

            {/* Floating Hair Accessories (Decorative) */}
            <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5 }}
                className="absolute top-40 left-10 opacity-10 hidden lg:block"
            >
                <Scissors size={48} className="text-white" />
            </motion.div>
            <motion.div
                animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 7, delay: 1 }}
                className="absolute bottom-40 right-10 opacity-10 hidden lg:block"
            >
                <Sparkles size={64} className="text-gold" />
            </motion.div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 mb-4 bg-white/5 backdrop-blur-md px-5 py-2 rounded-full border border-white/10 shadow-glow"
                    >
                        <Scissors className="w-4 h-4 text-gold" />
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">Virtual Hair Studio</span>
                    </motion.div>
                    <h2 className="text-5xl md:text-7xl font-serif italic text-white mb-4">Discover Your <span className="text-gradient-gold">New Look</span></h2>
                    <p className="text-white/40 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
                        Experience our AI-powered style consultation. Find the perfect cut that complements your unique facial features.
                    </p>
                </div>

                {/* Studio Interface */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* LEFT PANEL: Categories & Style Grid */}
                    <div className="lg:col-span-3 space-y-6">
                        <GlassCard className="p-4 !bg-white/5 !border-white/10 backdrop-blur-xl">
                            <div className="relative mb-6">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search styles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold/20 ring-0 transition-all placeholder:text-white/20"
                                />
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border
                                            ${activeCategory === cat
                                                ? 'bg-[#F5E6C8] text-black border-gold shadow-glow transform scale-105'
                                                : 'bg-white/5 text-white/40 border-white/10 hover:border-white/30 hover:text-white'}
                                        `}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-widest px-1">Available Styles</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    {filteredStyles.map(style => (
                                        <motion.div
                                            key={style.id}
                                            whileHover={{ y: -5 }}
                                            onClick={() => setSelectedStyle(style)}
                                            className={`relative aspect-[3/4] rounded-xl cursor-pointer overflow-hidden border group transition-all
                                                ${selectedStyle?.id === style.id ? 'border-gold ring-1 ring-gold/50 shadow-glow' : 'border-white/5 hover:border-white/20'}
                                            `}
                                        >
                                            <img
                                                src={`https://images.unsplash.com/photo-1595476108010-b4d1f8bc2b1f?auto=format&fit=crop&q=80&w=200`}
                                                alt={style.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:via-transparent transition-all" />
                                            <div className="absolute bottom-2 left-2 right-2">
                                                <p className="text-[10px] font-bold text-white line-clamp-1 group-hover:text-gold transition-colors">{style.name}</p>
                                                {style.trending && (
                                                    <span className="absolute top-2 left-2 bg-gold/90 text-black text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">Trending</span>
                                                )}
                                                <div className="flex items-center justify-between mt-1">
                                                    <span className="text-[8px] text-white/50 uppercase">{style.texture}</span>
                                                    {favorites.includes(style.id) && <Heart className="w-2.5 h-2.5 fill-gold text-gold" />}
                                                </div>
                                            </div>
                                            {style.maintenance === 'high' && (
                                                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/10">
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
                            <GlassCard className="aspect-[4/5] md:aspect-[3/4] flex items-center justify-center overflow-hidden p-2 relative !bg-white/5 !border-white/10 backdrop-blur-xl transition-all duration-700">
                                {!imageSrc && mode === 'upload' && (
                                    <div className="text-center p-12">
                                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-glow animate-pulse">
                                            <Upload className="w-8 h-8 text-white/50" />
                                        </div>
                                        <h4 className="text-2xl font-serif italic text-white mb-2">Upload Portrait</h4>
                                        <p className="text-sm text-white/40 mb-8 max-w-xs mx-auto tracking-wide">Use a well-lit photo looking directly at the camera for best AI results.</p>

                                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                            <button
                                                onClick={startCamera}
                                                className="px-8 py-3 bg-[#F5E6C8] text-black font-bold rounded-xl hover:bg-white transition-all text-xs uppercase tracking-widest shadow-glow flex items-center gap-2"
                                            >
                                                <Camera className="w-4 h-4" /> Open Camera
                                            </button>
                                            <button
                                                onClick={() => fileInputRef.current.click()}
                                                className="px-8 py-3 bg-transparent border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-all text-xs uppercase tracking-widest"
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
                                        <div className="absolute inset-0 border-[40px] border-black/60 pointer-events-none">
                                            <div className="w-full h-full border-2 border-white/30 border-dashed rounded-[50px] flex items-center justify-center">
                                                <div className="text-white/50 text-[10px] uppercase tracking-widest font-bold bg-black/50 px-2 py-1 rounded">Align face here</div>
                                            </div>
                                        </div>
                                        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-6">
                                            <button
                                                onClick={() => setMode('upload')}
                                                className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white/70 hover:text-white border border-white/10"
                                            >
                                                <X className="w-6 h-6" />
                                            </button>
                                            <button
                                                onClick={capturePhoto}
                                                className="w-16 h-16 bg-[#F5E6C8]/20 rounded-full flex items-center justify-center border-4 border-[#F5E6C8]"
                                            >
                                                <div className="w-12 h-12 bg-[#F5E6C8] rounded-full" />
                                            </button>
                                            <button
                                                className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white/70 hover:text-white border border-white/10"
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
                                                    className="absolute left-0 right-0 h-1 bg-gold z-10 shadow-[0_0_20px_rgba(245,230,200,0.8)]"
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
                                                className="p-3 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white transition-all shadow-xl border border-white/10"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => setShowFaceGuide(!showFaceGuide)}
                                                className={`p-3 backdrop-blur-md rounded-full transition-all shadow-xl border border-white/10
                                                    ${showFaceGuide ? 'bg-[#F5E6C8] text-black' : 'bg-black/40 text-white hover:bg-black/60'}
                                                `}
                                            >
                                                <Maximize2 className="w-5 h-5" />
                                            </button>
                                        </div>

                                        {/* Bottom Control Bar */}
                                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 bg-black/60 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-2xl border border-white/10 items-center">
                                            <div className="flex items-center gap-2 pr-4 border-r border-white/10">
                                                <button onClick={handleDownload} className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-all">
                                                    <Download className="w-5 h-5" />
                                                </button>
                                                <button className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-all">
                                                    <Share2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => toggleFavorite(selectedStyle?.id)}
                                                    className="p-2 hover:bg-white/10 rounded-lg text-white/60 transition-all hover:text-gold"
                                                >
                                                    <Heart className={`w-5 h-5 ${favorites.includes(selectedStyle?.id) ? 'fill-gold text-gold' : ''}`} />
                                                </button>
                                                <button
                                                    className="px-6 py-2 bg-[#F5E6C8] text-black text-[10px] uppercase font-bold tracking-widest rounded-lg shadow-glow hover:bg-white active:scale-95 transition-all"
                                                    onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                                                >
                                                    Book Appointment
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
                                        <GlassCard className="p-5 !bg-[#F5E6C8] text-black shadow-2xl border-none">
                                            <div className="flex items-center justify-between mb-4">
                                                <h5 className="font-bold text-[10px] tracking-widest uppercase">Facial Geometry</h5>
                                                <Check className="w-4 h-4" />
                                            </div>
                                            <div className="mb-4">
                                                <p className="text-3xl font-serif capitalize italic">{analysis.shape}</p>
                                                <p className="text-[10px] opacity-70 mt-1">Confidence: {analysis.confidence}%</p>
                                            </div>
                                            <div className="space-y-3 pt-4 border-t border-black/10 text-xs leading-relaxed italic opacity-80">
                                                {faceShapesData[analysis.shape]?.description}
                                            </div>
                                            <button
                                                className="w-full mt-6 bg-black text-white py-2.5 text-[10px] uppercase font-bold tracking-widest rounded-lg"
                                                onClick={() => setShowFaceGuide(false)}
                                            >
                                                GOT IT
                                            </button>
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
                                <GlassCard className="p-5 !bg-white/5 !border-white/10 backdrop-blur-xl">
                                    <div className="flex items-center justify-between mb-6">
                                        <h5 className="font-bold text-white flex items-center gap-2 text-xs uppercase tracking-wider">
                                            <Palette className="w-4 h-4 text-gold" /> Transform Color
                                        </h5>
                                        <button className="text-[10px] text-white/40 font-bold hover:text-white transition-colors">RESET</button>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Categories of colors */}
                                        <div className="space-y-3">
                                            <p className="text-[10px] font-bold text-white/30 tracking-widest uppercase">Select Tint</p>
                                            <div className="flex flex-wrap gap-2.5">
                                                {hairColors.map(c => (
                                                    <button
                                                        key={c.name}
                                                        onClick={() => setSelectedColor(c)}
                                                        className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 shadow-sm relative
                                                            ${selectedColor?.name === c.name ? 'border-gold ring-2 ring-gold/20 scale-110' : 'border-white/20'}
                                                        `}
                                                        style={{ background: c.hex }}
                                                        title={c.name}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-4 pt-4 border-t border-white/10">
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-[10px] font-bold text-white/50 uppercase">
                                                    <span>Opacity</span>
                                                    <span className="text-white">{Math.round(opacity * 100)}%</span>
                                                </div>
                                                <input
                                                    type="range" min="0" max="1" step="0.01"
                                                    value={opacity} onChange={(e) => setOpacity(parseFloat(e.target.value))}
                                                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-[10px] font-bold text-white/50 uppercase">
                                                    <span>Brightness</span>
                                                    <span className="text-white">{Math.round(colorSettings.brightness * 100)}%</span>
                                                </div>
                                                <input
                                                    type="range" min="0" max="2" step="0.1"
                                                    value={colorSettings.brightness} onChange={(e) => setColorSettings(s => ({ ...s, brightness: parseFloat(e.target.value) }))}
                                                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </GlassCard>

                                {/* Fine-Tuning Controls */}
                                <GlassCard className="p-5 !bg-white/5 !border-white/10 backdrop-blur-xl">
                                    <h5 className="font-bold text-white flex items-center gap-2 mb-6 text-xs uppercase tracking-wider">
                                        <Move className="w-4 h-4 text-gold" /> Adjustment Tools
                                    </h5>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-white/30 uppercase">Scale</label>
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => setTransform(p => ({ ...p, scale: p.scale - 0.05 }))} className="p-2 bg-white/5 rounded-lg hover:bg-white/20 text-white"><X className="w-3 h-3 rotate-45" /></button>
                                                <span className="flex-1 text-center text-xs font-bold text-white">{Math.round(transform.scale * 100)}%</span>
                                                <button onClick={() => setTransform(p => ({ ...p, scale: p.scale + 0.05 }))} className="p-2 bg-white/5 rounded-lg hover:bg-white/20 text-white"><Maximize2 className="w-3 h-3" /></button>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-white/30 uppercase">Heigh-Pos</label>
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => setTransform(p => ({ ...p, y: p.y - 1 }))} className="p-2 bg-white/5 rounded-lg hover:bg-white/20 text-white">↑</button>
                                                <span className="flex-1 text-center text-xs font-bold text-white">{transform.y}</span>
                                                <button onClick={() => setTransform(p => ({ ...p, y: p.y + 1 }))} className="p-2 bg-white/5 rounded-lg hover:bg-white/20 text-white">↓</button>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        className="w-full mt-6 py-3 text-xs flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-all font-bold uppercase tracking-widest"
                                        onClick={() => setTransform({ x: 0, y: 0, scale: 1, rotate: 0 })}
                                    >
                                        <RefreshCw className="w-3 h-3" /> RESET PLACEMENT
                                    </button>
                                </GlassCard>

                                {/* Recommendations based on Shape */}
                                <div className="space-y-3">
                                    <h5 className="font-bold text-white/50 text-xs px-1 uppercase tracking-widest">Best For Your Face</h5>
                                    <div className="grid grid-cols-3 gap-2">
                                        {recommendedStyles.map(style => (
                                            <div
                                                key={style.id}
                                                onClick={() => setSelectedStyle(style)}
                                                className="aspect-square rounded-lg bg-white/5 overflow-hidden cursor-pointer hover:ring-2 ring-gold transition-all border border-white/5"
                                            >
                                                <img src={`https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100`} alt={style.name} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Shop Recommendations (Phase 4 Integration) */}
                                {selectedStyle && (
                                    <GlassCard className="p-4 !bg-gradient-to-r !from-gold/5 !to-black !border-gold/20">
                                        <div className="flex items-center justify-between mb-3">
                                            <h5 className="font-bold text-white text-xs flex items-center gap-2">
                                                <Sparkles className="w-3 h-3 text-gold" /> Style Essentials
                                            </h5>
                                            <button className="text-[10px] text-gold font-bold hover:underline">SHOP ALL</button>
                                        </div>
                                        <div className="flex gap-3">
                                            {selectedStyle.maintenance === 'high' ? (
                                                // High maintenance -> Treatment
                                                <div className="flex-1 bg-white/5 rounded-lg p-2 flex gap-2 items-center shadow-sm hover:bg-white/10 transition-all cursor-pointer border border-white/5">
                                                    <img src="https://images.unsplash.com/photo-1527799822340-4107127bcfb9?q=80&w=100" className="w-10 h-10 object-cover rounded-md" alt="Treatment" />
                                                    <div>
                                                        <p className="text-[10px] font-bold line-clamp-1 text-white">Intensive Repair</p>
                                                        <p className="text-[9px] text-white/50">$32.00</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                // Low maintenance -> Accecories
                                                <div className="flex-1 bg-white/5 rounded-lg p-2 flex gap-2 items-center shadow-sm hover:bg-white/10 transition-all cursor-pointer border border-white/5">
                                                    <img src="https://images.unsplash.com/photo-1610444583737-231697316710?q=80&w=100" className="w-10 h-10 object-cover rounded-md" alt="Scrunchies" />
                                                    <div>
                                                        <p className="text-[10px] font-bold line-clamp-1 text-white">Silk Scrunchies</p>
                                                        <p className="text-[9px] text-white/50">$12.00</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </GlassCard>
                                )}
                            </motion.div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-white/10 rounded-3xl opacity-50">
                                <Info className="w-8 h-8 text-white/20 mb-4" />
                                <p className="text-sm font-medium text-white/40">Analysis pending portrait upload</p>
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
