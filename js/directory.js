/**
 * Directory Page - Filter, Sort, Search, Pagination
 * Handles business listing display and user interactions
 */
(function() {
  'use strict';
  
  const ITEMS_PER_PAGE = 6;
  let offset = 0;
  let currentListings = [...window.LISTINGS];
  let viewMode = 'grid';

  /**
   * Apply URL query parameters to filter listings
   */
  function applyQueryParams() {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    const search = params.get('search');
    
    if (category) {
      currentListings = currentListings.filter(b => b.categorySlug === category);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      currentListings = currentListings.filter(b => 
        b.name.toLowerCase().includes(searchLower) || 
        b.description.toLowerCase().includes(searchLower)
      );
    }
  }

  /**
   * Render listings to the page
   */
  function render() {
    const container = document.getElementById('listings');
    const slice = currentListings.slice(0, offset + ITEMS_PER_PAGE);
    container.innerHTML = slice.map(b => window.renderCard(b)).join('');
    
    const resultsCount = document.getElementById('results-count');
    resultsCount.textContent = `Showing ${Math.min(slice.length, currentListings.length)} of ${currentListings.length} businesses`;
  }

  /**
   * Initialize directory page
   */
  function init() {
    // Populate category tabs
    const tabs = document.getElementById('category-tabs');
    const categories = [...new Set(window.LISTINGS.map(b => b.category))];
    categories.forEach(category => {
      const slug = category.toLowerCase().split(' ')[0];
      tabs.insertAdjacentHTML('beforeend', 
        `<a href="directory.html?category=${slug}">${category}</a>`
      );
    });

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
        }
        
        render();
      });
    }
    
    // Search functionality with debounce
    const searchInput = document.getElementById('filter-search');
    if (searchInput) {
      let timeout;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          const query = e.target.value.toLowerCase();
          currentListings = window.LISTINGS.filter(b => 
            b.name.toLowerCase().includes(query) || 
            b.description.toLowerCase().includes(query)
          );
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
        viewMode = 'grid';
        document.body.classList.remove('list-view');
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
      });
    }
    
    if (listBtn) {
      listBtn.addEventListener('click', () => {
        viewMode = 'list';
        document.body.classList.add('list-view');
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    try{
      init();
    }catch(error){
      // Silently handle initialization errors in production
    }
  });
})();

