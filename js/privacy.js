/**
 * Privacy & Cookie Consent Manager
 * GDPR/CCPA Compliant
 */

(function() {
  'use strict';

  const CONSENT_KEY = 'localfind_consent';
  const CONSENT_VERSION = '1.0';

  /**
   * Initialize privacy consent banner
   */
  function initPrivacyConsent() {
    const consent = getConsent();
    
    if (!consent || consent.version !== CONSENT_VERSION) {
      showConsentBanner();
    } else {
      applyConsent(consent);
    }
  }

  /**
   * Get stored consent preferences
   */
  function getConsent() {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.error('Error reading consent:', e);
      return null;
    }
  }

  /**
   * Save consent preferences
   */
  function saveConsent(preferences) {
    const consent = {
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
      preferences: preferences
    };
    
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
      applyConsent(consent);
    } catch (e) {
      console.error('Error saving consent:', e);
    }
  }

  /**
   * Apply consent preferences
   */
  function applyConsent(consent) {
    const prefs = consent.preferences;
    
    // Analytics consent
    if (prefs.analytics) {
      enableAnalytics();
    }
    
    // Marketing consent
    if (prefs.marketing) {
      enableMarketing();
    }
    
    // Essential cookies are always enabled
    enableEssential();
  }

  /**
   * Show consent banner
   */
  function showConsentBanner() {
    const banner = document.createElement('div');
    banner.id = 'consent-banner';
    banner.className = 'consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie Consent');
    banner.setAttribute('aria-live', 'polite');
    
    banner.innerHTML = `
      <div class="consent-content">
        <div class="consent-icon">
          <i class="fa-solid fa-cookie-bite"></i>
        </div>
        <div class="consent-text">
          <h3>We Value Your Privacy</h3>
          <p>We use cookies to enhance your experience, analyze site usage, and assist in our marketing efforts. By clicking "Accept All", you consent to our use of cookies. You can manage your preferences or learn more in our <a href="privacy-policy.html" target="_blank">Privacy Policy</a>.</p>
        </div>
        <div class="consent-actions">
          <button id="consent-customize" class="btn-secondary" aria-label="Customize cookie preferences">
            <i class="fa-solid fa-sliders"></i>
            Customize
          </button>
          <button id="consent-reject" class="btn-secondary" aria-label="Reject optional cookies">
            Reject All
          </button>
          <button id="consent-accept" class="btn-primary" aria-label="Accept all cookies">
            <i class="fa-solid fa-check"></i>
            Accept All
          </button>
        </div>
      </div>
      
      <div id="consent-preferences" class="consent-preferences" style="display: none;">
        <h4>Cookie Preferences</h4>
        <div class="consent-option">
          <div class="consent-option-header">
            <label>
              <input type="checkbox" id="consent-essential" checked disabled>
              <span class="consent-option-title">Essential Cookies</span>
            </label>
            <span class="consent-required">Required</span>
          </div>
          <p class="consent-option-desc">Necessary for the website to function. Cannot be disabled.</p>
        </div>
        
        <div class="consent-option">
          <div class="consent-option-header">
            <label>
              <input type="checkbox" id="consent-analytics">
              <span class="consent-option-title">Analytics Cookies</span>
            </label>
          </div>
          <p class="consent-option-desc">Help us understand how visitors interact with our website.</p>
        </div>
        
        <div class="consent-option">
          <div class="consent-option-header">
            <label>
              <input type="checkbox" id="consent-marketing">
              <span class="consent-option-title">Marketing Cookies</span>
            </label>
          </div>
          <p class="consent-option-desc">Used to deliver personalized advertisements.</p>
        </div>
        
        <div class="consent-actions">
          <button id="consent-save" class="btn-primary">
            <i class="fa-solid fa-floppy-disk"></i>
            Save Preferences
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(banner);
    
    // Add styles
    addConsentStyles();
    
    // Event listeners
    document.getElementById('consent-accept').addEventListener('click', () => {
      saveConsent({
        essential: true,
        analytics: true,
        marketing: true
      });
      removeBanner();
    });
    
    document.getElementById('consent-reject').addEventListener('click', () => {
      saveConsent({
        essential: true,
        analytics: false,
        marketing: false
      });
      removeBanner();
    });
    
    document.getElementById('consent-customize').addEventListener('click', () => {
      document.querySelector('.consent-text').style.display = 'none';
      document.querySelector('.consent-actions').style.display = 'none';
      document.getElementById('consent-preferences').style.display = 'block';
    });
    
    document.getElementById('consent-save').addEventListener('click', () => {
      saveConsent({
        essential: true,
        analytics: document.getElementById('consent-analytics').checked,
        marketing: document.getElementById('consent-marketing').checked
      });
      removeBanner();
    });
    
    // Show banner with animation
    setTimeout(() => banner.classList.add('active'), 100);
  }

  /**
   * Remove consent banner
   */
  function removeBanner() {
    const banner = document.getElementById('consent-banner');
    if (banner) {
      banner.classList.remove('active');
      setTimeout(() => banner.remove(), 300);
    }
  }

  /**
   * Add consent banner styles
   */
  function addConsentStyles() {
    if (document.getElementById('consent-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'consent-styles';
    style.textContent = `
      .consent-banner {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(20, 27, 40, 0.98);
        backdrop-filter: blur(24px);
        border-top: 1px solid rgba(255, 138, 0, 0.3);
        padding: 24px;
        z-index: 10000;
        transform: translateY(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.3);
      }
      
      .consent-banner.active {
        transform: translateY(0);
      }
      
      .consent-content {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        gap: 24px;
      }
      
      .consent-icon {
        font-size: 48px;
        color: var(--accent-primary);
        flex-shrink: 0;
      }
      
      .consent-text {
        flex: 1;
      }
      
      .consent-text h3 {
        color: var(--text-primary);
        margin: 0 0 8px;
        font-size: 18px;
      }
      
      .consent-text p {
        color: var(--text-secondary);
        margin: 0;
        font-size: 14px;
        line-height: 1.6;
      }
      
      .consent-text a {
        color: var(--accent-primary);
        text-decoration: underline;
      }
      
      .consent-actions {
        display: flex;
        gap: 12px;
        flex-shrink: 0;
      }
      
      .consent-actions button {
        padding: 12px 24px;
        border: none;
        border-radius: var(--radius-lg);
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
        white-space: nowrap;
      }
      
      .btn-primary {
        background: linear-gradient(135deg, var(--accent-primary), var(--accent-primary-hover));
        color: #0A0E17;
      }
      
      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(255, 138, 0, 0.4);
      }
      
      .btn-secondary {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: var(--text-primary);
      }
      
      .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.1);
      }
      
      .consent-preferences {
        max-width: 600px;
        margin: 0 auto;
      }
      
      .consent-preferences h4 {
        color: var(--text-primary);
        margin: 0 0 20px;
        font-size: 16px;
      }
      
      .consent-option {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: var(--radius-lg);
        padding: 16px;
        margin-bottom: 12px;
      }
      
      .consent-option-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
      }
      
      .consent-option-header label {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
      }
      
      .consent-option-title {
        color: var(--text-primary);
        font-weight: 600;
        font-size: 14px;
      }
      
      .consent-required {
        background: rgba(34, 197, 94, 0.2);
        color: var(--accent-success);
        padding: 4px 12px;
        border-radius: var(--radius-full);
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
      }
      
      .consent-option-desc {
        color: var(--text-muted);
        font-size: 13px;
        margin: 0;
        line-height: 1.5;
      }
      
      @media (max-width: 768px) {
        .consent-content {
          flex-direction: column;
          text-align: center;
        }
        
        .consent-actions {
          flex-direction: column;
          width: 100%;
        }
        
        .consent-actions button {
          width: 100%;
          justify-content: center;
        }
        
        .consent-icon {
          font-size: 36px;
        }
      }
    `;
    
    document.head.appendChild(style);
  }

  /**
   * Enable essential cookies (always active)
   */
  function enableEssential() {
    // Essential functionality - always enabled
  }

  /**
   * Enable analytics cookies
   */
  function enableAnalytics() {
    // Initialize analytics (Google Analytics, etc.)
    // Only if user consented
  }

  /**
   * Enable marketing cookies
   */
  function enableMarketing() {
    // Initialize marketing tools
    // Only if user consented
  }

  /**
   * Expose consent management to window
   */
  window.PrivacyManager = {
    showPreferences: showConsentBanner,
    getConsent: getConsent,
    revokeConsent: function() {
      localStorage.removeItem(CONSENT_KEY);
      showConsentBanner();
    }
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPrivacyConsent);
  } else {
    initPrivacyConsent();
  }
})();
