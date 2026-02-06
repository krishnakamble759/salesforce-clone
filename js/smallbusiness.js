/**
 * Small Business Page Functionality
 */

/**
 * Initialize Small Business Page components
 */
export function initSmallBusinessPage() {
    initSbSpecifics();
    initSmbTabs();
    initFreeCrmSignup();
    initSbFaqAccordion();
}

/**
 * Free CRM Signup Handler
 */
export function initFreeCrmSignup() {
    const freeSignupForm = document.getElementById('freeSignupForm');
    if (freeSignupForm) {
        freeSignupForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you for signing up! Your free Salesforce account is being created.');
        });
    }
}

/**
 * Small Business FAQ Accordion
 */
export function initSbFaqAccordion() {
    const faqSection = document.querySelector('.sb-faq-section');
    const faqItems = faqSection ? faqSection.querySelectorAll('.faq-item') : document.querySelectorAll('.faq-accordion .faq-item');
    if (faqItems.length === 0) return;

    faqItems.forEach(item => {
        // Prevent double initialization
        if (item.hasAttribute('data-sb-init')) return;
        item.setAttribute('data-sb-init', 'true');

        const toggleBtn = item.querySelector('.faq-toggle');
        const question = item.querySelector('.faq-question');
        const icon = (toggleBtn || question)?.querySelector('i');

        // Sync initial state
        if (icon) {
            const isActive = item.classList.contains('active');
            icon.classList.toggle('fa-minus', isActive);
            icon.classList.toggle('fa-plus', !isActive);
        }

        const toggle = (e) => {
            if (e) e.preventDefault();
            const isActive = item.classList.toggle('active');
            if (icon) {
                icon.classList.toggle('fa-minus', isActive);
                icon.classList.toggle('fa-plus', !isActive);
            }
        };

        if (toggleBtn) toggleBtn.addEventListener('click', (e) => { e.stopPropagation(); toggle(e); });
        if (question) question.addEventListener('click', toggle);
    });
}

/**
 * FAQ Tab Switching Logic
 */
export function initFaqTabs() {
    const faqTabBtns = document.querySelectorAll('.faq-tab-btn');
    const faqPanes = document.querySelectorAll('.faq-pane');

    if (faqTabBtns.length === 0) return;

    faqTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');

            // Remove active from all
            faqTabBtns.forEach(b => b.classList.remove('active'));
            faqPanes.forEach(p => p.classList.remove('active'));

            // Add active to clicked
            btn.classList.add('active');
            const targetPane = document.getElementById(tabId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
}

/**
 * Small Business Page Specific Initialization
 */
export function initSbSpecifics() {
    // FAQ Tabs
    initFaqTabs();

    // Suggestions Bar Logic
    const suggestions = document.querySelectorAll('.suggestion-btn');
    const input = document.querySelector('.ask-input-wrapper input');

    suggestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const query = btn.getAttribute('data-query');
            if (input) {
                input.value = query;
                // Note: sendToChatbot is globally available in main.js
                if (typeof window.sendToChatbot === 'function') {
                    window.sendToChatbot(query);
                }
            }
        });
    });

    // Toggle Mobile Sub Nav (Small Business)
    const mobileSubNavToggle = document.querySelector('.sub-nav-title');
    const mobileSubNavLinks = document.querySelector('.sub-nav-links');

    if (mobileSubNavToggle && mobileSubNavLinks) {
        if (!mobileSubNavToggle.hasAttribute('data-sb-bound')) {
            mobileSubNavToggle.setAttribute('data-sb-bound', 'true');
            mobileSubNavToggle.addEventListener('click', () => {
                mobileSubNavToggle.classList.toggle('active');
                mobileSubNavLinks.classList.toggle('active');
            });
        }
    }

    // Toggle Small Business Products dropdown
    const subNavDropdown = document.querySelector('.has-sub-dropdown');
    const subNavTrigger = subNavDropdown ? subNavDropdown.querySelector('a') : null;

    if (subNavTrigger) {
        if (!subNavTrigger.hasAttribute('data-sb-bound')) {
            subNavTrigger.setAttribute('data-sb-bound', 'true');
            subNavTrigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                subNavDropdown.classList.toggle('is-active');
            });

            document.addEventListener('click', (e) => {
                if (!subNavDropdown.contains(e.target)) {
                    subNavDropdown.classList.remove('is-active');
                }
            });
        }
    }
}

/**
 * Small Business Tabs Handler
 */
export function initSmbTabs() {
    const tabBtns = document.querySelectorAll('.sb-tabs-section .tab-btn');
    const tabPanes = document.querySelectorAll('.sb-tabs-section .tab-pane');

    if (tabBtns.length === 0) return;

    tabBtns.forEach(btn => {
        if (!btn.hasAttribute('data-sb-bound')) {
            btn.setAttribute('data-sb-bound', 'true');
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');

                // Remove active class from all buttons and panes
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));

                // Add active class to clicked button and target pane
                btn.classList.add('active');
                const targetPane = document.getElementById(tabId);
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        }
    });
}
