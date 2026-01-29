/**
 * AI-Powered Skin Tone Analysis with Face Detection
 * Uses face-api.js for robust face detection and skin tone extraction
 */
import * as faceapi from 'face-api.js';

// Configuration
const MODEL_URL = '/models';
let modelsLoaded = false;

/**
 * Load face-api.js models
 */
export const loadFaceDetectionModels = async () => {
    if (modelsLoaded) return;
    try {
        await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
            faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
            faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
        ]);
        modelsLoaded = true;
        console.log('Face detection models loaded');
    } catch (error) {
        console.error('Failed to load face detection models:', error);
        throw error;
    }
};

/**
 * Get human-readable skin tone name
 */
const getSkinToneName = (r, g, b) => {
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
 * Determine undertone from RGB
 */
const determineUndertone = (rgb) => {
    const { r, g, b } = rgb;
    const redGreenRatio = r / (g + 1);
    const blueGreenRatio = b / (g + 1);

    if (redGreenRatio > 1.1 && blueGreenRatio < 0.95) return 'warm';
    if (blueGreenRatio > 1.0 || (r > 180 && b > 140)) return 'cool';
    return 'neutral';
};

/**
 * Get product recommendations based on skin analysis
 */
export const getRecommendations = (undertone, skinTone) => {
    const recommendations = {
        warm: {
            foundation: ['L\'Oreal True Match (W series)', 'MAC Studio Fix (NC series)', 'Fenty Beauty (warm)', 'Maybelline Fit Me (warm)'],
            lipstick: ['Warm pinks', 'Orange-reds', 'Golden browns', 'Peachy nudes'],
            blush: ['Peachy tones', 'Coral', 'Bronze'],
            eyeshadow: ['Warm browns', 'Golds', 'Olive greens']
        },
        cool: {
            foundation: ['L\'Oreal True Match (C series)', 'MAC Studio Fix (NW series)', 'Fenty Beauty (cool)', 'Maybelline Fit Me (cool)'],
            lipstick: ['Blue-based pinks', 'Berry shades', 'Mauves', 'Cool reds'],
            blush: ['Pink tones', 'Rose', 'Plum'],
            eyeshadow: ['Cool browns', 'Silvers', 'Purples']
        },
        neutral: {
            foundation: ['L\'Oreal True Match (N series)', 'Fenty Beauty (neutral)', 'Maybelline Fit Me (neutral)'],
            lipstick: ['Nude pinks', 'Mauves', 'Soft berries'],
            blush: ['Soft pink', 'Mauve', 'Dusty rose'],
            eyeshadow: ['Neutral browns', 'Soft golds', 'Muted purples']
        }
    };
    return recommendations[undertone] || recommendations.neutral;
};

/**
 * Get shade recommendations for specific product type
 */
export const getProductShades = (undertone, skinTone, productType) => {
    const recommendations = getRecommendations(undertone, skinTone);
    return recommendations[productType] || [];
};

/**
 * Compare two skin tones for similarity
 */
export const compareSkinTones = (analysis1, analysis2) => {
    const rgb1 = analysis1.skinColor.rgb;
    const rgb2 = analysis2.skinColor.rgb;
    const distance = Math.sqrt(
        Math.pow(rgb1.r - rgb2.r, 2) +
        Math.pow(rgb1.g - rgb2.g, 2) +
        Math.pow(rgb1.b - rgb2.b, 2)
    );
    const maxDistance = Math.sqrt(3 * Math.pow(255, 2));
    return Math.round(100 * (1 - distance / maxDistance));
};

/**
 * Helper to analyze skin pixels from buffer
 */
const analyzeSkinPixels = (pixelData) => {
    let r = 0, g = 0, b = 0;
    let count = 0;

    // Sample pixels, filtering for skin-like colors
    for (let i = 0; i < pixelData.length; i += 16) {
        const red = pixelData[i];
        const green = pixelData[i + 1];
        const blue = pixelData[i + 2];

        // Basic skin color heuristic to filter out backgrounds/hair within the face box
        if (red > 60 && red > green && red > (blue - 5)) {
            r += red;
            g += green;
            b += blue;
            count++;
        }
    }

    if (count === 0) {
        // Fallback to simple average if heuristic fails
        for (let i = 0; i < Math.min(pixelData.length, 4000); i += 4) {
            r += pixelData[i];
            g += pixelData[i + 1];
            b += pixelData[i + 2];
            count++;
        }
    }

    const avgR = Math.floor(r / count);
    const avgG = Math.floor(g / count);
    const avgB = Math.floor(b / count);

    return {
        rgb: { r: avgR, g: avgG, b: avgB },
        hex: `#${avgR.toString(16).padStart(2, '0')}${avgG.toString(16).padStart(2, '0')}${avgB.toString(16).padStart(2, '0')}`,
        tone: getSkinToneName(avgR, avgG, avgB)
    };
};

/**
 * Main function: Analyze skin tone from image source
 * @param {HTMLImageElement|HTMLVideoElement|HTMLCanvasElement} imageSource
 * @returns {Promise<Object>} Analysis results
 */
export const analyzeSkinTone = async (imageSource) => {
    try {
        if (!imageSource) throw new Error('No image source provided');

        // Ensure models are loaded
        await loadFaceDetectionModels();

        // Convert source to image if it's a string, or just use as is if it's an element
        let input = imageSource;
        if (typeof imageSource === 'string') {
            input = new Image();
            await new Promise((resolve, reject) => {
                input.onload = resolve;
                input.onerror = reject;
                input.src = imageSource;
            });
        }

        // Detect face
        const detections = await faceapi.detectSingleFace(input, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks();

        if (!detections) {
            throw new Error('No face detected in image. Please ensure your face is clearly visible and well-lit.');
        }

        // Extract face region
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const box = detections.detection.box;

        canvas.width = box.width;
        canvas.height = box.height;

        // Draw only the face portion
        ctx.drawImage(input, box.x, box.y, box.width, box.height, 0, 0, box.width, box.height);

        const imageData = ctx.getImageData(0, 0, box.width, box.height);

        // Analyze skin tone from pixels
        const skinAnalysis = analyzeSkinPixels(imageData.data);
        const undertone = determineUndertone(skinAnalysis.rgb);
        const recommendations = getRecommendations(undertone, skinAnalysis.tone);

        return {
            skinColor: {
                rgb: skinAnalysis.rgb,
                hex: skinAnalysis.hex
            },
            undertone: undertone,
            skinTone: skinAnalysis.tone,
            recommendations,
            confidence: detections.detection.score,
            faceBox: box,
            description: `Detected ${skinAnalysis.tone} skin with ${undertone} undertones.`
        };

    } catch (error) {
        console.error('Skin analysis error:', error);
        if (error.message.includes('No face detected')) {
            throw new Error('No face detected. Please:\n• Ensure your face is clearly visible\n• Use good lighting\n• Face the camera directly');
        }
        throw error;
    }
};

export default analyzeSkinTone;
