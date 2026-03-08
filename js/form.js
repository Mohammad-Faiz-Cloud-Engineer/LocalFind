/**
 * Form Handling - Multi-step forms and validation
 * Handles business submission and contact forms
 */
(function() {
  'use strict';
  
  document.addEventListener('DOMContentLoaded', () => {
    // Multi-step form for add-business page
    const businessForm = document.getElementById('add-business-form');
    if (businessForm) {
      let currentStep = 1;
      const steps = businessForm.querySelectorAll('.step');
      
      function showStep(stepNumber) {
        steps.forEach((el, index) => {
          el.classList.toggle('hidden', (index + 1) !== stepNumber);
        });
      }
      
      businessForm.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        if (!action) return;
        
        if (action === 'next') {
          currentStep = Math.min(3, currentStep + 1);
          showStep(currentStep);
        }
        
        if (action === 'back') {
          currentStep = Math.max(1, currentStep - 1);
          showStep(currentStep);
        }
      });
      
      // Character counter for short description
      const shortTextarea = businessForm.querySelector('textarea[name="short"]');
      if (shortTextarea) {
        const charCount = businessForm.querySelector('.char-count');
        shortTextarea.addEventListener('input', () => {
          charCount.textContent = `${shortTextarea.value.length}/200`;
        });
      }
      
      businessForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(businessForm);
        const data = Object.fromEntries(formData.entries());
        
        // Basic validation
        if (!data.name || !data.phone || !data.category) {
          const errorMsg = document.createElement('div');
          errorMsg.className = 'error-message';
          errorMsg.textContent = 'Please fill in all required fields.';
          businessForm.insertBefore(errorMsg, businessForm.firstChild);
          setTimeout(() => errorMsg.remove(), 3000);
          return;
        }
        
        // In production, send to backend API
        // fetch('/api/business/submit', {method: 'POST', body: JSON.stringify(data)})
        
        businessForm.innerHTML = `
          <div class="success">
            <h3>Thank you for your submission</h3>
            <p>Your listing is currently under review. We will notify you at the email address provided within 24-48 hours.</p>
          </div>
        `;
      });
    }

    // Contact form
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
