/**
 * Security Utilities - XSS Protection & Input Validation
 * Production-Grade Security Implementation
 */

(function() {
  'use strict';

  /**
   * Comprehensive HTML sanitization using DOMPurify-like approach
   * Protects against XSS attacks
   */
  function sanitizeHTML(dirty) {
    if (typeof dirty !== 'string') return '';
    
    // Create a temporary element
    const temp = document.createElement('div');
    temp.textContent = dirty;
    
    // Additional protection: remove any remaining script-like patterns
    let clean = temp.innerHTML;
    
    // Remove javascript: protocol
    clean = clean.replace(/javascript:/gi, '');
    
    // Remove on* event handlers
    clean = clean.replace(/on\w+\s*=/gi, '');
    
    // Remove data: URIs (potential XSS vector)
    clean = clean.replace(/data:text\/html/gi, '');
    
    return clean;
  }

  /**
   * Sanitize URL - prevent open redirect and XSS via URL
   * @param {string} url - URL to sanitize
   * @param {Array} allowedProtocols - Allowed URL protocols
   * @returns {string|null} Sanitized URL or null if invalid
   */
  function sanitizeURL(url, allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:']) {
    if (!url || typeof url !== 'string') return null;
    
    try {
      // Trim whitespace
      url = url.trim();
      
      // Check for javascript: protocol and other dangerous patterns
      if (/^(javascript|data|vbscript):/i.test(url)) {
        console.warn('Blocked dangerous URL protocol:', url);
        return null;
      }
      
      // Parse URL
      const parsed = new URL(url, window.location.origin);
      
      // Check if protocol is allowed
      if (!allowedProtocols.includes(parsed.protocol)) {
        console.warn('Blocked disallowed protocol:', parsed.protocol);
        return null;
      }
      
      return parsed.href;
    } catch (e) {
      // Invalid URL
      console.warn('Invalid URL:', url, e);
      return null;
    }
  }

  /**
   * Validate and sanitize external URLs with whitelist
   * @param {string} url - URL to validate
   * @param {string} type - Type of URL (website, social, map, etc.)
   * @returns {string|null} Validated URL or null
   */
  function validateExternalURL(url, type = 'website') {
    if (!url) return null;
    
    const sanitized = sanitizeURL(url);
    if (!sanitized) return null;
    
    // Domain whitelists for different types
    const whitelists = {
      map: [
        'maps.google.com',
        'maps.app.goo.gl',
        'goo.gl',
        'www.google.com/maps'
      ],
      social: [
        'instagram.com',
        'www.instagram.com',
        'facebook.com',
        'www.facebook.com',
        'twitter.com',
        'x.com',
        'youtube.com',
        'www.youtube.com',
        'linkedin.com',
        'www.linkedin.com'
      ],
      whatsapp: [
        'wa.me',
        'api.whatsapp.com',
        'web.whatsapp.com'
      ],
      payment: [
        'upi'  // Special case for UPI deep links
      ],
      booking: [
        'bookmyshow.com',
        'in.bookmyshow.com',
        'district.in',
        'www.district.in'
      ],
      delivery: [
        'swiggy.com',
        'www.swiggy.com',
        'zomato.com',
        'www.zomato.com'
      ],
      bloodDonor: [
        'friends2support.org',
        'www.friends2support.org'
      ]
    };
    
    try {
      const parsed = new URL(sanitized);
      
      // Special handling for UPI links
      if (parsed.protocol === 'upi:') {
        return type === 'payment' ? sanitized : null;
      }
      
      // Check against whitelist
      const whitelist = whitelists[type] || [];
      
      // For general websites, allow all HTTPS URLs
      if (type === 'website' && parsed.protocol === 'https:') {
        return sanitized;
      }
      
      // Check if domain matches whitelist
      const hostname = parsed.hostname.toLowerCase();
      const isWhitelisted = whitelist.some(domain => 
        hostname === domain || hostname.endsWith('.' + domain)
      );
      
      if (isWhitelisted) {
        return sanitized;
      }
      
      console.warn('URL not in whitelist:', url, 'type:', type);
      return null;
      
    } catch (e) {
      console.error('URL validation error:', e);
      return null;
    }
  }

  /**
   * Validate UPI ID format
   * @param {string} upiId - UPI ID to validate
   * @returns {string|null} Validated UPI ID or null
   */
  function validateUPIId(upiId) {
    if (!upiId || typeof upiId !== 'string') return null;
    
    // UPI ID format: identifier@provider
    // identifier: 3+ alphanumeric chars, dots, hyphens, underscores
    // provider: 3+ alphabetic chars
    const upiRegex = /^[a-zA-Z0-9.\-_]{3,}@[a-zA-Z]{3,}$/;
    
    const trimmed = upiId.trim();
    
    if (!upiRegex.test(trimmed)) {
      console.warn('Invalid UPI ID format:', upiId);
      return null;
    }
    
    return trimmed;
  }

  /**
   * Sanitize text for UPI parameters
   * @param {string} text - Text to sanitize
   * @returns {string} Sanitized text
   */
  function sanitizeForUPI(text) {
    if (!text || typeof text !== 'string') return '';
    
    // Remove potentially dangerous characters
    return text
      .replace(/[<>\"'`]/g, '') // Remove HTML/script injection chars
      .replace(/[^\w\s&.-]/g, '') // Keep only safe characters
      .trim()
      .substring(0, 100); // Limit length
  }

  /**
   * Build secure UPI deep link
   * @param {Object} params - UPI parameters
   * @returns {string|null} UPI deep link or null if invalid
   */
  function buildUPIDeepLink(params) {
    const validatedUpiId = validateUPIId(params.pa);
    if (!validatedUpiId) return null;
    
    const safeParams = {
      pa: validatedUpiId,
      pn: sanitizeForUPI(params.pn || ''),
      cu: 'INR' // Always INR
    };
    
    // Add optional amount if provided
    if (params.am && /^\d+(\.\d{1,2})?$/.test(params.am)) {
      safeParams.am = params.am;
    }
    
    const queryString = Object.entries(safeParams)
      .filter(([_, value]) => value)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
    
    return `upi://pay?${queryString}`;
  }

  /**
   * Validate phone number format
   * @param {string} phone - Phone number to validate
   * @returns {string|null} Validated phone number or null
   */
  function validatePhoneNumber(phone) {
    if (!phone || typeof phone !== 'string') return null;
    
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '');
    
    // Indian phone numbers: 10 digits, optionally with +91 prefix
    if (digits.length === 10) {
      return '+91' + digits;
    } else if (digits.length === 12 && digits.startsWith('91')) {
      return '+' + digits;
    }
    
    console.warn('Invalid phone number format:', phone);
    return null;
  }

  /**
   * Validate email address
   * @param {string} email - Email to validate
   * @returns {string|null} Validated email or null
   */
  function validateEmail(email) {
    if (!email || typeof email !== 'string') return null;
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const trimmed = email.trim().toLowerCase();
    
    if (!emailRegex.test(trimmed)) {
      console.warn('Invalid email format:', email);
      return null;
    }
    
    return trimmed;
  }

  /**
   * Rate limiting utility
   * @param {Function} func - Function to rate limit
   * @param {number} delay - Delay in milliseconds
   * @returns {Function} Rate-limited function
   */
  function debounce(func, delay = 300) {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }

  /**
   * Throttle function execution
   * @param {Function} func - Function to throttle
   * @param {number} limit - Time limit in milliseconds
   * @returns {Function} Throttled function
   */
  function throttle(func, limit = 300) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Content Security Policy violation reporter
   */
  function setupCSPReporting() {
    if (typeof SecurityPolicyViolationEvent !== 'undefined') {
      document.addEventListener('securitypolicyviolation', (e) => {
        console.error('CSP Violation:', {
          blockedURI: e.blockedURI,
          violatedDirective: e.violatedDirective,
          originalPolicy: e.originalPolicy
        });
        
        // In production, send to logging service
        // reportToLoggingService(e);
      });
    }
  }

  /**
   * Sanitize object properties recursively
   * @param {Object} obj - Object to sanitize
   * @returns {Object} Sanitized object
   */
  function sanitizeObject(obj) {
    if (typeof obj !== 'object' || obj === null) {
      return typeof obj === 'string' ? sanitizeHTML(obj) : obj;
    }
    
    if (Array.isArray(obj)) {
      return obj.map(item => sanitizeObject(item));
    }
    
    const sanitized = {};
    for (const [key, value] of Object.entries(obj)) {
      sanitized[key] = sanitizeObject(value);
    }
    return sanitized;
  }

  // Initialize CSP reporting
  setupCSPReporting();

  // Export security utilities to window
  window.SecurityUtils = {
    sanitizeHTML,
    sanitizeURL,
    validateExternalURL,
    validateUPIId,
    sanitizeForUPI,
    buildUPIDeepLink,
    validatePhoneNumber,
    validateEmail,
    debounce,
    throttle,
    sanitizeObject
  };

  // Also export as global for backward compatibility
  window.sanitizeHTML = sanitizeHTML;

})();
