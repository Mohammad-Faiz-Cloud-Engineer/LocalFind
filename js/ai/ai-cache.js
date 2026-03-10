/**
 * LocalFind AI Cache Manager
 * Implements intelligent caching with TTL and LRU eviction
 */

class AICacheManager {
  constructor(config) {
    this.config = config;
    this.cache = new Map();
    this.accessLog = new Map();
    this.stats = {
      hits: 0,
      misses: 0,
      evictions: 0
    };
  }

  /**
   * Generate cache key from query
   */
  generateKey(query, context = {}) {
    const normalized = query.toLowerCase().trim();
    const contextStr = JSON.stringify(context);
    return `${normalized}:${this.hashCode(contextStr)}`;
  }

  /**
   * Simple hash function for context
   */
  hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString(36);
  }

  /**
   * Get cached response
   */
  get(query, context = {}) {
    if (!this.config.cache.enabled) return null;

    const key = this.generateKey(query, context);
    const cached = this.cache.get(key);

    if (!cached) {
      this.stats.misses++;
      return null;
    }

    // Check TTL
    const now = Date.now();
    if (now - cached.timestamp > this.config.cache.ttl) {
      this.cache.delete(key);
      this.accessLog.delete(key);
      this.stats.misses++;
      return null;
    }

    // Update access time for LRU
    this.accessLog.set(key, now);
    this.stats.hits++;

    if (this.config.debug) {
      console.log('[AI Cache] HIT:', key, `(${this.stats.hits}/${this.stats.hits + this.stats.misses})`);
    }

    return cached.response;
  }

  /**
   * Set cached response
   */
  set(query, response, context = {}) {
    if (!this.config.cache.enabled) return;

    const key = this.generateKey(query, context);
    const now = Date.now();

    // Check cache size and evict if necessary
    if (this.cache.size >= this.config.cache.maxSize) {
      this.evictLRU();
    }

    this.cache.set(key, {
      response: response,
      timestamp: now,
      query: query
    });

    this.accessLog.set(key, now);

    if (this.config.debug) {
      console.log('[AI Cache] SET:', key, `(size: ${this.cache.size}/${this.config.cache.maxSize})`);
    }
  }

  /**
   * Evict least recently used entry
   */
  evictLRU() {
    let oldestKey = null;
    let oldestTime = Infinity;

    for (const [key, time] of this.accessLog.entries()) {
      if (time < oldestTime) {
        oldestTime = time;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
      this.accessLog.delete(oldestKey);
      this.stats.evictions++;

      if (this.config.debug) {
        console.log('[AI Cache] EVICTED:', oldestKey);
      }
    }
  }

  /**
   * Clear all cache
   */
  clear() {
    this.cache.clear();
    this.accessLog.clear();
    if (this.config.debug) {
      console.log('[AI Cache] CLEARED');
    }
  }

  /**
   * Get cache statistics
   */
  getStats() {
    const total = this.stats.hits + this.stats.misses;
    return {
      ...this.stats,
      hitRate: total > 0 ? (this.stats.hits / total * 100).toFixed(2) + '%' : '0%',
      size: this.cache.size,
      maxSize: this.config.cache.maxSize
    };
  }

  /**
   * Prune expired entries
   */
  prune() {
    const now = Date.now();
    let pruned = 0;

    for (const [key, cached] of this.cache.entries()) {
      if (now - cached.timestamp > this.config.cache.ttl) {
        this.cache.delete(key);
        this.accessLog.delete(key);
        pruned++;
      }
    }

    if (this.config.debug && pruned > 0) {
      console.log('[AI Cache] PRUNED:', pruned, 'expired entries');
    }

    return pruned;
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AICacheManager;
}
