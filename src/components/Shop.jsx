import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Filter, Heart, Star, ChevronDown, ChevronRight,
    X, Plus, ShoppingBag, LayoutGrid,
    List, Sparkles, Droplet,
    Wind, Palette, Waves, Tag, ArrowRight, RefreshCw, Loader2
} from 'lucide-react';

import { useShopStore } from '../store/useShopStore';
import { ALL_PRODUCTS, SHOP_CATEGORIES } from '../data/boutiqueProducts';
import { getAllProducts, getBrands } from '../data/makeupBrands';
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

import ProductModal from './ProductModal';
import Image from './ui/Image';

// --- ERROR BOUNDARY ---
class QueryErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        console.warn("Convex Query Failed (using local data):", error);
    }
    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}

// --- CLOUD DATA WRAPPER ---
const ShopWithCloud = () => {
    const cloudProducts = useQuery(api.products.list);
    const isLoading = cloudProducts === undefined;

    return <ShopContent cloudProducts={cloudProducts} isCloudLoading={isLoading} />;
};

// --- MAIN CONTENT ---
const ShopContent = ({ cloudProducts, isCloudLoading }) => {
    const { cart, wishlist, toggleWishlist, addToCart, getCartTotal, getCartCount, isCartOpen, setCartOpen, isPaymentOpen, setPaymentOpen } = useShopStore();

    // --- CONVEX DATA MERGE ---
    const localProducts = useMemo(() => {
        return [...ALL_PRODUCTS, ...getAllProducts()];
    }, []);

    const products = useMemo(() => {
        if (cloudProducts && cloudProducts.length > 0) return cloudProducts;
        return localProducts;
    }, [cloudProducts, localProducts]);

    // --- STATE ---
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [activeSub, setActiveSub] = useState('All');
    const [priceRange, setPriceRange] = useState(100000); // 100k Max
    const [sortBy, setSortBy] = useState('popular');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [viewMode, setViewMode] = useState('grid');
    const [onlyInStock, setOnlyInStock] = useState(false);
    const [selectedBrands, setSelectedBrands] = useState([]);

    const createOrder = async (orderData) => {
        console.log('Mock Order Created:', orderData);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { success: true, orderId: orderData.orderId };
    };

    const { international, local } = useMemo(() => {
        try {
            return getBrands?.() || { international: [], local: [] };
        } catch (e) {
            return { international: [], local: [] };
        }
    }, []);

    const brandLogos = useMemo(() => {
        const mapping = {};
        [...international, ...local].forEach(b => {
            mapping[b.name] = b.logo;
            if (b.name === "MAC Cosmetics") mapping["MAC"] = b.logo;
            if (b.name === "Maybelline New York") mapping["Maybelline"] = b.logo;
            if (b.name === "L'Oréal Paris") mapping["L'Oreal"] = b.logo;
            if (b.name === "Affaire Cosmetics") mapping["Affaire"] = b.logo;
            if (b.name === "Nirvana Color") mapping["Nirvana"] = b.logo;
            if (b.name === "Dot & Key") mapping["Dot & Key"] = b.logo;
        });
        return mapping;
    }, [international, local]);

    const brands = useMemo(() => {
        return [...new Set(products.map(p => p.brand))].sort();
    }, [products]);

    const CATEGORY_ICONS = {
        all: <LayoutGrid size={16} />,
        makeup: <Sparkles size={16} />,
        skincare: <Droplet size={16} />,
        haircare: <Wind size={16} />,
        nails: <Palette size={16} />,
        fragrance: <Waves size={16} />,
        accessories: <Tag size={16} />
    };

    const filteredProducts = useMemo(() => {
        let result = products.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.brand.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
            const matchesSub = activeSub === 'All' || p.subcategory === activeSub;
            const matchesPrice = p.price <= priceRange;
            const matchesStock = !onlyInStock || p.stockStatus !== 'Out of Stock';
            const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
            return matchesSearch && matchesCategory && matchesSub && matchesPrice && matchesStock && matchesBrand;
        });

        result.sort((a, b) => {
            if (sortBy === 'brand') return a.brand.localeCompare(b.brand);
            if (sortBy === 'price-low') return a.price - b.price;
            if (sortBy === 'price-high') return b.price - a.price;
            if (sortBy === 'rating') return b.rating - a.rating;
            return b.reviews - a.reviews;
        });
        return result;
    }, [products, searchQuery, activeCategory, activeSub, priceRange, sortBy, onlyInStock, selectedBrands]);

    const activeCategoryObj = SHOP_CATEGORIES.find(c => c.id === activeCategory);

    return (
        <section id="shop" className="py-12 bg-[#121110] relative min-h-screen">
            <div className="container mx-auto px-6 mb-16">
                {/* 1. Large Hero Bento */}
                <div className="bento-card min-h-[600px] flex flex-col justify-center p-12 md:p-20 relative group overflow-hidden mb-8">
                    {/* Category Navigation (Notch) */}
                    <div className="absolute top-0 right-0 bento-notch hidden lg:flex items-center gap-1 z-20 pr-12">
                        {SHOP_CATEGORIES.slice(0, 5).map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => { setActiveCategory(cat.id); setActiveSub('All'); }}
                                className={`flex items-center gap-2 px-5 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat.id ? 'bg-primary text-black' : 'text-white/40 hover:text-white'}`}
                            >
                                <span className={activeCategory === cat.id ? 'opacity-100' : 'opacity-70'}>{CATEGORY_ICONS[cat.id]}</span>
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    <div className="relative z-10 max-w-2xl">
                        <div className="bento-ribbon mb-8 text-primary w-fit">
                            <Tag size={14} fill="currentColor" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em]">The Boutique</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-sans font-black text-white leading-[0.9] mb-8 uppercase tracking-tighter drop-shadow-2xl">
                            CURATED <br />
                            <span className="text-primary italic">LUXURY</span>
                        </h1>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.3em] max-w-sm mb-12 leading-relaxed opacity-80">
                            Discover our collection of premium, authentic beauty essentials from global houses.
                        </p>
                        <button className="flex items-center gap-4 group/btn">
                            <div className="h-px w-12 bg-primary" />
                            <span className="text-[10px] font-black text-white uppercase tracking-[0.3em] group-hover/btn:text-primary transition-colors">Start Browse</span>
                        </button>
                    </div>

                    {/* Hero Visual */}
                    <div className="absolute right-0 bottom-0 top-0 w-full lg:w-[65%] overflow-hidden pointer-events-none rounded-l-[4rem]">
                        <img
                            src="https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?q=80&w=1200"
                            alt="Featured Hero"
                            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-all duration-1000 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#121110] via-[#121110]/20 to-transparent" />
                    </div>
                </div>

                {/* 2. Brand Strip */}
                <div className="overflow-x-auto no-scrollbar pb-12">
                    <div className="flex gap-4 w-max">
                        {[...international, ...local].slice(0, 10).map(brand => (
                            <button
                                key={brand.id}
                                onClick={() => setSelectedBrands(prev => prev.includes(brand.name) ? prev.filter(b => b !== brand.name) : [...prev, brand.name])}
                                className={`h-24 px-8 rounded-[2rem] border transition-all flex items-center justify-center min-w-[160px] ${selectedBrands.includes(brand.name) ? 'bg-white/10 border-primary' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                            >
                                {brand.logo ? (
                                    <img src={brand.logo} alt={brand.name} className={`h-8 w-auto object-contain ${selectedBrands.includes(brand.name) ? 'brightness-125' : 'grayscale opacity-60'}`} />
                                ) : (
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{brand.name}</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 3. Main Split Layout */}
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar - Bento Style */}
                    <div className="w-full lg:w-80 shrink-0 space-y-8 lg:sticky lg:top-32 lg:self-start">
                        {/* Search */}
                        <div className="bento-card p-4 bg-[#0A0A0A]">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={16} />
                                <input
                                    type="text"
                                    placeholder="SEARCH..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-white/5 rounded-xl border border-white/5 outline-none text-[10px] font-black uppercase tracking-widest text-white placeholder:text-gray-600 focus:border-primary/50 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="bento-card p-6 bg-[#0A0A0A] space-y-2">
                            <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 mb-4 px-2">Departments</h4>
                            {SHOP_CATEGORIES.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => { setActiveCategory(cat.id); setActiveSub('All'); }}
                                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${activeCategory === cat.id ? 'bg-primary text-black' : 'hover:bg-white/5 text-gray-400'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className={activeCategory === cat.id ? 'opacity-100' : 'opacity-70'}>{CATEGORY_ICONS[cat.id]}</span>
                                        <span className="text-[9px] font-black uppercase tracking-widest">{cat.name}</span>
                                    </div>
                                    {activeCategory === cat.id && <ChevronRight size={14} />}
                                </button>
                            ))}
                        </div>

                        {/* Price Range */}
                        <div className="bento-card p-6 bg-[#0A0A0A]">
                            <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 mb-6 px-2">Max Investment</h4>
                            <input
                                type="range" min="0" max="100000" step="500"
                                value={priceRange}
                                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary mb-4"
                            />
                            <div className="flex justify-between items-center text-[10px] font-bold text-white">
                                <span>৳0</span>
                                <span>৳{priceRange.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1 space-y-8">
                        {/* Controls */}
                        <div className="bento-card p-4 bg-[#0A0A0A] flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-3">
                                <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Sort:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-white/5 text-white border-none outline-none px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest cursor-pointer hover:bg-white/10"
                                >
                                    <option value="popular" className="bg-[#0A0A0A]">Popularity</option>
                                    <option value="price-low" className="bg-[#0A0A0A]">Price: Low</option>
                                    <option value="price-high" className="bg-[#0A0A0A]">Price: High</option>
                                </select>
                            </div>

                            <div className="flex gap-2 bg-white/5 p-1 rounded-lg">
                                <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-primary text-black' : 'text-white/40'}`}><LayoutGrid size={14} /></button>
                                <button onClick={() => setViewMode('list')} className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-primary text-black' : 'text-white/40'}`}><List size={14} /></button>
                            </div>
                        </div>

                        {/* Grid */}
                        {isCloudLoading ? (
                            <div className="flex flex-col items-center justify-center py-40 bg-white/5 rounded-[4rem] border border-white/10">
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}>
                                    <Loader2 className="text-primary" size={48} />
                                </motion.div>
                                <p className="mt-6 text-[10px] font-black uppercase tracking-widest text-white/40">Synchronizing with Radiance Cloud...</p>
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'} relative`}>
                                <AnimatePresence mode="popLayout">
                                    {filteredProducts.map((p, idx) => (
                                        <ProductCard
                                            key={p.id}
                                            product={p}
                                            index={idx}
                                            viewMode={viewMode}
                                            onClick={() => setSelectedProduct(p)}
                                        />
                                    ))}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-40 bg-white/5 rounded-[4rem] border border-white/10 text-center px-6">
                                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10">
                                    <Search className="text-white/20" size={32} />
                                </div>
                                <h3 className="text-2xl font-serif text-white italic mb-4">No treasures found</h3>
                                <p className="text-sm text-white/40 max-w-sm mb-10 leading-relaxed uppercase tracking-tighter font-bold">Try adjusting your filters or search terms to find the perfect addition to your collection.</p>
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setActiveCategory('All');
                                        setPriceRange([0, 10000]);
                                        setSelectedBrands([]);
                                    }}
                                    className="flex items-center gap-3 px-8 py-4 bg-primary text-black rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white transition-all shadow-glow"
                                >
                                    <RefreshCw size={14} /> Reset All Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Cart Trigger */}
            <motion.button
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                onClick={() => setCartOpen(true)}
                className="fixed bottom-10 right-10 z-[100] w-16 h-16 bg-primary text-black rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
            >
                <ShoppingBag size={24} />
                {getCartCount() > 0 && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center text-[9px] font-black">{getCartCount()}</div>
                )}
            </motion.button>

            {/* Modals */}
            <AnimatePresence>
                {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
            </AnimatePresence>
        </section>
    );
};

// --- PRODUCT CARD ---
const ProductCard = ({ product, index, viewMode, onClick }) => {
    const { toggleWishlist, wishlist, addToCart } = useShopStore();
    const isWishlisted = wishlist.includes(product.id);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className={`group bento-card p-0 flex flex-col justify-between overflow-hidden cursor-pointer ${viewMode === 'list' ? 'flex-row' : ''}`}
            onClick={onClick}
        >
            {/* Image */}
            <div className={`relative overflow-hidden bg-white/5 ${viewMode === 'list' ? 'w-48 aspect-square' : 'aspect-[4/5]'}`}>
                <Image
                    src={product.images?.[0] || 'https://images.unsplash.com/photo-1596462502278-27bfaf433393?q=80&w=800'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    alt={product.name}
                />

                {/* Actions Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-black hover:bg-primary'}`}
                    >
                        <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                        className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-primary hover:text-black transition-all"
                    >
                        <Plus size={16} />
                    </button>
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                    {product.isNew && <span className="px-3 py-1 bg-primary text-black text-[8px] font-black uppercase tracking-widest rounded-full">New</span>}
                </div>
            </div>

            {/* Content */}
            <div className={`p-6 flex flex-col ${viewMode === 'list' ? 'justify-center flex-1' : ''}`}>
                <div className="mb-4">
                    <span className="text-[9px] font-black uppercase tracking-widest text-primary mb-1 block">{product.brand}</span>
                    <h4 className="text-xl font-serif text-white group-hover:text-primary transition-colors">{product.name}</h4>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <span className="text-lg font-black text-white">৳{product.price.toLocaleString()}</span>
                    <div className="flex items-center gap-1 text-[9px] font-bold text-white/40">
                        <Star size={10} className="text-primary fill-primary" />
                        {product.rating.toFixed(1)}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Shop = () => (
    <QueryErrorBoundary fallback={<ShopContent cloudProducts={null} />}>
        <ShopWithCloud />
    </QueryErrorBoundary>
);

export default Shop;
