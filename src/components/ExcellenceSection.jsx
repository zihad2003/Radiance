import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
    Trophy, Globe, Verified, Shield, Star,
    Medal, Sparkles, Smartphone, Cpu, Camera,
    RefreshCw, CheckCircle, PlusCircle, Award, Leaf, Zap
} from 'lucide-react';
import Counter from './ui/Counter';

const PILLARS = [
    {
        id: 'stylists',
        title: "Masters of Artistry",
        description: "Our world-class team is the heart of Radiance. Each artist brings years of international training and a passion for transformative beauty.",
        image: "/assets/excellence/team.png",
        icon: Trophy,
        stats: [
            { label: "Experience", value: "15+ Years" },
            { label: "Certified", value: "Global" },
            { label: "Brides", value: "500+" }
        ]
    },
    {
        id: 'products',
        title: "Curated Molecules",
        description: "We use only the finest authentic products from Paris, Milan, and New York, ensuring a flawless finish that respects your skin.",
        image: "/assets/excellence/products.png",
        icon: Globe,
        stats: [
            { label: "Partners", value: "50+" },
            { label: "Authentic", value: "100%" },
            { label: "Safety", value: "Grade-A" }
        ]
    },
    {
        id: 'ai-tech',
        title: "Neural Vision",
        description: "Our cutting-edge face-mesh technology allows you to test hundreds of looks in real-time, matching digital dreams with physical reality.",
        image: "/assets/excellence/ai_tech.png",
        icon: Cpu,
        stats: [
            { label: "Tracking", value: "468-Pts" },
            { label: "Accuracy", value: "99.8%" },
            { label: "Latency", value: "12ms" }
        ]
    },
    {
        id: 'hygiene',
        title: "Clinical Purity",
        description: "Your safety is non-negotiable. We maintain clinical-grade sterility and WHO-compliant protocols in every single application.",
        image: "/assets/excellence/hygiene.png",
        icon: Shield,
        stats: [
            { label: "Sterility", value: "ISO-9001" },
            { label: "Tools", value: "Single-Use" },
            { label: "Grade", value: "Medical" }
        ]
    }
];

const ExcellenceSection = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    return (
        <section ref={containerRef} className="py-24 bg-[#121110] overflow-hidden relative">

            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6">

                {/* --- SECTION HEADER --- */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-12">
                    <div className="max-w-2xl">
                        <div className="bento-ribbon mb-8 text-primary">
                            <Verified size={14} fill="currentColor" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em]">The Radiance Standard</span>
                        </div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-sans font-black text-white leading-[0.9] uppercase tracking-tighter"
                        >
                            ENGINEERED <br />
                            <span className="text-primary italic font-serif">PERFECTION</span>
                        </motion.h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="max-w-sm"
                    >
                        <p className="text-gray-500 text-[11px] font-bold uppercase tracking-[0.3em] leading-relaxed text-right md:text-left">
                            Experience the rare fusion of award-winning expertise, premium international artistry,
                            and cutting-edge AI technology.
                        </p>
                    </motion.div>
                </div>

                {/* --- PILLARS GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                    {PILLARS.map((pillar, idx) => (
                        <PillarCard key={pillar.id} pillar={pillar} index={idx} />
                    ))}
                </div>

                {/* --- TESTIMONIAL TICKER --- */}
                <div className="bento-card p-12 bg-[#0A0A0A] border border-white/5 relative overflow-hidden group hover:border-primary/20 transition-all duration-700">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="lg:w-1/3">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 rounded-full bg-white/5 border border-white/10 text-primary">
                                    <Star size={20} className="fill-current" />
                                </div>
                                <span className="text-4xl font-sans font-black text-white tracking-tighter">4.9/5.0</span>
                            </div>
                            <h3 className="text-2xl font-sans font-bold text-white mb-4 uppercase tracking-tighter">Verified Excellence</h3>
                            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em] leading-relaxed">
                                Based on 2,500+ glowing reviews from our elite clientele across Dhaka.
                            </p>
                        </div>

                        <div className="lg:w-2/3 grid md:grid-cols-2 gap-6">
                            {[
                                { name: "Sadiya Islam", role: "Bridal Client", text: "The AI preview was 100% accurate. My final look was identical to the digital simulation." },
                                { name: "Nabila Khan", role: "VVIP Member", text: "Unmatched hygiene standards. It feels less like a salon and more like a luxury clinic." },
                            ].map((t, i) => (
                                <div key={i} className="bg-white/5 p-8 rounded-3xl border border-white/5 relative group hover:bg-white/10 transition-colors">
                                    <div className="mb-6 flex gap-1 text-primary">
                                        {[1, 2, 3, 4, 5].map(s => <Star key={s} size={10} className="fill-current" />)}
                                    </div>
                                    <p className="text-white text-xs font-medium leading-relaxed mb-6">"{t.text}"</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-black border border-white/10" />
                                        <div>
                                            <p className="text-white text-[10px] font-black uppercase tracking-widest">{t.name}</p>
                                            <p className="text-gray-500 text-[9px] font-bold uppercase tracking-widest">{t.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

const PillarCard = ({ pillar, index }) => {
    const Icon = pillar.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative h-[500px] bento-card p-10 flex flex-col justify-end overflow-hidden bg-[#0A0A0A] border border-white/5 hover:border-primary/50 transition-all duration-700"
        >
            {/* Background Visual */}
            <div className="absolute inset-0">
                <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-70 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-[#121110]/50 to-transparent" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            {/* Static Content */}
            <div className="relative z-10 w-full">
                <div className="absolute top-0 right-0 -mt-[380px] -mr-10">
                    <div className="w-20 h-20 bg-white/5 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/10 group-hover:bg-primary group-hover:text-black transition-all duration-500 group-hover:rotate-12 text-white">
                        <Icon size={32} />
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-4xl font-sans font-black text-white mb-2 uppercase tracking-tighter leading-none group-hover:text-primary transition-colors">
                        {pillar.title}
                    </h3>
                    <div className="w-12 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                </div>

                <p className="text-gray-300 text-[11px] font-bold uppercase tracking-[0.2em] leading-relaxed mb-10 max-w-md opacity-80 group-hover:opacity-100">
                    {pillar.description}
                </p>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                    {pillar.stats.map((stat, i) => (
                        <div key={i}>
                            <p className="text-white font-black text-lg mb-1">{stat.value}</p>
                            <p className="text-[8px] uppercase tracking-widest text-primary font-bold">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default ExcellenceSection;
