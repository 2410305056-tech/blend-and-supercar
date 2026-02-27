// ===================================================
// BLEND & SUPERCAR - SPA Router
// ===================================================

const Router = {
    routes: {},
    currentRoute: '',

    init() {
        window.addEventListener('hashchange', () => this.navigate());
        window.addEventListener('load', () => {
            if (!window.location.hash) window.location.hash = '#home';
            this.navigate();
        });
    },

    register(hash, renderFn) {
        this.routes[hash] = renderFn;
    },

    navigate() {
        const hash = window.location.hash || '#home';
        const route = hash.split('?')[0];

        if (this.routes[route]) {
            this.currentRoute = route;
            const app = document.getElementById('app');

            // Page exit animation
            app.style.opacity = '0';
            app.style.transform = 'translateY(10px)';

            setTimeout(() => {
                app.innerHTML = this.routes[route]();
                app.style.opacity = '1';
                app.style.transform = 'translateY(0)';

                // Update active nav link
                document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
                    a.classList.toggle('active', a.getAttribute('href') === route);
                });

                // Close mobile nav
                document.querySelector('.mobile-nav')?.classList.remove('show');
                document.querySelector('.hamburger')?.classList.remove('active');

                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'instant' });

                // Initialize scroll reveal
                this.initScrollReveal();

                // Fire page-specific init
                if (typeof window.onPageLoad === 'function') {
                    window.onPageLoad(route);
                }
            }, 200);
        }
    },

    initScrollReveal() {
        const reveals = document.querySelectorAll('.reveal');
        if (!reveals.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        reveals.forEach(el => observer.observe(el));
    }
};
