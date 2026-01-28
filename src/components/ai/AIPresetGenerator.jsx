import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Sparkles, RefreshCcw, Download, X, Camera, Zap, Cpu } from 'lucide-react';
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
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
            setSelectedImage(reader.result);
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
            const result = await generateMakeover({
                imageUrl: selectedImage,
                prompt: selectedPreset.prompt,
                strength: selectedPreset.strength
            });

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
        <div className="min-h-screen bg-[#121110] py-32 px-6">
            <div className="container mx-auto">
                {/* Header */}
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="bento-ribbon mb-6 text-primary">
                            <Cpu size={14} fill="currentColor" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Neural Artistry Engine v4.2</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-sans font-black text-white mb-6 uppercase tracking-tighter">
                            THE <span className="text-primary italic text-shadow-glow">TRANSFORMER</span>
                        </h2>
                        <p className="text-gray-500 text-[11px] font-bold uppercase tracking-[0.4em] max-w-2xl leading-relaxed">
                            Upload your portrait as a mathematical baseline and let our vision networks synthesize professional artistry in under 12 seconds.
                        </p>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Left Panel - Upload & Controls */}
                    <div className="lg:col-span-4 space-y-8">

                        {/* Upload Area */}
                        <div
                            className={`bento-card p-8 text-center cursor-pointer relative overflow-hidden group border border-white/5 ${previewUrl ? 'bg-[#1A1A1A]' : 'bg-[#1A1A1A] hover:bg-[#252525]'}`}
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
                                <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden">
                                    <img src={previewUrl} alt="Original" className="w-full h-full object-cover opacity-80" />
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="bento-ribbon text-white">
                                            <RefreshCcw size={14} />
                                            <span className="text-[9px] font-black uppercase tracking-[0.2em]">RE-SCAN SOURCE</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="py-16 border-2 border-dashed border-white/5 rounded-[3rem]">
                                    <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-8 text-primary shadow-inner-glow">
                                        <Upload size={32} />
                                    </div>
                                    <h3 className="text-white font-black uppercase tracking-[0.3em] text-xs mb-3">Initialize Source</h3>
                                    <p className="text-gray-500 text-[9px] font-bold uppercase tracking-[0.3em]">DRAG-DROP or CLICK TO SCAN</p>
                                </div>
                            )}
                        </div>

                        {/* Presets Grid */}
                        <div className="bento-card p-10 border border-white/5 overflow-visible">
                            <h3 className="text-white font-black uppercase tracking-tighter text-2xl mb-8 flex items-center gap-4">
                                <Sparkles size={24} className="text-primary" />
                                STYLE MATRIX
                            </h3>
                            <div className="grid grid-cols-2 gap-6 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                                {aiPresets.map(preset => (
                                    <button
                                        key={preset.id}
                                        onClick={() => setSelectedPreset(preset)}
                                        className={`relative rounded-3xl overflow-hidden aspect-square border-2 transition-all text-left group ${selectedPreset.id === preset.id
                                            ? 'border-primary ring-8 ring-primary/10'
                                            : 'border-white/5 hover:border-white/20'
                                            }`}
                                    >
                                        <img src={preset.image} alt={preset.name} className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110 opacity-70" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                                        <div className="absolute bottom-0 left-0 p-4 w-full">
                                            <p className="text-white text-[10px] font-black uppercase tracking-widest truncate">{preset.name}</p>
                                        </div>
                                        {selectedPreset.id === preset.id && (
                                            <div className="absolute top-3 right-3 w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-black shadow-lg">
                                                <Zap size={14} fill="currentColor" />
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
                            className="w-full py-7 bg-white text-black rounded-3xl font-black uppercase tracking-[0.5em] text-[11px] hover:bg-primary hover:text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center gap-5 relative overflow-hidden group shadow-2xl"
                        >
                            {isGenerating && (
                                <motion.div
                                    className="absolute inset-0 bg-primary/30"
                                    initial={{ x: '-100%' }}
                                    animate={{ x: '100%' }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                />
                            )}
                            {isGenerating ? 'SYNTHESIZING LABELS...' : 'EXECUTE TRANSFORMATION'}
                            {!isGenerating && <Sparkles size={18} className="group-hover:rotate-45 transition-transform duration-700" />}
                        </button>
                    </div>

                    {/* Right Panel - Result Viewer */}
                    <div className="lg:col-span-8">
                        <div className="bento-card p-6 h-full min-h-[800px] border border-white/5 relative overflow-hidden group">
                            <div className="relative w-full h-full rounded-[4rem] overflow-hidden bg-[#080808] flex items-center justify-center shadow-2xl">
                                {!selectedImage ? (
                                    <div className="text-center">
                                        <div className="w-32 h-32 bg-white/5 border border-white/5 rounded-[3rem] flex items-center justify-center mx-auto mb-10 text-gray-700">
                                            <Camera size={48} />
                                        </div>
                                        <p className="text-gray-500 text-[11px] font-black uppercase tracking-[0.5em]">Awaiting Baseline Material</p>
                                    </div>
                                ) : !generatedImage ? (
                                    <div className="relative w-full h-full">
                                        <img src={previewUrl} alt="Original" className="w-full h-full object-contain opacity-40 grayscale" />

                                        {/* Loading State Overlay */}
                                        {isGenerating && (
                                            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white p-12 text-center backdrop-blur-md">
                                                <div className="w-32 h-32 border-8 border-primary/20 border-t-primary rounded-full animate-spin mb-10" />
                                                <h3 className="text-4xl font-sans font-black uppercase tracking-tighter mb-6">MAPPING NEURAL LAYERS</h3>
                                                <div className="bento-ribbon mb-6 text-primary">
                                                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Progress: 64%</span>
                                                </div>
                                                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em] max-w-sm leading-loose">
                                                    Our vision engines are applying high-frequency mathematical precision to your portrait baseline.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="relative w-full h-full">
                                        <img src={generatedImage} alt="Generated Makeover" className="w-full h-full object-contain" />

                                        {/* Result Actions Overlay */}
                                        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-6 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-8 group-hover:translate-y-0">
                                            <button className="px-12 py-5 bg-white text-black rounded-3xl font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl hover:bg-primary hover:text-white transition-all flex items-center gap-4">
                                                <Download size={18} /> EXPORT RESULT
                                            </button>
                                            <button
                                                onClick={() => setGeneratedImage(null)}
                                                className="px-12 py-5 bg-black/60 backdrop-blur-2xl border border-white/10 text-white rounded-3xl font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl hover:bg-white/10 transition-all flex items-center gap-4"
                                            >
                                                <RefreshCcw size={18} /> RESET ENGINE
                                            </button>
                                        </div>

                                        <div className="absolute top-12 right-12 bento-notch rounded-[3rem] px-8 py-4 border border-white/10">
                                            <span className="text-white text-[10px] font-black uppercase tracking-[0.4em]">ALGORITHM: <span className="text-primary">{selectedPreset.name}</span></span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {error && (
                                <div className="absolute bottom-12 left-12 right-12 bg-red-950/90 backdrop-blur-2xl border border-red-500/30 text-red-500 p-8 rounded-[3rem] flex items-center gap-6 animate-slide-up shadow-2xl">
                                    <div className="p-4 bg-red-500/20 rounded-2xl text-red-500"><X size={24} /></div>
                                    <p className="text-[11px] font-black uppercase tracking-[0.4em]">{error}</p>
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
