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
    name: "Raheem CSC",
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
    description: "Raheem CSC (Common Service Center) is your one-stop solution for all government and digital services in Rasauli. We provide comprehensive services including Aadhaar card enrollment and updates, PAN card applications, income certificates, caste certificates, domicile certificates, birth and death certificates, and various other government document services. We also offer banking services, bill payments, insurance services, digital payments, and online form submissions. Our experienced team, led by owner Raheem, ensures quick, reliable, and hassle-free service delivery. Visit us for all your documentation and digital service needs.",
    tags: ["csc", "aadhaar", "pan-card", "certificates", "banking", "government-services", "digital-services", "bill-payment"],
    isNew: true
  },
  {
    id: "aman-garments",
    name: "Aman Garments",
    category: "Fashion & Apparel",
    categorySlug: "fashion",
    featured: true,
    verified: true,
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
        text: "Excellent service with very good behaviour from the staff. The clothing quality is top-notch (A1 grade) with a great variety of options. Prices are slightly on the higher side, so don't hesitate to bargain a bit - it's worth it for the quality you get. Highly recommended for quality garments in Rasauli!",
        verified: true
      }
    ],
    address: "Village & Post Rasauli, District Barabanki, Rasauli Bazar, Near Raheem Common Service Center Shop, Uttar Pradesh 225203",
    mapLink: "https://maps.google.com/?q=26.922952,81.261117",
    phone: "+91 63068 84047",
    email: "amanyadav92471@gmail.com",
    website: "",
    whatsapp: "+91 63068 84047",
    instagram: "https://www.instagram.com/aman_garments_rasauli",
    hours: {
      mon: {open: "08:00", close: "23:00"},
      tue: {open: "08:00", close: "23:00"},
      wed: {open: "08:00", close: "23:00"},
      thu: {open: "08:00", close: "23:00"},
      fri: {open: "08:00", close: "23:00"},
      sat: {open: "08:00", close: "23:00"},
      sun: {open: "08:00", close: "23:00"}
    },
    description: "Aman Garments is your premier destination for fashionable clothing and apparel in Rasauli. We offer a wide selection of traditional and modern clothing for men, women, and children. From everyday wear to special occasion outfits, our store features quality fabrics and the latest fashion trends. Whether you're looking for ethnic wear, casual clothing, or formal attire, we have something for everyone. Our friendly staff is always ready to help you find the perfect outfit that matches your style and budget. Visit us for a complete shopping experience in the heart of Rasauli Bazar.",
    tags: ["clothing", "fashion", "apparel", "ethnic-wear", "casual-wear", "formal-wear", "men-clothing", "women-clothing", "kids-clothing"],
    isNew: true
  },
  {
    id: "affan-garments",
    name: "Affan Garments",
    category: "Fashion & Apparel",
    categorySlug: "fashion",
    featured: true,
    verified: true,
    status: "open",
    rating: 4.0,
    reviewCount: 1,
    reviews: [
      {
        id: "review-1",
        author: "Admin",
        role: "LocalFind Team",
        rating: 4.0,
        date: "2026-02-28",
        text: "Quality is good but you have to bargain a bit. Good collection of garments with reasonable prices after negotiation. Friendly staff and decent variety available.",
        verified: true
      }
    ],
    address: "Village & Post Rasauli, District Barabanki, Near Rasauli Bazar, Uttar Pradesh 225203",
    mapLink: "https://maps.google.com/?q=26.922952,81.261117",
    phone: "+91 84234 19973",
    phoneName: "Affan",
    phoneSecondary: "+91 63062 03254",
    phoneSecondaryName: "Noman",
    email: "",
    website: "",
    whatsapp: "+91 63062 03254",
    hours: {
      mon: {open: "10:00", close: "21:00"},
      tue: {open: "10:00", close: "21:00"},
      wed: {open: "10:00", close: "21:00"},
      thu: {open: "10:00", close: "21:00"},
      fri: {open: "10:00", close: "21:00"},
      sat: {open: "10:00", close: "21:00"},
      sun: {open: "10:00", close: "21:00"}
    },
    description: "Affan Garments is your trusted destination for quality clothing and fashion apparel in Rasauli. Managed by Affan and Noman, we specialize in providing a diverse range of garments for men, women, and children. Our store features traditional ethnic wear, trendy casual outfits, and elegant formal attire to suit every occasion. We pride ourselves on offering quality fabrics and stylish designs at competitive prices. Whether you're shopping for daily wear, festive occasions, or special events, our extensive collection has something for everyone. Our knowledgeable staff is dedicated to helping you find the perfect outfit that matches your style and budget. Visit Affan Garments for a personalized shopping experience in the heart of Rasauli Bazar.",
    tags: ["clothing", "fashion", "garments", "ethnic-wear", "casual-wear", "formal-wear", "men-fashion", "women-fashion", "kids-clothing", "traditional-wear"],
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
    mapLink: "https://maps.google.com/?q=26.924957,81.262061",
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
  },
  {
    id: "hind-pharmacy",
    name: "Hind Pharmacy",
    category: "Healthcare & Pharmacy",
    categorySlug: "healthcare",
    featured: false,
    verified: false,
    status: "open",
    rating: 0,
    reviewCount: 0,
    reviews: [],
    address: "Village & Post Rasauli, District Barabanki, Near Galla Bazar, Uttar Pradesh 225203",
    mapLink: "https://maps.google.com/?q=26.9248848,81.2620547",
    phone: "+91 80815 88195",
    email: "",
    website: "",
    whatsapp: "+91 80815 88195",
    hours: {
      mon: {open: "10:00", close: "19:00"},
      tue: {open: "10:00", close: "19:00"},
      wed: {open: "10:00", close: "19:00"},
      thu: {open: "10:00", close: "19:00"},
      fri: {open: "10:00", close: "19:00"},
      sat: {open: "10:00", close: "19:00"},
      sun: {open: "10:00", close: "19:00"}
    },
    description: "Hind Pharmacy is your trusted healthcare partner in Rasauli, providing comprehensive pharmaceutical services and healthcare products. Managed by Anas, we stock a wide range of prescription medications, over-the-counter medicines, health supplements, vitamins, and wellness products. Our experienced pharmacists are available to provide expert consultation on medication usage, dosage instructions, and potential drug interactions. We offer services including prescription filling, medicine home delivery, health check-up packages, and medical equipment sales. Our pharmacy maintains strict quality standards and ensures all medicines are sourced from authorized distributors. We also provide first-aid supplies, baby care products, personal care items, and diabetic care products. With a commitment to your health and well-being, we ensure accurate dispensing, competitive pricing, and friendly customer service. Contact Anas for all your healthcare and pharmaceutical needs in Rasauli.",
    tags: ["pharmacy", "medicines", "healthcare", "prescription", "medical-store", "health-supplements", "wellness", "first-aid", "medical-equipment"],
    isNew: true
  },
  {
    id: "abdul-hospital",
    name: "Abdul Hospital",
    category: "Healthcare & Medical Services",
    categorySlug: "healthcare",
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
        date: "2026-02-28",
        text: "Abdul Hospital provides excellent medical care for common health issues and emergencies. The staff is professional and caring. However, for very serious or critical conditions, or rare medical cases that require specialized treatment, we recommend consulting larger multi-specialty hospitals with advanced facilities. For routine healthcare, minor emergencies, and general medical needs, this hospital is a reliable choice in Rasauli.",
        verified: true
      }
    ],
    address: "Village & Post Rasauli, District Barabanki, W7F6+RQX, Rasauli Bazar, Near Hind Pharmacy, Uttar Pradesh 225203",
    mapLink: "https://maps.google.com/?q=26.9246097,81.2619726",
    phone: "+91 96215 27752",
    email: "abdulhospital786@gmail.com",
    website: "https://abdulhospitalwebsite.blogspot.com/",
    whatsapp: "+91 96215 27752",
    hours: {
      mon: {open: "00:00", close: "23:59"},
      tue: {open: "00:00", close: "23:59"},
      wed: {open: "00:00", close: "23:59"},
      thu: {open: "00:00", close: "23:59"},
      fri: {open: "00:00", close: "23:59"},
      sat: {open: "00:00", close: "23:59"},
      sun: {open: "00:00", close: "23:59"}
    },
    description: "Abdul Hospital is a trusted healthcare facility serving the Rasauli community with comprehensive medical services around the clock. Operating 24/7, we provide emergency care, general medicine consultations, diagnostic services, and treatment for a wide range of health conditions. Our experienced medical team includes qualified doctors, nurses, and support staff dedicated to patient care and well-being. We offer services including emergency treatment, outpatient consultations, minor surgical procedures, laboratory tests, X-ray facilities, pharmacy services, and patient admission facilities. Our hospital is equipped with modern medical equipment and maintains high standards of hygiene and patient safety. We specialize in treating common illnesses, injuries, fever, infections, and providing maternal and child healthcare. With affordable healthcare services and compassionate care, Abdul Hospital is committed to serving the medical needs of Rasauli and surrounding areas. Available 24 hours a day, 7 days a week for all your healthcare emergencies and medical consultations.",
    tags: ["hospital", "emergency-care", "24x7", "medical-services", "healthcare", "doctor", "clinic", "diagnostic", "laboratory", "patient-care"],
    isNew: true
  },
  {
    id: "rajju-pankaj-sweets",
    name: "Rajju/Pankaj Sweets",
    category: "Food & Beverages",
    categorySlug: "food-beverages",
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
        date: "2026-02-28",
        text: "Rajju/Pankaj Sweets is hands down the best sweet shop in the entire Rasauli region! The taste of their sweets is absolutely delicious and authentic - you can tell they use premium quality ingredients and traditional recipes. Their ice cream selection is fantastic with rich, creamy flavors that are perfect for any season. The namkeen varieties are fresh and crispy, making them ideal for snacking or gifting. Their custom cakes are beautifully crafted and taste amazing for celebrations. The shop maintains excellent hygiene standards and the staff is always friendly and helpful. Whether you're buying sweets for festivals, celebrations, or just treating yourself, this is the place to go. The prices are reasonable for the quality you get, and everything is made fresh daily. From classic Indian sweets like gulab jamun and barfi to modern fusion desserts, they have it all. Highly recommended for anyone in Rasauli looking for authentic, delicious sweets and confectionery. A must-visit destination for sweet lovers!",
        verified: true
      }
    ],
    address: "Village & Post Rasauli, District Barabanki, near Rasauli bazar, W7F6+MH Rasauli, Uttar Pradesh 225203",
    mapLink: "https://www.google.com/maps/place/pankaj+sweets/@26.9247497,81.2603771,17.87z/data=!4m6!3m5!1s0x39996218473a57d5:0xa3aaace34f32af13!8m2!3d26.924135!4d81.2614237!16s%2Fg%2F11c71d06n8?entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D",
    phone: "+91 99356 86532",
    email: "",
    website: "",
    whatsapp: "+91 99356 86532",
    hours: {
      mon: {open: "08:00", close: "21:00"},
      tue: {open: "08:00", close: "21:00"},
      wed: {open: "08:00", close: "21:00"},
      thu: {open: "08:00", close: "21:00"},
      fri: {open: "08:00", close: "21:00"},
      sat: {open: "08:00", close: "21:00"},
      sun: {open: "08:00", close: "21:00"}
    },
    description: "Rajju/Pankaj Sweets is the premier destination for authentic Indian sweets and confectionery in Rasauli. We specialize in traditional sweets made with the finest ingredients and time-honored recipes that deliver exceptional taste and quality. Our extensive menu includes a delightful variety of fresh sweets, premium ice creams in multiple flavors, savory namkeen snacks, custom celebration cakes for all occasions, refreshing cold drinks and beverages, and seasonal specialties. Each sweet is crafted with care to ensure authentic flavors and freshness. Whether you're celebrating a special occasion, looking for the perfect gift, or simply craving something sweet, we have something for everyone. Our shop is known throughout Rasauli for the delicious taste of our sweets and the quality of our products. We also offer custom cake orders for birthdays, anniversaries, and celebrations. Visit us to experience the best sweets, ice cream, namkeen, and cakes in Rasauli, where tradition meets taste.",
    tags: ["sweets", "ice-cream", "namkeen", "cakes", "desserts", "beverages", "indian-sweets", "confectionery", "snacks", "celebration-cakes"],
    isNew: true
  },
  {
    id: "friend-fitness-gym",
    name: "Friend Fitness GYM",
    category: "Fitness & Wellness",
    categorySlug: "fitness-wellness",
    featured: true,
    verified: true,
    status: "open",
    rating: 4.0,
    reviewCount: 1,
    reviews: [
      {
        id: "review-1",
        author: "Admin",
        role: "LocalFind Team",
        rating: 4.0,
        date: "2026-02-28",
        text: "Friend Fitness GYM is the best and only gym in Rasauli, making it an essential fitness destination for the community. The gym is well-equipped with quality equipment for strength training, cardio, and functional fitness. Dileep Rawat, the owner, is dedicated and knowledgeable, providing good guidance to members. For the best experience, I highly recommend visiting during the early morning sessions (4 AM to 7 AM) when it's less crowded and you can focus on your workout with minimal distractions. If you prefer evening workouts, try to come after 8 PM for a more peaceful environment. The gym can get busy during peak hours (early evening 6-8 PM), so plan accordingly. The facilities are clean and well-maintained, and the membership rates are reasonable. Whether you're a beginner or an experienced fitness enthusiast, this gym offers everything you need to achieve your fitness goals. A solid choice for anyone serious about fitness in Rasauli!",
        verified: true
      }
    ],
    address: "Village & Post Rasauli, District Barabanki, near Family Dhaba, Uttar Pradesh 225001",
    mapLink: "https://www.google.com/maps/@26.9236503,81.2536441,21z?entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D",
    phone: "+91 88407 04318",
    phoneName: "Dileep Rawat",
    email: "rawatdilip516@gmail.com",
    website: "",
    whatsapp: "+91 88407 04318",
    hours: {
      mon: {open: "04:00", close: "07:00", open2: "18:00", close2: "22:00"},
      tue: {open: "04:00", close: "07:00", open2: "18:00", close2: "22:00"},
      wed: {open: "04:00", close: "07:00", open2: "18:00", close2: "22:00"},
      thu: {open: "04:00", close: "07:00", open2: "18:00", close2: "22:00"},
      fri: {open: "04:00", close: "07:00", open2: "18:00", close2: "22:00"},
      sat: {open: "04:00", close: "07:00", open2: "18:00", close2: "22:00"},
      sun: {open: "04:00", close: "07:00", open2: "18:00", close2: "22:00"}
    },
    description: "Friend Fitness GYM is Rasauli's premier fitness center, dedicated to helping you achieve your health and fitness goals. Managed by experienced fitness professional Dileep Rawat, we offer a complete range of gym facilities and services for all fitness levels. Our gym features modern strength training equipment including free weights, dumbbells, barbells, and weight machines, cardio equipment such as treadmills, exercise bikes, and cross trainers, functional training areas, and dedicated spaces for stretching and warm-up exercises. We provide personalized workout plans, professional fitness guidance, weight loss programs, muscle building training, and general fitness coaching. Whether you're looking to lose weight, build muscle, improve stamina, or maintain overall fitness, our supportive environment and quality equipment will help you succeed. We operate in two convenient shifts - early morning (4 AM to 7 AM) for early risers and evening (6 PM to 10 PM) for those who prefer after-work sessions. Join Friend Fitness GYM and start your transformation journey today with expert guidance and a motivating atmosphere.",
    tags: ["gym", "fitness", "workout", "weight-training", "cardio", "health", "bodybuilding", "exercise", "fitness-center", "personal-training"],
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
