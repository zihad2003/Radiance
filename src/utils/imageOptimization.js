/**
 * Image Optimization Utilities
 * Helper functions for responsive images, CDN URLs, and image transformations
 */

/**
 * Generate responsive image srcSet
 * @param {string} baseUrl - Base image URL
 * @param {number[]} widths - Array of widths to generate
 * @returns {string} srcSet string
 */
export const generateSrcSet = (baseUrl, widths = [320, 640, 768, 1024, 1280, 1920]) => {
    if (!baseUrl) return '';

    const ext = baseUrl.split('.').pop()?.toLowerCase();
    const basePath = baseUrl.replace(/\.(jpg|jpeg|png|webp)$/i, '');

    return widths
        .map(width => `${basePath}-${width}w.${ext} ${width}w`)
        .join(', ');
};

/**
 * Generate sizes attribute for responsive images
 * @param {Object} breakpoints - Object with breakpoint: size pairs
 * @returns {string} sizes string
 */
export const generateSizes = (breakpoints = {}) => {
    const defaultBreakpoints = {
        '(max-width: 640px)': '100vw',
        '(max-width: 768px)': '90vw',
        '(max-width: 1024px)': '80vw',
        '(max-width: 1280px)': '70vw',
        ...breakpoints
    };

    const entries = Object.entries(defaultBreakpoints);
    const mediaQueries = entries.slice(0, -1).map(([query, size]) => `${query} ${size}`);
    const defaultSize = entries[entries.length - 1][1];

    return [...mediaQueries, defaultSize].join(', ');
};

/**
 * Get optimized Unsplash URL with transformations
 * @param {string} imageId - Unsplash image ID or full URL
 * @param {Object} options - Transformation options
 * @returns {string} Optimized URL
 */
export const getOptimizedUnsplashUrl = (imageId, options = {}) => {
    const {
        width = 1200,
        height,
        quality = 75,
        format = 'auto',
        fit = 'crop',
        crop = 'faces,edges',
    } = options;

    // If full URL provided, extract ID
    let id = imageId;
    if (imageId.includes('unsplash.com')) {
        const match = imageId.match(/photo-([^?]+)/);
        id = match ? match[1] : imageId.split('/').pop().split('?')[0];
    }

    const params = new URLSearchParams({
        w: width,
        q: quality,
        fm: format,
        fit: fit,
        crop: crop,
    });

    if (height) params.append('h', height);

    return `https://images.unsplash.com/${id}?${params.toString()}`;
};

/**
 * Preload critical images
 * @param {string[]} urls - Array of image URLs to preload
 */
export const preloadImages = (urls) => {
    urls.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = url;
        document.head.appendChild(link);
    });
};

/**
 * Convert image URL to WebP format
 * @param {string} url - Original image URL
 * @returns {string} WebP URL
 */
export const toWebP = (url) => {
    if (!url) return '';
    return url.replace(/\.(jpg|jpeg|png)$/i, '.webp');
};

/**
 * Get image dimensions from URL (if encoded in filename)
 * @param {string} url - Image URL
 * @returns {Object} { width, height }
 */
export const getImageDimensions = (url) => {
    const match = url.match(/(\d+)x(\d+)/);
    if (match) {
        return {
            width: parseInt(match[1], 10),
            height: parseInt(match[2], 10),
        };
    }
    return { width: null, height: null };
};

/**
 * Calculate aspect ratio
 * @param {number} width 
 * @param {number} height 
 * @returns {number} Aspect ratio
 */
export const getAspectRatio = (width, height) => {
    return width / height;
};

/**
 * Generate blur data URL for placeholder
 * @param {number} width 
 * @param {number} height 
 * @param {string} color - Hex color
 * @returns {string} Data URL
 */
export const generateBlurDataURL = (width = 10, height = 10, color = '#f3f4f6') => {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='1'/%3E%3C/filter%3E%3Crect filter='url(%23b)' fill='${color}' width='${width}' height='${height}'/%3E%3C/svg%3E`;
};

/**
 * CDN URL builder (for future CDN integration)
 * @param {string} path - Image path
 * @param {Object} options - Transformation options
 * @returns {string} CDN URL
 */
export const getCDNUrl = (path, options = {}) => {
    // Placeholder for CDN integration (Cloudinary, Imgix, etc.)
    // For now, return original path
    const CDN_BASE = process.env.VITE_CDN_URL || '';

    if (!CDN_BASE) return path;

    const { width, quality = 75, format = 'auto' } = options;
    const params = new URLSearchParams();

    if (width) params.append('w', width);
    params.append('q', quality);
    params.append('f', format);

    return `${CDN_BASE}${path}?${params.toString()}`;
};

/**
 * Image loading priority helper
 * @param {boolean} isAboveFold - Is image above the fold?
 * @returns {Object} Loading attributes
 */
export const getLoadingProps = (isAboveFold = false) => {
    return {
        loading: isAboveFold ? 'eager' : 'lazy',
        fetchPriority: isAboveFold ? 'high' : 'auto',
        decoding: isAboveFold ? 'sync' : 'async',
    };
};

import EXIF from 'exif-js';

/**
 * Reads EXIF orientation and returns a new Image/Canvas with corrected orientation
 * @param {File} file - The image file
 * @returns {Promise<string>} Data URL of the corrected image
 */
export const fixImageOrientation = (file) => {
    return new Promise((resolve, reject) => {
        // EXIF.getData side-effects the file/image object, so we pass the file directly.
        EXIF.getData(file, function () {
            const orientation = EXIF.getTag(this, "Orientation");
            const reader = new FileReader();

            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    // If no orientation or normal, return original
                    if (!orientation || orientation === 1) {
                        resolve(e.target.result);
                        return;
                    }

                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    // Set proper canvas dimensions before transform & render
                    if ([5, 6, 7, 8].indexOf(orientation) > -1) {
                        canvas.width = img.height;
                        canvas.height = img.width;
                    } else {
                        canvas.width = img.width;
                        canvas.height = img.height;
                    }

                    // transform context before drawing image
                    switch (orientation) {
                        case 2: ctx.transform(-1, 0, 0, 1, img.width, 0); break;
                        case 3: ctx.transform(-1, 0, 0, -1, img.width, img.height); break;
                        case 4: ctx.transform(1, 0, 0, -1, 0, img.height); break;
                        case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
                        case 6: ctx.transform(0, 1, -1, 0, img.height, 0); break;
                        case 7: ctx.transform(0, -1, -1, 0, img.height, img.width); break;
                        case 8: ctx.transform(0, -1, 1, 0, 0, img.width); break;
                        default: break;
                    }

                    ctx.drawImage(img, 0, 0);
                    resolve(canvas.toDataURL('image/jpeg', 0.9));
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    });
};
