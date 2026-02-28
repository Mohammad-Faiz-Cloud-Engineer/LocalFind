/**
 * Performance Optimization Module
 * Hardware acceleration and smooth rendering optimizations
 * 
 * @version 4.0.0
 * @updated 2026-02-28
 */

(function() {
  'use strict';
  
  /**
   * Enable hardware acceleration for smooth animations
   */
  function enableHardwareAcceleration() {
    // Force GPU compositing on key elements
    const elementsToAccelerate = [
      '.card',
      '.btn',
      '.category-card',
      '.navbar',
      '.hero',
      '.modal',
      '.search-modal',
      '.mobile-menu'
    ];
    
    elementsToAccelerate.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        // Apply hardware acceleration styles
        el.style.transform = 'translateZ(0)';
        el.style.backfaceVisibility = 'hidden';
        el.style.perspective = '1000px';
      });
    });
  }
  
  /**
   * Optimize images for faster loading
   */
  function optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      // Add loading="lazy" if not present
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
      
      // Add decoding="async" for better performance
      if (!img.hasAttribute('decoding')) {
        img.setAttribute('decoding', 'async');
      }
    });
  }
  
  /**
   * Optimize iframes for better performance
   */
  function optimizeIframes() {
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      // Add loading="lazy" if not present
      if (!iframe.hasAttribute('loading')) {
        iframe.setAttribute('loading', 'lazy');
      }
    });
  }
  
  /**
   * Use Intersection Observer for efficient lazy loading
   */
  function setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) return;
    
    const observerOptions = {
      root: null,
      rootMargin: '50px',
      threshold: 0.01
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          
          // Load images
          if (element.dataset.src) {
            element.src = element.dataset.src;
            element.removeAttribute('data-src');
          }
          
          // Load background images
          if (element.dataset.bgImage) {
            element.style.backgroundImage = `url(${element.dataset.bgImage})`;
            element.removeAttribute('data-bg-image');
          }
          
          observer.unobserve(element);
        }
      });
    }, observerOptions);
    
    // Observe lazy-load elements
    document.querySelectorAll('[data-src], [data-bg-image]').forEach(el => {
      observer.observe(el);
    });
  }
  
  /**
   * Reduce motion for users who prefer it
   */
  function respectReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      // Disable animations
      document.documentElement.style.setProperty('--transition-fast', '0ms');
      document.documentElement.style.setProperty('--transition-base', '0ms');
      document.documentElement.style.setProperty('--transition-slow', '0ms');
      
      // Stop canvas animations
      const canvas = document.getElementById('hero-canvas');
      if (canvas) {
        canvas.style.display = 'none';
      }
    }
  }
  
  /**
   * Optimize font loading
   */
  function optimizeFonts() {
    if ('fonts' in document) {
      // Preload critical fonts
      const criticalFonts = [
        { family: 'DM Sans', weight: '400' },
        { family: 'DM Sans', weight: '700' },
        { family: 'Syne', weight: '700' }
      ];
      
      criticalFonts.forEach(font => {
        document.fonts.load(`${font.weight} 16px "${font.family}"`);
      });
    }
  }
  
  /**
   * Enable passive event listeners for better scroll performance
   */
  function enablePassiveListeners() {
    // Check if passive is supported
    let passiveSupported = false;
    try {
      const options = {
        get passive() {
          passiveSupported = true;
          return false;
        }
      };
      window.addEventListener('test', null, options);
      window.removeEventListener('test', null, options);
    } catch (err) {
      passiveSupported = false;
    }
    
    // Store for use in other modules
    window.PASSIVE_SUPPORTED = passiveSupported;
  }
  
  /**
   * Optimize rendering with requestIdleCallback
   */
  function deferNonCriticalWork(callback) {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(callback, { timeout: 2000 });
    } else {
      setTimeout(callback, 1);
    }
  }
  
  /**
   * Monitor and log performance metrics
   */
  function monitorPerformance() {
    if (!('performance' in window)) return;
    
    // Log performance metrics after page load
    window.addEventListener('load', () => {
      deferNonCriticalWork(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData) {
          const metrics = {
            dns: perfData.domainLookupEnd - perfData.domainLookupStart,
            tcp: perfData.connectEnd - perfData.connectStart,
            ttfb: perfData.responseStart - perfData.requestStart,
            download: perfData.responseEnd - perfData.responseStart,
            domInteractive: perfData.domInteractive,
            domComplete: perfData.domComplete,
            loadComplete: perfData.loadEventEnd
          };
          
          // Log to console in development
          if (window.CONFIG && window.CONFIG.features && window.CONFIG.features.enableAnalytics) {
            console.log('[Performance] Page Load Metrics:', metrics);
          }
        }
      });
    }, { passive: true });
  }
  
  /**
   * Initialize all performance optimizations
   */
  function init() {
    // Enable passive listeners first
    enablePassiveListeners();
    
    // Respect user preferences
    respectReducedMotion();
    
    // Optimize fonts
    optimizeFonts();
    
    // Run after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        deferNonCriticalWork(() => {
          enableHardwareAcceleration();
          optimizeImages();
          optimizeIframes();
          setupIntersectionObserver();
        });
      });
    } else {
      deferNonCriticalWork(() => {
        enableHardwareAcceleration();
        optimizeImages();
        optimizeIframes();
        setupIntersectionObserver();
      });
    }
    
    // Monitor performance
    monitorPerformance();
  }
  
  // Initialize performance optimizations
  init();
  
  // Export for external use
  window.Performance = {
    enableHardwareAcceleration,
    optimizeImages,
    deferNonCriticalWork
  };
})();
