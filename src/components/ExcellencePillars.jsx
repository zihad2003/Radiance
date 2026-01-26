import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Trophy, Heart, Crown } from 'lucide-react';

const stats = [
    { id: 1, label: "Happy Clients", value: "5000+", icon: Heart },
    { id: 2, label: "Awards Won", value: "15", icon: Trophy },
    { id: 3, label: "Years Experience", value: "12+", icon: Crown },
    { id: 4, label: "Premium Products", value: "100%", icon: Sparkles },
];

const ExcellencePillars = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section ref={containerRef} className="py-32 bg-charcoal text-white relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

            {/* Floating Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px] pointer-events-none" />


            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-24"
                >
                    <h2 className="text-sm font-sans uppercase tracking-[0.3em] text-gold mb-6">Why Choose Us</h2>
                    <h3 className="text-5xl md:text-7xl font-serif text-white mb-6">Redefining Beauty <br /> Standard</h3>
                    <p className="max-w-2xl mx-auto text-white/60 text-lg font-light leading-relaxed">
                        We don't just offer services; we curate experiences. Our four pillars of excellence ensure that every visit is a step towards your most radiant self.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer"
                        >
                            {/* Background Image - Theme Matched */}
                            <div className="absolute inset-0">
                                <img
                                    src={[
                                        "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop", // Pink/Salon
                                        "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop", // Makeup
                                        "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800&auto=format&fit=crop", // Hair
                                        "https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=800&auto=format&fit=crop"  // Product
                                    ][index]}
                                    alt={stat.label}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end items-center text-center">
                                <div className="mb-auto transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    <stat.icon size={48} className="text-gold stroke-1" />
                                </div>

                                <div>
                                    <h4 className="text-5xl font-serif text-white mb-2 font-light">{stat.value}</h4>
                                    <p className="text-sm uppercase tracking-widest text-gold">{stat.label}</p>
                                </div>

                                <div className="w-px h-16 bg-white/20 mt-8 group-hover:h-8 transition-all duration-500" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExcellencePillars;
