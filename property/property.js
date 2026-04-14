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

  document.addEventListener('DOMContentLoaded', () => {
    const findAgentBtn = document.getElementById('find-agent-btn');
    const browsePropertiesBtn = document.getElementById('browse-properties-btn');
    const propertyContent = document.getElementById('property-content');
    const breadcrumb = document.getElementById('property-breadcrumb');

    if (!window.PROPERTY_DATA) {
      propertyContent.innerHTML = '<div class="empty-state"><p>Property data not available</p></div>';
      return;
    }

    // Find Agent Mode
    findAgentBtn.addEventListener('click', () => {
      breadcrumb.textContent = 'Agents & Brokers';
      propertyContent.classList.remove('hidden');
      
      const agents = window.PROPERTY_DATA.agents || [];
      
      if (agents.length === 0) {
        propertyContent.innerHTML = '<div class="empty-state"><p>No agents available</p></div>';
        return;
      }

      propertyContent.innerHTML = `
        <h2>Property Agents & Brokers</h2>
        <div class="agent-grid">
          ${agents.map(agent => {
            const initials = agent.name.split(' ').map(w => w[0]).join('').substring(0, 2);
            return `
              <div class="agent-card" onclick="window.location.href='agent-detail.html?id=${agent.id}'">
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
    });

    // Browse Properties Mode
    browsePropertiesBtn.addEventListener('click', () => {
      breadcrumb.textContent = 'Browse Properties';
      propertyContent.classList.remove('hidden');
      
      const properties = window.PROPERTY_DATA.properties || [];
      
      if (properties.length === 0) {
        propertyContent.innerHTML = '<div class="empty-state"><p>No properties available</p></div>';
        return;
      }

      propertyContent.innerHTML = `
        <h2>Available Properties</h2>
        <div class="property-grid">
          ${properties.map(property => {
            const imageSrc = property.images && property.images.length > 0 
              ? property.images[0] 
              : 'property/assets/placeholder.svg';
            
            return `
              <div class="property-card" onclick="window.location.href='property-detail.html?id=${property.id}'">
                <img src="${imageSrc}" alt="${sanitizeHTML(property.title)}" class="property-card-image" onerror="this.src='property/assets/placeholder.svg'">
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
    });
  });
})();
