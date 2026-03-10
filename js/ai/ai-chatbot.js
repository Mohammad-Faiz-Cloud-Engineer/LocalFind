/**
 * LocalFind AI Chatbot
 * Created by Mohammad Faiz (Rasauli)
 * Production-grade chatbot with security, caching, and analytics
 */

class AIChatbot {
  constructor() {
    this.identity = {
      name: "LocalFind AI",
      creator: "Mohammad Faiz",
      location: "Rasauli, Barabanki, Uttar Pradesh",
      purpose: "Help users discover local businesses",
      version: "1.0.0"
    };

    // Initialize modules
    this.security = new AISecurityManager(AI_CONFIG);
    this.cache = new AICacheManager(AI_CONFIG);
    this.analytics = new AIAnalytics(AI_CONFIG);
    
    // Load persisted analytics
    this.analytics.loadPersistedEvents();

    // Conversation history
    this.conversationHistory = [];
    this.maxHistoryLength = 10;

    // API state
    this.currentApiIndex = 0;
    this.isProcessing = false;

    if (AI_CONFIG.debug) {
      console.log('[AI Chatbot] Initialized', this.identity);
    }
  }

  /**
   * Fetch comprehensive platform data
   */
  async fetchPlatformData() {
    const startTime = performance.now();

    try {
      const data = {
        // Identity
        identity: this.identity,
        
        // Platform info from CONFIG
        platform: {
          name: window.CONFIG?.siteName || 'LocalFind',
          area: window.CONFIG?.areaName || 'Rasauli, Barabanki, Uttar Pradesh',
          tagline: window.CONFIG?.tagline || 'Discover Everything Around You',
          contact: {
            email: window.CONFIG?.contactEmail,
            phone: window.CONFIG?.contactPhone,
            whatsapp: window.CONFIG?.contactWhatsApp
          },
          founded: window.CONFIG?.foundedYear || 2026,
          social: window.CONFIG?.social || {}
        },
        
        // All businesses from LISTINGS
        businesses: this.getBusinessData(),
        
        // Current page context
        currentPage: this.getCurrentPageContext(),
        
        // Page content
        pageContent: this.getPageContent(),
        
        // Categories
        categories: this.getCategories(),
        
        // Search aliases
        searchAliases: window.CONFIG?.searchAliases || {},
        
        // Statistics
        stats: this.getPlatformStats()
      };

      const endTime = performance.now();
      this.analytics.trackPerformance('data_fetch', endTime - startTime);

      return data;
    } catch (error) {
      this.analytics.trackError(error, { context: 'fetchPlatformData' });
      throw error;
    }
  }

  /**
   * Get business data with safety checks
   */
  getBusinessData() {
    if (!window.LISTINGS || !Array.isArray(window.LISTINGS)) {
      return [];
    }

    return window.LISTINGS.map(b => ({
      id: b.id,
      name: b.name,
      category: b.category,
      rating: b.rating || 0,
      reviewCount: b.reviewCount || 0,
      tags: Array.isArray(b.tags) ? b.tags : [],
      status: b.status || 'Unknown',
      featured: b.featured || false,
      verified: b.verified || false,
      phone: b.phone || 'N/A',
      email: b.email || 'N/A',
      address: b.address || 'N/A',
      hours: b.hours || {},
      description: b.description?.substring(0, 200) || 'No description available',
      whatsapp: b.whatsapp || null,
      website: b.website || null,
      services: Array.isArray(b.services) ? b.services : []
    }));
  }

  /**
   * Get current page context
   */
  getCurrentPageContext() {
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    
    if (path.includes('business-detail')) {
      const id = params.get('id');
      const business = window.LISTINGS?.find(b => b.id === id);
      return {
        page: 'business-detail',
        businessId: id,
        business: business ? {
          name: business.name,
          category: business.category,
          rating: business.rating,
          phone: business.phone,
          address: business.address,
          hours: business.hours,
          verified: business.verified
        } : null
      };
    } else if (path.includes('directory')) {
      return {
        page: 'directory',
        category: params.get('category'),
        searchQuery: params.get('search'),
        context: 'browsing businesses'
      };
    } else if (path.includes('about')) {
      return {
        page: 'about',
        context: 'about LocalFind and Mohammad Faiz'
      };
    } else if (path.includes('map')) {
      return {
        page: 'map',
        context: 'viewing business locations on map'
      };
    } else if (path.includes('add-business')) {
      return {
        page: 'add-business',
        context: 'adding a new business'
      };
    } else {
      return {
        page: 'home',
        context: 'homepage - discover local businesses'
      };
    }
  }

  /**
   * Get page content
   */
  getPageContent() {
    const content = {
      title: document.title || 'LocalFind',
      headings: [],
      meta: {}
    };
    
    try {
      // Get headings
      const headings = document.querySelectorAll('h1, h2, h3');
      content.headings = Array.from(headings)
        .map(h => h.textContent.trim())
        .filter(t => t.length > 0 && t.length < 100)
        .slice(0, 10);
      
      // Get meta tags
      const description = document.querySelector('meta[name="description"]');
      const keywords = document.querySelector('meta[name="keywords"]');
      
      if (description) content.meta.description = description.content;
      if (keywords) content.meta.keywords = keywords.content;
    } catch (error) {
      // Ignore DOM errors
    }
    
    return content;
  }

  /**
   * Get categories
   */
  getCategories() {
    if (!window.LISTINGS || !Array.isArray(window.LISTINGS)) {
      return [];
    }
    
    const categories = [...new Set(window.LISTINGS.map(b => b.category))];
    return categories.filter(c => c).sort();
  }

  /**
   * Get platform statistics
   */
  getPlatformStats() {
    if (!window.LISTINGS || !Array.isArray(window.LISTINGS)) {
      return {
        totalBusinesses: 0,
        verifiedBusinesses: 0,
        featuredBusinesses: 0,
        categories: 0,
        averageRating: 0
      };
    }

    const businesses = window.LISTINGS;
    const ratings = businesses.map(b => b.rating || 0).filter(r => r > 0);
    
    return {
      totalBusinesses: businesses.length,
      verifiedBusinesses: businesses.filter(b => b.verified).length,
      featuredBusinesses: businesses.filter(b => b.featured).length,
      categories: this.getCategories().length,
      averageRating: ratings.length > 0 
        ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
        : 0,
      emergencyServices: businesses.filter(b => 
        b.category?.includes('Healthcare') || 
        b.category?.includes('Hospital') ||
        b.tags?.includes('Emergency')
      ).length,
      twentyFourSeven: businesses.filter(b => 
        b.hours?.mon?.open === '00:00' && b.hours?.mon?.close === '23:59'
      ).length
    };
  }

  /**
   * Build comprehensive system prompt
   */
  async buildSystemPrompt(userMessage) {
    const data = await this.fetchPlatformData();
    
    const prompt = `IDENTITY:
You are ${data.identity.name}, created by ${data.identity.creator} from ${data.identity.location}.
Version: ${data.identity.version}
Purpose: ${data.identity.purpose}

CREATOR INFORMATION:
- Name: Mohammad Faiz
- Location: Rasauli, Barabanki, Uttar Pradesh
- Role: Founder & Developer of LocalFind
- Vision: Empower local businesses through technology
- Contact: ${data.platform.contact.email || 'Available on website'}

PLATFORM INFORMATION:
- Name: ${data.platform.name}
- Area: ${data.platform.area}
- Tagline: ${data.platform.tagline}
- Founded: ${data.platform.founded}
- Total Businesses: ${data.stats.totalBusinesses}
- Verified Businesses: ${data.stats.verifiedBusinesses}
- Categories: ${data.stats.categories}
- Average Rating: ${data.stats.averageRating}★
- Emergency Services: ${data.stats.emergencyServices}
- 24/7 Services: ${data.stats.twentyFourSeven}

CURRENT CONTEXT:
- Page: ${data.currentPage.page}
- Page Title: ${data.pageContent.title}
${data.currentPage.business ? `- Viewing: ${data.currentPage.business.name} (${data.currentPage.business.category})
  Rating: ${data.currentPage.business.rating}★
  Phone: ${data.currentPage.business.phone}
  ${data.currentPage.business.verified ? '✓ VERIFIED' : ''}` : ''}
${data.currentPage.searchQuery ? `- Search: "${data.currentPage.searchQuery}"` : ''}

AVAILABLE CATEGORIES (${data.categories.length}):
${data.categories.map(c => `- ${c}`).join('\n')}

ALL BUSINESSES (${data.businesses.length} total):
${data.businesses.slice(0, 30).map(b => `
• ${b.name} (${b.category})
  ${b.rating}★ (${b.reviewCount} reviews) ${b.verified ? '✓ VERIFIED' : ''} ${b.featured ? '⭐ FEATURED' : ''}
  Status: ${b.status}
  Services: ${b.tags.slice(0, 3).join(', ')}
  Phone: ${b.phone}
  Address: ${b.address.split(',')[0]}
  ${b.hours?.mon ? `Hours: ${b.hours.mon.open}-${b.hours.mon.close}` : ''}
`).join('\n')}
${data.businesses.length > 30 ? `\n... and ${data.businesses.length - 30} more businesses` : ''}

SPECIAL FEATURES:
- Emergency Services: ${data.businesses.filter(b => b.category.includes('Healthcare') || b.category.includes('Hospital')).map(b => b.name).join(', ') || 'None listed'}
- 24/7 Services: ${data.businesses.filter(b => b.hours?.mon?.open === '00:00' && b.hours?.mon?.close === '23:59').map(b => b.name).join(', ') || 'None listed'}
- Government Services: ${data.businesses.filter(b => b.category.includes('Government') || b.category.includes('CSC')).map(b => b.name).join(', ') || 'None listed'}

RESPONSE GUIDELINES:
1. Always identify as "LocalFind AI created by Mohammad Faiz from Rasauli"
2. Provide specific business names, ratings, and contact info
3. Include verification status when relevant
4. Be conversational, helpful, and friendly
5. For emergencies, prioritize 24/7 and healthcare services
6. Use current page context for relevant answers
7. If user asks about you, mention Mohammad Faiz as your creator
8. Keep responses concise but informative
9. Always provide actionable information (phone numbers, addresses)
10. If uncertain, suggest browsing the directory or map

USER QUESTION: ${userMessage}

Provide a helpful, accurate response:`;

    return prompt;
  }

  /**
   * Make API request with retry logic
   */
  async makeApiRequest(prompt, retryCount = 0) {
    const apis = [AI_CONFIG.api.primary, ...AI_CONFIG.api.fallbacks];
    const currentApi = apis[this.currentApiIndex % apis.length];

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), AI_CONFIG.api.timeout);

      const response = await fetch(currentApi, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: prompt }],
          temperature: AI_CONFIG.model.temperature,
          max_tokens: AI_CONFIG.model.maxTokens,
          top_p: AI_CONFIG.model.topP
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Validate response
      this.security.validateResponse(data);

      return data.content || data.response || data.message || 'No response received';

    } catch (error) {
      // Try next API or retry
      if (retryCount < AI_CONFIG.api.retryAttempts) {
        this.currentApiIndex++;
        await new Promise(resolve => setTimeout(resolve, AI_CONFIG.api.retryDelay));
        return this.makeApiRequest(prompt, retryCount + 1);
      }
      
      throw error;
    }
  }

  /**
   * Main chat method
   */
  async chat(userMessage) {
    if (this.isProcessing) {
      throw new Error('Please wait for the current request to complete');
    }

    const startTime = performance.now();

    try {
      this.isProcessing = true;

      // Security checks
      const sanitizedMessage = this.security.sanitizeInput(userMessage);
      this.security.checkRateLimit();

      // Track query
      this.analytics.trackQuery(sanitizedMessage, {
        page: this.getCurrentPageContext().page
      });

      // Check cache
      const cached = this.cache.get(sanitizedMessage, this.getCurrentPageContext());
      if (cached) {
        const responseTime = performance.now() - startTime;
        this.analytics.trackResponse(sanitizedMessage, cached, responseTime, true);
        return cached;
      }

      // Build prompt and make request
      const systemPrompt = await this.buildSystemPrompt(sanitizedMessage);
      const response = await this.makeApiRequest(systemPrompt);

      // Cache response
      this.cache.set(sanitizedMessage, response, this.getCurrentPageContext());

      // Track response
      const responseTime = performance.now() - startTime;
      this.analytics.trackResponse(sanitizedMessage, response, responseTime, false);

      // Add to conversation history
      this.addToHistory(sanitizedMessage, response);

      return response;

    } catch (error) {
      this.analytics.trackError(error, {
        message: userMessage,
        page: this.getCurrentPageContext().page
      });
      
      if (AI_CONFIG.debug) {
        console.error('[AI Chatbot] Error:', error);
      }

      // Return user-friendly error message
      if (error.message.includes('Rate limit')) {
        return "I'm receiving too many requests right now. Please wait a moment and try again.";
      } else if (error.message.includes('dangerous content')) {
        return "I can't process that request. Please rephrase your question.";
      } else {
        return "I'm having trouble connecting right now. Please try again in a moment, or browse the directory directly.";
      }
    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * Add to conversation history
   */
  addToHistory(userMessage, aiResponse) {
    this.conversationHistory.push({
      user: userMessage,
      ai: aiResponse,
      timestamp: new Date().toISOString()
    });

    if (this.conversationHistory.length > this.maxHistoryLength) {
      this.conversationHistory.shift();
    }
  }

  /**
   * Get conversation history
   */
  getHistory() {
    return this.conversationHistory;
  }

  /**
   * Clear conversation history
   */
  clearHistory() {
    this.conversationHistory = [];
  }

  /**
   * Get chatbot status
   */
  getStatus() {
    return {
      identity: this.identity,
      isProcessing: this.isProcessing,
      conversationLength: this.conversationHistory.length,
      cacheStats: this.cache.getStats(),
      analyticsStats: this.analytics.getSummary(),
      securityStats: this.security.getSecurityStats()
    };
  }
}

// Initialize when config is loaded
if (typeof AI_CONFIG !== 'undefined' && AI_CONFIG.enabled && AI_CONFIG.features.chatbot) {
  window.aiChatbot = new AIChatbot();
  
  if (AI_CONFIG.debug) {
    console.log('[LocalFind AI] Chatbot initialized');
    console.log('[LocalFind AI] Status:', window.aiChatbot.getStatus());
  }
}
