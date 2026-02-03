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
                    if (!res.ok) throw new Error(`No se pudo cargar ${file}`);
                    return res.text();
                })
                .then(html => {
                    el.innerHTML = html;
                })
                .catch(err => console.error(err));
        })
    );
}

// ===============================
// NAVBAR – scroll + mobile
// ===============================
// function setupNavbar() {
//     const navbar = document.getElementById('navbar');
//     const menuBtn = document.getElementById('menu-btn');
//     const mobileMenu = document.getElementById('mobile-menu');

//     if (!navbar) return;

//     // Detectamos si es Servicios o Home
//     const isServicios = window.location.pathname.includes('servicios.html');
//     const isHome = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');

//     if (isServicios) {
//         // En servicios: Forzamos estado sólido y NO escuchamos el scroll
//         navbar.classList.add('bg-blue-900', 'shadow-xl', 'py-2');
//         navbar.classList.remove('bg-transparent', 'py-4');
//     } else if (isHome) {
//         // En home: Aplicamos la lógica de scroll
//         window.addEventListener('scroll', () => {
//             if (window.scrollY > 50) {
//                 navbar.classList.add('bg-blue-900', 'shadow-xl', 'py-2');
//                 navbar.classList.remove('bg-transparent', 'py-4');
//             } else {
//                 navbar.classList.remove('bg-blue-900', 'shadow-xl', 'py-2');
//                 navbar.classList.add('bg-transparent', 'py-4');
//             }
//         });
//     }

//     // Menú Mobile
//     if (menuBtn && mobileMenu) {
//         menuBtn.addEventListener('click', () => {
//             mobileMenu.classList.toggle('hidden');
//         });

//         document.querySelectorAll('.mobile-link').forEach(link => {
//             link.addEventListener('click', () => {
//                 mobileMenu.classList.add('hidden');
//             });
//         });
//     }
// }
function setupNavbar() {
    const navbar = document.getElementById('navbar');
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!navbar) return;

    // Detectamos si estamos en servicios (Live Server o URL limpia)
    const isServicios = window.location.pathname.includes('servicios.html') || window.location.search.includes('tipo=');
    const isHome = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');

    if (isServicios) {
        // --- COMPORTAMIENTO PARA SERVICIOS ---
        // Forzamos el estado sólido de inmediato
        navbar.classList.add('bg-blue-900', 'shadow-xl', 'py-2');
        navbar.classList.remove('bg-transparent', 'py-4');
        
        // No agregamos el listener de scroll, así se queda fijo y sólido.
    } else if (isHome) {
        // --- COMPORTAMIENTO PARA HOME ---
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

    // Lógica del Menú Mobile (se mantiene igual)
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// ===============================
// SMART MENU
// ===============================
function setupSmartMenu() {
    const isHome = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');

    document.querySelectorAll('[data-link]').forEach(link => {
        const type = link.dataset.link;
        if (type === 'home') link.href = isHome ? '#home' : '/index.html';
        if (type === 'servicios') link.href = '/servicios.html';
        if (type === 'contacto') link.href = isHome ? '#contacto' : '/index.html#contacto';
    });
}

// ===============================
// SERVICIOS LOGIC
// ===============================
function mostrarServicioPorParametro() {
    const params = new URLSearchParams(window.location.search);
    const tipo = params.get('tipo');
    if (!tipo) return;

    const map = { pc: 'listaPC', cctv: 'listaCCTV', electrico: 'listaElectricidad' };
    document.querySelectorAll('.servicio-detalle').forEach(sec => sec.classList.add('hidden'));

    const targetId = map[tipo];
    if (targetId) {
        const target = document.getElementById(targetId);
        if (target) target.classList.remove('hidden');
    }
}

function setupBreadcrumbServicio() {
    const params = new URLSearchParams(window.location.search);
    const tipo = params.get('tipo');
    if (!tipo) return;

    const map = { pc: 'PC & Redes', cctv: 'CCTV', electrico: 'Electricidad' };
    const breadcrumb = document.getElementById('breadcrumb-servicio');
    if (breadcrumb && map[tipo]) breadcrumb.textContent = map[tipo];
}

// ===============================
// SITE INIT
// ===============================
function initSite() {
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    // Animaciones Hero
    const elements = ['hero-tag', 'hero-title', 'hero-desc', 'hero-btns'];
    elements.forEach((id, index) => {
        const el = document.getElementById(id);
        if (el) {
            setTimeout(() => {
                el.classList.remove('opacity-0', 'translate-y-4');
                el.classList.add('opacity-100', 'translate-y-0');
            }, index * 200);
        }
    });

    // Hash Scroll
    if (window.location.hash) {
        const targetId = window.location.hash.replace('#', '');
        setTimeout(() => {
            const target = document.getElementById(targetId);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
}

// ===============================
// EJECUCIÓN PRINCIPAL
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    loadPartials().then(() => {
        // Primero cargamos el HTML del header, luego inicializamos su lógica
        setupNavbar(); 
        setupSmartMenu();
        initSite();
        mostrarServicioPorParametro();
        setupBreadcrumbServicio();
    });
});