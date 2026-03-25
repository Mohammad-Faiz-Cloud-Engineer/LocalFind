/**
 * LocalFind - Donation Page Logic
 * Production-grade UPI payment integration with security and optimization
 * 
 * @version 4.3.1
 * @updated 2026-03-25
 * @author Mohammad Faiz
 */

(function() {
  'use strict';

  // ============================================================================
  // CONFIGURATION
  // ============================================================================

  const DONATION_CONFIG = Object.freeze({
    upiId: 'faiz2k9@fam',
    upiName: 'Mohammad Faiz',
    currency: 'INR',
    qrSize: 256,
    qrErrorCorrection: 'H', // High error correction
    buttonResetDelay: 2000,
    thankYouDelay: 3000,
    animationDuration: 300
  });

  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================

  let activeModal = null;

  // ============================================================================
  // UTILITY FUNCTIONS
  // ============================================================================

  /**
   * Generate secure UPI deep link
   * @returns {string} UPI payment link
   */
  function generateUPILink() {
    const params = new URLSearchParams({
      pa: DONATION_CONFIG.upiId,
      pn: DONATION_CONFIG.upiName,
      cu: DONATION_CONFIG.currency
    });
    return `upi://pay?${params.toString()}`;
  }

  /**
   * Safely get element by ID with null check
   * @param {string} id - Element ID
   * @returns {HTMLElement|null} Element or null
   */
  function getElement(id) {
    return document.getElementById(id);
  }

  /**
   * Create element with attributes
   * @param {string} tag - HTML tag name
   * @param {Object} attrs - Attributes object
   * @param {string} html - Inner HTML
   * @returns {HTMLElement} Created element
   */
  function createElement(tag, attrs = {}, html = '') {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([key, value]) => {
      if (key === 'style') {
        el.style.cssText = value;
      } else {
        el.setAttribute(key, value);
      }
    });
    if (html) el.innerHTML = html;
    return el;
  }

  // ============================================================================
  // QR CODE GENERATION
  // ============================================================================

  /**
   * Generate QR code with security and error handling
   */
  function generateQRCode() {
    const qrTarget = getElement('donation-qr-code');
    if (!qrTarget) return;

    const upiLink = generateUPILink();

    // Check if QRCode library is loaded
    if (typeof QRCode === 'undefined') {
      showQRFallback(qrTarget);
      return;
    }

    // Off-screen rendering for security
    const offscreen = createElement('div', {
      style: 'position:absolute;left:-9999px;top:-9999px;',
      'aria-hidden': 'true'
    });
    document.body.appendChild(offscreen);

    try {
      new QRCode(offscreen, {
        text: upiLink,
        width: DONATION_CONFIG.qrSize,
        height: DONATION_CONFIG.qrSize,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel[DONATION_CONFIG.qrErrorCorrection]
      });

      // Extract and display QR code
      setTimeout(() => {
        const canvas = offscreen.querySelector('canvas');
        const img = offscreen.querySelector('img');
        
        if (canvas) {
          displayQRImage(qrTarget, canvas.toDataURL('image/png'));
        } else if (img?.src) {
          displayQRImage(qrTarget, img.src);
        } else {
          showQRFallback(qrTarget);
        }
        
        offscreen.remove();
      }, 50);
    } catch (error) {
      console.error('QR generation failed:', error);
      offscreen.remove();
      showQRFallback(qrTarget);
    }
  }

  /**
   * Display QR code image
   * @param {HTMLElement} target - Target container
   * @param {string} dataUrl - Image data URL
   */
  function displayQRImage(target, dataUrl) {
    const img = createElement('img', {
      src: dataUrl,
      alt: 'UPI QR Code for LocalFind Donation',
      style: 'width: 100%; height: 100%; object-fit: contain;'
    });
    target.innerHTML = '';
    target.appendChild(img);
  }

  /**
   * Show QR code fallback message
   * @param {HTMLElement} target - Target container
   */
  function showQRFallback(target) {
    const fallback = createElement('div', {
      style: 'display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 20px; text-align: center;'
    }, `
      <i class="fa-solid fa-qrcode" style="font-size: 48px; color: var(--text-muted); margin-bottom: 16px;"></i>
      <p style="color: var(--text-muted); font-size: 14px; margin: 0;">QR code unavailable</p>
      <p style="color: var(--text-muted); font-size: 12px; margin-top: 8px;">Use the "Pay using UPI App" button below</p>
    `);
    target.innerHTML = '';
    target.appendChild(fallback);
  }

  // ============================================================================
  // UPI APP INTEGRATION
  // ============================================================================

  /**
   * Setup pay button
   */
  function setupPayButton() {
    const payBtn = getElement('pay-upi-btn');
    if (!payBtn) return;

    payBtn.addEventListener('click', () => openUPIApp(payBtn));
  }

  /**
   * Open UPI app with user feedback
   * @param {HTMLElement} button - Pay button
   */
  function openUPIApp(button) {
    const upiLink = generateUPILink();
    const originalContent = button.innerHTML;
    
    // Show loading state
    button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i><span>Opening UPI App...</span>';
    button.disabled = true;
    button.setAttribute('aria-busy', 'true');

    try {
      // Open UPI app
      window.location.href = upiLink;
      
      // Reset button
      setTimeout(() => {
        button.innerHTML = originalContent;
        button.disabled = false;
        button.removeAttribute('aria-busy');
      }, DONATION_CONFIG.buttonResetDelay);

      // Analytics hook (if available)
      if (typeof window.trackDonation === 'function') {
        window.trackDonation('upi_opened');
      }

      // Show thank you message
      setTimeout(showThankYouMessage, DONATION_CONFIG.thankYouDelay);

    } catch (error) {
      console.error('UPI app open failed:', error);
      
      // Show error state
      button.innerHTML = '<i class="fa-solid fa-exclamation-circle"></i><span>Try Again</span>';
      button.disabled = false;
      button.removeAttribute('aria-busy');
      
      setTimeout(() => {
        button.innerHTML = originalContent;
      }, DONATION_CONFIG.buttonResetDelay);
    }
  }

  // ============================================================================
  // THANK YOU MODAL
  // ============================================================================

  /**
   * Show thank you modal
   */
  function showThankYouMessage() {
    // Prevent duplicate modals
    if (activeModal || document.querySelector('.thank-you-modal')) return;
    
    const modal = createElement('div', {
      class: 'thank-you-modal',
      role: 'dialog',
      'aria-modal': 'true',
      'aria-labelledby': 'thank-you-title'
    }, `
      <div class="thank-you-content">
        <div class="thank-you-icon" aria-hidden="true">
          <i class="fa-solid fa-heart"></i>
        </div>
        <h2 id="thank-you-title">Thank You for Your Support!</h2>
        <p>Your generous donation helps us keep LocalFind free and accessible for everyone.</p>
        <p style="font-size: 14px; color: var(--text-muted); margin-top: 16px;">
          Complete the payment in your UPI app to finalize your donation.
        </p>
        <button class="thank-you-btn" id="close-thank-you" type="button">
          <i class="fa-solid fa-check"></i>
          <span>Got it!</span>
        </button>
      </div>
    `);

    // Inject styles (once)
    injectThankYouStyles();

    document.body.appendChild(modal);
    activeModal = modal;

    // Event handlers
    const closeBtn = getElement('close-thank-you');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeThankYouModal(modal));
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeThankYouModal(modal);
    });

    const handleEscape = (e) => {
      if (e.key === 'Escape') closeThankYouModal(modal);
    };
    document.addEventListener('keydown', handleEscape);
    modal._escapeHandler = handleEscape;
  }

  /**
   * Close thank you modal
   * @param {HTMLElement} modal - Modal element
   */
  function closeThankYouModal(modal) {
    if (!modal) return;
    
    modal.style.animation = `fadeIn ${DONATION_CONFIG.animationDuration}ms ease-out reverse`;
    
    // Clean up event listener
    if (modal._escapeHandler) {
      document.removeEventListener('keydown', modal._escapeHandler);
    }
    
    activeModal = null;
    
    setTimeout(() => {
      modal.remove();
    }, DONATION_CONFIG.animationDuration);
  }

  /**
   * Inject thank you modal styles (once)
   */
  function injectThankYouStyles() {
    if (document.getElementById('thank-you-styles')) return;

    const style = createElement('style', { id: 'thank-you-styles' });
    style.textContent = `
      .thank-you-modal {
        position: fixed;
        inset: 0;
        background: rgba(10, 14, 23, 0.95);
        backdrop-filter: blur(8px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 20px;
        animation: fadeIn 0.3s ease-out;
      }

      .thank-you-content {
        background: var(--bg-card);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: var(--radius-2xl);
        padding: 48px 32px;
        max-width: 500px;
        text-align: center;
        animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .thank-you-icon {
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 24px;
        animation: heartbeat 1s ease-in-out infinite;
      }

      .thank-you-icon i {
        font-size: 40px;
        color: #0A0E17;
      }

      .thank-you-content h2 {
        font-size: 28px;
        margin-bottom: 16px;
        color: var(--text-primary);
      }

      .thank-you-content p {
        font-size: 16px;
        line-height: 1.6;
        color: var(--text-secondary);
        margin-bottom: 24px;
      }

      .thank-you-btn {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 14px 32px;
        margin-top: 16px;
        background: linear-gradient(135deg, var(--accent-primary), var(--accent-primary-hover));
        color: #0A0E17;
        border: none;
        border-radius: var(--radius-xl);
        font-size: 16px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 16px rgba(255, 138, 0, 0.3);
        font-family: var(--font-sans);
      }

      .thank-you-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(255, 138, 0, 0.4);
      }

      .thank-you-btn:active {
        transform: translateY(0);
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes slideUp {
        from { transform: translateY(30px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }

      @keyframes heartbeat {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }

      @media (max-width: 640px) {
        .thank-you-content { padding: 32px 24px; }
        .thank-you-icon { width: 64px; height: 64px; }
        .thank-you-icon i { font-size: 32px; }
        .thank-you-content h2 { font-size: 24px; }
        .thank-you-content p { font-size: 14px; }
        .thank-you-btn { padding: 12px 24px; font-size: 14px; }
      }
    `;
    document.head.appendChild(style);
  }

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  /**
   * Initialize donation page
   */
  function init() {
    generateQRCode();
    setupPayButton();
  }

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
