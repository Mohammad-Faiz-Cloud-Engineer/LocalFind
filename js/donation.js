/**
 * LocalFind - Donation Page Logic
 * Handles donation amount selection, UPI payment integration, and user interactions
 * 
 * @version 4.3.0
 * @updated 2026-03-25
 */

(function() {
  'use strict';

  // Donation Configuration - Immutable
  const DONATION_CONFIG = Object.freeze({
    upiId: 'faiz2k9@fam',
    upiName: 'LocalFind',
    minAmount: 10,
    maxAmount: 100000,
    currency: 'INR',
    qrSize: 256,
    debounceDelay: 300
  });

  // State management
  let selectedAmount = null;
  let isRecurring = false;
  let activeModal = null;

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
   * Validate amount is within acceptable range
   * @param {number} amount - Amount to validate
   * @returns {boolean} Whether amount is valid
   */
  function isValidAmount(amount) {
    return (
      typeof amount === 'number' &&
      !isNaN(amount) &&
      isFinite(amount) &&
      amount >= DONATION_CONFIG.minAmount &&
      amount <= DONATION_CONFIG.maxAmount
    );
  }

  /**
   * Generate secure UPI deep link
   * @param {number} amount - Payment amount
   * @returns {string} UPI deep link
   */
  function generateUPILink(amount) {
    if (!isValidAmount(amount)) {
      throw new Error('Invalid amount for UPI link generation');
    }

    const params = new URLSearchParams({
      pa: DONATION_CONFIG.upiId,
      pn: DONATION_CONFIG.upiName,
      am: amount.toString(),
      cu: DONATION_CONFIG.currency
    });

    return `upi://pay?${params.toString()}`;
  }

  /**
   * Debounce function for performance optimization
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} Debounced function
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Initialize donation page
   */
  function init() {
    setupAmountButtons();
    setupCustomAmountInput();
    setupRecurringToggle();
    setupDonateButton();
  }

  /**
   * Setup preset amount buttons
   */
  function setupAmountButtons() {
    const amountButtons = document.querySelectorAll('.amount-btn');
    
    amountButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const amount = parseInt(btn.dataset.amount, 10);
        
        // Validate parsed amount
        if (!isValidAmount(amount)) return;
        
        selectAmount(amount);
        
        // Clear custom input
        const customInput = document.getElementById('custom-amount-input');
        if (customInput) {
          customInput.value = '';
        }
        
        // Update UI
        amountButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  /**
   * Setup custom amount input with debouncing
   */
  function setupCustomAmountInput() {
    const customInput = document.getElementById('custom-amount-input');
    
    if (!customInput) return;
    
    // Debounced input handler for performance
    const handleInput = debounce((e) => {
      const value = parseInt(e.target.value, 10);
      
      // Clear preset button selection
      document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      
      if (isValidAmount(value)) {
        selectAmount(value);
      } else {
        selectAmount(null);
      }
    }, DONATION_CONFIG.debounceDelay);

    customInput.addEventListener('input', handleInput);

    // Validate and clamp on blur
    customInput.addEventListener('blur', (e) => {
      const value = parseInt(e.target.value, 10);
      
      if (!value || isNaN(value)) {
        e.target.value = '';
        selectAmount(null);
        return;
      }
      
      if (value < DONATION_CONFIG.minAmount) {
        e.target.value = DONATION_CONFIG.minAmount;
        selectAmount(DONATION_CONFIG.minAmount);
      } else if (value > DONATION_CONFIG.maxAmount) {
        e.target.value = DONATION_CONFIG.maxAmount;
        selectAmount(DONATION_CONFIG.maxAmount);
      }
    });

    // Prevent non-numeric input
    customInput.addEventListener('keypress', (e) => {
      if (!/^\d$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
        e.preventDefault();
      }
    });
  }

  /**
   * Setup recurring donation toggle
   */
  function setupRecurringToggle() {
    const checkbox = document.getElementById('recurring-checkbox');
    
    if (!checkbox) return;
    
    checkbox.addEventListener('change', (e) => {
      isRecurring = e.target.checked;
      updateDonateButton();
    });
  }

  /**
   * Setup donate button
   */
  function setupDonateButton() {
    const donateBtn = document.getElementById('donate-now-btn');
    
    if (!donateBtn) return;
    
    donateBtn.addEventListener('click', () => {
      if (isValidAmount(selectedAmount)) {
        openUPIPaymentSheet();
      }
    });
  }

  /**
   * Select donation amount with validation
   * @param {number|null} amount - Amount to select
   */
  function selectAmount(amount) {
    selectedAmount = amount;
    updateDonateButton();
  }

  /**
   * Update donate button state and text
   */
  function updateDonateButton() {
    const donateBtn = document.getElementById('donate-now-btn');
    
    if (!donateBtn) return;
    
    const isValid = isValidAmount(selectedAmount);
    
    donateBtn.disabled = !isValid;
    donateBtn.setAttribute('aria-disabled', !isValid);
    
    if (isValid) {
      const recurringText = isRecurring ? ' Monthly' : '';
      const safeAmount = sanitizeHTML(selectedAmount.toString());
      donateBtn.innerHTML = `
        <i class="fa-solid fa-heart"></i>
        <span>Donate ₹${safeAmount}${recurringText} via UPI</span>
      `;
    } else {
      donateBtn.innerHTML = `
        <i class="fa-solid fa-heart"></i>
        <span>Select Amount to Continue</span>
      `;
    }
  }

  /**
   * Open UPI payment bottom sheet with security and accessibility
   */
  function openUPIPaymentSheet() {
    // Prevent duplicate modals
    if (activeModal || document.getElementById('upi-payment-sheet')) return;

    // Validate amount before proceeding
    if (!isValidAmount(selectedAmount)) return;

    const safeUpiId = sanitizeHTML(DONATION_CONFIG.upiId);
    const safeUpiName = sanitizeHTML(DONATION_CONFIG.upiName);
    const safeAmount = sanitizeHTML(selectedAmount.toString());
    
    // Generate secure UPI deep link
    let upiDeepLink;
    try {
      upiDeepLink = generateUPILink(selectedAmount);
    } catch (error) {
      // Handle error gracefully
      return;
    }

    // Build the overlay + bottom sheet
    const overlay = document.createElement('div');
    overlay.id = 'upi-payment-overlay';
    overlay.className = 'upi-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'UPI Payment');
    overlay.setAttribute('aria-describedby', 'upi-sheet-header');

    overlay.innerHTML = `
      <div class="upi-sheet" id="upi-payment-sheet">
        <div class="upi-sheet-handle" aria-hidden="true"></div>
        <button class="upi-sheet-close" id="upi-close-btn" aria-label="Close payment sheet" type="button">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="upi-sheet-header" id="upi-sheet-header">
          <div class="upi-sheet-icon" aria-hidden="true">
            <i class="fa-solid fa-heart"></i>
          </div>
          <h3>Donate to ${safeUpiName}</h3>
          <p class="upi-amount">₹${safeAmount}${isRecurring ? ' / month' : ''}</p>
        </div>
        <div class="upi-qr-container">
          <div class="upi-qr-frame" id="upi-qr-target" role="img" aria-label="UPI QR Code for payment"></div>
        </div>
        <div class="upi-id-row" id="upi-id-row">
          <span class="upi-id-label">UPI ID:</span>
          <span class="upi-id-value" id="upi-id-text">${safeUpiId}</span>
          <button class="upi-copy-btn" id="upi-copy-btn" aria-label="Copy UPI ID" type="button">
            <i class="fa-regular fa-copy"></i>
          </button>
        </div>

        <button class="upi-pay-btn" id="upi-pay-app-btn" aria-label="Pay using UPI app" type="button">
          <i class="fa-solid fa-mobile-screen-button"></i>
          <span>Pay Using UPI App</span>
          <i class="fa-solid fa-arrow-right"></i>
        </button>

        <p class="upi-disclaimer">
          <i class="fa-solid fa-shield-halved"></i>
          Secure payment via your UPI app • Amount: ₹${safeAmount}
        </p>
        
        ${isRecurring ? `
          <p class="upi-disclaimer" style="margin-top: 8px; color: var(--accent-primary);">
            <i class="fa-solid fa-rotate"></i>
            Monthly recurring donation • Set up auto-pay in your UPI app
          </p>
        ` : ''}
      </div>
    `;

    document.body.appendChild(overlay);
    activeModal = overlay;

    // Generate QR code securely
    generateQRCode(upiDeepLink);

    // Prevent body scroll while sheet is open
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';

    // Trigger entrance animation on next frame
    requestAnimationFrame(() => {
      overlay.classList.add('active');
    });

    // Setup event handlers
    setupModalEventHandlers(overlay, upiDeepLink);
  }

  /**
   * Generate QR code with error handling
   * @param {string} upiLink - UPI deep link to encode
   */
  function generateQRCode(upiLink) {
    const qrTarget = document.getElementById('upi-qr-target');
    if (!qrTarget) return;

    if (typeof QRCode !== 'undefined') {
      // Render QR into a hidden off-screen container for security
      const offscreen = document.createElement('div');
      offscreen.style.cssText = 'position:absolute;left:-9999px;top:-9999px;';
      offscreen.setAttribute('aria-hidden', 'true');
      document.body.appendChild(offscreen);

      try {
        new QRCode(offscreen, {
          text: upiLink,
          width: DONATION_CONFIG.qrSize,
          height: DONATION_CONFIG.qrSize,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
        });

        // Extract data URL from the generated canvas
        setTimeout(() => {
          const canvas = offscreen.querySelector('canvas');
          if (canvas) {
            const dataUrl = canvas.toDataURL('image/png');
            const img = document.createElement('img');
            img.src = dataUrl;
            img.alt = 'UPI QR Code';
            img.className = 'upi-qr-img';
            qrTarget.innerHTML = '';
            qrTarget.appendChild(img);
          } else {
            // Library might have used img fallback
            const img = offscreen.querySelector('img');
            if (img && img.src) {
              const newImg = document.createElement('img');
              newImg.src = img.src;
              newImg.alt = 'UPI QR Code';
              newImg.className = 'upi-qr-img';
              qrTarget.innerHTML = '';
              qrTarget.appendChild(newImg);
            } else {
              showQRFallback(qrTarget);
            }
          }
          offscreen.remove();
        }, 50);
      } catch (error) {
        offscreen.remove();
        showQRFallback(qrTarget);
      }
    } else {
      showQRFallback(qrTarget);
    }
  }

  /**
   * Show QR code fallback message
   * @param {HTMLElement} target - Target element
   */
  function showQRFallback(target) {
    const fallback = document.createElement('div');
    fallback.className = 'upi-qr-fallback';
    fallback.style.cssText = 'display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 20px; text-align: center;';
    fallback.innerHTML = `
      <i class="fa-solid fa-qrcode" style="font-size: 48px; color: var(--text-muted); margin-bottom: 16px;"></i>
      <p style="color: var(--text-muted); font-size: 14px; margin: 0;">QR code generator unavailable</p>
      <p style="color: var(--text-muted); font-size: 12px; margin-top: 8px;">Use the "Pay using UPI App" button below</p>
    `;
    target.innerHTML = '';
    target.appendChild(fallback);
  }

  /**
   * Setup modal event handlers
   * @param {HTMLElement} overlay - Modal overlay element
   * @param {string} upiDeepLink - UPI deep link
   */
  function setupModalEventHandlers(overlay, upiDeepLink) {

    // Close button
    const closeBtn = document.getElementById('upi-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeUPISheet);
    }

    // Backdrop click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeUPISheet();
    });

    // Escape key handler
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeUPISheet();
    };
    document.addEventListener('keydown', handleEscape);

    // Store handler for cleanup
    overlay._escapeHandler = handleEscape;

    // Copy UPI ID with modern clipboard API
    const copyBtn = document.getElementById('upi-copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(DONATION_CONFIG.upiId);
          showCopySuccess(copyBtn);
        } catch (err) {
          // Fallback for browsers without clipboard API
          fallbackCopyToClipboard(DONATION_CONFIG.upiId, copyBtn);
        }
      });
    }

    // Pay Using UPI App Button
    const payAppBtn = document.getElementById('upi-pay-app-btn');
    if (payAppBtn) {
      payAppBtn.addEventListener('click', () => {
        openUPIApp(upiDeepLink, payAppBtn);
      });
    }

    /**
     * Close and destroy the UPI sheet with exit animation
     */
    function closeUPISheet() {
      const currentOverlay = document.getElementById('upi-payment-overlay');
      if (!currentOverlay) return;
      
      currentOverlay.classList.remove('active');
      currentOverlay.classList.add('closing');
      
      // Clean up escape handler
      if (currentOverlay._escapeHandler) {
        document.removeEventListener('keydown', currentOverlay._escapeHandler);
      }
      
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      activeModal = null;
      
      setTimeout(() => {
        currentOverlay.remove();
      }, 350);
    }
  }

  /**
   * Show copy success feedback
   * @param {HTMLElement} button - Copy button element
   */
  function showCopySuccess(button) {
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fa-solid fa-check"></i>';
    button.style.color = 'var(--accent-success)';
    button.disabled = true;
    
    setTimeout(() => {
      button.innerHTML = originalHTML;
      button.style.color = '';
      button.disabled = false;
    }, 2000);
  }

  /**
   * Fallback copy to clipboard for older browsers
   * @param {string} text - Text to copy
   * @param {HTMLElement} button - Copy button element
   */
  function fallbackCopyToClipboard(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.cssText = 'position:fixed;left:-9999px;top:-9999px;';
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);
    
    try {
      textArea.select();
      textArea.setSelectionRange(0, 99999); // For mobile devices
      
      const successful = document.execCommand('copy');
      if (successful) {
        showCopySuccess(button);
      }
    } catch (err) {
      // Silent fail - user will need to manually copy
    } finally {
      document.body.removeChild(textArea);
    }
  }

  /**
   * Open UPI app with error handling and user feedback
   * @param {string} deepLink - UPI deep link
   * @param {HTMLElement} button - Button element for feedback
   */
  function openUPIApp(deepLink, button) {
    // Validate deep link
    if (!deepLink || !deepLink.startsWith('upi://')) {
      return;
    }

    // Store original button content
    const originalContent = button.innerHTML;
    
    // Show loading state
    button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i><span>Opening UPI App...</span>';
    button.disabled = true;
    button.setAttribute('aria-busy', 'true');

    // Attempt to open UPI app
    try {
      // Primary method: Direct window.location assignment
      window.location.href = deepLink;
      
      // Reset button after delay
      setTimeout(() => {
        button.innerHTML = originalContent;
        button.disabled = false;
        button.removeAttribute('aria-busy');
      }, 2000);

      // Track successful attempt (optional analytics hook)
      if (typeof window.trackDonation === 'function') {
        window.trackDonation(selectedAmount, isRecurring);
      }

      // Show thank you message after short delay
      setTimeout(() => {
        closeUPISheet();
        showThankYouMessage();
      }, 3000);

    } catch (error) {
      // Handle errors gracefully
      button.innerHTML = '<i class="fa-solid fa-exclamation-circle"></i><span>Try Again</span>';
      button.disabled = false;
      button.removeAttribute('aria-busy');
      
      setTimeout(() => {
        button.innerHTML = originalContent;
      }, 3000);
    }
  }

  /**
   * Close UPI sheet helper
   */
  function closeUPISheet() {
    const currentOverlay = document.getElementById('upi-payment-overlay');
    if (!currentOverlay) return;
    
    currentOverlay.classList.remove('active');
    currentOverlay.classList.add('closing');
    
    // Clean up escape handler
    if (currentOverlay._escapeHandler) {
      document.removeEventListener('keydown', currentOverlay._escapeHandler);
    }
    
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    activeModal = null;
    
    setTimeout(() => {
      currentOverlay.remove();
    }, 350);
  }

  /**
   * Show thank you message after donation with accessibility
   */
  function showThankYouMessage() {
    // Prevent duplicate modals
    if (document.querySelector('.thank-you-modal')) return;

    const safeAmount = sanitizeHTML(selectedAmount.toString());
    
    const thankYouModal = document.createElement('div');
    thankYouModal.className = 'thank-you-modal';
    thankYouModal.setAttribute('role', 'dialog');
    thankYouModal.setAttribute('aria-modal', 'true');
    thankYouModal.setAttribute('aria-labelledby', 'thank-you-title');
    
    thankYouModal.innerHTML = `
      <div class="thank-you-content">
        <div class="thank-you-icon" aria-hidden="true">
          <i class="fa-solid fa-heart"></i>
        </div>
        <h2 id="thank-you-title">Thank You for Your Support!</h2>
        <p>Your generous donation of ₹${safeAmount}${isRecurring ? ' per month' : ''} helps us keep LocalFind free and accessible for everyone.</p>
        <p style="font-size: 14px; color: var(--text-muted); margin-top: 16px;">
          Complete the payment in your UPI app to finalize your donation.
        </p>
        <button class="btn btn-cta" id="close-thank-you" type="button">
          <i class="fa-solid fa-check"></i>
          <span>Got it!</span>
        </button>
      </div>
    `;

    // Add styles (only once)
    if (!document.getElementById('thank-you-styles')) {
      const style = document.createElement('style');
      style.id = 'thank-you-styles';
      style.textContent = `
        .thank-you-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
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

        .thank-you-content .btn {
          margin-top: 16px;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @media (max-width: 640px) {
          .thank-you-content {
            padding: 32px 24px;
          }

          .thank-you-icon {
            width: 64px;
            height: 64px;
          }

          .thank-you-icon i {
            font-size: 32px;
          }

          .thank-you-content h2 {
            font-size: 24px;
          }

          .thank-you-content p {
            font-size: 14px;
          }
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(thankYouModal);

    // Close button handler
    const closeBtn = document.getElementById('close-thank-you');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        closeThankYouModal(thankYouModal);
      });
    }

    // Close on backdrop click
    thankYouModal.addEventListener('click', (e) => {
      if (e.target === thankYouModal) {
        closeThankYouModal(thankYouModal);
      }
    });

    // Close on Escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeThankYouModal(thankYouModal);
      }
    };
    document.addEventListener('keydown', handleEscape);
    thankYouModal._escapeHandler = handleEscape;
  }

  /**
   * Close thank you modal
   * @param {HTMLElement} modal - Modal element
   */
  function closeThankYouModal(modal) {
    if (!modal) return;
    
    modal.style.animation = 'fadeIn 0.3s ease-out reverse';
    
    // Clean up escape handler
    if (modal._escapeHandler) {
      document.removeEventListener('keydown', modal._escapeHandler);
    }
    
    setTimeout(() => {
      modal.remove();
    }, 300);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
