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
    verified: true,
    status: "open",
    rating: 5.0,
    reviewCount: 1,
    reviews: [
      {
        id: "review-1",
        author: "Admin",
        role: "LocalFind Team",
        rating: 5.0,
        date: "2026-02-27",
        text: "This is the Best Common Service Center in Rasauli, personal experience.",
        verified: true
      }
    ],
    address: "Village & Post Rasauli, District Barabanki, Rasauli Bazar, Near Rehan Clothing Store, Uttar Pradesh 225203",
    mapLink: "https://maps.google.com/?q=26.923311,81.261030",
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
  },
  {
    id: "rehan-clothing-store",
    name: "Rehan Clothing Store",
    category: "Fashion & Apparel",
    categorySlug: "fashion",
    featured: true,
    verified: false,
    status: "open",
    rating: 4.0,
    reviewCount: 1,
    reviews: [
      {
        id: "review-1",
        author: "Admin",
        role: "LocalFind Team",
        rating: 4.0,
        date: "2026-02-27",
        text: "You have to Bargain in a good way cause the prices are high compare to the quality we get.",
        verified: true
      }
    ],
    address: "Village & Post Rasauli, District Barabanki, Rasauli Bazar, Near Raheem Common Service Center Shop, Uttar Pradesh 225203",
    mapLink: "https://maps.google.com/?q=26.923304,81.261074",
    phone: "+91 78977 34573",
    email: "",
    website: "",
    whatsapp: "+91 78977 34573",
    hours: {
      mon: {open: "10:00", close: "19:00"},
      tue: {open: "10:00", close: "19:00"},
      wed: {open: "10:00", close: "19:00"},
      thu: {open: "10:00", close: "19:00"},
      fri: {open: "10:00", close: "19:00"},
      sat: {open: "10:00", close: "19:00"},
      sun: {open: "10:00", close: "19:00"}
    },
    description: "Rehan Clothing Store is your premier destination for fashionable clothing and apparel in Rasauli. We offer a wide selection of traditional and modern clothing for men, women, and children. From everyday wear to special occasion outfits, our store features quality fabrics and the latest fashion trends. Whether you're looking for ethnic wear, casual clothing, or formal attire, we have something for everyone. Our friendly staff is always ready to help you find the perfect outfit that matches your style and budget. Visit us for a complete shopping experience in the heart of Rasauli Bazar.",
    tags: ["clothing", "fashion", "apparel", "ethnic-wear", "casual-wear", "formal-wear", "men-clothing", "women-clothing", "kids-clothing"],
    isNew: true
  },
  {
    id: "shariq-hashmi-electric-shop",
    name: "Shariq Hashmi Electric Shop",
    category: "Electrical Services & Repairs",
    categorySlug: "electrical-services",
    featured: true,
    verified: true,
    status: "open",
    rating: 5.0,
    reviewCount: 1,
    reviews: [
      {
        id: "review-1",
        author: "Admin",
        role: "LocalFind Team",
        rating: 5.0,
        date: "2026-02-27",
        text: "Best Electrician in the Entire Rasauli. Professional service with excellent workmanship. Behaviour is also very good and always ready to help. Highly recommended for all electrical needs!",
        verified: true
      }
    ],
    address: "Village & Post Rasauli, District Barabanki, Rasauli Bazar, Near Hind Pharmacy Shop, Uttar Pradesh 225203",
    mapLink: "https://maps.google.com/?q=26.924954,81.262051",
    phone: "+91 72751 13274",
    email: "",
    website: "",
    whatsapp: "+91 72751 13274",
    hours: {
      mon: {open: "10:00", close: "18:00"},
      tue: {open: "10:00", close: "18:00"},
      wed: {open: "10:00", close: "18:00"},
      thu: {open: "10:00", close: "18:00"},
      fri: {open: "10:00", close: "18:00"},
      sat: {open: "10:00", close: "18:00"},
      sun: {open: "10:00", close: "18:00"}
    },
    description: "Shariq Hashmi Electric Shop is your trusted electrical service provider in Rasauli, offering comprehensive electrical solutions for residential and commercial properties. We specialize in complete house wiring, electrical installations, earthing systems, circuit repairs, and maintenance services. Our expert team handles everything from new electrical setups to troubleshooting and fixing electrical faults. We provide professional services including switchboard installations, lighting fixtures, fan installations, electrical safety inspections, and emergency repair services. With years of experience and a commitment to quality workmanship, we ensure safe and reliable electrical solutions. Our skilled electricians use quality materials and follow all safety standards. Whether you need a complete rewiring project or a simple repair, we deliver efficient and affordable electrical services with excellent customer care.",
    tags: ["electrician", "electrical-services", "house-wiring", "earthing", "electrical-repair", "circuit-repair", "electrical-installation", "maintenance", "emergency-service"],
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
  const verifiedBadge = b.verified ? '<span class="verified-badge" title="Verified Business"><i class="fa-solid fa-circle-check"></i></span>' : '';
  
  return `
  <article class="card ${b.featured ? 'featured' : ''} ${b.verified ? 'verified' : ''}" role="article">
    <div class="meta">
      <div class="title">
        <a href="business-detail.html?id=${encodeURIComponent(b.id)}">${name}</a>
        ${verifiedBadge}
      </div>
      <div class="small" aria-label="Rating ${b.rating} out of 5 stars">${b.rating} ★ (${b.reviewCount})</div>
    </div>
    <div class="desc">${desc}...</div>
    <div class="tags">${tags}</div>
  </article>
  `;
};
