/**
 * Counter Animation
 * Animated count-up triggered by intersection observer
 */
(function() {
  'use strict';
  
  /**
   * Animate counter from 0 to target value
   * @param {HTMLElement} el - Element containing data-target attribute
   */
  function animateCount(el) {
    const target = Number(el.dataset.target) || 0;
    const duration = 1200;
    const start = performance.now();
    
    function step(timestamp) {
      const progress = Math.min(1, (timestamp - start) / duration);
      el.textContent = Math.floor(progress * target);
      
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    
    requestAnimationFrame(step);
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    
    document.querySelectorAll('.count, .num').forEach(el => observer.observe(el));
  });
})();
