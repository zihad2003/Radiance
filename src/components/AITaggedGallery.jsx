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
        <section className="py-20 bg-gradient-to-b from-white to-pearl">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-6 py-2 bg-gradient-to-r from-primary to-accent rounded-full shadow-lg mb-6"
                    >
                        <span className="text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                            <Sparkles size={14} fill="currentColor" />
                            AI-Tagged Gallery
                        </span>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-serif italic mb-4">
                        Before & After Transformations
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore our stunning transformations, automatically tagged by AI for easy discovery
                    </p>
                </div>

                {/* Search & Filter Bar */}
                <div className="max-w-4xl mx-auto mb-12">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by style, product, occasion..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                            />
                        </div>

                        {/* Filter Button */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="px-8 py-4 bg-white border-2 border-gray-200 rounded-2xl font-bold uppercase tracking-widest text-sm hover:border-primary transition-all flex items-center gap-2 justify-center"
                        >
                            <Filter size={18} />
                            Filters
                            <ChevronDown size={18} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                        </button>
                    </div>

                    {/* Active Filters */}
                    {Object.values(selectedFilters).some(arr => arr.length > 0) && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {Object.entries(selectedFilters).map(([category, values]) =>
                                values.map(value => (
                                    <span
                                        key={`${category}-${value}`}
                                        className="px-4 py-2 bg-primary text-white rounded-full text-sm flex items-center gap-2"
                                    >
                                        {value}
                                        <button
                                            onClick={() => toggleFilter(category, value)}
                                            className="hover:bg-white/20 rounded-full p-0.5"
                                        >
                                            <X size={14} />
                                        </button>
                                    </span>
                                ))
                            )}
                            <button
                                onClick={clearFilters}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300 transition-colors"
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
                                className="mt-4 bg-white rounded-2xl shadow-lg overflow-hidden"
                            >
                                <div className="p-6 space-y-6">
                                    {Object.entries(filterOptions).map(([category, options]) => (
                                        <div key={category}>
                                            <h3 className="font-bold capitalize mb-3 text-sm uppercase tracking-widest text-gray-500">
                                                {category}
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {options.map(option => (
                                                    <button
                                                        key={option}
                                                        onClick={() => toggleFilter(category, option)}
                                                        className={`px-4 py-2 rounded-full text-sm transition-all ${selectedFilters[category].includes(option)
                                                                ? 'bg-primary text-white shadow-lg'
                                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                            }`}
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Results Count */}
                <div className="text-center mb-8">
                    <p className="text-gray-600">
                        Showing <span className="font-bold text-primary">{filteredPhotos.length}</span> of{' '}
                        <span className="font-bold">{photos.length}</span> transformations
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
                            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                                {/* Before/After Images */}
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <div className="absolute inset-0 grid grid-cols-2">
                                        <div className="relative">
                                            <img
                                                src={photo.beforeImage}
                                                alt="Before"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute top-2 left-2 px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                                                BEFORE
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <img
                                                src={photo.afterImage}
                                                alt="After"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute top-2 right-2 px-3 py-1 bg-primary/90 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                                                AFTER
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute inset-y-0 left-1/2 w-0.5 bg-white shadow-lg"></div>
                                </div>

                                {/* Tags */}
                                <div className="p-6">
                                    {/* Skin Tone */}
                                    <div className="flex items-center gap-2 mb-3">
                                        <div
                                            className="w-6 h-6 rounded-full border-2 border-white shadow"
                                            style={{ backgroundColor: photo.skinTone.hex }}
                                        />
                                        <span className="text-sm text-gray-600 capitalize">
                                            {photo.skinTone.category} • {photo.skinTone.undertone}
                                        </span>
                                    </div>

                                    {/* Style Tags */}
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {photo.makeup.styles.slice(0, 3).map(style => (
                                            <span
                                                key={style}
                                                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold"
                                            >
                                                {style}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Products Count */}
                                    <div className="text-xs text-gray-500">
                                        <Tag size={12} className="inline mr-1" />
                                        {photo.products.length} products used
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredPhotos.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold mb-2">No Results Found</h3>
                        <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
                        <button
                            onClick={clearFilters}
                            className="bg-primary text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-accent transition-all"
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
                                className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
                            >
                                {/* Close Button */}
                                <button
                                    onClick={() => setSelectedPhoto(null)}
                                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors z-10"
                                >
                                    <X size={20} />
                                </button>

                                {/* Images */}
                                <div className="grid md:grid-cols-2 gap-4 p-6">
                                    <div>
                                        <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Before</p>
                                        <img
                                            src={selectedPhoto.beforeImage}
                                            alt="Before"
                                            className="w-full rounded-2xl shadow-lg"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">After</p>
                                        <img
                                            src={selectedPhoto.afterImage}
                                            alt="After"
                                            className="w-full rounded-2xl shadow-lg"
                                        />
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="p-6 border-t border-gray-100">
                                    <h3 className="text-2xl font-serif italic mb-6">Transformation Details</h3>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* Skin Analysis */}
                                        <div>
                                            <h4 className="font-bold mb-3 text-sm uppercase tracking-widest text-gray-500">Skin Analysis</h4>
                                            <div className="flex items-center gap-3 mb-2">
                                                <div
                                                    className="w-12 h-12 rounded-full border-4 border-white shadow-lg"
                                                    style={{ backgroundColor: selectedPhoto.skinTone.hex }}
                                                />
                                                <div>
                                                    <p className="font-bold capitalize">{selectedPhoto.skinTone.category}</p>
                                                    <p className="text-sm text-gray-600 capitalize">{selectedPhoto.skinTone.undertone} undertone</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Makeup Styles */}
                                        <div>
                                            <h4 className="font-bold mb-3 text-sm uppercase tracking-widest text-gray-500">Makeup Styles</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedPhoto.makeup.styles.map(style => (
                                                    <span
                                                        key={style}
                                                        className="px-4 py-2 bg-primary text-white rounded-full text-sm font-bold"
                                                    >
                                                        {style}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Products Used */}
                                        <div>
                                            <h4 className="font-bold mb-3 text-sm uppercase tracking-widest text-gray-500">Products Used</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedPhoto.products.map(product => (
                                                    <span
                                                        key={product}
                                                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                                    >
                                                        {product}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Occasions */}
                                        <div>
                                            <h4 className="font-bold mb-3 text-sm uppercase tracking-widest text-gray-500">Perfect For</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedPhoto.occasions.map(occasion => (
                                                    <span
                                                        key={occasion}
                                                        className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-bold"
                                                    >
                                                        {occasion}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <div className="mt-8 text-center">
                                        <button className="bg-primary text-white px-12 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-accent transition-all shadow-2xl hover:scale-105">
                                            Book This Look
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default AITaggedGallery;
