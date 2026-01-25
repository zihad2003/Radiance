import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, Play } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: "Sarah Jenkins",
        role: "Regular Client",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
        quote: "The AR try-on feature saved me from a hair color disaster! The staff is incredibly professional and the atmosphere is pure luxury.",
        rating: 5,
        videoThumbnail: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Elena Rodriguez",
        role: "Bridal Package",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
        quote: "I felt like a queen on my wedding day. The makeup team understood exactly what I wanted. Highly recommended!",
        rating: 5,
        videoThumbnail: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Michelle Wong",
        role: "Spa Enthusiast",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
        quote: "The most relaxing massage I've ever had. The futuristic vibe combined with traditional techniques is unique.",
        rating: 5,
        videoThumbnail: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=600&auto=format&fit=crop"
    }
];

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, [activeIndex]);

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="py-24 bg-charcoal text-white relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-sm font-sans uppercase tracking-[0.3em] text-gold mb-4">Client Love</h2>
                    <h3 className="text-4xl md:text-5xl font-serif text-white">Stories of Beauty</h3>
                </motion.div>

                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    {/* Video Review Side */}
                    <div className="w-full md:w-1/2 relative h-[400px] group cursor-pointer overflow-hidden rounded-2xl">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={activeIndex}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                src={testimonials[activeIndex].videoThumbnail}
                                alt="Video Thumbnail"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </AnimatePresence>
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform duration-300">
                                <Play className="fill-white text-white ml-2" size={32} />
                            </div>
                        </div>
                        <div className="absolute bottom-6 left-6">
                            <span className="bg-primary text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider">Video Review</span>
                        </div>
                    </div>

                    {/* Text Review Side */}
                    <div className="w-full md:w-1/2">
                        <div className="relative min-h-[300px] flex flex-col justify-center">
                            <Quote className="text-gold/20 absolute -top-10 -left-10 w-32 h-32" />

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="flex space-x-1 mb-6">
                                        {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                                            <Star key={i} className="fill-gold text-gold" size={20} />
                                        ))}
                                    </div>

                                    <blockquote className="text-2xl md:text-3xl font-serif leading-relaxed mb-8">
                                        "{testimonials[activeIndex].quote}"
                                    </blockquote>

                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={testimonials[activeIndex].image}
                                            alt={testimonials[activeIndex].name}
                                            className="w-16 h-16 rounded-full object-cover border-2 border-gold"
                                        />
                                        <div>
                                            <h4 className="text-xl font-bold">{testimonials[activeIndex].name}</h4>
                                            <p className="text-white/60 text-sm uppercase tracking-wider">{testimonials[activeIndex].role}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Navigation */}
                        <div className="flex space-x-4 mt-8">
                            <button onClick={prevSlide} className="p-3 border border-white/20 rounded-full hover:bg-white hover:text-charcoal transition-colors interactive">
                                <ChevronLeft size={24} />
                            </button>
                            <button onClick={nextSlide} className="p-3 border border-white/20 rounded-full hover:bg-white hover:text-charcoal transition-colors interactive">
                                <ChevronRight size={24} />
                            </button>
                            <div className="flex items-center space-x-2 ml-4">
                                {testimonials.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveIndex(i)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-gold w-8' : 'bg-white/30'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
