/**
 * LocalFind AI User Interface
 * Production-grade with streaming, fullscreen, and offline support
 * Created by Mohammad Faiz (Rasauli)
 */

class AIUserInterface {
  constructor() {
    this.isOpen = false;
    this.isTyping = false;
    this.isStreaming = false;
    this.isFullscreen = false;
    this.messages = [];
    this.maxMessages = AI_CONFIG.ui.maxMessagesDisplay;
    this.isOnline = navigator.onLine;
    
    this.init();
    this.setupOnlineOfflineHandlers();
  }

  /**
   * Initialize UI
   */
  init() {
    this.createChatbotHTML();
    this.attachEventListeners();
    this.loadMessageHistory();
    this.checkMobileFullscreen();
    
    if (AI_CONFIG.debug) {
      console.log('[AI UI] Initialized');
    }
  }

  /**
   * Check if mobile and apply fullscreen
   */
  checkMobileFullscreen() {
    if (AI_CONFIG.features.fullscreenMobile) {
      const isMobile = window.innerWidth <= AI_CONFIG.ui.fullscreenBreakpoint;
      if (isMobile && this.isOpen) {
        this.isFullscreen = true;
      }
    }
  }

  /**
   * Setup online/offline handlers
   */
  setupOnlineOfflineHandlers() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.updateOnlineStatus();
      if (AI_CONFIG.debug) {
        console.log('[AI UI] Online');
      }
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.updateOnlineStatus();
      if (AI_CONFIG.debug) {
        console.log('[AI UI] Offline');
      }
    });
  }

  /**
   * Update online status indicator
   */
  updateOnlineStatus() {
    const indicator = document.getElementById('ai-offline-indicator');
    if (!indicator) return;

    if (!this.isOnline) {
      indicator.style.display = 'flex';
      indicator.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        <span>You're offline. Using cached responses.</span>
      `;
    } else {
      indicator.style.display = 'none';
    }
  }

  /**
   * Create chatbot HTML structure
   */
  createChatbotHTML() {
    const existingChatbot = document.getElementById('ai-chatbot');
    if (existingChatbot) {
      existingChatbot.remove();
    }

    const chatbotHTML = `
      <div id="ai-chatbot" class="ai-chatbot" data-position="${AI_CONFIG.ui.position}">
        <button class="ai-chat-toggle" id="ai-chat-toggle" aria-label="Open AI Assistant">
          <svg class="ai-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 2v4m0 12v4M2 12h4m12 0h4"/>
          </svg>
          <span class="ai-badge" id="ai-badge" style="display: none;">1</span>
        </button>
        
        <div class="ai-chat-window" id="ai-chat-window" style="display: none;">
          <div id="ai-offline-indicator" class="ai-offline-indicator" style="display: none;"></div>
          
          <div class="ai-chat-header">
            <div class="ai-header-info">
              <h3>LocalFind AI</h3>
              <p class="ai-subtitle">by Mohammad Faiz</p>
            </div>
            <div class="ai-header-actions">
              ${AI_CONFIG.features.fullscreenDesktop ? `
              <button class="ai-fullscreen-btn" id="ai-fullscreen-btn" aria-label="Toggle fullscreen" title="Fullscreen">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                </svg>
              </button>
              ` : ''}
              <button class="ai-btn-icon" id="ai-clear-chat" aria-label="Clear chat" title="Clear chat">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z"/>
                </svg>
              </button>
              <button class="ai-btn-icon" id="ai-close-chat" aria-label="Close chat">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div class="ai-chat-messages" id="ai-chat-messages">
            <div class="ai-welcome-message">
              <div class="ai-avatar">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <div class="ai-message-content">
                <p>Hi! I'm LocalFind AI, created by Mohammad Faiz from Rasauli.</p>
                <p>I can help you discover local businesses, find services, and answer questions about our community.</p>
                <div class="ai-quick-actions">
                  <button class="ai-quick-btn" data-query="Show me nearby restaurants">Restaurants</button>
                  <button class="ai-quick-btn" data-query="Find healthcare services">Healthcare</button>
                  <button class="ai-quick-btn" data-query="Show verified businesses">Verified</button>
                  <button class="ai-quick-btn" data-query="What are 24/7 services?">24/7 Services</button>
                </div>
              </div>
            </div>
          </div>
          
          <div class="ai-chat-input-container">
            <div class="ai-typing-indicator" id="ai-typing-indicator" style="display: none;">
              <span></span><span></span><span></span>
            </div>
            <div class="ai-chat-input">
              <input 
                type="text" 
                id="ai-chat-input" 
                placeholder="Ask me anything..."
                maxlength="500"
                autocomplete="off"
              />
              <button class="ai-btn-send" id="ai-btn-send" aria-label="Send message">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              </button>
            </div>
            <div class="ai-footer">
              <span class="ai-powered">Powered by Rox AI API • Free & Unlimited</span>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    this.updateOnlineStatus();
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    const toggle = document.getElementById('ai-chat-toggle');
    const close = document.getElementById('ai-close-chat');
    const clear = document.getElementById('ai-clear-chat');
    const fullscreen = document.getElementById('ai-fullscreen-btn');
    const input = document.getElementById('ai-chat-input');
    const send = document.getElementById('ai-btn-send');

    if (toggle) {
      toggle.addEventListener('click', () => this.toggleChat());
    }

    if (close) {
      close.addEventListener('click', () => this.closeChat());
    }

    if (clear) {
      clear.addEventListener('click', () => this.clearChat());
    }

    if (fullscreen) {
      fullscreen.addEventListener('click', () => this.toggleFullscreen());
    }

    if (input) {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.sendMessage();
        }
      });
    }

    if (send) {
      send.addEventListener('click', () => this.sendMessage());
    }

    // Quick action buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('ai-quick-btn')) {
        const query = e.target.dataset.query;
        if (query) {
          this.sendMessage(query);
        }
      }
    });

    // Handle window resize for mobile fullscreen
    window.addEventListener('resize', () => {
      this.checkMobileFullscreen();
    });
  }

  /**
   * Toggle chat window
   */
  toggleChat() {
    this.isOpen = !this.isOpen;
    const window = document.getElementById('ai-chat-window');
    const toggle = document.getElementById('ai-chat-toggle');
    
    if (this.isOpen) {
      window.style.display = 'flex';
      if (AI_CONFIG.ui.animations) {
        window.classList.add('ai-slide-in');
      }
      toggle.classList.add('active');
      
      // Auto fullscreen on mobile
      const isMobile = window.innerWidth <= AI_CONFIG.ui.fullscreenBreakpoint;
      if (isMobile && AI_CONFIG.features.fullscreenMobile) {
        this.isFullscreen = true;
        window.classList.add('fullscreen');
      }
      
      document.getElementById('ai-chat-input')?.focus();
      this.hideBadge();
    } else {
      this.closeChat();
    }
  }

  /**
   * Close chat window
   */
  closeChat() {
    this.isOpen = false;
    this.isFullscreen = false;
    const window = document.getElementById('ai-chat-window');
    const toggle = document.getElementById('ai-chat-toggle');
    
    if (AI_CONFIG.ui.animations) {
      window.classList.add('ai-slide-out');
      setTimeout(() => {
        window.style.display = 'none';
        window.classList.remove('ai-slide-out', 'ai-slide-in', 'fullscreen');
      }, 350);
    } else {
      window.style.display = 'none';
      window.classList.remove('fullscreen');
    }
    
    toggle.classList.remove('active');
  }

  /**
   * Toggle fullscreen mode
   */
  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
    const window = document.getElementById('ai-chat-window');
    const btn = document.getElementById('ai-fullscreen-btn');
    
    if (this.isFullscreen) {
      window.classList.add('fullscreen');
      if (btn) {
        btn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
          </svg>
        `;
      }
    } else {
      window.classList.remove('fullscreen');
      if (btn) {
        btn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
          </svg>
        `;
      }
    }
  }

  /**
   * Clear chat history
   */
  clearChat() {
    if (confirm('Clear all messages?')) {
      this.messages = [];
      const messagesContainer = document.getElementById('ai-chat-messages');
      messagesContainer.innerHTML = '';
      this.createChatbotHTML();
      this.attachEventListeners();
      
      if (window.aiChatbot) {
        window.aiChatbot.clearHistory();
      }
      
      localStorage.removeItem('ai_chat_history');
    }
  }

  /**
   * Send message with streaming support
   */
  async sendMessage(text = null) {
    const input = document.getElementById('ai-chat-input');
    const message = text || input?.value?.trim();
    
    if (!message || this.isTyping || this.isStreaming) return;

    // Clear input
    if (input && !text) {
      input.value = '';
    }

    // Add user message
    this.addMessage(message, 'user');

    // Show typing indicator
    this.showTyping();

    try {
      if (AI_CONFIG.features.streaming && this.isOnline) {
        // Streaming response
        await this.streamResponse(message);
      } else {
        // Regular response (offline or streaming disabled)
        const response = await window.aiChatbot.chat(message);
        this.hideTyping();
        this.addMessage(response, 'ai');
      }
      
      // Save history
      this.saveMessageHistory();

    } catch (error) {
      this.hideTyping();
      
      if (!this.isOnline) {
        this.addMessage(
          "You're offline. Please check your internet connection to use AI features.",
          'ai',
          true
        );
      } else {
        this.addMessage(
          "I'm having trouble right now. Please try again in a moment.",
          'ai',
          true
        );
      }
      
      if (AI_CONFIG.debug) {
        console.error('[AI UI] Error:', error);
      }
    }
  }

  /**
   * Stream AI response character by character
   */
  async streamResponse(message) {
    this.isStreaming = true;
    this.hideTyping();

    // Create message container for streaming
    const messagesContainer = document.getElementById('ai-chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'ai-message ai-message-ai';
    
    messageDiv.innerHTML = `
      <div class="ai-avatar">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </div>
      <div class="ai-message-content">
        <div class="ai-thinking">
          <span class="ai-thinking-dot"></span>
          <span class="ai-thinking-dot"></span>
          <span class="ai-thinking-dot"></span>
        </div>
        <p id="ai-streaming-text" style="display: none;"></p>
        <span class="ai-message-time">${this.getTimeString()}</span>
      </div>
    `;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    const streamingText = document.getElementById('ai-streaming-text');
    const thinkingIndicator = messageDiv.querySelector('.ai-thinking');
    
    try {
      // Get full response
      const response = await window.aiChatbot.chat(message);
      
      // Remove thinking indicator and show text
      if (thinkingIndicator) {
        thinkingIndicator.remove();
      }
      streamingText.style.display = 'block';
      
      // Stream it character by character
      let currentText = '';
      const delay = AI_CONFIG.ui.streamingDelay || 20;
      
      for (let i = 0; i < response.length; i++) {
        currentText += response[i];
        streamingText.innerHTML = this.formatMessage(currentText) + '<span class="ai-streaming-cursor"></span>';
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Add delay between characters
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      
      // Remove cursor and show final text
      streamingText.innerHTML = this.formatMessage(response);
      
      // Store message
      this.messages.push({ text: response, type: 'ai', timestamp: Date.now() });
      
    } catch (error) {
      if (thinkingIndicator) {
        thinkingIndicator.remove();
      }
      streamingText.style.display = 'block';
      streamingText.innerHTML = this.formatMessage("I'm having trouble right now. Please try again in a moment.");
      messageDiv.classList.add('ai-message-error');
      throw error;
    } finally {
      this.isStreaming = false;
    }
  }

  /**
   * Add message to chat
   */
  addMessage(text, type, isError = false) {
    const messagesContainer = document.getElementById('ai-chat-messages');
    if (!messagesContainer) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ai-message-${type}${isError ? ' ai-message-error' : ''}`;
    
    if (type === 'ai') {
      messageDiv.innerHTML = `
        <div class="ai-avatar">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </div>
        <div class="ai-message-content">
          <p>${this.formatMessage(text)}</p>
          <span class="ai-message-time">${this.getTimeString()}</span>
        </div>
      `;
    } else {
      messageDiv.innerHTML = `
        <div class="ai-message-content">
          <p>${this.escapeHtml(text)}</p>
          <span class="ai-message-time">${this.getTimeString()}</span>
        </div>
      `;
    }

    messagesContainer.appendChild(messageDiv);
    
    // Animate
    if (AI_CONFIG.ui.animations) {
      messageDiv.classList.add('ai-fade-in');
    }

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Store message
    this.messages.push({ text, type, timestamp: Date.now() });

    // Limit messages
    if (this.messages.length > this.maxMessages) {
      this.messages.shift();
    }
  }

  /**
   * Format AI message with rich content support
   */
  formatMessage(text) {
    let formatted = this.escapeHtml(text);

    // Convert markdown-style formatting
    
    // Headers (must be before other formatting)
    formatted = formatted.replace(/^#### (.*?)$/gm, '<h4>$1</h4>');
    formatted = formatted.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
    formatted = formatted.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
    formatted = formatted.replace(/^# (.*?)$/gm, '<h1>$1</h1>');

    // Bold
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Italic
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Inline code
    formatted = formatted.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Code blocks
    formatted = formatted.replace(/```(\w+)?\n([\s\S]*?)```/g, (_match, _lang, code) => {
      return `<pre><code>${code.trim()}</code></pre>`;
    });

    // Links
    formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // Horizontal rules
    formatted = formatted.replace(/^---$/gm, '<hr>');
    formatted = formatted.replace(/^\*\*\*$/gm, '<hr>');

    // Blockquotes
    formatted = formatted.replace(/^&gt; (.*?)$/gm, '<blockquote>$1</blockquote>');

    // Unordered lists
    formatted = formatted.replace(/^\* (.*?)$/gm, '<li>$1</li>');
    formatted = formatted.replace(/^- (.*?)$/gm, '<li>$1</li>');
    formatted = formatted.replace(/(<li>.*?<\/li>\n?)+/g, '<ul>$&</ul>');

    // Ordered lists
    formatted = formatted.replace(/^\d+\. (.*?)$/gm, '<li>$1</li>');
    
    // Tables (simple markdown tables)
    formatted = this.formatTables(formatted);

    // Line breaks
    formatted = formatted.replace(/\n/g, '<br>');

    // Info boxes (custom syntax)
    formatted = formatted.replace(/\[!INFO\](.*?)\[\/INFO\]/gs, '<div class="ai-info-box">$1</div>');
    formatted = formatted.replace(/\[!WARNING\](.*?)\[\/WARNING\]/gs, '<div class="ai-info-box warning">$1</div>');
    formatted = formatted.replace(/\[!ERROR\](.*?)\[\/ERROR\]/gs, '<div class="ai-info-box error">$1</div>');
    formatted = formatted.replace(/\[!SUCCESS\](.*?)\[\/SUCCESS\]/gs, '<div class="ai-info-box success">$1</div>');

    return formatted;
  }

  /**
   * Format markdown tables
   */
  formatTables(text) {
    // Match markdown tables
    const tableRegex = /(\|[^\n]+\|\n)(\|[-:\s|]+\|\n)((?:\|[^\n]+\|\n?)+)/g;
    
    return text.replace(tableRegex, (_match, header, _separator, body) => {
      // Parse header
      const headers = header.split('|').filter(h => h.trim()).map(h => h.trim());
      
      // Parse body rows
      const rows = body.trim().split('\n').map(row => 
        row.split('|').filter(cell => cell.trim()).map(cell => cell.trim())
      );

      // Build HTML table
      let table = '<table>';
      
      // Header
      table += '<thead><tr>';
      headers.forEach(h => {
        table += `<th>${h}</th>`;
      });
      table += '</tr></thead>';
      
      // Body
      table += '<tbody>';
      rows.forEach(row => {
        table += '<tr>';
        row.forEach((cell, index) => {
          table += `<td data-label="${headers[index] || ''}">${cell}</td>`;
        });
        table += '</tr>';
      });
      table += '</tbody>';
      
      table += '</table>';
      return table;
    });
  }

  /**
   * Escape HTML
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Get time string
   */
  getTimeString() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true
    });
  }

  /**
   * Show typing indicator
   */
  showTyping() {
    this.isTyping = true;
    const indicator = document.getElementById('ai-typing-indicator');
    if (indicator) {
      indicator.style.display = 'flex';
    }
  }

  /**
   * Hide typing indicator
   */
  hideTyping() {
    this.isTyping = false;
    const indicator = document.getElementById('ai-typing-indicator');
    if (indicator) {
      indicator.style.display = 'none';
    }
  }

  /**
   * Show badge
   */
  showBadge(count = 1) {
    const badge = document.getElementById('ai-badge');
    if (badge && !this.isOpen) {
      badge.textContent = count;
      badge.style.display = 'flex';
    }
  }

  /**
   * Hide badge
   */
  hideBadge() {
    const badge = document.getElementById('ai-badge');
    if (badge) {
      badge.style.display = 'none';
    }
  }

  /**
   * Save message history
   */
  saveMessageHistory() {
    try {
      localStorage.setItem('ai_chat_history', JSON.stringify(this.messages.slice(-20)));
    } catch (e) {
      // Ignore storage errors
    }
  }

  /**
   * Load message history
   */
  loadMessageHistory() {
    try {
      // Check if history exists but don't auto-load to keep UI clean
      const historyExists = localStorage.getItem('ai_chat_history');
      if (AI_CONFIG.debug && historyExists) {
        console.log('[AI UI] Chat history available but not auto-loaded');
      }
    } catch (e) {
      // Ignore load errors
    }
  }
}

// Initialize UI when DOM is ready
if (typeof AI_CONFIG !== 'undefined' && AI_CONFIG.enabled && AI_CONFIG.features.chatbot) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.aiUI = new AIUserInterface();
    });
  } else {
    window.aiUI = new AIUserInterface();
  }
}
