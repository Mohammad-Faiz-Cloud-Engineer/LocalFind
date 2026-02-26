/**
 * LocalFind - Application Configuration
 * Centralized configuration for production deployment
 * 
 * @author Mohammad Faiz
 * @repository https://github.com/Mohammad-Faiz-Cloud-Engineer/LocalFind
 * @license MIT
 * @version 1.0.0
 * 
 * IMPORTANT: Update these values before deploying to production
 */

const CONFIG = {
  // Site Information
  siteName: "LocalFind",
  areaName: "Rasauli, Barabanki, Uttar Pradesh",
  tagline: "Discover Everything Around You",
  
  // Map Configuration (Rasauli near Barabanki, Uttar Pradesh - PIN 225001)
  // Latitude: 26.9135° N, Longitude: 81.2328° E
  mapLat: 26.9135,
  mapLng: 81.2328,
  mapZoom: 14,
  
  // Contact Information
  contactEmail: "hello@localfind.com",
  contactPhone: "+91 00000 00000",
  contactAddress: "Rasauli, Barabanki, Uttar Pradesh 225001",
  
  // Business Information
  foundedYear: 2024,
  
  // Social Media Links
  socialLinks: {
    facebook: "https://facebook.com/localfind",
    instagram: "https://instagram.com/localfind",
    twitter: "https://twitter.com/localfind",
    whatsapp: "https://wa.me/910000000000"
  },
  
  // API Configuration (for production backend integration)
  api: {
    baseURL: '/api',
    timeout: 10000,
    endpoints: {
      listings: '/listings',
      business: '/business',
      contact: '/contact/submit',
      reviews: '/reviews'
    }
  },
  
  // Feature Flags
  features: {
    enableReviews: true,
    enableMaps: true,
    enableSearch: true,
    enableAnalytics: false
  },
  
  // Pagination
  pagination: {
    itemsPerPage: 6,
    maxPages: 50
  },
  
  // Validation Rules
  validation: {
    minNameLength: 2,
    maxNameLength: 100,
    minDescriptionLength: 10,
    maxDescriptionLength: 500,
    phonePattern: /^[\d\s\+\-\(\)]+$/,
    emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  }
};

// Freeze config to prevent modifications
Object.freeze(CONFIG);
Object.freeze(CONFIG.socialLinks);
Object.freeze(CONFIG.api);
Object.freeze(CONFIG.features);
Object.freeze(CONFIG.pagination);
Object.freeze(CONFIG.validation);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
} else {
  window.CONFIG = CONFIG;
}
