import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const LoadingOverlay = ({ isVisible, message = "Processing securely..." }) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-md flex items-center justify-center p-6"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        className="bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-6 max-w-xs w-full"
                    >
                        <div className="relative">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="text-primary animate-pulse" size={24} />
                            </div>
                        </div>
                        <div className="text-center space-y-2">
                            <h3 className="font-outfit font-black uppercase tracking-widest text-[10px] text-charcoal">{message}</h3>
                            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Radiance Secure Protocol</p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingOverlay;
