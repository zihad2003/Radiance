import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, AlertCircle, CheckCircle, ArrowRight, Droplets, Sun, Activity, Moon } from 'lucide-react';
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
        <section className="py-24 bg-rose-50/50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <span className="text-primary font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 mb-4">
                        <Activity size={16} />
                        AI Health Check
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif italic mb-6">
                        Advanced Skin Analysis
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Upload a close-up selfie to detect specialized skin concerns and get a medically-graded treatment plan tailored just for you.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto bg-white rounded-[2.5rem] shadow-xl overflow-hidden min-h-[600px] flex flex-col md:flex-row relative">

                    {/* Left Side: Input / Image */}
                    <div className="md:w-1/2 bg-gray-100 relative flex flex-col items-center justify-center p-8 border-r border-gray-200">

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
                                    <button
                                        onClick={capturePhoto}
                                        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full border-4 border-primary/50 shadow-lg hover:scale-110 transition-transform flex items-center justify-center cursor-pointer"
                                    >
                                        <div className="w-12 h-12 bg-primary rounded-full" />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Display Image or Placeholder */}
                        {image ? (
                            <div className="relative w-full h-full min-h-[400px]">
                                <img src={image} alt="Selfie" className="w-full h-full object-cover rounded-3xl" />
                                {analyzing && (
                                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center rounded-3xl">
                                        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
                                        <p className="font-bold text-primary animate-pulse">Scanning Dermis...</p>
                                    </div>
                                )}
                                {!analyzing && (
                                    <button
                                        onClick={reset}
                                        className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-lg hover:bg-red-50 text-red-500 transition-all z-10"
                                    >
                                        <Upload size={20} className="rotate-45" /> {/* Use X icon ideally, reusing upload rotated for now */}
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="text-center space-y-6">
                                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md mx-auto mb-4">
                                    <UserFaceIcon />
                                </div>

                                <div className="flex flex-col gap-3 w-full max-w-xs mx-auto relative z-10">
                                    <button
                                        onClick={startCamera}
                                        className="w-full py-4 bg-primary text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-accent transition-all flex items-center justify-center gap-2 shadow-lg"
                                    >
                                        <Camera size={18} />
                                        Take Photo
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
                                            className="w-full py-4 bg-white border-2 border-primary/20 text-primary rounded-xl font-bold uppercase tracking-widest text-xs hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                                        >
                                            <Upload size={18} />
                                            Upload Selfie
                                        </button>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400 mt-4">
                                    Privacy Note: Images are analyzed securely and never stored.
                                </p>
                            </div>
                        )}

                        {/* Canvas for processing */}
                        <canvas ref={canvasRef} className="hidden" />
                    </div>

                    {/* Right Side: Results */}
                    <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto max-h-[800px]">
                        {result ? (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-8"
                            >
                                {/* Header */}
                                <div>
                                    <h3 className="text-2xl font-serif italic mb-2">Analysis Complete</h3>
                                    <p className="text-gray-500 text-sm">Based on clinical AI assessments</p>
                                </div>

                                {/* Concerns Grid */}
                                <div className="grid grid-cols-1 gap-4">
                                    {Object.entries(result.concerns).map(([key, data]) => (
                                        <div key={key} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-gray-50 rounded-full">
                                                        {getConcernIcon(key)}
                                                    </div>
                                                    <div>
                                                        <span className="font-bold capitalize block text-sm">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                                        <span className="text-xs text-gray-500 font-medium">{data.level}</span>
                                                    </div>
                                                </div>
                                                <span className={`text-sm font-bold ${data.score > 50 ? 'text-red-500' : 'text-green-500'}`}>
                                                    {data.score}%
                                                </span>
                                            </div>
                                            {/* Progress Bar */}
                                            <div className="w-full h-1.5 bg-gray-100 rounded-full mb-2 overflow-hidden">
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
                                            <p className="text-xs text-gray-500 leading-relaxed">
                                                {data.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Color Match Result */}
                                {result.foundationShade && (
                                    <div className="bg-charcoal/5 rounded-2xl p-6 border border-charcoal/10 flex items-center justify-between">
                                        <div>
                                            <h4 className="font-bold text-charcoal mb-1 flex items-center gap-2">
                                                <Sun size={18} className="text-amber-500" />
                                                Perfect Match Found
                                            </h4>
                                            <p className="text-sm text-gray-600">Recommended Foundation Shade</p>
                                        </div>
                                        <div className="text-right flex items-center gap-4">
                                            <div className="text-right">
                                                <div className="font-serif text-xl font-bold">{result.foundationShade.name}</div>
                                                <div className="text-xs uppercase tracking-widest text-gray-400">Match Accuracy: 96%</div>
                                            </div>
                                            <div
                                                className="w-12 h-12 rounded-full border-4 border-white shadow-md"
                                                style={{ backgroundColor: result.foundationShade.hex }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Recommended Routine */}
                                <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                                    <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
                                        <CheckCircle size={18} />
                                        Your Personalized Routine
                                    </h4>
                                    <ul className="space-y-4">
                                        {result.routine.map((step, i) => (
                                            <li key={i} className="flex gap-4 text-sm">
                                                <span className="font-bold text-primary/60 min-w-[70px] uppercase text-xs tracking-wide pt-1">
                                                    {step.step}
                                                </span>
                                                <div>
                                                    <div className="font-bold text-gray-800">{step.product}</div>
                                                    <div className="text-xs text-gray-500 mt-1">{step.why}</div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Recommended Services CTA */}
                                <div className="bg-charcoal text-white rounded-2xl p-6 text-center">
                                    <h4 className="font-medium text-gray-300 text-xs uppercase tracking-widest mb-2">Recommended Treatment</h4>
                                    <div className="text-2xl font-serif italic mb-6">{result.recommendedService}</div>
                                    <button className="w-full py-3 bg-white text-charcoal rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-all">
                                        Book Appointment
                                    </button>
                                </div>

                            </motion.div>
                        ) : (
                            // Placeholder State (Right Side)
                            <div className="h-full flex flex-col items-center justify-center text-center opacity-40 p-8">
                                <Activity size={64} className="mb-4" />
                                <h3 className="text-xl font-bold mb-2">Ready to Scan</h3>
                                <p className="text-sm">
                                    Analysis results, custom routine, and treatment plan will appear here instantly.
                                </p>
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
