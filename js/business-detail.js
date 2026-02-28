/**
 * Business Detail Page - Rendering Logic
 * Handles business detail page display with proper styling
 */
(function() {
  'use strict';
  
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
        
        // Process review text: keep existing HTML links and convert plain URLs to links
        let reviewTextWithLinks = review.text;
        
        // If text doesn't contain HTML links, convert plain URLs
        if (!reviewTextWithLinks.includes('<a href')) {
          reviewTextWithLinks = reviewTextWithLinks.replace(
            /(https?:\/\/[^\s]+)/g,
            '<a href="$1" target="_blank" rel="noopener noreferrer" style="color: var(--accent-primary); text-decoration: underline; word-break: break-all;">$1</a>'
          );
        }
        
        return `
          <div class="review-card ${isAdmin ? 'official' : ''}">
            ${isAdmin ? '<div class="review-badge">OFFICIAL REVIEW</div>' : ''}
            <div class="review-header ${isAdmin ? 'official' : ''}">
              <div class="review-author">
                <div class="review-author-info">
                  <div class="review-author-name">
                    ${isAdmin ? '<div class="review-avatar">✓</div>' : ''}
                    <strong class="${isAdmin ? 'large' : ''}">${review.author}</strong>
                  </div>
                  ${review.verified ? '<span class="badge badge-verified">✓ VERIFIED</span>' : ''}
                  ${review.role ? `<span class="review-role ${isAdmin ? 'official' : ''}">• ${review.role}</span>` : ''}
                </div>
                <div class="rating ${isAdmin ? '' : 'rating-small'}">${reviewStars}</div>
              </div>
              <span class="review-date">${reviewDate}</span>
            </div>
            <p class="review-text ${isAdmin ? 'large' : ''}">${reviewTextWithLinks}</p>
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
        <span>${biz.address}</span>
      </div>
      <div class="contact-item">
        <i class="fa-solid fa-phone"></i>
        <div>
          <a href="tel:${biz.phone}">${biz.phone}</a>
          ${biz.phoneName ? `<span style="color: var(--text-muted); font-size: 12px; display: block; margin-top: 2px;">(${biz.phoneName})</span>` : ''}
        </div>
      </div>
      ${biz.phoneSecondary ? `
        <div class="contact-item">
          <i class="fa-solid fa-phone"></i>
          <div>
            <a href="tel:${biz.phoneSecondary}">${biz.phoneSecondary}</a>
            ${biz.phoneSecondaryName ? `<span style="color: var(--text-muted); font-size: 12px; display: block; margin-top: 2px;">(${biz.phoneSecondaryName})</span>` : ''}
          </div>
        </div>
      ` : ''}
      ${biz.email ? `
        <div class="contact-item">
          <i class="fa-solid fa-envelope"></i>
          <a href="mailto:${biz.email}">${biz.email}</a>
        </div>
      ` : ''}
      ${biz.whatsapp ? `
        <div class="contact-item">
          <i class="fa-brands fa-whatsapp"></i>
          <a href="https://wa.me/${biz.whatsapp.replace(/[^0-9]/g,'')}" target="_blank">WhatsApp</a>
        </div>
      ` : ''}
      ${biz.website ? `
        <div class="contact-item">
          <i class="fa-solid fa-globe"></i>
          <a href="${biz.website}" target="_blank">${biz.website.includes('jsdl.in') || biz.website.includes('justdial') ? 'JustDial' : 'Website'}</a>
        </div>
      ` : ''}
      ${biz.instagram ? `
        <div class="contact-item">
          <i class="fa-brands fa-instagram"></i>
          <a href="${biz.instagram}" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      ` : ''}
      <div class="mt-lg">
        <a href="${biz.mapLink}" target="_blank" class="btn" style="width:100%;">View on Map</a>
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
      biz.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
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
  });
})();
