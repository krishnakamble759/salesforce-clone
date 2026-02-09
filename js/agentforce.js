// Initialize all Agentforce functionality
export function initAgentforceGlobals() {
    window.switchTab = switchTab;
    window.closeStory = closeStory;
    window.checkAgentforceHash = checkAgentforceHash;
    window.showLoadingAndNavigate = showLoadingAndNavigate;
    window.toggleFaq = toggleFaq;
    window.switchUnlockTab = switchUnlockTab;
    window.showStory = (id) => switchTab(id);

    window.addEventListener('scroll', updateStoryProgress);

    initAgentforceNavigation();
}


// Unified Navigation Logic (Event Delegation)
export function initAgentforceNavigation() {
    document.addEventListener('click', (e) => {
        // Handle Switch Tab
        const switchTabBtn = e.target.closest('[data-action="switch-tab"]');
        if (switchTabBtn) {
            e.preventDefault();
            const target = switchTabBtn.getAttribute('data-target');
            if (target && window.switchTab) {
                window.switchTab(target);
            }
        }

        // Handle Close Story
        const closeStoryBtn = e.target.closest('[data-action="close-story"]');
        if (closeStoryBtn) {
            e.preventDefault();
            if (window.closeStory) {
                window.closeStory();
            }
        }
    });

    // Accordion functionality for story sections (Generic)
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach((item) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = item.getAttribute('data-target');
            if (!targetId) return;

            const targetSection = document.getElementById(targetId);
            const parentContainer = item.closest('.accordion-nav');

            // Find all content sections controlled by this specific accordion nav
            let siblings = [];
            if (parentContainer) {
                const siblingItems = parentContainer.querySelectorAll('.accordion-item');
                siblingItems.forEach(sib => {
                    const sibTargetId = sib.getAttribute('data-target');
                    if (sibTargetId) {
                        const sibSection = document.getElementById(sibTargetId);
                        if (sibSection) siblings.push(sibSection);
                    }
                    sib.classList.remove('active'); // Deactivate tabs
                });
            }

            // Hide all siblings
            siblings.forEach(el => {
                el.classList.remove('active');
                el.style.display = 'none';
            });

            // Activate clicked item
            item.classList.add('active');

            // Show target section
            if (targetSection) {
                targetSection.classList.add('active');
                targetSection.style.display = 'block';
                targetSection.style.visibility = 'visible';
                targetSection.style.opacity = '1';
                targetSection.style.height = 'auto';

                // Update Sticky Nav Tag Text if present in the current view
                const currentView = item.closest('.story-detail-hero') || item.closest('#view-story-detail') || item.closest('#view-story-lennar');
                if (currentView) {
                    const localStickyNavTag = currentView.querySelector('.story-sticky-nav .nav-tag span');
                    if (localStickyNavTag) {
                        const headerText = item.querySelector('.accordion-header span').textContent;
                        localStickyNavTag.textContent = headerText;
                    }
                }

                // Scroll to section (only if triggered by user click, avoiding initial load scroll if unwanted)
                if (e.isTrusted) { // check if real click
                    setTimeout(() => {
                        const rect = targetSection.getBoundingClientRect();
                        const absoluteTop = rect.top + window.scrollY;
                        const offsetPosition = absoluteTop - 150;
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }, 200);
                }
            }
        });
    });

    // Set initial active state for each accordion group (without scrolling)
    document.querySelectorAll('.accordion-nav').forEach(nav => {
        const firstItem = nav.querySelector('.accordion-item');
        if (firstItem) {
            firstItem.classList.add('active');
            const targetId = firstItem.getAttribute('data-target');
            if (targetId) {
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.classList.add('active');
                    targetSection.style.display = 'block';
                    targetSection.style.visibility = 'visible';
                    targetSection.style.opacity = '1';
                    targetSection.style.height = 'auto';
                }
            }
        }
    });

    // Initialize Sticky Navs
    initStickyNav('stickySectionNav', 'stickyNavToggle', 'stickyNavDropdown', [
        { id: 'challenge-content', name: 'The Challenge for Asymbl' },
        { id: 'salesforce-helps-content', name: 'How Salesforce Helps Asymbl' },
        { id: 'salesforce-difference-content', name: 'The Salesforce Difference' }
    ]);

    initStickyNav('stickySectionNavLennar', 'stickyNavToggleLennar', 'stickyNavDropdownLennar', [
        { id: 'lennar-challenge-content', name: 'The Challenge for Lennar' },
        { id: 'lennar-helps-content', name: 'How Salesforce Helps Lennar' },
        { id: 'lennar-difference-content', name: 'The Salesforce Difference' }
    ]);
}

// Navigation / Tab Switching Logic (Global)
export function switchTab(tabId) {
    console.log('Switching to tab:', tabId);

    // Update URL hash without scrolling (if supported) or just set it
    if (history.pushState) {
        history.pushState(null, null, '#' + tabId);
    } else {
        window.location.hash = tabId;
    }

    // Elements
    const viewOverview = document.getElementById('view-overview');
    const viewStories = document.getElementById('view-stories');
    const viewAsymbl = document.getElementById('view-story-detail');
    const viewLennar = document.getElementById('view-story-lennar');
    const viewNews = document.getElementById('view-news');
    const viewEvent = document.getElementById('view-event');
    const mainContainer = document.querySelector('.agentforce-detail'); // Main container for bg change

    // Agentforce container
    const agentforceDetail = document.querySelector('.agentforce-detail');

    // Select all elements that form the "Stories Overview" (Grids, Headlines, Hero)
    // We must hide these when viewing a specific story detail.
    const overviewElements = document.querySelectorAll(
        '.stories-hero, .trusted-by-section, .grid-headline, .stories-grid-section, .customer-stories-section'
    );

    // Reset global components
    const globalNextStep = document.getElementById('global-next-step');
    if (globalNextStep) globalNextStep.style.display = 'block';

    // 1. Always hide individual story details first (reset state)
    if (viewAsymbl) viewAsymbl.style.display = 'none';
    if (viewLennar) viewLennar.style.display = 'none';
    if (viewNews) viewNews.classList.add('views-hiddens');
    if (viewEvent) viewEvent.classList.add('views-hiddens');

    if (tabId === 'overview') {
        // Show Overview, Hide Stories Wrapper
        if (viewOverview) viewOverview.style.display = 'block';
        if (viewStories) viewStories.style.display = 'none';
        if (mainContainer) mainContainer.classList.remove('customer-stories-view'); // Blue background
        // Show Agentforce section
        if (agentforceDetail) agentforceDetail.style.display = 'block';
        window.scrollTo(0, 0);
    } else if (tabId === 'news') {
        // Show News Page - Hide Agentforce section
        if (viewOverview) viewOverview.style.display = 'none';
        if (viewStories) viewStories.style.display = 'none';
        if (viewNews) viewNews.classList.remove('views-hiddens');
        // Hide Agentforce container
        if (agentforceDetail) agentforceDetail.style.display = 'none';
        window.scrollTo(0, 0);
    } else if (tabId === 'event') {
        // Show Event Page - Hide Agentforce section
        if (viewOverview) viewOverview.style.display = 'none';
        if (viewStories) viewStories.style.display = 'none';
        if (viewEvent) viewEvent.classList.remove('views-hiddens');
        // Hide Agentforce container
        if (agentforceDetail) agentforceDetail.style.display = 'none';
        window.scrollTo(0, 0);
    } else {
        // Show Stories Wrapper, Hide Overview
        if (viewOverview) viewOverview.style.display = 'none';
        if (viewStories) viewStories.style.display = 'block';
        if (mainContainer) mainContainer.classList.add('customer-stories-view'); // Light background
        // Show Agentforce section
        if (agentforceDetail) agentforceDetail.style.display = 'block';

        if (tabId === 'stories') {
            // SHOW Overview Elements
            overviewElements.forEach(el => el.style.display = 'block');

            // Scroll to stories section
            setTimeout(() => {
                const scrollTarget = document.querySelector('.stories-grid-section') || document.querySelector('.customer-stories-section') || viewStories;
                if (scrollTarget) scrollTarget.scrollIntoView({ behavior: 'smooth' });
            }, 50);
        } else {
            // HIDE Overview Elements (Focus on specific story)
            overviewElements.forEach(el => el.style.display = 'none');

            if (tabId === 'lennar') {
                if (viewLennar) {
                    viewLennar.style.display = 'block';
                    window.scrollTo(0, 0);
                }
                // Hide global next step section to avoid duplication
                if (globalNextStep) globalNextStep.style.display = 'none';
            } else if (tabId === 'asymbl' || tabId === 'story-detail') {
                if (viewAsymbl) {
                    viewAsymbl.style.display = 'block';
                    window.scrollTo(0, 0);
                }
                // Hide global next step section to avoid duplication
                if (globalNextStep) globalNextStep.style.display = 'none';
            }
        }
    }
}

export function closeStory() {
    switchTab('stories');
}

// Check for hash on load
export function checkAgentforceHash() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        if (window.switchTab) {
            window.switchTab(hash);
        }
    }
}

// Sticky Nav Logic
function initStickyNav(navId, toggleId, dropdownId, sections) {
    const stickySectionNav = document.getElementById(navId);
    const stickyNavToggle = document.getElementById(toggleId);
    const stickyNavDropdown = document.getElementById(dropdownId);
    const stickyNavItems = stickySectionNav ? stickySectionNav.querySelectorAll('.sticky-nav-item') : [];
    const currentSectionName = stickySectionNav ? stickySectionNav.querySelector('.current-section-name') : null;

    if (stickySectionNav && stickyNavToggle && stickyNavDropdown) {
        // Toggle dropdown on button click
        stickyNavToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            stickyNavToggle.classList.toggle('active');
            stickyNavDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!stickySectionNav.contains(e.target)) {
                stickyNavToggle.classList.remove('active');
                stickyNavDropdown.classList.remove('show');
            }
        });

        // Handle nav item clicks
        stickyNavItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = item.getAttribute('data-section');
                const targetSection = document.getElementById(sectionId);

                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 150;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });

                    stickyNavItems.forEach(navItem => navItem.classList.remove('active'));
                    item.classList.add('active');

                    if (currentSectionName) {
                        currentSectionName.textContent = item.textContent.trim();
                    }

                    stickyNavToggle.classList.remove('active');
                    stickyNavDropdown.classList.remove('show');
                }
            });
        });

        // Scroll spy
        let ticking = false;
        function updateActiveSection() {
            // Check if this nav is actually visible
            if (window.getComputedStyle(stickySectionNav).display === 'none') return;

            const scrollPosition = window.scrollY + 200;
            sections.forEach((section) => {
                const element = document.getElementById(section.id);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetBottom = offsetTop + element.offsetHeight;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                        if (currentSectionName) currentSectionName.textContent = section.name;
                        stickyNavItems.forEach(item => {
                            if (item.getAttribute('data-section') === section.id) item.classList.add('active');
                            else item.classList.remove('active');
                        });
                    }
                }
            });
            ticking = false;
        }

        function handleStickyNavVisibility() {
            const parentView = stickySectionNav.closest('#view-story-detail') || stickySectionNav.closest('#view-story-lennar');
            if (parentView && window.getComputedStyle(parentView).display === 'none') {
                // Not in this view, do nothing
                return;
            }

            const accordionNav = parentView ? parentView.querySelector('.accordion-nav') : document.querySelector('.accordion-nav');

            if (accordionNav) {
                const accordionBottom = accordionNav.offsetTop + accordionNav.offsetHeight;
                const scrollPosition = window.scrollY;
                if (scrollPosition > accordionBottom - 100) {
                    stickySectionNav.classList.add('visible');
                } else {
                    stickySectionNav.classList.remove('visible');
                }
            }

            if (!ticking) {
                window.requestAnimationFrame(updateActiveSection);
                ticking = true;
            }
        }

        window.addEventListener('scroll', handleStickyNavVisibility);
        handleStickyNavVisibility();
    }
}

// Scroll Progress Logic
export function updateStoryProgress() {
    // Check Asymbl Details
    const asymblView = document.getElementById('view-story-detail');
    const asymblBar = document.getElementById('storyProgressBar');

    if (asymblView && window.getComputedStyle(asymblView).display !== 'none' && asymblBar) {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / docHeight) * 100;
        asymblBar.style.width = scrolled + '%';
    }

    // Check Lennar Details
    const lennarView = document.getElementById('view-story-lennar');
    const lennarBar = document.getElementById('storyProgressBarLennar');

    if (lennarView && window.getComputedStyle(lennarView).display !== 'none' && lennarBar) {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / docHeight) * 100;
        lennarBar.style.width = scrolled + '%';
    }

    // Main Page Scroll Progress
    const mainProgressBar = document.getElementById('mainScrollProgress');
    if (mainProgressBar) {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / docHeight) * 100;
        mainProgressBar.style.width = scrolled + '%';
    }

    // News Page Scroll Progress
    const newsView = document.getElementById('view-news');
    const newsBar = document.getElementById('newsScrollProgress');

    // Check if News View is active (not hidden)
    if (newsView && !newsView.classList.contains('views-hiddens') && newsBar) {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / docHeight) * 100;
        newsBar.style.width = scrolled + '%';
    }
}

// Loading Overlay Handler
export function showLoadingAndNavigate(targetTab) {
    const loadingOverlay = document.getElementById('loadingOverlay');

    if (loadingOverlay) {
        loadingOverlay.classList.add('active');

        setTimeout(() => {
            loadingOverlay.classList.remove('active');

            if (window.switchTab) {
                window.switchTab(targetTab);
            }
        }, 5000);
    }
}

// Explore Carousel Functionality
export function initExploreCarousel() {
    const track = document.getElementById('explore-track');
    const container = document.getElementById('explore-track-container');
    const prevBtn = document.getElementById('explore-prev');
    const nextBtn = document.getElementById('explore-next');
    const scrollbarThumb = document.getElementById('explore-scrollbar-thumb');

    if (!track || !container || !prevBtn || !nextBtn || !scrollbarThumb) return;

    let currentIndex = 0;

    function updateCarousel() {
        const cards = track.querySelectorAll('.explore-card');
        if (cards.length === 0) return;

        const containerWidth = container.offsetWidth;
        const cardWidth = cards[0].offsetWidth;
        const gap = 24;
        const cardFullWidth = cardWidth + gap;
        const totalCards = cards.length;

        let visibleCards = Math.floor(containerWidth / cardWidth);
        if (visibleCards < 1) visibleCards = 1;

        let maxIndex = Math.max(0, totalCards - visibleCards);

        if (currentIndex < 0) currentIndex = 0;
        if (currentIndex > maxIndex) currentIndex = maxIndex;

        const translateX = -(currentIndex * cardFullWidth);
        track.style.transform = `translateX(${translateX}px)`;

        if (currentIndex === 0) {
            prevBtn.classList.add('hidden');
        } else {
            prevBtn.classList.remove('hidden');
        }

        if (currentIndex >= maxIndex) {
            nextBtn.classList.add('hidden');
        } else {
            nextBtn.classList.remove('hidden');
        }

        const contentWidth = totalCards * cardFullWidth;
        let ratio = containerWidth / contentWidth;
        if (ratio > 1) ratio = 1;

        const thumbWidthPercent = ratio * 100;
        scrollbarThumb.style.width = `${thumbWidthPercent}%`;

        if (maxIndex > 0) {
            const progress = currentIndex / maxIndex;
            const maxLeft = 100 - thumbWidthPercent;
            const leftPos = progress * maxLeft;
            scrollbarThumb.style.left = `${leftPos}%`;
        } else {
            scrollbarThumb.style.left = '0%';
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

    window.addEventListener('resize', () => {
        updateCarousel();
    });

    setTimeout(updateCarousel, 100);
}

// Unlock Section Tabs Toggle
export function switchUnlockTab(tabName) {
    const contentGrid = document.getElementById('unlock-content');
    const eventsGrid = document.getElementById('unlock-events');
    const tabs = document.querySelectorAll('.unlock-tabs li');

    if (!contentGrid || !eventsGrid || tabs.length < 2) return;

    if (tabName === 'content') {
        contentGrid.style.display = 'grid';
        eventsGrid.style.display = 'none';
        tabs[0].classList.add('active');
        tabs[1].classList.remove('active');
    } else {
        contentGrid.style.display = 'none';
        eventsGrid.style.display = 'grid';
        tabs[0].classList.remove('active');
        tabs[1].classList.add('active');
    }
}

// Helper to toggle active state on FAQ style elements (Generic)
export function toggleFaq(btn) {
    const item = btn.parentElement;
    const icon = btn.querySelector('i');

    if (item.classList.contains('active')) {
        item.classList.remove('active');
        if (icon) {
            icon.classList.remove('fa-minus');
            icon.classList.add('fa-plus');
        }
    } else {
        item.classList.add('active');
        if (icon) {
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-minus');
        }
    }
}

// Agentforce Sub Navigation
export function initAgentforceSubNav() {
    // 1. Target main Agentforce nav
    const toggle = document.getElementById('agentforceNavToggle');
    const nav = document.querySelector('.agentforce-nav');

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            if (window.innerWidth <= 1200) {
                nav.classList.toggle('active');
            }
        });
    }

    // 2. Target Agentforce AI App sub-nav (using delegation for reliability)
    document.addEventListener('click', (e) => {
        const toggle = e.target.closest('#agentforceAiAppNavToggle');
        if (toggle) {
            if (window.innerWidth >= 1440) {
                window.location.reload();
                return;
            }

            e.preventDefault();
            e.stopPropagation();
            const nav = toggle.closest('.sub-nav');
            if (nav) {
                nav.classList.toggle('active');
            }
        }
    });

    // 3. Mobile Dropdown Toggles for all Agentforce-style sub-navs
    const dropdownContainers = document.querySelectorAll('.agentforce-nav-item.dropdown-container, .sub-nav .has-dropdown');

    dropdownContainers.forEach(container => {
        const trigger = container.querySelector('.agentforce-nav-link, a');

        if (trigger) {
            trigger.addEventListener('click', (e) => {
                if (window.innerWidth <= 1200) {
                    const dropdown = container.querySelector('.sub-dropdown, .agentforce-dropdown-menu');
                    if (dropdown) {
                        e.preventDefault();
                        e.stopPropagation();

                        container.classList.toggle('active');
                        trigger.classList.toggle('active');
                    }
                }
            });
        }
    });
}
