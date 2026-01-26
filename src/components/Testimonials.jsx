import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, Play } from 'lucide-react';

const testimonials = [
    // --- WEDDING STORIES ---
    {
        id: 1,
        name: "Nusrat Jahan",
        role: "Holud Bride",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200",
        quote: "The flower jewelry setting for my Holud was perfection. They matched the fresh marigolds exactly to my saree.",
        rating: 5,
        videoThumbnail: "https://images.unsplash.com/photo-1605218427339-992e59e38e83?q=80&w=600"
    },
    {
        id: 2,
        name: "Sadia Islam",
        role: "Reception Bride",
        image: "https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?q=80&w=200",
        quote: "I wanted a subtle glam look for my reception, unlike the traditional heavy makeup. The airbrush finish lasted all night!",
        rating: 5,
        videoThumbnail: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=600"
    },
    {
        id: 3,
        name: "Farhana Ahmed",
        role: "Sister of Bride",
        image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200",
        quote: "We booked the 'Bridesmaids Squad' package. Getting ready together with the best coffee and music was the highlight of the wedding week.",
        rating: 5,
        videoThumbnail: "https://images.unsplash.com/photo-1522337360705-8763d84a783a?q=80&w=600"
    },

    // --- FESTIVE STORIES ---
    {
        id: 4,
        name: "Rubina Khan",
        role: "Eid Special",
        image: "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?q=80&w=200",
        quote: "Every Eid, I come here for my Henna. Their designs are so intricate and the color stain is always deep maroon.",
        rating: 5,
        videoThumbnail: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=600"
    },
    {
        id: 5,
        name: "Tasneem Rahman",
        role: "Pohela Boishakh",
        image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=200",
        quote: "They nailed the traditional white and red saree drape and the bindi placement. Felt so confident at the Mongol Shobhajatra.",
        rating: 4,
        videoThumbnail: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=600"
    },

    // --- EVERYDAY GLOW ---
    {
        id: 6,
        name: "Mariya Karim",
        role: "Corporate Lawyer",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200",
        quote: "The 'Lunch Break Glow' facial is a lifesaver. In 45 minutes, I look refreshed and ready for court.",
        rating: 5,
        videoThumbnail: "https://images.unsplash.com/photo-1560932488-824bae4c878f?q=80&w=600"
    },
    {
        id: 7,
        name: "Lamia Chowdhury",
        role: "University Student",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200",
        quote: "Being a student, the budget package is amazing. I finally found a place that treats my acne-prone skin with care without costing a fortune.",
        rating: 5,
        videoThumbnail: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=600"
    },

    // --- HAIR TRANSFORMATIONS ---
    {
        id: 8,
        name: "Ayesha Siddiqui",
        role: "Hair Rebonding",
        image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=200",
        quote: "I was scared of rebonding damage, but their 'Hot Oil Therapy' post-treatment kept my hair so silky. Best salon in Gulshan!",
        rating: 5,
        videoThumbnail: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=600"
    },
    {
        id: 9,
        name: "Zara Hossain",
        role: "Color Transformation",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200",
        quote: "From jet black to caramel balayage without bleach damage? Magic. The stylistic really understood my skin tone.",
        rating: 5,
        videoThumbnail: "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?q=80&w=600"
    },

    // --- WELLNESS ---
    {
        id: 10,
        name: "Shirin Akter",
        role: "Spa Regular",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200",
        quote: "The Ayurvedic massage with warm oil feels like home. It's my monthly ritual to disconnect from the Dhaka traffic chaos.",
        rating: 5,
        videoThumbnail: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=600"
    },
    {
        id: 11,
        name: "Rifat & Nabila",
        role: "Couples Retreat",
        image: "https://images.unsplash.com/photo-1536763843054-126cc1846b04?q=80&w=200",
        quote: "Celebrated our anniversary with the Couples Retreat. The rose petal bath and private suite were so romantic.",
        rating: 5,
        videoThumbnail: "https://images.unsplash.com/photo-1570172619644-dfcdf9705d9b?q=80&w=600"
    },

    // --- MAKEUP ARTISTRY ---
    {
        id: 12,
        name: "Mehazabien",
        role: "Model",
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200",
        quote: "Their 'K-Beauty' preset looked exactly like the virtual try-on! The gradients on the lips were flawless for my photoshoot.",
        rating: 5,
        videoThumbnail: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600"
    },
    {
        id: 13,
        name: "Tahmina",
        role: "Party Guest",
        image: "https://images.unsplash.com/photo-1589571894960-20bbe2815d22?q=80&w=200",
        quote: "I tried the 'Mob Wife' trend for a dinner party. Bold eyeliner and dark lips—everyone complimented me all night.",
        rating: 5,
        videoThumbnail: "https://images.unsplash.com/photo-1485217988980-11786ced9454?q=80&w=600"
    },

    // --- SKINCARE ---
    {
        id: 14,
        name: "Fatima Zohra",
        role: "Acne Treatment",
        image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=200",
        quote: "After 3 sessions of their 'Detox Facial', my skin is finally clearing up. They use genuine products, which is rare.",
        rating: 5,
        videoThumbnail: "https://images.unsplash.com/photo-1570172619644-dfcdf9705d9b?q=80&w=600"
    },
    {
        id: 15,
        name: "Anika Tabassum",
        role: "Winter Care",
        image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?q=80&w=200",
        quote: "The HydraFacial saved my dry skin this winter. My face feels plump and hydrated for days.",
        rating: 4,
        videoThumbnail: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=600"
    },

    // --- GLOBAL ---
    {
        id: 16,
        name: "Sarah Jenkins",
        role: "Expat in Dhaka",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
        quote: "Hard to find a salon that does blonde highlights well in Asia, but Radiance got the toner perfectly right. No brassiness!",
        rating: 5,
        videoThumbnail: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=600"
    },

    // --- GENERATIONAL ---
    {
        id: 17,
        name: "Mrs. Haque",
        role: "Mother of Bride",
        image: "https://images.unsplash.com/photo-1551843073-4a9a5b6fcd5f?q=80&w=200",
        quote: "They made me look elegant without overdoing it. The saree draping was secure and comfortable for the whole event.",
        rating: 5,
        videoThumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600"
    },
    {
        id: 18,
        name: "Samira Love",
        role: "First Haircut",
        image: "https://images.unsplash.com/photo-1556347961-f9521a88cb8a?q=80&w=200",
        quote: "Took my 3-year-old for her first chop. The staff was so patient and gave her a lollipop. No tears!",
        rating: 5,
        videoThumbnail: "https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=600"
    },
    {
        id: 19,
        name: "Ishrat Jahan",
        role: "Regular",
        image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=200",
        quote: "I've been coming here for 5 years. The standard of hygiene and service has never dropped. Truly premium.",
        rating: 5,
        videoThumbnail: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=600"
    },
    {
        id: 20,
        name: "The Rahman Sisters",
        role: "Group Spa",
        image: "https://images.unsplash.com/photo-1573140247632-f84660f67127?q=80&w=200",
        quote: "Booked the whole private lounge for our reunion. The privacy and continuous flow of green tea made it perfect.",
        rating: 5,
        videoThumbnail: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=600"
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
