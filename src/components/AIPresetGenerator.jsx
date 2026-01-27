import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Sparkles, Download, Share2, Calendar, X, Check, Loader2 } from 'lucide-react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

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
            // Simulate AI processing (replace with actual API call)
            setProgress(30);
            await new Promise(resolve => setTimeout(resolve, 1000));

            setProgress(50);
            await new Promise(resolve => setTimeout(resolve, 1000));

            setProgress(70);
            await new Promise(resolve => setTimeout(resolve, 1000));

            setProgress(90);

            // For demo: use the uploaded image as result
            // In production: call your backend API
            setGeneratedResult(uploadedImage);

            setProgress(100);

        } catch (err) {
            console.error('AI Generation failed:', err);
            setError('Failed to generate makeup. Please try again.');
        } finally {
            setLoading(false);
            setTimeout(() => setProgress(0), 500);
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
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                        AI Makeup Generator
                    </h1>
                    <p className="text-xl text-gray-600">
                        Upload your photo and see yourself with professional makeup instantly
                    </p>
                </motion.div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    {/* Upload Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="bg-white rounded-3xl shadow-xl p-8">
                            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                                <Upload className="text-pink-500" />
                                1. Upload Your Photo
                            </h2>

                            {!uploadedImage ? (
                                <label className="flex flex-col items-center justify-center w-full h-96 border-4 border-dashed border-pink-300 rounded-3xl cursor-pointer hover:border-pink-500 transition-all bg-gradient-to-br from-pink-50 to-purple-50 group">
                                    <div className="flex flex-col items-center">
                                        <Upload className="w-16 h-16 text-pink-400 group-hover:text-pink-600 transition-colors" />
                                        <p className="text-lg text-gray-600 mt-4 font-medium">Click to upload your photo</p>
                                        <p className="text-sm text-gray-400 mt-2">JPG, PNG up to 10MB</p>
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
                                <div className="relative">
                                    <img
                                        src={uploadedImage}
                                        alt="Uploaded"
                                        className="w-full h-96 object-cover rounded-3xl shadow-lg"
                                    />
                                    <button
                                        onClick={() => {
                                            setUploadedImage(null);
                                            setGeneratedResult(null);
                                        }}
                                        className="absolute top-4 right-4 bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            )}

                            {error && (
                                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
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
                        <div className="bg-white rounded-3xl shadow-xl p-8">
                            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                                <Sparkles className="text-purple-500" />
                                2. Choose Makeup Style
                            </h2>

                            {/* Category Filter */}
                            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === category
                                                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>

                            {/* Presets Grid */}
                            <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                                {filteredPresets.map(preset => (
                                    <motion.button
                                        key={preset.id}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setSelectedPreset(preset.id)}
                                        className={`relative p-3 rounded-2xl border-2 transition-all ${selectedPreset === preset.id
                                                ? 'border-pink-500 bg-pink-50 shadow-lg'
                                                : 'border-gray-200 hover:border-pink-300'
                                            }`}
                                    >
                                        <div className="relative">
                                            <img
                                                src={preset.thumbnail}
                                                alt={preset.name}
                                                className="w-full h-32 object-cover rounded-xl"
                                            />
                                            {selectedPreset === preset.id && (
                                                <div className="absolute top-2 right-2 bg-pink-500 text-white p-1 rounded-full">
                                                    <Check size={16} />
                                                </div>
                                            )}
                                        </div>
                                        <p className="font-medium text-sm mt-2 text-center">{preset.name}</p>
                                        <p className="text-xs text-gray-500 text-center">৳{preset.price}</p>
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
                    className="text-center mb-12"
                >
                    <button
                        onClick={generateWithAI}
                        disabled={!uploadedImage || !selectedPreset || loading}
                        className="px-12 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xl font-semibold rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-2xl hover:shadow-pink-500/50 transition-all inline-flex items-center gap-3"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={24} />
                                Generating Magic...
                            </>
                        ) : (
                            <>
                                <Sparkles size={24} />
                                Generate AI Makeup
                            </>
                        )}
                    </button>

                    {loading && (
                        <div className="mt-6 max-w-md mx-auto">
                            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    className="bg-gradient-to-r from-pink-500 to-purple-600 h-3 rounded-full"
                                />
                            </div>
                            <p className="text-sm text-gray-600 mt-2">{progress}% Complete</p>
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
                            className="bg-white rounded-3xl shadow-2xl p-8"
                        >
                            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                Your AI Transformation ✨
                            </h2>

                            {/* Before/After Comparison */}
                            <div className="max-w-4xl mx-auto mb-8 rounded-3xl overflow-hidden shadow-2xl">
                                <ReactCompareSlider
                                    itemOne={<ReactCompareSliderImage src={uploadedImage} alt="Before" />}
                                    itemTwo={<ReactCompareSliderImage src={generatedResult} alt="After" />}
                                    style={{ height: '600px' }}
                                />
                            </div>

                            {/* Preset Info */}
                            {selectedPreset && (
                                <div className="max-w-2xl mx-auto mb-8 p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl">
                                    <h3 className="text-xl font-semibold mb-2">
                                        {MAKEUP_PRESETS[selectedPreset].name}
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        {MAKEUP_PRESETS[selectedPreset].description}
                                    </p>
                                    <div className="flex gap-4 text-sm">
                                        <span className="font-medium">Price: ৳{MAKEUP_PRESETS[selectedPreset].price}</span>
                                        <span className="text-gray-500">•</span>
                                        <span className="font-medium">Duration: {MAKEUP_PRESETS[selectedPreset].duration}</span>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-wrap justify-center gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleDownload}
                                    className="px-8 py-3 bg-white border-2 border-pink-500 text-pink-500 rounded-full hover:bg-pink-50 transition-all inline-flex items-center gap-2 font-semibold"
                                >
                                    <Download size={20} />
                                    Download Result
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleShare}
                                    className="px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all inline-flex items-center gap-2 font-semibold"
                                >
                                    <Share2 size={20} />
                                    Share Result
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:shadow-xl transition-all inline-flex items-center gap-2 font-semibold"
                                >
                                    <Calendar size={20} />
                                    Book This Look
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Custom Scrollbar Styles */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, #ec4899, #9333ea);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to bottom, #db2777, #7e22ce);
                }
            `}</style>
        </div>
    );
};

export default AIPresetGenerator;
