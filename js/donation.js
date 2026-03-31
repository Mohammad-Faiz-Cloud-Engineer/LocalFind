/**
 * LocalFind - Donation Page Logic
 * Production-grade UPI payment integration with security and optimization
 * 
 * @version 4.3.2
 * @updated 2026-03-31
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

    const upiString = `upi://pay?pa=${DONATION_CONFIG.upiId}&pn=${DONATION_CONFIG.upiName}&cu=${DONATION_CONFIG.currency}`;

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
        text: upiString,
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
      <p style="color: var(--text-muted); font-size: 12px; margin-top: 8px;">Please scan the QR code with your UPI app</p>
    `);
    target.innerHTML = '';
    target.appendChild(fallback);
  }

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  /**
   * Initialize donation page
   */
  function init() {
    generateQRCode();
  }

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
