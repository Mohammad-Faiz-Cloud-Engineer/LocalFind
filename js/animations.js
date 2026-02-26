// animations.js — Intersection Observer + particles
(function(){
  function onVisible(entries){
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const el = entry.target; const d = el.dataset.animateDelay||0; setTimeout(()=>el.classList.add('is-visible'),d);
        observer.unobserve(el);
      }
    });
  }
  const observer = new IntersectionObserver(onVisible,{threshold:0.12});
  document.addEventListener('DOMContentLoaded', ()=>{
    document.querySelectorAll('[data-animate]').forEach(el=>observer.observe(el));
    // stats counters
    document.querySelectorAll('[data-target]').forEach(el=>observer.observe(el));
    // hero particles
    initParticles();
  });

  function initParticles(){
    const canvas = document.getElementById('hero-canvas'); if(!canvas) return;
    const ctx = canvas.getContext('2d'); let w, h; const dots=[]; resize(); window.addEventListener('resize', resize);
    function resize(){w=canvas.width=canvas.offsetWidth; h=canvas.height=canvas.offsetHeight; initDots();}
    function initDots(){dots.length=0; for(let i=0;i<40;i++){dots.push({x:Math.random()*w,y:Math.random()*h, vx:(Math.random()-.5)/2, vy:(Math.random()-.5)/2, r:Math.random()*2+0.6})}}
    function loop(){ctx.clearRect(0,0,w,h); for(let i=0;i<dots.length;i++){const a=dots[i]; a.x+=a.vx; a.y+=a.vy; if(a.x<0)a.x=w; if(a.x>w)a.x=0; if(a.y<0)a.y=h; if(a.y>h)a.y=0; ctx.fillStyle='rgba(78,205,196,0.9)'; ctx.beginPath(); ctx.arc(a.x,a.y,a.r,0,Math.PI*2); ctx.fill();}
      // lines
      for(let i=0;i<dots.length;i++){for(let j=i+1;j<dots.length;j++){const d1=dots[i], d2=dots[j]; const dist = Math.hypot(d1.x-d2.x,d1.y-d2.y); if(dist<120){ctx.strokeStyle='rgba(78,205,196,'+(1-dist/120)*0.12+')';ctx.beginPath();ctx.moveTo(d1.x,d1.y);ctx.lineTo(d2.x,d2.y);ctx.stroke();}}}
    requestAnimationFrame(loop);} loop();
  }
})();
