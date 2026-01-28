import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Filter, Heart, Star, ChevronDown, ChevronRight,
    X, Plus, ShoppingBag, Sliders, LayoutGrid,
    List, Sparkles, ShieldCheck, Tag, Droplet,
    Wind, Palette, Waves
} from 'lucide-react';

import { useShopStore } from '../store/useShopStore';
import { ALL_PRODUCTS, SHOP_CATEGORIES } from '../data/boutiqueProducts';
import { getAllProducts, getBrands } from '../data/makeupBrands';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

import FadeIn from './ui/FadeIn';
import Counter from './ui/Counter';
import ProductModal from './ProductModal';
import CartSlideOut from './CartSlideOut';
import PaymentGateway from './payment/PaymentGateway';
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
    // This hook might throw if backend is not synced
    const cloudProducts = useQuery(api?.products?.list || null);

    // If we get here, query succeeded or is loading
    return <ShopContent cloudProducts={cloudProducts} />;
};

// --- MAIN CONTENT ---
const ShopContent = ({ cloudProducts }) => {
    const { cart, wishlist, toggleWishlist, addToCart, getCartTotal, getCartCount } = useShopStore();

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
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);
    const [viewMode, setViewMode] = useState('grid');
    const [onlyInStock, setOnlyInStock] = useState(false);
    const [selectedBrands, setSelectedBrands] = useState([]);

    // Mock Create Order Function (until backend is ready)
    const createOrder = async (orderData) => {
        console.log('Mock Order Created:', orderData);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { success: true, orderId: orderData.orderId };
    };

    const { international, local } = useMemo(() => {
        try {
            const brandsData = getBrands?.() || { international: [], local: [] };
            return brandsData;
        } catch (e) {
            return { international: [], local: [] };
        }
    }, []);

    const brandLogos = useMemo(() => {
        const mapping = {};
        [...international, ...local].forEach(b => {
            mapping[b.name] = b.logo;
            // Also store shorthand/common names if they differ
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

    // --- FILTER LOGIC ---
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

        // Sorting
        result.sort((a, b) => {
            if (sortBy === 'brand') return a.brand.localeCompare(b.brand);
            if (sortBy === 'price-low') return a.price - b.price;
            if (sortBy === 'price-high') return b.price - a.price;
            if (sortBy === 'rating') return b.rating - a.rating;
            return b.reviews - a.reviews; // Popular
        });

        return result;
    }, [products, searchQuery, activeCategory, activeSub, priceRange, sortBy, onlyInStock, selectedBrands]);

    const activeCategoryObj = SHOP_CATEGORIES.find(c => c.id === activeCategory);

    return (
        <section id="shop" className="py-24 bg-[#121110] relative min-h-screen">
            <div className="container mx-auto px-6 pt-12 mb-16">
                {/* Main Bento Grid - Horizontal Layout from Reference */}
                <div className="flex flex-col gap-6">
                    {/* 1. Large Hero Section (Top) */}
                    <div className="bento-card min-h-[600px] flex flex-col justify-center p-12 md:p-24 relative group overflow-hidden">
                        {/* Nested Category Notch (Top Right) */}
                        <div className="absolute top-0 right-0 bento-notch hidden lg:flex items-center gap-2 z-20">
                            {SHOP_CATEGORIES.slice(0, 5).map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => { setActiveCategory(cat.id); setActiveSub('All'); }}
                                    className={`tab-folder flex items-center gap-2 ${activeCategory === cat.id ? 'tab-folder-active' : ''}`}
                                >
                                    <span className="opacity-70">{CATEGORY_ICONS[cat.id]}</span>
                                    {cat.name}
                                </button>
                            ))}
                        </div>

                        <div className="relative z-10 max-w-2xl">
                            <h1 className="text-4xl md:text-7xl font-sans font-black text-white leading-[1.1] mb-8 uppercase tracking-tighter drop-shadow-2xl">
                                BEAUTY DESIGNED FOR <br />
                                MODERN RADIANCE
                            </h1>
                            <p className="text-gray-400 text-xs md:text-sm max-w-sm mb-12 leading-relaxed font-bold uppercase tracking-widest opacity-80">
                                Crafted with precision, designed for comfort, and built to elevate everyday beauty.
                            </p>
                            <button className="bg-white text-black px-12 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary hover:text-white transition-all shadow-2xl">
                                Shop Collection
                            </button>
                        </div>

                        {/* Hero Visual Asset */}
                        <div className="absolute right-0 bottom-0 top-0 w-full lg:w-[60%] overflow-hidden pointer-events-none">
                            <img
                                src="https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?q=80&w=1200"
                                alt="Featured Hero"
                                className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-all duration-1000 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#1c1917] via-[#1c1917]/10 to-transparent" />
                        </div>
                    </div>

                    {/* 2. Smaller Cards (Bottom Row - 3 Columns) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Feature 1: Signature Lounge (adapted to Beauty) */}
                        <div className="bento-card p-12 min-h-[350px] flex flex-col justify-end group cursor-pointer">
                            <div className="absolute inset-0 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=800" className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-50 transition-all duration-700" alt="F1" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent" />
                            </div>
                            <div className="relative z-10">
                                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.4em] mb-4 block opacity-50">Featured</span>
                                <h3 className="text-3xl font-sans font-bold text-white mb-6 uppercase tracking-tighter">Signature Gloss</h3>
                                <span className="text-[9px] font-black text-white/40 uppercase tracking-widest flex items-center gap-2 group-hover:text-primary transition-colors">
                                    Shop now <ChevronRight size={14} />
                                </span>
                            </div>
                        </div>

                        {/* Feature 2: Refined Forms */}
                        <div className="bento-card p-12 min-h-[350px] flex flex-col items-start group cursor-pointer">
                            <div className="flex justify-between w-full mb-8 relative z-10">
                                <h3 className="text-2xl font-sans font-bold text-white uppercase tracking-tighter">Refined Formulas</h3>
                                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                    <ChevronRight size={16} />
                                </div>
                            </div>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-12 relative z-10">Simplified ingredients for cleaner design.</p>
                            <div className="mt-auto w-full relative h-32 overflow-hidden rounded-2xl">
                                <img src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800" className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all" alt="F2" />
                            </div>
                        </div>

                        {/* Feature 3: Closer Look */}
                        <div className="bento-card p-12 min-h-[350px] flex flex-col group cursor-pointer">
                            <h3 className="text-2xl font-sans font-bold text-white uppercase tracking-tighter mb-4 relative z-10">Closer Look</h3>
                            <div className="flex-1 relative overflow-hidden rounded-2xl">
                                <img src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800" className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 transition-all" alt="F3" />
                                {/* Interactive Dots to match reference */}
                                <div className="absolute top-1/2 left-1/3 w-6 h-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-all">
                                    <Plus size={10} className="text-white" />
                                </div>
                                <div className="absolute bottom-1/4 right-1/4 w-6 h-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-all">
                                    <Plus size={10} className="text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Branded Sortation Strip --- */}
            <div className="container mx-auto px-6 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-10 overflow-x-auto no-scrollbar py-10"
                >
                    <div className="shrink-0 text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mr-12 bg-white/5 px-6 py-3 rounded-full border border-white/5">Curated Houses:</div>
                    {[...international, ...local].map(brand => (
                        <button
                            key={brand.id}
                            onClick={() => {
                                setSelectedBrands(prev =>
                                    prev.includes(brand.name) ? prev.filter(b => b !== brand.name) : [...prev, brand.name]
                                );
                            }}
                            className={`flex flex-shrink-0 items-center justify-center px-10 py-6 min-w-[320px] h-48 transition-all duration-700 ${selectedBrands.includes(brand.name) ? 'scale-105' : 'grayscale opacity-80 hover:opacity-100 hover:grayscale-0 active:scale-95'} group/brand`}
                        >
                            <div className={`relative w-full h-full flex flex-col items-center justify-center border transition-all duration-500 ${selectedBrands.includes(brand.name) ? 'bg-[#1A1A1A] shadow-2xl border-primary' : 'bg-white/5 border-white/5 shadow-sm'}`}>
                                {brand.logo ? (
                                    <img
                                        src={brand.logo}
                                        alt={brand.name}
                                        className={`relative z-10 h-16 w-auto object-contain transition-all duration-700 ${selectedBrands.includes(brand.name) ? 'opacity-100' : 'opacity-60'}`}
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
                                        }}
                                    />
                                ) : null}

                                <span className={`${brand.logo ? 'mt-4' : ''} text-3xl font-serif italic tracking-tighter text-center transition-all duration-500 text-white relative z-10 leading-tight px-4`}>
                                    {brand.name}
                                </span>

                                {selectedBrands.includes(brand.name) && (
                                    <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full shadow-glow" />
                                )}
                            </div>
                        </button>
                    ))}
                </motion.div>
            </div>

            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* --- Sidebar Filters --- */}
                    {/* --- Sidebar Filters --- */}
                    <div className="w-full lg:w-80 shrink-0 space-y-12 lg:sticky lg:top-32 lg:self-start mb-12 lg:mb-0 max-h-[calc(100vh-160px)] overflow-y-auto no-scrollbar">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary" size={18} />
                            <input
                                type="text"
                                placeholder="Search boutique..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-16 pr-6 py-5 bg-charcoal/40 backdrop-blur-xl rounded-3xl border border-white/5 outline-none focus:border-primary transition-all text-xs font-bold shadow-2xl text-white placeholder:text-gray-600"
                            />
                        </div>

                        {/* Category Selector */}
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 border-b border-white/5 pb-4">Categories</h4>
                            <div className="space-y-2">
                                {SHOP_CATEGORIES.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => { setActiveCategory(cat.id); setActiveSub('All'); }}
                                        className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${activeCategory === cat.id ? 'bg-primary text-black shadow-glow' : 'hover:bg-white/5 text-gray-400'}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className={activeCategory === cat.id ? 'text-black' : 'text-primary'}>
                                                {CATEGORY_ICONS[cat.id]}
                                            </span>
                                            <span className="text-[10px] font-black uppercase tracking-widest">{cat.name}</span>
                                        </div>
                                        <ChevronDown size={14} className={activeCategory === cat.id ? 'rotate-180 transition-transform' : ''} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price Filter */}
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 border-b border-white/5 pb-4">Max Investment</h4>
                            <div className="px-2">
                                <input
                                    type="range" min="0" max="100000" step="500"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary mb-6"
                                />
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold text-gray-600">৳0</span>
                                    <span className="text-sm font-black text-white">৳{priceRange.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Brand Multi-Select */}
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 border-b border-white/5 pb-4">Featured Brands</h4>
                            <div className="grid grid-cols-2 gap-3">
                                {brands.slice(0, 10).map(brand => (
                                    <button
                                        key={brand}
                                        onClick={() => {
                                            setSelectedBrands(prev =>
                                                prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
                                            );
                                        }}
                                        className={`group relative p-4 rounded-2xl border transition-all flex flex-col items-center justify-center gap-2 overflow-hidden ${selectedBrands.includes(brand) ? 'bg-primary/10 border-primary shadow-inner-glow' : 'bg-white/5 border-white/5 hover:border-primary/30 shadow-sm'}`}
                                    >
                                        {brandLogos[brand] ? (
                                            <div className="h-8 w-full relative flex items-center justify-center">
                                                <img
                                                    src={brandLogos[brand]}
                                                    alt={brand}
                                                    className={`max-h-full max-w-full object-contain transition-all duration-300 ${selectedBrands.includes(brand) ? 'scale-110 brightness-125' : 'grayscale group-hover:grayscale-0'}`}
                                                />
                                            </div>
                                        ) : (
                                            <span className={`text-[9px] font-black uppercase tracking-widest ${selectedBrands.includes(brand) ? 'text-primary' : 'text-gray-500'}`}>
                                                {brand}
                                            </span>
                                        )}
                                        {selectedBrands.includes(brand) && (
                                            <motion.div layoutId="brandCheck" className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full shadow-glow" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quick Options */}
                        <div className="space-y-4 pt-6">
                            <label className="flex items-center gap-4 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={onlyInStock}
                                    onChange={(e) => setOnlyInStock(e.target.checked)}
                                    className="w-5 h-5 rounded-lg border-gray-200 text-primary focus:ring-primary appearance-none border checked:bg-primary checked:border-primary transition-all relative after:content-['✓'] after:absolute after:inset-0 after:flex after:items-center after:justify-center after:text-white after:text-xs after:opacity-0 checked:after:opacity-100"
                                />
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-charcoal transition-all">In Stock Only</span>
                            </label>
                        </div>
                    </div>

                    {/* --- Product Listing --- */}
                    <div className="flex-1 space-y-8">
                        {/* Listing Header */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-charcoal/40 backdrop-blur-2xl p-6 rounded-[2.5rem] border border-white/5 shadow-2xl">
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Sort By:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-white/5 text-white border-none outline-none px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-white/10 transition-colors"
                                >
                                    <option value="popular" className="bg-charcoal">Most Popular</option>
                                    <option value="brand" className="bg-charcoal">Sort by Brand</option>
                                    <option value="rating" className="bg-charcoal">Highest Rated</option>
                                    <option value="price-low" className="bg-charcoal">Price: Low to High</option>
                                    <option value="price-high" className="bg-charcoal">Price: High to Low</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-8">
                                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                    Showing <span className="text-charcoal">{filteredProducts.length}</span> Results
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-charcoal text-white shadow-md' : 'bg-gray-50 text-gray-300'}`}
                                    >
                                        <LayoutGrid size={18} />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-charcoal text-white shadow-md' : 'bg-gray-50 text-gray-300'}`}
                                    >
                                        <List size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Sub-Category Pills (if active) */}
                        {activeCategoryObj?.sub && (
                            <div className="flex flex-wrap gap-2 pb-4">
                                <button
                                    onClick={() => setActiveSub('All')}
                                    className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${activeSub === 'All' ? 'bg-primary text-white shadow-glow' : 'bg-white text-gray-400 border border-gray-100'}`}
                                >
                                    All {activeCategoryObj.name}
                                </button>
                                {activeCategoryObj.sub.map(s => (
                                    <button
                                        key={s}
                                        onClick={() => setActiveSub(s)}
                                        className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${activeSub === s ? 'bg-primary text-white shadow-glow' : 'bg-white text-gray-400 border border-gray-100'}`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Grid */}
                        <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
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

                        {/* Pagination / Load More */}
                        {filteredProducts.length > 0 && (
                            <div className="pt-12 text-center">
                                <button className="px-12 py-5 bg-white border border-gray-100 rounded-3xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-gray-50 transition-all shadow-sm">
                                    Discover More Excellence
                                </button>
                            </div>
                        )}

                        {filteredProducts.length === 0 && (
                            <div className="py-24 text-center">
                                <Tag size={80} className="mx-auto text-gray-100 mb-8" />
                                <h4 className="text-2xl font-serif italic mb-2">No Match Found</h4>
                                <p className="text-gray-400 text-sm">We couldn't find products matching your criteria. Try adjusting filters.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Cart Float / Trigger */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={() => setIsCartOpen(true)}
                className="fixed bottom-10 right-10 z-[100] w-20 h-20 bg-charcoal text-white rounded-full shadow-3xl flex items-center justify-center group pointer-events-auto"
            >
                <ShoppingBag size={28} className="group-hover:scale-110 transition-transform" />
                <AnimatePresence>
                    {getCartCount() > 0 && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 w-8 h-8 bg-primary rounded-full border-4 border-pearl flex items-center justify-center text-[10px] font-black"
                        >
                            {getCartCount()}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Modals */}
            <AnimatePresence>
                {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
                {isCartOpen && <CartSlideOut isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onCheckout={() => { setIsCartOpen(false); setShowCheckout(true); }} />}
            </AnimatePresence>

            {
                showCheckout && (
                    <PaymentGateway
                        cart={cart}
                        total={getCartTotal()}
                        onClose={() => setShowCheckout(false)}
                        onSuccess={async (details) => {
                            try {
                                await createOrder({
                                    orderId: details.orderId,
                                    total: details.total,
                                    items: details.items,
                                    delivery: details.delivery,
                                    method: details.method,
                                    status: 'pending' // Default status
                                });
                                useShopStore.getState().clearCart();
                                // setShowCheckout(false); // Do not close immediately so Success step shows in modal
                            } catch (err) {
                                console.error("Order Failed", err);
                            }
                        }}
                    />
                )
            }
        </section >
    );
};

// --- SUB-COMPONENT: PRODUCT CARD ---
const ProductCard = ({ product, index, viewMode, onClick }) => {
    const { toggleWishlist, wishlist, addToCart } = useShopStore();
    const isWishlisted = wishlist.includes(product.id);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: (index % 12) * 0.05 }}
            className={`group bg-white/5 rounded-[3rem] border border-white/5 shadow-2xl hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] transition-all overflow-hidden flex ${viewMode === 'list' ? 'flex-row items-center p-6 gap-8' : 'flex-col'}`}
        >
            {/* Image Wrap */}
            <div className={`relative bg-gray-50 flex-shrink-0 cursor-pointer overflow-hidden ${viewMode === 'list' ? 'w-48 h-48 rounded-[2rem]' : 'aspect-square'}`} onClick={onClick}>
                <Image
                    src={product.images?.[0] || 'https://images.unsplash.com/photo-1596462502278-27bfaf433393?q=80&w=800'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={product.name}
                />

                {/* Overlay Controls */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                        onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                        className={`w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-charcoal'}`}
                    >
                        <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                        className="w-12 h-12 bg-charcoal text-white rounded-full flex items-center justify-center hover:bg-primary transition-all"
                    >
                        <Plus size={18} />
                    </button>
                    {product.category === 'makeup' && (
                        <button className="w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center shadow-lg" title="Virtual Try-On">
                            <Sparkles size={18} />
                        </button>
                    )}
                </div>

                {/* Badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-2 pointer-events-none">
                    {product.isNew && <span className="px-4 py-1.5 bg-primary text-black text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">New</span>}
                    {product.isPopular && <span className="px-4 py-1.5 bg-white text-black text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">Hot</span>}
                </div>
            </div>

            {/* Content */}
            <div className="p-8 flex-1 flex flex-col bg-[#1A1A1A]">
                <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">{product.brand}</span>
                        <h4 className="text-lg font-serif italic text-white group-hover:text-primary transition-colors cursor-pointer" onClick={onClick}>{product.name}</h4>
                    </div>
                    <div className="flex items-center gap-1 text-primary">
                        <Star size={12} fill="currentColor" />
                        <span className="text-[10px] font-black">{product.rating.toFixed(1)}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                        <span className="text-xl font-black text-white">৳{product.price.toLocaleString()}</span>
                        {product.oldPrice && <span className="text-sm text-gray-600 line-through italic">৳{product.oldPrice.toLocaleString()}</span>}
                    </div>
                    <button
                        onClick={onClick}
                        className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-primary transition-all border-b border-transparent hover:border-primary pb-1"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

// --- EXPORTED WRAPPER ---
const Shop = () => {
    return (
        <QueryErrorBoundary fallback={<ShopContent cloudProducts={null} />}>
            <ShopWithCloud />
        </QueryErrorBoundary>
    );
};

export default Shop;
