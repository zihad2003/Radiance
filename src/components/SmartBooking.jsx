import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, MessageCircle, Calendar, User, Clock, Loader2, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useToast } from '../context/ToastContext';

const SmartBooking = ({ initialService }) => {
    const { info } = useToast();
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I'm Radiance AI. I can help you book an appointment or suggest a look. What can I do for you today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [bookingState, setBookingState] = useState({ name: '', date: '', time: '', service: '' });
    const chatEndRef = useRef(null);

    const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    useEffect(scrollToBottom, [messages, isTyping]);

    // Handle pre-selected service from other components
    useEffect(() => {
        if (initialService) {
            setBookingState(prev => ({ ...prev, service: initialService }));
            setMessages(prev => [...prev, {
                id: Date.now(),
                text: `I see you're interested in ${initialService}. A wonderful choice! When would you like to come in?`,
                sender: 'bot'
            }]);
        }
    }, [initialService]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // User Message
        const newMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, newMsg]);
        setInput('');
        setIsTyping(true);

        // Simulated AI Response Logic (Mocking Claude/NLP)
        setTimeout(() => {
            let botResponse = "I'm not sure about that. Can you specify a service?";
            const lowerInput = input.toLowerCase();

            if (lowerInput.includes('book') || lowerInput.includes('appointment')) {
                botResponse = "Great! I can help with that. What service are you looking for? (e.g., Haircut, Facial, Bridal)";
            } else if (lowerInput.includes('hair') || lowerInput.includes('cut') || lowerInput.includes('color')) {
                setBookingState(prev => ({ ...prev, service: 'Hair Service' }));
                botResponse = "Excellent choice. When would you like to come in? (e.g., Saturday at 2pm)";
            } else if (lowerInput.includes('facial') || lowerInput.includes('skin')) {
                setBookingState(prev => ({ ...prev, service: 'Facial' }));
                botResponse = "A glowing choice! What date and time works for you?";
            } else if (lowerInput.includes('pm') || lowerInput.includes('am') || /\d/.test(lowerInput)) {
                setBookingState(prev => ({ ...prev, time: input }));
                botResponse = "Got it. And finally, what's your name?";
            } else if (!bookingState.name && bookingState.time) {
                setBookingState(prev => ({ ...prev, name: input }));
                botResponse = `Perfect, ${input}! I've drafted your booking for ${bookingState.service} at ${bookingState.time}. Ready to confirm via WhatsApp?`;
            } else if (lowerInput.includes('yes') || lowerInput.includes('confirm')) {
                triggerConfetti();
                botResponse = "CONFIRM_ACTION";
            }

            if (botResponse !== "CONFIRM_ACTION") {
                setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
            } else {
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    text: "Opening WhatsApp to finalize your booking...",
                    sender: 'bot',
                    isAction: true
                }]);

                info("Redirecting to WhatsApp for secure confirmation...");

                // Simulate WhatsApp Redirect
                setTimeout(() => {
                    const text = `Hello Radiance Salon! 👋

I'd like to book an appointment:

📅 Preferred Time: ${bookingState.time || '[Time]'}
✨ Service: ${bookingState.service || 'Consultation'}
👤 Name: ${bookingState.name || 'Valued Client'}

Please confirm availability. Thank you!`;
                    window.open(`https://wa.me/8801700000000?text=${encodeURIComponent(text)}`, '_blank');
                }, 1500);
            }
            setIsTyping(false);
        }, 1500);
    };

    const triggerConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#25D366', '#B76E79'] // WhatsApp Green + Brand Pink
        });
    };

    const toggleVoice = () => {
        setIsListening(!isListening);
        if (!isListening) {
            // Mock voice recognition for demo
            setTimeout(() => {
                setInput("I want to book a facial for Sunday");
                setIsListening(false);
            }, 2000);
        }
    };

    return (
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden min-h-[600px] flex flex-col border border-primary/10 relative">
            {/* Header */}
            <div className="bg-gradient-to-r from-charcoal to-gray-800 p-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                            <MessageCircle className="text-white" size={24} />
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-charcoal"></div>
                    </div>
                    <div>
                        <h3 className="text-white font-serif text-lg tracking-wide">Radiance Assistant</h3>
                        <p className="text-white/60 text-xs flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>Online</p>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <div className="p-2 bg-white/10 rounded-full text-white/80 hover:bg-white/20 transition-colors cursor-pointer" title="Earn Points">
                        <Award size={20} />
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 bg-pearl p-6 overflow-y-auto space-y-6 scrollbar-hide">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`
                            max-w-[80%] p-4 rounded-2xl shadow-sm text-sm leading-relaxed
                            ${msg.sender === 'user'
                                ? 'bg-primary text-white rounded-br-none'
                                : 'bg-white text-charcoal rounded-bl-none border border-primary/5'}
                        `}>
                            {msg.text}
                            {msg.isAction && (
                                <div className="mt-3 p-3 bg-green-50 rounded-xl border border-green-100 flex items-center space-x-3 text-green-700 font-semibold cursor-pointer hover:bg-green-100 transition-colors"
                                    onClick={() => window.open('https://wa.me/8801700000000', '_blank')}>
                                    <MessageCircle size={18} />
                                    <span>Continue on WhatsApp</span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm flex space-x-1 items-center">
                            <div className="w-2 h-2 bg-charcoal/40 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-charcoal/40 rounded-full animate-bounce delay-100"></div>
                            <div className="w-2 h-2 bg-charcoal/40 rounded-full animate-bounce delay-200"></div>
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
                <form onSubmit={handleSend} className="relative flex items-center space-x-2">
                    <button
                        type="button"
                        onClick={toggleVoice}
                        className={`p-3 rounded-full transition-all duration-300 ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 text-charcoal hover:bg-gray-200'}`}
                    >
                        <Mic size={20} />
                    </button>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-gray-50 border-0 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-light"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim()}
                        className="p-3 bg-primary text-white rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md transform active:scale-95"
                    >
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SmartBooking;
