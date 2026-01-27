import React from 'react';

/**
 * OptimizedImage Component
 * 
 * Implements modern image best practices:
 * 1. Lazy loading by default (configurable via priority prop)
 * 2. WebP format negotiation using the <picture> tag
 * 3. Async decoding for off-screen images to prevent main thread blocking
 * 
 * @param {string} src - Source path of the fallback image (jpg/png)
 * @param {string} alt - Alt text for accessibility
 * @param {string} className - CSS classes
 * @param {boolean} priority - If true, loads eagerly (use for Hero images). Default: false
 * @param {boolean} useWebP - If true, attempts to load a .webp sibling. Default: false
 */
const OptimizedImage = ({
    src,
    alt,
    className,
    width,
    height,
    priority = false,
    style,
    useWebP = false, // Set to true only if you are sure .webp variant exists
    onClick
}) => {

    // Naive WebP path generation
    const webpSrc = useWebP ? src.replace(/\.(png|jpe?g)$/i, '.webp') : null;

    return (
        <picture className={className ? `block ${className}` : 'block'}>
            {webpSrc && (
                <source srcSet={webpSrc} type="image/webp" />
            )}
            <img
                src={src}
                alt={alt || "Radiance Beauty"}
                className={`w-full h-full object-cover ${className || ''}`}
                width={width}
                height={height}
                loading={priority ? "eager" : "lazy"}
                decoding={priority ? "auto" : "async"}
                style={style}
                onClick={onClick}
            />
        </picture>
    );
};

export default OptimizedImage;
