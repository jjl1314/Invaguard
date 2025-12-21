// Smooth Scroll 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = 44;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        }
    });
});

// Mobile Menu Toggle with smooth animation
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Enhanced Navbar on Scroll 
let lastScroll = 0;
const navbar = document.querySelector('.navbar');
const navBlur = document.querySelector('.nav-blur');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navBlur.style.background = 'rgba(0, 0, 0, 0.85)';
    } else {
        navBlur.style.background = 'rgba(0, 0, 0, 0.8)';
    }

    lastScroll = currentScroll;
}, { passive: true });

// Intersection Observer with Apple-style reveal animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 50);
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply fade-in animation to various elements
const animatedElements = document.querySelectorAll(
    '.stat-item-apple, .content-block, .impact-card, .feature-item-apple, .timeline-item, .team-card-apple'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.28, 0.11, 0.32, 1), transform 0.8s cubic-bezier(0.28, 0.11, 0.32, 1)';
    fadeInObserver.observe(el);
});

// Counter Animation for Stats - Apple Style
const animateCounter = (element, target, suffix = '') => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let frame = 0;

    const timer = setInterval(() => {
        frame++;
        current += increment;

        if (frame >= steps) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, duration / steps);
};

// Trigger counters when visible
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValue = entry.target.querySelector('.stat-value');
            const originalText = statValue.textContent.trim();

            if (originalText.includes('$345B')) {
                statValue.textContent = '$0B';
                animateCounter(statValue, 345, 'B');
                statValue.textContent = '$' + statValue.textContent.replace('B', '') + 'B';
                let current = 0;
                const timer = setInterval(() => {
                    current += 5.75;
                    if (current >= 345) {
                        statValue.textContent = '$345B';
                        clearInterval(timer);
                    } else {
                        statValue.textContent = '$' + Math.floor(current) + 'B';
                    }
                }, 33);
            } else if (originalText.includes('60%')) {
                let current = 0;
                const timer = setInterval(() => {
                    current += 1;
                    if (current >= 60) {
                        statValue.textContent = '60%';
                        clearInterval(timer);
                    } else {
                        statValue.textContent = current + '%';
                    }
                }, 33);
            } else if (originalText.includes('89%')) {
                let current = 0;
                const timer = setInterval(() => {
                    current += 1.48;
                    if (current >= 89) {
                        statValue.textContent = '89%';
                        clearInterval(timer);
                    } else {
                        statValue.textContent = Math.floor(current) + '%';
                    }
                }, 33);
            } else if (originalText.includes('500K')) {
                let current = 0;
                const timer = setInterval(() => {
                    current += 8.33;
                    if (current >= 500) {
                        statValue.textContent = '500K';
                        clearInterval(timer);
                    } else {
                        statValue.textContent = Math.floor(current) + 'K';
                    }
                }, 33);
            }

            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item-apple').forEach(stat => {
    statObserver.observe(stat);
});

// Parallax effect for hero gradient orbs
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');

    orbs.forEach((orb, index) => {
        const speed = 0.3 + (index * 0.1);
        orb.style.transform = `translate(${scrolled * speed * 0.1}px, ${scrolled * speed * 0.15}px)`;
    });
}, { passive: true });

// Enhanced hover effects for impact cards
document.querySelectorAll('.impact-card').forEach(card => {
    card.addEventListener('mouseenter', function (e) {
        this.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// Apple-style form interactions
const inputs = document.querySelectorAll('.input-wrapper input, .input-wrapper textarea');

inputs.forEach(input => {
    // Set initial state
    if (input.value) {
        input.nextElementSibling.style.top = '-8px';
        input.nextElementSibling.style.fontSize = '12px';
        input.nextElementSibling.style.background = 'var(--black)';
        input.nextElementSibling.style.padding = '0 4px';
        input.nextElementSibling.style.color = 'var(--accent-blue)';
    }

    input.addEventListener('focus', function () {
        this.parentElement.style.transform = 'scale(1.01)';
    });

    input.addEventListener('blur', function () {
        this.parentElement.style.transform = 'scale(1)';

        if (!this.value) {
            const label = this.nextElementSibling;
            label.style.top = '16px';
            label.style.fontSize = '17px';
            label.style.background = 'transparent';
            label.style.padding = '0';
            label.style.color = 'var(--text-tertiary)';
        }
    });

    input.addEventListener('input', function () {
        if (this.value) {
            const label = this.nextElementSibling;
            label.style.top = '-8px';
            label.style.fontSize = '12px';
            label.style.background = 'var(--black)';
            label.style.padding = '0 4px';
            label.style.color = 'var(--accent-blue)';
        }
    });
});

// Contact Form Submission with Apple-style feedback
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        // Animate button
        submitBtn.textContent = 'Sending...';
        submitBtn.style.opacity = '0.6';
        submitBtn.style.pointerEvents = 'none';

        // Simulate form submission
        setTimeout(() => {
            submitBtn.textContent = '✓ Sent';
            submitBtn.style.opacity = '1';

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.pointerEvents = 'auto';
                contactForm.reset();

                // Reset labels
                inputs.forEach(input => {
                    const label = input.nextElementSibling;
                    if (label) {
                        label.style.top = '16px';
                        label.style.fontSize = '17px';
                        label.style.background = 'transparent';
                        label.style.padding = '0';
                        label.style.color = 'var(--text-tertiary)';
                    }
                });
            }, 2000);
        }, 1500);
    });
}

// Video placeholder interaction
const videoPlaceholder = document.querySelector('.video-placeholder-apple');
if (videoPlaceholder) {
    videoPlaceholder.addEventListener('click', function () {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
}

// Apple-style button ripple effect
document.querySelectorAll('.btn-apple').forEach(button => {
    button.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = '4px';
        ripple.style.height = '4px';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.transform = 'translate(-50%, -50%) scale(0)';
        ripple.style.animation = 'appleRipple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes appleRipple {
        to {
            transform: translate(-50%, -50%) scale(50);
            opacity: 0;
        }
    }
    
    .nav-links.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.95);
        backdrop-filter: saturate(180%) blur(20px);
        padding: 24px 20px;
        gap: 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .input-wrapper {
        transition: transform 0.2s cubic-bezier(0.28, 0.11, 0.32, 1);
    }
`;
document.head.appendChild(style);

// Smooth page load with Apple-style fade-in
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s cubic-bezier(0.28, 0.11, 0.32, 1)';

    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});

// Add subtle scale animation to team cards on hover
document.querySelectorAll('.team-card-apple').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-12px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth scroll progress indicator
let scrollProgress = 0;
window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    scrollProgress = (window.pageYOffset / (documentHeight - windowHeight)) * 100;
}, { passive: true });

// Add smooth transitions to all interactive elements
document.querySelectorAll('a, button').forEach(el => {
    el.style.transition = 'all 0.3s cubic-bezier(0.28, 0.11, 0.32, 1)';
});

// Performance optimization - Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

console.log('Invaguard');