/**
 * LocalFind - Donation Page Logic
 * Handles donation amount selection, UPI payment integration, and user interactions
 * 
 * @version 4.3.0
 * @updated 2026-03-25
 */

(function() {
  'use strict';

  // Donation Configuration
  const DONATION_CONFIG = {
    upiId: 'faiz2k9@fam',
    upiName: 'LocalFind',
    minAmount: 10,
    maxAmount: 100000,
    currency: 'INR'
  };

  let selectedAmount = null;
  let isRecurring = false;

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
        const amount = parseInt(btn.dataset.amount);
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
   * Setup custom amount input
   */
  function setupCustomAmountInput() {
    const customInput = document.getElementById('custom-amount-input');
    
    if (!customInput) return;
    
    customInput.addEventListener('input', (e) => {
      const value = parseInt(e.target.value);
      
      // Clear preset button selection
      document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      
      if (value && value >= DONATION_CONFIG.minAmount) {
        selectAmount(value);
      } else {
        selectAmount(null);
      }
    });

    // Validate on blur
    customInput.addEventListener('blur', (e) => {
      const value = parseInt(e.target.value);
      
      if (value && value < DONATION_CONFIG.minAmount) {
        e.target.value = DONATION_CONFIG.minAmount;
        selectAmount(DONATION_CONFIG.minAmount);
      } else if (value && value > DONATION_CONFIG.maxAmount) {
        e.target.value = DONATION_CONFIG.maxAmount;
        selectAmount(DONATION_CONFIG.maxAmount);
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
      if (selectedAmount && selectedAmount >= DONATION_CONFIG.minAmount) {
        openUPIPaymentSheet();
      }
    });
  }

  /**
   * Select donation amount
   * @param {number|null} amount - Amount to select
   */
  function selectAmount(amount) {
    selectedAmount = amount;
    updateDonateButton();
  }

  /**
   * Update donate button state
   */
  function updateDonateButton() {
    const donateBtn = document.getElementById('donate-now-btn');
    
    if (!donateBtn) return;
    
    const isValid = selectedAmount && selectedAmount >= DONATION_CONFIG.minAmount;
    
    donateBtn.disabled = !isValid;
    
    if (isValid) {
      const recurringText = isRecurring ? ' Monthly' : '';
      donateBtn.innerHTML = `
        <i class="fa-solid fa-heart"></i>
        <span>Donate ₹${selectedAmount}${recurringText} via UPI</span>
      `;
    } else {
      donateBtn.innerHTML = `
        <i class="fa-solid fa-heart"></i>
        <span>Select Amount to Continue</span>
      `;
    }
  }

  /**
   * Open UPI payment bottom sheet
   */
  function openUPIPaymentSheet() {
    // Prevent duplicate modals
    if (document.getElementById('upi-payment-sheet')) return;

    const safeUpiId = sanitizeHTML(DONATION_CONFIG.upiId);
    const safeUpiName = sanitizeHTML(DONATION_CONFIG.upiName);
    const safeAmount = sanitizeHTML(selectedAmount.toString());
    
    // Build UPI deep link with amount pre-filled
    const upiDeepLink = `upi://pay?pa=${encodeURIComponent(DONATION_CONFIG.upiId)}&pn=${encodeURIComponent(DONATION_CONFIG.upiName)}&am=${selectedAmount}&cu=${DONATION_CONFIG.currency}`;
    
    // Log for debugging (remove in production)
    // console.log('UPI Link:', upiDeepLink);

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
            <i class="fa-solid fa-heart"></i>
          </div>
          <h3>Donate to ${safeUpiName}</h3>
          <p class="upi-amount">₹${safeAmount}${isRecurring ? ' / month' : ''}</p>
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

    // Generate real scannable QR code
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
    document.body.classList.add('modal-open');
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
        await navigator.clipboard.writeText(DONATION_CONFIG.upiId);
        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
        copyBtn.style.color = 'var(--accent-success)';
        setTimeout(() => {
          copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
          copyBtn.style.color = '';
        }, 2000);
      } catch (err) {
        // Fallback for older browsers using modern approach
        const textArea = document.createElement('textarea');
        textArea.value = DONATION_CONFIG.upiId;
        textArea.style.cssText = 'position:fixed;left:-9999px;';
        document.body.appendChild(textArea);
        textArea.select();
        textArea.setSelectionRange(0, 99999); // For mobile devices
        
        // Use modern clipboard API as fallback
        try {
          document.execCommand('copy');
          copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
          copyBtn.style.color = 'var(--accent-success)';
          setTimeout(() => {
            copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
            copyBtn.style.color = '';
          }, 2000);
        } catch (copyErr) {
          // Silent fail - user will need to manually copy
        } finally {
          document.body.removeChild(textArea);
        }
      }
    });

    // Pay Using UPI App Button
    const payAppBtn = document.getElementById('upi-pay-app-btn');
    if (payAppBtn) {
      payAppBtn.addEventListener('click', () => {
        openUPIApp(upiDeepLink, payAppBtn);
      });
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

      // Attempt to open UPI app
      try {
        // Primary method: Direct window.location assignment
        window.location.href = deepLink;
        
        // Reset button after delay
        setTimeout(() => {
          button.innerHTML = originalContent;
          button.disabled = false;
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
        
        setTimeout(() => {
          button.innerHTML = originalContent;
        }, 3000);
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
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      setTimeout(() => {
        currentOverlay.remove();
      }, 350);
    }
  }

  /**
   * Show thank you message after donation
   */
  function showThankYouMessage() {
    const thankYouModal = document.createElement('div');
    thankYouModal.className = 'thank-you-modal';
    thankYouModal.innerHTML = `
      <div class="thank-you-content">
        <div class="thank-you-icon">
          <i class="fa-solid fa-heart"></i>
        </div>
        <h2>Thank You for Your Support!</h2>
        <p>Your generous donation of ₹${selectedAmount}${isRecurring ? ' per month' : ''} helps us keep LocalFind free and accessible for everyone.</p>
        <p style="font-size: 14px; color: var(--text-muted); margin-top: 16px;">
          Complete the payment in your UPI app to finalize your donation.
        </p>
        <button class="btn btn-cta" id="close-thank-you">
          <i class="fa-solid fa-check"></i>
          <span>Got it!</span>
        </button>
      </div>
    `;

    // Add styles
    const style = document.createElement('style');
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
    document.body.appendChild(thankYouModal);

    // Close button handler
    const closeBtn = document.getElementById('close-thank-you');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        thankYouModal.style.animation = 'fadeIn 0.3s ease-out reverse';
        setTimeout(() => {
          thankYouModal.remove();
          style.remove();
        }, 300);
      });
    }

    // Close on backdrop click
    thankYouModal.addEventListener('click', (e) => {
      if (e.target === thankYouModal) {
        thankYouModal.style.animation = 'fadeIn 0.3s ease-out reverse';
        setTimeout(() => {
          thankYouModal.remove();
          style.remove();
        }, 300);
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
