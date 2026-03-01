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
      mapContainer.innerHTML = '<div class="empty-state"><p>Map not available</p></div>';
      return;
    }
    
    const params = new URLSearchParams(location.search);
    const businessId = params.get('id');
    const business = window.LISTINGS.find(b => b.id === businessId);
    
    if (!business) {
      mapContainer.innerHTML = '<div class="empty-state"><p>Map not available</p></div>';
      return;
    }
    
    // Extract coordinates from mapLink or use default
    let lat, lng;
    
    // Handle different Google Maps URL formats
    if (business.mapLink.includes('maps.app.goo.gl') || business.mapLink.includes('goo.gl')) {
      // For shortened Google Maps links, try to extract from Plus Code in address
      const plusCodeMatch = business.address.match(/([A-Z0-9]{4}\+[A-Z0-9]{2,3})/);
      if (plusCodeMatch) {
        // Extract approximate coordinates from Plus Code format
        // This is a fallback - the actual link will work on mobile
        const plusCode = plusCodeMatch[1];
        // Use config coordinates as fallback for OpenStreetMap display
        lat = CONFIG.mapLat;
        lng = CONFIG.mapLng;
      } else {
        lat = CONFIG.mapLat;
        lng = CONFIG.mapLng;
      }
    } else if (business.mapLink.match(/q=([\d.]+),([\d.]+)/)) {
      // Try to extract from Google Maps link format: ?q=lat,lng
      const coordMatch = business.mapLink.match(/q=([\d.]+),([\d.]+)/);
      lat = parseFloat(coordMatch[1]);
      lng = parseFloat(coordMatch[2]);
    } else {
      // Fallback to config coordinates
      lat = CONFIG.mapLat;
      lng = CONFIG.mapLng;
    }
    
    // Create bounding box around the point (approximately 0.01 degrees = ~1km)
    const delta = 0.005;
    const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`;
    
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
    iframe.loading = 'lazy';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.setAttribute('title', `Map showing location of ${business.name}`);
    iframe.setAttribute('frameborder', '0');
    
    mapContainer.appendChild(iframe);
  });
})();
