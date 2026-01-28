import { useState } from 'react';

/**
 * Image Component with Error Handling and Fallbacks
 * 
 * @param {string} src - The image source URL (absolute path from public)
 * @param {string} alt - Alt text for accessibility
 * @param {string} fallback - Fallback image if the main src fails
 * @param {string} className - Additional CSS classes
 */
export default function Image({
    src,
    alt,
    fallback = '/assets/placeholders/product.svg',
    className = '',
    ...props
}) {
    const [imgSrc, setImgSrc] = useState(src);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const handleError = () => {
        if (!error) {
            setError(true);
            setImgSrc(fallback);
            setLoading(false);
        }
    };

    const handleLoad = () => {
        setLoading(false);
    };

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {loading && !error && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
            )}
            <img
                src={imgSrc}
                alt={alt || "Radiance Beauty"}
                onError={handleError}
                onLoad={handleLoad}
                className={`w-full h-full object-cover ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                {...props}
            />
        </div>
    );
}
