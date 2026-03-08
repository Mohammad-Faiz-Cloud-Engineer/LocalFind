/**
 * Index Page Initialization
 * Renders featured listings on homepage
 */
(function() {
  'use strict';
  
  document.addEventListener('DOMContentLoaded', () => {
    // Check if data exists
    if (!window.LISTINGS || window.LISTINGS.length === 0) {
      const featuredContainer = document.getElementById('featured-list');
      
      if (featuredContainer) {
        featuredContainer.innerHTML = '<div class="empty-state"><p>No listings available yet. Add your business data to js/data.js</p></div>';
      }
      return;
    }
    
    // Render featured listings
    const featured = window.LISTINGS.filter(b => b.featured).slice(0, 6);
    const container = document.getElementById('featured-list');
    if (featured.length > 0) {
      featured.forEach(b => { 
        container.insertAdjacentHTML('beforeend', window.renderCard(b)); 
      });
    } else {
      container.innerHTML = '<div class="empty-state"><p>No featured listings available.</p></div>';
    }
  });
})();
