/**
 * AI Photo Tagging System
 * Automatically analyzes and tags beauty photos with:
 * - Makeup style
 * - Products used
 * - Skin tone category
 * - Occasion/vibe
 */

import { analyzeSkinTone } from './skinToneAnalysis';

/**
 * Detect makeup style from image analysis
 * @param {Object} imageAnalysis - Analysis data
 * @returns {Array<string>} Detected styles
 */
const detectMakeupStyle = (imageAnalysis) => {
    const styles = [];
    const { colors, intensity, features } = imageAnalysis;

    // Natural/No-Makeup Look
    if (intensity.overall < 0.3) {
        styles.push('Natural');
        styles.push('No-Makeup Makeup');
    }

    // Glam/Evening
    if (intensity.overall > 0.7) {
        styles.push('Glamorous');
        styles.push('Evening');
        styles.push('Full Glam');
    }

    // Smokey Eye
    if (intensity.eyes > 0.6 && colors.eyes.includes('dark')) {
        styles.push('Smokey Eye');
    }

    // Bold Lips
    if (intensity.lips > 0.7) {
        styles.push('Bold Lips');
        styles.push('Statement Lips');
    }

    // Nude/Neutral
    if (colors.overall === 'neutral' && intensity.overall < 0.5) {
        styles.push('Nude');
        styles.push('Neutral');
        styles.push('Everyday');
    }

    // Bridal
    if (intensity.overall > 0.5 && colors.overall === 'soft' && features.includes('dewy')) {
        styles.push('Bridal');
        styles.push('Romantic');
    }

    // Editorial
    if (features.includes('creative') || features.includes('artistic')) {
        styles.push('Editorial');
        styles.push('Artistic');
    }

    // Soft Glam
    if (intensity.overall >= 0.4 && intensity.overall <= 0.6) {
        styles.push('Soft Glam');
        styles.push('Date Night');
    }

    return [...new Set(styles)]; // Remove duplicates
};

/**
 * Detect products used based on visual analysis
 * @param {Object} imageAnalysis
 * @returns {Array<string>} Product categories
 */
const detectProductsUsed = (imageAnalysis) => {
    const products = [];
    const { intensity, features } = imageAnalysis;

    // Foundation/Base
    if (features.includes('smooth') || features.includes('even')) {
        products.push('Foundation');
        products.push('Primer');
    }

    // Concealer
    if (features.includes('brightened')) {
        products.push('Concealer');
    }

    // Powder
    if (features.includes('matte')) {
        products.push('Setting Powder');
    }

    // Blush
    if (intensity.cheeks > 0.3) {
        products.push('Blush');
    }

    // Highlighter
    if (features.includes('glow') || features.includes('shimmer')) {
        products.push('Highlighter');
    }

    // Contour
    if (features.includes('sculpted')) {
        products.push('Contour');
        products.push('Bronzer');
    }

    // Eyeshadow
    if (intensity.eyes > 0.3) {
        products.push('Eyeshadow');
    }

    // Eyeliner
    if (features.includes('defined-eyes')) {
        products.push('Eyeliner');
    }

    // Mascara
    if (features.includes('voluminous-lashes')) {
        products.push('Mascara');
    }

    // Eyebrow
    if (features.includes('defined-brows')) {
        products.push('Brow Pencil');
        products.push('Brow Gel');
    }

    // Lipstick
    if (intensity.lips > 0.3) {
        products.push('Lipstick');
        if (features.includes('glossy-lips')) {
            products.push('Lip Gloss');
        }
    }

    // Setting Spray
    if (features.includes('long-lasting')) {
        products.push('Setting Spray');
    }

    return [...new Set(products)];
};

/**
 * Detect occasion/vibe from makeup style
 * @param {Array<string>} styles
 * @returns {Array<string>} Occasions
 */
const detectOccasion = (styles) => {
    const occasions = [];

    if (styles.includes('Natural') || styles.includes('Everyday')) {
        occasions.push('Everyday');
        occasions.push('Work');
        occasions.push('Casual');
    }

    if (styles.includes('Glamorous') || styles.includes('Full Glam')) {
        occasions.push('Party');
        occasions.push('Night Out');
        occasions.push('Special Event');
    }

    if (styles.includes('Bridal')) {
        occasions.push('Wedding');
        occasions.push('Engagement');
        occasions.push('Formal Event');
    }

    if (styles.includes('Soft Glam') || styles.includes('Date Night')) {
        occasions.push('Date Night');
        occasions.push('Dinner');
        occasions.push('Semi-Formal');
    }

    if (styles.includes('Editorial')) {
        occasions.push('Photoshoot');
        occasions.push('Fashion Event');
        occasions.push('Creative');
    }

    return [...new Set(occasions)];
};

/**
 * Analyze image colors and intensity
 * @param {HTMLImageElement|HTMLCanvasElement} image
 * @returns {Object} Color and intensity analysis
 */
const analyzeImageColors = (image) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = image.width || image.videoWidth || 640;
    canvas.height = image.height || image.videoHeight || 480;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Sample key regions
    const lipRegion = ctx.getImageData(canvas.width * 0.4, canvas.height * 0.7, canvas.width * 0.2, canvas.height * 0.1);
    const eyeRegion = ctx.getImageData(canvas.width * 0.3, canvas.height * 0.3, canvas.width * 0.4, canvas.height * 0.2);
    const cheekRegion = ctx.getImageData(canvas.width * 0.2, canvas.height * 0.5, canvas.width * 0.6, canvas.height * 0.2);

    // Calculate intensity (saturation)
    const lipIntensity = calculateSaturation(lipRegion);
    const eyeIntensity = calculateSaturation(eyeRegion);
    const cheekIntensity = calculateSaturation(cheekRegion);

    // Detect features
    const features = detectVisualFeatures(canvas);

    return {
        intensity: {
            lips: lipIntensity,
            eyes: eyeIntensity,
            cheeks: cheekIntensity,
            overall: (lipIntensity + eyeIntensity + cheekIntensity) / 3
        },
        colors: {
            lips: classifyColor(lipRegion),
            eyes: classifyColor(eyeRegion),
            overall: 'neutral' // Simplified
        },
        features
    };
};

/**
 * Calculate color saturation
 * @param {ImageData} imageData
 * @returns {number} Saturation (0-1)
 */
const calculateSaturation = (imageData) => {
    const pixels = imageData.data;
    let totalSaturation = 0;
    let count = 0;

    for (let i = 0; i < pixels.length; i += 16) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const saturation = max === 0 ? 0 : (max - min) / max;

        totalSaturation += saturation;
        count++;
    }

    return count > 0 ? totalSaturation / count : 0;
};

/**
 * Classify color as light/dark/neutral
 * @param {ImageData} imageData
 * @returns {Array<string>}
 */
const classifyColor = (imageData) => {
    const pixels = imageData.data;
    let avgBrightness = 0;
    let count = 0;

    for (let i = 0; i < pixels.length; i += 16) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        avgBrightness += (r + g + b) / 3;
        count++;
    }

    avgBrightness /= count;

    const colors = [];
    if (avgBrightness < 100) colors.push('dark');
    else if (avgBrightness > 180) colors.push('light');
    else colors.push('medium');

    return colors;
};

/**
 * Detect visual features (simplified heuristics)
 * @param {HTMLCanvasElement} canvas
 * @returns {Array<string>}
 */
const detectVisualFeatures = (canvas) => {
    const features = [];
    const ctx = canvas.getContext('2d');

    // Sample center region
    const centerData = ctx.getImageData(
        canvas.width * 0.3,
        canvas.height * 0.3,
        canvas.width * 0.4,
        canvas.height * 0.4
    );

    const avgBrightness = calculateAverageBrightness(centerData);
    const saturation = calculateSaturation(centerData);

    // Detect features based on brightness and saturation
    if (avgBrightness > 180) features.push('brightened', 'glow');
    if (saturation > 0.4) features.push('vibrant', 'colorful');
    if (saturation < 0.2) features.push('matte', 'neutral');
    if (avgBrightness > 160 && saturation > 0.3) features.push('dewy', 'shimmer');

    // Default features
    features.push('smooth', 'even', 'defined-eyes', 'defined-brows');

    return features;
};

/**
 * Calculate average brightness
 * @param {ImageData} imageData
 * @returns {number}
 */
const calculateAverageBrightness = (imageData) => {
    const pixels = imageData.data;
    let total = 0;
    let count = 0;

    for (let i = 0; i < pixels.length; i += 16) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        total += (r + g + b) / 3;
        count++;
    }

    return count > 0 ? total / count : 0;
};

/**
 * Main function: Auto-tag photo with AI analysis
 * @param {HTMLImageElement|HTMLCanvasElement} beforeImage
 * @param {HTMLImageElement|HTMLCanvasElement} afterImage
 * @param {Object} metadata - Optional manual metadata
 * @returns {Promise<Object>} Tagged photo data
 */
export const autoTagPhoto = async (beforeImage, afterImage, metadata = {}) => {
    try {
        // Analyze skin tone from before image
        const skinAnalysis = await analyzeSkinTone(beforeImage);

        // Analyze makeup in after image
        const imageAnalysis = analyzeImageColors(afterImage);

        // Detect makeup style
        const styles = detectMakeupStyle(imageAnalysis);

        // Detect products used
        const products = detectProductsUsed(imageAnalysis);

        // Detect occasion
        const occasions = detectOccasion(styles);

        // Generate tags
        const tags = [
            ...styles,
            ...products,
            ...occasions,
            skinAnalysis.undertone,
            skinAnalysis.skinTone,
            `${skinAnalysis.undertone}-undertone`,
            `${skinAnalysis.skinTone}-skin`
        ];

        return {
            id: `photo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            timestamp: Date.now(),
            skinTone: {
                category: skinAnalysis.skinTone,
                undertone: skinAnalysis.undertone,
                hex: skinAnalysis.skinColor.hex
            },
            makeup: {
                styles,
                intensity: imageAnalysis.intensity.overall,
                features: imageAnalysis.features
            },
            products,
            occasions,
            tags: [...new Set(tags)], // Remove duplicates
            metadata: {
                ...metadata,
                autoTagged: true,
                taggedAt: new Date().toISOString()
            }
        };
    } catch (error) {
        console.error('Auto-tagging failed:', error);
        throw error;
    }
};

/**
 * Search photos by tags
 * @param {Array<Object>} photos - Array of tagged photos
 * @param {Object} filters - Search filters
 * @returns {Array<Object>} Filtered photos
 */
export const searchPhotosByTags = (photos, filters = {}) => {
    const {
        styles = [],
        products = [],
        skinTones = [],
        undertones = [],
        occasions = [],
        searchQuery = ''
    } = filters;

    return photos.filter(photo => {
        // Filter by styles
        if (styles.length > 0) {
            const hasStyle = styles.some(style =>
                photo.makeup.styles.includes(style)
            );
            if (!hasStyle) return false;
        }

        // Filter by products
        if (products.length > 0) {
            const hasProduct = products.some(product =>
                photo.products.includes(product)
            );
            if (!hasProduct) return false;
        }

        // Filter by skin tone
        if (skinTones.length > 0) {
            if (!skinTones.includes(photo.skinTone.category)) return false;
        }

        // Filter by undertone
        if (undertones.length > 0) {
            if (!undertones.includes(photo.skinTone.undertone)) return false;
        }

        // Filter by occasion
        if (occasions.length > 0) {
            const hasOccasion = occasions.some(occasion =>
                photo.occasions.includes(occasion)
            );
            if (!hasOccasion) return false;
        }

        // Search query (tags, styles, products)
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const searchableText = [
                ...photo.tags,
                ...photo.makeup.styles,
                ...photo.products,
                ...photo.occasions
            ].join(' ').toLowerCase();

            if (!searchableText.includes(query)) return false;
        }

        return true;
    });
};

/**
 * Get popular tags from photo collection
 * @param {Array<Object>} photos
 * @returns {Object} Tag statistics
 */
export const getPopularTags = (photos) => {
    const tagCounts = {};
    const styleCounts = {};
    const productCounts = {};

    photos.forEach(photo => {
        // Count all tags
        photo.tags.forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });

        // Count styles
        photo.makeup.styles.forEach(style => {
            styleCounts[style] = (styleCounts[style] || 0) + 1;
        });

        // Count products
        photo.products.forEach(product => {
            productCounts[product] = (productCounts[product] || 0) + 1;
        });
    });

    // Sort by count
    const sortByCount = (obj) =>
        Object.entries(obj)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10)
            .map(([tag, count]) => ({ tag, count }));

    return {
        allTags: sortByCount(tagCounts),
        styles: sortByCount(styleCounts),
        products: sortByCount(productCounts)
    };
};

export default {
    autoTagPhoto,
    searchPhotosByTags,
    getPopularTags
};
