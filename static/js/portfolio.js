// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        // Adjust for navbar height (add some offset)
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    // Remove active class from all nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Add active class to current section's nav link
    if (current) {
        const activeLink = document.querySelector(`.nav-links a[href="#${current}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

// Navbar scroll effect with active link updates
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active navigation highlighting
    updateActiveNavLink();
});

// Initialize active nav on page load
window.addEventListener('load', function () {
    updateActiveNavLink();
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// EmailJS configuration
// EmailJS integration for contact form submission
document.querySelector('.contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Add time as a hidden field
    const now = new Date();
    const timeInput = document.createElement('input');
    timeInput.type = 'hidden';
    timeInput.name = 'time';
    timeInput.value = now.toLocaleString();
    this.appendChild(timeInput);

    try {
        await emailjs.sendForm('service_xfw58e9', 'template_yoe2hln', this);
        alert('Message sent successfully!');
        this.reset();
    } catch (error) {
        console.error('EmailJS error:', error);
        alert('Failed to send message. Please try again later.');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Enhanced mobile menu toggle
document.querySelector('.mobile-menu').addEventListener('click', function () {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenu = document.querySelector('.mobile-menu');

    navLinks.classList.toggle('mobile-active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function () {
        const navLinks = document.querySelector('.nav-links');
        const mobileMenu = document.querySelector('.mobile-menu');
        navLinks.classList.remove('mobile-active');
        mobileMenu.classList.remove('active');
    });
});

// Typing effect for home subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', function () {
    setTimeout(() => {
        const subtitle = document.querySelector('.home .subtitle');
        if (subtitle) {
            typeWriter(subtitle, 'A Full Stack Developer', 150);
        }
    }, 1000);
});

// Parallax effect for home section
window.addEventListener('scroll', function () {
    const home = document.querySelector('.home');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    if (home) {
        home.style.transform = `translateY(${rate}px)`;
    }
});

// Add some interactive elements
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth reveal animations with stagger
function revealElementsWithStagger(selector, delay = 200) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, index * delay);
    });
}

// Initialize on scroll
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const section = entry.target;
            const cards = section.querySelectorAll('.service-card, .portfolio-item');
            if (cards.length > 0) {
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 150);
                });
            }
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Smooth scrolling behavior for better UX
document.documentElement.style.scrollBehavior = 'smooth';


// light and dark mode toggle
// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const root = document.documentElement;

    // Check for saved theme preference or default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';

    // Apply the saved theme
    if (currentTheme === 'light') {
        root.classList.add('light-mode');
        themeIcon.className = 'fas fa-sun';
    } else {
        root.classList.remove('light-mode');
        themeIcon.className = 'fas fa-moon';
    }

    // Theme toggle event listener
    themeToggle.addEventListener('click', function () {
        const isLightMode = root.classList.contains('light-mode');

        if (isLightMode) {
            // Switch to dark mode
            root.classList.remove('light-mode');
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'dark');
        } else {
            // Switch to light mode
            root.classList.add('light-mode');
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'light');
        }

        // Add a smooth transition effect
        themeToggle.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });
}

// Initialize theme toggle when page loads
window.addEventListener('load', function () {
    initThemeToggle();
});