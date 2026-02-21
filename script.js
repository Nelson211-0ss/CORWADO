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

// Hamburger: bind directly to button and menu (header is now in the HTML, so they exist on load)
function setupMobileMenu() {
    var btn = document.getElementById('mobile-menu-button');
    var menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    var iconOpen = document.getElementById('mobile-menu-icon-open');
    var iconClose = document.getElementById('mobile-menu-icon-close');

    function setMenuOpen(open) {
        if (open) {
            menu.classList.add('mobile-menu-open');
            menu.setAttribute('aria-hidden', 'false');
            btn.setAttribute('aria-expanded', 'true');
            if (iconOpen) iconOpen.classList.add('hidden');
            if (iconClose) iconClose.classList.remove('hidden');
        } else {
            menu.classList.remove('mobile-menu-open');
            menu.setAttribute('aria-hidden', 'true');
            btn.setAttribute('aria-expanded', 'false');
            if (iconOpen) iconOpen.classList.remove('hidden');
            if (iconClose) iconClose.classList.add('hidden');
        }
    }

    btn.addEventListener('click', function () {
        setMenuOpen(!menu.classList.contains('mobile-menu-open'));
    });

    menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () { setMenuOpen(false); });
    });

    window.addEventListener('resize', function () {
        if (window.matchMedia('(min-width: 768px)').matches) setMenuOpen(false);
    });
}

// Initialize header UI (scroll behavior) after header HTML is injected
function initHeader() {
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

// Load components when the page loads (header is inlined in HTML; only footer is fetched)
document.addEventListener('DOMContentLoaded', function () {
    setupMobileMenu();
    initHeader();
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