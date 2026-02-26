// directory.js — filter, sort, search, render, pagination
(function(){
  const perPage = 6;
  let offset = 0;
  let current = [...window.LISTINGS];
  let view = 'grid';

  function applyQueryParams(){
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    const search = params.get('search');
    if(category) current = current.filter(b=>b.categorySlug===category);
    if(search) current = current.filter(b=>b.name.toLowerCase().includes(search.toLowerCase())||b.description.toLowerCase().includes(search.toLowerCase()));
  }

  function render(){
    const wrap = document.getElementById('listings');
    const slice = current.slice(0, offset+perPage);
    wrap.innerHTML = slice.map(b=>window.renderCard(b)).join('');
    document.getElementById('results-count').textContent = `Showing ${Math.min(slice.length,current.length)} of ${current.length} businesses`;
  }

  function init(){
    const params = new URLSearchParams(location.search);
    // populate category tabs
    const tabs = document.getElementById('category-tabs');
    const cats = [...new Set(window.LISTINGS.map(b=>b.category))];
    cats.forEach(c=>{const slug=c.toLowerCase().split(' ')[0];tabs.insertAdjacentHTML('beforeend',`<a href=\"directory.html?category=${slug}\">${c}</a>`)});

    applyQueryParams();
    offset = 0;
    document.getElementById('load-more')?.addEventListener('click', ()=>{ offset+=perPage; render(); });
    document.getElementById('sort-select')?.addEventListener('change', (e)=>{ const v=e.target.value; if(v==='rating') current.sort((a,b)=>b.rating-a.rating); if(v==='az') current.sort((a,b)=>a.name.localeCompare(b.name)); if(v==='newest') current = [...window.LISTINGS]; render(); });
    const searchInput = document.getElementById('filter-search');
    if(searchInput){let t;searchInput.addEventListener('input', (e)=>{clearTimeout(t); t=setTimeout(()=>{ const q=e.target.value; current = window.LISTINGS.filter(b=>b.name.toLowerCase().includes(q.toLowerCase())||b.description.toLowerCase().includes(q.toLowerCase())); offset=0; render(); },300)});
    }
    render();

    // view toggles
    document.getElementById('view-grid')?.addEventListener('click', ()=>{view='grid'; document.body.classList.remove('list-view'); document.getElementById('view-grid').classList.add('active'); document.getElementById('view-list').classList.remove('active');});
    document.getElementById('view-list')?.addEventListener('click', ()=>{view='list'; document.body.classList.add('list-view'); document.getElementById('view-list').classList.add('active'); document.getElementById('view-grid').classList.remove('active');});
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    try{
      init();
    }catch(error){
      console.error('Directory initialization error:', error);
    }
  });
})();
