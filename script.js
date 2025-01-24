// Mobile menu handling
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuButton = document.querySelector('.mobile-menu-button');

function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    const menuContent = menu.querySelector('.mobile-menu-content');
    
    if (menu.classList.contains('active')) {
        menuContent.style.opacity = '0';
        menuContent.style.transform = 'translateY(20px)';
        setTimeout(() => {
            menu.classList.remove('active');
        }, 300);
    } else {
        menu.classList.add('active');
        setTimeout(() => {
            menuContent.style.opacity = '1';
            menuContent.style.transform = 'translateY(0)';
        }, 100);
    }
    
    document.body.classList.toggle('no-scroll');
}

// Close mobile menu on link click
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// Hide mobile menu on resize if screen becomes larger
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const menu = document.getElementById('mobile-menu');
        if (menu.classList.contains('active')) {
            toggleMenu();
        }
    }
});

// Close mobile menu on scroll
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop) {
        const menu = document.getElementById('mobile-menu');
        if (menu.classList.contains('active')) {
            toggleMenu();
        }
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, false);

// Responsive image loading
function handleResponsiveImages() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        if (window.innerWidth <= 768) {
            img.src = img.dataset.mobileSrc || img.dataset.src;
        } else {
            img.src = img.dataset.src;
        }
    });
}

// Responsive scroll handling
let lastScroll = 0;
const header = document.querySelector('.navbar-fixed');

function handleScroll() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
}

// Initialize responsive handlers
window.addEventListener('load', handleResponsiveImages);
window.addEventListener('resize', handleResponsiveImages);
window.addEventListener('scroll', handleScroll);

// Responsive breakpoint handler
function handleBreakpoints() {
    const breakpoints = {
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280
    };

    const width = window.innerWidth;
    document.body.dataset.breakpoint = 
        width < breakpoints.sm ? 'sm' :
        width < breakpoints.md ? 'md' :
        width < breakpoints.lg ? 'lg' :
        width < breakpoints.xl ? 'xl' : '2xl';
}

window.addEventListener('resize', handleBreakpoints);
handleBreakpoints();

// ...existing JavaScript code...
