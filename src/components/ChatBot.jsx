import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MessageSquare, X, Send, Sparkles, User,
    Calendar, ShoppingBag, Info, Camera, ChevronRight
} from 'lucide-react';
import { useAction } from 'convex/react';
import { api } from '../../convex/_generated/api';

const RESPONSES = {
    greeting: "Hello! I am Aura, your Radiance Beauty Concierge. How may I assist your transformation today? ✨"
};

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, type: 'bot', text: RESPONSES.greeting, time: new Date() }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const sendMessage = useAction(api.chat.sendMessage);

    const handleSend = async (text = inputValue) => {
        if (!text.trim()) return;

        const userMessage = {
            id: Date.now(),
            type: 'user',
            text: text,
            time: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        try {
            const responseText = await sendMessage({ message: text });

            const botMessage = {
                id: Date.now() + 1,
                type: 'bot',
                text: responseText || "I'm having a little trouble thinking of a response. Could you try asking that again?",
                time: new Date()
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Chat Error:", error);
            const errorMessage = {
                id: Date.now() + 1,
                type: 'bot',
                text: "I'm currently experiencing some technical difficulties. Please try again later or contact us directly! 🌸",
                time: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const quickActions = [
        { label: "AI Try-On", icon: Camera, action: "Tell me about AI Try-On" },
        { label: "Book Now", icon: Calendar, action: "How do I book?" },
        { label: "Shop Boutique", icon: ShoppingBag, action: "I want to shop products" },
    ];

    return (
        <>
            {/* Trigger Button */}
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-10 left-10 z-[100] w-16 h-16 bg-primary text-white rounded-full shadow-glow flex items-center justify-center group pointer-events-auto"
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-primary rounded-full -z-10"
                />
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9, x: -20 }}
                        animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9, x: -20 }}
                        className="fixed bottom-32 left-10 z-[100] w-[380px] h-[550px] bg-white rounded-[2.5rem] shadow-4xl flex flex-col overflow-hidden border border-gray-100"
                    >
                        {/* Header */}
                        <div className="bg-charcoal p-6 text-white relative">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/30">
                                        <Sparkles className="text-primary" size={24} />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-charcoal rounded-full" />
                                </div>
                                <div>
                                    <h3 className="font-serif italic text-xl">Aura</h3>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-primary">Radiance Beauty Expert</p>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                                <Sparkles size={80} />
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50 custom-scrollbar"
                        >
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[80%] p-4 rounded-3xl text-sm ${msg.type === 'user'
                                        ? 'bg-charcoal text-white rounded-tr-none shadow-lg'
                                        : 'bg-white text-charcoal rounded-tl-none border border-gray-100 shadow-sm'
                                        }`}>
                                        <p className="leading-relaxed">{msg.text}</p>
                                        <span className={`text-[8px] mt-2 block opacity-40 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                                            {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white p-4 rounded-3xl rounded-tl-none border border-gray-100 shadow-sm flex gap-1">
                                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.6, repeat: Infinity }} className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Quick Actions */}
                        <div className="px-6 py-4 flex gap-2 overflow-x-auto hide-scrollbar bg-white shadow-inner">
                            {quickActions.map((action, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSend(action.action)}
                                    className="px-4 py-2 bg-gray-50 hover:bg-primary/5 hover:text-primary rounded-full text-[9px] font-black uppercase tracking-widest border border-gray-100 transition-all whitespace-nowrap flex items-center gap-2"
                                >
                                    <action.icon size={12} />
                                    {action.label}
                                </button>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-6 bg-white border-t border-gray-100 flex gap-3 items-center">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Whisper your beauty dreams..."
                                className="flex-1 bg-gray-50 px-6 py-4 rounded-2xl text-xs font-bold outline-none focus:bg-white focus:border-primary transition-all shadow-inner"
                            />
                            <button
                                onClick={() => handleSend()}
                                className="w-12 h-12 bg-charcoal text-white rounded-2xl flex items-center justify-center hover:bg-primary transition-all shadow-xl"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatBot;
