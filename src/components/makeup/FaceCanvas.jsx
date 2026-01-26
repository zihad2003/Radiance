import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { FACE_MESH_INDICES, getPoints } from '../../utils/faceLandmarks';

// --- ENHANCED RENDER FUNCTIONS (Moved outside to be reachable) ---

const setupTempCanvas = (ref, width, height) => {
    if (!ref.current) {
        ref.current = document.createElement('canvas');
    }
    if (ref.current.width !== width || ref.current.height !== height) {
        ref.current.width = width;
        ref.current.height = height;
    }
    return ref.current.getContext('2d');
};

const renderSkinSmoothing = (ctx, mesh, video, intensity, tempCanvasRef) => {
    const tempCtx = setupTempCanvas(tempCanvasRef, ctx.canvas.width, ctx.canvas.height);
    tempCtx.clearRect(0, 0, tempCtx.canvas.width, tempCtx.canvas.height);

    // Define the face area to be smoothed
    const faceOval = getPoints(mesh, [10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109]);

    tempCtx.fillStyle = 'white';
    tempCtx.beginPath();
    if (faceOval.length > 0) {
        tempCtx.moveTo(faceOval[0].x, faceOval[0].y);
        faceOval.forEach(p => tempCtx.lineTo(p.x, p.y));
        tempCtx.closePath();
        tempCtx.fill();
    }

    // Exclude Eyes and Mouth from Smoothing to keep sharpness
    tempCtx.globalCompositeOperation = 'destination-out';

    // Eyes
    [[33, 160, 158, 133, 153, 144], [362, 385, 387, 263, 373, 380]].forEach(eyeIndices => {
        const eye = getPoints(mesh, eyeIndices);
        tempCtx.beginPath();
        if (eye.length > 0) {
            tempCtx.moveTo(eye[0].x, eye[0].y);
            eye.forEach(p => tempCtx.lineTo(p.x, p.y));
            tempCtx.closePath();
            tempCtx.fill();
        }
    });

    // Mouth
    const mouthIndices = [78, 191, 80, 81, 82, 13, 312, 311, 310, 415, 308, 324, 318, 402, 317, 14, 87, 178, 88, 95];
    const mouth = getPoints(mesh, mouthIndices);
    tempCtx.beginPath();
    if (mouth.length > 0) {
        tempCtx.moveTo(mouth[0].x, mouth[0].y);
        mouth.forEach(p => tempCtx.lineTo(p.x, p.y));
        tempCtx.closePath();
        tempCtx.fill();
    }

    // Clip source video to face mask and apply blur
    tempCtx.globalCompositeOperation = 'source-in';
    tempCtx.drawImage(video, 0, 0);

    ctx.save();
    ctx.globalAlpha = intensity / 100 * 0.8; // Capped for realism
    ctx.filter = `blur(${intensity / 10}px)`; // Dynamic blur based on setting
    ctx.drawImage(tempCtx.canvas, 0, 0);
    ctx.restore();
};

const renderFoundation = (ctx, mesh, style) => {
    const oval = getPoints(mesh, [10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109]);
    if (oval.length === 0) return;

    ctx.save();
    ctx.globalAlpha = style.opacity || 0.2;
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = style.color;

    ctx.beginPath();
    ctx.moveTo(oval[0].x, oval[0].y);
    oval.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.closePath();

    ctx.filter = 'blur(15px)';
    ctx.fill();
    ctx.restore();
};

const renderLips = (ctx, mesh, style) => {
    const upper = getPoints(mesh, [61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291]);
    const lower = getPoints(mesh, [146, 91, 181, 84, 17, 314, 405, 321, 375, 291]);
    const inner = getPoints(mesh, [78, 191, 80, 81, 82, 13, 312, 311, 310, 415, 308, 324, 318, 402, 317, 14, 87, 178, 88, 95]);

    if (upper.length === 0 || lower.length === 0) return;

    const lipPath = new Path2D();
    lipPath.moveTo(upper[0].x, upper[0].y);
    upper.forEach(p => lipPath.lineTo(p.x, p.y));
    [...lower].reverse().forEach(p => lipPath.lineTo(p.x, p.y));
    lipPath.closePath();

    // Inner hole for mouth open
    const innerPath = new Path2D();
    if (inner.length > 0) {
        innerPath.moveTo(inner[0].x, inner[0].y);
        inner.forEach(p => innerPath.lineTo(p.x, p.y));
        innerPath.closePath();
    }

    ctx.save();
    ctx.fillStyle = style.color;
    ctx.globalAlpha = style.opacity;

    // Finish handling
    if (style.finish === 'matte') {
        ctx.globalCompositeOperation = 'multiply';
    } else if (style.finish === 'glossy') {
        ctx.globalCompositeOperation = 'multiply';
    } else {
        ctx.globalCompositeOperation = 'soft-light';
    }

    ctx.fill(lipPath, 'evenodd');

    // Add Gloss/Highlights
    if (style.finish === 'glossy') {
        ctx.clip(lipPath);
        ctx.globalCompositeOperation = 'screen';
        ctx.globalAlpha = 0.5;
        const grad = ctx.createLinearGradient(0, lower[0].y - 20, 0, lower[0].y + 20);
        grad.addColorStop(0, 'rgba(255,255,255,0)');
        grad.addColorStop(0.5, 'rgba(255,255,255,0.8)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = grad;
        ctx.fill(lipPath);
    }

    ctx.restore();
};

const renderEyes = (ctx, mesh, style) => {
    const left = getPoints(mesh, [226, 247, 30, 29, 27, 28, 56, 190, 243, 173, 157, 158, 159, 160, 161, 246]);
    const right = getPoints(mesh, [463, 414, 286, 258, 257, 259, 260, 467, 446, 398, 384, 385, 386, 387, 388, 466]);

    ctx.save();
    ctx.fillStyle = style.color;
    ctx.globalAlpha = style.opacity;
    ctx.filter = 'blur(8px)';
    ctx.globalCompositeOperation = 'multiply';

    [left, right].forEach(pts => {
        if (pts.length === 0) return;
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        pts.forEach(p => ctx.lineTo(p.x, p.y));
        ctx.closePath();
        ctx.fill();
    });
    ctx.restore();
};

const renderBlush = (ctx, mesh, style) => {
    const leftCenter = mesh[50];
    const rightCenter = mesh[280];

    ctx.save();
    ctx.fillStyle = style.color;
    ctx.globalAlpha = style.opacity;
    ctx.globalCompositeOperation = 'multiply';
    ctx.filter = 'blur(25px)';

    [leftCenter, rightCenter].forEach(center => {
        if (!center) return;
        ctx.beginPath();
        ctx.arc(center.x, center.y, 45, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.restore();
};

const FaceCanvas = forwardRef(({ activeMakeup, landmarks, videoRef, beautySettings }, ref) => {
    const internalCanvasRef = useRef(null);
    const tempCanvasRef = useRef(null);

    useImperativeHandle(ref, () => internalCanvasRef.current);

    useEffect(() => {
        if (!internalCanvasRef.current || !videoRef.current || !landmarks) return;

        const canvas = internalCanvasRef.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        const video = videoRef.current;

        // Sync canvas size to video aspect
        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 1. SKIN SMOOTHING (Beauty Filter)
        if (beautySettings && beautySettings.smoothing > 0) {
            renderSkinSmoothing(ctx, landmarks, video, beautySettings.smoothing, tempCanvasRef);
        }

        // 2. FACIAL ADORNMENTS (Makeup Layers)
        ctx.save();

        // Foundation / Base
        if (activeMakeup.face && activeMakeup.face.color) {
            renderFoundation(ctx, landmarks, activeMakeup.face);
        }

        // Eyes (Shadow + Liner)
        if (activeMakeup.eyes && activeMakeup.eyes.color) {
            renderEyes(ctx, landmarks, activeMakeup.eyes);
        }

        // Cheeks (Blush)
        if (activeMakeup.blush && activeMakeup.blush.color) {
            renderBlush(ctx, landmarks, activeMakeup.blush);
        }

        // Lips (Multiple finishes)
        if (activeMakeup.lips && activeMakeup.lips.color) {
            renderLips(ctx, landmarks, activeMakeup.lips);
        }

        ctx.restore();

    }, [landmarks, activeMakeup, videoRef, beautySettings]);

    return (
        <canvas
            ref={internalCanvasRef}
            className="w-full h-full"
            style={{ filter: `blur(${beautySettings.vignette / 2}px)` }}
        />
    );
});

export default FaceCanvas;
