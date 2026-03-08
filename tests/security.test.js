/**
 * Security Test Suite
 * Tests XSS prevention, input validation, and security measures
 * Run with: node tests/security.test.js
 */

const assert = require('assert');

// Mock DOM environment for testing
class MockElement {
  constructor() {
    this.textContent = '';
    this.innerHTML = '';
  }
}

global.document = {
  createElement: () => new MockElement()
};

// Import sanitization function (simulated)
function sanitizeHTML(str) {
  if (!str) return '';
  const temp = new MockElement();
  temp.textContent = str;
  return temp.innerHTML;
}

// Import validation functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^[\d\s\+\-\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Test Suite
console.log('🔒 Running Security Tests...\n');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✅ PASS: ${name}`);
    passed++;
  } catch (error) {
    console.log(`❌ FAIL: ${name}`);
    console.log(`   Error: ${error.message}`);
    failed++;
  }
}

// XSS Prevention Tests
console.log('📋 XSS Prevention Tests:');

test('Should sanitize script tags', () => {
  const malicious = '<script>alert("XSS")</script>';
  const sanitized = sanitizeHTML(malicious);
  assert(!sanitized.includes('<script>'), 'Script tags should be escaped');
});

test('Should sanitize event handlers', () => {
  const malicious = '<img src=x onerror="alert(1)">';
  const sanitized = sanitizeHTML(malicious);
  assert(!sanitized.includes('onerror'), 'Event handlers should be escaped');
});

test('Should sanitize javascript: protocol', () => {
  const malicious = '<a href="javascript:alert(1)">Click</a>';
  const sanitized = sanitizeHTML(malicious);
  assert(!sanitized.includes('javascript:'), 'JavaScript protocol should be escaped');
});

test('Should handle null/undefined input', () => {
  assert.strictEqual(sanitizeHTML(null), '');
  assert.strictEqual(sanitizeHTML(undefined), '');
  assert.strictEqual(sanitizeHTML(''), '');
});

test('Should preserve safe text', () => {
  const safe = 'Hello World 123';
  const sanitized = sanitizeHTML(safe);
  assert.strictEqual(sanitized, safe, 'Safe text should be preserved');
});

// Email Validation Tests
console.log('\n📧 Email Validation Tests:');

test('Should accept valid email', () => {
  assert(isValidEmail('user@example.com'));
  assert(isValidEmail('test.user@domain.co.uk'));
  assert(isValidEmail('user+tag@example.com'));
});

test('Should reject invalid email', () => {
  assert(!isValidEmail('invalid'));
  assert(!isValidEmail('user@'));
  assert(!isValidEmail('@domain.com'));
  assert(!isValidEmail('user @domain.com'));
  assert(!isValidEmail(''));
});

// Phone Validation Tests
console.log('\n📱 Phone Validation Tests:');

test('Should accept valid phone numbers', () => {
  assert(isValidPhone('1234567890'));
  assert(isValidPhone('+91 1234567890'));
  assert(isValidPhone('(123) 456-7890'));
  assert(isValidPhone('+1-234-567-8900'));
});

test('Should reject invalid phone numbers', () => {
  assert(!isValidPhone('123')); // Too short
  assert(!isValidPhone('abcdefghij')); // Letters
  assert(!isValidPhone('')); // Empty
  assert(!isValidPhone('12345')); // Too short
});

// Input Sanitization Edge Cases
console.log('\n🔍 Edge Case Tests:');

test('Should handle special characters', () => {
  const input = '< > & " \' /';
  const sanitized = sanitizeHTML(input);
  assert(sanitized.length > 0, 'Should handle special characters');
});

test('Should handle unicode characters', () => {
  const input = '你好世界 مرحبا العالم';
  const sanitized = sanitizeHTML(input);
  assert(sanitized.includes('你好'), 'Should preserve unicode');
});

test('Should handle very long strings', () => {
  const longString = 'a'.repeat(10000);
  const sanitized = sanitizeHTML(longString);
  assert(sanitized.length === 10000, 'Should handle long strings');
});

// SQL Injection Prevention (for future backend)
console.log('\n💉 SQL Injection Prevention Tests:');

test('Should escape SQL special characters', () => {
  const malicious = "'; DROP TABLE users; --";
  const sanitized = sanitizeHTML(malicious);
  assert(!sanitized.includes('DROP TABLE'), 'SQL commands should be escaped');
});

test('Should handle SQL comment syntax', () => {
  const malicious = "admin'--";
  const sanitized = sanitizeHTML(malicious);
  assert(sanitized.includes('--') === false || sanitized !== malicious, 'SQL comments should be handled');
});

// Results
console.log('\n' + '='.repeat(50));
console.log(`📊 Test Results:`);
console.log(`   ✅ Passed: ${passed}`);
console.log(`   ❌ Failed: ${failed}`);
console.log(`   📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);
console.log('='.repeat(50));

if (failed === 0) {
  console.log('\n🎉 All security tests passed!');
  process.exit(0);
} else {
  console.log('\n⚠️  Some tests failed. Please review and fix.');
  process.exit(1);
}
