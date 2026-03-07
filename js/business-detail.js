/**
 * Business Detail Page - Rendering Logic
 * Handles business detail page display with proper styling and security
 */
(function() {
  'use strict';
  
  /**
   * Security: HTML sanitization function to prevent XSS attacks
   * @param {string} str - String to sanitize
   * @returns {string} Sanitized string
   */
  function sanitizeHTML(str) {
    if (!str) return '';
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  }
  
  /**
   * Convert URLs in text to clickable links (safely)
   * @param {string} text - Text containing URLs
   * @returns {string} Text with URLs converted to links
   */
  function linkifyText(text) {
    // First sanitize the text
    const sanitized = sanitizeHTML(text);
    
    // Then convert URLs to links
    return sanitized.replace(
      /(https?:\/\/[^\s<]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer" style="color: var(--accent-primary); text-decoration: underline; word-break: break-all;">$1</a>'
    );
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    // Check if data exists
    if (!window.LISTINGS || window.LISTINGS.length === 0) {
      const content = document.querySelector('.biz-content');
      if (content) {
        content.innerHTML = `
          <div class="empty-state">
            <h3>No Business Data Available</h3>
            <p>Add your business data to js/data.js</p>
            <a href="index.html" class="btn btn-cta mt-xl">Go to Homepage</a>
          </div>
        `;
      }
      return;
    }
    
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const biz = window.LISTINGS.find(b => b.id === id);
    
    // If business not found, show error
    if (!biz) {
      const content = document.querySelector('.biz-content');
      if (content) {
        content.innerHTML = `
          <div class="empty-state">
            <h3>Business Not Found</h3>
            <p>The business you are looking for does not exist.</p>
            <a href="directory.html" class="btn btn-cta mt-xl">Browse Directory</a>
          </div>
        `;
      }
      return;
    }
    
    // Render basic info
    document.getElementById('biz-title').textContent = biz.name;
    document.getElementById('biz-desc').textContent = biz.description;
    document.getElementById('biz-category').textContent = biz.category;
    document.getElementById('biz-name').textContent = biz.name;
    
    // Add verified badge to title if business is verified
    if (biz.verified) {
      const titleElement = document.getElementById('biz-title');
      const verifiedBadge = document.createElement('span');
      verifiedBadge.className = 'verified-badge-large';
      verifiedBadge.title = 'Verified Business';
      verifiedBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
      titleElement.appendChild(verifiedBadge);
    }
    
    // Generate avatar from business name (first letter of each word, max 2 letters)
    const avatarText = biz.name
      .split(' ')
      .filter(word => word.length > 0)
      .slice(0, 2)
      .map(word => word[0].toUpperCase())
      .join('');
    document.getElementById('biz-avatar').textContent = avatarText;
    
    // Render badges
    const badgesHtml = [];
    if (biz.featured) {
      badgesHtml.push('<span class="badge badge-featured">FEATURED</span>');
    }
    if (biz.isNew) {
      badgesHtml.push('<span class="badge badge-new">NEW</span>');
    }
    document.getElementById('biz-badges').innerHTML = badgesHtml.join('');
    
    // Render rating
    const stars = '★'.repeat(Math.floor(biz.rating)) + '☆'.repeat(5 - Math.floor(biz.rating));
    document.getElementById('biz-rating').innerHTML = `
      <div class="rating">
        ${stars}
        <span class="rating-count">${biz.rating} (${biz.reviewCount} reviews)</span>
      </div>
    `;
    
    // Render reviews
    const reviewsList = document.getElementById('reviews-list');
    if (biz.reviews && biz.reviews.length > 0) {
      reviewsList.innerHTML = biz.reviews.map(review => {
        const isAdmin = review.role && review.role.includes('LocalFind');
        const reviewStars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        const reviewDate = new Date(review.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
        
        // Sanitize and linkify review text
        const reviewTextSafe = linkifyText(review.text);
        
        return `
          <div class="review-card ${isAdmin ? 'official' : ''}">
            ${isAdmin ? '<div class="review-badge">OFFICIAL REVIEW</div>' : ''}
            <div class="review-header ${isAdmin ? 'official' : ''}">
              <div class="review-author">
                <div class="review-author-info">
                  <div class="review-author-name">
                    ${isAdmin ? '<div class="review-avatar">✓</div>' : ''}
                    <strong class="${isAdmin ? 'large' : ''}">${sanitizeHTML(review.author)}</strong>
                  </div>
                  ${review.verified ? '<span class="badge badge-verified">✓ VERIFIED</span>' : ''}
                  ${review.role ? `<span class="review-role ${isAdmin ? 'official' : ''}">${sanitizeHTML(review.role)}</span>` : ''}
                </div>
                <div class="rating ${isAdmin ? '' : 'rating-small'}">${reviewStars}</div>
              </div>
              <span class="review-date">${reviewDate}</span>
            </div>
            <p class="review-text ${isAdmin ? 'large' : ''}">${reviewTextSafe}</p>
          </div>
        `;
      }).join('');
    } else {
      reviewsList.innerHTML = '<div class="empty-state"><p>No reviews yet. Be the first to review!</p></div>';
    }
    
    // Render contact info
    const contactHtml = `
      <h4 class="section-header">Contact Information</h4>
      <div class="contact-item">
        <i class="fa-solid fa-location-dot"></i>
        <span>${sanitizeHTML(biz.address)}</span>
      </div>
      ${biz.phone ? `
        <div class="contact-item">
          <i class="fa-solid fa-phone"></i>
          <div>
            <a href="tel:${sanitizeHTML(biz.phone)}">${sanitizeHTML(biz.phone)}</a>
            ${biz.phoneName ? `<span style="color: var(--text-muted); font-size: 12px; display: block; margin-top: 2px;">(${sanitizeHTML(biz.phoneName)})</span>` : ''}
          </div>
        </div>
      ` : ''}
      ${biz.phoneSecondary ? `
        <div class="contact-item">
          <i class="fa-solid fa-phone"></i>
          <div>
            <a href="tel:${sanitizeHTML(biz.phoneSecondary)}">${sanitizeHTML(biz.phoneSecondary)}</a>
            ${biz.phoneSecondaryName ? `<span style="color: var(--text-muted); font-size: 12px; display: block; margin-top: 2px;">(${sanitizeHTML(biz.phoneSecondaryName)})</span>` : ''}
          </div>
        </div>
      ` : ''}
      ${biz.phoneThird ? `
        <div class="contact-item">
          <i class="fa-solid fa-phone"></i>
          <div>
            <a href="tel:${sanitizeHTML(biz.phoneThird)}">${sanitizeHTML(biz.phoneThird)}</a>
            ${biz.phoneThirdName ? `<span style="color: var(--text-muted); font-size: 12px; display: block; margin-top: 2px;">(${sanitizeHTML(biz.phoneThirdName)})</span>` : ''}
          </div>
        </div>
      ` : ''}
      ${biz.phoneFourth ? `
        <div class="contact-item">
          <i class="fa-solid fa-phone"></i>
          <div>
            <a href="tel:${sanitizeHTML(biz.phoneFourth)}">${sanitizeHTML(biz.phoneFourth)}</a>
            ${biz.phoneFourthName ? `<span style="color: var(--text-muted); font-size: 12px; display: block; margin-top: 2px;">(${sanitizeHTML(biz.phoneFourthName)})</span>` : ''}
          </div>
        </div>
      ` : ''}
      ${biz.email ? `
        <div class="contact-item">
          <i class="fa-solid fa-envelope"></i>
          <a href="mailto:${sanitizeHTML(biz.email)}">${sanitizeHTML(biz.email)}</a>
        </div>
      ` : ''}
      ${biz.whatsapp ? `
        <div class="contact-item">
          <i class="fa-brands fa-whatsapp"></i>
          <div>
            <a href="https://wa.me/${biz.whatsapp.replace(/[^0-9]/g,'')}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <span style="color: var(--text-muted); font-size: 12px; display: block; margin-top: 2px;">${sanitizeHTML(biz.whatsapp)}${biz.whatsappName ? ` (${sanitizeHTML(biz.whatsappName)})` : ''}</span>
          </div>
        </div>
      ` : ''}
      ${biz.whatsappSecondary ? `
        <div class="contact-item">
          <i class="fa-brands fa-whatsapp"></i>
          <div>
            <a href="https://wa.me/${biz.whatsappSecondary.replace(/[^0-9]/g,'')}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <span style="color: var(--text-muted); font-size: 12px; display: block; margin-top: 2px;">${sanitizeHTML(biz.whatsappSecondary)}${biz.whatsappSecondaryName ? ` (${sanitizeHTML(biz.whatsappSecondaryName)})` : ''}</span>
          </div>
        </div>
      ` : ''}
      ${biz.whatsappThird ? `
        <div class="contact-item">
          <i class="fa-brands fa-whatsapp"></i>
          <div>
            <a href="https://wa.me/${biz.whatsappThird.replace(/[^0-9]/g,'')}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <span style="color: var(--text-muted); font-size: 12px; display: block; margin-top: 2px;">${sanitizeHTML(biz.whatsappThird)}${biz.whatsappThirdName ? ` (${sanitizeHTML(biz.whatsappThirdName)})` : ''}</span>
          </div>
        </div>
      ` : ''}
      ${biz.whatsappFourth ? `
        <div class="contact-item">
          <i class="fa-brands fa-whatsapp"></i>
          <div>
            <a href="https://wa.me/${biz.whatsappFourth.replace(/[^0-9]/g,'')}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <span style="color: var(--text-muted); font-size: 12px; display: block; margin-top: 2px;">${sanitizeHTML(biz.whatsappFourth)}${biz.whatsappFourthName ? ` (${sanitizeHTML(biz.whatsappFourthName)})` : ''}</span>
          </div>
        </div>
      ` : ''}
      ${biz.website ? `
        <div class="contact-item">
          <i class="fa-solid fa-globe"></i>
          <a href="${sanitizeHTML(biz.website)}" target="_blank" rel="noopener noreferrer">${biz.website.includes('jsdl.in') || biz.website.includes('justdial') ? 'JustDial' : 'Website'}</a>
        </div>
      ` : ''}
      ${biz.onlineOrder ? `
        <div class="contact-item">
          <i class="fa-solid fa-shopping-bag"></i>
          <a href="${sanitizeHTML(biz.onlineOrder)}" target="_blank" rel="noopener noreferrer" style="color: var(--accent-color); font-weight: 600;">Order Online</a>
        </div>
      ` : ''}
      ${biz.instagram ? `
        <div class="contact-item">
          <i class="fa-brands fa-instagram"></i>
          <a href="${sanitizeHTML(biz.instagram)}" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      ` : ''}
      <div class="mt-lg">
        <a href="${sanitizeHTML(biz.mapLink)}" target="_blank" rel="noopener noreferrer" class="btn" style="width:100%;">View on Map</a>
      </div>
    `;
    document.getElementById('biz-contact').innerHTML = contactHtml;
    
    // Render hours
    const days = {
      mon: 'Monday',
      tue: 'Tuesday',
      wed: 'Wednesday',
      thu: 'Thursday',
      fri: 'Friday',
      sat: 'Saturday',
      sun: 'Sunday'
    };
    
    /**
     * Convert 24-hour time to 12-hour AM/PM format
     * @param {string} time - Time in HH:MM format
     * @returns {string} Time in 12-hour format with AM/PM
     */
    function convertTo12Hour(time) {
      const [hours, minutes] = time.split(':').map(Number);
      if (hours === 0 && minutes === 0) return '12:00 AM';
      
      const period = hours >= 12 ? 'PM' : 'AM';
      const hour12 = hours % 12 || 12;
      return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
    }
    
    /**
     * Check if business is open 24/7
     * @returns {boolean} True if open 24/7
     */
    function isOpen24x7() {
      return Object.keys(days).every(day => {
        const hours = biz.hours[day];
        return (hours.open === '00:00' && hours.close === '23:59');
      });
    }
    
    const is24x7 = isOpen24x7();
    const hoursHeader = is24x7 
      ? '<h4 class="section-header">Opening Hours (24/7)</h4>' 
      : '<h4 class="section-header">Opening Hours</h4>';
    
    const hoursHtml = hoursHeader + 
      Object.keys(days).map(day => {
        const hours = biz.hours[day];
        const isClosed = hours.open === '00:00' && hours.close === '00:00';
        
        let timeDisplay;
        if (is24x7) {
          timeDisplay = '12:00 AM - 11:59 PM (24/7)';
        } else if (isClosed) {
          timeDisplay = 'Closed';
        } else if (hours.open2 && hours.close2) {
          // Split shift - show both time slots
          timeDisplay = convertTo12Hour(hours.open) + ' - ' + convertTo12Hour(hours.close) + 
                       ' & ' + convertTo12Hour(hours.open2) + ' - ' + convertTo12Hour(hours.close2);
        } else {
          timeDisplay = convertTo12Hour(hours.open) + ' - ' + convertTo12Hour(hours.close);
        }
        
        return `
          <div class="hours-row">
            <span class="hours-day">${days[day]}</span>
            <span class="hours-time ${isClosed ? 'closed' : 'open'}">
              ${timeDisplay}
            </span>
          </div>
        `;
      }).join('');
    document.getElementById('biz-hours').innerHTML = hoursHtml;
    
    // Render tags
    const tagsHtml = '<h4 class="section-header">Services</h4>' +
      biz.tags.map(tag => `<span class="tag">${sanitizeHTML(tag)}</span>`).join('');
    document.getElementById('biz-tags').innerHTML = tagsHtml;
    
    // Render related listings
    const relatedList = document.getElementById('related-list');
    const related = window.LISTINGS.filter(b => b.categorySlug === biz.categorySlug && b.id !== biz.id).slice(0, 3);
    if (related.length > 0) {
      relatedList.innerHTML = related.map(b => window.renderCard(b)).join('');
    } else {
      relatedList.innerHTML = '<div class="empty-state"><p>No related listings available.</p></div>';
    }
    
    // Share functionality
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
      shareBtn.addEventListener('click', async () => {
        const shareData = {
          title: biz.name,
          text: `Check out ${biz.name} on LocalFind - ${biz.description.slice(0, 100)}...`,
          url: window.location.href
        };
        
        try {
          // Check if Web Share API is supported
          if (navigator.share) {
            await navigator.share(shareData);
          } else {
            // Fallback: Copy to clipboard
            await navigator.clipboard.writeText(window.location.href);
            
            // Show success message
            const originalHTML = shareBtn.innerHTML;
            shareBtn.innerHTML = '<i class="fa-solid fa-check"></i><span>Link Copied!</span>';
            shareBtn.style.background = 'var(--accent-success)';
            
            setTimeout(() => {
              shareBtn.innerHTML = originalHTML;
              shareBtn.style.background = '';
            }, 2000);
          }
        } catch (error) {
          // If share fails, try clipboard as fallback
          try {
            await navigator.clipboard.writeText(window.location.href);
            const originalHTML = shareBtn.innerHTML;
            shareBtn.innerHTML = '<i class="fa-solid fa-check"></i><span>Link Copied!</span>';
            shareBtn.style.background = 'var(--accent-success)';
            
            setTimeout(() => {
              shareBtn.innerHTML = originalHTML;
              shareBtn.style.background = '';
            }, 2000);
          } catch (clipboardError) {
            // Silent fail - user will see no feedback
          }
        }
      });
    }
    
    // Initialize map
    initBusinessMap(biz);
  });
  
  /**
   * Initialize OpenStreetMap for business location
   * @param {Object} business - Business object with id and name
   */
  function initBusinessMap(business) {
    const mapContainer = document.getElementById('biz-map');
    if (!mapContainer) return;
    
    // Get coordinates for this business
    const coords = getBusinessCoordinates(business.id);
    if (!coords) {
      mapContainer.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--text-muted);">Map location not available</div>';
      return;
    }
    
    // Initialize map
    const map = L.map('biz-map', {
      zoomControl: false,
      scrollWheelZoom: false,
      dragging: true,
      touchZoom: true,
      doubleClickZoom: true
    }).setView(coords, 16);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }).addTo(map);
    
    // Create custom marker icon
    const markerIcon = L.divIcon({
      className: 'custom-marker',
      html: `<div class="marker-pin ${business.featured ? 'featured' : 'regular'}"></div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    });
    
    // Create popup content with business details
    const popupContent = `
      <div style="min-width: 200px; max-width: 280px;">
        <div style="font-weight: 700; font-size: 16px; color: var(--text-primary); margin-bottom: 8px;">
          ${business.name}
        </div>
        <div style="font-size: 13px; color: var(--text-secondary); line-height: 1.5;">
          ${business.address}
        </div>
      </div>
    `;
    
    // Add marker with popup
    const marker = L.marker(coords, { icon: markerIcon }).addTo(map);
    marker.bindPopup(popupContent, {
      closeButton: false,
      autoClose: false,
      closeOnClick: false,
      className: 'business-detail-popup'
    }).openPopup();
    
    // Adjust map view to show both marker and popup on mobile
    setTimeout(() => {
      map.invalidateSize();
      // Pan slightly up to ensure popup is visible
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        map.panBy([0, -30]);
      }
    }, 100);

    
    // Add click handler to open full map
    mapContainer.style.cursor = 'pointer';
    mapContainer.addEventListener('click', () => {
      window.open(business.mapLink, '_blank');
    });
  }
  
  /**
   * Get coordinates for a business by ID
   * @param {string} businessId - Business ID
   * @returns {Array|null} [latitude, longitude] or null if not found
   */
  function getBusinessCoordinates(businessId) {
    const coordinates = {
      'raheem-common-service-center': [26.9238021, 81.2612707],
      'aman-garments': [26.9248848, 81.2620547],
      'affan-garments': [26.9249000, 81.2621000],
      'shariq-hashmi-electric-shop': [26.9249200, 81.2621500],
      'hind-pharmacy': [26.9248500, 81.2620000],
      'abdul-hospital': [26.9226786, 81.2559463],
      'rajju-pankaj-sweets': [26.9238500, 81.2613000],
      'friend-fitness-gym': [26.9261896, 81.2611953],
      'golden-csc': [26.9238300, 81.2612500],
      'om-dhaba': [26.9227000, 81.2559800],
      'hala-motors': [26.9226500, 81.2559100],
      'chandra-shekhar-azad-inter-college': [26.9203899, 81.2609952],
      'shri-shyam-medicals': [26.9253005, 81.2622223],
      'satyam-footwear': [26.9244569, 81.2614599],
      'khidmat-enterprises': [26.9231717, 81.2608811],
      'rasauli-hardware': [26.9232000, 81.2609100],
      'kartik-medical-store': [26.9231400, 81.2608500],
      'suraj-kumar-clothing-store': [26.9244800, 81.2614900],
      'janta-clinic': [26.9253300, 81.2622500],
      'sk-tent-light-house': [26.9262100, 81.2612200],
      'balemora-wellness-retreats': [26.9220302, 81.2606909],
      'kfc-barabanki': [26.9250001, 81.2497201],
      'box-park-international': [26.9246388, 81.249308],
      'pps-college-of-nursing': [26.9252489, 81.2486689],
      'maxwell-hospital': [26.9253413, 81.2414972],
      'saraswati-studio-makole': [26.9228271, 81.2605057],
      'jamwant-mobile-shop': [26.922656, 81.260429]
    };
    
    return coordinates[businessId] || null;
  }
})();
