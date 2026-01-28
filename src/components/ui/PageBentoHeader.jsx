import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Globe, Zap } from 'lucide-react';

const PageBentoHeader = ({
    title,
    subtitle,
    description,
    image,
    badge,
    stats = []
}) => {
    return (
        <section className="bg-[#121110] pt-32 pb-16">
            <div className="container mx-auto px-6">
                <div className="flex flex-col gap-8">
                    {/* Primary Page Card */}
                    <div className="bento-card min-h-[500px] flex flex-col justify-center p-10 md:p-24 relative group overflow-hidden">
                        {/* Status Notch - Matching Home Style */}
                        <div className="absolute top-0 right-0 bento-notch rounded-tl-none rounded-br-none rounded-bl-[4rem] hidden lg:flex items-center gap-4 z-20">
                            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40">RADIANCE ARCHIVE</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                        </div>

                        <div className="relative z-10 max-w-2xl">
                            {badge && (
                                <div className="bento-ribbon mb-8 text-primary">
                                    <Sparkles size={14} fill="currentColor" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">{badge}</span>
                                </div>
                            )}
                            <h1 className="text-5xl md:text-8xl font-sans font-black text-white leading-[1] mb-8 uppercase tracking-tighter drop-shadow-2xl">
                                {title}
                            </h1>
                            <p className="text-gray-500 text-[11px] font-bold uppercase tracking-[0.4em] max-w-sm mb-12 leading-relaxed opacity-80">
                                {description}
                            </p>
                        </div>

                        {/* Visual Asset Overlay */}
                        {image && (
                            <div className="absolute right-0 bottom-0 top-0 w-full lg:w-[50%] overflow-hidden pointer-events-none rounded-l-[4rem]">
                                <img
                                    src={image}
                                    alt={title}
                                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-all duration-1000 ease-out grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#121110] via-[#121110]/40 to-transparent" />
                            </div>
                        )}
                    </div>

                    {/* Feature Matrix / Stats Row */}
                    {stats.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="bento-card p-12 flex flex-col justify-end group min-h-[300px]">
                                    <div className="relative z-10">
                                        <div className="flex items-baseline gap-4 mb-6">
                                            <span className="text-4xl md:text-6xl font-sans font-black text-white/10 group-hover:text-primary/40 transition-all duration-700">
                                                {stat.value}
                                            </span>
                                            <div className="h-0.5 w-8 bg-white/5" />
                                        </div>
                                        <h3 className="text-2xl font-sans font-bold text-white mb-4 uppercase tracking-tighter">
                                            {stat.label}
                                        </h3>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] leading-relaxed">
                                            {stat.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default PageBentoHeader;
