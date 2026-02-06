/**
 * Marketing Page Functionality
 */

// Initialize Marketing Page Main Function
export function initMarketingPage() {
    initMarketingDropdown();
    initMarketingMobileNav();
    initMarketingVideoCarousel();
    initMarketingSuccessStories();
    initMarketingDiscoverTabs();
    initMarketingFaq();
    initMarketingVideo();
    initMarketingSubNav();
}

/**
 * Marketing Page Dropdown Toggle
 */
export function initMarketingDropdown() {
    const trigger = document.getElementById("marketingProductsTrigger");
    const menu = document.getElementById("marketingProductsMenu");

    if (trigger && menu) {
        trigger.addEventListener("click", (e) => {
            e.stopPropagation();
            trigger.classList.toggle("is-active");
        });

        // Close when clicking outside
        document.addEventListener("click", (e) => {
            if (!trigger.contains(e.target)) {
                trigger.classList.remove("is-active");
            }
        });
    }
}

/**
 * Marketing Page Mobile Navigation Toggle
 */
export function initMarketingMobileNav() {
    const subNavTitle = document.querySelector('.marketing-sub-nav .sub-nav-title');
    const mobileToggleArrow = document.querySelector('.marketing-sub-nav .mobile-toggle-arrow');
    const subNavLinks = document.querySelector('.marketing-sub-nav .sub-nav-links');

    if (mobileToggleArrow && subNavTitle && subNavLinks) {
        mobileToggleArrow.addEventListener('click', (e) => {
            e.stopPropagation();

            // Toggle active class on title (for arrow rotation)
            subNavTitle.classList.toggle('active');

            // Toggle active class on links (which now includes the Watch demo button)
            subNavLinks.classList.toggle('active');
        });
    }
}

/**
 * Marketing Video Carousel
 */
export function initMarketingVideoCarousel() {
    const track = document.querySelector('.video-cards-track');
    const leftArrow = document.querySelector('.carousel-arrow-left');
    const rightArrow = document.querySelector('.carousel-arrow-right');
    const scrollbarThumb = document.querySelector('.carousel-scrollbar-thumb');
    const scrollbarTrack = document.querySelector('.carousel-scrollbar-track');

    if (!track || !leftArrow || !rightArrow || !scrollbarThumb || !scrollbarTrack) {
        return;
    }

    const cards = track.querySelectorAll('.video-card');
    const totalCards = cards.length;
    let currentIndex = 0;

    // Get cards per view based on screen size
    function getCardsPerView() {
        const width = window.innerWidth;
        if (width >= 992) return 3; // big-tab and above
        if (width >= 768) return 2; // small-tab
        return 1; // mobile
    }

    // Calculate max index
    function getMaxIndex() {
        return Math.max(0, totalCards - getCardsPerView());
    }

    // Update carousel position
    function updateCarousel() {
        const cardsPerView = getCardsPerView();
        const maxIndex = getMaxIndex();

        // Clamp current index
        currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));

        // Calculate transform
        const cardWidth = cards[0].offsetWidth;
        const gap = parseInt(getComputedStyle(track).gap) || 30;
        const translateX = -(currentIndex * (cardWidth + gap));

        track.style.transform = `translateX(${translateX}px)`;

        // Update arrows
        leftArrow.disabled = currentIndex === 0;
        rightArrow.disabled = currentIndex >= maxIndex;

        // Update scrollbar
        updateScrollbar();
    }

    // Update scrollbar thumb position
    function updateScrollbar() {
        const maxIndex = getMaxIndex();
        if (maxIndex === 0) {
            scrollbarThumb.style.transform = 'translateX(0)';
            return;
        }

        const trackWidth = scrollbarTrack.offsetWidth;
        const thumbWidth = scrollbarThumb.offsetWidth;
        const maxTranslate = trackWidth - thumbWidth;
        const translateX = (currentIndex / maxIndex) * maxTranslate;

        scrollbarThumb.style.transform = `translateX(${translateX}px)`;
    }

    // Arrow click handlers
    leftArrow.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    rightArrow.addEventListener('click', () => {
        const maxIndex = getMaxIndex();
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Scrollbar click handler
    scrollbarTrack.addEventListener('click', (e) => {
        const rect = scrollbarTrack.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const trackWidth = rect.width;
        const thumbWidth = scrollbarThumb.offsetWidth;
        const maxTranslate = trackWidth - thumbWidth;
        const maxIndex = getMaxIndex();

        // Calculate which index to go to
        const ratio = clickX / trackWidth;
        currentIndex = Math.round(ratio * maxIndex);

        updateCarousel();
    });

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateCarousel();
        }, 150);
    });

    // Initial update
    updateCarousel();
}

/**
 * Initialize Marketing Success Stories Tabs
 */
export function initMarketingSuccessStories() {
    const section = document.querySelector('.marketing-success-tabs-section');
    if (!section) return;

    const tabs = section.querySelectorAll('.tab-btn');
    const panes = section.querySelectorAll('.tab-pane');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-tab');

            // Update active button
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update active pane
            panes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === targetId) {
                    pane.classList.add('active');
                }
            });
        });
    });
}

/**
 * Initialize Marketing Discover Tabs
 */
export function initMarketingDiscoverTabs() {
    const section = document.querySelector('.marketing-discover-section');
    if (!section) return;

    const tabs = section.querySelectorAll('.discover-tab-btn');
    const panes = section.querySelectorAll('.discover-tab-pane');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-tab');

            // Update active button
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update active pane
            panes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === targetId) {
                    pane.classList.add('active');
                }
            });
        });
    });
}

/**
 * Initialize Marketing FAQ Accordion
 */
export function initMarketingFaq() {
    const faqItems = document.querySelectorAll('.marketing-faq-section .faq-item');
    if (faqItems.length === 0) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const icon = question.querySelector('i');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(i => {
                i.classList.remove('active');
                const iIcon = i.querySelector('.faq-question i');
                if (iIcon) {
                    iIcon.classList.remove('fa-minus');
                    iIcon.classList.add('fa-plus');
                }
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                if (icon) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                }
            }
        });
    });
}

// Video Player logic
export function initMarketingVideo() {
    const playBtn = document.getElementById("playMarketingVideo");
    const videoContainer = document.getElementById("videoContainer");
    const videoCard = document.getElementById("marketingVideoCard");
    if (playBtn && videoContainer && videoCard) {
        playBtn.addEventListener("click", () => {
            const videoUrl = "https://play.vidyard.com/q9qcueTJA6E3B1PQHDe5oc?disable_popouts=1&v=4.3.19&type=inline&autoplay=1";
            videoContainer.innerHTML = `<iframe src="${videoUrl}" title="Marketing Cloud Video" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
            videoContainer.style.display = "block";
            const overlay = videoCard.querySelector(".video-overlay");
            const img = videoCard.querySelector("img");
            if (overlay) overlay.style.display = "none";
            if (img) img.style.display = "none";
        });
    }
}

// Initialize Marketing Sub-nav Toggle
export function initMarketingSubNav() {
    const subNavTitle = document.querySelector('.marketing-sub-nav .sub-nav-title');
    const subNavLinks = document.querySelector('.marketing-sub-nav .sub-nav-links');

    if (subNavTitle && subNavLinks) {
        if (subNavTitle.getAttribute('data-bound') === 'true') return;
        subNavTitle.setAttribute('data-bound', 'true');

        subNavTitle.addEventListener('click', function (e) {
            if (window.innerWidth <= 1200) {
                e.preventDefault();
                // Toggle arrow rotation class if needed, or use active on parent
                this.classList.toggle('active');
                subNavLinks.classList.toggle('active');
            }
        });
    }

    // Handle inner dropdowns for mobile
    const dropdowns = document.querySelectorAll('.marketing-sub-nav .has-sub-dropdown');
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('a');
        if (trigger && !trigger.getAttribute('data-bound')) {
            trigger.setAttribute('data-bound', 'true');
            trigger.addEventListener('click', (e) => {
                if (window.innerWidth <= 1200) {
                    e.preventDefault();
                    e.stopPropagation();

                    // Close other dropdowns
                    dropdowns.forEach(d => {
                        if (d !== dropdown) d.classList.toggle('active', false);
                    });

                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1200) {
            dropdowns.forEach(dropdown => {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('active');
                }
            });
        }
    });
}
