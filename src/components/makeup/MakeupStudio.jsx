import { useState, useEffect, useRef } from 'react';
import { Camera, RefreshCw, Save, Share2, ArrowLeft } from 'lucide-react';
import { initFaceDetection, detectFaceLandmarks } from '../../utils/faceDetection';
import FaceCanvas from './FaceCanvas';
import { getAllProducts, getBrands } from '../../data/makeupBrands';
import { motion, AnimatePresence } from 'framer-motion';

const MakeupStudio = () => {
    const videoRef = useRef(null);
    const [detector, setDetector] = useState(null);
    const [faceData, setFaceData] = useState(null);
    const [activeCategory, setActiveCategory] = useState("lips");
    const [activeProduct, setActiveProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState("all"); // 'international', 'local'

    // State for makeup layers
    const [makeupState, setMakeupState] = useState({
        lips: { color: null, opacity: 0.6, finish: 'matte' },
        eyes: { color: null, opacity: 0.4 },
        blush: { color: null, opacity: 0.3 }
    });

    // 1. Initialize Camera & AI
    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { width: 1280, height: 720, facingMode: "user" }
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.onloadedmetadata = () => {
                        videoRef.current.play();
                        loadModel();
                    };
                }
            } catch (err) {
                console.error("Camera Error:", err);
                setIsLoading(false);
            }
        };

        const loadModel = async () => {
            const det = await initFaceDetection();
            setDetector(det);
            setIsLoading(false);
        };

        startCamera();
    }, []);

    // 2. Detection Loop
    useEffect(() => {
        let animationId;
        const loop = async () => {
            if (detector && videoRef.current) {
                const face = await detectFaceLandmarks(videoRef.current);
                if (face) {
                    setFaceData(face.keypoints); // Store landmarks
                }
            }
            animationId = requestAnimationFrame(loop);
        };

        if (detector) {
            loop();
        }

        return () => cancelAnimationFrame(animationId);
    }, [detector]);

    // 3. Handlers
    const handleProductSelect = (product) => {
        setActiveProduct(product);
        const newState = { ...makeupState };

        if (product.category === 'lips') {
            newState.lips = { color: product.hex, opacity: 0.7, finish: product.finish };
        } else if (product.category === 'eyes') {
            newState.eyes = { color: product.hex, opacity: 0.5 };
        } else if (product.category === 'cheeks') { // Fixed: using correct category mapping
            newState.blush = { color: product.hex, opacity: 0.4 };
        }

        setMakeupState(newState);
    };

    const brands = getBrands();
    const allProducts = getAllProducts();
    const filteredProducts = activeFilter === 'all'
        ? allProducts
        : activeFilter === 'international'
            ? brands.international.flatMap(b => b.products)
            : brands.local.flatMap(b => b.products);

    const displayProducts = filteredProducts.filter(p => p.category === activeCategory);

    return (
        <section className="relative min-h-screen bg-pearl text-charcoal overflow-hidden flex flex-col lg:flex-row">
            {/* Left: Camera Feed */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
                <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover transform -scale-x-100"
                    playsInline
                    muted
                />

                {/* AI Canvas Overlay */}
                <FaceCanvas
                    videoRef={videoRef}
                    landmarks={faceData}
                    activeMakeup={makeupState}
                />

                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
                        <div className="flex flex-col items-center">
                            <RefreshCw className="w-10 h-10 text-white animate-spin mb-4" />
                            <p className="text-white font-sans tracking-widest text-sm">INITIALIZING AI...</p>
                        </div>
                    </div>
                )}

                {/* Controls Overlay */}
                <div className="absolute top-6 left-6 z-10">
                    <button className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/30 transition-all">
                        <ArrowLeft />
                    </button>
                </div>
                <div className="absolute top-6 right-6 z-10 flex space-x-4">
                    <button className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/30 transition-all">
                        <Save />
                    </button>
                    <button className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/30 transition-all">
                        <Share2 />
                    </button>
                </div>
            </div>

            {/* Right: Controls Panel */}
            <div className="w-full lg:w-[400px] bg-white flex flex-col shadow-2xl z-20">
                {/* Header */}
                <div className="p-6 border-b border-gray-100">
                    <h2 className="font-serif text-2xl mb-1 text-primary">Virtual Studio</h2>
                    <p className="text-xs text-charcoal/50 uppercase tracking-wider">AI Powered Beauty</p>
                </div>

                {/* Filters */}
                <div className="px-6 py-4 flex space-x-2 overflow-x-auto hide-scrollbar">
                    {['all', 'international', 'local'].map(f => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all whitespace-nowrap
                                ${activeFilter === f ? 'bg-primary text-white shadow-lg' : 'bg-gray-100 text-charcoal/60 hover:bg-gray-200'}
                            `}
                        >
                            {f === 'all' ? 'All Brands' : f}
                        </button>
                    ))}
                </div>

                {/* Category Tabs */}
                <div className="px-6 border-b border-gray-100 flex justify-between">
                    {['lips', 'eyes', 'face', 'cheeks'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`py-4 text-sm font-semibold capitalize relative transition-colors
                                ${activeCategory === cat ? 'text-primary' : 'text-charcoal/40 hover:text-charcoal'}
                            `}
                        >
                            {cat}
                            {activeCategory === cat && (
                                <motion.div
                                    layoutId="tab-indicator"
                                    className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="flex-1 overflow-y-auto p-6 grid grid-cols-3 gap-4 content-start">
                    {displayProducts.map(product => (
                        <div
                            key={product.id}
                            onClick={() => handleProductSelect(product)}
                            className={`group cursor-pointer rounded-xl overflow-hidden border transition-all relative
                                ${activeProduct?.id === product.id ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'border-gray-100 hover:border-primary/50'}
                            `}
                        >
                            <div
                                className="h-16 w-full"
                                style={{ backgroundColor: product.hex }}
                            />
                            <div className="p-2 text-center">
                                <p className="text-[10px] font-bold text-charcoal truncate">{product.name}</p>
                                <p className="text-[9px] text-charcoal/50 capitalize">{product.finish}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Intensity Slider */}
                <div className="p-6 bg-gray-50 border-t border-gray-100">
                    <div className="flex justify-between text-xs font-bold text-charcoal/60 mb-2">
                        <span>Intensity</span>
                        <span>{Math.round((activeCategory === 'lips' ? makeupState.lips.opacity : 0.5) * 100)}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={activeCategory === 'lips' ? makeupState.lips.opacity : 0.5}
                        onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            const newState = { ...makeupState };
                            if (activeCategory === 'lips') newState.lips.opacity = val;
                            else if (activeCategory === 'eyes') newState.eyes.opacity = val;
                            else if (activeCategory === 'cheeks') newState.blush.opacity = val;
                            setMakeupState(newState);
                        }}
                        className="w-full accent-primary h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>
        </section>
    );
};

export default MakeupStudio;
