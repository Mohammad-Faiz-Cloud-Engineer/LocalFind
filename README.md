# LocalFind - Business Directory Platform

> A modern, production-ready local business directory website with professional design and enterprise-grade features.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 🌟 Features

- **Responsive Design** - Optimized for all devices (desktop, tablet, mobile)
- **Advanced Search** - Filter businesses by category, rating, and location
- **Category Browser** - Browse 12+ business categories with intuitive navigation
- **Business Listings** - Detailed business pages with contact information and maps
- **Multi-step Forms** - Professional business submission and contact forms
- **Interactive Maps** - OpenStreetMap integration for location display
- **Dark Theme** - Modern dark UI with professional color scheme
- **Accessibility** - WCAG 2.1 AA compliant with full keyboard navigation
- **SEO Optimized** - Complete meta tags, structured data, and sitemap
- **Security Hardened** - XSS protection, CSP headers, and input sanitization
- **Performance** - Optimized loading, lazy loading, and caching

## 🚀 Live Demo

[View Live Demo](https://mohammad-faiz-cloud-engineer.github.io/LocalFind/)

## 📸 Screenshots

### Homepage
![Homepage](assets/images/og-image.jpg)

### Business Directory
Professional listing interface with advanced filtering and search capabilities.

### Category Browser
Intuitive category navigation with icon-based cards.

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Icons**: Font Awesome 6.4.0
- **Fonts**: Google Fonts (Syne, DM Sans)
- **Maps**: OpenStreetMap
- **Architecture**: Component-based, modular design

## 📁 Project Structure

```
LocalFind/
├── index.html              # Homepage
├── directory.html          # Business listings
├── categories.html         # Category browser
├── business-detail.html    # Individual business page
├── add-business.html       # Business submission form
├── about.html             # About page
├── contact.html           # Contact form
├── 404.html               # Error page
├── 500.html               # Server error page
├── css/
│   ├── style.css          # Core styles & design system
│   ├── navbar.css         # Navigation components
│   ├── hero.css           # Hero section styles
│   ├── cards.css          # Card components
│   ├── categories.css     # Category page styles
│   ├── filters.css        # Filter components
│   ├── forms.css          # Form styles
│   ├── footer.css         # Footer styles
│   └── animations.css     # Animation library
├── js/
│   ├── config.js          # Configuration
│   ├── main.js            # Core functionality
│   ├── data.js            # Business data
│   ├── directory.js       # Directory page logic
│   ├── form.js            # Form handling
│   ├── map.js             # Map integration
│   ├── animations.js      # Animation controllers
│   ├── counter.js         # Counter animations
│   └── utils.js           # Utility functions
├── assets/
│   ├── icons/             # SVG icons
│   └── images/            # Images and logos
├── .htaccess              # Apache configuration
├── robots.txt             # Search engine directives
├── sitemap.xml            # Site structure for SEO
└── README.md              # This file
```

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Mohammad-Faiz-Cloud-Engineer/LocalFind.git
cd LocalFind
```

### 2. Configuration

Update `js/config.js` with your information:

```javascript
const CONFIG = {
  siteName: "Your Business Name",
  areaName: "Your City Name",
  contactEmail: "your@email.com",
  contactPhone: "+1 234 567 8900",
  contactAddress: "Your Address",
  socialLinks: {
    facebook: "https://facebook.com/yourpage",
    instagram: "https://instagram.com/yourpage",
    twitter: "https://twitter.com/yourpage"
  }
};
```

### 3. Deploy

#### Option A: Static Hosting (GitHub Pages, Netlify, Vercel)
Simply push to your repository and enable GitHub Pages, or deploy to Netlify/Vercel.

#### Option B: Traditional Web Server
Upload all files to your web server via FTP/SFTP.

#### Option C: Local Development
Open `index.html` in your browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Visit `http://localhost:8000`

## 🎨 Customization

### Colors
Edit CSS variables in `css/style.css`:

```css
:root {
  --accent-primary: #FF9F43;
  --accent-secondary: #54D6C8;
  --bg-primary: #0A0E17;
  /* ... more variables */
}
```

### Business Data
Update `js/data.js` with your business listings or connect to a backend API.

### Logo & Images
Replace files in `assets/images/` with your branding.

## 📱 Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## ♿ Accessibility

- WCAG 2.1 Level AA compliant
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader compatible
- Focus indicators
- Color contrast compliance

## 🔒 Security Features

- XSS protection via input sanitization
- Content Security Policy headers
- HTTPS enforcement
- Secure headers (X-Frame-Options, etc.)
- Input validation on all forms
- CSRF protection ready

## 📈 Performance

- Lazy loading for images and iframes
- Optimized animations
- Browser caching configured
- Gzip compression enabled
- Debounced search inputs
- Efficient CSS and JavaScript

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mohammad Faiz**
- GitHub: [@Mohammad-Faiz-Cloud-Engineer](https://github.com/Mohammad-Faiz-Cloud-Engineer)
- Repository: [LocalFind](https://github.com/Mohammad-Faiz-Cloud-Engineer/LocalFind)

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- OpenStreetMap for map integration
- The open-source community

## 📞 Support

For support, email hello@localfind.com or open an issue in the GitHub repository.

## 🗺️ Roadmap

- [ ] Backend API integration
- [ ] User authentication
- [ ] Business owner dashboard
- [ ] Review system
- [ ] Advanced search filters
- [ ] Multi-language support
- [ ] PWA support
- [ ] Mobile app

---

Made with ❤️ by [Mohammad Faiz](https://github.com/Mohammad-Faiz-Cloud-Engineer)
