import { useEffect, useRef } from 'react';
import { FACE_MESH_INDICES, getPoints } from '../../utils/faceLandmarks';

const FaceCanvas = ({ activeMakeup, landmarks, videoRef, beautySettings }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current || !videoRef.current || !landmarks) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        const video = videoRef.current;

        // Sync canvas size
        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 1. SKIN SMOOTHING (Beauty Filter)
        if (beautySettings && beautySettings.smoothing > 0) {
            renderSkinSmoothing(ctx, landmarks, video, beautySettings.smoothing);
        }

        // 2. Render Makeup Layers
        if (activeMakeup.face) {
            renderFoundation(ctx, landmarks, activeMakeup.face);
        }
        if (activeMakeup.eyes) {
            renderEyes(ctx, landmarks, activeMakeup.eyes);
        }
        if (activeMakeup.blush) {
            renderBlush(ctx, landmarks, activeMakeup.blush);
        }
        if (activeMakeup.lips) {
            renderLips(ctx, landmarks, activeMakeup.lips);
        }

    }, [landmarks, activeMakeup, videoRef, beautySettings]);

    // --- RENDER FUNCTIONS ---

    const renderSkinSmoothing = (ctx, mesh, video, intensity) => {
        if (!mesh) return;
        const indices = FACE_MESH_INDICES.face; // Use face oval or similar large area

        // Create a temporary canvas for the blur mask
        // Note: Creating canvas every frame is expensive in React, 
        // ideally this should be a ref, but for MVP implementation:
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = ctx.canvas.width;
        tempCanvas.height = ctx.canvas.height;
        const tempCtx = tempCanvas.getContext('2d');

        // Draw Skin Mask (Face Outline - Eyes - Mouth)
        tempCtx.beginPath();
        const facePath = getPoints(mesh, FACE_MESH_INDICES.faceOval);
        if (facePath.length > 0) {
            tempCtx.moveTo(facePath[0].x, facePath[0].y);
            for (let i = 1; i < facePath.length; i++) tempCtx.lineTo(facePath[i].x, facePath[i].y);
            tempCtx.closePath();
        }
        tempCtx.fillStyle = '#FFFFFF';
        tempCtx.fill();

        // Cut out eyes and mouth from the mask
        tempCtx.globalCompositeOperation = 'destination-out';

        // Eyes
        [FACE_MESH_INDICES.eyes.leftEye, FACE_MESH_INDICES.eyes.rightEye].forEach(eyeIdx => {
            const eye = getPoints(mesh, eyeIdx);
            tempCtx.beginPath();
            if (eye.length > 0) {
                tempCtx.moveTo(eye[0].x, eye[0].y);
                for (let i = 1; i < eye.length; i++) tempCtx.lineTo(eye[i].x, eye[i].y);
                tempCtx.closePath();
                tempCtx.fill();
            }
        });

        // Mouth
        const mouth = getPoints(mesh, FACE_MESH_INDICES.lips.inner);
        tempCtx.beginPath();
        if (mouth.length > 0) {
            tempCtx.moveTo(mouth[0].x, mouth[0].y);
            for (let i = 1; i < mouth.length; i++) tempCtx.lineTo(mouth[i].x, mouth[i].y);
            tempCtx.closePath();
            tempCtx.fill(); // Cut out mouth
        }

        // Reset Ops for drawing video
        tempCtx.globalCompositeOperation = 'source-in';
        tempCtx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);

        // Apply Blur
        // Since context filter applies to drawing, we need to draw *this* canvas back to itself or main?
        // Actually, standard canvas 'filter' property is supported in most modern browsers.
        // But blurring the *whole* mask content is what we want.

        ctx.save();
        ctx.globalAlpha = intensity / 100; // opacity based on smoothing level (0-1)
        ctx.filter = `blur(${intensity / 5}px)`; // Max blur ~20px
        ctx.drawImage(tempCanvas, 0, 0);
        ctx.filter = 'none';
        ctx.restore();
    };

    const renderFoundation = (ctx, mesh, style) => {
        // Similar to smoothing but applies color
        if (!mesh) return;
        const points = getPoints(mesh, FACE_MESH_INDICES.faceOval);
        if (points.length === 0) return;

        ctx.save();
        ctx.globalAlpha = style.opacity || 0.2;
        ctx.globalCompositeOperation = 'multiply'; // or 'hard-light'

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
        ctx.closePath();

        ctx.fillStyle = style.color;
        ctx.filter = 'blur(30px)'; // Soft edges
        ctx.fill();
        ctx.restore();
    };

    const renderLips = (ctx, mesh, style) => {
        if (!mesh) return;
        const indices = FACE_MESH_INDICES.lips;

        ctx.save();

        // 1. Create Lip Path
        const path = new Path2D();
        const upper = getPoints(mesh, indices.upperOuter);
        const lower = getPoints(mesh, indices.lowerOuter);

        // Outer loop
        if (upper.length > 0) {
            path.moveTo(upper[0].x, upper[0].y);
            for (let i = 1; i < upper.length; i++) path.lineTo(upper[i].x, upper[i].y);
            // Connect to lower
            for (let i = lower.length - 1; i >= 0; i--) path.lineTo(lower[i].x, lower[i].y);
            path.closePath();
        }

        // Inner hole
        const innerPath = new Path2D();
        const inner = getPoints(mesh, indices.inner);
        if (inner.length > 0) {
            innerPath.moveTo(inner[0].x, inner[0].y);
            for (let i = 1; i < inner.length; i++) innerPath.lineTo(inner[i].x, inner[i].y);
            innerPath.closePath();
        }

        // Combined Path (Outer - Inner)
        const lipShape = new Path2D();
        lipShape.addPath(path);
        lipShape.addPath(innerPath);

        // 2. Base Color Layer
        ctx.fillStyle = style.color;

        // Adaptive Opacity based on finish
        let baseOpacity = style.opacity || 0.6;
        if (style.finish === 'sheer') baseOpacity *= 0.5;
        if (style.finish === 'matte') baseOpacity = Math.min(baseOpacity + 0.1, 1.0);

        ctx.globalAlpha = baseOpacity;

        // Blend Modes
        if (style.finish === 'matte') ctx.globalCompositeOperation = 'multiply';
        else if (style.finish === 'glossy') ctx.globalCompositeOperation = 'multiply'; // Base is still dark
        else if (style.finish === 'shimmer') ctx.globalCompositeOperation = 'overlay';
        else ctx.globalCompositeOperation = 'multiply';

        ctx.fill(lipShape, "evenodd");

        // 3. Textures & Finishes using Clipping Mask
        ctx.save();
        ctx.clip(lipShape, "evenodd"); // Clip all subsequent drawing to lips

        // GLOSSY HIGHLIGHTS
        if (style.finish === 'glossy' || style.finish === 'satin') {
            ctx.globalCompositeOperation = 'screen';
            ctx.filter = 'blur(4px)';
            ctx.globalAlpha = style.finish === 'glossy' ? 0.6 : 0.3;

            // Highlight: Vertical gradient approximation (simulating wetness light reflection)
            const bounds = getBounds(upper.concat(lower));
            const grad = ctx.createLinearGradient(bounds.minX, bounds.minY, bounds.minX, bounds.maxY);
            grad.addColorStop(0.3, 'rgba(255,255,255,0)');
            grad.addColorStop(0.5, 'rgba(255,255,255,0.8)');
            grad.addColorStop(0.7, 'rgba(255,255,255,0)');

            ctx.fillStyle = grad;
            ctx.fill(lipShape, "evenodd");
            ctx.filter = 'none';
        }

        // METALLIC / FROST
        if (style.finish === 'metallic' || style.texture === 'metallic') {
            ctx.globalCompositeOperation = 'color-dodge';
            ctx.globalAlpha = 0.4;
            const bounds = getBounds(upper.concat(lower));
            const grad = ctx.createRadialGradient(
                bounds.centerX, bounds.centerY, 1,
                bounds.centerX, bounds.centerY, bounds.width
            );
            grad.addColorStop(0, style.color); // Bright center
            grad.addColorStop(1, '#000000');
            ctx.fillStyle = grad;
            ctx.fill(lipShape, "evenodd");
        }

        // SHIMMER / GLITTER
        if (style.finish === 'shimmer' || style.texture === 'shimmer') {
            ctx.globalCompositeOperation = 'lighter';
            ctx.globalAlpha = 0.5;
            // Draw random noise
            for (let i = 0; i < 50; i++) {
                const x = Math.random() * ctx.canvas.width;
                const y = Math.random() * ctx.canvas.height;
                ctx.beginPath();
                ctx.arc(x, y, 1.5, 0, Math.PI * 2);
                ctx.fillStyle = 'white';
                ctx.fill();
            }
        }

        ctx.restore(); // Remove clip
        ctx.restore(); // Restore context
    };

    const renderEyes = (ctx, mesh, style) => {
        if (!mesh) return;
        const indices = FACE_MESH_INDICES.eyes;

        ctx.save();
        ctx.filter = 'blur(10px)'; // Soft blend mandatory for eyes
        ctx.fillStyle = style.color;
        ctx.globalAlpha = style.opacity || 0.4;
        ctx.globalCompositeOperation = style.finish === 'shimmer' ? 'overlay' : 'multiply';

        drawPoly(ctx, mesh, indices.leftEyeshadow, true);
        ctx.fill();
        drawPoly(ctx, mesh, indices.rightEyeshadow, true);
        ctx.fill();

        // Eyeliner (New)
        if (style.category === 'eyeliner') {
            ctx.filter = 'blur(1px)';
            ctx.lineWidth = 2;
            ctx.strokeStyle = style.color;
            ctx.globalAlpha = 1.0;
            drawPoly(ctx, mesh, indices.leftEyeshadow, false); // Just stroke top line
            ctx.stroke();
        }

        ctx.restore();
    };

    const renderBlush = (ctx, mesh, style) => {
        if (!mesh) return;
        const indices = FACE_MESH_INDICES.cheeks;

        ctx.save();
        ctx.globalCompositeOperation = 'multiply';
        ctx.globalAlpha = style.opacity || 0.3;
        ctx.filter = 'blur(25px)'; // Heavy blur for natural look

        drawGradientBlush(ctx, mesh, indices.left, style.color);
        drawGradientBlush(ctx, mesh, indices.right, style.color);

        ctx.restore();
    };

    // --- HELPERS ---

    const drawGradientBlush = (ctx, mesh, cheekDef, color) => {
        const center = mesh[cheekDef.center];
        if (!center) return;

        const perim = mesh[cheekDef.perimeter[0]];
        const radius = Math.sqrt(Math.pow(center.x - perim.x, 2) + Math.pow(center.y - perim.y, 2)) * 1.5;

        ctx.beginPath();
        ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
    };

    const drawPoly = (ctx, mesh, indices, close = false) => {
        const points = getPoints(mesh, indices);
        if (points.length === 0) return;

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
        if (close) ctx.closePath();
    };

    const getBounds = (points) => {
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        points.forEach(p => {
            if (p.x < minX) minX = p.x;
            if (p.x > maxX) maxX = p.x;
            if (p.y < minY) minY = p.y;
            if (p.y > maxY) maxY = p.y;
        });
        return {
            minX, minY, maxX, maxY,
            width: maxX - minX,
            height: maxY - minY,
            centerX: (minX + maxX) / 2,
            centerY: (minY + maxY) / 2
        };
    };
};

export default FaceCanvas;
