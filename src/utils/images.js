export const getImageUrl = (path, fallback = '/assets/placeholders/default.svg') => {
    if (!path) return fallback;
    const baseUrl = import.meta.env.PROD ? '' : '';
    const fullPath = `${baseUrl}${path}`;

    // Check if image exists (in production, this always returns the path)
    return fullPath;
};
