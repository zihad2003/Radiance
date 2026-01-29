import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, X, Star, Trophy, Sparkles, TrendingUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useRewards } from '../context/RewardsContext';
import { getFromStorage, saveToStorage } from '../utils/storage';

const prizes = [
    { label: "10% Off", color: "#B76E79" },
    { label: "Free Blowdry", color: "#D4AF37" },
    { label: "500 Points", color: "#FF6B9D" },
    { label: "Free Consultation", color: "#1A1A1D" },
    { label: "Try Again", color: "#9CA3AF" },
    { label: "20% Off", color: "#B76E79" },
];

const SpinWheel = ({ onWin }) => {
    const [spinning, setSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);

    const spin = () => {
        if (spinning) return;
        setSpinning(true);
        const newRotation = rotation + 1800 + Math.random() * 360;
        setRotation(newRotation);

        setTimeout(() => {
            setSpinning(false);
            onWin();
        }, 5000);
    };

    return (
        <div className="relative w-64 h-64 mx-auto mb-8">
            <motion.div
                className="w-full h-full rounded-full border-4 border-gold overflow-hidden shadow-2xl relative"
                animate={{ rotate: rotation }}
                transition={{ duration: 5, ease: "circOut" }}
                style={{ background: 'conic-gradient(from 0deg, #FFF9F5 0deg 60deg, #F4E4D7 60deg 120deg, #FFF9F5 120deg 180deg, #F4E4D7 180deg 240deg, #FFF9F5 240deg 300deg, #F4E4D7 300deg 360deg)' }}
            >
                {prizes.map((prize, i) => (
                    <div
                        key={i}
                        className="absolute top-0 left-1/2 w-1 h-1/2 origin-bottom -translate-x-1/2"
                        style={{ transform: `translateX(-50%) rotate(${i * 60 + 30}deg)` }}
                    >
                        <div className="text-xs font-bold text-charcoal -rotate-90 mt-8 whitespace-nowrap">
                            {prize.label}
                        </div>
                    </div>
                ))}
            </motion.div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2 z-10">
                <div className="w-4 h-8 bg-charcoal clip-triangle" />
            </div>
            <button
                onClick={spin}
                disabled={spinning}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center font-bold text-primary border-4 border-gold disabled:opacity-50 hover:scale-110 transition-transform"
            >
                SPIN
            </button>
        </div>
    );
};

// New Component: Rewards Widget
const RewardsWidget = () => {
    const { points, level, levels, getNextLevel } = useRewards();
    const nextLevel = getNextLevel();
    const [isOpen, setIsOpen] = useState(false);

    // Calculate progress to next level
    const currentMin = levels.find(l => l.name === level).min;
    const nextMin = nextLevel ? nextLevel.min : currentMin;
    const progress = nextLevel ? ((points - currentMin) / (nextMin - currentMin)) * 100 : 100;

    return (
        <div className="fixed top-24 right-4 z-40 transition-all">
            <motion.div
                layout
                onClick={() => setIsOpen(!isOpen)}
                className={`bg-white/90 backdrop-blur-md border border-primary/20 shadow-xl overflow-hidden cursor-pointer ${isOpen ? 'rounded-2xl w-64' : 'rounded-full w-auto'}`}
            >
                <div className="p-3 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-inner`} style={{ backgroundColor: levels.find(l => l.name === level).color }}>
                        {level[0]}
                    </div>
                    {isOpen && (
                        <div className="flex-1">
                            <h4 className="font-bold text-charcoal text-sm">{level} Member</h4>
                            <p className="text-xs text-primary font-bold">{points} pts</p>
                        </div>
                    )}
                    {!isOpen && <span className="text-xs font-bold pr-2">{points}</span>}
                </div>

                {isOpen && nextLevel && (
                    <div className="px-3 pb-3">
                        <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                            <span>Progress to {nextLevel.name}</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-primary"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                            />
                        </div>
                        <p className="text-[10px] text-gray-400 mt-2 text-center">Earn {nextLevel.min - points} more points to upgrade!</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

const SocialProof = () => {
    const [notification, setNotification] = useState(null);
    const messages = [
        "Sarah J. just booked a Facial",
        "3 people are viewing Bridal Packages",
        "Nusrat just won 10% Off",
        "Booking traffic is high today!"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            const msg = messages[Math.floor(Math.random() * messages.length)];
            setNotification(msg);
            setTimeout(() => setNotification(null), 3000); // Show for 3s
        }, 15000); // Every 15s

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {notification && (
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="fixed top-32 left-6 z-40 bg-white/90 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg border border-primary/10 flex items-center space-x-3 pointer-events-none"
                >
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-charcoal">{notification}</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const Gamification = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasWon, setHasWon] = useState(false);
    const { earnPoints } = useRewards();

    useEffect(() => {
        // Daily login bonus simulation
        const lastVisit = getFromStorage('last_visit_date');
        const today = new Date().toDateString();

        if (lastVisit !== today) {
            setTimeout(() => {
                earnPoints(50, 'Daily Login');
                // Could trigger a special toast here
            }, 2000);
            saveToStorage('last_visit_date', today);
        }

        // Auto-open spinner after 30 seconds
        const timer = setTimeout(() => {
            if (!hasWon) setIsOpen(true);
        }, 30000);
        return () => clearTimeout(timer);
    }, [hasWon]);

    const handleWin = () => {
        setHasWon(true);
        earnPoints(500, 'Spin Wheel Win'); // Earn points on win
        confetti({
            particleCount: 200,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#D4AF37', '#B76E79']
        });
    };

    return (
        <>
            <SocialProof />
            <RewardsWidget />

            {/* Floating Trigger */}
            {!isOpen && !hasWon && (
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-10 left-32 z-[100] w-16 h-16 bg-gradient-to-r from-gold to-yellow-600 rounded-full shadow-2xl flex items-center justify-center cursor-pointer interactive"
                >
                    <Gift className="text-white w-8 h-8 animate-bounce-slow" />
                </motion.button>
            )}

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="relative bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl gold-glow"
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 text-charcoal/50 hover:text-charcoal"
                            >
                                <X size={24} />
                            </button>

                            {!hasWon ? (
                                <>
                                    <h3 className="text-2xl font-serif font-bold text-charcoal mb-2">Spin & Win!</h3>
                                    <p className="text-charcoal/60 mb-6">Unlock points and exclusive discounts.</p>
                                    <SpinWheel onWin={handleWin} />
                                </>
                            ) : (
                                <motion.div
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                >
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Trophy className="text-green-600 w-10 h-10" />
                                    </div>
                                    <h3 className="text-2xl font-serif font-bold text-charcoal mb-2">Congratulations!</h3>
                                    <div className="bg-primary/10 p-4 rounded-xl border border-primary/20 mb-6">
                                        <p className="text-primary font-bold text-xl tracking-widest">+500 PTS</p>
                                        <p className="text-xs text-charcoal/60 mt-1">Added to your balance</p>
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="w-full py-3 bg-charcoal text-white rounded-xl font-bold hover:bg-primary transition-colors"
                                    >
                                        Awesome!
                                    </button>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Gamification;
