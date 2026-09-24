const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const root = process.cwd();
const read = (file) => fs.readFileSync(`${root}/${file}`, 'utf8');

function loadData() {
  const document = {
    readyState: 'loading',
    addEventListener() {},
    createElement() {
      return {
        set textContent(value) {
          this.innerHTML = String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
        },
        innerHTML: '',
      };
    },
    querySelector() { return null; },
    querySelectorAll() { return []; },
  };
  const sandbox = { window: {}, document, Date, Intl, console, setInterval() {}, setTimeout() {}, navigator: {} };
  sandbox.window.document = document;
  vm.createContext(sandbox);
  vm.runInContext(read('js/config.js'), sandbox, { filename: 'js/config.js' });
  vm.runInContext(read('js/data.js'), sandbox, { filename: 'js/data.js' });
  return sandbox;
}

function runDirectory({ search = '', inputEvents = [] } = {}) {
  const listeners = [];
  const elements = {};
  const mk = (id) => ({ id, style: {}, value: '', textContent: '', innerHTML: '', attributes: {}, listeners: {},
    addEventListener(ev, fn) { (this.listeners[ev] ||= []).push(fn); },
    setAttribute(k, v) { this.attributes[k] = v; },
    removeAttribute(k) { delete this.attributes[k]; },
    toggleAttribute(k, on) { if (on) this.attributes[k] = ''; else delete this.attributes[k]; },
    querySelectorAll() { return []; },
    querySelector() { return null; },
    dispatchEvent(e) { (this.listeners.input || []).forEach((fn) => fn({ target: this })); },
    focus() {},
    contains() { return false; },
  });
  for (const id of ['listings', 'results-count', 'load-more', 'filter-search', 'search-tips-btn', 'search-tips-tooltip', 'search-tips-close']) {
    elements[id] = mk(id);
  }

  const historyCalls = [];
  const sandbox = loadData();
  sandbox.URLSearchParams = URLSearchParams;
  sandbox.URL = URL;
  sandbox.window.location = {
    search,
    href: 'https://example.test/LocalFind/directory.html' + search,
  };
  sandbox.history = { replaceState(state, title, url) { historyCalls.push(String(url)); sandbox.window.location.href = String(url); sandbox.window.location.search = new URL(String(url)).search; } };
  sandbox.window.renderCard = (b) => b.id;
  sandbox.document.getElementById = (id) => elements[id] || null;
  sandbox.document.addEventListener = (event, listener) => {
    if (event === 'DOMContentLoaded') listeners.push(listener);
  };
  sandbox.Event = class Event { constructor(type) { this.type = type; } };
  vm.runInContext(read('js/directory.js'), sandbox, { filename: 'js/directory.js' });
  listeners.forEach((l) => l());

  // Fire input events after init
  const input = elements['filter-search'];
  for (const value of inputEvents) {
    input.value = value;
    // Flush debounce: directory uses setTimeout 300ms. Invoke listeners synchronously
    // by calling with a stubbed immediate timeout.
    (input.listeners.input || []).forEach((fn) => fn({ target: input }));
  }

  return { elements, historyCalls, sandbox };
}

// --- Bug 1: ?search= prefills the input on load ---
{
  const { elements } = runDirectory({ search: '?search=csc' });
  assert.equal(elements['filter-search'].value, 'csc', 'search input should be prefilled from URL');
  console.log('PASS: ?search= prefills input');
}

// --- Bug 1b: results filtered by initial search ---
{
  const { elements } = runDirectory({ search: '?search=hospital' });
  assert.match(elements['results-count'].textContent, /Showing \d+ of \d+ businesses/);
  const m = elements['results-count'].textContent.match(/of (\d+) businesses/);
  assert.ok(Number(m[1]) > 0 && Number(m[1]) < 40, 'hospital search should narrow results, got ' + m[1]);
  console.log('PASS: initial ?search= filters results (' + m[1] + ')');
}

// --- Bug 2: clearing search does NOT re-apply stale URL search ---
// Load with ?search=hospital, then clear input → should show base (category only, no search)
{
  // Simulate: page loaded with search, then user clears.
  // We need debounce flush: patch setTimeout to run immediately for this run.
  const listeners = [];
  const elements = {};
  const mk = (id) => ({ id, style: {}, value: '', textContent: '', innerHTML: '', attributes: {}, listeners: {},
    addEventListener(ev, fn) { (this.listeners[ev] ||= []).push(fn); },
    setAttribute(k, v) { this.attributes[k] = v; },
    removeAttribute(k) { delete this.attributes[k]; },
    toggleAttribute(k, on) { if (on) this.attributes[k] = ''; else delete this.attributes[k]; },
    querySelectorAll() { return []; },
    querySelector() { return null; },
    focus() {},
    contains() { return false; },
  });
  for (const id of ['listings', 'results-count', 'load-more', 'filter-search', 'search-tips-btn', 'search-tips-tooltip', 'search-tips-close']) {
    elements[id] = mk(id);
  }

  const historyCalls = [];
  const sandbox = loadData();
  sandbox.URLSearchParams = URLSearchParams;
  sandbox.URL = URL;
  const loc = { search: '?search=hospital', href: 'https://example.test/LocalFind/directory.html?search=hospital' };
  sandbox.window.location = loc;
  sandbox.history = {
    replaceState(state, title, url) {
      historyCalls.push(String(url));
      loc.href = String(url);
      loc.search = new URL(String(url)).search;
    },
  };
  sandbox.window.renderCard = (b) => b.id;
  sandbox.document.getElementById = (id) => elements[id] || null;
  sandbox.document.addEventListener = (event, listener) => {
    if (event === 'DOMContentLoaded') listeners.push(listener);
  };
  sandbox.Event = class Event { constructor(type) { this.type = type; } };
  // Make setTimeout immediate so debounce flushes sync
  sandbox.setTimeout = (fn) => { fn(); return 1; };
  sandbox.clearTimeout = () => {};
  vm.runInContext(read('js/directory.js'), sandbox, { filename: 'js/directory.js' });
  listeners.forEach((l) => l());

  const afterLoad = elements['results-count'].textContent;
  const loadCount = Number(afterLoad.match(/of (\d+) businesses/)[1]);
  assert.ok(loadCount > 0 && loadCount < 40, 'precondition: filtered on load, got ' + loadCount);

  // Clear the search box
  elements['filter-search'].value = '';
  (elements['filter-search'].listeners.input || []).forEach((fn) => fn({ target: elements['filter-search'] }));

  const afterClear = elements['results-count'].textContent;
  const clearCount = Number(afterClear.match(/of (\d+) businesses/)[1]);
  assert.equal(clearCount, 40, `clearing search should show all 40 base listings, got ${clearCount} (${afterClear})`);
  assert.ok(historyCalls.length > 0, 'history.replaceState should have been called');
  assert.ok(!historyCalls[historyCalls.length - 1].includes('search='), 'URL should drop search param on clear');
  console.log('PASS: clear search no longer re-applies URL search (40 listings, URL cleaned)');
}

// --- Bug 3: typing search updates URL ---
{
  const listeners = [];
  const elements = {};
  const mk = (id) => ({ id, style: {}, value: '', textContent: '', innerHTML: '', attributes: {}, listeners: {},
    addEventListener(ev, fn) { (this.listeners[ev] ||= []).push(fn); },
    setAttribute(k, v) { this.attributes[k] = v; },
    removeAttribute(k) { delete this.attributes[k]; },
    toggleAttribute(k, on) { if (on) this.attributes[k] = ''; else delete this.attributes[k]; },
    querySelectorAll() { return []; },
    querySelector() { return null; },
    focus() {},
    contains() { return false; },
  });
  for (const id of ['listings', 'results-count', 'load-more', 'filter-search', 'search-tips-btn', 'search-tips-tooltip', 'search-tips-close']) {
    elements[id] = mk(id);
  }
  const historyCalls = [];
  const sandbox = loadData();
  sandbox.URLSearchParams = URLSearchParams;
  sandbox.URL = URL;
  const loc = { search: '', href: 'https://example.test/LocalFind/directory.html' };
  sandbox.window.location = loc;
  sandbox.history = {
    replaceState(state, title, url) {
      historyCalls.push(String(url));
      loc.href = String(url);
      loc.search = new URL(String(url)).search;
    },
  };
  sandbox.window.renderCard = (b) => b.id;
  sandbox.document.getElementById = (id) => elements[id] || null;
  sandbox.document.addEventListener = (event, listener) => {
    if (event === 'DOMContentLoaded') listeners.push(listener);
  };
  sandbox.Event = class Event { constructor(type) { this.type = type; } };
  sandbox.setTimeout = (fn) => { fn(); return 1; };
  sandbox.clearTimeout = () => {};
  vm.runInContext(read('js/directory.js'), sandbox, { filename: 'js/directory.js' });
  listeners.forEach((l) => l());

  elements['filter-search'].value = 'pharmacy';
  (elements['filter-search'].listeners.input || []).forEach((fn) => fn({ target: elements['filter-search'] }));
  assert.ok(historyCalls.some((u) => u.includes('search=pharmacy')), 'typing should write search= to URL, calls=' + JSON.stringify(historyCalls));
  console.log('PASS: typing search syncs URL');
}

// --- Bug 4: category filter preserved when clearing search ---
{
  const listeners = [];
  const elements = {};
  const mk = (id) => ({ id, style: {}, value: '', textContent: '', innerHTML: '', attributes: {}, listeners: {},
    addEventListener(ev, fn) { (this.listeners[ev] ||= []).push(fn); },
    setAttribute(k, v) { this.attributes[k] = v; },
    removeAttribute(k) { delete this.attributes[k]; },
    toggleAttribute(k, on) { if (on) this.attributes[k] = ''; else delete this.attributes[k]; },
    querySelectorAll() { return []; },
    querySelector() { return null; },
    focus() {},
    contains() { return false; },
  });
  for (const id of ['listings', 'results-count', 'load-more', 'filter-search', 'search-tips-btn', 'search-tips-tooltip', 'search-tips-close']) {
    elements[id] = mk(id);
  }
  const sandbox = loadData();
  sandbox.URLSearchParams = URLSearchParams;
  sandbox.URL = URL;
  const loc = { search: '?category=restaurants&search=pizza', href: 'https://example.test/LocalFind/directory.html?category=restaurants&search=pizza' };
  sandbox.window.location = loc;
  sandbox.history = { replaceState(state, title, url) { loc.href = String(url); loc.search = new URL(String(url)).search; } };
  sandbox.window.renderCard = (b) => b.id;
  sandbox.document.getElementById = (id) => elements[id] || null;
  sandbox.document.addEventListener = (event, listener) => {
    if (event === 'DOMContentLoaded') listeners.push(listener);
  };
  sandbox.Event = class Event { constructor(type) { this.type = type; } };
  sandbox.setTimeout = (fn) => { fn(); return 1; };
  sandbox.clearTimeout = () => {};
  vm.runInContext(read('js/directory.js'), sandbox, { filename: 'js/directory.js' });
  listeners.forEach((l) => l());

  // Clear search → should still be category-filtered (restaurants = 8), not all 40
  elements['filter-search'].value = '';
  (elements['filter-search'].listeners.input || []).forEach((fn) => fn({ target: elements['filter-search'] }));
  const count = Number(elements['results-count'].textContent.match(/of (\d+) businesses/)[1]);
  assert.equal(count, 8, `clearing search with ?category=restaurants should leave 8 restaurants, got ${count}`);
  console.log('PASS: clearing search preserves category filter (8 restaurants)');
}

// --- Bug 5: phoneFourth included in appointment condition ---
{
  const src = read('js/business-detail.js');
  assert.match(src, /biz\.phone \|\| biz\.phoneSecondary \|\| biz\.phoneThird \|\| biz\.phoneFourth \|\| biz\.whatsapp/, 'phoneFourth must be in appointment visibility condition');
  console.log('PASS: phoneFourth in appointment condition');
}

// --- Bug 6: null guards present ---
{
  const src = read('js/business-detail.js');
  assert.match(src, /if \(contactCard\) contactCard\.innerHTML/);
  assert.match(src, /if \(hoursCard\) hoursCard\.innerHTML/);
  assert.match(src, /if \(tagsCard\) tagsCard\.innerHTML/);
  assert.match(src, /if \(relatedList\) \{/);
  // No unguarded direct assignment left
  assert.doesNotMatch(src, /document\.getElementById\('biz-contact'\)\.innerHTML\s*=/);
  assert.doesNotMatch(src, /document\.getElementById\('biz-hours'\)\.innerHTML\s*=/);
  assert.doesNotMatch(src, /document\.getElementById\('biz-tags'\)\.innerHTML\s*=/);
  console.log('PASS: all null guards in place');
}

// --- Bug 7: no variable shadowing of contactCard ---
{
  const src = read('js/business-detail.js');
  const matches = src.match(/const contactCard\b/g) || [];
  assert.equal(matches.length, 1, `expected exactly one const contactCard, found ${matches.length}`);
  assert.match(src, /const contactCardEl\b/);
  console.log('PASS: contactCard no longer shadowed');
}

// --- Bug 8: CSS vars ---
{
  assert.equal((read('css/business-detail.css').match(/--card-bg/g) || []).length, 0, '--card-bg should be gone');
  assert.match(read('css/business-detail.css'), /var\(--bg-card\)/);
  assert.match(read('css/style.css'), /--bg-card:/);
  const map = read('map.html');
  assert.equal((map.match(/--font-body/g) || []).length, 0, '--font-body should be gone');
  assert.match(map, /var\(--font-sans,/);
  console.log('PASS: CSS custom properties fixed');
}

// --- Bug 9: manifest ---
{
  const m = JSON.parse(read('manifest.json'));
  assert.equal(m.theme_color, '#FF8A00', 'theme_color must match meta theme-color');
  // share_target must produce a param directory.js actually reads
  const dir = read('js/directory.js');
  for (const target of Object.values(m.share_target.params)) {
    assert.match(dir, new RegExp(`params\\.get\\('${target}'\\)`), `directory.js must read share_target param '${target}'`);
  }
  // protocol handler must target a page that reads search
  const protoUrl = m.protocol_handlers[0].url;
  assert.match(protoUrl, /directory\.html\?search=%s/, 'protocol handler must land on directory search');
  assert.match(dir, /params\.get\('search'\)/);
  assert.doesNotMatch(read('index.html'), /params\.get\('business'\)|business=%s/, 'old dead business= handler must not remain the only target');
  console.log('PASS: manifest theme_color, share_target, protocol_handlers all wired correctly');
}

// --- Bug 10: map.html a11y/meta ---
{
  const map = read('map.html');
  assert.match(map, /<h1[^>]*>.*Map.*<\/h1>/s, 'map needs an h1');
  assert.match(map, /property="og:image"/, 'map needs og:image');
  console.log('PASS: map.html h1 + og:image');
}

// --- Bug 11: breadcrumb aria-label ---
{
  assert.match(read('directory.html'), /<nav class="breadcrumb" aria-label="Breadcrumb">/);
  assert.match(read('business-detail.html'), /<nav class="breadcrumb" aria-label="Breadcrumb">/);
  console.log('PASS: breadcrumb aria-labels');
}

// --- Regression: existing audit suite still passes ---
{
  // already run separately; just re-assert counts
  const sandbox = loadData();
  assert.equal(sandbox.window.LISTINGS.length, 40);
  console.log('PASS: data regression (40 listings)');
}

console.log('\nAll verification checks passed.');
