import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Move, ZoomIn, RotateCw } from 'lucide-react';

const HairOverlay = ({ style, color, analysis, containerWidth, containerHeight }) => {
    // Initial Positioning Logic based on Face Keypoints
    // Forehead approx: Midpoint of top face oval or between eyebrows raised
    // We can use a simpler heuristic for MVP: The Face Box.

    // Calculate initial scale/pos relative to the displayed image aspect ratio
    // This is tricky because the 'analysis.box' is in original image coordinates.
    // We rely on CSS purely for percentage placement to avoid complex math with container refs.

    const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1, rotate: 0 });
    const isDragging = useRef(false);
    const startPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // Reset transform when style changes
        setTransform({ x: 0, y: 0, scale: 1, rotate: 0 });
    }, [style]);

    // Calculate Base Position (percentage)
    const topPct = (analysis.box.yMin / analysis.originalHeight) * 100;
    const leftPct = (analysis.box.xMin / analysis.originalWidth) * 100;
    const wPct = (analysis.box.width / analysis.originalWidth) * 100;
    const hPct = (analysis.box.height / analysis.originalHeight) * 100;

    // Base Wig Metrics
    const wigBaseWidth = wPct * 2.2; // Wigs are wider than face box
    const wigBaseLeft = leftPct - (wPct * 0.6); // Centered horizontally
    const wigBaseTop = topPct - (hPct * 0.5); // Higher than face box (forehead)
    const wigBaseHeight = hPct * 2.5;

    // Color Filter Construction
    const getColorFilter = () => {
        if (!color) return 'none';
        // Simple approximation for changing hair color via CSS filters
        // Real implementation needs canvas pixel manipulation or SVG masks
        return `sepia(1) saturate(2) hue-rotate(${parseInt(color.hex.slice(1), 16) % 360}deg) brightness(0.8)`;
    };

    return (
        <div className="absolute inset-0 pointer-events-none z-20">
            {/* Draggable/Transformable Container */}
            {/* We place a wrapper at the 'estimated' correct position, then allow transforms on it */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                    position: 'absolute',
                    top: `${wigBaseTop}%`,
                    left: `${wigBaseLeft}%`,
                    width: `${wigBaseWidth}%`,
                    height: `${wigBaseHeight}%`,
                    transform: `translate(${transform.x}px, ${transform.y}px) rotate(${transform.rotate}deg) scale(${transform.scale})`,
                    transformOrigin: 'top center',
                    pointerEvents: 'auto'
                }}
                className="group cursor-move touch-none"
            >
                {/* The Wig Image */}
                <div
                    className="w-full h-full bg-no-repeat bg-contain bg-top filter drop-shadow-2xl"
                    style={{
                        backgroundImage: `url(${style.image})`,
                        mixBlendMode: 'normal', // 'multiply' for darker hair integration
                        filter: getColorFilter()
                    }}
                />

                {/* Controls (Visible on Hover/Touch) */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-2 bg-white/90 backdrop-blur-md rounded-full p-1 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity scale-75 md:scale-100">
                    <button
                        onClick={() => setTransform(p => ({ ...p, scale: p.scale - 0.1 }))}
                        className="p-2 hover:bg-gray-100 rounded-full"
                        aria-label="Zoom Out Wig"
                    >
                        <ZoomIn size={16} className="rotate-180" />
                    </button>
                    <button
                        onClick={() => setTransform(p => ({ ...p, scale: p.scale + 0.1 }))}
                        className="p-2 hover:bg-gray-100 rounded-full"
                        aria-label="Zoom In Wig"
                    >
                        <ZoomIn size={16} />
                    </button>
                    <div className="w-px bg-gray-300 mx-1" />
                    <button
                        onClick={() => setTransform(p => ({ ...p, rotate: p.rotate - 5 }))}
                        className="p-2 hover:bg-gray-100 rounded-full"
                        aria-label="Rotate Left"
                    >
                        <RotateCw size={16} className="-scale-x-100" />
                    </button>
                    <button
                        onClick={() => setTransform(p => ({ ...p, rotate: p.rotate + 5 }))}
                        className="p-2 hover:bg-gray-100 rounded-full"
                        aria-label="Rotate Right"
                    >
                        <RotateCw size={16} />
                    </button>
                    <div className="w-px bg-gray-300 mx-1" />
                    {/* Mobile Drag Handles via Buttons if touch drag fails? */}
                    {/* For now, buttons are safer than implementing custom drag logic in this snippet */}
                    <div className="grid grid-cols-3 gap-1 w-16 text-[8px] items-center text-center">
                        <div />
                        <button onClick={() => setTransform(p => ({ ...p, y: p.y - 10 }))} aria-label="Move Up">▲</button>
                        <div />
                        <button onClick={() => setTransform(p => ({ ...p, x: p.x - 10 }))} aria-label="Move Left">◀</button>
                        <Move size={12} className="mx-auto text-gray-400" />
                        <button onClick={() => setTransform(p => ({ ...p, x: p.x + 10 }))} aria-label="Move Right">▶</button>
                        <div />
                        <button onClick={() => setTransform(p => ({ ...p, y: p.y + 10 }))} aria-label="Move Down">▼</button>
                        <div />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default HairOverlay;
