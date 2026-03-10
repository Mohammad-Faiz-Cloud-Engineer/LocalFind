/**
 * LocalFind AI Initialization
 * Loads all AI modules in correct order
 */

(function() {
  'use strict';

  // Check if AI is enabled
  if (typeof AI_CONFIG === 'undefined' || !AI_CONFIG.enabled) {
    console.log('[LocalFind AI] AI features are disabled');
    return;
  }

  // Initialization state
  const aiState = {
    configLoaded: false,
    securityLoaded: false,
    cacheLoaded: false,
    analyticsLoaded: false,
    chatbotLoaded: false,
    searchLoaded: false,
    uiLoaded: false,
    initialized: false
  };

  /**
   * Check if all dependencies are loaded
   */
  function checkDependencies() {
    return (
      typeof AI_CONFIG !== 'undefined' &&
      typeof AISecurityManager !== 'undefined' &&
      typeof AICacheManager !== 'undefined' &&
      typeof AIAnalytics !== 'undefined'
    );
  }

  /**
   * Initialize AI features
   */
  function initializeAI() {
    if (aiState.initialized) {
      console.log('[LocalFind AI] Already initialized');
      return;
    }

    if (!checkDependencies()) {
      console.error('[LocalFind AI] Missing dependencies');
      return;
    }

    try {
      // Initialize chatbot
      if (AI_CONFIG.features.chatbot && typeof AIChatbot !== 'undefined') {
        if (!window.aiChatbot) {
          window.aiChatbot = new AIChatbot();
          aiState.chatbotLoaded = true;
          console.log('[LocalFind AI] Chatbot initialized');
        }
      }

      // Initialize smart search
      if (AI_CONFIG.features.smartSearch && typeof AISearch !== 'undefined') {
        if (!window.aiSearch) {
          window.aiSearch = new AISearch();
          aiState.searchLoaded = true;
          console.log('[LocalFind AI] Smart Search initialized');
        }
      }

      // Initialize UI
      if (AI_CONFIG.features.chatbot && typeof AIUserInterface !== 'undefined') {
        if (!window.aiUI) {
          window.aiUI = new AIUserInterface();
          aiState.uiLoaded = true;
          console.log('[LocalFind AI] UI initialized');
        }
      }

      aiState.initialized = true;

      // Expose global AI object
      window.LocalFindAI = {
        version: '1.0.0',
        config: AI_CONFIG,
        chatbot: window.aiChatbot,
        search: window.aiSearch,
        ui: window.aiUI,
        state: aiState,
        
        // Utility methods
        getStatus() {
          return {
            initialized: aiState.initialized,
            features: {
              chatbot: aiState.chatbotLoaded,
              search: aiState.searchLoaded,
              ui: aiState.uiLoaded
            },
            chatbotStatus: window.aiChatbot?.getStatus(),
            searchStats: window.aiSearch?.getStats()
          };
        },
        
        // Enable/disable features
        enable() {
          AI_CONFIG.enabled = true;
          console.log('[LocalFind AI] Enabled');
        },
        
        disable() {
          AI_CONFIG.enabled = false;
          console.log('[LocalFind AI] Disabled');
        },
        
        // Clear all data
        clearAll() {
          if (window.aiChatbot) {
            window.aiChatbot.clearHistory();
            window.aiChatbot.cache.clear();
            window.aiChatbot.analytics.clear();
          }
          if (window.aiSearch) {
            window.aiSearch.cache.clear();
            window.aiSearch.analytics.clear();
          }
          if (window.aiUI) {
            window.aiUI.clearChat();
          }
          localStorage.removeItem('ai_chat_history');
          localStorage.removeItem('ai_analytics');
          localStorage.removeItem('ai_security_events');
          console.log('[LocalFind AI] All data cleared');
        },
        
        // Export analytics
        exportAnalytics() {
          const data = {
            chatbot: window.aiChatbot?.analytics.exportData(),
            search: window.aiSearch?.analytics.exportData(),
            exportedAt: new Date().toISOString()
          };
          
          const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `localfind-ai-analytics-${Date.now()}.json`;
          a.click();
          URL.revokeObjectURL(url);
        }
      };

      console.log('[LocalFind AI] Fully initialized');
      console.log('[LocalFind AI] Status:', window.LocalFindAI.getStatus());

      // Dispatch custom event
      window.dispatchEvent(new CustomEvent('localfindai:ready', {
        detail: window.LocalFindAI
      }));

    } catch (error) {
      console.error('[LocalFind AI] Initialization error:', error);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAI);
  } else {
    // DOM already loaded, initialize immediately
    initializeAI();
  }

  // Also try to initialize after a short delay (fallback)
  setTimeout(initializeAI, 1000);

})();
