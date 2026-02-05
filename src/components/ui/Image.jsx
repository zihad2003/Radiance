import { useState, useEffect } from 'react';
import { getImageUrl } from '../../utils/imageHelpers';

/**
 * Image Component with Error Handling and Fallbacks
 * 
 * @param {string} src - The image source URL
 * @param {string} alt - Alt text for accessibility
 * @param {string} category - Category for specialized fallbacks (skincare, makeup, spa)
 * @param {string} className - Additional CSS classes
 */
export default function Image({
    src,
    alt,
    category = 'default',
    className = '',
    ...props
}) {
    const [imgSrc, setImgSrc] = useState(getImageUrl(src, category));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setImgSrc(getImageUrl(src, category));
        setError(false);
        setLoading(true);
    }, [src, category]);

    const handleError = () => {
        if (!error) {
            setError(true);
            setImgSrc(getImageUrl(null, category));
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
