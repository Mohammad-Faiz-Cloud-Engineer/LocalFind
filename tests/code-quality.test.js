/**
 * Code Quality Test Suite
 * Tests code standards, best practices, and maintainability
 * Run with: node tests/code-quality.test.js
 */

const fs = require('fs');
const path = require('path');

console.log('📊 Code Quality Tests\n');

let passed = 0;
let failed = 0;
let warnings = 0;

function test(name, condition, severity = 'error') {
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

// Test JavaScript files
console.log('⚙️  Testing JavaScript Files:\n');

const jsFiles = fs.readdirSync(path.join(__dirname, '..', 'js'))
  .filter(file => file.endsWith('.js'));

jsFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', 'js', file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  console.log(`\n📄 js/${file}:`);
  
  // Check for strict mode
  test(
    `   Uses strict mode`,
    content.includes("'use strict'") || content.includes('"use strict"'),
    'error'
  );
  
  // Check for console statements
  const consoleStatements = (content.match(/console\.(log|warn|error|info|debug)/g) || []).length;
  test(
    `   No console statements (found ${consoleStatements})`,
    consoleStatements === 0,
    'warning'
  );
  
  // Check for proper comments
  const hasComments = content.includes('/**') || content.includes('//');
  test(
    `   Has code comments`,
    hasComments,
    'warning'
  );
  
  // Check for IIFE pattern
  const hasIIFE = /\(function\s*\(\)\s*\{/.test(content);
  test(
    `   Uses IIFE pattern`,
    hasIIFE || content.length < 500, // Small files don't need IIFE
    'warning'
  );
  
  // Check for error handling
  const hasTryCatch = content.includes('try') && content.includes('catch');
  test(
    `   Has error handling`,
    hasTryCatch || content.length < 1000,
    'warning'
  );
  
  // Check function length (no function > 100 lines)
  const functions = content.match(/function\s+\w+\s*\([^)]*\)\s*\{/g) || [];
  test(
    `   Functions are reasonably sized`,
    functions.length === 0 || content.split('\n').length / functions.length < 100,
    'warning'
  );
});

// Test HTML files
console.log('\n\n📄 Testing HTML Files:\n');

const htmlFiles = fs.readdirSync(path.join(__dirname, '..'))
  .filter(file => file.endsWith('.html'));

htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  console.log(`\n📄 ${file}:`);
  
  // Check for proper DOCTYPE
  test(
    `   Has DOCTYPE`,
    content.trim().toLowerCase().startsWith('<!doctype html>'),
    'error'
  );
  
  // Check for charset
  test(
    `   Has charset declaration`,
    /<meta[^>]+charset=["']?utf-8["']?/i.test(content),
    'error'
  );
  
  // Check for viewport
  test(
    `   Has viewport meta tag`,
    /<meta[^>]+name=["']viewport["']/.test(content),
    'error'
  );
  
  // Check for semantic HTML
  test(
    `   Uses semantic HTML`,
    content.includes('<header') || content.includes('<nav') || content.includes('<main'),
    'warning'
  );
  
  // Check for external scripts (no inline)
  const inlineScripts = content.match(/<script(?![^>]*src=)[^>]*>[^<]+<\/script>/g) || [];
  test(
    `   No inline scripts (found ${inlineScripts.length})`,
    inlineScripts.length === 0,
    'error'
  );
});

// Test CSS files
console.log('\n\n🎨 Testing CSS Files:\n');

const cssFiles = fs.readdirSync(path.join(__dirname, '..', 'css'))
  .filter(file => file.endsWith('.css'));

cssFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', 'css', file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  console.log(`\n📄 css/${file}:`);
  
  // Check for CSS custom properties
  test(
    `   Uses CSS custom properties`,
    content.includes('--') && content.includes('var('),
    'warning'
  );
  
  // Check for media queries
  test(
    `   Has responsive design`,
    content.includes('@media'),
    'warning'
  );
  
  // Check for !important (should be minimal)
  const importantCount = (content.match(/!important/g) || []).length;
  test(
    `   Minimal use of !important (found ${importantCount})`,
    importantCount < 10,
    'warning'
  );
});

// Results
console.log('\n' + '='.repeat(70));
console.log('📊 Code Quality Test Results:');
console.log(`   ✅ Passed: ${passed}`);
console.log(`   ❌ Failed: ${failed}`);
console.log(`   ⚠️  Warnings: ${warnings}`);
console.log(`   📈 Quality Score: ${((passed / (passed + failed + warnings)) * 100).toFixed(1)}%`);
console.log('='.repeat(70));

if (failed === 0) {
  console.log('\n🎉 Code quality tests passed!');
  process.exit(0);
} else {
  console.log('\n❌ Some quality issues found.');
  process.exit(1);
}
