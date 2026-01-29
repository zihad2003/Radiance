import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Star, Play, X, Filter, Search,
    Camera, Sparkles, ArrowRight,
    Share2, Facebook, Instagram, MessageCircle, Heart,
    Download, Info
} from 'lucide-react';
import {
    BEAUTY_STORIES, STORY_CATEGORIES, SKIN_TONES
} from '../data/beautyStories';
import { ReactCompareSlider, ReactCompareSliderHandle } from 'react-compare-slider';
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
        <section id="stories" className="py-32 bg-[#121110] text-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <div className="bento-ribbon mb-8 text-primary">
                            <Camera size={14} fill="currentColor" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Real Stories</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-sans font-black text-white uppercase tracking-tighter leading-[0.9]">
                            AUTHENTIC <br />
                            <span className="text-primary italic">JOURNEYS</span>
                        </h2>
                    </div>

                    <div className="flex flex-col items-end gap-6">
                        <div className="hidden md:flex gap-2 p-1 bg-white/5 rounded-full border border-white/5">
                            {STORY_CATEGORIES.slice(0, 4).map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveFilter(cat)}
                                    className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === cat ? 'bg-primary text-black' : 'text-white/40 hover:text-white'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
                        >
                            <Filter size={14} /> FILTER & SORT
                        </button>
                    </div>
                </div>

                {/* Search & Advanced Filters (Collapsible) */}
                <AnimatePresence>
                    {(showFilters || searchQuery) && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden mb-12"
                        >
                            <div className="bento-card p-8 bg-[#0A0A0A]">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <div className="md:col-span-2 relative">
                                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                                        <input
                                            type="text"
                                            placeholder="SEARCH STORIES..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-14 pr-6 py-4 bg-white/5 rounded-2xl border border-white/5 outline-none text-[11px] font-black uppercase tracking-widest placeholder:text-white/20 text-white focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                    <div className="relative">
                                        <select
                                            value={filters.sortBy}
                                            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                                            className="w-full px-6 py-4 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none text-white appearance-none cursor-pointer"
                                        >
                                            <option className="bg-[#0A0A0A]">Most Recent</option>
                                            <option className="bg-[#0A0A0A]">Most Popular</option>
                                            <option className="bg-[#0A0A0A]">Highest Rated</option>
                                        </select>
                                    </div>
                                    <div className="relative">
                                        <select
                                            value={filters.skinTone}
                                            onChange={(e) => setFilters({ ...filters, skinTone: e.target.value })}
                                            className="w-full px-6 py-4 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none text-white appearance-none cursor-pointer"
                                        >
                                            {SKIN_TONES.map(t => <option key={t} className="bg-[#0A0A0A]" value={t}>{t} Tone</option>)}
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
                        className="flex gap-8 overflow-x-auto pb-12 snap-x hide-scrollbar"
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {filteredStories.map((story, idx) => (
                            <div key={story.id} className="min-w-[320px] md:min-w-[420px] snap-center">
                                <StoryCard
                                    story={story}
                                    index={idx}
                                    onClick={() => setSelectedStory(story)}
                                />
                            </div>
                        ))}

                        {/* UGC Card Integrated into Slider */}
                        <div className="min-w-[320px] md:min-w-[420px] snap-center">
                            <motion.div
                                whileHover={{ y: -10 }}
                                className="h-full bento-card p-12 flex flex-col justify-center items-center text-center relative overflow-hidden group/ugc bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A]"
                            >
                                <div className="mb-8 w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center border border-white/5">
                                    <Sparkles size={32} className="text-primary" />
                                </div>
                                <h3 className="text-3xl font-sans font-black uppercase tracking-tighter text-white mb-6">BE THE <br /><span className="text-primary italic">NEXT ICON</span></h3>
                                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-10 leading-relaxed max-w-[200px]">
                                    Share your transformation with #RadianceStory for a chance to be featured.
                                </p>
                                <button className="px-10 py-5 bg-white text-black rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-primary hover:text-white transition-all">Submit Now</button>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Gradient Fades for Scroll */}
                    <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-[#121110] to-transparent pointer-events-none" />
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
        <div className="bento-card h-[600px] relative overflow-hidden p-8 flex flex-col justify-end">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={story.images?.hero || "https://images.unsplash.com/photo-1594462255122-217f0dbdf24b?q=80&w=800"}
                    alt={story.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-[#121110]/40 to-transparent" />
            </div>

            {/* Badges */}
            <div className="absolute top-8 left-8 flex flex-col gap-3 z-20">
                <div className="bento-ribbon bg-black/40 backdrop-blur-md border-white/10 text-white">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em]">{story.category}</span>
                </div>
            </div>
            <div className="absolute top-8 right-8 z-20">
                <div className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center border border-primary/20 font-black text-[10px] text-primary">
                    {story.rating}
                </div>
            </div>

            {/* Content */}
            <div className="relative z-20">
                <div className="flex items-center gap-3 mb-4 text-primary">
                    <Sparkles size={14} />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">{story.occasion}</span>
                </div>
                <h4 className="text-4xl font-sans font-black text-white uppercase tracking-tighter leading-none mb-2">{story.name}</h4>
                {story.age && <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.4em] mb-8">{story.age} Years Old / Dhaka</p>}

                <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.4em] group-hover:text-primary transition-colors">Read Story</span>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
                        <ArrowRight size={14} />
                    </div>
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
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[#121110]/95 backdrop-blur-3xl p-4 md:p-12 overflow-y-auto"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="w-full max-w-7xl min-h-[80vh] bento-card p-0 relative flex flex-col md:flex-row overflow-hidden border-2 border-white/5"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 z-50 p-4 bg-black/40 hover:bg-black/60 rounded-2xl text-white transition-all backdrop-blur-xl border border-white/10"
                >
                    <X size={20} />
                </button>

                {/* Left: Visual Storytelling */}
                <div className="w-full md:w-1/2 relative bg-black flex flex-col h-[50vh] md:h-auto">
                    <div className="flex-1 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[#121110]" />
                        <ReactCompareSlider
                            itemOne={<div className="h-full relative"><Image src={story.images?.before || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800"} className="w-full h-full object-cover grayscale opacity-60" /><div className="absolute top-10 left-10 px-6 py-3 bg-black/60 backdrop-blur-md rounded-xl text-[9px] font-black uppercase tracking-[0.3em] text-white border border-white/10">Base Canvas</div></div>}
                            itemTwo={<div className="h-full relative"><Image src={story.images?.hero || "https://images.unsplash.com/photo-1594462255122-217f0dbdf24b?q=80&w=800"} className="w-full h-full object-cover" /><div className="absolute top-10 right-10 px-6 py-3 bg-primary/90 backdrop-blur-md rounded-xl text-[9px] font-black uppercase tracking-[0.3em] text-black shadow-lg">Final Form</div></div>}
                            handle={<ReactCompareSliderHandle buttonStyle={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }} />}
                        />
                    </div>
                </div>

                {/* Right: Emotional Core */}
                <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col h-full bg-[#0A0A0A] overflow-y-auto custom-scrollbar">
                    <div className="flex flex-wrap gap-3 mb-12">
                        {["Radiance Choice", story.category, story.location || "Dhaka"].map(tag => (
                            <span key={tag} className="px-5 py-2 bg-white/5 border border-white/5 rounded-full text-[8px] font-black uppercase tracking-[0.2em] text-primary/80">{tag}</span>
                        ))}
                    </div>

                    <h3 className="text-5xl md:text-7xl font-sans font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">{story.name}</h3>

                    <div className="mb-12 relative">
                        <span className="text-6xl text-white/5 absolute -top-6 -left-4">"</span>
                        <p className="text-gray-400 font-bold text-sm leading-relaxed uppercase tracking-widest relative z-10 pl-6 border-l-2 border-primary">
                            {story.quote}
                        </p>
                    </div>

                    <div className="flex-1 space-y-12">
                        <div>
                            <h4 className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mb-8 w-full border-b border-white/10 pb-4">
                                <Info size={14} /> Transformation Brief
                            </h4>
                            <p className="text-white/80 leading-loose text-xs font-medium">{story.story}</p>
                        </div>

                        <div>
                            <h4 className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mb-8 w-full border-b border-white/10 pb-4">
                                <Sparkles size={14} /> Technical Execution
                            </h4>
                            <div className="flex flex-wrap gap-3">
                                {["HD Sculpting", "Airbrush Base", "Lash Architecture", "Color Grading"].map(t => (
                                    <span key={t} className="px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-[9px] font-bold uppercase tracking-widest text-white/70">{t}</span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mb-8 w-full border-b border-white/10 pb-4">
                                <Star size={14} /> Artistic Direction
                            </h4>
                            <p className="text-xs text-white/60 italic leading-relaxed">
                                "{story.stylistNote || "Preserving the client's natural anatomical baseline while amplifying high-frequency textures for cinematic output."}"
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default BeautyStories;
