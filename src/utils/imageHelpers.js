
// Fallback images for different categories
const FALLBACK_IMAGES = {
    skincare: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80",
    makeup: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&q=80",
    spa: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
    default: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80"
};

/**
 * Ensures we have a valid image URL, returning a fallback if necessary
 * @param {string} url - The image URL to validate
 * @param {string} category - Category for fallback selection
 * @returns {string} - A valid image URL
 */
export const getImageUrl = (url, category = 'default') => {
    // Return fallback if no URL provided
    if (!url) return FALLBACK_IMAGES[category] || FALLBACK_IMAGES.default;

    // If URL is already complete, return it
    if (url.startsWith('http')) {
        // Check for known broken IDs
        const brokenIds = ['1598378294821', '1583391733981', '1522337360705'];
        const isBroken = brokenIds.some(id => url.includes(id));
        if (isBroken) return FALLBACK_IMAGES[category] || FALLBACK_IMAGES.default;

        return url;
    }

    // If it's just a photo ID, construct the URL
    if (url.includes('photo-')) {
        return `https://images.unsplash.com/${url}?w=800&q=80`;
    }

    // Otherwise return fallback
    return FALLBACK_IMAGES[category] || FALLBACK_IMAGES.default;
};

/**
 * Handles image loading errors by substituting a fallback
 * @param {Event} e - The image error event
 * @param {string} category - Category for fallback selection
 */
export const handleImageError = (e, category = 'default') => {
    const fallback = FALLBACK_IMAGES[category] || FALLBACK_IMAGES.default;
    if (e.target.src !== fallback) {
        e.target.src = fallback;
    }
    console.warn('Image failed to load, using fallback:', e.target.src);
};
