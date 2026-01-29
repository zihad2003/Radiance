import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, AlertCircle, CheckCircle, ArrowRight, Droplets, Sun, Activity, Moon, X, Scan, Sparkles, FileText } from 'lucide-react';
import { useAction } from 'convex/react';
import { api } from '../../convex/_generated/api';
import SkinAnalysisReport from './skin-analysis/SkinAnalysisReport';
import SkincareAiChat from './skin-analysis/SkincareAiChat';

const SkinHealthAnalyzer = () => {
    const [image, setImage] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [showReport, setShowReport] = useState(false);

    const fileInputRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [cameraActive, setCameraActive] = useState(false);

    const analyzeSkin = useAction(api.skinAnalysis.analyze);

    const [lightingCondition, setLightingCondition] = useState('unknown'); // 'good', 'poor', 'too_bright'
    const brightnessIntervalRef = useRef(null);

    // Camera Cleanup
    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        if (brightnessIntervalRef.current) {
            clearInterval(brightnessIntervalRef.current);
            brightnessIntervalRef.current = null;
        }
        setCameraActive(false);
    };

    // Analyze Lighting
    const checkLighting = () => {
        if (!videoRef.current || !videoRef.current.videoWidth) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 100; // Small sample
        canvas.height = 100;
        ctx.drawImage(videoRef.current, 0, 0, 100, 100);
        const imageData = ctx.getImageData(0, 0, 100, 100);
        const data = imageData.data;

        let r, g, b, avg;
        let colorSum = 0;

        for (let x = 0, len = data.length; x < len; x += 4) {
            r = data[x];
            g = data[x + 1];
            b = data[x + 2];
            avg = Math.floor((r + g + b) / 3);
            colorSum += avg;
        }

        const brightness = Math.floor(colorSum / (data.length / 4));

        if (brightness < 60) setLightingCondition('poor');
        else if (brightness > 200) setLightingCondition('too_bright');
        else setLightingCondition('good');
    };

    // Start Camera
    const startCamera = async () => {
        setError(null);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: 'user'
                }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                // Wait for video to play to confirm stream
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current.play();
                    setCameraActive(true);
                    // Start checking lighting
                    brightnessIntervalRef.current = setInterval(checkLighting, 1000);
                };
            }
        } catch (err) {
            console.error("Camera Error:", err);
            if (err.name === 'NotAllowedError') {
                setError("Camera access denied. Please enable camera permissions in your browser settings.");
            } else if (err.name === 'NotFoundError') {
                setError("No camera device found. Please verify your hardware connection.");
            } else {
                setError("Unable to access camera. Please try uploading a photo instead.");
            }
        }
    };

    // Capture Photo
    const capturePhoto = () => {
        if (!videoRef.current || !canvasRef.current) return;

        if (lightingCondition === 'poor') {
            const proceed = window.confirm("Lighting seems poor. Capture anyway?");
            if (!proceed) return;
        }

        const context = canvasRef.current.getContext('2d');

        // Use video dimensions for better quality or fix to 720p aspect
        const vidW = videoRef.current.videoWidth;
        const vidH = videoRef.current.videoHeight;

        // Square crop from center
        const size = Math.min(vidW, vidH);
        const startX = (vidW - size) / 2;
        const startY = (vidH - size) / 2;

        canvasRef.current.width = 720;
        canvasRef.current.height = 720;

        // Draw cropped image
        context.drawImage(videoRef.current, startX, startY, size, size, 0, 0, 720, 720);

        stopCamera();

        // Get Data URL
        const dataUrl = canvasRef.current.toDataURL('image/jpeg', 0.9);
        setImage(dataUrl);
        handleAnalysis(dataUrl);
    };

    // Handle File Upload
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                // Fit to 720x720 cover
                const size = Math.min(img.width, img.height);
                const startX = (img.width - size) / 2;
                const startY = (img.height - size) / 2;

                canvas.width = 720;
                canvas.height = 720;
                ctx.drawImage(img, startX, startY, size, size, 0, 0, 720, 720);

                const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.9);

                setImage(resizedDataUrl);
                handleAnalysis(resizedDataUrl);
            };
        };
        reader.readAsDataURL(file);
    };

    // Trigger Analysis
    const handleAnalysis = async (imageData) => {
        console.group("🔍 Skin Analysis Process");
        console.time("Analysis Duration");
        console.log("1. Image Captured. Size:", (imageData.length / 1024).toFixed(2), "KB");

        setAnalyzing(true);
        setError(null);
        try {
            console.log("2. Sending to Convex API...");
            const data = await analyzeSkin({ image: imageData });
            console.log("3. API Response Received:", data);

            if (!data) throw new Error("Empty response from analysis");

            setResult(data);
            setShowReport(true);
            console.log("4. Report Generated Successfully");
        } catch (err) {
            console.error("❌ Analysis Failed:", err);
            setError("Analysis failed. Please try again or use a clearer photo.");
        } finally {
            setAnalyzing(false);
            console.timeEnd("Analysis Duration");
            console.groupEnd();
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
        <section className="py-24 bg-[#121110] relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <div className="bento-ribbon mb-6 text-primary w-fit mx-auto">
                        <Activity size={12} />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">AI Health Check</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-sans font-black uppercase tracking-tighter mb-6 text-white leading-[0.9]">
                        Advanced <span className="text-primary italic font-serif">Skin Analysis</span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto font-bold uppercase tracking-widest text-[10px] opacity-80 leading-relaxed">
                        Upload a close-up selfie to detect specialized skin concerns and get a medically-graded treatment plan tailored just for you.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto bento-card p-0 overflow-hidden min-h-[600px] flex flex-col md:flex-row relative bg-[#0A0A0A] border border-white/5 shadow-2xl">

                    {/* Left Side: Input / Image */}
                    <div className="md:w-1/2 bg-white/5 relative flex flex-col items-center justify-center p-12 border-b md:border-b-0 md:border-r border-white/5">

                        {/* Camera View */}
                        <AnimatePresence>
                            {cameraActive && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-20 bg-black flex items-center justify-center"
                                >
                                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover scale-x-[-1]" />

                                    {/* Lighting Indicator */}
                                    <div className={`absolute top-6 left-6 px-4 py-2 rounded-full backdrop-blur-md border flex items-center gap-2 z-30 transition-colors ${lightingCondition === 'poor' ? 'bg-red-500/20 border-red-500/50 text-red-200' :
                                        lightingCondition === 'too_bright' ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-200' :
                                            'bg-green-500/20 border-green-500/50 text-green-200'
                                        }`}>
                                        {lightingCondition === 'poor' ? <Moon size={14} /> : <Sun size={14} />}
                                        <span className="text-[10px] font-black uppercase tracking-widest">
                                            {lightingCondition === 'poor' ? 'Low Light' :
                                                lightingCondition === 'too_bright' ? 'Too Bright' : 'Lighting Good'}
                                        </span>
                                    </div>

                                    {/* Scanning Overlay */}
                                    <div className="absolute inset-0 border-[2px] border-primary/30 opacity-50 m-8 rounded-[3rem] pointer-events-none">
                                        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-[2rem]" />
                                        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-[2rem]" />
                                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-[2rem]" />
                                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-[2rem]" />

                                        {/* Center Face Guide */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-64 border-2 border-dashed border-white/20 rounded-[50%] opacity-50" />
                                    </div>

                                    <button
                                        onClick={capturePhoto}
                                        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full border-4 border-white/20 shadow-glow hover:scale-110 transition-transform flex items-center justify-center cursor-pointer z-30"
                                    >
                                        <div className="w-12 h-12 bg-primary rounded-full border border-black/10" />
                                    </button>

                                    <button
                                        onClick={stopCamera}
                                        className="absolute top-6 right-6 bg-black/50 p-3 rounded-full text-white/70 hover:text-white hover:bg-black/70 transition-all z-30"
                                    >
                                        <X size={20} />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Display Image or Placeholder */}
                        {image ? (
                            <div className="relative w-full h-full min-h-[400px]">
                                <img src={image} alt="Selfie" className="w-full h-full object-cover rounded-[2rem] border border-white/10" />
                                {analyzing && (
                                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center rounded-[2rem] border border-white/10">
                                        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6" />
                                        <p className="font-black text-primary animate-pulse tracking-[0.2em] text-[10px] uppercase">Scanning Dermis...</p>
                                        <p className="text-white/40 text-[9px] mt-2 uppercase tracking-wider font-bold">Analyzing micro-texture</p>
                                    </div>
                                )}
                                {!analyzing && (
                                    <button
                                        onClick={reset}
                                        className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-red-900/50 text-white/70 hover:text-red-400 transition-all z-10 border border-white/10"
                                    >
                                        <X size={18} />
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="text-center space-y-8 w-full max-w-sm">
                                <div className="w-28 h-28 bg-white/5 rounded-full flex items-center justify-center shadow-2xl mx-auto mb-4 border border-white/10 group-hover:bg-primary/20 transition-all">
                                    <Scan size={36} className="text-primary animate-pulse" />
                                </div>

                                <div className="flex flex-col gap-4 w-full relative z-10">
                                    <button
                                        onClick={startCamera}
                                        className="w-full py-4 bg-white text-black rounded-xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-3 shadow-xl"
                                    >
                                        <Camera size={16} />
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
                                            className="w-full py-4 bg-transparent border border-white/10 text-white rounded-xl font-black uppercase tracking-[0.2em] text-[10px] hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-3"
                                        >
                                            <Upload size={16} />
                                            Upload Image
                                        </button>
                                    </div>
                                </div>
                                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                                    <CheckCircle size={12} className="text-primary" />
                                    Encrypted & Private Analysis
                                </p>
                            </div>
                        )}

                        {/* Canvas for processing */}
                        <canvas ref={canvasRef} className="hidden" />
                    </div>

                    {/* Right Side: Results */}
                    <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto max-h-[800px] custom-scrollbar bg-[#0A0A0A]">
                        {result ? (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-8"
                            >
                                {/* Header Stats */}
                                <div className="border-b border-white/10 pb-6 mb-6">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="grid grid-cols-2 gap-4 flex-1 mr-4">
                                            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                                <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-1">Skin Type</p>
                                                <h3 className="text-2xl font-serif text-white italic">{result.skinType || 'Unknown'}</h3>
                                            </div>
                                            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                                <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-1">Est. Age</p>
                                                <h3 className="text-2xl font-serif text-white italic">{result.agePrediction || '--'} <span className="text-sm not-italic opacity-50">years</span></h3>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setShowReport(true)}
                                            className="p-3 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 text-primary transition-all group"
                                            title="View Full Report"
                                        >
                                            <FileText size={20} className="group-hover:scale-110 transition-transform" />
                                        </button>
                                    </div>
                                </div>

                                {/* Vital Metrics */}
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Vital Signs</h4>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <div className="flex justify-between text-xs mb-2">
                                                <span className="text-blue-300 font-bold uppercase tracking-wider">Hydration</span>
                                                <span className="text-white">{result.skinHydration?.score}%</span>
                                            </div>
                                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${result.skinHydration?.score}%` }}
                                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                                    className="h-full bg-blue-500 rounded-full"
                                                />
                                            </div>
                                            <p className="text-[9px] text-gray-500 mt-1">{result.skinHydration?.level}</p>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-xs mb-2">
                                                <span className="text-yellow-300 font-bold uppercase tracking-wider">Radiance</span>
                                                <span className="text-white">{result.skinRadiance?.score}%</span>
                                            </div>
                                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${result.skinRadiance?.score}%` }}
                                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                                    className="h-full bg-yellow-500 rounded-full"
                                                />
                                            </div>
                                            <p className="text-[9px] text-gray-500 mt-1">{result.skinRadiance?.level}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Concerns Grid */}
                                <div>
                                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4">Detailed Analysis</h4>
                                    <div className="space-y-4">
                                        {Object.entries(result.concerns).map(([key, data]) => (
                                            <div key={key} className="bg-white/5 border border-white/5 rounded-2xl p-5 hover:border-primary/20 transition-all">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-black/40 rounded-full text-white/80">
                                                            {getConcernIcon(key)}
                                                        </div>
                                                        <div>
                                                            <span className="font-bold capitalize block text-sm text-white mb-0.5">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                                            <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{data.level}</span>
                                                        </div>
                                                    </div>
                                                    <span className={`text-lg font-serif italic ${data.score > 50 ? 'text-red-400' : 'text-green-400'}`}>
                                                        {data.score}%
                                                    </span>
                                                </div>
                                                <p className="text-[10px] text-gray-400 leading-relaxed font-medium">
                                                    {data.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Face Map */}
                                {result.faceMap && (
                                    <div className="bg-[#151515] rounded-2xl p-6 border border-white/10">
                                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                                            <Scan size={14} /> Regional Analysis
                                        </h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            {Object.entries(result.faceMap).map(([area, issues]) => (
                                                <div key={area} className="text-xs">
                                                    <span className="uppercase text-white/50 font-black tracking-widest text-[9px] block mb-1">{area}</span>
                                                    <div className="flex flex-wrap gap-1">
                                                        {issues.map((issue, idx) => (
                                                            <span key={idx} className="bg-white/5 text-white/90 px-2 py-1 rounded-md text-[10px] font-bold border border-white/5">
                                                                {issue}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Color Match Result */}
                                {result.foundationShade && (
                                    <div className="bg-gradient-to-r from-white/5 to-transparent rounded-2xl p-6 border border-white/10 flex items-center justify-between">
                                        <div>
                                            <h4 className="font-bold text-white mb-1 flex items-center gap-2 text-xs uppercase tracking-widest">
                                                <Sun size={14} className="text-primary" />
                                                Perfect Match Found
                                            </h4>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Recommended Foundation Shade</p>
                                        </div>
                                        <div className="text-right flex items-center gap-4">
                                            <div className="text-right">
                                                <div className="font-serif text-xl font-bold text-primary">{result.foundationShade.name}</div>
                                                <div className="text-[9px] font-black uppercase tracking-widest text-gray-600">Accuracy: 96%</div>
                                            </div>
                                            <div
                                                className="w-10 h-10 rounded-full border border-white/20 shadow-lg ring-2 ring-white/10"
                                                style={{ backgroundColor: result.foundationShade.hex }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Recommended Routine */}
                                <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
                                    <h4 className="font-black text-primary mb-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em]">
                                        <Sparkles size={14} />
                                        Your Personalized Routine
                                    </h4>
                                    <ul className="space-y-6">
                                        {result.routine.map((step, i) => (
                                            <li key={i} className="flex gap-4 text-sm group">
                                                <span className="font-black text-primary/40 min-w-[30px] text-lg pt-1 group-hover:text-primary transition-colors">
                                                    0{i + 1}
                                                </span>
                                                <div>
                                                    <div className="font-bold text-white uppercase text-xs tracking-wider group-hover:text-primary transition-colors">{step.product}</div>
                                                    <div className="text-[10px] text-gray-500 mt-1 font-medium leading-relaxed uppercase tracking-wide">{step.why}</div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Recommended Services CTA */}
                                <div className="bg-gradient-to-br from-[#121110] to-black text-white rounded-2xl p-8 text-center border border-white/10 shadow-lg">
                                    <h4 className="font-bold text-gray-500 text-[9px] uppercase tracking-[0.3em] mb-4">Recommended Treatment</h4>
                                    <div className="text-2xl font-serif italic mb-8 text-white">{result.recommendedService}</div>
                                    <button className="w-full py-4 bg-white text-black rounded-xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-primary hover:text-white transition-all shadow-xl">
                                        Book Appointment
                                    </button>
                                </div>

                            </motion.div>
                        ) : (
                            // Placeholder State (Right Side)
                            <div className="h-full flex flex-col items-center justify-center text-center opacity-30 p-8 space-y-6">
                                <div className="w-20 h-20 rounded-full border border-dashed border-white/30 flex items-center justify-center">
                                    <Activity size={24} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-serif italic text-white mb-2">Ready to Scan</h3>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest max-w-xs mx-auto leading-relaxed">
                                        Analysis results, custom routine, and treatment plan will appear here instantly.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Full Report Modal */}
            <AnimatePresence>
                {showReport && result && (
                    <SkinAnalysisReport result={result} onClose={() => setShowReport(false)} />
                )}
            </AnimatePresence>

            {/* AI Assistant - Floating Chat */}
            {result && <SkincareAiChat analysisResult={result} />}
        </section>
    );
};

export default SkinHealthAnalyzer;
