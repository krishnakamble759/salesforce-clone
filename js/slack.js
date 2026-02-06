/**
 * Slack Page Specific JavaScript
 * Handles initialization and interactivity for the Slack page.
 */

// Initialize Slack Sub-nav Toggle
window.initSlackSubNav = function () {
    const subNavTitleWrapper = document.querySelector('.slack-sub-nav .product-name');
    const toggleArrow = document.querySelector('.slack-sub-nav .mobile-toggle-arrow');
    const subNavMenu = document.querySelector('.slack-sub-nav .sub-nav-menu');
    const subNavRight = document.querySelector('.slack-sub-nav .sub-nav-right');

    // Mobile Toggle Logic
    if (toggleArrow && subNavTitleWrapper && subNavMenu) {
        if (toggleArrow.getAttribute('data-bound') === 'true') return;
        toggleArrow.setAttribute('data-bound', 'true');

        toggleArrow.addEventListener('click', function (e) {
            // Check breakpoint (1200px matches SCSS desktop mixin generally)
            if (window.innerWidth <= 1200) {
                e.preventDefault();
                e.stopPropagation();
                subNavTitleWrapper.classList.toggle('active');
                subNavMenu.classList.toggle('active');

                if (subNavRight) {
                    subNavRight.classList.toggle('active');
                }
            }
        });
    }

    // Handle inner dropdowns for mobile AND desktop
    const dropdowns = document.querySelectorAll('.slack-sub-nav .has-dropdown');
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('a');
        if (trigger && !trigger.getAttribute('data-bound')) {
            trigger.setAttribute('data-bound', 'true');
            trigger.addEventListener('click', (e) => {
                if (window.innerWidth <= 1200) {
                    if (trigger.getAttribute('href') === '#') {
                        e.preventDefault();
                        e.stopPropagation();
                    }

                    // Close other dropdowns
                    dropdowns.forEach(d => {
                        if (d !== dropdown) d.classList.remove('active');
                    });
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.slack-sub-nav')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}

// Initialize Slack FAQ Accordion
window.initSlackFAQ = function () {
    const faqItems = document.querySelectorAll('.slack-faq-section .faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        if (question) {
            question.addEventListener('click', () => {
                // Toggle current item
                const isActive = item.classList.contains('active');

                // Close all other items (optional, but often cleaner)
                // If user wants multiple open, remove this loop. 
                // Screenshots show only one open or multiple? 
                // "check I'm click on the question so there open the answers" - implies toggle.
                // Standard behavior is usually one at a time or independent. 
                // Let's allow independent toggling if not specified, 
                // BUT often FAQs close others. The screenshot shows mixed state? No, implies expansion.
                // I will allow multiple open for now as it's less restrictive.
                // Actually, let's toggle.

                item.classList.toggle('active');
                question.setAttribute('aria-expanded', !isActive);
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Slack page loaded');
    if (typeof window.initSlackSubNav === 'function') {
        window.initSlackSubNav();
    }
    if (typeof window.initSlackFAQ === 'function') {
        window.initSlackFAQ();
    }
});
