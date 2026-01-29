import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Tag, Sparkles, ChevronDown, Upload, ArrowRight } from 'lucide-react';
import { autoTagPhoto, searchPhotosByTags, getPopularTags } from '../utils/photoTagging';
import Image from './ui/Image';

const AITaggedGallery = () => {
    const [photos, setPhotos] = useState([]);
    const [filteredPhotos, setFilteredPhotos] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilters, setSelectedFilters] = useState({
        styles: [],
        products: [],
        skinTones: [],
        undertones: [],
        occasions: []
    });
    const [showFilters, setShowFilters] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [popularTags, setPopularTags] = useState(null);
    const [loading, setLoading] = useState(false);

    // Sample data - Replace with real data from your backend
    const samplePhotos = [
        {
            id: 'photo-1',
            beforeImage: '/assets/gallery/makeover_1.png',
            afterImage: '/assets/gallery/makeover_1.png',
            skinTone: { category: 'medium', undertone: 'warm', hex: '#D2B4A0' },
            makeup: {
                styles: ['Glamorous', 'Evening', 'Smokey Eye'],
                intensity: 0.8,
                features: ['shimmer', 'defined-eyes', 'bold-lips']
            },
            products: ['Foundation', 'Eyeshadow', 'Eyeliner', 'Mascara', 'Lipstick', 'Highlighter'],
            occasions: ['Party', 'Night Out', 'Special Event'],
            tags: ['Glamorous', 'Evening', 'Smokey Eye', 'warm', 'medium', 'Party'],
            metadata: { customerName: 'Sarah', date: '2026-01-20' }
        },
        {
            id: 'photo-2',
            beforeImage: '/assets/gallery/bridal_1.png',
            afterImage: '/assets/gallery/bridal_1.png',
            skinTone: { category: 'light', undertone: 'cool', hex: '#F5E6D3' },
            makeup: {
                styles: ['Bridal', 'Romantic', 'Soft Glam'],
                intensity: 0.6,
                features: ['dewy', 'glow', 'soft']
            },
            products: ['Foundation', 'Blush', 'Highlighter', 'Eyeshadow', 'Lipstick'],
            occasions: ['Wedding', 'Engagement', 'Formal Event'],
            tags: ['Bridal', 'Romantic', 'Soft Glam', 'cool', 'light', 'Wedding'],
            metadata: { customerName: 'Emily', date: '2026-01-18' }
        },
        {
            id: 'photo-3',
            beforeImage: '/assets/gallery/facial_1.png',
            afterImage: '/assets/gallery/facial_1.png',
            skinTone: { category: 'medium-deep', undertone: 'neutral', hex: '#A67C52' },
            makeup: {
                styles: ['Natural', 'Everyday', 'No-Makeup Makeup'],
                intensity: 0.3,
                features: ['matte', 'natural', 'subtle']
            },
            products: ['Foundation', 'Concealer', 'Mascara', 'Lip Gloss'],
            occasions: ['Everyday', 'Work', 'Casual'],
            tags: ['Natural', 'Everyday', 'neutral', 'medium-deep', 'Work'],
            metadata: { customerName: 'Maya', date: '2026-01-22' }
        }
    ];

    useEffect(() => {
        // Initialize with sample data
        setPhotos(samplePhotos);
        setFilteredPhotos(samplePhotos);
        setPopularTags(getPopularTags(samplePhotos));
    }, []);

    // Apply filters
    useEffect(() => {
        const filtered = searchPhotosByTags(photos, {
            ...selectedFilters,
            searchQuery
        });
        setFilteredPhotos(filtered);
    }, [selectedFilters, searchQuery, photos]);

    // Toggle filter
    const toggleFilter = (category, value) => {
        setSelectedFilters(prev => {
            const current = prev[category];
            const updated = current.includes(value)
                ? current.filter(v => v !== value)
                : [...current, value];
            return { ...prev, [category]: updated };
        });
    };

    // Clear all filters
    const clearFilters = () => {
        setSelectedFilters({
            styles: [],
            products: [],
            skinTones: [],
            undertones: [],
            occasions: []
        });
        setSearchQuery('');
    };

    // Filter options
    const filterOptions = {
        styles: ['Natural', 'Glamorous', 'Bridal', 'Smokey Eye', 'Soft Glam', 'Bold Lips'],
        products: ['Foundation', 'Eyeshadow', 'Lipstick', 'Blush', 'Highlighter', 'Eyeliner'],
        skinTones: ['very-light', 'light', 'medium-light', 'medium', 'medium-deep', 'deep'],
        undertones: ['warm', 'cool', 'neutral'],
        occasions: ['Wedding', 'Party', 'Everyday', 'Work', 'Date Night', 'Special Event']
    };

    return (
        <section className="py-24 bg-[#121110] relative overflow-hidden min-h-screen">
            <div className="container mx-auto px-6 relative z-10">
                {/* Search & Filter Bar */}
                <div className="max-w-4xl mx-auto mb-16 relative z-20">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary" size={18} />
                            <input
                                type="text"
                                placeholder="SEARCH ARCHIVE..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-16 pr-6 py-5 bg-[#0A0A0A] border border-white/5 rounded-2xl text-white placeholder:text-gray-600 text-[10px] font-black uppercase tracking-widest outline-none focus:border-primary/50 transition-all shadow-lg"
                            />
                        </div>

                        {/* Filter Button */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`px-8 py-5 border rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 justify-center transition-all ${showFilters
                                ? 'bg-primary text-black border-primary shadow-glow'
                                : 'bg-[#0A0A0A] text-white border-white/5 hover:bg-white/5'}`}
                        >
                            <Filter size={14} />
                            Filters
                            <ChevronDown size={14} className={`transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
                        </button>
                    </div>

                    {/* Active Filters */}
                    {Object.values(selectedFilters).some(arr => arr.length > 0) && (
                        <div className="mt-6 flex flex-wrap gap-2">
                            <div className="px-3 py-1 bg-white/5 text-white/40 text-[9px] font-black uppercase tracking-widest rounded-full flex items-center">Active:</div>
                            {Object.entries(selectedFilters).map(([category, values]) =>
                                values.map(value => (
                                    <span
                                        key={`${category}-${value}`}
                                        className="px-4 py-1.5 bg-primary/10 border border-primary/20 text-primary rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 group hover:bg-primary/20 transition-colors"
                                    >
                                        {value}
                                        <button
                                            onClick={() => toggleFilter(category, value)}
                                            className="hover:bg-primary/20 rounded-full p-0.5 text-primary/70 group-hover:text-primary"
                                        >
                                            <X size={10} />
                                        </button>
                                    </span>
                                ))
                            )}
                            <button
                                onClick={clearFilters}
                                className="px-4 py-1.5 text-white/40 hover:text-white text-[9px] font-black uppercase tracking-widest transition-colors"
                            >
                                Clear All
                            </button>
                        </div>
                    )}

                    {/* Filter Panel */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] shadow-2xl overflow-hidden backdrop-blur-xl"
                            >
                                <div className="p-8 space-y-8">
                                    {Object.entries(filterOptions).map(([category, options]) => (
                                        <div key={category}>
                                            <h3 className="font-black capitalize mb-4 text-[9px] uppercase tracking-[0.3em] text-white/40 border-b border-white/5 pb-2">
                                                {category.replace(/([A-Z])/g, ' $1').trim()}
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {options.map(option => (
                                                    <button
                                                        key={option}
                                                        onClick={() => toggleFilter(category, option)}
                                                        className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${selectedFilters[category].includes(option)
                                                            ? 'bg-primary text-black border-primary shadow-lg scale-105'
                                                            : 'bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white'
                                                            }`}
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}

                                    <div className="pt-4 flex justify-end">
                                        <button
                                            onClick={() => setShowFilters(false)}
                                            className="text-[10px] text-primary font-black uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2"
                                        >
                                            Close Filters <X size={14} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Results Count */}
                <div className="text-center mb-12">
                    <div className="inline-block px-6 py-2 bg-white/5 rounded-full border border-white/5">
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                            Displaying <span className="text-white">{filteredPhotos.length}</span> curated <span className="text-primary">Masterpieces</span>
                        </p>
                    </div>
                </div>

                {/* Photo Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPhotos.map((photo, index) => (
                        <motion.div
                            key={photo.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            onClick={() => setSelectedPhoto(photo)}
                            className="group cursor-pointer"
                        >
                            <div className="bento-card p-0 flex flex-col h-full bg-[#0A0A0A] border border-white/5 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
                                {/* Before/After Images - Bento Style Split */}
                                <div className="relative aspect-[4/3] w-full overflow-hidden">
                                    {/* Split Layout */}
                                    <div className="absolute inset-0 grid grid-cols-2">
                                        <div className="relative border-r border-white/5 overflow-hidden">
                                            <Image src={photo.beforeImage} alt="Before" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-110 origin-left" />
                                            <div className="absolute top-4 left-4 px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 text-white/70 text-[8px] font-black uppercase tracking-widest rounded-full">Before</div>
                                        </div>
                                        <div className="relative overflow-hidden">
                                            <Image src={photo.afterImage} alt="After" className="w-full h-full object-cover group-hover:saturate-150 transition-all duration-700 scale-105 group-hover:scale-110 origin-right" />
                                            <div className="absolute top-4 right-4 px-3 py-1 bg-primary/90 text-black text-[8px] font-black uppercase tracking-widest rounded-full shadow-lg">After</div>
                                        </div>
                                    </div>

                                    {/* Center Divider with Glow */}
                                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-white/10 z-10 overflow-visible">
                                        <div className="absolute inset-0 bg-primary blur-[4px] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-10 h-10 rounded-full border-2 border-white/10 p-0.5">
                                            <div className="w-full h-full rounded-full" style={{ backgroundColor: photo.skinTone.hex }} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-white uppercase tracking-widest">{photo.makeup.styles[0]}</p>
                                            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wide">by {photo.metadata.customerName}</p>
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                                        {photo.makeup.styles.slice(1, 3).map(style => (
                                            <span key={style} className="px-3 py-1 bg-white/5 text-gray-400 rounded-lg text-[9px] font-bold uppercase tracking-wide border border-white/5">
                                                {style}
                                            </span>
                                        ))}
                                        <span className="px-3 py-1 bg-white/5 text-primary rounded-lg text-[9px] font-bold uppercase tracking-wide border border-white/5 flex items-center gap-1">
                                            <Sparkles size={8} /> {photo.products.length} Products
                                        </span>
                                    </div>

                                    <div className="pt-6 border-t border-white/5 w-full flex justify-between items-center group/link">
                                        <span className="text-[9px] file:font-black text-white/20 uppercase tracking-[0.3em] group-hover:text-primary transition-colors">Analyze Look</span>
                                        <ArrowRight size={14} className="text-white/20 group-hover:text-primary transition-colors group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredPhotos.length === 0 && (
                    <div className="bento-card p-20 flex flex-col items-center justify-center text-center bg-[#0A0A0A] border-dashed border-2 border-white/5">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-8 text-white/20">
                            <Search size={32} />
                        </div>
                        <h3 className="text-2xl font-serif italic text-white mb-4">No Matches Discovered</h3>
                        <p className="text-white/40 mb-8 max-w-md mx-auto text-xs font-bold uppercase tracking-widest">Adjust your filters to reveal more transformations.</p>
                        <button
                            onClick={clearFilters}
                            className="bg-primary text-black px-8 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white transition-all shadow-glow"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}

                {/* Photo Detail Modal */}
                <AnimatePresence>
                    {selectedPhoto && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[200] flex items-center justify-center bg-[#121110]/95 backdrop-blur-3xl p-4 md:p-8 overflow-y-auto"
                            onClick={() => setSelectedPhoto(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.95, y: 30 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.95, y: 30 }}
                                onClick={(e) => e.stopPropagation()}
                                className="w-full max-w-7xl bg-[#0A0A0A] border border-white/10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row min-h-[80vh]"
                            >
                                {/* Close Button */}
                                <button
                                    onClick={() => setSelectedPhoto(null)}
                                    className="absolute top-8 right-8 w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white/70 hover:bg-primary hover:text-black transition-all z-50 border border-white/10 z-[100]"
                                >
                                    <X size={20} />
                                </button>

                                {/* Images Section (Left/Top) */}
                                <div className="w-full md:w-1/2 bg-[#1A1A1A] relative flex flex-col">
                                    <div className="flex-1 reltive overflow-hidden border-b border-white/5">
                                        <Image src={selectedPhoto.beforeImage} alt="Before" className="w-full h-full object-cover" />
                                        <div className="absolute top-6 left-6 px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/10 text-white text-[9px] font-black uppercase tracking-widest rounded-full">Before</div>
                                    </div>
                                    <div className="flex-1 relative overflow-hidden">
                                        <Image src={selectedPhoto.afterImage} alt="After" className="w-full h-full object-cover" />
                                        <div className="absolute top-6 left-6 px-4 py-2 bg-primary text-black text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">After</div>
                                    </div>
                                </div>

                                {/* Content Section (Right/Bottom) */}
                                <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col overflow-y-auto custom-scrollbar bg-[#0A0A0A]">
                                    <div className="mb-12">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="h-px bg-white/10 w-12" />
                                            <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em]">Transformation Analysis</span>
                                        </div>
                                        <h3 className="text-4xl md:text-5xl font-serif italic text-white mb-4">
                                            The <span className="text-primary">{selectedPhoto.makeup.styles[0]}</span> Look
                                        </h3>
                                        <p className="text-white/40 text-xs font-bold uppercase tracking-widest">
                                            Executed by <span className="text-white">{selectedPhoto.metadata.customerName}</span> on {selectedPhoto.metadata.date}
                                        </p>
                                    </div>

                                    <div className="space-y-12">
                                        {/* Skin Profile */}
                                        <div>
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-6 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 bg-primary rounded-full" /> Complexion Profile
                                            </h4>
                                            <div className="bg-white/5 p-6 rounded-3xl border border-white/5 flex items-center gap-6">
                                                <div className="w-16 h-16 rounded-full border-2 border-white/10 p-1">
                                                    <div className="w-full h-full rounded-full" style={{ backgroundColor: selectedPhoto.skinTone.hex }} />
                                                </div>
                                                <div>
                                                    <p className="text-lg font-serif italic text-white capitalize mb-1">{selectedPhoto.skinTone.category}</p>
                                                    <p className="text-[9px] text-primary font-black uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full inline-block">{selectedPhoto.skinTone.undertone} undertone</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Breakdown Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                            {/* Products */}
                                            <div>
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-6 border-b border-white/5 pb-2">Arsenal</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedPhoto.products.map(product => (
                                                        <span key={product} className="px-3 py-1.5 bg-white/5 text-gray-300 rounded-lg text-[9px] font-bold uppercase tracking-wide border border-white/5 hover:border-primary/30 transition-colors cursor-default">
                                                            {product}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Styles */}
                                            <div>
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-6 border-b border-white/5 pb-2">Techniques</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedPhoto.makeup.styles.map(style => (
                                                        <span key={style} className="px-3 py-1.5 bg-white/5 text-gray-300 rounded-lg text-[9px] font-bold uppercase tracking-wide border border-white/5">
                                                            {style}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-16">
                                        <button className="w-full bg-white text-black py-6 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary transition-all shadow-xl group flex items-center justify-center gap-4">
                                            Recreate This Look
                                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }
            `}</style>
        </section>
    );
};

export default AITaggedGallery;
