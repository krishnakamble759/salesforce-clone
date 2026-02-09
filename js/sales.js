// Initialize Sales Page Main Function
export function initSalesPage() {
    initSalesSubNav();
    initExtendSlider('extendSliderTrack', 'extendSliderNext', 'extendSliderPrev', 'extendSliderProgress');
    initExtendSlider('extendSliderTrack2', 'extendSliderNext2', 'extendSliderPrev2', 'extendSliderProgress2');
    initDiscoverTabs();
    initSalesFaqTabs();
    initSalesblazerVideo();
    initPotentialSliders();
    initSalesFaqAccordion();
}

// Initialize Sales Sub-nav Toggle
export function initSalesSubNav() {
    const subNavTitle = document.querySelector('.sb-sub-nav .sub-nav-title');
    const subNavLinks = document.querySelector('.sb-sub-nav .sub-nav-links');

    if (subNavTitle && subNavLinks) {
        if (subNavTitle.getAttribute('data-sales-bound') === 'true') return;
        subNavTitle.setAttribute('data-sales-bound', 'true');

        subNavTitle.addEventListener('click', function (e) {
            // If the title link is clicked, allow default refresh behavior
            if (e.target.closest('.title-link')) {
                return;
            }

            e.preventDefault();
            e.stopPropagation();
            this.classList.toggle('active');
            subNavLinks.classList.toggle('active');
        });
    }

    // Handle inner dropdowns for mobile
    const dropdowns = document.querySelectorAll('.sb-sub-nav .has-sub-dropdown');
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('a');
        if (trigger && !trigger.getAttribute('data-sales-bound')) {
            trigger.setAttribute('data-sales-bound', 'true');
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

    document.addEventListener('click', (e) => {
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('is-active');
            }
        });
    });
}

// Extend Sales Cloud Slider
export function initExtendSlider(trackId, nextId, prevId, progressId) {
    const track = document.getElementById(trackId);
    const nextBtn = document.getElementById(nextId);
    const prevBtn = document.getElementById(prevId);
    const progressBar = document.getElementById(progressId);

    if (!track || !nextBtn || !prevBtn) return;

    let currentIndex = 0;
    const cards = track.querySelectorAll('.slider-card');
    const totalCards = cards.length;

    function updateSlider() {
        let visibleCards = 3;
        if (window.innerWidth <= 767) visibleCards = 1;
        else if (window.innerWidth <= 991) visibleCards = 2;

        const maxIndex = totalCards - visibleCards;

        // Safety check
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;

        const cardWidth = 100 / visibleCards;
        track.style.transform = `translateX(-${currentIndex * cardWidth}%)`;

        // Update Prev Button
        if (currentIndex === 0) {
            prevBtn.classList.remove('visible');
        } else {
            prevBtn.classList.add('visible');
        }

        // Update Next Button
        if (currentIndex >= maxIndex) {
            nextBtn.style.opacity = '0';
            nextBtn.style.pointerEvents = 'none';
        } else {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
        }

        // Update Progress Bar
        if (progressBar) {
            const barWidth = (visibleCards / totalCards) * 100;
            progressBar.style.width = `${barWidth}%`;

            if (maxIndex > 0) {
                const progressPercent = (currentIndex / maxIndex) * (100 - barWidth);
                progressBar.style.transform = `translateX(${progressPercent * (100 / barWidth)}%)`;
            } else {
                progressBar.style.transform = `translateX(0%)`;
            }
        }
    }

    nextBtn.addEventListener('click', () => {
        currentIndex++;
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex--;
        updateSlider();
    });

    window.addEventListener('resize', updateSlider);

    // Initial call
    setTimeout(updateSlider, 300);
}

/**
 * Discover What's New Tabs
 */
export function initDiscoverTabs() {
    const tabs = document.querySelectorAll('.discover-tab');
    const tabContents = document.querySelectorAll('.discover-tab-content');

    if (tabs.length === 0) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');

            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tab
            tab.classList.add('active');

            // Hide all tab contents
            tabContents.forEach(content => {
                content.classList.remove('active');
            });

            // Show target tab content
            const targetContent = document.getElementById(`${targetTab}-tab`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

/**
 * Sales FAQ Tabs Logic
 */
export function initSalesFaqTabs() {
    const faqSection = document.querySelector('.sales-faqs-section');
    if (!faqSection) return;

    const dropdownToggle = faqSection.querySelector('.dropdown-toggle');
    const dropdownItems = faqSection.querySelectorAll('.dropdown-item');
    const allTabs = faqSection.querySelectorAll('.nav-link');
    const dropdownContainer = faqSection.querySelector('.dropdown');

    // Handle dropdown items
    dropdownItems.forEach(item => {
        item.addEventListener('click', function (e) {
            // Remove active from all tabs
            allTabs.forEach(t => t.classList.remove('active'));

            // Add active to dropdown toggle
            if (dropdownToggle) {
                dropdownToggle.classList.add('active');
            }

            const dropdownMenu = dropdownContainer.querySelector('.dropdown-menu');
            if (dropdownMenu) {
                dropdownMenu.style.opacity = '0';
                dropdownMenu.style.visibility = 'hidden';
                setTimeout(() => {
                    dropdownMenu.style.opacity = '';
                    dropdownMenu.style.visibility = '';
                }, 300);
            }
        });
    });

    // Handle clicks on direct tabs
    const directTabs = faqSection.querySelectorAll('.nav-link:not(.dropdown-toggle)');
    directTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            if (dropdownToggle) {
                dropdownToggle.classList.remove('active');
            }
        });
    });
}

// Video Playback for Salesblazer Community
export function initSalesblazerVideo() {
    const playBtn = document.querySelector('.play-btn-large');
    const videoContainer = document.querySelector('.salesblazer-video');

    if (playBtn && videoContainer) {
        playBtn.addEventListener('click', () => {
        });
    }
}

/**
 * Potential Section Slider Logic
 */
export function initPotentialSliders() {
    const sliders = document.querySelectorAll('.slider-row');

    sliders.forEach(slider => {
        const track = slider.querySelector('.slider-track');
        const nextBtn = slider.querySelector('.slider-arrow.next');
        const prevBtn = slider.querySelector('.slider-arrow.prev');
        const progressContainer = slider.querySelector('.slider-progress-container');
        const progressBar = slider.querySelector('.slider-progress-bar');
        const cards = track ? track.querySelectorAll('.potential-card') : [];

        if (!track || !nextBtn || !prevBtn || !progressBar || cards.length === 0) return;

        let currentIndex = 0;

        function getVisibleCardsCount() {
            if (window.innerWidth <= 576) return 1;
            if (window.innerWidth <= 991) return 2;
            return 3;
        }

        function updateSlider() {
            const visibleCards = getVisibleCardsCount();
            const totalCards = cards.length;
            const maxIndex = Math.max(0, totalCards - visibleCards);

            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
            }

            const cardWidth = cards[0].offsetWidth;
            const gap = 24;
            const scrollAmount = currentIndex * (cardWidth + gap);
            track.style.transform = `translateX(-${scrollAmount}px)`;

            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= maxIndex;

            // Progress Bar Logic
            const thumbWidthPercent = (visibleCards / totalCards) * 100;
            progressBar.style.width = `${thumbWidthPercent}%`;

            if (maxIndex > 0) {
                const movePercent = (currentIndex / maxIndex) * (100 - thumbWidthPercent);
                progressBar.style.transform = `translateX(${movePercent * (100 / thumbWidthPercent)}%)`;
            } else {
                progressBar.style.transform = `translateX(0%)`;
            }
        }

        nextBtn.addEventListener('click', () => {
            const visibleCards = getVisibleCardsCount();
            if (currentIndex < cards.length - visibleCards) {
                currentIndex++;
                updateSlider();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });

        // Click on Progress Bar to navigate
        if (progressContainer) {
            progressContainer.addEventListener('click', (e) => {
                const rect = progressContainer.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const percent = clickX / rect.width;

                const visibleCards = getVisibleCardsCount();
                const totalCards = cards.length;
                const maxIndex = totalCards - visibleCards;

                if (maxIndex > 0) {
                    currentIndex = Math.round(percent * maxIndex);
                    updateSlider();
                }
            });
        }

        window.addEventListener('resize', updateSlider);
        setTimeout(updateSlider, 500);
    });
}

/**
 * Sales FAQ Accordion Logic
 */
export function initSalesFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-accordion .faq-item');
    if (faqItems.length === 0) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

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
                const icon = question.querySelector('i');
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
