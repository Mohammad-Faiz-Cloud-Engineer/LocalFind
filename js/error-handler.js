/**
 * Global Error Handler
 * Catches and logs all JavaScript errors
 */

(function() {
  'use strict';

  const ERROR_LOG_KEY = 'localfind_errors';
  const MAX_STORED_ERRORS = 50;

  /**
   * Error logger
   */
  class ErrorLogger {
    constructor() {
      this.errors = this.loadErrors();
      this.setupHandlers();
    }

    /**
     * Load errors from localStorage
     */
    loadErrors() {
      try {
        const stored = localStorage.getItem(ERROR_LOG_KEY);
        return stored ? JSON.parse(stored) : [];
      } catch (e) {
        return [];
      }
    }

    /**
     * Save errors to localStorage
     */
    saveErrors() {
      try {
        // Keep only last MAX_STORED_ERRORS
        const toStore = this.errors.slice(-MAX_STORED_ERRORS);
        localStorage.setItem(ERROR_LOG_KEY, JSON.stringify(toStore));
      } catch (e) {
        // Storage full or unavailable
        console.warn('Could not save error log:', e);
      }
    }

    /**
     * Log an error
     */
    logError(error, context = {}) {
      const errorEntry = {
        timestamp: new Date().toISOString(),
        message: error.message || String(error),
        stack: error.stack || '',
        url: window.location.href,
        userAgent: navigator.userAgent,
        context: context
      };

      this.errors.push(errorEntry);
      this.saveErrors();

      // Log to console in development
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.error('Error logged:', errorEntry);
      }

      // In production, send to error tracking service
      // this.sendToErrorService(errorEntry);
    }

    /**
     * Setup global error handlers
     */
    setupHandlers() {
      // Catch uncaught errors
      window.addEventListener('error', (event) => {
        this.logError(event.error || new Error(event.message), {
          type: 'uncaught',
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno
        });
      });

      // Catch unhandled promise rejections
      window.addEventListener('unhandledrejection', (event) => {
        this.logError(
          event.reason instanceof Error ? event.reason : new Error(String(event.reason)),
          {
            type: 'unhandled_promise'
          }
        );
      });

      // Catch resource loading errors
      window.addEventListener('error', (event) => {
        if (event.target !== window) {
          this.logError(new Error(`Resource failed to load: ${event.target.src || event.target.href}`), {
            type: 'resource',
            element: event.target.tagName
          });
        }
      }, true);
    }

    /**
     * Get all logged errors
     */
    getErrors() {
      return [...this.errors];
    }

    /**
     * Clear error log
     */
    clearErrors() {
      this.errors = [];
      localStorage.removeItem(ERROR_LOG_KEY);
    }

    /**
     * Send error to remote logging service (placeholder)
     */
    sendToErrorService(errorEntry) {
      // In production, send to Sentry, LogRocket, or custom service
      // Example:
      // fetch('/api/log-error', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(errorEntry)
      // }).catch(() => {});
    }
  }

  /**
   * Safe function wrapper - catches errors in async functions
   */
  function safeAsync(fn) {
    return async function(...args) {
      try {
        return await fn.apply(this, args);
      } catch (error) {
        window.ErrorLogger.logError(error, {
          type: 'async_function',
          function: fn.name || 'anonymous'
        });
        throw error;
      }
    };
  }

  /**
   * Safe function wrapper - catches errors in sync functions
   */
  function safe(fn) {
    return function(...args) {
      try {
        return fn.apply(this, args);
      } catch (error) {
        window.ErrorLogger.logError(error, {
          type: 'sync_function',
          function: fn.name || 'anonymous'
        });
        throw error;
      }
    };
  }

  /**
   * Show user-friendly error message
   */
  function showErrorToUser(message = 'Something went wrong. Please try again.') {
    // Check if we already have an error toast
    if (document.getElementById('error-toast')) return;

    const toast = document.createElement('div');
    toast.id = 'error-toast';
    toast.className = 'error-toast';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    
    toast.innerHTML = `
      <div class="error-toast-content">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <span>${message}</span>
        <button class="error-toast-close" aria-label="Close error message">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    `;

    document.body.appendChild(toast);

    // Add styles if not already present
    if (!document.getElementById('error-toast-styles')) {
      const style = document.createElement('style');
      style.id = 'error-toast-styles';
      style.textContent = `
        .error-toast {
          position: fixed;
          top: 20px;
          right: 20px;
          background: rgba(220, 38, 38, 0.95);
          backdrop-filter: blur(12px);
          color: white;
          padding: 16px 20px;
          border-radius: var(--radius-lg);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
          z-index: 10001;
          animation: slideIn 0.3s ease;
          max-width: 400px;
        }
        
        .error-toast-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .error-toast-content i:first-child {
          font-size: 20px;
          flex-shrink: 0;
        }
        
        .error-toast-content span {
          flex: 1;
          font-size: 14px;
          line-height: 1.5;
        }
        
        .error-toast-close {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 4px;
          font-size: 16px;
          opacity: 0.8;
          transition: opacity 0.2s;
        }
        
        .error-toast-close:hover {
          opacity: 1;
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @media (max-width: 768px) {
          .error-toast {
            top: 10px;
            right: 10px;
            left: 10px;
            max-width: none;
          }
        }
      `;
      document.head.appendChild(style);
    }

    // Close button
    toast.querySelector('.error-toast-close').addEventListener('click', () => {
      toast.remove();
    });

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
    }, 5000);
  }

  // Initialize error logger
  const errorLogger = new ErrorLogger();

  // Export to window
  window.ErrorLogger = errorLogger;
  window.safeAsync = safeAsync;
  window.safe = safe;
  window.showErrorToUser = showErrorToUser;

  // Log initialization
  console.log('Error handler initialized');
})();
