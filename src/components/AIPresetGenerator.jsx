import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Sparkles, Download, Share2, Calendar, X, Check, Loader2 } from 'lucide-react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { useAction } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useToast } from '../context/ToastContext';

/**
 * Makeup Presets Database
 */
const MAKEUP_PRESETS = {
    bridal_classic: {
        id: 'bridal_classic',
        name: "Classic Bangladeshi Bride",
        category: "Bridal",
        description: "Traditional bridal look with bold red lips and gold accents",
        prompt: "professional bridal makeup, red lipstick, gold eyeshadow, full coverage foundation, dramatic lashes, South Asian bride, studio lighting, 8k uhd, hyperrealistic, flawless skin",
        negativePrompt: "cartoon, anime, illustration, low quality, blurry, deformed, ugly, bad anatomy",
        strength: 0.7,
        thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
        price: 8000,
        duration: "3-4 hours"
    },
    bridal_modern: {
        id: 'bridal_modern',
        name: "Modern Minimalist Bride",
        category: "Bridal",
        description: "Soft, elegant bridal makeup with natural tones",
        prompt: "modern bridal makeup, soft pink lips, natural eyeshadow, dewy skin, elegant, minimalist, professional photography, 8k, photorealistic",
        negativePrompt: "heavy makeup, cartoon, low quality, blurry",
        strength: 0.6,
        thumbnail: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400",
        price: 7000,
        duration: "2-3 hours"
    },
    party_glam: {
        id: 'party_glam',
        name: "Party Glam",
        category: "Party",
        description: "Glamorous evening makeup with smokey eyes",
        prompt: "glamorous party makeup, smokey eyes, glossy lips, highlighted cheeks, evening makeup, professional photography, 8k, dramatic lighting",
        negativePrompt: "cartoonish, unrealistic, deformed, low quality",
        strength: 0.65,
        thumbnail: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400",
        price: 3500,
        duration: "1-2 hours"
    },
    natural_glow: {
        id: 'natural_glow',
        name: "Natural Glow",
        category: "Everyday",
        description: "Fresh, no-makeup makeup look",
        prompt: "natural no-makeup makeup, dewy skin, subtle eyeshadow, nude lips, fresh faced, soft lighting, photorealistic, 8k",
        negativePrompt: "heavy makeup, cartoon, unrealistic",
        strength: 0.4,
        thumbnail: "https://images.unsplash.com/photo-1515688594390-b649af70d282?w=400",
        price: 2000,
        duration: "45 minutes"
    },
    smokey_eyes: {
        id: 'smokey_eyes',
        name: "Smokey Eyes",
        category: "Party",
        description: "Dramatic smokey eye makeup",
        prompt: "dramatic smokey eyes makeup, dark eyeshadow, winged eyeliner, nude lips, professional makeup, 8k, studio lighting",
        negativePrompt: "cartoon, low quality, blurry",
        strength: 0.7,
        thumbnail: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400",
        price: 3000,
        duration: "1 hour"
    },
    festival_colors: {
        id: 'festival_colors',
        name: "Festival Colors",
        category: "Special",
        description: "Vibrant, colorful festival makeup",
        prompt: "colorful festival makeup, vibrant eyeshadow, glitter, bold colors, creative makeup, professional photography, 8k",
        negativePrompt: "dull, boring, low quality",
        strength: 0.75,
        thumbnail: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400",
        price: 4000,
        duration: "2 hours"
    },
    corporate_chic: {
        id: 'corporate_chic',
        name: "Corporate Chic",
        category: "Everyday",
        description: "Professional, polished office look",
        prompt: "professional corporate makeup, natural tones, polished look, subtle eyeshadow, neutral lips, 8k, clean beauty",
        negativePrompt: "heavy makeup, dramatic, cartoon",
        strength: 0.45,
        thumbnail: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400",
        price: 2500,
        duration: "1 hour"
    },
    date_night: {
        id: 'date_night',
        name: "Date Night Romance",
        category: "Party",
        description: "Romantic, soft glam for special evenings",
        prompt: "romantic date night makeup, soft glam, pink tones, glossy lips, highlighted skin, evening makeup, 8k",
        negativePrompt: "heavy, overdone, cartoon",
        strength: 0.6,
        thumbnail: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400",
        price: 3000,
        duration: "1-2 hours"
    }
};

/**
 * AI Preset Generator Component
 */
const AIPresetGenerator = () => {
    const generateMakeover = useAction(api.ai.generateMakeover);
    const { success, error: toastError, info } = useToast();
    const [uploadedImage, setUploadedImage] = useState(null);
    const [selectedPreset, setSelectedPreset] = useState(null);
    const [generatedResult, setGeneratedResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const fileInputRef = useRef(null);

    const categories = ['All', 'Bridal', 'Party', 'Everyday', 'Special'];

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            setError('File size must be less than 10MB');
            return;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setUploadedImage(reader.result);
            setError(null);
        };
        reader.readAsDataURL(file);
    };

    const generateWithAI = async () => {
        if (!uploadedImage || !selectedPreset) return;

        setLoading(true);
        setProgress(10);
        setError(null);

        try {
            const presetData = MAKEUP_PRESETS[selectedPreset];

            // Step 1: Initialize
            setProgress(30);
            info("Connecting to Radiance Neural Engine...");

            // Step 2: Call Convex Action
            // Note: generateMakeover takes { imageUrl, prompt, strength }
            const result = await generateMakeover({
                imageUrl: uploadedImage,
                prompt: presetData.prompt,
                strength: presetData.strength
            });

            setProgress(80);

            if (result && Array.isArray(result) && result.length > 0) {
                setGeneratedResult(result[0]);
                setProgress(100);
                success("AI Transformation Complete!");
            } else {
                throw new Error("No image generated by AI engine");
            }

        } catch (err) {
            console.error('AI Generation failed:', err);
            setError('Neural engine failed to process image. Please check your connection.');
            toastError("Transformation failed. Retrying...");
        } finally {
            setLoading(false);
            setTimeout(() => setProgress(0), 1000);
        }
    };

    const handleDownload = () => {
        if (!generatedResult) return;

        const link = document.createElement('a');
        link.href = generatedResult;
        link.download = `radiance-ai-makeup-${Date.now()}.jpg`;
        link.click();
    };

    const handleShare = async () => {
        if (!generatedResult) return;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'My AI Makeup Transformation',
                    text: 'Check out my AI-generated makeup look from Radiance Beauty Salon!',
                    url: window.location.href
                });
            } catch (err) {
                console.log('Share failed:', err);
            }
        } else {
            // Fallback: copy link
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    const filteredPresets = Object.values(MAKEUP_PRESETS).filter(preset =>
        selectedCategory === 'All' || preset.category === selectedCategory
    );

    return (
        <div className="min-h-screen bg-[#050505] py-20 px-4 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gold/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[150px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <span className="text-gold font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 mb-4 border border-gold/20 w-fit mx-auto px-4 py-1.5 rounded-full bg-gold/5">
                        <Sparkles size={14} />
                        AI Magic Studio
                    </span>
                    <h1 className="text-5xl md:text-6xl font-serif italic mb-6 text-white">
                        AI Makeup <span className="text-gradient-gold">Generator</span>
                    </h1>
                    <p className="text-xl text-white/40 font-light max-w-2xl mx-auto">
                        Upload your photo and witness a professional transformation instantly.
                    </p>
                </motion.div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-8 mb-16">
                    {/* Upload Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="bg-white/5 border border-white/10 rounded-[2rem] shadow-2xl p-8 backdrop-blur-md h-full">
                            <h2 className="text-2xl font-serif italic mb-8 flex items-center gap-3 text-white">
                                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm font-sans not-italic font-bold">1</div>
                                Upload Your Photo
                            </h2>

                            {!uploadedImage ? (
                                <label className="flex flex-col items-center justify-center w-full h-[400px] border-2 border-dashed border-white/10 rounded-3xl cursor-pointer hover:border-gold/50 transition-all bg-black/20 group relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="flex flex-col items-center relative z-10">
                                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                            <Upload className="w-8 h-8 text-white/50 group-hover:text-gold transition-colors" />
                                        </div>
                                        <p className="text-lg text-white/80 font-medium mb-2">Click to upload your photo</p>
                                        <p className="text-sm text-white/40">JPG, PNG up to 10MB</p>
                                    </div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />
                                </label>
                            ) : (
                                <div className="relative h-[400px] group">
                                    <img
                                        src={uploadedImage}
                                        alt="Uploaded"
                                        className="w-full h-full object-cover rounded-3xl shadow-lg border border-white/10"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl flex items-center justify-center">
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wide hover:bg-gold transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"
                                        >
                                            Change Photo
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setUploadedImage(null);
                                            setGeneratedResult(null);
                                        }}
                                        className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white p-3 rounded-full hover:bg-red-500/80 transition-colors shadow-lg border border-white/10"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            )}

                            {error && (
                                <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 flex items-center gap-3">
                                    <X size={18} />
                                    {error}
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Preset Selection */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="bg-white/5 border border-white/10 rounded-[2rem] shadow-2xl p-8 backdrop-blur-md h-full flex flex-col">
                            <h2 className="text-2xl font-serif italic mb-8 flex items-center gap-3 text-white">
                                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm font-sans not-italic font-bold">2</div>
                                Choose Makeup Style
                            </h2>

                            {/* Category Filter */}
                            <div className="flex gap-3 mb-8 overflow-x-auto pb-4 custom-scrollbar">
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all border ${selectedCategory === category
                                            ? 'bg-[#F5E6C8] text-black border-[#F5E6C8] shadow-glow'
                                            : 'bg-transparent text-white/40 border-white/10 hover:border-white/30 hover:text-white'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>

                            {/* Presets Grid */}
                            <div className="grid grid-cols-2 gap-4 overflow-y-auto pr-2 custom-scrollbar flex-grow max-h-[400px]">
                                {filteredPresets.map(preset => (
                                    <motion.button
                                        key={preset.id}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setSelectedPreset(preset.id)}
                                        className={`relative p-3 rounded-2xl border transition-all text-left group overflow-hidden ${selectedPreset === preset.id
                                            ? 'border-gold bg-gold/10 shadow-[0_0_20px_rgba(245,230,200,0.1)]'
                                            : 'border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20'
                                            }`}
                                    >
                                        <div className="relative mb-3 overflow-hidden rounded-xl">
                                            <img
                                                src={preset.thumbnail}
                                                alt={preset.name}
                                                className="w-full h-32 object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            {selectedPreset === preset.id && (
                                                <div className="absolute top-2 right-2 bg-gold text-black p-1.5 rounded-full shadow-lg">
                                                    <Check size={14} strokeWidth={3} />
                                                </div>
                                            )}
                                        </div>
                                        <p className={`font-bold text-sm mb-1 ${selectedPreset === preset.id ? 'text-white' : 'text-white/80'}`}>{preset.name}</p>
                                        <p className="text-xs text-gold/80 font-mono">৳{preset.price}</p>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Generate Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-center mb-16"
                >
                    <button
                        onClick={generateWithAI}
                        disabled={!uploadedImage || !selectedPreset || loading}
                        className="group relative px-12 py-5 bg-[#F5E6C8] text-black text-sm font-bold uppercase tracking-widest rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-all shadow-[0_0_40px_rgba(245,230,200,0.3)] hover:scale-105 inline-flex items-center gap-3 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        <div className="relative flex items-center gap-3">
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Generating Magic...
                                </>
                            ) : (
                                <>
                                    <Sparkles size={20} />
                                    Generate AI Makeup
                                </>
                            )}
                        </div>
                    </button>

                    {loading && (
                        <div className="mt-8 max-w-md mx-auto">
                            <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden border border-white/5">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    className="bg-gradient-to-r from-gold to-white h-full rounded-full shadow-[0_0_10px_rgba(245,230,200,0.5)]"
                                />
                            </div>
                            <p className="text-xs text-gold uppercase tracking-widest mt-4 animate-pulse">{progress}% Complete</p>
                        </div>
                    )}
                </motion.div>

                {/* Result Section */}
                <AnimatePresence>
                    {generatedResult && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white/5 border border-white/10 rounded-[2.5rem] shadow-2xl p-8 backdrop-blur-xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />

                            <h2 className="text-4xl font-serif italic text-center mb-12 text-white">
                                Your <span className="text-gradient-gold">AI Transformation</span> ✨
                            </h2>

                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                {/* Before/After Comparison */}
                                <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative z-10 group">
                                    <ReactCompareSlider
                                        itemOne={<ReactCompareSliderImage src={uploadedImage} alt="Before" />}
                                        itemTwo={<ReactCompareSliderImage src={generatedResult} alt="After" />}
                                        style={{ height: '500px' }}
                                        className="grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                                    />
                                    <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                                        <span className="bg-black/50 text-white text-[10px] px-3 py-1 rounded-full backdrop-blur-md uppercase tracking-widest border border-white/10">Slide to Compare</span>
                                    </div>
                                </div>

                                {/* Details & Actions */}
                                <div className="space-y-8">
                                    {selectedPreset && (
                                        <div className="p-8 bg-white/5 border border-white/5 rounded-3xl backdrop-blur-md">
                                            <h3 className="text-2xl font-serif italic mb-2 text-white">
                                                {MAKEUP_PRESETS[selectedPreset].name}
                                            </h3>
                                            <p className="text-white/60 mb-6 font-light leading-relaxed">
                                                {MAKEUP_PRESETS[selectedPreset].description}
                                            </p>
                                            <div className="flex gap-6 text-sm border-t border-white/5 pt-6">
                                                <div>
                                                    <span className="block text-white/40 text-[10px] uppercase tracking-widest mb-1">Estimated Cost</span>
                                                    <span className="text-xl font-bold text-gold">৳{MAKEUP_PRESETS[selectedPreset].price}</span>
                                                </div>
                                                <div>
                                                    <span className="block text-white/40 text-[10px] uppercase tracking-widest mb-1">Duration</span>
                                                    <span className="text-xl font-bold text-white">{MAKEUP_PRESETS[selectedPreset].duration}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex flex-col gap-4">
                                        <div className="flex gap-4">
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={handleDownload}
                                                className="flex-1 px-6 py-4 bg-transparent border border-white/20 text-white rounded-2xl hover:bg-white/10 hover:border-white/40 transition-all inline-flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest"
                                            >
                                                <Download size={18} />
                                                Save Image
                                            </motion.button>

                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={handleShare}
                                                className="flex-1 px-6 py-4 bg-transparent border border-white/20 text-white rounded-2xl hover:bg-white/10 hover:border-white/40 transition-all inline-flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest"
                                            >
                                                <Share2 size={18} />
                                                Share Look
                                            </motion.button>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full px-6 py-4 bg-[#F5E6C8] text-black rounded-2xl hover:bg-white transition-all inline-flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest shadow-glow"
                                        >
                                            <Calendar size={18} />
                                            Book Appointment for this Look
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Custom Scrollbar Styles */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                    height: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(245, 230, 200, 0.3);
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(245, 230, 200, 0.5);
                }
            `}</style>
        </div>
    );
};

export default AIPresetGenerator;
