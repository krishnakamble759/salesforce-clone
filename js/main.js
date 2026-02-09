// Main JavaScript Entry Point
import { initDiscoverCarousel, initData360SubNav } from './datacloud.js';
import { initAgentforceAiApp, initAgentforceAppToolsCarousel } from './agentforceaiapp.js';
import { initAgentforceGlobals, initAgentforceSubNav, initExploreCarousel } from './agentforce.js';
import { initArtificialIntelligencePage, initAiSubNav } from './artificial_intelligence.js';
import { initMarketingPage, initMarketingDropdown, initMarketingMobileNav, initMarketingVideoCarousel, initMarketingSuccessStories, initMarketingDiscoverTabs, initMarketingFaq, initMarketingVideo, initMarketingSubNav } from './marketing.js';
import { initProductsOffcanvas, initProductsFaq } from './products.js';
import { initSalesPage, initSalesSubNav, initExtendSlider, initDiscoverTabs, initSalesFaqTabs, initSalesblazerVideo, initPotentialSliders } from './sales.js';
import { initServicePage, initServiceTabs, initServiceFaq, initServiceSubNav } from './service.js';
import { initSmallBusinessPage, initSbSpecifics, initSmbTabs, initFaqTabs, initFreeCrmSignup, initSbFaqAccordion } from './smallbusiness.js';
console.log('Salesforce Website: main.js is loading...');
console.error('DEBUG: main.js execution started');

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    if (typeof init === 'function') init();

    // Force handle register link
    const registerLink = document.getElementById('registerNowLink');
    if (registerLink) {
        registerLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(registerLink.href, '_blank');
        });
    }
});

async function loadSharedHeader() {
    // Check what's already in the DOM
    const hasHeader = !!document.querySelector('.header');
    const hasOffcanvas = !!document.getElementById('productsOffcanvas');
    const hasOverlay = !!document.getElementById('productsOffcanvasOverlay');

    if (document.body.classList.contains('get-free-crm-page')) return;

    try {
        console.log('Loading shared components from index.html...');
        const response = await fetch('index.html?t=' + new Date().getTime());
        if (!response.ok) throw new Error('Failed to fetch index.html');

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Extract and inject Header only if missing
        const header = doc.querySelector('.header');
        if (header && !hasHeader) {
            document.body.insertBefore(header, document.body.firstChild);
        }

        // Extract and inject Footer
        const footer = doc.querySelector('.main-footer') || doc.querySelector('footer');
        if (footer && !document.querySelector('.main-footer')) {
            const placeholder = document.getElementById('footer-placeholder');
            const overlay = document.getElementById('productsOffcanvasOverlay');

            if (placeholder) {
                placeholder.replaceWith(footer);
            } else if (overlay) {
                document.body.insertBefore(footer, overlay);
            } else {
                document.body.appendChild(footer); // Fallback
            }
        }

        // Extract and inject Offcanvas components
        const overlay = doc.getElementById('productsOffcanvasOverlay');
        const offcanvas = doc.getElementById('productsOffcanvas');

        if (offcanvas && !document.getElementById('productsOffcanvas')) {
            document.body.appendChild(offcanvas);
        }
        if (overlay && !document.getElementById('productsOffcanvasOverlay')) {
            document.body.appendChild(overlay);
        }

        // Inject Chatbot
        const chatbot = doc.getElementById('chatbotModal');
        if (chatbot && !document.getElementById('chatbotModal')) {
            document.body.appendChild(chatbot);
        }

        // Inject Chatbot Trigger Button
        const chatTrigger = doc.getElementById('askAgentforceTrigger');
        if (chatTrigger && !document.getElementById('askAgentforceTrigger')) {
            document.body.appendChild(chatTrigger);
        }

    } catch (err) {
        console.error('Error loading shared components:', err);
    }
}

// Initialize Function
async function init() {
    console.log('Application initialized');
    const body = document.body;

    // 1. Load header dynamically first (Shared for most pages)
    await loadSharedHeader();

    // 2. Global Components (Needed on most/all pages)
    initMobileMenu();
    initVideoPlayer();
    initChatWidget();
    initSmoothScroll();
    initHeaderScroll();
    initDropdownMenu();
    initSearchBox();
    initProductsOffcanvas();
    initLoginDropdown();

    // 3. Page-Specific Initializations

    // Marketing Page
    if (body.classList.contains('marketing-page')) {
        initMarketingPage();
    }

    // Products Page
    if (body.classList.contains('products-page')) {
        initProductsFaq();
    }

    // Service Page
    if (body.classList.contains('service-page')) {
        initServicePage();
    }

    // Data Cloud (Data 360) Page
    if (body.classList.contains('data360-body')) {
        initDiscoverCarousel();
        initData360SubNav();
        // initDataCloudFaq() is self-initializing in datacloud.js
    }

    // Agentforce Page
    if (body.classList.contains('agentforce-body')) {
        initAgentforceGlobals();
        initAgentforceSubNav();
        initExploreCarousel();
    }

    // Agentforce AI App Page
    if (body.classList.contains('agentforce-ai-app')) {
        initAgentforceAiApp();
        initAgentforceAppToolsCarousel();
    }

    // Small Business Page
    if (body.classList.contains('small-business-page')) {
        initSmallBusinessPage();
    }

    // Sales Page
    if (body.classList.contains('sales-page')) {
        initSalesPage();
    }

    // Artificial Intelligence Page
    if (body.classList.contains('ai-page')) {
        initArtificialIntelligencePage();
        initAiSubNav();
        initBuilderAccordion();
        initTrustAccordion();
    }

    // Slack Page
    if (body.classList.contains('slack-page')) {
        // Slack specific init if any
    }

    // Contact Page View Handling
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('page') === 'contact') {
        const homeView = document.getElementById('home-view');
        const contactView = document.getElementById('contact-view');
        if (homeView && contactView) {
            homeView.style.display = 'none';
            contactView.style.display = 'block';
            document.title = 'Contact Us - Salesforce';
            body.classList.add('contact-page');
            window.scrollTo(0, 0);
        }
    }
}

// Login Dropdown
function initLoginDropdown() {
    const loginWrapper = document.querySelector('.login-wrapper');
    if (loginWrapper) {
        console.log('Login dropdown initialized');
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        const toggleIcon = mobileMenuToggle.querySelector('i');

        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            document.body.classList.toggle('mobile-menu-active');

            // If we just closed the menu, also close products offcanvas
            if (!navMenu.classList.contains('active')) {
                const productsOffcanvas = document.getElementById('productsOffcanvas');
                const productsOverlay = document.getElementById('productsOffcanvasOverlay');
                if (productsOffcanvas) productsOffcanvas.classList.remove('show');
                if (productsOverlay) productsOverlay.classList.remove('show');
            }

            // Toggle Icon between bars and X
            if (navMenu.classList.contains('active')) {
                if (toggleIcon) {
                    toggleIcon.classList.remove('fa-bars');
                    toggleIcon.classList.add('fa-xmark');
                }
            } else {
                if (toggleIcon) {
                    toggleIcon.classList.remove('fa-xmark');
                    toggleIcon.classList.add('fa-bars');
                }
            }

            // Update aria-expanded
            const isExpanded = navMenu.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Toggle between Main Menu and Login View
        const mobileLoginTrigger = document.getElementById('mobileLoginTrigger');
        const backToMainMenu = document.getElementById('backToMainMenu');
        const mainMenuView = navMenu.querySelector('.menu-main-view');
        const loginMenuView = navMenu.querySelector('.menu-login-view');

        if (mobileLoginTrigger && mainMenuView && loginMenuView) {
            mobileLoginTrigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                mainMenuView.style.display = 'none';
                loginMenuView.style.display = 'block';
            });
        }

        if (backToMainMenu && mainMenuView && loginMenuView) {
            backToMainMenu.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                loginMenuView.style.display = 'none';
                mainMenuView.style.display = 'block';
            });
        }

        // Close menu when a link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                const isProductsTrigger = link.id === 'productsMenuTrigger' || link.closest('#productsMenuTrigger');
                const isLoginTrigger = link.id === 'mobileLoginTrigger' || link.closest('#mobileLoginTrigger');
                const isBackBtn = link.id === 'backToMainMenu' || link.classList.contains('back-to-main');

                if (isProductsTrigger || isLoginTrigger || isBackBtn) {
                    return;
                }

                navMenu.classList.remove('active');
                document.body.classList.remove('mobile-menu-active');
                if (toggleIcon) {
                    toggleIcon.classList.remove('fa-xmark');
                    toggleIcon.classList.add('fa-bars');
                }
                mobileMenuToggle.setAttribute('aria-expanded', 'false');

                if (mainMenuView && loginMenuView) {
                    mainMenuView.style.display = 'block';
                    loginMenuView.style.display = 'none';
                }
            });
        });
    }
}

// Video Player
function initVideoPlayer() {
    const playButton = document.querySelector('.play-button');
    const videoElement = document.querySelector('.hero-video');

    if (playButton && videoElement) {
        playButton.addEventListener('click', () => {
            if (videoElement.paused) {
                videoElement.play();
                playButton.style.display = 'none';
            }
        });

        videoElement.addEventListener('click', () => {
            if (!videoElement.paused) {
                videoElement.pause();
                playButton.style.display = 'flex';
            }
        });
    }
}

// Chat Widget
function initChatWidget() {
    const chatTriggers = document.querySelectorAll('#askAgentforceTrigger, #askAgentforceTrigger2, .floating-chat-btn button');
    const chatbotModal = document.getElementById('chatbotModal');
    const closeChatbotBtn = document.getElementById('closeChatbot');
    const sendChatBtn = document.getElementById('sendChatMessage');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotMessages = document.getElementById('chatbotMessages');

    if (chatbotModal) {
        // Toggle Triggers
        chatTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                chatbotModal.classList.add('show');
            });
        });

        // Close logic
        if (closeChatbotBtn) {
            closeChatbotBtn.addEventListener('click', () => {
                chatbotModal.classList.remove('show');
            });
        }

        // Send logic
        if (sendChatBtn && chatbotInput && chatbotMessages) {
            const sendMessage = () => {
                const message = chatbotInput.value.trim();
                if (message) {
                    // Add user message
                    const userMessage = document.createElement('div');
                    userMessage.className = 'chat-message user-message';
                    userMessage.innerHTML = `
                        <div class="message-avatar">ðŸ‘¤</div>
                        <div class="message-content">
                            <p>${message}</p>
                        </div>
                    `;
                    chatbotMessages.appendChild(userMessage);
                    chatbotInput.value = '';
                    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

                    // Simulate bot response
                    setTimeout(() => {
                        const botMessage = document.createElement('div');
                        botMessage.className = 'chat-message bot-message';
                        botMessage.innerHTML = `
                            <div class="message-avatar">ðŸ¤–</div>
                            <div class="message-content">
                                <p>I understand you're asking about: "${message}". Let me help you with that!</p>
                            </div>
                        `;
                        chatbotMessages.appendChild(botMessage);
                        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
                    }, 1000);
                }
            };

            sendChatBtn.addEventListener('click', sendMessage);
            chatbotInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
    }
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.main-header');
    let lastScroll = 0;

    if (header) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });
    }
}

// Dropdown Menu
function initDropdownMenu() {
    const dropdownToggles = document.querySelectorAll('.nav-item.has-dropdown > .nav-link');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdown = toggle.nextElementSibling;

            if (dropdown && dropdown.classList.contains('dropdown-menu')) {
                dropdown.classList.toggle('show');
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.has-dropdown')) {
            document.querySelectorAll('.has-dropdown .dropdown-menu.show').forEach(menu => {
                menu.classList.remove('show');
            });
        }
    });
}

// Search Box with Dropdown
function initSearchBox() {
    const searchBox = document.querySelector('.search-box');
    const searchInput = document.querySelector('.search-input');
    const searchDropdown = document.querySelector('.search-dropdown');
    const searchOptions = document.querySelectorAll('.search-option');
    const searchClose = document.querySelector('.search-close');

    if (searchBox && searchInput && searchDropdown) {
        searchInput.addEventListener('click', () => {
            searchBox.classList.add('active');
            searchDropdown.classList.add('show');
            if (searchClose) searchClose.style.display = 'block';
        });

        searchInput.addEventListener('input', (e) => {
            if (e.target.value.trim().length > 0) {
                searchDropdown.classList.remove('show');
            } else {
                searchDropdown.classList.add('show');
            }
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const message = searchInput.value.trim();
                if (message) {
                    sendToChatbot(message, searchBox, searchDropdown, searchInput, searchClose);
                }
            }
        });

        if (searchClose) {
            searchClose.addEventListener('click', () => {
                searchBox.classList.remove('active');
                searchDropdown.classList.remove('show');
                searchInput.value = '';
                searchClose.style.display = 'none';
            });
        }

        searchOptions.forEach(option => {
            option.addEventListener('click', () => {
                const message = option.getAttribute('data-message');
                sendToChatbot(message, searchBox, searchDropdown, searchInput, searchClose);
                searchInput.value = message;
                searchDropdown.classList.remove('show');
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchBox.contains(e.target)) {
                searchBox.classList.remove('active');
                searchDropdown.classList.remove('show');
                if (searchInput.value.trim() === '') {
                    if (searchClose) searchClose.style.display = 'none';
                }
            }
        });
    }
}

// Send message to chatbot
function sendToChatbot(message, searchBox, searchDropdown, searchInput, searchClose) {
    console.log('Sending to chatbot:', message);

    const chatbotModal = document.getElementById('chatbotModal');
    const chatbotMessages = document.getElementById('chatbotMessages');

    if (chatbotModal && chatbotMessages) {
        // Show chatbot modal
        chatbotModal.classList.add('show');

        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'chat-message user-message';
        userMessage.innerHTML = `
            <div class="message-avatar">ðŸ‘¤</div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        chatbotMessages.appendChild(userMessage);

        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        // Simulate bot typing and response
        setTimeout(() => {
            const botMessage = document.createElement('div');
            botMessage.className = 'chat-message bot-message';
            botMessage.innerHTML = `
                <div class="message-avatar">ðŸ¤–</div>
                <div class="message-content">
                    <p>Thank you for your message! I'm processing your request: "${message}". Our team will assist you shortly.</p>
                </div>
            `;
            chatbotMessages.appendChild(botMessage);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }, 1000);

        // Close search
        if (searchBox) searchBox.classList.remove('active');
        if (searchDropdown) searchDropdown.classList.remove('show');
        if (searchInput) searchInput.value = '';
        if (searchClose) searchClose.style.display = 'none';
    }
}

// Export functions if needed
export {
    initDiscoverCarousel,
    init,
    initMobileMenu,
    initVideoPlayer,
    initChatWidget,
    initSmoothScroll,
    initHeaderScroll,
    initDropdownMenu,
    initSearchBox,
    initProductsOffcanvas,
    initArtificialIntelligencePage,
    initAiSubNav
};

// Call globals init
initAgentforceGlobals();

// News Scroll Progress Bar Logic
function initNewsScrollProgress() {
    const progressBar = document.getElementById('newsScrollProgress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = scrollPercentage + '%';
        });
    }
}
initNewsScrollProgress();

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initExploreCarousel();
});

// Initialized Small Business logic moved to smallbusiness.js
window.initSmallBusinessPage = initSmallBusinessPage;
window.initSbSpecifics = initSbSpecifics;
window.initSmbTabs = initSmbTabs;
window.initFaqAccordion = initSbFaqAccordion;
window.initFreeCrmSignup = initFreeCrmSignup;
window.initSbFaqAccordion = initSbFaqAccordion;


window.initAgentforceAiApp = initAgentforceAiApp;


// AI Builder Accordion
function initBuilderAccordion() {
    const builderItems = document.querySelectorAll('.builder-item');
    if (builderItems.length === 0) return;

    builderItems.forEach(item => {
        item.addEventListener('click', () => {
            builderItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
}
window.initBuilderAccordion = initBuilderAccordion;

// Trust Section Accordion
function initTrustAccordion() {
    const trustItems = document.querySelectorAll('.trust-item');
    if (trustItems.length === 0) return;

    trustItems.forEach(item => {
        item.addEventListener('click', () => {
            trustItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
}
window.initTrustAccordion = initTrustAccordion;

// Artificial Intelligence Page Logic moved to artificial_intelligence.js
window.initArtificialIntelligencePage = initArtificialIntelligencePage;

// AI Sub Nav Logic moved to artificial_intelligence.js
window.initAiSubNav = initAiSubNav;

window.initSalesSubNav = initSalesSubNav;

window.initMarketingSubNav = initMarketingSubNav;

// Initialized service logic moved to service.js
window.initServicePage = initServicePage;
window.initServiceSubNav = initServiceSubNav;
window.initServiceTabs = initServiceTabs;
window.initServiceFaq = initServiceFaq;
