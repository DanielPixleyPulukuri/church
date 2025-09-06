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

    // Initialize PDF viewer
    initPDFViewer();

    // Add any additional initialization code here
    // For example, load external data, initialize maps, etc.
}

// PDF Viewer Functionality
let currentZoom = 100;

function hideLoading() {
    const loading = document.querySelector('.pdf-loading');
    const content = document.getElementById('pdfContent');
    
    if (loading && content) {
        loading.style.display = 'none';
        content.style.display = 'block';
    }
}

function zoomIn() {
    currentZoom = Math.min(currentZoom + 25, 200);
    updateZoom();
    showNotification('Zoomed in to ' + currentZoom + '%', 'success');
}

function zoomOut() {
    currentZoom = Math.max(currentZoom - 25, 50);
    updateZoom();
    showNotification('Zoomed out to ' + currentZoom + '%', 'success');
}

function resetZoom() {
    currentZoom = 100;
    updateZoom();
    showNotification('Zoom reset to 100%', 'success');
}

// Fullscreen functionality
let isFullscreen = false;

function toggleFullscreen() {
    const pdfViewer = document.getElementById('pdfViewer');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const fullscreenExit = document.querySelector('.fullscreen-exit');
    
    if (!isFullscreen) {
        enterFullscreen(pdfViewer, fullscreenBtn, fullscreenExit);
    } else {
        exitFullscreen(pdfViewer, fullscreenBtn, fullscreenExit);
    }
}

function enterFullscreen(pdfViewer, fullscreenBtn, fullscreenExit) {
    // Add fullscreen class
    pdfViewer.classList.add('fullscreen');
    
    // Update button text and icon
    fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i> Exit Fullscreen';
    
    // Create and show exit button
    if (!fullscreenExit) {
        const exitBtn = document.createElement('button');
        exitBtn.className = 'fullscreen-exit';
        exitBtn.innerHTML = '<i class="fas fa-times"></i>';
        exitBtn.onclick = () => exitFullscreen(pdfViewer, fullscreenBtn, exitBtn);
        document.body.appendChild(exitBtn);
    } else {
        fullscreenExit.classList.remove('hidden');
    }
    
    // Hide body scroll
    document.body.style.overflow = 'hidden';
    
    // Update state
    isFullscreen = true;
    
    // Show notification
    showNotification('Entered fullscreen mode', 'success');
    
    // Recalculate zoom for fullscreen
    setTimeout(() => {
        updateZoom();
    }, 100);
}

function exitFullscreen(pdfViewer, fullscreenBtn, fullscreenExit) {
    // Remove fullscreen class
    pdfViewer.classList.remove('fullscreen');
    
    // Update button text and icon
    fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i> Fullscreen';
    
    // Hide exit button
    if (fullscreenExit) {
        fullscreenExit.classList.add('hidden');
    }
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Update state
    isFullscreen = false;
    
    // Show notification
    showNotification('Exited fullscreen mode', 'info');
    
    // Recalculate zoom for normal view
    setTimeout(() => {
        updateZoom();
    }, 100);
}

// Handle ESC key to exit fullscreen
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isFullscreen) {
        const pdfViewer = document.getElementById('pdfViewer');
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        const fullscreenExit = document.querySelector('.fullscreen-exit');
        exitFullscreen(pdfViewer, fullscreenBtn, fullscreenExit);
    }
});

// Handle fullscreen API for better browser support
function requestFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

function exitFullscreenAPI() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

function updateZoom() {
    const iframe = document.getElementById('pdfFrame');
    if (iframe) {
        iframe.style.transform = `scale(${currentZoom / 100})`;
        iframe.style.transformOrigin = 'top left';
        
        // Adjust container height based on zoom
        const container = document.querySelector('.pdf-content');
        if (container) {
            const baseHeight = window.innerWidth <= 768 ? 400 : 600;
            container.style.height = `${baseHeight * (currentZoom / 100)}px`;
        }
    }
}

// Prevent PDF downloads and right-click
function preventPDFDownload() {
    // Disable right-click context menu
    document.addEventListener('contextmenu', function(e) {
        if (e.target.closest('.pdf-viewer')) {
            e.preventDefault();
            showNotification('Right-click is disabled for prayer lyrics', 'info');
            return false;
        }
    });

    // Disable text selection in PDF viewer
    document.addEventListener('selectstart', function(e) {
        if (e.target.closest('.pdf-viewer')) {
            e.preventDefault();
            return false;
        }
    });

    // Disable drag and drop
    document.addEventListener('dragstart', function(e) {
        if (e.target.closest('.pdf-viewer')) {
            e.preventDefault();
            return false;
        }
    });

    // Disable keyboard shortcuts for saving/printing
    document.addEventListener('keydown', function(e) {
        if (e.target.closest('.pdf-viewer') || 
            (e.ctrlKey && (e.key === 's' || e.key === 'p' || e.key === 'a'))) {
            e.preventDefault();
            showNotification('Download and print functions are disabled for prayer lyrics', 'info');
            return false;
        }
    });

    // Disable F12 and other developer tools shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && e.key === 'I') ||
            (e.ctrlKey && e.shiftKey && e.key === 'C') ||
            (e.ctrlKey && e.shiftKey && e.key === 'J')) {
            e.preventDefault();
            showNotification('Developer tools are disabled for security', 'info');
            return false;
        }
    });
}

// PDF Viewer initialization
function initPDFViewer() {
    console.log('PDF Viewer initialized');
    
    // Prevent downloads and unauthorized access
    preventPDFDownload();
    
    // Add mobile-specific enhancements
    initMobilePDFFeatures();
    
    // Fix iframe scrolling
    fixIframeScrolling();
    
    // Add loading timeout
    setTimeout(() => {
        const loading = document.querySelector('.pdf-loading');
        const content = document.getElementById('pdfContent');
        
        if (loading && content && content.style.display === 'none') {
            hideLoading();
            showNotification('Prayer lyrics loaded successfully', 'success');
        }
    }, 3000);

    // Add scroll animations to PDF section
    const pdfSection = document.querySelector('.prayer-section');
    if (pdfSection) {
        observer.observe(pdfSection);
    }
}

// Fix iframe scrolling to prevent double scrollbars
function fixIframeScrolling() {
    const iframe = document.getElementById('pdfFrame');
    if (iframe) {
        // Wait for iframe to load
        iframe.onload = function() {
            try {
                // Try to access iframe content and disable scrolling
                const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                if (iframeDoc) {
                    iframeDoc.body.style.overflow = 'hidden';
                    iframeDoc.documentElement.style.overflow = 'hidden';
                }
            } catch (e) {
                // Cross-origin restrictions - this is normal for PDFs
                console.log('Cross-origin iframe - using CSS overflow control');
            }
        };
        
        // Set iframe attributes to control scrolling
        iframe.setAttribute('scrolling', 'no');
        iframe.style.overflow = 'hidden';
    }
}

// Mobile-specific PDF features
function initMobilePDFFeatures() {
    // Add touch-friendly interactions
    const pdfButtons = document.querySelectorAll('.pdf-actions .btn');
    
    pdfButtons.forEach(button => {
        // Add touch feedback
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.1s ease';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        // Prevent double-tap zoom on buttons
        button.addEventListener('touchend', function(e) {
            e.preventDefault();
        });
    });

    // Handle mobile orientation changes
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Recalculate zoom for mobile orientation
            if (window.innerWidth <= 768) {
                updateZoom();
            }
        }, 500);
    });

    // Add mobile-specific zoom controls
    if (window.innerWidth <= 768) {
        addMobileZoomControls();
    }
}

// Add mobile-specific zoom controls
function addMobileZoomControls() {
    const pdfViewer = document.querySelector('.pdf-viewer');
    if (!pdfViewer) return;

    // Add pinch-to-zoom support for mobile
    let initialDistance = 0;
    let initialZoom = currentZoom;

    pdfViewer.addEventListener('touchstart', function(e) {
        if (e.touches.length === 2) {
            e.preventDefault();
            initialDistance = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            initialZoom = currentZoom;
        }
    });

    pdfViewer.addEventListener('touchmove', function(e) {
        if (e.touches.length === 2) {
            e.preventDefault();
            const currentDistance = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            
            const scale = currentDistance / initialDistance;
            const newZoom = Math.round(initialZoom * scale);
            
            if (newZoom >= 50 && newZoom <= 200 && newZoom !== currentZoom) {
                currentZoom = newZoom;
                updateZoom();
            }
        }
    });

    // Add double-tap to zoom
    let lastTap = 0;
    pdfViewer.addEventListener('touchend', function(e) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        
        if (tapLength < 500 && tapLength > 0) {
            e.preventDefault();
            if (currentZoom === 100) {
                currentZoom = 150;
            } else {
                currentZoom = 100;
            }
            updateZoom();
            showNotification(`Zoom: ${currentZoom}%`, 'info');
        }
        lastTap = currentTime;
    });

    // Add triple-tap to toggle fullscreen on mobile
    let tapCount = 0;
    let tapTimer = null;
    
    pdfViewer.addEventListener('touchend', function(e) {
        tapCount++;
        
        if (tapCount === 1) {
            tapTimer = setTimeout(() => {
                tapCount = 0;
            }, 500);
        } else if (tapCount === 3) {
            clearTimeout(tapTimer);
            tapCount = 0;
            e.preventDefault();
            toggleFullscreen();
        }
    });
}

// Enhanced notification for PDF viewer
function showPDFNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type} pdf-notification`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        z-index: 1001;
        transform: translateX(100%);
        transition: all 0.3s ease;
        font-weight: 500;
        max-width: 350px;
        backdrop-filter: blur(10px);
    `;

    // Add notification content styles
    const style = document.createElement('style');
    style.textContent = `
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        .notification-content i {
            font-size: 1.2rem;
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Override the original showNotification for PDF section
const originalShowNotification = showNotification;
showNotification = function(message, type = 'info') {
    if (document.querySelector('.prayer-section:hover') || 
        document.activeElement?.closest('.prayer-section')) {
        showPDFNotification(message, type);
    } else {
        originalShowNotification(message, type);
    }
};

// Run initialization
init();
