// form.js — multi-step form + validation
(function(){
  document.addEventListener('DOMContentLoaded', ()=>{
    // multi-step on add-business
    const form = document.getElementById('add-business-form');
    if(form){
      let step=1; const steps = form.querySelectorAll('.step');
      function show(s){steps.forEach((el,i)=>{el.classList.toggle('hidden', (i+1)!==s)});}
      form.addEventListener('click',(e)=>{
        const action = e.target.dataset.action; if(!action) return;
        if(action==='next'){step=Math.min(3,step+1); show(step);} if(action==='back'){step=Math.max(1,step-1); show(step);}    });
      // char counter
      const short = form.querySelector('textarea[name="short"]'); if(short){const cc= form.querySelector('.char-count'); short.addEventListener('input', ()=>cc.textContent=`${short.value.length}/200`)}
      form.addEventListener('submit',(e)=>{
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Basic validation
        if(!data.name || !data.phone || !data.category){
          alert('Please fill in all required fields.');
          return;
        }
        
        // In production, send to backend API
        // fetch('/api/business/submit', {method: 'POST', body: JSON.stringify(data)})
        
        form.innerHTML=`<div class="success"><h3>Thank you for your submission</h3><p>Your listing is currently under review. We will notify you at the email address provided within 24-48 hours.</p></div>`;
      });
    }

    // contact form
    const contact = document.getElementById('contact-form'); 
    if(contact){
      contact.addEventListener('submit', (e)=>{
        e.preventDefault();
        const formData = new FormData(contact);
        const data = Object.fromEntries(formData.entries());
        
        // Validate required fields
        if(!data.name || !data.email || !data.message){
          alert('Please fill in all required fields.');
          return;
        }
        
        // In production, send to backend API
        // fetch('/api/contact/submit', {method: 'POST', body: JSON.stringify(data)})
        
        contact.innerHTML='<div class="success"><h3>Message received</h3><p>Thank you for contacting us. We will respond to your inquiry within 24 hours.</p></div>';
      });
    }}

    // review form toggle
    document.getElementById('write-review')?.addEventListener('click', ()=>{document.getElementById('review-form')?.classList.toggle('hidden');});
  });
})();