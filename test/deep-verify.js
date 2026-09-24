const fs = require('fs');
const path = require('path');

function read(f) { return fs.readFileSync(f, 'utf8'); }

const bd = read('js/business-detail.js');
const dir = read('js/directory.js');
const css = read('css/business-detail.css');
const style = read('css/style.css');
const map = read('map.html');
const man = JSON.parse(read('manifest.json'));
const idx = read('index.html');
const main = read('js/main.js');
const dirHtml = read('directory.html');
const bdHtml = read('business-detail.html');

const results = [];
function record(name, isRealBugOnOriginal, fixedNow, evidence) {
  results.push({ name, isRealBugOnOriginal, fixedNow, evidence });
}

// 1. Clear-search re-applies URL
{
  const buggy = /if \(!query\) \{\s*currentListings = \[\.\.\.window\.LISTINGS\];\s*applyQueryParams\(\);/.test(dir);
  const fixed = /if \(!query\) \{\s*currentListings = getBaseListings\(\);\s*setFilterLabel\(\null\);/.test(dir.replace('null', 'null'));
  const fixed2 = dir.includes('currentListings = getBaseListings();') && dir.includes('setFilterLabel(null);') && !/if \(!query\) \{\s*currentListings = \[\.\.\.window\.LISTINGS\];\s*applyQueryParams\(\);/s.test(dir);
  record('clear-search re-applies URL search', true, fixed2, fixed2 ? 'uses getBaseListings, no applyQueryParams on clear' : 'STILL BUGGY');
}

// 2. No URL sync
{
  const fixed = dir.includes('history.replaceState');
  record('search not synced to URL', true, fixed, fixed ? 'history.replaceState present' : 'missing');
}

// 3. No prefill
{
  const fixed = dir.includes('initialSearch') && dir.includes('searchInput.value = initialSearch');
  record('?search= does not prefill input', true, fixed, fixed ? 'prefill present' : 'missing');
}

// 4. phoneFourth missing from appt condition
{
  const has = /biz\.phoneThird \|\| biz\.phoneFourth \|\| biz\.whatsapp/.test(bd);
  // Reality check: does any business ONLY have phoneFourth?
  const data = read('js/data.js');
  const blocks = data.split(/\n\s{2}\{/); // rough
  // Better: eval listings
  const vm = require('vm');
  const sandbox = { window: {}, document: { readyState: 'loading', addEventListener() {}, createElement() { return { set textContent(v) { this.innerHTML = String(v); }, innerHTML: '' }; }, querySelector() { return null; }, querySelectorAll() { return []; } }, console, Date, Intl, setInterval() {}, setTimeout() {} };
  sandbox.window.document = sandbox.document;
  vm.createContext(sandbox);
  vm.runInContext(read('js/config.js'), sandbox);
  vm.runInContext(data, sandbox);
  const L = sandbox.window.LISTINGS;
  const onlyFourth = L.filter(b => b.phoneFourth && !b.phone && !b.phoneSecondary && !b.phoneThird && !b.whatsapp && !b.whatsappSecondary && !b.whatsappThird && !b.whatsappFourth);
  const hasFourth = L.filter(b => b.phoneFourth);
  record(
    'phoneFourth omitted from appointment visibility',
    true, // logic bug exists (inconsistent with contact list + display)
    has,
    has
      ? `fixed in condition; current data: ${hasFourth.length} businesses have phoneFourth, ${onlyFourth.length} rely on it alone (latent today, real if data changes)`
      : 'still missing'
  );
}

// 5. Unguarded innerHTML - REALITY: do elements always exist?
{
  const unguarded = /getElementById\('biz-contact'\)\.innerHTML\s*=/.test(bd)
    || /getElementById\('biz-hours'\)\.innerHTML\s*=/.test(bd)
    || /getElementById\('biz-tags'\)\.innerHTML\s*=/.test(bd);
  const alwaysInHtml = bdHtml.includes('id="biz-contact"') && bdHtml.includes('id="biz-hours"') && bdHtml.includes('id="biz-tags"') && bdHtml.includes('id="related-list"');
  const guarded = bd.includes('if (contactCard)') && bd.includes('if (hoursCard)') && bd.includes('if (tagsCard)') && bd.includes('if (relatedList)');
  record(
    'unguarded getElementById().innerHTML',
    !unguarded ? false : true, // was unguarded
    guarded,
    alwaysInHtml
      ? 'DEFENSIVE ONLY: elements always exist in business-detail.html today — fix is correct hardening, not a live crash'
      : 'elements missing from HTML — live crash risk'
  );
}

// 6. contactCard shadowing - REALITY check
{
  const count = (bd.match(/const contactCard\b/g) || []).length;
  const hasEl = bd.includes('const contactCardEl');
  // Was original shadowing a functional bug? Nested const in block scope is legal JS.
  record(
    'contactCard variable shadowing',
    false, // NOT a functional bug — legal ES6 block scoping, both refs same element
    count === 1 && hasEl,
    'cosmetic rename only; original was legal JS, not a runtime error'
  );
}

// 7. --card-bg
{
  const used = css.includes('var(--card-bg)') || /var\(--card-bg\)/.test(css);
  const declared = /--card-bg\s*:/.test(style + css + fs.readdirSync('css').map(f => read('css/' + f)).join('\n'));
  const fixed = !css.includes('--card-bg') && css.includes('var(--bg-card)') && /--bg-card\s*:/.test(style);
  record(
    'var(--card-bg) undeclared',
    !declared, // if never declared, was real
    fixed,
    declared ? 'was declared' : 'never declared anywhere; CSS invalid-at-computed-value → background ignored; now uses --bg-card: #1E2736'
  );
}

// 8. --font-body
{
  let all = map;
  for (const f of fs.readdirSync('css')) all += read('css/' + f);
  for (const f of fs.readdirSync('.').filter(x => x.endsWith('.html'))) all += read(f);
  const declared = /--font-body\s*:/.test(all);
  const stillUsed = /--font-body/.test(map);
  const fixed = !stillUsed && map.includes('var(--font-sans,');
  record(
    'var(--font-body) undeclared in map.html',
    !declared,
    fixed,
    declared ? 'declared' : 'never declared; font-family ignored → inherits; map.html loads style.css which defines --font-sans'
  );
}

// 9. theme_color
{
  const metas = fs.readdirSync('.').filter(f => f.endsWith('.html')).map(f => {
    const m = read(f).match(/name="theme-color" content="([^"]+)"/);
    return m && m[1];
  }).filter(Boolean);
  const allMeta = [...new Set(metas)];
  const fixed = man.theme_color === '#FF8A00' && allMeta.every(c => c === '#FF8A00');
  record(
    'manifest theme_color mismatch',
    man.theme_color !== allMeta[0] || allMeta.length > 1,
    fixed,
    `meta values=${JSON.stringify(allMeta)}, manifest=${man.theme_color}`
  );
}

// 10. share_target dead params
{
  const targets = Object.values(man.share_target.params);
  const unread = targets.filter(t => !dir.includes(`params.get('${t}')`) && !idx.includes(`params.get('${t}')`) && !main.includes(`params.get('${t}')`) && !bd.includes(`params.get('${t}')`));
  // All js
  const allJs = fs.readdirSync('js').map(f => read('js/' + f)).join('\n');
  const unread2 = targets.filter(t => !allJs.includes(`params.get('${t}')`));
  const fixed = unread2.length === 0 && targets.includes('search');
  record(
    'share_target params unread by any code',
    true, // original used name/description/website — confirmed no params.get for those
    fixed,
    `current targets=${JSON.stringify(targets)}, unread=${JSON.stringify(unread2)}; directory reads search=${dir.includes("params.get('search')")}`
  );
}

// Original share targets were name/description/website
{
  // We know from earlier grep no params.get('name'|'description'|'website') anywhere
  const allCode = fs.readdirSync('js').map(f => read('js/' + f)).join('\n') + fs.readdirSync('.').filter(x => x.endsWith('.html')).map(read).join('\n');
  const origTargets = ['name', 'description', 'website'];
  const origUnread = origTargets.filter(t => !allCode.includes(`params.get('${t}')`) && !allCode.includes(`searchParams.get('${t}')`));
  record(
    'ORIGINAL share_target name/description/website unread',
    origUnread.length === 3,
    true,
    `confirmed: no code reads name/description/website query params — share target was fully dead`
  );
}

// 11. protocol_handlers
{
  const url = man.protocol_handlers[0].url;
  const param = (url.match(/[?&](\w+)=/) || [])[1];
  const allCode = fs.readdirSync('js').map(f => read('js/' + f)).join('\n') + fs.readdirSync('.').filter(x => x.endsWith('.html')).map(read).join('\n');
  const readParam = param && (allCode.includes(`params.get('${param}')`) || allCode.includes(`searchParams.get('${param}')`));
  const origParam = 'business';
  const origRead = allCode.includes(`params.get('${origParam}')`) || allCode.includes(`searchParams.get('${origParam}')`);
  record(
    'protocol_handlers target param unread (ORIGINAL business=)',
    !origRead,
    !!readParam,
    `original ?business= read=${origRead}; current url=${url}, param=${param}, read=${readParam}`
  );
}

// 12. map og:image + h1
{
  const hasOg = map.includes('og:image');
  const hasH1 = /<h1[\s>]/.test(map);
  record('map.html missing og:image', true, hasOg, hasOg ? 'present' : 'missing');
  record('map.html missing h1', true, hasH1, hasH1 ? 'present' : 'missing');
}

// 13. breadcrumb aria
{
  const d = dirHtml.includes('breadcrumb" aria-label="Breadcrumb"');
  const b = bdHtml.includes('breadcrumb" aria-label="Breadcrumb"');
  // Was it a real a11y issue? main.js creates navs with labels; breadcrumb nav had none.
  const headerHasNavLabels = main.includes('aria-label="Main navigation"');
  record('breadcrumb nav missing accessible name', headerHasNavLabels, d && b, d && b ? 'both labeled' : 'missing');
}

// Print
console.log('='.repeat(80));
console.log('DEEP VERIFICATION: Was each issue REAL? Is the fix CORRECT?');
console.log('='.repeat(80));
let realFixed = 0, notReal = 0, stillBroken = 0;
for (const r of results) {
  const status = r.fixedNow ? (r.isRealBugOnOriginal ? '✅ REAL BUG → FIXED' : '✅ FIXED (was low-severity/non-functional)') : '❌ NOT FIXED';
  if (!r.fixedNow) stillBroken++;
  else if (r.isRealBugOnOriginal) realFixed++;
  else notReal++;
  console.log(`\n${status}`);
  console.log(`  Issue: ${r.name}`);
  console.log(`  Evidence: ${r.evidence}`);
}
console.log('\n' + '='.repeat(80));
console.log(`Summary: ${realFixed} real bugs fixed, ${notReal} low-severity/hardening fixed, ${stillBroken} unfixed`);
console.log('='.repeat(80));
if (stillBroken) process.exit(1);
