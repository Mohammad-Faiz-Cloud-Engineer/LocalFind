/**
 * Business Listings Data
 * 
 * PRODUCTION NOTE: Replace this empty array with real business data
 * 
 * Option 1: Fetch from backend API
 * Example: fetch('/api/listings').then(res => res.json()).then(data => window.LISTINGS = data)
 * 
 * Option 2: Populate this array with actual business listings
 * 
 * Data Structure for each business:
 * {
 *   id: "unique-business-id",                    // Unique identifier (kebab-case)
 *   name: "Business Name",                       // Business name
 *   category: "Category Name",                   // Display category name
 *   categorySlug: "category-slug",               // URL-friendly category identifier
 *   featured: false,                             // true/false - Featured listing
 *   status: "open",                              // "open" or "closed"
 *   rating: 4.5,                                 // Rating out of 5
 *   reviewCount: 100,                            // Number of reviews
 *   address: "Full Address",                     // Complete address
 *   mapLink: "https://maps.google.com/?q=...",  // Google Maps link
 *   phone: "+91 00000 00000",                    // Contact phone
 *   email: "contact@business.com",               // Contact email
 *   website: "https://website.com",              // Website URL (optional)
 *   whatsapp: "+91 00000 00000",                 // WhatsApp number (optional)
 *   hours: {                                     // Operating hours
 *     mon: {open: "09:00", close: "18:00"},
 *     tue: {open: "09:00", close: "18:00"},
 *     wed: {open: "09:00", close: "18:00"},
 *     thu: {open: "09:00", close: "18:00"},
 *     fri: {open: "09:00", close: "18:00"},
 *     sat: {open: "10:00", close: "16:00"},
 *     sun: {open: "00:00", close: "00:00"}      // 00:00 - 00:00 means closed
 *   },
 *   description: "Business description...",      // Full description
 *   tags: ["tag1", "tag2", "tag3"],             // Array of tags
 *   isNew: false                                 // true/false - New listing badge
 * }
 */
window.LISTINGS = [
  {
    id: "raheem-common-service-center",
    name: "Raheem Common Service Center",
    category: "Government Services & CSC",
    categorySlug: "government-services",
    featured: true,
    status: "open",
    rating: 5.0,
    reviewCount: 0,
    address: "Village & Post Rasauli, District Barabanki, Rasauli Bazar, Near Rehan Clothing Store, Uttar Pradesh 225203",
    mapLink: "https://maps.google.com/?q=26.923313,81.261053",
    phone: "+91 91405 15707",
    email: "moraheem862@gmail.com",
    website: "",
    whatsapp: "+91 91405 15707",
    hours: {
      mon: {open: "09:00", close: "19:00"},
      tue: {open: "09:00", close: "19:00"},
      wed: {open: "09:00", close: "19:00"},
      thu: {open: "09:00", close: "19:00"},
      fri: {open: "00:00", close: "00:00"},
      sat: {open: "09:00", close: "19:00"},
      sun: {open: "09:00", close: "19:00"}
    },
    description: "Raheem Common Service Center is your one-stop solution for all government and digital services in Rasauli. We provide comprehensive services including Aadhaar card enrollment and updates, PAN card applications, income certificates, caste certificates, domicile certificates, birth and death certificates, and various other government document services. We also offer banking services, bill payments, insurance services, digital payments, and online form submissions. Our experienced team, led by owner Raheem, ensures quick, reliable, and hassle-free service delivery. Visit us for all your documentation and digital service needs.",
    tags: ["csc", "aadhaar", "pan-card", "certificates", "banking", "government-services", "digital-services", "bill-payment"],
    isNew: true
  }
];

/**
 * Sanitize HTML to prevent XSS attacks
 */
function sanitizeHTML(str) {
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
}

/**
 * Render business card component
 * @param {Object} b - Business object
 * @returns {string} HTML string for business card
 */
window.renderCard = function(b){
  const name = sanitizeHTML(b.name);
  const desc = sanitizeHTML(b.description.slice(0,120));
  const tags = b.tags.slice(0,3).map(t => `<span class="tag">${sanitizeHTML(t)}</span>`).join('');
  
  return `
  <article class="card ${b.featured ? 'featured' : ''}" role="article">
    <div class="meta">
      <div class="title"><a href="business-detail.html?id=${encodeURIComponent(b.id)}">${name}</a></div>
      <div class="small" aria-label="Rating ${b.rating} out of 5 stars">${b.rating} ★ (${b.reviewCount})</div>
    </div>
    <div class="desc">${desc}...</div>
    <div class="tags">${tags}</div>
  </article>
  `;
};
