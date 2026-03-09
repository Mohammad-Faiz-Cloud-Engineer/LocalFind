# 📋 ADD NEW BUSINESS - COMPLETE INTEGRATION PROMPT

Use this prompt template when adding a new business to LocalFind. Fill in the business details and provide this to the AI assistant.

---

## 🎯 INSTRUCTION FOR AI ASSISTANT

**Task:** Add a new business to the LocalFind directory and update ALL related files to maintain consistency.

**Critical:** Follow the complete checklist below. Do NOT skip any steps.

---

## 📝 BUSINESS INFORMATION TEMPLATE

```
Business Name: [Business Name]
Location: [Area/Village], [City], [State] [PIN]
Category: [Select from existing or create new]
Category Slug: [kebab-case-slug]

Contact Information:
- Phone: [+91 XXXXX XXXXX]
- Phone Name: [Optional - Contact person name]
- WhatsApp: [+91 XXXXX XXXXX]
- WhatsApp Name: [Optional - Contact person name]
- Email: [email@example.com or leave blank]
- Website: [https://website.com or leave blank]

Map Coordinates:
- Google Maps Link: [https://maps.app.goo.gl/...]
- Latitude: [XX.XXXXXXX]
- Longitude: [XX.XXXXXXX]

Operating Hours:
- Monday: [HH:MM - HH:MM or Closed]
- Tuesday: [HH:MM - HH:MM or Closed]
- Wednesday: [HH:MM - HH:MM or Closed]
- Thursday: [HH:MM - HH:MM or Closed]
- Friday: [HH:MM - HH:MM or Closed]
- Saturday: [HH:MM - HH:MM or Closed]
- Sunday: [HH:MM - HH:MM or Closed]

Business Details:
- Description: [Detailed description of services/products]
- Services/Tags: [service1, service2, service3, ...]

Status:
- Featured: [Yes/No]
- Verified: [Yes/No]
- Rating: [X.X out of 5]

Admin Review (if applicable):
- Rating: [X.X]
- Review Text: [Your review text]
```

---

## ✅ COMPLETE INTEGRATION CHECKLIST

### 1️⃣ **js/data.js** (PRIMARY DATA FILE)
- [ ] Add complete business entry to `window.LISTINGS` array
- [ ] Include all fields: id, name, category, categorySlug, featured, verified, status, rating, reviewCount
- [ ] Add contact info: phone, phoneName, email, website, whatsapp, whatsappName
- [ ] Add coordinates object: `coordinates: { lat: XX.XXXXXXX, lng: XX.XXXXXXX }`
- [ ] Add operating hours for all 7 days
- [ ] Add full description (comprehensive, SEO-friendly)
- [ ] Add relevant tags array
- [ ] Add admin review if applicable (in reviews array)
- [ ] Set isNew: true for new listings

### 2️⃣ **js/business-detail.js** (BUSINESS DETAIL PAGE MAP)
- [ ] Add business ID and coordinates to `getBusinessCoordinates()` function
- [ ] Format: `'business-id-slug': [latitude, longitude]`
- [ ] Ensure coordinates match exactly with data.js

### 3️⃣ **map.html** (MAIN MAP PAGE)
- [ ] Add business ID and coordinates to `extractCoordinates()` function
- [ ] Format: `'business-id-slug': [latitude, longitude]`
- [ ] Update comment showing total business count

### 4️⃣ **js/config.js** (SEARCH ALIASES)
- [ ] Add relevant search aliases for the business
- [ ] Include business name variations
- [ ] Include service/product keywords
- [ ] Include category-related terms
- [ ] Example: `'photography': ['photo', 'photographer', 'studio', 'business-name', ...]`

### 5️⃣ **index.html** (HOMEPAGE STATS)
- [ ] Update hero stats: `data-target="XX"` for Listings count
- [ ] Update hero stats: `data-target="XX"` for Categories count (if new category)
- [ ] Update map info: `XX listings in this area`
- [ ] Add new category card if it's a new category

### 6️⃣ **categories.html** (CATEGORY PAGE)
- [ ] Update existing category count if business fits existing category
- [ ] Add new category card if it's a new category
- [ ] Include category icon (Font Awesome)
- [ ] Link to: `directory.html?category=category-slug`

### 7️⃣ **VERSION & CACHE** (FORCE UPDATE)
- [ ] Increment version in `js/config.js` (e.g., 4.2.0 → 4.2.1)
- [ ] Update version in `js/main.js` (@version tag)
- [ ] Update version in `js/pwa.js` (@version tag and PWA_VERSION constant)
- [ ] Update version in `manifest.json` (version and version_name)
- [ ] Update version in `sw.js` (@version, CACHE_VERSION, BUILD_NUMBER)

### 8️⃣ **VERIFICATION** (FINAL CHECKS)
- [ ] Count total businesses in data.js (should match stats)
- [ ] Verify coordinates in all 3 locations match
- [ ] Test search functionality with business name
- [ ] Verify category filtering works
- [ ] Check map displays business marker
- [ ] Verify business detail page loads correctly
- [ ] Test on mobile and desktop

---

## 📊 QUICK REFERENCE - FILES TO UPDATE

| File | What to Update | Required |
|------|----------------|----------|
| `js/data.js` | Add business entry | ✅ CRITICAL |
| `js/business-detail.js` | Add coordinates mapping | ✅ CRITICAL |
| `map.html` | Add coordinates mapping | ✅ CRITICAL |
| `js/config.js` | Add search aliases + version | ✅ CRITICAL |
| `index.html` | Update stats + category | ✅ CRITICAL |
| `categories.html` | Update category counts | ✅ CRITICAL |
| `js/main.js` | Update version | ✅ CRITICAL |
| `js/pwa.js` | Update version | ✅ CRITICAL |
| `manifest.json` | Update version | ✅ CRITICAL |
| `sw.js` | Update version + cache | ✅ CRITICAL |

---

## 🎯 EXAMPLE USAGE

```markdown
Add new business with the following details:

Business Name: Example Restaurant
Location: Main Road, Rasauli, Uttar Pradesh 225203
Category: Restaurants & Food
Category Slug: restaurants

Contact Information:
- Phone: +91 98765 43210
- Phone Name: Raj Kumar
- WhatsApp: +91 98765 43210
- WhatsApp Name: Raj Kumar
- Email: info@examplerestaurant.com
- Website: https://examplerestaurant.com

Map Coordinates:
- Google Maps Link: https://maps.app.goo.gl/abc123
- Latitude: 26.9135
- Longitude: 81.2328

Operating Hours:
- Monday to Saturday: 11:00 AM - 10:00 PM
- Sunday: Closed

Business Details:
- Description: Best restaurant in Rasauli serving authentic North Indian cuisine...
- Services/Tags: restaurant, food, north-indian, dining, takeaway

Status:
- Featured: Yes
- Verified: Yes
- Rating: 4.5

Admin Review:
- Rating: 4.5
- Review Text: Excellent food quality and service. Highly recommended!
```

---

## ⚠️ IMPORTANT NOTES

1. **ID Format:** Use kebab-case (lowercase with hyphens): `business-name-location`
2. **Coordinates:** Must be exact decimal format (e.g., 26.9228271, 81.2605057)
3. **Hours Format:** Use 24-hour format "HH:MM" or "00:00" for closed
4. **Version Bump:** Always increment version when adding businesses
5. **Cache Bust:** Update BUILD_NUMBER in sw.js to current date (YYYYMMDD)
6. **Test Everything:** Verify all functionality after adding business

---

## 🚀 POST-ADDITION VERIFICATION COMMANDS

After adding a business, verify with these checks:

```bash
# Count businesses in data.js
grep -c 'id: "' js/data.js

# Count coordinates in business-detail.js
grep -E "'[a-z-]+': \[" js/business-detail.js | wc -l

# Count coordinates in map.html
grep -E "'[a-z-]+': \[" map.html | wc -l

# All three should return the same number!
```

---

## 📞 SUPPORT

If you encounter issues:
1. Check all files were updated
2. Verify coordinates format is correct
3. Ensure version numbers match across all files
4. Clear browser cache and test
5. Check browser console for errors

---

**Last Updated:** March 6, 2026  
**Version:** 1.0  
**Compatible with:** LocalFind v4.1.1+
