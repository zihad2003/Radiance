/**
 * AI-Powered Skin Tone Analysis
 * Analyzes uploaded photos to determine skin tone and undertone
 * Provides personalized product recommendations
 */

/**
 * Extract dominant skin color from face region
 * @param {ImageData} imageData - Canvas ImageData from face region
 * @returns {Object} RGB values
 */
const extractSkinColor = (imageData) => {
    const pixels = imageData.data;
    let r = 0, g = 0, b = 0;
    let count = 0;

    // Sample every 4th pixel for performance
    for (let i = 0; i < pixels.length; i += 16) {
        const red = pixels[i];
        const green = pixels[i + 1];
        const blue = pixels[i + 2];

        // Filter out non-skin pixels (basic heuristic)
        if (red > 95 && green > 40 && blue > 20 &&
            red > green && red > blue &&
            Math.abs(red - green) > 15) {
            r += red;
            g += green;
            b += blue;
            count++;
        }
    }

    if (count === 0) return { r: 0, g: 0, b: 0 };

    return {
        r: Math.round(r / count),
        g: Math.round(g / count),
        b: Math.round(b / count)
    };
};

/**
 * Determine undertone from RGB values
 * @param {Object} rgb - RGB color values
 * @returns {string} 'warm', 'cool', or 'neutral'
 */
const determineUndertone = (rgb) => {
    const { r, g, b } = rgb;

    // Calculate color ratios
    const redGreenRatio = r / (g + 1);
    const blueGreenRatio = b / (g + 1);

    // Warm: More red/yellow (peachy, golden)
    if (redGreenRatio > 1.1 && blueGreenRatio < 0.95) {
        return 'warm';
    }
    // Cool: More blue/pink
    else if (blueGreenRatio > 1.0 || (r > 180 && b > 140)) {
        return 'cool';
    }
    // Neutral: Balanced
    else {
        return 'neutral';
    }
};

/**
 * Determine skin tone category from brightness
 * @param {Object} rgb - RGB color values
 * @returns {string} Skin tone category
 */
const determineSkinTone = (rgb) => {
    const { r, g, b } = rgb;
    const brightness = (r + g + b) / 3;

    if (brightness > 220) return 'very-light';
    if (brightness > 190) return 'light';
    if (brightness > 160) return 'medium-light';
    if (brightness > 130) return 'medium';
    if (brightness > 100) return 'medium-deep';
    if (brightness > 70) return 'deep';
    return 'very-deep';
};

/**
 * Get product recommendations based on skin analysis
 * @param {string} undertone - Skin undertone
 * @param {string} skinTone - Skin tone category
 * @returns {Object} Product recommendations
 */
const getRecommendations = (undertone, skinTone) => {
    const recommendations = {
        warm: {
            foundation: [
                'L\'Oreal True Match (W series)',
                'MAC Studio Fix (NC series)',
                'Fenty Beauty (warm shades)',
                'Maybelline Fit Me (warm undertones)'
            ],
            lipstick: [
                'Warm pinks (coral, salmon)',
                'Orange-reds',
                'Browns with golden undertones',
                'Peachy nudes'
            ],
            blush: [
                'Peachy tones',
                'Coral shades',
                'Bronze',
                'Warm terracotta'
            ],
            eyeshadow: [
                'Warm browns',
                'Golds and coppers',
                'Olive greens',
                'Warm oranges'
            ]
        },
        cool: {
            foundation: [
                'L\'Oreal True Match (C series)',
                'MAC Studio Fix (NW series)',
                'Fenty Beauty (cool shades)',
                'Maybelline Fit Me (cool undertones)'
            ],
            lipstick: [
                'Blue-based pinks',
                'Berry shades',
                'Mauves',
                'Cool reds'
            ],
            blush: [
                'Pink tones',
                'Rose shades',
                'Plum',
                'Cool berry'
            ],
            eyeshadow: [
                'Cool browns (taupe)',
                'Silvers and grays',
                'Cool purples',
                'Blue-toned shades'
            ]
        },
        neutral: {
            foundation: [
                'L\'Oreal True Match (N series)',
                'MAC Studio Fix (NC/NW balanced)',
                'Fenty Beauty (neutral shades)',
                'Maybelline Fit Me (neutral undertones)'
            ],
            lipstick: [
                'Nude pinks',
                'Mauves',
                'Soft berries',
                'Balanced reds'
            ],
            blush: [
                'Soft pink',
                'Mauve',
                'Neutral peach',
                'Dusty rose'
            ],
            eyeshadow: [
                'Neutral browns',
                'Soft golds',
                'Muted purples',
                'Versatile shades'
            ]
        }
    };

    return recommendations[undertone] || recommendations.neutral;
};

/**
 * Main function: Analyze skin tone from image
 * @param {HTMLImageElement|HTMLVideoElement|HTMLCanvasElement} imageSource
 * @returns {Promise<Object>} Analysis results with recommendations
 */
export const analyzeSkinTone = async (imageSource) => {
    return new Promise((resolve, reject) => {
        try {
            // Create canvas to extract image data
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Set canvas size
            canvas.width = imageSource.width || imageSource.videoWidth || 640;
            canvas.height = imageSource.height || imageSource.videoHeight || 480;

            // Draw image
            ctx.drawImage(imageSource, 0, 0, canvas.width, canvas.height);

            // Extract face region (center 60% of image as approximation)
            const faceX = canvas.width * 0.2;
            const faceY = canvas.height * 0.2;
            const faceWidth = canvas.width * 0.6;
            const faceHeight = canvas.height * 0.6;

            const imageData = ctx.getImageData(faceX, faceY, faceWidth, faceHeight);

            // Analyze skin color
            const skinColor = extractSkinColor(imageData);

            if (skinColor.r === 0 && skinColor.g === 0 && skinColor.b === 0) {
                reject(new Error('No skin detected in image. Please ensure face is clearly visible.'));
                return;
            }

            // Determine undertone and skin tone
            const undertone = determineUndertone(skinColor);
            const skinTone = determineSkinTone(skinColor);

            // Get recommendations
            const recommendations = getRecommendations(undertone, skinTone);

            // Return analysis
            resolve({
                skinColor: {
                    rgb: skinColor,
                    hex: `#${skinColor.r.toString(16).padStart(2, '0')}${skinColor.g.toString(16).padStart(2, '0')}${skinColor.b.toString(16).padStart(2, '0')}`
                },
                undertone,
                skinTone,
                recommendations,
                description: getDescription(undertone, skinTone)
            });
        } catch (error) {
            reject(error);
        }
    });
};

/**
 * Get human-readable description
 * @param {string} undertone
 * @param {string} skinTone
 * @returns {string}
 */
const getDescription = (undertone, skinTone) => {
    const toneDescriptions = {
        'very-light': 'Very Light',
        'light': 'Light',
        'medium-light': 'Medium-Light',
        'medium': 'Medium',
        'medium-deep': 'Medium-Deep',
        'deep': 'Deep',
        'very-deep': 'Very Deep'
    };

    const undertoneDescriptions = {
        'warm': 'warm (golden, peachy)',
        'cool': 'cool (pink, rosy)',
        'neutral': 'neutral (balanced)'
    };

    return `You have ${toneDescriptions[skinTone]} skin with ${undertoneDescriptions[undertone]} undertones.`;
};

/**
 * Get shade recommendations for specific product type
 * @param {string} undertone
 * @param {string} skinTone
 * @param {string} productType - 'foundation', 'lipstick', 'blush', 'eyeshadow'
 * @returns {Array<string>}
 */
export const getProductShades = (undertone, skinTone, productType) => {
    const recommendations = getRecommendations(undertone, skinTone);
    return recommendations[productType] || [];
};

/**
 * Compare two skin tones for similarity
 * @param {Object} analysis1
 * @param {Object} analysis2
 * @returns {number} Similarity score (0-100)
 */
export const compareSkinTones = (analysis1, analysis2) => {
    const rgb1 = analysis1.skinColor.rgb;
    const rgb2 = analysis2.skinColor.rgb;

    // Calculate Euclidean distance
    const distance = Math.sqrt(
        Math.pow(rgb1.r - rgb2.r, 2) +
        Math.pow(rgb1.g - rgb2.g, 2) +
        Math.pow(rgb1.b - rgb2.b, 2)
    );

    // Convert to similarity score (0-100)
    const maxDistance = Math.sqrt(3 * Math.pow(255, 2));
    const similarity = 100 * (1 - distance / maxDistance);

    return Math.round(similarity);
};

export default analyzeSkinTone;
