# LocalFind

A professional business directory platform for local communities. Built with vanilla JavaScript, no frameworks required.

**Live Website**: https://mohammad-faiz-cloud-engineer.github.io/LocalFind/

## About

LocalFind helps people discover local businesses in their area. The platform features a clean, modern interface with advanced search capabilities, category browsing, and detailed business listings.

## Key Features

- Advanced search and filtering system
- Category-based business organization
- Responsive design for all devices
- Interactive maps integration
- Business submission forms
- Dark theme interface
- SEO optimized
- Accessibility compliant
- **Full PWA Support** (installable, offline-ready)
- Service worker with intelligent caching
- Push notifications ready
- Native app-like experience

## Technology

- HTML5
- CSS3 (Custom Properties, Grid, Flexbox)
- Vanilla JavaScript (ES6+)
- Font Awesome Icons
- OpenStreetMap Integration

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/Mohammad-Faiz-Cloud-Engineer/LocalFind.git
```

2. Update configuration in `js/config.js`
```javascript
const CONFIG = {
  siteName: "Your Business Name",
  areaName: "Your City",
  contactEmail: "your@email.com",
  // ... other settings
};
```

3. Open `index.html` in your browser or deploy to any web server

## PWA Setup

LocalFind is a Progressive Web App! To enable full PWA features:

1. Generate PWA icons:
```bash
./generate-icons.sh
```

2. Serve with HTTPS (required for service workers)

3. Users can install the app on their devices

See [PWA_SETUP_GUIDE.md](PWA_SETUP_GUIDE.md) for detailed instructions.

## Project Structure

```
LocalFind/
├── index.html              # Homepage
├── directory.html          # Business listings
├── categories.html         # Category browser
├── business-detail.html    # Business details
├── add-business.html       # Add business form
├── about.html             # About page
├── css/                   # Stylesheets
├── js/                    # JavaScript files
└── assets/                # Images and icons
```

## Configuration

Edit `js/config.js` to customize:
- Site name and branding
- Contact information
- Social media links
- Map coordinates
- API endpoints

## Deployment

Works on any static hosting:
- GitHub Pages
- Netlify
- Vercel
- Traditional web servers

For GitHub Pages:
1. Push to GitHub
2. Enable Pages in repository settings
3. Select main branch
4. Your site will be live

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - see LICENSE file for details

## Author

Mohammad Faiz
- GitHub: [@Mohammad-Faiz-Cloud-Engineer](https://github.com/Mohammad-Faiz-Cloud-Engineer)
- Repository: [LocalFind](https://github.com/Mohammad-Faiz-Cloud-Engineer/LocalFind)

## Contributing

Contributions are welcome. Please read CONTRIBUTING.md for guidelines.
