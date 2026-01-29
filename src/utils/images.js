export const PLACEHOLDER = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23f5f3ef" width="400" height="400"/%3E%3Ctext fill="%23c5a059" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle" font-family="serif" font-style="italic" font-size="24"%3ERadiance Beauty Salon%3C/text%3E%3C/svg%3E';

/**
 * Construct valid image URLs with fallback logic
 */
export const getImageUrl = (path, fallback = PLACEHOLDER) => {
    if (!path) return fallback;
    const baseUrl = import.meta.env.PROD ? '' : '';
    const fullPath = `${baseUrl}${path}`;

    // Return full path, relying on onError for complex fallbacks
    return fullPath;
};
