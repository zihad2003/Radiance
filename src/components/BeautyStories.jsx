import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Star, Play, X, ChevronRight, Filter, Search,
    Camera, Video, User, MapPin, Quote, ArrowRight,
    Share2, Facebook, Instagram, MessageCircle, Heart,
    Clock, Sparkles, Sliders, Info, ShieldCheck
} from 'lucide-react';
import {
    BEAUTY_STORIES, STORY_CATEGORIES, SKIN_TONES, BUDGET_RANGES
} from '../data/beautyStories';
import { ReactCompareSlider, ReactCompareSliderHandle } from 'react-compare-slider';
import GlassCard from './ui/GlassCard';

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

        // Sorting
        if (filters.sortBy === "Highest Rated") {
            result = [...result].sort((a, b) => b.rating - a.rating);
        } else if (filters.sortBy === "Most Popular") {
            // Simulated popularity based on ID or length
            result = [...result].sort((a, b) => b.id.length - a.id.length);
        } else if (filters.sortBy === "Most Recent") {
            result = [...result].reverse(); // Assuming newest are at the end
        }

        return result;
    }, [activeFilter, searchQuery, filters]);

    return (
        <section id="stories" className="py-24 bg-charcoal text-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-4 block"
                    >
                        Radiance Transformations
                    </motion.span>
                    <h2 className="text-5xl md:text-7xl font-serif text-white mb-8 italic">
                        Bangladesh <span className="text-gold">Beauty</span> Stories
                    </h2>
                    <p className="max-w-2xl mx-auto text-white/60 text-sm leading-relaxed mb-12">
                        Authentic journeys of transformation from across Bangladesh. Real brides,
                        real emotions, and the artistry that brought their visions to life.
                    </p>

                    {/* Filter & Search Bar */}
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/5 p-4 rounded-[2.5rem] border border-white/10 backdrop-blur-xl mb-12">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                            <input
                                type="text"
                                placeholder="Search stories by name or occasion..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-16 pr-6 py-4 bg-transparent border-none outline-none text-xs font-bold tracking-widest uppercase placeholder:text-white/20"
                            />
                        </div>
                        <div className="flex gap-4">
                            <select
                                value={filters.sortBy}
                                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                                className="appearance-none pl-8 pr-12 py-4 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest outline-none hover:bg-white/10 transition-all cursor-pointer text-white"
                            >
                                <option className="bg-neutral-900">Most Recent</option>
                                <option className="bg-neutral-900">Most Popular</option>
                                <option className="bg-neutral-900">Highest Rated</option>
                                <option className="bg-neutral-900">Similar to Me</option>
                            </select>
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center gap-2 px-8 py-4 rounded-full transition-all border ${showFilters ? 'bg-primary border-primary' : 'bg-white/5 border-white/10'}`}
                            >
                                <Filter size={18} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Advanced</span>
                            </button>
                        </div>
                    </div>

                    {/* Expandable Advanced Filters */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden mb-12"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10 bg-white/5 rounded-[2.5rem] border border-white/10 text-left">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Story Category</label>
                                        <div className="flex flex-wrap gap-2">
                                            {STORY_CATEGORIES.map(cat => (
                                                <button
                                                    key={cat}
                                                    onClick={() => setActiveFilter(cat)}
                                                    className={`px-4 py-2 rounded-lg text-[9px] font-bold uppercase transition-all ${activeFilter === cat ? 'bg-primary text-white' : 'bg-white/5 text-white/40 hover:text-white'}`}
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Skin Tone</label>
                                        <div className="flex flex-wrap gap-2">
                                            {SKIN_TONES.map(tone => (
                                                <button
                                                    key={tone}
                                                    onClick={() => setFilters({ ...filters, skinTone: tone })}
                                                    className={`px-4 py-2 rounded-lg text-[9px] font-bold uppercase transition-all ${filters.skinTone === tone ? 'bg-primary text-white' : 'bg-white/5 text-white/40 hover:text-white'}`}
                                                >
                                                    {tone}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Budget Range</label>
                                        <div className="flex flex-wrap gap-2">
                                            {BUDGET_RANGES.map(range => (
                                                <button
                                                    key={range}
                                                    onClick={() => setFilters({ ...filters, budget: range })}
                                                    className={`px-4 py-2 rounded-lg text-[9px] font-bold uppercase transition-all ${filters.budget === range ? 'bg-primary text-white' : 'bg-white/5 text-white/40 hover:text-white'}`}
                                                >
                                                    {range}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Stories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 fade-in-up">
                    <AnimatePresence mode="popLayout">
                        {filteredStories.map((story, idx) => (
                            <StoryCard
                                key={story.id}
                                story={story}
                                index={idx}
                                onClick={() => setSelectedStory(story)}
                            />
                        ))}
                    </AnimatePresence>
                </div>

                {/* UGC Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mt-32 p-12 bg-white/5 rounded-[4rem] border border-white/10 text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-12 opacity-5">
                        <Camera size={200} />
                    </div>
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="flex gap-4 mb-8">
                            <div className="w-12 h-12 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                                <Instagram size={24} className="text-white" />
                            </div>
                            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                                <Facebook size={24} className="text-white" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-serif italic mb-6">Be Our Next <span className="text-primary">Cover Bride</span></h3>
                        <p className="max-w-xl mx-auto text-white/40 text-sm mb-10 leading-relaxed font-light uppercase tracking-widest">
                            Share your transformation with #RadianceTransformation and tag us
                            to be featured in our monthly digital lookbook.
                        </p>
                        <div className="flex gap-4">
                            <button className="px-10 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-glow">Apply for Showcase</button>
                            <button className="px-10 py-4 bg-white/5 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] border border-white/10">Browse Hashtag</button>
                        </div>
                    </div>
                </motion.div>
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
        className="group cursor-pointer"
    >
        <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl bg-white/5">
            <img
                src={story.images?.hero || "https://images.unsplash.com/photo-1594462255122-217f0dbdf24b?q=80&w=800"}
                alt={story.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

            {/* Category Badge & Star */}
            <div className="absolute top-6 left-6 flex flex-col gap-2">
                <span className="px-4 py-1.5 bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-xl">
                    {story.category}
                </span>
                <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-gold text-[10px] font-bold border border-white/10">
                    <Star size={10} fill="currentColor" /> {story.rating}.0
                </div>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-10 left-10 right-10">
                <div className="mb-4">
                    <h4 className="text-3xl font-serif text-white italic leading-tight mb-2">{story.name}, {story.age}</h4>
                    <p className="text-gold font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
                        <Sparkles size={12} /> {story.occasion}
                    </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <button className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 group-hover:gap-5 transition-all">
                        Read Story <ArrowRight size={14} className="text-primary" />
                    </button>
                    {story.video && <div className="p-3 bg-white/10 backdrop-blur-md rounded-full"><Play size={12} fill="white" /></div>}
                </div>
            </div>

            {/* Quote Hover Effect */}
            <motion.div
                className="absolute inset-0 p-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                initial={false}
            >
                <Quote size={80} className="text-white/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12" />
                <p className="text-lg font-serif italic text-center relative z-10 leading-relaxed">
                    "{story.quote}"
                </p>
            </motion.div>
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
                initial={{ scale: 0.9, y: 100 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-neutral-900 rounded-[4rem] w-full max-w-7xl relative overflow-hidden flex flex-col lg:flex-row shadow-3xl"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 p-4 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all z-[60] border border-white/10"
                >
                    <X size={24} />
                </button>

                {/* --- Left Column: Hero & Media --- */}
                <div className="w-full lg:w-[45%] h-full min-h-[500px] lg:min-h-screen relative border-r border-white/5 bg-black">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={story.id}
                            src={story.images?.hero || "https://images.unsplash.com/photo-1594462255122-217f0dbdf24b?q=80&w=800"}
                            className="w-full h-full object-cover opacity-60"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            exit={{ opacity: 0 }}
                        />
                    </AnimatePresence>

                    {/* Branding Watermark */}
                    <div className="absolute top-12 left-12 flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center font-black text-xl">R</div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white">Radiance Salon</p>
                            <p className="text-[8px] font-bold uppercase tracking-widest text-primary">Dhaka Heritage</p>
                        </div>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="absolute bottom-12 left-12 right-12">
                        <div className="mb-8">
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="inline-block px-6 py-2 bg-gold/20 backdrop-blur-md rounded-full text-gold text-[10px] font-black uppercase tracking-widest border border-gold/20 mb-6"
                            >
                                {story.occasion}
                            </motion.span>
                            <h2 className="text-6xl md:text-8xl font-serif italic text-white leading-none mb-4">{story.name}</h2>
                            <p className="text-white/40 text-sm font-light uppercase tracking-[0.4em]">{story.profession} • {story.location}</p>
                        </div>

                        {/* Story Stats */}
                        <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
                            <div>
                                <p className="text-[8px] uppercase font-black tracking-widest text-white/40 mb-1">Package</p>
                                <p className="text-xs font-bold text-white">{story.package}</p>
                            </div>
                            <div>
                                <p className="text-[8px] uppercase font-black tracking-widest text-white/40 mb-1">Service Date</p>
                                <p className="text-xs font-bold text-white">{story.date}</p>
                            </div>
                            <div>
                                <p className="text-[8px] uppercase font-black tracking-widest text-white/40 mb-1">Total Score</p>
                                <p className="text-xs font-bold text-gold">★ 5.0 Premium</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Right Column: Content area --- */}
                <div className="flex-1 p-12 lg:p-20 overflow-y-auto max-h-[90vh] custom-scrollbar bg-neutral-900">

                    {/* Navigation Tabs */}
                    <div className="flex gap-12 border-b border-white/5 mb-16 pb-4">
                        {["Journey", "Gallery", "Video", "Expert Notes"].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`text-[10px] font-black uppercase tracking-[0.4em] transition-all relative ${activeTab === tab ? 'text-primary' : 'text-white/30 hover:text-white'}`}
                            >
                                {tab}
                                {activeTab === tab && <motion.div layoutId="tab-u" className="absolute -bottom-5 left-0 right-0 h-0.5 bg-primary" />}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-16">
                        {/* TAB: JOURNEY */}
                        {activeTab === 'Journey' && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-16">
                                {/* The Quote */}
                                <div className="p-12 bg-white/5 rounded-[3rem] border-l-8 border-primary relative overflow-hidden italic text-2xl md:text-3xl font-serif text-white/90 leading-relaxed shadow-inner">
                                    <Quote size={80} className="text-primary/10 absolute -top-4 -right-4" />
                                    "{story.quote}"
                                </div>

                                {/* Content Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="space-y-6">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">The Challenge</h4>
                                        <p className="text-white/60 text-sm leading-relaxed font-light">{story.challenge || "Seeking a signature look that balanced traditional heritage with modern elegance."}</p>
                                    </div>
                                    <div className="space-y-6">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-gold">The Result</h4>
                                        <p className="text-white/60 text-sm leading-relaxed font-light">{story.story}</p>
                                    </div>
                                </div>

                                {/* CTA: Book this Look */}
                                <div className="p-10 bg-gradient-to-r from-primary/10 to-gold/10 rounded-[3rem] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                                    <div>
                                        <h5 className="text-xl font-serif italic mb-2">Inspired by {story.name.split(' ')[0]}?</h5>
                                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Book the {story.package} Experience today</p>
                                    </div>
                                    <button className="px-10 py-5 bg-white text-charcoal rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-glow hover:scale-105 transition-all">
                                        Start Your Journey
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* TAB: GALLERY */}
                        {activeTab === 'Gallery' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                                {/* Before After Slider */}
                                <div className="rounded-[3rem] overflow-hidden bg-black border border-white/10 aspect-video relative group">
                                    <ReactCompareSlider
                                        itemOne={
                                            <div className="w-full h-full relative">
                                                <img src={story.images?.before || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800"} className="w-full h-full object-cover grayscale" />
                                                <div className="absolute top-8 left-8 p-3 bg-black/40 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-widest text-white border border-white/10">Natural Canvas</div>
                                            </div>
                                        }
                                        itemTwo={
                                            <div className="w-full h-full relative">
                                                <img src={story.images?.hero || "https://images.unsplash.com/photo-1594462255122-217f0dbdf24b?q=80&w=800"} className="w-full h-full object-cover" />
                                                <div className="absolute top-8 right-8 p-3 bg-primary/40 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-widest text-white border border-primary/20">The Transformation</div>
                                            </div>
                                        }
                                        handle={<ReactCompareSliderHandle buttonStyle={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(220, 20, 60, 0.4)' }} />}
                                    />
                                </div>

                                {/* Detailed Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    {story.images?.after?.map((img, i) => (
                                        <motion.div
                                            key={i}
                                            whileHover={{ scale: 1.05 }}
                                            className="aspect-square rounded-[2rem] overflow-hidden border border-white/5 cursor-zoom-in"
                                        >
                                            <img src={img} className="w-full h-full object-cover" />
                                        </motion.div>
                                    ))}
                                    {Object.values(story.images?.detailed || {}).map((img, i) => (
                                        <motion.div
                                            key={i}
                                            whileHover={{ scale: 1.05 }}
                                            className="aspect-square rounded-[2rem] overflow-hidden border border-white/5 cursor-zoom-in group"
                                        >
                                            <img src={img} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[10px] font-black uppercase tracking-widest transition-opacity">Detail View</div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* TAB: VIDEO */}
                        {activeTab === 'Video' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="aspect-[9/16] bg-white/5 rounded-[3rem] border border-white/10 flex flex-col items-center justify-center relative group overflow-hidden">
                                        <div className="z-10 text-center p-8">
                                            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                                <Play size={24} fill="white" />
                                            </div>
                                            <h5 className="font-serif italic text-xl mb-2">Testimonial</h5>
                                            <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Customer Reaction & Feedback</p>
                                        </div>
                                        <img src={story.images?.hero} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform" />
                                    </div>
                                    <div className="aspect-[9/16] bg-white/5 rounded-[3rem] border border-white/10 flex flex-col items-center justify-center relative group overflow-hidden">
                                        <div className="z-10 text-center p-8">
                                            <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                                <Clock size={24} fill="white" />
                                            </div>
                                            <h5 className="font-serif italic text-xl mb-2">Time-Lapse</h5>
                                            <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Process Acceleration</p>
                                        </div>
                                        <img src={story.images?.during?.[0] || story.images?.hero} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform" />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* TAB: EXPERT NOTES */}
                        {activeTab === 'Expert Notes' && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                                <div className="flex items-center gap-6 p-10 bg-white/5 rounded-[3rem] border border-white/10">
                                    <div className="w-20 h-20 rounded-full border-2 border-primary overflow-hidden">
                                        <User size={80} className="text-white/20" />
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
                </div>
            </motion.div>
        </motion.div>
    );
};

export default BeautyStories;
