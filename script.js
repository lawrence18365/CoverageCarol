// Fixed Header Hide/Show on Scroll - Add this to your script.js

let lastScrollTop = 0;
let scrollThreshold = 5;
let ticking = false;

function initHeader() {
    const header = document.getElementById('header');
    console.log('🔧 Header element found:', !!header);
    
    if (!header) {
        console.error('❌ Header element not found!');
        return;
    }

    // Ensure header has proper initial styles
    header.style.transition = 'transform 0.3s ease';
    header.classList.remove('header-hidden');
    
    console.log('✅ Header initialized successfully');
}

function handleHeaderOnScroll() {
    const header = document.getElementById('header');
    if (!header) {
        console.error('❌ Header not found in scroll handler');
        return;
    }

    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Don't hide header at very top
    if (currentScrollTop <= 50) {
        header.classList.remove('header-hidden');
        lastScrollTop = currentScrollTop;
        return;
    }

    // Only process if scroll difference is significant
    if (Math.abs(lastScrollTop - currentScrollTop) <= scrollThreshold) {
        return;
    }

    if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
        // Scrolling down - hide header
        header.classList.add('header-hidden');
        console.log('📤 Header hidden at scroll:', currentScrollTop);
    } else {
        // Scrolling up - show header
        header.classList.remove('header-hidden');
        console.log('📥 Header shown at scroll:', currentScrollTop);
    }

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
}

// Optimized scroll handler with requestAnimationFrame
function optimizedScrollHandler() {
    if (!ticking) {
        requestAnimationFrame(() => {
            handleHeaderOnScroll();
            ticking = false;
        });
        ticking = true;
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM loaded, initializing header...');
    
    // Initialize header
    initHeader();
    
    // Add scroll event listener
    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
    console.log('📜 Scroll event listener attached');
    
    // Test scroll detection
    setTimeout(() => {
        console.log('🧪 Testing scroll detection after 2 seconds...');
        const header = document.getElementById('header');
        if (header) {
            console.log('Header classes:', header.className);
        }
    }, 2000);
});

/**
 * FAQ Accordion
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    console.log('❓ FAQ items found:', faqItems.length);
    
    if (faqItems.length === 0) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggleIcon = question ? question.querySelector('.toggle-icon i') : null;

        if (!question || !answer || !toggleIcon) return;

        question.setAttribute('aria-expanded', 'false');
        answer.style.display = 'none';
        answer.style.maxHeight = '0';
        answer.style.transition = 'max-height 0.3s ease, padding 0.3s ease, opacity 0.3s ease';
        answer.style.opacity = '0';

        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');

            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    const otherToggleIcon = otherQuestion ? otherQuestion.querySelector('.toggle-icon i') : null;

                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = '0';
                        otherAnswer.style.opacity = '0';
                        setTimeout(() => {
                            otherAnswer.style.display = 'none';
                        }, 300);
                    }
                    if (otherQuestion) otherQuestion.setAttribute('aria-expanded', 'false');
                    if (otherToggleIcon) {
                        otherToggleIcon.classList.remove('fa-minus');
                        otherToggleIcon.classList.add('fa-plus');
                    }
                }
            });

            item.classList.toggle('active');
            if (!isActive) {
                answer.style.display = 'block';
                question.setAttribute('aria-expanded', 'true');
                toggleIcon.classList.remove('fa-plus');
                toggleIcon.classList.add('fa-minus');
                setTimeout(() => {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    answer.style.opacity = '1';
                }, 10);
            } else {
                answer.style.maxHeight = '0';
                answer.style.opacity = '0';
                question.setAttribute('aria-expanded', 'false');
                toggleIcon.classList.remove('fa-minus');
                toggleIcon.classList.add('fa-plus');
                setTimeout(() => {
                    answer.style.display = 'none';
                }, 300);
            }
        });
    });

    console.log('✅ FAQ accordion initialized');
}

/**
 * Enhanced FAQ Section Functionality
 */
function initEnhancedFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    const faqTabs = document.querySelectorAll('.faq-tab');
    const searchInput = document.querySelector('.search-input');
    
    if (!faqItems.length) return;
    
    // Category filter functionality
    if (faqTabs.length) {
        faqTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                faqTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                const category = tab.getAttribute('data-category');
                
                faqItems.forEach(item => {
                    if (category === 'all' || item.getAttribute('data-category') === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
                
                updateCounter();
            });
        });
    }
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', debounce(() => {
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            if (searchTerm === '') {
                const activeTab = document.querySelector('.faq-tab.active');
                if (activeTab) {
                    activeTab.click();
                }
                return;
            }
            
            faqTabs.forEach(tab => tab.classList.remove('active'));
            const allTab = document.querySelector('[data-category="all"]');
            if (allTab) allTab.classList.add('active');
            
            faqItems.forEach(item => {
                const question = item.querySelector('h3').textContent.toLowerCase();
                const answer = item.querySelector('.answer-content').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            
            updateCounter();
        }, 300));
    }
    
    function updateCounter() {
        const counter = document.querySelector('.counter-number');
        if (counter) {
            const visibleItems = Array.from(faqItems).filter(item => 
                item.style.display !== 'none'
            ).length;
            
            counter.textContent = visibleItems;
        }
    }
    
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(context, args);
            }, wait);
        };
    }
    
    updateCounter();
    console.log('✅ Enhanced FAQ initialized');
}

/**
 * FIXED: Final Expense Steps Animation - Works with existing HTML
 */
let finalExpenseStepInterval = null;

function initFinalExpenseSteps() {
    console.log('🔄 Initializing step animation...');
    
    const section = document.querySelector('.final-expense');
    if (!section) {
        console.error('❌ Final expense section not found!');
        return;
    }

    const stepsContent = section.querySelectorAll('.steps-content .step');
    const progressIndicators = section.querySelectorAll('.progress-step');
    
    console.log('📊 Steps found:', stepsContent.length);
    console.log('🎯 Progress indicators found:', progressIndicators.length);
    
    if (stepsContent.length === 0 || progressIndicators.length === 0) {
        console.error('❌ Step elements not found!');
        return;
    }
    
    let currentStepIndex = 0;

    function setActiveStep(index) {
        console.log('🎯 Setting active step:', index + 1);
        
        // Update progress indicators
        progressIndicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });

        // Update step content
        stepsContent.forEach((stepEl, i) => {
            if (i === index) {
                stepEl.classList.add('active');
            } else {
                stepEl.classList.remove('active');
            }
        });

        currentStepIndex = index;
    }

    // Initialize first step
    setActiveStep(0);
    
    // Add click handlers for manual navigation
    progressIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            console.log('👆 Manual step click:', index + 1);
            clearInterval(finalExpenseStepInterval);
            setActiveStep(index);
            startAutoRotation();
        });
    });
    
    function rotateSteps() {
        let nextStepIndex = (currentStepIndex + 1) % stepsContent.length;
        console.log('🔄 Auto-rotating to step:', nextStepIndex + 1);
        setActiveStep(nextStepIndex);
    }
    
    function startAutoRotation() {
        clearInterval(finalExpenseStepInterval);
        finalExpenseStepInterval = setInterval(rotateSteps, 4000); // 4 seconds per step
        console.log('⏰ Auto-rotation started (4s intervals)');
    }

    // Start auto-rotation
    startAutoRotation();
    
    // Pause on hover
    section.addEventListener('mouseenter', () => {
        console.log('⏸️ Pausing animation (hover)');
        clearInterval(finalExpenseStepInterval);
    });
    
    section.addEventListener('mouseleave', () => {
        console.log('▶️ Resuming animation (unhover)');
        startAutoRotation();
    });

    console.log('✅ Step animation initialized successfully!');
}
function initGlobalScrollAnimations() {
    const animatedElementsSelectors = [
        '.hero h1',
        '.hero .subheading',
        '.hero .btn-primary',
        '.section-header',
        '.final-expense .steps-content .step',
        '.why-choose .benefit-card',
        '.final-cta h2',
        '.final-cta p',
        '.final-cta .btn'
    ];

    const actualElementsToAnimate = [];

    animatedElementsSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('fade-in');
            actualElementsToAnimate.push(el);
        });
    });

    function isInViewport(element) {
        if (!element || typeof element.getBoundingClientRect !== 'function') {
            return false;
        }
        const rect = element.getBoundingClientRect();
        return (
            rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom > 0 &&
            rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
            rect.right > 0
        );
    }

    function checkFadeElements() {
        actualElementsToAnimate.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('in-view');
            }
        });
    }

    checkFadeElements();
    window.addEventListener('scroll', throttle(checkFadeElements, 100));
    console.log('✅ Global scroll animations initialized');
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]:not([href="#quiz"]):not([href="#quiz-section"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const header = document.getElementById('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle quiz section links
    document.querySelectorAll('a[href="#quiz-section"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const quizSection = document.getElementById('quiz-section');
            if (quizSection) {
                const header = document.getElementById('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = quizSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log('✅ Smooth scrolling initialized');
}

/**
 * Main DOMContentLoaded Event Listener
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎉 DOM Content Loaded - Initializing CoverageCarol...');
    
    // Initialize all components
    initHeader();
    initMobileMenu();
    initFaqAccordion();
    initEnhancedFAQ();
    initGlobalScrollAnimations();
    initFinalExpenseSteps(); // Fixed step animation
    initPremiumBackgroundEffect(); // Premium background effect
    initSmoothScrolling();

    // Scroll event listener for header hide/show
    window.addEventListener('scroll', throttledHandleScroll);
    console.log('📜 Scroll event listener attached');
    
    // Resize event listener
    window.addEventListener('resize', throttle(function() {
        initHeader();
    }, 200));

    console.log('✅ CoverageCarol website initialized successfully!');
});