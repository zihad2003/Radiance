import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import {
    Trophy, Globe, Verified, Shield, Star,
    Medal, Sparkles, Smartphone, Cpu, Camera,
    RefreshCw, CheckCircle, PlusCircle, Award
} from 'lucide-react';
import GlassCard from './ui/GlassCard';

import Counter from './ui/Counter';
import Image from './ui/Image';

// Removed AnimatedCounter redundant logic to use centralized Counter component

const PILLARS = [
    {
        id: 'stylists',
        title: "Award-Winning Stylists",
        description: "Our world-class team is the heart of Radiance. Each artist brings years of international training and a passion for transformative beauty.",
        image: "team.png",
        icon: Trophy,
        theme: "from-pink-500/80 to-purple-600/80",
        stats: [
            { label: "Experience", value: "15+ Years", icon: Award },
            { label: "Certified", value: "International", icon: Medal },
            { label: "Brides", value: "500+", icon: Star }
        ],
        details: [
            "Trained at London's Visionary Academy",
            "Specialized in South Asian Bridal Artistry",
            "Multiple 'Stylist of the Year' Awards"
        ]
    },
    {
        id: 'products',
        title: "Premium Global Brands",
        description: "We use only the finest authentic products from Paris, Milan, and New York, ensuring a flawless finish that respects your skin.",
        image: "products.png",
        icon: Globe,
        theme: "from-amber-600/80 to-rose-700/80",
        stats: [
            { label: "Brands", value: "50+", icon: Globe },
            { label: "Authenticity", value: "100%", icon: Verified },
            { label: "Safety", value: "CrueltyFree", icon: Sparkles }
        ],
        details: [
            "Official Partners of MAC & L'Oreal Luxe",
            "Dermatologist-tested, high-performance kits",
            "Climate-controlled product storage"
        ]
    },
    {
        id: 'ai-tech',
        title: "AI-Powered Accuracy",
        description: "Our cutting-edge face-mesh technology allows you to test hundreds of looks in real-time, matching digital dreams with physical reality.",
        image: "ai_tech.png",
        icon: Cpu,
        theme: "from-blue-600/80 to-indigo-700/80",
        stats: [
            { label: "Tracking", value: "468-Pts", icon: Camera },
            { label: "Accuracy", value: "95%", icon: RefreshCw },
            { label: "Try-Ons", value: "100+", icon: Smartphone }
        ],
        details: [
            "Real-time shade matching algorithms",
            "Advanced AR light simulation",
            "Precise feature-mesh calibration"
        ]
    },
    {
        id: 'hygiene',
        title: "Gold Standard Hygiene",
        description: "Your safety is non-negotiable. We maintain clinical-grade sterility and WHO-compliant protocols in every single application.",
        image: "hygiene.png",
        icon: Shield,
        theme: "from-teal-500/80 to-emerald-700/80",
        stats: [
            { label: "Sterility", value: "Medical", icon: Shield },
            { label: "Applicators", value: "Single-Use", icon: CheckCircle },
            { label: "Standards", value: "WHO-Grade", icon: PlusCircle }
        ],
        details: [
            "UVC Sterilization for all metal tools",
            "Individually sealed luxury brushes",
            "Contactless hand sanitizing stations"
        ]
    }
];

const ExcellenceSection = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <section ref={containerRef} className="py-24 bg-charcoal overflow-hidden group relative">
            <div className="container mx-auto px-6">

                {/* --- SECTION HEADER --- */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-4 block"
                    >
                        Radiance Distinction
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight italic"
                    >
                        Why Radiance Sets The <br />
                        <span className="bg-gradient-to-r from-primary via-gold to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
                            Standard
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-white/40 text-lg leading-relaxed font-light"
                    >
                        Experience the rare fusion of award-winning expertise, premium international artistry,
                        and cutting-edge AI technology in a clinical-grade environment.
                    </motion.p>
                </div>

                {/* --- EXCELLENCE PILLARS GRID --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {PILLARS.map((pillar, idx) => (
                        <PillarCard key={pillar.id} pillar={pillar} index={idx} parentY={y} />
                    ))}
                </div>

                {/* --- CUSTOMER TESTIMONIAL TICKER --- */}
                <div className="mt-24 pt-16 border-t border-white/5">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
                        <div>
                            <h3 className="text-3xl font-serif text-white italic mb-2">Voices of Radiance</h3>
                            <p className="text-white/40 text-sm">Real stories from our most cherished clients</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-4">
                                <span className="text-3xl font-serif text-gold">4.9/5</span>
                                <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest">
                                    Average Rating <br /> Across 2.5k Reviews
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { name: "Sadiya Islam", role: "Wedding Bride", text: "The AI preview was 100% accurate. My wedding look was exactly what I saw on the screen!", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200" },
                            { name: "Farhan Ahmed", role: "Groom Stylist", text: "Professionalism at its peak. Their hygiene standards made me feel incredibly safe.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200" },
                            { name: "Nabila Khan", role: "Elite Member", text: "The quality of International brands they use is unmatched in Dhaka. Worth every BDT.", img: "https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?q=80&w=200" },
                        ].map((t, i) => (
                            <GlassCard key={i} className="p-6 border-white/5 hover:border-white/10 transition-all group">
                                <div className="flex items-center gap-4 mb-4">
                                    <Image src={t.img} alt={t.name} className="w-12 h-12 rounded-full grayscale group-hover:grayscale-0 transition-all border border-white/10" />
                                    <div>
                                        <h5 className="text-sm font-bold text-white">{t.name}</h5>
                                        <p className="text-[10px] text-primary font-bold uppercase tracking-widest">{t.role}</p>
                                    </div>
                                </div>
                                <p className="text-white/50 text-xs italic leading-relaxed">"{t.text}"</p>
                                <div className="mt-4 flex gap-0.5">
                                    {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={10} className="fill-gold text-gold" />)}
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>

                {/* --- CERTIFICATION STRIP --- */}
                <div className="mt-24 py-12 border-y border-white/5 overflow-hidden flex items-center justify-between opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                    {['L\'OREAL PROFESSIONNEL', 'MAC COSMETICS', 'WHO COMPLIANT', 'GMP CERTIFIED', 'HYGIENE SHIELD'].map((cert, i) => (
                        <span key={i} className="text-xs font-black tracking-[0.5em] text-white whitespace-nowrap">{cert}</span>
                    ))}
                </div>
            </div>
        </section>
    );
};

const PillarCard = ({ pillar, index, parentY }) => {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    // Parallax logic for individual cards
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });
    const imageY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group/card relative h-[600px] rounded-[32px] overflow-hidden cursor-pointer shadow-2xl border border-white/5"
        >
            {/* Background Image with Parallax */}
            <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
                <Image
                    src={`/assets/excellence/${pillar.image}`}
                    alt={pillar.title}
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-1000"
                />
                {/* Theme Based Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${pillar.theme} mix-blend-multiply opacity-60`} />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
            </motion.div>

            {/* Static Content Overlay */}
            <div className="absolute inset-0 p-10 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div className="p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10">
                        <pillar.icon size={28} className="text-white" />
                    </div>
                </div>

                <div className="transform group-hover/card:-translate-y-8 transition-transform duration-500">
                    <h3 className="text-4xl font-serif text-white mb-4 italic leading-tight">{pillar.title}</h3>
                    <p className="text-white/60 text-sm max-w-sm mb-8 line-clamp-2 translate-y-4 opacity-0 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-500 delay-100">
                        {pillar.description}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        {pillar.stats.map((stat, i) => (
                            <div key={i} className="flex flex-col items-center p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                                <stat.icon size={16} className="text-gold mb-2" />
                                <span className="text-white font-bold text-lg leading-none mb-1">
                                    <Counter
                                        from={0}
                                        to={parseInt(stat.value.replace(/[^0-9]/g, '')) || 0}
                                        suffix={stat.value.replace(/[0-9]/g, '')}
                                    />
                                </span>
                                <span className="text-[8px] uppercase tracking-widest text-white/40 font-black">{stat.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Hidden Detail List */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-2 pt-4 border-t border-white/10"
                            >
                                {pillar.details.map((detail, i) => (
                                    <div key={i} className="flex items-center gap-2 text-[10px] text-white uppercase tracking-widest font-bold">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                        {detail}
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Rare Corner Decoration */}
            <div className="absolute top-0 right-0 p-10 overflow-hidden pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity">
                <Sparkles size={80} className="text-white/5 -mr-10 -mt-10" />
            </div>
        </motion.div>
    );
};

export default ExcellenceSection;
