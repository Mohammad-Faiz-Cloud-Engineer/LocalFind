/**
 * LocalFind - PWA Registration & Management
 * Handles service worker registration, install prompts, and updates
 * 
 * @version 4.0.0
 * @updated 2026-02-28
 */

(function() {
  'use strict';
  
  // PWA Version
  const PWA_VERSION = '4.0.0';
  
  let deferredPrompt;
  let swRegistration;
  
  /**
   * Register service worker
   */
  async function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) {
      return;
    }
    
    try {
      swRegistration = await navigator.serviceWorker.register('/LocalFind/sw.js', {
        scope: '/LocalFind/',
        updateViaCache: 'none' // Always fetch fresh service worker
      });
      
      // Check for updates immediately on registration
      swRegistration.update();
      
      // Check for updates
      swRegistration.addEventListener('updatefound', () => {
        const newWorker = swRegistration.installing;
        
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New service worker available
            showUpdateNotification();
          }
        });
      });
      
      // Check for updates more frequently (every 5 minutes)
      setInterval(() => {
        swRegistration.update();
      }, 5 * 60 * 1000);
      
      // Also check on page visibility change
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden && swRegistration) {
          swRegistration.update();
        }
      });
      
    } catch (error) {
      // Service worker registration failed - silent fail
    }
  }
  
  /**
   * Show update notification when new version available
   */
  function showUpdateNotification() {
    const notification = document.createElement('div');
    notification.className = 'pwa-update-notification';
    notification.innerHTML = `
      <div class="pwa-update-content">
        <span>New version available!</span>
        <button class="pwa-update-btn" id="pwa-update-now-btn">Update Now</button>
        <button class="pwa-dismiss-btn" onclick="this.parentElement.parentElement.remove()">Later</button>
      </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .pwa-update-notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10000;
        background: var(--bg-card);
        border: 1px solid var(--accent-primary);
        border-radius: 12px;
        padding: 16px 24px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        animation: slideUp 0.3s ease-out;
      }
      .pwa-update-content {
        display: flex;
        align-items: center;
        gap: 16px;
        color: var(--text-primary);
        font-size: 14px;
        font-weight: 600;
      }
      .pwa-update-btn {
        padding: 8px 16px;
        background: linear-gradient(135deg, var(--accent-primary), var(--accent-primary-hover));
        color: #0A0E17;
        border: none;
        border-radius: 8px;
        font-weight: 700;
        cursor: pointer;
        transition: transform 0.2s;
      }
      .pwa-update-btn:hover {
        transform: scale(1.05);
      }
      .pwa-dismiss-btn {
        padding: 8px 16px;
        background: transparent;
        color: var(--text-muted);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
      }
      .pwa-dismiss-btn:hover {
        background: rgba(255, 255, 255, 0.05);
        color: var(--text-primary);
      }
      @keyframes slideUp {
        from {
          transform: translateX(-50%) translateY(100px);
          opacity: 0;
        }
        to {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }
      }
      @media (max-width: 640px) {
        .pwa-update-notification {
          left: 16px;
          right: 16px;
          transform: none;
        }
        .pwa-update-content {
          flex-direction: column;
          gap: 12px;
        }
        .pwa-update-btn, .pwa-dismiss-btn {
          width: 100%;
        }
      }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Add click handler for update button
    const updateBtn = document.getElementById('pwa-update-now-btn');
    if (updateBtn) {
      updateBtn.addEventListener('click', async () => {
        // Disable button to prevent multiple clicks
        updateBtn.disabled = true;
        updateBtn.textContent = 'Updating...';
        
        try {
          // Step 1: Clear all caches first
          if ('caches' in window) {
            const cacheNames = await caches.keys();
            await Promise.all(
              cacheNames.map(cacheName => {
                return caches.delete(cacheName);
              })
            );
          }
          
          // Step 2: Tell the waiting service worker to skip waiting and activate
          if (swRegistration && swRegistration.waiting) {
            // Listen for controller change before sending message
            let controllerChanged = false;
            navigator.serviceWorker.addEventListener('controllerchange', () => {
              controllerChanged = true;
              // Force reload with cache bypass
              window.location.reload(true);
            });
            
            // Send skip waiting message
            swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
            
            // Fallback: if controller doesn't change in 2 seconds, force reload anyway
            setTimeout(() => {
              if (!controllerChanged) {
                window.location.reload(true);
              }
            }, 2000);
          } else {
            // No waiting worker, just reload with cache bypass
            window.location.reload(true);
          }
        } catch (error) {
          // Fallback to force reload with cache bypass
          window.location.reload(true);
        }
      });
    }
  }
  
  /**
   * Handle install prompt
   */
  function setupInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent default mini-infobar
      e.preventDefault();
      
      // Store event for later use
      deferredPrompt = e;
      
      // Show custom install button
      showInstallButton();
    });
    
    // Track successful installation
    window.addEventListener('appinstalled', () => {
      deferredPrompt = null;
      hideInstallButton();
      
      // Track installation (analytics)
      if (window.gtag) {
        gtag('event', 'pwa_install', {
          event_category: 'engagement',
          event_label: 'PWA Installation'
        });
      }
    });
  }
  
  /**
   * Show install button in UI
   */
  function showInstallButton() {
    // Check if button already exists
    if (document.getElementById('pwa-install-btn')) {
      return;
    }
    
    const installBtn = document.createElement('button');
    installBtn.id = 'pwa-install-btn';
    installBtn.className = 'pwa-install-button';
    installBtn.innerHTML = `
      <span></span>
      <span>Install App</span>
    `;
    
    installBtn.addEventListener('click', async () => {
      if (!deferredPrompt) {
        return;
      }
      
      // Show install prompt
      deferredPrompt.prompt();
      
      // Wait for user response
      const { outcome } = await deferredPrompt.userChoice;
      
      // Clear deferred prompt
      deferredPrompt = null;
      
      if (outcome === 'accepted') {
        hideInstallButton();
      }
    });
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .pwa-install-button {
        position: fixed;
        bottom: 80px;
        right: 20px;
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 20px;
        background: linear-gradient(135deg, var(--accent-primary), var(--accent-primary-hover));
        color: #0A0E17;
        border: none;
        border-radius: 50px;
        font-weight: 700;
        font-size: 14px;
        cursor: pointer;
        box-shadow: 0 4px 16px rgba(255, 159, 67, 0.3);
        transition: all 0.3s;
        animation: pulse 2s infinite;
      }
      .pwa-install-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 24px rgba(255, 159, 67, 0.4);
      }
      @keyframes pulse {
        0%, 100% {
          box-shadow: 0 4px 16px rgba(255, 159, 67, 0.3);
        }
        50% {
          box-shadow: 0 4px 24px rgba(255, 159, 67, 0.5);
        }
      }
      @media (max-width: 640px) {
        .pwa-install-button {
          bottom: 20px;
          right: 20px;
          left: 20px;
          justify-content: center;
        }
      }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(installBtn);
  }
  
  /**
   * Hide install button
   */
  function hideInstallButton() {
    const installBtn = document.getElementById('pwa-install-btn');
    if (installBtn) {
      installBtn.style.animation = 'slideDown 0.3s ease-out';
      setTimeout(() => installBtn.remove(), 300);
    }
  }
  
  /**
   * Check if app is running as PWA
   */
  function isPWA() {
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone === true ||
           document.referrer.includes('android-app://');
  }
  
  /**
   * Add PWA-specific enhancements
   */
  function setupPWAEnhancements() {
    if (isPWA()) {
      // Add PWA class to body for specific styling
      document.body.classList.add('pwa-mode');
      
      // Disable pull-to-refresh completely
      document.body.style.overscrollBehaviorY = 'contain';
      
      // Prevent default touch behaviors
      let lastTouchY = 0;
      let preventPullToRefresh = false;
      
      document.addEventListener('touchstart', (e) => {
        if (e.touches.length !== 1) return;
        lastTouchY = e.touches[0].clientY;
        preventPullToRefresh = window.pageYOffset === 0;
      }, { passive: false });
      
      document.addEventListener('touchmove', (e) => {
        const touchY = e.touches[0].clientY;
        const touchYDelta = touchY - lastTouchY;
        lastTouchY = touchY;
        
        if (preventPullToRefresh) {
          // Prevent pull-to-refresh if at top and pulling down
          if (touchYDelta > 0) {
            e.preventDefault();
            return;
          }
          preventPullToRefresh = false;
        }
      }, { passive: false });
      
      // Add safe area padding for notched devices
      if (CSS.supports('padding-top: env(safe-area-inset-top)')) {
        document.documentElement.style.setProperty('--safe-area-top', 'env(safe-area-inset-top)');
        document.documentElement.style.setProperty('--safe-area-bottom', 'env(safe-area-inset-bottom)');
      }
      
      // Prevent context menu on long press
      window.addEventListener('contextmenu', (e) => {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
          e.preventDefault();
        }
      });
      
      // Handle back button in PWA
      window.addEventListener('popstate', (e) => {
        // Custom back button handling if needed
      });
      
      console.log('[PWA] Running in standalone mode with enhancements');
    }
  }
  
  /**
   * Setup online/offline detection
   */
  function setupNetworkDetection() {
    window.addEventListener('online', () => {
      showNetworkStatus('online');
    });
    
    window.addEventListener('offline', () => {
      showNetworkStatus('offline');
    });
  }
  
  /**
   * Show network status notification
   */
  function showNetworkStatus(status) {
    const notification = document.createElement('div');
    notification.className = `network-status network-status--${status}`;
    notification.textContent = status === 'online' ? '✓ Back Online' : '⚠ You\'re Offline';
    
    const style = document.createElement('style');
    style.textContent = `
      .network-status {
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10000;
        padding: 12px 24px;
        border-radius: 50px;
        font-weight: 600;
        font-size: 14px;
        animation: slideDown 0.3s ease-out;
      }
      .network-status--online {
        background: var(--accent-success);
        color: #0A0E17;
      }
      .network-status--offline {
        background: var(--accent-danger);
        color: #fff;
      }
      @keyframes slideDown {
        from {
          transform: translateX(-50%) translateY(-100px);
          opacity: 0;
        }
        to {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }
      }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideDown 0.3s ease-out reverse';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
  
  /**
   * Initialize PWA features
   */
  function init() {
    // Setup PWA enhancements first
    setupPWAEnhancements();
    
    // Register service worker
    registerServiceWorker();
    
    // Setup install prompt
    setupInstallPrompt();
    
    // Setup network detection
    setupNetworkDetection();
    
    // PWA initialized successfully
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Export for external use
  window.PWA = {
    version: PWA_VERSION,
    isPWA,
    showInstallButton,
    hideInstallButton
  };
})();