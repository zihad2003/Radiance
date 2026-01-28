import { motion } from 'framer-motion';
import { getBrands } from '../../data/makeupBrands';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const BrandSlider = () => {
    const { international, local } = useMemo(() => {
        try {
            return getBrands() || { international: [], local: [] };
        } catch (e) {
            return { international: [], local: [] };
        }
    }, []);

    const allBrands = [...international, ...local];

    return (
        <section className="py-12 bg-white/50 border-y border-gray-100 overflow-hidden">
            <div className="container mx-auto px-6 mb-8 flex items-center justify-between">
                <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2">Heritage & Excellence</h4>
                    <h2 className="text-2xl font-serif italic">Our <span className="text-gradient-gold">Authorized</span> Brand Partners</h2>
                </div>
                <Link to="/shop" className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-gray-400 hover:text-primary transition-colors">
                    View Boutique <ChevronRight size={14} />
                </Link>
            </div>

            <div className="relative">
                {/* Scrolling Track */}
                <div className="flex gap-12 overflow-x-auto no-scrollbar py-20 px-6 snap-x group">
                    {allBrands.map((brand, idx) => (
                        <motion.div
                            key={brand.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.8 }}
                            viewport={{ once: true }}
                            className="min-w-[450px] h-72 flex flex-col items-center justify-center p-12 snap-center group/logo hover:scale-105 transition-all duration-700"
                        >
                            {/* The "Physical Card" Container */}
                            <div className="relative w-full h-full bg-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col items-center justify-center overflow-hidden">
                                {/* Subtle Texture Overlay */}
                                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

                                {brand.logo ? (
                                    <img
                                        src={brand.logo}
                                        alt={brand.name}
                                        className="relative z-10 max-h-[50%] w-auto object-contain grayscale opacity-90 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 transition-all duration-700 ease-out"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
                                        }}
                                    />
                                ) : null}

                                <div className={`${brand.logo ? 'mt-6' : ''} text-center space-y-1 relative z-10`}>
                                    <h3 className="text-5xl font-serif italic tracking-tighter text-charcoal uppercase leading-none">
                                        {brand.name}
                                    </h3>
                                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400">
                                        {brand.origin === 'International' ? 'Global Heritage' : 'Masterpiece Collection'}
                                    </p>
                                </div>

                                {/* Bottom Accent Line */}
                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary/20 scale-x-0 group-hover/logo:scale-x-100 transition-transform duration-700 origin-left" />
                            </div>
                        </motion.div>
                    ))}

                    {/* Duplicate for Infinite feel or just extra padding */}
                    <div className="min-w-[100px]" />
                </div>

                {/* Fades */}
                <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-white to-transparent pointer-events-none" />
                <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-white to-transparent pointer-events-none" />
            </div>
        </section>
    );
};

export default BrandSlider;
