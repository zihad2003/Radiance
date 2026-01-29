import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Scissors, Sparkles, Droplets, Palette, Flower2, Zap, ArrowRight, Star } from 'lucide-react';

const services = [
    {
        id: 1,
        title: "Hair Architecture",
        price: "৳4,000+",
        icon: Scissors,
        image: "/assets/services/hair.png",
        description: "Expert cuts, cinematic coloring, and structural styling tailored to your unique anatomical baseline."
    },
    {
        id: 2,
        title: "Makeup Artistry",
        price: "৳8,000+",
        icon: Sparkles,
        image: "/assets/services/makeup.png",
        description: "High-definition, camera-ready aesthetics for your special legacy or high-profile appearances."
    },
    {
        id: 3,
        title: "Skin Intelligence",
        price: "৳4,500+",
        icon: Droplets,
        image: "/assets/services/skin.png",
        description: "Rejuvenating cellular treatments and dermatological protocols for a luminous, healthy glow."
    },
    {
        id: 4,
        title: "Nail Studio",
        price: "৳2,000+",
        icon: Palette,
        image: "/assets/services/nails.png",
        description: "Structural nail engineering and bespoke artisanal designs for hands and feet."
    },
    {
        id: 5,
        title: "Eye Contour",
        price: "৳800+",
        icon: Zap,
        image: "/assets/services/threading.png",
        description: "Precision lash architecture and brow sculpting to frame your visual identity."
    },
    {
        id: 6,
        title: "Spa Protocol",
        price: "৳6,000+",
        icon: Flower2,
        image: "/assets/services/spa.png",
        description: "Deep tissue realignment and sensory restoration bodies in high-performance environments."
    }
];

import Image from './ui/Image';

const ServiceCard = ({ service, onBook }) => {
    const Icon = service.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bento-card min-w-[350px] md:min-w-[400px] h-[550px] flex flex-col justify-end p-10 group cursor-pointer snap-center relative mx-4"
        >
            {/* Background Visual */}
            <div className="absolute inset-0 overflow-hidden">
                <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-[#121110]/20 to-transparent" />
            </div>

            {/* Corner Icon */}
            <div className="absolute top-0 right-0 bento-notch rounded-tl-none rounded-br-none rounded-bl-[4rem]">
                <div className="w-12 h-12 bg-white/5 backdrop-blur-2xl rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                    <Icon size={24} />
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10">
                <div className="bento-ribbon mb-6 text-primary">
                    <Star size={12} fill="currentColor" />
                    <span className="text-[9px] font-black uppercase tracking-[0.4em]">{service.price} BASE</span>
                </div>
                <h3 className="text-4xl font-sans font-black text-white mb-6 uppercase tracking-tighter leading-[0.9]">
                    {service.title}
                </h3>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-10 leading-relaxed max-w-[280px]">
                    {service.description}
                </p>

                <button
                    onClick={() => onBook && onBook(service.title)}
                    className="flex items-center gap-4 group/btn"
                >
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.3em] group-hover/btn:text-primary transition-colors">INITIATE SESSION</span>
                    <div className="w-10 h-10 border border-white/10 rounded-xl flex items-center justify-center group-hover/btn:border-primary transition-all">
                        <ArrowRight size={16} className="text-white group-hover/btn:text-primary group-hover/btn:translate-x-1 transition-all" />
                    </div>
                </button>
            </div>
        </motion.div>
    );
};

const Services = ({ onBook }) => {
    return (
        <section id="services" className="py-32 bg-[#121110] relative overflow-hidden">
            {/* Subtle Texture/Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

            <div className="container mx-auto px-6 mb-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="max-w-2xl">
                        <div className="bento-ribbon mb-8 text-primary">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Expertise Matrix</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-sans font-black text-white uppercase tracking-tighter leading-[0.8] mb-8">
                            SURGICAL <br />
                            <span className="text-primary italic">PRECISION</span>
                        </h2>
                        <p className="text-gray-500 text-[12px] font-bold uppercase tracking-[0.4em] leading-relaxed max-w-lg">
                            Each procedure is calibrated to your individual biometric profile using high-performance international artistry.
                        </p>
                    </div>
                    <div className="hidden lg:block">
                        <div className="p-8 bento-card border-primary/20 bg-primary/5">
                            <span className="text-primary font-black text-5xl tracking-tighter">06</span>
                            <p className="text-white text-[9px] font-black uppercase tracking-[0.3em] mt-2">Specialized Pillars</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Horizontal Carousel */}
            <div className="overflow-x-auto pb-16 pt-4 hide-scrollbar cursor-grab active:cursor-grabbing">
                <div className="flex space-x-0 w-max px-6">
                    {services.map((service) => (
                        <ServiceCard key={service.id} service={service} onBook={onBook} />
                    ))}
                </div>
            </div>

            {/* Scroll Indicator Notch */}
            <div className="container mx-auto px-6">
                <div className="flex items-center gap-4 opacity-20">
                    <div className="h-px flex-1 bg-white" />
                    <span className="text-[8px] font-black uppercase tracking-[0.5em] text-white">Slide to Analyze</span>
                    <div className="h-px flex-1 bg-white" />
                </div>
            </div>
        </section>
    );
};

export default Services;
