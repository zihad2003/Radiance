import { useState, useRef, useEffect } from 'react';
import { Camera, Upload, RefreshCw, X, Check, Share2, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { initFaceDetection, detectFaceLandmarks, calculateFaceShape, guessGender } from '../../utils/faceDetection';
import { hairstyles, hairColors } from '../../data/hairstyles';

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
        }
    };

    const capturePhoto = () => {
        if (!videoRef.current || !canvasRef.current) return;
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        const img = canvas.toDataURL('image/png');
        setImageSrc(img);
        setMode('preview');
        analyzeImage(video); // Pass video element which has dimensions
    };

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageSrc(e.target.result);
                setMode('preview');
                // We need to create an image element to analyze it
                const img = new Image();
                img.src = e.target.result;
                img.onload = () => analyzeImage(img);
            };
            reader.readAsDataURL(file);
        }
    };

    const analyzeImage = async (imageElement) => {
        if (!detector) return;
        setIsAnalyzing(true);

        try {
            const faces = await detector.estimateFaces(imageElement);
            if (faces.length > 0) {
                const keypoints = faces[0].keypoints;
                const shape = calculateFaceShape(keypoints);
                const gender = guessGender(keypoints); // Heuristic

                // Keep track of face bounds for overlay
                const box = faces[0].box; // {xMin, yMin, width, height}

                setAnalysis({
                    shape,
                    gender,
                    box,
                    keypoints
                });
            } else {
                alert("No face detected. Please try another photo.");
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
        <section className="py-20 bg-pearl min-h-screen relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-sm font-sans uppercase tracking-[0.3em] text-primary mb-4">AI Hair Stylist</h2>
                    <h3 className="text-4xl md:text-5xl font-serif text-charcoal">Find Your Perfect Cut</h3>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-start justify-center">

                    {/* Main Canvas Area */}
                    <motion.div
                        layout
                        className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden relative border-8 border-white"
                    >
                        {!imageSrc && mode !== 'camera' && (
                            <div className="h-[500px] flex flex-col items-center justify-center bg-gray-50 border-dashed border-2 border-gray-200 m-4 rounded-xl">
                                <button onClick={startCamera} className="mb-4 bg-charcoal text-white px-6 py-3 rounded-full flex items-center space-x-2 hover:scale-105 transition-transform">
                                    <Camera size={20} /> <span>Open Camera</span>
                                </button>
                                <span className="text-gray-400 text-sm mb-4">- OR -</span>
                                <button onClick={() => fileInputRef.current.click()} className="text-primary font-bold hover:underline">
                                    Upload Photo
                                </button>
                                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleUpload} />
                            </div>
                        )}

                        {mode === 'camera' && (
                            <div className="relative h-[500px] bg-black">
                                <video ref={videoRef} className="w-full h-full object-cover transform -scale-x-100" />
                                <button onClick={capturePhoto} className="absolute bottom-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center hover:bg-gray-100">
                                    <div className="w-12 h-12 bg-primary rounded-full z-10"></div>
                                </button>
                            </div>
                        )}

                        {imageSrc && (
                            <div className="relative">
                                <img src={imageSrc} alt="User" className="w-full h-auto" />

                                {/* Hairstyle Overlay */}
                                {selectedStyle && analysis && (
                                    <div
                                        className="absolute pointer-events-none"
                                        style={{
                                            // Rough positioning logic based on face box
                                            top: `${analysis.box.yMin - (analysis.box.height * 0.5)}px`,
                                            left: `${analysis.box.xMin - (analysis.box.width * 0.1)}px`,
                                            width: `${analysis.box.width * 1.2}px`,
                                            height: `${analysis.box.height * 1.5}px`,
                                            // This normally requires precise mapping or a 3D model. 
                                            // Using a simple image overlay for "2D Try On" proof of concept.
                                            backgroundImage: `url(${selectedStyle.image})`, // In real app, these are transparent PNGs of hair
                                            backgroundSize: 'contain',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'center top',
                                            filter: selectedColor ? `sepia(1) hue-rotate(${parseInt(selectedColor.hex.slice(1), 16) % 360}deg) saturate(2)` : 'none', // Simple tint hack
                                            opacity: 0.9
                                        }}
                                    ></div>
                                )}

                                <button
                                    onClick={() => { setImageSrc(null); setMode('upload'); setAnalysis(null); }}
                                    className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-red-500 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        )}
                        <canvas ref={canvasRef} className="hidden" />
                    </motion.div>

                    {/* Controls & Results */}
                    <div className="w-full max-w-md">
                        {isAnalyzing ? (
                            <div className="bg-white p-8 rounded-2xl shadow-lg flex items-center justify-center space-x-4">
                                <RefreshCw className="animate-spin text-primary" />
                                <span className="font-serif text-lg">Analyzing Geometry...</span>
                            </div>
                        ) : analysis ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                {/* Analysis Card */}
                                <div className="bg-white p-6 rounded-2xl shadow-md border border-primary/10">
                                    <h4 className="font-bold text-gray-500 text-xs uppercase tracking-widest mb-4">Face Analysis</h4>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-3xl font-serif text-charcoal capitalize">{analysis.shape}</p>
                                            <p className="text-sm text-primary capitalize">{analysis.gender}</p>
                                        </div>
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                            {/* Icon representing shape could go here */}
                                            <span className="text-2xl">👩</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <p className="text-sm text-gray-600">
                                            For a <strong>{analysis.shape}</strong> face, we recommend styles that
                                            {analysis.shape === 'round' ? ' lengthen the face and add angles.' :
                                                analysis.shape === 'square' ? ' soften the jawline.' :
                                                    analysis.shape === 'oval' ? ' maintain your balanced proportions.' :
                                                        ' balance your features.'}
                                        </p>
                                    </div>
                                </div>

                                {/* Style Selector */}
                                <div>
                                    <h5 className="font-serif text-xl mb-4 text-charcoal">Recommended Styles</h5>
                                    <div className="grid grid-cols-2 gap-4">
                                        {recommendations.slice(0, 4).map(style => (
                                            <div
                                                key={style.id}
                                                onClick={() => setSelectedStyle(style)}
                                                className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${selectedStyle?.id === style.id ? 'border-primary bg-primary/5' : 'border-transparent bg-white hover:border-gray-200'}`}
                                            >
                                                <div className="aspect-square bg-gray-200 rounded-lg mb-2 overflow-hidden">
                                                    {/* In a real app, actual hairstyle thumbnails */}
                                                    <img src={`https://placehold.co/150x150?text=${style.name.split(' ')[0]}`} alt={style.name} className="w-full h-full object-cover" />
                                                </div>
                                                <p className="font-bold text-sm text-charcoal">{style.name}</p>
                                                <p className="text-xs text-gray-500 capitalize">{style.length}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Color Picker */}
                                <div>
                                    <h5 className="font-serif text-xl mb-4 text-charcoal">Try a Color</h5>
                                    <div className="flex flex-wrap gap-2">
                                        {hairColors.map(c => (
                                            <button
                                                key={c.name}
                                                onClick={() => setSelectedColor(c)}
                                                className={`w-8 h-8 rounded-full border-2 ${selectedColor?.name === c.name ? 'border-primary scale-110' : 'border-transparent hover:scale-105'} transition-all shadow-sm`}
                                                style={{ backgroundColor: c.hex }}
                                                title={c.name}
                                            />
                                        ))}
                                    </div>
                                </div>

                            </motion.div>
                        ) : (
                            <div className="bg-white p-8 rounded-2xl shadow-md text-center">
                                <p className="text-gray-500">Upload a photo to unlock your personalized AI hair consultation.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HairstyleFinder;
