import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone } from 'lucide-react';
import { getFromStorage, saveToStorage } from '../utils/storage';

/**
 * PWA Install Prompt Component
 * Shows install prompt for Progressive Web App
 */
const PWAInstallPrompt = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showPrompt, setShowPrompt] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        // Check if already installed
        if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
            setIsInstalled(true);
            return;
        }

        // Check if user previously dismissed
        const dismissed = getFromStorage('pwa-install-dismissed');
        const dismissedTime = dismissed ? parseInt(dismissed, 10) : 0;
        const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);

        // Show again after 7 days
        if (dismissed && daysSinceDismissed < 7) {
            return;
        }

        // Listen for install prompt
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);

            // Show prompt after 30 seconds of usage
            setTimeout(() => {
                setShowPrompt(true);
            }, 30000);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        // Listen for successful install
        window.addEventListener('appinstalled', () => {
            setIsInstalled(true);
            setShowPrompt(false);
            setDeferredPrompt(null);
        });

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        // Show install prompt
        deferredPrompt.prompt();

        // Wait for user choice
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }

        setDeferredPrompt(null);
        setShowPrompt(false);
    };

    const handleDismiss = () => {
        setShowPrompt(false);
        saveToStorage('pwa-install-dismissed', Date.now().toString());
    };

    if (isInstalled || !showPrompt) {
        return null;
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-[9999]"
            >
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                    {/* Header with gradient */}
                    <div className="bg-gradient-to-r from-primary to-pink-400 p-4 text-white">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                    <Smartphone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Install Radiance</h3>
                                    <p className="text-xs text-white/90">Add to Home Screen</p>
                                </div>
                            </div>
                            <button
                                onClick={handleDismiss}
                                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                aria-label="Dismiss"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                        <p className="text-gray-600 text-sm mb-4">
                            Get instant access to virtual makeup try-on, hairstyling, and booking - even offline!
                        </p>

                        <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                <span>Works offline</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                <span>Faster loading</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                <span>Home screen access</span>
                            </div>
                        </div>

                        <button
                            onClick={handleInstall}
                            className="w-full bg-primary text-white py-3 px-6 rounded-xl font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-lg"
                        >
                            <Download size={18} />
                            Install App
                        </button>

                        <button
                            onClick={handleDismiss}
                            className="w-full mt-2 text-gray-500 py-2 text-sm hover:text-gray-700 transition-colors"
                        >
                            Maybe Later
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default PWAInstallPrompt;
