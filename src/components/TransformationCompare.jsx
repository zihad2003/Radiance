import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactCompareSlider, ReactCompareSliderHandle } from 'react-compare-slider';
import { Sparkles, Star, ShieldCheck, Zap, ArrowRight, Camera } from 'lucide-react';

const COMPARISON_ITEMS = [
    {
        id: 1,
        title: "The Royal Bridal Glow",
        description: "From natural beauty to a high-definition masterpiece. We preserve your essence while elevating your aura.",
        before: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800",
        after: "https://images.unsplash.com/photo-1594462255122-217f0dbdf24b?q=80&w=800",
        category: "Bridal Artistry",
        stats: { time: "4 Hours", products: "Charlotte Tilbury", rating: 5.0 }
    },
    {
        id: 2,
        title: "Contemporary Party Glam",
        description: "Modern, chic, and long-lasting. Perfect for the high-end events of Dhaka.",
        before: "https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?q=80&w=800",
        after: "https://images.unsplash.com/photo-1522338242992-e1a5a1334641?q=80&w=800",
        category: "High-Fashion",
        stats: { time: "1.5 Hours", products: "MAC Cosmetics", rating: 4.9 }
    }
];

const TransformationCompare = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const rotate = useTransform(scrollYProgress, [0, 0.5], [5, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

    return (
        <section id="compare" ref={containerRef} className="py-24 bg-pearl relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-[120px] -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gold/5 rounded-full blur-[120px] -ml-20 -mb-20" />

            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-primary font-bold tracking-[0.5em] uppercase text-[10px] mb-4 block"
                        >
                            The Radiance Result
                        </motion.span>
                        <h2 className="text-5xl md:text-7xl font-serif text-charcoal italic leading-tight">
                            Compare Our <span className="text-primary">Artistry</span>
                        </h2>
                        <p className="mt-6 text-gray-500 text-lg font-light leading-relaxed">
                            Don't just take our word for it—see the transformation. Slide to reveal how our master artists
                            bring your vision to life with precision and luxury products.
                        </p>
                    </div>
                    <div className="flex gap-4 pb-4">
                        <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
                            <Star className="text-gold" size={24} />
                            <div>
                                <p className="text-[10px] font-black uppercase text-gray-300">Success Rate</p>
                                <p className="text-lg font-black text-charcoal">99.9%</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comparison Grid */}
                <div className="space-y-32">
                    {COMPARISON_ITEMS.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            style={{ rotate: idx % 2 === 0 ? rotate : -rotate, scale }}
                            className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
                        >
                            {/* Visual Slider */}
                            <div className="flex-1 w-full relative">
                                <div className="absolute -inset-4 bg-primary/5 rounded-[4rem] blur-2xl -z-10" />
                                <div className="rounded-[3.5rem] overflow-hidden shadow-3xl border border-white bg-white group relative aspect-[4/3] md:aspect-video">
                                    <ReactCompareSlider
                                        itemOne={
                                            <div className="w-full h-full relative">
                                                <img src={item.before} className="w-full h-full object-cover grayscale" />
                                                <div className="absolute top-8 left-8 p-3 bg-black/40 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest text-white border border-white/10">Natural Canvas</div>
                                            </div>
                                        }
                                        itemTwo={
                                            <div className="w-full h-full relative">
                                                <img src={item.after} className="w-full h-full object-cover" />
                                                <div className="absolute top-8 right-8 p-3 bg-primary/40 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest text-white border border-primary/20">The Transformation</div>
                                            </div>
                                        }
                                        handle={<ReactCompareSliderHandle buttonStyle={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(235, 64, 124, 0.4)', border: '2px solid white' }} />}
                                    />

                                    {/* Badge */}
                                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-2xl flex items-center gap-3 border border-gray-100">
                                        <Camera className="text-primary" size={16} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-charcoal">Slide to Reveal Artistry</span>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 space-y-8">
                                <span className="px-4 py-1.5 bg-gray-100 text-gray-500 text-[9px] font-black uppercase tracking-widest rounded-full">{item.category}</span>
                                <h3 className="text-4xl md:text-5xl font-serif text-charcoal italic">{item.title}</h3>
                                <p className="text-gray-500 leading-relaxed font-light">{item.description}</p>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm">
                                        <Clock size={20} className="text-primary mb-4" />
                                        <p className="text-[9px] font-black uppercase text-gray-400 mb-1">Duration</p>
                                        <p className="text-sm font-bold text-charcoal">{item.stats.time}</p>
                                    </div>
                                    <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm">
                                        <ShieldCheck size={20} className="text-gold mb-4" />
                                        <p className="text-[9px] font-black uppercase text-gray-400 mb-1">Standard</p>
                                        <p className="text-sm font-bold text-charcoal">{item.stats.products}</p>
                                    </div>
                                </div>

                                <button className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-charcoal hover:text-primary transition-all pt-4">
                                    View Detailed Study <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Final CTA Strip */}
                <div className="mt-32 p-12 bg-charcoal rounded-[4rem] text-center relative overflow-hidden shadow-3xl">
                    <div className="absolute top-0 right-0 p-12 opacity-5">
                        <Zap size={200} className="text-white" />
                    </div>
                    <div className="relative z-10 flex flex-col items-center">
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl font-serif text-white italic mb-10"
                        >
                            Ready for Your <span className="text-gold underline decoration-primary underline-offset-8">Radiance</span> Story?
                        </motion.h3>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <button className="px-12 py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-glow hover:scale-105 transition-all">
                                Book Now
                            </button>
                            <button className="px-12 py-5 bg-white/5 text-white rounded-2xl border border-white/10 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white/10 transition-all">
                                Explore Packages
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Clock = ({ size, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

export default TransformationCompare;
