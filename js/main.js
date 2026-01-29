document.addEventListener("DOMContentLoaded", () => {

    // Set Current Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    const logoText = document.getElementById('logo-text');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-blue-900', 'shadow-xl', 'py-2');
            navbar.classList.remove('bg-transparent', 'py-4');
        } else {
            navbar.classList.remove('bg-blue-900', 'shadow-xl', 'py-2');
            navbar.classList.add('bg-transparent', 'py-4');
        }
    });

    // Mobile Menu Toggle
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // Hero animations
    const elements = ['hero-tag', 'hero-title', 'hero-desc', 'hero-btns'];
    elements.forEach((id, index) => {
        setTimeout(() => {
            const el = document.getElementById(id);
            if (!el) return;
            el.classList.remove('opacity-0', 'translate-y-4');
            el.classList.add('opacity-100', 'translate-y-0');
        }, index * 200);
    });

});
