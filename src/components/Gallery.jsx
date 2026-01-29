import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ArrowUpRight, Star, TrendingUp } from 'lucide-react';
import Image from './ui/Image';

const galleryImages = [
    { id: 1, src: "https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?q=80&w=800", title: "Biye Special (Bridal)", height: "h-96" },
    { id: 2, src: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=800", title: "Snigdho Look", height: "h-64" },
    { id: 3, src: "https://images.unsplash.com/photo-1596434300655-e48d371bd9d7?q=80&w=800", title: "Gaye Holud Vibrant", height: "h-80" },
    { id: 4, src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800", title: "Party Hair Styling", height: "h-72" },
    { id: 5, src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800", title: "Glow & Skincare", height: "h-64" },
    { id: 6, src: "https://images.unsplash.com/photo-1615277717462-8e7c152433d7?q=80&w=800", title: "Mehendi & Nail Art", height: "h-80" }
];

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <section id="gallery" className="py-24 bg-[#050505] relative overflow-hidden">
            {/* Background Ambient Glows */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] opacity-20 pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px] opacity-20 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:grid-rows-6 h-auto md:h-[1150px]">

                    {/* 1. MAIN HEADLINE BLOCK */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-7 md:row-span-2 flex flex-col justify-center items-start p-4 md:p-8"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-[1px] bg-primary/50" />
                            <span className="text-primary text-[10px] font-black uppercase tracking-[0.4em]">The Portfolio</span>
                        </div>
                        <h2 className="text-7xl md:text-9xl font-cormorant font-light text-white leading-[0.8] tracking-tighter mb-8">
                            Visionary <br />
                            <span className="italic font-medium text-white/90">Results</span>
                        </h2>
                        <p className="text-gray-500 text-sm font-medium uppercase tracking-[0.2em] max-w-sm leading-relaxed">
                            A curated selection of visionary artistry and cinematic transformations.
                        </p>
                    </motion.div>

                    {/* 2. EXPLORE COLLECTION STACK */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-5 md:row-span-2 relative group bento-card bg-[#0D0D0D] rounded-[3.5rem] overflow-hidden p-10 flex flex-col justify-between border border-white/5"
                    >
                        <div className="flex justify-between items-start">
                            <h3 className="text-white text-2xl font-medium font-sans">Explore<br />Collection</h3>
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 group-hover:bg-primary group-hover:text-black transition-all">
                                <ArrowUpRight size={18} />
                            </div>
                        </div>

                        <div className="relative h-48 mt-8">
                            <div className="absolute bottom-0 left-12 w-36 h-36 rounded-3xl overflow-hidden rotate-[-12deg] translate-x-[-15%] z-10 shadow-2xl border border-white/10 opacity-30 group-hover:opacity-100 transition-opacity">
                                <Image src={galleryImages[2].src} className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute bottom-0 left-1/2 w-44 h-44 rounded-3xl overflow-hidden rotate-[-4deg] translate-x-[-50%] z-20 shadow-2xl border border-white/10">
                                <Image src={galleryImages[3].src} className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute bottom-0 right-12 w-36 h-36 rounded-3xl overflow-hidden rotate-[8deg] translate-x-[15%] z-10 shadow-2xl border border-white/10 opacity-30 group-hover:opacity-100 transition-opacity">
                                <Image src={galleryImages[4].src} className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </motion.div>

                    {/* 3. CENTERPIECE CARDS */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="md:col-span-8 md:row-span-4 relative group rounded-[4rem] overflow-hidden cursor-pointer shadow-2xl"
                        onClick={() => setSelectedImage(galleryImages[0])}
                    >
                        <Image src={galleryImages[0].src} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                        <div className="absolute top-0 right-0 p-8">
                            <div className="bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-6 pr-14 relative overflow-hidden group/tag transform group-hover:-translate-y-2 transition-transform">
                                <div className="flex flex-col gap-1">
                                    <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">Bridal Exclusive</span>
                                    <span className="text-white text-3xl font-cormorant font-medium italic">Signature Look</span>
                                    <div className="flex gap-1 mt-2">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={10} className="fill-primary text-primary" />)}
                                    </div>
                                </div>
                                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white group-hover/tag:bg-primary group-hover/tag:text-black transition-all">
                                    <ArrowUpRight size={18} />
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                        <div className="absolute bottom-12 left-12">
                            <h3 className="text-5xl font-cormorant italic text-white mb-2">{galleryImages[0].title}</h3>
                        </div>
                    </motion.div>

                    {/* 4. TALL EDITORIAL CARD */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="md:col-span-4 md:row-span-3 relative group rounded-[4rem] overflow-hidden cursor-pointer"
                        onClick={() => setSelectedImage(galleryImages[1])}
                    >
                        <Image src={galleryImages[1].src} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                        <div className="absolute top-8 right-8 w-14 h-14 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:bg-primary group-hover:text-black transition-all shadow-xl">
                            <ArrowUpRight size={24} />
                        </div>
                        <div className="absolute bottom-0 left-0 w-full p-12 bg-gradient-to-t from-black via-transparent to-transparent">
                            <h4 className="text-white text-4xl font-cormorant italic mb-4">{galleryImages[1].title}</h4>
                            <div className="h-0.5 w-16 bg-primary group-hover:w-full transition-all duration-700" />
                        </div>
                    </motion.div>

                    {/* 5. MINI FEATURE CARDS */}
                    <div className="md:col-span-4 md:row-span-1 grid grid-cols-2 gap-4">
                        <motion.div
                            className="bg-[#0D0D0D] rounded-3xl p-6 flex flex-col justify-between border border-white/5 hover:bg-[#121212] transition-colors cursor-pointer group/mini"
                            onClick={() => setSelectedImage(galleryImages[4])}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <Star size={14} className="text-primary" />
                                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover/mini:bg-primary transition-colors">
                                    <ArrowUpRight size={10} className="text-white group-hover/mini:text-black" />
                                </div>
                            </div>
                            <h5 className="text-white text-[11px] font-black uppercase tracking-widest">{galleryImages[4].title}</h5>
                        </motion.div>
                        <motion.div
                            className="bg-[#0D0D0D] rounded-3xl p-6 flex flex-col justify-between border border-white/5 hover:bg-[#121212] transition-colors cursor-pointer group/mini"
                            onClick={() => setSelectedImage(galleryImages[5])}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <TrendingUp size={14} className="text-primary" />
                                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover/mini:bg-primary transition-colors">
                                    <ArrowUpRight size={10} className="text-white group-hover/mini:text-black" />
                                </div>
                            </div>
                            <h5 className="text-white text-[11px] font-black uppercase tracking-widest">{galleryImages[5].title}</h5>
                        </motion.div>
                    </div>

                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-[#121110]/95 flex items-center justify-center p-4 backdrop-blur-3xl"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative max-w-6xl max-h-[90vh] w-full bento-card p-0 overflow-hidden bg-[#0A0A0A] border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex flex-col md:flex-row h-[80vh]">
                                <div className="w-full md:w-3/4 h-full bg-black">
                                    <Image
                                        src={selectedImage.src}
                                        alt={selectedImage.title}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className="w-full md:w-1/4 h-full p-8 flex flex-col justify-between bg-[#0A0A0A] border-l border-white/5">
                                    <div>
                                        <h3 className="text-3xl font-sans font-black uppercase tracking-tighter text-white mb-2">{selectedImage.title}</h3>
                                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Captured Moment</p>
                                    </div>

                                    <button
                                        onClick={() => setSelectedImage(null)}
                                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all self-end"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;
