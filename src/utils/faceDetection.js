import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import * as tf from '@tensorflow/tfjs';

let detector = null;

export const initFaceDetection = async () => {
    if (detector) return detector;

    const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
    const detectorConfig = {
        runtime: 'tfjs',
        refineLandmarks: true, // Crucial for lips and eyes precision
        maxFaces: 1
    };

    console.log("Loading Face Mesh Model...");
    detector = await faceLandmarksDetection.createDetector(model, detectorConfig);
    console.log("Face Mesh Model Loaded");
    return detector;
};

export const detectFaceLandmarks = async (videoElement) => {
    if (!detector || !videoElement || videoElement.readyState < 2) return null;

    try {
        const faces = await detector.estimateFaces(videoElement, {
            flipHorizontal: false // We usually flip the video via CSS, so keep raw coords or flip if logic requires
        });

        if (faces.length > 0) {
            return faces[0];
        }
    } catch (error) {
        console.error("Detection Error:", error);
    }
    return null;
};

// Simple heuristic for face shape
export const calculateFaceShape = (keypoints) => {
    if (!keypoints) return "oval";

    // MediaPipe Keypoint indices (approximate)
    // 10: Top of forehead
    // 152: Bottom of chin
    // 234: Left cheekbone
    // 454: Right cheekbone
    // 162: Left jaw corner (approx)
    // 389: Right jaw corner (approx)

    const points = (indices) => indices.map(i => keypoints[i]);
    const dist = (p1, p2) => Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));

    const p = (i) => keypoints[i];

    // Safety check
    if (!p(10) || !p(152) || !p(234) || !p(454)) return "oval";

    const faceLength = dist(p(10), p(152));
    const cheekWidth = dist(p(234), p(454));
    // Jaw width is tricky with just single points, we use approximate jaw corners
    // 58, 288 are often used for jawline width in some maps, or 172/397. Let's use 234/454 for cheeks roughly.

    const ratio = faceLength / cheekWidth;

    if (ratio > 1.5) return "oblong";
    if (ratio < 1.15) return "round";
    if (ratio < 1.3) return "square"; // Rough approximation

    return "oval"; // Default
};

// Heuristic Gender Guess (Very rough, mostly for demo)
export const guessGender = (keypoints) => {
    // Men often have wider jaws relative to cheeks compared to women
    // This is just a placeholder physics-based guess.
    return Math.random() > 0.5 ? "female" : "female"; // Defaulting to female for a salon app is safer initially
};
