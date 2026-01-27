/**
 * AR Face Filters - Instagram-style Effects
 * Real-time makeup application using MediaPipe Face Mesh
 * Supports lipstick, eyeshadow, blush, and face shape analysis
 */

import { FACE_MESH_INDICES, getPoints } from './faceLandmarks';

/**
 * Apply AR lipstick filter
 * @param {CanvasRenderingContext2D} ctx
 * @param {Array} landmarks - MediaPipe face landmarks
 * @param {Object} options - Color, opacity, finish
 */
export const applyARLipstick = (ctx, landmarks, options = {}) => {
    const {
        color = '#FF6B9D',
        opacity = 0.7,
        finish = 'glossy', // 'matte', 'glossy', 'satin'
        blur = 2
    } = options;

    // Lip landmarks (outer and inner)
    const upperLipOuter = [61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291];
    const lowerLipOuter = [146, 91, 181, 84, 17, 314, 405, 321, 375, 291];
    const upperLipInner = [78, 191, 80, 81, 82, 13, 312, 311, 310, 415, 308];
    const lowerLipInner = [78, 95, 88, 178, 87, 14, 317, 402, 318, 324, 308];

    // Get all lip points
    const allLipPoints = [
        ...getPoints(landmarks, upperLipOuter),
        ...getPoints(landmarks, lowerLipOuter)
    ];

    if (allLipPoints.length === 0) return;

    // Create gradient for glossy effect
    ctx.save();

    // Apply blur for softer edges
    if (blur > 0) {
        ctx.filter = `blur(${blur}px)`;
    }

    // Draw lip area
    ctx.beginPath();
    ctx.moveTo(allLipPoints[0].x, allLipPoints[0].y);
    allLipPoints.forEach(point => {
        ctx.lineTo(point.x, point.y);
    });
    ctx.closePath();

    // Apply color based on finish
    if (finish === 'glossy') {
        // Create gradient for shine
        const centerY = allLipPoints.reduce((sum, p) => sum + p.y, 0) / allLipPoints.length;
        const topY = Math.min(...allLipPoints.map(p => p.y));

        const gradient = ctx.createLinearGradient(0, topY, 0, centerY);
        gradient.addColorStop(0, addAlpha(lightenColor(color, 30), opacity * 0.9));
        gradient.addColorStop(0.5, addAlpha(color, opacity));
        gradient.addColorStop(1, addAlpha(darkenColor(color, 20), opacity));

        ctx.fillStyle = gradient;
    } else if (finish === 'matte') {
        ctx.fillStyle = addAlpha(color, opacity * 0.9);
    } else {
        // Satin
        ctx.fillStyle = addAlpha(color, opacity * 0.85);
    }

    ctx.fill();

    // Add highlight for glossy finish
    if (finish === 'glossy') {
        const upperLipPoints = getPoints(landmarks, upperLipOuter);
        if (upperLipPoints.length > 0) {
            ctx.beginPath();
            const centerX = upperLipPoints.reduce((sum, p) => sum + p.x, 0) / upperLipPoints.length;
            const centerY = upperLipPoints.reduce((sum, p) => sum + p.y, 0) / upperLipPoints.length;

            const highlightGradient = ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, 30
            );
            highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
            highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.fillStyle = highlightGradient;
            ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    ctx.restore();
};

/**
 * Apply AR eyeshadow filter
 * @param {CanvasRenderingContext2D} ctx
 * @param {Array} landmarks
 * @param {Object} options
 */
export const applyAREyeshadow = (ctx, landmarks, options = {}) => {
    const {
        color = '#8B4513',
        opacity = 0.6,
        finish = 'shimmer', // 'matte', 'shimmer', 'metallic'
        blend = 'multiply'
    } = options;

    // Left and right eye regions
    const leftEyeUpper = [246, 161, 160, 159, 158, 157, 173, 133, 155, 154, 153, 145, 144, 163, 7];
    const rightEyeUpper = [466, 388, 387, 386, 385, 384, 398, 362, 382, 381, 380, 374, 373, 390, 249];

    [leftEyeUpper, rightEyeUpper].forEach(eyeIndices => {
        const eyePoints = getPoints(landmarks, eyeIndices);
        if (eyePoints.length === 0) return;

        ctx.save();
        ctx.globalCompositeOperation = blend;

        // Create gradient from lid to brow
        const minY = Math.min(...eyePoints.map(p => p.y));
        const maxY = Math.max(...eyePoints.map(p => p.y));
        const centerX = eyePoints.reduce((sum, p) => sum + p.x, 0) / eyePoints.length;

        const gradient = ctx.createLinearGradient(centerX, minY - 20, centerX, maxY);
        gradient.addColorStop(0, addAlpha(color, 0));
        gradient.addColorStop(0.3, addAlpha(color, opacity * 0.8));
        gradient.addColorStop(0.7, addAlpha(color, opacity));
        gradient.addColorStop(1, addAlpha(color, opacity * 0.3));

        ctx.fillStyle = gradient;

        // Draw eyeshadow area
        ctx.beginPath();
        ctx.moveTo(eyePoints[0].x, eyePoints[0].y);
        eyePoints.forEach(point => {
            ctx.lineTo(point.x, point.y);
        });
        // Extend upward for crease
        ctx.lineTo(eyePoints[eyePoints.length - 1].x, minY - 20);
        ctx.lineTo(eyePoints[0].x, minY - 20);
        ctx.closePath();
        ctx.fill();

        // Add shimmer/metallic effect
        if (finish === 'shimmer' || finish === 'metallic') {
            const shimmerIntensity = finish === 'metallic' ? 0.5 : 0.3;
            const shimmerGradient = ctx.createRadialGradient(
                centerX, (minY + maxY) / 2, 0,
                centerX, (minY + maxY) / 2, 40
            );
            shimmerGradient.addColorStop(0, `rgba(255, 255, 255, ${shimmerIntensity})`);
            shimmerGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.fillStyle = shimmerGradient;
            ctx.fill();
        }

        ctx.restore();
    });
};

/**
 * Apply AR blush filter
 * @param {CanvasRenderingContext2D} ctx
 * @param {Array} landmarks
 * @param {Object} options
 */
export const applyARBlush = (ctx, landmarks, options = {}) => {
    const {
        color = '#FFB6C1',
        opacity = 0.5,
        size = 60,
        blur = 15
    } = options;

    // Cheek landmarks (approximate)
    const leftCheek = { x: landmarks[123]?.x, y: landmarks[123]?.y };
    const rightCheek = { x: landmarks[352]?.x, y: landmarks[352]?.y };

    if (!leftCheek.x || !rightCheek.x) return;

    ctx.save();
    ctx.filter = `blur(${blur}px)`;
    ctx.globalCompositeOperation = 'multiply';

    [leftCheek, rightCheek].forEach(cheek => {
        const gradient = ctx.createRadialGradient(
            cheek.x, cheek.y, 0,
            cheek.x, cheek.y, size
        );
        gradient.addColorStop(0, addAlpha(color, opacity));
        gradient.addColorStop(0.6, addAlpha(color, opacity * 0.5));
        gradient.addColorStop(1, addAlpha(color, 0));

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cheek.x, cheek.y, size, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.restore();
};

/**
 * Apply AR eyeliner filter
 * @param {CanvasRenderingContext2D} ctx
 * @param {Array} landmarks
 * @param {Object} options
 */
export const applyAREyeliner = (ctx, landmarks, options = {}) => {
    const {
        color = '#000000',
        thickness = 2,
        style = 'classic', // 'classic', 'winged', 'cat-eye'
        opacity = 0.9
    } = options;

    // Upper eyelid line
    const leftEyeLine = [33, 246, 161, 160, 159, 158, 157, 173, 133];
    const rightEyeLine = [263, 466, 388, 387, 386, 385, 384, 398, 362];

    ctx.save();
    ctx.strokeStyle = addAlpha(color, opacity);
    ctx.lineWidth = thickness;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    [leftEyeLine, rightEyeLine].forEach((eyeIndices, index) => {
        const points = getPoints(landmarks, eyeIndices);
        if (points.length === 0) return;

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        points.forEach(point => {
            ctx.lineTo(point.x, point.y);
        });

        ctx.stroke();

        // Add wing for winged/cat-eye styles
        if (style === 'winged' || style === 'cat-eye') {
            const lastPoint = points[points.length - 1];
            const wingLength = style === 'cat-eye' ? 15 : 10;
            const wingAngle = index === 0 ? -0.3 : 0.3; // Left vs right eye

            ctx.beginPath();
            ctx.moveTo(lastPoint.x, lastPoint.y);
            ctx.lineTo(
                lastPoint.x + wingLength * Math.cos(wingAngle),
                lastPoint.y + wingLength * Math.sin(wingAngle)
            );
            ctx.stroke();
        }
    });

    ctx.restore();
};

/**
 * Apply AR highlighter filter
 * @param {CanvasRenderingContext2D} ctx
 * @param {Array} landmarks
 * @param {Object} options
 */
export const applyARHighlighter = (ctx, landmarks, options = {}) => {
    const {
        color = '#FFD700',
        opacity = 0.4,
        intensity = 'medium' // 'subtle', 'medium', 'intense'
    } = options;

    const intensityMap = {
        'subtle': 0.3,
        'medium': 0.5,
        'intense': 0.7
    };

    const actualOpacity = opacity * intensityMap[intensity];

    // Highlight areas: cheekbones, nose bridge, cupid's bow
    const highlightAreas = [
        { landmark: 123, size: 40 }, // Left cheekbone
        { landmark: 352, size: 40 }, // Right cheekbone
        { landmark: 6, size: 20 },   // Nose bridge
        { landmark: 13, size: 15 }   // Cupid's bow
    ];

    ctx.save();
    ctx.filter = 'blur(10px)';
    ctx.globalCompositeOperation = 'screen';

    highlightAreas.forEach(area => {
        const point = landmarks[area.landmark];
        if (!point) return;

        const gradient = ctx.createRadialGradient(
            point.x, point.y, 0,
            point.x, point.y, area.size
        );
        gradient.addColorStop(0, addAlpha(color, actualOpacity));
        gradient.addColorStop(0.5, addAlpha(color, actualOpacity * 0.5));
        gradient.addColorStop(1, addAlpha(color, 0));

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, area.size, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.restore();
};

/**
 * Analyze face shape from landmarks
 * @param {Array} landmarks
 * @returns {Object} Face shape analysis
 */
export const analyzeFaceShape = (landmarks) => {
    if (!landmarks || landmarks.length === 0) {
        return { shape: 'unknown', confidence: 0 };
    }

    // Key measurements
    const jawWidth = distance(landmarks[172], landmarks[397]);
    const cheekWidth = distance(landmarks[234], landmarks[454]);
    const foreheadWidth = distance(landmarks[21], landmarks[251]);
    const faceLength = distance(landmarks[10], landmarks[152]);

    // Calculate ratios
    const jawToForeheadRatio = jawWidth / foreheadWidth;
    const lengthToWidthRatio = faceLength / cheekWidth;
    const cheekToJawRatio = cheekWidth / jawWidth;

    // Determine face shape
    let shape = 'oval';
    let confidence = 0.7;

    if (lengthToWidthRatio > 1.5) {
        shape = 'oblong';
        confidence = 0.8;
    } else if (jawToForeheadRatio < 0.85) {
        shape = 'heart';
        confidence = 0.75;
    } else if (jawToForeheadRatio > 1.1) {
        shape = 'triangle';
        confidence = 0.75;
    } else if (cheekToJawRatio > 1.2 && lengthToWidthRatio < 1.3) {
        shape = 'round';
        confidence = 0.8;
    } else if (Math.abs(jawWidth - cheekWidth) < 20 && Math.abs(cheekWidth - foreheadWidth) < 20) {
        shape = 'square';
        confidence = 0.75;
    }

    return {
        shape,
        confidence,
        measurements: {
            jawWidth,
            cheekWidth,
            foreheadWidth,
            faceLength
        },
        recommendations: getFaceShapeRecommendations(shape)
    };
};

/**
 * Get makeup recommendations based on face shape
 * @param {string} shape
 * @returns {Object}
 */
const getFaceShapeRecommendations = (shape) => {
    const recommendations = {
        oval: {
            contouring: 'Minimal contouring needed. Focus on enhancing natural features.',
            blush: 'Apply on the apples of cheeks, blending upward.',
            highlight: 'Cheekbones, bridge of nose, cupid\'s bow.'
        },
        round: {
            contouring: 'Contour along temples and jawline to add definition.',
            blush: 'Apply diagonally from cheeks to temples.',
            highlight: 'Center of forehead, under eyes, chin.'
        },
        square: {
            contouring: 'Soften jawline and temples.',
            blush: 'Apply in circular motion on apples of cheeks.',
            highlight: 'Center of forehead, cheekbones, chin.'
        },
        heart: {
            contouring: 'Contour temples and sides of forehead.',
            blush: 'Apply on apples of cheeks, blending toward ears.',
            highlight: 'Chin, under eyes, center of forehead.'
        },
        oblong: {
            contouring: 'Contour hairline and chin to shorten face.',
            blush: 'Apply horizontally across cheeks.',
            highlight: 'Sides of forehead, cheekbones.'
        },
        triangle: {
            contouring: 'Contour jawline to soften.',
            blush: 'Apply high on cheekbones.',
            highlight: 'Forehead, under eyes, bridge of nose.'
        }
    };

    return recommendations[shape] || recommendations.oval;
};

// ===== HELPER FUNCTIONS =====

const addAlpha = (color, alpha) => {
    if (color.startsWith('#')) {
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return color;
};

const lightenColor = (color, percent) => {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255))
        .toString(16).slice(1);
};

const darkenColor = (color, percent) => {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return '#' + (0x1000000 + (R > 0 ? R : 0) * 0x10000 +
        (G > 0 ? G : 0) * 0x100 +
        (B > 0 ? B : 0))
        .toString(16).slice(1);
};

const distance = (p1, p2) => {
    if (!p1 || !p2) return 0;
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

export default {
    applyARLipstick,
    applyAREyeshadow,
    applyARBlush,
    applyAREyeliner,
    applyARHighlighter,
    analyzeFaceShape
};
