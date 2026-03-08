/**
 * Utility functions for production-grade operations
 * 
 * USAGE NOTE: These utilities are available globally via window.Utils
 * They are automatically loaded but not actively used in the current codebase.
 * Consider integrating them for enhanced functionality:
 * 
 * - debounce: Use in search inputs (directory.js, map-main.js)
 * - isValidEmail/isValidPhone: Use in form.js for validation
 * - handleError: Use in API calls when backend is integrated
 * - sanitizeHTML: CRITICAL - Use everywhere to prevent XSS (already used in multiple files)
 * 
 * To use: window.Utils.debounce(func, 300)
 */

(function() {
  'use strict';

  /**
   * Security: HTML sanitization function to prevent XSS attacks
   * CRITICAL: Use this for ALL user-generated content before rendering
   * @param {string} str - String to sanitize
   * @returns {string} Sanitized string
   */
  function sanitizeHTML(str) {
    if (!str) return '';
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
  function debounce(func, wait) {
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
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate phone number format
   * @param {string} phone - Phone number to validate
   * @returns {boolean} True if valid phone format
   */
  function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  }

  /**
   * Handle API errors gracefully
   * @param {Error} error - Error object
   * @returns {string} User-friendly error message
   */
  function handleError(error) {
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
  function formatDate(date) {
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
  function encodeParams(params) {
    return Object.keys(params)
      .filter(key => params[key] !== null && params[key] !== undefined)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
  }

  // Export utilities to window object for global access
  window.Utils = {
    sanitizeHTML,
    debounce,
    isValidEmail,
    isValidPhone,
    handleError,
    formatDate,
    encodeParams
  };
})();
