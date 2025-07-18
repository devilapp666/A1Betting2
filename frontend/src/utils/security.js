import DOMPurify from 'dompurify';
import { v4 as uuidv4 } from 'uuid';
// CSRF Token management
let csrfToken = null;
const CSRF_HEADER = 'X-CSRF-Token';
const TOKEN_EXPIRY = 3600000; // 1 hour
let tokenExpiry = null;
export function generateCSRFToken() {
    csrfToken = uuidv4();
    tokenExpiry = Date.now() + TOKEN_EXPIRY;
    return csrfToken;
}
export function validateCSRFToken(token) {
    if (!token || !csrfToken || !tokenExpiry) {
        return false;
    }
    if (Date.now() > tokenExpiry) {
        csrfToken = null;
        tokenExpiry = null;
        return false;
    }
    return token === csrfToken;
}
export function getCSRFToken() {
    if (!csrfToken || !tokenExpiry || Date.now() > tokenExpiry) {
        return generateCSRFToken();
    }
    return csrfToken;
}
// Input Sanitization
export function sanitizeInput(input) {
    return DOMPurify.sanitize(input, {
        ALLOWED_TAGS: [], // No HTML allowed
        ALLOWED_ATTR: [] // No attributes allowed
    }).trim();
}
export function sanitizeObject(obj) {
    const sanitized = {};
    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'string') {
            sanitized[key] = sanitizeInput(value);
        }
        else if (value && typeof value === 'object' && !Array.isArray(value)) {
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                sanitized[key] = sanitizeObject(value);
            }
            else {
                sanitized[key] = value;
            }
        }
        else if (Array.isArray(value)) {
            sanitized[key] = value.map(item => typeof item === 'string' ? sanitizeInput(item) :
                item && typeof item === 'object' ? sanitizeObject(item) :
                    item);
        }
        else {
            sanitized[key] = value;
        }
    }
    return sanitized;
}
// Security Headers
export function getSecurityHeaders() {
    return {
        'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:;",
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
        'Referrer-Policy': 'strict-origin-when-cross-origin'
    };
}
// Input Validation
export function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}
export function validatePassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}
export function validateUsername(username) {
    // 3-20 characters, letters, numbers, underscores, hyphens
    const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
    return usernameRegex.test(username);
}
// Rate Limiting Headers
export function getRateLimitHeaders(remaining, reset) {
    return {
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': reset.toString()
    };
}
