import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAction, useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Sparkles, Sun, Moon, Beaker, Check, DollarSign, AlertCircle, Loader2, Database } from 'lucide-react';

const RoutineBuilder = ({ analysisResult }) => {
    const generate = useAction(api.recommendations.generate);
    const products = useQuery(api.products.list);
    const seed = useMutation(api.seed.resetAndSeed);

    const [loading, setLoading] = useState(false);
    const [routine, setRoutine] = useState(null);
    const [step, setStep] = useState(1); // 1: Preferences, 2: Loading, 3: Results

    const [preferences, setPreferences] = useState({
        budget: 'medium',
        allergies: [],
        goals: ['Anti-Aging', 'Hydration']
    });

    const handleSeed = async () => {
        if (!confirm("Reset and seed database with demo products?")) return;
        setLoading(true);
        try {
            await seed();
            alert("Database seeded!");
        } catch (err) {
            console.error(err);
            alert("Failed to seed.");
        } finally {
            setLoading(false);
        }
    };


    const handleGenerate = async () => {
        setLoading(true);
        setStep(2);
        try {
            const result = await generate({
                skinProfile: {
                    skinType: analysisResult.skinType,
                    concerns: analysisResult.concerns,
                    agePrediction: analysisResult.agePrediction,
                    metrics: {
                        hydration: analysisResult.skinHydration,
                        radiance: analysisResult.skinRadiance
                    }
                },
                preferences: {
                    budget: preferences.budget,
                    allergies: preferences.allergies,
                    goals: preferences.goals
                }
            });
            setRoutine(result);
            setStep(3);
        } catch (err) {
            console.error(err);
            // Handle error (maybe toast)
            setStep(1);
        } finally {
            setLoading(false);
        }
    };

    const ProductCard = ({ item }) => (
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4 hover:bg-white/10 transition-colors">
            {item.product.image ? (
                <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded-lg bg-white" />
            ) : (
                <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
                    <Beaker size={24} />
                </div>
            )}
            <div>
                <h4 className="font-bold text-white text-sm">{item.product.name}</h4>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">{item.product.brand}</p>
                <p className="text-xs text-primary/80 italic">"{item.reason}"</p>
                <p className="text-xs font-bold text-white mt-1">${item.product.priceUSD}</p>
            </div>
        </div>
    );

    if (step === 1) {
        return (
            <div className="p-8 bg-[#151515] rounded-3xl border border-white/10">
                <h3 className="text-2xl font-serif italic text-white mb-6">Build Your AI Routine</h3>

                <div className="space-y-6">
                    <div>
                        <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-3">Budget Preference</label>
                        <div className="grid grid-cols-3 gap-4">
                            {['low', 'medium', 'high'].map(b => (
                                <button
                                    key={b}
                                    onClick={() => setPreferences(p => ({ ...p, budget: b }))}
                                    className={`p-3 rounded-xl border transition-all text-sm font-bold capitalize ${preferences.budget === b
                                        ? 'bg-primary text-black border-primary'
                                        : 'bg-white/5 text-white border-white/10 hover:border-white/30'
                                        }`}
                                >
                                    {b} ($)
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-3">Focus Goals</label>
                        <div className="flex flex-wrap gap-2">
                            {['Anti-Aging', 'Acne Control', 'Brightening', 'Hydration', 'Soothing', 'Pore Care'].map(goal => (
                                <button
                                    key={goal}
                                    onClick={() => {
                                        setPreferences(p => ({
                                            ...p,
                                            goals: p.goals.includes(goal)
                                                ? p.goals.filter(g => g !== goal)
                                                : [...p.goals, goal]
                                        }));
                                    }}
                                    className={`px-4 py-2 rounded-full border text-xs font-bold transition-all ${preferences.goals.includes(goal)
                                        ? 'bg-white text-black border-white'
                                        : 'bg-transparent text-white border-white/20'
                                        }`}
                                >
                                    {goal}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Demo Seeder */}
                    {products?.length === 0 && (
                        <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl mb-4">
                            <h4 className="text-yellow-500 font-bold mb-2 flex items-center gap-2">
                                <AlertCircle size={16} /> Demo Data Missing
                            </h4>
                            <p className="text-xs text-gray-400 mb-3">The product database is empty. Please seed it to generate recommendations.</p>
                            <button
                                onClick={handleSeed}
                                className="px-4 py-2 bg-yellow-500 text-black text-xs font-bold rounded-lg flex items-center gap-2 hover:bg-yellow-400"
                            >
                                <Database size={14} /> Initialize Database
                            </button>
                        </div>
                    )}

                    <button
                        onClick={handleGenerate}
                        disabled={loading || products?.length === 0}
                        className="w-full py-4 mt-4 bg-gradient-to-r from-primary to-amber-200 text-black font-black uppercase tracking-widest rounded-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Sparkles size={18} /> Generate My Routine
                    </button>
                </div>
            </div>
        );
    }

    if (step === 2) {
        return (
            <div className="p-16 bg-[#151515] rounded-3xl border border-white/10 text-center">
                <Loader2 size={48} className="animate-spin text-primary mx-auto mb-6" />
                <h3 className="text-xl font-serif text-white mb-2">Analyzing 1,000+ Products...</h3>
                <p className="text-gray-500 text-sm">Our AI is matching ingredients to your skin profile.</p>
            </div>
        );
    }

    return (
        <div className="bg-[#151515] rounded-3xl border border-white/10 overflow-hidden">
            <div className="p-8 border-b border-white/10 bg-gradient-to-r from-primary/10 to-transparent">
                <h3 className="text-2xl font-serif italic text-white flex items-center gap-3">
                    <Sparkles className="text-primary" /> Your Personalized Protocol
                </h3>
            </div>

            <div className="p-8 space-y-8">
                {/* Morning */}
                <section>
                    <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400 mb-4">
                        <Sun size={14} /> Morning Routine
                    </h4>
                    <div className="space-y-3">
                        {routine?.morning?.map((item, i) => (
                            <ProductCard key={i} item={item} />
                        ))}
                    </div>
                </section>

                {/* Evening */}
                <section>
                    <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-4">
                        <Moon size={14} /> Evening Routine
                    </h4>
                    <div className="space-y-3">
                        {routine?.evening?.map((item, i) => (
                            <ProductCard key={i} item={item} />
                        ))}
                    </div>
                </section>

                {/* Treatments */}
                {routine?.treatments?.length > 0 && (
                    <section>
                        <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 mb-4">
                            <Beaker size={14} /> Weekly Treatments
                        </h4>
                        <div className="space-y-3">
                            {routine.treatments.map((item, i) => (
                                <ProductCard key={i} item={item} />
                            ))}
                        </div>
                    </section>
                )}
            </div>

            <div className="p-4 bg-black/20 text-center">
                <button onClick={() => setStep(1)} className="text-xs text-gray-500 hover:text-white transition-colors">
                    Adjust Preferences & Regenerate
                </button>
            </div>
        </div>
    );
};

export default RoutineBuilder;
