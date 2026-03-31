/**
 * LocalFind - Interactive Map
 * Production-grade map implementation with security and performance optimizations
 * 
 * @author Mohammad Faiz
 * @version 4.3.3
 * @updated 2026-03-31
 */

(function () {
  'use strict';

  let map;
  let userMarker;
  let userCircle;
  let businessMarkers = [];
  let markersGroup;

  /**
   * Security: HTML sanitization function to prevent XSS attacks
   * @param {string} str - String to sanitize
   * @returns {string} Sanitized string
   */
  function sanitizeHTML(str) {
    if (!str) return '';
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  }

  /**
   * Initialize map with optimized settings
   */
  function initMap() {
    const loading = document.getElementById('loading');
    const mapStatus = document.getElementById('map-status');

    const defaultCenter = [26.9135, 81.2328];

    map = L.map('map', {
      zoomControl: false,
      tap: true,
      tapTolerance: 15,
      touchZoom: true,
      bounceAtZoomLimits: false,
      zoomAnimation: true,
      zoomAnimationThreshold: 4,
      fadeAnimation: true,
      markerZoomAnimation: true,
      inertia: true,
      inertiaDeceleration: 3000,
      inertiaMaxSpeed: 1500,
      worldCopyJump: false,
      maxBoundsViscosity: 0.0,
      dragging: true,
      trackResize: true,
      boxZoom: false,
      doubleClickZoom: true,
      keyboard: true,
      scrollWheelZoom: true,
      wheelDebounceTime: 40,
      wheelPxPerZoomLevel: 60,
      preferCanvas: false,
      renderer: L.svg({ padding: 0.5 })
    }).setView(defaultCenter, 14);

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      if (map) {
        map.remove();
        map = null;
      }
    }, { once: true });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
      minZoom: 10,
      tileSize: 256,
      zoomOffset: 0,
      detectRetina: true,
      updateWhenIdle: false,
      updateWhenZooming: false,
      keepBuffer: 2,
      maxNativeZoom: 19,
      subdomains: ['a', 'b', 'c'],
      errorTileUrl: '',
      crossOrigin: false
    }).addTo(map);

    markersGroup = L.layerGroup().addTo(map);

    if (window.LISTINGS && window.LISTINGS.length > 0) {
      let markersAdded = 0;

      window.LISTINGS.forEach(business => {
        const added = addBusinessMarker(business);
        if (added) markersAdded++;
      });

      mapStatus.textContent = `Showing ${markersAdded} businesses`;
    } else {
      mapStatus.textContent = 'No businesses to display';
    }

    loading.classList.add('hidden');

    optimizeMapPerformance();
    requestUserLocation();
    setupControls();
    setupSearch();
  }

  /**
   * Optimize map performance for smooth interactions
   */
  function optimizeMapPerformance() {
    map.on('dragstart', () => {
      map._fadeAnimated = false;
      map._zoomAnimated = false;
    });

    map.on('dragend', () => {
      map._fadeAnimated = true;
      map._zoomAnimated = true;
    });

    let moveTimeout;
    map.on('move', () => {
      if (moveTimeout) clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
        // Map movement complete
      }, 100);
    });

    map.on('zoomend', () => {
      setTimeout(() => {
        map.invalidateSize({ pan: false });
      }, 100);
    });
  }

  /**
   * Create custom marker icon
   * @param {string} type - Marker type (user, featured, regular)
   * @returns {L.DivIcon} Leaflet div icon
   */
  function createCustomIcon(type) {
    const className = type === 'user' ? 'user' : (type === 'featured' ? 'featured' : 'regular');
    return L.divIcon({
      className: 'custom-marker',
      html: `<div class="marker-pin ${className}"></div>`,
      iconSize: [34, 34],
      iconAnchor: [17, 34],
      popupAnchor: [0, -34]
    });
  }

  /**
   * Add business marker to map
   * @param {Object} business - Business data object
   * @returns {boolean} Success status
   */
  function addBusinessMarker(business) {
    const coords = extractCoordinates(business);
    if (!coords) {
      return false;
    }

    const icon = createCustomIcon(business.featured ? 'featured' : 'regular');
    const marker = L.marker(coords, { icon: icon });

    const popupContent = `
      <div style="min-width: 200px; max-width: 260px;">
        <div class="popup-title">
          ${sanitizeHTML(business.name)}
          ${business.verified ? '<i class="fa-solid fa-circle-check" style="color: #4ECDC4;"></i>' : ''}
        </div>
        <div class="popup-category">
          <i class="fa-solid fa-tag"></i> ${sanitizeHTML(business.category)}
        </div>
        ${business.rating > 0 ? `
          <div class="popup-rating">
            <i class="fa-solid fa-star" style="color: #FFD700;"></i> ${business.rating} / 5
          </div>
        ` : ''}
        <div class="popup-address">
          ${sanitizeHTML((business.address || '').substring(0, 90))}${(business.address || '').length > 90 ? '...' : ''}
        </div>
        <a href="business-detail.html?id=${encodeURIComponent(business.id)}" class="popup-btn">
          View Details
        </a>
      </div>
    `;

    marker.bindPopup(popupContent);
    marker.addTo(markersGroup);
    businessMarkers.push(marker);

    return true;
  }

  /**
   * Extract coordinates from business data
   * @param {Object} business - Business object
   * @returns {Array|null} [lat, lng] or null
   */
  function extractCoordinates(business) {
    // Get coordinates from business data
    if (business.coordinates && business.coordinates.lat && business.coordinates.lng) {
      const lat = business.coordinates.lat;
      const lng = business.coordinates.lng;
      
      // Validate coordinates are within reasonable bounds for Rasauli and Barabanki area (widened range)
      const isValidLat = lat >= 26.88 && lat <= 26.95;
      const isValidLng = lng >= 81.15 && lng <= 81.29;
      
      // Return null for invalid coordinates
      if (!isValidLat || !isValidLng) {
        return null;
      }
      
      return [lat, lng];
    }
    
    return null;
  }

  /**
   * Request user's geolocation with high accuracy
   */
  function requestUserLocation() {
    const mapStatus = document.getElementById('map-status');

    if (!navigator.geolocation) {
      mapStatus.innerHTML = '<i class="fa-solid fa-circle-xmark" style="color: #e74c3c;"></i> Geolocation not supported';
      return;
    }

    mapStatus.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Getting precise location...';

    // First attempt with high accuracy
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const accuracy = position.coords.accuracy;
        const userLocation = [position.coords.latitude, position.coords.longitude];

        if (userMarker) {
          map.removeLayer(userMarker);
        }
        if (userCircle) {
          map.removeLayer(userCircle);
        }

        const existingPrompt = document.getElementById('location-prompt');
        if (existingPrompt) {
          existingPrompt.remove();
        }

        const userIcon = createCustomIcon('user');
        userMarker = L.marker(userLocation, {
          icon: userIcon,
          title: `Your Location (±${Math.round(accuracy)}m accuracy)`
        }).addTo(map);

        // Show accuracy in popup
        const accuracyText = accuracy < 50 ? 'High accuracy' : accuracy < 100 ? 'Good accuracy' : 'Low accuracy';
        userMarker.bindPopup(`<b>Your Location</b><br><small>${accuracyText} (±${Math.round(accuracy)}m)</small>`).openPopup();

        // Show accuracy circle
        userCircle = L.circle(userLocation, {
          color: '#4285F4',
          fillColor: '#4285F4',
          fillOpacity: 0.1,
          radius: Math.max(accuracy, 50) // Show at least 50m radius
        }).addTo(map);

        map.setView(userLocation, 15);

        // Show accuracy warning if low
        if (accuracy > 100) {
          mapStatus.innerHTML = `<i class="fa-solid fa-circle-exclamation" style="color: #f39c12;"></i> Location found (low accuracy: ±${Math.round(accuracy)}m) • ${window.LISTINGS.length} businesses`;
        } else {
          mapStatus.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #4ECDC4;"></i> Location found (±${Math.round(accuracy)}m) • ${window.LISTINGS.length} businesses`;
        }
      },
      (error) => {
        let errorMsg = '';
        let errorIcon = '<i class="fa-solid fa-circle-exclamation" style="color: #f39c12;"></i>';

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMsg = 'Location permission denied';
            errorIcon = '<i class="fa-solid fa-circle-xmark" style="color: #e74c3c;"></i>';
            showLocationPrompt('permission');
            break;
          case error.POSITION_UNAVAILABLE:
            errorMsg = 'GPS signal unavailable. Try moving outdoors.';
            showLocationPrompt('gps');
            break;
          case error.TIMEOUT:
            errorMsg = 'Location request timed out. Retrying...';
            // Retry with lower accuracy requirements
            retryLocationWithLowerAccuracy();
            return;
          default:
            errorMsg = 'Unable to retrieve location';
        }

        mapStatus.innerHTML = `${errorIcon} ${errorMsg} • ${window.LISTINGS.length} businesses`;
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }
    );
  }

  /**
   * Retry location request with lower accuracy (faster but less precise)
   */
  function retryLocationWithLowerAccuracy() {
    const mapStatus = document.getElementById('map-status');
    mapStatus.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Retrying with network location...';

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const accuracy = position.coords.accuracy;
        const userLocation = [position.coords.latitude, position.coords.longitude];

        if (userMarker) {
          map.removeLayer(userMarker);
        }
        if (userCircle) {
          map.removeLayer(userCircle);
        }

        const userIcon = createCustomIcon('user');
        userMarker = L.marker(userLocation, {
          icon: userIcon,
          title: `Your Location (±${Math.round(accuracy)}m accuracy)`
        }).addTo(map);

        userMarker.bindPopup(`<b>Your Location</b><br><small>Network-based (±${Math.round(accuracy)}m)</small>`).openPopup();

        userCircle = L.circle(userLocation, {
          color: '#4285F4',
          fillColor: '#4285F4',
          fillOpacity: 0.1,
          radius: Math.max(accuracy, 100)
        }).addTo(map);

        map.setView(userLocation, 14);

        mapStatus.innerHTML = `<i class="fa-solid fa-circle-exclamation" style="color: #f39c12;"></i> Approximate location (±${Math.round(accuracy)}m) • ${window.LISTINGS.length} businesses`;
      },
      (error) => {
        mapStatus.innerHTML = `<i class="fa-solid fa-circle-xmark" style="color: #e74c3c;"></i> Unable to get location • ${window.LISTINGS.length} businesses`;
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 60000 // Accept cached location up to 1 minute old
      }
    );
  }

  /**
   * Show location permission prompt
   * @param {string} type - Prompt type (permission or gps)
   */
  function showLocationPrompt(type) {
    const mapInfoBox = document.querySelector('.map-info-box');

    const existingPrompt = document.getElementById('location-prompt');
    if (existingPrompt) {
      existingPrompt.remove();
    }

    const prompt = document.createElement('div');
    prompt.id = 'location-prompt';
    prompt.style.cssText = `
      margin-top: 14px;
      padding: 16px;
      background: rgba(44, 62, 80, 0.95);
      border: 2px solid #FF6B35;
      border-radius: 12px;
      font-size: 14px;
      line-height: 1.6;
      color: #ffffff;
    `;

    if (type === 'permission') {
      prompt.innerHTML = `
        <div style="margin-bottom: 12px; color: #ffffff;">
          <i class="fa-solid fa-location-dot" style="color: #FF6B35;"></i>
          <strong style="color: #ffffff; font-size: 15px; margin-left: 6px;">Enable Location Access</strong>
        </div>
        <p style="margin: 0 0 14px 0; font-size: 13px; color: #e0e0e0; line-height: 1.6;">
          Allow location access to see businesses near you.
        </p>
        <button class="retry-location-btn" style="
          background: #FF6B35;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(255, 107, 53, 0.3);
          transition: all 0.2s;
        ">
          <i class="fa-solid fa-location-crosshairs"></i> Try Again
        </button>
      `;
    } else if (type === 'gps') {
      prompt.innerHTML = `
        <div style="margin-bottom: 12px; color: #ffffff;">
          <i class="fa-solid fa-satellite-dish" style="color: #FF6B35;"></i>
          <strong style="color: #ffffff; font-size: 15px; margin-left: 6px;">GPS Signal Weak</strong>
        </div>
        <p style="margin: 0 0 8px 0; font-size: 13px; color: #e0e0e0; line-height: 1.6;">
          For better accuracy:
        </p>
        <ul style="margin: 0 0 14px 0; padding-left: 20px; font-size: 13px; color: #e0e0e0;">
          <li>Move outdoors or near a window</li>
          <li>Enable GPS/Location Services</li>
          <li>Check if location is blocked in browser</li>
        </ul>
        <button class="retry-location-btn" style="
          background: #FF6B35;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(255, 107, 53, 0.3);
          transition: all 0.2s;
        ">
          <i class="fa-solid fa-rotate"></i> Retry
        </button>
      `;
    }

    mapInfoBox.appendChild(prompt);

    const retryBtn = prompt.querySelector('.retry-location-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', requestUserLocation);
    }
  }

  /**
   * Setup map controls
   */
  function setupControls() {
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const locateBtn = document.getElementById('locate-me');
    const showAllBtn = document.getElementById('show-all');

    if (zoomInBtn) {
      zoomInBtn.addEventListener('click', () => {
        map.zoomIn();
      });
    }

    if (zoomOutBtn) {
      zoomOutBtn.addEventListener('click', () => {
        map.zoomOut();
      });
    }

    if (locateBtn) {
      locateBtn.addEventListener('click', () => {
        if (userMarker) {
          map.setView(userMarker.getLatLng(), 15);
          userMarker.openPopup();
        } else {
          requestUserLocation();
        }
      });
    }

    if (showAllBtn) {
      showAllBtn.addEventListener('click', () => {
        const bounds = L.latLngBounds();

        businessMarkers.forEach(marker => {
          bounds.extend(marker.getLatLng());
        });

        if (userMarker) {
          bounds.extend(userMarker.getLatLng());
        }

        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [50, 50] });
        }
      });
    }
  }

  /**
   * Expand search query with aliases
   * @param {string} query - Original search query
   * @returns {Array} Array of search terms including aliases
   */
  function expandSearchQuery(query) {
    const queryLower = query.toLowerCase().trim();
    const searchTerms = [queryLower];

    if (window.CONFIG && window.CONFIG.searchAliases) {
      if (window.CONFIG.searchAliases[queryLower]) {
        searchTerms.push(...window.CONFIG.searchAliases[queryLower]);
      }

      Object.keys(window.CONFIG.searchAliases).forEach(key => {
        const aliases = window.CONFIG.searchAliases[key];
        if (aliases.some(alias => alias.includes(queryLower))) {
          searchTerms.push(key);
          searchTerms.push(...aliases);
        }
      });
    }
    return [...new Set(searchTerms)];
  }

  /**
   * Check if text matches any of the search terms
   * @param {string} text - Text to search in
   * @param {Array} searchTerms - Array of search terms
   * @returns {boolean} True if any term matches
   */
  function matchesSearchTerms(text, searchTerms) {
    if (!text) return false;
    const textLower = text.toLowerCase();
    return searchTerms.some(term => textLower.includes(term));
  }

  /**
   * Calculate relevance score for a business based on search terms
   * @param {Object} business - Business object
   * @param {Array} searchTerms - Array of search terms
   * @param {string} originalQuery - Search query
   * @returns {number} Relevance score (higher is better)
   */
  function calculateRelevance(business, searchTerms, originalQuery) {
    let score = 0;
    const queryLower = originalQuery.toLowerCase();
    const nameLower = business.name.toLowerCase();
    const categoryLower = business.category.toLowerCase();
    const descLower = (business.description || '').toLowerCase();

    if (nameLower === queryLower) score += 1000;
    if (nameLower.startsWith(queryLower)) score += 500;
    if (nameLower.includes(queryLower)) score += 300;

    if (categoryLower === queryLower) score += 200;
    if (categoryLower.includes(queryLower)) score += 150;

    if (Array.isArray(business.tags)) {
      business.tags.forEach(tag => {
        const tagLower = tag.toLowerCase();
        if (tagLower === queryLower) score += 100;
        else if (tagLower.includes(queryLower)) score += 50;
      });
    }

    if (descLower.includes(queryLower)) score += 10;

    if (business.featured) score += 5;
    if (business.verified) score += 5;
    score += business.rating * 2;

    return score;
  }

  /**
   * Format distance nicely
   * @param {number} meters - Distance in meters
   * @returns {string} Formatted string
   */
  function formatDistance(meters) {
    if (meters < 1000) return `${Math.round(meters)}m away`;
    return `${(meters / 1000).toFixed(1)} km away`;
  }

  /**
   * Setup search functionality
   */
  function setupSearch() {
    const searchInput = document.getElementById('map-search');
    const clearBtn = document.getElementById('clear-search');
    const searchResults = document.getElementById('search-results');
    let allMarkers = [...businessMarkers];

    searchResults.addEventListener('touchstart', (e) => {
      e.stopPropagation();
    }, { passive: true });

    searchResults.addEventListener('touchmove', (e) => {
      e.stopPropagation();
    }, { passive: true });

    searchResults.addEventListener('touchend', (e) => {
      e.stopPropagation();
    }, { passive: true });

    searchResults.addEventListener('wheel', (e) => {
      e.stopPropagation();
    }, { passive: true });

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim();

      if (query) {
        clearBtn.classList.add('visible');
      } else {
        clearBtn.classList.remove('visible');
        searchResults.classList.remove('visible');
      }

      if (!query) {
        allMarkers.forEach(marker => {
          if (!map.hasLayer(marker)) {
            marker.addTo(map);
          }
        });
        return;
      }

      // Check if user location is available
      const userLatLng = userMarker ? userMarker.getLatLng() : null;
      const searchTerms = expandSearchQuery(query);

      const matchingBusinesses = [];
      window.LISTINGS.forEach((business, index) => {
        // Expand search logic to match relevance
        const matches = matchesSearchTerms(business.name, searchTerms) ||
          matchesSearchTerms(business.description, searchTerms) ||
          matchesSearchTerms(business.category, searchTerms) ||
          (Array.isArray(business.tags) && business.tags.some(t => matchesSearchTerms(t, searchTerms)));

        if (matches) {
          // Calculate distance if user location is known
          let distance = null;
          let distanceFormatted = '';
          const bizCoords = extractCoordinates(business);

          if (userLatLng && bizCoords && map) {
            const bizLatLng = L.latLng(bizCoords[0], bizCoords[1]);
            distance = map.distance(userLatLng, bizLatLng);
            distanceFormatted = formatDistance(distance);
          }

          matchingBusinesses.push({
            business,
            index,
            score: calculateRelevance(business, searchTerms, query),
            distance,
            distanceFormatted
          });
        }
      });

      // Group by Relevance Tiers to ensure exact matches always beat weak description matches
      function getRelevanceTier(score) {
        if (score >= 100) return 1; // Name, Category, or Exact Tag match
        if (score >= 50) return 2;  // Partial Tag match
        return 3;                   // Weak match (Description only)
      }

      // Sort matches: Primary by Relevance Tier, Secondary by Distance
      matchingBusinesses.sort((a, b) => {
        const tierA = getRelevanceTier(a.score);
        const tierB = getRelevanceTier(b.score);

        if (tierA !== tierB) {
          return tierA - tierB; // Lower tier number is better
        }

        // If same tier, sort by proximity
        if (a.distance !== null && b.distance !== null) {
          return a.distance - b.distance;
        } else if (a.distance !== null) {
          return -1;
        } else if (b.distance !== null) {
          return 1;
        } else {
          // Fallback to strict score match
          return b.score - a.score;
        }
      });

      if (matchingBusinesses.length > 0) {
        searchResults.innerHTML = matchingBusinesses.map(({ business, distanceFormatted }) => `
          <div class="search-result-item" data-business-id="${sanitizeHTML(business.id)}" role="option">
            <div class="search-result-name" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
              <div>
                ${sanitizeHTML(business.name)}
                ${business.featured ? '<span class="search-result-badge"><i class="fa-solid fa-star"></i> Featured</span>' : ''}
                ${business.verified ? '<i class="fa-solid fa-circle-check" style="color: #4ECDC4;"></i>' : ''}
              </div>
              ${distanceFormatted ? `<span style="font-size: 11px; color: var(--text-muted); background: rgba(255,138,0,0.1); padding: 2px 6px; border-radius: 4px; white-space: nowrap;"><i class="fa-solid fa-location-arrow" style="font-size: 10px; margin-right: 3px; color: var(--accent-primary);"></i>${distanceFormatted}</span>` : ''}
            </div>
            <div class="search-result-category">
              <i class="fa-solid fa-tag"></i>
              ${sanitizeHTML(business.category)}
            </div>
          </div>
        `).join('');
        searchResults.classList.add('visible');

        searchResults.querySelectorAll('.search-result-item').forEach(item => {
          item.addEventListener('click', () => {
            const businessId = item.getAttribute('data-business-id');
            navigateToBusinessOnMap(businessId);
            searchResults.classList.remove('visible');
          });
        });
      } else {
        searchResults.innerHTML = '<div class="no-results">No businesses found near you</div>';
        searchResults.classList.add('visible');
      }

      allMarkers.forEach(marker => {
        map.removeLayer(marker);
      });

      const matchingMarkers = [];
      matchingBusinesses.forEach(({ index }) => {
        if (allMarkers[index]) {
          allMarkers[index].addTo(map);
          matchingMarkers.push(allMarkers[index]);
        }
      });

      if (matchingMarkers.length > 0) {
        const bounds = L.latLngBounds();
        matchingMarkers.forEach(marker => {
          bounds.extend(marker.getLatLng());
        });
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    });

    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      clearBtn.classList.remove('visible');
      searchResults.classList.remove('visible');

      allMarkers.forEach(marker => {
        if (!map.hasLayer(marker)) {
          marker.addTo(map);
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.remove('visible');
      }
    });
  }

  /**
   * Navigate to business on map
   * @param {string} businessId - Business ID
   */
  function navigateToBusinessOnMap(businessId) {
    const business = window.LISTINGS.find(b => b.id === businessId);
    if (!business) return;

    const coords = extractCoordinates(business);
    if (!coords) return;

    const markerIndex = window.LISTINGS.findIndex(b => b.id === businessId);
    const marker = businessMarkers[markerIndex];

    if (marker) {
      map.setView(coords, 17);

      setTimeout(() => {
        marker.openPopup();
      }, 300);
    }
  }

  document.addEventListener('DOMContentLoaded', initMap);
})();
