export const FACE_MESH_INDICES = {
    lips: {
        upperOuter: [61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291],
        lowerOuter: [146, 91, 181, 84, 17, 314, 405, 321, 375, 291],
        upperInner: [191, 80, 81, 82, 13, 312, 311, 310, 415, 308], // Top half of mouth hole
        lowerInner: [95, 88, 178, 87, 14, 317, 402, 318, 324, 308], // Bottom half of mouth hole
        // Combined inner loop for hole subtraction
        inner: [78, 191, 80, 81, 82, 13, 312, 311, 310, 415, 308, 324, 318, 402, 317, 14, 87, 178, 88, 95]
    },
    eyes: {
        // Upper eyelid / creaseline for eyeshadow
        leftEyeshadow: [226, 247, 30, 29, 27, 28, 56, 190, 243, 173, 157, 158, 159, 160, 161, 246],
        rightEyeshadow: [463, 414, 286, 258, 257, 259, 260, 467, 446, 398, 384, 385, 386, 387, 388, 466]
    },
    cheeks: {
        // Defined as a central point + rough perimeter or logical area for gradient
        left: {
            center: 50, // Approx center of cheek
            perimeter: [116, 117, 118, 100, 126, 209, 198, 50, 205, 123]
        },
        right: {
            center: 280,
            perimeter: [345, 346, 347, 329, 355, 429, 418, 280, 425, 352]
        }
    }
};

/**
 * Helper to get actual coordinates from the flat mesh array using indices.
 * @param {Array} mesh - The keypoints array from MediaPipe
 * @param {Array} indices - List of indices
 * @returns {Array} - Array of {x, y, z} points
 */
export const getPoints = (mesh, indices) => {
    if (!mesh || !indices) return [];
    return indices.map(i => mesh[i]);
};
