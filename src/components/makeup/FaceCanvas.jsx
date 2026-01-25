import { useEffect, useRef } from 'react';
import { FACE_MESH_INDICES, getPoints } from '../../utils/faceLandmarks';

const FaceCanvas = ({ activeMakeup, landmarks, videoRef }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current || !videoRef.current || !landmarks) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        const video = videoRef.current;

        // Sync canvas size if needed (usually handled by CSS, but good for internal resolution)
        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Render Makeup Layers
        if (activeMakeup.eyes) {
            renderEyes(ctx, landmarks, activeMakeup.eyes);
        }
        if (activeMakeup.blush) {
            renderBlush(ctx, landmarks, activeMakeup.blush);
        }
        if (activeMakeup.lips) {
            renderLips(ctx, landmarks, activeMakeup.lips);
        }

    }, [landmarks, activeMakeup, videoRef]);

    const renderLips = (ctx, mesh, style) => {
        if (!mesh) return;
        const indices = FACE_MESH_INDICES.lips;

        ctx.save();

        const outerPath = new Path2D();
        const upper = getPoints(mesh, indices.upperOuter);
        const lower = getPoints(mesh, indices.lowerOuter);

        if (upper.length > 0 && lower.length > 0) {
            outerPath.moveTo(upper[0].x, upper[0].y);
            for (let i = 1; i < upper.length; i++) outerPath.lineTo(upper[i].x, upper[i].y);
            // LowerOuter indices typically go Right -> Left in some maps, but here we defined them Left -> Right in faceLandmarks (standard mesh order).
            // To close the loop: Upper ends at RightCorner. Lower Ends at RightCorner.
            // We need to trace Lower backwards from RightCorner to LeftCorner.
            for (let i = lower.length - 1; i >= 0; i--) outerPath.lineTo(lower[i].x, lower[i].y);
            outerPath.closePath();
        }

        // Inner Hole (Mouth opening)
        const innerPath = new Path2D();
        const inner = getPoints(mesh, indices.inner);
        if (inner.length > 0) {
            innerPath.moveTo(inner[0].x, inner[0].y);
            for (let i = 1; i < inner.length; i++) innerPath.lineTo(inner[i].x, inner[i].y);
            innerPath.closePath();
        }

        const combinedPath = new Path2D();
        combinedPath.addPath(outerPath);
        combinedPath.addPath(innerPath);

        // 1. Draw Color
        ctx.fillStyle = style.color;
        ctx.globalAlpha = style.opacity || 0.6;
        ctx.globalCompositeOperation = style.finish === 'glossy' ? 'overlay' : 'multiply';
        if (style.finish === 'matte') ctx.globalCompositeOperation = 'multiply';

        // "evenodd" rule creates the hole if wound correctly, or just by geometry intersection
        ctx.fill(combinedPath, "evenodd");

        // 2. Gloss Highlight
        if (style.finish === 'glossy') {
            ctx.globalCompositeOperation = 'soft-light';
            ctx.fillStyle = '#FFFFFF';
            ctx.globalAlpha = 0.4;
            ctx.fill(combinedPath, "evenodd");

            // Add extra shine details?
            ctx.globalCompositeOperation = 'source-over';
            ctx.filter = 'blur(2px)';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            // Draw small highlight on lower lip center?
            // Simplified: just leave the soft-light
            ctx.filter = 'none';
        }

        ctx.restore();
    };

    const renderEyes = (ctx, mesh, style) => {
        if (!mesh) return;
        const indices = FACE_MESH_INDICES.eyes;

        ctx.save();
        ctx.fillStyle = style.color;
        ctx.globalAlpha = style.opacity || 0.3;
        ctx.globalCompositeOperation = 'multiply';
        ctx.filter = 'blur(8px)'; // Heavy blur for soft eyeshadow blend

        // Left Eye
        drawPoly(ctx, mesh, indices.leftEyeshadow, true);
        ctx.fill();

        // Right Eye
        drawPoly(ctx, mesh, indices.rightEyeshadow, true);
        ctx.fill();

        ctx.restore();
    };

    const renderBlush = (ctx, mesh, style) => {
        if (!mesh) return;
        const indices = FACE_MESH_INDICES.cheeks;

        ctx.save();
        ctx.globalCompositeOperation = 'multiply';
        ctx.globalAlpha = style.opacity || 0.3;
        // Blush needs to be very soft
        ctx.filter = 'blur(20px)';

        // Left Blush
        drawGradientBlush(ctx, mesh, indices.left, style.color);
        // Right Blush
        drawGradientBlush(ctx, mesh, indices.right, style.color);

        ctx.restore();
    };

    const drawGradientBlush = (ctx, mesh, cheekDef, color) => {
        const center = mesh[cheekDef.center];
        if (!center) return;

        const perim = mesh[cheekDef.perimeter[0]];
        // Approx radius
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

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
        />
    );
};

export default FaceCanvas;
