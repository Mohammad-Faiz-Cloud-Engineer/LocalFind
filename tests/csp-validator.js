/**
 * Content Security Policy Validator
 * Validates CSP configuration against best practices
 * Run with: node tests/csp-validator.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔒 CSP Configuration Validator\n');

// Read .htaccess file
const htaccessPath = path.join(__dirname, '..', '.htaccess');
let htaccessContent = '';

try {
  htaccessContent = fs.readFileSync(htaccessPath, 'utf8');
} catch (error) {
  console.error('❌ Error reading .htaccess file:', error.message);
  process.exit(1);
}

// Extract CSP header
const cspMatch = htaccessContent.match(/Content-Security-Policy\s+"([^"]+)"/);
if (!cspMatch) {
  console.error('❌ No Content-Security-Policy found in .htaccess');
  process.exit(1);
}

const csp = cspMatch[1];
console.log('📋 Found CSP Configuration:\n');
console.log(csp);
console.log('\n' + '='.repeat(70) + '\n');

// Parse CSP directives
const directives = {};
csp.split(';').forEach(directive => {
  const [key, ...values] = directive.trim().split(/\s+/);
  if (key) {
    directives[key] = values;
  }
});

let passed = 0;
let failed = 0;
let warnings = 0;

function check(name, condition, severity = 'error') {
  if (condition) {
    console.log(`✅ PASS: ${name}`);
    passed++;
  } else {
    if (severity === 'error') {
      console.log(`❌ FAIL: ${name}`);
      failed++;
    } else {
      console.log(`⚠️  WARN: ${name}`);
      warnings++;
    }
  }
}

console.log('🔍 CSP Security Checks:\n');

// Critical Security Checks
check(
  'No unsafe-inline in script-src',
  !directives['script-src']?.includes("'unsafe-inline'"),
  'error'
);

check(
  'No unsafe-eval in script-src',
  !directives['script-src']?.includes("'unsafe-eval'"),
  'error'
);

check(
  'No unsafe-inline in style-src',
  !directives['style-src']?.includes("'unsafe-inline'"),
  'error'
);

check(
  'default-src is defined',
  directives['default-src'] !== undefined,
  'error'
);

check(
  'script-src is defined',
  directives['script-src'] !== undefined,
  'error'
);

check(
  'style-src is defined',
  directives['style-src'] !== undefined,
  'error'
);

// Best Practice Checks
check(
  'img-src allows data: for inline images',
  directives['img-src']?.includes('data:'),
  'warning'
);

check(
  'connect-src is defined',
  directives['connect-src'] !== undefined,
  'warning'
);

check(
  'font-src is defined',
  directives['font-src'] !== undefined,
  'warning'
);

check(
  'frame-src is defined',
  directives['frame-src'] !== undefined,
  'warning'
);

// Check for overly permissive directives
check(
  'No wildcard (*) in script-src',
  !directives['script-src']?.includes('*'),
  'error'
);

check(
  'No wildcard (*) in default-src',
  !directives['default-src']?.includes('*'),
  'error'
);

// Check for HTTPS enforcement
check(
  'Uses https: for external resources',
  csp.includes('https:'),
  'warning'
);

// Validate specific directives
console.log('\n📊 Directive Analysis:\n');

Object.keys(directives).forEach(directive => {
  const values = directives[directive];
  console.log(`   ${directive}:`);
  values.forEach(value => {
    console.log(`      - ${value}`);
  });
});

// Check HTML files for inline CSP
console.log('\n🔍 Checking HTML files for CSP meta tags:\n');

const htmlFiles = ['index.html', 'about.html', 'contact.html', 'add-business.html'];
let htmlChecks = 0;

htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check for CSP meta tag
    const hasCspMeta = content.includes('Content-Security-Policy');
    
    // Check for inline scripts
    const hasInlineScripts = /<script(?![^>]*src=)[^>]*>/.test(content);
    
    // Check for inline event handlers
    const hasInlineEvents = /on\w+\s*=\s*["']/.test(content);
    
    console.log(`   ${file}:`);
    check(`   - Has CSP meta tag`, hasCspMeta, 'warning');
    check(`   - No inline scripts`, !hasInlineScripts, 'error');
    check(`   - No inline event handlers`, !hasInlineEvents, 'error');
    
    htmlChecks++;
  } catch (error) {
    console.log(`   ⚠️  Could not read ${file}`);
  }
});

// Results
console.log('\n' + '='.repeat(70));
console.log('📊 CSP Validation Results:');
console.log(`   ✅ Passed: ${passed}`);
console.log(`   ❌ Failed: ${failed}`);
console.log(`   ⚠️  Warnings: ${warnings}`);
console.log(`   📈 Security Score: ${((passed / (passed + failed + warnings)) * 100).toFixed(1)}%`);
console.log('='.repeat(70));

if (failed === 0) {
  console.log('\n🎉 CSP configuration is secure!');
  if (warnings > 0) {
    console.log(`⚠️  ${warnings} warning(s) found - consider addressing them.`);
  }
  process.exit(0);
} else {
  console.log('\n❌ CSP configuration has security issues. Please fix them.');
  process.exit(1);
}
