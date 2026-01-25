import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Scan, Sparkles, X, ChevronRight, ChevronLeft } from 'lucide-react';

const hairstyles = [
    {
        id: 1,
        name: "Bengali Bridal Bun",
        description: "Classic low bun with flower garlands (Gojra). Perfect for weddings.",
        faceShape: "Round",
        img: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Layered Soft Waves",
        description: "Modern, volume-boosting style. Ideal for daily glam.",
        faceShape: "Oval",
        img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Sleek High Pony",
        description: "Chic and professional. Lifts the face structure.",
        faceShape: "Square",
        img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=500&auto=format&fit=crop"
    }
];

const HairstyleAI = () => {
    const [image, setImage] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
                startAnalysis();
            };
            reader.readAsDataURL(file);
        }
    };

    const startAnalysis = () => {
        setIsAnalyzing(true);
        // Simulate AI Processing
        setTimeout(() => {
            setIsAnalyzing(false);
            setAnalysisResult({
                faceShape: "Oval",
                skinTone: "Warm",
                recommendation: "We detected an Oval face structure. Soft waves will frame your face perfectly!"
            });
        }, 3000);
    };

    const reset = () => {
        setImage(null);
        setAnalysisResult(null);
    };

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/20 skew-x-12 transform origin-top-right"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-sans uppercase tracking-[0.3em] text-primary mb-4">AI Consultant</h2>
                    <h3 className="text-4xl md:text-5xl font-serif text-charcoal">Smart Hairstyle Finder</h3>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">

                    {/* Upload / Scan Area */}
                    <motion.div
                        layout
                        className="w-full max-w-md bg-pearl p-8 rounded-3xl border-2 border-dashed border-primary/30 relative"
                    >
                        {!image ? (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="h-80 flex flex-col items-center justify-center cursor-pointer hover:bg-white/50 transition-colors rounded-xl"
                            >
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-6 group">
                                    <Upload className="text-primary w-8 h-8 group-hover:scale-110 transition-transform" />
                                </div>
                                <h4 className="text-xl font-serif text-charcoal mb-2">Upload Selfie</h4>
                                <p className="text-charcoal/60 text-sm text-center px-8">
                                    Click or drag photo here. <br />AI will analyze your face shape.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </div>
                        ) : (
                            <div className="relative h-80 rounded-xl overflow-hidden group">
                                <img src={image} alt="User" className="w-full h-full object-cover" />

                                {isAnalyzing && (
                                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                                        <div className="w-full max-w-[80%] h-1 bg-white/20 rounded-full overflow-hidden mb-4">
                                            <motion.div
                                                className="h-full bg-primary"
                                                initial={{ width: "0%" }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: 3, ease: "linear" }}
                                            />
                                        </div>
                                        <div className="flex items-center space-x-2 text-white font-mono tracking-widest text-xs uppercase animate-pulse">
                                            <Scan size={16} />
                                            <span>Scanning Geometry...</span>
                                        </div>
                                        {/* Scanner Line */}
                                        <motion.div
                                            className="absolute md:top-0 w-full h-[2px] bg-primary/80 shadow-[0_0_15px_rgba(183,110,121,0.8)]"
                                            animate={{ top: ["0%", "100%", "0%"] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        />
                                    </div>
                                )}

                                <button
                                    onClick={reset}
                                    className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors z-20"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        )}
                    </motion.div>

                    {/* Results Area */}
                    <AnimatePresence>
                        {analysisResult && (
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="w-full max-w-lg"
                            >
                                <div className="bg-white p-8 rounded-3xl shadow-xl border border-primary/10">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <Sparkles className="text-gold" />
                                        <h4 className="text-xl font-bold text-charcoal">Analysis Complete</h4>
                                    </div>

                                    <div className="flex space-x-4 mb-8">
                                        <div className="px-4 py-2 bg-secondary/30 rounded-full text-sm font-semibold text-charcoal">
                                            Shape: {analysisResult.faceShape}
                                        </div>
                                        <div className="px-4 py-2 bg-secondary/30 rounded-full text-sm font-semibold text-charcoal">
                                            Tone: {analysisResult.skinTone}
                                        </div>
                                    </div>

                                    <p className="text-charcoal/80 mb-8 leading-relaxed">
                                        {analysisResult.recommendation}
                                    </p>

                                    <div>
                                        <h5 className="font-serif text-lg mb-4 text-primary">Top Recommendations</h5>
                                        <div className="space-y-4">
                                            {hairstyles.map(style => (
                                                <div key={style.id} className="flex items-center bg-pearl p-3 rounded-xl hover:shadow-md transition-shadow cursor-pointer group">
                                                    <img src={style.img} alt={style.name} className="w-16 h-16 rounded-lg object-cover mr-4" />
                                                    <div className="flex-1">
                                                        <h6 className="font-bold text-charcoal group-hover:text-primary transition-colors">{style.name}</h6>
                                                        <p className="text-xs text-charcoal/60">{style.description}</p>
                                                    </div>
                                                    <ChevronRight className="text-gray-400 group-hover:text-primary" size={20} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default HairstyleAI;
