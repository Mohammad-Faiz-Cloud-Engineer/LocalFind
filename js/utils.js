/**
 * Utility functions for production-grade operations
 * Reserved for future use - currently not imported by any module
 * 
 * To use these utilities, import them in your JavaScript files:
 * Example: import { debounce, isValidEmail } from './utils.js';
 */

(function() {
  'use strict';

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
    debounce,
    isValidEmail,
    isValidPhone,
    handleError,
    formatDate,
    encodeParams
  };
})();
