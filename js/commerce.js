/**
 * Commerce Page Specific JavaScript
 * Handles initialization and interactivity for the Commerce Cloud page.
 */

// Initialize Commerce Sub-nav Toggle
window.initCommerceSubNav = function () {
    const subNavTitleWrapper = document.querySelector('.commerce-sub-nav .product-name');
    const toggleArrow = document.querySelector('.commerce-sub-nav .mobile-toggle-arrow');
    const subNavMenu = document.querySelector('.commerce-sub-nav .sub-nav-menu');

    if (toggleArrow && subNavTitleWrapper && subNavMenu) {
        if (toggleArrow.getAttribute('data-bound') === 'true') return;
        toggleArrow.setAttribute('data-bound', 'true');

        toggleArrow.addEventListener('click', function (e) {
            // Check breakpoint
            if (window.innerWidth <= 1200) {
                e.preventDefault();
                e.stopPropagation();
                subNavTitleWrapper.classList.toggle('active');
                subNavMenu.classList.toggle('active');
            }
        });
    }

    // Handle inner dropdowns for mobile AND desktop (Click toggle)
    const dropdowns = document.querySelectorAll('.commerce-sub-nav .has-dropdown');
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('a');
        if (trigger && !trigger.getAttribute('data-bound')) {
            trigger.setAttribute('data-bound', 'true');
            trigger.addEventListener('click', (e) => {
                // Allow click toggle on all screen sizes
                e.preventDefault();
                e.stopPropagation();

                // Close other dropdowns
                dropdowns.forEach(d => {
                    if (d !== dropdown) d.classList.remove('active');
                });

                dropdown.classList.toggle('active');
            });
        }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.commerce-sub-nav')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}

// Commerce Analyst Tabs Initialization
function initCommerceAnalystTabs() {
    try {
        const commerceTabsSection = document.querySelector('.commerce-analysts');
        if (commerceTabsSection && !commerceTabsSection.hasAttribute('data-tabs-bound')) {
            commerceTabsSection.setAttribute('data-tabs-bound', 'true');
            console.log('Commerce Analyst Tabs: Initializing...');

            commerceTabsSection.addEventListener('click', (e) => {
                const tab = e.target.closest('.tab-btn');
                if (!tab) return;

                e.preventDefault();
                console.log('Commerce Tab Clicked:', tab.textContent.trim());

                const targetId = tab.getAttribute('data-tab');
                const tabs = commerceTabsSection.querySelectorAll('.tab-btn');
                const panels = commerceTabsSection.querySelectorAll('.tab-panel');

                tabs.forEach(t => t.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));

                tab.classList.add('active');
                const targetPanel = commerceTabsSection.querySelector(`#${targetId}`);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                } else {
                    console.error('Target panel not found:', targetId);
                }
            });
        }
    } catch (e) {
        console.error('Error in Commerce Tabs init:', e);
    }
}


// Commerce FAQ Initialization
function initCommerceFAQs() {
    const faqItems = document.querySelectorAll('.commerce-faq .faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const icon = otherItem.querySelector('.faq-icon i');
                if (icon) {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                const icon = item.querySelector('.faq-icon i');
                if (icon) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                }
            } else {
                item.classList.remove('active');
                const icon = item.querySelector('.faq-icon i');
                if (icon) {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
            }
        });
    });
}

// Update DOMContentLoaded to include FAQ init
document.addEventListener('DOMContentLoaded', () => {
    console.log('Commerce.js: DOMContentLoaded');

    // Initialize Sub-nav
    if (window.initCommerceSubNav) {
        window.initCommerceSubNav();
    }

    // Initialize Analyst Tabs
    if (typeof initCommerceAnalystTabs === 'function') {
        initCommerceAnalystTabs();
    }

    // Initialize FAQs
    initCommerceFAQs();
});
