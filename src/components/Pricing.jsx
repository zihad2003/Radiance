import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Check, Star, Clock, ChevronRight, Info, ShieldCheck, Zap,
    Plus, Minus, Download, X, Search, Sliders, Users,
    Calendar, CreditCard, ChevronDown, Filter, Sparkles
} from 'lucide-react';
import { PACKAGES, ADDONS, COMPARISON_DATA } from '../data/packages';
import GlassCard from './ui/GlassCard';
import Counter from './ui/Counter';

const Pricing = () => {
    // --- STATE ---
    const [activeCategory, setActiveCategory] = useState("All Packages");
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [showCustomizer, setShowCustomizer] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("Most Popular");

    // Filters State
    const [filters, setFilters] = useState({
        maxPrice: 100000,
        duration: "All",
        occasion: "All",
        people: "All"
    });
    const [showFilters, setShowFilters] = useState(false);

    const categories = [
        "All Packages", "Bridal", "Party", "Group",
        "Monthly Plans", "Seasonal Specials", "Pre-Bridal Prep", "Wellness Series"
    ];

    // --- LOGIC: FILTERING & SORTING ---
    const filteredPackages = useMemo(() => {
        let result = PACKAGES;

        // 1. Category Filter
        if (activeCategory !== "All Packages") {
            result = result.filter(p => p.category === activeCategory);
        }

        // 2. Search Query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.shortDesc.toLowerCase().includes(query)
            );
        }

        // 3. Price Filter
        result = result.filter(p => p.price <= filters.maxPrice);

        // 4. Duration Filter
        if (filters.duration !== "All") {
            result = result.filter(p => p.duration.includes(filters.duration));
        }

        // 5. People Filter
        if (filters.people !== "All") {
            if (filters.people === "Solo") result = result.filter(p => !p.duration.includes("People"));
            if (filters.people === "Duo") result = result.filter(p => p.duration.includes("2 People"));
            if (filters.people === "Group") result = result.filter(p => p.duration.includes("People") && !p.duration.includes("2 People"));
        }

        // 6. Sorting
        if (sortBy === "Price: Low to High") result = [...result].sort((a, b) => a.price - b.price);
        if (sortBy === "Price: High to Low") result = [...result].sort((a, b) => b.price - a.price);
        if (sortBy === "Newest First") result = [...result].reverse();

        return result;
    }, [activeCategory, searchQuery, filters, sortBy]);

    return (
        <section id="pricing" className="py-32 bg-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -mr-96 -mt-96" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] -ml-64 -mb-64" />

            <div className="container mx-auto px-6 relative z-10">
                {/* --- HEADER --- */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-4 block"
                    >
                        Luxury Investment Portfolio
                    </motion.span>
                    <h2 className="text-5xl md:text-7xl font-serif text-charcoal mb-8 italic leading-tight">
                        Signature <span className="text-primary">Packages</span>
                    </h2>
                </div>

                {/* --- SEARCH & TABS BAR --- */}
                <div className="mb-12 space-y-8">
                    {/* Search & Sort & Filter Toggle */}
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50 p-4 rounded-[2.5rem] border border-gray-100 shadow-sm">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search packages (e.g. 'Bridal', 'Squad', 'Facial')..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-16 pr-6 py-4 bg-white rounded-full text-xs font-bold tracking-widest uppercase focus:ring-2 ring-primary/20 outline-none transition-all"
                            />
                        </div>
                        <div className="flex gap-4 w-full md:w-auto">
                            <div className="relative flex-1 md:w-64">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full appearance-none pl-6 pr-12 py-4 bg-white rounded-full text-[10px] font-black uppercase tracking-widest outline-none border border-transparent hover:border-gray-200 transition-all cursor-pointer"
                                >
                                    <option>Most Popular</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Newest First</option>
                                </select>
                                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                            </div>
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`p-4 rounded-full transition-all ${showFilters ? 'bg-primary text-white' : 'bg-white text-charcoal hover:bg-gray-100'}`}
                            >
                                <Filter size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all transform ${activeCategory === cat
                                    ? 'bg-charcoal text-white shadow-xl scale-110'
                                    : 'bg-white text-gray-400 border border-gray-100 hover:border-gray-300'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Expandable Filters Panel */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Max Price (BDT)</label>
                                        <input
                                            type="range" min="0" max="100000" step="5000"
                                            value={filters.maxPrice}
                                            onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
                                            className="w-full accent-primary h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                        />
                                        <div className="text-xs font-bold text-charcoal">Up to ৳{filters.maxPrice.toLocaleString()}</div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Group Size</label>
                                        <div className="flex flex-wrap gap-2">
                                            {["All", "Solo", "Duo", "Group"].map(opt => (
                                                <button
                                                    key={opt}
                                                    onClick={() => setFilters({ ...filters, people: opt })}
                                                    className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${filters.people === opt ? 'bg-primary text-white' : 'bg-white text-gray-400 border border-gray-100'}`}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Duration</label>
                                        <div className="flex flex-wrap gap-2">
                                            {["All", "hour", "hours", "Day", "Weeks"].map(opt => (
                                                <button
                                                    key={opt}
                                                    onClick={() => setFilters({ ...filters, duration: opt })}
                                                    className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${filters.duration === opt ? 'bg-primary text-white' : 'bg-white text-gray-400 border border-gray-100'}`}
                                                >
                                                    {opt === "hour" ? "< 2 hrs" : opt === "Weeks" ? "Multi-Day" : opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-end">
                                        <button
                                            onClick={() => setFilters({ maxPrice: 100000, duration: "All", occasion: "All", people: "All" })}
                                            className="text-[10px] font-black uppercase tracking-tighter text-gray-400 hover:text-primary transition-colors underline underline-offset-4"
                                        >
                                            Reset All Filters
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* --- PACKAGE GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 min-h-[400px] fade-in-up">
                    <AnimatePresence mode="popLayout">
                        {filteredPackages.length > 0 ? (
                            filteredPackages.map((pkg, idx) => (
                                <PackageCard
                                    key={pkg.id}
                                    pkg={pkg}
                                    index={idx}
                                    onDetail={() => setSelectedPackage(pkg)}
                                />
                            ))
                        ) : (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-32 text-center text-gray-300">
                                <Search size={48} className="mx-auto mb-4 opacity-20" />
                                <p className="font-serif italic text-xl">No packages found matching your criteria.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* --- PROMOTIONAL BANNERS --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                    <div className="bg-gradient-to-r from-indigo-900 to-blue-900 rounded-[3rem] p-12 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
                            <Clock size={120} strokeWidth={1} />
                        </div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-4">Limited Offer</h4>
                        <h3 className="text-3xl font-serif italic mb-6">Early Bird Bridal</h3>
                        <p className="text-white/60 text-sm mb-8 max-w-sm">Book any Bridal Package 3+ months in advance and enjoy a 10% premium credit on your account.</p>
                        <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:gap-4 transition-all">
                            Secure Discount <ChevronRight size={14} />
                        </button>
                    </div>
                    <div className="bg-gradient-to-r from-rose-900 to-pink-900 rounded-[3rem] p-12 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
                            <Users size={120} strokeWidth={1} />
                        </div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-gold mb-4">Loyalty Reward</h4>
                        <h3 className="text-3xl font-serif italic mb-6">Sister & Bestie Special</h3>
                        <p className="text-white/60 text-sm mb-8 max-w-sm">Book together for the same time slot and get 20% off the second transformation.</p>
                        <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:gap-4 transition-all text-gold">
                            Browse Group Packs <ChevronRight size={14} />
                        </button>
                    </div>
                </div>

                {/* --- COMPARISON TABLE --- */}
                {(activeCategory === "Bridal" || activeCategory === "All Packages") && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-32 max-w-6xl mx-auto"
                    >
                        <div className="text-center mb-16">
                            <h3 className="text-4xl font-serif italic mb-2">Detailed Selection Matrix</h3>
                            <p className="text-gray-400 text-sm tracking-widest uppercase">Granular feature breakdown across premium tiers</p>
                        </div>
                        <ComparisonTable />
                    </motion.div>
                )}
            </div>

            {/* --- MODALS --- */}
            <AnimatePresence>
                {selectedPackage && (
                    <BookingWizardModal pkg={selectedPackage} onClose={() => setSelectedPackage(null)} />
                )}
                {showCustomizer && (
                    <CustomizerModal onClose={() => setShowCustomizer(false)} />
                )}
            </AnimatePresence>
        </section>
    );
};

// --- SUB-COMPONENT: PACKAGE CARD ---
const PackageCard = ({ pkg, index, onDetail }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ delay: (index % 6) * 0.05, duration: 0.6 }}
        whileHover={{ y: -10 }}
        className={`relative flex flex-col h-full rounded-[2.5rem] p-10 border transition-all duration-500 shadow-2xl group ${pkg.theme}`}
    >
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
            <div className="flex-1">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${pkg.badge || 'bg-white/20'}`}>
                    {pkg.tier}
                </span>
                <h3 className="text-3xl font-serif mt-4 italic leading-tight">{pkg.name}</h3>
            </div>
            {pkg.isPopular && (
                <div className="bg-gold/10 text-gold p-3 rounded-2xl animate-pulse">
                    <Star size={20} fill="currentColor" />
                </div>
            )}
        </div>

        {/* Pricing Section */}
        <div className="mb-8">
            <div className="flex items-baseline gap-1">
                <span className="text-[10px] uppercase font-bold opacity-60">Investment</span>
                <span className="text-4xl font-black">
                    ৳<Counter from={0} to={pkg.price} duration={1} />
                </span>
                {pkg.price > 10000 && <span className="text-[10px] ml-1 opacity-50">+ VAT</span>}
            </div>
            <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5 opacity-60 text-[10px] font-bold uppercase tracking-widest">
                    <Clock size={12} /> {pkg.duration}
                </div>
                <div className="flex items-center gap-1.5 opacity-60 text-[10px] font-bold uppercase tracking-widest">
                    <Sparkles size={12} /> {pkg.stylistLevel}
                </div>
            </div>
        </div>

        <p className="text-sm italic opacity-70 mb-10 border-l-2 border-current pl-4 min-h-[3rem]">
            {pkg.shortDesc}
        </p>

        {/* Action Button */}
        <div className="mt-auto space-y-3 pt-6 border-t border-current/10">
            <button
                onClick={onDetail}
                className="w-full py-5 px-6 bg-charcoal text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-primary shadow-xl flex items-center justify-center gap-2"
            >
                Start Transformation <ChevronRight size={14} />
            </button>
            <p className="text-center text-[9px] font-bold uppercase tracking-widest opacity-40">
                ⭐ {pkg.rating} ({pkg.reviewCount} Bookings)
            </p>
        </div>

        {pkg.isBestValue && (
            <div className="absolute -top-4 -right-4 bg-primary text-white p-4 rounded-3xl shadow-2xl rotate-12 font-black text-[10px] uppercase tracking-widest">
                Best Value
            </div>
        )}
    </motion.div>
);

// --- SUB-COMPONENT: COMPARISON TABLE (High-End) ---
const ComparisonTable = () => (
    <div className="overflow-x-auto rounded-[3rem] border border-gray-100 shadow-3xl bg-white fade-in-up">
        <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
                <tr className="bg-charcoal text-white text-[10px] font-black uppercase tracking-[0.3em]">
                    <th className="p-8 sticky left-0 bg-charcoal z-10 border-r border-white/5">Metrics</th>
                    <th className="p-8">Basic</th>
                    <th className="p-8">Signature</th>
                    <th className="p-8">Premium</th>
                    <th className="p-8">Platinum</th>
                    <th className="p-8">Royale</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
                {COMPARISON_DATA.map((row, i) => (
                    <motion.tr
                        key={i}
                        whileHover={{ backgroundColor: "rgba(183, 110, 121, 0.05)" }}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="hover:bg-gray-50/50 transition-colors group cursor-default"
                    >
                        <td className="p-8 font-serif italic text-gray-700 sticky left-0 bg-white z-10 border-r border-gray-100 group-hover:text-primary transition-colors">{row.feature}</td>
                        {['basic', 'signature', 'premium', 'platinum', 'royale'].map(tier => (
                            <td key={tier} className="p-8 text-sm font-bold">
                                {typeof row[tier] === 'boolean' ? (
                                    row[tier] ? <Check className="text-primary group-hover:scale-125 transition-transform" size={18} strokeWidth={3} /> : <X className="text-gray-200" size={18} />
                                ) : (
                                    <span className={row[tier] !== '✗' ? "text-charcoal" : "text-gray-200 opacity-50"}>{row[tier]}</span>
                                )}
                            </td>
                        ))}
                    </motion.tr>
                ))}
            </tbody>
        </table>
    </div>
);

// --- MODAL: BOOKING WIZARD (Step-by-Step) ---
const BookingWizardModal = ({ pkg, onClose }) => {
    const [step, setStep] = useState(1);
    const [selections, setSelections] = useState([]);
    const [bookingDetails, setBookingDetails] = useState({
        date: "",
        time: "",
        location: "Salon",
        promo: ""
    });

    const totalPrice = useMemo(() => {
        const addonsTotal = selections.reduce((sum, id) => sum + ADDONS.find(a => a.id === id).price, 0);
        let base = pkg.price + addonsTotal;
        if (bookingDetails.promo === "EARLYBIRD") base *= 0.9;
        return base;
    }, [pkg, selections, bookingDetails.promo]);

    const toggleAddon = (id) => {
        setSelections(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-3xl p-4 md:p-12 overflow-y-auto"
        >
            <motion.div
                initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }}
                className="bg-white rounded-[4rem] w-full max-w-6xl max-h-full overflow-hidden flex flex-col md:flex-row shadow-3xl relative"
            >
                <button onClick={onClose} className="absolute top-8 right-8 p-3 hover:bg-gray-100 rounded-full transition-colors z-[60]">
                    <X size={24} />
                </button>

                {/* Left Panel: Package Identity */}
                <div className={`hidden lg:flex w-80 flex-col p-12 text-white overflow-hidden relative ${pkg.theme}`}>
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="relative z-10 h-full flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-60 mb-8">Booking Package</span>
                        <h2 className="text-4xl font-serif italic mb-6">{pkg.name}</h2>
                        <div className="space-y-6 flex-1">
                            <div className="flex items-center gap-3">
                                <Clock size={20} className="text-primary" />
                                <div>
                                    <p className="text-[8px] uppercase font-black tracking-widest opacity-50">Estimated Duration</p>
                                    <p className="text-sm font-bold">{pkg.duration}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Users size={20} className="text-primary" />
                                <div>
                                    <p className="text-[8px] uppercase font-black tracking-widest opacity-50">Stylist Category</p>
                                    <p className="text-sm font-bold">{pkg.stylistLevel}</p>
                                </div>
                            </div>
                        </div>

                        {/* Progress Stepper */}
                        <div className="mt-12 space-y-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className={`h-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-white w-full' : 'bg-white/20 w-8'}`} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Panel: Content */}
                <div className="flex-1 p-8 md:p-16 overflow-y-auto custom-scrollbar">

                    {/* STEP 1: REVIEW & ADD-ONS */}
                    {step === 1 && (
                        <div className="space-y-10">
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2">Step 1 of 4</h4>
                                <h3 className="text-4xl font-serif italic">Enhance Your Package</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {ADDONS.slice(0, 8).map(addon => (
                                    <button
                                        key={addon.id}
                                        onClick={() => toggleAddon(addon.id)}
                                        className={`p-6 rounded-3xl border-2 text-left flex justify-between items-center transition-all ${selections.includes(addon.id) ? 'border-primary bg-primary/5' : 'border-gray-50 hover:border-gray-200'
                                            }`}
                                    >
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{addon.name}</p>
                                            <p className="text-sm font-black text-charcoal">+৳{addon.price.toLocaleString()}</p>
                                        </div>
                                        <div className={`p-2 rounded-full ${selections.includes(addon.id) ? 'bg-primary text-white' : 'bg-gray-100 text-gray-300'}`}>
                                            {selections.includes(addon.id) ? <Check size={14} /> : <Plus size={14} />}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* STEP 2: DATE & TIME */}
                    {step === 2 && (
                        <div className="space-y-10">
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2">Step 2 of 4</h4>
                                <h3 className="text-4xl font-serif italic">Select Date & Time</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Scheduled Date</label>
                                    <input
                                        type="date"
                                        className="w-full p-5 bg-gray-50 rounded-2xl border-none outline-none font-bold text-charcoal focus:ring-2 ring-primary/20"
                                    />
                                    <p className="text-[10px] text-orange-500 font-bold uppercase tracking-widest flex items-center gap-2">
                                        <Info size={12} /> Weekday slots get 15% discount
                                    </p>
                                </div>
                                <div className="space-y-6">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Preferred Time</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {["10:00 AM", "12:30 PM", "03:00 PM", "06:00 PM"].map(t => (
                                            <button
                                                key={t}
                                                onClick={() => setBookingDetails({ ...bookingDetails, time: t })}
                                                className={`py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${bookingDetails.time === t ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: PERSONAL DETAILS */}
                    {step === 3 && (
                        <div className="space-y-10">
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2">Step 3 of 4</h4>
                                <h3 className="text-4xl font-serif italic">Client Information</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <input type="text" placeholder="FULL NAME" className="w-full p-5 bg-gray-50 rounded-2xl outline-none border border-transparent focus:border-primary/20 text-xs font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <input type="tel" placeholder="PHONE NUMBER (+880)" className="w-full p-5 bg-gray-50 rounded-2xl outline-none border border-transparent focus:border-primary/20 text-xs font-bold" />
                                </div>
                                <div className="col-span-full">
                                    <textarea placeholder="SPECIAL REQUESTS (ALLERGIES, CONCERNS, ETC.)" rows={4} className="w-full p-5 bg-gray-50 rounded-3xl outline-none border border-transparent focus:border-primary/20 text-xs font-bold" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: PAYMENT & CONFIRMATION */}
                    {step === 4 && (
                        <div className="space-y-10">
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2">Final Step</h4>
                                <h3 className="text-4xl font-serif italic">Secure Checkout</h3>
                            </div>

                            <div className="bg-charcoal text-white rounded-[3rem] p-10 flex flex-col md:flex-row gap-12 items-center">
                                <div className="flex-1 text-center md:text-left">
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-2">Total Due Today (50%)</p>
                                    <p className="text-6xl font-black">৳{(totalPrice / 2).toLocaleString()}</p>
                                    <p className="text-[10px] text-primary font-bold uppercase tracking-widest mt-4">Remaining Balance at Salon: ৳{(totalPrice / 2).toLocaleString()}</p>
                                </div>
                                <div className="flex flex-col gap-4 w-full md:w-auto">
                                    <button className="px-12 py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-2xl">
                                        <CreditCard size={18} /> Pay via SSLCommerz
                                    </button>
                                    <p className="text-[8px] text-center opacity-40 uppercase font-black tracking-widest">Secure AES-256 Encryption</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Footer */}
                    <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Est. Investment</span>
                            <span className="text-2xl font-black text-charcoal">৳{totalPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex gap-4">
                            {step > 1 && (
                                <button locale="en" onClick={prevStep} className="px-8 py-4 bg-gray-50 text-gray-400 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-100 transition-all">
                                    Back
                                </button>
                            )}
                            <button
                                onClick={step === 4 ? onClose : nextStep}
                                className="px-10 py-4 bg-charcoal text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-primary transition-all shadow-xl flex items-center gap-2"
                            >
                                {step === 4 ? "Finalize Booking" : "Next Step"} <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

// --- MODAL: CUSTOMIZER (Original Implementation preserved with UI enhancements) ---
const CustomizerModal = ({ onClose }) => {
    const [selections, setSelections] = useState([]);
    const basePrice = 5000;

    const totalPrice = useMemo(() => {
        return basePrice + selections.reduce((sum, id) => sum + ADDONS.find(a => a.id === id).price, 0);
    }, [selections]);

    const toggleAddon = (id) => {
        setSelections(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-3xl p-4 md:p-12 overflow-y-auto"
        >
            <motion.div className="bg-white rounded-[4rem] w-full max-w-6xl p-8 md:p-16 relative flex flex-col md:flex-row gap-12 shadow-3xl">
                <button onClick={onClose} className="absolute top-8 right-8 p-3 hover:bg-gray-100 rounded-full transition-colors">
                    <X size={24} />
                </button>

                <div className="flex-1">
                    <h2 className="text-4xl md:text-5xl font-serif italic mb-4">Build Your <span className="text-primary">Bespoke</span> Pack</h2>
                    <p className="text-gray-400 text-sm mb-12 uppercase tracking-widest font-bold">Mix and match services to create your personal Radiance formula.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                        {ADDONS.map(addon => (
                            <button
                                key={addon.id}
                                onClick={() => toggleAddon(addon.id)}
                                className={`p-6 rounded-[2rem] border-2 text-left transition-all flex justify-between items-center ${selections.includes(addon.id)
                                    ? 'border-primary bg-primary/5 shadow-xl'
                                    : 'border-gray-50 bg-gray-50 hover:border-gray-200 shadow-sm'
                                    }`}
                            >
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest mb-1">{addon.name}</p>
                                    <p className="text-primary font-black">+৳{addon.price.toLocaleString()}</p>
                                </div>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selections.includes(addon.id) ? 'bg-primary text-white' : 'bg-white text-gray-300'}`}>
                                    {selections.includes(addon.id) ? <Check size={16} /> : <Plus size={16} />}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="w-full md:w-96 bg-gray-50 rounded-[3rem] p-10 flex flex-col shadow-inner">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-8">Summary Breakdown</h4>
                    <div className="flex-1 space-y-4">
                        <div className="flex justify-between text-xs font-bold uppercase opacity-60"><span>Base Experience</span> <span>৳5,000</span></div>
                        {selections.map(id => {
                            const item = ADDONS.find(a => a.id === id);
                            return (
                                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={id} className="flex justify-between text-xs font-bold uppercase">
                                    <span>{item.name}</span> <span>৳{item.price.toLocaleString()}</span>
                                </motion.div>
                            );
                        })}
                    </div>
                    <div className="pt-8 border-t-2 border-dashed border-gray-200 mt-8">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-2">Total Investment</p>
                        <p className="text-5xl font-black text-charcoal mb-8">৳{totalPrice.toLocaleString()}</p>
                        <button className="w-full bg-primary text-white py-5 rounded-3xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl hover:scale-105 transition-transform active:scale-95">
                            Validate Custom Pack
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Pricing;
