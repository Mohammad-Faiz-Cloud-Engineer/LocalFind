// counter.js — animated count-up triggered by intersection
(function(){
  function animateCount(el){
    const target = Number(el.dataset.target)||0; let v=0; const dur=1200; const start=performance.now(); function step(t){const p=Math.min(1,(t-start)/dur); el.textContent = Math.floor(p*target); if(p<1) requestAnimationFrame(step); else el.textContent=target; } requestAnimationFrame(step);
  }
  document.addEventListener('DOMContentLoaded', ()=>{
    const obs = new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){animateCount(e.target); obs.unobserve(e.target);}})},{threshold:0.3});
    document.querySelectorAll('.count, .num').forEach(el=>obs.observe(el));
  });
})();