import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Sparkles, RefreshCcw, Download, X, Camera, Zap } from 'lucide-react';
import { useAction } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { aiPresets } from '../../data/aiPresets';

const AIPresetGenerator = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [generatedImage, setGeneratedImage] = useState(null);
    const [selectedPreset, setSelectedPreset] = useState(aiPresets[0]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState(null);

    // Convex Action
    const generateMakeover = useAction(api.ai.generateMakeover);

    const fileInputRef = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            processFile(file);
        }
    };

    const processFile = (file) => {
        // Create local preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
            setSelectedImage(reader.result); // In a real app, this should be an uploaded URL (e.g., to S3 or Convex Storage) for the API to access.
            // For Replicate, we can pass base64 data URI directly often, or we need to upload first.
            // Replicate accepts data URIs.
            setGeneratedImage(null);
            setError(null);
        };
        reader.readAsDataURL(file);
    };

    const handleGenerate = async () => {
        if (!selectedImage) return;
        setIsGenerating(true);
        setError(null);

        try {
            // Call Replicate via Convex
            const result = await generateMakeover({
                imageUrl: selectedImage, // Sending Data URI
                prompt: selectedPreset.prompt,
                strength: selectedPreset.strength
            });

            // Replicate usually returns an array of output URLs
            if (result && result.length > 0) {
                setGeneratedImage(result[0]);
            } else {
                throw new Error("No image generated");
            }
        } catch (err) {
            console.error("Generation failed:", err);
            setError("Failed to generate makeover. Please ensure the backend is configured securely.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) processFile(file);
    };

    return (
        <div className="min-h-screen bg-[#FFF9F5] py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block"
                    >
                        <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-4">
                            AI Beauty <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Makeover</span>
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Upload your photo and let our AI transform your look with professional makeup styles in seconds.
                        </p>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Left Panel - Upload & Controls */}
                    <div className="lg:col-span-4 space-y-6">

                        {/* Upload Area */}
                        <div
                            className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all cursor-pointer relative overflow-hidden group ${previewUrl ? 'border-primary bg-white' : 'border-gray-300 hover:border-primary bg-white'
                                }`}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current.click()}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />

                            {previewUrl ? (
                                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                                    <img src={previewUrl} alt="Original" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <p className="text-white font-medium flex items-center gap-2">
                                            <RefreshCcw size={18} /> Change Photo
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="py-12">
                                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                                        <Upload size={32} />
                                    </div>
                                    <h3 className="font-semibold text-charcoal mb-2">Upload your photo</h3>
                                    <p className="text-sm text-gray-500 mb-4">Drag & drop or Click to Browse</p>
                                    <span className="text-xs text-gray-400">Supported formats: JPG, PNG</span>
                                </div>
                            )}
                        </div>

                        {/* Presets Grid */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            <h3 className="font-semibold text-charcoal mb-4 flex items-center gap-2">
                                <Sparkles size={18} className="text-primary" />
                                Select Look
                            </h3>
                            <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {aiPresets.map(preset => (
                                    <button
                                        key={preset.id}
                                        onClick={() => setSelectedPreset(preset)}
                                        className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all text-left group ${selectedPreset.id === preset.id
                                                ? 'border-primary ring-2 ring-primary/20 scale-95'
                                                : 'border-transparent hover:border-gray-200'
                                            }`}
                                    >
                                        <img src={preset.image} alt={preset.name} className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                        <div className="absolute bottom-0 left-0 p-3 w-full">
                                            <p className="text-white text-sm font-semibold truncate">{preset.name}</p>
                                        </div>
                                        {selectedPreset.id === preset.id && (
                                            <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white">
                                                <Zap size={12} fill="currentColor" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Generate Button */}
                        <button
                            onClick={handleGenerate}
                            disabled={!selectedImage || isGenerating}
                            className="w-full py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden"
                        >
                            {isGenerating && (
                                <motion.div
                                    className="absolute inset-0 bg-white/20"
                                    initial={{ x: '-100%' }}
                                    animate={{ x: '100%' }}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                />
                            )}
                            {isGenerating ? 'Designing your look...' : 'Generate Transformation ✨'}
                        </button>
                    </div>

                    {/* Right Panel - Result Viewer */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-[2.5rem] p-4 h-full min-h-[600px] shadow-xl border border-white relative overflow-hidden">

                            {/* Comparison View (Before / After Logic could go here, simplistic for now) */}
                            <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-gray-50 flex items-center justify-center">
                                {!selectedImage ? (
                                    <div className="text-center text-gray-400">
                                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Camera size={40} />
                                        </div>
                                        <p>Upload a photo to start the magic</p>
                                    </div>
                                ) : !generatedImage ? (
                                    <div className="relative w-full h-full">
                                        <img src={previewUrl} alt="Original" className="w-full h-full object-contain" />

                                        {/* Loading State Overlay */}
                                        {isGenerating && (
                                            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                                                <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6" />
                                                <p className="text-xl font-light tracking-wide animate-pulse">AI is applying makeup...</p>
                                                <p className="text-sm opacity-70 mt-2">This usually takes about 10-15 seconds</p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="relative w-full h-full group">
                                        {/* Result */}
                                        <img src={generatedImage} alt="Generated Makeover" className="w-full h-full object-contain" />

                                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="px-6 py-3 bg-white text-charcoal rounded-full font-semibold shadow-lg hover:bg-gray-50 flex items-center gap-2">
                                                <Download size={18} /> Download
                                            </button>
                                            <button
                                                onClick={() => setGeneratedImage(null)}
                                                className="px-6 py-3 bg-charcoal text-white rounded-full font-semibold shadow-lg hover:bg-black flex items-center gap-2"
                                            >
                                                <RefreshCcw size={18} /> Try Another
                                            </button>
                                        </div>

                                        <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-medium border border-white/30">
                                            Style: {selectedPreset.name}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {error && (
                                <div className="absolute bottom-6 left-6 right-6 bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl flex items-center gap-3 animate-slide-up">
                                    <div className="p-2 bg-red-100 rounded-full"><X size={16} /></div>
                                    {error}
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIPresetGenerator;
