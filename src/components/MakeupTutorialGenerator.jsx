import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Clock, BarChart, ChevronRight, PlayCircle, ShoppingBag } from 'lucide-react';
import { useAction } from 'convex/react';
import { api } from '../../convex/_generated/api';

const MakeupTutorialGenerator = () => {
    const [topic, setTopic] = useState('');
    const [skillLevel, setSkillLevel] = useState('Beginner');
    const [loading, setLoading] = useState(false);
    const [tutorial, setTutorial] = useState(null);
    const [error, setError] = useState(null);

    const generateTutorial = useAction(api.tutorials.generate);

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!topic.trim()) return;

        setLoading(true);
        setError(null);
        setTutorial(null);

        try {
            const result = await generateTutorial({ topic, skillLevel });
            setTutorial(result);
        } catch (err) {
            console.error(err);
            setError("We couldn't generate that tutorial right now. Please try again or check your connection.");
        } finally {
            setLoading(false);
        }
    };

    const suggestedTopics = [
        "Natural 'No-Makeup' Look",
        "Classic Bridal Glam",
        "Smokey Eye for Brown Eyes",
        "Dewy Glass Skin",
        "90s Supermodel Lip"
    ];

    return (
        <section className="py-24 bg-[#050505] relative overflow-hidden min-h-screen">
            {/* Ambient Background Glow */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-6 py-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full shadow-lg mb-6"
                    >
                        <span className="text-gold font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                            <Sparkles size={14} fill="currentColor" />
                            AI Beauty Coach
                        </span>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-serif italic mb-6 text-white">
                        Custom Makeup <span className="text-gradient-gold">Tutorials</span>
                    </h2>
                    <p className="text-white/40 max-w-2xl mx-auto font-light tracking-wide">
                        Tell us the look you want to achieve, and our AI will create a personalized step-by-step masterclass just for you.
                    </p>
                </div>

                {/* Input Section */}
                <div className="max-w-3xl mx-auto mb-16">
                    <form onSubmit={handleGenerate} className="relative z-10">
                        <div className="bg-white/5 p-3 rounded-[2rem] shadow-2xl border border-white/10 backdrop-blur-md flex flex-col md:flex-row gap-3">
                            <div className="flex-1 relative group">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-gold transition-colors" size={20} />
                                <input
                                    type="text"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    placeholder="e.g., 'Golden Hour Glow' or 'Bridal Smokey Eye'"
                                    className="w-full pl-14 pr-6 py-4 rounded-xl bg-black/20 border border-transparent focus:border-gold/30 font-medium outline-none text-white placeholder:text-white/20 transition-all custom-input"
                                />
                            </div>

                            <div className="relative">
                                <select
                                    value={skillLevel}
                                    onChange={(e) => setSkillLevel(e.target.value)}
                                    className="w-full md:w-auto h-full px-8 py-4 bg-black/20 rounded-xl font-medium text-white/80 outline-none border border-transparent focus:border-gold/30 cursor-pointer hover:bg-black/30 transition-colors appearance-none"
                                >
                                    <option value="Beginner" className="bg-black text-white">Beginner</option>
                                    <option value="Intermediate" className="bg-black text-white">Intermediate</option>
                                    <option value="Advanced" className="bg-black text-white">Advanced Pro</option>
                                </select>
                                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-white/30 pointer-events-none" size={16} />
                            </div>

                            <button
                                type="submit"
                                disabled={loading || !topic}
                                className="px-8 py-4 bg-[#F5E6C8] text-black rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-glow hover:scale-105 flex items-center justify-center gap-2 min-w-[160px]"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-black/50 border-t-black rounded-full animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        Generate
                                        <Sparkles size={16} />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Suggestions */}
                    {!tutorial && !loading && (
                        <div className="mt-8 flex flex-wrap justify-center gap-3">
                            <span className="text-xs text-white/40 py-2 uppercase tracking-wider">Try asking for:</span>
                            {suggestedTopics.map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTopic(t)}
                                    className="px-5 py-2 bg-white/5 border border-white/5 rounded-full text-xs font-bold text-white/60 hover:border-gold/30 hover:text-gold hover:bg-white/10 transition-all"
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Error Message */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-red-400 bg-red-500/10 border border-red-500/20 p-4 rounded-xl max-w-lg mx-auto mb-12 flex items-center justify-center gap-2"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        {error}
                    </motion.div>
                )}

                {/* Results Section */}
                <AnimatePresence>
                    {tutorial && (
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 40 }}
                            className="max-w-5xl mx-auto"
                        >
                            {/* Tutorial Header */}
                            <div className="bg-white/5 border border-white/10 border-b-0 rounded-t-[2.5rem] p-8 md:p-12 relative overflow-hidden backdrop-blur-xl group">
                                <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
                                    <Sparkles size={150} className="text-gold" />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex flex-wrap gap-4 mb-6">
                                        <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-white/60 uppercase tracking-widest flex items-center gap-2">
                                            <Clock size={12} /> {tutorial.estimatedTime}
                                        </span>
                                        <span className="px-4 py-1.5 bg-gold/10 text-gold border border-gold/20 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                                            <BarChart size={12} /> {tutorial.difficulty}
                                        </span>
                                    </div>
                                    <h3 className="text-3xl md:text-5xl font-serif italic mb-6 text-white leading-tight">
                                        {tutorial.title}
                                    </h3>
                                    <p className="text-white/60 text-lg max-w-2xl font-light leading-relaxed">
                                        {tutorial.description}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-[#0A0A0A]/50 border border-white/10 rounded-b-[2.5rem] backdrop-blur-md overflow-hidden grid md:grid-cols-12 relative">
                                {/* Steps Column */}
                                <div className="md:col-span-8 p-8 md:p-12 space-y-10 border-r border-white/5">
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-gold border-b border-white/10 pb-4 mb-8">
                                        Step-by-Step Instructions
                                    </h4>

                                    {tutorial.steps.map((step, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex gap-6 relative group"
                                        >
                                            {/* Line connector */}
                                            {index !== tutorial.steps.length - 1 && (
                                                <div className="absolute left-[19px] top-10 bottom-[-40px] w-[1px] bg-white/10 group-hover:bg-gold/30 transition-colors" />
                                            )}

                                            <div className="flex-shrink-0 w-10 h-10 bg-[#0A0A0A] border border-gold/30 text-gold rounded-full flex items-center justify-center font-serif italic text-lg shadow-[0_0_15px_rgba(245,230,200,0.1)] z-10">
                                                {step.step}
                                            </div>
                                            <div>
                                                <h5 className="font-bold text-lg text-white mb-2 flex flex-wrap items-center gap-3">
                                                    {step.title}
                                                    {step.productType && (
                                                        <span className="text-[10px] font-bold text-black bg-gold px-2 py-0.5 rounded uppercase tracking-wide">
                                                            Use: {step.productType}
                                                        </span>
                                                    )}
                                                </h5>
                                                <p className="text-white/60 leading-relaxed font-light">
                                                    {step.instruction}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Sidebar: Products & Tips */}
                                <div className="md:col-span-4 bg-white/5 p-8 backdrop-blur-lg">
                                    {/* Products */}
                                    <div className="mb-12">
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2">
                                            <ShoppingBag size={14} /> Recommended Products
                                        </h4>
                                        <div className="space-y-4">
                                            {tutorial.products.map((prod, i) => (
                                                <div key={i} className="bg-black/40 p-5 rounded-2xl border border-white/5 hover:border-gold/30 transition-colors group cursor-pointer hover:bg-gold/5">
                                                    <div className="text-[10px] text-gold font-bold uppercase mb-2 tracking-wider">{prod.type}</div>
                                                    <div className="font-bold text-white mb-1 group-hover:text-gold transition-colors">{prod.recommendation}</div>
                                                    <div className="text-xs text-white/40 font-light">{prod.reason}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Pro Tips */}
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2">
                                            <Sparkles size={14} /> Pro Tips
                                        </h4>
                                        <ul className="space-y-4">
                                            {tutorial.proTips?.map((tip, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-white/70 font-light leading-relaxed">
                                                    <div className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(245,230,200,0.8)]" />
                                                    {tip}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Video Recommendation Placeholder */}
                                    <div className="mt-10 p-6 bg-gradient-to-br from-gold/10 to-transparent rounded-3xl border border-gold/10 text-center">
                                        <div className="flex items-center justify-center gap-3 mb-3 text-gold">
                                            <PlayCircle size={24} />
                                        </div>
                                        <span className="block font-bold text-xs text-white uppercase tracking-widest mb-2">Watch Similar Look</span>
                                        <p className="text-[10px] text-white/40 mb-4 px-2">
                                            Visualize the techniques with our curated video guide.
                                        </p>
                                        <button className="w-full py-3 bg-white/5 text-gold border border-gold/30 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-gold hover:text-black transition-all">
                                            Find Video
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default MakeupTutorialGenerator;
