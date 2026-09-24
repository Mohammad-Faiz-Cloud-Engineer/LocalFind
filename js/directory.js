/**
 * Directory Page - Filter, Sort, Search, Pagination
 * Handles business listing display and user interactions
 * 
 * @version 4.3.9
 * @updated 2026-04-15
 */
(function () {
  'use strict';

  const ITEMS_PER_PAGE = 6;
  let offset = 0;
  let currentListings = window.LISTINGS ? [...window.LISTINGS] : [];

  /**
   * Check for special search commands (e.g., /lgbtq+, /women-owned)
   * Now supports combined filters like "/lgbtq+ hospital"
   * @param {string} query - Search query
   * @returns {Object|null} Filter object or null if not a special command
   */
  function parseSpecialCommand(query) {
    // Input validation
    if (!query || typeof query !== 'string') {
      return null;
    }
    
    const trimmed = query.trim().toLowerCase();
    
    // Prevent excessively long queries (DoS protection)
    if (trimmed.length > 200) {
      return null;
    }
    
    // Special commands start with /
    if (!trimmed.startsWith('/') || trimmed.length < 2) {
      return null;
    }
    
    // Split by space to check for combined filter + search
    const parts = trimmed.split(/\s+/);
    const commandPart = parts[0].substring(1); // Remove the /
    const searchPart = parts.slice(1).join(' ').substring(0, 100); // Limit search part length
    
    // Sanitize command - only allow alphanumeric, hyphens, and +
    if (!/^[a-z0-9\-+]+$/.test(commandPart)) {
      return null;
    }
    
    // Limit command length
    if (commandPart.length > 20) {
      return null;
    }
    
    // Map commands to business properties (frozen for security)
    const commandMap = Object.freeze({
      'lgbtq+': Object.freeze({ property: 'lgbtqFriendly', value: true, label: 'LGBTQ+ Friendly' }),
      'lgbtq': Object.freeze({ property: 'lgbtqFriendly', value: true, label: 'LGBTQ+ Friendly' }),
      'women-owned': Object.freeze({ property: 'womenOwned', value: true, label: 'Women Owned' }),
      'women': Object.freeze({ property: 'womenOwned', value: true, label: 'Women Owned' }),
      'featured': Object.freeze({ property: 'featured', value: true, label: 'Featured' }),
      'verified': Object.freeze({ property: 'verified', value: true, label: 'Verified' }),
      'new': Object.freeze({ property: 'isNew', value: true, label: 'New Businesses' }),
      'open': Object.freeze({ property: 'isOpen', value: true, label: 'Open Now' }),
      'closed': Object.freeze({ property: 'isOpen', value: false, label: 'Closed Now' })
    });
    
    const command = commandMap[commandPart];
    
    if (!command) {
      return null;
    }
    
    // Return command with optional search query
    return {
      ...command,
      searchQuery: searchPart || null
    };
  }

  /**
   * Expand search query with aliases
   * @param {string} query - Original search query
   * @returns {Array} Array of search terms including aliases
   */
  function expandSearchQuery(query) {
    // Input validation
    if (!query || typeof query !== 'string') {
      return [];
    }
    
    const queryLower = query.toLowerCase().trim();
    if (!queryLower) {
      return [];
    }
    
    // Prevent excessively long queries (DoS protection)
    if (queryLower.length > 100) {
      return [queryLower.substring(0, 100)];
    }
    
    const searchTerms = [queryLower];

    // Check if CONFIG and searchAliases exist
    if (window.CONFIG && window.CONFIG.searchAliases && typeof window.CONFIG.searchAliases === 'object') {
      // Check if query matches any alias key
      if (Array.isArray(window.CONFIG.searchAliases[queryLower])) {
        searchTerms.push(...window.CONFIG.searchAliases[queryLower]);
      }

      // Check if query is part of any alias value (reverse lookup)
      Object.keys(window.CONFIG.searchAliases).forEach(key => {
        const aliases = window.CONFIG.searchAliases[key];
        if (Array.isArray(aliases) && aliases.some(alias => alias.includes(queryLower))) {
          searchTerms.push(key);
          searchTerms.push(...aliases);
        }
      });
    }

    // Remove duplicates and limit total terms (performance optimization)
    const uniqueTerms = [...new Set(searchTerms)];
    return uniqueTerms.slice(0, 20); // Limit to 20 terms max
  }

  /**
   * Calculate relevance score for a business based on search terms
   * Higher score = more relevant
   * @param {Object} business - Business object
   * @param {Array} searchTerms - Array of search terms
   * @param {string} originalQuery - Original search query
   * @returns {number} Relevance score
   */
  function calculateRelevance(business, searchTerms, originalQuery) {
    // Input validation
    if (!business || typeof business !== 'object') {
      return 0;
    }
    
    if (!Array.isArray(searchTerms) || searchTerms.length === 0) {
      return 0;
    }
    
    if (!originalQuery || typeof originalQuery !== 'string') {
      return 0;
    }
    
    let score = 0;
    const queryLower = originalQuery.toLowerCase();
    const queryNormalized = normalizeText(originalQuery);
    const nameLower = (business.name || '').toLowerCase();
    const nameNormalized = normalizeText(business.name || '');
    const categoryLower = (business.category || '').toLowerCase();
    const categoryNormalized = normalizeText(business.category || '');
    const descLower = (business.description || '').toLowerCase();

    // Exact name match (highest priority)
    if (nameLower === queryLower || nameNormalized === queryNormalized) {
      score += 1000;
    }

    // Name starts with query
    if (nameLower.startsWith(queryLower) || nameNormalized.startsWith(queryNormalized)) {
      score += 500;
    }

    // Name contains query
    if (nameLower.includes(queryLower) || nameNormalized.includes(queryNormalized)) {
      score += 300;
    }

    // Category exact match
    if (categoryLower === queryLower || categoryNormalized === queryNormalized) {
      score += 200;
    }

    // Category contains query
    if (categoryLower.includes(queryLower) || categoryNormalized.includes(queryNormalized)) {
      score += 150;
    }

    // Tags exact match
    if (Array.isArray(business.tags)) {
      business.tags.forEach(tag => {
        if (typeof tag === 'string') {
          const tagLower = tag.toLowerCase();
          const tagNormalized = normalizeText(tag);
          if (tagLower === queryLower || tagNormalized === queryNormalized) {
            score += 100;
          } else if (tagLower.includes(queryLower) || tagNormalized.includes(queryNormalized)) {
            score += 50;
          }
        }
      });
    }

    // Description contains query (lower priority)
    if (descLower.includes(queryLower)) {
      score += 10;
    }

    // Boost for featured/verified businesses
    if (business.featured === true) score += 5;
    if (business.verified === true) score += 5;

    // Boost for higher ratings (with validation)
    if (typeof business.rating === 'number' && business.rating >= 0 && business.rating <= 5) {
      score += business.rating * 2;
    }

    return score;
  }

  /**
   * Normalize text for flexible searching (removes spaces, hyphens, special chars)
   * @param {string} text - Text to normalize
   * @returns {string} Normalized text
   */
  function normalizeText(text) {
    if (!text) return '';
    return text.toLowerCase()
      .replace(/[\s\-_\.]/g, '') // Remove spaces, hyphens, underscores, dots
      .replace(/[^\w]/g, ''); // Remove other special characters
  }

  /**
   * Check if text matches any of the search terms (with normalization)
   * @param {string} text - Text to search in
   * @param {Array} searchTerms - Array of search terms
   * @returns {boolean} True if any term matches
   */
  function matchesSearchTerms(text, searchTerms) {
    // Input validation
    if (!text || typeof text !== 'string') {
      return false;
    }
    
    if (!Array.isArray(searchTerms) || searchTerms.length === 0) {
      return false;
    }
    
    const textLower = text.toLowerCase();
    const textNormalized = normalizeText(text);
    
    return searchTerms.some(term => {
      if (typeof term !== 'string') {
        return false;
      }
      const termLower = term.toLowerCase().trim();
      const termNormalized = normalizeText(termLower);
      // Match both original and normalized versions
      return Boolean(termLower) && (textLower.includes(termLower) || (termNormalized && textNormalized.includes(termNormalized)));
    });
  }

  /**
   * Find malls that contain businesses matching the search
   * @param {Array} searchTerms - Array of search terms
   * @returns {Array} Array of mall businesses
   */
  function findMallsWithMatchingTenants(searchTerms) {
    // Input validation
    if (!Array.isArray(searchTerms) || searchTerms.length === 0) {
      return [];
    }
    
    if (!window.LISTINGS || !Array.isArray(window.LISTINGS)) {
      return [];
    }
    
    const matchingMalls = [];
    
    // Find all businesses that match the search
    const matchingBusinessIds = window.LISTINGS
      .filter(b => 
        matchesSearchTerms(b.name, searchTerms) ||
        matchesSearchTerms(b.category, searchTerms) ||
        (Array.isArray(b.tags) && b.tags.some(t => matchesSearchTerms(t, searchTerms)))
      )
      .map(b => b.id);
    
    // Early return if no matches
    if (matchingBusinessIds.length === 0) {
      return [];
    }
    
    // Find malls that have these businesses as tenants
    window.LISTINGS.forEach(business => {
      if (business.tenants && Array.isArray(business.tenants) && business.tenants.length > 0) {
        const hasMatchingTenant = business.tenants.some(tenantId => 
          matchingBusinessIds.includes(tenantId)
        );
        
        if (hasMatchingTenant && !matchingMalls.find(m => m.id === business.id)) {
          matchingMalls.push(business);
        }
      }
    });
    
    return matchingMalls;
  }

  function getBaseListings() {
    if (!Array.isArray(window.LISTINGS)) {
      return [];
    }

    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const location = params.get('location')?.trim().toLowerCase();

    return window.LISTINGS.filter(b =>
      (!category || b.categorySlug === category) &&
      (!location || b.address?.toLowerCase().includes(location))
    );
  }

  function setFilterLabel(label) {
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
      resultsCount.toggleAttribute('data-filter-label', Boolean(label));
      if (label) resultsCount.setAttribute('data-filter-label', label);
    }
  }

  function matchesBusiness(business, searchTerms) {
    return matchesSearchTerms(business.name, searchTerms) ||
      matchesSearchTerms(business.description, searchTerms) ||
      matchesSearchTerms(business.category, searchTerms) ||
      (Array.isArray(business.tags) && business.tags.some(tag => matchesSearchTerms(tag, searchTerms)));
  }

  function filterListings(query) {
    const baseListings = getBaseListings();
    const specialCommand = parseSpecialCommand(query);

    if (specialCommand) {
      let filtered = baseListings.filter(business => {
        if (specialCommand.property === 'isNew') {
          return window.isBusinessNew && window.isBusinessNew(business);
        }
        if (specialCommand.property === 'isOpen') {
          return window.getBusinessStatus?.(business).isOpen === specialCommand.value;
        }
        return business[specialCommand.property] === specialCommand.value;
      });

      if (specialCommand.searchQuery) {
        const searchTerms = expandSearchQuery(specialCommand.searchQuery);
        filtered = filtered.filter(business => matchesBusiness(business, searchTerms));
        filtered.sort((a, b) =>
          calculateRelevance(b, searchTerms, specialCommand.searchQuery) -
          calculateRelevance(a, searchTerms, specialCommand.searchQuery)
        );
      }

      setFilterLabel(specialCommand.label);
      return filtered;
    }

    setFilterLabel(null);
    const searchTerms = expandSearchQuery(query);
    const results = baseListings.filter(business => matchesBusiness(business, searchTerms));
    const params = new URLSearchParams(window.location.search);

    if (!params.get('category') && !params.get('location')) {
      findMallsWithMatchingTenants(searchTerms).forEach(mall => {
        if (!results.some(business => business.id === mall.id)) {
          results.push(mall);
        }
      });
    }

    return results.sort((a, b) =>
      calculateRelevance(b, searchTerms, query) - calculateRelevance(a, searchTerms, query)
    );
  }

  /**
   * Apply URL query parameters to filter listings
   */
  function applyQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search')?.trim();
    currentListings = search ? filterListings(search) : getBaseListings();
    if (!search) setFilterLabel(null);
  }

  /**
   * Render listings to the page
   */
  function render() {
    const container = document.getElementById('listings');
    const resultsCount = document.getElementById('results-count');
    const loadMoreBtn = document.getElementById('load-more');

    if (!container || !resultsCount) {
      return;
    }

    const slice = currentListings.slice(0, offset + ITEMS_PER_PAGE);
    container.innerHTML = slice.map(b => window.renderCard(b)).join('');
    resultsCount.textContent = `Showing ${Math.min(slice.length, currentListings.length)} of ${currentListings.length} businesses`;

    // Show/hide Load More button based on remaining items
    if (loadMoreBtn) {
      if (slice.length >= currentListings.length) {
        loadMoreBtn.style.display = 'none';
      } else {
        loadMoreBtn.style.display = 'block';
      }
    }
  }

  /**
   * Initialize directory page
   */
  function init() {
    // Only run on directory page
    if (!document.getElementById('listings')) {
      return;
    }

    // Prevent duplicate initialization
    if (window.__directoryInitialized) {
      return;
    }
    window.__directoryInitialized = true;

    // Check if data exists
    if (!window.LISTINGS || window.LISTINGS.length === 0) {
      const container = document.getElementById('listings');
      const resultsCount = document.getElementById('results-count');

      if (container) {
        container.innerHTML = '<div class="empty-state"><h3>No Businesses Listed Yet</h3><p>Add your business data to js/data.js or connect to your backend API.</p></div>';
      }

      if (resultsCount) {
        resultsCount.textContent = 'Showing 0 of 0 businesses';
      }
      return;
    }

    applyQueryParams();
    offset = 0;

    // Load more button
    const loadMoreBtn = document.getElementById('load-more');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        offset += ITEMS_PER_PAGE;
        render();
      });
    }

    // Search tips tooltip functionality
    const searchTipsBtn = document.getElementById('search-tips-btn');
    const searchTipsTooltip = document.getElementById('search-tips-tooltip');
    const searchTipsClose = document.getElementById('search-tips-close');
    const searchInput = document.getElementById('filter-search');

    if (searchTipsBtn && searchTipsTooltip && searchTipsClose) {
      // Toggle tooltip
      searchTipsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isVisible = searchTipsTooltip.style.display === 'block';
        searchTipsTooltip.style.display = isVisible ? 'none' : 'block';
      });

      // Close tooltip
      searchTipsClose.addEventListener('click', () => {
        searchTipsTooltip.style.display = 'none';
      });

      // Click on tip item to insert command
      const tipItems = searchTipsTooltip.querySelectorAll('.search-tip-item');
      tipItems.forEach(item => {
        item.addEventListener('click', () => {
          const code = item.querySelector('code');
          if (code && searchInput) {
            searchInput.value = code.textContent;
            searchInput.dispatchEvent(new Event('input'));
            searchInput.focus();
            searchTipsTooltip.style.display = 'none';
          }
        });
      });

      // Close tooltip when clicking outside
      document.addEventListener('click', (e) => {
        if (!searchTipsTooltip.contains(e.target) && e.target !== searchTipsBtn) {
          searchTipsTooltip.style.display = 'none';
        }
      });

      // Close on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchTipsTooltip.style.display === 'block') {
          searchTipsTooltip.style.display = 'none';
        }
      });
    }

    // Search functionality with debounce and alias support
    if (searchInput) {
      let timeout;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          const query = e.target.value.trim();
          if (!query) {
            currentListings = [...window.LISTINGS];
            applyQueryParams();
          } else {
            currentListings = filterListings(query);
          }
          offset = 0;
          render();
        }, 300);
      });
    }

    render();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM already loaded
    init();
  }
})();
