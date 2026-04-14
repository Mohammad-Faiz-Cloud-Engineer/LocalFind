/**
 * Agent Detail Page - Rendering Logic
 */
(function () {
  'use strict';

  function sanitizeHTML(str) {
    if (!str) return '';
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  }

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

  function validateAgentId(id) {
    // Only allow alphanumeric characters and hyphens
    return /^[a-zA-Z0-9-]+$/.test(id) ? id : null;
  }

  function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('active');
    });
    document.getElementById(`${tabName}-tab`).classList.add('active');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(location.search);
    const agentId = params.get('id');
    const content = document.getElementById('agent-detail-content');

    if (!window.PROPERTY_DATA) {
      content.innerHTML = '<div class="empty-state"><p>Agent data not available</p></div>';
      return;
    }

    // Validate agent ID
    const validatedId = validateAgentId(agentId);
    if (!validatedId) {
      content.innerHTML = '<div class="empty-state"><p>Invalid agent ID</p></div>';
      return;
    }

    const agent = window.PROPERTY_DATA.agents.find(a => a.id === validatedId);

    if (!agent) {
      content.innerHTML = '<div class="empty-state"><p>Agent not found</p></div>';
      return;
    }

    // Update breadcrumb
    const breadcrumbName = document.getElementById('agent-name');
    if (breadcrumbName) {
      breadcrumbName.textContent = agent.name;
    }

    // Get agent properties
    const agentProperties = window.PROPERTY_DATA.properties.filter(p => p.agentId === agentId);
    const saleProperties = agentProperties.filter(p => !p.forRent);
    const rentProperties = agentProperties.filter(p => p.forRent);

    // Get agent projects (unique)
    const projects = [...new Set(agentProperties.map(p => p.project))].map(projectName => {
      const prop = agentProperties.find(p => p.project === projectName);
      return {
        name: projectName,
        location: prop.location,
        properties: agentProperties.filter(p => p.project === projectName),
        reraApproved: prop.projectDetails?.reraApproved || false
      };
    });

    const initials = agent.name.split(' ').map(w => w[0]).join('').substring(0, 2);

    // Render agent detail
    content.innerHTML = `
      <!-- Agent Header -->
      <div class="agent-header">
        <div class="agent-logo-large">${sanitizeHTML(initials)}</div>
        <div class="agent-header-info">
          <div class="agent-header-top">
            <h1 class="agent-title">${sanitizeHTML(agent.name)}</h1>
            ${agent.verified ? '<i class="fa-solid fa-circle-check agent-verified"></i>' : ''}
          </div>
          <div class="agent-location-header">
            <i class="fa-solid fa-location-dot"></i>
            ${sanitizeHTML(agent.location)}
          </div>
          <div class="agent-rating">
            <div class="rating-badge">
              <i class="fa-solid fa-star"></i>
              ${agent.rating || '0'}
            </div>
            <span class="rating-count">${agent.reviewCount || '0'} reviews</span>
          </div>
        </div>
        <div class="agent-header-actions">
          <div class="agent-phone-display" id="agent-phone-display-header" style="display: none; margin-bottom: var(--space-sm); padding: var(--space-sm); background: rgba(255, 138, 0, 0.1); border-radius: var(--radius-md); text-align: center;">
            <a href="tel:${sanitizeHTML(agent.phone)}" style="color: var(--accent-primary); font-size: 18px; font-weight: 700; text-decoration: none;">
              <i class="fa-solid fa-phone"></i> ${sanitizeHTML(agent.phone)}
            </a>
          </div>
          <button class="btn-view-contact" id="btn-view-contact-header" data-phone="${sanitizeHTML(agent.phone)}">VIEW CONTACT</button>
          ${agent.reraStatus ? `
            <div class="rera-status">
              <span class="rera-badge">RERA REGISTERED</span>
            </div>
          ` : ''}
        </div>
      </div>

      <!-- Tabs -->
      <div class="agent-tabs">
        <button class="tab-btn active" data-tab="overview" onclick="window.switchTab('overview')">
          Overview
        </button>
        <button class="tab-btn" data-tab="sale" onclick="window.switchTab('sale')">
          Sale <span class="tab-count">(${saleProperties.length})</span>
        </button>
        <button class="tab-btn" data-tab="rent" onclick="window.switchTab('rent')">
          Rent <span class="tab-count">(${rentProperties.length})</span>
        </button>
        <button class="tab-btn" data-tab="project" onclick="window.switchTab('project')">
          Project <span class="tab-count">(${projects.length})</span>
        </button>
        <button class="tab-btn" data-tab="review" onclick="window.switchTab('review')">
          Review <span class="tab-count">(${agent.reviewCount || '0'})</span>
        </button>
      </div>

      <!-- Overview Tab -->
      <div id="overview-tab" class="tab-content active">
        <!-- About Section -->
        <div class="overview-section">
          <h3>About ${sanitizeHTML(agent.name)}</h3>
          <p>${sanitizeHTML(agent.description || 'No description available.')}</p>
        </div>

        <!-- Areas of Operation -->
        ${agent.areasOfOperation ? `
          <div class="overview-section">
            <h3>Areas of Operation</h3>
            <div class="areas-grid">
              ${agent.areasOfOperation.slice(0, 12).map((area, index) => `
                <div class="area-tag ${index === 0 ? 'primary' : ''}">${sanitizeHTML(area)}</div>
              `).join('')}
              ${agent.areasOfOperation.length > 12 ? '<span class="more-link">more</span>' : ''}
            </div>
          </div>
        ` : ''}

        <!-- Property Deals In -->
        ${agent.propertyDeals ? `
          <div class="overview-section">
            <h3>Property Deals In</h3>
            <div class="deals-grid">
              ${agent.propertyDeals.map(deal => `
                <div class="deal-tag">${sanitizeHTML(deal)}</div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Services Offered -->
        ${agent.services ? `
          <div class="overview-section">
            <h3>Services Offered</h3>
            <div class="services-grid">
              ${agent.services.map(service => `
                <div class="service-tag">${sanitizeHTML(service)}</div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- More Information -->
        <div class="overview-section">
          <h3>More information</h3>
          <h4>${sanitizeHTML(agent.name)}</h4>
          <div class="info-grid">
            ${agent.ownerName ? `
              <div class="info-item">
                <i class="fa-solid fa-user info-icon"></i>
                <div class="info-text">${sanitizeHTML(agent.ownerName)}</div>
              </div>
            ` : ''}
            ${agent.experience ? `
              <div class="info-item">
                <i class="fa-solid fa-briefcase info-icon"></i>
                <div class="info-text">${sanitizeHTML(agent.experience)}</div>
              </div>
            ` : ''}
            ${agent.website ? `
              <div class="info-item">
                <i class="fa-solid fa-globe info-icon"></i>
                <div class="info-text">
                  <a href="${sanitizeHTML(agent.website)}" target="_blank" rel="noopener noreferrer" class="info-link">
                    ${sanitizeHTML(agent.website)}
                  </a>
                </div>
              </div>
            ` : ''}
            ${agent.teamSize ? `
              <div class="info-item">
                <i class="fa-solid fa-users info-icon"></i>
                <div class="info-text">${sanitizeHTML(agent.teamSize)}</div>
              </div>
            ` : ''}
          </div>
          <div class="agent-phone-display" id="agent-phone-display-footer" style="display: none; margin: var(--space-md) 0; padding: var(--space-sm); background: rgba(255, 138, 0, 0.1); border-radius: var(--radius-md); text-align: center;">
            <a href="tel:${sanitizeHTML(agent.phone)}" style="color: var(--accent-primary); font-size: 18px; font-weight: 700; text-decoration: none;">
              <i class="fa-solid fa-phone"></i> ${sanitizeHTML(agent.phone)}
            </a>
          </div>
          <div class="btn-view-contact-section">
            <button class="btn-view-contact" id="btn-view-contact-footer" data-phone="${sanitizeHTML(agent.phone)}">VIEW CONTACT</button>
          </div>
        </div>
      </div>

      <!-- Sale Tab -->
      <div id="sale-tab" class="tab-content">
        <div class="properties-section">
          <h2>Properties for Sale by ${sanitizeHTML(agent.name)}</h2>
          ${saleProperties.length > 0 ? `
            <div class="properties-grid">
              ${saleProperties.map(property => {
                const imageSrc = property.images && property.images.length > 0 
                  ? sanitizeURL(property.images[0])
                  : 'property/assets/placeholder.svg';
                
                return `
                  <div class="property-card-agent" data-property-id="${sanitizeHTML(property.id)}">
                    <img src="${sanitizeHTML(imageSrc)}" alt="${sanitizeHTML(property.title)}" class="property-image">
                    <div class="property-card-content">
                      <h3 class="property-title">${sanitizeHTML(property.title)}</h3>
                      <div class="property-size">${sanitizeHTML(property.size)}</div>
                      <div class="property-price">${sanitizeHTML(property.price)}</div>
                      <div class="property-location">
                        <i class="fa-solid fa-location-dot"></i>
                        ${sanitizeHTML(property.location)}
                      </div>
                      <div class="property-society">
                        <span class="property-society-label">Society :</span>
                        <a href="#" class="property-society-link">${sanitizeHTML(property.society)}</a>
                      </div>
                      <button class="btn-ask-price">Ask for best Price</button>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          ` : '<p style="color: var(--text-muted); text-align: center; padding: var(--space-3xl);">No properties for sale</p>'}
        </div>
      </div>

      <!-- Rent Tab -->
      <div id="rent-tab" class="tab-content">
        <div class="properties-section">
          <h2>Properties for Rent by ${sanitizeHTML(agent.name)}</h2>
          ${rentProperties.length > 0 ? `
            <div class="properties-grid">
              ${rentProperties.map(property => {
                const imageSrc = property.images && property.images.length > 0 
                  ? sanitizeURL(property.images[0])
                  : 'property/assets/placeholder.svg';
                
                return `
                  <div class="property-card-agent" data-property-id="${sanitizeHTML(property.id)}">
                    <img src="${sanitizeHTML(imageSrc)}" alt="${sanitizeHTML(property.title)}" class="property-image">
                    <div class="property-card-content">
                      <h3 class="property-title">${sanitizeHTML(property.title)}</h3>
                      <div class="property-size">${sanitizeHTML(property.size)}</div>
                      <div class="property-price">${sanitizeHTML(property.price)}</div>
                      <div class="property-location">
                        <i class="fa-solid fa-location-dot"></i>
                        ${sanitizeHTML(property.location)}
                      </div>
                      <button class="btn-ask-price">Ask for best Price</button>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          ` : '<p style="color: var(--text-muted); text-align: center; padding: var(--space-3xl);">No properties for rent</p>'}
        </div>
      </div>

      <!-- Project Tab -->
      <div id="project-tab" class="tab-content">
        <div class="properties-section">
          <h2>Highlighted Projects by ${sanitizeHTML(agent.name)}</h2>
          ${projects.length > 0 ? `
            <div class="projects-grid">
              ${projects.map(project => {
                const projectProps = project.properties;
                const minPrice = Math.min(...projectProps.map(p => parseFloat(p.price.replace(/[^\d.]/g, ''))));
                const maxPrice = Math.max(...projectProps.map(p => parseFloat(p.price.replace(/[^\d.]/g, ''))));
                const imageSrc = projectProps[0].images && projectProps[0].images.length > 0 
                  ? sanitizeURL(projectProps[0].images[0])
                  : 'property/assets/placeholder.svg';
                
                return `
                  <div class="project-card">
                    <div class="project-image">
                      <img src="${sanitizeHTML(imageSrc)}" alt="${sanitizeHTML(project.name)}" style="width: 100%; height: 100%; object-fit: cover;">
                      ${project.reraApproved ? '<div class="rera-badge-overlay">RERA REGISTERED</div>' : ''}
                    </div>
                    <div class="project-card-content">
                      <a href="#" class="project-name">${sanitizeHTML(project.name)}</a>
                      <div class="project-location">${sanitizeHTML(project.location)}</div>
                      <div class="project-price-range">₹ ${minPrice.toFixed(2)} - ${maxPrice.toFixed(2)} Lac</div>
                      <button class="btn-contact-agent">Contact Agent</button>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          ` : '<p style="color: var(--text-muted); text-align: center; padding: var(--space-3xl);">No projects available</p>'}
        </div>
      </div>

      <!-- Review Tab -->
      <div id="review-tab" class="tab-content">
        <div class="properties-section">
          <h2>Reviews</h2>
          <p style="color: var(--text-muted); text-align: center; padding: var(--space-3xl);">Reviews coming soon</p>
        </div>
      </div>
    `;

    // Make switchTab function globally available
    window.switchTab = switchTab;

    // Add click handlers for property cards
    document.querySelectorAll('.property-card-agent').forEach(card => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        const propertyId = card.getAttribute('data-property-id');
        if (propertyId) {
          window.location.href = `property-detail.html?id=${encodeURIComponent(propertyId)}`;
        }
      });
    });

    // Add error handlers for images
    document.querySelectorAll('.property-image, .project-image img').forEach(img => {
      img.addEventListener('error', function() {
        this.src = 'property/assets/placeholder.svg';
      });
    });

    // VIEW CONTACT button functionality
    const viewContactButtons = document.querySelectorAll('.btn-view-contact');
    viewContactButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const phone = btn.getAttribute('data-phone');
        
        // Find the corresponding phone display element
        let phoneDisplay;
        if (btn.id === 'btn-view-contact-header') {
          phoneDisplay = document.getElementById('agent-phone-display-header');
        } else if (btn.id === 'btn-view-contact-footer') {
          phoneDisplay = document.getElementById('agent-phone-display-footer');
        }
        
        if (phoneDisplay) {
          // Show phone number
          phoneDisplay.style.display = 'block';
          // Hide the button
          btn.style.display = 'none';
        } else if (phone) {
          // Fallback: open phone dialer
          window.location.href = `tel:${phone}`;
        }
      });
    });
  });
})();
