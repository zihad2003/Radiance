import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Check, Star, Clock, ChevronRight, X, Search, Users,
    Filter, Sparkles, ChevronDown
} from 'lucide-react';
import { PACKAGES, COMPARISON_DATA } from '../data/packages';
import Counter from './ui/Counter';

const Pricing = ({ onBook }) => {
    // --- STATE ---
    const [activeCategory, setActiveCategory] = useState("All Packages");
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
        <section id="pricing" className="py-24 bg-[#121110] relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -mr-96 -mt-96 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-900/5 rounded-full blur-[120px] -ml-64 -mb-64 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* --- HEADER --- */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <div className="bento-ribbon mb-6 text-primary w-fit mx-auto">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Luxury Investment Portfolio</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-sans font-black text-white mb-8 uppercase tracking-tighter leading-[0.9]">
                        Signature <span className="text-primary italic font-serif">Packages</span>
                    </h2>
                </div>

                {/* --- SEARCH & TABS BAR --- */}
                <div className="mb-12 space-y-8">
                    {/* Search & Sort & Filter Toggle */}
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#0A0A0A] p-4 rounded-[2.5rem] border border-white/5 shadow-2xl">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                            <input
                                type="text"
                                placeholder="Search packages (e.g. 'Bridal', 'Squad', 'Facial')..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-16 pr-6 py-4 bg-white/5 rounded-full text-[10px] text-white font-bold tracking-widest uppercase focus:bg-white/10 outline-none transition-all placeholder:text-white/20"
                            />
                        </div>
                        <div className="flex gap-4 w-full md:w-auto">
                            <div className="relative flex-1 md:w-64">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full appearance-none pl-6 pr-12 py-4 bg-white/5 rounded-full text-[10px] text-white font-black uppercase tracking-widest outline-none border border-transparent hover:bg-white/10 transition-all cursor-pointer"
                                >
                                    <option className="bg-[#121110] text-gray-400">Most Popular</option>
                                    <option className="bg-[#121110] text-gray-400">Price: Low to High</option>
                                    <option className="bg-[#121110] text-gray-400">Price: High to Low</option>
                                    <option className="bg-[#121110] text-gray-400">Newest First</option>
                                </select>
                                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" size={16} />
                            </div>
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`p-4 rounded-full transition-all border border-white/5 ${showFilters ? 'bg-primary text-black' : 'bg-white/5 text-white hover:bg-white/10'}`}
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
                                    ? 'bg-white text-black shadow-xl scale-110'
                                    : 'bg-white/5 text-gray-500 border border-transparent hover:border-white/10 hover:text-white'
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
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 p-10 bg-[#0A0A0A] rounded-[2.5rem] border border-white/5 mt-4">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Max Price (BDT)</label>
                                        <input
                                            type="range" min="0" max="100000" step="5000"
                                            value={filters.maxPrice}
                                            onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
                                            className="w-full accent-primary h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                                        />
                                        <div className="text-[10px] font-bold text-white tracking-wider">Up to ৳{filters.maxPrice.toLocaleString()}</div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Group Size</label>
                                        <div className="flex flex-wrap gap-2">
                                            {["All", "Solo", "Duo", "Group"].map(opt => (
                                                <button
                                                    key={opt}
                                                    onClick={() => setFilters({ ...filters, people: opt })}
                                                    className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${filters.people === opt ? 'bg-primary text-black' : 'bg-white/5 text-gray-500 hover:bg-white/10'}`}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Duration</label>
                                        <div className="flex flex-wrap gap-2">
                                            {["All", "hour", "hours", "Day", "Weeks"].map(opt => (
                                                <button
                                                    key={opt}
                                                    onClick={() => setFilters({ ...filters, duration: opt })}
                                                    className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${filters.duration === opt ? 'bg-primary text-black' : 'bg-white/5 text-gray-500 hover:bg-white/10'}`}
                                                >
                                                    {opt === "hour" ? "< 2 hrs" : opt === "Weeks" ? "Multi-Day" : opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-end">
                                        <button
                                            onClick={() => setFilters({ maxPrice: 100000, duration: "All", occasion: "All", people: "All" })}
                                            className="text-[10px] font-black uppercase tracking-tighter text-gray-500 hover:text-primary transition-colors underline underline-offset-4"
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 min-h-[400px]">
                    <AnimatePresence mode="popLayout">
                        {filteredPackages.length > 0 ? (
                            filteredPackages.map((pkg, idx) => (
                                <PackageCard
                                    key={pkg.id}
                                    pkg={pkg}
                                    index={idx}
                                    onDetail={() => onBook && onBook(pkg.name)}
                                />
                            ))
                        ) : (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-32 text-center text-gray-600">
                                <Search size={48} className="mx-auto mb-4 opacity-20" />
                                <p className="font-serif italic text-xl">No packages found matching your criteria.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* --- PROMOTIONAL BANNERS --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                    <div className="bento-card bg-gradient-to-r from-indigo-950 to-blue-950 border-white/5 p-12 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
                            <Clock size={120} strokeWidth={1} className="text-white" />
                        </div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-4">Limited Offer</h4>
                        <h3 className="text-3xl font-serif italic mb-6 text-white">Early Bird Bridal</h3>
                        <p className="text-white/60 text-sm mb-8 max-w-sm">Book any Bridal Package 3+ months in advance and enjoy a 10% premium credit on your account.</p>
                        <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:gap-4 transition-all text-white hover:text-primary">
                            Secure Discount <ChevronRight size={14} />
                        </button>
                    </div>
                    <div className="bento-card bg-gradient-to-r from-rose-950 to-pink-950 border-white/5 p-12 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
                            <Users size={120} strokeWidth={1} className="text-white" />
                        </div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-4">Loyalty Reward</h4>
                        <h3 className="text-3xl font-serif italic mb-6 text-white">Sister & Bestie Special</h3>
                        <p className="text-white/60 text-sm mb-8 max-w-sm">Book together for the same time slot and get 20% off the second transformation.</p>
                        <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:gap-4 transition-all text-primary">
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
                            <h3 className="text-4xl font-serif italic mb-2 text-white">Detailed Selection Matrix</h3>
                            <p className="text-gray-500 text-[10px] font-bold tracking-[0.3em] uppercase">Granular feature breakdown across premium tiers</p>
                        </div>
                        <ComparisonTable />
                    </motion.div>
                )}
            </div>

            {/* --- MODALS --- */}
            {/* Kept as placeholder but not used, prioritizing onBook global wizard */}
            <AnimatePresence>
                {/* {selectedPackage && (
                    <BookingWizardModal pkg={selectedPackage} onClose={() => setSelectedPackage(null)} />
                )} */}
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
        className={`bento-card relative flex flex-col h-full p-10 group bg-[#0A0A0A] border border-white/5 hover:border-primary/30 transition-all duration-500 ${pkg.theme}`}
    >
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
            <div className="flex-1">
                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm ${pkg.badge ? 'bg-primary text-black' : 'bg-white/10 text-white'}`}>
                    {pkg.tier}
                </span>
                <h3 className="text-3xl font-serif mt-4 italic leading-tight text-white">{pkg.name}</h3>
            </div>
            {pkg.isPopular && (
                <div className="bg-primary/10 text-primary p-3 rounded-2xl animate-pulse">
                    <Star size={20} fill="currentColor" />
                </div>
            )}
        </div>

        {/* Pricing Section */}
        <div className="mb-8">
            <div className="flex items-baseline gap-1">
                <span className="text-[10px] uppercase font-bold opacity-60 text-white">Investment</span>
                <span className="text-4xl font-black text-white">
                    ৳<Counter from={0} to={pkg.price} duration={1} />
                </span>
                {pkg.price > 10000 && <span className="text-[10px] ml-1 opacity-50 text-white">+ VAT</span>}
            </div>
            <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5 opacity-60 text-[10px] font-bold uppercase tracking-widest text-white">
                    <Clock size={12} /> {pkg.duration}
                </div>
                <div className="flex items-center gap-1.5 opacity-60 text-[10px] font-bold uppercase tracking-widest text-white">
                    <Sparkles size={12} /> {pkg.stylistLevel}
                </div>
            </div>
        </div>

        <p className="text-sm italic opacity-70 mb-10 border-l-2 border-primary/50 pl-4 min-h-[3rem] text-gray-300">
            {pkg.shortDesc}
        </p>

        {/* Action Button */}
        <div className="mt-auto space-y-3 pt-6 border-t border-white/10">
            <button
                onClick={onDetail}
                className="w-full py-5 px-6 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-primary hover:text-white shadow-xl flex items-center justify-center gap-2"
            >
                Start Transformation <ChevronRight size={14} />
            </button>
            <p className="text-center text-[9px] font-bold uppercase tracking-widest opacity-40 text-white">
                ⭐ {pkg.rating} ({pkg.reviewCount} Bookings)
            </p>
        </div>

        {pkg.isBestValue && (
            <div className="absolute -top-4 -right-4 bg-primary text-black p-4 rounded-3xl shadow-2xl rotate-12 font-black text-[10px] uppercase tracking-widest border border-white/20">
                Best Value
            </div>
        )}
    </motion.div>
);

// --- SUB-COMPONENT: COMPARISON TABLE (High-End) ---
const ComparisonTable = () => (
    <div className="overflow-x-auto bento-card p-0 border border-white/5 bg-[#0A0A0A]">
        <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
                <tr className="bg-white/5 text-white text-[10px] font-black uppercase tracking-[0.3em]">
                    <th className="p-8 sticky left-0 bg-[#0A0A0A] z-10 border-r border-white/5">Metrics</th>
                    <th className="p-8 text-center border-l border-white/5">Basic</th>
                    <th className="p-8 text-center border-l border-white/5">Signature</th>
                    <th className="p-8 text-center border-l border-white/5">Premium</th>
                    <th className="p-8 text-center border-l border-white/5">Platinum</th>
                    <th className="p-8 text-center border-l border-white/5">Royale</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
                {COMPARISON_DATA.map((row, i) => (
                    <motion.tr
                        key={i}
                        whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="transition-colors group cursor-default"
                    >
                        <td className="p-8 font-serif italic text-gray-300 sticky left-0 bg-[#0A0A0A] z-10 border-r border-white/5 group-hover:text-primary transition-colors">{row.feature}</td>
                        {['basic', 'signature', 'premium', 'platinum', 'royale'].map(tier => (
                            <td key={tier} className="p-8 text-sm font-bold text-center border-l border-white/5">
                                {typeof row[tier] === 'boolean' ? (
                                    row[tier] ? <div className="flex justify-center"><Check className="text-primary group-hover:scale-125 transition-transform" size={18} strokeWidth={3} /></div> : <div className="flex justify-center"><X className="text-white/10" size={18} /></div>
                                ) : (
                                    <span className={row[tier] !== '✗' ? "text-white" : "text-white/10 opacity-50"}>{row[tier]}</span>
                                )}
                            </td>
                        ))}
                    </motion.tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default Pricing;
