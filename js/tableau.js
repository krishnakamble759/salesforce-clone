/**
 * Tableau Page Specific JavaScript
 * Handles initialization and interactivity for the Tableau page.
 */

// Initialize Tableau Sub-nav Toggle
window.initTableauSubNav = function () {
    const subNavTitleWrapper = document.querySelector('.tableau-sub-nav .product-name');
    const toggleArrow = document.querySelector('.tableau-sub-nav .mobile-toggle-arrow'); // If added to HTML
    const subNavMenu = document.querySelector('.tableau-sub-nav .sub-nav-menu');

    // Mobile Toggle Logic (if arrow exists)
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

                const subNavRight = document.querySelector('.tableau-sub-nav .sub-nav-right');
                if (subNavRight) subNavRight.classList.toggle('active');
            }
        });
    }

    // Handle inner dropdowns for mobile AND desktop (Click toggle)
    const dropdowns = document.querySelectorAll('.tableau-sub-nav .has-dropdown');
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
        if (!e.target.closest('.tableau-sub-nav')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}

// Initialize Tableau FAQ Accordion
function initTableauFaq() {
    console.log('Initializing Tableau FAQ...');
    const faqItems = document.querySelectorAll('.tableau-faq .faq-item');
    if (faqItems.length === 0) {
        console.warn('No Tableau FAQ items found.');
        return;
    }

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const icon = question.querySelector('.icon-wrapper i');

        question.addEventListener('click', () => {
            // Toggle current item
            const isActive = item.classList.toggle('active');

            // Update icon
            if (icon) {
                if (isActive) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                } else {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
            }
        });
    });
}
window.initTableauFaq = initTableauFaq;

document.addEventListener('DOMContentLoaded', () => {
    console.log('Tableau JS Loaded');
    if (typeof window.initTableauSubNav === 'function') {
        window.initTableauSubNav();
    }
    initTableauFaq();
});
