/**
 * Artificial Intelligence Page Initialization
 */
export function initArtificialIntelligencePage() {
    console.log('Initializing Artificial Intelligence Page...');
    // init() and initChatWidget() are usually handled by main.js globally
    // But we ensure local components are ready
    initAiSubNav();
    initAiFaq();
}

/**
 * Initialize AI Sub-nav Toggle
 */
export function initAiSubNav() {
    console.log('Initializing AI Sub-nav...');
    const subNavTitleWrapper = document.querySelector('.ai-sub-nav .sub-nav-title');
    const toggleArrow = document.querySelector('.ai-sub-nav .mobile-sub-nav-toggle');
    const subNavLinks = document.querySelector('.ai-sub-nav .sub-nav-links');

    if (subNavTitleWrapper && subNavLinks) {
        if (subNavTitleWrapper.getAttribute('data-ai-bound') === 'true') return;
        subNavTitleWrapper.setAttribute('data-ai-bound', 'true');

        // Toggle on arrow click
        if (toggleArrow) {
            toggleArrow.addEventListener('click', function (e) {
                if (window.innerWidth <= 1200) {
                    e.preventDefault();
                    e.stopPropagation();
                    subNavTitleWrapper.classList.toggle('active');
                    subNavLinks.classList.toggle('active');
                }
            });
        }

        // Also toggle on title click if it's mobile and not the link itself
        subNavTitleWrapper.addEventListener('click', function (e) {
            if (window.innerWidth <= 1200 && !e.target.closest('.title-link')) {
                subNavTitleWrapper.classList.toggle('active');
                subNavLinks.classList.toggle('active');
            }
        });
    }

    // Handle inner dropdowns for mobile (Click toggle)
    const dropdowns = document.querySelectorAll('.ai-sub-nav .has-sub-dropdown');
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('a');
        if (trigger && !trigger.getAttribute('data-ai-bound')) {
            trigger.setAttribute('data-ai-bound', 'true');
            trigger.addEventListener('click', (e) => {
                if (window.innerWidth <= 1200) {
                    e.preventDefault();
                    e.stopPropagation();

                    // Close other dropdowns
                    dropdowns.forEach(d => {
                        if (d !== dropdown) d.classList.remove('is-active');
                    });

                    dropdown.classList.toggle('is-active');
                }
            });
        }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.ai-sub-nav')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('is-active');
            });
        }
    });
}

/**
 * Initialize AI FAQ Accordion
 */
/**
 * Initialize AI FAQ Accordion
 */
export function initAiFaq() {
    console.log('Initializing AI FAQ...');
    const faqItems = document.querySelectorAll('.ai-faq .faq-item');
    if (faqItems.length === 0) {
        console.warn('No AI FAQ items found.');
        return;
    }

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const icon = question.querySelector('.faq-icon i');

        if (question) {
            // Prevent double binding
            if (question.getAttribute('data-bound') === 'true') return;
            question.setAttribute('data-bound', 'true');

            question.addEventListener('click', (e) => {
                e.preventDefault();

                // Toggle current item
                const isActive = item.classList.toggle('active');

                // Update aria-expanded
                question.setAttribute('aria-expanded', isActive ? 'true' : 'false');

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
        }
    });
}
