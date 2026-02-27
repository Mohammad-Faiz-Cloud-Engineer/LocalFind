/**
 * LocalFind - Business Directory Platform
 * Main Application Entry Point
 * 
 * @author Mohammad Faiz
 * @repository https://github.com/Mohammad-Faiz-Cloud-Engineer/LocalFind
 * @license MIT
 * @version 3.0.0
 * 
 * Configuration is loaded from config.js
 */

/**
 * Render site header with navigation
 */
function renderHeader(){
  const header = document.getElementById('site-header');
  const siteName = CONFIG.siteName.replace(/[<>]/g, '');
  
  header.innerHTML = `
  <div class="navbar" id="navbar" role="navigation">
    <div class="nav-left">
      <a href="index.html" class="logo">
        <img src="assets/images/mainlogo.svg" alt="${siteName} Logo" width="40" height="40">
        <span>${siteName}</span>
      </a>
      <nav class="nav-links" aria-label="Main navigation">
        <a href="index.html">Home</a>
        <a href="directory.html">Directory</a>
        <a href="categories.html">Categories</a>
        <a href="add-business.html">Add Business</a>
        <a href="about.html">About</a>
      </nav>
    </div>
    <div class="nav-right">
      <button class="search-icon" aria-label="Open search"><i class="fa-solid fa-magnifying-glass"></i></button>
      <a class="cta-list" href="add-business.html">List Your Business</a>
      <button class="hamburger" aria-label="Toggle mobile menu"><i class="fa-solid fa-bars"></i></button>
    </div>
  </div>
  <div class="mobile-menu" id="mobile-menu" role="dialog" aria-label="Mobile navigation menu">
    <button class="close" aria-label="Close menu"><i class="fa-solid fa-xmark"></i></button>
    <nav class="mobile-links" aria-label="Mobile navigation">
      <a href="index.html">Home</a>
      <a href="directory.html">Directory</a>
      <a href="categories.html">Categories</a>
      <a href="add-business.html">Add Business</a>
      <a href="about.html">About</a>
    </nav>
  </div>
  <div class="search-modal" id="search-modal" role="dialog" aria-label="Search" aria-hidden="true">
    <div class="search-modal-content">
      <div class="search-modal-header">
        <h2>Search LocalFind</h2>
        <button class="search-close" aria-label="Close search"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <form class="search-modal-form" action="directory.html" method="get">
        <div class="search-input-wrapper">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input 
            type="text" 
            name="search" 
            placeholder="Search for businesses, services, or categories..." 
            autocomplete="off"
            aria-label="Search query"
          >
        </div>
        <button type="submit" class="btn btn-cta">Search</button>
      </form>
      <div class="search-suggestions">
        <h3>Popular Searches</h3>
        <div class="search-tags">
          <a href="directory.html?search=restaurant" class="search-tag">Restaurants</a>
          <a href="directory.html?search=csc" class="search-tag">CSC</a>
          <a href="directory.html?search=pharmacy" class="search-tag">Pharmacy</a>
          <a href="directory.html?search=grocery" class="search-tag">Grocery</a>
          <a href="directory.html?search=bank" class="search-tag">Banks</a>
          <a href="directory.html?search=hospital" class="search-tag">Hospitals</a>
        </div>
      </div>
    </div>
  </div>
  `;
}

/**
 * Render site footer with links and contact info
 */
function renderFooter(){
  const footer = document.getElementById('site-footer');
  const siteName = CONFIG.siteName.replace(/[<>]/g, '');
  const tagline = CONFIG.tagline.replace(/[<>]/g, '');
  const address = CONFIG.contactAddress.replace(/[<>]/g, '');
  const phone = CONFIG.contactPhone.replace(/[<>]/g, '');
  const email = CONFIG.contactEmail.replace(/[<>]/g, '');
  
  footer.innerHTML = `
  <footer role="contentinfo">
    <div class="container footer-grid">
      <div>
        <div class="footer-logo">
          <img src="assets/images/mainlogo.svg" alt="${siteName} Logo" width="40" height="40">
          <div>
            ${siteName}
            <div class="tagline">${tagline}</div>
          </div>
        </div>
        <div class="socials">
          <a href="${CONFIG.socialLinks.facebook}" aria-label="Visit our Facebook page" rel="noopener noreferrer" target="_blank">
            <i class="fa-brands fa-facebook" aria-hidden="true"></i>
          </a>
          <a href="${CONFIG.socialLinks.instagram}" aria-label="Visit our Instagram profile" rel="noopener noreferrer" target="_blank">
            <i class="fa-brands fa-instagram" aria-hidden="true"></i>
          </a>
          <a href="${CONFIG.socialLinks.twitter}" aria-label="Visit our Twitter profile" rel="noopener noreferrer" target="_blank">
            <i class="fa-brands fa-twitter" aria-hidden="true"></i>
          </a>
        </div>
      </div>
      <div>
        <h4>Quick Links</h4>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="directory.html">Directory</a></li>
          <li><a href="categories.html">Categories</a></li>
        </ul>
      </div>
      <div>
        <h4>Popular Categories</h4>
        <ul>
          <li><a href="directory.html?category=restaurants">Restaurants</a></li>
          <li><a href="directory.html?category=grocery">Grocery</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <p>${address}</p>
        <p><a href="tel:${phone}">${phone}</a></p>
        <p><a href="mailto:${email}">${email}</a></p>
      </div>
    </div>
    <div class="container footer-bottom">
      &copy; ${new Date().getFullYear()} ${siteName}. All rights reserved.
      <button id="back-to-top" class="btn" aria-label="Scroll back to top">Back to top</button>
    </div>
  </footer>
  `;
}

/**
 * Initialize navigation and mobile menu
 */
function initNavbar(){
  renderHeader();
  renderFooter();
  
  const navbar = document.getElementById('navbar');
  const mobileMenu = document.getElementById('mobile-menu');
  const searchModal = document.getElementById('search-modal');
  
  if (!navbar || !mobileMenu || !searchModal) {
    return;
  }
  
  const hamburger = navbar.querySelector('.hamburger');
  const closeBtn = mobileMenu.querySelector('.close');
  const searchIcon = navbar.querySelector('.search-icon');
  const searchClose = searchModal.querySelector('.search-close');
  const searchInput = searchModal.querySelector('input[name="search"]');
  
  // Mobile menu handlers
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  }
  
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  }
  
  // Search modal handlers
  if (searchIcon) {
    searchIcon.addEventListener('click', () => {
      searchModal.classList.add('open');
      searchModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      // Focus on search input after modal opens
      setTimeout(() => {
        if (searchInput) searchInput.focus();
      }, 100);
    });
  }
  
  if (searchClose) {
    searchClose.addEventListener('click', () => {
      searchModal.classList.remove('open');
      searchModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  }
  
  // Close search modal on backdrop click
  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) {
      searchModal.classList.remove('open');
      searchModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });
  
  // Close modals on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
      if (searchModal.classList.contains('open')) {
        searchModal.classList.remove('open');
        searchModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    }
  });
  
  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 40) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  }, { passive: true });
  
  // Back to top button
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/**
 * Initialize application on DOM ready
 */
document.addEventListener('DOMContentLoaded', initNavbar);
