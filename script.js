// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    if (navLinks.style.display === 'flex') {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'white';
        navLinks.style.padding = '20px';
        navLinks.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Contact Form WhatsApp Redirection
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        document.getElementById('whatsappButton').click();
    });
}

// WhatsApp Button Functionality
const whatsappButton = document.getElementById('whatsappButton');
if (whatsappButton) {
    whatsappButton.addEventListener('click', function() {
        const name = document.querySelector('input[type="text"]').value;
        const email = document.querySelector('input[type="email"]').value;
        const subject = document.querySelector('input[placeholder="Subject"]').value;
        const message = document.querySelector('textarea').value;

        // Validate required fields
        if (!name || !message) {
            alert('Please fill in your name and message before sending.');
            return;
        }

        // Create WhatsApp message
        const whatsappMessage = `*New Contact Form Submission*%0A%0A*Name:* ${name}%0A*Email:* ${email || 'Not provided'}%0A*Subject:* ${subject || 'No subject'}%0A%0A*Message:*%0A${message}`;
        const phoneNumber = '2348104146885';
        
        // Open WhatsApp
        window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, '_blank');
    });
}

// Portfolio Image Hover Effect
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Animate Stats Counter
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Initialize stats animation
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stats = entry.target.querySelectorAll('.stat h3');
                stats.forEach(stat => {
                    const target = parseInt(stat.textContent);
                    animateCounter(stat, target, 2000);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
}

// Active Nav Link on Scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Scroll Animations
function isInViewport(element, offset = 100) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight - offset) &&
        rect.bottom >= offset
    );
}

function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    animatedElements.forEach(element => {
        if (isInViewport(element, 100)) {
            element.classList.add('animated');
        } else {
            element.classList.remove('animated');
        }
    });
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', function() {
    console.log('NEXORA CREATIVITY website loaded successfully!');
    
    // Add animation classes
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionChildren = section.querySelectorAll('.section-title, .section-subtitle, .service-card, .portfolio-item, .about-text, .about-image, .contact-info, .contact-form');
        
        sectionChildren.forEach((child, index) => {
            child.classList.add('animate-on-scroll');
            
            if (child.classList.contains('section-title')) {
                child.classList.add('fade-up');
            } else if (child.classList.contains('section-subtitle')) {
                child.classList.add('fade-up');
                child.style.transitionDelay = '0.2s';
            } else if (child.classList.contains('service-card')) {
                child.classList.add('fade-up');
                child.style.transitionDelay = `${0.1 * (index % 4)}s`;
            } else if (child.classList.contains('portfolio-item')) {
                child.classList.add('scale-in');
                child.style.transitionDelay = `${0.1 * (index % 3)}s`;
            } else if (child.classList.contains('about-text')) {
                child.classList.add('fade-left');
            } else if (child.classList.contains('about-image')) {
                child.classList.add('fade-right');
            } else if (child.classList.contains('contact-info')) {
                child.classList.add('fade-left');
            } else if (child.classList.contains('contact-form')) {
                child.classList.add('fade-right');
            }
        });
    });
    
    // Add animation to hero elements
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroTitle) heroTitle.classList.add('animate-on-scroll', 'fade-up');
    if (heroSubtitle) {
        heroSubtitle.classList.add('animate-on-scroll', 'fade-up');
        heroSubtitle.style.transitionDelay = '0.2s';
    }
    if (heroButtons) {
        heroButtons.classList.add('animate-on-scroll', 'fade-up');
        heroButtons.style.transitionDelay = '0.4s';
    }
    if (heroImage) {
        heroImage.classList.add('animate-on-scroll', 'fade-up');
        heroImage.style.transitionDelay = '0.6s';
    }
    
    // Initial animation check
    animateOnScroll();
    
    // Event listeners
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('resize', animateOnScroll);
    
    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
        if (scrollTop > 50) {
            navbar.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            navbar.style.background = 'white';
            navbar.style.backdropFilter = 'none';
        }
    }
    lastScrollTop = scrollTop;
});