/**
 * Utility functions for production-grade operations
 */

/**
 * Sanitize HTML to prevent XSS attacks
 * @param {string} str - Input string to sanitize
 * @returns {string} Sanitized HTML string
 */
export function sanitizeHTML(str) {
  if (typeof str !== 'string') return '';
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
}

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid email format
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid phone format
 */
export function isValidPhone(phone) {
  const phoneRegex = /^[\d\s\+\-\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

/**
 * Show loading spinner
 * @param {HTMLElement} element - Element to show spinner in
 */
export function showLoading(element) {
  if (!element) return;
  element.classList.add('loading');
  element.setAttribute('aria-busy', 'true');
}

/**
 * Hide loading spinner
 * @param {HTMLElement} element - Element to hide spinner from
 */
export function hideLoading(element) {
  if (!element) return;
  element.classList.remove('loading');
  element.setAttribute('aria-busy', 'false');
}

/**
 * Handle API errors gracefully
 * @param {Error} error - Error object
 * @returns {string} User-friendly error message
 */
export function handleError(error) {
  console.error('Application error:', error);
  
  if (error.message.includes('network')) {
    return 'Network error. Please check your connection and try again.';
  }
  
  if (error.message.includes('timeout')) {
    return 'Request timed out. Please try again.';
  }
  
  return 'An unexpected error occurred. Please try again later.';
}

/**
 * Format date for display
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Encode URL parameters safely
 * @param {Object} params - Parameters object
 * @returns {string} Encoded URL query string
 */
export function encodeParams(params) {
  return Object.keys(params)
    .filter(key => params[key] !== null && params[key] !== undefined)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
}
