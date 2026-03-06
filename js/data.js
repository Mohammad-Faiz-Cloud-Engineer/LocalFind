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
    mapLink: "https://maps.app.goo.gl/sHcSAkevGAPCKDhSA",
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
    mapLink: "https://maps.app.goo.gl/9LD5tPFQh7qdWbu17",
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
    mapLink: "https://maps.app.goo.gl/gQxABHCE634v2JXS9",
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
    mapLink: "https://maps.app.goo.gl/RzzAqLBvtXKWQY419",
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
    mapLink: "https://maps.app.goo.gl/Ga6CQSChfh1UZK1w8",
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
    mapLink: "https://maps.app.goo.gl/MqywkZjACsXtBGdT9",
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
    name: "Friends Fitness GYM",
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
        text: "Friends Fitness GYM is the best and only gym in Rasauli, making it an essential fitness destination for the community. The gym is well-equipped with quality equipment for strength training, cardio, and functional fitness. Dileep Rawat, the owner, is dedicated and knowledgeable, providing good guidance to members. For the best experience, I highly recommend visiting during the early morning sessions (4 AM to 7 AM) when it's less crowded and you can focus on your workout with minimal distractions. If you prefer evening workouts, try to come after 8 PM for a more peaceful environment. The gym can get busy during peak hours (early evening 6-8 PM), so plan accordingly. The facilities are clean and well-maintained, and the membership rates are reasonable. Whether you're a beginner or an experienced fitness enthusiast, this gym offers everything you need to achieve your fitness goals. A solid choice for anyone serious about fitness in Rasauli!",
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
      mon: {open: "04:00", close: "07:00", open2: "18:00", close2: "22:00"},
      tue: {open: "04:00", close: "07:00", open2: "18:00", close2: "22:00"},
      wed: {open: "04:00", close: "07:00", open2: "18:00", close2: "22:00"},
      thu: {open: "04:00", close: "07:00", open2: "18:00", close2: "22:00"},
      fri: {open: "04:00", close: "07:00", open2: "18:00", close2: "22:00"},
      sat: {open: "04:00", close: "07:00", open2: "18:00", close2: "22:00"},
      sun: {open: "00:00", close: "00:00"}
    },
    description: "Friends Fitness GYM is Rasauli's premier fitness center, dedicated to helping you achieve your health and fitness goals. Managed by experienced fitness professional Dileep Rawat, we offer a complete range of gym facilities and services for all fitness levels. Our gym features modern strength training equipment including free weights, dumbbells, barbells, and weight machines, cardio equipment such as treadmills, exercise bikes, and cross trainers, functional training areas, and dedicated spaces for stretching and warm-up exercises. We provide personalized workout plans, professional fitness guidance, weight loss programs, muscle building training, and general fitness coaching. Whether you're looking to lose weight, build muscle, improve stamina, or maintain overall fitness, our supportive environment and quality equipment will help you succeed. We operate in two convenient shifts - early morning (4 AM to 7 AM) for early risers and evening (6 PM to 10 PM) for those who prefer after-work sessions. Closed on Sundays. Join Friends Fitness GYM and start your transformation journey today with expert guidance and a motivating atmosphere.",
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
    reviews: [
      {
        id: "review-1",
        author: "Admin",
        role: "LocalFind Team",
        rating: 3.0,
        date: "2026-02-28",
        text: "Golden CSC is the most unprofessional CSC in Rasauli. While they can handle basic government services, the service quality and professionalism leave much to be desired. For straightforward, simple tasks, they might get the job done, but expect delays and inconsistent service. I strongly recommend visiting <a href='business-detail.html?id=raheem-common-service-center'>Raheem CSC</a> instead for reliable and professional service. However, if your work is particularly tricky, complicated, or requires some connections and you're willing to compromise on professionalism, Golden CSC might be able to help through their network. But for most people, especially for important documents and time-sensitive work, Raheem CSC is the better choice. Use Golden CSC only as a last resort or for very specific situations where their connections might be beneficial.",
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
      mon: {open: "10:00", close: "19:00"},
      tue: {open: "10:00", close: "19:00"},
      wed: {open: "10:00", close: "19:00"},
      thu: {open: "10:00", close: "19:00"},
      fri: {open: "10:00", close: "19:00"},
      sat: {open: "10:00", close: "19:00"},
      sun: {open: "10:00", close: "19:00"}
    },
    description: "Golden CSC (Common Service Center) provides government and digital services in Rasauli. We offer a range of services including Aadhaar card services, PAN card applications, various government certificates (income, caste, domicile), birth and death certificates, and other documentation services. We also handle bill payments, digital transactions, and online form submissions. Our center assists with banking services, insurance applications, and various e-governance services. While we strive to serve the community, we handle both routine and complex cases that may require additional coordination. Visit us for your government documentation needs, though for time-sensitive or critical work, we recommend comparing services with other CSC centers in the area to find the best fit for your specific requirements.",
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
    reviews: [],
    address: "Barabanki, W7F3+F9P, Uttar Pradesh 225001",
    mapLink: "https://maps.app.goo.gl/1irTf5avokw1RjUW7",
    phone: "+91 94534 97384",
    phoneName: "Ram Kishor",
    email: "",
    website: "",
    whatsapp: "+91 94534 97384",
    hours: {
      mon: {open: "00:00", close: "23:59"},
      tue: {open: "00:00", close: "23:59"},
      wed: {open: "00:00", close: "23:59"},
      thu: {open: "00:00", close: "23:59"},
      fri: {open: "00:00", close: "23:59"},
      sat: {open: "00:00", close: "23:59"},
      sun: {open: "00:00", close: "23:59"}
    },
    description: "Om Dhaba is your authentic roadside dining destination in Rasauli, serving delicious home-style food 24 hours a day, 7 days a week. We specialize in traditional North Indian cuisine with that genuine 'ghar jaisa swaad' (home-like taste) that travelers and locals crave. Our menu features a wide variety of fresh rotis, parathas, dal, sabzi, rice dishes, and popular dhaba favorites. Whether you're looking for a hearty breakfast, satisfying lunch, late-night dinner, or just a quick snack, we're always open to serve you. Our dhaba is known for generous portions, affordable prices, and the authentic flavors that remind you of home-cooked meals. We maintain high standards of hygiene and food quality, using fresh ingredients and traditional cooking methods. Perfect for truck drivers, travelers, and anyone seeking authentic Indian dhaba food at any time of day or night. Stop by Om Dhaba for a filling meal that tastes just like home, available round the clock for your convenience.",
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
    reviews: [
      {
        id: "review-1",
        author: "Admin",
        role: "LocalFind Team",
        rating: 5.0,
        date: "2026-02-28",
        text: "Hala Motors is hands down the best vehicle repairing shop in the entire Rasauli area. What sets them apart is their exceptional professionalism - both in their work quality and customer service. The mechanics are highly skilled and experienced, capable of handling everything from routine maintenance to complex repairs. They diagnose issues accurately and fix them right the first time, saving you time and money. The staff maintains professional behavior throughout, explaining the problems clearly and providing transparent pricing with no hidden charges. Whether it's a two-wheeler or four-wheeler, they handle all types of vehicles with expertise. The workshop is well-equipped with modern tools and genuine spare parts. They complete work within the promised timeframe and stand behind their repairs. If you value quality workmanship, honest service, and professional treatment, Hala Motors is your go-to choice in Rasauli. Highly recommended for all your vehicle repair and maintenance needs!",
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
      mon: {open: "09:00", close: "17:00"},
      tue: {open: "09:00", close: "17:00"},
      wed: {open: "09:00", close: "17:00"},
      thu: {open: "09:00", close: "17:00"},
      fri: {open: "09:00", close: "17:00"},
      sat: {open: "09:00", close: "17:00"},
      sun: {open: "00:00", close: "00:00"}
    },
    description: "Hala Motors is Rasauli's premier vehicle repair and service center, offering professional automotive solutions for all types of vehicles. With years of experience and a team of skilled mechanics, we specialize in comprehensive vehicle repairs, routine maintenance, engine diagnostics, brake services, suspension repairs, electrical work, and general servicing for both two-wheelers and four-wheelers. Our workshop is equipped with modern diagnostic tools and equipment to accurately identify and fix any vehicle issue. We use only genuine spare parts and follow manufacturer-recommended service procedures to ensure your vehicle runs smoothly and safely. Our services include oil changes, tire services, battery replacement, AC repair, denting and painting, and complete vehicle overhauls. We pride ourselves on transparent pricing, honest assessments, and timely completion of work. Whether you need a quick fix or major repairs, our professional team is committed to delivering quality workmanship and excellent customer service. Trust Hala Motors for reliable, professional, and affordable vehicle repair services in Rasauli. Open Monday to Saturday, 9 AM to 5 PM.",
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
    reviews: [
      {
        id: "review-1",
        author: "Admin",
        role: "LocalFind Team",
        rating: 3.0,
        date: "2026-02-28",
        text: "Chandra Shekhar Azad Inter College is the best UP Board school for both Hindi Medium and English Medium education in the entire Rasauli area. However, the management and overall administration are quite unprofessional, which affects the school's operations and student experience. Most teachers also lack professionalism, but there are some exceptional educators who truly stand out. Vikash Jaiswal sir is an absolute genius in Mathematics - he's a God of Mathematics who can solve even JEE Advanced level questions with ease. His teaching methodology is outstanding, and he is my guru. Abhey Verma sir teaches both Maths and Physics; while his Math teaching is good (though slightly below Vikash sir's level), his Physics teaching is excellent and he brings years of valuable experience. He is also my guru. Abhishek sir is a multi-subject teacher handling Chemistry, Social Science, and other subjects, though his approach can be somewhat unprofessional at times. Despite this, he is my guru too. The school offers education from Nursery to 10th with UP Board recognition in both Hindi and English mediums. For classes 11th and 12th, they are associated with Jay Hind Inter College Barabanki. If you can overlook the management issues and focus on learning from the good teachers, this school can provide quality education.",
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
      mon: {open: "09:00", close: "17:00"},
      tue: {open: "09:00", close: "17:00"},
      wed: {open: "09:00", close: "17:00"},
      thu: {open: "09:00", close: "17:00"},
      fri: {open: "09:00", close: "17:00"},
      sat: {open: "09:00", close: "17:00"},
      sun: {open: "00:00", close: "00:00"}
    },
    description: "Chandra Shekhar Azad Inter College is a recognized UP Board educational institution in Rasauli, offering quality education in both Hindi Medium and English Medium. We provide comprehensive education from Nursery to Class 10th with full UP Board recognition, ensuring students receive proper academic foundation and board certification. For higher secondary education (Classes 11th and 12th), we are associated with Jay Hind Inter College Barabanki, providing students with seamless continuation of their studies. Our curriculum follows the UP Board syllabus and includes all core subjects - Mathematics, Science, Social Studies, Hindi, English, and optional subjects. We have dedicated faculty members with expertise in their respective subjects. The school focuses on both academic excellence and overall personality development of students. We offer a structured learning environment with regular classes, examinations, and parent-teacher meetings. Our facilities include classrooms, library, and basic infrastructure for quality education. Whether you prefer Hindi Medium or English Medium instruction, we cater to both preferences to ensure every student can learn in their comfortable language. Admissions are open for all classes from Nursery to 10th. Contact our principals or manager for admission inquiries and school information. Open Monday to Saturday, 9 AM to 5 PM.",
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
    reviews: [],
    address: "Village & Post Rasauli District, Rasauli Bazar Near Pankaj Sweets, Uttar Pradesh 225203",
    mapLink: "https://maps.app.goo.gl/ntCuyZaRHJ7idkMX7",
    phone: "+91 92609 49998",
    phoneSecondary: "+91 88878 55405",
    email: "",
    website: "",
    whatsapp: "+91 92609 49998",
    whatsappSecondary: "+91 88878 55405",
    hours: {
      mon: {open: "09:00", close: "21:00"},
      tue: {open: "09:00", close: "21:00"},
      wed: {open: "09:00", close: "21:00"},
      thu: {open: "09:00", close: "21:00"},
      fri: {open: "09:00", close: "21:00"},
      sat: {open: "09:00", close: "21:00"},
      sun: {open: "09:00", close: "21:00"}
    },
    description: "Shri Shyam Medicals is your trusted neighborhood pharmacy in Rasauli, conveniently located near Pankaj Sweets in Rasauli Bazar. We are committed to providing quality healthcare products and pharmaceutical services to the community. Our medical store stocks a comprehensive range of prescription medications, over-the-counter medicines, health supplements, vitamins, and wellness products from reputed pharmaceutical brands. We maintain strict quality standards and ensure all medicines are sourced from authorized distributors and stored under proper conditions. Our knowledgeable staff is available to assist you with medication information, dosage guidance, and health-related queries. We offer services including prescription filling, medicine home delivery for elderly and bedridden patients, health monitoring devices, first-aid supplies, baby care products, personal hygiene items, diabetic care products, and medical equipment. Whether you need emergency medicines, routine prescriptions, or health supplements, we are here to serve you with care and professionalism. Open daily from 9 AM to 9 PM for your convenience. Visit Shri Shyam Medicals for all your healthcare and pharmaceutical needs in Rasauli.",
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
      mon: {open: "09:00", close: "20:00"},
      tue: {open: "09:00", close: "20:00"},
      wed: {open: "09:00", close: "20:00"},
      thu: {open: "09:00", close: "20:00"},
      fri: {open: "09:00", close: "20:00"},
      sat: {open: "09:00", close: "20:00"},
      sun: {open: "09:00", close: "20:00"}
    },
    description: "Satyam Footwear is your one-stop destination for quality footwear in Rasauli, conveniently located near Pankaj Sweets in Rasauli Bazar. Managed by Satyam Prajapati, we specialize in providing a wide variety of footwear for men, women, and children to suit every occasion and budget. Our extensive collection includes formal shoes, casual footwear, sports shoes, sandals, slippers, traditional footwear, school shoes, and seasonal collections. We stock products from trusted brands as well as affordable local options, ensuring there's something for everyone. Whether you're looking for comfortable daily wear, stylish party shoes, durable work boots, or trendy sneakers, we have it all under one roof. Our store maintains high standards of quality and offers competitive pricing. We pride ourselves on providing excellent customer service and helping you find the perfect fit for your needs. Visit Satyam Footwear for all your footwear requirements - from traditional chappals to modern sports shoes. Open daily from 9 AM to 8 PM, we're here to serve you with a smile and ensure you walk away satisfied with your purchase.",
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
    reviews: [
      {
        id: "review-1",
        author: "Admin",
        role: "LocalFind Team",
        rating: 5.0,
        date: "2026-03-02",
        text: "Khidmat Enterprises is hands down the best furniture brand in the entire Rasauli region! The quality of their furniture is absolutely top-notch - genuine A1 grade craftsmanship that stands the test of time. What truly sets them apart is their exceptional behavior and professionalism. The team, including Faizal, Asjad, and Akhlad, are wonderful people who genuinely care about customer satisfaction. They listen carefully to your requirements and provide expert guidance throughout the process. Their custom furniture projects are particularly impressive - they can bring any design vision to life with precision and attention to detail. Whether you need a bed, sofa, dressing table, wardrobe, or any custom piece, they deliver excellence every time. The pricing is very reasonable and fair for the premium quality you receive. They use high-quality materials and their finishing work is impeccable. The entire experience from consultation to delivery is smooth and professional. If you're looking for furniture in Rasauli, look no further than Khidmat Enterprises. Highly recommended for anyone who values quality craftsmanship, honest pricing, and excellent customer service!",
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
      mon: {open: "09:00", close: "18:00"},
      tue: {open: "09:00", close: "18:00"},
      wed: {open: "09:00", close: "18:00"},
      thu: {open: "09:00", close: "18:00"},
      fri: {open: "09:00", close: "18:00"},
      sat: {open: "09:00", close: "18:00"},
      sun: {open: "09:00", close: "18:00"}
    },
    description: "Khidmat Enterprises is Rasauli's premier custom furniture manufacturer and design studio, specializing in creating high-quality, handcrafted furniture pieces tailored to your exact specifications. Led by experienced craftsmen Faizal, Asjad, and Akhlad, we bring decades of combined expertise in furniture design and manufacturing. We create a complete range of furniture including beds, sofas, dressing tables, wardrobes, dining tables, chairs, TV units, study tables, kitchen cabinets, and much more. What makes us unique is our ability to handle custom projects - we don't just sell furniture, we create it from scratch based on your vision, space requirements, and budget. Our manufacturing process uses premium quality wood, hardware, and finishing materials to ensure durability and aesthetic appeal. We offer comprehensive services from initial design consultation, 3D visualization, material selection, custom manufacturing, finishing, polishing, to final installation at your location. Whether you need modern contemporary designs, traditional classic styles, or minimalist furniture, our skilled team can craft it with precision. We work with various materials including solid wood, plywood, MDF, and engineered wood, always recommending the best option for your specific needs. Our workshop is equipped with modern tools and machinery, allowing us to execute complex designs with accuracy. We pride ourselves on timely delivery, transparent pricing, and exceptional after-sales service. Visit Khidmat Enterprises for furniture that's built to last and designed to impress. Open daily from 9 AM to 6 PM.",
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
    reviews: [
      {
        id: "review-1",
        author: "Admin",
        role: "LocalFind Team",
        rating: 5.0,
        date: "2026-03-02",
        text: "Rasauli Hardware is undoubtedly the best hardware shop in the entire Rasauli area! What sets them apart is their unwavering commitment to quality - they stock only high-quality products and A1 grade materials that you can trust for your construction and renovation projects. Noor Alam, the owner, provides exceptional service with a very nice and professional behavior that makes every customer feel valued. The store offers an extensive range of hardware products including premium wooden doors in various designs and finishes, high-quality plywood from reputed brands, building materials, tools, fittings, locks, hinges, handles, paints, adhesives, and all essential hardware items you might need. Their product knowledge is excellent, and they provide honest recommendations based on your specific requirements and budget. The quality of materials is consistently top-notch - no compromise on standards. Whether you're a contractor working on a large project or a homeowner doing DIY repairs, you'll find everything you need here. The pricing is fair and competitive for the premium quality offered. They maintain good stock levels, so you rarely face unavailability issues. The shop is conveniently located near the Over-Bridge, making it easily accessible. If you value quality materials, expert guidance, and excellent customer service, Rasauli Hardware is your go-to destination. Highly recommended for all your hardware and building material needs!",
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
      mon: {open: "09:30", close: "18:00"},
      tue: {open: "09:30", close: "18:00"},
      wed: {open: "09:30", close: "18:00"},
      thu: {open: "09:30", close: "18:00"},
      fri: {open: "09:30", close: "18:00"},
      sat: {open: "09:30", close: "18:00"},
      sun: {open: "09:30", close: "18:00"}
    },
    description: "Rasauli Hardware is your trusted one-stop shop for all hardware and building material needs in Rasauli, conveniently located near the Over-Bridge. Managed by Noor Alam, we specialize in providing premium quality hardware products and building materials for residential, commercial, and industrial projects. Our extensive inventory includes high-quality wooden doors in various styles - panel doors, flush doors, decorative doors, and custom designs to match your interior aesthetics. We stock premium plywood from leading brands in different grades and thicknesses suitable for furniture, interiors, and construction. Our comprehensive range covers building hardware including cement, sand, bricks, steel, TMT bars, roofing materials, tiles, sanitary fittings, bathroom fixtures, kitchen fittings, electrical items, wiring accessories, switches, MCBs, pipes and plumbing materials, paints and coatings, adhesives and sealants, tools and equipment, locks and security hardware, door and window fittings, hinges, handles, tower bolts, and much more. We pride ourselves on stocking only A1 grade materials from reputed manufacturers, ensuring durability and reliability for your projects. Our team provides expert consultation to help you choose the right products based on your specific requirements, budget, and project scope. Whether you're building a new home, renovating, or doing repairs, we have everything you need under one roof. We offer competitive pricing, bulk order discounts, and reliable delivery services. Visit Rasauli Hardware for quality materials, honest advice, and excellent service. Open daily from 9:30 AM to 6 PM.",
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
    reviews: [],
    address: "Village & Post Rasauli District, Shop No 02, Bazzar Road, Barabanki, Rasauli, Uttar Pradesh 225203",
    mapLink: "https://maps.app.goo.gl/yJkBVrBr9XtyGv2T6",
    phone: "+91 90266 16696",
    email: "",
    website: "",
    whatsapp: "+91 90266 16696",
    hours: {
      mon: {open: "09:30", close: "22:00"},
      tue: {open: "09:30", close: "22:00"},
      wed: {open: "09:30", close: "22:00"},
      thu: {open: "09:30", close: "22:00"},
      fri: {open: "09:30", close: "22:00"},
      sat: {open: "09:30", close: "22:00"},
      sun: {open: "09:30", close: "22:00"}
    },
    description: "Kartik Medical Store is your reliable neighborhood pharmacy located at Shop No 02 on Bazzar Road in Rasauli. We are dedicated to serving the healthcare needs of our community with a comprehensive range of pharmaceutical products and medical supplies. Our medical store maintains a well-stocked inventory of prescription medications, over-the-counter medicines, health supplements, vitamins, minerals, wellness products, and healthcare essentials from trusted pharmaceutical brands. We ensure all medicines are sourced from authorized distributors and stored under proper temperature-controlled conditions to maintain their efficacy and safety. Our knowledgeable staff is available to assist you with medication information, dosage instructions, drug interactions, and general health queries. We offer a variety of services including prescription filling and dispensing, medicine home delivery for elderly and bedridden patients, health monitoring devices like BP monitors and glucometers, first-aid supplies and emergency medicines, baby care products including diapers and baby food, personal care and hygiene products, diabetic care products and sugar-free items, surgical supplies and medical equipment, and health consultation services. Whether you need emergency medicines late at night, routine prescriptions, or health supplements, we're here to serve you with extended operating hours from 9:30 AM to 10 PM daily. We prioritize customer health and safety, maintain strict quality standards, and offer competitive pricing. Visit Kartik Medical Store for all your pharmaceutical and healthcare needs in Rasauli - your health is our priority.",
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
    reviews: [],
    address: "Village & Post Rasauli District, In Rasauli Bazar, Suraj Kumar Clothing Shop, Rasauli, Barabanki, Uttar Pradesh 225203",
    mapLink: "https://maps.app.goo.gl/aehRADgJmPL452tr5",
    phone: "+91 89579 61893",
    email: "",
    website: "",
    whatsapp: "+91 89579 61893",
    hours: {
      mon: {open: "09:00", close: "20:00"},
      tue: {open: "09:00", close: "20:00"},
      wed: {open: "09:00", close: "20:00"},
      thu: {open: "09:00", close: "20:00"},
      fri: {open: "09:00", close: "20:00"},
      sat: {open: "09:00", close: "20:00"},
      sun: {open: "09:00", close: "20:00"}
    },
    description: "Suraj Kumar Clothing Store is your go-to destination for fashionable and affordable clothing in Rasauli Bazar. We specialize in providing a diverse collection of garments for men, women, and children, catering to all age groups and style preferences. Our store offers an extensive range of clothing options including traditional ethnic wear such as kurtas, salwar suits, sarees, and sherwanis for special occasions and festivals, trendy casual wear including jeans, t-shirts, shirts, tops, and western outfits for everyday comfort, formal wear for office and professional settings, seasonal collections featuring the latest fashion trends, kids' clothing with comfortable and colorful options, traditional and modern fusion wear, party wear and festive collections, and accessories to complete your look. We carefully curate our inventory to ensure quality fabrics, good stitching, and stylish designs at competitive prices. Whether you're shopping for daily wear, attending a wedding, celebrating a festival, or looking for something special, you'll find a wide variety of choices at our store. Our friendly staff is always ready to help you find the perfect outfit that suits your style, occasion, and budget. We believe in providing excellent customer service and ensuring every customer leaves satisfied with their purchase. Located conveniently in Rasauli Bazar, we're easily accessible for all your clothing needs. Visit Suraj Kumar Clothing Store for quality garments, latest fashion trends, and great value. Open daily from 9 AM to 8 PM.",
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
    reviews: [],
    address: "Village & Post Rasauli District, In Rasauli Bazar, W7G6+4VH, Uttar Pradesh 225203",
    mapLink: "https://maps.app.goo.gl/qCXk6fHbr8Cei5tM7",
    phone: "+91 89539 85147",
    phoneName: "Dharmendra",
    email: "",
    website: "",
    whatsapp: "+91 89539 85147",
    whatsappName: "Dharmendra",
    hours: {
      mon: {open: "09:00", close: "20:00"},
      tue: {open: "09:00", close: "20:00"},
      wed: {open: "09:00", close: "20:00"},
      thu: {open: "09:00", close: "20:00"},
      fri: {open: "09:00", close: "20:00"},
      sat: {open: "09:00", close: "20:00"},
      sun: {open: "09:00", close: "20:00"}
    },
    description: "Janta Clinic is a trusted healthcare facility serving the Rasauli community with comprehensive medical services and compassionate patient care. Led by Dr. Dharmendra, our clinic is dedicated to providing accessible and affordable healthcare to all members of the community. We offer a wide range of medical services including general medicine consultations for common illnesses, fever, infections, and chronic conditions, preventive healthcare and health check-ups, treatment for seasonal diseases and ailments, minor injury treatment and wound care, blood pressure and diabetes management, respiratory illness treatment, digestive system disorders, skin conditions and dermatological consultations, pediatric care for children, women's health services, vaccination and immunization services, health counseling and lifestyle guidance, prescription services, and referrals to specialists when needed. Our clinic is equipped with basic diagnostic facilities and maintains a clean, hygienic environment for patient safety. Dr. Dharmendra brings years of medical experience and a patient-first approach to healthcare, taking time to listen to patient concerns and provide thorough examinations. We believe in preventive care and educating patients about maintaining good health. The clinic maintains affordable consultation fees, making quality healthcare accessible to everyone in the community. We also provide follow-up care and maintain patient medical records for continuity of treatment. Located conveniently in Rasauli Bazar, we're easily accessible for all residents. Visit Janta Clinic for reliable medical care, expert diagnosis, and compassionate treatment. Open daily from 9 AM to 8 PM for your convenience.",
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
    rating: 4.0,
    reviewCount: 0,
    reviews: [],
    address: "Village & Post Rasauli District, Near Primary Govt School, KATRA MOHALLA, W7G6+FF, Rasauli, Barabanki, Uttar Pradesh 225203",
    mapLink: "https://maps.app.goo.gl/Y3B8Q6WUctiXWezE6",
    phone: "+91 96952 69513",
    email: "",
    website: "",
    whatsapp: "+91 96952 69513",
    instagram: "https://www.instagram.com/shahnawaz007__",
    hours: {
      mon: {open: "09:00", close: "20:00"},
      tue: {open: "09:00", close: "20:00"},
      wed: {open: "09:00", close: "20:00"},
      thu: {open: "09:00", close: "20:00"},
      fri: {open: "09:00", close: "20:00"},
      sat: {open: "09:00", close: "20:00"},
      sun: {open: "09:00", close: "20:00"}
    },
    description: "SK Tent & Light House is Rasauli's premier event decoration and rental service provider, specializing in making your special occasions memorable and visually stunning. We offer comprehensive tent and lighting solutions for weddings, receptions, birthday parties, corporate events, religious ceremonies, and all types of celebrations. Our extensive inventory includes elegant wedding tents and shamianas in various sizes and designs, decorative lighting solutions including fairy lights, LED lights, chandeliers, and festive illumination, stage decoration and backdrop setups, mandap decoration for wedding ceremonies, seating arrangements with chairs, tables, and furniture rentals, sound systems and DJ equipment, catering equipment and crockery, red carpet and walkway decorations, floral arrangements and artificial flower decorations, entrance gate decorations, and complete event setup services. We understand that every event is unique, and our experienced team works closely with clients to understand their vision, theme, and budget requirements. From intimate family gatherings to grand wedding celebrations, we have the expertise and resources to handle events of any scale. Our professional team ensures timely setup, proper installation, and safe operation of all equipment. We use high-quality materials and maintain our inventory in excellent condition. Our lighting solutions create the perfect ambiance, transforming ordinary spaces into magical venues. We offer flexible rental packages, competitive pricing, and reliable service. Our team handles everything from initial consultation, site visit, design planning, equipment delivery, complete setup, event support, to post-event dismantling and cleanup. Located near Primary Govt School in Katra Mohalla, we serve Rasauli and surrounding areas. Contact us to discuss your event requirements and let us help you create an unforgettable celebration. Open daily from 9 AM to 8 PM for consultations and bookings.",
    tags: ["tent-house", "event-services", "wedding-decoration", "lighting", "party-rentals", "event-planning", "shamianas", "stage-decoration", "catering-equipment", "celebration"],
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
    reviews: [],
    address: "HGG Campus, Railway Station, NH-28, Ayodhya - Lucknow Rd, opposite Rasauli, behind Seth M.R. Jaipuria School, lucknow, Rasauli, Uttar Pradesh 225203",
    mapLink: "https://maps.app.goo.gl/DJGDv5eqJt3aRhwN7",
    phone: "+91 90054 30333",
    email: "",
    website: "https://balemorawellnessretreats.com/",
    whatsapp: "+91 90054 30333",
    hours: {
      mon: {open: "00:00", close: "23:59"},
      tue: {open: "00:00", close: "23:59"},
      wed: {open: "00:00", close: "23:59"},
      thu: {open: "00:00", close: "23:59"},
      fri: {open: "00:00", close: "23:59"},
      sat: {open: "00:00", close: "23:59"},
      sun: {open: "00:00", close: "23:59"}
    },
    description: "Balemora Wellness Retreats is a luxury wellness resort and heritage property offering a transformative journey where ancient Ayurvedic wisdom meets modern holistic healing. This 20-unit premium wellness destination operates 24/7 with check-in starting at 8:00 AM and check-out at midnight, providing comprehensive Ayurvedic treatments, authentic Kerala therapies, yoga and meditation sessions, personalized detox programs, and mindful wellness cuisine. With locations at NH27 Lucknow (near Bara Banki) and Almora in Uttarakhand, Balemora creates a sanctuary for families, couples, and wellness seekers. The full-service spa features deep-tissue massages, hot stone massages, sports massages, Swedish massages, aromatherapy, Ayurvedic treatments, and hydrotherapy, equipped with mud bath, sauna, hot tub, and steam room. Spa is open daily with hot springs/mineral springs on site. Guests enjoy 2 outdoor pools, 2 indoor pools, garden, outdoor entertainment area, outdoor furniture, and walkway to water. The property offers wheelchair-accessible pool, restaurant, and lounge, with well-lit paths and stair-free entrance. Dining includes restaurant, coffee shop, free full breakfast (8:00-10:00 AM), free daily reception, and 24-hour room service. Each climate-controlled room features balcony, separate dining and sitting areas, private bathroom with separate bathtub and shower, desk, and free WiFi (500+ Mbps). Business facilities include meeting rooms and conference center. Services include 24-hour front desk, dry cleaning/laundry, and daily housekeeping. Free on-site self-parking available. Minimum check-in age is 18. Credit card, debit card, or cash deposit required. Pets not allowed. Government-issued photo ID may be required. Reservations required for spa treatments. Perfect for workcations, spiritual pilgrimages to nearby Ayodhya, Buddhist circuit tours, and long wellness stays with special offers available.",
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
    reviews: [],
    address: "Box Park International, NH 27, Ayodhya - Lucknow Rd, adjacent to Seth Mr Jaipuria School, Barabanki, Sursanda, Uttar Pradesh 225001",
    mapLink: "https://maps.app.goo.gl/BPzGsEjv6nz8MM6H8",
    phone: "+91 80427 54444",
    email: "",
    website: "https://restaurants.kfc.co.in/kfc-kfc-barabanki-restaurants-lucknow-ayodhya-road-barabanki-489849/Home?utm_source=locator&utm_medium=googleplaces",
    onlineOrder: "https://www.swiggy.com/menu/7012?source=sharing",
    whatsapp: "",
    hours: {
      mon: {open: "11:00", close: "23:00"},
      tue: {open: "11:00", close: "23:00"},
      wed: {open: "11:00", close: "23:00"},
      thu: {open: "11:00", close: "23:00"},
      fri: {open: "11:00", close: "23:00"},
      sat: {open: "11:00", close: "23:00"},
      sun: {open: "11:00", close: "23:00"}
    },
    description: "KFC (Kentucky Fried Chicken) is the world-famous fast-food restaurant chain known for its signature fried chicken and delicious menu offerings. Located at Box Park International on NH 27, adjacent to Seth M.R. Jaipuria School in Barabanki, this KFC outlet brings the iconic taste of Colonel Sanders' secret recipe of 11 herbs and spices to the local community. Our menu features the legendary Original Recipe Chicken, Hot & Crispy Chicken, Zinger Burgers, Chicken Buckets for sharing, Popcorn Chicken, Chicken Wings, Rice Bowls, Wraps, and a variety of sides including French Fries, Coleslaw, and Mashed Potatoes. We also offer refreshing beverages and desserts to complete your meal. Whether you're dining in with family and friends, taking away for a quick meal, or ordering online for home delivery, KFC provides a consistent, high-quality fast-food experience. Our restaurant maintains strict hygiene standards and food safety protocols. The outlet features comfortable seating, a family-friendly atmosphere, and efficient service. Perfect for casual dining, birthday celebrations, office lunches, or satisfying those fried chicken cravings any time of the day. Order online through Swiggy for convenient home delivery, or visit us in person to enjoy the full KFC experience. We're open daily from 11 AM to 11 PM, serving finger-lickin' good chicken that has made KFC a global favorite. Come taste the difference that made KFC an international sensation!",
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
    reviews: [],
    address: "Khasra No, 203 & 204, Ayodhya - Lucknow Rd, Pargana, Pratap Ganj, Barabanki, Uttar Pradesh 225203",
    mapLink: "https://maps.app.goo.gl/FjNzddaGYa29m9g29",
    phone: "",
    email: "care@boxpark.net.in",
    website: "https://boxpark.net.in/",
    whatsapp: "",
    hours: {
      mon: {open: "00:00", close: "23:59"},
      tue: {open: "00:00", close: "23:59"},
      wed: {open: "00:00", close: "23:59"},
      thu: {open: "00:00", close: "23:59"},
      fri: {open: "00:00", close: "23:59"},
      sat: {open: "00:00", close: "23:59"},
      sun: {open: "00:00", close: "23:59"}
    },
    description: "Box Park International is a unique shopping and entertainment destination on NH 27 Ayodhya Highway, right next to Seth M.R. Jaipuria School. What makes us special? We're built entirely from repurposed shipping containers - the first mall of its kind in the region. Each container is painted in bright, eye-catching colors with creative designs that make the whole place look like a giant art installation. It's honestly hard to miss when you're driving by! Inside, you'll find a great mix of places to eat, shop, and hang out. We've got popular spots like KFC, along with local restaurants, cafes, clothing stores, and other shops - all set up in these colorful container spaces. The open-air design gives it a relaxed, outdoor market vibe that's perfect for families and friends. Whether you're stopping for a quick meal during a road trip, doing some shopping, or just want to take some cool photos for Instagram (seriously, every corner here is photo-worthy), Box Park has something for you. We're open 24/7, so you can visit anytime - early morning breakfast, late-night snacks, or weekend shopping trips. It's become a popular landmark on the Ayodhya highway, and people love the combination of sustainable design, vibrant atmosphere, and convenient location. Come check out why everyone's talking about Box Park!",
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
      mon: {open: "09:00", close: "16:00"},
      tue: {open: "09:00", close: "16:00"},
      wed: {open: "09:00", close: "16:00"},
      thu: {open: "09:00", close: "16:00"},
      fri: {open: "09:00", close: "16:00"},
      sat: {open: "09:00", close: "16:00"},
      sun: {open: "09:00", close: "16:00"}
    },
    description: "PPS College of Nursing is a premier private nursing education institution dedicated to shaping the future of healthcare professionals in the region. Located on NH 27 in Sursanda, Barabanki, our college provides comprehensive nursing education programs designed to meet the growing demand for skilled and compassionate healthcare professionals. We offer a range of nursing courses including General Nursing and Midwifery (GNM), Auxiliary Nurse Midwife (ANM), and B.Sc. Nursing programs, all designed to provide students with both theoretical knowledge and practical clinical experience. Our state-of-the-art campus features modern classrooms, well-equipped laboratories, simulation labs for hands-on training, a comprehensive library with extensive medical literature, and clinical training facilities that prepare students for real-world healthcare environments. The college maintains affiliations with reputed hospitals and healthcare institutions where students gain valuable practical experience through clinical rotations and internships. Our experienced faculty comprises qualified nursing professionals, medical practitioners, and educators who are committed to providing quality education and mentorship. We focus on developing not just technical nursing skills, but also critical thinking, patient care ethics, communication abilities, and leadership qualities essential for successful nursing careers. The curriculum is designed to meet national nursing education standards and prepares students for nursing council examinations and professional practice. PPS College of Nursing emphasizes holistic development, combining academic excellence with personality development, soft skills training, and career guidance. We provide a supportive learning environment where students from diverse backgrounds can pursue their passion for healthcare and nursing. Our graduates are well-prepared to work in hospitals, clinics, community health centers, nursing homes, and various healthcare settings, both in India and abroad. The college also offers placement assistance, helping students connect with leading healthcare institutions for employment opportunities. With modern infrastructure, experienced faculty, comprehensive curriculum, and strong industry connections, PPS College of Nursing is committed to producing competent, confident, and caring nursing professionals who will make a positive impact in the healthcare sector. Admissions are open for aspiring nursing students who wish to build a rewarding career in healthcare. Contact Amit Singh for admission inquiries, course details, eligibility criteria, and campus visits. Open Monday to Sunday, 9 AM to 4 PM.",
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
    reviews: [],
    address: "W6GR+4HQ, Barabanki, Sursanda, Uttar Pradesh 225203",
    mapLink: "https://maps.app.goo.gl/6pqEGygAYb9ShF1T7",
    phone: "+91 90449 35596",
    phoneName: "Amit Singh",
    email: "beenugupta53@gmail.com",
    website: "",
    whatsapp: "+91 90449 35596",
    whatsappName: "Amit Singh",
    hours: {
      mon: {open: "00:00", close: "23:59"},
      tue: {open: "00:00", close: "23:59"},
      wed: {open: "00:00", close: "23:59"},
      thu: {open: "00:00", close: "23:59"},
      fri: {open: "00:00", close: "23:59"},
      sat: {open: "00:00", close: "23:59"},
      sun: {open: "00:00", close: "23:59"}
    },
    description: "Maxwell Hospital is a trusted private healthcare facility providing comprehensive medical services to the community in Sursanda, Barabanki. Operating 24/7, we are committed to delivering quality healthcare with compassion and professionalism. Our hospital offers a wide range of medical services including emergency care, general medicine consultations, surgical procedures, diagnostic services, laboratory tests, X-ray and imaging facilities, pharmacy services, and patient admission facilities. We have a team of experienced doctors, skilled nurses, and dedicated healthcare staff who work round the clock to ensure the best possible care for our patients. Our emergency department is always ready to handle medical emergencies, accidents, and urgent health conditions with prompt and efficient treatment. We specialize in treating common illnesses, chronic diseases, injuries, infections, and providing maternal and child healthcare services. The hospital is equipped with modern medical equipment and maintains high standards of hygiene and patient safety. We offer outpatient consultations where patients can meet with our doctors for diagnosis, treatment plans, and follow-up care. For patients requiring hospitalization, we provide comfortable patient rooms with necessary medical monitoring and nursing care. Our diagnostic center offers a complete range of laboratory tests including blood tests, urine tests, pathology services, and medical imaging to help in accurate diagnosis. The in-house pharmacy ensures that patients have immediate access to prescribed medications. Maxwell Hospital believes in providing affordable and accessible healthcare to all sections of society. We accept various payment methods and offer transparent pricing for all medical services. Our patient-centric approach focuses on not just treating illnesses but also on preventive healthcare, health education, and wellness guidance. Whether you need emergency medical attention, routine health check-ups, treatment for ongoing conditions, or specialist consultations, Maxwell Hospital is here to serve you 24 hours a day, 7 days a week. Contact Amit Singh for appointments, emergency services, or general inquiries. Your health and well-being are our top priorities.",
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
    reviews: [
      {
        id: "review-1",
        author: "Admin",
        role: "LocalFind Team",
        rating: 4.7,
        date: "2026-03-06",
        text: "Best Studio in the entire Rasauli area! Saraswati Studio offers exceptional photography and videography services with professional quality work. Their wedding video coverage is outstanding, capturing every precious moment beautifully. The photo shoot sessions are creative and well-executed, whether it's for weddings, events, or personal portfolios. They also provide cup printing services which is a unique offering. The staff maintains good behavior and professionalism throughout the process. Their work quality is impressive and they deliver on time. Highly recommended for all your photography, videography, and printing needs in Rasauli!",
        verified: true
      }
    ],
    address: "W7F6+46J, Rasauli, Uttar Pradesh 225203",
    mapLink: "https://maps.app.goo.gl/2SMVb3x4BBwGb5yY7",
    coordinates: {
      lat: 26.9228271,
      lng: 81.2605057
    },
    phone: "+91 91989 12002",
    phoneName: "Makole",
    email: "",
    website: "",
    whatsapp: "+91 91989 12002",
    whatsappName: "Makole",
    hours: {
      mon: {open: "10:00", close: "20:00"},
      tue: {open: "10:00", close: "20:00"},
      wed: {open: "10:00", close: "20:00"},
      thu: {open: "10:00", close: "20:00"},
      fri: {open: "10:00", close: "20:00"},
      sat: {open: "10:00", close: "20:00"},
      sun: {open: "10:00", close: "20:00"}
    },
    description: "Saraswati Studio is your premier destination for professional photography and videography services in Rasauli, located in Makole. We specialize in capturing life's most precious moments with creativity, technical expertise, and artistic vision. Our comprehensive services include wedding photography and videography, covering every aspect of your special day from pre-wedding shoots to the main ceremony and reception. We excel in event photography for birthdays, anniversaries, corporate events, and social gatherings. Our studio offers professional photo shoot sessions for individuals, families, couples, and commercial purposes including portfolio shoots, product photography, and promotional content. We provide high-quality video production services including wedding films, event coverage, promotional videos, and documentary-style recordings. What sets us apart is our attention to detail, creative approach, and commitment to delivering stunning visual content that tells your story. In addition to photography and videography, we also offer cup printing services, allowing you to personalize mugs with your favorite photos and designs - perfect for gifts, events, or promotional merchandise. Our studio is equipped with modern cameras, lighting equipment, and editing software to ensure professional-grade output. We understand that every client has unique requirements, and we work closely with you to understand your vision and deliver results that exceed expectations. Our team maintains professional behavior, punctuality, and clear communication throughout the project. We offer flexible packages to suit different budgets and requirements. Whether you're planning a grand wedding, organizing a corporate event, need professional portraits, or want to create personalized printed merchandise, Saraswati Studio has the expertise and equipment to bring your vision to life. Visit us in Makole, Rasauli, or contact us to discuss your photography, videography, and printing needs. Open daily from 10 AM to 8 PM.",
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
    reviews: [],
    address: "Village & Post Rasauli District Barabanki, Rasauli Bazar Road, Uttar Pradesh 225203",
    mapLink: "https://maps.app.goo.gl/cG5dYAkjyFKb6qTz8",
    coordinates: {
      lat: 26.922656,
      lng: 81.260429
    },
    phone: "+91 80906 28512",
    phoneName: "Jamwant Singh",
    email: "",
    website: "",
    whatsapp: "+91 80906 28512",
    whatsappName: "Jamwant Singh",
    hours: {
      mon: {open: "10:00", close: "20:00"},
      tue: {open: "10:00", close: "20:00"},
      wed: {open: "10:00", close: "20:00"},
      thu: {open: "10:00", close: "20:00"},
      fri: {open: "10:00", close: "20:00"},
      sat: {open: "10:00", close: "20:00"},
      sun: {open: "10:00", close: "20:00"}
    },
    description: "Jamwant Mobile Shop is your trusted destination for all mobile phone needs in Rasauli, conveniently located on Rasauli Bazar Road. Managed by Jamwant Singh, we specialize in providing comprehensive mobile services and a wide range of mobile accessories. Our shop offers professional mobile phone repair services for all brands including screen replacement, battery replacement, charging port repair, software issues, water damage repair, and general troubleshooting. We sell a variety of mobile phones from budget-friendly options to premium smartphones, ensuring you find the perfect device that fits your needs and budget. Our extensive collection of mobile accessories includes phone cases and covers in various designs, tempered glass and screen protectors, charging cables and adapters, power banks, earphones and headphones, TWS (True Wireless Stereo) earbuds, neckband headphones, Bluetooth speakers, mobile holders and stands, memory cards and pen drives, and much more. We stock products from trusted brands and ensure quality at competitive prices. Whether you need a quick phone repair, want to upgrade to a new smartphone, or looking for the latest audio accessories like TWS earbuds or neckband headphones, we have you covered. Our knowledgeable staff provides expert advice on product selection and helps you make informed decisions. We also offer warranty support on repairs and products sold. At Jamwant Mobile Shop, customer satisfaction is our priority, and we strive to provide prompt service, genuine products, and fair pricing. Visit us for all your mobile phone, repair, and accessory needs in Rasauli. Open daily from 10 AM to 8 PM.",
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
