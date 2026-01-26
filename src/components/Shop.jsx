import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ShoppingCart, Heart, Star, ChevronDown, X, Plus, Minus } from 'lucide-react';
import { getAllProducts, getBrands } from '../data/makeupBrands';
import FadeIn from './ui/FadeIn';

const Shop = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedBrand, setSelectedBrand] = useState('all');
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [sortBy, setSortBy] = useState('featured');
    const [showFilters, setShowFilters] = useState(false);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const allProducts = getAllProducts();
    const brands = getBrands();

    const categories = [
        { id: 'all', name: 'All Products', icon: '🛍️' },
        { id: 'lips', name: 'Lips', icon: '💄' },
        { id: 'eyes', name: 'Eyes', icon: '👁️' },
        { id: 'face', name: 'Face', icon: '✨' },
        { id: 'cheeks', name: 'Cheeks', icon: '🌸' },
        { id: 'nails', name: 'Nails', icon: '💅' },
        { id: 'skincare', name: 'Skincare', icon: '🧴' }
    ];

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let filtered = allProducts.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.brand.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
            const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

            return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
        });

        // Sort products
        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'popular':
                filtered.sort((a, b) => b.reviews - a.reviews);
                break;
            default:
                break;
        }

        return filtered;
    }, [allProducts, searchQuery, selectedCategory, selectedBrand, priceRange, sortBy]);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const toggleWishlist = (productId) => {
        setWishlist(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <section className="py-24 bg-gradient-to-b from-white to-pearl relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <FadeIn>
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-sans uppercase tracking-[0.3em] text-primary mb-4">Shop</h2>
                        <h3 className="text-4xl md:text-6xl font-serif text-charcoal mb-6">Premium Beauty Products</h3>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Curated collection of 400+ authentic products from international and local brands
                        </p>
                    </div>
                </FadeIn>

                {/* Search and Filter Bar */}
                <FadeIn delay={0.1}>
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-12 border border-gray-100">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search products, brands..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>

                            {/* Filter Toggle */}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="px-6 py-3 bg-charcoal text-white rounded-xl hover:bg-primary transition-colors flex items-center gap-2"
                            >
                                <Filter size={20} />
                                Filters
                            </button>

                            {/* Cart */}
                            <button className="relative px-6 py-3 bg-gold text-white rounded-xl hover:bg-gold/90 transition-colors flex items-center gap-2">
                                <ShoppingCart size={20} />
                                Cart
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </div>

                        {/* Filters Panel */}
                        <AnimatePresence>
                            {showFilters && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-6 mt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {/* Brand Filter */}
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Brand</label>
                                            <select
                                                value={selectedBrand}
                                                onChange={(e) => setSelectedBrand(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            >
                                                <option value="all">All Brands</option>
                                                {[...brands.international, ...brands.local].map(brand => (
                                                    <option key={brand.name} value={brand.name}>{brand.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Sort */}
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Sort By</label>
                                            <select
                                                value={sortBy}
                                                onChange={(e) => setSortBy(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            >
                                                <option value="featured">Featured</option>
                                                <option value="price-low">Price: Low to High</option>
                                                <option value="price-high">Price: High to Low</option>
                                                <option value="rating">Highest Rated</option>
                                                <option value="popular">Most Popular</option>
                                            </select>
                                        </div>

                                        {/* Price Range */}
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                                Price Range: ৳{priceRange[0]} - ৳{priceRange[1]}
                                            </label>
                                            <input
                                                type="range"
                                                min="0"
                                                max="10000"
                                                value={priceRange[1]}
                                                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                                className="w-full accent-primary"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </FadeIn>

                {/* Category Tabs */}
                <FadeIn delay={0.2}>
                    <div className="flex overflow-x-auto gap-4 mb-12 pb-4 hide-scrollbar">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap transition-all ${selectedCategory === category.id
                                        ? 'bg-charcoal text-white shadow-lg scale-105'
                                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                                    }`}
                            >
                                <span>{category.icon}</span>
                                <span className="font-semibold">{category.name}</span>
                            </button>
                        ))}
                    </div>
                </FadeIn>

                {/* Results Count */}
                <div className="mb-6 text-gray-600">
                    Showing <span className="font-bold text-charcoal">{filteredProducts.length}</span> products
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product, index) => (
                        <FadeIn key={product.id} delay={index * 0.05}>
                            <motion.div
                                whileHover={{ y: -8 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 group"
                            >
                                {/* Product Image */}
                                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                                    <div
                                        className="w-full h-full flex items-center justify-center"
                                        style={{ backgroundColor: product.hex }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>

                                    {/* Wishlist Button */}
                                    <button
                                        onClick={() => toggleWishlist(product.id)}
                                        className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                                    >
                                        <Heart
                                            size={18}
                                            className={wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}
                                        />
                                    </button>

                                    {/* Quick View */}
                                    <button
                                        onClick={() => setSelectedProduct(product)}
                                        className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        Quick View
                                    </button>
                                </div>

                                {/* Product Info */}
                                <div className="p-4">
                                    <div className="text-xs text-primary font-semibold mb-1">{product.brand}</div>
                                    <h4 className="font-bold text-charcoal mb-2 line-clamp-2 h-12">{product.name}</h4>

                                    {/* Rating */}
                                    <div className="flex items-center gap-1 mb-3">
                                        <Star size={14} className="fill-gold text-gold" />
                                        <span className="text-sm font-semibold">{product.rating.toFixed(1)}</span>
                                        <span className="text-xs text-gray-500">({product.reviews})</span>
                                    </div>

                                    {/* Price and Add to Cart */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-xl font-bold text-charcoal">৳{product.price}</div>
                                            <div className="text-xs text-gray-500">${product.priceUSD}</div>
                                        </div>
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="w-10 h-10 bg-charcoal text-white rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                                        >
                                            <Plus size={18} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </FadeIn>
                    ))}
                </div>

                {/* Empty State */}
                {filteredProducts.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-serif text-charcoal mb-2">No products found</h3>
                        <p className="text-gray-600">Try adjusting your filters or search query</p>
                    </div>
                )}
            </div>

            {/* Product Quick View Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
                        onClick={() => setSelectedProduct(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                        >
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <div className="text-sm text-primary font-semibold mb-2">{selectedProduct.brand}</div>
                                        <h3 className="text-3xl font-serif text-charcoal">{selectedProduct.name}</h3>
                                    </div>
                                    <button
                                        onClick={() => setSelectedProduct(null)}
                                        className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    {/* Product Image */}
                                    <div
                                        className="aspect-square rounded-2xl"
                                        style={{ backgroundColor: selectedProduct.hex }}
                                    />

                                    {/* Product Details */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <Star size={18} className="fill-gold text-gold" />
                                            <span className="font-semibold">{selectedProduct.rating.toFixed(1)}</span>
                                            <span className="text-gray-500">({selectedProduct.reviews} reviews)</span>
                                        </div>

                                        <div className="text-3xl font-bold text-charcoal mb-6">
                                            ৳{selectedProduct.price}
                                            <span className="text-lg text-gray-500 ml-2">${selectedProduct.priceUSD}</span>
                                        </div>

                                        <p className="text-gray-600 mb-6">{selectedProduct.description}</p>

                                        <div className="space-y-4 mb-6">
                                            <div className="flex justify-between py-3 border-b border-gray-100">
                                                <span className="text-gray-600">Finish</span>
                                                <span className="font-semibold capitalize">{selectedProduct.finish}</span>
                                            </div>
                                            <div className="flex justify-between py-3 border-b border-gray-100">
                                                <span className="text-gray-600">Category</span>
                                                <span className="font-semibold capitalize">{selectedProduct.category}</span>
                                            </div>
                                            <div className="flex justify-between py-3 border-b border-gray-100">
                                                <span className="text-gray-600">Stock</span>
                                                <span className="font-semibold text-green-600">In Stock</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => {
                                                addToCart(selectedProduct);
                                                setSelectedProduct(null);
                                            }}
                                            className="w-full py-4 bg-charcoal text-white rounded-xl font-bold hover:bg-primary transition-colors"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Shop;
