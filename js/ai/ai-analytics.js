/**
 * LocalFind AI Analytics Module
 * Tracks usage, performance, and errors for optimization
 */

class AIAnalytics {
  constructor(config) {
    this.config = config;
    this.sessionId = this.generateSessionId();
    this.events = [];
    this.performance = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      averageResponseTime: 0,
      totalResponseTime: 0
    };
  }

  /**
   * Generate unique session ID
   */
  generateSessionId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Track query event
   */
  trackQuery(query, metadata = {}) {
    if (!this.config.analytics.enabled || !this.config.analytics.trackQueries) return;

    const event = {
      type: 'QUERY',
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
      query: query.substring(0, 100), // Truncate for privacy
      queryLength: query.length,
      metadata: metadata,
      page: window.location.pathname,
      userAgent: navigator.userAgent
    };

    this.events.push(event);
    this.pruneEvents();
    this.persistEvents();
  }

  /**
   * Track response event
   */
  trackResponse(query, response, responseTime, cached = false) {
    if (!this.config.analytics.enabled) return;

    this.performance.totalRequests++;
    this.performance.successfulRequests++;
    this.performance.totalResponseTime += responseTime;
    this.performance.averageResponseTime = 
      this.performance.totalResponseTime / this.performance.successfulRequests;

    const event = {
      type: 'RESPONSE',
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
      responseTime: responseTime,
      responseLength: response.length,
      cached: cached,
      page: window.location.pathname
    };

    this.events.push(event);
    this.pruneEvents();
    this.persistEvents();
  }

  /**
   * Track error event
   */
  trackError(error, context = {}) {
    if (!this.config.analytics.enabled || !this.config.analytics.trackErrors) return;

    this.performance.totalRequests++;
    this.performance.failedRequests++;

    const event = {
      type: 'ERROR',
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
      error: error.message || error.toString(),
      errorType: error.name || 'Unknown',
      context: context,
      page: window.location.pathname,
      userAgent: navigator.userAgent
    };

    this.events.push(event);
    this.pruneEvents();
    this.persistEvents();

    if (this.config.debug) {
      console.error('[AI Analytics] Error tracked:', event);
    }
  }

  /**
   * Track performance metric
   */
  trackPerformance(metric, value, metadata = {}) {
    if (!this.config.analytics.enabled || !this.config.analytics.trackPerformance) return;

    const event = {
      type: 'PERFORMANCE',
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
      metric: metric,
      value: value,
      metadata: metadata
    };

    this.events.push(event);
    this.pruneEvents();
    this.persistEvents();
  }

  /**
   * Get analytics summary
   */
  getSummary() {
    const now = Date.now();
    const oneHourAgo = now - 3600000;
    const oneDayAgo = now - 86400000;

    const recentEvents = this.events.filter(e => 
      new Date(e.timestamp).getTime() > oneHourAgo
    );

    const dailyEvents = this.events.filter(e => 
      new Date(e.timestamp).getTime() > oneDayAgo
    );

    return {
      session: {
        id: this.sessionId,
        startTime: this.events[0]?.timestamp || new Date().toISOString(),
        totalEvents: this.events.length
      },
      performance: {
        ...this.performance,
        successRate: this.performance.totalRequests > 0 
          ? ((this.performance.successfulRequests / this.performance.totalRequests) * 100).toFixed(2) + '%'
          : '0%',
        averageResponseTime: Math.round(this.performance.averageResponseTime) + 'ms'
      },
      recent: {
        lastHour: recentEvents.length,
        lastDay: dailyEvents.length,
        queries: recentEvents.filter(e => e.type === 'QUERY').length,
        errors: recentEvents.filter(e => e.type === 'ERROR').length
      },
      topErrors: this.getTopErrors(),
      popularQueries: this.getPopularQueryPatterns()
    };
  }

  /**
   * Get top errors
   */
  getTopErrors() {
    const errors = this.events.filter(e => e.type === 'ERROR');
    const errorCounts = {};

    errors.forEach(e => {
      const key = e.errorType || 'Unknown';
      errorCounts[key] = (errorCounts[key] || 0) + 1;
    });

    return Object.entries(errorCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([error, count]) => ({ error, count }));
  }

  /**
   * Get popular query patterns
   */
  getPopularQueryPatterns() {
    const queries = this.events.filter(e => e.type === 'QUERY');
    const patterns = {};

    queries.forEach(e => {
      // Extract first 3 words as pattern
      const words = e.query.toLowerCase().split(' ').slice(0, 3).join(' ');
      patterns[words] = (patterns[words] || 0) + 1;
    });

    return Object.entries(patterns)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([pattern, count]) => ({ pattern, count }));
  }

  /**
   * Prune old events (keep last 1000)
   */
  pruneEvents() {
    if (this.events.length > 1000) {
      this.events = this.events.slice(-1000);
    }
  }

  /**
   * Persist events to localStorage
   */
  persistEvents() {
    try {
      const data = {
        sessionId: this.sessionId,
        events: this.events.slice(-100), // Keep last 100
        performance: this.performance,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('ai_analytics', JSON.stringify(data));
    } catch (e) {
      // Ignore storage errors
      if (this.config.debug) {
        console.warn('[AI Analytics] Failed to persist:', e);
      }
    }
  }

  /**
   * Load persisted events
   */
  loadPersistedEvents() {
    try {
      const data = JSON.parse(localStorage.getItem('ai_analytics') || '{}');
      if (data.events) {
        this.events = data.events;
      }
      if (data.performance) {
        this.performance = { ...this.performance, ...data.performance };
      }
    } catch (e) {
      // Ignore load errors
    }
  }

  /**
   * Export analytics data
   */
  exportData() {
    return {
      summary: this.getSummary(),
      events: this.events,
      performance: this.performance,
      exportedAt: new Date().toISOString()
    };
  }

  /**
   * Clear all analytics data
   */
  clear() {
    this.events = [];
    this.performance = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      averageResponseTime: 0,
      totalResponseTime: 0
    };
    localStorage.removeItem('ai_analytics');
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AIAnalytics;
}
