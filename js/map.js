/**
 * Map Integration
 * Handles map embed for business detail pages
 */
(function() {
  'use strict';
  
  document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.getElementById('biz-map');
    if (!mapContainer) return;
    
    // Check if data exists
    if (!window.LISTINGS || window.LISTINGS.length === 0) {
      mapContainer.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:2rem;">Map not available</p>';
      return;
    }
    
    const params = new URLSearchParams(location.search);
    const businessId = params.get('id');
    const business = window.LISTINGS.find(b => b.id === businessId);
    
    if (!business) {
      mapContainer.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:2rem;">Map not available</p>';
      return;
    }
    
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(business.mapLink)}`;
    iframe.loading = 'lazy';
    iframe.style.width = '100%';
    iframe.style.height = '250px';
    iframe.setAttribute('title', `Map showing location of ${business.name}`);
    
    mapContainer.appendChild(iframe);
  });
})();
