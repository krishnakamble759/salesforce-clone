/**
 * Products Page Functionality
 */

/**
 * Products Offcanvas Menu
 */
export function initProductsOffcanvas() {
    const productsOffcanvas = document.getElementById('productsOffcanvas');
    const productsOverlay = document.getElementById('productsOffcanvasOverlay');
    const closeOffcanvasBtn = document.getElementById('closeProductsOffcanvas');

    if (!productsOffcanvas) {
        console.warn('Products Offcanvas menu not found in DOM');
        return;
    }

    // Use event delegation for the trigger to handle dynamic loading
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('#productsMenuTrigger');
        if (trigger) {
            e.preventDefault();
            console.log('Products menu trigger clicked');
            productsOffcanvas.classList.add('show');
            if (productsOverlay) productsOverlay.classList.add('show');
            document.body.style.overflow = 'hidden';

            // Default to overview if no category is active
            const activeCategory = productsOffcanvas.querySelector('.category-item.active-category');
            if (!activeCategory) {
                const firstCategory = productsOffcanvas.querySelector('.category-item');
                if (firstCategory) firstCategory.click();
            }
        }
    });

    // Handle Category Switching
    const categoryItems = productsOffcanvas.querySelectorAll('.category-item');
    const featuredPanels = productsOffcanvas.querySelectorAll('.products-featured');

    categoryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const category = item.getAttribute('data-category');
            if (!category) return;

            // Update Active State
            categoryItems.forEach(i => i.classList.remove('active-category'));
            item.classList.add('active-category');

            // Show Corresponding Panel
            featuredPanels.forEach(panel => {
                panel.style.display = 'none';
                if (panel.id === `featured-${category}`) {
                    panel.style.display = 'flex';
                }
            });
        });

        // Also handle click for mobile/touch
        item.addEventListener('click', (e) => {
            const category = item.getAttribute('data-category');
            if (category === 'overview' || category === 'smb' || category === 'ai') {
                if (item.tagName === 'A' && item.getAttribute('href') !== '#' && item.getAttribute('href') !== 'javascript:void(0)') {
                } else {
                    e.preventDefault();
                }
            }
        });
    });

    // Close offcanvas function
    const closeOffcanvas = () => {
        productsOffcanvas.classList.remove('show');
        if (productsOverlay) productsOverlay.classList.remove('show');
        document.body.style.overflow = '';
    };

    if (closeOffcanvasBtn) {
        closeOffcanvasBtn.addEventListener('click', closeOffcanvas);
    }

    const backBtn = document.getElementById('backToMainFromProducts');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            // Close Products Offcanvas
            closeOffcanvas();

            // Ensure Main Menu is shown/active (it should be, but this is a safety check)
            const navMenu = document.querySelector('.nav-menu');
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            const toggleIconActive = mobileToggle ? mobileToggle.querySelector('i') : null;

            if (navMenu) {
                navMenu.classList.add('active');
                document.body.classList.add('mobile-menu-active');

                // Ensure toggle icon is correct (X)
                if (toggleIconActive) {
                    toggleIconActive.classList.remove('fa-bars');
                    toggleIconActive.classList.add('fa-xmark');
                }
            }
        });
    }

    // Close on overlay click
    if (productsOverlay) {
        productsOverlay.addEventListener('click', closeOffcanvas);
    }

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && productsOffcanvas.classList.contains('show')) {
            closeOffcanvas();
        }
    });
}

/**
 * Initialize Products FAQ
 */
export function initProductsFaq() {
    console.log('Initializing Products FAQ...');
    const faqItems = document.querySelectorAll('.products-faq .faq-item');

    if (faqItems.length === 0) {
        console.warn('No products FAQ items found');
        return;
    }

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');

        if (question && answer) {
            question.addEventListener('click', () => {
                const isExpanded = question.getAttribute('aria-expanded') === 'true';

                // Close other items (optional, but often preferred)
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherQuestion = otherItem.querySelector('.faq-question');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherIcon = otherQuestion.querySelector('i');

                        otherItem.classList.remove('active');
                        otherQuestion.setAttribute('aria-expanded', 'false');
                        otherAnswer.style.height = '';
                        if (otherIcon) {
                            otherIcon.classList.remove('fa-minus');
                            otherIcon.classList.add('fa-plus');
                        }
                    }
                });

                // Toggle current item
                if (isExpanded) {
                    item.classList.remove('active');
                    question.setAttribute('aria-expanded', 'false');
                    answer.style.height = '';
                    if (icon) {
                        icon.classList.remove('fa-minus');
                        icon.classList.add('fa-plus');
                    }
                } else {
                    item.classList.add('active');
                    question.setAttribute('aria-expanded', 'true');
                    answer.style.height = '';
                    if (icon) {
                        icon.classList.remove('fa-plus');
                        icon.classList.add('fa-minus');
                    }
                }
            });
        }
    });
}

/**
 * Main Products Page Initialization
 */
export function initProductsPage() {
    initProductsOffcanvas();
    initProductsFaq();
}
