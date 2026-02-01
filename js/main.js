function loadPartials() {
    const includes = document.querySelectorAll('[data-include]');

    return Promise.all(
        Array.from(includes).map(el => {
            const file = el.getAttribute('data-include');
            return fetch(file)
                .then(res => {
                    if (!res.ok) throw new Error(`No se pudo cargar ${file}`);
                    return res.text();
                })
                .then(html => {
                    el.innerHTML = html;
                });
        })
    );
}

function initSite() {

    // Año footer
    const year = document.getElementById('year');
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Navbar
    const navbar = document.getElementById('navbar');
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-blue-900', 'shadow-xl', 'py-2');
                navbar.classList.remove('bg-transparent', 'py-4');
            } else {
                navbar.classList.remove('bg-blue-900', 'shadow-xl', 'py-2');
                navbar.classList.add('bg-transparent', 'py-4');
            }
        });
    }

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Hero animations
    const elements = ['hero-tag', 'hero-title', 'hero-desc', 'hero-btns'];
    elements.forEach((id, index) => {
        const el = document.getElementById(id);
        if (!el) return;

        setTimeout(() => {
            el.classList.remove('opacity-0', 'translate-y-4');
            el.classList.add('opacity-100', 'translate-y-0');
        }, index * 200);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadPartials().then(() => {
        initSite();
    });
});
