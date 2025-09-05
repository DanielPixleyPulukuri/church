// DOM Elements
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

// Map functionality
const mainMap = document.getElementById('mainMap');
const mapDisplay = document.getElementById('mapDisplay');

// Church map URLs
const churchMaps = {
    bethel: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3838.9097486333035!2d78.0437867391182!3d15.80871216135466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb5dd932002a079%3A0xc1347facb2efbff3!2sBETHEL%20BIBLE%20CHURCH!5e0!3m2!1sen!2sin!4v1757098093359!5m2!1sen!2sin',
    berean: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3839.0167154774504!2d78.03022777659008!3d15.803072607440534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb5dde9c1a942d1%3A0x8bb4079f12e0ea5f!2sBerean%20Bible%20Fellowship!5e0!3m2!1sen!2sin!4v1757097071600!5m2!1sen!2sin'
};

// Default map (Berean Bible Fellowship)
const defaultMap = churchMaps.berean;


// Mobile Menu Toggle
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');

    // Animate hamburger menu
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// Smooth Scrolling
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Navigation Event Listeners
navToggle.addEventListener('click', toggleMobileMenu);

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        smoothScrollTo(target);

        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }

        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Active Navigation on Scroll
function updateActiveNavigation() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Navbar Background on Scroll
function updateNavbar() {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = 'var(--shadow-md)';
    } else {
        navbar.style.background = 'var(--white)';
        navbar.style.backdropFilter = 'none';
        navbar.style.boxShadow = 'var(--shadow-sm)';
    }
}

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.feature-card, .info-card, .contact-card').forEach(el => {
    observer.observe(el);
});



// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#007bff'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Parallax Effect for Hero
function updateParallax() {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');

    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
}

// Typing Effect for Hero Subtitle
function createTypingEffect(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function typeWriter() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    // Start typing after a delay
    setTimeout(typeWriter, 1000);
}

// Initialize Typing Effect
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const originalText = heroSubtitle.textContent;
    createTypingEffect(heroSubtitle, originalText, 80);
}

// Scroll Event Listeners
window.addEventListener('scroll', () => {
    updateActiveNavigation();
    updateNavbar();
    updateParallax();
});



// Window Load Event
window.addEventListener('load', () => {
    // Add loading animation to body
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Initialize scroll animations
    setTimeout(() => {
        updateActiveNavigation();
        updateNavbar();
    }, 100);
});

// Resize Event for Mobile Menu
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
});

// Add CSS for mobile menu
const mobileMenuCSS = `
.nav-menu.active {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--white);
    box-shadow: var(--shadow-lg);
    padding: 1rem 0;
    animation: slideDown 0.3s ease;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;

// Add mobile menu styles
const style = document.createElement('style');
style.textContent = mobileMenuCSS;
document.head.appendChild(style);

// Service Worker for PWA (optional enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Accessibility Improvements
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }

    // Keyboard navigation for nav links
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('nav-link')) {
            e.preventDefault();
            focusedElement.click();
        }
    }
});

// Add ARIA labels for accessibility
navToggle.setAttribute('aria-label', 'Toggle navigation menu');
navToggle.setAttribute('role', 'button');

// Split-screen hero interactions
function initSplitHero() {
    const heroHalves = document.querySelectorAll('.hero-half');

    heroHalves.forEach(half => {
        // Click event
        half.addEventListener('click', function() {
            // Add a subtle click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });

        // Mouse hover effects
        half.addEventListener('mouseenter', function() {
            // Add a subtle glow effect
            this.style.boxShadow = 'inset 0 0 50px rgba(255, 255, 255, 0.1)';
        });

        half.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });

        // Keyboard navigation support
        half.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        // Focus styles for accessibility
        half.addEventListener('focus', function() {
            this.style.outline = '3px solid var(--white)';
            this.style.outlineOffset = '2px';
        });

        half.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

// Map switching functions
function showChurchMap(churchName) {
    if (mainMap && churchMaps[churchName]) {
        mainMap.src = churchMaps[churchName];
        mapDisplay.classList.add('map-switching');
        
        // Add visual feedback
        setTimeout(() => {
            mapDisplay.classList.remove('map-switching');
        }, 300);
    }
}

function showDefaultMap() {
    if (mainMap) {
        mainMap.src = defaultMap;
        mapDisplay.classList.add('map-switching');
        
        // Add visual feedback
        setTimeout(() => {
            mapDisplay.classList.remove('map-switching');
        }, 300);
    }
}

// Initialize all functionality
function init() {
    console.log('Community Churches Website Initialized');

    // Initialize split-screen hero
    initSplitHero();

    // Add any additional initialization code here
    // For example, load external data, initialize maps, etc.
}

// Run initialization
init();
