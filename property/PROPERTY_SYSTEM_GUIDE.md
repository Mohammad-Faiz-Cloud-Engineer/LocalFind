# Property System Documentation

## Overview

The property system is a separate module within LocalFind that allows users to browse properties and connect with real estate agents. It consists of two main user flows:

1. Find Agent/Broker - Browse and contact property agents
2. Browse Properties - View available properties directly

## File Structure

```
property/
├── property.html              # Main property page (entry point)
├── property-detail.html       # Individual property detail page
├── agent-detail.html          # Agent/Broker detail page
├── property.css               # Styles for main property page
├── property-detail.css        # Styles for property detail page
├── agent-detail.css           # Styles for agent detail page
├── property.js                # Logic for main property page
├── property-detail.js         # Logic for property detail page
├── agent-detail.js            # Logic for agent detail page
├── data.js                    # Property and agent data
├── assets/                    # Property images and videos
│   ├── property-1/
│   │   ├── image1.jpg
│   │   ├── image2.jpg
│   │   └── video.mp4
│   ├── placeholder.svg
│   └── README.md
└── voices/                    # Property voice descriptions
    ├── property-1/
    │   └── description.mp3
    └── README.md
```

## Adding a New Property

### Step 1: Add Property Data

Edit `property/data.js` and add a new property object to the `properties` array:

```javascript
{
  id: "property-2",                              // Unique identifier (kebab-case)
  title: "3 BHK Apartment in Gomti Nagar",       // Property title
  type: "Residential Apartment",                 // Property type
  price: "₹ 85 Lac",                            // Price with currency symbol
  size: "1500 Sq.ft.",                          // Area with unit
  location: "Gomti Nagar, Lucknow",             // Location
  project: "Green Valley Residency",            // Project name
  society: "Green Valley Residency",            // Society name
  agentId: "agent-1",                           // Reference to agent ID
  images: [                                      // Array of image paths
    "property/assets/property-2/image1.jpg",
    "property/assets/property-2/image2.jpg",
    "property/assets/property-2/image3.jpg"
  ],
  description: "Full property description...",   // Detailed description
  amenities: [                                   // Array of amenities
    "Swimming Pool",
    "Gym",
    "Parking",
    "24x7 Security"
  ],
  projectDetails: {                              // Project information
    name: "Green Valley Residency",
    description: "Project description...",
    reraApproved: true,
    facilities: ["Power Backup", "Lift"]
  },
  unitConfigurations: [                          // Unit types and pricing
    {
      type: "3 BHK Apartment",
      area: "1500 Sq.ft.",
      price: "₹ 85 Lac"
    }
  ]
}
```

### Step 2: Add Property Images

1. Create a folder in `property/assets/` with the property ID:
   ```
   property/assets/property-2/
   ```

2. Add images to this folder:
   ```
   property/assets/property-2/image1.jpg
   property/assets/property-2/image2.jpg
   property/assets/property-2/image3.jpg
   ```

3. Update the `images` array in the property data with the correct paths:
   ```javascript
   images: [
     "property/assets/property-2/image1.jpg",
     "property/assets/property-2/image2.jpg",
     "property/assets/property-2/image3.jpg"
   ]
   ```

**Image Requirements:**
- Format: JPG or PNG
- Recommended size: 1920x1080 or higher
- Aspect ratio: 16:9 preferred
- File size: Under 2MB per image for optimal loading

**Important:** If no images are provided, the system will use `property/assets/placeholder.svg` automatically.

### Step 3: Add Voice Description (Optional)

1. Create a folder in `property/voices/` with the property ID:
   ```
   property/voices/property-2/
   ```

2. Add the voice description file:
   ```
   property/voices/property-2/description.mp3
   ```

**Audio Requirements:**
- Format: MP3
- File name: Must be exactly `description.mp3`
- Bitrate: 128kbps or higher recommended
- Duration: 1-3 minutes recommended
- Content: Should describe location, size, price, amenities, and key features

**How it works:**
- The system automatically looks for `property/voices/{property-id}/description.mp3`
- If the file exists, the listen button will play the audio
- If the file does not exist, the button will still appear but audio will not load

## Adding a New Agent

Edit `property/data.js` and add a new agent object to the `agents` array:

```javascript
{
  id: "agent-2",                                 // Unique identifier
  name: "Realty Solutions",                      // Agent/Company name
  company: "Realty Solutions Pvt Ltd",           // Company name
  phone: "+91 98765 43210",                      // Contact phone
  email: "contact@realtysolutions.com",          // Contact email
  website: "https://www.realtysolutions.com",    // Website URL
  location: "Hazratganj, Lucknow",               // Office location
  propertiesForSale: 45,                         // Number of properties for sale
  propertiesForRent: 8,                          // Number of properties for rent
  description: "Agent description..."            // About the agent
}
```

## Linking Properties to Agents

Set the `agentId` field in the property object to match the agent's `id`:

```javascript
// Agent
{
  id: "agent-1",
  name: "SS Realty Infra",
  // ... other fields
}

// Property
{
  id: "property-1",
  agentId: "agent-1",  // Links to agent-1
  // ... other fields
}
```

## Property Data Fields Reference

### Required Fields

- `id` (string): Unique identifier, use kebab-case (e.g., "property-1")
- `title` (string): Property title/name
- `type` (string): Property type (e.g., "Residential Plots", "Apartment")
- `price` (string): Price with currency symbol (e.g., "₹ 37.66 Lac")
- `size` (string): Area with unit (e.g., "1076 Sq.ft.")
- `location` (string): Property location
- `project` (string): Project name
- `society` (string): Society name
- `description` (string): Full property description

### Optional Fields

- `agentId` (string): Reference to agent ID
- `images` (array): Array of image paths
- `amenities` (array): List of amenities
- `projectDetails` (object): Project information
  - `name` (string): Project name
  - `description` (string): Project description
  - `reraApproved` (boolean): RERA approval status
  - `facilities` (array): List of facilities
- `unitConfigurations` (array): Different unit types available
  - `type` (string): Unit type
  - `area` (string): Unit area
  - `price` (string): Unit price

## Agent Data Fields Reference

### Required Fields

- `id` (string): Unique identifier, use kebab-case (e.g., "agent-1")
- `name` (string): Agent/Company name
- `company` (string): Company name
- `location` (string): Office location
- `propertiesForSale` (number): Count of properties for sale
- `propertiesForRent` (number): Count of properties for rent

### Optional Fields

- `phone` (string): Contact phone number
- `email` (string): Contact email
- `website` (string): Website URL
- `description` (string): About the agent/company
- `rating` (number): Agent rating (e.g., 4.6)
- `reviewCount` (number): Number of reviews
- `verified` (boolean): Verification status
- `reraStatus` (boolean): RERA registration status
- `ownerName` (string): Owner/Principal name
- `experience` (string): Years of experience
- `teamSize` (string): Team size description
- `areasOfOperation` (array): List of areas where agent operates
- `propertyDeals` (array): Types of properties agent deals in
- `services` (array): Services offered by agent

## URL Structure

### Main Property Page
```
property.html
```

### Property Detail Page
```
property-detail.html?id=property-1
```

### Agent Detail Page
```
agent-detail.html?id=agent-1
```

## Navigation Integration

The property system is integrated into the main navigation:

- Desktop navigation: Header nav links
- Mobile navigation: Mobile menu
- Footer: Quick links section

The link appears as "Property" in all navigation menus.

## Image Gallery Functionality

The property detail page includes:

1. **Main Image Display**: Large image viewer
2. **Navigation Arrows**: Previous/Next buttons (only if multiple images)
3. **Thumbnail Strip**: Clickable thumbnails below main image
4. **Fullscreen Mode**: Click main image to open fullscreen viewer
5. **Zoom Support**: Browser native zoom in fullscreen mode

## Voice Description Functionality

The property detail page includes an audio player:

1. **Listen Button**: Circular button with speaker icon
2. **Play/Pause**: Click to toggle playback
3. **Visual Feedback**: Button changes color and animates when playing
4. **Auto-stop**: Audio stops when finished

## Text Expansion

Long descriptions automatically show "See More" button:

- Descriptions over 300 characters are truncated
- Click "See More" to expand full text
- Click "See Less" to collapse

## Styling and Theme

The property system uses the same design system as the main LocalFind platform:

- CSS variables from `css/style.css`
- Consistent color scheme
- Responsive breakpoints
- Same typography
- Matching component styles

## Responsive Design

Breakpoints:
- Desktop: 769px and above (2-column layout)
- Tablet: 768px and below (1-column layout)
- Mobile: 480px and below (optimized spacing)

## Security Considerations

1. **HTML Sanitization**: All user-facing text is sanitized using `sanitizeHTML()` function
2. **XSS Prevention**: No raw HTML injection
3. **Safe URLs**: Image and audio paths are properly encoded

## Testing a New Property

After adding a property:

1. Verify data is correctly added to `property/data.js`
2. Check images are in correct folder: `property/assets/{property-id}/`
3. Check voice file is in correct folder: `property/voices/{property-id}/description.mp3`
4. Open `property.html` in browser
5. Click "Browse Properties"
6. Verify property card appears
7. Click property card to open detail page
8. Test image gallery navigation
9. Test fullscreen image viewer
10. Test voice description playback
11. Test "See More" functionality if description is long

## Common Issues and Solutions

### Images not loading
- Check file paths in `images` array match actual file locations
- Verify image files exist in `property/assets/{property-id}/`
- Check file extensions match (case-sensitive on some systems)
- Ensure images are JPG or PNG format

### Voice not playing
- Verify file is named exactly `description.mp3`
- Check file is in `property/voices/{property-id}/`
- Ensure MP3 format is valid
- Check browser console for errors

### Property not appearing
- Verify property object is properly added to `properties` array in `data.js`
- Check for JavaScript syntax errors (missing commas, brackets)
- Ensure `id` field is unique
- Check browser console for errors

### Agent not linking
- Verify `agentId` in property matches agent's `id` exactly
- Check agent exists in `agents` array
- Ensure IDs are strings and match case-sensitively

## Data Validation Checklist

Before adding a property, ensure:

- [ ] Unique `id` (no duplicates)
- [ ] All required fields are filled
- [ ] Price includes currency symbol
- [ ] Size includes unit (Sq.ft., etc.)
- [ ] Image paths are correct and files exist
- [ ] Voice file is named `description.mp3` if provided
- [ ] `agentId` matches an existing agent if provided
- [ ] No trailing commas in arrays/objects
- [ ] Proper JSON syntax (quotes, brackets, commas)

## Maintenance

### Updating Property Data
Edit `property/data.js` and modify the relevant property object.

### Removing a Property
1. Remove property object from `properties` array in `data.js`
2. Optionally delete image folder from `property/assets/`
3. Optionally delete voice folder from `property/voices/`

### Updating Agent Data
Edit `property/data.js` and modify the relevant agent object.

## Performance Optimization

1. **Image Optimization**: Compress images before uploading
2. **Lazy Loading**: Images load as needed
3. **Audio Preload**: Set to "none" to avoid unnecessary loading
4. **Placeholder**: SVG placeholder is lightweight

## Browser Compatibility

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

Potential additions:
- Video support in gallery
- Property comparison feature
- Favorites/Wishlist
- Advanced filtering
- Map integration
- Contact form
- Virtual tour support
