import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const HairOverlay = ({
    style,
    color,
    analysis,
    transform,
    opacity = 1,
    hue = 0,
    saturation = 1,
    brightness = 1
}) => {
    // Current Wig Placement Logic
    // Using the face bounding box and keypoints for initial center
    const [styleLoaded, setStyleLoaded] = useState(false);

    useEffect(() => {
        setStyleLoaded(false);
    }, [style]);

    // Calculate Base Position (percentage of container)
    // analysis.box contains { xMin, yMin, width, height } in original image px
    const topPct = (analysis.box.yMin / analysis.originalHeight) * 100;
    const leftPct = (analysis.box.xMin / analysis.originalWidth) * 100;
    const wPct = (analysis.box.width / analysis.originalWidth) * 100;
    const hPct = (analysis.box.height / analysis.originalHeight) * 100;

    // The "Wig" needs to be centered on the face box top
    // Heuristic: Most hair assets are taller than the face. 
    // We anchor it at the top of the forehead (landmark 10)
    const forehead = analysis.keypoints[10];
    const foreheadX = (forehead.x / analysis.originalWidth) * 100;
    const foreheadY = (forehead.y / analysis.originalHeight) * 100;

    // Base Width: 2x the face box width usually looks right for hair
    const baseW = wPct * 2.2;
    const baseH = hPct * 2.8;

    // Build CSS Filter for Color modification
    const getSFilter = () => {
        if (!color) return `hue-rotate(${hue}deg) saturate(${saturation}) brightness(${brightness})`;

        // If it's a hex color, we use a complex filter or just overlay?
        // Let's use a simpler approach for now:
        if (color.category === 'fashion') {
            return `sepia(1) saturate(3) hue-rotate(${parseInt(color.hex.slice(1), 16) % 360}deg) brightness(0.8) contrast(1.2)`;
        }
        if (color.category === 'natural') {
            // For natural colors, we just darken/lighten and add a slight tint
            return `brightness(${color.name.includes('Blonde') ? 1.5 : 0.6}) contrast(1.1) saturate(0.8)`;
        }
        return `brightness(${brightness}) saturate(${saturation})`;
    };

    return (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                animate={{
                    opacity: opacity,
                    scale: transform.scale,
                    x: `${foreheadX - (baseW / 2) + transform.x}%`,
                    y: `${foreheadY - (baseH * 0.2) + transform.y}%`, // Offset upwards to forehead
                    rotate: transform.rotate
                }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                style={{
                    position: 'absolute',
                    width: `${baseW}%`,
                    height: `${baseH}%`,
                    transformOrigin: 'center top',
                    pointerEvents: 'none'
                }}
            >
                {/* Visual Blending Mask */}
                <div
                    className="w-full h-full bg-contain bg-no-repeat bg-top"
                    style={{
                        backgroundImage: `url(${style.image})`,
                        filter: getSFilter(),
                        mixBlendMode: 'normal',
                    }}
                />

                {/* If highlight color (gradient) - we can't easily filter to a gradient, 
                    so we might use an overlay with blend mode 'color' or 'multiply' */}
                {color?.category === 'highlight' && (
                    <div
                        className="absolute inset-0 bg-top bg-no-repeat bg-contain"
                        style={{
                            backgroundImage: `url(${style.image})`,
                            backgroundBlendMode: 'color',
                            background: color.hex,
                            opacity: 0.5,
                            maskImage: `url(${style.image})`,
                            WebkitMaskImage: `url(${style.image})`,
                            maskSize: 'contain',
                            WebkitMaskSize: 'contain',
                        }}
                    />
                )}
            </motion.div>
        </div>
    );
};

export default HairOverlay;
