import { useState, useEffect, useRef } from 'react';
import {
    Camera, RefreshCw, Save, Share2, ArrowLeft, Maximize2,
    Sparkles, Download, Heart, Settings, Sliders, Image as ImageIcon,
    Video, X, ChevronRight, ChevronLeft, Zap, Info, ShieldCheck,
    Palette, Trash2, Undo, Redo, Monitor, Smartphone, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { initFaceDetection, detectFaceLandmarks, analyzeFaceGeometry } from '../../utils/faceDetection';
import FaceCanvas from './FaceCanvas';
import { getAllProducts, getBrands } from '../../data/makeupBrands';
import { PRESETS } from '../../data/presets';
import { captureLook, downloadImage } from '../../utils/capture';
import { saveLook, getAllLooks, deleteLook } from '../../utils/storage';
import { trackEvent, AnalyticsEvents } from '../../utils/analytics';
import { getCompatibleUserMedia } from '../../utils/browserCompat';

// ... (other imports)

const startCamera = async () => {
    setCameraError(null);
    try {
        const constraints = {
            video: {
                width: { ideal: 1920, min: 1280 },
                height: { ideal: 1080, min: 720 },
                facingMode: facingMode,
                frameRate: { ideal: 60, min: 30 }
            }
        };
        // Use compatible getUserMedia for Safari support
        const stream = await getCompatibleUserMedia(constraints);
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
            const track = stream.getVideoTracks()[0];
            const settings = track.getSettings();
            setCameraRes({ w: settings.width, h: settings.height });
            videoRef.current.play();
            setIsCameraActive(true);
            trackEvent('Virtual Try-On', AnalyticsEvents.VIRTUAL_TRY_ON.OPENED, 'HD Studio Camera');
        }
    } catch (err) {
        console.error(err);
        if (err.name === 'NotAllowedError') setCameraError("Camera blocked. Please enable browser permissions.");
        else setCameraError("Camera not detected or 1080p resolution not supported.");
    }
};
import { ReactCompareSlider, ReactCompareSliderHandle } from 'react-compare-slider';
import GlassCard from '../ui/GlassCard';
import { Canvas } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import { LipstickClassicGold as Lipstick, CompactVintageRound as Compact } from '../3d/BeautyItems';
import { EyeshadowPalette as PaletteIcon } from '../3d/BeautyItemsExtended';
import {
    LipstickHero,
    EyeshadowPaletteHero,
    BottleHero,
    EyelinerHero,
    MascaraHero,
    BeautyProductStage
} from '../3d/ProductArchitectures';
import Product3DPreview from './Product3DPreview';
import PresetGallery from './PresetGallery';
import PresetDetailModal from './PresetDetailModal';
import { useToast } from '../../context/ToastContext';

const MakeupStudio = () => {
    // Media & Hardware State
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const faceCanvasRef = useRef(null);
    const [detector, setDetector] = useState(null);
    const [faceData, setFaceData] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [fps, setFps] = useState(0);
    const [cameraRes, setCameraRes] = useState({ w: 0, h: 0 });
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [facingMode, setFacingMode] = useState("user");
    const [cameraError, setCameraError] = useState(null);
    const [showPrivacyNotice, setShowPrivacyNotice] = useState(true);
    const [show3DPreview, setShow3DPreview] = useState(false);
    const [selectedPreset, setSelectedPreset] = useState(null);

    // Studio UI State
    const [activeTab, setActiveTab] = useState("products");
    const [activeCategory, setActiveCategory] = useState("lips");
    const [activeProduct, setActiveProduct] = useState(null);
    const [isPanelOpen, setIsPanelOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [compareMode, setCompareMode] = useState(false);
    const [showMesh, setShowMesh] = useState(false);
    const [saving, setSaving] = useState(false);
    const [savedLooks, setSavedLooks] = useState([]);

    const { success, error, info } = useToast(); // Assuming ToastContext is available or will handle missing hook gracefully. Wait, imports don't show useToast. 
    // Checking imports... line 7 has icons. line 32 is empty. 
    // I need to import useToast if it's not there.
    // Previous view of file showed "import { useToast } from '../../context/ToastContext';" in the truncated part I replaced?
    // Step 3745 showed line 32: "import { useToast } from '../../context/ToastContext';" in my replacement, but the *restored* file (Step 3764) does NOT show it.
    // I need to add useToast import.

    // --- PERSISTENCE HOOKS ---
    useEffect(() => {
        const savedState = localStorage.getItem('radiance_makeup_state');
        if (savedState) {
            try {
                setMakeupState(JSON.parse(savedState));
            } catch (e) { console.error(e); }
        }
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            localStorage.setItem('radiance_makeup_state', JSON.stringify(makeupState));
        }, 500);
        return () => clearTimeout(timeout);
    }, [makeupState]);

    useEffect(() => {
        if (activeTab === 'bag') {
            getAllLooks().then(setSavedLooks);
        }
    }, [activeTab]);

    // Advanced Beauty Filters (B. Feed Enhancements)
    const [beautySettings, setBeautySettings] = useState({
        smoothing: 40,
        brightness: 110,
        contrast: 105,
        saturation: 100,
        lighting: 'daylight', // ring, warm, daylight
        vignette: 20
    });

    // Makeup State
    const [makeupState, setMakeupState] = useState({
        lips: { color: null, opacity: 0.7, finish: 'matte' },
        eyes: { color: null, opacity: 0.5 },
        blush: { color: null, opacity: 0.4 },
        face: { color: null, opacity: 0.0 },
    });

    // 1. Initialize AI Model
    useEffect(() => {
        initFaceDetection().then(det => {
            setDetector(det);
            setIsLoading(false);
        });
    }, []);

    // 2. Camera Logic (HD 1080p, Auto-Focus, FPS)
    const toggleCamera = async () => {
        if (isCameraActive) {
            stopCamera();
        } else {
            startCamera();
        }
    };

    const startCamera = async () => {
        setCameraError(null);
        try {
            const constraints = {
                video: {
                    width: { ideal: 1920, min: 1280 },
                    height: { ideal: 1080, min: 720 },
                    facingMode: facingMode,
                    frameRate: { ideal: 60, min: 30 }
                }
            };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                const track = stream.getVideoTracks()[0];
                const settings = track.getSettings();
                setCameraRes({ w: settings.width, h: settings.height });
                videoRef.current.play();
                setIsCameraActive(true);
                trackEvent('Virtual Try-On', AnalyticsEvents.VIRTUAL_TRY_ON.OPENED, 'HD Studio Camera');
            }
        } catch (err) {
            console.error(err);
            if (err.name === 'NotAllowedError') setCameraError("Camera blocked. Please enable browser permissions.");
            else setCameraError("Camera not detected or 1080p resolution not supported.");
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(t => t.stop());
            videoRef.current.srcObject = null;
        }
        setIsCameraActive(false);
        setFaceData(null);
        setAnalysis(null);
    };

    const switchCamera = () => {
        const nextMode = facingMode === "user" ? "environment" : "user";
        setFacingMode(nextMode);
        if (isCameraActive) {
            stopCamera();
            setTimeout(startCamera, 100);
        }
    };

    // 3. Detection & Auto-Centering Loop
    useEffect(() => {
        let animationId;
        let lastTime = 0;
        let frames = 0;

        const loop = async (now) => {
            if (detector && videoRef.current && isCameraActive && videoRef.current.readyState >= 2) {
                const faces = await detector.estimateFaces(videoRef.current);

                if (faces && faces.length > 0) {
                    if (faces.length > 1) {
                        setAnalysis({ status: "warning", message: "Only one face should be visible" });
                    } else {
                        const analytics = analyzeFaceGeometry(faces[0], videoRef.current.videoWidth, videoRef.current.videoHeight);
                        setAnalysis(analytics);
                        setFaceData(faces[0].keypoints);
                    }
                } else {
                    setFaceData(null);
                    setAnalysis({ status: "warning", message: "Face not detected" });
                }

                // FPS Calculation
                if (now - lastTime >= 1000) {
                    setFps(frames);
                    frames = 0;
                    lastTime = now;
                }
                frames++;
            }
            animationId = requestAnimationFrame(loop);
        };

        if (isCameraActive) loop(performance.now());
        return () => cancelAnimationFrame(animationId);
    }, [detector, isCameraActive]);

    // 4. Handlers
    const handlePresetSelect = (preset) => {
        const newState = {
            lips: { color: null, opacity: 0.7, finish: 'matte' },
            eyes: { color: null, opacity: 0.5 },
            blush: { color: null, opacity: 0.4 },
            face: { color: null, opacity: 0.0 },
        };

        Object.entries(preset.products).forEach(([cat, meta]) => {
            if (cat === 'lips') newState.lips = { color: meta.color, opacity: meta.opacity, finish: meta.finish || 'matte' };
            if (cat === 'eyes') newState.eyes = { color: meta.color, opacity: meta.opacity };
            if (cat === 'blush') newState.blush = { color: meta.color, opacity: meta.opacity };
            if (cat === 'foundation') newState.face = { color: meta.color, opacity: meta.opacity };
        });

        setMakeupState(newState);
        setActiveProduct(null);
        trackEvent('Virtual Try-On', AnalyticsEvents.VIRTUAL_TRY_ON.PRODUCT_SELECTED, `Preset: ${preset.name}`);
        if (!isCameraActive) startCamera();
    };

    const handleProductSelect = (product) => {
        setActiveProduct(product);
        const newState = { ...makeupState };
        if (product.category === 'lips') newState.lips = { color: product.hex, opacity: 0.7, finish: product.finish || 'satin' };
        else if (product.category === 'eyes') newState.eyes = { color: product.hex, opacity: 0.5 };
        else if (product.category === 'cheeks') newState.blush = { color: product.hex, opacity: 0.4 };
        else if (product.category === 'face') newState.face = { color: product.hex, opacity: 0.2 };
        setMakeupState(newState);
        trackEvent('Virtual Try-On', AnalyticsEvents.VIRTUAL_TRY_ON.PRODUCT_SELECTED, product.name);
    };

    const resetMakeup = () => {
        setMakeupState({
            lips: { color: null, opacity: 0.7, finish: 'matte' },
            eyes: { color: null, opacity: 0.5 },
            blush: { color: null, opacity: 0.4 },
            face: { color: null, opacity: 0.0 },
        });
    };

    // 5. Persistence Handlers
    const handleSaveLook = async () => {
        if (!faceCanvasRef.current || !videoRef.current) {
            // error("Camera not active"); // Need toast
            alert("Camera not active");
            return;
        }

        setSaving(true);
        try {
            const dataUrl = await captureLook(videoRef.current, faceCanvasRef.current);
            if (!dataUrl) throw new Error("Capture failed");

            const lookData = {
                image: dataUrl,
                makeup: makeupState,
                products: activeProduct ? [activeProduct] : [],
                date: new Date().toISOString()
            };

            await saveLook(lookData);
            // success("Look saved!");
            alert("Look saved to Bag!");

            if (activeTab === 'bag') {
                const refreshed = await getAllLooks();
                setSavedLooks(refreshed);
            }
            trackEvent('Virtual Try-On', AnalyticsEvents.VIRTUAL_TRY_ON.LOOK_SAVED, 'Look Saved to Bag');
        } catch (err) {
            console.error(err);
            alert("Failed to save look");
        } finally {
            setSaving(false);
        }
    };

    const handleLoadLook = (look) => {
        if (look.makeup) {
            setMakeupState(look.makeup);
        }
    };

    const handleDeleteLook = async (id, e) => {
        e.stopPropagation();
        if (window.confirm("Delete this saved look?")) {
            await deleteLook(id);
            setSavedLooks(prev => prev.filter(l => l.id !== id));
        }
    };

    // Style Helpers
    const videoFilters = {
        filter: `brightness(${beautySettings.brightness}%) contrast(${beautySettings.contrast}%) saturate(${beautySettings.saturation}%)`,
        transition: 'filter 0.3s ease'
    };

    return (
        <section className="relative h-screen bg-[#050505] text-white flex flex-col md:flex-row font-sans overflow-hidden">

            {/* --- MAIN CAMERA VIEWPORT (60% Desktop, 70% Mobile) --- */}
            <div className="relative flex-1 md:flex-[0.65] bg-neutral-900 border-r border-white/5 overflow-hidden flex items-center justify-center">

                {/* 1080p Video Feed */}
                {isCameraActive ? (
                    <div className="relative w-full h-full flex items-center justify-center bg-black">
                        <video
                            ref={videoRef}
                            className={`absolute w-full h-full object-cover ${facingMode === 'user' ? '-scale-x-100' : ''}`}
                            style={videoFilters}
                            playsInline muted autoFocus
                        />

                        {/* Virtual Makeup Overlay */}
                        {faceData && !compareMode && (
                            <div className={`absolute inset-0 pointer-events-none ${facingMode === 'user' ? '-scale-x-100' : ''}`}>
                                <FaceCanvas
                                    ref={faceCanvasRef}
                                    landmarks={faceData}
                                    videoRef={videoRef}
                                    activeMakeup={makeupState}
                                    beautySettings={beautySettings}
                                />
                            </div>
                        )}

                        {/* Split Comparison Mode (B. Advanced Features) */}
                        {compareMode && faceData && (
                            <div className="absolute inset-0 z-20">
                                <ReactCompareSlider
                                    itemOne={
                                        <div className="w-full h-full relative overflow-hidden">
                                            <video
                                                src={videoRef.current?.srcObject}
                                                className={`absolute w-full h-full object-cover ${facingMode === 'user' ? '-scale-x-100' : ''}`}
                                                style={videoFilters} autoPlay muted
                                            />
                                            <div className="absolute bottom-4 left-4 bg-black/40 px-3 py-1 rounded text-[10px] uppercase font-bold tracking-widest">Natural</div>
                                        </div>
                                    }
                                    itemTwo={
                                        <div className="w-full h-full relative overflow-hidden">
                                            <video
                                                src={videoRef.current?.srcObject}
                                                className={`absolute w-full h-full object-cover ${facingMode === 'user' ? '-scale-x-100' : ''}`}
                                                style={videoFilters} autoPlay muted
                                            />
                                            <div className={`absolute inset-0 pointer-events-none ${facingMode === 'user' ? '-scale-x-100' : ''}`}>
                                                <FaceCanvas landmarks={faceData} videoRef={videoRef} activeMakeup={makeupState} beautySettings={beautySettings} />
                                            </div>
                                            <div className="absolute bottom-4 right-4 bg-primary px-3 py-1 rounded text-[10px] uppercase font-bold tracking-widest">Enhanced</div>
                                        </div>
                                    }
                                />
                            </div>
                        )}

                        {/* Ring Light Overlay (Optional visualization) */}
                        {beautySettings.lighting === 'ring' && (
                            <div className="absolute inset-0 border-[60px] border-white/5 rounded-full pointer-events-none shadow-[inset_0_0_100px_rgba(255,255,255,0.1)]" />
                        )}
                    </div>
                ) : (
                    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/80 backdrop-blur-xl p-6 text-center">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md">
                            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/20">
                                <Monitor size={32} className="text-primary" />
                            </div>
                            <h2 className="text-3xl font-serif mb-2 italic">Luxury Mirror</h2>
                            <p className="text-white/40 mb-8 text-sm leading-relaxed">Local real-time processing at 1080p resolution. Your camera feed is private and never leaves your device.</p>

                            {cameraError ? (
                                <GlassCard className="p-4 bg-red-500/10 border-red-500/20 text-red-200 text-sm mb-6 flex items-center gap-3">
                                    <AlertCircle size={20} />
                                    <span>{cameraError}</span>
                                </GlassCard>
                            ) : null}

                            <div className="flex flex-col gap-3">
                                <button onClick={toggleCamera} className="bg-primary text-white py-4 px-10 rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-primary/80 transition-all shadow-glow">
                                    Activate HD Studio
                                </button>
                                <button className="text-white/50 text-xs hover:text-white transition-colors">Or Upload a Portrait</button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* --- UI OVERLAYS (Top/Bottom Bars) --- */}
                <AnimatePresence>
                    {isCameraActive && (
                        <>
                            {/* Top Stats & Camera Toggles */}
                            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="absolute top-0 left-0 right-0 p-5 flex justify-between items-center z-40">
                                <div className="flex items-center gap-4">
                                    <button onClick={() => window.history.back()} className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-xl border border-white/5 shadow-2xl">
                                        <ArrowLeft size={18} />
                                    </button>
                                    <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                                            <span className="text-[10px] font-bold tracking-widest text-white/70 uppercase">Live</span>
                                        </div>
                                        <span className="text-[10px] font-mono opacity-50">{fps} FPS • {cameraRes.w}p</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button onClick={switchCamera} className="p-3 bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-md border border-white/5 outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="Switch Camera Facing Mode" title="Switch Camera">
                                        <RefreshCw size={18} />
                                    </button>
                                    <button onClick={() => setCompareMode(!compareMode)} className={`p-3 rounded-full backdrop-blur-md border border-white/5 transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary ${compareMode ? 'bg-primary border-primary' : 'bg-black/40 hover:bg-black/60'}`} aria-label={compareMode ? "Disable Comparison View" : "Enable Comparison View"} aria-pressed={compareMode} title="Comparison View">
                                        <Video size={18} />
                                    </button>
                                    <button onClick={() => setShowMesh(!showMesh)} className={`p-3 rounded-full backdrop-blur-md border border-white/5 transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary ${showMesh ? 'bg-primary border-primary' : 'bg-black/40 hover:bg-black/60'}`} aria-label={showMesh ? "Hide Face Mesh Grid" : "Show Face Mesh Grid"} aria-pressed={showMesh} title="Symmetry Grid">
                                        <Monitor size={18} />
                                    </button>
                                </div>
                            </motion.div>

                            {/* Symmetry Grid Overlay (H. Advanced Features) */}
                            {showMesh && (
                                <div className="absolute inset-0 pointer-events-none z-10 opacity-30">
                                    <div className="w-full h-full grid grid-cols-6 grid-rows-6">
                                        {Array.from({ length: 36 }).map((_, i) => (
                                            <div key={i} className="border-[0.5px] border-white/20" />
                                        ))}
                                    </div>
                                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/50" />
                                    <div className="absolute top-1/2 left-0 right-0 h-px bg-primary/50" />
                                </div>
                            )}

                            {/* Analytics / Feedback Overlay */}
                            {analysis && analysis.status === 'warning' && (
                                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="absolute top-24 left-1/2 -translate-x-1/2 bg-gold/20 backdrop-blur-xl border border-gold/40 text-gold px-6 py-2 rounded-full text-xs font-bold shadow-2xl flex items-center gap-3 z-50">
                                    <AlertCircle size={14} /> {analysis.message}
                                </motion.div>
                            )}

                            {/* Bottom Capture Panel */}
                            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-8 z-40">
                                <button className="p-4 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-xl border border-white/5 group transition-all" title="View Gallery">
                                    <ImageIcon size={24} className="group-hover:scale-110 transition-transform" />
                                </button>
                                <button
                                    onClick={() => alert("Capturing 4K Portrait Style Lookup...")}
                                    className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-8 border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-110 active:scale-95 transition-all"
                                >
                                    <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center">
                                        <div className="w-12 h-12 border-2 border-white rounded-full opacity-20" />
                                    </div>
                                </button>
                                <button onClick={resetMakeup} className="p-4 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-xl border border-white/5 group transition-all" title="Clear All">
                                    <Trash2 size={24} className="group-hover:text-primary transition-colors" />
                                </button>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>

            {/* --- RIGHT PANEL: STUDIO CONTROLS (40% Desktop, Full Drawer Mobile) --- */}
            <motion.div
                initial={{ width: 450 }} animate={{ width: isPanelOpen ? 450 : 0 }}
                className="bg-white text-charcoal shadow-[-20px_0_40px_rgba(0,0,0,0.5)] z-50 flex flex-col relative h-full border-l border-gray-100"
            >
                {/* Panel Drag Handle (Desktop) */}
                <button
                    onClick={() => setIsPanelOpen(!isPanelOpen)}
                    className="absolute -left-10 top-1/2 -translate-y-1/2 w-10 h-24 bg-white border border-gray-100 rounded-l-3xl flex items-center justify-center shadow-2xl text-gray-400 hover:text-primary transition-colors"
                >
                    {isPanelOpen ? <ChevronRight /> : <ChevronLeft />}
                </button>

                {/* Tabs Navigation */}
                <div className="p-6 pb-2 border-b border-gray-100 flex justify-between items-center bg-gray-50/80 sticky top-0 z-10">
                    <div className="flex gap-2 p-1 bg-white rounded-xl border border-gray-100">
                        {['products', 'looks', 'beauty', 'bag'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all
                                    ${activeTab === tab ? 'bg-primary text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}
                                `}
                            >
                                {tab === 'bag' ? 'My Bag' : tab}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-1">
                        <button className="p-2 hover:bg-gray-200 rounded-lg text-gray-400"><Undo size={16} /></button>
                        <button className="p-2 hover:bg-gray-200 rounded-lg text-gray-400"><Redo size={16} /></button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                    {activeTab === 'bag' && (
                        <div className="space-y-6">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <Heart size={14} className="text-primary" /> Saved Looks
                            </h4>
                            {savedLooks.length === 0 ? (
                                <div className="text-center py-10 opacity-50">
                                    <ImageIcon size={32} className="mx-auto mb-2" />
                                    <p className="text-xs">No saved looks yet</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-4">
                                    {savedLooks.map(look => (
                                        <div key={look.id} className="relative group rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                                            <div className="aspect-[3/4] cursor-pointer" onClick={() => handleLoadLook(look)}>
                                                <img src={look.image} alt="Saved Look" className="w-full h-full object-cover" />
                                            </div>
                                            <button
                                                onClick={(e) => handleDeleteLook(look.id, e)}
                                                className="absolute top-2 right-2 p-1.5 bg-white/80 hover:bg-red-50 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <Trash2 size={12} />
                                            </button>
                                            <button
                                                onClick={() => downloadImage(look.image)}
                                                className="absolute bottom-2 right-2 p-1.5 bg-white/80 hover:bg-blue-50 text-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <Download size={12} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                    {/* Products View */}
                    {activeTab === 'products' && (
                        <div className="space-y-8">
                            {/* Categories Quick Nav */}
                            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                                {['lips', 'eyes', 'cheeks', 'face'].map(cat => (
                                    <button
                                        key={cat} onClick={() => setActiveCategory(cat)}
                                        className={`flex-none px-6 py-2 rounded-full border text-[10px] font-bold uppercase tracking-widest transition-all
                                            ${activeCategory === cat ? 'bg-charcoal text-white border-charcoal' : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'}
                                        `}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            {/* Product Grid */}
                            <div className="grid grid-cols-3 gap-4">
                                {getAllProducts().filter(p => p.category === activeCategory).map(product => (
                                    <motion.button
                                        whileHover={{ y: -5 }}
                                        onClick={() => {
                                            handleProductSelect(product);
                                            setShow3DPreview(true);
                                        }}
                                        key={product.id} className={`group relative aspect-[3/4] rounded-2xl overflow-hidden border-2 transition-all p-1
                                            ${activeProduct?.id === product.id ? 'border-primary bg-primary/5' : 'border-gray-50 bg-gray-50'}
                                        `}
                                    >
                                        <div className="h-full w-full rounded-xl overflow-hidden flex flex-col">
                                            <div className="flex-1 relative" style={{ background: product.hex }}>
                                                {product.finish === 'glossy' && <div className="w-full h-full bg-gradient-to-tr from-white/10 via-white/5 to-transparent" />}
                                                {product.finish === 'shimmer' && <div className="w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />}
                                                <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-md text-white text-[8px] px-1.5 py-0.5 rounded flex items-center gap-1">
                                                    <Maximize2 size={8} /> 3D
                                                </div>
                                            </div>
                                            <div className="p-2 bg-white flex flex-col gap-0.5">
                                                <p className="text-[9px] font-black uppercase text-gray-400 tracking-tighter">{product.brand}</p>
                                                <p className="text-[10px] font-bold text-gray-800 line-clamp-1">{product.name}</p>
                                            </div>
                                        </div>
                                        {activeProduct?.id === product.id && (
                                            <div className="absolute top-2 right-2 bg-primary text-white p-1 rounded-full shadow-lg">
                                                <Zap size={8} fill="currentColor" />
                                            </div>
                                        )}
                                    </motion.button>
                                ))}
                            </div>

                            {/* Intensity Slider (Sticky Bottom in category) */}
                            {activeProduct && (
                                <GlassCard className="p-5 mt-4 border-primary/20 bg-primary/5 sticky bottom-0">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full border-2 border-white shadow-xl" style={{ background: activeProduct.hex }} />
                                            <div>
                                                <h5 className="font-bold text-xs">{activeProduct.name}</h5>
                                                <p className="text-[10px] text-gray-400 uppercase tracking-widest">{activeProduct.finish} Intensity</p>
                                            </div>
                                        </div>
                                        <span className="text-xs font-bold text-primary">{Math.round((makeupState[activeCategory]?.opacity || 0) * 100)}%</span>
                                    </div>
                                    <input
                                        type="range" min="0" max="1" step="0.05"
                                        value={makeupState[activeCategory]?.opacity || 0}
                                        onChange={(e) => {
                                            const val = parseFloat(e.target.value);
                                            const newState = { ...makeupState };
                                            newState[activeCategory].opacity = val;
                                            setMakeupState(newState);
                                        }}
                                        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                </GlassCard>
                            )}
                        </div>
                    )}

                    {/* Presets / Looks View */}
                    {activeTab === 'looks' && (
                        <PresetGallery
                            presets={PRESETS}
                            onApply={handlePresetSelect}
                            onDetail={(preset) => setSelectedPreset(preset)}
                        />
                    )}

                    {/* Beauty Filters View (B. Feed Enhancements) */}
                    {activeTab === 'beauty' && (
                        <div className="space-y-8">
                            {/* Lighting Presets */}
                            <div>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Zap size={14} className="text-gold" /> Lighting Environment
                                </h4>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { id: 'natural', name: 'Natural', icon: Monitor },
                                        { id: 'studio', name: 'Ring Light', icon: Maximize2 },
                                        { id: 'warm', name: 'Golden Hour', icon: Sparkles }
                                    ].map(light => (
                                        <button
                                            key={light.id}
                                            onClick={() => setBeautySettings(p => ({ ...p, lighting: light.id }))}
                                            className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2
                                                ${beautySettings.lighting === light.id ? 'bg-gold/10 border-gold/50 text-gold shadow-lg' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'}
                                            `}
                                        >
                                            <light.icon size={20} />
                                            <span className="text-[9px] font-bold uppercase tracking-widest">{light.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Fine Fine Enhancements */}
                            <div className="space-y-6">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <Palette size={14} className="text-primary" /> Skin & Retouching
                                </h4>
                                {[
                                    { id: 'smoothing', label: 'Skin Smoothing', icon: Sparkles },
                                    { id: 'brightness', label: 'Brightness', icon: Monitor },
                                    { id: 'contrast', label: 'Contrast', icon: Sliders },
                                    { id: 'saturation', label: 'Saturation', icon: Palette }
                                ].map(setting => (
                                    <div key={setting.id} className="space-y-2">
                                        <div className="flex justify-between text-xs font-medium">
                                            <span>{setting.label}</span>
                                            <span className="font-mono text-[10px] text-gray-400">{beautySettings[setting.id]}%</span>
                                        </div>
                                        <input
                                            type="range" min={setting.id === 'brightness' || setting.id === 'contrast' ? "50" : "0"} max={setting.id === 'saturation' ? "200" : "150"}
                                            value={beautySettings[setting.id]}
                                            onChange={(e) => setBeautySettings(p => ({ ...p, [setting.id]: parseInt(e.target.value) }))}
                                            className="w-full h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Total Bar */}
                <div className="p-6 bg-gray-50 border-t border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />
                            ))}
                        </div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">3 Products Selected</p>
                    </div>
                    <button
                        onClick={handleSaveLook}
                        disabled={saving || !isCameraActive}
                        className="w-full bg-charcoal text-white py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs shadow-xl hover:bg-primary transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                    >
                        {saving ? "Saving..." : "Save Look to Bag"}
                    </button>
                </div>
            </motion.div>

            {/* 3D Product Architecture Preview Modal */}
            <AnimatePresence>
                {show3DPreview && activeProduct && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 md:p-12"
                    >
                        <div className="relative w-full max-w-5xl">
                            <button
                                onClick={() => setShow3DPreview(false)}
                                className="absolute -top-12 right-0 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md z-10"
                            >
                                <X size={24} />
                            </button>
                            <Product3DPreview product={activeProduct} />

                            {/* Detailed Info Card (C. Product Information Overlays) */}
                            <motion.div
                                initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                                className="absolute top-1/2 -right-12 -translate-y-1/2 translate-x-full hidden xl:block w-80"
                            >
                                <GlassCard className="p-8 text-white !bg-white/5 border-white/10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-charcoal font-black">{activeProduct.brand[0]}</div>
                                        <div>
                                            <h4 className="font-bold text-lg">{activeProduct.brand}</h4>
                                            <p className="text-[10px] text-white/40 uppercase tracking-widest">{activeProduct.type}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Description</p>
                                            <p className="text-xs text-white/70 leading-relaxed">{activeProduct.description}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Finish</p>
                                                <p className="text-xs font-bold capitalize">{activeProduct.finish}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Rating</p>
                                                <p className="text-xs font-bold text-gold">★ {activeProduct.rating.toFixed(1)}</p>
                                            </div>
                                        </div>
                                        <div className="pt-6 border-t border-white/5">
                                            <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">Key Ingredients</p>
                                            <div className="flex flex-wrap gap-2">
                                                {activeProduct.ingredients.map(ing => (
                                                    <span key={ing} className="px-2 py-1 bg-white/5 rounded text-[9px]">{ing}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <button className="w-full mt-8 py-4 bg-primary text-white rounded-xl font-bold uppercase tracking-widest text-xs shadow-glow">
                                        ADD TO BAG • {activeProduct.price} BDT
                                    </button>
                                </GlassCard>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Privacy Notice Overlay */}
            <AnimatePresence>
                {showPrivacyNotice && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md p-6"
                    >
                        <GlassCard className="max-w-md p-8 !bg-white/90 border-none shadow-3xl text-charcoal">
                            <div className="w-16 h-16 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
                                <ShieldCheck size={32} />
                            </div>
                            <h3 className="text-2xl font-serif mb-2 italic">Your Privacy Matters</h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-8">
                                To provide the virtual try-on experience, we need camera access.
                                <strong className="text-charcoal"> All video frames are processed locally inside your browser.</strong>
                                We never record, store, or upload your live camera feed to our servers.
                            </p>
                            <div className="flex gap-4">
                                <PinkButton onClick={() => setShowPrivacyNotice(false)} className="flex-1 py-4">I Understand</PinkButton>
                            </div>
                        </GlassCard>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Preset Detail Modal */}
            <AnimatePresence>
                {selectedPreset && (
                    <PresetDetailModal
                        preset={selectedPreset}
                        onClose={() => setSelectedPreset(null)}
                        onApply={handlePresetSelect}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

// Helper components & icons as needed
const PinkButton = ({ children, onClick, className, icon: Icon }) => (
    <button onClick={onClick} className={`bg-primary text-white font-bold uppercase tracking-widest text-[10px] rounded-full hover:bg-primary/80 transition-all shadow-glow flex items-center justify-center gap-2 ${className}`}>
        {Icon && <Icon size={14} />}
        {children}
    </button>
);

export default MakeupStudio;
