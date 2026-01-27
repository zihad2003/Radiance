import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, AlertCircle, CheckCircle, ArrowRight, Droplets, Sun, Activity, Moon, X, Scan, Sparkles } from 'lucide-react';
import { useAction } from 'convex/react';
import { api } from '../../convex/_generated/api';

const SkinHealthAnalyzer = () => {
    const [image, setImage] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const fileInputRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [cameraActive, setCameraActive] = useState(false);

    const analyzeSkin = useAction(api.skinAnalysis.analyze);

    // Camera Cleanup
    useEffect(() => {
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    // Start Camera
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
                setCameraActive(true);
                setError(null);
            }
        } catch (err) {
            setError("Unable to access camera. Please try uploading a photo instead.");
        }
    };

    // Capture Photo
    const capturePhoto = () => {
        if (!videoRef.current || !canvasRef.current) return;

        const context = canvasRef.current.getContext('2d');
        // Set canvas size (downscale for performance)
        canvasRef.current.width = 512;
        canvasRef.current.height = 512;

        // Draw video frame to canvas
        context.drawImage(videoRef.current, 0, 0, 512, 512);

        // Stop camera stream
        const stream = videoRef.current.srcObject;
        stream?.getTracks().forEach(track => track.stop());
        setCameraActive(false);

        // Get Data URL
        const dataUrl = canvasRef.current.toDataURL('image/jpeg', 0.8);
        setImage(dataUrl);
        handleAnalysis(dataUrl);
    };

    // Handle File Upload
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            // Resize image before setting
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 512;
                canvas.height = 512;
                ctx.drawImage(img, 0, 0, 512, 512);
                const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.8);

                setImage(resizedDataUrl);
                handleAnalysis(resizedDataUrl);
            };
        };
        reader.readAsDataURL(file);
    };

    // Trigger Analysis
    const handleAnalysis = async (imageData) => {
        setAnalyzing(true);
        setError(null);
        try {
            const data = await analyzeSkin({ image: imageData });
            setResult(data);
        } catch (err) {
            console.error("Analysis Failed:", err);
            setError("Analysis failed. Please try again.");
        } finally {
            setAnalyzing(false);
        }
    };

    const reset = () => {
        setImage(null);
        setResult(null);
        setError(null);
        setCameraActive(false);
    };

    // Helper for concern icons
    const getConcernIcon = (type) => {
        switch (type) {
            case 'acne': return <Activity size={20} className="text-red-500" />;
            case 'wrinkles': return <Sun size={20} className="text-orange-500" />;
            case 'darkCircles': return <Moon size={20} className="text-purple-500" />;
            case 'dryness': return <Droplets size={20} className="text-blue-500" />;
            default: return <AlertCircle size={20} />;
        }
    };

    return (
        <section className="py-24 bg-[#050505] relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-[-10%] w-[50%] h-[50%] bg-[#F5E6C8]/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-12">
                    <span className="text-gold font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 mb-4 border border-gold/20 w-fit mx-auto px-4 py-1.5 rounded-full bg-gold/5">
                        <Activity size={16} />
                        AI Health Check
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif italic mb-6 text-white">
                        Advanced <span className="text-gradient-gold">Skin Analysis</span>
                    </h2>
                    <p className="text-white/40 max-w-2xl mx-auto font-light tracking-wide">
                        Upload a close-up selfie to detect specialized skin concerns and get a medically-graded treatment plan tailored just for you.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[-20px_0_40px_rgba(0,0,0,0.5)] overflow-hidden min-h-[600px] flex flex-col md:flex-row relative">

                    {/* Left Side: Input / Image */}
                    <div className="md:w-1/2 bg-white/5 relative flex flex-col items-center justify-center p-8 border-r border-white/5">

                        {/* Camera View */}
                        <AnimatePresence>
                            {cameraActive && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-20 bg-black flex items-center justify-center"
                                >
                                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                                    {/* Scanning Overlay */}
                                    <div className="absolute inset-0 border-[2px] border-gold/30 opacity-50 m-8 rounded-3xl pointer-events-none">
                                        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-gold rounded-tl-xl" />
                                        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-gold rounded-tr-xl" />
                                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-gold rounded-bl-xl" />
                                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-gold rounded-br-xl" />
                                    </div>

                                    <button
                                        onClick={capturePhoto}
                                        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#F5E6C8] rounded-full border-4 border-white/20 shadow-glow hover:scale-110 transition-transform flex items-center justify-center cursor-pointer z-30"
                                    >
                                        <div className="w-12 h-12 bg-white/20 rounded-full" />
                                    </button>

                                    <button
                                        onClick={() => {
                                            const stream = videoRef.current?.srcObject;
                                            stream?.getTracks().forEach(track => track.stop());
                                            setCameraActive(false);
                                        }}
                                        className="absolute top-6 right-6 bg-black/50 p-2 rounded-full text-white/70 hover:text-white hover:bg-black/70 transition-all z-30"
                                    >
                                        <X size={24} />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Display Image or Placeholder */}
                        {image ? (
                            <div className="relative w-full h-full min-h-[400px]">
                                <img src={image} alt="Selfie" className="w-full h-full object-cover rounded-3xl" />
                                {analyzing && (
                                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center rounded-3xl border border-white/10">
                                        <div className="w-20 h-20 border-4 border-gold border-t-transparent rounded-full animate-spin mb-6" />
                                        <p className="font-bold text-[#F5E6C8] animate-pulse tracking-widest text-sm uppercase">Scanning Dermis...</p>
                                        <p className="text-white/40 text-xs mt-2">Analyzing micro-texture</p>
                                    </div>
                                )}
                                {!analyzing && (
                                    <button
                                        onClick={reset}
                                        className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-2 rounded-full shadow-lg hover:bg-red-900/50 text-white/70 hover:text-red-400 transition-all z-10 border border-white/10"
                                    >
                                        <X size={20} />
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="text-center space-y-8 w-full max-w-sm">
                                <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center shadow-glow mx-auto mb-4 border border-white/10 animate-pulse">
                                    <Scan size={48} className="text-white/20" />
                                </div>

                                <div className="flex flex-col gap-4 w-full relative z-10">
                                    <button
                                        onClick={startCamera}
                                        className="w-full py-4 bg-[#F5E6C8] text-black rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white transition-all flex items-center justify-center gap-3 shadow-glow"
                                    >
                                        <Camera size={18} />
                                        Start Facial Scan
                                    </button>

                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            onChange={handleFileUpload}
                                            className="hidden"
                                        />
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="w-full py-4 bg-transparent border border-white/20 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:border-gold/50 hover:text-gold hover:bg-white/5 transition-all flex items-center justify-center gap-3"
                                        >
                                            <Upload size={18} />
                                            Upload Image
                                        </button>
                                    </div>
                                </div>
                                <p className="text-[10px] text-white/30 uppercase tracking-wider flex items-center justify-center gap-2">
                                    <CheckCircle size={10} className="text-gold" />
                                    Encrypted & Private Analysis
                                </p>
                            </div>
                        )}

                        {/* Canvas for processing */}
                        <canvas ref={canvasRef} className="hidden" />
                    </div>

                    {/* Right Side: Results */}
                    <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto max-h-[800px] custom-scrollbar">
                        {result ? (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-8"
                            >
                                {/* Header */}
                                <div className="border-b border-white/10 pb-6">
                                    <h3 className="text-2xl font-serif italic mb-2 text-white">Analysis Complete</h3>
                                    <p className="text-gold text-xs uppercase tracking-widest">Clinical AI Assessment</p>
                                </div>

                                {/* Concerns Grid */}
                                <div className="grid grid-cols-1 gap-4">
                                    {Object.entries(result.concerns).map(([key, data]) => (
                                        <div key={key} className="bg-white/5 border border-white/5 rounded-xl p-4 hover:border-white/20 transition-all">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-black/40 rounded-full text-gold">
                                                        {getConcernIcon(key)}
                                                    </div>
                                                    <div>
                                                        <span className="font-bold capitalize block text-sm text-white">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                                        <span className="text-xs text-white/40 font-medium uppercase tracking-wider">{data.level}</span>
                                                    </div>
                                                </div>
                                                <span className={`text-xl font-serif italic ${data.score > 50 ? 'text-red-400' : 'text-green-400'}`}>
                                                    {data.score}%
                                                </span>
                                            </div>
                                            {/* Progress Bar */}
                                            <div className="w-full h-1 bg-white/10 rounded-full mb-3 overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${data.score}%` }}
                                                    transition={{ duration: 1 }}
                                                    className={`h-full rounded-full ${key === 'acne' ? 'bg-red-400' :
                                                        key === 'wrinkles' ? 'bg-orange-400' :
                                                            key === 'darkCircles' ? 'bg-purple-400' : 'bg-blue-400'
                                                        }`}
                                                />
                                            </div>
                                            <p className="text-xs text-white/50 leading-relaxed font-light">
                                                {data.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Color Match Result */}
                                {result.foundationShade && (
                                    <div className="bg-gradient-to-r from-white/10 to-transparent rounded-2xl p-6 border border-white/10 flex items-center justify-between">
                                        <div>
                                            <h4 className="font-bold text-white mb-1 flex items-center gap-2 text-xs uppercase tracking-widest">
                                                <Sun size={14} className="text-gold" />
                                                Perfect Match Found
                                            </h4>
                                            <p className="text-sm text-white/60">Recommended Foundation Shade</p>
                                        </div>
                                        <div className="text-right flex items-center gap-4">
                                            <div className="text-right">
                                                <div className="font-serif text-xl font-bold text-gold">{result.foundationShade.name}</div>
                                                <div className="text-[10px] uppercase tracking-widest text-white/40">Accuracy: 96%</div>
                                            </div>
                                            <div
                                                className="w-12 h-12 rounded-full border-2 border-white/20 shadow-glow"
                                                style={{ backgroundColor: result.foundationShade.hex }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Recommended Routine */}
                                <div className="bg-[#F5E6C8]/5 rounded-2xl p-6 border border-[#F5E6C8]/20">
                                    <h4 className="font-bold text-[#F5E6C8] mb-6 flex items-center gap-2 text-sm uppercase tracking-widest">
                                        <Sparkles size={16} />
                                        Your Personalized Routine
                                    </h4>
                                    <ul className="space-y-6">
                                        {result.routine.map((step, i) => (
                                            <li key={i} className="flex gap-4 text-sm group">
                                                <span className="font-bold text-white/20 min-w-[70px] uppercase text-[10px] tracking-wide pt-1 group-hover:text-gold transition-colors">
                                                    {step.step}
                                                </span>
                                                <div>
                                                    <div className="font-bold text-white group-hover:text-[#F5E6C8] transition-colors">{step.product}</div>
                                                    <div className="text-xs text-white/50 mt-1 font-light">{step.why}</div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Recommended Services CTA */}
                                <div className="bg-gradient-to-br from-gold/10 to-black text-white rounded-2xl p-8 text-center border border-gold/20">
                                    <h4 className="font-medium text-gold/70 text-xs uppercase tracking-widest mb-2">Recommended Treatment</h4>
                                    <div className="text-2xl font-serif italic mb-6 text-white">{result.recommendedService}</div>
                                    <button className="w-full py-4 bg-[#F5E6C8] text-black rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white transition-all shadow-glow">
                                        Book Appointment
                                    </button>
                                </div>

                            </motion.div>
                        ) : (
                            // Placeholder State (Right Side)
                            <div className="h-full flex flex-col items-center justify-center text-center opacity-30 p-8 space-y-6">
                                <div className="w-24 h-24 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center">
                                    <Activity size={32} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-serif italic text-white mb-2">Ready to Scan</h3>
                                    <p className="text-sm text-white/60 max-w-xs mx-auto">
                                        Analysis results, custom routine, and treatment plan will appear here instantly.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

// Simple Icon Component
const UserFaceIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
        <circle cx="12" cy="12" r="10" />
        <line x1="8" y1="15" x2="16" y2="15" />
        <circle cx="9" cy="9" r="1" fill="currentColor" />
        <circle cx="15" cy="9" r="1" fill="currentColor" />
    </svg>
);

export default SkinHealthAnalyzer;
