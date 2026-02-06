/**
 * Agentforce & AI App Development Page Functionality
 */

// Agentforce & AI App Development Page View Handler
export function initAgentforceAiApp() {
    const mainView = document.getElementById('main-view');
    const guideView = document.getElementById('guide-view');
    const webinarView = document.getElementById('webinar-view');
    const guideLogo = document.getElementById('guideLogo');
    const webinarLogo = document.getElementById('webinarLogo');

    // Initialize Sub-nav and FAQ even if views aren't primary (though usually they are on this page)
    initAgentforceAiAppSubNav();
    initAgentforceAiAppFaq();

    if (!mainView || !guideView || !webinarView) return;

    function showGuide() {
        mainView.style.display = 'none';
        webinarView.style.display = 'none';
        guideView.style.display = 'block';
        window.scrollTo(0, 0);
    }

    function showWebinar() {
        mainView.style.display = 'none';
        guideView.style.display = 'none';
        webinarView.style.display = 'block';
        window.scrollTo(0, 0);
    }

    function hideSubViews() {
        guideView.style.display = 'none';
        webinarView.style.display = 'none';
        mainView.style.display = 'block';
        window.scrollTo(0, 0);

        // Clear hash from URL without reloading
        if (window.location.hash === '#guide' || window.location.hash === '#webinar') {
            const cleanUrl = window.location.pathname + window.location.search;
            window.history.replaceState(null, '', cleanUrl);
        }
    }

    // Logos act as back buttons
    if (guideLogo) guideLogo.addEventListener('click', hideSubViews);
    if (webinarLogo) webinarLogo.addEventListener('click', hideSubViews);

    // Initial load check
    function handleRouting() {
        const hash = window.location.hash;
        if (hash === '#guide') {
            showGuide();
        } else if (hash === '#webinar') {
            showWebinar();
        } else {
            hideSubViews();
        }
    }

    handleRouting();

    // Sync views with browser back/forward buttons
    window.addEventListener('hashchange', handleRouting);

    // Form submissions
    const guideForm = guideView.querySelector('.guide-form');
    if (guideForm) {
        guideForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for downloading the playbook!');
        });
    }

    const webinarForm = webinarView.querySelector('.webinar-form');
    if (webinarForm) {
        webinarForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for registering for the webinar!');
        });
    }
}

// Initialize Agentforce AI App Sub-nav Toggle
export function initAgentforceAiAppSubNav() {
    console.log('Initializing Agentforce AI App Sub-nav...');
    const navToggle = document.getElementById('agentforceAiAppNavToggle');
    const subNav = document.querySelector('.sub-nav');
    const dropdowns = document.querySelectorAll('.sub-nav-links .has-dropdown');

    if (navToggle && subNav) {
        // Prevent double binding
        if (navToggle.getAttribute('data-bound') === 'true') return;
        navToggle.setAttribute('data-bound', 'true');

        navToggle.addEventListener('click', (e) => {
            // Only on mobile/tablet (using the 1200px breakpoint from tableau.js logic)
            if (window.innerWidth <= 1200) {
                e.preventDefault();
                e.stopPropagation();
                subNav.classList.toggle('active');
            }
        });
    }

    // Handle nested dropdowns
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('a');
        if (trigger && !trigger.getAttribute('data-bound')) {
            trigger.setAttribute('data-bound', 'true');
            trigger.addEventListener('click', (e) => {
                // For mobile/tablet, prevent navigation and toggle
                if (window.innerWidth <= 1200) {
                    e.preventDefault();
                    e.stopPropagation();

                    // Close other dropdowns
                    dropdowns.forEach(d => {
                        if (d !== dropdown) d.classList.remove('active');
                    });

                    dropdown.classList.toggle('active');

                    // Also toggle icon if needed (CSS usually handles this via .active class)
                    const icon = trigger.querySelector('i');
                    if (icon) {
                        if (dropdown.classList.contains('active')) {
                            icon.style.transform = 'rotate(180deg)';
                        } else {
                            icon.style.transform = 'rotate(0deg)';
                        }
                    }
                }
            });
        }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.sub-nav')) {
            if (subNav) subNav.classList.remove('active');
            dropdowns.forEach(d => d.classList.remove('active'));
        }
    });

    // Scroll handling for sticky/fixed header interaction if needed
    // (Already handled by CSS position: fixed)
}

// Initialize Agentforce AI App FAQ Accordion
export function initAgentforceAiAppFaq() {
    console.log('Initializing Agentforce AI App FAQ...');
    const faqItems = document.querySelectorAll('.Agentforce-faq-section .faq-item');

    if (faqItems.length === 0) {
        console.warn('No Agentforce AI App FAQ items found.');
        return;
    }

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');

        if (question && !question.getAttribute('data-bound')) {
            question.setAttribute('data-bound', 'true');

            question.addEventListener('click', () => {
                const isOpen = question.getAttribute('aria-expanded') === 'true';

                // Toggle current item
                question.setAttribute('aria-expanded', !isOpen);

                if (!isOpen) {
                    item.classList.add('active');
                    // Calculate height for transition if using height instead of max-height
                    const contentHeight = answer.querySelector('.faq-answer-content').offsetHeight;
                    answer.style.height = contentHeight + 'px';
                    if (icon) {
                        icon.classList.remove('fa-plus');
                        icon.classList.add('fa-minus');
                    }
                } else {
                    item.classList.remove('active');
                    answer.style.height = '0';
                    if (icon) {
                        icon.classList.remove('fa-minus');
                        icon.classList.add('fa-plus');
                    }
                }
            });
        }
    });
}


// Agentforce App Tools Carousel
export function initAgentforceAppToolsCarousel() {
    const track = document.getElementById('appToolsTrack');
    const nextBtn = document.getElementById('appToolsNext');
    const prevBtn = document.getElementById('appToolsPrev');
    const scrollbarThumb = document.getElementById('appToolsThumb');

    if (!track || !nextBtn || !prevBtn) return;

    let currentIndex = 0;
    const cards = track.querySelectorAll('.feature-card');
    const totalCards = cards.length;

    function updateCarousel() {
        let visibleCards = 3;
        if (window.innerWidth <= 768) visibleCards = 1;
        else if (window.innerWidth <= 1024) visibleCards = 2;

        const maxIndex = totalCards - visibleCards;

        // Safety check
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;

        const gap = 24; // matches SCSS
        const cardWidth = cards[0].offsetWidth;
        const offset = currentIndex * (cardWidth + gap);

        track.style.transform = `translateX(-${offset}px)`;

        // Update Button Visiblity / Opacity
        if (currentIndex === 0) {
            prevBtn.style.opacity = '0';
            prevBtn.style.pointerEvents = 'none';
        } else {
            prevBtn.style.opacity = '1';
            prevBtn.style.pointerEvents = 'auto';
        }

        if (currentIndex >= maxIndex) {
            nextBtn.style.opacity = '0';
            nextBtn.style.pointerEvents = 'none';
        } else {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
        }

        // Update Scrollbar
        if (scrollbarThumb) {
            const thumbWidthPercent = (visibleCards / totalCards) * 100;
            scrollbarThumb.style.width = `${thumbWidthPercent}%`;

            if (maxIndex > 0) {
                const maxThumbLeft = 100 - thumbWidthPercent;
                const leftPercent = (currentIndex / maxIndex) * maxThumbLeft;
                scrollbarThumb.style.left = `${leftPercent}%`;
            } else {
                scrollbarThumb.style.left = '0%';
            }
        }
    }

    nextBtn.addEventListener('click', () => {
        currentIndex++;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex--;
        updateCarousel();
    });

    // Scrollbar Dragging & Clicking
    if (scrollbarThumb) {
        const scrollbarContainer = scrollbarThumb.parentElement;
        let isDragging = false;
        let startX;
        let startLeft;

        scrollbarThumb.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX;
            startLeft = parseFloat(scrollbarThumb.style.left) || 0;
            scrollbarThumb.style.cursor = 'grabbing';
            scrollbarThumb.style.transition = 'none';
            document.body.style.userSelect = 'none';
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const deltaX = e.pageX - startX;
            const containerWidth = scrollbarContainer.offsetWidth;
            const thumbWidth = scrollbarThumb.offsetWidth;
            const maxThumbLeftPercent = 100 - (thumbWidth / containerWidth) * 100;

            // Calculate new left percentage
            let newLeftPercent = startLeft + (deltaX / containerWidth) * 100;

            // Constrain
            if (newLeftPercent < 0) newLeftPercent = 0;
            if (newLeftPercent > maxThumbLeftPercent) newLeftPercent = maxThumbLeftPercent;

            // Map percent to currentIndex
            let visibleCards = 3;
            if (window.innerWidth <= 768) visibleCards = 1;
            else if (window.innerWidth <= 1024) visibleCards = 2;
            const maxIndex = totalCards - visibleCards;

            if (maxIndex > 0) {
                currentIndex = Math.round((newLeftPercent / maxThumbLeftPercent) * maxIndex);
                // Update visually immediately
                scrollbarThumb.style.left = `${newLeftPercent}%`;

                const gap = 24;
                const cardWidth = cards[0].offsetWidth;
                const offset = currentIndex * (cardWidth + gap);
                track.style.transform = `translateX(-${offset}px)`;
            }
        });

        window.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                scrollbarThumb.style.cursor = 'pointer';
                scrollbarThumb.style.transition = '';
                document.body.style.userSelect = '';
                updateCarousel(); // Final snap
            }
        });

        // Click on scrollbar container to jump
        scrollbarContainer.addEventListener('click', (e) => {
            if (e.target === scrollbarThumb) return;

            const rect = scrollbarContainer.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const containerWidth = scrollbarContainer.offsetWidth;
            const thumbWidth = scrollbarThumb.offsetWidth;

            // Percentage of the click relative to the container (adjusted for thumb center)
            let clickPercent = ((clickX - thumbWidth / 2) / (containerWidth - thumbWidth)) * 100;

            if (clickPercent < 0) clickPercent = 0;
            if (clickPercent > 100) clickPercent = 100;

            let visibleCards = 3;
            if (window.innerWidth <= 768) visibleCards = 1;
            else if (window.innerWidth <= 1024) visibleCards = 2;
            const maxIndex = totalCards - visibleCards;

            if (maxIndex > 0) {
                currentIndex = Math.round((clickPercent / 100) * maxIndex);
                updateCarousel();
            }
        });
    }

    window.addEventListener('resize', updateCarousel);

    // Initial call
    setTimeout(updateCarousel, 300);
}
