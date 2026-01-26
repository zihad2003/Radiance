import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Wifi } from 'lucide-react';

/**
 * Offline Indicator Component
 * Shows connection status and offline mode
 */
const OfflineIndicator = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [showNotification, setShowNotification] = useState(false);
    const [justWentOffline, setJustWentOffline] = useState(false);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            setShowNotification(true);
            setJustWentOffline(false);

            // Hide notification after 3 seconds
            setTimeout(() => setShowNotification(false), 3000);
        };

        const handleOffline = () => {
            setIsOnline(false);
            setShowNotification(true);
            setJustWentOffline(true);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // Don't show anything if online and not just reconnected
    if (isOnline && !showNotification) {
        return null;
    }

    return (
        <AnimatePresence>
            {(showNotification || !isOnline) && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    className={`fixed top-20 left-1/2 -translate-x-1/2 z-[9997] ${isOnline ? 'w-auto' : 'left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-auto'
                        }`}
                >
                    <div
                        className={`rounded-full px-6 py-3 shadow-lg backdrop-blur-md flex items-center gap-3 ${isOnline
                                ? 'bg-green-500/90 text-white'
                                : 'bg-yellow-500/90 text-white'
                            }`}
                    >
                        {isOnline ? (
                            <>
                                <Wifi size={18} />
                                <span className="font-medium text-sm">Back Online</span>
                            </>
                        ) : (
                            <>
                                <WifiOff size={18} />
                                <div className="flex-1">
                                    <span className="font-medium text-sm block">You're Offline</span>
                                    <span className="text-xs opacity-90">Browsing cached content</span>
                                </div>
                            </>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default OfflineIndicator;
