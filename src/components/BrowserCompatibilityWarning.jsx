import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, ExternalLink, RefreshCw } from 'lucide-react';
import { checkBrowserSupport } from '../utils/browserCompat';

/**
 * BrowserCompatibilityWarning Component
 * Shows warnings for unsupported browsers or missing features
 */
const BrowserCompatibilityWarning = () => {
    const [support, setSupport] = useState(null);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        const supportInfo = checkBrowserSupport();
        setSupport(supportInfo);

        // Check if user previously dismissed warning
        const dismissedKey = `browser-warning-dismissed-${supportInfo.browser.name}-${supportInfo.browser.version}`;
        const wasDismissed = sessionStorage.getItem(dismissedKey);
        if (wasDismissed) {
            setDismissed(true);
        }
    }, []);

    const handleDismiss = () => {
        setDismissed(true);
        if (support) {
            const dismissedKey = `browser-warning-dismissed-${support.browser.name}-${support.browser.version}`;
            sessionStorage.setItem(dismissedKey, 'true');
        }
    };

    const handleUpdate = () => {
        const updateUrls = {
            'Chrome': 'https://www.google.com/chrome/',
            'Firefox': 'https://www.mozilla.org/firefox/',
            'Safari': 'https://support.apple.com/downloads/safari',
            'Edge (Chromium)': 'https://www.microsoft.com/edge',
        };

        const url = updateUrls[support?.browser.name] || 'https://browsehappy.com/';
        window.open(url, '_blank');
    };

    if (!support || dismissed || support.supportLevel === 'full') {
        return null;
    }

    // Critical features missing - show blocking warning
    if (support.supportLevel === 'none') {
        return (
            <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center"
                >
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle className="w-8 h-8 text-red-600" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Browser Not Supported
                    </h2>

                    <p className="text-gray-600 mb-4">
                        Your browser <strong>{support.browser.name} {support.browser.versionString}</strong> doesn't support features required for this application.
                    </p>

                    <div className="bg-red-50 rounded-lg p-4 mb-6 text-left">
                        <p className="text-sm font-semibold text-red-900 mb-2">Missing Features:</p>
                        <ul className="text-sm text-red-700 space-y-1">
                            {support.missingFeatures.map((feature) => (
                                <li key={feature} className="flex items-center">
                                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={handleUpdate}
                            className="w-full bg-primary text-white py-3 px-6 rounded-xl font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                        >
                            <RefreshCw size={18} />
                            Update Browser
                        </button>

                        <p className="text-xs text-gray-500">
                            We recommend using the latest version of Chrome, Firefox, Safari, or Edge.
                        </p>
                    </div>
                </motion.div>
            </div>
        );
    }

    // Partial support - show dismissible warning
    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                className="fixed top-0 left-0 right-0 z-[9998] bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg"
            >
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 flex-1">
                            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                            <div className="flex-1">
                                <p className="font-semibold text-sm">
                                    Limited Browser Support Detected
                                </p>
                                <p className="text-xs opacity-90">
                                    {support.warnings.length > 0
                                        ? support.warnings[0]
                                        : `Some features may not work properly in ${support.browser.name} ${support.browser.versionString}`
                                    }
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleUpdate}
                                className="hidden sm:flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                                <ExternalLink size={14} />
                                Update
                            </button>
                            <button
                                onClick={handleDismiss}
                                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                aria-label="Dismiss warning"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default BrowserCompatibilityWarning;
