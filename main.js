// Enhanced Performance with Intersection Observer
const createObserver = (elements, callback, options = {}) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(callback);
    }, options);
    
    elements.forEach(element => observer.observe(element));
    return observer;
};

// Enhanced animation system
const animations = {
    fadeUp: (element) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    },
    
    countUp: (element, target) => {
        const duration = 2000;
        const steps = 60;
        const stepValue = target / steps;
        let current = 0;
        
        const updateCount = () => {
            current += stepValue;
            element.textContent = Math.round(current);
            
            if (current < target) {
                requestAnimationFrame(updateCount);
            } else {
                element.textContent = target;
            }
        };
        
        requestAnimationFrame(updateCount);
    }
};

// Enhanced form validation
const validateForm = (form) => {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.checkValidity()) {
            isValid = false;
            showError(input);
        } else {
            clearError(input);
        }
    });
    
    return isValid;
};

// Error handling
const showError = (input) => {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = input.validationMessage;
    input.parentNode.appendChild(errorDiv);
};

const clearError = (input) => {
    const errorDiv = input.parentNode.querySelector('.error-message');
    if (errorDiv) errorDiv.remove();
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    createObserver(
        document.querySelectorAll('.fade-up'),
        (entry) => {
            if (entry.isIntersecting) {
                animations.fadeUp(entry.target);
            }
        },
        { threshold: 0.1 }
    );
    
    // Initialize counters
    createObserver(
        document.querySelectorAll('.stats-number'),
        (entry) => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animations.countUp(entry.target, target);
            }
        },
        { threshold: 0.5 }
    );
    
    // Form handling
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateForm(form)) {
                // Add your form submission logic here
                console.log('Form submitted successfully');
            }
        });
    });

    // Add mouse movement effect to feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
    });

    // Add mouse movement effect to stats cards
    document.querySelectorAll('.modern-stats-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
    });

    // Add mouse movement effect to testimonial cards
    document.querySelectorAll('.modern-testimonial-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--mouse-x', '50%');
            card.style.setProperty('--mouse-y', '50%');
        });
    });

    // Enhance counter animation
    const animateStats = (entry) => {
        if (entry.isIntersecting) {
            const number = entry.target;
            const target = parseInt(number.dataset.target);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateNumber = () => {
                current += increment;
                if (current < target) {
                    number.textContent = Math.floor(current);
                    requestAnimationFrame(updateNumber);
                } else {
                    number.textContent = target;
                }
            };

            requestAnimationFrame(updateNumber);
        }
    };

    // Observe stats numbers
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(animateStats);
    }, { threshold: 0.5 });

    document.querySelectorAll('.stats-number').forEach(stat => {
        statsObserver.observe(stat);
    });
});
