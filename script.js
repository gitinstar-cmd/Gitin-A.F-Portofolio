// ========== THEME TOGGLE ========== 
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to dark mode
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    htmlElement.classList.add('light-mode');
}

themeToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('light-mode');
    
    // Save preference
    const isLightMode = htmlElement.classList.contains('light-mode');
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    
    // Add rotation animation
    themeToggle.style.animation = 'none';
    setTimeout(() => {
        themeToggle.style.animation = 'rotate 0.6s ease-in-out';
    }, 10);
});

// ========== MOBILE MENU TOGGLE ========== 
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    hamburger.style.animation = 'none';
    setTimeout(() => {
        hamburger.style.animation = 'spin 0.6s ease-in-out';
    }, 10);
});

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ========== SMOOTH SCROLLING ========== 
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

// ========== NAVBAR BACKGROUND ON SCROLL ========== 
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.borderBottomColor = 'rgba(0, 255, 255, 0.5)';
    } else {
        navbar.style.borderBottomColor = 'rgba(0, 255, 255, 0.2)';
    }
});

// ========== CONTACT FORM HANDLING ========== 
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        showNotification('Mohon isi semua field!', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Format email tidak valid!', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Pesan terkirim! Terima kasih telah menghubungi saya. 🎉', 'success');
    contactForm.reset();
    
    // Log form data (in production, send to backend)
    console.log({
        name,
        email,
        message,
        timestamp: new Date().toLocaleString('id-ID')
    });
});

// Notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        font-weight: 600;
        z-index: 2000;
        animation: slideIn 0.3s ease-in-out;
        ${type === 'success' ? `
            background: rgba(57, 255, 20, 0.2);
            border: 2px solid #39ff14;
            color: #39ff14;
            box-shadow: 0 0 20px rgba(57, 255, 20, 0.5);
        ` : `
            background: rgba(255, 100, 100, 0.2);
            border: 2px solid #ff6464;
            color: #ff6464;
            box-shadow: 0 0 20px rgba(255, 100, 100, 0.5);
        `}
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in-out forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Add animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// ========== SCROLL ANIMATION OBSERVER ========== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-in-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe project cards and other elements
document.querySelectorAll('.project-card, .skill-tag, .stat-box').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// Add fade-in animation
const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
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
document.head.appendChild(fadeInStyle);

// ========== CURSOR EFFECT (OPTIONAL) ========== 
document.addEventListener('mousemove', (e) => {
    // Optional: Add custom cursor trail effect
    // This can be extended for more interactive cursor effects
});

// ========== PAGE LOAD ANIMATION ========== 
window.addEventListener('load', () => {
    document.body.style.animation = 'fadeIn 0.6s ease-in-out';
});

// Add fade-in for body
const loadStyle = document.createElement('style');
loadStyle.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(loadStyle);

// ========== ACCESSIBILITY: KEYBOARD NAVIGATION ========== 
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape key
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
    }
});

// ========== LAZY LOAD IMAGES ========== 
const images = document.querySelectorAll('img[data-src]');
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

console.log('Portfolio website loaded successfully! 🚀');