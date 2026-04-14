# Add New Business to LocalFind

Quick guide for adding a business to the directory.

## Business Information

Fill in these details:

```
Business Name: 
Location: [Area], [City], [State] [PIN]
Category: 
Category Slug: [lowercase-with-hyphens]

Contact:
- Phone: +91 XXXXX XXXXX
- WhatsApp: +91 XXXXX XXXXX
- Email: 
- Website: 

Map:
- Google Maps Link: https://maps.app.goo.gl/...
- Latitude: XX.XXXXXXX
- Longitude: XX.XXXXXXX

Hours:
- Monday: HH:MM - HH:MM
- Tuesday: HH:MM - HH:MM
- Wednesday: HH:MM - HH:MM
- Thursday: HH:MM - HH:MM
- Friday: HH:MM - HH:MM
- Saturday: HH:MM - HH:MM
- Sunday: HH:MM - HH:MM (or 00:00 - 00:00 for closed)

Description: [Full description]
Tags: [tag1, tag2, tag3]

Featured: Yes/No
Verified: Yes/No
Rating: X.X/5

Mall Location (if applicable):
- Is this business inside a mall? Yes/No
- If yes, which mall? [Mall name]
```

## Files to Update

After adding a new business, you MUST update these files:

### 1. js/data.js (Main Data File)
Add business to `window.LISTINGS` array:

```javascript
{
  id: "business-name-slug",
  name: "Business Name",
  category: "Category Name",
  categorySlug: "category-slug",
  featured: true,
  verified: true,
  status: "open",
  rating: 4.5,
  reviewCount: 1,
  coordinates: { lat: 26.9230278, lng: 81.2608333 }, // ← Important!
  address: "Full Address",
  mapLink: "https://maps.app.goo.gl/...",
  phone: "+91 XXXXX XXXXX",
  email: "email@example.com",
  website: "https://website.com",
  whatsapp: "+91 XXXXX XXXXX",
  hours: {
    mon: { open: "09:00", close: "18:00" },
    tue: { open: "09:00", close: "18:00" },
    wed: { open: "09:00", close: "18:00" },
    thu: { open: "09:00", close: "18:00" },
    fri: { open: "09:00", close: "18:00" },
    sat: { open: "09:00", close: "18:00" },
    sun: { open: "00:00", close: "00:00" } // Closed
  },
  description: "Full business description...",
  tags: ["tag1", "tag2", "tag3"],
  isNew: true
}
```

**That's it for coordinates!** The map and detail pages automatically read from `business.coordinates`.

### If Business is Inside a Mall

When adding a business that's located inside a mall (like a restaurant in Awadh Avenue Mall), you need to link them together. It's a two-way connection:

**Step 1:** Add the business with `locatedInMall` property:

```javascript
{
  id: "restaurant-name",
  name: "Restaurant Name",
  // ... all the usual fields ...
  coordinates: { lat: 26.9215276, lng: 81.1742593 }, // Use mall's coordinates
  address: "Awadh Avenue Mall, Floor 2, Awas Vikas Colony, Barabanki",
  // ... other fields ...
  locatedInMall: "awadh-avenue-mall"  // ← Add this line
}
```

**Step 2:** Update the mall's tenant list. Find the mall entry in js/data.js and add your business ID:

```javascript
{
  id: "awadh-avenue-mall",
  name: "Awadh Avenue Mall",
  // ... other properties ...
  tenants: ["restaurant-name", "other-business-id"]  // ← Add your business ID here
}
```

That's it! Now the mall page will show your business in the tenant grid, and your business page will show "Located Inside [Mall Name]" card.

**Available Malls:**
- `awadh-avenue-mall` - Awadh Avenue Mall (coordinates: 26.9215276, 81.1742593)
- `box-park-international` - Box Park International (coordinates: 26.9247718, 81.2498400)

### 2. js/config.js
Add search keywords and bump version:

```javascript
searchAliases: {
  'business-name': ['keyword1', 'keyword2', 'service-type'],
  // ...
}

// Update version
version: '4.3.5' // Current version
```

### 3. index.html
Update business count in hero section:

```html
<div class="stat-number" data-target="27">0</div> <!-- Update number -->
```

### 4. categories.html
Update category count or add new category card if needed.

### 5. Version Files
Update version in these files:
- `js/main.js` - @version comment
- `js/pwa.js` - @version and PWA_VERSION
- `manifest.json` - version field
- `sw.js` - @version, CACHE_VERSION, BUILD_NUMBER

### 6. Documentation Files (if counts mentioned)
Update business counts in:
- `MAP_FIX_REPORT.md` - Update total business count if mentioned
- `PRODUCTION_AUDIT_REPORT.md` - Update business owner count
- `URGENT_SECURITY_NOTICE.md` - Update business owner count

## Complete Update Checklist

Use this checklist every time you add a new business:

- [ ] **js/data.js** - Added business entry with proper coordinates
  - [ ] If in mall: Added `locatedInMall: "mall-id"`
  - [ ] If in mall: Updated mall's `tenants` array
- [ ] **js/config.js** - Added search keywords and bumped version
- [ ] **index.html** - Updated business count in 3 places:
  - [ ] Hero stats section (data-target)
  - [ ] Map overlay section (X listings text)
  - [ ] Stats grid section (data-target)
- [ ] **categories.html** - Updated category listing count
- [ ] **Version files** - Updated all version numbers:
  - [ ] js/main.js
  - [ ] js/pwa.js
  - [ ] manifest.json
  - [ ] sw.js
- [ ] **Documentation** - Updated counts in report files if needed
- [ ] **Tested** - Verified everything works

## Verification

After adding:
- [ ] Business shows on map
- [ ] Search finds the business
- [ ] Detail page loads correctly
- [ ] All counts match
- [ ] Mobile and desktop work
- [ ] If in mall: Mall page shows business in tenant grid
- [ ] If in mall: Business page shows mall location card

## Important Notes

- **ID Format**: Use lowercase with hyphens (e.g., `my-business-name`)
- **Coordinates**: Must be in `coordinates: { lat: X, lng: Y }` format
- **Hours**: Use 24-hour format (e.g., "09:00", "18:00")
- **Closed Days**: Use `{ open: "00:00", close: "00:00" }`
- **Version**: Always bump version when adding businesses
- **Mall Tenants**: Both business and mall need to reference each other

## Example: Regular Business

```javascript
{
  id: "example-restaurant",
  name: "Example Restaurant",
  category: "Restaurants & Food",
  categorySlug: "restaurants",
  featured: true,
  verified: true,
  status: "open",
  rating: 4.5,
  reviewCount: 1,
  coordinates: { lat: 26.9135, lng: 81.2328 },
  address: "Main Road, Rasauli, Uttar Pradesh 225203",
  mapLink: "https://maps.app.goo.gl/abc123",
  phone: "+91 98765 43210",
  email: "info@example.com",
  website: "https://example.com",
  whatsapp: "+91 98765 43210",
  hours: {
    mon: { open: "11:00", close: "22:00" },
    tue: { open: "11:00", close: "22:00" },
    wed: { open: "11:00", close: "22:00" },
    thu: { open: "11:00", close: "22:00" },
    fri: { open: "11:00", close: "22:00" },
    sat: { open: "11:00", close: "22:00" },
    sun: { open: "00:00", close: "00:00" }
  },
  description: "Best restaurant in Rasauli serving authentic North Indian cuisine with a modern twist. Family-friendly atmosphere, great service, and delicious food.",
  tags: ["restaurant", "food", "north-indian", "dining", "takeaway"],
  isNew: true
}
```

## Example: Business Inside Mall

```javascript
{
  id: "spice-kitchen-awadh",
  name: "Spice Kitchen",
  category: "Restaurants & Food",
  categorySlug: "restaurants",
  featured: true,
  verified: true,
  status: "open",
  rating: 4.5,
  reviewCount: 12,
  coordinates: { lat: 26.9215276, lng: 81.1742593 }, // Same as mall
  address: "Awadh Avenue Mall, 2nd Floor, Awas Vikas Colony, Barabanki, UP 225001",
  mapLink: "https://maps.app.goo.gl/NZwU3Lk9eNZ41u9G9",
  phone: "+91 98765 43210",
  email: "info@spicekitchen.com",
  website: "https://spicekitchen.com",
  whatsapp: "+91 98765 43210",
  hours: {
    mon: { open: "11:00", close: "22:00" },
    tue: { open: "11:00", close: "22:00" },
    wed: { open: "11:00", close: "22:00" },
    thu: { open: "11:00", close: "22:00" },
    fri: { open: "11:00", close: "22:00" },
    sat: { open: "11:00", close: "23:00" },
    sun: { open: "11:00", close: "23:00" }
  },
  description: "Spice Kitchen brings authentic Indian flavors to Awadh Avenue Mall. Located on the 2nd floor, we serve delicious North Indian, South Indian, and Chinese cuisine. Perfect for families and food lovers.",
  tags: ["restaurant", "food", "indian-food", "mall", "dining"],
  isNew: true,
  locatedInMall: "awadh-avenue-mall"  // ← Links to mall
}
```

Then update the mall:
```javascript
{
  id: "awadh-avenue-mall",
  // ... other properties ...
  tenants: ["spice-kitchen-awadh"]  // ← Add business ID here
}
```

That's it! The centralized data structure makes adding businesses simple.
