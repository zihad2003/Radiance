import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CreditCard, Smartphone, Building2, Truck, CheckCircle2,
    XCircle, Clock, ArrowLeft, ArrowRight, MapPin,
    ShieldCheck, Tag, Info, ShoppingBag, Store,
    SmartphoneNfc, Receipt, Download, ExternalLink
} from 'lucide-react';
import { useShopStore } from '../../store/useShopStore';
import { validatePromoCode } from '../../data/promoCodes';
import Counter from '../ui/Counter';

const CheckoutFlow = ({ cart: externalCart, total: externalTotal, onClose, onSuccess }) => {
    const { cart: storeCart, getCartTotal, clearCart } = useShopStore();
    const cart = externalCart || storeCart;
    const [step, setStep] = useState(1);

    // --- CHECKOUT STATE ---
    const [promoCode, setPromoCode] = useState('');
    const [appliedPromo, setAppliedPromo] = useState(null);
    const [promoError, setPromoError] = useState('');

    const [deliveryInfo, setDeliveryInfo] = useState({
        fullName: '',
        phone: '',
        email: '',
        address: '',
        area: '',
        city: 'Dhaka',
        landmark: '',
        saveAddress: true
    });

    const [shippingMethod, setShippingMethod] = useState('standard');
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [orderId] = useState(`RBS${new Date().getFullYear()}${Math.floor(1000 + Math.random() * 9000)}`);

    // --- CALCULATIONS ---
    const subtotal = getCartTotal();

    const shippingFee = useMemo(() => {
        if (activePromo?.type === 'shipping') return 0;
        if (shippingMethod === 'pickup') return 0;
        if (shippingMethod === 'same-day') return 250;
        if (shippingMethod === 'express') return 150;
        return subtotal > 2000 ? 0 : 60; // Standard Dhaka
    }, [shippingMethod, subtotal]);

    const discountAmount = useMemo(() => {
        if (!appliedPromo) return 0;
        if (appliedPromo.type === 'percentage') return subtotal * appliedPromo.discount;
        if (appliedPromo.type === 'fixed') return appliedPromo.discount;
        return 0;
    }, [appliedPromo, subtotal]);

    const activePromo = appliedPromo;
    const codFee = paymentMethod === 'cod' ? 50 : 0;
    const finalTotal = subtotal - discountAmount + shippingFee + codFee;

    // --- HANDLERS ---
    const handleApplyPromo = () => {
        const result = validatePromoCode(promoCode, subtotal);
        if (result.valid) {
            setAppliedPromo(result);
            setPromoError('');
        } else {
            setPromoError(result.message);
            setAppliedPromo(null);
        }
    };

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const handleFinalizeOrder = () => {
        setStep(5); // Processing
        setTimeout(() => {
            const orderData = {
                orderId,
                total: finalTotal,
                items: cart,
                delivery: deliveryInfo,
                method: paymentMethod,
                timestamp: new Date().toISOString()
            };
            if (onSuccess) onSuccess(orderData);
            setStep(6); // Success
            // In a real app, send to API here
        }, 3000);
    };

    return (
        <div className="fixed inset-0 z-[250] bg-pearl/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-white w-full max-w-6xl h-full max-h-[900px] rounded-[4rem] shadow-4xl flex flex-col md:flex-row overflow-hidden border border-white/40"
            >
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-10 right-10 z-[260] p-4 bg-gray-50 hover:bg-gray-100 rounded-full transition-all">
                    <XCircle size={24} className="text-gray-300 hover:text-charcoal" />
                </button>

                {/* Left Side: Step Content */}
                <div className="flex-1 p-8 md:p-16 flex flex-col overflow-y-auto custom-scrollbar">
                    {/* Progress Track */}
                    <div className="flex items-center gap-4 mb-12 overflow-x-auto hide-scrollbar pb-2">
                        {[1, 2, 3, 4].map(i => (
                            <React.Fragment key={i}>
                                <div className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${step === i ? 'bg-charcoal text-white shadow-xl scale-105' : step > i ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-300'}`}>
                                    {step > i ? <CheckCircle2 size={14} /> : <span className="text-[10px] font-black">{i}</span>}
                                    <span className="text-[10px] font-black uppercase tracking-widest">
                                        {i === 1 ? 'Review' : i === 2 ? 'Delivery' : i === 3 ? 'Shipping' : 'Payment'}
                                    </span>
                                </div>
                                {i < 4 && <div className="h-px w-8 bg-gray-100" />}
                            </React.Fragment>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 1 && <StepReview cart={cart} next={nextStep} subtotal={subtotal} promoCode={promoCode} setPromoCode={setPromoCode} applyPromo={handleApplyPromo} appliedPromo={appliedPromo} promoError={promoError} />}
                        {step === 2 && <StepDelivery data={deliveryInfo} setData={setDeliveryInfo} next={nextStep} back={prevStep} />}
                        {step === 3 && <StepShipping method={shippingMethod} setMethod={setShippingMethod} next={nextStep} back={prevStep} total={subtotal} />}
                        {step === 4 && <StepPayment method={paymentMethod} setMethod={setPaymentMethod} next={handleFinalizeOrder} back={prevStep} total={finalTotal} />}
                        {step === 5 && <StepProcessing />}
                        {step === 6 && <StepSuccess orderId={orderId} onClose={onClose} clearCart={clearCart} />}
                    </AnimatePresence>
                </div>

                {/* Right Side: Order Summary (Sticky on Desktop) */}
                {step < 6 && (
                    <div className="w-full md:w-[400px] bg-gray-50 p-8 md:p-12 flex flex-col border-l border-gray-100">
                        <h3 className="text-xl font-serif italic mb-8">Order Summary</h3>

                        <div className="flex-1 space-y-4 mb-8 overflow-y-auto hide-scrollbar">
                            {cart.map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-12 h-12 bg-white rounded-xl border border-gray-100 overflow-hidden shrink-0">
                                        <img src={item.images?.[0]} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[10px] font-bold text-charcoal leading-tight line-clamp-1">{item.name}</p>
                                        <p className="text-[9px] text-gray-400 uppercase tracking-widest">{item.brand} x{item.quantity}</p>
                                    </div>
                                    <span className="text-[10px] font-black">৳{(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4 pt-6 border-t border-gray-200">
                            <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                <span>Subtotal</span>
                                <span>৳{subtotal.toLocaleString()}</span>
                            </div>
                            {discountAmount > 0 && (
                                <div className="flex justify-between text-[10px] font-bold text-green-600 uppercase tracking-widest">
                                    <span>Discount ({appliedPromo.label})</span>
                                    <span>-৳{discountAmount.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                <span>Shipping ({shippingMethod})</span>
                                <span>{shippingFee === 0 ? 'FREE' : `৳${shippingFee}`}</span>
                            </div>
                            {codFee > 0 && (
                                <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                    <span>COD Handling</span>
                                    <span>৳{codFee}</span>
                                </div>
                            )}
                            <div className="pt-4 border-t border-gray-200 flex justify-between items-end">
                                <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Investment</div>
                                <div className="text-3xl font-black text-charcoal">৳<Counter from={0} to={finalTotal} duration={1} /></div>
                            </div>

                            <div className="mt-8 p-4 bg-white rounded-2xl border border-gray-200 flex items-center gap-3">
                                <ShieldCheck className="text-green-500" size={18} />
                                <div className="text-[9px] leading-tight">
                                    <p className="font-black uppercase tracking-widest text-charcoal">Secure Checkout</p>
                                    <p className="text-gray-400">PCI DSS Compliant & 256-bit Encrypted</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

// --- STEPS ---

const StepReview = ({ cart, next, promoCode, setPromoCode, applyPromo, appliedPromo, promoError }) => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
        <h2 className="text-4xl font-serif italic mb-2">Review Your Bag</h2>
        <p className="text-gray-400 text-sm mb-10 tracking-widest uppercase">One last look before the beauty arrives</p>

        <div className="space-y-6 mb-12">
            <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-3xl border border-gray-100">
                <Tag className="text-primary" />
                <div className="flex-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-charcoal">Apply Promo Code</p>
                    <div className="flex gap-4 mt-2">
                        <input
                            type="text"
                            value={promoCode}
                            placeholder="Enter Code (e.g. SAVE20)"
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="bg-white px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-primary text-xs font-bold"
                        />
                        <button onClick={applyPromo} className="px-6 py-2 bg-charcoal text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all">Apply</button>
                    </div>
                    {appliedPromo && <p className="text-[9px] text-green-600 mt-2 font-black uppercase">Success: {appliedPromo.label} Applied!</p>}
                    {promoError && <p className="text-[9px] text-red-500 mt-2 font-black uppercase">{promoError}</p>}
                </div>
            </div>
        </div>

        <button onClick={next} className="w-full py-5 bg-charcoal text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-primary transition-all shadow-xl flex items-center justify-center gap-4">
            Proceed to Delivery <ArrowRight size={18} />
        </button>
    </motion.div>
);

const StepDelivery = ({ data, setData, next, back }) => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
        <h2 className="text-4xl font-serif italic mb-2">Delivery Details</h2>
        <p className="text-gray-400 text-sm mb-10 tracking-widest uppercase">Where shall we send your radiance?</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Recipient Name</label>
                <input
                    type="text" placeholder="Full legal name"
                    value={data.fullName} onChange={(e) => setData({ ...data, fullName: e.target.value })}
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-primary transition-all text-sm"
                />
            </div>
            <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Phone Number</label>
                <input
                    type="tel" placeholder="01XXXXXXXXX"
                    value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })}
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-primary transition-all text-sm"
                />
            </div>
            <div className="md:col-span-2 space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Detailed Address</label>
                <textarea
                    placeholder="House, Flat, Road, Area..."
                    value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })}
                    rows="3" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-primary transition-all text-sm"
                />
            </div>
            <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Area / Neighborhood</label>
                <input
                    type="text" placeholder="e.g. Gulshan 1"
                    value={data.area} onChange={(e) => setData({ ...data, area: e.target.value })}
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-primary transition-all text-sm"
                />
            </div>
            <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Landmark (Optional)</label>
                <input
                    type="text" placeholder="Beside ABC Tower"
                    value={data.landmark} onChange={(e) => setData({ ...data, landmark: e.target.value })}
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-primary transition-all text-sm"
                />
            </div>
        </div>

        <div className="flex gap-4">
            <button onClick={back} className="flex-1 py-5 border border-gray-100 text-charcoal rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-gray-50 transition-all flex items-center justify-center gap-4">
                <ArrowLeft size={18} /> Back
            </button>
            <button onClick={next} className="flex-[2] py-5 bg-charcoal text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-primary transition-all shadow-xl flex items-center justify-center gap-4">
                Continue to Shipping <ArrowRight size={18} />
            </button>
        </div>
    </motion.div>
);

const StepShipping = ({ method, setMethod, next, back, total }) => {
    const shippingOptions = [
        { id: 'standard', name: 'Standard Delivery', time: '3-5 Business Days', price: total > 2000 ? 0 : 60, icon: Truck },
        { id: 'express', name: 'Express Delivery', time: '1-2 Business Days', price: 150, icon: Clock },
        { id: 'same-day', name: 'Same Day (Dhaka)', time: 'Before 12 PM Order', price: 250, icon: SmartphoneNfc },
        { id: 'pickup', name: 'Salon Pickup', time: 'Ready in 2 Hours', price: 0, icon: Store },
    ];

    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-4xl font-serif italic mb-2">Shipping Method</h2>
            <p className="text-gray-400 text-sm mb-10 tracking-widest uppercase">How fast should your products arrive?</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                {shippingOptions.map(opt => (
                    <button
                        key={opt.id}
                        onClick={() => setMethod(opt.id)}
                        className={`p-6 rounded-3xl border-2 transition-all flex items-center gap-6 text-left ${method === opt.id ? 'border-primary bg-primary/5' : 'border-gray-50 hover:border-gray-100'}`}
                    >
                        <div className={`p-4 rounded-2xl ${method === opt.id ? 'bg-primary text-white' : 'bg-gray-50 text-gray-400'}`}>
                            <opt.icon size={24} />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-black uppercase tracking-widest text-charcoal">{opt.name}</h4>
                            <p className="text-[10px] text-gray-400 mt-1">{opt.time}</p>
                        </div>
                        <span className="text-sm font-black text-primary">{opt.price === 0 ? 'FREE' : `৳${opt.price}`}</span>
                    </button>
                ))}
            </div>

            <div className="flex gap-4">
                <button onClick={back} className="flex-1 py-5 border border-gray-100 text-charcoal rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-gray-50 transition-all flex items-center justify-center gap-4">
                    <ArrowLeft size={18} /> Back
                </button>
                <button onClick={next} className="flex-[2] py-5 bg-charcoal text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-primary transition-all shadow-xl flex items-center justify-center gap-4">
                    Final Step: Payment <ArrowRight size={18} />
                </button>
            </div>
        </motion.div>
    );
};

const StepPayment = ({ method, setMethod, next, back, total }) => {
    const paymentOptions = [
        { id: 'bkash', name: 'bKash Wallet', icon: '📱', color: 'from-pink-500 to-pink-600', popular: true },
        { id: 'nagad', name: 'Nagad Wallet', icon: '💳', color: 'from-orange-500 to-red-600' },
        { id: 'card', name: 'Credit/Debit Card', icon: '💳', color: 'from-blue-500 to-blue-600' },
        { id: 'bank', name: 'Bank Transfer', icon: '🏦', color: 'from-green-500 to-green-600' },
        { id: 'cod', name: 'Cash on Delivery', icon: '💵', color: 'from-gray-600 to-gray-700', fee: 50 },
        { id: 'salon', name: 'Pay at Salon', icon: '🏪', color: 'from-gold to-yellow-600' },
    ];

    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-4xl font-serif italic mb-2">Secure Payment</h2>
            <p className="text-gray-400 text-sm mb-10 tracking-widest uppercase">Authorized transaction gateway</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                {paymentOptions.map(opt => (
                    <button
                        key={opt.id}
                        onClick={() => setMethod(opt.id)}
                        className={`p-6 rounded-3xl border-2 transition-all flex flex-col gap-4 text-left relative ${method === opt.id ? 'border-primary bg-primary/5' : 'border-gray-50 hover:border-gray-100'}`}
                    >
                        {opt.popular && <span className="absolute -top-2 -right-2 bg-gold text-white text-[8px] font-black px-2 py-1 rounded-full uppercase">Instant</span>}
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${opt.color} flex items-center justify-center text-xl shadow-lg`}>
                            {opt.icon}
                        </div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-charcoal">{opt.name}</h4>
                        {opt.fee && <span className="text-[8px] text-primary font-bold uppercase tracking-widest">+৳{opt.fee} Handling</span>}
                    </button>
                ))}
            </div>

            <div className="flex gap-4">
                <button onClick={back} className="flex-1 py-5 border border-gray-100 text-charcoal rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-gray-50 transition-all flex items-center justify-center gap-4">
                    <ArrowLeft size={18} /> Back
                </button>
                <button onClick={next} disabled={!method} className="flex-[2] py-5 bg-charcoal text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-primary transition-all shadow-xl flex items-center justify-center gap-4 disabled:bg-gray-300 disabled:shadow-none">
                    Complete Investment ৳{total.toLocaleString()} <ArrowRight size={18} />
                </button>
            </div>
        </motion.div>
    );
};

const StepProcessing = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 text-center">
        <div className="relative w-40 h-40 mb-12">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-primary/10 border-t-primary rounded-full shadow-glow"
            />
            <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-4 bg-charcoal rounded-full flex items-center justify-center"
            >
                <Smartphone size={40} className="text-primary" />
            </motion.div>
        </div>
        <h2 className="text-3xl font-serif italic mb-4">Securing Transaction...</h2>
        <p className="text-gray-400 text-xs tracking-widest uppercase max-w-sm leading-relaxed">
            Please do not refresh. We are verifying your details with the Radiance Secure Protocol.
        </p>
    </motion.div>
);

const StepSuccess = ({ orderId, onClose, clearCart }) => (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-12 text-center h-full">
        <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-8 shadow-inner">
            <CheckCircle2 size={48} />
        </div>
        <span className="text-primary font-bold tracking-[0.5em] uppercase text-[10px] mb-4">Mission Accomplished</span>
        <h2 className="text-4xl md:text-5xl font-serif italic mb-6">Radiance Secured.</h2>
        <p className="text-gray-500 text-sm max-w-md mx-auto mb-10 leading-relaxed font-light">
            Your transformation essentials are being prepared. You will receive a confirmation SMS and Email shortly.
        </p>

        <div className="bg-gray-50 p-8 rounded-[3rem] border border-gray-100 mb-12 w-full max-w-sm">
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Order Identification</p>
            <p className="text-2xl font-black text-charcoal mb-6">#{orderId}</p>
            <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 p-4 bg-white rounded-2xl border border-gray-200 text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all">
                    <Download size={16} /> Invoice
                </button>
                <button className="flex items-center justify-center gap-2 p-4 bg-white rounded-2xl border border-gray-200 text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all">
                    <ExternalLink size={16} /> Track
                </button>
            </div>
        </div>

        <button
            onClick={() => { clearCart(); onClose(); }}
            className="px-12 py-5 bg-charcoal text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-primary transition-all shadow-xl"
        >
            Explore More Luxury
        </button>
    </motion.div>
);

export default CheckoutFlow;
