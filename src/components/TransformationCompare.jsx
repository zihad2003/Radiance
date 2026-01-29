import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactCompareSlider, ReactCompareSliderHandle } from 'react-compare-slider';
import { Sparkles, Star, ShieldCheck, Zap, ArrowRight, Camera } from 'lucide-react';
import Image from './ui/Image';

const COMPARISON_ITEMS = [
    {
        id: 1,
        title: "The Royal Bridal Glow",
        description: "From natural beauty to a high-definition masterpiece. We preserve your essence while elevating your aura.",
        before: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=800", // Using a consistent bridal portrait
        after: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=800",
        category: "Bridal Artistry",
        stats: { time: "4 Hours", products: "Charlotte Tilbury", rating: 5.0 }
    },
    {
        id: 2,
        title: "Contemporary Party Glam",
        description: "Modern, chic, and long-lasting. Perfect for the high-end events of Dhaka.",
        before: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800", // Using a consistent glamour portrait
        after: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800",
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
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

    return (
        <section id="compare" ref={containerRef} className="py-24 bg-[#121110] relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="bento-ribbon mb-4 text-primary w-fit"
                        >
                            <span className="text-[10px] font-black uppercase tracking-[0.4em]">The Radiance Result</span>
                        </motion.div>
                        <h2 className="text-5xl md:text-7xl font-sans font-black text-white uppercase tracking-tighter leading-[0.9]">
                            Compare Our <span className="text-primary italic font-serif">Artistry</span>
                        </h2>
                        <p className="mt-6 text-white/40 text-lg font-light leading-relaxed max-w-xl">
                            Don't just take our word for it—see the transformation. Slide to reveal how our master artists
                            bring your vision to life with precision and luxury products.
                        </p>
                    </div>
                </div>

                {/* Comparison Grid */}
                <div className="space-y-32">
                    {COMPARISON_ITEMS.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            style={{ scale }}
                            className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
                        >
                            {/* Visual Slider */}
                            <div className="flex-1 w-full relative group">
                                <div className="absolute -inset-4 bg-primary/20 rounded-[4rem] blur-3xl -z-10 transition-opacity opacity-0 group-hover:opacity-100" />
                                <div className="rounded-[3.5rem] overflow-hidden shadow-2xl border border-white/10 bg-[#0A0A0A] relative aspect-[4/3] md:aspect-video bento-card p-0">
                                    <ReactCompareSlider
                                        itemOne={
                                            <div className="w-full h-full relative">
                                                <Image src={item.before} className="w-full h-full object-cover grayscale opacity-80" />
                                                <div className="absolute top-8 left-8 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-white border border-white/10">Natural Canvas</div>
                                            </div>
                                        }
                                        itemTwo={
                                            <div className="w-full h-full relative">
                                                <Image src={item.after} className="w-full h-full object-cover" />
                                                <div className="absolute top-8 right-8 px-4 py-2 bg-primary/90 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-black shadow-lg">The Radiance</div>
                                            </div>
                                        }
                                        handle={<ReactCompareSliderHandle buttonStyle={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(255, 255, 255, 0.9)', border: 'none', color: '#121110', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }} linesStyle={{ opacity: 0.5, width: 2 }} />}
                                    />

                                    {/* Badge */}
                                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/80 backdrop-blur-xl rounded-full shadow-2xl flex items-center gap-3 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <Camera className="text-primary" size={14} />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-white">Slide to Reveal</span>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 space-y-10 text-center lg:text-left">
                                <div className="space-y-4">
                                    <span className="px-4 py-1.5 bg-primary/10 border border-primary/20 text-primary text-[9px] font-black uppercase tracking-widest rounded-full inline-block">{item.category}</span>
                                    <h3 className="text-4xl md:text-6xl font-serif text-white italic">{item.title}</h3>
                                    <p className="text-white/40 leading-relaxed font-light">{item.description}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="p-8 bg-white/5 border border-white/5 rounded-[2rem] group hover:bg-white/10 transition-colors">
                                        <Clock size={20} className="text-white/60 mb-4 group-hover:text-primary transition-colors" />
                                        <p className="text-[9px] font-black uppercase text-white/30 mb-2 tracking-widest">Duration</p>
                                        <p className="text-xl font-serif italic text-white">{item.stats.time}</p>
                                    </div>
                                    <div className="p-8 bg-white/5 border border-white/5 rounded-[2rem] group hover:bg-white/10 transition-colors">
                                        <ShieldCheck size={20} className="text-white/60 mb-4 group-hover:text-primary transition-colors" />
                                        <p className="text-[9px] font-black uppercase text-white/30 mb-2 tracking-widest">Products</p>
                                        <p className="text-xl font-serif italic text-white">{item.stats.products}</p>
                                    </div>
                                </div>

                                <button className="group inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-white hover:text-primary transition-all pt-4 border-b border-transparent hover:border-primary pb-1">
                                    View Detailed Study <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Final CTA Strip */}
                <div className="mt-40 bento-card p-24 bg-[#0A0A0A] border border-white/10  text-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
                        <Zap size={200} className="text-primary" />
                    </div>
                    {/* Ambient Glows */}
                    <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />

                    <div className="relative z-10 flex flex-col items-center">
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-6xl font-serif text-white italic mb-12"
                        >
                            Ready for Your <span className="text-primary underline decoration-white/10 underline-offset-8">Radiance</span> Story?
                        </motion.h3>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <button className="px-12 py-6 bg-primary text-black rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-glow hover:scale-105 transition-all hover:bg-white">
                                Book Now
                            </button>
                            <button className="px-12 py-6 bg-transparent text-white rounded-2xl border border-white/10 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white/5 transition-all">
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
