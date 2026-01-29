import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Share2, Save, X, Calendar, ArrowRight, Droplets, Sun, Activity, Scan, Moon } from 'lucide-react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import RoutineBuilder from './RoutineBuilder';

const SkinAnalysisReport = ({ result, onClose }) => {
    const { user } = useAuth();
    const saveResult = useMutation(api.skinAnalysis.saveResult);
    const history = useQuery(api.skinAnalysis.getResults, user ? { userId: user._id } : "skip");
    const toast = useToast();
    const reportRef = useRef(null);

    // Calculate Overall Score if not present (Simple average of inverse concern scores)
    const calculateOverallScore = () => {
        if (result.overallScore) return result.overallScore;
        const concernScores = Object.values(result.concerns).map(c => c.score);
        const avgConcern = concernScores.reduce((a, b) => a + b, 0) / concernScores.length;
        // Invert: Low concern score is high health score
        return Math.round(100 - avgConcern);
    };

    const overallScore = calculateOverallScore();
    const previousResult = history && history.length > 0 ? history[0] : null;

    // --- DEBUG LOGGING for Testing Steps ---
    React.useEffect(() => {
        if (result) {
            console.group("🧪 Skin Analysis Report Debug");
            console.log("Timestamp:", new Date().toLocaleTimeString());
            console.log("Analysis Result Object:", result);
            console.log("Computed Overall Score:", overallScore);
            console.log("Detected Concerns:", result.concerns);
            console.log("Face Regional Map:", result.faceMap);
            console.log("AI Recommended Routine:", result.routine);

            // Log for Performance/Accuracy checks
            if (result.metrics) {
                console.log("Skin Metrics (Hydration/Radiance):", result.metrics);
            }
            console.groupEnd();
        }
    }, [result, overallScore]);

    const handleSave = async () => {
        if (!user) {
            toast.error("Please login to save your results.");
            return;
        }
        try {
            await saveResult({
                userId: user._id,
                sessionId: crypto.randomUUID(),
                overallScore,
                skinType: result.skinType,
                agePrediction: result.agePrediction,
                metrics: {
                    hydration: result.skinHydration,
                    radiance: result.skinRadiance,
                    firmness: { score: 80, level: 'Good' } // Mock if missing
                },
                concerns: result.concerns,
                faceMap: result.faceMap,
                foundationShade: result.foundationShade,
                products: result.routine,
            });
            toast.success("Analysis saved to your profile! 📝");
        } catch (err) {
            console.error(err);
            toast.error("Failed to save result.");
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const Gauge = ({ value, label, color = "text-primary" }) => (
        <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                    className="text-white/10"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                />
                <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: value / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={color}
                    strokeDasharray="100, 100"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                />
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className={`text-2xl font-serif font-black ${color}`}>{value}</span>
                <span className="text-[8px] uppercase tracking-widest text-gray-500">{label}</span>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl overflow-y-auto custom-scrollbar p-4 md:p-8">
            <div ref={reportRef} className="max-w-5xl mx-auto bg-[#0F0F0F] rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden print:bg-white print:text-black print:border-none print:shadow-none print:rounded-none">

                {/* Print/Download Actions */}
                <div className="absolute top-8 right-8 flex gap-4 print:hidden z-10">
                    <button onClick={handleSave} className="p-3 bg-white/5 rounded-full hover:bg-primary hover:text-white transition-all border border-white/10" title="Save to Profile">
                        <Save size={20} />
                    </button>
                    <button onClick={handlePrint} className="p-3 bg-white/5 rounded-full hover:bg-primary hover:text-white transition-all border border-white/10" title="Download PDF">
                        <Download size={20} />
                    </button>
                    <button onClick={onClose} className="p-3 bg-white/5 rounded-full hover:bg-red-500 hover:text-white transition-all border border-white/10" title="Close">
                        <X size={20} />
                    </button>
                </div>

                {/* Header */}
                <div className="p-12 md:p-16 border-b border-white/10 bg-gradient-to-r from-primary/5 to-transparent print:bg-white relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-2 bg-primary/20 rounded-lg text-primary print:text-black print:bg-gray-200">
                                <Scan size={24} />
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.3em] text-primary print:text-black">Clinical Report</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-serif italic mb-4 text-white print:text-black">Skin Health Analysis</h1>
                        <p className="text-gray-400 max-w-xl font-medium print:text-gray-600">
                            Comprehensive dermatological assessment powered by Radiance AI.
                            Generated on {new Date().toLocaleDateString()}.
                        </p>
                    </div>
                    {/* Decorative */}
                    <div className="absolute right-0 top-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] print:hidden" />
                </div>

                <div className="grid md:grid-cols-12 gap-0">
                    {/* Left details */}
                    <div className="md:col-span-8 p-12 md:p-16 border-r border-white/10 print:border-none print:col-span-12">

                        {/* Overall Score Section */}
                        <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
                            <Gauge value={overallScore} label="Overall Score" color={overallScore > 80 ? "text-emerald-400" : overallScore > 50 ? "text-yellow-400" : "text-red-400"} />
                            <div className="flex-1 space-y-4">
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Skin Type</p>
                                        <p className="text-2xl font-serif text-white print:text-black">{result.skinType}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Skin Age</p>
                                        <p className="text-2xl font-serif text-white print:text-black">{result.agePrediction} <span className="text-sm text-gray-500">Years</span></p>
                                    </div>
                                </div>
                                <div className="h-px bg-white/10 print:bg-gray-200" />
                                <div className="flex gap-8">
                                    <div>
                                        <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest mb-1 print:text-blue-600">Hydration</p>
                                        <p className="text-lg font-bold text-white print:text-black">{result.skinHydration?.score}/100</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-yellow-400 font-black uppercase tracking-widest mb-1 print:text-yellow-600">Radiance</p>
                                        <p className="text-lg font-bold text-white print:text-black">{result.skinRadiance?.score}/100</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Concerns Comparison */}
                        <div className="mb-16">
                            <h3 className="text-xl font-serif italic mb-8 text-white print:text-black">Concern Analysis</h3>
                            <div className="space-y-6">
                                {Object.entries(result.concerns).map(([key, data]) => (
                                    <div key={key} className="relative">
                                        <div className="flex justify-between mb-2">
                                            <span className="capitalize font-bold text-sm text-white print:text-black">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                            <div className="flex gap-4 text-xs">
                                                <span className="text-gray-400 print:text-gray-600">{data.score}% Severity</span>
                                                {previousResult && previousResult.concerns[key] && (
                                                    <span className={`${data.score < previousResult.concerns[key].score ? 'text-emerald-400' : 'text-red-400'} font-bold`}>
                                                        {data.score < previousResult.concerns[key].score ? '▼' : '▲'} {Math.abs(data.score - previousResult.concerns[key].score)}%
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden print:bg-gray-200">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${data.score}%` }}
                                                className={`h-full rounded-full ${data.score < 30 ? 'bg-emerald-500' : data.score < 60 ? 'bg-yellow-500' : 'bg-red-500'
                                                    }`}
                                            />
                                        </div>
                                        <p className="mt-2 text-[10px] text-gray-500 leading-relaxed font-medium print:text-gray-600">{data.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Face Map */}
                        <div className="mb-8">
                            <h3 className="text-xl font-serif italic mb-8 text-white print:text-black">Regional Breakdown</h3>
                            <div className="grid grid-cols-2 gap-6">
                                {result.faceMap && Object.entries(result.faceMap).map(([area, issues]) => (
                                    <div key={area} className="bg-white/5 p-4 rounded-2xl border border-white/5 print:border-gray-200 print:bg-white">
                                        <span className="uppercase text-primary font-black tracking-widest text-[9px] block mb-2 print:text-black">{area}</span>
                                        <div className="flex flex-wrap gap-2">
                                            {issues.map((issue, idx) => (
                                                <span key={idx} className="bg-black/30 text-white/80 px-2 py-1 rounded-md text-[10px] font-bold border border-white/10 print:bg-gray-100 print:text-black print:border-gray-200">
                                                    {issue}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Right Recommendations */}
                    <div className="md:col-span-4 p-12 bg-[#151515] print:bg-gray-50 print:col-span-12">
                        <div className="sticky top-12">
                            <h3 className="text-xl font-serif italic mb-8 text-white print:text-black">Action Plan</h3>

                            {/* Routine */}
                            <div className="mb-12">
                                <RoutineBuilder analysisResult={result} />
                            </div>

                            {/* Service */}
                            <div className="bg-white/5 rounded-3xl p-8 border border-white/5 print:bg-white print:border-gray-200 text-center">
                                <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-4">Recommended Treatment</p>
                                <h4 className="text-2xl font-serif text-white italic mb-6 print:text-black">{result.recommendedService}</h4>
                                <a href={result.bookingLink} className="inline-flex items-center gap-2 bg-primary text-black px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white transition-all print:hidden">
                                    Book Now <ArrowRight size={14} />
                                </a>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SkinAnalysisReport;
