import DOMPurify from 'dompurify';

/**
 * Basic Input Sanitization
 * Removes potentially dangerous tags and attributes.
 * Since we don't have DOMPurify installed in package.json yet, 
 * we will use a basic REGEX approach for now, or assume this file will be updated 
 * after `npm install dompurify` is run (recommended).
 * 
 * For this implementation, we will use a robust regex replacement 
 * to strip <script> tags and 'on*' event attributes to prevent basic XSS.
 */

export const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;

    // 1. Remove script tags
    let clean = input.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "");

    // 2. Remove event handlers (e.g., onclick, onload)
    clean = clean.replace(/ on\w+="[^"]*"/g, "");

    // 3. Escape HTML entities (Basic)
    clean = clean
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    return clean;
};

/**
 * Validates Email Format
 */
export const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
};

/**
 * Validates Phone Number (Bangladesh Context mostly, but generic enough)
 */
export const validatePhone = (phone) => {
    // Allows +, spaces, dashes, brackets, 10-15 digits
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(String(phone));
};

/**
 * Checks if the current environment is secure (HTTPS or Localhost)
 */
export const isSecureContext = () => {
    return window.isSecureContext;
};
