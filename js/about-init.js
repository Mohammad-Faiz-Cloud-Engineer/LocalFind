/**
 * About Page Initialization
 * Displays version and PWA info
 */
(function() {
  'use strict';
  
  document.addEventListener('DOMContentLoaded', () => {
    const versionEl = document.getElementById('app-version');
    const modeEl = document.getElementById('app-mode');
    const statusEl = document.getElementById('app-status');
    
    if (versionEl && window.CONFIG) {
      versionEl.textContent = window.CONFIG.version || '4.2.0';
    }
    
    if (modeEl && window.PWA) {
      modeEl.textContent = window.PWA.isPWA() ? 'PWA (Installed)' : 'Browser';
      modeEl.style.color = window.PWA.isPWA() ? 'var(--accent-success)' : 'var(--text-secondary)';
    }
    
    if (statusEl) {
      const updateStatus = () => {
        statusEl.textContent = navigator.onLine ? 'Online' : 'Offline';
        statusEl.style.color = navigator.onLine ? 'var(--accent-success)' : 'var(--accent-danger)';
      };
      updateStatus();
      window.addEventListener('online', updateStatus);
      window.addEventListener('offline', updateStatus);
    }
  });
})();
