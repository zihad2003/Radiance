/**
 * Custom Error class for Application specific errors
 */
export class AppError extends Error {
    constructor(message, code = 'UNKNOWN_ERROR', details = null) {
        super(message);
        this.name = 'AppError';
        this.code = code;
        this.details = details;
    }
}

/**
 * Error class for User Authentication issues
 */
export class AuthError extends AppError {
    constructor(message, details = null) {
        super(message, 'AUTH_ERROR', details);
        this.name = 'AuthError';
    }
}

/**
 * Error class for API/Network issues
 */
export class NetworkError extends AppError {
    constructor(message, details = null) {
        super(message, 'NETWORK_ERROR', details);
        this.name = 'NetworkError';
    }
}

/**
 * Error class for Validation issues
 */
export class ValidationError extends AppError {
    constructor(message, details = null) {
        super(message, 'VALIDATION_ERROR', details);
        this.name = 'ValidationError';
    }
}

/**
 * Helper to standardise error logging
 * @param {Error} error 
 * @param {String} context 
 */
export const logError = (error, context = '') => {
    // In production, this would send to Sentry/LogRocket
    const timestamp = new Date().toISOString();
    console.group(`[${timestamp}] Error Encountered ${context ? `in ${context}` : ''}`);
    console.error(`Name: ${error.name}`);
    console.error(`Message: ${error.message}`);
    if (error.code) console.error(`Code: ${error.code}`);
    if (error.details) console.error('Details:', error.details);
    if (error.stack) console.debug(error.stack);
    console.groupEnd();
};

/**
 * Helper to format error messages for user display
 * @param {Error} error 
 * @returns {String} User friendly message
 */
export const getErrorMessage = (error) => {
    if (error instanceof AppError) {
        return error.message;
    }
    // Handle Convex errors mainly
    if (error.message && error.message.includes('Convex')) {
        // Strip technical details if needed or return friendly default
        return error.message;
    }
    if (error.name === 'TypeError') {
        return 'We ran into a slight glitch. Please try again.';
    }
    return error.message || 'An unexpected error occurred.';
};
