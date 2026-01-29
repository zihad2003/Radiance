import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ArrowUpRight } from 'lucide-react';
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
        <section id="gallery" className="pt-32 pb-24 bg-[#121110] relative min-h-screen">
            <div className="container mx-auto px-6">

                {/* Hero Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(280px,auto)]">

                    {/* 1. Header Text Block (Top Left) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-2 md:row-span-1 flex flex-col justify-center items-start p-4"
                    >
                        <div className="bento-ribbon mb-6 text-primary w-fit border border-primary/20 bg-primary/5 px-4 py-1.5 rounded-full">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em]">The Portfolio</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-sans font-black text-white uppercase tracking-tighter leading-[0.8] mb-6">
                            Visionary<br /><span className="text-primary italic font-serif">Results</span>
                        </h1>
                        <p className="text-gray-400 text-sm font-bold uppercase tracking-[0.2em] max-w-md leading-relaxed">
                            Witness the cinematic transformations that define the Radiance aesthetic.
                        </p>
                    </motion.div>

                    {/* 2. Middle Stack Top (Small) - Gaye Holud */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-1 relative group bento-card rounded-[2rem] overflow-hidden cursor-pointer"
                        onClick={() => setSelectedImage(galleryImages[2])}
                    >
                        <Image src={galleryImages[2].src} alt={galleryImages[2].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                            <span className="text-[10px] text-white font-bold uppercase tracking-widest">{galleryImages[2].title}</span>
                        </div>
                    </motion.div>

                    {/* 3. Tall Right (Full Height) - Snigdho */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="md:col-span-1 md:row-span-2 relative group bento-card rounded-[2.5rem] rounded-tr-[1rem] overflow-hidden cursor-pointer" // Mapped from Snigdho
                        onClick={() => setSelectedImage(galleryImages[1])}
                    >
                        <div className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20 group-hover:bg-primary group-hover:text-black transition-all">
                            <ArrowUpRight size={18} />
                        </div>
                        <Image src={galleryImages[1].src} alt={galleryImages[1].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                    </motion.div>

                    {/* 4. Bottom Left (Large Image) - Bridal */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="md:col-span-2 md:row-span-1 relative group bento-card rounded-[2.5rem] overflow-hidden cursor-pointer h-[350px]"
                        onClick={() => setSelectedImage(galleryImages[0])}
                    >
                        <Image src={galleryImages[0].src} alt={galleryImages[0].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                        {/* Floating Price/Info Tag Style from Reference */}
                        <div className="absolute top-0 right-0 p-6">
                            <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col items-start gap-1 shadow-2xl transform group-hover:-translate-y-2 transition-transform">
                                <span className="text-xs text-white/50 uppercase tracking-widest">Style</span>
                                <span className="text-lg font-serif italic text-white">Bridal Exclusive</span>
                                <div className="flex gap-1 mt-2">
                                    <Star size={10} className="fill-primary text-primary" />
                                    <Star size={10} className="fill-primary text-primary" />
                                    <Star size={10} className="fill-primary text-primary" />
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-6 left-8">
                            <h3 className="text-2xl font-sans font-black text-white uppercase tracking-tighter">{galleryImages[0].title}</h3>
                        </div>
                    </motion.div>

                    {/* 5. Middle Bottom (Small) - Party Hair */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="md:col-span-1 relative group bento-card rounded-[2rem] overflow-hidden cursor-pointer"
                        onClick={() => setSelectedImage(galleryImages[3])}
                    >
                        <Image src={galleryImages[3].src} alt={galleryImages[3].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute bottom-4 left-4">
                            <h4 className="text-sm font-bold text-white uppercase tracking-wide">{galleryImages[3].title}</h4>
                        </div>
                    </motion.div>

                    {/* Extra Row: Wide Items */}
                    <motion.div className="md:col-span-2 h-[250px] relative group bento-card rounded-[2rem] overflow-hidden cursor-pointer bg-[#1A1A1A] flex items-center" onClick={() => setSelectedImage(galleryImages[4])}>
                        <div className="w-1/2 h-full relative overflow-hidden"><Image src={galleryImages[4].src} className="w-full h-full object-cover" /></div>
                        <div className="w-1/2 p-8"><h4 className="text-2xl font-bold text-white uppercase">{galleryImages[4].title}</h4></div>
                    </motion.div>

                    <motion.div className="md:col-span-2 h-[250px] relative group bento-card rounded-[2rem] overflow-hidden cursor-pointer" onClick={() => setSelectedImage(galleryImages[5])}>
                        <Image src={galleryImages[5].src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute bottom-6 right-6 bg-black/50 px-6 py-2 rounded-full border border-white/10 text-white text-xs font-bold uppercase">{galleryImages[5].title}</div>
                    </motion.div>

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
