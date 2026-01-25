import { useState, useEffect, useRef } from 'react';
import { Camera, RefreshCw, Save, Share2, ArrowLeft, Maximize2, Sparkles, Download, Heart } from 'lucide-react';
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
    const canvasRef = useRef(null); // Lifted ref to access canvas for capture
    const [detector, setDetector] = useState(null);
    const [faceData, setFaceData] = useState(null);

    // UI State
    const [activeTab, setActiveTab] = useState("products"); // 'products' | 'presets'
    const [activeCategory, setActiveCategory] = useState("lips");
    const [activeProduct, setActiveProduct] = useState(null);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState("all");
    const [compareMode, setCompareMode] = useState(true);
    const [saving, setSaving] = useState(false);

    // State for makeup layers
    const [makeupState, setMakeupState] = useState({
        lips: { color: null, opacity: 0.6, finish: 'matte' },
        eyes: { color: null, opacity: 0.4 },
        blush: { color: null, opacity: 0.3 },
        face: { color: null, opacity: 0.0 }, // Foundation
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

    // Camera Start/Stop Logic
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
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { width: 1280, height: 720, facingMode: "user" }
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
                alert("Unable to access camera. Please check permissions.");
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

    // 2. Detection Loop
    useEffect(() => {
        let animationId;
        const loop = async () => {
            if (detector && videoRef.current && isCameraActive && !videoRef.current.paused && !videoRef.current.ended) {
                const face = await detectFaceLandmarks(videoRef.current);
                if (face) {
                    setFaceData(face.keypoints);
                } else {
                    setFaceData(null);
                }
            }
            animationId = requestAnimationFrame(loop);
        };

        if (detector && isCameraActive) {
            loop();
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
            // Basic Foundation tint
            newState.face = {
                color: product.hex,
                opacity: product.opacity || 0.2
            };
        }

        setMakeupState(newState);
    };

    const handlePresetSelect = (preset) => {
        const newState = { ...makeupState };
        // We need to map preset product IDs to actual values or active makeup state
        // Since we have the full products dict in the preset, mapping is manually done in PRESETS data 
        // BUT PRESETS data only has IDs. We need to find the product objects.
        const all = getAllProducts();

        Object.entries(preset.products).forEach(([cat, meta]) => {
            const product = all.find(p => p.id === meta.id);
            if (product) {
                // Apply logic same as handleProductSelect but accumulating
                if (cat === 'lips') newState.lips = { color: product.hex, opacity: meta.opacity, finish: product.finish, texture: product.texture };
                if (cat === 'eyes') newState.eyes = { color: product.hex, opacity: meta.opacity, finish: product.finish, category: 'eyeshadow' };
                if (cat === 'blush') newState.blush = { color: product.hex, opacity: meta.opacity };
                if (cat === 'foundation') newState.face = { color: product.hex, opacity: meta.opacity };
            }
        });
        setMakeupState(newState);
        setActiveProduct(null); // It's a preset
    };

    const handleSaveLook = async () => {
        setSaving(true);
        // Find the canvas element. Since we lift ref, strictly FaceCanvas should expose it but I used ref forwarding? 
        // Wait, FaceCanvas component had `ref={canvasRef}` passed to it? No, I passed `videoRef`. 
        // I need to modify FaceCanvas to accept `canvasRef` or start using `document.querySelector`.
        // The most reliable way here without refactoring FileCanvas too much is querySelector for now.
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

    return (
        <section className="relative min-h-screen bg-black text-rose-50 overflow-hidden flex flex-col lg:flex-row font-sans">

            {/* BACKGROUND VIDEO */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="relative w-full h-full lg:w-[calc(100%-400px)] bg-black flex items-center justify-center overflow-hidden">
                    <video
                        ref={videoRef}
                        className="absolute inset-0 w-full h-full object-cover transform -scale-x-100 opacity-100"
                        playsInline
                        muted
                    />
                </div>
            </div>

            {/* MAIN VIEWPORT */}
            <div className="relative flex-1 flex items-center justify-center overflow-hidden z-10">
                {!isCameraActive ? (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                        <div className="text-center p-8 glass-card rounded-3xl border border-white/20">
                            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
                            <h3 className="text-2xl font-serif text-white mb-2">Virtual Mirror</h3>
                            <p className="text-white/70 mb-6 text-sm max-w-xs mx-auto">Activate your camera to try on our exclusive shades in real-time.</p>
                            <button
                                onClick={toggleCamera}
                                className="px-8 py-3 bg-white text-primary rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-lg cursor-pointer"
                            >
                                Start Camera
                            </button>
                        </div>
                    </div>
                ) : (
                    compareMode ? (
                        <ReactCompareSlider
                            itemOne={<div className="w-full h-full" />}
                            itemTwo={
                                <FaceCanvas
                                    videoRef={videoRef}
                                    landmarks={faceData}
                                    activeMakeup={makeupState}
                                />
                            }
                            style={{ width: '100%', height: '100%' }}
                            handle={
                                <ReactCompareSliderHandle
                                    buttonStyle={{
                                        backdropFilter: 'blur(15px)',
                                        backgroundColor: 'white',
                                        color: '#B76E79',
                                        border: '1px solid #B76E79',
                                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
                                    }}
                                    linesStyle={{ opacity: 0.5, color: "white" }}
                                />
                            }
                        />
                    ) : (
                        <div className="w-full h-full relative">
                            <FaceCanvas
                                videoRef={videoRef}
                                landmarks={faceData}
                                activeMakeup={makeupState}
                            />
                        </div>
                    )
                )}

                {isLoading && isCameraActive && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-50">
                        <div className="flex flex-col items-center animate-pulse">
                            <RefreshCw className="w-12 h-12 text-primary animate-spin mb-4" />
                            <p className="text-primary font-serif italic text-xl">Initializing Beauty AI...</p>
                        </div>
                    </div>
                )}

                <div className="absolute top-6 left-6 z-50">
                    <button className="bg-black/30 backdrop-blur-md p-4 rounded-full text-white hover:bg-primary hover:text-white transition-all border border-white/10 group">
                        <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                </div>

                {isCameraActive && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 bg-black/40 backdrop-blur-xl rounded-full p-1 border border-white/10 flex space-x-2">
                        <button
                            onClick={() => setCompareMode(true)}
                            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all 
                        ${compareMode ? 'bg-primary text-white shadow-glow' : 'text-white/70 hover:text-white'}`}
                        >
                            Compare
                        </button>
                        <button
                            onClick={() => setCompareMode(false)}
                            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all 
                        ${!compareMode ? 'bg-primary text-white shadow-glow' : 'text-white/70 hover:text-white'}`}
                        >
                            Full Look
                        </button>
                    </div>
                )}

                <div className="absolute top-6 right-6 z-50 flex space-x-3">
                    <button
                        onClick={toggleCamera}
                        className={`backdrop-blur-md p-3 rounded-full text-white transition-all border border-white/10 cursor-pointer ${isCameraActive ? 'bg-primary border-primary' : 'bg-black/30 hover:bg-white hover:text-primary'}`}
                    >
                        <Camera />
                    </button>
                    <button
                        onClick={handleSaveLook}
                        disabled={saving || !isCameraActive}
                        className="bg-black/30 backdrop-blur-md p-3 rounded-full text-white hover:bg-white hover:text-primary transition-all border border-white/10"
                    >
                        {saving ? <RefreshCw className="animate-spin" /> : <Save />}
                    </button>
                    <button className="bg-black/30 backdrop-blur-md p-3 rounded-full text-white hover:bg-white hover:text-primary transition-all border border-white/10">
                        <Share2 />
                    </button>
                </div>
            </div>

            {/* RIGHT PANEL: Controls */}
            <div className="w-full lg:w-[420px] bg-white text-charcoal shadow-2xl z-20 flex flex-col relative">
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

                <div className="p-8 pb-4 relative z-10">
                    <div className="flex justify-between items-center mb-1">
                        <h2 className="font-script text-4xl text-primary">Makeup Studio</h2>
                        <Sparkles className="text-gold w-6 h-6 animate-pulse" />
                    </div>
                    <p className="text-xs text-charcoal/50 uppercase tracking-[0.2em]">Professional Virtual Try-On</p>
                </div>

                {/* Main Tabs (Products vs Presets) */}
                <div className="px-8 pb-2 flex gap-4 z-10 border-b border-gray-100">
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`pb-2 text-xs font-bold uppercase tracking-widest ${activeTab === 'products' ? 'text-primary border-b-2 border-primary' : 'text-gray-400'}`}
                    >
                        Products
                    </button>
                    <button
                        onClick={() => setActiveTab('presets')}
                        className={`pb-2 text-xs font-bold uppercase tracking-widest ${activeTab === 'presets' ? 'text-primary border-b-2 border-primary' : 'text-gray-400'}`}
                    >
                        Presets
                    </button>
                </div>

                {activeTab === 'products' ? (
                    <>
                        {/* Filters */}
                        <div className="px-8 py-4 flex space-x-2 overflow-x-auto hide-scrollbar z-10">
                            {['all', 'international', 'local'].map(f => (
                                <button
                                    key={f}
                                    onClick={() => setActiveFilter(f)}
                                    className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap border
                                    ${activeFilter === f
                                            ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30'
                                            : 'bg-white text-charcoal/60 border-gray-200 hover:border-primary/50'}
                                `}
                                >
                                    {f === 'all' ? 'All Brands' : f}
                                </button>
                            ))}
                        </div>

                        {/* Category Interaction */}
                        <div className="flex-1 flex flex-col min-h-0 bg-gray-50/50 backdrop-blur-sm rounded-t-3xl border-t border-white/60">
                            {/* Tabs */}
                            <div className="flex justify-evenly pt-6 border-b border-gray-100/50">
                                {['lips', 'eyes', 'cheeks', 'face'].map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`pb-4 text-sm font-medium uppercase tracking-widest relative transition-colors ${activeCategory === cat ? 'text-primary' : 'text-gray-400'}`}
                                    >
                                        {cat}
                                        {activeCategory === cat && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Products Grid */}
                            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-3 gap-4 content-start">
                                {displayProducts.map(product => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        key={product.id}
                                        onClick={() => handleProductSelect(product)}
                                        className={`group cursor-pointer rounded-2xl overflow-hidden border transition-all relative aspect-[3/4] shadow-sm hover:shadow-md
                                        ${activeProduct?.id === product.id ? 'border-primary ring-2 ring-primary/20' : 'border-gray-100 hover:border-primary/40'}
                                    `}
                                    >
                                        <div
                                            className="h-3/5 w-full transition-transform duration-500 group-hover:scale-110"
                                            style={{ backgroundColor: product.hex }}
                                        />
                                        <div className="h-2/5 md:p-3 p-2 bg-white flex flex-col justify-center text-center">
                                            <p className="text-[10px] sm:text-xs font-bold text-charcoal truncate w-full">{product.name}</p>
                                            <p className="text-[9px] text-charcoal/40 uppercase mt-1">{product.finish}</p>
                                        </div>
                                        {activeProduct?.id === product.id && (
                                            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white shadow-sm ring-1 ring-black/5" />
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Intensity */}
                            <div className="p-8 bg-white border-t border-gray-100 z-20">
                                <div className="mb-6">
                                    <div className="flex justify-between text-xs font-bold text-charcoal/50 mb-3 uppercase tracking-wider">
                                        <span>Intensity</span>
                                        <span>{Math.round((activeCategory === 'lips' ? makeupState.lips.opacity : makeupState[activeCategory === 'cheeks' ? 'blush' : 'eyes'].opacity) * 100)}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.05"
                                        value={
                                            activeCategory === 'lips' ? makeupState.lips.opacity :
                                                activeCategory === 'eyes' ? makeupState.eyes.opacity :
                                                    activeCategory === 'cheeks' ? makeupState.blush.opacity :
                                                        makeupState.face?.opacity || 0
                                        }
                                        onChange={(e) => {
                                            const val = parseFloat(e.target.value);
                                            const newState = { ...makeupState };
                                            if (activeCategory === 'lips') newState.lips.opacity = val;
                                            else if (activeCategory === 'eyes') newState.eyes.opacity = val;
                                            else if (activeCategory === 'cheeks') newState.blush.opacity = val;
                                            else if (activeCategory === 'face' && newState.face) newState.face.opacity = val;
                                            setMakeupState(newState);
                                        }}
                                        className="w-full accent-primary h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer hover:bg-gray-200 transition-colors"
                                    />
                                </div>
                                <button className="w-full py-4 rounded-xl bg-charcoal text-white font-bold uppercase tracking-widest hover:bg-primary transition-colors duration-300 shadow-lg shadow-charcoal/20">
                                    Add to Cart • {activeProduct ? (activeProduct.price + (activeProduct.currency === "BDT" ? " ৳" : " $")) : "Select Product"}
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    // PRESETS VIEW
                    <div className="flex-1 overflow-y-auto p-6 grid grid-cols-2 gap-4 content-start bg-gray-50/50">
                        {PRESETS.map(preset => (
                            <motion.div
                                key={preset.id}
                                onClick={() => handlePresetSelect(preset)}
                                whileHover={{ y: -5 }}
                                className="group cursor-pointer rounded-2xl overflow-hidden bg-white shadow-md border border-gray-100 hover:border-primary/50 relative"
                            >
                                <div className="aspect-[4/5] bg-gray-200 relative overflow-hidden">
                                    {/* Placeholder if no real image */}
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
                                        <Sparkles />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                                        <p className="text-white font-bold font-serif">{preset.name}</p>
                                        <p className="text-white/70 text-[10px] uppercase tracking-wider">{preset.category}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default MakeupStudio;
