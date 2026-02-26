/**
 * Animations and Intersection Observer
 * Handles scroll-triggered animations and hero canvas particles
 */
(function() {
  'use strict';
  
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
    
    // Observe counter elements
    document.querySelectorAll('[data-target]').forEach(el => observer.observe(el));
    
    // Initialize hero particles
    initParticles();
  });

  /**
   * Initialize particle animation on hero canvas
   */
  function initParticles() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    const dots = [];
    
    resize();
    window.addEventListener('resize', resize);
    
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
      ctx.clearRect(0, 0, width, height);
      
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
      
      requestAnimationFrame(loop);
    }
    
    loop();
  }
})();

