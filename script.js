// Function to load components
async function loadComponent(componentName) {
    try {
        const response = await fetch(`components/${componentName}.html`);
        const html = await response.text();
        document.getElementById(`${componentName}-placeholder`).innerHTML = html;
    } catch (error) {
        console.error(`Error loading ${componentName}:`, error);
    }
}

// Initialize header UI (mobile menu + scroll) after header HTML is injected
function initHeader() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const iconOpen = document.getElementById('mobile-menu-icon-open');
    const iconClose = document.getElementById('mobile-menu-icon-close');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const wasClosed = mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            const isOpen = wasClosed;
            mobileMenuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            if (iconOpen) iconOpen.classList.toggle('hidden', isOpen);
            if (iconClose) iconClose.classList.toggle('hidden', !isOpen);
        });
    }

    const header = document.getElementById('main-header');
    if (!header) return;
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0) {
            header.classList.remove('shadow-md');
            lastScroll = currentScroll;
            return;
        }
        if (currentScroll > lastScroll && !header.classList.contains('shadow-md')) {
            header.classList.add('shadow-md');
        } else if (currentScroll < lastScroll && header.classList.contains('shadow-md')) {
            header.classList.remove('shadow-md');
        }
        lastScroll = currentScroll;
    });
}

// Load components when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header').then(initHeader);
    loadComponent('footer');

    // Smooth scroll for anchor links
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
}); 