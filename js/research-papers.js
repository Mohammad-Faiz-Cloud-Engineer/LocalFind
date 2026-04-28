/**
 * Research Papers Page - Dynamic Content Loading
 * Loads and displays research papers from markdown files
 * 
 * @version 4.3.5
 * @updated 2026-04-28
 */

(function () {
  'use strict';

  // Research papers metadata
  const PAPERS = [
    {
      id: 'brain-fog',
      title: 'Brain Fog: The Silent Epidemic Affecting Millions',
      subtitle: 'A Comprehensive Review of Causes, Mechanisms, Diagnosis, and Emerging Treatments',
      author: 'Mohammad Faiz',
      date: 'April 2026',
      abstract: 'Brain fog is not a medical diagnosis but a collection of symptoms that millions of people experience daily. This paper provides a complete review of brain fog — what it is, why it happens, how it affects the brain, and what can be done about it. We examine the latest breakthrough discoveries, including AMPA receptor changes, blood-brain barrier leakage, neuroinflammation, and the gut-brain connection.',
      keywords: ['Brain fog', 'Cognitive dysfunction', 'Neuroinflammation', 'Long COVID', 'AMPA receptors', 'Blood-brain barrier'],
      file: 'Research-Papers/Brain Fog.md',
      icon: 'fa-brain'
    },
    {
      id: 'led-light',
      title: 'The Hidden Danger in Our Homes',
      subtitle: 'How White LED Light May Be Damaging Our Brains',
      author: 'Mohammad Faiz',
      date: 'April 2026',
      abstract: 'White LED lights have become the most common lighting source worldwide. While energy-efficient, growing scientific evidence suggests they may be causing serious harm to our brains through sleep disruption, retinal damage, circadian rhythm interference, and increased risk of neurodegenerative diseases like Alzheimer\'s. This paper reviews current research and provides practical protection strategies.',
      keywords: ['White LED light', 'Brain damage', 'Circadian rhythm', 'Neurodegeneration', 'Melatonin', 'Blue light'],
      file: 'Research-Papers/LED.md',
      icon: 'fa-lightbulb'
    }
  ];

  const FETCH_TIMEOUT_MS = 15000;
  const SAFE_URL_PROTOCOLS = ['http:', 'https:', 'mailto:'];

  /**
   * Safely escape HTML to prevent XSS
   */
  function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    if (typeof str !== 'string') return String(str);
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /**
   * Validate URL is safe (no javascript: protocol)
   */
  function isSafeURL(url) {
    if (!url || typeof url !== 'string') return false;
    const trimmed = url.trim().toLowerCase();
    
    // Block javascript: and data: protocols
    if (trimmed.startsWith('javascript:') || trimmed.startsWith('data:')) {
      return false;
    }
    
    // Allow relative URLs
    if (trimmed.startsWith('/') || trimmed.startsWith('./') || trimmed.startsWith('../')) {
      return true;
    }
    
    // Check absolute URLs have safe protocol
    try {
      const urlObj = new URL(url, window.location.href);
      return SAFE_URL_PROTOCOLS.includes(urlObj.protocol);
    } catch {
      // If URL parsing fails, treat as relative path
      return !trimmed.includes(':');
    }
  }

  /**
   * Render a paper card
   */
  function renderPaperCard(paper) {
    const keywordsHTML = paper.keywords
      .slice(0, 4)
      .map(kw => `<span class="paper-keyword">${escapeHTML(kw)}</span>`)
      .join('');

    // Validate file path
    const safeFilePath = isSafeURL(paper.file) ? escapeHTML(paper.file) : '#';

    return `
      <div class="paper-card" data-paper-id="${escapeHTML(paper.id)}">
        <div class="paper-icon">
          <i class="fa-solid ${escapeHTML(paper.icon)}"></i>
        </div>
        <h3>${escapeHTML(paper.title)}</h3>
        <div class="paper-meta">
          <div class="paper-meta-item">
            <i class="fa-solid fa-user"></i>
            <span>${escapeHTML(paper.author)}</span>
          </div>
          <div class="paper-meta-item">
            <i class="fa-solid fa-calendar"></i>
            <span>${escapeHTML(paper.date)}</span>
          </div>
        </div>
        <p class="paper-abstract">${escapeHTML(paper.abstract)}</p>
        <div class="paper-keywords">
          ${keywordsHTML}
        </div>
        <div class="paper-actions">
          <button class="paper-btn paper-btn-primary">
            <i class="fa-solid fa-book-open"></i>
            Read Paper
          </button>
          <a href="${safeFilePath}" download class="paper-btn paper-download">
            <i class="fa-solid fa-download"></i>
            Download
          </a>
        </div>
      </div>
    `;
  }

  /**
   * Render all papers
   */
  function renderPapers() {
    const grid = document.getElementById('papers-grid');
    const emptyState = document.getElementById('empty-state');

    if (!grid) return;

    if (PAPERS.length === 0) {
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    grid.innerHTML = PAPERS.map(paper => renderPaperCard(paper)).join('');
    
    // Setup event delegation for card clicks
    grid.addEventListener('click', handleGridClick);
  }

  /**
   * Handle clicks on paper grid using event delegation
   */
  function handleGridClick(event) {
    // Find the paper card that was clicked
    const card = event.target.closest('.paper-card');
    if (!card) return;

    // Don't trigger if clicking download link
    if (event.target.closest('.paper-download')) {
      return;
    }

    const paperId = card.dataset.paperId;
    if (paperId) {
      viewPaper(paperId);
    }
  }

  /**
   * Simple markdown to HTML converter
   * Handles basic markdown syntax for research papers
   */
  function markdownToHTML(markdown) {
    if (!markdown || typeof markdown !== 'string') return '';

    let html = markdown;

    // Escape HTML first
    html = html.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;');

    // Horizontal rules (must be before headers to avoid conflicts)
    html = html.replace(/^---+$/gim, '<hr>');
    html = html.replace(/^\*\*\*+$/gim, '<hr>');
    html = html.replace(/^___+$/gim, '<hr>');

    // Tables - proper markdown table parsing
    html = html.replace(/(\|.+\|\n)+/g, function(tableMatch) {
      const rows = tableMatch.trim().split('\n');
      if (rows.length < 2) return tableMatch;
      
      // Check if second row is separator (|---|---|)
      const isSeparator = /^\|[\s\-:|]+\|$/.test(rows[1]);
      
      let tableHTML = '<div class="table-wrapper"><table>';
      
      rows.forEach((row, index) => {
        // Skip separator row
        if (index === 1 && isSeparator) return;
        
        const cells = row.split('|').filter(cell => cell.trim());
        const isHeader = index === 0 && isSeparator;
        const tag = isHeader ? 'th' : 'td';
        
        const cellsHTML = cells.map(cell => `<${tag}>${cell.trim()}</${tag}>`).join('');
        tableHTML += `<tr>${cellsHTML}</tr>`;
      });
      
      tableHTML += '</table></div>';
      return tableHTML;
    });

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Links - with URL validation
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function(match, text, url) {
      if (!isSafeURL(url)) {
        return text; // Strip unsafe links, keep text only
      }
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`;
    });

    // Lists
    html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');
    
    // Use unique marker that won't appear in content
    const LIST_MARKER = '\x00LIST_BLOCK\x00';
    html = html.replace(/(<li>.*<\/li>\n?)+/g, `<ul>${LIST_MARKER}</ul>`);

    // Blockquotes
    html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');

    // Paragraphs
    html = html.replace(/\n\n/g, '</p><p>');
    html = '<p>' + html + '</p>';

    // Clean up empty paragraphs
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<p>(<h[1-6]>)/g, '$1');
    html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
    html = html.replace(/<p>(<div class="table-wrapper">)/g, '$1');
    html = html.replace(/(<\/table><\/div>)<\/p>/g, '$1');
    html = html.replace(/<p>(<ul>)/g, '$1');
    html = html.replace(/(<\/ul>)<\/p>/g, '$1');
    html = html.replace(/<p>(<blockquote>)/g, '$1');
    html = html.replace(/(<\/blockquote>)<\/p>/g, '$1');
    html = html.replace(/<p>(<hr>)/g, '$1');
    html = html.replace(/(<hr>)<\/p>/g, '$1');

    // Line breaks
    html = html.replace(/\n/g, '<br>');

    return html;
  }

  /**
   * Fetch with timeout
   */
  async function fetchWithTimeout(url, timeout = FETCH_TIMEOUT_MS) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  /**
   * Load and display paper content in modal
   */
  async function viewPaper(paperId) {
    const paper = PAPERS.find(p => p.id === paperId);
    if (!paper) return;

    const modal = document.getElementById('paper-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    if (!modal || !modalTitle || !modalBody) return;

    // Show modal with loading state
    modalTitle.textContent = paper.title;
    modalBody.innerHTML = '<div style="text-align: center; padding: 40px;"><i class="fa-solid fa-spinner fa-spin" style="font-size: 48px; color: var(--accent-primary);"></i><p style="margin-top: 20px; color: var(--text-muted);">Loading paper...</p></div>';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    try {
      // Validate file path before fetching
      if (!isSafeURL(paper.file)) {
        throw new Error('Invalid file path');
      }

      // Fetch markdown file with timeout
      const response = await fetchWithTimeout(paper.file);
      if (!response.ok) throw new Error('Failed to load paper');
      
      const markdown = await response.text();
      const html = markdownToHTML(markdown);
      
      modalBody.innerHTML = html;
    } catch (error) {
      const safeFilePath = isSafeURL(paper.file) ? escapeHTML(paper.file) : '#';
      modalBody.innerHTML = `
        <div style="text-align: center; padding: 40px;">
          <i class="fa-solid fa-exclamation-triangle" style="font-size: 48px; color: var(--accent-danger);"></i>
          <h3 style="margin-top: 20px; color: var(--text-primary);">Failed to Load Paper</h3>
          <p style="color: var(--text-muted);">The paper content could not be loaded. Please try downloading the file instead.</p>
          <a href="${safeFilePath}" download class="btn btn-cta" style="margin-top: 20px; display: inline-flex;">
            <i class="fa-solid fa-download"></i>
            Download Paper
          </a>
        </div>
      `;
    }
  }

  /**
   * Close modal
   */
  function closeModal() {
    const modal = document.getElementById('paper-modal');
    if (!modal) return;

    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  /**
   * Initialize page
   */
  function init() {
    // Only run on research papers page
    if (!document.getElementById('papers-grid')) return;

    // Prevent duplicate initialization
    if (window.__researchPapersInitialized) return;
    window.__researchPapersInitialized = true;

    // Render papers
    renderPapers();

    // Setup modal close handlers
    const modal = document.getElementById('paper-modal');
    const closeBtn = modal?.querySelector('.paper-modal-close');
    const overlay = modal?.querySelector('.paper-modal-overlay');

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    if (overlay) {
      overlay.addEventListener('click', closeModal);
    }

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal?.classList.contains('open')) {
        closeModal();
      }
    });

    // Expose viewPaper function globally (for backward compatibility)
    window.viewPaper = viewPaper;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
