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
   * Convert URLs in text to clickable links (safely)
   * @param {string} text - Text containing URLs
   * @returns {string} Text with URLs converted to links
   */
  function linkifyText(text) {
    const sanitized = sanitizeHTML(text);
    return sanitized.replace(
      /(https?:\/\/[^\s<]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer" style="color: var(--accent-primary); text-decoration: underline; word-break: break-all;">$1</a>'
    );
  }

  document.addEventListener('DOMContentLoaded', () => {
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
    if (descEl) descEl.textContent = biz.description;
    if (categoryEl) categoryEl.textContent = biz.category;
    if (nameEl) nameEl.textContent = biz.name;

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

    const avatarText = biz.name
      .split(' ')
      .filter(word => word.length > 0)
      .slice(0, 2)
      .map(word => word[0].toUpperCase())
      .join('');
    const avatarEl = document.getElementById('biz-avatar');
    if (avatarEl) avatarEl.textContent = avatarText;

    const badgesHtml = [];
    if (biz.featured) badgesHtml.push('<span class="badge badge-featured">FEATURED</span>');
    if (biz.isNew) badgesHtml.push('<span class="badge badge-new">NEW</span>');
    const badgesEl = document.getElementById('biz-badges');
    if (badgesEl) badgesEl.innerHTML = badgesHtml.join('');

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
     * Open UPI payment bottom sheet with app selection
     * @param {Object} business - Business data with upiId and upiName
     */
    function openUPISheet(business) {
      if (document.getElementById('upi-payment-sheet')) return;

      const safeUpiId = sanitizeHTML(business.upiId);
      const safeUpiName = sanitizeHTML(business.upiName || business.name);
      const cleanUpiName = (business.upiName || business.name).replace(/[^a-zA-Z0-9 ]/g, '').trim();
      const cleanUpiId = business.upiId.trim();

      // Build UPI URI parameters
      const upiParams = `pa=${encodeURIComponent(cleanUpiId)}&pn=${encodeURIComponent(cleanUpiName)}&cu=INR`;
      
      // Generic UPI URI (for QR code and banking apps)
      const genericUpiUri = `upi://pay?${upiParams}`;
      
      // App-specific deep links based on research [^18^][^19^][^23^]
      const upiApps = [
        {
          id: 'phonepe',
          name: 'PhonePe',
          scheme: `phonepe://upi/pay?${upiParams}`,
          package: 'com.phonepe.app',
          icon: 'fa-solid fa-mobile-screen'
        },
        {
          id: 'gpay',
          name: 'Google Pay',
          scheme: `gpay://upi/pay?${upiParams}`,
          package: 'com.google.android.apps.nbu.paisa.user',
          icon: 'fa-brands fa-google'
        },
        {
          id: 'paytm',
          name: 'Paytm',
          scheme: `paytm://upi/pay?${upiParams}`,
          package: 'net.one97.paytm',
          icon: 'fa-solid fa-wallet'
        },
        {
          id: 'bhim',
          name: 'BHIM',
          scheme: `bhim://upi/pay?${upiParams}`,
          package: 'in.org.npci.upiapp',
          icon: 'fa-solid fa-building-columns'
        },
        {
          id: 'amazonpay',
          name: 'Amazon Pay',
          scheme: `amazonpay://upi/pay?${upiParams}`,
          package: 'in.amazon.mShop.android.shopping',
          icon: 'fa-brands fa-amazon'
        },
        {
          id: 'cred',
          name: 'CRED',
          scheme: `credpay://upi/pay?${upiParams}`,
          package: 'com.dreamplug.androidapp',
          icon: 'fa-solid fa-credit-card'
        },
        {
          id: 'generic',
          name: 'Other UPI App',
          scheme: genericUpiUri,
          package: null,
          icon: 'fa-solid fa-qrcode'
        }
      ];

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
            <p>Choose your preferred UPI app</p>
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
          <div class="upi-apps-grid" id="upi-apps-grid">
            ${upiApps.map(app => `
              <button class="upi-app-btn" data-scheme="${app.scheme}" data-package="${app.package || ''}" aria-label="Pay with ${app.name}">
                <i class="${app.icon}"></i>
                <span>${app.name}</span>
              </button>
            `).join('')}
          </div>
          <p class="upi-disclaimer">
            <i class="fa-solid fa-shield-halved"></i>
            Secure payment via your UPI app
          </p>
        </div>
      `;

      document.body.appendChild(overlay);

      // Generate QR code with generic UPI URI
      const qrTarget = document.getElementById('upi-qr-target');
      if (qrTarget && typeof QRCode !== 'undefined') {
        const offscreen = document.createElement('div');
        offscreen.style.cssText = 'position:absolute;left:-9999px;top:-9999px;';
        document.body.appendChild(offscreen);

        new QRCode(offscreen, {
          text: genericUpiUri,
          width: 256,
          height: 256,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
        });

        setTimeout(() => {
          const canvas = offscreen.querySelector('canvas');
          if (canvas) {
            const dataUrl = canvas.toDataURL('image/png');
            qrTarget.innerHTML = `<img src="${dataUrl}" alt="UPI QR Code" class="upi-qr-img" />`;
          } else {
            const img = offscreen.querySelector('img');
            if (img && img.src) {
              qrTarget.innerHTML = `<img src="${img.src}" alt="UPI QR Code" class="upi-qr-img" />`;
            } else {
              qrTarget.innerHTML = '<div class="upi-qr-fallback"><i class="fa-solid fa-qrcode"></i><p>QR code unavailable</p></div>';
            }
          }
          offscreen.remove();
        }, 50);
      } else if (qrTarget) {
        qrTarget.innerHTML = `
          <div class="upi-qr-fallback" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 20px; text-align: center;">
            <i class="fa-solid fa-qrcode" style="font-size: 48px; color: var(--text-muted); margin-bottom: 16px;"></i>
            <p style="color: var(--text-muted); font-size: 14px; margin: 0;">QR code generator unavailable</p>
          </div>
        `;
      }

      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => overlay.classList.add('active'));

      // Event handlers
      const closeBtn = document.getElementById('upi-close-btn');
      closeBtn.addEventListener('click', closeUPISheet);

      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeUPISheet();
      });

      function handleEscape(e) {
        if (e.key === 'Escape') closeUPISheet();
      }
      document.addEventListener('keydown', handleEscape);

      // Handle app selection
      const appButtons = document.querySelectorAll('.upi-app-btn');
      appButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const scheme = btn.getAttribute('data-scheme');
          const packageName = btn.getAttribute('data-package');
          
          if (scheme) {
            // Try to open the app-specific scheme
            window.location.href = scheme;
            
            // For Android, if package is known, we could try intent:// but 
            // since this is web, we rely on the app registering its scheme
            // Fallback: if app doesn't open in 1 second, show error or try generic
          }
        });
      });

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
          const textArea = document.createElement('textarea');
          textArea.value = business.upiId;
          textArea.style.cssText = 'position:fixed;left:-9999px;';
          document.body.appendChild(textArea);
          textArea.select();
          try { document.execCommand('copy'); } catch (e) {}
          document.body.removeChild(textArea);
          copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
          copyBtn.style.color = 'var(--accent-success)';
          setTimeout(() => {
            copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
            copyBtn.style.color = '';
          }, 2000);
        }
      });

      function closeUPISheet() {
        const currentOverlay = document.getElementById('upi-payment-overlay');
        if (!currentOverlay) return;
        currentOverlay.classList.remove('active');
        currentOverlay.classList.add('closing');
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
        setTimeout(() => currentOverlay.remove(), 350);
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

    function convertTo12Hour(time) {
      const [hours, minutes] = time.split(':').map(Number);
      if (hours === 0 && minutes === 0) return '12:00 AM';
      const period = hours >= 12 ? 'PM' : 'AM';
      const hour12 = hours % 12 || 12;
      return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
    }

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

    const tagsHtml = '<h4 class="section-header">Services</h4>' +
      (Array.isArray(biz.tags) ? biz.tags.map(tag => `<span class="tag">${sanitizeHTML(tag)}</span>`).join('') : '<p class="empty-state">No services listed.</p>');
    document.getElementById('biz-tags').innerHTML = tagsHtml;

    const relatedList = document.getElementById('related-list');
    const related = window.LISTINGS.filter(b => b.categorySlug === biz.categorySlug && b.id !== biz.id).slice(0, 3);
    if (related.length > 0) {
      relatedList.innerHTML = related.map(b => window.renderCard(b)).join('');
    } else {
      relatedList.innerHTML = '<div class="empty-state"><p>No related listings available.</p></div>';
    }

    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
      shareBtn.addEventListener('click', async () => {
        const shareData = {
          title: biz.name,
          text: `Check out ${biz.name} on LocalFind - ${biz.description.slice(0, 100)}...`,
          url: window.location.href
        };

        try {
          if (navigator.share) {
            await navigator.share(shareData);
          } else {
            await navigator.clipboard.writeText(window.location.href);
            const originalHTML = shareBtn.innerHTML;
            shareBtn.innerHTML = '<i class="fa-solid fa-check"></i><span>Link Copied!</span>';
            shareBtn.style.background = 'var(--accent-success)';
            setTimeout(() => {
              shareBtn.innerHTML = originalHTML;
              shareBtn.style.background = '';
            }, 2000);
          }
        } catch (error) {
          try {
            await navigator.clipboard.writeText(window.location.href);
            const originalHTML = shareBtn.innerHTML;
            shareBtn.innerHTML = '<i class="fa-solid fa-check"></i><span>Link Copied!</span>';
            shareBtn.style.background = 'var(--accent-success)';
            setTimeout(() => {
              shareBtn.innerHTML = originalHTML;
              shareBtn.style.background = '';
            }, 2000);
          } catch (clipboardError) {}
        }
      });
    }

    initBusinessMap(biz);
  });

  function initBusinessMap(business) {
    const mapContainer = document.getElementById('biz-map');
    if (!mapContainer) return;

    const coords = getBusinessCoordinates(business.id);
    if (!coords) {
      mapContainer.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--text-muted);">Map location not available</div>';
      return;
    }

    const map = L.map('biz-map', {
      zoomControl: false,
      scrollWheelZoom: false,
      dragging: true,
      touchZoom: true,
      doubleClickZoom: true
    }).setView(coords, 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }).addTo(map);

    const markerIcon = L.divIcon({
      className: 'custom-marker',
      html: `<div class="marker-pin ${business.featured ? 'featured' : 'regular'}"></div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    });

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

    const marker = L.marker(coords, { icon: markerIcon }).addTo(map);
    marker.bindPopup(popupContent, {
      closeButton: false,
      autoClose: false,
      closeOnClick: false,
      className: 'business-detail-popup'
    }).openPopup();

    setTimeout(() => {
      map.invalidateSize();
      const isMobile = window.innerWidth <= 768;
      if (isMobile) map.panBy([0, -30]);
    }, 100);

    mapContainer.style.cursor = 'pointer';
    mapContainer.addEventListener('click', () => {
      window.open(business.mapLink, '_blank');
    });
  }

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
