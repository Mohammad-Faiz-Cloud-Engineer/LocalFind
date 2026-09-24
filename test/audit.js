const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const root = process.cwd();
const read = (file) => fs.readFileSync(`${root}/${file}`, 'utf8');

function loadData(now = '2026-03-19T20:00:00Z') {
  class FixedDate extends Date {
    constructor(...args) {
      super(...(args.length ? args : [now]));
    }
  }

  const document = {
    readyState: 'loading',
    addEventListener() {},
    createElement() {
      return {
        set textContent(value) {
          this.innerHTML = String(value).replace(/[&<>"']/g, character => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
          })[character]);
        },
        innerHTML: ''
      };
    },
    querySelector() { return null; },
    querySelectorAll() { return []; }
  };
  const sandbox = { window: {}, document, Date: FixedDate, Intl, console: { error() {}, warn() {} }, setInterval() {}, setTimeout() {} };
  sandbox.window.document = document;
  vm.createContext(sandbox);
  vm.runInContext(read('js/config.js'), sandbox, { filename: 'js/config.js' });
  vm.runInContext(read('js/data.js'), sandbox, { filename: 'js/data.js' });
  return sandbox;
}

function directoryResult(search) {
  const listeners = [];
  const elements = Object.fromEntries(['listings', 'results-count', 'load-more'].map(id => [id, {
    style: {},
    addEventListener() {},
    innerHTML: '',
    textContent: '',
    setAttribute() {},
    removeAttribute() {},
    toggleAttribute() {}
  }]));
  const sandbox = loadData();
  sandbox.URLSearchParams = URLSearchParams;
  sandbox.window.location = { search };
  sandbox.window.renderCard = business => business.id;
  sandbox.document.getElementById = id => elements[id] || null;
  sandbox.document.addEventListener = (event, listener) => {
    if (event === 'DOMContentLoaded') listeners.push(listener);
  };
  vm.runInContext(read('js/directory.js'), sandbox, { filename: 'js/directory.js' });
  listeners.forEach(listener => listener());
  return elements['results-count'].textContent;
}

const sandbox = loadData();
const listings = sandbox.window.LISTINGS;
const ids = new Set();
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const time = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

assert.equal(listings.length, 40);
assert.equal(new Set(listings.map(business => business.categorySlug)).size, 15);
for (const business of listings) {
  assert.match(business.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert(!ids.has(business.id), `duplicate listing id: ${business.id}`);
  ids.add(business.id);
  assert(Number.isFinite(business.coordinates?.lat) && Number.isFinite(business.coordinates?.lng));
  assert(Array.isArray(business.tags));
  days.forEach(day => assert(time.test(business.hours?.[day]?.open) && time.test(business.hours?.[day]?.close)));
  if (business.locatedInMall) {
    assert(listings.find(mall => mall.id === business.locatedInMall)?.tenants?.includes(business.id));
  }
}

assert.deepEqual(JSON.parse(JSON.stringify(sandbox.window.getISTTime())), {
  date: '2026-03-20T00:00:00.000Z', hours: 1, minutes: 30, day: 'fri'
});
assert.equal(sandbox.window.isBusinessNew({ addedDate: '2026-03-20' }), true);
assert.equal(sandbox.window.isBusinessNew({ addedDate: '2026-02-30' }), false);
assert.equal(directoryResult('?category=restaurants&search=csc'), 'Showing 0 of 0 businesses');
assert.equal(directoryResult('?search=!!!'), 'Showing 0 of 0 businesses');

const manifest = JSON.parse(read('manifest.json'));
assert.equal(manifest.start_url, './?source=pwa&v=4.3.9');
assert.equal(manifest.scope, './');
assert.match(read('js/pwa.js'), /serviceWorker\.register\('sw\.js'/);
assert.match(read('js/map-main.js'), /typeof L === 'undefined'/);
assert.doesNotMatch(read('js/map-main.js'), /optimizeMapPerformance\(\);\s*requestUserLocation\(\);\s*setupControls\(\);/);
assert.match(read('js/business-detail.js'), /Map unavailable offline/);
assert(!/fetch\(href, \{ method: 'HEAD' \}\)/.test(read('404.html') + read('500.html')));

console.log('Audit checks passed.');
