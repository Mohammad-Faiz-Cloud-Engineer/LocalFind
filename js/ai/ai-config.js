/**
 * LocalFind AI Configuration
 * Created by Mohammad Faiz (Rasauli)
 * Production-grade configuration with security and performance optimizations
 */

const AI_CONFIG = {
  // API Configuration
  api: {
    primary: "https://Rox-Turbo-API.hf.space/chat",
    fallbacks: [
      "https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-3B-Instruct",
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2"
    ],
    timeout: 30000, // 30 seconds
    retryAttempts: 3,
    retryDelay: 1000 // 1 second
  },

  // Model Parameters
  model: {
    temperature: 0.7,
    maxTokens: 1024,
    topP: 0.9,
    frequencyPenalty: 0.5,
    presencePenalty: 0.5
  },

  // Rate Limiting (Client-side)
  rateLimit: {
    enabled: true,
    maxRequestsPerMinute: 20,
    maxRequestsPerHour: 100,
    cooldownPeriod: 60000 // 1 minute
  },

  // Caching
  cache: {
    enabled: true,
    ttl: 300000, // 5 minutes
    maxSize: 50 // Maximum cached responses
  },

  // Security
  security: {
    sanitizeInput: true,
    maxInputLength: 500,
    blockPatterns: [
      /(<script|javascript:|onerror=|onclick=)/gi,
      /(eval\(|function\(|new Function)/gi,
      /(document\.|window\.|alert\()/gi
    ],
    contentSecurityPolicy: true
  },

  // Features
  features: {
    chatbot: true,
    smartSearch: true,
    voiceInput: false, // Future feature
    analytics: true,
    streaming: true, // Enable streaming responses
    fullscreenMobile: true, // Full screen on mobile
    fullscreenDesktop: true // Button for desktop fullscreen
  },

  // UI Configuration
  ui: {
    theme: 'dark',
    position: 'bottom-right',
    animations: true,
    soundEffects: false,
    typingIndicator: true,
    maxMessagesDisplay: 50,
    streamingDelay: 20, // ms between characters for streaming
    fullscreenBreakpoint: 768 // px - mobile breakpoint
  },

  // Analytics
  analytics: {
    enabled: true,
    trackQueries: true,
    trackErrors: true,
    trackPerformance: true
  },

  // Debug Mode
  debug: false,
  
  // Feature Flag
  enabled: true
};

// Freeze configuration to prevent tampering
Object.freeze(AI_CONFIG);
Object.freeze(AI_CONFIG.api);
Object.freeze(AI_CONFIG.model);
Object.freeze(AI_CONFIG.rateLimit);
Object.freeze(AI_CONFIG.cache);
Object.freeze(AI_CONFIG.security);
Object.freeze(AI_CONFIG.features);
Object.freeze(AI_CONFIG.ui);
Object.freeze(AI_CONFIG.analytics);

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AI_CONFIG;
}
