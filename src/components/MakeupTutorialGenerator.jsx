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
        <section className="py-20 bg-white relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg mb-6"
                    >
                        <span className="text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                            <Sparkles size={14} fill="currentColor" />
                            AI Beauty Coach
                        </span>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-serif italic mb-4">
                        Custom Makeup Tutorials
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Tell us the look you want to achieve, and our AI will create a personalized step-by-step masterclass just for you.
                    </p>
                </div>

                {/* Input Section */}
                <div className="max-w-3xl mx-auto mb-16">
                    <form onSubmit={handleGenerate} className="relative z-10">
                        <div className="bg-white p-2 rounded-3xl shadow-2xl border border-gray-100 flex flex-col md:flex-row gap-2">
                            <div className="flex-1 relative">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    placeholder="e.g., 'Golden Hour Glow' or 'Bridal Smokey Eye'"
                                    className="w-full pl-14 pr-6 py-4 rounded-2xl bg-transparent font-medium outline-none text-gray-800 placeholder:text-gray-400"
                                />
                            </div>

                            <select
                                value={skillLevel}
                                onChange={(e) => setSkillLevel(e.target.value)}
                                className="px-6 py-4 bg-gray-50 rounded-2xl font-medium text-gray-600 outline-none border-r-[16px] border-r-transparent cursor-pointer hover:bg-gray-100 transition-colors"
                            >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced Pro</option>
                            </select>

                            <button
                                type="submit"
                                disabled={loading || !topic}
                                className="px-8 py-4 bg-primary text-white rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2 min-w-[160px]"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                            <span className="text-sm text-gray-500 py-2">Try asking for:</span>
                            {suggestedTopics.map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTopic(t)}
                                    className="px-4 py-2 bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-600 hover:border-primary hover:text-primary transition-all shadow-sm"
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
                        className="text-center text-red-500 bg-red-50 p-4 rounded-xl max-w-lg mx-auto mb-12"
                    >
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
                            <div className="bg-charcoal text-white rounded-t-3xl p-8 md:p-12 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-12 opacity-10">
                                    <Sparkles size={120} />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex flex-wrap gap-4 mb-6">
                                        <span className="px-4 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                            <Clock size={14} /> {tutorial.estimatedTime}
                                        </span>
                                        <span className="px-4 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                            <BarChart size={14} /> {tutorial.difficulty}
                                        </span>
                                    </div>
                                    <h3 className="text-3xl md:text-5xl font-serif italic mb-4">
                                        {tutorial.title}
                                    </h3>
                                    <p className="text-gray-300 text-lg max-w-2xl">
                                        {tutorial.description}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-b-3xl shadow-xl overflow-hidden grid md:grid-cols-12">
                                {/* Steps Column */}
                                <div className="md:col-span-8 p-8 md:p-12 space-y-8">
                                    <h4 className="text-xl font-bold uppercase tracking-widest text-gray-800 border-b border-gray-200 pb-4 mb-6">
                                        Step-by-Step Instructions
                                    </h4>

                                    {tutorial.steps.map((step, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex gap-6 relative"
                                        >
                                            {/* Line connector */}
                                            {index !== tutorial.steps.length - 1 && (
                                                <div className="absolute left-[19px] top-10 bottom-[-32px] w-0.5 bg-gray-200" />
                                            )}

                                            <div className="flex-shrink-0 w-10 h-10 bg-white border-2 border-primary text-primary rounded-full flex items-center justify-center font-bold text-lg shadow-sm z-10">
                                                {step.step}
                                            </div>
                                            <div>
                                                <h5 className="font-bold text-lg text-gray-900 mb-1 flex items-center gap-2">
                                                    {step.title}
                                                    {step.productType && (
                                                        <span className="text-xs font-normal text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                                                            Use: {step.productType}
                                                        </span>
                                                    )}
                                                </h5>
                                                <p className="text-gray-600 leading-relaxed">
                                                    {step.instruction}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Sidebar: Products & Tips */}
                                <div className="md:col-span-4 bg-white p-8 border-l border-gray-100">
                                    {/* Products */}
                                    <div className="mb-10">
                                        <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                                            <ShoppingBag size={16} /> Recommended Products
                                        </h4>
                                        <div className="space-y-4">
                                            {tutorial.products.map((prod, i) => (
                                                <div key={i} className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-primary/30 transition-colors group cursor-pointer">
                                                    <div className="text-xs text-primary font-bold uppercase mb-1">{prod.type}</div>
                                                    <div className="font-bold text-gray-800 mb-1">{prod.recommendation}</div>
                                                    <div className="text-xs text-gray-500">{prod.reason}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Pro Tips */}
                                    <div>
                                        <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                                            <Sparkles size={16} /> Pro Tips
                                        </h4>
                                        <ul className="space-y-4">
                                            {tutorial.proTips?.map((tip, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-gray-600">
                                                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                                                    {tip}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Video Recommendation Placeholder */}
                                    <div className="mt-10 p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-primary/10">
                                        <div className="flex items-center gap-3 mb-2">
                                            <PlayCircle className="text-primary" size={20} />
                                            <span className="font-bold text-sm text-gray-800">Watch Similar Look</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mb-3">
                                            Visualize the techniques with our curated video guide.
                                        </p>
                                        <button className="w-full py-2 bg-white text-primary border border-primary/20 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
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
