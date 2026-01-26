let detector = null;
let faceLandmarksDetection = null;

export const initFaceDetection = async () => {
    if (detector) return detector;

    if (!faceLandmarksDetection) {
        faceLandmarksDetection = await import('@tensorflow-models/face-landmarks-detection');
        await import('@tensorflow/tfjs');
    }

    const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
    const detectorConfig = {
        runtime: 'tfjs',
        refineLandmarks: true,
        maxFaces: 2 // Allow detecting 2 to warn user
    };

    detector = await faceLandmarksDetection.createDetector(model, detectorConfig);
    return detector;
};

export const detectFaceLandmarks = async (videoElement) => {
    if (!detector || !videoElement || videoElement.readyState < 2) return null;

    try {
        const faces = await detector.estimateFaces(videoElement, {
            flipHorizontal: false
        });

        if (faces.length > 0) {
            // Return all faces so component can check for "Only one face" rule
            return faces;
        }
    } catch (error) {
        console.error("Detection Error:", error);
    }
    return null;
};

/**
 * Centering & Quality Analytics for Camera View
 */
export const analyzeFaceGeometry = (face, videoWidth, videoHeight) => {
    if (!face || !face.keypoints) return null;

    const kp = face.keypoints;
    const center = kp[5]; // Nose tip
    const leftCheek = kp[234];
    const rightCheek = kp[454];
    const top = kp[10];
    const bottom = kp[152];

    const faceWidth = Math.abs(rightCheek.x - leftCheek.x);
    const faceHeight = Math.abs(bottom.y - top.y);

    // Centering score (0-1, 1 is center)
    const centerX = videoWidth / 2;
    const centerY = videoHeight / 2;
    const distFromCenter = Math.sqrt(Math.pow(center.x - centerX, 2) + Math.pow(center.y - centerY, 2));
    const maxDist = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
    const centeringScore = 1 - (distFromCenter / (maxDist * 0.5));

    // Coverage Score (Target ~70% of height)
    const heightCoverage = faceHeight / videoHeight;

    let status = "good";
    let message = "";

    if (heightCoverage < 0.3) {
        status = "warning";
        message = "Please move closer to the camera";
    } else if (heightCoverage > 0.9) {
        status = "warning";
        message = "Please move further away";
    } else if (centeringScore < 0.6) {
        status = "warning";
        message = "Please center your face in the frame";
    }

    return {
        status,
        message,
        center,
        coverage: heightCoverage,
        score: centeringScore
    };
};

export const calculateFaceShape = (keypoints) => {
    if (!keypoints) return "oval";
    const dist = (p1, p2) => Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    const p = (i) => keypoints[i];
    if (!p(10) || !p(152) || !p(234) || !p(454)) return "oval";

    const faceLength = dist(p(10), p(152));
    const cheekWidth = dist(p(234), p(454));
    const ratio = faceLength / cheekWidth;

    if (ratio > 1.5) return "oblong";
    if (ratio < 1.15) return "round";
    return "oval";
};
