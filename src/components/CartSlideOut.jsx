import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, ArrowRight, CreditCard, Minus, Plus } from 'lucide-react';
import { useShopStore } from '../store/useShopStore';

const CartSlideOut = ({ isOpen, onClose, onCheckout }) => {
    const { cart, removeFromCart, updateQuantity, getCartTotal } = useShopStore();
    const total = getCartTotal();
    const freeShippingThreshold = 2000;
    const progress = Math.min(100, (total / freeShippingThreshold) * 100);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0A0A0A] border-l border-white/10 z-[210] shadow-3xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="text-gold" />
                                <h3 className="text-xl font-serif italic text-white">Boutique Bag</h3>
                                <span className="bg-white/5 border border-white/10 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{cart.length} Items</span>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-all text-white">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Free Shipping Progress */}
                        <div className="px-8 py-6 bg-gold/5 border-b border-gold/10">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-3">
                                {total >= freeShippingThreshold ? (
                                    <span className="text-green-400">You qualify for Free Shipping! 🎉</span>
                                ) : (
                                    <span className="text-gold">Add ৳{(freeShippingThreshold - total).toLocaleString()} more for FREE shipping</span>
                                )}
                            </div>
                            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    className="h-full bg-gold"
                                />
                            </div>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-8 bg-[#0A0A0A]">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                                        <ShoppingBag size={32} className="text-white/20" />
                                    </div>
                                    <h4 className="font-serif italic text-xl text-white">Your bag is empty</h4>
                                    <p className="text-xs text-white/40 max-w-[200px]">Find something special in our boutique to start your journey.</p>
                                    <button
                                        onClick={onClose}
                                        className="text-[10px] font-black uppercase tracking-widest text-gold flex items-center gap-2 hover:gap-4 transition-all"
                                    >
                                        Explore Products <ArrowRight size={14} />
                                    </button>
                                </div>
                            ) : (
                                cart.map((item, idx) => (
                                    <motion.div
                                        key={`${item.id}-${idx}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex gap-6 group"
                                    >
                                        <div className="w-24 h-24 bg-white/5 rounded-2xl overflow-hidden border border-white/10">
                                            <img src={item.images?.[0]} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <p className="text-[9px] font-black uppercase tracking-widest text-gold mb-1">{item.brand}</p>
                                                    <h4 className="font-bold text-sm text-white leading-tight">{item.name}</h4>
                                                    {item.selectedVariant && (
                                                        <span className="text-[10px] text-white/40">Variant: {item.selectedVariant.label}</span>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id, item.selectedVariant)}
                                                    className="p-2 text-white/20 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center bg-white/5 rounded-lg p-1 border border-white/10 text-white">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedVariant)}
                                                        className="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded transition-all"
                                                    >-</button>
                                                    <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedVariant)}
                                                        className="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded transition-all"
                                                    >+</button>
                                                </div>
                                                <span className="font-black text-sm text-white">৳{(item.price * item.quantity).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-8 border-t border-white/10 bg-white/5 space-y-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-xs text-white/40">
                                        <span>Subtotal</span>
                                        <span className="font-bold text-white">৳{total.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-xs text-white/40">
                                        <span>Shipping</span>
                                        <span className="text-green-400 font-bold">{total >= freeShippingThreshold ? 'FREE' : '৳200'}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-3 border-t border-white/10">
                                        <span className="text-sm font-black uppercase tracking-widest text-white">Total Investment</span>
                                        <span className="text-2xl font-black text-gold">৳{(total >= freeShippingThreshold ? total : total + 200).toLocaleString()}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={onCheckout}
                                    className="w-full bg-[#F5E6C8] text-black py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white transition-all shadow-glow flex items-center justify-center gap-3 group"
                                >
                                    Proceed to Secure Checkout <CreditCard size={18} />
                                </button>
                                <p className="text-[9px] text-center text-white/20 uppercase tracking-widest font-bold">Secure payments verified by Radiance Protocol</p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartSlideOut;
