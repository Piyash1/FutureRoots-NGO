document.addEventListener('DOMContentLoaded', function() {
    // Add fallback class to ensure hero elements show
    const heroTitles = document.querySelector('.hero-titles');
    const heroButton = document.querySelector('.hero-button');
    
    // Fallback in case animations don't work
    setTimeout(() => {
        if (heroTitles) heroTitles.classList.add('loaded');
        if (heroButton) heroButton.classList.add('loaded');
    }, 3000);

    // ==========================================================================
    // HEADER NAVIGATION ANIMATIONS
    // ==========================================================================
    
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    // Header scroll effects
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class when scrolled down
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Optional: Hide header on scroll down, show on scroll up
        // Uncomment below if you want this effect
        /*
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
            header.style.transition = 'transform 0.3s ease';
        } else {
            header.style.transform = 'translateY(0)';
        }
        */
        
        lastScrollTop = scrollTop;
    });
    
    // Active navigation link highlighting
    const navLinks = document.querySelectorAll('header nav ul li a');
    const sections = document.querySelectorAll('section[id], div[id]');
    
    // Function to update active navigation
    function updateActiveNav() {
        let current = '';
        let scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links (starting with #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = header ? header.offsetHeight : 75;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Mobile menu handling
    const mobileNav = document.querySelector('header nav');
    const mobileNavLinks = document.querySelectorAll('header nav ul li a');
    
    // Close mobile menu when clicking a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                // Remove focus from hamburger menu to close it
                if (mobileNav) {
                    mobileNav.blur();
                }
                
                // Add a slight delay for better UX
                setTimeout(() => {
                    document.activeElement.blur();
                }, 300);
            }
        });
    });
    
    // Enhanced mobile menu interaction
    if (mobileNav) {
        let menuTimeout;
        
        mobileNav.addEventListener('mouseenter', function() {
            clearTimeout(menuTimeout);
            this.classList.add('menu-active');
        });
        
        mobileNav.addEventListener('mouseleave', function() {
            menuTimeout = setTimeout(() => {
                this.classList.remove('menu-active');
            }, 300);
        });
    }
    
    // Navigation link setup (removed hover effects)
    navLinks.forEach((link, index) => {
        // Add data attribute for animation delays
        link.style.setProperty('--nav-index', index);
        
        // Keep only focus events for accessibility
        link.addEventListener('focus', function() {
            this.classList.add('nav-focus');
        });
        
        link.addEventListener('blur', function() {
            this.classList.remove('nav-focus');
        });
    });
    
    // Header loading animation trigger
    setTimeout(() => {
        document.body.classList.add('header-loaded');
        if (header) {
            header.classList.add('header-animated');
        }
    }, 100);

    // ==========================================================================
    // EXISTING SCROLL ANIMATIONS
    // ==========================================================================

    // Create intersection observer
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Start animation 50px before element enters viewport
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with scroll-animate class
    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => observer.observe(el));

    // Special handling for stagger animations
    const staggerContainers = document.querySelectorAll('.stagger-container');
    staggerContainers.forEach(container => {
        const staggerObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll('.stagger-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 150); // 150ms delay between each item
                    });
                }
            });
        }, observerOptions);
        
        staggerObserver.observe(container);
    });

    // Counter animation for donation goals
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        element.classList.add('counting');
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            if (current >= target) {
                element.textContent = target;
                element.classList.remove('counting');
                clearInterval(timer);
            }
        }, 20);
    }

    // Observe donation counters
    const donationCounters = document.querySelectorAll('.donationCount span');
    donationCounters.forEach(counter => {
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.textContent.replace(/[^0-9]/g, ''));
                    if (target > 0) {
                        animateCounter(entry.target, target);
                        counterObserver.unobserve(entry.target); // Animate only once
                    }
                }
            });
        }, observerOptions);
        
        counterObserver.observe(counter);
    });

    // Enhanced hover effects for interactive elements
    const cards = document.querySelectorAll('.box, .donationBox, .volunteerBox');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
        
        // Add click animation
        card.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-8px) scale(0.98)';
        });
        
        card.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
    });

    // Smooth reveal for text elements (exclude hero titles)
    const textElements = document.querySelectorAll('h1, h2, h3, .sectionTitle');
    textElements.forEach(el => {
        // Don't add scroll animation to elements inside hero-titles or header
        if (!el.classList.contains('scroll-animate') && 
            !el.closest('.hero-titles') && 
            !el.closest('header')) {
            el.classList.add('scroll-animate', 'text-reveal');
        }
    });

    // ==========================================================================
    // PERFORMANCE OPTIMIZATIONS
    // ==========================================================================
    
    // Throttle scroll events for better performance
    let scrollTimeout;
    let isScrolling = false;
    
    function throttleScroll(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // Apply throttling to scroll-heavy functions
    const throttledUpdateActiveNav = throttleScroll(updateActiveNav, 100);
    window.addEventListener('scroll', throttledUpdateActiveNav);
    
    // ==========================================================================
    // ACCESSIBILITY ENHANCEMENTS
    // ==========================================================================
    
    // Keyboard navigation support
    navLinks.forEach(link => {
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        link.addEventListener('focus', function() {
            this.classList.add('nav-focus');
        });
        
        link.addEventListener('blur', function() {
            this.classList.remove('nav-focus');
        });
    });
    
    // Reduced motion support
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduced-motion');
    }
    
    // ==========================================================================
    // DEBUG HELPERS (Remove in production)
    // ==========================================================================
    
    // Console log for debugging (remove in production)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('🎨 Scroll animations initialized');
        console.log('📱 Header navigation enhanced');
        console.log('✨ Found', animatedElements.length, 'animated elements');
        console.log('🔗 Found', navLinks.length, 'navigation links');
    }
});