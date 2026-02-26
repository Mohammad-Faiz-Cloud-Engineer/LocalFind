// map.js — Map embed helpers for business page
(function(){
  document.addEventListener('DOMContentLoaded', ()=>{
    const el = document.getElementById('biz-map'); if(!el) return;
    const params = new URLSearchParams(location.search); const id=params.get('id');
    const biz = window.LISTINGS.find(b=>b.id===id) || window.LISTINGS[0];
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(biz.mapLink)}`;
    iframe.loading = 'lazy'; iframe.style.width='100%'; iframe.style.height='250px'; el.appendChild(iframe);
  });
})();