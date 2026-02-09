/**
 * Data Cloud Page Functionality
 */

// Discover Carousel (Data 360)
export function initDiscoverCarousel() {
    const track = document.querySelector('.discover-track');
    const nextBtn = document.querySelector('.discover-next');
    const prevBtn = document.querySelector('.discover-prev');
    const scrollbarThumb = document.querySelector('.discover-scrollbar-thumb');

    if (!track || !nextBtn || !prevBtn) return;

    let currentIndex = 0;
    const cards = document.querySelectorAll('.discover-card');
    const totalCards = cards.length;

    function updateCarousel() {
        let visibleCards = 3;
        if (window.innerWidth <= 576) visibleCards = 1;
        else if (window.innerWidth <= 992) visibleCards = 2;

        const maxIndex = totalCards - visibleCards;

        // Safety check
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;

        const movePercent = 100 / visibleCards;
        track.style.transform = `translateX(-${currentIndex * movePercent}%)`;

        // Update Button Visiblity / Opacity
        // Previous Button
        if (currentIndex === 0) {
            prevBtn.style.opacity = '0';
            prevBtn.style.pointerEvents = 'none';
        } else {
            prevBtn.style.opacity = '1';
            prevBtn.style.pointerEvents = 'auto';
        }

        // Next Button
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
            if (window.innerWidth <= 576) visibleCards = 1;
            else if (window.innerWidth <= 992) visibleCards = 2;
            const maxIndex = totalCards - visibleCards;

            if (maxIndex > 0) {
                currentIndex = Math.round((newLeftPercent / maxThumbLeftPercent) * maxIndex);

                // Visual feedback
                scrollbarThumb.style.left = `${newLeftPercent}%`;
                const movePercent = 100 / visibleCards;
                track.style.transform = `translateX(-${currentIndex * movePercent}%)`;
            }
        });

        window.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                scrollbarThumb.style.cursor = 'pointer';
                scrollbarThumb.style.transition = '';
                document.body.style.userSelect = '';
                updateCarousel();
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
            if (window.innerWidth <= 576) visibleCards = 1;
            else if (window.innerWidth <= 992) visibleCards = 2;
            const maxIndex = totalCards - visibleCards;

            if (maxIndex > 0) {
                currentIndex = Math.round((clickPercent / 100) * maxIndex);
                updateCarousel();
            }
        });
    }

    window.addEventListener('resize', updateCarousel);

    // Initial call
    setTimeout(updateCarousel, 100);
}

// Data 360 Sub Nav Toggle
export function initData360SubNav() {
    // 1. Main Nav Toggle
    const toggle = document.getElementById('data360SubNavToggle');
    const nav = document.querySelector('.data360-nav');

    if (toggle && nav) {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (window.innerWidth <= 1200) {
                const isActive = nav.classList.contains('active');
                if (isActive) {
                    nav.classList.remove('active');
                    // Reset all inner items to closed state when main nav closes
                    const navItems = document.querySelectorAll('.data360-nav-item');
                    navItems.forEach(item => item.classList.remove('active'));
                } else {
                    nav.classList.add('active');
                }
            }
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        });
    }

    // 2. Inner Dropdown Toggles for Mobile
    const navItems = document.querySelectorAll('.data360-nav-item');
    navItems.forEach(item => {
        const link = item.querySelector('.data360-nav-link');
        const backBtn = item.querySelector('.mobile-back-btn');

        if (link) {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 1200) {
                    e.preventDefault();
                    e.stopPropagation();

                    const isActive = item.classList.contains('active');
                    if (isActive) {
                        item.classList.remove('active');
                    } else {
                        // Optional: Close others (Accordion mode)
                        navItems.forEach(otherItem => {
                            otherItem.classList.remove('active');
                        });
                        item.classList.add('active');
                    }
                }
            });
        }

        if (backBtn) {
            backBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                item.classList.remove('active');
            });
        }
    });
}

/**
 * Data 360 FAQ Accordion
 */
export function initDataCloudFaq() {
    const faqSection = document.querySelector('.data360-faq-section');
    if (!faqSection) return;

    const faqItems = faqSection.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');

        if (questionBtn) {
            // Prevent double initialization
            if (questionBtn.hasAttribute('data-faq-init')) return;
            questionBtn.setAttribute('data-faq-init', 'true');

            questionBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const isActive = item.classList.contains('active');

                item.classList.toggle('active');
                const nowActive = item.classList.contains('active');
                questionBtn.setAttribute('aria-expanded', nowActive);

                // Update icon
                const icon = questionBtn.querySelector('i');
                if (icon) {
                    if (nowActive) {
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

// Ensure initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initDataCloudFaq();
    });
} else {
    initDataCloudFaq();
}
