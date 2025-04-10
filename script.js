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

// Load components when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header');
    loadComponent('footer');

    // Mobile menu functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Header scroll behavior
    const header = document.getElementById('main-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('shadow-md');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('shadow-md')) {
            // Scrolling down
            header.classList.add('shadow-md');
        } else if (currentScroll < lastScroll && header.classList.contains('shadow-md')) {
            // Scrolling up
            header.classList.remove('shadow-md');
        }

        lastScroll = currentScroll;
    });

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