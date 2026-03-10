/**
 * LocalFind AI Security Module
 * Handles input sanitization, rate limiting, and security checks
 */

class AISecurityManager {
  constructor(config) {
    this.config = config;
    this.requestLog = [];
    this.blockedIPs = new Set();
    this.suspiciousPatterns = 0;
  }

  /**
   * Sanitize user input to prevent XSS and injection attacks
   */
  sanitizeInput(input) {
    if (!this.config.security.sanitizeInput) return input;

    // Check input length
    if (input.length > this.config.security.maxInputLength) {
      throw new Error(`Input exceeds maximum length of ${this.config.security.maxInputLength} characters`);
    }

    // Remove dangerous patterns
    let sanitized = input;
    this.config.security.blockPatterns.forEach(pattern => {
      if (pattern.test(sanitized)) {
        this.suspiciousPatterns++;
        this.logSecurityEvent('BLOCKED_PATTERN', { pattern: pattern.toString(), input: input.substring(0, 50) });
        throw new Error('Input contains potentially dangerous content');
      }
    });

    // HTML encode special characters
    sanitized = sanitized
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');

    // Decode back for processing (but keep log of original)
    return input.trim();
  }

  /**
   * Check rate limits
   */
  checkRateLimit() {
    if (!this.config.rateLimit.enabled) return true;

    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    const oneHourAgo = now - 3600000;

    // Clean old requests
    this.requestLog = this.requestLog.filter(timestamp => timestamp > oneHourAgo);

    // Count recent requests
    const requestsLastMinute = this.requestLog.filter(timestamp => timestamp > oneMinuteAgo).length;
    const requestsLastHour = this.requestLog.length;

    // Check limits
    if (requestsLastMinute >= this.config.rateLimit.maxRequestsPerMinute) {
      this.logSecurityEvent('RATE_LIMIT_MINUTE', { count: requestsLastMinute });
      throw new Error('Rate limit exceeded. Please wait a moment before trying again.');
    }

    if (requestsLastHour >= this.config.rateLimit.maxRequestsPerHour) {
      this.logSecurityEvent('RATE_LIMIT_HOUR', { count: requestsLastHour });
      throw new Error('Hourly rate limit exceeded. Please try again later.');
    }

    // Log this request
    this.requestLog.push(now);
    return true;
  }

  /**
   * Validate API response
   */
  validateResponse(response) {
    if (!response) {
      throw new Error('Empty response received');
    }

    // Check for suspicious content in response
    const responseText = JSON.stringify(response);
    if (responseText.length > 50000) {
      this.logSecurityEvent('SUSPICIOUS_RESPONSE_SIZE', { size: responseText.length });
      throw new Error('Response size exceeds safety limits');
    }

    return true;
  }

  /**
   * Log security events
   */
  logSecurityEvent(eventType, details) {
    const event = {
      type: eventType,
      timestamp: new Date().toISOString(),
      details: details,
      userAgent: navigator.userAgent
    };

    if (this.config.debug) {
      console.warn('[AI Security]', event);
    }

    // Store in localStorage for monitoring
    try {
      const events = JSON.parse(localStorage.getItem('ai_security_events') || '[]');
      events.push(event);
      // Keep only last 100 events
      if (events.length > 100) events.shift();
      localStorage.setItem('ai_security_events', JSON.stringify(events));
    } catch (e) {
      // Ignore storage errors
    }
  }

  /**
   * Get security statistics
   */
  getSecurityStats() {
    return {
      totalRequests: this.requestLog.length,
      suspiciousPatterns: this.suspiciousPatterns,
      blockedIPs: this.blockedIPs.size,
      recentEvents: this.getRecentSecurityEvents()
    };
  }

  /**
   * Get recent security events
   */
  getRecentSecurityEvents() {
    try {
      return JSON.parse(localStorage.getItem('ai_security_events') || '[]').slice(-10);
    } catch (e) {
      return [];
    }
  }

  /**
   * Reset rate limits (for testing)
   */
  resetRateLimits() {
    this.requestLog = [];
    this.suspiciousPatterns = 0;
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AISecurityManager;
}
