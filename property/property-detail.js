/**
 * Property Detail Page - Rendering Logic
 */
(function () {
  'use strict';

  function sanitizeHTML(str) {
    if (!str) return '';
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  }

  function initAudioPlayer(button, audio) {
    if (!button || !audio) return;

    button.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
        button.classList.add('playing');
        button.querySelector('i').classList.replace('fa-volume-high', 'fa-pause');
      } else {
        audio.pause();
        button.classList.remove('playing');
        button.querySelector('i').classList.replace('fa-pause', 'fa-volume-high');
      }
    });

    audio.addEventListener('ended', () => {
      button.classList.remove('playing');
      button.querySelector('i').classList.replace('fa-pause', 'fa-volume-high');
    });
  }

  function initGallery(images) {
    if (!images || images.length === 0) return;

    let currentIndex = 0;
    const mainImage = document.getElementById('gallery-main-image');
    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');
    const thumbnails = document.querySelectorAll('.gallery-thumbnail');
    const fullscreenModal = document.getElementById('fullscreen-modal');
    const fullscreenImage = document.getElementById('fullscreen-image');
    const fullscreenClose = document.getElementById('fullscreen-close');

    function updateGallery(index) {
      currentIndex = index;
      mainImage.src = images[index];
      fullscreenImage.src = images[index];
      
      thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
      });
    }

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateGallery(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateGallery(currentIndex);
    });

    thumbnails.forEach((thumb, index) => {
      thumb.addEventListener('click', () => updateGallery(index));
    });

    mainImage.addEventListener('click', () => {
      fullscreenModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    fullscreenClose.addEventListener('click', () => {
      fullscreenModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    fullscreenModal.addEventListener('click', (e) => {
      if (e.target === fullscreenModal) {
        fullscreenModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(location.search);
    const propertyId = params.get('id');
    const content = document.getElementById('property-detail-content');

    if (!window.PROPERTY_DATA) {
      content.innerHTML = '<div class="empty-state"><p>Property data not available</p></div>';
      return;
    }

    const property = window.PROPERTY_DATA.properties.find(p => p.id === propertyId);

    if (!property) {
      content.innerHTML = '<div class="empty-state"><p>Property not found</p></div>';
      return;
    }

    // Get agent if property has one
    const agent = property.agentId 
      ? window.PROPERTY_DATA.agents.find(a => a.id === property.agentId)
      : null;

    // Update breadcrumb
    const breadcrumbName = document.getElementById('property-name');
    if (breadcrumbName) {
      breadcrumbName.textContent = property.title;
    }

    // Use placeholder if no images
    const images = property.images && property.images.length > 0 
      ? property.images 
      : ['property/assets/placeholder.svg'];

    // Render property detail
    content.innerHTML = `
      <!-- Photo Gallery -->
      <div class="property-gallery">
        <div class="gallery-main">
          <img id="gallery-main-image" src="${images[0]}" alt="${sanitizeHTML(property.title)}" class="gallery-main-image">
          ${images.length > 1 ? `
            <button class="gallery-nav gallery-nav-prev" id="gallery-prev">
              <i class="fa-solid fa-chevron-left"></i>
            </button>
            <button class="gallery-nav gallery-nav-next" id="gallery-next">
              <i class="fa-solid fa-chevron-right"></i>
            </button>
          ` : ''}
        </div>
        ${images.length > 1 ? `
          <div class="gallery-thumbnails">
            ${images.map((img, i) => `
              <div class="gallery-thumbnail ${i === 0 ? 'active' : ''}">
                <img src="${img}" alt="Thumbnail ${i + 1}">
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>

      <!-- Fullscreen Modal -->
      <div class="fullscreen-modal" id="fullscreen-modal">
        <div class="fullscreen-content">
          <img id="fullscreen-image" src="${images[0]}" alt="${sanitizeHTML(property.title)}" class="fullscreen-image">
          <button class="fullscreen-close" id="fullscreen-close">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>

      <!-- Property Content -->
      <div class="property-content">
        <!-- Main Content -->
        <div class="property-main">
          <!-- Property Overview -->
          <div class="property-section">
            <h3><i class="fa-solid fa-info-circle"></i> Property Overview</h3>
            <div class="property-overview-grid">
              <div class="overview-item">
                <div class="overview-icon"><i class="fa-solid fa-location-dot"></i></div>
                <div class="overview-label">Location</div>
                <div class="overview-value">${sanitizeHTML(property.location)}</div>
              </div>
              <div class="overview-item">
                <div class="overview-icon"><i class="fa-solid fa-ruler-combined"></i></div>
                <div class="overview-label">Plot/Land Area</div>
                <div class="overview-value">${sanitizeHTML(property.size)}</div>
              </div>
              <div class="overview-item">
                <div class="overview-icon"><i class="fa-solid fa-building"></i></div>
                <div class="overview-label">Type</div>
                <div class="overview-value">${sanitizeHTML(property.type)}</div>
              </div>
              <div class="overview-item">
                <div class="overview-icon"><i class="fa-solid fa-city"></i></div>
                <div class="overview-label">Project & Society</div>
                <div class="overview-value">${sanitizeHTML(property.project)}</div>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="property-section">
            <div class="description-header">
              <h3><i class="fa-solid fa-file-lines"></i> Property Description</h3>
              <button class="listen-btn" id="desc-listen-btn" title="Listen to description">
                <i class="fa-solid fa-volume-high"></i>
              </button>
            </div>
            <audio id="desc-audio" preload="none" style="display: none;">
              <source src="property/voices/${encodeURIComponent(property.id)}/description.mp3" type="audio/mpeg">
            </audio>
            <div class="text-preview" id="desc-preview">
              <p>${sanitizeHTML(property.description)}</p>
            </div>
            ${property.description.length > 300 ? `
              <button class="see-more-btn" id="desc-see-more">
                <span>See More</span>
                <i class="fa-solid fa-chevron-down"></i>
              </button>
            ` : ''}
          </div>

          <!-- Amenities -->
          ${property.amenities && property.amenities.length > 0 ? `
            <div class="property-section">
              <h3><i class="fa-solid fa-star"></i> Amenities</h3>
              <div class="amenities-grid">
                ${property.amenities.map(amenity => `
                  <div class="amenity-item">
                    <i class="fa-solid fa-check"></i>
                    <span>${sanitizeHTML(amenity)}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Project Details -->
          ${property.projectDetails ? `
            <div class="property-section">
              <h3><i class="fa-solid fa-building-circle-check"></i> About ${sanitizeHTML(property.projectDetails.name)}</h3>
              <p>${sanitizeHTML(property.projectDetails.description)}</p>
              ${property.projectDetails.reraApproved ? '<p style="color: var(--accent-success); margin-top: var(--space-sm);"><i class="fa-solid fa-circle-check"></i> RERA Approved</p>' : ''}
            </div>
          ` : ''}

          <!-- Unit Configuration -->
          ${property.unitConfigurations && property.unitConfigurations.length > 0 ? `
            <div class="property-section">
              <h3><i class="fa-solid fa-table"></i> Unit Configuration</h3>
              <table class="unit-table">
                <thead>
                  <tr>
                    <th>Unit Type</th>
                    <th>Area</th>
                    <th>Price (in ₹)</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  ${property.unitConfigurations.map(unit => `
                    <tr>
                      <td>${sanitizeHTML(unit.type)}</td>
                      <td>${sanitizeHTML(unit.area)}</td>
                      <td class="unit-price">${sanitizeHTML(unit.price)}</td>
                      <td><button class="unit-contact-btn"><i class="fa-solid fa-phone"></i></button></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          ` : ''}
        </div>

        <!-- Sidebar -->
        <div class="property-sidebar">
          <!-- Price Card -->
          <div class="property-section">
            <h3 style="font-size: 28px; color: var(--accent-primary); margin-bottom: var(--space-sm);">${sanitizeHTML(property.price)}</h3>
            <p style="color: var(--text-muted); font-size: 14px; margin: 0;">Property Price</p>
          </div>

          <!-- Agent Card -->
          ${agent ? `
            <div class="property-section" style="cursor: pointer;" onclick="window.location.href='agent-detail.html?id=${agent.id}'">
              <h3><i class="fa-solid fa-user-tie"></i> Agent Details</h3>
              <div class="agent-card-detail">
                <div class="agent-logo"></div>
                <div class="agent-info">
                  <h4>${sanitizeHTML(agent.name)}</h4>
                  <div class="agent-location">
                    <i class="fa-solid fa-location-dot"></i>
                    ${sanitizeHTML(agent.location)}
                  </div>
                  <div class="agent-stats-row">
                    <div class="agent-stat-item">
                      <span class="agent-stat-value">${agent.propertiesForSale}</span>
                      <span class="agent-stat-label">For Sale</span>
                    </div>
                    <div class="agent-stat-item">
                      <span class="agent-stat-value">${agent.propertiesForRent}</span>
                      <span class="agent-stat-label">For Rent</span>
                    </div>
                  </div>
                  <button class="contact-agent-btn" onclick="event.stopPropagation(); window.location.href='agent-detail.html?id=${agent.id}'">
                    <i class="fa-solid fa-phone"></i>
                    Contact Agent
                  </button>
                </div>
              </div>
            </div>
          ` : ''}

          <!-- Location -->
          <div class="property-section">
            <h3><i class="fa-solid fa-map-location-dot"></i> Location</h3>
            <p style="color: var(--text-secondary); font-size: 14px;">${sanitizeHTML(property.location)}</p>
          </div>
        </div>
      </div>
    `;

    // Initialize gallery
    if (images.length > 1) {
      initGallery(images);
    } else {
      // Single image fullscreen
      const mainImage = document.getElementById('gallery-main-image');
      const fullscreenModal = document.getElementById('fullscreen-modal');
      const fullscreenImage = document.getElementById('fullscreen-image');
      const fullscreenClose = document.getElementById('fullscreen-close');

      mainImage.addEventListener('click', () => {
        fullscreenModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });

      fullscreenClose.addEventListener('click', () => {
        fullscreenModal.classList.remove('active');
        document.body.style.overflow = '';
      });

      fullscreenModal.addEventListener('click', (e) => {
        if (e.target === fullscreenModal) {
          fullscreenModal.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }

    // Initialize audio player
    const descListenBtn = document.getElementById('desc-listen-btn');
    const descAudio = document.getElementById('desc-audio');
    if (descListenBtn && descAudio) {
      initAudioPlayer(descListenBtn, descAudio);
    }

    // See more/less functionality
    if (property.description.length > 300) {
      const seeMoreBtn = document.getElementById('desc-see-more');
      const descPreview = document.getElementById('desc-preview');
      
      if (seeMoreBtn && descPreview) {
        seeMoreBtn.addEventListener('click', () => {
          const isExpanded = descPreview.classList.contains('expanded');
          descPreview.classList.toggle('expanded');
          seeMoreBtn.classList.toggle('expanded');
          seeMoreBtn.querySelector('span').textContent = isExpanded ? 'See More' : 'See Less';
        });
      }
    }
  });
})();
