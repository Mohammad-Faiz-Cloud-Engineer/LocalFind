/**
 * Business Detail Page - Rendering Logic
 * Handles business detail page display with proper styling and security
 */
(function () {
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
   * Validates and sanitizes a URL to prevent XSS attacks
   * @private
   * @param {string} url - URL to validate
   * @returns {string|null} Sanitized URL or null if invalid
   */
  function validateAndSanitizeURL(url) {
    if (!url || typeof url !== 'string') return null;
    
    // Remove any whitespace
    url = url.trim();
    
    // Check for javascript: protocol and other dangerous protocols
    const dangerousProtocols = /^(javascript|data|vbscript|file|about):/i;
    if (dangerousProtocols.test(url)) {
      console.warn('Blocked potentially dangerous URL:', url);
      return null;
    }
    
    // For relative URLs, ensure they don't contain suspicious patterns
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      // Block URLs with suspicious patterns
      if (url.includes('javascript:') || url.includes('data:')) {
        console.warn('Blocked suspicious relative URL:', url);
        return null;
      }
    }
    
    return url;
  }

  /**
   * Determines if a URL is internal (same site) or external
   * @private
   * @param {string} url - URL to check
   * @returns {boolean} True if internal, false if external
   */
  function isInternalURL(url) {
    if (!url) return false;
    
    // External URLs start with http:// or https://
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return false;
    }
    
    // Relative paths are internal
    return true;
  }

  /**
   * Creates an HTML anchor tag with appropriate attributes
   * @private
   * @param {string} url - The URL for the href attribute
   * @param {boolean} isInternal - Whether the link is internal
   * @returns {string} Opening anchor tag HTML
   */
  function createAnchorTag(url, isInternal) {
    const sanitizedURL = validateAndSanitizeURL(url);
    if (!sanitizedURL) {
      // Return a span instead of a link for invalid URLs
      return '<span class="invalid-link" style="color: var(--text-secondary);">';
    }
    
    const baseAttributes = `href="${sanitizedURL}" class="content-link"`;
    
    if (isInternal) {
      // Internal link - opens in same tab
      return `<a ${baseAttributes}>`;
    } else {
      // External link - opens in new tab with security attributes
      return `<a ${baseAttributes} target="_blank" rel="noopener noreferrer">`;
    }
  }

  /**
   * Processes text containing HTML anchor tags
   * Preserves existing links while sanitizing surrounding content
   * @private
   * @param {string} text - Text containing HTML links
   * @returns {string} Processed text with safe links
   */
  function processExistingLinks(text) {
    try {
      // Replace single quotes with double quotes in href attributes
      // Support both <a href='...'> and <a href="...">
      let processed = text.replace(/<a\s+href=['"]([^'"]+)['"]>/gi, (match, url) => {
        const isInternal = isInternalURL(url);
        return createAnchorTag(url, isInternal);
      });
      
      // Split by anchor tags to sanitize only non-link content
      const parts = processed.split(/(<a[^>]*>.*?<\/a>)/gi);
      
      processed = parts.map((part) => {
        // Preserve anchor tags and their content
        if (part.match(/^<a[^>]*>.*?<\/a>$/i)) {
          return part;
        }
        // Sanitize non-link text to prevent XSS
        return sanitizeHTML(part);
      }).join('');
      
      return processed;
    } catch (error) {
      console.error('Error processing existing links:', error);
      // Fallback to full sanitization on error
      return sanitizeHTML(text);
    }
  }

  /**
   * Converts plain URLs in text to clickable links
   * @private
   * @param {string} text - Sanitized text containing plain URLs
   * @returns {string} Text with URLs converted to links
   */
  function linkifyPlainURLs(text) {
    // Match http:// and https:// URLs
    const urlPattern = /(https?:\/\/[^\s<]+)/g;
    
    return text.replace(urlPattern, (url) => {
      const sanitizedURL = validateAndSanitizeURL(url);
      if (!sanitizedURL) {
        return url; // Return original if validation fails
      }
      
      return `<a href="${sanitizedURL}" class="content-link" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
  }

  /**
   * Convert URLs in text to clickable links (safely)
   * Handles both existing HTML links and plain URLs
   * Internal links open in same tab, external links open in new tab
   * 
   * @param {string} text - Text containing URLs or HTML links
   * @returns {string} Text with URLs converted to safe, clickable links
   * 
   * @example
   * // With existing HTML link
   * linkifyText("Visit <a href='page.html'>here</a>")
   * // Returns: "Visit <a href="page.html" class="content-link">here</a>"
   * 
   * @example
   * // With plain URL
   * linkifyText("Visit https://example.com")
   * // Returns: "Visit <a href="https://example.com" class="content-link" target="_blank" rel="noopener noreferrer">https://example.com</a>"
   */
  function linkifyText(text) {
    // Input validation
    if (!text || typeof text !== 'string') {
      return '';
    }
    
    // Trim whitespace
    text = text.trim();
    
    if (text.length === 0) {
      return '';
    }
    
    try {
      // Check if text contains existing HTML anchor tags
      if (text.includes('<a href=') || text.includes('<a href=')) {
        return processExistingLinks(text);
      }
      
      // No HTML links - sanitize and convert plain URLs to links
      const sanitized = sanitizeHTML(text);
      return linkifyPlainURLs(sanitized);
      
    } catch (error) {
      console.error('Error in linkifyText:', error);
      // Fallback to sanitized text on error
      return sanitizeHTML(text);
    }
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
    const titleEl = document.getElementById('biz-title');
    const descEl = document.getElementById('biz-desc');
    const categoryEl = document.getElementById('biz-category');
    const nameEl = document.getElementById('biz-name');
    
    if (titleEl) titleEl.textContent = biz.name;
    if (categoryEl) categoryEl.textContent = biz.category;
    if (nameEl) nameEl.textContent = biz.name;
    
    // Render description with collapse/expand and listen feature
    if (descEl) {
      const descText = sanitizeHTML(biz.description);
      const needsPreview = descText.length > 300;
      
      // Check if audio file exists for this business
      // Use raw business name (not sanitized) for file path construction
      // Replace forward slashes with hyphens for file system compatibility
      const folderName = biz.name.replace(/\//g, '-');
      const audioPath = `Voices/${encodeURIComponent(folderName)}/`;
      const descriptionAudio = `${audioPath}${encodeURIComponent('Business Description.mp3')}`;
      
      descEl.innerHTML = `
        <div class="collapsible-section">
          <div class="collapsible-header" id="desc-toggle" role="button" tabindex="0" aria-expanded="true" aria-controls="desc-content">
            <h3>About</h3>
            <div class="header-actions">
              <button class="listen-btn" id="desc-listen-btn" aria-label="Listen to description" title="Listen to description">
                <i class="fa-solid fa-volume-high"></i>
              </button>
              <i class="fa-solid fa-chevron-down collapse-icon" aria-hidden="true"></i>
            </div>
          </div>
          <div class="collapsible-content" id="desc-content" role="region" aria-labelledby="desc-toggle">
            <audio id="desc-audio" preload="none" style="display: none;">
              <source src="${descriptionAudio}" type="audio/mpeg">
            </audio>
            <div class="text-preview ${needsPreview ? '' : 'expanded'}" id="desc-preview">
              ${descText}
            </div>
            ${needsPreview ? `
              <button class="see-more-btn" id="desc-see-more" aria-expanded="false">
                <span>See More</span>
                <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
              </button>
            ` : ''}
          </div>
        </div>
      `;
      
      // Add collapse/expand toggle functionality
      const descToggle = document.getElementById('desc-toggle');
      const descContent = document.getElementById('desc-content');
      const descIcon = descToggle.querySelector('.collapse-icon');
      
      if (descToggle && descContent && descIcon) {
        const toggleCollapse = () => {
          const isCollapsed = descContent.classList.contains('collapsed');
          descContent.classList.toggle('collapsed');
          descIcon.classList.toggle('collapsed');
          descToggle.setAttribute('aria-expanded', isCollapsed ? 'true' : 'false');
        };
        
        descToggle.addEventListener('click', (e) => {
          // Don't toggle if clicking on listen button
          if (e.target.closest('.listen-btn')) return;
          toggleCollapse();
        });
        descToggle.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleCollapse();
          }
        });
      }
      
      // Add audio player functionality
      const descListenBtn = document.getElementById('desc-listen-btn');
      const descAudio = document.getElementById('desc-audio');
      
      if (descListenBtn && descAudio) {
        initAudioPlayer(descListenBtn, descAudio, 'description');
      }
      
      // Add see more/less functionality
      if (needsPreview) {
        const seeMoreBtn = document.getElementById('desc-see-more');
        const descPreview = document.getElementById('desc-preview');
        
        if (seeMoreBtn && descPreview) {
          const toggleExpand = () => {
            const isExpanded = descPreview.classList.contains('expanded');
            descPreview.classList.toggle('expanded');
            seeMoreBtn.classList.toggle('expanded');
            seeMoreBtn.querySelector('span').textContent = isExpanded ? 'See More' : 'See Less';
            seeMoreBtn.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
          };
          
          seeMoreBtn.addEventListener('click', toggleExpand);
        }
      }
    }

    // Add verified badge to title if business is verified
    if (biz.verified) {
      const titleElement = document.getElementById('biz-title');
      if (titleElement) {
        const verifiedBadge = document.createElement('span');
        verifiedBadge.className = 'verified-badge-large';
        verifiedBadge.title = 'Verified Business';
        verifiedBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
        titleElement.appendChild(verifiedBadge);
      }
    }

    // Generate avatar from business name (first letter of each word, max 2 letters)
    const avatarText = biz.name
      .split(' ')
      .filter(word => word.length > 0)
      .slice(0, 2)
      .map(word => word[0].toUpperCase())
      .join('');
    const avatarEl = document.getElementById('biz-avatar');
    if (avatarEl) avatarEl.textContent = avatarText;

    // Render badges
    const badgesHtml = [];
    if (biz.featured) {
      badgesHtml.push('<span class="badge badge-featured">FEATURED</span>');
    }
    if (biz.isNew) {
      badgesHtml.push('<span class="badge badge-new">NEW</span>');
    }
    const badgesEl = document.getElementById('biz-badges');
    if (badgesEl) badgesEl.innerHTML = badgesHtml.join('');

    // Render rating
    const stars = '★'.repeat(Math.floor(biz.rating)) + '☆'.repeat(5 - Math.floor(biz.rating));
    const ratingEl = document.getElementById('biz-rating');
    if (ratingEl) {
      ratingEl.innerHTML = `
        <div class="rating">
          ${stars}
          <span class="rating-count">${biz.rating} (${biz.reviewCount} reviews)</span>
        </div>
      `;
    }

    // Render reviews with collapse/expand
    const reviewsSection = document.getElementById('reviews');
    const reviewsList = document.getElementById('reviews-list');
    
    if (reviewsSection && biz.reviews && biz.reviews.length > 0) {
      // Add collapsible header to reviews section
      const reviewsHeader = reviewsSection.querySelector('h3');
      if (reviewsHeader) {
        const headerWrapper = document.createElement('div');
        headerWrapper.className = 'collapsible-header';
        headerWrapper.id = 'reviews-toggle';
        headerWrapper.setAttribute('role', 'button');
        headerWrapper.setAttribute('tabindex', '0');
        headerWrapper.setAttribute('aria-expanded', 'true');
        headerWrapper.setAttribute('aria-controls', 'reviews-content');
        headerWrapper.innerHTML = `
          <h3>Reviews (${sanitizeHTML(biz.reviews.length.toString())})</h3>
          <i class="fa-solid fa-chevron-down collapse-icon" aria-hidden="true"></i>
        `;
        reviewsHeader.replaceWith(headerWrapper);
        
        // Wrap reviews list in collapsible content
        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'collapsible-content';
        contentWrapper.id = 'reviews-content';
        contentWrapper.setAttribute('role', 'region');
        contentWrapper.setAttribute('aria-labelledby', 'reviews-toggle');
        reviewsList.parentNode.insertBefore(contentWrapper, reviewsList);
        contentWrapper.appendChild(reviewsList);
        
        // Add toggle functionality
        const reviewsToggle = document.getElementById('reviews-toggle');
        const reviewsContent = document.getElementById('reviews-content');
        const reviewsIcon = reviewsToggle.querySelector('.collapse-icon');
        
        if (reviewsToggle && reviewsContent && reviewsIcon) {
          const toggleReviews = () => {
            const isCollapsed = reviewsContent.classList.contains('collapsed');
            reviewsContent.classList.toggle('collapsed');
            reviewsIcon.classList.toggle('collapsed');
            reviewsToggle.setAttribute('aria-expanded', isCollapsed ? 'true' : 'false');
          };
          
          reviewsToggle.addEventListener('click', toggleReviews);
          reviewsToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleReviews();
            }
          });
        }
      }
    }
    
    if (biz.reviews && biz.reviews.length > 0) {
      reviewsList.innerHTML = biz.reviews.map((review, index) => {
        const isAdmin = review.role && review.role.includes('LocalFind');
        const reviewStars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        const reviewDate = new Date(review.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });

        // Sanitize and linkify review text
        const reviewTextSafe = linkifyText(review.text);
        const needsPreview = review.text.length > 200;
        const reviewId = `review-${sanitizeHTML(index.toString())}`;
        
        // Check if audio file exists for admin review
        // Use raw business name (not sanitized) for file path construction
        // Replace forward slashes with hyphens for file system compatibility
        const folderName = biz.name.replace(/\//g, '-');
        const audioPath = `Voices/${encodeURIComponent(folderName)}/`;
        const reviewAudio = isAdmin ? `${audioPath}${encodeURIComponent('Admin Review.mp3')}` : '';

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
                <div class="rating ${isAdmin ? '' : 'rating-small'}" aria-label="${review.rating} out of 5 stars">${reviewStars}</div>
              </div>
              <div class="review-header-right">
                ${isAdmin && reviewAudio ? `
                  <button class="listen-btn review-listen-btn" id="review-listen-${reviewId}" aria-label="Listen to review" title="Listen to review">
                    <i class="fa-solid fa-volume-high"></i>
                  </button>
                ` : ''}
                <span class="review-date">${reviewDate}</span>
              </div>
            </div>
            ${isAdmin && reviewAudio ? `
              <audio id="review-audio-${reviewId}" preload="none" style="display: none;">
                <source src="${reviewAudio}" type="audio/mpeg">
              </audio>
            ` : ''}
            <div class="text-preview ${needsPreview ? '' : 'expanded'}" id="review-preview-${reviewId}">
              <p class="review-text ${isAdmin ? 'large' : ''}">${reviewTextSafe}</p>
            </div>
            ${needsPreview ? `
              <button class="see-more-btn" id="review-see-more-${reviewId}" aria-expanded="false">
                <span>See More</span>
                <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
              </button>
            ` : ''}
          </div>
        `;
      }).join('');
      
      // Add see more/less functionality and audio players for each review
      biz.reviews.forEach((review, index) => {
        const isAdmin = review.role && review.role.includes('LocalFind');
        const reviewId = `review-${index}`;
        
        // Audio player for admin reviews
        if (isAdmin) {
          const reviewListenBtn = document.getElementById(`review-listen-${reviewId}`);
          const reviewAudio = document.getElementById(`review-audio-${reviewId}`);
          
          if (reviewListenBtn && reviewAudio) {
            initAudioPlayer(reviewListenBtn, reviewAudio, `review-${index}`);
          }
        }
        
        // See more/less functionality
        if (review.text.length > 200) {
          const seeMoreBtn = document.getElementById(`review-see-more-${reviewId}`);
          const reviewPreview = document.getElementById(`review-preview-${reviewId}`);
          
          if (seeMoreBtn && reviewPreview) {
            const toggleReviewExpand = () => {
              const isExpanded = reviewPreview.classList.contains('expanded');
              reviewPreview.classList.toggle('expanded');
              seeMoreBtn.classList.toggle('expanded');
              const btnText = seeMoreBtn.querySelector('span');
              if (btnText) {
                btnText.textContent = isExpanded ? 'See More' : 'See Less';
              }
              seeMoreBtn.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
            };
            
            seeMoreBtn.addEventListener('click', toggleReviewExpand);
          }
        }
      });
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
            <a href="https://wa.me/${biz.whatsapp.replace(/[^0-9]/g, '')}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <span style="color: var(--text-muted); font-size: 12px; display: block; margin-top: 2px;">${sanitizeHTML(biz.whatsapp)}${biz.whatsappName ? ` (${sanitizeHTML(biz.whatsappName)})` : ''}</span>
          </div>
        </div>
      ` : ''}
      ${biz.whatsappSecondary ? `
        <div class="contact-item">
          <i class="fa-brands fa-whatsapp"></i>
          <div>
            <a href="https://wa.me/${biz.whatsappSecondary.replace(/[^0-9]/g, '')}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <span style="color: var(--text-muted); font-size: 12px; display: block; margin-top: 2px;">${sanitizeHTML(biz.whatsappSecondary)}${biz.whatsappSecondaryName ? ` (${sanitizeHTML(biz.whatsappSecondaryName)})` : ''}</span>
          </div>
        </div>
      ` : ''}
      ${biz.whatsappThird ? `
        <div class="contact-item">
          <i class="fa-brands fa-whatsapp"></i>
          <div>
            <a href="https://wa.me/${biz.whatsappThird.replace(/[^0-9]/g, '')}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <span style="color: var(--text-muted); font-size: 12px; display: block; margin-top: 2px;">${sanitizeHTML(biz.whatsappThird)}${biz.whatsappThirdName ? ` (${sanitizeHTML(biz.whatsappThirdName)})` : ''}</span>
          </div>
        </div>
      ` : ''}
      ${biz.whatsappFourth ? `
        <div class="contact-item">
          <i class="fa-brands fa-whatsapp"></i>
          <div>
            <a href="https://wa.me/${biz.whatsappFourth.replace(/[^0-9]/g, '')}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
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
      ${biz.bloodDonor ? `
        <div class="contact-item">
          <i class="fa-solid fa-droplet"></i>
          <a href="${sanitizeHTML(biz.bloodDonor)}" target="_blank" rel="noopener noreferrer" style="color: #DC2626; font-weight: 600;">Find Blood Donors</a>
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
      ${biz.upiId ? `
        <div class="contact-item upi-payment-trigger" id="upi-pay-btn" role="button" tabindex="0" aria-label="Pay online via UPI">
          <i class="fa-solid fa-indian-rupee-sign"></i>
          <span>Pay Online (UPI)</span>
        </div>
      ` : ''}
      <div class="mt-lg">
        <a href="${sanitizeHTML(biz.mapLink)}" target="_blank" rel="noopener noreferrer" class="btn" style="width:100%;">View on Map</a>
      </div>
    `;
    document.getElementById('biz-contact').innerHTML = contactHtml;

    // UPI Payment Bottom Sheet
    if (biz.upiId) {
      const upiPayBtn = document.getElementById('upi-pay-btn');
      if (upiPayBtn) {
        upiPayBtn.addEventListener('click', () => openUPISheet(biz));
        upiPayBtn.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openUPISheet(biz);
          }
        });
      }
    }

    /**
     * Open UPI payment bottom sheet
     * @param {Object} business - Business data with upiId and upiName
     */
    function openUPISheet(business) {
      // Prevent duplicate modals
      if (document.getElementById('upi-payment-sheet')) return;

      const safeUpiId = sanitizeHTML(business.upiId);
      const safeUpiName = sanitizeHTML(business.upiName || business.name);
      const upiDeepLink = `upi://pay?pa=${encodeURIComponent(business.upiId)}&pn=${encodeURIComponent(business.upiName || business.name)}&cu=INR`;

      // Build the overlay + bottom sheet
      const overlay = document.createElement('div');
      overlay.id = 'upi-payment-overlay';
      overlay.className = 'upi-overlay';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.setAttribute('aria-label', 'UPI Payment');

      overlay.innerHTML = `
        <div class="upi-sheet" id="upi-payment-sheet">
          <div class="upi-sheet-handle" aria-hidden="true"></div>
          <button class="upi-sheet-close" id="upi-close-btn" aria-label="Close payment sheet">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <div class="upi-sheet-header">
            <div class="upi-sheet-icon">
              <i class="fa-solid fa-indian-rupee-sign"></i>
            </div>
            <h3>Pay ${safeUpiName}</h3>
            <p>Scan QR code or tap button to pay</p>
          </div>
          <div class="upi-qr-container">
            <div class="upi-qr-frame" id="upi-qr-target"></div>
          </div>
          <div class="upi-id-row" id="upi-id-row">
            <span class="upi-id-label">UPI ID:</span>
            <span class="upi-id-value" id="upi-id-text">${safeUpiId}</span>
            <button class="upi-copy-btn" id="upi-copy-btn" aria-label="Copy UPI ID">
              <i class="fa-regular fa-copy"></i>
            </button>
          </div>

          <button class="upi-pay-btn" id="upi-pay-app-btn" aria-label="Pay using UPI app">
            <i class="fa-solid fa-mobile-screen-button"></i>
            <span>Pay Using UPI App</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>

          <p class="upi-disclaimer">
            <i class="fa-solid fa-shield-halved"></i>
            Secure payment via your UPI app
          </p>
        </div>
      `;

      document.body.appendChild(overlay);

      // Generate real scannable QR code (off-screen render → clean img)
      const qrTarget = document.getElementById('upi-qr-target');
      if (qrTarget) {
        if (typeof QRCode !== 'undefined') {
          // Render QR into a hidden off-screen container
          const offscreen = document.createElement('div');
          offscreen.style.cssText = 'position:absolute;left:-9999px;top:-9999px;';
          document.body.appendChild(offscreen);

          new QRCode(offscreen, {
            text: upiDeepLink,
            width: 256,
            height: 256,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
          });

          // Extract data URL from the generated canvas and inject clean img
          setTimeout(() => {
            const canvas = offscreen.querySelector('canvas');
            if (canvas) {
              const dataUrl = canvas.toDataURL('image/png');
              qrTarget.innerHTML = `<img src="${dataUrl}" alt="UPI QR Code" class="upi-qr-img" />`;
            } else {
              // Library might have used img fallback
              const img = offscreen.querySelector('img');
              if (img && img.src) {
                qrTarget.innerHTML = `<img src="${img.src}" alt="UPI QR Code" class="upi-qr-img" />`;
              } else {
                qrTarget.innerHTML = '<div class="upi-qr-fallback"><i class="fa-solid fa-qrcode"></i><p>QR code unavailable</p></div>';
              }
            }
            offscreen.remove();
          }, 50);
        } else {
          // QRCode library not loaded - show fallback message
          qrTarget.innerHTML = `
            <div class="upi-qr-fallback" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 20px; text-align: center;">
              <i class="fa-solid fa-qrcode" style="font-size: 48px; color: var(--text-muted); margin-bottom: 16px;"></i>
              <p style="color: var(--text-muted); font-size: 14px; margin: 0;">QR code generator unavailable</p>
              <p style="color: var(--text-muted); font-size: 12px; margin-top: 8px;">Use the "Pay using UPI App" button below</p>
            </div>
          `;
        }
      }

      // Prevent body scroll while sheet is open
      document.body.style.overflow = 'hidden';

      // Trigger entrance animation on next frame
      requestAnimationFrame(() => {
        overlay.classList.add('active');
      });

      // --- Event Handlers ---

      // Close button
      const closeBtn = document.getElementById('upi-close-btn');
      closeBtn.addEventListener('click', closeUPISheet);

      // Backdrop click
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeUPISheet();
      });

      // Escape key
      function handleEscape(e) {
        if (e.key === 'Escape') closeUPISheet();
      }
      document.addEventListener('keydown', handleEscape);

      // Copy UPI ID
      const copyBtn = document.getElementById('upi-copy-btn');
      copyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(business.upiId);
          copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
          copyBtn.style.color = 'var(--accent-success)';
          setTimeout(() => {
            copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
            copyBtn.style.color = '';
          }, 2000);
        } catch (err) {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = business.upiId;
          textArea.style.cssText = 'position:fixed;left:-9999px;';
          document.body.appendChild(textArea);
          textArea.select();
          try { document.execCommand('copy'); } catch (e) { /* silent */ }
          document.body.removeChild(textArea);
          copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
          copyBtn.style.color = 'var(--accent-success)';
          setTimeout(() => {
            copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
            copyBtn.style.color = '';
          }, 2000);
        }
      });

      // Pay Using UPI App Button
      const payAppBtn = document.getElementById('upi-pay-app-btn');
      if (payAppBtn) {
        payAppBtn.addEventListener('click', () => {
          // Validate and sanitize UPI parameters
          const validatedUpiId = validateUPIId(business.upiId);
          if (!validatedUpiId) {
            console.error('Invalid UPI ID format');
            return;
          }

          // Build secure UPI deep link with proper encoding
          const upiParams = {
            pa: validatedUpiId,
            pn: sanitizeForUPI(business.upiName || business.name),
            cu: 'INR'
          };

          // Construct deep link with validated parameters
          const deepLink = buildUPIDeepLink(upiParams);

          // Attempt to open UPI app with fallback handling
          openUPIApp(deepLink, payAppBtn);
        });
      }

      /**
       * Validate UPI ID format
       * @param {string} upiId - UPI ID to validate
       * @returns {string|null} Validated UPI ID or null if invalid
       */
      function validateUPIId(upiId) {
        if (!upiId || typeof upiId !== 'string') return null;
        
        // UPI ID format: identifier@provider (alphanumeric, dots, hyphens allowed)
        const upiRegex = /^[a-zA-Z0-9.\-_]{3,}@[a-zA-Z]{3,}$/;
        
        const trimmed = upiId.trim();
        return upiRegex.test(trimmed) ? trimmed : null;
      }

      /**
       * Sanitize text for UPI parameters (remove special chars that could break URI)
       * @param {string} text - Text to sanitize
       * @returns {string} Sanitized text
       */
      function sanitizeForUPI(text) {
        if (!text || typeof text !== 'string') return '';
        
        // Remove potentially dangerous characters, keep alphanumeric, spaces, and safe punctuation
        return text
          .replace(/[<>\"'`]/g, '') // Remove HTML/script injection chars
          .replace(/[^\w\s&.-]/g, '') // Keep only safe characters
          .trim()
          .substring(0, 100); // Limit length
      }

      /**
       * Build UPI deep link with proper encoding
       * @param {Object} params - UPI parameters
       * @returns {string} Encoded UPI deep link
       */
      function buildUPIDeepLink(params) {
        const queryString = Object.entries(params)
          .filter(([_, value]) => value) // Remove empty values
          .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
          .join('&');
        
        return `upi://pay?${queryString}`;
      }

      /**
       * Open UPI app with error handling and user feedback
       * @param {string} deepLink - UPI deep link
       * @param {HTMLElement} button - Button element for feedback
       */
      function openUPIApp(deepLink, button) {
        // Store original button content
        const originalContent = button.innerHTML;
        
        // Show loading state
        button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i><span>Opening UPI App...</span>';
        button.disabled = true;

        // Create hidden link for better compatibility
        const link = document.createElement('a');
        link.href = deepLink;
        link.style.display = 'none';
        document.body.appendChild(link);

        // Attempt to open UPI app
        try {
          // Try window.location first (better for iOS)
          window.location.href = deepLink;
          
          // Fallback: programmatic click (better for Android)
          setTimeout(() => {
            link.click();
            document.body.removeChild(link);
          }, 100);

          // Reset button after delay
          setTimeout(() => {
            button.innerHTML = originalContent;
            button.disabled = false;
          }, 2000);

          // Track successful attempt (optional analytics hook)
          if (typeof window.trackUPIPayment === 'function') {
            window.trackUPIPayment(business.id, business.upiId);
          }

        } catch (error) {
          // Handle errors gracefully
          console.error('Failed to open UPI app:', error);
          
          button.innerHTML = '<i class="fa-solid fa-exclamation-circle"></i><span>Try Again</span>';
          button.disabled = false;
          
          setTimeout(() => {
            button.innerHTML = originalContent;
          }, 3000);

          // Clean up
          if (document.body.contains(link)) {
            document.body.removeChild(link);
          }
        }
      }

      /**
       * Close and destroy the UPI sheet with exit animation
       */
      function closeUPISheet() {
        const currentOverlay = document.getElementById('upi-payment-overlay');
        if (!currentOverlay) return;
        currentOverlay.classList.remove('active');
        currentOverlay.classList.add('closing');
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
        setTimeout(() => {
          currentOverlay.remove();
        }, 350);
      }
    }

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
      if (!biz.hours) return false;
      return Object.keys(days).every(day => {
        const hours = biz.hours[day];
        return (hours && hours.open === '00:00' && hours.close === '23:59');
      });
    }

    const is24x7 = isOpen24x7();
    const hoursHeader = is24x7
      ? '<h4 class="section-header">Opening Hours (24/7)</h4>'
      : '<h4 class="section-header">Opening Hours</h4>';

    const hoursHtml = hoursHeader +
      Object.keys(days).map(day => {
        const hours = (biz.hours && biz.hours[day]) ? biz.hours[day] : { open: '00:00', close: '00:00' };
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
      (Array.isArray(biz.tags) ? biz.tags.map(tag => `<span class="tag">${sanitizeHTML(tag)}</span>`).join('') : '<p class="empty-state">No services listed.</p>');
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
          ${sanitizeHTML(business.name)}
        </div>
        <div style="font-size: 13px; color: var(--text-secondary); line-height: 1.5;">
          ${sanitizeHTML(business.address)}
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
    // Find business in LISTINGS and return its coordinates
    const business = window.LISTINGS.find(b => b.id === businessId);
    if (business && business.coordinates && business.coordinates.lat && business.coordinates.lng) {
      return [business.coordinates.lat, business.coordinates.lng];
    }
    return null;
  }
})();


  /**
   * Initialize audio player for listen buttons
   * @param {HTMLElement} button - The listen button element
   * @param {HTMLAudioElement} audio - The audio element
   * @param {string} id - Unique identifier for this audio player
   */
  function initAudioPlayer(button, audio, id) {
    let isPlaying = false;
    let currentAudio = null;
    
    // Stop all other audio players
    const stopAllAudio = () => {
      document.querySelectorAll('audio').forEach(a => {
        if (a !== audio && !a.paused) {
          a.pause();
          a.currentTime = 0;
        }
      });
      document.querySelectorAll('.listen-btn.playing').forEach(btn => {
        if (btn !== button) {
          btn.classList.remove('playing');
          const icon = btn.querySelector('i');
          if (icon) {
            icon.className = 'fa-solid fa-volume-high';
          }
        }
      });
    };
    
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      
      if (isPlaying) {
        // Pause audio
        audio.pause();
        audio.currentTime = 0;
        isPlaying = false;
        button.classList.remove('playing');
        button.querySelector('i').className = 'fa-solid fa-volume-high';
        button.setAttribute('aria-label', 'Listen');
      } else {
        // Stop all other audio
        stopAllAudio();
        
        // Play audio
        audio.play().then(() => {
          isPlaying = true;
          button.classList.add('playing');
          button.querySelector('i').className = 'fa-solid fa-pause';
          button.setAttribute('aria-label', 'Pause');
        }).catch((error) => {
          console.warn('Audio playback failed:', error);
          // Fallback: show error message
          button.querySelector('i').className = 'fa-solid fa-volume-xmark';
          button.setAttribute('aria-label', 'Audio not available');
          button.disabled = true;
          setTimeout(() => {
            button.querySelector('i').className = 'fa-solid fa-volume-high';
            button.setAttribute('aria-label', 'Listen');
            button.disabled = false;
          }, 2000);
        });
      }
    });
    
    // Reset button when audio ends
    audio.addEventListener('ended', () => {
      isPlaying = false;
      button.classList.remove('playing');
      button.querySelector('i').className = 'fa-solid fa-volume-high';
      button.setAttribute('aria-label', 'Listen');
      audio.currentTime = 0;
    });
    
    // Handle audio errors
    audio.addEventListener('error', () => {
      button.querySelector('i').className = 'fa-solid fa-volume-xmark';
      button.setAttribute('aria-label', 'Audio not available');
      button.disabled = true;
    });
  }
