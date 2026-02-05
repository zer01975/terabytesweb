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
function setupNavbar() {
    const navbar = document.getElementById('navbar');
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!navbar) return;

    // Detectamos si es Servicios o Home
    const isServicios = window.location.pathname.includes('servicios.html');
    const isHome = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');

    if (isServicios) {
        // En servicios: Forzamos estado sólido y NO escuchamos el scroll
        navbar.classList.add('bg-blue-900', 'shadow-xl', 'py-2');
        navbar.classList.remove('bg-transparent', 'py-4');
    } else if (isHome) {
        // En home: Aplicamos la lógica de scroll
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

    // Menú Mobile
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
function setupDynamicTitle() {

    const params = new URLSearchParams(window.location.search);
    const tipo = params.get('tipo');
    const hash = window.location.hash;
    const path = window.location.pathname;

    let title = 'Terabyte';

    // Servicios con detalle
    if (tipo === 'pc') {
        title = 'PC y Redes | Terabyte';
    }

    if (tipo === 'cctv') {
        title = 'CCTV | Terabyte';
    }

    if (tipo === 'electrico') {
        title = 'Electricidad | Terabyte';
    }

    // Página servicios sin detalle
    if (!tipo && path.includes('servicios')) {
        title = 'Servicios | Terabyte';
    }

    // Home scrolleado a servicios
    if (!tipo && path.includes('index') && hash === '#servicios') {
        title = 'Servicios | Terabyte';
    }
    if (!tipo && path.includes('index') && hash === '#contacto') {
        title = 'Contacto | Terabyte';
    }

    document.title = title;
}
// function setupBreadcrumb() {

//     const breadcrumb = document.getElementById('breadcrumb');
//     if (!breadcrumb) return;

//     const params = new URLSearchParams(window.location.search);
//     const tipo = params.get('tipo');
//     const path = window.location.pathname;
//     const hash = window.location.hash;

//     let html = `<a href="/index.html">Inicio</a>`;

    
//     if (
//         path.includes('servicios') ||
//         (path.includes('index') && hash === '#servicios')
//     ) {
//         html += ` / <a href="/index.html#servicios">Servicios</a>`;
//     }

   
//     if (tipo) {

//         let label = '';

//         if (tipo === 'pc') label = 'PC y Redes';
//         if (tipo === 'cctv') label = 'CCTV';
//         if (tipo === 'electrico') label = 'Electricidad';

//         html += ` / <span>${label}</span>`;
//     }

//     breadcrumb.innerHTML = html;
// }



// ===============================
// EJECUCIÓN PRINCIPAL
// ===============================
function setupBreadcrumb() {
    const breadcrumb = document.getElementById('breadcrumb');
    if (!breadcrumb) return;

    const params = new URLSearchParams(window.location.search);
    const tipo = params.get('tipo');
    const path = window.location.pathname;
    const hash = window.location.hash;

    let html = `
      <a href="/index.html" class="flex items-center gap-1 hover:text-blue-600">
        <svg class="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
        Inicio
      </a>
    `;

    if (
        path.includes('servicios') ||
        (path.includes('index') && hash === '#servicios')
    ) {
        html += `
          <span>/</span>
          <a href="/index.html#servicios" class="hover:text-blue-600">
            Servicios
          </a>
        `;
    }

    if (tipo) {
        let label = '';
        if (tipo === 'pc') label = 'PC y Redes';
        if (tipo === 'cctv') label = 'CCTV';
        if (tipo === 'electrico') label = 'Electricidad';

        html += `<span>/</span><span class="font-medium text-gray-900">${label}</span>`;
    }

    breadcrumb.innerHTML = html;
}
function getPageContext() {
    const params = new URLSearchParams(window.location.search);
    const tipo = params.get('tipo');
    const path = window.location.pathname;
    const hash = window.location.hash;

    const context = {
        section: 'Inicio',
        detail: null
    };

    // Estamos en Servicios
    if (
        path.includes('servicios') ||
        (path.includes('index') && hash === '#servicios')
    ) {
        context.section = 'Servicios';
    }

    // Detalle de servicio
    if (tipo) {
        const map = {
            pc: 'PC y Redes',
            cctv: 'CCTV',
            electrico: 'Electricidad'
        };
        context.detail = map[tipo] || null;
    }

    return context;
}
function renderBreadcrumb() {
    const breadcrumb = document.getElementById('breadcrumb');
    if (!breadcrumb) return;

    const { section, detail } = getPageContext();

    let html = `
      <a href="/index.html" class="flex items-center gap-1 hover:text-blue-600">
        <svg class="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
        Inicio
      </a>
    `;

    if (section !== 'Inicio') {
        html += `
          <span>/</span>
          <a href="/index.html#servicios" class="hover:text-blue-600">
            ${section}
          </a>
        `;
    }

    if (detail) {
        html += `
          <span>/</span>
          <span class="font-medium text-gray-900">${detail}</span>
        `;
    }

    breadcrumb.innerHTML = html;
}
function setupHashListener() {
    window.addEventListener('hashchange', () => {
        setupDynamicTitle();
        renderBreadcrumb();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadPartials().then(() => {
        // Primero cargamos el HTML del header, luego inicializamos su lógica
        setupSmartMenu();
        setupNavbar();
        initSite();
        setupDynamicTitle();
        //setupBreadcrumb();

        //setupDynamicTitle();
        renderBreadcrumb();

        mostrarServicioPorParametro();
        //setupBreadcrumbServicio();
        setupHashListener();
    });
});
