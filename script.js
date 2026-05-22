// ==========================================
// NAVIGATION MOBILE MENU TOGGLE
// ==========================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    hamburger.style.transition = 'all 0.3s ease';
    if (navMenu.classList.contains('active')) {
        hamburger.querySelectorAll('span')[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
        hamburger.querySelectorAll('span')[1].style.opacity = '0';
        hamburger.querySelectorAll('span')[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        hamburger.querySelectorAll('span')[0].style.transform = 'none';
        hamburger.querySelectorAll('span')[1].style.opacity = '1';
        hamburger.querySelectorAll('span')[2].style.transform = 'none';
    }
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        hamburger.querySelectorAll('span')[0].style.transform = 'none';
        hamburger.querySelectorAll('span')[1].style.opacity = '1';
        hamburger.querySelectorAll('span')[2].style.transform = 'none';
    });
});

// ==========================================
// SMOOTH SCROLL FUNCTION
// ==========================================

function scrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// ==========================================
// FORM SUBMISSION
// ==========================================

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const category = document.getElementById('category').value;
    const message = document.getElementById('message').value;
    
    // Validate form
    if (!name || !email || !category) {
        alert('Please fill in all required fields!');
        return;
    }
    
    // Create mailto link
    const subject = `ResearchAI-21 Registration Inquiry - ${category}`;
    const emailBody = `Name: ${name}
Email: ${email}
Phone: ${phone}
Category: ${category}

Message: ${message}

---
Sent from ResearchAI-21 Registration Form`;
    
    // Open email client
    window.location.href = `mailto:avinashstat@aviqlabs.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Show success message
    showNotification('Inquiry submitted! Opening email client...', 'success');
    
    // Reset form
    setTimeout(() => {
        this.reset();
    }, 500);
});

// ==========================================
// FORM SUBMISSION HANDLER
// ==========================================

function handleFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const category = document.getElementById('category').value;
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !category) {
        showNotification('Please fill in all required fields!', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address!', 'error');
        return;
    }
    
    const subject = `ResearchAI-21 Registration - ${category}`;
    const emailBody = `Name: ${name}
Email: ${email}
Phone: ${phone}
Category: ${category}

Message: ${message || 'No additional message'}

---
Thank you for your interest in ResearchAI-21!
We will get back to you within 24 hours.`;
    
    window.location.href = `mailto:avinashstat@aviqlabs.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    showNotification('Inquiry submitted! Opening email client...', 'success');
    
    setTimeout(() => {
        document.getElementById('contactForm').reset();
    }, 500);
}

// ==========================================
// EMAIL VALIDATION
// ==========================================

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ==========================================
// NOTIFICATION SYSTEM
// ==========================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Add CSS for notifications dynamically if not present
    if (!document.querySelector('style[data-notification]')) {
        const style = document.createElement('style');
        style.setAttribute('data-notification', 'true');
        style.innerHTML = `
            .notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                background: white;
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
                z-index: 10000;
                animation: slideInRight 0.3s ease;
                max-width: 90%;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            .notification-success {
                border-left: 4px solid #10b981;
                color: #065f46;
            }
            
            .notification-error {
                border-left: 4px solid #ef4444;
                color: #7f1d1d;
            }
            
            .notification-info {
                border-left: 4px solid #3b82f6;
                color: #1e3a8a;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            
            .notification i {
                font-size: 1.3rem;
            }
            
            @media (max-width: 480px) {
                .notification {
                    bottom: 10px;
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        notification.style.animationFillMode = 'forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// ==========================================
// COPY TO CLIPBOARD FUNCTION
// ==========================================

function copyToClipboard() {
    const currentURL = window.location.href;
    
    navigator.clipboard.writeText(currentURL).then(() => {
        showNotification('Link copied to clipboard! Share with your network.', 'success');
    }).catch(() => {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.value = currentURL;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showNotification('Link copied to clipboard! Share with your network.', 'success');
    });
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in-up animation CSS
if (!document.querySelector('style[data-animation]')) {
    const style = document.createElement('style');
    style.setAttribute('data-animation', 'true');
    style.innerHTML = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Observe all cards and sections for animation
document.querySelectorAll('.card, .module-card, .pricing-card, .benefit-item, .stat-card, .info-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ==========================================
// NAVBAR BACKGROUND ON SCROLL
// ==========================================

const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    }
});

// ==========================================
// ACTIVE NAV LINK HIGHLIGHT
// ==========================================

window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-menu a').forEach(a => a.style.borderBottomColor = 'transparent');
            if (navLink) {
                navLink.style.borderBottomColor = '#fbbf24';
            }
        }
    });
});

// ==========================================
// LAZY LOAD IMAGES
// ==========================================

if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imgObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imgObserver.observe(img);
    });
}

// ==========================================
// PAGE LOAD ANIMATION
// ==========================================

window.addEventListener('load', function() {
    document.body.style.animation = 'fadeIn 0.5s ease';
});

// Add fade-in animation for body
if (!document.querySelector('style[data-fade-in]')) {
    const style = document.createElement('style');
    style.setAttribute('data-fade-in', 'true');
    style.innerHTML = `
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}