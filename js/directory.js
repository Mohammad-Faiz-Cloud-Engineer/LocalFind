/**
 * Directory Page - Filter, Sort, Search, Pagination
 * Handles business listing display and user interactions
 * 
 * @version 4.3.3
 * @updated 2026-03-31
 */
(function () {
  'use strict';

  const ITEMS_PER_PAGE = 6;
  let offset = 0;
  let currentListings = [...window.LISTINGS];

  /**
   * Expand search query with aliases
   * @param {string} query - Original search query
   * @returns {Array} Array of search terms including aliases
   */
  function expandSearchQuery(query) {
    const queryLower = query.toLowerCase().trim();
    const searchTerms = [queryLower];

    // Check if CONFIG and searchAliases exist
    if (window.CONFIG && window.CONFIG.searchAliases) {
      // Check if query matches any alias key
      if (window.CONFIG.searchAliases[queryLower]) {
        searchTerms.push(...window.CONFIG.searchAliases[queryLower]);
      }

      // Check if query is part of any alias value (reverse lookup)
      Object.keys(window.CONFIG.searchAliases).forEach(key => {
        const aliases = window.CONFIG.searchAliases[key];
        if (aliases.some(alias => alias.includes(queryLower))) {
          searchTerms.push(key);
          searchTerms.push(...aliases);
        }
      });
    }

    // Remove duplicates
    return [...new Set(searchTerms)];
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
    let score = 0;
    const queryLower = originalQuery.toLowerCase();
    const nameLower = business.name.toLowerCase();
    const categoryLower = business.category.toLowerCase();
    const descLower = business.description.toLowerCase();

    // Exact name match (highest priority)
    if (nameLower === queryLower) {
      score += 1000;
    }

    // Name starts with query
    if (nameLower.startsWith(queryLower)) {
      score += 500;
    }

    // Name contains query
    if (nameLower.includes(queryLower)) {
      score += 300;
    }

    // Category exact match
    if (categoryLower === queryLower) {
      score += 200;
    }

    // Category contains query
    if (categoryLower.includes(queryLower)) {
      score += 150;
    }

    // Tags exact match
    if (Array.isArray(business.tags)) {
      business.tags.forEach(tag => {
        const tagLower = tag.toLowerCase();
        if (tagLower === queryLower) {
          score += 100;
        } else if (tagLower.includes(queryLower)) {
          score += 50;
        }
      });
    }

    // Description contains query (lower priority)
    if (descLower.includes(queryLower)) {
      score += 10;
    }

    // Boost for featured/verified businesses
    if (business.featured) score += 5;
    if (business.verified) score += 5;

    // Boost for higher ratings
    score += business.rating * 2;

    return score;
  }

  /**
   * Check if text matches any of the search terms
   * @param {string} text - Text to search in
   * @param {Array} searchTerms - Array of search terms
   * @returns {boolean} True if any term matches
   */
  function matchesSearchTerms(text, searchTerms) {
    if (!text) return false;
    const textLower = text.toLowerCase();
    return searchTerms.some(term => textLower.includes(term));
  }

  /**
   * Find malls that contain businesses matching the search
   * @param {Array} searchTerms - Array of search terms
   * @param {string} originalQuery - Original search query
   * @returns {Array} Array of mall businesses
   */
  function findMallsWithMatchingTenants(searchTerms, originalQuery) {
    const matchingMalls = [];
    
    // Find all businesses that match the search
    const matchingBusinessIds = window.LISTINGS
      .filter(b => 
        matchesSearchTerms(b.name, searchTerms) ||
        matchesSearchTerms(b.category, searchTerms) ||
        (Array.isArray(b.tags) && b.tags.some(t => matchesSearchTerms(t, searchTerms)))
      )
      .map(b => b.id);
    
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

  /**
   * Apply URL query parameters to filter listings
   */
  function applyQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const search = params.get('search');
    const loc = params.get('location');

    if (category) {
      currentListings = currentListings.filter(b => b.categorySlug === category);
    }

    if (search) {
      const searchTerms = expandSearchQuery(search);
      
      // Find directly matching businesses
      const directMatches = window.LISTINGS.filter(b =>
        matchesSearchTerms(b.name, searchTerms) ||
        matchesSearchTerms(b.description, searchTerms) ||
        matchesSearchTerms(b.category, searchTerms) ||
        (Array.isArray(b.tags) && b.tags.some(t => matchesSearchTerms(t, searchTerms)))
      );
      
      // Find malls that contain matching businesses
      const mallsWithTenants = findMallsWithMatchingTenants(searchTerms, search);
      
      // Combine results (remove duplicates)
      const combinedResults = [...directMatches];
      mallsWithTenants.forEach(mall => {
        if (!combinedResults.find(b => b.id === mall.id)) {
          combinedResults.push(mall);
        }
      });
      
      currentListings = combinedResults;

      // Sort by relevance (most relevant first)
      currentListings.sort((a, b) => {
        const scoreA = calculateRelevance(a, searchTerms, search);
        const scoreB = calculateRelevance(b, searchTerms, search);
        return scoreB - scoreA;
      });
    }

    if (loc) {
      const locLower = loc.toLowerCase();
      currentListings = currentListings.filter(b =>
        b.address && b.address.toLowerCase().includes(locLower)
      );
    }
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

    // Search functionality with debounce and alias support
    const searchInput = document.getElementById('filter-search');
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
            const searchTerms = expandSearchQuery(query);
            
            // Find directly matching businesses
            const directMatches = window.LISTINGS.filter(b =>
              matchesSearchTerms(b.name, searchTerms) ||
              matchesSearchTerms(b.description, searchTerms) ||
              matchesSearchTerms(b.category, searchTerms) ||
              (Array.isArray(b.tags) && b.tags.some(t => matchesSearchTerms(t, searchTerms)))
            );
            
            // Find malls that contain matching businesses
            const mallsWithTenants = findMallsWithMatchingTenants(searchTerms, query);
            
            // Combine results (remove duplicates)
            currentListings = [...directMatches];
            mallsWithTenants.forEach(mall => {
              if (!currentListings.find(b => b.id === mall.id)) {
                currentListings.push(mall);
              }
            });

            // Sort by relevance (most relevant first)
            currentListings.sort((a, b) => {
              const scoreA = calculateRelevance(a, searchTerms, query);
              const scoreB = calculateRelevance(b, searchTerms, query);
              return scoreB - scoreA;
            });
          }
          offset = 0;
          render();
        }, 300);
      });
    }

    render();
  }

  /**
   * Check if current time falls within business hours
   * @param {Object} hours - Hours object with open/close (and optionally open2/close2 for split shifts)
   * @param {number} currentMinutes - Current time in minutes since midnight
   * @returns {boolean} True if currently within business hours
   */
  function isWithinHours(hours, currentMinutes) {
    if (!hours || !hours.open || !hours.close) return false;

    const toMinutes = (timeStr) => {
      const [h, m] = timeStr.split(':').map(Number);
      return h * 60 + m;
    };

    const open1 = toMinutes(hours.open);
    const close1 = toMinutes(hours.close);

    if (currentMinutes >= open1 && currentMinutes <= close1) return true;

    // Check split shift
    if (hours.open2 && hours.close2) {
      const open2 = toMinutes(hours.open2);
      const close2 = toMinutes(hours.close2);
      if (currentMinutes >= open2 && currentMinutes <= close2) return true;
    }

    return false;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM already loaded
    init();
  }
})();

