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
        <section id="gallery" className="py-24 bg-[#121110] relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8"
                >
                    <div className="max-w-2xl">
                        <div className="bento-ribbon mb-6 text-primary w-fit">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em]">The Collection</span>
                        </div>
                        <h3 className="text-5xl md:text-7xl font-sans font-black text-white uppercase tracking-tighter leading-[0.9]">
                            Visuals of <span className="text-primary italic font-serif">Excellence</span>
                        </h3>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">Curated Moments of Radiance</p>
                    </div>
                </motion.div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {galleryImages.map((image, index) => (
                        <motion.div
                            key={image.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            onClick={() => setSelectedImage(image)}
                            className="relative group break-inside-avoid bento-card p-0 overflow-hidden cursor-pointer rounded-[2.5rem] bg-[#0A0A0A] border border-white/5 hover:border-primary/50 transition-all duration-500"
                        >
                            <Image
                                src={image.src}
                                alt={image.title}
                                className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>

                            <div className="absolute bottom-0 left-0 w-full p-8 flex justify-between items-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <div>
                                    <h4 className="text-white font-sans font-black text-xl uppercase tracking-wider mb-2">{image.title}</h4>
                                    <div className="h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-700 delay-100" />
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-primary group-hover:text-black transition-all">
                                    <ArrowUpRight size={18} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
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
