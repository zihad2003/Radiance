import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, X, Sparkles, Loader2, MessageCircle } from 'lucide-react';
import { useAction } from 'convex/react';
import { api } from '../../../convex/_generated/api';

const SkincareAiChat = ({ analysisResult }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: `Hi! I've analyzed your skin. I see you have some concerns about ${analysisResult?.concerns ? Object.keys(analysisResult.concerns).slice(0, 2).join(' and ') : 'your skin health'}. How can I help you today?` }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const sendMessage = useAction(api.aiChat.sendMessage);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMsg = { role: 'user', content: input };

        // --- DEBUG LOGGING ---
        console.group("🤖 AI Chat Interaction");
        console.log("Timestamp:", new Date().toLocaleTimeString());
        console.log("User Message:", input);

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            // Prepare context
            const skinContext = analysisResult ? {
                skinType: analysisResult.skinType,
                concerns: analysisResult.concerns,
                age: analysisResult.agePrediction,
                metrics: {
                    hydration: analysisResult.skinHydration
                }
            } : undefined;

            console.log("AI Context (Skin Profile):", skinContext);

            // Format history for API
            const history = messages.map(m => ({
                role: m.role,
                content: m.content
            }));

            const response = await sendMessage({
                message: userMsg.content,
                history: history,
                skinContext
            });

            console.log("AI Response Content:", response);
            console.groupEnd();

            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        } catch (err) {
            console.error("❌ Chat Error:", err);
            console.groupEnd();
            setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting right now. Please try again." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Floating Toggle */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 p-4 bg-primary text-black rounded-full shadow-2xl hover:scale-110 transition-transform border-4 border-black/20"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] z-50 bg-[#151515] rounded-3xl border border-white/10 shadow-2xl flex flex-col overflow-hidden font-sans"
                    >
                        {/* Header */}
                        <div className="p-4 bg-gradient-to-r from-primary/20 to-transparent border-b border-white/10 flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center border border-black/10">
                                <Bot size={20} className="text-black" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm">Radiance AI Expert</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">Online</span>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-black/20">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-white/10' : 'bg-primary/20'
                                        }`}>
                                        {msg.role === 'user' ? <User size={14} className="text-white" /> : <Sparkles size={14} className="text-primary" />}
                                    </div>
                                    <div className={`p-3 rounded-2xl text-xs leading-relaxed max-w-[80%] ${msg.role === 'user'
                                        ? 'bg-white text-black rounded-tr-sm'
                                        : 'bg-white/5 text-gray-200 border border-white/5 rounded-tl-sm'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                                        <Sparkles size={14} className="text-primary" />
                                    </div>
                                    <div className="bg-white/5 p-3 rounded-2xl rounded-tl-sm border border-white/5 flex gap-1 items-center">
                                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-white/10 bg-[#151515]">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask about your routine..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={loading || !input.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-black rounded-lg hover:bg-white transition-colors disabled:opacity-50"
                                >
                                    {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default SkincareAiChat;
