
import { useState, useEffect, useRef } from 'react';
import { Camera, RefreshCw, Save, Share2, ArrowLeft, Maximize2, Sparkles, Download, Heart, Settings, Sliders, Image as ImageIcon, Video, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { initFaceDetection, detectFaceLandmarks } from '../../utils/faceDetection';
import FaceCanvas from './FaceCanvas';
import { getAllProducts, getBrands } from '../../data/makeupBrands';
import { PRESETS } from '../../data/presets';
import { captureLook, downloadImage } from '../../utils/capture';
import { saveLook } from '../../utils/storage';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactCompareSlider, ReactCompareSliderHandle } from 'react-compare-slider';
import GlassCard from '../ui/GlassCard';

const MakeupStudio = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [detector, setDetector] = useState(null);
    const [faceData, setFaceData] = useState(null);
    const [fps, setFps] = useState(0);

    // UI State
    const [activeTab, setActiveTab] = useState("products");
    const [activeCategory, setActiveCategory] = useState("lips");
    const [activeProduct, setActiveProduct] = useState(null);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [isPanelOpen, setIsPanelOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState("all");
    const [compareMode, setCompareMode] = useState(false);
    const [saving, setSaving] = useState(false);

    // Beauty Filters State
    const [beautySettings, setBeautySettings] = useState({
        smoothing: 30, // 0-100
        brightness: 100, // 50-150
        contrast: 100, // 50-150
        saturation: 100, // 0-200
        lighting: 'natural' // natural, studio, warm
    });

    // Makeup State
    const [makeupState, setMakeupState] = useState({
        lips: { color: null, opacity: 0.6, finish: 'matte' },
        eyes: { color: null, opacity: 0.4 },
        blush: { color: null, opacity: 0.3 },
        face: { color: null, opacity: 0.0 },
    });

    // 1. Initialize AI Model
    useEffect(() => {
        const loadModel = async () => {
            const det = await initFaceDetection();
            setDetector(det);
            setIsLoading(false);
        };
        loadModel();
    }, []);

    // Camera Start/Stop Logic (HD 1080p)
    const toggleCamera = async () => {
        if (isCameraActive) {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
                videoRef.current.srcObject = null;
            }
            setIsCameraActive(false);
        } else {
            try {
                // Request 1080p or highest available
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: { ideal: 1920 },
                        height: { ideal: 1080 },
                        facingMode: "user",
                        aspectRatio: { ideal: 1.777 } // 16:9
                    }
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.onloadedmetadata = () => {
                        videoRef.current.play();
                    };
                }
                setIsCameraActive(true);
            } catch (err) {
                console.error("Camera Error:", err);
                alert("Unable to access camera or 1080p resolution not supported. Please check permissions.");
            }
        }
    };

    // Cleanup
    useEffect(() => {
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    // 2. Detection Loop with FPS Counter
    useEffect(() => {
        let animationId;
        let lastFrameTime = 0;
        let frameCount = 0;

        const loop = async (timestamp) => {
            if (detector && videoRef.current && isCameraActive && !videoRef.current.paused && !videoRef.current.ended) {
                // Determine face data
                const face = await detectFaceLandmarks(videoRef.current);
                setFaceData(face ? face.keypoints : null);

                // Calculate FPS
                if (timestamp - lastFrameTime >= 1000) {
                    setFps(frameCount);
                    frameCount = 0;
                    lastFrameTime = timestamp;
                }
                frameCount++;
            }
            animationId = requestAnimationFrame(loop);
        };

        if (detector && isCameraActive) {
            loop(0);
        }

        return () => cancelAnimationFrame(animationId);
    }, [detector, isCameraActive]);

    // 3. Handlers
    const handleProductSelect = (product) => {
        setActiveProduct(product);
        const newState = { ...makeupState };

        if (product.category === 'lips' || product.type === 'lipstick' || product.type === 'liquid_lipstick') {
            newState.lips = {
                color: product.hex,
                opacity: product.opacity || 0.7,
                finish: product.finish || 'matte',
                texture: product.texture
            };
        } else if (product.category === 'eyes' || product.type === 'eyeshadow' || product.type === 'eyeliner') {
            newState.eyes = {
                color: product.hex,
                opacity: product.opacity || 0.5,
                finish: product.finish,
                category: product.category === 'eyes' ? (product.type || 'eyeshadow') : 'eyeliner'
            };
        } else if (product.category === 'cheeks' || product.category === 'blush') {
            newState.blush = {
                color: product.hex,
                opacity: product.opacity || 0.4
            };
        } else if (product.category === 'face' || product.type === 'foundation') {
            newState.face = {
                color: product.hex,
                opacity: product.opacity || 0.2
            };
        }

        setMakeupState(newState);
    };

    const handlePresetSelect = (preset) => {
        const newState = { ...makeupState };
        const all = getAllProducts();

        Object.entries(preset.products).forEach(([cat, meta]) => {
            const product = all.find(p => p.id === meta.id);
            if (product) {
                if (cat === 'lips') newState.lips = { color: product.hex, opacity: meta.opacity, finish: product.finish, texture: product.texture };
                if (cat === 'eyes') newState.eyes = { color: product.hex, opacity: meta.opacity, finish: product.finish, category: 'eyeshadow' };
                if (cat === 'blush') newState.blush = { color: product.hex, opacity: meta.opacity };
                if (cat === 'foundation') newState.face = { color: product.hex, opacity: meta.opacity };
            }
        });
        setMakeupState(newState);
        setActiveProduct(null);
    };

    const handleSaveLook = async () => {
        setSaving(true);
        const canvasEl = document.querySelector('canvas');
        const imgData = await captureLook(videoRef.current, canvasEl);

        if (imgData) {
            await saveLook({
                name: `Look ${new Date().toLocaleTimeString()}`,
                image: imgData,
                products: makeupState
            });
            downloadImage(imgData, 'radiance-look.png');
            alert("Look saved to Gallery!");
        }
        setSaving(false);
    };

    const brands = getBrands();
    const allProducts = getAllProducts();
    const filteredProducts = activeFilter === 'all'
        ? allProducts
        : activeFilter === 'international'
            ? brands.international.flatMap(b => b.products)
            : brands.local.flatMap(b => b.products);

    const displayProducts = filteredProducts.filter(p => p.category === activeCategory || (activeCategory === 'face' && p.category === 'face'));

    // Video Filter Styles
    const videoStyle = {
        filter: `brightness(${beautySettings.brightness}%) contrast(${beautySettings.contrast}%) saturate(${beautySettings.saturation}%)`
    };

    return (
        <section className="relative h-screen bg-black text-rose-50 overflow-hidden flex font-sans">

            {/* MAIN CAMERA VIEWPORT */}
            <div className={`relative flex-1 flex items-center justify-center overflow-hidden transition-all duration-300 ${isPanelOpen ? 'mr-0' : 'mr-0'}`}>

                {/* VIDEO FEED */}
                <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                    <video
                        ref={videoRef}
                        className="absolute w-full h-full object-cover transform -scale-x-100"
                        style={videoStyle}
                        playsInline
                        muted
                    />

                    {/* Makeup Overlay Canvas */}
                    {faceData && (
                        <div className="absolute inset-0 pointer-events-none transform -scale-x-100">
                            <FaceCanvas
                                videoRef={videoRef}
                                landmarks={faceData}
                                activeMakeup={makeupState}
                                beautySettings={beautySettings}
                            />
                        </div>
                    )}

                    {/* Compare Mode Slider (Active only if compareMode is true) */}
                    {compareMode && isCameraActive && (
                        <div className="absolute inset-0 z-20">
                            <ReactCompareSlider
                                itemOne={<div className="w-full h-full" />} // Transparent to show underlying video + makeup
                                itemTwo={<div className="w-full h-full bg-black" />} // Wrong approach for live video comparison. 
                            // Proper comparison requires capturing a frame or complex layering. 
                            // For now, we'll simplify: Toggle logic handles visual comparison better than slider for live video.
                            // Use Split Screen logic manually?
                            />
                        </div>
                    )}
                </div>

                {/* --- UI OVERLAYS --- */}

                {/* TOP BAR */}
                <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent z-40 flex justify-between items-center">
                    <button onClick={() => window.history.back()} className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md" aria-label="Go Back">
                        <ArrowLeft size={20} />
                    </button>

                    <div className="flex space-x-4 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                        <div className="flex items-center space-x-2 border-r border-white/20 pr-4">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-xs font-mono">{isCameraActive ? 'LIVE' : 'OFFLINE'}</span>
                        </div>
                        <div className="text-xs font-mono opacity-70">{fps} FPS</div>
                        <div className="text-xs font-mono opacity-70">1080p</div>
                    </div>

                    <div className="flex space-x-2">
                        <button
                            onClick={() => setCompareMode(!compareMode)}
                            className={`p-2 rounded-full backdrop-blur-md transition-colors ${compareMode ? 'bg-primary text-white' : 'bg-white/10 hover:bg-white/20'}`}
                            title="Split Compare"
                            aria-label="Toggle Split Comparison"
                        >
                            <Video size={20} />
                        </button>
                        <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md" aria-label="Settings">
                            <Settings size={20} />
                        </button>
                    </div>
                </div>

                {/* BOTTOM BAR (When Panel is Closed or always visible controls) */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-6">
                    <button className="p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10" aria-label="Open Gallery">
                        <ImageIcon size={24} />
                    </button>

                    <button
                        onClick={toggleCamera}
                        className={`w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all transform hover:scale-105 ${isCameraActive ? 'border-primary bg-transparent' : 'border-white bg-white'}`}
                        aria-label={isCameraActive ? "Stop Camera" : "Start Camera"}
                    >
                        {isCameraActive ? <div className="w-16 h-16 bg-primary rounded-full animate-pulse" /> : <Camera className="text-black" size={32} />}
                    </button>

                    <button
                        onClick={handleSaveLook}
                        disabled={!isCameraActive}
                        className="p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10"
                        aria-label="Save Look"
                    >
                        <Save size={24} />
                    </button>
                </div>

                {!isCameraActive && (
                    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-md">
                        <div className="text-center p-8 max-w-md">
                            <Sparkles className="w-16 h-16 text-primary mx-auto mb-6" />
                            <h2 className="text-3xl font-serif mb-4">Radiance Virtual Studio</h2>
                            <p className="text-white/60 mb-8">Access our premium 1080p mirror to try 100+ shades instantly.</p>
                            <button onClick={toggleCamera} className="bg-primary text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-primary/80 transition-all shadow-glow">
                                Activate Camera
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* RIGHT PANEL: CONTROLS & PRODUCTS */}
            <motion.div
                initial={{ width: 420 }}
                animate={{ width: isPanelOpen ? 420 : 0 }}
                className="bg-white text-charcoal shadow-2xl z-50 flex flex-col relative h-full border-l border-gray-100"
            >
                {/* Toggle Button */}
                <button
                    onClick={() => setIsPanelOpen(!isPanelOpen)}
                    className="absolute -left-10 top-1/2 -translate-y-1/2 w-10 h-20 bg-white rounded-l-2xl flex items-center justify-center shadow-[-5px_0_15px_-3px_rgba(0,0,0,0.1)] cursor-pointer text-gray-500 hover:text-primary"
                    aria-label={isPanelOpen ? "Close Panel" : "Open Panel"}
                >
                    {isPanelOpen ? <ChevronRight /> : <ChevronLeft />}
                </button>

                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="font-serif text-xl">Studio Controls</h3>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setActiveTab('beauty')}
                            className={`p-2 rounded-lg transition-colors ${activeTab === 'beauty' ? 'bg-primary text-white' : 'bg-white hover:bg-gray-100 text-gray-500'}`}
                            aria-label="Beauty Settings"
                        >
                            <Sliders size={18} />
                        </button>
                        <button
                            onClick={() => setActiveTab('products')}
                            className={`p-2 rounded-lg transition-colors ${activeTab === 'products' ? 'bg-primary text-white' : 'bg-white hover:bg-gray-100 text-gray-500'}`}
                            aria-label="Product Library"
                        >
                            <Sparkles size={18} />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {activeTab === 'beauty' && (
                        <div className="p-6 space-y-8">
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Skin & Lighting</h4>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Skin Smoothing</span>
                                            <span>{beautySettings.smoothing}%</span>
                                        </div>
                                        <input
                                            type="range" min="0" max="100"
                                            value={beautySettings.smoothing}
                                            onChange={(e) => setBeautySettings(p => ({ ...p, smoothing: parseInt(e.target.value) }))}
                                            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Brightness</span>
                                            <span>{(beautySettings.brightness - 100) > 0 ? '+' : ''}{beautySettings.brightness - 100}</span>
                                        </div>
                                        <input
                                            type="range" min="50" max="150"
                                            value={beautySettings.brightness}
                                            onChange={(e) => setBeautySettings(p => ({ ...p, brightness: parseInt(e.target.value) }))}
                                            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Contrast</span>
                                            <span>{(beautySettings.contrast - 100) > 0 ? '+' : ''}{beautySettings.contrast - 100}</span>
                                        </div>
                                        <input
                                            type="range" min="50" max="150"
                                            value={beautySettings.contrast}
                                            onChange={(e) => setBeautySettings(p => ({ ...p, contrast: parseInt(e.target.value) }))}
                                            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                    </div>
                                    <button
                                        onClick={() => setBeautySettings({ smoothing: 30, brightness: 100, contrast: 100, saturation: 100, lighting: 'natural' })}
                                        className="w-full py-2 bg-gray-100 text-charcoal rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors mt-4"
                                    >
                                        Reset Filters
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'products' && (
                        <>
                            {/* Categories */}
                            <div className="px-6 py-4 flex space-x-4 overflow-x-auto hide-scrollbar border-b border-gray-100">
                                {['lips', 'eyes', 'cheeks', 'face'].map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`flex flex-col items-center min-w-[60px] space-y-2 group`}
                                    >
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all ${activeCategory === cat ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 text-gray-400 group-hover:border-primary/50'}`}>
                                            <div className="capitalize font-bold text-[10px]">{cat[0]}</div>
                                        </div>
                                        <span className={`text-[10px] uppercase font-bold tracking-wider ${activeCategory === cat ? 'text-primary' : 'text-gray-400'}`}>{cat}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Products Grid */}
                            <div className="p-6 grid grid-cols-3 gap-3">
                                {displayProducts.map(product => (
                                    <button
                                        key={product.id}
                                        onClick={() => handleProductSelect(product)}
                                        className={`group relative rounded-xl overflow-hidden border transition-all aspect-[3/4] text-left
                                            ${activeProduct?.id === product.id ? 'border-primary ring-2 ring-primary/20 shadow-lg' : 'border-gray-100 hover:border-primary/40'}
                                        `}
                                    >
                                        <div className="h-3/4 w-full" style={{ backgroundColor: product.hex }} />
                                        <div className="h-1/4 bg-white p-2 flex flex-col justify-center">
                                            <p className="text-[10px] font-bold truncate">{product.name}</p>
                                        </div>
                                        {activeProduct?.id === product.id && (
                                            <div className="absolute top-2 right-2 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                                                <div className="w-2 h-2 bg-primary rounded-full" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Active Product Controls */}
                            {activeProduct && (
                                <div className="p-6 bg-gray-50 border-t border-gray-100">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="font-bold text-sm">{activeProduct.name}</h4>
                                            <p className="text-xs text-gray-500">{activeProduct.finish} • {activeProduct.category}</p>
                                        </div>
                                        <div className="text-primary font-bold">{activeProduct.price} BDT</div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-xs text-gray-500">
                                                <span>Opacity</span>
                                                <span>{Math.round((activeCategory === 'lips' ? makeupState.lips.opacity : makeupState[activeCategory].opacity) * 100)}%</span>
                                            </div>
                                            <input
                                                type="range" min="0" max="1" step="0.1"
                                                value={activeCategory === 'lips' ? makeupState.lips.opacity : makeupState[activeCategory]?.opacity || 0}
                                                onChange={(e) => {
                                                    const val = parseFloat(e.target.value);
                                                    const newState = { ...makeupState };
                                                    if (newState[activeCategory]) newState[activeCategory].opacity = val;
                                                    else if (activeCategory === 'cheeks') newState.blush.opacity = val;
                                                    setMakeupState(newState);
                                                }}
                                                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                            />
                                        </div>
                                        <button className="w-full py-3 bg-charcoal text-white rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-primary transition-colors">
                                            Add to Bag
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </motion.div>
        </section>
    );
};

export default MakeupStudio;

