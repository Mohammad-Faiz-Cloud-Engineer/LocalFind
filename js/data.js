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
