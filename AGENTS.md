# AGENTS.md - LocalFind

## Project Overview

LocalFind is a local business directory PWA built with vanilla JavaScript (HTML5, CSS3, ES6+). No frameworks. Hosted on GitHub Pages.

- **Live**: [LocalFind](https://mohammad-faiz-cloud-engineer.github.io/LocalFind/)
- **Author**: Mohammad Faiz
- **License**: MIT

## Tech Stack

- HTML5, CSS3 (Custom Properties, Grid, Flexbox)
- Vanilla JavaScript (ES6+)
- OpenStreetMap for maps
- Font Awesome icons
- PWA (service worker + manifest)

## Key Files

| File | Purpose |
| ---- | ------- |
| `js/data.js` | All business listings in `window.LISTINGS` array |
| `js/config.js` | Site config, search aliases, version |
| `js/main.js` | Core app logic |
| `js/pwa.js` | PWA install prompt, update detection |
| `js/map-main.js` | Map rendering |
| `js/business-detail.js` | Business detail page logic |
| `js/directory.js` | Directory listing page |
| `js/donation.js` | UPI donation system |
| `js/counter.js` | Animated counter for stats |
| `js/animations.js` | Scroll/entry animations |
| `index.html` | Homepage |
| `directory.html` | Business listings page |
| `categories.html` | Category browser |
| `business-detail.html` | Business detail page |
| `donation.html` | Donation page |
| `map.html` | Full-page map view |
| `about.html` | About page |
| `sw.js` | Service worker (caching) |
| `manifest.json` | PWA manifest |
| `generate-icons.sh` | PWA icon generation script |

## Code Style

### JavaScript

- ES6+ features (const, let, arrow functions, template literals)
- Semicolons required
- Meaningful variable names
- Business data uses `coordinates: { lat: X, lng: Y }` format

### CSS

- Mobile-first responsive design
- Use CSS custom properties (variables)
- Meaningful class names

### HTML

- Semantic HTML5
- ARIA labels for accessibility
- Alt text on images

## Adding a New Business

**This is the most common task. Follow the checklist below.**

### Files to Update (in order)

1. **`js/data.js`** - Add business entry to `window.LISTINGS`
   - Use `coordinates: { lat: X, lng: Y }` format
   - Hours use 24h format: `mon: { open: "09:00", close: "18:00" }`
   - Closed days: `{ open: "00:00", close: "00:00" }`
   - Split shifts supported: `mon: { open: "04:00", close: "07:00", open2: "18:00", close2: "22:00" }`
   - IDs must be lowercase-with-hyphens (e.g., `"my-business-name"`)
   - `addedDate` is required (format: `"YYYY-MM-DD"`) — used by `isBusinessNew()` to show "New" badge (7-day window)
   - Real-time open/closed status is calculated from `hours` using IST (UTC+5:30), not from the `status` field
   - If inside a mall: add `locatedInMall: "mall-id"` AND update the mall's `tenants` array

2. **`js/config.js`** - Add search keywords to `searchAliases` and bump `version`
   - **IMPORTANT**: CONFIG is frozen with `Object.freeze()` at runtime — you MUST edit the source file, not runtime objects
   - Add entry to `searchAliases` object, then bump `version` field (e.g., `"4.3.7"` → `"4.3.8"`)

3. **`index.html`** - Update business count in **4 places**:
   - Hero stats: `data-target="N"` (Listings count, line ~141)
   - Map overlay: `N listings in this area` (line ~243)
   - Stats grid: `data-target="N"` (Businesses count, line ~254)
   - Stats grid: `data-target="N"` (Categories count, line ~258 — only if adding a new category)

4. **`categories.html`** - Increment listing count for the relevant category
   - Counts are hardcoded: `<p>N listings</p>` inside each `<a class="cat-card">`
   - If adding a **new category**, add a new `<a class="cat-card">` block
   - **IMPORTANT**: Filtering uses `categorySlug`, not the display name — so the `category` field in data.js and the `<h3>` in categories.html don't need to match exactly (e.g., data.js can say "Healthcare & Pharmacy" while categories.html says "Healthcare & Medical Services")

5. **Version files** - Bump version in all of:
   - `js/config.js` (`version` field + `@version` comment)
   - `js/data.js` (`@version` comment)
   - `js/main.js` (`@version` comment)
   - `js/pwa.js` (`@version` comment + `PWA_VERSION` constant)
   - `manifest.json` (`version` field)
   - `sw.js` (`@version`, `CACHE_VERSION`, `BUILD_NUMBER`)

6. **`sw.js`** - Add new file paths to `STATIC_ASSETS` if any new files were created

### Business Entry Template

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
  coordinates: { lat: XX.XXXXXXX, lng: XX.XXXXXXX },
  reviews: [],
  address: "Full Address",
  mapLink: "https://maps.app.goo.gl/...",
  phone: "+91 XXXXX XXXXX",
  phoneName: "Contact Person",
  email: "email@example.com",
  website: "https://website.com",
  whatsapp: "+91 XXXXX XXXXX",
  whatsappName: "Contact Person",
  hours: {
    mon: { open: "09:00", close: "18:00" },
    tue: { open: "09:00", close: "18:00" },
    wed: { open: "09:00", close: "18:00" },
    thu: { open: "09:00", close: "18:00" },
    fri: { open: "09:00", close: "18:00" },
    sat: { open: "09:00", close: "18:00" },
    sun: { open: "00:00", close: "00:00" }
  },
  description: "Full business description...",
  tags: ["tag1", "tag2", "tag3"],
  addedDate: "2026-06-12"
}
```

**Optional fields** (used by some businesses):

- `instagram: "https://instagram.com/..."` — Instagram profile link
- `onlineOrder: "https://swiggy.com/..."` — Swiggy/Zomato ordering link
- `zomato: "https://zomato.com/..."` — Zomato link
- `upiId: "name@upi"` — UPI payment ID
- `upiName: "Business Name"` — UPI display name
- `phoneSecondary: "+91 XXXXX XXXXX"` — Secondary phone
- `phoneSecondaryName: "Person Name"` — Secondary contact name
- `disableAppointment: true` — Hide appointment button
- `bookMyShow: "https://bookmyshow.com/..."` — BookMyShow link
- `districtIn: "https://district.in/..."` — District link
- `lgbtqFriendly: true` — LGBTQ+ friendly badge
- `womenOwned: true` — Women-owned badge

### Review Object Structure

Each review in the `reviews` array follows this structure:

```javascript
{
  id: "review-1",
  author: "Admin",
  role: "LocalFind Team",
  rating: 5.0,
  date: "2026-02-27",
  text: "Review text here...",
  verified: true
}
```

### Mall Business (Two-Way Linking)

If business is inside a mall, both sides must reference each other:

```javascript
// 1. Business entry - add locatedInMall
{
  id: "restaurant-name",
  // ... all usual fields ...
  coordinates: { lat: 26.9215276, lng: 81.1742593 }, // Use mall's coordinates
  locatedInMall: "awadh-avenue-mall"
}

// 2. Mall entry in data.js - add business ID to tenants array
{
  id: "awadh-avenue-mall",
  // ... other properties ...
  tenants: ["restaurant-name", "other-business-id"]
}
```

**Available Malls:**

- `awadh-avenue-mall` - Awadh Avenue Mall (26.9215276, 81.1742593)
- `box-park-international` - Box Park International (26.9247718, 81.2498400)

### Verification Checklist

After adding a business, verify:

- [ ] Business appears on the map
- [ ] Search finds the business
- [ ] Detail page loads correctly
- [ ] All counts match everywhere
- [ ] Mobile and desktop layouts work
- [ ] If in mall: Mall page shows business in tenant grid
- [ ] If in mall: Business page shows mall location card

## Current Version

- **Version**: 4.3.7
- **Cache Version**: `localfind-v4.3.7`
- **Build Number**: `20260612a`

## Project Structure

```text
LocalFind/
├── index.html
├── directory.html
├── categories.html
├── business-detail.html
├── donation.html
├── about.html
├── map.html
├── offline.html
├── 404.html
├── 500.html
├── privacy-policy.html
├── manifest.json
├── sw.js
├── generate-icons.sh
├── .htaccess
├── .gitignore
├── .github/
│   └── workflows/
├── css/
│   ├── style.css
│   ├── navbar.css
│   ├── hero.css
│   ├── cards.css
│   ├── categories.css
│   ├── filters.css
│   ├── footer.css
│   ├── business-detail.css
│   └── utilities.css
├── js/
│   ├── config.js
│   ├── data.js
│   ├── main.js
│   ├── pwa.js
│   ├── map-main.js
│   ├── business-detail.js
│   ├── directory.js
│   ├── donation.js
│   ├── counter.js
│   └── animations.js
├── assets/
│   ├── icons/
│   │   ├── mainlogo.svg
│   │   ├── dine.svg
│   │   └── shop.svg
│   └── images/
│       ├── mainlogo.svg
│       ├── logo.svg
│       ├── og-image.jpg
│       └── og-image.svg
└── Voices/           (40 business voice recording folders)
```
