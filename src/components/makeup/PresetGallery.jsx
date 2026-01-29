import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Clock, BarChart, ChevronRight, Eye, ShoppingCart, Heart, Share2, ArrowLeft, Maximize2, Zap } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const PresetGallery = ({ presets, onApply, onDetail }) => {
    const [activeFilter, setActiveFilter] = useState("All");
    const categories = ["All", "Bridal", "Party", "Casual", "Trend"];

    const filtered = activeFilter === "All"
        ? presets
        : presets.filter(p => p.category === activeFilter);

    return (
        <div className="space-y-8">
            {/* Horizontal Filter Bar */}
            <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveFilter(cat)}
                        className={`px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all border
                            ${activeFilter === cat
                                ? 'bg-primary text-white border-primary shadow-glow'
                                : 'bg-white/50 text-gray-400 border-gray-100 hover:border-primary/30'}
                        `}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                <AnimatePresence mode="popLayout">
                    {filtered.map((preset, index) => (
                        <motion.div
                            key={preset.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: index * 0.05 }}
                            className="group relative"
                        >
                            <GlassCard className="overflow-hidden border-none shadow-xl cursor-pointer" onClick={() => onDetail(preset)}>
                                {/* Thumbnail with Hover Animation */}
                                <div className="aspect-[4/5] overflow-hidden relative">
                                    <motion.img
                                        src={preset.thumbnail}
                                        alt={preset.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                                    {/* Badges */}
                                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                                        {preset.trending && (
                                            <span className="bg-primary text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">Trending</span>
                                        )}
                                        <span className={`text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg
                                            ${preset.difficulty === 'Advanced' ? 'bg-red-500 text-white' : preset.difficulty === 'Intermediate' ? 'bg-orange-500 text-white' : 'bg-green-500 text-white'}
                                        `}>
                                            {preset.difficulty}
                                        </span>
                                    </div>

                                    {/* Time Badge (Top Right) */}
                                    <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white text-[9px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                        <Clock size={10} /> {preset.time}
                                    </div>

                                    {/* Hover Actions */}
                                    <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onApply(preset); }}
                                            className="px-6 py-2.5 bg-primary text-white rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-glow hover:scale-105 active:scale-95 transition-all"
                                        >
                                            <Zap size={14} fill="currentColor" /> Try Look
                                        </button>
                                        <button className="p-3 bg-white/20 backdrop-blur-md text-white rounded-full border border-white/20 hover:bg-white/40 transition-all">
                                            <Eye size={16} />
                                        </button>
                                    </div>

                                    {/* Content (Bottom Overlay) */}
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <h4 className="text-xl font-serif text-white mb-1 italic">{preset.name}</h4>
                                        <p className="text-white/60 text-[10px] uppercase tracking-[0.2em] font-bold">{preset.category}</p>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default PresetGallery;
