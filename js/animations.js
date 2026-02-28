/**
 * Animations and Intersection Observer
 * Handles scroll-triggered animations and hero canvas particles
 * Optimized for hardware acceleration and smooth performance
 */
(function() {
  'use strict';
  
  // Performance optimization: Use passive event listeners
  const passiveSupported = (() => {
    let passive = false;
    try {
      const options = {
        get passive() {
          passive = true;
          return false;
        }
      };
      window.addEventListener('test', null, options);
      window.removeEventListener('test', null, options);
    } catch (err) {
      passive = false;
    }
    return passive;
  })();
  
  // Intersection Observer for scroll animations
  function onVisible(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.animateDelay || 0;
        setTimeout(() => el.classList.add('is-visible'), delay);
        observer.unobserve(el);
      }
    });
  }
  
  const observer = new IntersectionObserver(onVisible, { threshold: 0.12 });
  
  document.addEventListener('DOMContentLoaded', () => {
    // Observe all elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
    
    // Initialize hero particles
    initParticles();
  });

  /**
   * Initialize particle animation on hero canvas
   * Optimized for hardware acceleration
   */
  function initParticles() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    // Use 2d context with alpha for better performance
    const ctx = canvas.getContext('2d', { 
      alpha: true,
      desynchronized: true, // Reduce latency
      willReadFrequently: false
    });
    
    let width, height;
    const dots = [];
    let animationId;
    
    resize();
    window.addEventListener('resize', resize, passiveSupported ? { passive: true } : false);
    
    function resize() {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      initDots();
    }
    
    function initDots() {
      dots.length = 0;
      for (let i = 0; i < 40; i++) {
        dots.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) / 2,
          vy: (Math.random() - 0.5) / 2,
          r: Math.random() * 2 + 0.6
        });
      }
    }
    
    function loop() {
      // Use requestAnimationFrame for smooth 60fps animation
      animationId = requestAnimationFrame(loop);
      
      // Clear canvas efficiently
      ctx.clearRect(0, 0, width, height);
      
      // Batch operations for better performance
      ctx.save();
      
      // Draw and update dots
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        dot.x += dot.vx;
        dot.y += dot.vy;
        
        // Wrap around edges
        if (dot.x < 0) dot.x = width;
        if (dot.x > width) dot.x = 0;
        if (dot.y < 0) dot.y = height;
        if (dot.y > height) dot.y = 0;
        
        // Draw dot
        ctx.fillStyle = 'rgba(78, 205, 196, 0.9)';
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Draw connecting lines
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const d1 = dots[i];
          const d2 = dots[j];
          const dist = Math.hypot(d1.x - d2.x, d1.y - d2.y);
          
          if (dist < 120) {
            ctx.strokeStyle = `rgba(78, 205, 196, ${(1 - dist / 120) * 0.12})`;
            ctx.beginPath();
            ctx.moveTo(d1.x, d1.y);
            ctx.lineTo(d2.x, d2.y);
            ctx.stroke();
          }
        }
      }
      
      ctx.restore();
    }
    
    // Start animation
    loop();
    
    // Pause animation when page is hidden to save battery
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
      } else {
        if (!animationId) {
          loop();
        }
      }
    }, passiveSupported ? { passive: true } : false);
  }
})();

