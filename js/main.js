// ===============================
// LOAD PARTIALS (header, hero, footer, etc)
// ===============================
function loadPartials() {
    const includes = document.querySelectorAll('[data-include]');

    return Promise.all(
        Array.from(includes).map(el => {
            const file = el.getAttribute('data-include').trim();

            return fetch(file)
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`No se pudo cargar ${file}`);
                    }
                    return res.text();
                })
                .then(html => {
                    el.innerHTML = html;
                })
                .catch(err => {
                    console.error(err);
                });
        })
    );
}

// ===============================
// NAVBAR – estado inicial según página
// ===============================
function setupNavbarInitialState() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const isHome =
        document.body.classList.contains('page-home') ||
        window.location.pathname === '/' ||
        window.location.pathname.endsWith('index.html');

    if (!isHome) {
        navbar.classList.add('bg-blue-900', 'shadow-xl', 'py-2');
        navbar.classList.remove('bg-transparent', 'py-4');
    }
}

// ===============================
// NAVBAR – scroll + mobile
// ===============================
function setupNavbar() {
    const navbar = document.getElementById('navbar');
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-blue-900', 'shadow-xl', 'py-2');
            navbar.classList.remove('bg-transparent', 'py-4');
        } else {
            navbar.classList.remove('bg-blue-900', 'shadow-xl', 'py-2');
            navbar.classList.add('bg-transparent', 'py-4');
        }
    });

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
}

// ===============================
// SMART MENU (home / servicios / contacto)
// ===============================
function setupSmartMenu() {
    const isHome =
        window.location.pathname === '/' ||
        window.location.pathname.endsWith('index.html');

    document.querySelectorAll('[data-link]').forEach(link => {
        const type = link.dataset.link;

        if (type === 'home') {
            link.href = isHome ? '#home' : '/index.html';
        }

        if (type === 'servicios') {
            link.href = '/servicios.html';
        }


        if (type === 'contacto') {
            link.href = isHome ? '#contacto' : '/index.html#contacto';
        }

    });
}

// ===============================
// SITE INIT (hero + footer)
// ===============================
function initSite() {

    // Año footer
    const year = document.getElementById('year');
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Hero animations (solo si existe)
    const elements = ['hero-tag', 'hero-title', 'hero-desc', 'hero-btns'];

    elements.forEach((id, index) => {
        const el = document.getElementById(id);
        if (!el) return;

        setTimeout(() => {
            el.classList.remove('opacity-0', 'translate-y-4');
            el.classList.add('opacity-100', 'translate-y-0');
        }, index * 200);
    });

    // Scroll correcto a #contacto si viene con hash
    if (window.location.hash === '#contacto') {
        const contacto = document.getElementById('contacto');
        if (contacto) {
            setTimeout(() => {
                contacto.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }
    // Scroll correcto si viene con hash (#servicios, #contacto, etc)
    if (window.location.hash) {
        const targetId = window.location.hash.replace('#', '');

        setTimeout(() => {
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    }


}

// ===============================
// DOM READY
// ===============================

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    // Detectar si estamos en HOME
    const isHome =
        window.location.pathname === '/' ||
        window.location.pathname.endsWith('index.html');

    // Estado inicial
    if (!isHome) {
        navbar.classList.add('navbar-solid');
        navbar.classList.remove('scrolled');
    }

    // Scroll SOLO en home
    if (isHome) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
});
function mostrarServicioPorParametro() {
    const params = new URLSearchParams(window.location.search);
    const tipo = params.get('tipo');

    if (!tipo) return;

    const map = {
        pc: 'listaPC',
        cctv: 'listaCCTV',
        electrico: 'listaElectricidad'
    };

    document.querySelectorAll('.servicio-detalle').forEach(sec => {
        sec.classList.add('hidden');
    });

    const targetId = map[tipo];
    if (!targetId) return;

    const target = document.getElementById(targetId);
    if (target) {
        target.classList.remove('hidden');
    }
}
function setupBreadcrumbServicio() {
    const params = new URLSearchParams(window.location.search);
    const tipo = params.get('tipo');

    if (!tipo) return;

    const map = {
        pc: 'PC & Redes',
        cctv: 'CCTV',
        electrico: 'Electricidad'
    };

    const breadcrumb = document.getElementById('breadcrumb-servicio');
    if (breadcrumb && map[tipo]) {
        breadcrumb.textContent = map[tipo];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadPartials().then(() => {
        setupSmartMenu();
        setupNavbar();
        setupNavbarInitialState();
        initSite();
        mostrarServicioPorParametro();
        setupBreadcrumbServicio();
    });
});

