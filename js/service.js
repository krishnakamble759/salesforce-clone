
export function initServicePage() {
    initServiceTabs();
    initServiceFaq();
    initServiceSubNav();
}

/**
 * Service Page Tabs Logic (Delegated)
 */
export function initServiceTabs() {
    console.log('Initializing Service Tabs...');

    // Check if we've already bound the listener to avoid duplicates
    if (document.body.hasAttribute('data-service-tabs-bound')) return;
    document.body.setAttribute('data-service-tabs-bound', 'true');

    document.addEventListener('click', function (e) {
        // 1. Handle More Dropdown Toggle
        const moreBtn = e.target.closest('#moreTabsBtn');
        const dropdown = document.getElementById('moreTabsDropdown');

        if (moreBtn) {
            e.preventDefault();
            dropdown.classList.toggle('active');
            const icon = moreBtn.querySelector('i');
            if (icon) icon.style.transform = dropdown.classList.contains('active') ? 'rotate(180deg)' : '';
            return;
        }

        // Close dropdown when clicking outside
        if (dropdown && dropdown.classList.contains('active') && !e.target.closest('.more-tabs-container')) {
            dropdown.classList.remove('active');
            const mBtn = document.getElementById('moreTabsBtn');
            if (mBtn) {
                const icon = mBtn.querySelector('i');
                if (icon) icon.style.transform = '';
            }
        }

        // 2. Handle Tab Selection
        const btn = e.target.closest('.innovations-tabs .tab-btn');
        if (!btn) return;

        e.preventDefault();
        const target = btn.getAttribute('data-tab');
        console.log('Service Tabs (Top-Level Delegated): Clicking tab', target);

        if (!target) return;

        // Is it a dropdown item?
        const isDropdownItem = !!btn.closest('.more-tabs-dropdown');

        // 1. Update Buttons State
        const tabButtons = document.querySelectorAll('.innovations-tabs .tab-btn');
        const mainMoreBtn = document.getElementById('moreTabsBtn');

        tabButtons.forEach(b => b.classList.remove('active'));
        if (mainMoreBtn) mainMoreBtn.classList.remove('active');

        btn.classList.add('active');

        // If it's a dropdown item, also activate the "More" button
        if (isDropdownItem && mainMoreBtn) {
            mainMoreBtn.classList.add('active');
            dropdown.classList.remove('active');
            const icon = mainMoreBtn.querySelector('i');
            if (icon) icon.style.transform = '';
        }

        // 2. Hide All Content
        const tabContents = document.querySelectorAll('.discover-new .tab-content');
        tabContents.forEach(content => {
            content.classList.remove('active');
            content.style.display = '';
        });

        // 3. Show Target Content
        const targetContent = document.getElementById(`${target}-content`);
        if (targetContent) {
            targetContent.classList.add('active');
            console.log('Service Tabs (Top-Level Delegated): Activated content', target);
        }
    });
}

/**
 * Initialize Service Page FAQ (Tabs + Accordion)
 */
export function initServiceFaq() {
    const faqSection = document.querySelector('.faq-section');
    if (!faqSection) return;

    // Check if we've already bound the listener
    if (faqSection.hasAttribute('data-faq-bound')) return;
    faqSection.setAttribute('data-faq-bound', 'true');

    // Delegate clicks within the section
    faqSection.addEventListener('click', (e) => {
        // 1. Tab Switching
        const tab = e.target.closest('.faq-tab');
        if (tab) {
            // Remove active from all tabs
            const tabsContainer = tab.closest('.faq-tabs');
            if (tabsContainer) {
                tabsContainer.querySelectorAll('.faq-tab').forEach(t => t.classList.remove('active'));
            }
            tab.classList.add('active');

            // Switch Content
            const targetAttr = tab.getAttribute('data-tab');
            if (targetAttr) {
                const targetId = targetAttr + '-faq';
                const containers = faqSection.querySelectorAll('.faq-container');

                containers.forEach(container => {
                    if (container.id === targetId) {
                        container.classList.add('active');
                        container.style.display = 'block';
                    } else {
                        container.classList.remove('active');
                        container.style.display = 'none';
                    }
                });
            }
            return;
        }

        // 2. Accordion Logic
        const question = e.target.closest('.faq-question');
        if (question) {
            e.preventDefault();
            const item = question.closest('.faq-item');
            const container = item.closest('.faq-container');
            const isActive = item.classList.contains('active');
            const icon = question.querySelector('i');

            // Close all items in THIS container
            if (container) {
                container.querySelectorAll('.faq-item').forEach(i => {
                    i.classList.remove('active');
                    const iIcon = i.querySelector('.faq-question i');
                    if (iIcon) {
                        iIcon.classList.remove('fa-minus');
                        iIcon.classList.add('fa-plus');
                    }
                    const ans = i.querySelector('.faq-answer');
                    if (ans) ans.style.maxHeight = null;
                });
            }

            // Toggle clicked item
            if (!isActive) {
                item.classList.add('active');
                if (icon) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                }
                const answer = item.querySelector('.faq-answer');
                if (answer) {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                }
            }
        }
    });

    // Ensure initial state
    const activeTab = faqSection.querySelector('.faq-tab.active');
    if (activeTab) {
        const targetAttr = activeTab.getAttribute('data-tab');
        const targetId = targetAttr + '-faq';
        const activeContainer = document.getElementById(targetId);
        if (activeContainer) {
            const allContainers = faqSection.querySelectorAll('.faq-container');
            allContainers.forEach(c => {
                c.style.display = 'none';
                c.classList.remove('active');
            });
            activeContainer.style.display = 'block';
            activeContainer.classList.add('active');
        }
    }
}

/**
 * Initialize Service Sub-nav Toggle (Delegated V3)
 */
export function initServiceSubNav() {
    console.log('Initializing Service Sub-nav (Delegated V3)');

    const subNavTitle = document.querySelector('.service-page .sb-sub-nav .sub-nav-title');
    const subNavLinks = document.querySelector('.service-page .sb-sub-nav .sub-nav-links');

    // 1. Handle Main Sub-nav Toggle (Mobile)
    if (subNavTitle && subNavLinks) {
        if (!subNavTitle.hasAttribute('data-bound-v3')) {
            subNavTitle.setAttribute('data-bound-v3', 'true');

            subNavTitle.addEventListener('click', function (e) {
                if (e.target.closest('.title-link')) return;

                e.preventDefault();
                e.stopPropagation();

                this.classList.toggle('active');
                subNavLinks.classList.toggle('active');
            });
        }
    }

    // 2. Handle Sub-Dropdowns via Delegation
    if (subNavLinks) {
        if (!subNavLinks.hasAttribute('data-delegated-v3')) {
            subNavLinks.setAttribute('data-delegated-v3', 'true');

            subNavLinks.addEventListener('click', function (e) {
                const toggleLink = e.target.closest('.has-sub-dropdown > a');

                if (toggleLink) {
                    console.log('Service Nav: Dropdown clicked (Delegated)');
                    // Allow click toggle on all screen sizes (Removed width check)
                    e.preventDefault();
                    e.stopPropagation();

                    const parentLi = toggleLink.closest('li');
                    parentLi.classList.toggle('active');

                    const siblings = subNavLinks.querySelectorAll('.has-sub-dropdown');
                    siblings.forEach(sib => {
                        if (sib !== parentLi) {
                            sib.classList.remove('active');
                        }
                    });
                }
            });
        }
    }

    // 3. Global Click to Close
    if (!document.body.hasAttribute('data-service-closer-v3')) {
        document.body.setAttribute('data-service-closer-v3', 'true');
        document.addEventListener('click', function (e) {
            if (!e.target.closest('.sb-sub-nav')) {
                const activeItems = document.querySelectorAll('.service-page .sb-sub-nav .has-sub-dropdown.active');
                activeItems.forEach(item => item.classList.remove('active'));
            }
        });
    }
}
