/**
 * Face Landmarks Helper
 * Utilities for working with MediaPipe Face Mesh landmarks
 */

/**
 * MediaPipe Face Mesh has 468 landmarks
 * Key landmark indices for makeup application
 */
export const FACE_MESH_INDICES = {
    // Lips
    LIPS_UPPER_OUTER: [61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291],
    LIPS_LOWER_OUTER: [146, 91, 181, 84, 17, 314, 405, 321, 375, 291],
    LIPS_UPPER_INNER: [78, 191, 80, 81, 82, 13, 312, 311, 310, 415, 308],
    LIPS_LOWER_INNER: [78, 95, 88, 178, 87, 14, 317, 402, 318, 324, 308],

    // Eyes
    LEFT_EYE_UPPER: [246, 161, 160, 159, 158, 157, 173, 133, 155, 154, 153, 145, 144, 163, 7],
    LEFT_EYE_LOWER: [33, 7, 163, 144, 145, 153, 154, 155, 133],
    RIGHT_EYE_UPPER: [466, 388, 387, 386, 385, 384, 398, 362, 382, 381, 380, 374, 373, 390, 249],
    RIGHT_EYE_LOWER: [263, 249, 390, 373, 374, 380, 381, 382, 362],

    // Eyebrows
    LEFT_EYEBROW: [70, 63, 105, 66, 107, 55, 65, 52, 53, 46],
    RIGHT_EYEBROW: [300, 293, 334, 296, 336, 285, 295, 282, 283, 276],

    // Face contour
    FACE_OVAL: [10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109],

    // Cheeks
    LEFT_CHEEK: 123,
    RIGHT_CHEEK: 352,

    // Nose
    NOSE_BRIDGE: [6, 197, 195, 5],
    NOSE_TIP: 4,

    // Forehead
    FOREHEAD_CENTER: 10,
    FOREHEAD_LEFT: 21,
    FOREHEAD_RIGHT: 251,

    // Jaw
    JAW_LEFT: 172,
    JAW_RIGHT: 397,
    CHIN: 152
};

/**
 * Get points from landmarks array by indices
 * @param {Array} landmarks - MediaPipe landmarks
 * @param {Array} indices - Landmark indices to extract
 * @returns {Array} Array of {x, y} points
 */
export const getPoints = (landmarks, indices) => {
    if (!landmarks || !Array.isArray(indices)) return [];

    return indices
        .map(index => landmarks[index])
        .filter(point => point !== undefined)
        .map(point => ({
            x: point.x,
            y: point.y,
            z: point.z || 0
        }));
};

/**
 * Get center point of a set of landmarks
 * @param {Array} landmarks
 * @param {Array} indices
 * @returns {Object} {x, y} center point
 */
export const getCenterPoint = (landmarks, indices) => {
    const points = getPoints(landmarks, indices);
    if (points.length === 0) return { x: 0, y: 0 };

    const sum = points.reduce(
        (acc, point) => ({
            x: acc.x + point.x,
            y: acc.y + point.y
        }),
        { x: 0, y: 0 }
    );

    return {
        x: sum.x / points.length,
        y: sum.y / points.length
    };
};

/**
 * Get bounding box of landmarks
 * @param {Array} landmarks
 * @param {Array} indices
 * @returns {Object} {minX, minY, maxX, maxY, width, height}
 */
export const getBoundingBox = (landmarks, indices) => {
    const points = getPoints(landmarks, indices);
    if (points.length === 0) {
        return { minX: 0, minY: 0, maxX: 0, maxY: 0, width: 0, height: 0 };
    }

    const xs = points.map(p => p.x);
    const ys = points.map(p => p.y);

    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    return {
        minX,
        minY,
        maxX,
        maxY,
        width: maxX - minX,
        height: maxY - minY
    };
};

/**
 * Calculate distance between two landmark points
 * @param {Object} point1
 * @param {Object} point2
 * @returns {number} Distance
 */
export const calculateDistance = (point1, point2) => {
    if (!point1 || !point2) return 0;

    return Math.sqrt(
        Math.pow(point2.x - point1.x, 2) +
        Math.pow(point2.y - point1.y, 2)
    );
};

/**
 * Calculate angle between three points
 * @param {Object} point1
 * @param {Object} vertex
 * @param {Object} point2
 * @returns {number} Angle in degrees
 */
export const calculateAngle = (point1, vertex, point2) => {
    if (!point1 || !vertex || !point2) return 0;

    const angle1 = Math.atan2(point1.y - vertex.y, point1.x - vertex.x);
    const angle2 = Math.atan2(point2.y - vertex.y, point2.x - vertex.x);

    let angle = angle2 - angle1;
    angle = angle * (180 / Math.PI);

    if (angle < 0) angle += 360;

    return angle;
};

/**
 * Normalize landmarks to canvas coordinates
 * @param {Array} landmarks - MediaPipe normalized landmarks (0-1)
 * @param {number} width - Canvas width
 * @param {number} height - Canvas height
 * @returns {Array} Denormalized landmarks
 */
export const denormalizeLandmarks = (landmarks, width, height) => {
    if (!landmarks) return [];

    return landmarks.map(point => ({
        x: point.x * width,
        y: point.y * height,
        z: point.z || 0
    }));
};

/**
 * Check if face is looking straight at camera
 * @param {Array} landmarks
 * @returns {Object} {isStraight, yaw, pitch, roll}
 */
export const checkFaceOrientation = (landmarks) => {
    if (!landmarks || landmarks.length < 468) {
        return { isStraight: false, yaw: 0, pitch: 0, roll: 0 };
    }

    // Calculate yaw (left-right rotation)
    const leftEye = landmarks[33];
    const rightEye = landmarks[263];
    const nose = landmarks[1];

    const eyeDistance = calculateDistance(leftEye, rightEye);
    const leftNoseDistance = calculateDistance(leftEye, nose);
    const rightNoseDistance = calculateDistance(rightEye, nose);

    const yaw = ((leftNoseDistance - rightNoseDistance) / eyeDistance) * 100;

    // Calculate pitch (up-down rotation)
    const foreheadTop = landmarks[10];
    const chin = landmarks[152];
    const noseTip = landmarks[4];

    const faceHeight = calculateDistance(foreheadTop, chin);
    const noseToTop = calculateDistance(noseTip, foreheadTop);
    const noseToBottom = calculateDistance(noseTip, chin);

    const pitch = ((noseToTop - noseToBottom) / faceHeight) * 100;

    // Calculate roll (tilt)
    const eyeAngle = Math.atan2(
        rightEye.y - leftEye.y,
        rightEye.x - leftEye.x
    ) * (180 / Math.PI);

    const roll = eyeAngle;

    // Determine if face is straight (within thresholds)
    const isStraight =
        Math.abs(yaw) < 15 &&
        Math.abs(pitch) < 15 &&
        Math.abs(roll) < 10;

    return {
        isStraight,
        yaw: Math.round(yaw),
        pitch: Math.round(pitch),
        roll: Math.round(roll)
    };
};

/**
 * Detect if mouth is open
 * @param {Array} landmarks
 * @returns {Object} {isOpen, openness}
 */
export const detectMouthOpen = (landmarks) => {
    if (!landmarks) return { isOpen: false, openness: 0 };

    const upperLip = landmarks[13];
    const lowerLip = landmarks[14];
    const leftMouth = landmarks[61];
    const rightMouth = landmarks[291];

    const mouthHeight = calculateDistance(upperLip, lowerLip);
    const mouthWidth = calculateDistance(leftMouth, rightMouth);

    const openness = (mouthHeight / mouthWidth) * 100;
    const isOpen = openness > 15;

    return {
        isOpen,
        openness: Math.round(openness)
    };
};

/**
 * Detect if eyes are closed
 * @param {Array} landmarks
 * @returns {Object} {leftClosed, rightClosed, bothClosed}
 */
export const detectEyesClosed = (landmarks) => {
    if (!landmarks) {
        return { leftClosed: false, rightClosed: false, bothClosed: false };
    }

    // Left eye
    const leftEyeTop = landmarks[159];
    const leftEyeBottom = landmarks[145];
    const leftEyeLeft = landmarks[33];
    const leftEyeRight = landmarks[133];

    const leftEyeHeight = calculateDistance(leftEyeTop, leftEyeBottom);
    const leftEyeWidth = calculateDistance(leftEyeLeft, leftEyeRight);
    const leftEyeRatio = leftEyeHeight / leftEyeWidth;

    // Right eye
    const rightEyeTop = landmarks[386];
    const rightEyeBottom = landmarks[374];
    const rightEyeLeft = landmarks[362];
    const rightEyeRight = landmarks[263];

    const rightEyeHeight = calculateDistance(rightEyeTop, rightEyeBottom);
    const rightEyeWidth = calculateDistance(rightEyeLeft, rightEyeRight);
    const rightEyeRatio = rightEyeHeight / rightEyeWidth;

    const threshold = 0.15;
    const leftClosed = leftEyeRatio < threshold;
    const rightClosed = rightEyeRatio < threshold;

    return {
        leftClosed,
        rightClosed,
        bothClosed: leftClosed && rightClosed
    };
};

/**
 * Detect smile
 * @param {Array} landmarks
 * @returns {Object} {isSmiling, intensity}
 */
export const detectSmile = (landmarks) => {
    if (!landmarks) return { isSmiling: false, intensity: 0 };

    const leftMouth = landmarks[61];
    const rightMouth = landmarks[291];
    const upperLip = landmarks[0];
    const lowerLip = landmarks[17];

    const mouthWidth = calculateDistance(leftMouth, rightMouth);
    const mouthHeight = calculateDistance(upperLip, lowerLip);

    // Smile typically widens mouth
    const ratio = mouthWidth / mouthHeight;
    const intensity = Math.min(100, Math.max(0, (ratio - 2) * 50));
    const isSmiling = intensity > 30;

    return {
        isSmiling,
        intensity: Math.round(intensity)
    };
};

export default {
    FACE_MESH_INDICES,
    getPoints,
    getCenterPoint,
    getBoundingBox,
    calculateDistance,
    calculateAngle,
    denormalizeLandmarks,
    checkFaceOrientation,
    detectMouthOpen,
    detectEyesClosed,
    detectSmile
};
