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
        <section className="py-24 bg-[#121110] border-y border-white/5 overflow-hidden">
            <div className="container mx-auto px-6 mb-16 flex items-end justify-between">
                <div>
                    <div className="bento-ribbon mb-4 text-primary w-fit">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Heritage & Excellence</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-sans font-black text-white uppercase tracking-tighter">
                        Authorized <span className="text-primary italic font-serif">Partners</span>
                    </h2>
                </div>
                <Link to="/shop" className="group text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 text-gray-500 hover:text-primary transition-colors">
                    View Boutique <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="relative">
                {/* Scrolling Track */}
                <div className="flex gap-8 overflow-x-auto no-scrollbar py-10 px-6 snap-x group">
                    {allBrands.map((brand, idx) => (
                        <motion.div
                            key={brand.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.8 }}
                            viewport={{ once: true }}
                            className="min-w-[400px] h-64 flex flex-col items-center justify-center snap-center group/logo hover:-translate-y-2 transition-transform duration-500"
                        >
                            {/* The "Physical Card" Container */}
                            <div className="relative w-full h-full bento-card border border-white/5 bg-[#0A0A0A] flex flex-col items-center justify-center overflow-hidden hover:border-primary/30 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] transition-all duration-500 rounded-[3rem]">
                                {brand.logo ? (
                                    <img
                                        src={brand.logo}
                                        alt={brand.name}
                                        className="relative z-10 max-h-[40%] w-auto object-contain grayscale opacity-60 invert group-hover/logo:grayscale-0 group-hover/logo:opacity-100 group-hover/logo:invert-0 transition-all duration-700 ease-out"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
                                        }}
                                    />
                                ) : null}

                                <div className={`${brand.logo ? 'mt-6' : ''} text-center space-y-2 relative z-10`}>
                                    <h3 className="text-4xl font-serif italic tracking-tighter text-white uppercase leading-none group-hover/logo:text-primary transition-colors">
                                        {brand.name}
                                    </h3>
                                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-600 group-hover/logo:text-white/60 transition-colors">
                                        {brand.origin === 'International' ? 'Global Heritage' : 'Masterpiece Collection'}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    <div className="min-w-[50px]" />
                </div>

                {/* Fades */}
                <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-[#121110] to-transparent pointer-events-none z-10" />
                <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-[#121110] to-transparent pointer-events-none z-10" />
            </div>
        </section>
    );
};

export default BrandSlider;
