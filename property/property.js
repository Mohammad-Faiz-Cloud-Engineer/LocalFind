/**
 * Property Page - Main Logic
 */
(function () {
  'use strict';

  function sanitizeHTML(str) {
    if (!str) return '';
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  }

  let currentMode = 'properties'; // 'properties' or 'agents'

  function sanitizeURL(url) {
    if (!url) return 'property/assets/placeholder.svg';
    // Block dangerous protocols: javascript:, data:, vbscript:, file:, etc.
    const urlLower = url.toLowerCase().trim();
    const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:', 'about:'];
    for (const protocol of dangerousProtocols) {
      if (urlLower.startsWith(protocol)) {
        return 'property/assets/placeholder.svg';
      }
    }
    return url;
  }

  function renderProperties() {
    const propertyContent = document.getElementById('property-content');
    const properties = window.PROPERTY_DATA.properties || [];
    
    if (properties.length === 0) {
      propertyContent.innerHTML = '<div class="empty-state"><p>No properties available</p></div>';
      return;
    }

    propertyContent.innerHTML = `
      <div class="property-grid">
        ${properties.map(property => {
          const imageSrc = property.images && property.images.length > 0 
            ? sanitizeURL(property.images[0])
            : 'property/assets/placeholder.svg';
          
          return `
            <div class="property-card" data-property-id="${sanitizeHTML(property.id)}">
              <img src="${sanitizeHTML(imageSrc)}" alt="${sanitizeHTML(property.title)}" class="property-card-image">
              <div class="property-card-content">
                <h3 class="property-card-title">${sanitizeHTML(property.title)}</h3>
                <div class="property-card-price">${sanitizeHTML(property.price)}</div>
                <div class="property-card-details">
                  <span><i class="fa-solid fa-ruler-combined"></i> ${sanitizeHTML(property.size)}</span>
                  <span><i class="fa-solid fa-building"></i> ${sanitizeHTML(property.type)}</span>
                </div>
                <div class="property-card-location">
                  <i class="fa-solid fa-location-dot"></i>
                  ${sanitizeHTML(property.location)}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Add click handlers after rendering
    document.querySelectorAll('.property-card').forEach(card => {
      card.addEventListener('click', () => {
        const propertyId = card.getAttribute('data-property-id');
        if (propertyId) {
          window.location.href = `property-detail.html?id=${encodeURIComponent(propertyId)}`;
        }
      });
    });

    // Add error handlers for images
    document.querySelectorAll('.property-card-image').forEach(img => {
      img.addEventListener('error', function() {
        this.src = 'property/assets/placeholder.svg';
      });
    });
  }

  function renderAgents() {
    const propertyContent = document.getElementById('property-content');
    const agents = window.PROPERTY_DATA.agents || [];
    
    if (agents.length === 0) {
      propertyContent.innerHTML = '<div class="empty-state"><p>No agents available</p></div>';
      return;
    }

    propertyContent.innerHTML = `
      <div class="agent-grid">
        ${agents.map(agent => {
          const initials = agent.name.split(' ').map(w => w[0]).join('').substring(0, 2);
          return `
            <div class="agent-card" data-agent-id="${sanitizeHTML(agent.id)}">
              <div class="agent-avatar">${sanitizeHTML(initials)}</div>
              <h3 class="agent-name">${sanitizeHTML(agent.name)}</h3>
              <p class="agent-company">${sanitizeHTML(agent.company)}</p>
              <div class="agent-stats">
                <div class="agent-stat">
                  <span class="agent-stat-value">${agent.propertiesForSale}</span>
                  <span class="agent-stat-label">For Sale</span>
                </div>
                <div class="agent-stat">
                  <span class="agent-stat-value">${agent.propertiesForRent}</span>
                  <span class="agent-stat-label">For Rent</span>
                </div>
              </div>
              <button class="btn btn-cta">View Properties</button>
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Add click handlers after rendering
    document.querySelectorAll('.agent-card').forEach(card => {
      card.addEventListener('click', () => {
        const agentId = card.getAttribute('data-agent-id');
        if (agentId) {
          window.location.href = `agent-detail.html?id=${encodeURIComponent(agentId)}`;
        }
      });
    });
  }

  function toggleMode() {
    const toggleBtn = document.getElementById('toggle-mode-btn');
    const pageTitle = document.getElementById('property-page-title');
    const pageSubtitle = document.getElementById('property-page-subtitle');
    const breadcrumb = document.getElementById('property-breadcrumb');

    if (currentMode === 'properties') {
      // Switch to agents mode
      currentMode = 'agents';
      toggleBtn.innerHTML = '<i class="fa-solid fa-building"></i><span>View Properties</span>';
      pageTitle.textContent = 'Property Agents & Brokers';
      pageSubtitle.textContent = 'Connect with verified real estate professionals';
      breadcrumb.textContent = 'Agents & Brokers';
      renderAgents();
    } else {
      // Switch to properties mode
      currentMode = 'properties';
      toggleBtn.innerHTML = '<i class="fa-solid fa-user-tie"></i><span>Find Agents</span>';
      pageTitle.textContent = 'Available Properties';
      pageSubtitle.textContent = 'Explore properties in your area';
      breadcrumb.textContent = 'Properties';
      renderProperties();
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!window.PROPERTY_DATA) {
      const propertyContent = document.getElementById('property-content');
      propertyContent.innerHTML = '<div class="empty-state"><p>Property data not available</p></div>';
      return;
    }

    const toggleBtn = document.getElementById('toggle-mode-btn');
    
    // Show properties by default
    renderProperties();

    // Toggle button handler
    toggleBtn.addEventListener('click', toggleMode);
  });
})();
