/**
 * Form Handling - Form validation and submission
 * Handles contact forms and review submissions
 * 
 * @version 4.3.0
 * @updated 2026-03-25
 */
(function() {
  'use strict';
  
  document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        // Validate required fields
        if (!data.name || !data.email || !data.message) {
          const errorMsg = document.createElement('div');
          errorMsg.className = 'error-message';
          errorMsg.textContent = 'Please fill in all required fields.';
          contactForm.insertBefore(errorMsg, contactForm.firstChild);
          setTimeout(() => errorMsg.remove(), 3000);
          return;
        }
        
        // In production, send to backend API
        // fetch('/api/contact/submit', {method: 'POST', body: JSON.stringify(data)})
        
        contactForm.innerHTML = `
          <div class="success">
            <h3>Message received</h3>
            <p>Thank you for contacting us. We will respond to your inquiry within 24 hours.</p>
          </div>
        `;
      });
    }
    
    // Review form toggle
    const writeReviewBtn = document.getElementById('write-review');
    if (writeReviewBtn) {
      writeReviewBtn.addEventListener('click', () => {
        const reviewForm = document.getElementById('review-form');
        if (reviewForm) {
          reviewForm.classList.toggle('hidden');
        }
      });
    }
  });
})();
