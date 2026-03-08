/**
 * UPI App Chooser Modal
 * Handles custom platform-based UPI app selection to bypass Android 11+ package visibility restrictions.
 */
(function () {
    'use strict';

    // Supported UPI Apps with Brand Colors and Intent Configurations
    const UPI_APPS = [
        { id: 'gpay', name: 'Google Pay', pkg: 'com.google.android.apps.nbu.paisa.user', color: '#4285F4', textCol: '#fff', priority: 'high', scheme: 'tez' },
        { id: 'phonepe', name: 'PhonePe', pkg: 'com.phonepe.app', color: '#5f259f', textCol: '#fff', priority: 'high', scheme: 'phonepe', act: 'pay' },
        { id: 'paytm', name: 'Paytm', pkg: 'net.one97.paytm', color: '#00baf2', textCol: '#fff', priority: 'high', scheme: 'paytm' },
        { id: 'bhim', name: 'BHIM', pkg: 'in.org.npci.upiapp', color: '#4B0082', textCol: '#fff', priority: 'medium', scheme: 'bhim', act: 'pay' },
        { id: 'amazon', name: 'Amazon Pay', pkg: 'in.amazon.mShop.android.shopping', color: '#00A8E1', textCol: '#fff', priority: 'medium', scheme: 'amazonpay' },
        { id: 'fampay', name: 'FamPay', pkg: 'in.fampay.app', color: '#FF6B00', textCol: '#fff', priority: 'medium', scheme: 'fampay', act: 'pay' },
        { id: 'navi', name: 'Navi', pkg: 'com.naviapp', color: '#6C5DD3', textCol: '#fff', priority: 'medium', scheme: 'navi' },
        { id: 'cred', name: 'CRED', pkg: 'com.dreamplug.androidapp', color: '#1a1a1a', textCol: '#fff', priority: 'medium', scheme: 'cred' },
        { id: 'mobikwik', name: 'Mobikwik', pkg: 'com.mobikwik_new', color: '#00baf2', textCol: '#fff', priority: 'low', scheme: 'mobikwik' },
        { id: 'freecharge', name: 'FreeCharge', pkg: 'com.freecharge.android', color: '#4CAF50', textCol: '#fff', priority: 'low', scheme: 'freecharge' },
        { id: 'airtel', name: 'Airtel Thanks', pkg: 'com.myairtelapp', color: '#E31837', textCol: '#fff', priority: 'low', scheme: 'airtel' },
        { id: 'jiopay', name: 'JioPay', pkg: 'com.jio.myjio', color: '#0066CC', textCol: '#fff', priority: 'low', scheme: 'jiopay' },
        { id: 'whatsapp', name: 'WhatsApp', pkg: 'com.whatsapp', color: '#25D366', textCol: '#fff', priority: 'low', scheme: 'whatsapp' },
        { id: 'icici', name: 'iMobile', pkg: 'com.csam.icici.bank.imobile', color: '#C41230', textCol: '#fff', priority: 'low', scheme: 'icici' },
        { id: 'hdfc', name: 'HDFC', pkg: 'com.snapwork.hdfc', color: '#004C8F', textCol: '#fff', priority: 'low', scheme: 'hdfc' },
        { id: 'sbi', name: 'SBI YONO', pkg: 'com.sbi.upi', color: '#1E5AA8', textCol: '#fff', priority: 'low', scheme: 'sbi' },
        { id: 'axis', name: 'Axis Bank', pkg: 'com.axis.mobile', color: '#97144D', textCol: '#fff', priority: 'low', scheme: 'axis' },
        { id: 'kotak', name: 'Kotak 811', pkg: 'com.kotak811', color: '#ED1C24', textCol: '#fff', priority: 'low', scheme: 'kotak' }
    ];

    const PREF_KEY = 'localfind_upi_preferences';

    /**
     * Generates a platform-specific Intent URL for an app
     */
    function buildIntentUrl(app, upiParams) {
        const fallbackUrl = encodeURIComponent(`https://play.google.com/store/apps/details?id=${app.pkg}`);
        const scheme = app.scheme || 'upi';
        const action = app.act ? `//${app.act}` : `//upi/pay`;

        // Format: intent://upi/pay?pa=...#Intent;scheme=...;package=...;S.browser_fallback_url=...;end
        return `intent:${action}?${upiParams}#Intent;scheme=${scheme};package=${app.pkg};S.browser_fallback_url=${fallbackUrl};end`;
    }

    /**
     * Sanitize inputs
     */
    function sanitizeHTML(str) {
        if (!str) return '';
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }

    /**
     * Preferences Management
     */
    function getPreferences() {
        try {
            const prefs = JSON.parse(localStorage.getItem(PREF_KEY));
            if (!prefs) return null;

            const isExpired = (Date.now() - prefs.timestamp) > (prefs.expiryDays * 24 * 60 * 60 * 1000);
            if (isExpired) {
                localStorage.removeItem(PREF_KEY);
                return null;
            }
            return prefs;
        } catch (e) {
            return null;
        }
    }

    function savePreference(appId, remember) {
        if (remember) {
            try {
                localStorage.setItem(PREF_KEY, JSON.stringify({
                    preferredApp: appId,
                    timestamp: Date.now(),
                    expiryDays: 30,
                    autoSelect: true
                }));
            } catch (e) {
                // Silent fail - localStorage might be disabled
            }
        } else {
            try {
                localStorage.removeItem(PREF_KEY);
            } catch (e) {
                // Silent fail
            }
        }
    }

    /**
     * Add Ripple Effect
     */
    function createRipple(event, element) {
        const circle = document.createElement('span');
        const diameter = Math.max(element.clientWidth, element.clientHeight);
        const radius = diameter / 2;

        const rect = element.getBoundingClientRect();
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - rect.left - radius}px`;
        circle.style.top = `${event.clientY - rect.top - radius}px`;
        circle.classList.add('upi-ripple');

        const ripple = element.getElementsByClassName('upi-ripple')[0];
        if (ripple) ripple.remove();
        element.appendChild(circle);
    }

    /**
     * Main function to open the Universal UPI Chooser
     * @param {Object|string} optionsOrUpiId - Options object or payee VPA
     * @param {string} [fallbackPayeeName] - Fallback payee name if string is passed
     */
    window.openUpiAppChooser = function (optionsOrUpiId, fallbackPayeeName) {
        // Prevent duplicates
        if (document.getElementById('upi-chooser-overlay')) return;

        let upiId, payeeName, transactionRef, amount;

        if (typeof optionsOrUpiId === 'object' && optionsOrUpiId !== null) {
            upiId = optionsOrUpiId.upiId;
            payeeName = optionsOrUpiId.upiName || optionsOrUpiId.businessName;
            transactionRef = optionsOrUpiId.transactionRef;
            amount = optionsOrUpiId.amount;
        } else {
            upiId = optionsOrUpiId;
            payeeName = fallbackPayeeName;
        }

        const safeUpiId = sanitizeHTML(upiId || '');
        const safePayeeName = sanitizeHTML(payeeName || '');

        let upiParams = `pa=${encodeURIComponent(safeUpiId)}&pn=${encodeURIComponent(safePayeeName)}&cu=INR`;
        if (transactionRef) upiParams += `&tr=${encodeURIComponent(transactionRef)}`;
        if (amount) upiParams += `&am=${encodeURIComponent(amount)}`;

        const genericLink = `upi://pay?${upiParams}`;

        let selectedAppId = null;
        const prefs = getPreferences();

        // DOM Construction
        const overlay = document.createElement('div');
        overlay.id = 'upi-chooser-overlay';
        overlay.className = 'upi-chooser-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-label', 'Select UPI App');

        const highPriorityApps = UPI_APPS.filter(a => a.priority === 'high' || a.priority === 'medium');
        const lowPriorityApps = UPI_APPS.filter(a => a.priority === 'low');

        const generateAppCard = (app) => `
      <div class="upi-app-card" data-app-id="${app.id}" role="button" tabindex="0" aria-label="Select ${app.name}">
        <div class="upi-app-icon" style="background-color: ${app.color};">
          <span style="color: ${app.textCol}">${app.name.charAt(0)}</span>
        </div>
        <div class="upi-app-name" title="${app.name}">${app.name}</div>
      </div>
    `;

        overlay.innerHTML = `
      <div class="upi-chooser-sheet" id="upi-chooser-sheet">
        <div class="upi-chooser-handle" aria-hidden="true"></div>
        <button class="upi-chooser-close" id="upi-chooser-close-btn" aria-label="Close">
          <i class="fa-solid fa-xmark"></i>
        </button>
        
        <div class="upi-chooser-header">
          <div class="upi-chooser-icon">
            <i class="fa-solid fa-indian-rupee-sign"></i>
          </div>
          <h3 class="upi-chooser-title">Pay with UPI App</h3>
          <p class="upi-chooser-subtitle">Choose your preferred UPI app</p>
        </div>

        <div class="upi-chooser-grid-container">
          <div class="upi-chooser-grid" id="upi-primary-grid">
            ${highPriorityApps.map(generateAppCard).join('')}
          </div>
          
          <button class="upi-chooser-more-toggle" id="upi-more-toggle" aria-expanded="false" aria-controls="upi-secondary-grid">
            <span>Other UPI Apps</span>
            <i class="fa-solid fa-chevron-down"></i>
          </button>
          
          <div class="upi-chooser-grid upi-chooser-secondary-grid" id="upi-secondary-grid">
             ${lowPriorityApps.map(generateAppCard).join('')}
          </div>
        </div>

        <label class="upi-chooser-remember" for="upi-remember-cb">
          <div class="upi-chooser-checkbox-container">
            <input type="checkbox" id="upi-remember-cb" ${prefs && prefs.autoSelect ? 'checked' : ''}>
            <span class="upi-chooser-checkmark"></span>
            <span class="upi-chooser-remember-text">Remember my choice for faster checkout</span>
          </div>
        </label>

        <div class="upi-chooser-actions">
          <a href="${genericLink}" class="upi-chooser-primary-btn" id="upi-primary-action" rel="noopener">
            Wait for selection...
          </a>
          
          <a href="${genericLink}" class="upi-chooser-fallback-btn" rel="noopener">
            Use Generic UPI (Let device decide)
          </a>
        </div>

        <div class="upi-chooser-footer">
          <div class="upi-chooser-security">
            <i class="fa-solid fa-shield-check"></i>
            <span>Secure UPI payment via NPCI</span>
          </div>
        </div>
        
        <div class="upi-chooser-toast" id="upi-sys-toast">
          <span id="upi-sys-toast-msg">App not installed</span>
        </div>
      </div>
    `;

        document.body.appendChild(overlay);

        // Prevent background scrolling
        const origOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        // Elements
        const primaryBtn = document.getElementById('upi-primary-action');
        const moreToggle = document.getElementById('upi-more-toggle');
        const secondaryGrid = document.getElementById('upi-secondary-grid');
        const rememberCb = document.getElementById('upi-remember-cb');
        const appCards = document.querySelectorAll('.upi-app-card');
        const closeBtn = document.getElementById('upi-chooser-close-btn');

        // Trigger entrance animation
        requestAnimationFrame(() => overlay.classList.add('active'));

        function selectApp(appId) {
            if (!appId) return;

            const appRef = UPI_APPS.find(a => a.id === appId);
            if (!appRef) return;

            selectedAppId = appId;

            // Update UI
            appCards.forEach(c => {
                c.classList.remove('selected', 'bounce');
                if (c.dataset.appId === appId) {
                    c.classList.add('selected');
                    // Trigger reflow for animation
                    void c.offsetWidth;
                    c.classList.add('bounce');

                    // If in secondary list, ensure it's visible
                    if (c.closest('#upi-secondary-grid')) {
                        moreToggle.classList.add('expanded');
                        secondaryGrid.classList.add('show');
                        moreToggle.setAttribute('aria-expanded', 'true');
                    }
                }
            });

            // Update button
            primaryBtn.innerHTML = `Pay with ${appRef.name} <i class="fa-solid fa-arrow-right"></i>`;

            // We detect if user is on Android
            const isAndroid = /android/i.test(navigator.userAgent);
            if (isAndroid) {
                primaryBtn.href = buildIntentUrl(appRef, upiParams);
            } else {
                // Fallback for non-Android
                primaryBtn.href = genericLink;
            }

            primaryBtn.classList.add('ready');
        }

        // Event checking logic
        let visibilityTimeout;

        function handleVisibilityChange() {
            if (document.visibilityState === 'hidden') {
                // User probably successfully left the browser to the app
                clearTimeout(visibilityTimeout);
            } else if (document.visibilityState === 'visible') {
                // User came back immediately ? Or maybe App Not Installed
            }
        }

        // Attach Selection Handlers
        appCards.forEach(card => {
            card.addEventListener('click', () => {
                selectApp(card.dataset.appId);
            });
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectApp(card.dataset.appId);
                }
            });
        });

        // Toggle More
        moreToggle.addEventListener('click', () => {
            moreToggle.classList.toggle('expanded');
            secondaryGrid.classList.toggle('show');
            const isExpanded = moreToggle.classList.contains('expanded');
            moreToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Primary Button Click
        primaryBtn.addEventListener('click', (e) => {
            if (!selectedAppId) {
                e.preventDefault();
                return;
            }
            createRipple(e, primaryBtn);

            savePreference(selectedAppId, rememberCb.checked);

            // Set a timer to check if we stay on page (app not installed)
            // Some intent urls fallback to play store, so maybe we won't stay on page anyway
            document.addEventListener('visibilitychange', handleVisibilityChange);

            visibilityTimeout = setTimeout(() => {
                // If we are still here after 1500ms and visibility is visible, app might have failed to open
                if (document.visibilityState === 'visible') {
                    showToast("If nothing happens, install the app or use Generic UPI");
                }
            }, 1500);

            // We don't close the sheet immediately just in case it fails, they can tap something else
        });

        function showToast(msg) {
            const toast = document.getElementById('upi-sys-toast');
            const toastMsg = document.getElementById('upi-sys-toast-msg');
            if (toast && toastMsg) {
                toastMsg.textContent = msg;
                toast.classList.add('show');
                setTimeout(() => toast.classList.remove('show'), 3000);
            }
        }

        function closeSheet() {
            overlay.classList.remove('active');
            overlay.classList.add('closing');
            document.body.style.overflow = origOverflow;
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            setTimeout(() => overlay.remove(), 350);
        }

        function handleEscape(e) {
            if (e.key === 'Escape') closeSheet();
        }

        closeBtn.addEventListener('click', closeSheet);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeSheet();
        });
        document.addEventListener('keydown', handleEscape);

        // Initial load pref
        if (prefs && prefs.preferredApp) {
            selectApp(prefs.preferredApp);
        }
    };

})();
