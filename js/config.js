/**
 * LocalFind - Application Configuration
 * Centralized configuration for production deployment
 * 
 * @author Mohammad Faiz
 * @repository https://github.com/Mohammad-Faiz-Cloud-Engineer/LocalFind
 * @license MIT
 * @version 2.0.0
 * 
 * IMPORTANT: Update these values before deploying to production
 */

const CONFIG = {
  // Site Information
  siteName: "LocalFind",
  areaName: "Rasauli, Barabanki, Uttar Pradesh",
  tagline: "Discover Everything Around You",
  
  // Map Configuration (Rasauli near Barabanki, Uttar Pradesh - PIN 225001)
  // General Rasauli area coordinates: 26.9135° N, 81.2328° E
  mapLat: 26.9135,
  mapLng: 81.2328,
  mapZoom: 14,
  
  // Contact Information
  contactEmail: "hello@localfind.com",
  contactPhone: "+91 00000 00000",
  contactAddress: "Rasauli, Barabanki, Uttar Pradesh 225001",
  
  // Business Information
  foundedYear: 2026,
  
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
  },
  
  // Search Aliases - Map shorthand terms to full terms
  searchAliases: {
    'csc': ['common service center', 'common service centre', 'csc center'],
    'atm': ['automated teller machine', 'cash machine'],
    'govt': ['government', 'gov'],
    'govt services': ['government services', 'government service'],
    'pan': ['permanent account number', 'pan card'],
    'aadhaar': ['aadhar', 'adhaar', 'adhar', 'uidai'],
    'pds': ['public distribution system', 'ration shop', 'ration card'],
    'hospital': ['clinic', 'medical center', 'health center', 'dispensary'],
    'pharmacy': ['medical store', 'chemist', 'drug store', 'medicine shop'],
    'restaurant': ['hotel', 'dhaba', 'eatery', 'food'],
    'grocery': ['kirana', 'general store', 'supermarket', 'provision store'],
    'bank': ['banking', 'atm'],
    'school': ['education', 'college', 'institute', 'academy'],
    'salon': ['parlour', 'parlor', 'beauty salon', 'barber'],
    'repair': ['service center', 'workshop', 'mechanic'],
    'laundry': ['dry clean', 'washing', 'ironing'],
    'petrol': ['fuel', 'gas station', 'pump'],
    'delivery': ['courier', 'logistics', 'transport']
  }
};

// Freeze config to prevent modifications
Object.freeze(CONFIG);
Object.freeze(CONFIG.socialLinks);
Object.freeze(CONFIG.api);
Object.freeze(CONFIG.features);
Object.freeze(CONFIG.pagination);
Object.freeze(CONFIG.validation);
Object.freeze(CONFIG.searchAliases);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
} else {
  window.CONFIG = CONFIG;
}
