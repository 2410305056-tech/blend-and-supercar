// ===================================================
// BLEND & SUPERCAR - Utilities
// ===================================================

const Utils = {
    // ---- Theme Toggle ----
    initTheme() {
        const saved = localStorage.getItem('bs-theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = saved || (systemDark ? 'dark' : 'dark'); // default dark
        document.documentElement.setAttribute('data-theme', theme);
        this.updateThemeIcon(theme);
    },

    toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('bs-theme', next);
        this.updateThemeIcon(next);
    },

    updateThemeIcon(theme) {
        const btn = document.getElementById('themeToggle');
        if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    },

    // ---- Toast Notifications ----
    toast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const icons = { success: '✅', error: '❌', info: '💡' };
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
      <span class="toast-icon">${icons[type] || '💡'}</span>
      <span class="toast-msg">${message}</span>
      <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
    `;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    },

    // ---- Star Rating HTML Generator ----
    starsHTML(rating, size = '') {
        const full = Math.floor(rating);
        const half = rating % 1 >= 0.5 ? 1 : 0;
        const empty = 5 - full - half;
        let html = '<span class="stars">';
        for (let i = 0; i < full; i++) html += '★';
        if (half) html += '★';
        for (let i = 0; i < empty; i++) html += '<span class="empty">★</span>';
        html += '</span>';
        return html;
    },

    // ---- Format Price ----
    formatPrice(price) {
        return `₹${price.toLocaleString('en-IN')}`;
    },

    // ---- Get Time of Day ----
    getTimeOfDay() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return 'morning';
        if (hour >= 12 && hour < 17) return 'afternoon';
        if (hour >= 17 && hour < 21) return 'evening';
        return 'night';
    },

    // ---- Generate Order ID ----
    generateOrderId() {
        return 'BS-' + Date.now().toString(36).toUpperCase();
    },

    // ---- Generate Confirmation Number ----
    generateConfirmation() {
        return 'RES-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    },

    // ---- Format Date ----
    formatDate(dateStr) {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            day: 'numeric', month: 'short', year: 'numeric'
        });
    },

    // ---- Debounce ----
    debounce(fn, delay = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        };
    },

    // ---- Scroll into view ----
    scrollTo(selector) {
        document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
    },

    // ---- Navbar scroll effect ----
    initNavScroll() {
        const nav = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
            nav?.classList.toggle('scrolled', window.scrollY > 50);
        });
    },

    // ---- Mobile nav toggle ----
    initMobileNav() {
        const hamburger = document.querySelector('.hamburger');
        const mobileNav = document.querySelector('.mobile-nav');
        if (hamburger && mobileNav) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                mobileNav.classList.toggle('show');
            });
        }
    }
};
