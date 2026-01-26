import { useState, useEffect, useRef } from 'react';

/**
 * LazyImage Component
 * Implements lazy loading with Intersection Observer API
 * Supports WebP with fallback, responsive images, and blur-up effect
 */
const LazyImage = ({
    src,
    alt,
    className = '',
    width,
    height,
    srcSet,
    sizes,
    loading = 'lazy',
    decoding = 'async',
    onLoad,
    onError,
    placeholder = 'blur',
    quality = 75,
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [hasError, setHasError] = useState(false);
    const imgRef = useRef(null);

    // Intersection Observer for lazy loading
    useEffect(() => {
        if (!imgRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                        observer.disconnect();
                    }
                });
            },
            {
                rootMargin: '50px', // Start loading 50px before entering viewport
                threshold: 0.01,
            }
        );

        observer.observe(imgRef.current);

        return () => {
            if (imgRef.current) {
                observer.unobserve(imgRef.current);
            }
        };
    }, []);

    const handleLoad = (e) => {
        setIsLoaded(true);
        onLoad?.(e);
    };

    const handleError = (e) => {
        setHasError(true);
        onError?.(e);
    };

    // Generate WebP source if original is JPG/PNG
    const getWebPSource = (originalSrc) => {
        if (!originalSrc) return null;
        const ext = originalSrc.split('.').pop()?.toLowerCase();
        if (['jpg', 'jpeg', 'png'].includes(ext)) {
            return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        }
        return null;
    };

    const webpSrc = getWebPSource(src);

    // Placeholder blur effect
    const placeholderStyle = placeholder === 'blur' ? {
        filter: isLoaded ? 'none' : 'blur(20px)',
        transform: isLoaded ? 'scale(1)' : 'scale(1.1)',
        transition: 'filter 0.3s ease, transform 0.3s ease',
    } : {};

    return (
        <div
            ref={imgRef}
            className={`relative overflow-hidden ${className}`}
            style={{ width, height }}
        >
            {/* Low quality placeholder */}
            {!isLoaded && placeholder === 'blur' && (
                <div
                    className="absolute inset-0 bg-gray-200 animate-pulse"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width || 400} ${height || 300}'%3E%3Crect fill='%23f3f4f6' width='${width || 400}' height='${height || 300}'/%3E%3C/svg%3E")`,
                    }}
                />
            )}

            {/* Actual image with WebP support */}
            {isInView && !hasError && (
                <picture>
                    {webpSrc && (
                        <source
                            type="image/webp"
                            srcSet={webpSrc}
                            sizes={sizes}
                        />
                    )}
                    <img
                        src={src}
                        alt={alt}
                        width={width}
                        height={height}
                        srcSet={srcSet}
                        sizes={sizes}
                        loading={loading}
                        decoding={decoding}
                        onLoad={handleLoad}
                        onError={handleError}
                        className={`w-full h-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                        style={{
                            ...placeholderStyle,
                            transition: 'opacity 0.3s ease',
                        }}
                        {...props}
                    />
                </picture>
            )}

            {/* Error fallback */}
            {hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
            )}
        </div>
    );
};

export default LazyImage;
