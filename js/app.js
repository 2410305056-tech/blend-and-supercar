// ===================================================
// BLEND & SUPERCAR - Main App Entry
// ===================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    Utils.initTheme();

    // Initialize auth
    Auth.init();

    // Initialize cart
    Cart.init();

    // Initialize nav
    Utils.initNavScroll();
    Utils.initMobileNav();

    // Theme toggle
    document.getElementById('themeToggle')?.addEventListener('click', () => Utils.toggleTheme());

    // Register all routes (arrow functions for proper `this` binding)
    Router.register('#home', () => Pages.home());
    Router.register('#menu', () => Pages.menu());
    Router.register('#photogame', () => Pages.photogame());
    Router.register('#chat', () => Pages.chat());
    Router.register('#cart', () => Pages.cart());
    Router.register('#gallery', () => Pages.gallery());
    Router.register('#reviews', () => Pages.reviews());
    Router.register('#orders', () => Pages.orders());
    Router.register('#reservations', () => Pages.reservations());
    Router.register('#contact', () => Pages.contact());
    Router.register('#vip', () => Pages.vip());
    Router.register('#login', () => Pages.login());
    Router.register('#admin', () => Pages.admin());

    // Initialize router
    Router.init();

    // Initialize music player controls
    MusicPlayer.init();
    setTimeout(() => MusicPlayer.bindControls(), 500);

    // Page-specific initialization
    window.onPageLoad = (route) => {
        if (route === '#photogame') {
            setTimeout(() => PhotoGame.init(), 100);
        }
        if (route === '#chat') {
            setTimeout(() => Chatbot.init(), 100);
        }
        // Re-bind music controls on every page
        setTimeout(() => {
            MusicPlayer.bindControls();
            MusicPlayer.updateUI();
            Cart.updateBadge();
            Auth.updateUI();
        }, 100);
    };
});
