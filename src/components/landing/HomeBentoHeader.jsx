import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Plus, Camera, Sparkles, Wand2, Calendar, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomeBentoHeader = ({ onBook }) => {
    return (
        <section className="bg-[#121110] pt-32 pb-16">
            <div className="container mx-auto px-6">
                <div className="flex flex-col gap-8">
                    {/* 1. Primary Hero Card - Adaptive 2-Column feel */}
                    <div className="bento-card min-h-[700px] flex flex-col justify-center p-8 md:p-20 relative group">
                        {/* Status Notch */}
                        <div className="absolute top-0 left-0 bento-notch rounded-tr-none rounded-bl-none rounded-br-[4rem] flex items-center gap-4 z-20">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#121110] bg-gray-800 overflow-hidden">
                                        <img src={`https://i.pravatar.cc/100?u=${i + 10}`} alt="Active" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> 1.2k+ Sessions Active
                            </span>
                        </div>

                        {/* Navigation Notch (Top Right) */}
                        <div className="absolute top-0 right-0 bento-notch rounded-tl-none rounded-br-none rounded-bl-[4rem] hidden lg:flex items-center gap-3 z-20">
                            {[
                                { name: 'Studio', path: '/virtual-try-on' },
                                { name: 'AI Lab', path: '/ai-makeover' },
                                { name: 'Boutique', path: '/shop' }
                            ].map(item => (
                                <Link key={item.name} to={item.path} className="tab-folder">{item.name}</Link>
                            ))}
                        </div>

                        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center h-full">
                            <div className="max-w-2xl">
                                <div className="bento-ribbon mb-8 text-primary">
                                    <Zap size={14} fill="currentColor" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Next-Gen Beauty Intelligence</span>
                                </div>
                                <h1 className="text-6xl md:text-9xl font-sans font-black text-white leading-[0.95] mb-8 uppercase tracking-tighter drop-shadow-2xl">
                                    FUTURE <br />
                                    <span className="text-primary italic">VISIBLE</span>
                                </h1>
                                <p className="text-gray-500 text-[11px] font-bold uppercase tracking-[0.4em] mb-12 leading-relaxed max-w-sm">
                                    Experience the world's most advanced AI-driven personalized makeover engine. Clinical precision meets high-fashion artistry.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <button
                                        onClick={() => onBook()}
                                        className="bg-white text-black px-12 py-5 rounded-3xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-primary hover:text-white transition-all shadow-2xl"
                                    >
                                        RESERVE NOW
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* High-Impact Visual Asset */}
                        <div className="absolute right-0 bottom-0 top-0 w-full lg:w-[65%] overflow-hidden pointer-events-none rounded-l-[4rem]">
                            <img
                                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200"
                                alt="Radiance Hero"
                                className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-all duration-1000 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#121110] via-[#121110]/30 to-transparent" />
                        </div>
                    </div>

                    {/* 2. Asymmetric Secondary Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Large Feature - Span 7 */}
                        <Link to="/virtual-try-on" className="lg:col-span-7 bento-card p-12 min-h-[500px] flex flex-col justify-end group">
                            <div className="absolute inset-0 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1200" className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-all duration-1000" alt="AR" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#000] via-transparent to-transparent" />
                            </div>
                            <div className="relative z-10 max-w-md">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-primary">
                                        <Camera size={24} />
                                    </div>
                                    <div className="h-0.5 w-12 bg-primary/20" />
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.4em]">AR ENGINE V2.0</span>
                                </div>
                                <h3 className="text-4xl md:text-5xl font-sans font-black text-white mb-6 uppercase tracking-tighter">NEURAL MIRROR</h3>
                                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-8 leading-relaxed">468-point spatial mapping for laboratory-grade makeup simulation in 34ms.</p>
                                <div className="flex items-center gap-2 group-hover:gap-4 transition-all">
                                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">START SESSION</span>
                                    <ChevronRight size={16} className="text-primary" />
                                </div>
                            </div>
                        </Link>

                        {/* Nested Mini-Grid - Span 5 */}
                        <div className="lg:col-span-5 flex flex-col gap-8">
                            {/* Top Mini Card */}
                            <Link to="/ai-makeover" className="bento-card flex-1 p-10 flex flex-col group min-h-[250px]">
                                <div className="flex justify-between items-start mb-6">
                                    <Wand2 className="text-primary" size={28} />
                                    <span className="px-4 py-2 bg-primary/10 border border-primary/20 text-primary text-[8px] font-black uppercase tracking-[0.3em] rounded-full">Pro Only</span>
                                </div>
                                <h3 className="text-2xl font-sans font-bold text-white uppercase tracking-tighter mb-4">REIMAGINE</h3>
                                <div className="mt-auto flex items-center gap-4">
                                    <div className="flex -space-x-2">
                                        {[1, 2].map(i => (
                                            <div key={i} className="w-6 h-6 rounded-full border border-[#121110] bg-gray-800" />
                                        ))}
                                    </div>
                                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">50+ New Styles Added</span>
                                </div>
                            </Link>

                            {/* Bottom Mini Card */}
                            <div className="bento-card flex-1 p-10 flex items-center gap-8 bg-primary min-h-[250px]">
                                <div className="flex-1">
                                    <h3 className="text-3xl font-sans font-black text-black uppercase tracking-tighter mb-4">ELITE ACCESS</h3>
                                    <button onClick={() => onBook()} className="bg-black text-white px-8 py-3 rounded-2xl text-[9px] font-black uppercase tracking-[0.3em]">BOOK STUDIO</button>
                                </div>
                                <div className="w-32 h-32 bg-black/10 rounded-[3rem] p-6 flex items-center justify-center">
                                    <Calendar size={48} className="text-black/40" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeBentoHeader;
