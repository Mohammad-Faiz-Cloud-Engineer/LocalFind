/**
 * Directory Page - Filter, Sort, Search, Pagination
 * Handles business listing display and user interactions
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
   * Check if text matches any of the search terms
   * @param {string} text - Text to search in
   * @param {Array} searchTerms - Array of search terms
   * @returns {boolean} True if any term matches
   */
  function matchesSearchTerms(text, searchTerms) {
    const textLower = text.toLowerCase();
    return searchTerms.some(term => textLower.includes(term));
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
      currentListings = currentListings.filter(b =>
        matchesSearchTerms(b.name, searchTerms) ||
        matchesSearchTerms(b.description, searchTerms) ||
        matchesSearchTerms(b.category, searchTerms) ||
        (Array.isArray(b.tags) && b.tags.some(t => matchesSearchTerms(t, searchTerms)))
      );
    }

    if (loc) {
      const locLower = loc.toLowerCase();
      currentListings = currentListings.filter(b =>
        b.address.toLowerCase().includes(locLower)
      );
    }
  }

  /**
   * Render listings to the page
   */
  function render() {
    const container = document.getElementById('listings');
    const resultsCount = document.getElementById('results-count');
    
    if (!container || !resultsCount) {
      return;
    }
    
    const slice = currentListings.slice(0, offset + ITEMS_PER_PAGE);
    container.innerHTML = slice.map(b => window.renderCard(b)).join('');
    resultsCount.textContent = `Showing ${Math.min(slice.length, currentListings.length)} of ${currentListings.length} businesses`;
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
        container.innerHTML = '<div style="text-align:center;padding:4rem 2rem;"><h3 style="color:var(--text-primary);margin-bottom:1rem;">No Businesses Listed Yet</h3><p style="color:var(--text-muted);">Add your business data to js/data.js or connect to your backend API.</p></div>';
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

    // Sort functionality
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        const value = e.target.value;

        if (value === 'rating') {
          currentListings.sort((a, b) => b.rating - a.rating);
        } else if (value === 'az') {
          currentListings.sort((a, b) => a.name.localeCompare(b.name));
        } else if (value === 'newest') {
          currentListings = [...window.LISTINGS];
          applyQueryParams();
        }

        offset = 0;
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
            currentListings = window.LISTINGS.filter(b =>
              matchesSearchTerms(b.name, searchTerms) ||
              matchesSearchTerms(b.description, searchTerms) ||
              matchesSearchTerms(b.category, searchTerms) ||
              (Array.isArray(b.tags) && b.tags.some(t => matchesSearchTerms(t, searchTerms)))
            );
          }
          offset = 0;
          render();
        }, 300);
      });
    }

    render();

    // View toggle buttons
    const gridBtn = document.getElementById('view-grid');
    const listBtn = document.getElementById('view-list');

    if (gridBtn) {
      gridBtn.addEventListener('click', () => {
        document.body.classList.remove('list-view');
        gridBtn.classList.add('active');
        if (listBtn) listBtn.classList.remove('active');
      });
    }

    if (listBtn) {
      listBtn.addEventListener('click', () => {
        document.body.classList.add('list-view');
        listBtn.classList.add('active');
        if (gridBtn) gridBtn.classList.remove('active');
      });
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      try {
        init();
      } catch (error) {
        console.error('Directory initialization failed:', error);
      }
    });
  } else {
    // DOM already loaded
    try {
      init();
    } catch (error) {
      console.error('Directory initialization failed:', error);
    }
  }
})();

