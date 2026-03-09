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
 *   coordinates: {lat: 26.9230, lng: 81.2608},  // GPS coordinates for map display
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
    coordinates: { lat: 26.9230278, lng: 81.2608333 },
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
    mapLink: "https://maps.app.goo.gl/sHcSAkevGAPCKDhSA",
    phone: "+91 91405 15707",
    email: "moraheem862@gmail.com",
    website: "",
    whatsapp: "+91 91405 15707",
    hours: {
      mon: { open: "09:00", close: "19:00" },
      tue: { open: "09:00", close: "19:00" },
      wed: { open: "09:00", close: "19:00" },
      thu: { open: "09:00", close: "19:00" },
      fri: { open: "00:00", close: "00:00" },
      sat: { open: "09:00", close: "19:00" },
      sun: { open: "09:00", close: "19:00" }
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
    coordinates: { lat: 26.9230278, lng: 81.2609167 },
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
    mapLink: "https://maps.app.goo.gl/9LD5tPFQh7qdWbu17",
    phone: "+91 63068 84047",
    email: "amanyadav92471@gmail.com",
    website: "",
    whatsapp: "+91 63068 84047",
    instagram: "https://www.instagram.com/aman_garments_rasauli",
    hours: {
      mon: { open: "08:00", close: "23:00" },
      tue: { open: "08:00", close: "23:00" },
      wed: { open: "08:00", close: "23:00" },
      thu: { open: "08:00", close: "23:00" },
      fri: { open: "08:00", close: "23:00" },
      sat: { open: "08:00", close: "23:00" },
      sun: { open: "08:00", close: "23:00" }
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
    coordinates: { lat: 26.9239722, lng: 81.2612222 },
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
    mapLink: "https://maps.app.goo.gl/gQxABHCE634v2JXS9",
    phone: "+91 84234 19973",
    phoneName: "Affan",
    phoneSecondary: "+91 63062 03254",
    phoneSecondaryName: "Noman",
    email: "",
    website: "",
    whatsapp: "+91 63062 03254",
    hours: {
      mon: { open: "10:00", close: "21:00" },
      tue: { open: "10:00", close: "21:00" },
      wed: { open: "10:00", close: "21:00" },
      thu: { open: "10:00", close: "21:00" },
      fri: { open: "10:00", close: "21:00" },
      sat: { open: "10:00", close: "21:00" },
      sun: { open: "10:00", close: "21:00" }
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
    coordinates: { lat: 26.9249722, lng: 81.2620556 },
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
    mapLink: "https://maps.app.goo.gl/RzzAqLBvtXKWQY419",
    phone: "+91 72751 13274",
    email: "",
    website: "",
    whatsapp: "+91 72751 13274",
    hours: {
      mon: { open: "10:00", close: "18:00" },
      tue: { open: "10:00", close: "18:00" },
      wed: { open: "10:00", close: "18:00" },
      thu: { open: "10:00", close: "18:00" },
      fri: { open: "10:00", close: "18:00" },
      sat: { open: "10:00", close: "18:00" },
      sun: { open: "10:00", close: "18:00" }
    },
    description: "Shariq Hashmi Electric Shop is your trusted electrical service provider in Rasauli, offering comprehensive solutions for residential and commercial properties. We specialize in house wiring, electrical installations, earthing systems, circuit repairs, and maintenance. Our expert team handles new setups, troubleshooting, switchboard installations, lighting fixtures, fan installations, and emergency repairs. With years of experience, we ensure safe and reliable electrical solutions using quality materials and following all safety standards. Whether you need complete rewiring or a simple repair, we deliver efficient and affordable services with excellent customer care.",
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
    coordinates: { lat: 26.9248889, lng: 81.2620556 },
    reviews: [],
    address: "Village & Post Rasauli, District Barabanki, Near Galla Bazar, Uttar Pradesh 225203",
    mapLink: "https://maps.google.com/?q=26.9248848,81.2620547",
    phone: "+91 80815 88195",
    email: "",
    website: "",
    bloodDonor: "https://www.friends2support.org/",
    whatsapp: "+91 80815 88195",
    hours: {
      mon: { open: "10:00", close: "19:00" },
      tue: { open: "10:00", close: "19:00" },
      wed: { open: "10:00", close: "19:00" },
      thu: { open: "10:00", close: "19:00" },
      fri: { open: "10:00", close: "19:00" },
      sat: { open: "10:00", close: "19:00" },
      sun: { open: "10:00", close: "19:00" }
    },
    description: "Hind Pharmacy is your trusted healthcare partner in Rasauli, managed by Anas. We stock prescription medications, over-the-counter medicines, health supplements, vitamins, and wellness products. Our experienced pharmacists provide expert consultation on medication usage, dosage, and drug interactions. We offer prescription filling, medicine home delivery, health check-ups, and medical equipment sales. All medicines are sourced from authorized distributors with strict quality standards. We also provide first-aid supplies, baby care, personal care, and diabetic care products. Contact Anas for accurate dispensing, competitive pricing, and friendly service for all your healthcare needs.",
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
    coordinates: { lat: 26.9246097, lng: 81.2619726 },
    reviews: [
      {
        id: "review-1",
        author: "Admin",
        role: "LocalFind Team",
        rating: 5.0,
        date: "2026-02-28",
        text: "Abdul Hospital provides excellent medical care for common health issues and emergencies with professional and caring staff. For very serious or critical conditions requiring specialized treatment, we recommend larger multi-specialty hospitals. For routine healthcare, minor emergencies, and general medical needs, this is a reliable choice in Rasauli.",
        verified: true
      }
    ],
    address: "Village & Post Rasauli, District Barabanki, W7F6+RQX, Rasauli Bazar, Near Hind Pharmacy, Uttar Pradesh 225203",
    mapLink: "https://maps.app.goo.gl/Ga6CQSChfh1UZK1w8",
    phone: "+91 96215 27752",
    email: "abdulhospital786@gmail.com",
    website: "https://abdulhospitalwebsite.blogspot.com/",
    bloodDonor: "https://www.friends2support.org/",
    whatsapp: "+91 96215 27752",
    hours: {
      mon: { open: "00:00", close: "23:59" },
      tue: { open: "00:00", close: "23:59" },
      wed: { open: "00:00", close: "23:59" },
      thu: { open: "00:00", close: "23:59" },
      fri: { open: "00:00", close: "23:59" },
      sat: { open: "00:00", close: "23:59" },
      sun: { open: "00:00", close: "23:59" }
    },
    description: "Abdul Hospital is a trusted 24/7 healthcare facility serving Rasauli with comprehensive medical services. We provide emergency care, general medicine consultations, diagnostic services, and treatment for various health conditions. Our experienced team of qualified doctors, nurses, and support staff is dedicated to patient care. Services include emergency treatment, outpatient consultations, minor surgeries, laboratory tests, X-ray, pharmacy, and patient admission. Equipped with modern medical equipment, we maintain high hygiene and safety standards. We specialize in treating common illnesses, injuries, fever, infections, and providing maternal and child healthcare. Available round the clock for all your healthcare emergencies and medical consultations.",
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
    coordinates: { lat: 26.924135, lng: 81.2614237 },
    reviews: [
      {
        id: "review-1",
        author: "Admin",
        role: "LocalFind Team",
        rating: 5.0,
        date: "2026-02-28",
        text: "Rajju/Pankaj Sweets is the best sweet shop in Rasauli! Their sweets are absolutely delicious and authentic with premium ingredients and traditional recipes. The ice cream is fantastic with rich, creamy flavors. Namkeen varieties are fresh and crispy, perfect for snacking or gifting. Custom cakes are beautifully crafted and taste amazing. The shop maintains excellent hygiene and the staff is friendly and helpful. Prices are reasonable for the quality, and everything is made fresh daily. From classic Indian sweets to modern fusion desserts, they have it all. A must-visit for sweet lovers!",
        verified: true
      }
    ],
    address: "Village & Post Rasauli, District Barabanki, near Rasauli bazar, W7F6+MH Rasauli, Uttar Pradesh 225203",
    mapLink: "https://maps.app.goo.gl/MqywkZjACsXtBGdT9",
    phone: "+91 99356 86532",
    email: "",
    website: "",
    whatsapp: "+91 99356 86532",
    hours: {
      mon: { open: "08:00", close: "21:00" },
      tue: { open: "08:00", close: "21:00" },
      wed: { open: "08:00", close: "21:00" },
      thu: { open: "08:00", close: "21:00" },
      fri: { open: "08:00", close: "21:00" },
      sat: { open: "08:00", close: "21:00" },
      sun: { open: "08:00", close: "21:00" }
    },
    description: "Rajju/Pankaj Sweets is the premier destination for authentic Indian sweets and confectionery in Rasauli. We specialize in traditional sweets made with the finest ingredients and time-honored recipes. Our menu includes fresh sweets, premium ice creams in multiple flavors, savory namkeen snacks, custom celebration cakes, refreshing beverages, and seasonal specialties. Each item is crafted with care to ensure authentic flavors and freshness. Whether celebrating a special occasion, looking for the perfect gift, or craving something sweet, we have it all. Known throughout Rasauli for delicious taste and quality, we also offer custom cake orders for birthdays, anniversaries, and celebrations. Visit us to experience the best sweets, ice cream, namkeen, and cakes in Rasauli.",
    tags: ["sweets", "ice-cream", "namkeen", "cakes", "desserts", "beverages", "indian-sweets", "confectionery", "snacks", "celebration-cakes"],
    isNew: true
  },
  {
    id: "friend-fitness-gym",
    name: "Friends Fitness GYM",
    category: "Fitness & Wellness",
    categorySlug: "fitness-wellness",
    featured: true,
    verified: true,
    status: "open",
    rating: 4.0,
    reviewCount: 1,
    coordinates: { lat: 26.9236389, lng: 81.2541389 },
    reviews: [
      {
        id: "review-1",
        author: "Admin",
        role: "LocalFind Team",
        rating: 4.0,
        date: "2026-02-28",
        text: "Friends Fitness GYM is the best and only gym in Rasauli, making it essential for the community. Well-equipped with quality equipment for strength training, cardio, and functional fitness. Owner Dileep Rawat is dedicated and knowledgeable, providing good guidance. For the best experience, visit during early morning (4-7 AM) when it's less crowded, or after 8 PM for a peaceful environment. Peak hours (6-8 PM) can get busy. Facilities are clean, well-maintained, and membership rates are reasonable. A solid choice for anyone serious about fitness in Rasauli!",
        verified: true
      }
    ],
    address: "Village & Post Rasauli, District Barabanki, near Family Dhaba, Uttar Pradesh 225001",
    mapLink: "https://maps.app.goo.gl/SFhAjQaC6vBy29rp6",
    phone: "+91 88407 04318",
    phoneName: "Dileep Rawat",
    email: "rawatdilip516@gmail.com",
    website: "",
    whatsapp: "+91 88407 04318",
    hours: {
      mon: { open: "04:00", close: "07:00", open2: "18:00", close2: "22:00" },
      tue: { open: "04:00", close: "07:00", open2: "18:00", close2: "22:00" },
      wed: { open: "04:00", close: "07:00", open2: "18:00", close2: "22:00" },
      thu: { open: "04:00", close: "07:00", open2: "18:00", close2: "22:00" },
      fri: { open: "04:00", close: "07:00", open2: "18:00", close2: "22:00" },
      sat: { open: "04:00", close: "07:00", open2: "18:00", close2: "22:00" },
      sun: { open: "00:00", close: "00:00" }
    },
    description: "Friends Fitness GYM is Rasauli's premier fitness center managed by experienced professional Dileep Rawat. We offer complete gym facilities for all fitness levels including modern strength training equipment (free weights, dumbbells, barbells, weight machines), cardio equipment (treadmills, exercise bikes, cross trainers), functional training areas, and stretching spaces. We provide personalized workout plans, professional guidance, weight loss programs, muscle building training, and fitness coaching. Whether you want to lose weight, build muscle, improve stamina, or maintain fitness, our supportive environment helps you succeed. Two convenient shifts: early morning (4-7 AM) and evening (6-10 PM). Closed Sundays. Join us and start your transformation journey today!",
    tags: ["gym", "fitness", "workout", "weight-training", "cardio", "health", "bodybuilding", "exercise", "fitness-center", "personal-training"],
    isNew: true
  },
  {
    id: "golden-csc",
    name: "Golden CSC",
    category: "Government Services & CSC",
    categorySlug: "government-services",
    featured: false,
    verified: false,
    status: "open",
    rating: 3.0,
    reviewCount: 1,
    coordinates: { lat: 26.9234167, lng: 81.2610556 },
    reviews: [
      {
        id: "review-1",
        author: "Admin",
        role: "LocalFind Team",
        rating: 3.0,
        date: "2026-02-28",
        text: "Golden CSC can handle basic government services, but service quality and professionalism are inconsistent. For simple tasks, they might get the job done, but expect delays. We strongly recommend <a href='business-detail.html?id=raheem-common-service-center'>Raheem CSC</a> for reliable and professional service. However, for particularly tricky or complicated work requiring connections, Golden CSC might help through their network. For most people, especially important documents and time-sensitive work, Raheem CSC is the better choice. Use Golden CSC as a last resort or for specific situations where their connections might be beneficial.",
        verified: true
      }
    ],
    address: "Village & Post Rasauli, District Barabanki, Rasauli Bazar, Uttar Pradesh 225001",
    mapLink: "https://maps.app.goo.gl/Q85NLAatyrDAdiLs8",
    phone: "+91 82991 33983",
    email: "",
    website: "",
    whatsapp: "+91 82991 33983",
    hours: {
      mon: { open: "10:00", close: "19:00" },
      tue: { open: "10:00", close: "19:00" },
      wed: { open: "10:00", close: "19:00" },
      thu: { open: "10:00", close: "19:00" },
      fri: { open: "10:00", close: "19:00" },
      sat: { open: "10:00", close: "19:00" },
      sun: { open: "10:00", close: "19:00" }
    },
    description: "Golden CSC (Common Service Center) provides government and digital services in Rasauli including Aadhaar card services, PAN card applications, government certificates (income, caste, domicile), birth and death certificates, and documentation services. We handle bill payments, digital transactions, online form submissions, banking services, insurance applications, and e-governance services. We serve the community with both routine and complex cases that may require additional coordination. Visit us for your government documentation needs.",
    tags: ["csc", "common-service-center", "aadhaar", "pan-card", "government-services", "certificates", "digital-services", "e-governance", "documentation", "bill-payment"],
    isNew: true
  },
  {
    id: "om-dhaba",
    name: "Om Dhaba",
    category: "Restaurants & Food",
    categorySlug: "restaurants",
    featured: false,
    verified: false,
    status: "open",
    rating: 0,
    reviewCount: 0,
    coordinates: { lat: 26.9239213, lng: 81.2535000 },
    reviews: [],
    address: "Barabanki, W7F3+F9P, Uttar Pradesh 225001",
    mapLink: "https://maps.app.goo.gl/uQGpSd1gGLf17zzo9",
    phone: "+91 94534 97384",
    phoneName: "Ram Kishor",
    email: "",
    website: "",
    whatsapp: "+91 94534 97384",
    hours: {
      mon: { open: "00:00", close: "23:59" },
      tue: { open: "00:00", close: "23:59" },
      wed: { open: "00:00", close: "23:59" },
      thu: { open: "00:00", close: "23:59" },
      fri: { open: "00:00", close: "23:59" },
      sat: { open: "00:00", close: "23:59" },
      sun: { open: "00:00", close: "23:59" }
    },
    description: "Om Dhaba is your authentic roadside dining destination in Rasauli, serving delicious home-style food 24/7. We specialize in traditional North Indian cuisine with genuine 'ghar jaisa swaad' (home-like taste). Our menu features fresh rotis, parathas, dal, sabzi, rice dishes, and dhaba favorites. Whether you need breakfast, lunch, late-night dinner, or a quick snack, we're always open. Known for generous portions, affordable prices, and authentic flavors that remind you of home-cooked meals. We maintain high hygiene standards using fresh ingredients and traditional cooking methods. Perfect for truck drivers, travelers, and anyone seeking authentic dhaba food anytime. Stop by for a filling meal that tastes just like home!",
    tags: ["dhaba", "restaurant", "food", "north-indian", "24x7", "roadside-food", "home-style", "traditional-food", "roti", "paratha", "dal", "sabzi"],
    isNew: true
  },
  {
    id: "hala-motors",
    name: "Hala Motors",
    category: "Vehicle Repair & Service",
    categorySlug: "vehicle-repair",
    featured: true,
    verified: true,
    status: "open",
    rating: 5.0,
    reviewCount: 1,
    coordinates: { lat: 26.9226786, lng: 81.2559463 },
    reviews: [
      {
        id: "review-1",
        author: "Admin",
        role: "LocalFind Team",
        rating: 5.0,
        date: "2026-02-28",
        text: "Hala Motors is the best vehicle repair shop in Rasauli with exceptional professionalism in work quality and customer service. Highly skilled mechanics handle everything from routine maintenance to complex repairs, diagnosing issues accurately and fixing them right the first time. Staff maintains professional behavior, explaining problems clearly with transparent pricing and no hidden charges. They handle all vehicle types with expertise, use modern tools and genuine spare parts, complete work on time, and stand behind their repairs. Highly recommended for quality workmanship, honest service, and professional treatment!",
        verified: true
      }
    ],
    address: "Village & Post Rasauli District Barabanki, W7F4+39 Rasauli, Uttar Pradesh 225001",
    mapLink: "https://maps.app.goo.gl/dbciZvSQfX2kakkY7",
    phone: "+91 99186 56350",
    phoneName: "Anas Quraishi",
    email: "",
    website: "https://jsdl.in/DT-99NR3WOMHC7",
    whatsapp: "+91 99186 56350",
    instagram: "https://www.instagram.com/anas_farooqui_0/",
    hours: {
      mon: { open: "09:00", close: "17:00" },
      tue: { open: "09:00", close: "17:00" },
      wed: { open: "09:00", close: "17:00" },
      thu: { open: "09:00", close: "17:00" },
      fri: { open: "09:00", close: "17:00" },
      sat: { open: "09:00", close: "17:00" },
      sun: { open: "00:00", close: "00:00" }
    },
    description: "Hala Motors is Rasauli's premier vehicle repair and service center with skilled mechanics offering professional automotive solutions. We specialize in comprehensive repairs, routine maintenance, engine diagnostics, brake services, suspension repairs, electrical work, and servicing for two-wheelers and four-wheelers. Our workshop has modern diagnostic tools to accurately identify and fix any issue. We use genuine spare parts and follow manufacturer-recommended procedures. Services include oil changes, tire services, battery replacement, AC repair, denting and painting, and complete overhauls. We pride ourselves on transparent pricing, honest assessments, and timely completion. Trust us for reliable, professional, and affordable vehicle repair services. Open Monday to Saturday, 9 AM to 5 PM.",
    tags: ["vehicle-repair", "car-service", "bike-service", "mechanic", "auto-repair", "garage", "maintenance", "two-wheeler", "four-wheeler", "engine-repair", "brake-service"],
    isNew: true
  },
  {
    id: "chandra-shekhar-azad-inter-college",
    name: "Chandra Shekhar Azad Inter College",
    category: "Education & Schools",
    categorySlug: "education",
    featured: true,
    verified: true,
    status: "open",
    rating: 3.0,
    reviewCount: 1,
    coordinates: { lat: 26.9203899, lng: 81.2609952 },
    reviews: [
      {
        id: "review-1",
        author: "Admin",
        role: "LocalFind Team",
        rating: 3.0,
        date: "2026-02-28",
        text: "Chandra Shekhar Azad Inter College is the best UP Board school for Hindi and English Medium in Rasauli. However, management and administration are unprofessional. Most teachers lack professionalism, but some are exceptional. Vikash Jaiswal sir is a genius in Mathematics who can solve JEE Advanced questions with outstanding teaching. Abhey Verma sir teaches Maths and Physics excellently with valuable experience. Abhishek sir handles Chemistry and Social Science but can be unprofessional. The school offers Nursery to 10th with UP Board recognition. For 11th-12th, they're associated with Jay Hind Inter College Barabanki. If you focus on learning from the good teachers, this school provides quality education.",
        verified: true
      }
    ],
    address: "Village & Post Rasauli District Barabanki, W7C6+595, Barabanki, Uttar Pradesh 225203",
    mapLink: "https://maps.app.goo.gl/wEbhax3hJeygYXTq5",
    phone: "+91 99357 67561",
    phoneName: "Madhhu Bala (Principal - Below Class 9th)",
    phoneSecondary: "+91 94529 29640",
    phoneSecondaryName: "Anjali Verma (Principal - Above Class 9th)",
    phoneThird: "+91 90442 97030",
    phoneThirdName: "Lalit Kumar Verma (Manager)",
    phoneFourth: "+91 97932 92246",
    phoneFourthName: "Ravindra Kumar Babu Ji (Document Work)",
    email: "",
    website: "",
    whatsapp: "+91 99357 67561",
    whatsappName: "Madhhu Bala",
    whatsappSecondary: "+91 94529 29640",
    whatsappSecondaryName: "Anjali Verma",
    whatsappThird: "+91 90442 97030",
    whatsappThirdName: "Lalit Kumar Verma",
    whatsappFourth: "+91 97932 92246",
    whatsappFourthName: "Ravindra Kumar Babu Ji",
    hours: {
      mon: { open: "09:00", close: "17:00" },
      tue: { open: "09:00", close: "17:00" },
      wed: { open: "09:00", close: "17:00" },
      thu: { open: "09:00", close: "17:00" },
      fri: { open: "09:00", close: "17:00" },
      sat: { open: "09:00", close: "17:00" },
      sun: { open: "00:00", close: "00:00" }
    },
    description: "Chandra Shekhar Azad Inter College is a recognized UP Board institution in Rasauli, offering education in Hindi and English Medium from Nursery to Class 10th with full UP Board recognition. For Classes 11th-12th, we're associated with Jay Hind Inter College Barabanki. Our curriculum follows UP Board syllabus including Mathematics, Science, Social Studies, Hindi, English, and optional subjects. We have dedicated faculty with subject expertise focusing on academic excellence and personality development. Facilities include classrooms, library, and basic infrastructure. We offer structured learning with regular classes, examinations, and parent-teacher meetings. Admissions open for all classes from Nursery to 10th. Contact our principals or manager for inquiries. Open Monday to Saturday, 9 AM to 5 PM.",
    tags: ["school", "education", "up-board", "hindi-medium", "english-medium", "nursery", "primary-school", "high-school", "inter-college", "coaching", "classes"],
    isNew: true
  },
  {
    id: "shri-shyam-medicals",
    name: "Shri Shyam Medicals",
    category: "Healthcare & Pharmacy",
    categorySlug: "healthcare",
    featured: false,
    verified: false,
    status: "open",
    rating: 0,
    reviewCount: 0,
    coordinates: { lat: 26.9242222, lng: 81.2614444 },
    reviews: [],
    address: "Village & Post Rasauli District, Rasauli Bazar Near Pankaj Sweets, Uttar Pradesh 225203",
    mapLink: "https://maps.app.goo.gl/ntCuyZaRHJ7idkMX7",
    phone: "+91 92609 49998",
    phoneSecondary: "+91 88878 55405",
    email: "",
    website: "",
    bloodDonor: "https://www.friends2support.org/",
    whatsapp: "+91 92609 49998",
    whatsappSecondary: "+91 88878 55405",
    hours: {
      mon: { open: "09:00", close: "21:00" },
      tue: { open: "09:00", close: "21:00" },
      wed: { open: "09:00", close: "21:00" },
      thu: { open: "09:00", close: "21:00" },
      fri: { open: "09:00", close: "21:00" },
      sat: { open: "09:00", close: "21:00" },
      sun: { open: "09:00", close: "21:00" }
    },
    description: "Shri Shyam Medicals is your trusted neighborhood pharmacy in Rasauli, located near Pankaj Sweets. We stock prescription medications, over-the-counter medicines, health supplements, vitamins, and wellness products from reputed brands. We maintain strict quality standards with authorized distributors and proper storage. Our knowledgeable staff assists with medication information, dosage guidance, and health queries. Services include prescription filling, medicine home delivery for elderly and bedridden patients, health monitoring devices, first-aid supplies, baby care, personal hygiene, diabetic care products, and medical equipment. Open daily 9 AM to 9 PM for your convenience. Visit us for all your healthcare and pharmaceutical needs.",
    tags: ["pharmacy", "medical-store", "medicines", "healthcare", "prescription", "health-supplements", "wellness", "first-aid", "baby-care", "diabetic-care"],
    isNew: true
  },
  {
    id: "satyam-footwear",
    name: "Satyam Footwear",
    category: "Fashion & Footwear",
    categorySlug: "fashion",
    featured: false,
    verified: false,
    status: "open",
    rating: 0,
    reviewCount: 0,
    coordinates: { lat: 26.9241667, lng: 81.2613333 },
    reviews: [],
    address: "Village & Post Rasauli District, Rasauli Bazar Near Pankaj Sweets, Uttar Pradesh 225203",
    mapLink: "https://maps.app.goo.gl/zePwKwQZytsyY6hGA",
    phone: "+91 63072 58274",
    phoneName: "Satyam Prajapati",
    email: "",
    website: "",
    whatsapp: "+91 63072 58274",
    whatsappName: "Satyam Prajapati",
    hours: {
      mon: { open: "09:00", close: "20:00" },
      tue: { open: "09:00", close: "20:00" },
      wed: { open: "09:00", close: "20:00" },
      thu: { open: "09:00", close: "20:00" },
      fri: { open: "09:00", close: "20:00" },
      sat: { open: "09:00", close: "20:00" },
      sun: { open: "09:00", close: "20:00" }
    },
    description: "Satyam Footwear is your one-stop destination for quality footwear in Rasauli, near Pankaj Sweets. Managed by Satyam Prajapati, we offer a wide variety for men, women, and children. Our collection includes formal shoes, casual footwear, sports shoes, sandals, slippers, traditional footwear, school shoes, and seasonal collections. We stock trusted brands and affordable local options. Whether you need comfortable daily wear, stylish party shoes, durable work boots, or trendy sneakers, we have it all. We maintain high quality standards with competitive pricing and excellent customer service. Visit us for all your footwear needs - from traditional chappals to modern sports shoes. Open daily 9 AM to 8 PM.",
    tags: ["footwear", "shoes", "sandals", "slippers", "sports-shoes", "formal-shoes", "casual-footwear", "fashion", "men-shoes", "women-shoes", "kids-shoes"],
    isNew: true
  },
  {
    id: "khidmat-enterprises",
    name: "Khidmat Enterprises",
    category: "Furniture & Home Decor",
    categorySlug: "furniture",
    featured: true,
    verified: true,
    status: "open",
    rating: 5.0,
    reviewCount: 1,
    coordinates: { lat: 26.9231944, lng: 81.2561667 },
    reviews: [
      {
        id: "review-1",
        author: "Admin",
        role: "LocalFind Team",
        rating: 5.0,
        date: "2026-03-02",
        text: "Khidmat Enterprises is the best furniture brand in Rasauli! Quality is absolutely top-notch - genuine A1 grade craftsmanship that lasts. The team (Faizal, Asjad, and Akhlad) are wonderful people who genuinely care about customer satisfaction. They listen carefully and provide expert guidance. Their custom furniture projects are impressive - they bring any design vision to life with precision. Whether you need a bed, sofa, dressing table, wardrobe, or custom piece, they deliver excellence. Pricing is very reasonable for the premium quality. High-quality materials and impeccable finishing. The entire experience from consultation to delivery is smooth and professional. Highly recommended!",
        verified: true
      }
    ],
    address: "Village & Post Rasauli District, Near Starting of the Over-Bridge, Uttar Pradesh 225001",
    mapLink: "https://maps.app.goo.gl/1ARtbuJGEiKLcnQq5",
    phone: "+91 82997 24104",
    phoneName: "Faizal",
    phoneSecondary: "+91 87075 15099",
    phoneSecondaryName: "Asjad",
    phoneThird: "+91 83760 50734",
    phoneThirdName: "Faizal (2nd number)",
    phoneFourth: "+91 93350 70055",
    phoneFourthName: "Akhlad",
    email: "",
    website: "",
    whatsapp: "+91 82997 24104",
    whatsappName: "Faizal",
    whatsappSecondary: "+91 87075 15099",
    whatsappSecondaryName: "Asjad",
    whatsappThird: "+91 83760 50734",
    whatsappThirdName: "Faizal (2nd number)",
    whatsappFourth: "+91 93350 70055",
    whatsappFourthName: "Akhlad",
    hours: {
      mon: { open: "09:00", close: "18:00" },
      tue: { open: "09:00", close: "18:00" },
      wed: { open: "09:00", close: "18:00" },
      thu: { open: "09:00", close: "18:00" },
      fri: { open: "09:00", close: "18:00" },
      sat: { open: "09:00", close: "18:00" },
      sun: { open: "09:00", close: "18:00" }
    },
    description: "Khidmat Enterprises is Rasauli's premier custom furniture manufacturer and design studio. Led by experienced craftsmen Faizal, Asjad, and Akhlad, we create high-quality, handcrafted furniture tailored to your specifications. We make beds, sofas, dressing tables, wardrobes, dining tables, chairs, TV units, study tables, kitchen cabinets, and more. We specialize in custom projects - creating furniture from scratch based on your vision, space, and budget. We use premium wood, hardware, and finishing materials for durability and aesthetics. Services include design consultation, 3D visualization, material selection, custom manufacturing, finishing, polishing, and installation. Whether you need modern contemporary, traditional classic, or minimalist designs, we craft with precision. We work with solid wood, plywood, MDF, and engineered wood. Our workshop has modern tools for complex designs. We pride ourselves on timely delivery, transparent pricing, and exceptional after-sales service. Open daily 9 AM to 6 PM.",
    tags: ["furniture", "custom-furniture", "beds", "sofas", "dressing-tables", "wardrobes", "home-decor", "interior-design", "woodwork", "carpentry", "custom-design"],
    isNew: true
  },
  {
    id: "rasauli-hardware",
    name: "Rasauli Hardware",
    category: "Hardware & Building Materials",
    categorySlug: "hardware",
    featured: true,
    verified: true,
    status: "open",
    rating: 5.0,
    reviewCount: 1,
    coordinates: { lat: 26.9230833, lng: 81.2564167 },
    reviews: [
      {
        id: "review-1",
        author: "Admin",
        role: "LocalFind Team",
        rating: 5.0,
        date: "2026-03-02",
        text: "Rasauli Hardware is the best hardware shop in Rasauli! They stock only high-quality products and A1 grade materials you can trust. Owner Noor Alam provides exceptional service with professional behavior. Extensive range includes premium wooden doors in various designs, high-quality plywood from reputed brands, building materials, tools, fittings, locks, hinges, handles, paints, adhesives, and all essential hardware. Their product knowledge is excellent with honest recommendations. Quality is consistently top-notch with no compromise. Pricing is fair and competitive. Good stock levels mean rare unavailability. Conveniently located near the Over-Bridge. Highly recommended for quality materials, expert guidance, and excellent service!",
        verified: true
      }
    ],
    address: "Village & Post Rasauli District, Near Starting of the Over-Bridge, Uttar Pradesh 225001",
    mapLink: "https://maps.app.goo.gl/5egeeT3KtujfWEnNA",
    phone: "+91 83037 39404",
    phoneName: "Noor Alam",
    email: "",
    website: "",
    whatsapp: "+91 83037 39404",
    whatsappName: "Noor Alam",
    hours: {
      mon: { open: "09:30", close: "18:00" },
      tue: { open: "09:30", close: "18:00" },
      wed: { open: "09:30", close: "18:00" },
      thu: { open: "09:30", close: "18:00" },
      fri: { open: "09:30", close: "18:00" },
      sat: { open: "09:30", close: "18:00" },
      sun: { open: "09:30", close: "18:00" }
    },
    description: "Rasauli Hardware is your trusted one-stop shop for hardware and building materials near the Over-Bridge. Managed by Noor Alam, we provide premium quality products for residential, commercial, and industrial projects. Our inventory includes high-quality wooden doors (panel, flush, decorative, custom designs), premium plywood from leading brands, building hardware (cement, sand, bricks, steel, TMT bars, roofing, tiles), sanitary and bathroom fixtures, kitchen fittings, electrical items, wiring accessories, switches, MCBs, pipes and plumbing materials, paints and coatings, adhesives, tools, locks and security hardware, door and window fittings, hinges, handles, and more. We stock only A1 grade materials from reputed manufacturers. Our team provides expert consultation for your requirements, budget, and project scope. We offer competitive pricing, bulk discounts, and reliable delivery. Open daily 9:30 AM to 6 PM.",
    tags: ["hardware", "building-materials", "wooden-doors", "plywood", "construction", "tools", "paints", "plumbing", "electrical", "home-improvement", "renovation"],
    isNew: true
  },
  {
    id: "kartik-medical-store",
    name: "Kartik Medical Store",
    category: "Healthcare & Pharmacy",
    categorySlug: "healthcare",
    featured: false,
    verified: false,
    status: "open",
    rating: 0,
    reviewCount: 0,
    coordinates: { lat: 26.9231907, lng: 81.2608735 },
    reviews: [],
    address: "Village & Post Rasauli District, Shop No 02, Bazzar Road, Barabanki, Rasauli, Uttar Pradesh 225203",
    mapLink: "https://maps.app.goo.gl/yJkBVrBr9XtyGv2T6",
    phone: "+91 90266 16696",
    email: "",
    website: "",
    bloodDonor: "https://www.friends2support.org/",
    whatsapp: "+91 90266 16696",
    hours: {
      mon: { open: "09:30", close: "22:00" },
      tue: { open: "09:30", close: "22:00" },
      wed: { open: "09:30", close: "22:00" },
      thu: { open: "09:30", close: "22:00" },
      fri: { open: "09:30", close: "22:00" },
      sat: { open: "09:30", close: "22:00" },
      sun: { open: "09:30", close: "22:00" }
    },
    description: "Kartik Medical Store is your reliable neighborhood pharmacy at Shop No 02, Bazzar Road, Rasauli. We maintain a well-stocked inventory of prescription medications, over-the-counter medicines, health supplements, vitamins, minerals, wellness products, and healthcare essentials from trusted brands. All medicines are sourced from authorized distributors and stored under proper temperature-controlled conditions. Our knowledgeable staff assists with medication information, dosage instructions, drug interactions, and health queries. Services include prescription filling, medicine home delivery for elderly and bedridden patients, health monitoring devices (BP monitors, glucometers), first-aid supplies, baby care products, personal care items, diabetic care products, surgical supplies, medical equipment, and health consultation. Open 9:30 AM to 10 PM daily with extended hours. We prioritize customer health, maintain strict quality standards, and offer competitive pricing. Your health is our priority.",
    tags: ["pharmacy", "medical-store", "medicines", "healthcare", "prescription", "health-supplements", "wellness", "first-aid", "baby-care", "diabetic-care"],
    isNew: true
  },
  {
    id: "suraj-kumar-clothing-store",
    name: "Suraj Kumar Clothing Store",
    category: "Fashion & Apparel",
    categorySlug: "fashion",
    featured: false,
    verified: false,
    status: "open",
    rating: 0,
    reviewCount: 0,
    coordinates: { lat: 26.9246194, lng: 81.2612665 },
    reviews: [],
    address: "Village & Post Rasauli District, In Rasauli Bazar, Suraj Kumar Clothing Shop, Rasauli, Barabanki, Uttar Pradesh 225203",
    mapLink: "https://maps.app.goo.gl/aehRADgJmPL452tr5",
    phone: "+91 89579 61893",
    email: "",
    website: "",
    whatsapp: "+91 89579 61893",
    hours: {
      mon: { open: "09:00", close: "20:00" },
      tue: { open: "09:00", close: "20:00" },
      wed: { open: "09:00", close: "20:00" },
      thu: { open: "09:00", close: "20:00" },
      fri: { open: "09:00", close: "20:00" },
      sat: { open: "09:00", close: "20:00" },
      sun: { open: "09:00", close: "20:00" }
    },
    description: "Suraj Kumar Clothing Store is your destination for fashionable and affordable clothing in Rasauli Bazar. We offer a diverse collection for men, women, and children. Our range includes traditional ethnic wear (kurtas, salwar suits, sarees, sherwanis) for special occasions and festivals, trendy casual wear (jeans, t-shirts, shirts, tops, western outfits), formal wear for office settings, seasonal collections with latest trends, kids' clothing with comfortable and colorful options, traditional and modern fusion wear, party wear and festive collections, and accessories. We curate quality fabrics, good stitching, and stylish designs at competitive prices. Whether shopping for daily wear, weddings, festivals, or something special, you'll find variety. Our friendly staff helps you find the perfect outfit for your style, occasion, and budget. Located conveniently in Rasauli Bazar. Open daily 9 AM to 8 PM.",
    tags: ["clothing", "fashion", "garments", "ethnic-wear", "casual-wear", "formal-wear", "kids-clothing", "traditional-wear", "party-wear", "apparel"],
    isNew: true
  },
  {
    id: "janta-clinic",
    name: "Janta Clinic",
    category: "Healthcare & Medical Services",
    categorySlug: "healthcare",
    featured: false,
    verified: false,
    status: "open",
    rating: 0,
    reviewCount: 0,
    coordinates: { lat: 26.9252745, lng: 81.2622634 },
    reviews: [],
    address: "Village & Post Rasauli District, In Rasauli Bazar, W7G6+4VH, Uttar Pradesh 225203",
    mapLink: "https://maps.app.goo.gl/qCXk6fHbr8Cei5tM7",
    phone: "+91 89539 85147",
    phoneName: "Dharmendra",
    email: "",
    website: "",
    bloodDonor: "https://www.friends2support.org/",
    whatsapp: "+91 89539 85147",
    whatsappName: "Dharmendra",
    hours: {
      mon: { open: "09:00", close: "20:00" },
      tue: { open: "09:00", close: "20:00" },
      wed: { open: "09:00", close: "20:00" },
      thu: { open: "09:00", close: "20:00" },
      fri: { open: "09:00", close: "20:00" },
      sat: { open: "09:00", close: "20:00" },
      sun: { open: "09:00", close: "20:00" }
    },
    description: "Janta Clinic is a trusted healthcare facility serving Rasauli with comprehensive medical services and compassionate care. Led by Dr. Dharmendra, we provide accessible and affordable healthcare. Services include general medicine consultations for common illnesses, fever, infections, chronic conditions, preventive healthcare and check-ups, treatment for seasonal diseases, minor injury treatment and wound care, blood pressure and diabetes management, respiratory illness treatment, digestive disorders, skin conditions and dermatology, pediatric care, women's health services, vaccination and immunization, health counseling and lifestyle guidance, prescription services, and specialist referrals. Equipped with basic diagnostic facilities in a clean, hygienic environment. Dr. Dharmendra brings years of experience with a patient-first approach. We believe in preventive care and patient education. Affordable consultation fees make quality healthcare accessible. Located conveniently in Rasauli Bazar. Open daily 9 AM to 8 PM.",
    tags: ["clinic", "healthcare", "doctor", "medical-services", "general-medicine", "consultation", "health-checkup", "treatment", "patient-care", "family-doctor"],
    isNew: true
  },
  {
    id: "sk-tent-light-house",
    name: "SK Tent & Light House",
    category: "Event Services & Rentals",
    categorySlug: "event-services",
    featured: true,
    verified: true,
    status: "open",
    rating: 5.0,
    reviewCount: 1,
    coordinates: { lat: 26.9257475, lng: 81.2612005 },
    reviews: [
      {
        id: "review-1",
        author: "LocalFind Admin",
        role: "LocalFind Team",
        rating: 5,
        text: "Highly recommended! SK Tent & Light House has consistently demonstrated exceptional professionalism and service excellence in the Rasauli community. Their comprehensive event solutions, from elegant tent setups to stunning lighting arrangements, have transformed countless celebrations into memorable experiences. The team's attention to detail, punctuality, and commitment to client satisfaction sets them apart. They handle everything from intimate family gatherings to grand wedding celebrations with equal dedication. Their extensive inventory is well-maintained, and their pricing is transparent and competitive. What truly impresses us is their personalized approach, they take time to understand each client's vision and budget, offering creative solutions that exceed expectations. The team's expertise in stage decoration, mandap setups, and complete event coordination is remarkable. Their 9 AM to 8 PM availability and multiple contact options make them easily accessible. As a verified business on LocalFind, they exemplify the quality and reliability we promote. Whether you're planning a wedding, corporate event, or any celebration, SK Tent & Light House is your trusted partner for creating magical moments. Proud to have them serve our community!",
        date: "2026-03-08",
        verified: true
      }
    ],
    address: "Village & Post Rasauli District, Near Primary Govt School, KATRA MOHALLA, W7G6+FF, Rasauli, Barabanki, Uttar Pradesh 225203",
    mapLink: "https://maps.app.goo.gl/Y3B8Q6WUctiXWezE6",
    phone: "+91 70071 26025",
    phoneName: "Mohammad Shahnawaz",
    phoneSecondary: "+91 72758 59970",
    phoneSecondaryName: "Mohammad Shahnawaz",
    phoneThird: "+91 96952 69513",
    phoneThirdName: "Chand Babu",
    email: "",
    website: "",
    whatsapp: "+91 70071 26025",
    whatsappName: "Mohammad Shahnawaz",
    whatsappSecondary: "+91 72758 59970",
    whatsappSecondaryName: "Mohammad Shahnawaz",
    whatsappThird: "+91 96952 69513",
    whatsappThirdName: "Chand Babu",
    instagram: "https://www.instagram.com/shahnawaz007__",
    hours: {
      mon: { open: "09:00", close: "20:00" },
      tue: { open: "09:00", close: "20:00" },
      wed: { open: "09:00", close: "20:00" },
      thu: { open: "09:00", close: "20:00" },
      fri: { open: "09:00", close: "20:00" },
      sat: { open: "09:00", close: "20:00" },
      sun: { open: "09:00", close: "20:00" }
    },
    description: "SK Tent & Light House is Rasauli's premier event decoration and rental service provider, making your special occasions memorable and visually stunning. We offer comprehensive tent and lighting solutions for weddings, receptions, birthdays, corporate events, religious ceremonies, and celebrations. Our inventory includes elegant wedding tents and shamianas in various sizes, decorative lighting (fairy lights, LED lights, chandeliers, festive illumination), stage decoration and backdrops, mandap decoration for weddings, seating arrangements with chairs, tables, and furniture rentals, sound systems and DJ equipment, catering equipment and crockery, red carpet and walkway decorations, floral arrangements, entrance gate decorations, and complete event setup. Our experienced team works closely with clients to understand their vision, theme, and budget. From intimate gatherings to grand weddings, we handle events of any scale. We ensure timely setup, proper installation, and safe operation. We use high-quality materials and maintain excellent inventory condition. Our lighting creates perfect ambiance, transforming spaces into magical venues. We offer flexible packages, competitive pricing, and reliable service. Services include consultation, site visit, design planning, equipment delivery, complete setup, event support, and post-event cleanup. Located near Primary Govt School in Katra Mohalla. Open daily 9 AM to 8 PM.",
    tags: ["tent-house", "event-services", "wedding-decoration", "lighting", "party-rentals", "event-planning", "shamianas", "stage-decoration", "catering-equipment", "celebration"],
    upiId: "7007126025@naviaxis",
    upiName: "SK Tent & Light House",
    isNew: true
  },
  {
    id: "balemora-wellness-retreats",
    name: "Balemora Wellness Retreats",
    category: "Health Resort & Wellness",
    categorySlug: "wellness",
    featured: true,
    verified: true,
    status: "open",
    rating: 5.0,
    reviewCount: 0,
    coordinates: { lat: 26.9220302, lng: 81.2581160 },
    reviews: [],
    address: "HGG Campus, Railway Station, NH-28, Ayodhya - Lucknow Rd, opposite Rasauli, behind Seth M.R. Jaipuria School, lucknow, Rasauli, Uttar Pradesh 225203",
    mapLink: "https://maps.app.goo.gl/WKpiLWGSBUKesZzcA",
    phone: "+91 90054 30333",
    email: "",
    website: "https://balemorawellnessretreats.com/",
    whatsapp: "+91 90054 30333",
    hours: {
      mon: { open: "00:00", close: "23:59" },
      tue: { open: "00:00", close: "23:59" },
      wed: { open: "00:00", close: "23:59" },
      thu: { open: "00:00", close: "23:59" },
      fri: { open: "00:00", close: "23:59" },
      sat: { open: "00:00", close: "23:59" },
      sun: { open: "00:00", close: "23:59" }
    },
    description: "Balemora Wellness Retreats is a luxury wellness resort where ancient Ayurvedic wisdom meets modern holistic healing. This 20-unit premium destination operates 24/7 with check-in at 8 AM and check-out at midnight. We offer comprehensive Ayurvedic treatments, authentic Kerala therapies, yoga and meditation sessions, personalized detox programs, and mindful wellness cuisine. Located at NH27 Lucknow (near Bara Banki) and Almora in Uttarakhand, we create a sanctuary for families, couples, and wellness seekers. Our full-service spa features deep-tissue, hot stone, sports, Swedish massages, aromatherapy, Ayurvedic treatments, and hydrotherapy with mud bath, sauna, hot tub, and steam room. Spa open daily with hot springs/mineral springs on site. Enjoy 2 outdoor pools, 2 indoor pools, garden, outdoor entertainment area, and walkway to water. Wheelchair-accessible pool, restaurant, and lounge with well-lit paths and stair-free entrance. Dining includes restaurant, coffee shop, free full breakfast (8-10 AM), free daily reception, and 24-hour room service. Climate-controlled rooms feature balcony, separate dining and sitting areas, private bathroom with bathtub and shower, desk, and free WiFi (500+ Mbps). Business facilities include meeting rooms and conference center. Services: 24-hour front desk, dry cleaning/laundry, daily housekeeping. Free on-site self-parking. Minimum check-in age 18. Credit card, debit card, or cash deposit required. Pets not allowed. Government ID may be required. Spa reservations required. Perfect for workcations, spiritual pilgrimages to Ayodhya, Buddhist circuit tours, and long wellness stays.",
    tags: ["wellness", "ayurveda", "spa", "resort", "yoga", "meditation", "detox", "retreat", "heritage", "luxury", "health", "healing", "pool", "restaurant"],
    isNew: true
  },
  {
    id: "kfc-barabanki",
    name: "KFC",
    category: "Restaurants & Fast Food",
    categorySlug: "restaurants",
    featured: true,
    verified: true,
    status: "open",
    rating: 4.7,
    reviewCount: 0,
    coordinates: { lat: 26.9237173, lng: 81.2504984 },
    reviews: [],
    address: "Box Park International, NH 27, Ayodhya - Lucknow Rd, adjacent to Seth Mr Jaipuria School, Barabanki, Sursanda, Uttar Pradesh 225001",
    mapLink: "https://maps.app.goo.gl/BPzGsEjv6nz8MM6H8",
    phone: "+91 80427 54444",
    email: "",
    website: "https://restaurants.kfc.co.in/kfc-kfc-barabanki-restaurants-lucknow-ayodhya-road-barabanki-489849/Home?utm_source=locator&utm_medium=googleplaces",
    onlineOrder: "https://www.swiggy.com/menu/7012?source=sharing",
    whatsapp: "",
    hours: {
      mon: { open: "11:00", close: "23:00" },
      tue: { open: "11:00", close: "23:00" },
      wed: { open: "11:00", close: "23:00" },
      thu: { open: "11:00", close: "23:00" },
      fri: { open: "11:00", close: "23:00" },
      sat: { open: "11:00", close: "23:00" },
      sun: { open: "11:00", close: "23:00" }
    },
    description: "KFC (Kentucky Fried Chicken) brings the world-famous fried chicken experience to Barabanki. Located at Box Park International on NH 27, adjacent to Seth M.R. Jaipuria School, this outlet serves Colonel Sanders' secret recipe of 11 herbs and spices. Our menu features Original Recipe Chicken, Hot & Crispy Chicken, Zinger Burgers, Chicken Buckets, Popcorn Chicken, Chicken Wings, Rice Bowls, Wraps, and sides including French Fries, Coleslaw, and Mashed Potatoes. We also offer refreshing beverages and desserts. Whether dining in, taking away, or ordering online for home delivery, KFC provides consistent, high-quality fast-food. We maintain strict hygiene standards and food safety protocols. The outlet features comfortable seating and a family-friendly atmosphere. Perfect for casual dining, birthday celebrations, office lunches, or satisfying chicken cravings. Order online through Swiggy for home delivery, or visit us in person. Open daily 11 AM to 11 PM, serving finger-lickin' good chicken!",
    tags: ["kfc", "fast-food", "fried-chicken", "burgers", "restaurant", "chicken", "zinger", "delivery", "takeaway", "family-dining"],
    isNew: true
  },
  {
    id: "box-park-international",
    name: "Box Park International",
    category: "Shopping Mall & Entertainment",
    categorySlug: "shopping-mall",
    featured: true,
    verified: true,
    status: "open",
    rating: 4.7,
    reviewCount: 0,
    coordinates: { lat: 26.9247718, lng: 81.2498400 },
    reviews: [],
    address: "Khasra No, 203 & 204, Ayodhya - Lucknow Rd, Pargana, Pratap Ganj, Barabanki, Uttar Pradesh 225203",
    mapLink: "https://maps.app.goo.gl/FjNzddaGYa29m9g29",
    phone: "",
    email: "care@boxpark.net.in",
    website: "https://boxpark.net.in/",
    whatsapp: "",
    hours: {
      mon: { open: "00:00", close: "23:59" },
      tue: { open: "00:00", close: "23:59" },
      wed: { open: "00:00", close: "23:59" },
      thu: { open: "00:00", close: "23:59" },
      fri: { open: "00:00", close: "23:59" },
      sat: { open: "00:00", close: "23:59" },
      sun: { open: "00:00", close: "23:59" }
    },
    description: "Box Park International is a unique shopping and entertainment destination on NH 27 Ayodhya Highway, next to Seth M.R. Jaipuria School. What makes us special? We're built entirely from repurposed shipping containers - the first mall of its kind in the region. Each container is painted in bright, eye-catching colors with creative designs that look like a giant art installation. Hard to miss when driving by! Inside, you'll find a great mix of places to eat, shop, and hang out. We've got popular spots like KFC, along with local restaurants, cafes, clothing stores, and other shops - all in colorful container spaces. The open-air design gives it a relaxed, outdoor market vibe perfect for families and friends. Whether stopping for a meal during a road trip, shopping, or taking cool Instagram photos (every corner is photo-worthy), Box Park has something for you. Open 24/7, so visit anytime. It's become a popular highway landmark, and people love the sustainable design, vibrant atmosphere, and convenient location. Come see why everyone's talking about Box Park!",
    tags: ["mall", "shopping", "entertainment", "food-court", "instagram", "container-mall", "sustainable", "family-destination", "highway-stop", "lifestyle"],
    isNew: true
  },
  {
    id: "pps-college-of-nursing",
    name: "PPS College of Nursing",
    category: "Education & Schools",
    categorySlug: "education",
    featured: true,
    verified: true,
    status: "open",
    rating: 4.3,
    reviewCount: 0,
    coordinates: { lat: 26.9257332, lng: 81.2481373 },
    reviews: [],
    address: "W6GX+3FV, NH 27, Sursanda, Uttar Pradesh 225203",
    mapLink: "https://maps.app.goo.gl/5M2QxgKZQugKDdZJ7",
    phone: "+91 97930 55014",
    phoneName: "Amit Singh",
    email: "p.p.s.nursingcollege@gmail.com",
    website: "https://ppscollegeofnursing.com/",
    whatsapp: "+91 97930 55014",
    whatsappName: "Amit Singh",
    hours: {
      mon: { open: "09:00", close: "16:00" },
      tue: { open: "09:00", close: "16:00" },
      wed: { open: "09:00", close: "16:00" },
      thu: { open: "09:00", close: "16:00" },
      fri: { open: "09:00", close: "16:00" },
      sat: { open: "09:00", close: "16:00" },
      sun: { open: "09:00", close: "16:00" }
    },
    description: "PPS College of Nursing is a premier private nursing education institution shaping future healthcare professionals. Located on NH 27 in Sursanda, Barabanki, we provide comprehensive nursing education programs. We offer General Nursing and Midwifery (GNM), Auxiliary Nurse Midwife (ANM), and B.Sc. Nursing programs with theoretical knowledge and practical clinical experience. Our state-of-the-art campus features modern classrooms, well-equipped laboratories, simulation labs for hands-on training, a comprehensive library, and clinical training facilities. We maintain affiliations with reputed hospitals for clinical rotations and internships. Our experienced faculty comprises qualified nursing professionals, medical practitioners, and educators committed to quality education and mentorship. We develop technical nursing skills, critical thinking, patient care ethics, communication abilities, and leadership qualities. The curriculum meets national nursing education standards and prepares students for nursing council examinations and professional practice. We emphasize holistic development, combining academic excellence with personality development, soft skills training, and career guidance. Our graduates are well-prepared for hospitals, clinics, community health centers, nursing homes, and healthcare settings in India and abroad. We offer placement assistance, connecting students with leading healthcare institutions. With modern infrastructure, experienced faculty, comprehensive curriculum, and strong industry connections, we produce competent, confident, and caring nursing professionals. Admissions open for aspiring nursing students. Contact Amit Singh for admission inquiries, course details, eligibility, and campus visits. Open Monday to Sunday, 9 AM to 4 PM.",
    tags: ["nursing-college", "education", "healthcare-education", "gnm", "anm", "bsc-nursing", "medical-education", "nursing-course", "career", "healthcare"],
    isNew: true
  },
  {
    id: "maxwell-hospital",
    name: "Maxwell Hospital",
    category: "Healthcare & Medical Services",
    categorySlug: "healthcare",
    featured: true,
    verified: true,
    status: "open",
    rating: 4.7,
    reviewCount: 0,
    coordinates: { lat: 26.9254186, lng: 81.2414883 },
    reviews: [],
    address: "W6GR+4HQ, Barabanki, Sursanda, Uttar Pradesh 225203",
    mapLink: "https://maps.app.goo.gl/6pqEGygAYb9ShF1T7",
    phone: "+91 90449 35596",
    phoneName: "Amit Singh",
    email: "beenugupta53@gmail.com",
    website: "",
    bloodDonor: "https://www.friends2support.org/",
    whatsapp: "+91 90449 35596",
    whatsappName: "Amit Singh",
    hours: {
      mon: { open: "00:00", close: "23:59" },
      tue: { open: "00:00", close: "23:59" },
      wed: { open: "00:00", close: "23:59" },
      thu: { open: "00:00", close: "23:59" },
      fri: { open: "00:00", close: "23:59" },
      sat: { open: "00:00", close: "23:59" },
      sun: { open: "00:00", close: "23:59" }
    },
    description: "Maxwell Hospital is a trusted private healthcare facility providing comprehensive medical services in Sursanda, Barabanki. Operating 24/7, we deliver quality healthcare with compassion and professionalism. Our hospital offers emergency care, general medicine consultations, surgical procedures, diagnostic services, laboratory tests, X-ray and imaging facilities, pharmacy services, and patient admission. We have experienced doctors, skilled nurses, and dedicated healthcare staff working round the clock. Our emergency department handles medical emergencies, accidents, and urgent health conditions with prompt treatment. We specialize in treating common illnesses, chronic diseases, injuries, infections, and providing maternal and child healthcare. Equipped with modern medical equipment, we maintain high hygiene and patient safety standards. We offer outpatient consultations for diagnosis, treatment plans, and follow-up care. For hospitalization, we provide comfortable patient rooms with medical monitoring and nursing care. Our diagnostic center offers complete laboratory tests including blood tests, urine tests, pathology, and medical imaging. The in-house pharmacy ensures immediate access to prescribed medications. We believe in providing affordable and accessible healthcare with transparent pricing. Our patient-centric approach focuses on treating illnesses, preventive healthcare, health education, and wellness guidance. Contact Amit Singh for appointments, emergency services, or inquiries. Available 24/7.",
    tags: ["hospital", "healthcare", "emergency-care", "24x7", "medical-services", "doctor", "clinic", "diagnostic", "laboratory", "patient-care", "surgery"],
    isNew: true
  },
  {
    id: "saraswati-studio-makole",
    name: "Saraswati Studio",
    category: "Photography & Video Services",
    categorySlug: "photography",
    featured: true,
    verified: true,
    status: "open",
    rating: 4.7,
    reviewCount: 1,
    coordinates: { lat: 26.9228271, lng: 81.2605057 },
    reviews: [
      {
        id: "review-1",
        author: "Admin",
        role: "LocalFind Team",
        rating: 4.7,
        date: "2026-03-06",
        text: "Best Studio in Rasauli! Saraswati Studio offers exceptional photography and videography with professional quality work. Their wedding video coverage is outstanding, capturing every precious moment beautifully. Photo shoot sessions are creative and well-executed for weddings, events, or personal portfolios. They also provide cup printing services which is unique. Staff maintains good behavior and professionalism. Work quality is impressive and they deliver on time. Highly recommended for all your photography, videography, and printing needs!",
        verified: true
      }
    ],
    address: "W7F6+46J, Rasauli, Uttar Pradesh 225203",
    mapLink: "https://maps.app.goo.gl/2SMVb3x4BBwGb5yY7",
    phone: "+91 91989 12002",
    phoneName: "Makole",
    email: "",
    website: "",
    whatsapp: "+91 91989 12002",
    whatsappName: "Makole",
    hours: {
      mon: { open: "10:00", close: "20:00" },
      tue: { open: "10:00", close: "20:00" },
      wed: { open: "10:00", close: "20:00" },
      thu: { open: "10:00", close: "20:00" },
      fri: { open: "10:00", close: "20:00" },
      sat: { open: "10:00", close: "20:00" },
      sun: { open: "10:00", close: "20:00" }
    },
    description: "Saraswati Studio is your premier destination for professional photography and videography services in Rasauli, located in Makole. We specialize in capturing life's precious moments with creativity, technical expertise, and artistic vision. Our services include wedding photography and videography covering every aspect from pre-wedding shoots to ceremony and reception. We excel in event photography for birthdays, anniversaries, corporate events, and social gatherings. Our studio offers professional photo shoots for individuals, families, couples, and commercial purposes including portfolio shoots, product photography, and promotional content. We provide high-quality video production including wedding films, event coverage, promotional videos, and documentary-style recordings. What sets us apart is our attention to detail, creative approach, and commitment to delivering stunning visual content. We also offer cup printing services for personalized mugs with photos and designs - perfect for gifts, events, or promotional merchandise. Equipped with modern cameras, lighting equipment, and editing software for professional-grade output. We work closely with you to understand your vision and deliver results that exceed expectations. Our team maintains professional behavior, punctuality, and clear communication. We offer flexible packages for different budgets. Visit us in Makole, Rasauli, or contact us to discuss your photography, videography, and printing needs. Open daily 10 AM to 8 PM.",
    tags: ["photography", "videography", "studio", "wedding-photography", "photo-shoot", "video-production", "event-photography", "cup-printing", "printing", "portraits", "commercial-photography"],
    isNew: true
  },
  {
    id: "jamwant-mobile-shop",
    name: "Jamwant Mobile Shop",
    category: "Mobile & Electronics",
    categorySlug: "mobile-electronics",
    featured: true,
    verified: true,
    status: "open",
    rating: 3.8,
    reviewCount: 0,
    coordinates: { lat: 26.9226667, lng: 81.2604167 },
    reviews: [],
    address: "Village & Post Rasauli District Barabanki, Rasauli Bazar Road, Uttar Pradesh 225203",
    mapLink: "https://maps.app.goo.gl/cG5dYAkjyFKb6qTz8",
    phone: "+91 80906 28512",
    phoneName: "Jamwant Singh",
    email: "",
    website: "",
    whatsapp: "+91 80906 28512",
    whatsappName: "Jamwant Singh",
    hours: {
      mon: { open: "10:00", close: "20:00" },
      tue: { open: "10:00", close: "20:00" },
      wed: { open: "10:00", close: "20:00" },
      thu: { open: "10:00", close: "20:00" },
      fri: { open: "10:00", close: "20:00" },
      sat: { open: "10:00", close: "20:00" },
      sun: { open: "10:00", close: "20:00" }
    },
    description: "Jamwant Mobile Shop is your trusted destination for all mobile phone needs in Rasauli on Rasauli Bazar Road. Managed by Jamwant Singh, we specialize in comprehensive mobile services and accessories. We offer professional mobile phone repair for all brands including screen replacement, battery replacement, charging port repair, software issues, water damage repair, and troubleshooting. We sell mobile phones from budget-friendly to premium smartphones. Our extensive accessories collection includes phone cases and covers, tempered glass and screen protectors, charging cables and adapters, power banks, earphones and headphones, TWS (True Wireless Stereo) earbuds, neckband headphones, Bluetooth speakers, mobile holders and stands, memory cards and pen drives, and more. We stock trusted brands with quality at competitive prices. Whether you need a quick repair, want to upgrade to a new smartphone, or looking for the latest audio accessories like TWS earbuds or neckband headphones, we have you covered. Our knowledgeable staff provides expert advice and warranty support on repairs and products. Customer satisfaction is our priority with prompt service, genuine products, and fair pricing. Open daily 10 AM to 8 PM.",
    tags: ["mobile-shop", "phone-repair", "mobile-accessories", "smartphones", "earphones", "tws", "neckband", "headphones", "phone-cases", "screen-protector", "chargers", "electronics"],
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
window.renderCard = function (b) {
  const name = sanitizeHTML(b.name);
  const desc = sanitizeHTML(b.description.slice(0, 120));
  const tags = Array.isArray(b.tags) ? b.tags.slice(0, 3).map(t => `<span class="tag">${sanitizeHTML(t)}</span>`).join('') : '';
  const verifiedBadge = b.verified ? '<span class="verified-badge" title="Verified Business"><i class="fa-solid fa-circle-check"></i></span>' : '';

  return `
  <a href="business-detail.html?id=${encodeURIComponent(b.id)}" class="card-link" aria-label="View details for ${name}">
    <article class="card ${b.featured ? 'featured' : ''} ${b.verified ? 'verified' : ''}" role="article">
      <div class="meta">
        <div class="title">
          <span class="business-name">${name}</span>
          ${verifiedBadge}
        </div>
        <div class="small" aria-label="Rating ${b.rating} out of 5 stars">${b.rating} ★ (${b.reviewCount})</div>
      </div>
      <div class="desc">${desc}...</div>
      <div class="tags">${tags}</div>
    </article>
  </a>
  `;
};
