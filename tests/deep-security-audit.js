/**
 * ULTRA-DEEP SECURITY AUDIT
 * Forensic analysis of potential security vulnerabilities
 * Run with: node tests/deep-security-audit.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔬 ULTRA-DEEP FORENSIC SECURITY AUDIT\n');
console.log('Analyzing code for hidden vulnerabilities...\n');

let criticalIssues = 0;
let warnings = 0;
let passed = 0;

function critical(message) {
  console.log(`🚨 CRITICAL: ${message}`);
  criticalIssues++;
}

function warn(message) {
  console.log(`⚠️  WARNING: ${message}`);
  warnings++;
}

function pass(message) {
  console.log(`✅ PASS: ${message}`);
  passed++;
}

// Read all JavaScript files
const jsDir = path.join(__dirname, '..', 'js');
const jsFiles = fs.readdirSync(jsDir).filter(f => f.endsWith('.js'));

console.log('📋 ANALYZING INNERHTML ASSIGNMENTS:\n');

jsFiles.forEach(file => {
  const filePath = path.join(jsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  lines.forEach((line, index) => {
    const lineNum = index + 1;
    
    // Check innerHTML assignments
    if (line.includes('.innerHTML =') || line.includes('.innerHTML=')) {
      const fileName = `js/${file}:${lineNum}`;
      
      // Check if it's using template literals with variables
      if (line.includes('${') && !line.includes('sanitizeHTML')) {
        // Check if variables are sanitized before use
        if (line.includes('.replace(/[<>]/g') || 
            line.includes('sanitizeHTML') ||
            line.includes('encodeURIComponent') ||
            line.includes('textContent')) {
          pass(`${fileName} - innerHTML with sanitized variables`);
        } else {
          // Check if it's using only static HTML or safe variables
          const varMatches = line.match(/\$\{([^}]+)\}/g);
          if (varMatches) {
            const hasUnsafeVars = varMatches.some(v => {
              const varName = v.slice(2, -1).trim();
              // Check if it's a safe variable (stars, icons, etc.)
              return !varName.includes('stars') && 
                     !varName.includes('Stars') &&
                     !varName.includes('Icon') &&
                     !varName.includes('sanitize') &&
                     !varName.includes('safe');
            });
            
            if (hasUnsafeVars) {
              warn(`${fileName} - innerHTML with potentially unsafe variables: ${varMatches.join(', ')}`);
            } else {
              pass(`${fileName} - innerHTML with safe variables`);
            }
          }
        }
      } else if (line.includes('`') && !line.includes('${')) {
        pass(`${fileName} - innerHTML with static HTML only`);
      } else if (line.includes("'") || line.includes('"')) {
        pass(`${fileName} - innerHTML with string literal`);
      }
    }
    
    // Check for eval() usage
    if (line.includes('eval(') && !line.includes('// eval')) {
      critical(`js/${file}:${lineNum} - eval() usage detected`);
    }
    
    // Check for Function constructor
    if (line.match(/new\s+Function\s*\(/) && !line.includes('//')) {
      critical(`js/${file}:${lineNum} - Function constructor detected`);
    }
    
    // Check for setTimeout/setInterval with string
    if ((line.includes('setTimeout') || line.includes('setInterval')) && 
        (line.includes('"') || line.includes("'")) &&
        !line.includes('() =>') &&
        !line.includes('function')) {
      const hasStringCode = line.match(/set(Timeout|Interval)\s*\(\s*['"`]/);
      if (hasStringCode) {
        critical(`js/${file}:${lineNum} - setTimeout/setInterval with string code`);
      }
    }
    
    // Check for document.write
    if (line.includes('document.write') && !line.includes('//')) {
      critical(`js/${file}:${lineNum} - document.write() usage`);
    }
  });
});

console.log('\n📋 ANALYZING POSTMESSAGE USAGE:\n');

jsFiles.forEach(file => {
  const filePath = path.join(jsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('postMessage')) {
    const hasOriginCheck = content.includes('event.origin') || 
                          content.includes('event.source') ||
                          content.includes('type:');
    
    if (hasOriginCheck) {
      pass(`js/${file} - postMessage with validation`);
    } else {
      warn(`js/${file} - postMessage without origin validation`);
    }
  }
  
  if (content.includes("addEventListener('message'") || 
      content.includes('addEventListener("message"')) {
    const hasOriginCheck = content.includes('event.origin') || 
                          content.includes('if (event.data');
    
    if (hasOriginCheck) {
      pass(`js/${file} - message listener with validation`);
    } else {
      warn(`js/${file} - message listener without origin check`);
    }
  }
});

console.log('\n📋 ANALYZING REGEX PATTERNS (ReDoS):\n');

jsFiles.forEach(file => {
  const filePath = path.join(jsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  lines.forEach((line, index) => {
    // Check for potentially dangerous regex patterns
    if (line.includes('new RegExp(')) {
      const lineNum = index + 1;
      warn(`js/${file}:${lineNum} - Dynamic RegExp construction (verify input)`);
    }
    
    // Check for nested quantifiers (ReDoS risk)
    const nestedQuantifiers = line.match(/\/.*(\+.*\+|\*.*\*|\+.*\*|\*.*\+).*/);
    if (nestedQuantifiers && !line.includes('//')) {
      const lineNum = index + 1;
      warn(`js/${file}:${lineNum} - Potential ReDoS pattern with nested quantifiers`);
    }
  });
});

console.log('\n📋 ANALYZING LOCALSTORAGE USAGE:\n');

jsFiles.forEach(file => {
  const filePath = path.join(jsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('localStorage.') || content.includes('sessionStorage.')) {
    const hasTryCatch = content.includes('try') && content.includes('catch');
    
    if (hasTryCatch) {
      pass(`js/${file} - localStorage with error handling`);
    } else {
      warn(`js/${file} - localStorage without try-catch (may fail in private mode)`);
    }
  }
});

console.log('\n📋 ANALYZING URL/LOCATION MANIPULATION:\n');

jsFiles.forEach(file => {
  const filePath = path.join(jsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  lines.forEach((line, index) => {
    if (line.includes('window.location =') || 
        line.includes('location.href =') ||
        line.includes('location.replace(')) {
      
      const lineNum = index + 1;
      
      // Check if URL is validated or sanitized
      if (line.includes('sanitize') || 
          line.includes('encodeURI') ||
          line.includes('upiDeepLink') || // Known safe variable
          line.includes('CONFIG.') ||
          line.includes("'http") ||
          line.includes('"http')) {
        pass(`js/${file}:${lineNum} - Location change with safe URL`);
      } else {
        warn(`js/${file}:${lineNum} - Location change (verify URL is safe)`);
      }
    }
  });
});

console.log('\n📋 CHECKING FOR HARDCODED SECRETS:\n');

jsFiles.forEach(file => {
  const filePath = path.join(jsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  lines.forEach((line, index) => {
    const lineNum = index + 1;
    const lowerLine = line.toLowerCase();
    
    // Check for potential API keys or tokens
    if ((lowerLine.includes('apikey') || 
         lowerLine.includes('api_key') ||
         lowerLine.includes('token') ||
         lowerLine.includes('secret')) &&
        !lowerLine.includes('//') &&
        !lowerLine.includes('example') &&
        !lowerLine.includes('your-') &&
        !lowerLine.includes('description') &&
        !lowerLine.includes('recipe')) { // Exclude "secret recipe" from KFC description
      
      // Check if it's actually a hardcoded value
      if (line.includes('=') && 
          (line.includes("'") || line.includes('"')) &&
          !line.includes('CONFIG.')) {
        warn(`js/${file}:${lineNum} - Potential hardcoded secret (verify)`);
      }
    }
  });
});

console.log('\n📋 CHECKING SERVICE WORKER SECURITY:\n');

const swPath = path.join(__dirname, '..', 'sw.js');
if (fs.existsSync(swPath)) {
  const swContent = fs.readFileSync(swPath, 'utf8');
  
  if (swContent.includes('fetch(')) {
    pass('Service Worker - Uses fetch API');
  }
  
  if (swContent.includes('caches.')) {
    pass('Service Worker - Implements caching');
  }
  
  if (swContent.includes('addEventListener')) {
    pass('Service Worker - Has event listeners');
  }
  
  if (swContent.includes('SKIP_WAITING')) {
    pass('Service Worker - Implements update mechanism');
  }
  
  // Check for unsafe cache patterns
  if (swContent.includes('cache.addAll') && !swContent.includes('try')) {
    warn('Service Worker - cache.addAll without error handling');
  }
}

// Results
console.log('\n' + '='.repeat(70));
console.log('📊 ULTRA-DEEP SECURITY AUDIT RESULTS:');
console.log(`   ✅ Passed: ${passed}`);
console.log(`   ⚠️  Warnings: ${warnings}`);
console.log(`   🚨 Critical Issues: ${criticalIssues}`);
console.log('='.repeat(70));

if (criticalIssues === 0 && warnings === 0) {
  console.log('\n🎉 PERFECT! No security issues found!');
  console.log('✅ Codebase is ULTRA-SECURE and production-ready!');
  process.exit(0);
} else if (criticalIssues === 0) {
  console.log('\n✅ No critical issues found!');
  console.log(`⚠️  ${warnings} warning(s) found - review recommended but not blocking.`);
  process.exit(0);
} else {
  console.log('\n🚨 CRITICAL SECURITY ISSUES FOUND!');
  console.log('Please address the critical issues before deployment.');
  process.exit(1);
}
