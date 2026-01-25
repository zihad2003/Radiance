import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Scissors, Sparkles, Droplets, Palette, Flower2, Zap } from 'lucide-react';

const services = [
    {
        id: 1,
        title: "Hair Styling & Color",
        price: "৳4,000+",
        icon: Scissors,
        color: "from-pink-500 to-rose-500",
        description: "Expert cuts, coloring, and styling tailored to your unique look."
    },
    {
        id: 2,
        title: "Makeup & Bridal",
        price: "৳8,000+",
        icon: Sparkles,
        color: "from-purple-500 to-indigo-500",
        description: "Radiant looks for your special day or any occasion."
    },
    {
        id: 3,
        title: "Skin Treatments",
        price: "৳4,500+",
        icon: Droplets,
        color: "from-blue-400 to-cyan-500",
        description: "Rejuvenating facials and treatments for glowing skin."
    },
    {
        id: 4,
        title: "Nail Art",
        price: "৳2,000+",
        icon: Palette,
        color: "from-teal-400 to-emerald-500",
        description: "Creative designs and premium care for your hands and feet."
    },
    {
        id: 5,
        title: "Threading & Waxing",
        price: "৳800+",
        icon: Zap,
        color: "from-orange-400 to-amber-500",
        description: "Precise hair removal for smooth, silky skin."
    },
    {
        id: 6,
        title: "Spa & Massage",
        price: "৳6,000+",
        icon: Flower2,
        color: "from-rose-400 to-pink-600",
        description: "Relaxing massages and body therapies to unwind."
    }
];

const ServiceCard = ({ service }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const Icon = service.icon;

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative min-w-[300px] h-[450px] rounded-3xl overflow-hidden cursor-pointer group perspective-1000 snap-center mx-4"
        >
            {/* Background with Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-80 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />

            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 transform-style-3d">
                <div className="transform translate-z-20">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Icon className="text-white w-8 h-8 group-hover:animate-pulse" />
                    </div>
                    <h3 className="text-3xl font-serif font-bold text-white mb-2 leading-tight">
                        {service.title}
                    </h3>
                    <p className="text-white/80 text-sm font-light">
                        {service.description}
                    </p>
                </div>

                <div className="transform translate-z-30">
                    <div className="overflow-hidden">
                        <div className="transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                            <span className="block text-4xl font-bold text-white mb-4 drop-shadow-md">
                                {service.price}
                            </span>
                            <button className="w-full py-3 bg-white text-charcoal rounded-xl font-semibold hover:bg-white/90 transition-colors shadow-lg interactive">
                                Book Now
                            </button>
                        </div>
                        <div className="transform group-hover:-translate-y-full transition-transform duration-500 absolute bottom-0 left-0">
                            <span className="text-white/60 text-sm tracking-widest uppercase">Explore</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sparkles on Hover (CSS based for simplicity in this component or could use canvas) */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
        </motion.div>
    );
};

const Services = () => {
    return (
        <section id="services" className="py-20 bg-pearl relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-20 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-20 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-6 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <h2 className="text-sm font-sans uppercase tracking-[0.3em] text-accent mb-4">Our Expertise</h2>
                    <h3 className="text-4xl md:text-5xl font-serif text-charcoal mb-6">Curated Beauty Services</h3>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
                </motion.div>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="overflow-x-auto pb-12 pt-8 hide-scrollbar cursor-grab active:cursor-grabbing px-6">
                <div className="flex space-x-8 w-max px-6">
                    {services.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
