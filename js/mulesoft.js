/**
 * MuleSoft Page Specific JavaScript
 */

// Initialize MuleSoft Sub-nav Toggle
window.initMuleSoftSubNav = function () {
    const subNavTitleWrapper = document.querySelector('.mulesoft-sub-nav .product-name');
    const toggleArrow = document.querySelector('.mulesoft-sub-nav .mobile-toggle-arrow');
    const subNavMenu = document.querySelector('.mulesoft-sub-nav .sub-nav-menu');
    const subNavRight = document.querySelector('.mulesoft-sub-nav .sub-nav-right');

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

    // Handle inner dropdowns for mobile AND desktop (Click toggle for mobile, hover is CSS for desktop)
    const dropdowns = document.querySelectorAll('.mulesoft-sub-nav .has-dropdown');
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('a');
        if (trigger && !trigger.getAttribute('data-bound')) {
            trigger.setAttribute('data-bound', 'true');
            trigger.addEventListener('click', (e) => {
                if (trigger.getAttribute('href') === '#') {
                    e.preventDefault();
                    e.stopPropagation();
                }
                dropdowns.forEach(d => {
                    if (d !== dropdown) d.classList.remove('active');
                });
                dropdown.classList.toggle('active');
            });
        }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.mulesoft-sub-nav')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}

// Initialize MuleSoft FAQ Accordion
window.initMuleSoftFAQ = function () {
    const faqItems = document.querySelectorAll('.mulesoft-faq .faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question && !question.getAttribute('data-bound')) {
            question.setAttribute('data-bound', 'true');
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('MuleSoft page loaded');
    if (typeof window.initMuleSoftSubNav === 'function') {
        window.initMuleSoftSubNav();
    }
    if (typeof window.initMuleSoftFAQ === 'function') {
        window.initMuleSoftFAQ();
    }
});
