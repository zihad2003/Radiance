import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import Image from './ui/Image';

const galleryImages = [
    { id: 1, src: "/assets/gallery/bridal_1.png", title: "Biye Special (Bridal)", height: "h-96" },
    { id: 2, src: "/assets/gallery/snigdho.png", title: "Snigdho Look", height: "h-64" },
    { id: 3, src: "/assets/gallery/mehndhi_glow.png", title: "Gaye Holud Vibrant", height: "h-80" },
    { id: 4, src: "/assets/gallery/hair_style_1.png", title: "Party Hair Styling", height: "h-72" },
    { id: 5, src: "/assets/gallery/skincare_1.png", title: "Glow & Skincare", height: "h-64" },
    { id: 6, src: "/assets/gallery/nails_1.png", title: "Mehendi & Nail Art", height: "h-80" },
    { id: 7, src: "/assets/gallery/facial_1.png", title: "Facial Rejuvenation", height: "h-96" },
    { id: 8, src: "/assets/gallery/makeover_1.png", title: "Complete Makeover", height: "h-72" },
];

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <section id="gallery" className="py-24 bg-pearl relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-sm font-sans uppercase tracking-[0.3em] text-primary mb-4">Our Masterpieces</h2>
                    <h3 className="text-4xl md:text-5xl font-serif text-charcoal">Visuals of Excellence</h3>
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
                            className="relative group break-inside-avoid rounded-2xl overflow-hidden cursor-pointer"
                        >
                            <Image
                                src={image.src}
                                alt={image.title}
                                className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <h4 className="text-white font-serif text-xl italic mb-2">{image.title}</h4>
                                    <ZoomIn className="text-white mx-auto" />
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
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="relative max-w-5xl max-h-[90vh] w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={selectedImage.src}
                                alt={selectedImage.title}
                                className="w-full h-full object-contain rounded-lg shadow-2xl"
                            />
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-12 right-0 md:-right-12 text-white hover:text-primary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full p-1"
                                aria-label="Close Lightbox"
                            >
                                <X size={40} />
                            </button>
                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="text-3xl font-serif italic">{selectedImage.title}</h3>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;
