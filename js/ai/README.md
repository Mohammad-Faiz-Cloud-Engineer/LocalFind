# 🤖 LocalFind AI Modules

**Created by Mohammad Faiz (Rasauli)**

This folder contains all AI-related modules for LocalFind.

---

## 📦 Files

### Core Modules

1. **ai-config.js** (2KB)
   - Configuration settings
   - API endpoints
   - Feature flags
   - Security settings

2. **ai-security.js** (5KB)
   - Input sanitization
   - Rate limiting
   - XSS protection
   - Security logging

3. **ai-cache.js** (4KB)
   - Response caching
   - LRU eviction
   - TTL management
   - Performance optimization

4. **ai-analytics.js** (6KB)
   - Usage tracking
   - Performance metrics
   - Error logging
   - Data export

5. **ai-chatbot.js** (12KB)
   - Main chatbot logic
   - Context gathering
   - API communication
   - Response generation

6. **ai-search.js** (6KB)
   - Smart search
   - AI-powered results
   - Fallback search
   - Suggestions

7. **ai-ui.js** (8KB)
   - User interface
   - Chat window
   - Message handling
   - Animations

8. **ai-init.js** (3KB)
   - Initialization
   - Dependency loading
   - Global API
   - Event handling

**Total Size:** ~46KB (minified: ~20KB)

---

## 🔗 Dependencies

### Internal
- `window.CONFIG` - Platform configuration
- `window.LISTINGS` - Business data

### External
- None! All self-contained

### APIs
- Rox-Turbo-API (primary)
- HuggingFace (fallback)

---

## 🚀 Usage

### Initialize

```javascript
// Automatic initialization
// Just include scripts in HTML
```

### Access Chatbot

```javascript
const response = await window.aiChatbot.chat("Your question");
```

### Access Search

```javascript
const results = await window.aiSearch.search("query");
```

### Access UI

```javascript
window.aiUI.toggleChat();
```

### Global API

```javascript
window.LocalFindAI.getStatus();
window.LocalFindAI.clearAll();
window.LocalFindAI.exportAnalytics();
```

---

## ⚙️ Configuration

Edit `ai-config.js` to customize:

```javascript
const AI_CONFIG = {
  enabled: true,           // Enable/disable AI
  api: { /* ... */ },      // API settings
  rateLimit: { /* ... */ }, // Rate limits
  cache: { /* ... */ },    // Cache settings
  security: { /* ... */ }, // Security settings
  features: { /* ... */ }, // Feature flags
  ui: { /* ... */ }        // UI settings
};
```

---

## 🔒 Security

### Built-in Protection
- XSS prevention
- Injection blocking
- Rate limiting
- Input sanitization
- Response validation

### Configurable
- Max input length
- Rate limits
- Block patterns
- Security logging

---

## 📊 Performance

### Caching
- 5 minute TTL
- LRU eviction
- 50 item limit
- >60% hit rate

### Response Times
- Cached: <10ms
- Uncached: 1-3s
- Fallback: 3-5s

### Memory Usage
- Runtime: ~5MB
- Storage: ~1MB
- Cache: ~2MB

---

## 🧪 Testing

### Test File
Use `test-ai.html` in root directory.

### Manual Testing

```javascript
// Security
await window.aiChatbot.chat('<script>alert("xss")</script>');

// Cache
await window.aiChatbot.chat('test');
await window.aiChatbot.chat('test'); // Should be instant

// Search
await window.aiSearch.search('pharmacy');
```

---

## 📝 Documentation

### Full Docs
- `AI_IMPLEMENTATION_COMPLETE.md` - Complete guide
- `AI_QUICK_REFERENCE.md` - Quick reference
- `AI_DEPLOYMENT_CHECKLIST.md` - Deployment guide
- `AI_INTEGRATION_STRATEGY.md` - Original strategy

### Inline Docs
All files have JSDoc comments.

---

## 🔄 Updates

### Adding Features

1. Edit relevant module
2. Update `ai-config.js` if needed
3. Test with `test-ai.html`
4. Update documentation

### Removing AI

```bash
# Delete this folder
rm -rf js/ai/

# Delete CSS
rm -rf css/ai/

# Remove script tags from HTML
```

---

## 🐛 Debugging

### Enable Debug Mode

```javascript
// In ai-config.js
AI_CONFIG.debug = true;
```

### Check Console

Look for:
- `[LocalFind AI]` - General messages
- `[AI Chatbot]` - Chatbot messages
- `[AI Cache]` - Cache operations
- `[AI Security]` - Security events

---

## 📞 Support

### Issues
1. Check browser console
2. Test with `test-ai.html`
3. Review documentation
4. Check configuration

### Creator
**Mohammad Faiz**  
Rasauli, Barabanki, Uttar Pradesh

---

## ✅ Status

**Version:** 1.0.0  
**Status:** Production Ready  
**Last Updated:** 2026  
**Tested:** ✅ All tests passing

---

**Created with ❤️ by Mohammad Faiz**
