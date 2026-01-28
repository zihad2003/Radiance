import { motion } from 'framer-motion';
import { Camera, Sparkles, Wand2, Smartphone, Cpu, CheckCircle2 } from 'lucide-react';
import Image from '../ui/Image';
import { Link } from 'react-router-dom';

const AIFeatureOverview = () => {
    const features = [
        {
            title: "Virtual Try-On",
            subtitle: "Real-Time AR Experience",
            description: "Experience makeup shades and hairstyles instantly using your camera. Our 468-point face mesh technology ensures precise placement and realistic texture simulation.",
            icon: Camera,
            link: "/virtual-try-on",
            buttonText: "Launch Studio",
            color: "from-rose-500 to-pink-600",
            image: "/assets/services/makeup.png", // Using existing asset
            steps: ["Enable Camera", "Select Product", "Instant Preview"]
        },
        {
            title: "AI Makeover",
            subtitle: "Generative Transformation",
            description: "Upload your photo and let our advanced AI reimagine your look. From bridal elegance to avant-garde glam, get professional transformation ideas in seconds.",
            icon: Wand2,
            link: "/ai-makeover",
            buttonText: "Generate Look",
            color: "from-indigo-500 to-purple-600",
            image: "/assets/hero/bridal_hero.png", // Using existing hero asset
            steps: ["Upload Photo", "Choose Style", "Get Results"]
        }
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-[120px] -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-[120px] -ml-20 -mb-20" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-xs font-bold uppercase tracking-widest mb-6"
                    >
                        <Cpu size={14} />
                        Next-Gen Beauty Tech
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-serif mb-6 leading-tight"
                    >
                        Redefining Reality with <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">AI Artistry</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-500 text-lg"
                    >
                        Why guess when you can visualize? Our dual AI tools empower you to discover your perfect look with clinical precision and creative freedom.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, x: idx === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: idx * 0.2 }}
                            className="relative group h-full"
                        >
                            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-gray-200 border border-neutral-100 flex flex-col h-full hover:border-primary/20 transition-all duration-500 overflow-hidden">
                                {/* Glass Background Effect */}
                                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${feature.color} opacity-[0.03] group-hover:opacity-[0.06] transition-opacity rounded-full -mr-20 -mt-20 blur-3xl`} />

                                <div className="flex flex-col md:flex-row gap-8 items-start relative z-10 flex-1">
                                    <div className="flex-1 space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                                                <feature.icon size={32} />
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary">{feature.subtitle}</h4>
                                                <h3 className="text-3xl font-serif font-bold text-charcoal">{feature.title}</h3>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 leading-relaxed italic">
                                            "{feature.description}"
                                        </p>

                                        <div className="space-y-3">
                                            {feature.steps.map((step, i) => (
                                                <div key={i} className="flex items-center gap-3 text-sm text-gray-500">
                                                    <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center text-white text-[10px] font-bold`}>
                                                        {i + 1}
                                                    </div>
                                                    <span>{step}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="w-full md:w-48 aspect-square rounded-3xl overflow-hidden shadow-xl group-hover:scale-105 transition-transform duration-500">
                                        <Image
                                            src={feature.image}
                                            alt={feature.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                <div className="mt-10 flex items-center justify-between pt-8 border-t border-gray-100 relative z-10">
                                    <Link
                                        to={feature.link}
                                        className={`px-8 py-4 bg-gradient-to-r ${feature.color} text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:shadow-lg transition-all active:scale-95`}
                                    >
                                        {feature.buttonText}
                                    </Link>
                                    <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        Live Now
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Trust Badge / Tech Detail */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 flex flex-wrap justify-center gap-10 items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-700"
                >
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                        <Smartphone size={16} /> Mobile-Optimized
                    </div>
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                        <Cpu size={16} /> Tensor Processing
                    </div>
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                        <CheckCircle2 size={16} /> 99.9% Prediction Match
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AIFeatureOverview;
