/**
 * Captures the current makeup look by combining video feed and overlay canvas.
 * @param {HTMLVideoElement} video 
 * @param {HTMLCanvasElement} canvas 
 * @returns {Promise<string>} Base64 Data URL of the combined image
 */
export const captureLook = async (video, canvas) => {
    if (!video || !canvas) return null;

    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = video.videoWidth;
    outputCanvas.height = video.videoHeight;
    const ctx = outputCanvas.getContext('2d');

    // 1. Draw Video
    // We need to handle mirroring if the video style is mirrored
    ctx.save();
    ctx.scale(-1, 1); // Mirror
    ctx.drawImage(video, -outputCanvas.width, 0, outputCanvas.width, outputCanvas.height);
    ctx.restore();

    // 2. Draw Makeup Layer (Canvas)
    // The canvas is already aligned, but check if it needs mirroring too
    // FaceCanvas is usually drawn to match the video. If video is mirrored via CSS, canvas is usually drawn to match the mirrored coordinate space OR unmirrored.
    // In our MakeupStudio:
    // video className="transform -scale-x-100" (CSS Mirror)
    // FaceCanvas className="absolute..." (Overlay)
    // The landmarks are usually detected on the raw video (unmirrored). So the canvas drawing is unmirrored relative to raw video?
    // If we draw raw mesh coords, they match the raw video.
    // If we flip the video *element* with CSS, we physically see a mirror.
    // If we draw the canvas overlay with the raw coords, it won't align with the flipped video unless we ALSO flip the canvas with CSS.
    // Let's assume MakeupStudio flips both or neither.
    // MakeupStudio: video has -scale-x-100.
    // FaceCanvas usually needs to match.
    // If I just draw canvas on top of "drawn" video, I might need to respect the CSS transform logic.

    // Safer approach: Draw the canvas exactly as it is.
    // If the canvas itself relies on CSS mirroring to match the video, we need to manually mirror it here.
    // BUT, usually FaceCanvas is transparent.

    ctx.save();
    ctx.scale(-1, 1); // Mirror canvas too if it was relying on CSS mirror
    ctx.drawImage(canvas, -outputCanvas.width, 0, outputCanvas.width, outputCanvas.height);
    ctx.restore();

    // 3. Add Watermark
    ctx.font = '24px "Playfair Display", serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText('Radiance Salon', 20, outputCanvas.height - 20);

    return outputCanvas.toDataURL('image/png');
};

export const downloadImage = (dataUrl, filename = 'radiance-look.png') => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
