import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Star, ShoppingBag, Heart, ShieldCheck,
    Truck, RotateCcw, Info, Camera, Play, Sparkles
} from 'lucide-react';
import { useShopStore } from '../store/useShopStore';
import Counter from './ui/Counter';

const ProductModal = ({ product, onClose }) => {
    const [activeImg, setActiveImg] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);
    const [activeTab, setActiveTab] = useState('Description');

    const { addToCart, toggleWishlist, wishlist } = useShopStore();
    const isWishlisted = wishlist.includes(product.id);

    const handleAddToCart = () => {
        addToCart(product, quantity, selectedVariant);
        onClose();
    };

    const images = product.images || [
        'https://images.unsplash.com/photo-1596462502278-27bfaf433393?q=80&w=800',
        'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800',
        'https://images.unsplash.com/photo-1522338242992-e1a5a1334641?q=80&w=800'
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 md:p-8"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white rounded-[4rem] w-full max-w-6xl max-h-[90vh] overflow-hidden relative flex flex-col md:flex-row shadow-3xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 z-[160] p-4 bg-gray-100 hover:bg-gray-200 rounded-full transition-all"
                >
                    <X size={20} />
                </button>

                {/* Left: Gallery */}
                <div className="w-full md:w-1/2 p-8 md:p-12 bg-gray-50 flex flex-col">
                    <div className="relative aspect-square rounded-[3rem] overflow-hidden mb-6 bg-white shadow-inner">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={activeImg}
                                src={images[activeImg]}
                                className="w-full h-full object-cover"
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            />
                        </AnimatePresence>

                        {/* Status Badges */}
                        <div className="absolute top-6 left-6 flex flex-col gap-2">
                            {product.isNew && <span className="px-4 py-1.5 bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-full">New Arrival</span>}
                            {product.isPopular && <span className="px-4 py-1.5 bg-gold text-white text-[9px] font-black uppercase tracking-widest rounded-full">Best Seller</span>}
                        </div>
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                        {images.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveImg(i)}
                                className={`w-24 h-24 rounded-2xl overflow-hidden border-4 transition-all flex-shrink-0 ${activeImg === i ? 'border-primary' : 'border-transparent opacity-60'}`}
                            >
                                <img src={img} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: Details */}
                <div className="flex-1 p-8 md:p-16 overflow-y-auto custom-scrollbar">
                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">{product.brand}</span>
                            <div className="h-4 w-px bg-gray-200" />
                            <div className="flex items-center gap-1 text-gold text-xs font-bold">
                                <Star size={12} fill="currentColor" /> {product.rating} <span className="text-gray-400 font-normal">({product.reviews} reviews)</span>
                            </div>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-4 italic leading-tight">{product.name}</h2>
                        <div className="flex items-center gap-4">
                            <span className="text-3xl font-black text-charcoal">৳<Counter from={0} to={product.price} duration={1} /></span>
                            {product.oldPrice && (
                                <span className="text-xl text-gray-300 line-through font-light italic">৳{product.oldPrice}</span>
                            )}
                            <div className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-wider rounded-lg border border-green-100 flex items-center gap-1.5">
                                <ShieldCheck size={12} /> Authentic Guarantee
                            </div>
                        </div>
                    </div>

                    <div className="space-y-10">
                        {/* Variant Selection */}
                        {product.variants && (
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Select {product.category === 'makeup' ? 'Shade' : 'Size'}</h4>
                                <div className="flex flex-wrap gap-3">
                                    {product.variants.map((v, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setSelectedVariant(v)}
                                            className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all border ${selectedVariant?.label === v.label ? 'bg-charcoal text-white border-charcoal' : 'bg-gray-50 text-gray-400 border-gray-100 hover:border-gray-200'}`}
                                        >
                                            {v.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity & Actions */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex items-center bg-gray-50 rounded-2xl p-2 border border-gray-100">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-xl transition-all"
                                >-</button>
                                <span className="w-12 text-center font-bold">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(q => q + 1)}
                                    className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-xl transition-all"
                                >+</button>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-charcoal text-white rounded-2xl py-5 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-primary transition-all shadow-xl flex items-center justify-center gap-3 group"
                            >
                                <ShoppingBag size={18} className="group-hover:animate-bounce" /> Add to Boutique Bag
                            </button>
                            <button
                                onClick={() => toggleWishlist(product.id)}
                                className={`w-16 h-16 rounded-2xl border flex items-center justify-center transition-all ${isWishlisted ? 'bg-red-50 border-red-100 text-red-500' : 'bg-gray-50 border-gray-100 text-gray-400 hover:text-red-400'}`}
                            >
                                <Heart size={24} fill={isWishlisted ? "currentColor" : "none"} />
                            </button>
                        </div>

                        {/* Experience Link */}
                        {product.category === 'makeup' && (
                            <button className="w-full py-4 bg-primary/10 text-primary border border-primary/20 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all">
                                <Sparkles size={16} /> Try This Shade in Virtual Studio
                            </button>
                        )}

                        {/* Tabs */}
                        <div className="pt-10 border-t border-gray-100">
                            <div className="flex gap-8 mb-8">
                                {['Description', 'How to Use', 'Ingredients'].map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`text-[10px] font-black uppercase tracking-widest transition-all relative ${activeTab === tab ? 'text-charcoal' : 'text-gray-300'}`}
                                    >
                                        {tab}
                                        {activeTab === tab && <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary" />}
                                    </button>
                                ))}
                            </div>
                            <div className="text-sm text-gray-500 leading-relaxed font-light">
                                {activeTab === 'Description' && <p>{product.description}</p>}
                                {activeTab === 'How to Use' && <p>{product.howToUse || "Apply according to preference. Consult our stylists for expert application techniques."}</p>}
                                {activeTab === 'Ingredients' && <p className="text-[10px] tracking-wide uppercase font-medium">{product.ingredients?.join(', ') || "Full ingredient list available on physical packaging."}</p>}
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-4 pb-12">
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                                <Truck className="text-primary" size={20} />
                                <div className="text-[10px]">
                                    <p className="font-bold text-charcoal">Free Shipping</p>
                                    <p className="text-gray-400">On beauty orders above ৳2,000</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                                <RotateCcw className="text-primary" size={20} />
                                <div className="text-[10px]">
                                    <p className="font-bold text-charcoal">Easy Returns</p>
                                    <p className="text-gray-400">100% Authenticity Guarantee</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProductModal;
