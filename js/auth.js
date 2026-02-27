// ===================================================
// BLEND & SUPERCAR - Authentication (localStorage)
// ===================================================

const Auth = {
    user: null,

    init() {
        this.user = JSON.parse(localStorage.getItem('bs-user') || 'null');
        this.updateUI();
    },

    register(name, email, password) {
        const users = JSON.parse(localStorage.getItem('bs-users') || '[]');
        if (users.find(u => u.email === email)) {
            Utils.toast('Email already registered!', 'error');
            return false;
        }
        const user = {
            id: Date.now(),
            name,
            email,
            password: btoa(password), // basic encoding (not secure, demo only)
            vipTier: null,
            loyaltyPoints: 0,
            favorites: [],
            joinDate: new Date().toISOString()
        };
        users.push(user);
        localStorage.setItem('bs-users', JSON.stringify(users));
        this.login(email, password);
        Utils.toast(`Welcome, ${name}! 🎉`, 'success');
        return true;
    },

    login(email, password) {
        const users = JSON.parse(localStorage.getItem('bs-users') || '[]');
        const user = users.find(u => u.email === email && u.password === btoa(password));
        if (user) {
            this.user = user;
            localStorage.setItem('bs-user', JSON.stringify(user));
            this.updateUI();
            return true;
        }
        Utils.toast('Invalid email or password!', 'error');
        return false;
    },

    logout() {
        this.user = null;
        localStorage.removeItem('bs-user');
        this.updateUI();
        Utils.toast('Logged out successfully', 'info');
        window.location.hash = '#home';
    },

    isLoggedIn() {
        return this.user !== null;
    },

    updateProfile(data) {
        if (!this.user) return;
        Object.assign(this.user, data);
        localStorage.setItem('bs-user', JSON.stringify(this.user));
        // Also update in users array
        const users = JSON.parse(localStorage.getItem('bs-users') || '[]');
        const idx = users.findIndex(u => u.id === this.user.id);
        if (idx >= 0) {
            users[idx] = this.user;
            localStorage.setItem('bs-users', JSON.stringify(users));
        }
    },

    addLoyaltyPoints(amount) {
        if (!this.user) return;
        const multiplier = this.user.vipTier === 'platinum' ? 3 : this.user.vipTier === 'gold' ? 2 : 1;
        this.user.loyaltyPoints += Math.floor(amount / 10) * multiplier;
        this.updateProfile({});
    },

    getVIPDiscount() {
        if (!this.user || !this.user.vipTier) return 0;
        const discounts = { silver: 0.10, gold: 0.15, platinum: 0.20 };
        return discounts[this.user.vipTier] || 0;
    },

    upgradeVIP(tier) {
        if (!this.user) {
            Utils.toast('Please login first!', 'error');
            return;
        }
        this.user.vipTier = tier;
        this.updateProfile({});
        Utils.toast(`🎉 Welcome to ${tier.toUpperCase()} VIP membership!`, 'success');
    },

    updateUI() {
        const authBtn = document.getElementById('authNavBtn');
        if (authBtn) {
            if (this.user) {
                authBtn.innerHTML = `<span style="font-size:0.8rem">👤</span> ${this.user.name.split(' ')[0]}`;
                authBtn.setAttribute('href', '#orders');
            } else {
                authBtn.innerHTML = '👤 Login';
                authBtn.setAttribute('href', '#login');
            }
        }
    }
};
