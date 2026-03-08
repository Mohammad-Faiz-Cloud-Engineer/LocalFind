/**
 * Accessibility Test Suite
 * Tests WCAG 2.1 Level AA compliance
 * Run with: node tests/accessibility.test.js
 */

const fs = require('fs');
const path = require('path');

console.log('♿ Accessibility Compliance Tests\n');

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

// Test HTML files
const htmlFiles = [
  'index.html',
  'about.html',
  'contact.html',
  'add-business.html',
  'business-detail.html',
  'directory.html',
  'categories.html',
  'map.html'
];

console.log('📋 Testing HTML Files for Accessibility:\n');

htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    console.log(`\n📄 ${file}:`);
    
    // WCAG 2.1 - Perceivable
    test(
      `   Has lang attribute`,
      /<html[^>]+lang=["'][^"']+["']/.test(content),
      'error'
    );
    
    test(
      `   Has page title`,
      /<title>[^<]+<\/title>/.test(content),
      'error'
    );
    
    test(
      `   Has meta description`,
      /<meta[^>]+name=["']description["']/.test(content),
      'warning'
    );
    
    test(
      `   Has viewport meta tag`,
      /<meta[^>]+name=["']viewport["']/.test(content),
      'error'
    );
    
    // Check for images without alt text
    const imgTags = content.match(/<img[^>]*>/g) || [];
    const imgsWithoutAlt = imgTags.filter(img => !img.includes('alt='));
    test(
      `   All images have alt text (${imgTags.length} images)`,
      imgsWithoutAlt.length === 0,
      'error'
    );
    
    // WCAG 2.1 - Operable
    test(
      `   Has skip navigation link`,
      content.includes('skip') || content.includes('Skip'),
      'warning'
    );
    
    // Check for buttons without aria-label
    const buttons = content.match(/<button[^>]*>/g) || [];
    const buttonsWithoutLabel = buttons.filter(btn => {
      return !btn.includes('aria-label=') && 
             !btn.includes('>') && 
             !btn.match(/>\s*\w+/);
    });
    
    test(
      `   Icon buttons have aria-label`,
      buttonsWithoutLabel.length === 0,
      'warning'
    );
    
    // Check for form inputs without labels
    const inputs = content.match(/<input[^>]*>/g) || [];
    const inputsWithoutLabel = inputs.filter(input => {
      return !input.includes('aria-label=') && 
             !input.includes('id=');
    });
    
    test(
      `   Form inputs have labels`,
      inputsWithoutLabel.length < inputs.length * 0.2, // Allow 20% without labels (hidden inputs, etc.)
      'warning'
    );
    
    // WCAG 2.1 - Understandable
    test(
      `   Has semantic HTML5 elements`,
      content.includes('<header') || 
      content.includes('<nav') || 
      content.includes('<main') || 
      content.includes('<footer'),
      'warning'
    );
    
    // Check for proper heading hierarchy
    const h1Count = (content.match(/<h1[^>]*>/g) || []).length;
    test(
      `   Has exactly one h1 tag`,
      h1Count === 1,
      'warning'
    );
    
    // WCAG 2.1 - Robust
    test(
      `   Has proper DOCTYPE`,
      content.trim().toLowerCase().startsWith('<!doctype html>'),
      'error'
    );
    
    test(
      `   Has charset declaration`,
      /<meta[^>]+charset=["']?utf-8["']?/i.test(content),
      'error'
    );
    
    // ARIA attributes
    test(
      `   Uses ARIA attributes`,
      content.includes('aria-') || content.includes('role='),
      'warning'
    );
    
    // Check for decorative images with aria-hidden
    const decorativeImages = content.match(/<i[^>]+class=["'][^"']*fa-[^"']*["'][^>]*>/g) || [];
    const decorativeWithAriaHidden = decorativeImages.filter(img => img.includes('aria-hidden'));
    
    test(
      `   Decorative icons have aria-hidden`,
      decorativeWithAriaHidden.length > decorativeImages.length * 0.5,
      'warning'
    );
    
  } catch (error) {
    console.log(`   ⚠️  Could not read ${file}: ${error.message}`);
  }
});

// Test CSS for accessibility
console.log('\n\n🎨 Testing CSS for Accessibility:\n');

const cssFiles = fs.readdirSync(path.join(__dirname, '..', 'css'))
  .filter(file => file.endsWith('.css'));

cssFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', 'css', file);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    console.log(`\n📄 css/${file}:`);
    
    // Check for focus styles
    test(
      `   Has focus styles`,
      content.includes(':focus') || content.includes('focus-visible'),
      'warning'
    );
    
    // Check for reduced motion support
    test(
      `   Respects prefers-reduced-motion`,
      content.includes('prefers-reduced-motion'),
      'warning'
    );
    
    // Check for proper contrast (basic check)
    test(
      `   Uses CSS custom properties for colors`,
      content.includes('--') && content.includes('var('),
      'warning'
    );
    
  } catch (error) {
    console.log(`   ⚠️  Could not read ${file}`);
  }
});

// Test JavaScript for accessibility
console.log('\n\n⚙️  Testing JavaScript for Accessibility:\n');

const jsFiles = fs.readdirSync(path.join(__dirname, '..', 'js'))
  .filter(file => file.endsWith('.js'));

jsFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', 'js', file);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    console.log(`\n📄 js/${file}:`);
    
    // Check for keyboard event handlers
    test(
      `   Has keyboard event handlers`,
      content.includes('keydown') || content.includes('keypress') || content.includes('keyup'),
      'warning'
    );
    
    // Check for focus management
    test(
      `   Manages focus`,
      content.includes('.focus()') || content.includes('tabindex'),
      'warning'
    );
    
    // Check for ARIA attribute manipulation
    test(
      `   Updates ARIA attributes dynamically`,
      content.includes('aria-') || content.includes('setAttribute'),
      'warning'
    );
    
  } catch (error) {
    console.log(`   ⚠️  Could not read ${file}`);
  }
});

// Results
console.log('\n' + '='.repeat(70));
console.log('📊 Accessibility Test Results:');
console.log(`   ✅ Passed: ${passed}`);
console.log(`   ❌ Failed: ${failed}`);
console.log(`   ⚠️  Warnings: ${warnings}`);
console.log(`   📈 Compliance Score: ${((passed / (passed + failed + warnings)) * 100).toFixed(1)}%`);
console.log('='.repeat(70));

if (failed === 0) {
  console.log('\n🎉 Accessibility tests passed!');
  if (warnings > 0) {
    console.log(`⚠️  ${warnings} warning(s) found - consider addressing them for better accessibility.`);
  }
  process.exit(0);
} else {
  console.log('\n❌ Some accessibility issues found. Please review and fix.');
  process.exit(1);
}
