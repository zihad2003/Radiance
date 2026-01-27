import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Tag, Sparkles, ChevronDown, Upload } from 'lucide-react';
import { autoTagPhoto, searchPhotosByTags, getPopularTags } from '../utils/photoTagging';

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
            beforeImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
            afterImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
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
            beforeImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400',
            afterImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
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
            beforeImage: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400',
            afterImage: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400',
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
        <section className="py-24 bg-[#050505] relative overflow-hidden min-h-screen">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gold/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[150px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-6 py-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full shadow-lg mb-6"
                    >
                        <span className="text-gold font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                            <Sparkles size={14} fill="currentColor" />
                            AI-Tagged Gallery
                        </span>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-serif italic mb-6 text-white">
                        Before & After <span className="text-gradient-gold">Transformations</span>
                    </h2>
                    <p className="text-white/40 max-w-2xl mx-auto font-light tracking-wide">
                        Explore our stunning transformations, automatically tagged by AI for easy discovery
                    </p>
                </div>

                {/* Search & Filter Bar */}
                <div className="max-w-4xl mx-auto mb-16 relative z-20">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-gold transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search by style, product, occasion..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-gold/30 focus:bg-white/10 outline-none transition-all"
                            />
                        </div>

                        {/* Filter Button */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`px-8 py-4 border rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center gap-3 justify-center transition-all ${showFilters
                                ? 'bg-[#F5E6C8] text-black border-[#F5E6C8] shadow-glow'
                                : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/30'}`}
                        >
                            <Filter size={16} />
                            Filters
                            <ChevronDown size={14} className={`transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
                        </button>
                    </div>

                    {/* Active Filters */}
                    {Object.values(selectedFilters).some(arr => arr.length > 0) && (
                        <div className="mt-6 flex flex-wrap gap-2">
                            <span className="text-xs text-white/40 py-1.5 uppercase tracking-wide mr-2">Active:</span>
                            {Object.entries(selectedFilters).map(([category, values]) =>
                                values.map(value => (
                                    <span
                                        key={`${category}-${value}`}
                                        className="px-3 py-1 bg-gold/10 border border-gold/20 text-gold rounded-full text-xs font-bold flex items-center gap-2 group hover:bg-gold/20 transition-colors"
                                    >
                                        {value}
                                        <button
                                            onClick={() => toggleFilter(category, value)}
                                            className="hover:bg-gold/20 rounded-full p-0.5 text-gold/70 group-hover:text-gold"
                                        >
                                            <X size={12} />
                                        </button>
                                    </span>
                                ))
                            )}
                            <button
                                onClick={clearFilters}
                                className="px-3 py-1 text-white/40 hover:text-white text-xs font-medium transition-colors"
                            >
                                Clear All
                            </button>
                        </div>
                    )}

                    {/* Filter Panel */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="mt-4 bg-[#0A0A0A] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden backdrop-blur-xl"
                            >
                                <div className="p-8 space-y-8">
                                    {Object.entries(filterOptions).map(([category, options]) => (
                                        <div key={category}>
                                            <h3 className="font-bold capitalize mb-4 text-xs uppercase tracking-widest text-white/40 border-b border-white/5 pb-2">
                                                {category.replace(/([A-Z])/g, ' $1').trim()}
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {options.map(option => (
                                                    <button
                                                        key={option}
                                                        onClick={() => toggleFilter(category, option)}
                                                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${selectedFilters[category].includes(option)
                                                            ? 'bg-white text-black border-white shadow-lg scale-105'
                                                            : 'bg-white/5 text-white/60 border-transparent hover:bg-white/10 hover:text-white hover:border-white/10'
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
                                            className="text-xs text-gold font-bold uppercase tracking-widest hover:text-white transition-colors"
                                        >
                                            Close Filters
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Results Count */}
                <div className="text-center mb-8">
                    <p className="text-white/40 text-sm tracking-wide">
                        Showing <span className="font-bold text-white">{filteredPhotos.length}</span> of{' '}
                        <span className="font-bold text-white">{photos.length}</span> transformations
                    </p>
                </div>

                {/* Photo Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPhotos.map((photo, index) => (
                        <motion.div
                            key={photo.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setSelectedPhoto(photo)}
                            className="group cursor-pointer"
                        >
                            <div className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-500 hover:border-gold/30 hover:-translate-y-2">
                                {/* Before/After Images */}
                                <div className="relative aspect-[4/3] overflow-hidden group-hover:scale-[1.02] transition-transform duration-700">
                                    <div className="absolute inset-0 grid grid-cols-2">
                                        <div className="relative border-r border-white/20">
                                            <img
                                                src={photo.beforeImage}
                                                alt="Before"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md text-white/80 text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/10">
                                                Before
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <img
                                                src={photo.afterImage}
                                                alt="After"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute top-3 right-3 px-3 py-1 bg-gold/90 backdrop-blur-md text-black text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                                                After
                                            </div>
                                        </div>
                                    </div>
                                    {/* Center Divider Gradient */}
                                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-white/50 shadow-[0_0_10px_rgba(255,255,255,0.5)] z-10 opacity-50"></div>
                                </div>

                                {/* Tags */}
                                <div className="p-6">
                                    {/* Skin Tone */}
                                    <div className="flex items-center gap-3 mb-4 p-3 bg-white/5 rounded-xl border border-white/5">
                                        <div
                                            className="w-8 h-8 rounded-full border border-white/20 shadow-sm"
                                            style={{ backgroundColor: photo.skinTone.hex }}
                                        />
                                        <div>
                                            <p className="text-xs text-white font-bold capitalize">{photo.skinTone.category}</p>
                                            <p className="text-[10px] text-white/50 capitalize">{photo.skinTone.undertone} undertone</p>
                                        </div>
                                    </div>

                                    {/* Style Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {photo.makeup.styles.slice(0, 3).map(style => (
                                            <span
                                                key={style}
                                                className="px-3 py-1 bg-white/5 border border-white/10 text-white/80 rounded-full text-[10px] font-bold uppercase tracking-wide group-hover:border-gold/30 group-hover:text-gold transition-colors"
                                            >
                                                {style}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Products Count */}
                                    <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-2">
                                        <div className="text-xs text-white/40 flex items-center gap-1.5">
                                            <Tag size={12} />
                                            {photo.products.length} products used
                                        </div>
                                        <div className="text-gold text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                                            View Details →
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredPhotos.length === 0 && (
                    <div className="text-center py-32 bg-white/5 border border-white/10 rounded-[3rem]">
                        <div className="text-6xl mb-6 opacity-50">🔍</div>
                        <h3 className="text-2xl font-serif italic text-white mb-2">No Results Found</h3>
                        <p className="text-white/40 mb-8 max-w-md mx-auto">We couldn't find any transformations matching your current filters. Try adjusting your search.</p>
                        <button
                            onClick={clearFilters}
                            className="bg-[#F5E6C8] text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white transition-all shadow-glow"
                        >
                            Clear Filters
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
                            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
                            onClick={() => setSelectedPhoto(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] max-w-5xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl relative"
                            >
                                {/* Close Button */}
                                <button
                                    onClick={() => setSelectedPhoto(null)}
                                    className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-red-500/80 hover:text-white text-white/70 transition-colors z-20 border border-white/10"
                                >
                                    <X size={18} />
                                </button>

                                {/* Images */}
                                <div className="grid md:grid-cols-2 gap-2 p-2 bg-black/20">
                                    <div className="relative group overflow-hidden rounded-[2rem]">
                                        <div className="absolute top-4 left-4 px-4 py-1.5 bg-black/60 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest rounded-full z-10 border border-white/10">Before</div>
                                        <img
                                            src={selectedPhoto.beforeImage}
                                            alt="Before"
                                            className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="relative group overflow-hidden rounded-[2rem]">
                                        <div className="absolute top-4 right-4 px-4 py-1.5 bg-gold/90 backdrop-blur-md text-black text-xs font-bold uppercase tracking-widest rounded-full z-10 shadow-lg">After</div>
                                        <img
                                            src={selectedPhoto.afterImage}
                                            alt="After"
                                            className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="p-10 border-t border-white/5">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                                        <div>
                                            <h3 className="text-3xl font-serif italic text-white mb-2">Transformation Details</h3>
                                            <p className="text-white/40 text-sm">Performed by <span className="text-gold font-bold">{selectedPhoto.metadata.customerName || 'Expert Artist'}</span> • {selectedPhoto.metadata.date}</p>
                                        </div>
                                        <button className="bg-[#F5E6C8] text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white transition-all shadow-[0_0_20px_rgba(245,230,200,0.3)] hover:scale-105 w-full md:w-auto">
                                            Book This Look
                                        </button>
                                    </div>

                                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                        {/* Skin Analysis */}
                                        <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                                            <h4 className="font-bold mb-4 text-xs uppercase tracking-widest text-white/40 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 bg-gold rounded-full" /> Skin Profile
                                            </h4>
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className="w-14 h-14 rounded-full border-2 border-white/20 shadow-lg ring-2 ring-black/50"
                                                    style={{ backgroundColor: selectedPhoto.skinTone.hex }}
                                                />
                                                <div>
                                                    <p className="font-bold text-white text-lg capitalize">{selectedPhoto.skinTone.category}</p>
                                                    <p className="text-xs text-white/50 capitalize font-mono bg-white/5 px-2 py-0.5 rounded mt-1 inline-block">{selectedPhoto.skinTone.undertone}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Makeup Styles */}
                                        <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                                            <h4 className="font-bold mb-4 text-xs uppercase tracking-widest text-white/40 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 bg-gold rounded-full" /> Styles
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedPhoto.makeup.styles.map(style => (
                                                    <span
                                                        key={style}
                                                        className="px-3 py-1 bg-white/10 text-white rounded-lg text-xs font-bold border border-white/5"
                                                    >
                                                        {style}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Products Used */}
                                        <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                                            <h4 className="font-bold mb-4 text-xs uppercase tracking-widest text-white/40 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 bg-gold rounded-full" /> Products
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedPhoto.products.map(product => (
                                                    <span
                                                        key={product}
                                                        className="px-3 py-1 bg-white/5 text-white/70 rounded-lg text-xs border border-white/5"
                                                    >
                                                        {product}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Occasions */}
                                        <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                                            <h4 className="font-bold mb-4 text-xs uppercase tracking-widest text-white/40 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 bg-gold rounded-full" /> Perfect For
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedPhoto.occasions.map(occasion => (
                                                    <span
                                                        key={occasion}
                                                        className="px-3 py-1 bg-gold/10 text-gold rounded-lg text-xs font-bold border border-gold/10"
                                                    >
                                                        {occasion}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            {/* Custom Scrollbar Styles for Modal */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.4);
                }
            `}</style>
        </section>
    );
};

export default AITaggedGallery;
