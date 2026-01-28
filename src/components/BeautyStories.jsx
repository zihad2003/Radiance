import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Star, Play, X, ChevronRight, Filter, Search,
    Camera, Video, User, MapPin, Quote, ArrowRight,
    Share2, Facebook, Instagram, MessageCircle, Heart,
    Clock, Sparkles, Sliders, Info, ShieldCheck, Download
} from 'lucide-react';
import {
    BEAUTY_STORIES, STORY_CATEGORIES, SKIN_TONES, BUDGET_RANGES
} from '../data/beautyStories';
import { ReactCompareSlider, ReactCompareSliderHandle } from 'react-compare-slider';
import GlassCard from './ui/GlassCard';
import Image from './ui/Image';

const BeautyStories = () => {
    const [selectedStory, setSelectedStory] = useState(null);
    const [activeFilter, setActiveFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        skinTone: "All",
        budget: "All",
        sortBy: "Most Recent"
    });

    // --- Filter Logic ---
    const filteredStories = useMemo(() => {
        let result = BEAUTY_STORIES.filter(story => {
            const matchesCategory = activeFilter === "All" || story.category === activeFilter;
            const matchesSearch = story.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                story.occasion.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesSkinTone = filters.skinTone === "All" || story.skinTone === filters.skinTone;
            const matchesBudget = filters.budget === "All";

            return matchesCategory && matchesSearch && matchesSkinTone && matchesBudget;
        });

        if (filters.sortBy === "Highest Rated") {
            result = [...result].sort((a, b) => b.rating - a.rating);
        } else if (filters.sortBy === "Most Popular") {
            result = [...result].sort((a, b) => (b.id?.length || 0) - (a.id?.length || 0));
        } else if (filters.sortBy === "Most Recent") {
            result = [...result].reverse();
        }

        return result;
    }, [activeFilter, searchQuery, filters]);

    return (
        <section id="stories" className="py-20 bg-[#050505] text-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header - More Compact */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div className="max-w-xl">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-3 block"
                        >
                            Authentic Journeys
                        </motion.span>
                        <h2 className="text-4xl md:text-6xl font-serif text-white italic">
                            Bangladesh <span className="text-gradient-gold">Beauty</span> Stories
                        </h2>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                        >
                            <Filter size={14} /> Filters
                        </button>
                        <div className="hidden md:flex gap-2">
                            {STORY_CATEGORIES.slice(0, 4).map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveFilter(cat)}
                                    className={`px-5 py-3 rounded-full text-[9px] font-bold uppercase transition-all ${activeFilter === cat ? 'bg-gold text-black' : 'bg-white/5 text-white/40 hover:text-white border border-white/5'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Search & Advanced Filters (Collapsible) */}
                <AnimatePresence>
                    {(showFilters || searchQuery) && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden mb-8"
                        >
                            <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10 backdrop-blur-xl">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <div className="md:col-span-2 relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Search by name or occasion..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 bg-white/5 rounded-xl border border-white/10 outline-none text-[11px] font-bold uppercase tracking-widest placeholder:text-white/20 text-white"
                                        />
                                    </div>
                                    <div>
                                        <select
                                            value={filters.sortBy}
                                            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none text-white"
                                        >
                                            <option className="bg-[#050505]">Most Recent</option>
                                            <option className="bg-[#050505]">Most Popular</option>
                                            <option className="bg-[#050505]">Highest Rated</option>
                                        </select>
                                    </div>
                                    <div>
                                        <select
                                            value={filters.skinTone}
                                            onChange={(e) => setFilters({ ...filters, skinTone: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none text-white"
                                        >
                                            {SKIN_TONES.map(t => <option key={t} className="bg-[#050505]" value={t}>{t} Tone</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Horizontal Scrolling Stories */}
                <div className="relative group">
                    <motion.div
                        className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar"
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {filteredStories.map((story, idx) => (
                            <div key={story.id} className="min-w-[300px] md:min-w-[400px] snap-center">
                                <StoryCard
                                    story={story}
                                    index={idx}
                                    onClick={() => setSelectedStory(story)}
                                />
                            </div>
                        ))}

                        {/* UGC Card Integrated into Slider */}
                        <div className="min-w-[300px] md:min-w-[400px] snap-center">
                            <motion.div
                                whileHover={{ y: -10 }}
                                className="h-full rounded-[2.5rem] bg-gradient-to-br from-gold/20 to-primary/20 border border-white/10 p-10 flex flex-col justify-center items-center text-center relative overflow-hidden group/ugc"
                            >
                                <Camera size={120} className="text-white/5 absolute -bottom-4 -right-4 rotate-12 group-hover/ugc:scale-110 transition-transform" />
                                <div className="mb-6 w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center">
                                    <Sparkles className="text-gold" />
                                </div>
                                <h3 className="text-2xl font-serif italic mb-4">Be Our Next <span className="text-gold">Cover Bride</span></h3>
                                <p className="text-xs text-white/40 mb-8 leading-relaxed">Share your transformation with #RadianceStory for a chance to be featured.</p>
                                <button className="px-8 py-3 bg-white text-black rounded-full font-black uppercase tracking-widest text-[9px]">Apply Now</button>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Gradient Fades for Scroll */}
                    <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none md:opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            </div>

            {/* Full Story Expansion Modal */}
            <AnimatePresence>
                {selectedStory && (
                    <StoryDetailModal
                        story={selectedStory}
                        onClose={() => setSelectedStory(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

// --- SUB-COMPONENT: STORY CARD ---
const StoryCard = ({ story, index, onClick }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ delay: (index % 6) * 0.05, duration: 0.5 }}
        whileHover={{ y: -10 }}
        onClick={onClick}
        className="group cursor-pointer h-full"
    >
        <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl bg-white/5 border border-white/5 h-full">
            <Image
                src={story.images?.hero || "https://images.unsplash.com/photo-1594462255122-217f0dbdf24b?q=80&w=800"}
                alt={story.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

            {/* Category Badge & Star */}
            <div className="absolute top-6 left-6 flex flex-col gap-2">
                <span className="px-4 py-1.5 bg-black/60 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-xl border border-white/10">
                    {story.category}
                </span>
                <div className="flex items-center gap-1 bg-gold/90 backdrop-blur-md px-3 py-1 rounded-full text-black text-[10px] font-bold border border-gold/20 shadow-lg">
                    <Star size={10} fill="currentColor" /> {story.rating || 5}.0
                </div>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-10 left-10 right-10 text-left">
                <div className="mb-4">
                    <h4 className="text-3xl font-serif text-white italic leading-tight mb-2">{story.name}{story.age ? `, ${story.age}` : ''}</h4>
                    <p className="text-gold font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
                        <Sparkles size={12} /> {story.occasion}
                    </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <button className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 group-hover:gap-5 transition-all text-white hover:text-gold">
                        Read Story <ArrowRight size={14} className="text-gold" />
                    </button>
                    {story.video && <div className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-gold hover:text-black transition-colors"><Play size={12} fill="currentColor" /></div>}
                </div>
            </div>
        </div>
    </motion.div>
);

// --- SUB-COMPONENT: STORY DETAIL MODAL ---
const StoryDetailModal = ({ story, onClose }) => {
    const [activeTab, setActiveTab] = useState("Journey");

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-4 md:p-8 xl:p-12 overflow-y-auto"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-[#0A0A0A] w-full max-w-7xl min-h-[80vh] rounded-[3rem] overflow-hidden border border-white/10 relative shadow-2xl flex flex-col md:flex-row"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 z-50 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all backdrop-blur-md border border-white/10"
                >
                    <X size={24} />
                </button>

                {/* Left: Visual Storytelling */}
                <div className="w-full md:w-1/2 relative bg-black flex flex-col">
                    <div className="flex-1 relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            {activeTab === "Journey" ? (
                                <motion.div key="journey" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                                    <ReactCompareSlider
                                        itemOne={<div className="h-full relative"><Image src={story.images?.before || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800"} className="w-full h-full object-cover grayscale opacity-60" /><div className="absolute top-10 left-10 px-6 py-2 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">Natural Canvas</div></div>}
                                        itemTwo={<div className="h-full relative"><Image src={story.images?.hero || "https://images.unsplash.com/photo-1594462255122-217f0dbdf24b?q=80&w=800"} className="w-full h-full object-cover" /><div className="absolute top-10 right-10 px-6 py-2 bg-gold/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-black shadow-lg">The Radiance Result</div></div>}
                                        handle={<ReactCompareSliderHandle buttonStyle={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(245, 230, 200, 0.4)', color: '#fff' }} />}
                                    />
                                </motion.div>
                            ) : (
                                <motion.div key="gallery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full grid grid-cols-2 grid-rows-2">
                                    {(story.images?.after || [story.images?.hero]).slice(0, 4).map((img, i) => (
                                        <div key={i} className="relative overflow-hidden group">
                                            <Image src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right: Emotional Core */}
                <div className="w-full md:w-1/2 p-12 md:p-16 flex flex-col h-full bg-[#0A0A0A] overflow-y-auto">
                    <div className="flex flex-wrap gap-3 mb-8">
                        {["Radiance Artist Choice", story.category, story.location || "Dhaka"].map(tag => (
                            <span key={tag} className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-gold/80">{tag}</span>
                        ))}
                    </div>

                    <h3 className="text-5xl md:text-6xl font-serif text-white italic leading-tight mb-4">{story.name}</h3>
                    <p className="text-white/40 font-light text-lg mb-10 leading-relaxed font-serif italic">"{story.quote}"</p>

                    <div className="flex gap-4 mb-12 border-b border-white/10 pb-8">
                        {["Journey", "Process", "Products"].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`text-[10px] font-black uppercase tracking-[0.3em] pb-2 transition-all relative ${activeTab === tab ? 'text-gold' : 'text-white/20 hover:text-white'}`}
                            >
                                {tab}
                                {activeTab === tab && <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />}
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 space-y-12">
                        {activeTab === "Journey" && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <div className="grid grid-cols-2 gap-8 mb-12">
                                    <div className="p-6 bg-white/5 border border-white/5 rounded-3xl">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-3">Professional</p>
                                        <p className="text-sm text-white font-medium">{story.profession || "Fashion Enthusiast"}</p>
                                    </div>
                                    <div className="p-6 bg-white/5 border border-white/5 rounded-3xl">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-3">Service Package</p>
                                        <p className="text-sm text-white font-medium">{story.package}</p>
                                    </div>
                                </div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 mb-6">Her Transformation Story</h4>
                                <p className="text-white/60 leading-relaxed font-light text-sm mb-8">{story.story}</p>
                            </motion.div>
                        )}

                        {activeTab === "Process" && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                                <div className="flex items-center gap-6 p-8 bg-white/5 border border-white/5 rounded-[2.5rem]">
                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold/40">
                                        <Image src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h5 className="text-xl font-serif italic mb-1">Styled by Master Artistry Team</h5>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-primary">Senior Creative Directors</p>
                                    </div>
                                </div>

                                <div className="space-y-12">
                                    <div className="space-y-6">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">Techniques Used</h4>
                                        <div className="flex flex-wrap gap-3">
                                            {["Airbrush Foundation", "HD Sculpting", "Waterproof Setting", "Cultural Jewelry Integration", "Luxury Lash layering"].map(t => (
                                                <span key={t} className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold uppercase tracking-widest">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">The Curator's Note</h4>
                                        <p className="text-white/60 text-sm leading-relaxed font-light italic border-l-4 border-gold pl-6">
                                            {story.stylistNote || "The goal for this transformation was to preserve the natural radiance of the client while incorporating the grandeur of classical Bangladeshi bridal aesthetics."}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Social Share Footer */}
                    <div className="pt-12 mt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-6">
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Share Story</p>
                            <div className="flex gap-4">
                                <button className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all text-white/60 hover:text-white"><Facebook size={18} /></button>
                                <button className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all text-white/60 hover:text-white"><Instagram size={18} /></button>
                                <button className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all text-white/60 hover:text-white"><MessageCircle size={18} /></button>
                                <button className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all text-white/60 hover:text-white"><Share2 size={18} /></button>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all">
                                <Heart size={16} /> Heart this Look
                            </button>
                            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all">
                                <Download size={16} /> Save to Collection
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default BeautyStories;
