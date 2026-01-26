import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, BarChart, ShoppingCart, Heart, Share2, ArrowRight, CheckCircle2, Zap, Palette, User, Maximize2 } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import { ReactCompareSlider, ReactCompareSliderHandle } from 'react-compare-slider';

const PresetDetailModal = ({ preset, onClose, onApply }) => {
    const [activeTab, setActiveTab] = useState("breakdown");
    const [selectedSkinTone, setSelectedSkinTone] = useState(preset.skinTones?.[0] || "medium");

    if (!preset) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 md:p-8 overflow-y-auto"
        >
            <div className="relative w-full max-w-6xl min-h-[80vh] bg-[#fafafa] rounded-[40px] overflow-hidden flex flex-col md:flex-row shadow-3xl">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-3 bg-black/5 hover:bg-black/10 rounded-full text-black z-50 transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Left Side: Visual Preview (Comparison Slider) */}
                <div className="flex-[0.55] bg-neutral-900 relative min-h-[400px]">
                    <ReactCompareSlider
                        itemOne={
                            <div className="w-full h-full p-12 flex flex-col items-center justify-center bg-neutral-800">
                                <img src={preset.thumbnail} className="w-full h-full object-cover scale-110 blur-xl opacity-30 absolute inset-0" alt="background" />
                                <div className="z-10 text-center">
                                    <h5 className="text-white/40 text-xs font-bold tracking-[0.4em] uppercase mb-4">Before</h5>
                                    <div className="w-48 h-48 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-md">
                                        <User size={64} className="text-white/10" />
                                    </div>
                                </div>
                            </div>
                        }
                        itemTwo={
                            <div className="w-full h-full relative overflow-hidden">
                                <img src={preset.thumbnail} className="w-full h-full object-cover" alt={preset.name} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                <div className="absolute bottom-12 left-12">
                                    <h5 className="text-white text-xs font-bold tracking-[0.4em] uppercase mb-1">After</h5>
                                    <span className="bg-primary text-white text-[10px] px-3 py-1 rounded-full">{preset.name} Applied</span>
                                </div>
                            </div>
                        }
                        handle={<ReactCompareSliderHandle buttonStyle={{ backgroundColor: '#DC143C' }} />}
                        className="w-full h-full"
                    />

                    {/* Skin Tone Selector Overlay */}
                    <div className="absolute top-12 left-12 flex flex-col gap-3">
                        {['fair', 'medium', 'deep'].map(tone => (
                            <button
                                key={tone}
                                onClick={() => setSelectedSkinTone(tone)}
                                className={`w-8 h-8 rounded-full border-2 transition-all transform hover:scale-110
                                    ${selectedSkinTone === tone ? 'border-primary ring-4 ring-primary/20 scale-110' : 'border-white/50 opacity-40'}
                                    ${tone === 'fair' ? 'bg-[#FFE5D9]' : tone === 'medium' ? 'bg-[#D9A066]' : 'bg-[#5C3A21]'}
                                `}
                                title={`${tone.charAt(0).toUpperCase() + tone.slice(1)} Skin Tone`}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Side: Detailed Info & Products */}
                <div className="flex-[0.45] flex flex-col p-12 overflow-y-auto max-h-[90vh] custom-scrollbar">
                    <div className="mb-8">
                        <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-[0.3em] mb-3">
                            <Sparkles size={14} /> Recommended for {preset.category}
                        </div>
                        <h2 className="text-4xl font-serif italic text-charcoal mb-4">{preset.name}</h2>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">{preset.description}</p>

                        <div className="flex gap-4">
                            <div className="bg-gray-100 rounded-2xl px-5 py-3 flex items-center gap-3">
                                <div className="p-2 bg-white rounded-lg"><Clock size={16} className="text-primary" /></div>
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase">Time</p>
                                    <p className="text-xs font-bold text-charcoal">{preset.time}</p>
                                </div>
                            </div>
                            <div className="bg-gray-100 rounded-2xl px-5 py-3 flex items-center gap-3">
                                <div className="p-2 bg-white rounded-lg"><BarChart size={16} className="text-orange-500" /></div>
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase">Level</p>
                                    <p className="text-xs font-bold text-charcoal">{preset.difficulty}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="flex gap-8 border-b border-gray-100 mb-8 pb-3">
                        {['breakdown', 'tutorial'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`text-[10px] font-bold uppercase tracking-widest transition-all relative
                                    ${activeTab === tab ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}
                                `}
                            >
                                {tab}
                                {activeTab === tab && <motion.div layoutId="tab-underline" className="absolute -bottom-3 left-0 right-0 h-0.5 bg-primary" />}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="flex-1">
                        {activeTab === 'breakdown' && (
                            <div className="space-y-6">
                                <h5 className="text-xs font-bold uppercase text-gray-300">Product List</h5>
                                {Object.entries(preset.products).map(([category, product]) => (
                                    <div key={category} className="flex items-center gap-4 group cursor-pointer hover:bg-gray-50 p-3 rounded-2xl transition-colors">
                                        <div className="w-12 h-12 rounded-xl border border-gray-100 flex items-center justify-center p-2 bg-white shadow-sm overflow-hidden">
                                            <div className="w-full h-full rounded-md" style={{ background: product.color }} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{category}</p>
                                            <h6 className="font-bold text-charcoal text-sm">{product.name}</h6>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-mono text-gray-400">{Math.round(product.opacity * 100)}%</span>
                                            <button className="p-2 opacity-0 group-hover:opacity-100 text-primary transition-opacity"><Maximize2 size={14} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'tutorial' && (
                            <div className="space-y-6">
                                {preset.steps.map((step, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="flex-none w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs">
                                            {i + 1}
                                        </div>
                                        <p className="text-gray-600 text-sm py-1 leading-relaxed">{step}</p>
                                    </div>
                                ))}
                                <div className="mt-12 p-8 bg-charcoal rounded-3xl text-white relative overflow-hidden group border border-white/5">
                                    <div className="relative z-10">
                                        <h5 className="font-bold text-lg mb-2">Watch Video Masterclass</h5>
                                        <p className="text-white/40 text-xs mb-6">Learn the precise blending techniques for this look from our experts.</p>
                                        <button className="px-6 py-2.5 bg-white text-black rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-xl hover:scale-105 transition-all">
                                            <Zap size={14} fill="currentColor" /> Play Masterclass
                                        </button>
                                    </div>
                                    <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Bottom Sticky Action */}
                    <div className="pt-12 mt-auto flex gap-4">
                        <button
                            onClick={() => { onApply(preset); onClose(); }}
                            className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] shadow-glow hover:bg-primary/80 transition-all flex items-center justify-center gap-3"
                        >
                            <Zap size={18} fill="currentColor" /> Try This Preset Now
                        </button>
                        <button className="p-4 bg-gray-100 text-charcoal rounded-2xl hover:bg-gray-200 transition-colors">
                            <Heart size={20} />
                        </button>
                        <button className="p-4 bg-gray-100 text-charcoal rounded-2xl hover:bg-gray-200 transition-colors">
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PresetDetailModal;
