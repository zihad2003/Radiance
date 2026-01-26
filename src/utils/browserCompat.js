/**
 * Browser Compatibility Utilities
 * Feature detection and polyfill helpers
 */

/**
 * Detect browser and version
 * @returns {Object} Browser information
 */
export const detectBrowser = () => {
    const ua = navigator.userAgent;
    let browserName = 'Unknown';
    let browserVersion = 'Unknown';
    let isMobile = false;

    // Detect browser
    if (ua.indexOf('Firefox') > -1) {
        browserName = 'Firefox';
        browserVersion = ua.match(/Firefox\/(\d+)/)?.[1] || 'Unknown';
    } else if (ua.indexOf('SamsungBrowser') > -1) {
        browserName = 'Samsung Internet';
        browserVersion = ua.match(/SamsungBrowser\/(\d+)/)?.[1] || 'Unknown';
    } else if (ua.indexOf('Opera') > -1 || ua.indexOf('OPR') > -1) {
        browserName = 'Opera';
        browserVersion = ua.match(/(?:Opera|OPR)\/(\d+)/)?.[1] || 'Unknown';
    } else if (ua.indexOf('Trident') > -1) {
        browserName = 'Internet Explorer';
        browserVersion = ua.match(/rv:(\d+)/)?.[1] || 'Unknown';
    } else if (ua.indexOf('Edge') > -1) {
        browserName = 'Edge (Legacy)';
        browserVersion = ua.match(/Edge\/(\d+)/)?.[1] || 'Unknown';
    } else if (ua.indexOf('Edg') > -1) {
        browserName = 'Edge (Chromium)';
        browserVersion = ua.match(/Edg\/(\d+)/)?.[1] || 'Unknown';
    } else if (ua.indexOf('Chrome') > -1) {
        browserName = 'Chrome';
        browserVersion = ua.match(/Chrome\/(\d+)/)?.[1] || 'Unknown';
    } else if (ua.indexOf('Safari') > -1) {
        browserName = 'Safari';
        browserVersion = ua.match(/Version\/(\d+)/)?.[1] || 'Unknown';
    }

    // Detect mobile
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

    return {
        name: browserName,
        version: parseInt(browserVersion, 10),
        versionString: browserVersion,
        isMobile,
        isIOS: /iPad|iPhone|iPod/.test(ua),
        isAndroid: /Android/.test(ua),
        userAgent: ua,
    };
};

/**
 * Check if browser is supported
 * @returns {Object} Support status and missing features
 */
export const checkBrowserSupport = () => {
    const browser = detectBrowser();
    const missingFeatures = [];
    const warnings = [];

    // Minimum browser versions
    const minimumVersions = {
        'Chrome': 90,
        'Firefox': 88,
        'Safari': 14,
        'Edge (Chromium)': 90,
        'Samsung Internet': 14,
    };

    // Check version
    const minVersion = minimumVersions[browser.name];
    if (minVersion && browser.version < minVersion) {
        warnings.push(`Your ${browser.name} version (${browser.version}) is outdated. Please update to version ${minVersion} or higher.`);
    }

    // Feature detection
    const features = {
        'WebRTC': () => !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
        'Intersection Observer': () => 'IntersectionObserver' in window,
        'WebGL': () => {
            try {
                const canvas = document.createElement('canvas');
                return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
            } catch (e) {
                return false;
            }
        },
        'IndexedDB': () => 'indexedDB' in window,
        'Service Worker': () => 'serviceWorker' in navigator,
        'WebP': () => {
            const canvas = document.createElement('canvas');
            if (canvas.getContext && canvas.getContext('2d')) {
                return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
            }
            return false;
        },
        'Local Storage': () => {
            try {
                localStorage.setItem('test', 'test');
                localStorage.removeItem('test');
                return true;
            } catch (e) {
                return false;
            }
        },
        'Fetch API': () => 'fetch' in window,
        'Promise': () => 'Promise' in window,
        'ES6 Classes': () => {
            try {
                eval('class Test {}');
                return true;
            } catch (e) {
                return false;
            }
        },
    };

    // Check each feature
    Object.entries(features).forEach(([name, check]) => {
        if (!check()) {
            missingFeatures.push(name);
        }
    });

    // Determine support level
    let supportLevel = 'full';
    if (missingFeatures.length > 0) {
        supportLevel = missingFeatures.includes('WebRTC') ? 'none' : 'partial';
    }

    return {
        browser,
        supportLevel,
        missingFeatures,
        warnings,
        isSupported: supportLevel !== 'none',
    };
};

/**
 * Get getUserMedia with Safari compatibility
 * @param {Object} constraints - Media constraints
 * @returns {Promise<MediaStream>}
 */
export const getCompatibleUserMedia = async (constraints) => {
    const browser = detectBrowser();

    // Safari-specific fixes
    if (browser.name === 'Safari') {
        // Safari requires exact constraints format
        if (constraints.video && typeof constraints.video === 'object') {
            // Remove 'ideal' constraints for Safari, use 'max' instead
            const videoConstraints = { ...constraints.video };

            if (videoConstraints.width?.ideal) {
                videoConstraints.width = { max: videoConstraints.width.ideal };
            }
            if (videoConstraints.height?.ideal) {
                videoConstraints.height = { max: videoConstraints.height.ideal };
            }
            if (videoConstraints.frameRate?.ideal) {
                videoConstraints.frameRate = { max: videoConstraints.frameRate.ideal };
            }

            constraints = { ...constraints, video: videoConstraints };
        }
    }

    // Try modern API first
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        return navigator.mediaDevices.getUserMedia(constraints);
    }

    // Fallback for older browsers
    const getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

    if (!getUserMedia) {
        throw new Error('getUserMedia is not supported in this browser');
    }

    // Promisify old API
    return new Promise((resolve, reject) => {
        getUserMedia.call(navigator, constraints, resolve, reject);
    });
};

/**
 * Check if feature is supported with polyfill option
 * @param {string} feature - Feature name
 * @returns {boolean}
 */
export const isFeatureSupported = (feature) => {
    const checks = {
        intersectionObserver: () => 'IntersectionObserver' in window,
        webgl: () => {
            try {
                const canvas = document.createElement('canvas');
                return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
            } catch (e) {
                return false;
            }
        },
        webrtc: () => !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
        indexeddb: () => 'indexedDB' in window,
        serviceworker: () => 'serviceWorker' in navigator,
        webp: () => {
            const canvas = document.createElement('canvas');
            if (canvas.getContext && canvas.getContext('2d')) {
                return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
            }
            return false;
        },
    };

    const check = checks[feature.toLowerCase().replace(/\s/g, '')];
    return check ? check() : false;
};

/**
 * Load polyfill dynamically if needed
 * @param {string} feature - Feature to polyfill
 * @returns {Promise<void>}
 */
export const loadPolyfill = async (feature) => {
    const polyfills = {
        intersectionObserver: () => import('intersection-observer'),
        // Add more polyfills as needed
    };

    const loader = polyfills[feature.toLowerCase().replace(/\s/g, '')];
    if (loader && !isFeatureSupported(feature)) {
        try {
            await loader();
            console.log(`Polyfill loaded for: ${feature}`);
        } catch (error) {
            console.error(`Failed to load polyfill for ${feature}:`, error);
        }
    }
};

/**
 * Get safe animation frame function
 * @returns {Function}
 */
export const getRequestAnimationFrame = () => {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        ((callback) => window.setTimeout(callback, 1000 / 60));
};

/**
 * Get safe cancel animation frame function
 * @returns {Function}
 */
export const getCancelAnimationFrame = () => {
    return window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.oCancelAnimationFrame ||
        window.msCancelAnimationFrame ||
        clearTimeout;
};

/**
 * Check if running in standalone mode (PWA)
 * @returns {boolean}
 */
export const isStandalone = () => {
    return window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true;
};

/**
 * Get viewport dimensions (cross-browser)
 * @returns {Object} { width, height }
 */
export const getViewportSize = () => {
    return {
        width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
        height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
    };
};

/**
 * Check if device has touch support
 * @returns {boolean}
 */
export const hasTouchSupport = () => {
    return 'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0;
};

/**
 * Safe localStorage wrapper
 */
export const safeStorage = {
    getItem: (key) => {
        try {
            return localStorage.getItem(key);
        } catch (e) {
            console.warn('localStorage not available:', e);
            return null;
        }
    },
    setItem: (key, value) => {
        try {
            localStorage.setItem(key, value);
            return true;
        } catch (e) {
            console.warn('localStorage not available:', e);
            return false;
        }
    },
    removeItem: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.warn('localStorage not available:', e);
            return false;
        }
    },
};
