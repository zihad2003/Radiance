import { useState, useRef, useEffect } from 'react';
import { Camera, Upload, RefreshCw, X, Check, Share2, Download, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { initFaceDetection, detectFaceLandmarks, calculateFaceShape, guessGender } from '../../utils/faceDetection';
import { hairstyles, hairColors } from '../../data/hairstyles';
import GlassCard from '../ui/GlassCard';
import PinkButton from '../ui/PinkButton';
import HairOverlay from './HairOverlay';

const HairstyleFinder = () => {
    const [mode, setMode] = useState('upload'); // 'camera', 'upload'
    const [imageSrc, setImageSrc] = useState(null);
    const [analysis, setAnalysis] = useState(null); // { shape, gender }
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [selectedStyle, setSelectedStyle] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const containerRef = useRef(null); // For overlay positioning

    // AI Models
    const [detector, setDetector] = useState(null);

    useEffect(() => {
        initFaceDetection().then(setDetector);
    }, []);

    // Camera Logic
    const startCamera = async () => {
        setMode('camera');
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }
        } catch (e) {
            console.error(e);
            alert("Unable to access camera. Please check permissions.");
        }
    };

    const capturePhoto = () => {
        if (!videoRef.current || !canvasRef.current) return;
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Flip if needed? Video is usually mirrored in CSS but drawn normally on canvas. 
        // We should draw it normally.
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0);

        const img = canvas.toDataURL('image/png');
        setImageSrc(img);
        setMode('preview');

        // Stop stream
        const stream = video.srcObject;
        if (stream) stream.getTracks().forEach(t => t.stop());

        // Analyze
        const imageElement = new Image();
        imageElement.src = img;
        imageElement.onload = () => analyzeImage(imageElement);
    };

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setImageSrc(ev.target.result);
                setMode('preview');
                const img = new Image();
                img.src = ev.target.result;
                img.onload = () => analyzeImage(img);
            };
            reader.readAsDataURL(file);
        }
    };

    const analyzeImage = async (imageElement) => {
        if (!detector) return;
        setIsAnalyzing(true);
        setAnalysis(null);
        setSelectedStyle(null);

        try {
            const faces = await detector.estimateFaces(imageElement);
            if (faces.length > 0) {
                const face = faces[0];
                const keypoints = face.keypoints;
                const shape = calculateFaceShape(keypoints);
                const gender = guessGender(keypoints);

                // Compute Box if missing
                let box = face.box;
                if (!box && keypoints) {
                    const xs = keypoints.map(k => k.x);
                    const ys = keypoints.map(k => k.y);
                    box = { xMin: Math.min(...xs), yMin: Math.min(...ys), width: Math.max(...xs) - Math.min(...xs), height: Math.max(...ys) - Math.min(...ys) };
                }

                setAnalysis({
                    shape,
                    gender,
                    box,
                    keypoints,
                    originalWidth: imageElement.width, // For scaling
                    originalHeight: imageElement.height
                });
            } else {
                alert("No face detected. Please try a clearer photo.");
                setImageSrc(null);
                setMode('upload');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsAnalyzing(false);
        }
    };

    // Filter Recommendations
    const recommendations = analysis
        ? hairstyles.filter(h => h.faceShapes.includes(analysis.shape) || h.gender === analysis.gender)
        : [];

    return (
        <section className="py-24 bg-pearl min-h-screen relative font-sans overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 mb-4 px-4 py-1 rounded-full bg-white/50 border border-primary/20 backdrop-blur-sm"
                    >
                        <Sparkles size={14} className="text-primary" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">AI Hair Stylist</span>
                    </motion.div>
                    <h3 className="text-5xl md:text-6xl font-script text-charcoal mb-4">Find Your Perfect Cut</h3>
                    <p className="text-charcoal/60 max-w-lg mx-auto">Upload a photo or use your camera to get personalized hairstyle recommendations based on your face shape.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">

                    {/* Main Canvas Area */}
                    <GlassCard className="w-full lg:w-1/2 min-h-[500px] flex items-center justify-center relative p-2 md:p-4 overflow-hidden shadow-2xl">
                        {!imageSrc && mode !== 'camera' && (
                            <div className="flex flex-col items-center justify-center p-12 text-center w-full h-full border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50/50">
                                <PinkButton onClick={startCamera} icon={Camera} className="mb-6 w-full max-w-[200px]">
                                    Open Camera
                                </PinkButton>
                                <div className="text-xs text-charcoal/40 uppercase tracking-widest mb-6 font-bold flex items-center gap-4 w-full justify-center">
                                    <span className="h-px bg-gray-300 w-12" /> OR <span className="h-px bg-gray-300 w-12" />
                                </div>
                                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleUpload} />
                                <button
                                    onClick={() => fileInputRef.current.click()}
                                    className="flex items-center gap-2 text-charcoal/70 hover:text-primary transition-colors font-semibold"
                                >
                                    <Upload size={18} /> Upload Photo
                                </button>
                            </div>
                        )}

                        {mode === 'camera' && (
                            <div className="relative w-full h-[500px] bg-black rounded-2xl overflow-hidden">
                                <video ref={videoRef} className="w-full h-full object-cover transform -scale-x-100" />
                                <div className="absolute bottom-6 left-0 w-full flex justify-center">
                                    <button
                                        onClick={capturePhoto}
                                        className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center bg-white/20 backdrop-blur-sm hover:scale-110 transition-transform"
                                    >
                                        <div className="w-12 h-12 bg-primary rounded-full" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {imageSrc && (
                            <div className="relative w-full rounded-2xl overflow-hidden touch-none" ref={containerRef}>
                                <img src={imageSrc} alt="User" className="w-full h-auto object-contain max-h-[600px] select-none" draggable={false} />

                                {/* Hairstyle Overlay */}
                                <AnimatePresence>
                                    {selectedStyle && analysis && (
                                        <HairOverlay
                                            style={selectedStyle}
                                            color={selectedColor}
                                            analysis={analysis}
                                            containerWidth={containerRef.current?.offsetWidth}
                                            containerHeight={containerRef.current?.offsetHeight}
                                        />
                                    )}
                                </AnimatePresence>

                                <button
                                    onClick={() => { setImageSrc(null); setMode('upload'); setAnalysis(null); }}
                                    className="absolute top-4 right-4 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors backdrop-blur-md z-30"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        )}

                        <canvas ref={canvasRef} className="hidden" />
                    </GlassCard>

                    {/* Controls & Results */}
                    <div className="w-full lg:w-1/3 space-y-6">
                        {isAnalyzing ? (
                            <GlassCard className="flex flex-col items-center justify-center h-64">
                                <RefreshCw className="animate-spin text-primary w-10 h-10 mb-4" />
                                <span className="font-serif text-lg text-charcoal">Analyzing Facial Geometry...</span>
                                <span className="text-xs text-charcoal/50 mt-2">Mapping 468 landmarks</span>
                            </GlassCard>
                        ) : analysis ? (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                {/* Analysis Card */}
                                <GlassCard>
                                    <h4 className="font-bold text-primary text-[10px] uppercase tracking-widest mb-4">You have a</h4>
                                    <div className="flex justify-between items-center mb-4">
                                        <div>
                                            <p className="text-4xl font-serif text-charcoal capitalize">{analysis.shape}</p>
                                            <p className="text-sm text-charcoal/60 uppercase tracking-widest mt-1">Face Shape</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-charcoal/80 leading-relaxed border-t border-primary/20 pt-4">
                                        For a <strong>{analysis.shape}</strong> face, we recommend styles that
                                        {analysis.shape === 'round' ? ' lengthen the face and add angles to define structure.' :
                                            analysis.shape === 'square' ? ' soften the jawline and add height at the crown.' :
                                                analysis.shape === 'oval' ? ' maintain your naturally balanced proportions.' :
                                                    analysis.shape === 'heart' ? ' balance the forehead width and adding volume at the chin.' :
                                                        ' balance your unique features.'}
                                    </p>
                                </GlassCard>

                                {/* Style Selector */}
                                <div>
                                    <h5 className="font-serif text-xl mb-4 text-charcoal px-2">Recommended Styles</h5>
                                    <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto hide-scrollbar">
                                        {recommendations.length > 0 ? recommendations.map(style => (
                                            <div
                                                key={style.id}
                                                onClick={() => setSelectedStyle(style)}
                                                className={`p-3 rounded-xl border transition-all cursor-pointer bg-white group
                                                    ${selectedStyle?.id === style.id ? 'border-primary ring-1 ring-primary shadow-lg' : 'border-transparent hover:border-gray-200 shadow-sm'}
                                                `}
                                            >
                                                <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                                                    <img
                                                        src={`https://placehold.co/150x150/F4E4D7/4A1942?text=${style.name.split(' ')[0]}`}
                                                        alt={style.name}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                </div>
                                                <p className="font-bold text-xs text-charcoal">{style.name}</p>
                                                <p className="text-[10px] text-charcoal/50 capitalize mt-1">{style.length} • {style.texture}</p>
                                            </div>
                                        )) : (
                                            <p className="col-span-2 text-sm text-gray-400 italic">No specific recommendations found.</p>
                                        )}
                                    </div>
                                </div>

                                {/* Color Picker */}
                                <GlassCard>
                                    <h5 className="font-serif text-lg mb-4 text-charcoal">Virtual Color</h5>
                                    <div className="flex flex-wrap gap-3">
                                        <button
                                            onClick={() => setSelectedColor(null)}
                                            className={`w-8 h-8 rounded-full border border-gray-200 bg-transparent flex items-center justify-center text-[10px] text-gray-500 hover:bg-gray-50
                                                ${!selectedColor ? 'ring-2 ring-primary border-transparent' : ''}
                                            `}
                                        >
                                            Off
                                        </button>
                                        {hairColors.map(c => (
                                            <button
                                                key={c.name}
                                                onClick={() => setSelectedColor(c)}
                                                className={`w-8 h-8 rounded-full border border-black/5 shadow-sm transition-all hover:scale-110
                                                    ${selectedColor?.name === c.name ? 'ring-2 ring-primary ring-offset-2 scale-110' : ''}
                                                `}
                                                style={{ backgroundColor: c.hex }}
                                                title={c.name}
                                            />
                                        ))}
                                    </div>
                                </GlassCard>

                            </motion.div>
                        ) : (
                            <GlassCard className="text-center py-12 border-dashed border-2 border-primary/20 !shadow-none !bg-white/40">
                                <Sparkles className="w-8 h-8 text-primary/40 mx-auto mb-4" />
                                <p className="text-charcoal/60 text-sm max-w-xs mx-auto">Upload a photo to unlock your personalized AI hair consultation & shape analysis.</p>
                            </GlassCard>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HairstyleFinder;
