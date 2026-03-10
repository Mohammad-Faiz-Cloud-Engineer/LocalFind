/**
 * LocalFind AI Smart Search
 * Intelligent search with natural language understanding and fallback
 */

class AISearch {
  constructor() {
    this.cache = new AICacheManager(AI_CONFIG);
    this.analytics = new AIAnalytics(AI_CONFIG);
    this.security = new AISecurityManager(AI_CONFIG);
    this.isSearching = false;
  }

  /**
   * Get fresh business data
   */
  getBusinessData() {
    if (!window.LISTINGS || !Array.isArray(window.LISTINGS)) {
      return [];
    }
    
    return window.LISTINGS.map(b => ({
      id: b.id,
      name: b.name,
      category: b.category,
      tags: Array.isArray(b.tags) ? b.tags : [],
      rating: b.rating || 0,
      reviewCount: b.reviewCount || 0,
      description: b.description || '',
      address: b.address || '',
      verified: b.verified || false,
      featured: b.featured || false,
      status: b.status || 'Unknown'
    }));
  }

  /**
   * AI-powered search
   */
  async search(query) {
    if (this.isSearching) {
      throw new Error('Search already in progress');
    }

    const startTime = performance.now();

    try {
      this.isSearching = true;

      // Security checks
      const sanitizedQuery = this.security.sanitizeInput(query);
      this.security.checkRateLimit();

      // Track search
      this.analytics.trackQuery(sanitizedQuery, { type: 'search' });

      // Check cache
      const cached = this.cache.get(sanitizedQuery, { type: 'search' });
      if (cached) {
        const responseTime = performance.now() - startTime;
        this.analytics.trackResponse(sanitizedQuery, JSON.stringify(cached), responseTime, true);
        return cached;
      }

      // Get business data
      const businesses = this.getBusinessData();

      if (businesses.length === 0) {
        return [];
      }

      // Try AI search first
      try {
        const results = await this.aiSearch(sanitizedQuery, businesses);
        
        // Cache results
        this.cache.set(sanitizedQuery, results, { type: 'search' });
        
        // Track response
        const responseTime = performance.now() - startTime;
        this.analytics.trackResponse(sanitizedQuery, JSON.stringify(results), responseTime, false);
        
        return results;
      } catch (aiError) {
        // Fallback to local search
        if (AI_CONFIG.debug) {
          console.warn('[AI Search] Falling back to local search:', aiError);
        }
        return this.localSearch(sanitizedQuery, businesses);
      }

    } catch (error) {
      this.analytics.trackError(error, { query, type: 'search' });
      
      // Always fallback to local search on error
      return this.localSearch(query, this.getBusinessData());
    } finally {
      this.isSearching = false;
    }
  }

  /**
   * AI-powered search using API
   */
  async aiSearch(query, businesses) {
    const prompt = `User is searching for: "${query}"

Available businesses in Rasauli, Barabanki:
${businesses.map((b, i) => `${i + 1}. ${b.name} (${b.category})
   Tags: ${b.tags.join(', ')}
   Rating: ${b.rating}★ (${b.reviewCount} reviews)
   ${b.verified ? 'VERIFIED' : ''} ${b.featured ? 'FEATURED' : ''}
   Description: ${b.description.substring(0, 100)}`).join('\n\n')}

Task: Return ONLY a JSON array of business IDs (numbers) that match the search query, ordered by relevance.
Consider: category, tags, name, description, and semantic meaning.
Return format: [1, 5, 12, 3]
Maximum: 10 results

Response:`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), AI_CONFIG.api.timeout);

    try {
      const response = await fetch(AI_CONFIG.api.primary, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: prompt }],
          temperature: 0.3, // Lower temperature for more focused results
          max_tokens: 256
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.content || data.response || data.message || '';
      
      // Extract JSON array from response
      const jsonMatch = content.match(/\[[\d,\s]+\]/);
      if (!jsonMatch) {
        throw new Error('Invalid AI response format');
      }

      const indices = JSON.parse(jsonMatch[0]);
      
      // Map indices to actual businesses
      const results = indices
        .map(i => businesses[i - 1])
        .filter(b => b !== undefined)
        .slice(0, 10);

      return results.length > 0 ? results : this.localSearch(query, businesses);

    } catch (error) {
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Local fallback search with fuzzy matching
   */
  localSearch(query, businesses) {
    if (!query || query.trim().length === 0) {
      return businesses.slice(0, 20);
    }

    const lowerQuery = query.toLowerCase().trim();
    const words = lowerQuery.split(/\s+/);

    // Score each business
    const scored = businesses.map(business => {
      let score = 0;
      const lowerName = business.name.toLowerCase();
      const lowerCategory = business.category.toLowerCase();
      const lowerDescription = business.description.toLowerCase();
      const lowerTags = business.tags.map(t => t.toLowerCase());
      const lowerAddress = business.address.toLowerCase();

      // Exact name match (highest priority)
      if (lowerName === lowerQuery) {
        score += 1000;
      }

      // Name contains query
      if (lowerName.includes(lowerQuery)) {
        score += 500;
      }

      // Category exact match
      if (lowerCategory === lowerQuery) {
        score += 400;
      }

      // Category contains query
      if (lowerCategory.includes(lowerQuery)) {
        score += 200;
      }

      // Tag exact match
      if (lowerTags.some(tag => tag === lowerQuery)) {
        score += 300;
      }

      // Tag contains query
      if (lowerTags.some(tag => tag.includes(lowerQuery))) {
        score += 150;
      }

      // Description contains query
      if (lowerDescription.includes(lowerQuery)) {
        score += 100;
      }

      // Address contains query
      if (lowerAddress.includes(lowerQuery)) {
        score += 50;
      }

      // Word-by-word matching
      words.forEach(word => {
        if (word.length < 2) return;

        if (lowerName.includes(word)) score += 50;
        if (lowerCategory.includes(word)) score += 30;
        if (lowerTags.some(tag => tag.includes(word))) score += 20;
        if (lowerDescription.includes(word)) score += 10;
      });

      // Boost for verified and featured
      if (business.verified) score += 20;
      if (business.featured) score += 10;

      // Boost for higher ratings
      score += business.rating * 5;

      return { business, score };
    });

    // Filter and sort by score
    return scored
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.business)
      .slice(0, 20);
  }

  /**
   * Get search suggestions
   */
  getSuggestions(query) {
    if (!query || query.length < 2) {
      return [];
    }

    const businesses = this.getBusinessData();
    const lowerQuery = query.toLowerCase();
    const suggestions = new Set();

    // Add matching business names
    businesses.forEach(b => {
      if (b.name.toLowerCase().includes(lowerQuery)) {
        suggestions.add(b.name);
      }
    });

    // Add matching categories
    businesses.forEach(b => {
      if (b.category.toLowerCase().includes(lowerQuery)) {
        suggestions.add(b.category);
      }
    });

    // Add matching tags
    businesses.forEach(b => {
      b.tags.forEach(tag => {
        if (tag.toLowerCase().includes(lowerQuery)) {
          suggestions.add(tag);
        }
      });
    });

    return Array.from(suggestions).slice(0, 5);
  }

  /**
   * Get search statistics
   */
  getStats() {
    return {
      cache: this.cache.getStats(),
      analytics: this.analytics.getSummary(),
      isSearching: this.isSearching
    };
  }
}

// Initialize when config is loaded
if (typeof AI_CONFIG !== 'undefined' && AI_CONFIG.enabled && AI_CONFIG.features.smartSearch) {
  window.aiSearch = new AISearch();
  
  if (AI_CONFIG.debug) {
    console.log('[LocalFind AI] Smart Search initialized');
  }
}
