import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Filter, Heart, Star, ChevronDown,
    X, Plus, ShoppingBag, Sliders, LayoutGrid,
    List, Sparkles, ShieldCheck, Tag
} from 'lucide-react';

import { useShopStore } from '../store/useShopStore';
import { ALL_PRODUCTS, SHOP_CATEGORIES } from '../data/boutiqueProducts';
import { getAllProducts } from '../data/makeupBrands';
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

import FadeIn from './ui/FadeIn';
import Counter from './ui/Counter';
import ProductModal from './ProductModal';
import CartSlideOut from './CartSlideOut';
import PaymentGateway from './payment/PaymentGateway';

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

    const brands = useMemo(() => {
        return [...new Set(products.map(p => p.brand))].sort();
    }, [products]);

    // --- FILTER LOGIC ---
    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.brand.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
            const matchesSub = activeSub === 'All' || p.subcategory === activeSub;
            const matchesPrice = p.price <= priceRange;
            const matchesStock = !onlyInStock || p.stockStatus !== 'Out of Stock';
            const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand);

            return matchesSearch && matchesCategory && matchesSub && matchesPrice && matchesStock && matchesBrand;
        }).sort((a, b) => {
            if (sortBy === 'price-low') return a.price - b.price;
            if (sortBy === 'price-high') return b.price - a.price;
            if (sortBy === 'rating') return b.rating - a.rating;
            return b.reviews - a.reviews; // Popular
        });
    }, [products, searchQuery, activeCategory, activeSub, priceRange, sortBy, onlyInStock, selectedBrands]);

    const activeCategoryObj = SHOP_CATEGORIES.find(c => c.id === activeCategory);

    return (
        <section id="shop" className="py-24 bg-pearl relative min-h-screen">
            {/* Header / Banner */}
            <div className="container mx-auto px-6 mb-20">
                <div className="relative p-12 md:p-20 bg-charcoal rounded-[4rem] overflow-hidden text-center shadow-3xl">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
                    <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
                        <ShoppingBag size={300} />
                    </div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
                        <span className="text-primary font-bold tracking-[0.5em] uppercase text-[10px] mb-6 block">Authorized Retailer</span>
                        <h2 className="text-5xl md:text-8xl font-serif text-white italic mb-10">Radiance <span className="text-gold">Boutique</span></h2>
                        <p className="max-w-xl mx-auto text-white/40 text-sm font-light leading-relaxed uppercase tracking-widest">
                            Shop 100% authentic international and local beauty brands curated by our master stylists.
                        </p>
                    </motion.div>

                    <div className="mt-12 flex flex-wrap justify-center gap-12 border-t border-white/5 pt-12">
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="text-gold" size={24} />
                            <div className="text-left">
                                <p className="text-[10px] font-black uppercase text-white tracking-widest leading-none mb-1">Authentic</p>
                                <p className="text-[8px] text-white/40 uppercase tracking-widest">Official Distributor</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Star className="text-primary" size={24} />
                            <div className="text-left">
                                <p className="text-[10px] font-black uppercase text-white tracking-widest leading-none mb-1">Stylist Pick</p>
                                <p className="text-[8px] text-white/40 uppercase tracking-widest">Salon Professional</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* --- Sidebar Filters --- */}
                    <div className="w-full lg:w-80 shrink-0 space-y-12">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search boutique..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-16 pr-6 py-5 bg-white rounded-3xl border border-gray-100 outline-none focus:border-primary transition-all text-xs font-bold shadow-sm"
                            />
                        </div>

                        {/* Category Selector */}
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 border-b border-gray-100 pb-4">Categories</h4>
                            <div className="space-y-2">
                                {SHOP_CATEGORIES.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => { setActiveCategory(cat.id); setActiveSub('All'); }}
                                        className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${activeCategory === cat.id ? 'bg-charcoal text-white shadow-xl' : 'hover:bg-gray-100 text-gray-500'}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="text-lg">{cat.icon}</span>
                                            <span className="text-xs font-bold uppercase tracking-widest">{cat.name}</span>
                                        </div>
                                        <ChevronDown size={14} className={activeCategory === cat.id ? 'rotate-180 transition-transform' : ''} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price Filter */}
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 border-b border-gray-100 pb-4">Max Investment</h4>
                            <div className="px-2">
                                <input
                                    type="range" min="0" max="100000" step="500"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                                    className="w-full h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary mb-4"
                                />
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold text-gray-300">৳0</span>
                                    <span className="text-sm font-black text-charcoal">৳{priceRange.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Brand Multi-Select */}
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 border-b border-gray-100 pb-4">Featured Brands</h4>
                            <div className="grid grid-cols-2 gap-2">
                                {brands.slice(0, 10).map(brand => (
                                    <button
                                        key={brand}
                                        onClick={() => {
                                            setSelectedBrands(prev =>
                                                prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
                                            );
                                        }}
                                        className={`p-3 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${selectedBrands.includes(brand) ? 'bg-primary border-primary text-white' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'}`}
                                    >
                                        {brand}
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
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-4">
                                <span className="text-xs font-bold text-gray-400">Sort By:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-gray-50 border-none outline-none px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest"
                                >
                                    <option value="popular">Most Popular</option>
                                    <option value="rating">Highest Rated</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
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

            {showCheckout && (
                <PaymentGateway
                    cart={cart}
                    total={getCartTotal()}
                    onClose={() => setShowCheckout(false)}
                    onSuccess={(details) => {
                        useShopStore.getState().clearCart();
                        setShowCheckout(false);
                    }}
                />
            )}
        </section>
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
            className={`group bg-white rounded-[3rem] border border-gray-50 shadow-sm hover:shadow-2xl transition-all overflow-hidden flex ${viewMode === 'list' ? 'flex-row items-center p-6 gap-8' : 'flex-col'}`}
        >
            {/* Image Wrap */}
            <div className={`relative bg-gray-50 flex-shrink-0 cursor-pointer overflow-hidden ${viewMode === 'list' ? 'w-48 h-48 rounded-[2rem]' : 'aspect-square'}`} onClick={onClick}>
                <img
                    src={product.images?.[0] || 'https://images.unsplash.com/photo-1596462502278-27bfaf433393?q=80&w=800'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
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
                    {product.isNew && <span className="px-4 py-1.5 bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">New</span>}
                    {product.isPopular && <span className="px-4 py-1.5 bg-gold text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">Hot</span>}
                </div>
            </div>

            {/* Content */}
            <div className="p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">{product.brand}</span>
                        <h4 className="text-lg font-serif italic text-charcoal group-hover:text-primary transition-colors cursor-pointer" onClick={onClick}>{product.name}</h4>
                    </div>
                    <div className="flex items-center gap-1 text-gold">
                        <Star size={12} fill="currentColor" />
                        <span className="text-[10px] font-black">{product.rating}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                        <span className="text-xl font-black text-charcoal">৳{product.price.toLocaleString()}</span>
                        {product.oldPrice && <span className="text-sm text-gray-300 line-through italic">৳{product.oldPrice.toLocaleString()}</span>}
                    </div>
                    <button
                        onClick={onClick}
                        className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-charcoal transition-all border-b border-transparent hover:border-charcoal pb-1"
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
