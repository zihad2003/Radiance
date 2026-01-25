import { useEffect, useRef } from 'react';

const FaceCanvas = ({ videoRef, landmarks, activeMakeup }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current || !videoRef.current || !landmarks) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const video = videoRef.current;

        // Sync canvas size
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Render Makeup
        if (activeMakeup.lips) {
            renderLips(ctx, landmarks, activeMakeup.lips);
        }
        if (activeMakeup.eyes) {
            // renderEyes(ctx, landmarks, activeMakeup.eyes);
        }
        if (activeMakeup.blush) {
            // renderBlush(ctx, landmarks, activeMakeup.blush);
        }

    }, [landmarks, activeMakeup]);

    const renderLips = (ctx, mesh, style) => {
        if (!mesh) return;

        // MediaPipe indices for lips
        const upperLipIndices = [61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291, 308, 415, 310, 311, 312, 13, 82, 81, 80, 191, 78];
        const lowerLipIndices = [61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 324, 318, 402, 317, 14, 87, 178, 88, 95, 78];

        // Helper to get coords
        const p = (index) => {
            const pt = mesh[index]; // array [x,y,z] or object {x,y,z} depending on output format. 
            // face-landmarks-detection often returns .x .y .z in 'keypoints'
            return pt;
        };

        ctx.save();
        ctx.fillStyle = style.color;
        ctx.globalAlpha = style.opacity || 0.5;
        if (style.finish === 'glossy') {
            ctx.globalCompositeOperation = 'overlay'; // Shine effect
        } else {
            ctx.globalCompositeOperation = 'multiply'; // Matte/Natural blend
        }

        ctx.beginPath();
        // Upper Lip
        upperLipIndices.forEach((id, i) => {
            const pt = p(id);
            if (i === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
        });
        ctx.fill();

        ctx.beginPath();
        // Lower Lip
        lowerLipIndices.forEach((id, i) => {
            const pt = p(id);
            if (i === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
        });
        ctx.fill();

        ctx.restore();
    };

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
        />
    );
};

export default FaceCanvas;
