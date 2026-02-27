// ===================================================
// BLEND & SUPERCAR - Shopping Cart
// ===================================================

const Cart = {
    items: [],

    init() {
        this.items = JSON.parse(localStorage.getItem('bs-cart') || '[]');
        this.updateBadge();
    },

    save() {
        localStorage.setItem('bs-cart', JSON.stringify(this.items));
        this.updateBadge();
    },

    add(productId, qty = 1) {
        const product = APP_DATA.products.find(p => p.id === productId);
        if (!product) return;

        const existing = this.items.find(i => i.id === productId);
        if (existing) {
            existing.qty += qty;
        } else {
            this.items.push({ id: product.id, name: product.name, price: product.price, img: product.img, qty });
        }
        this.save();
        Utils.toast(`${product.name} added to cart!`, 'success');

        // Animate the cart badge
        const badge = document.querySelector('.cart-badge');
        if (badge) {
            badge.style.transform = 'scale(1.2)';
            setTimeout(() => badge.style.transform = 'scale(1)', 300);
        }
    },

    remove(productId) {
        this.items = this.items.filter(i => i.id !== productId);
        this.save();
        Utils.toast('Item removed from cart', 'info');
    },

    updateQty(productId, qty) {
        const item = this.items.find(i => i.id === productId);
        if (item) {
            item.qty = Math.max(1, qty);
            this.save();
        }
    },

    clear() {
        this.items = [];
        this.save();
        Utils.toast('Cart cleared', 'info');
    },

    getTotal() {
        return this.items.reduce((sum, i) => sum + (i.price * i.qty), 0);
    },

    getCount() {
        return this.items.reduce((sum, i) => sum + i.qty, 0);
    },

    updateBadge() {
        const count = this.getCount();
        const badge = document.querySelector('.cart-count');
        if (badge) {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        }
    },

    // Generate WhatsApp share message
    generateWhatsAppMessage() {
        if (this.items.length === 0) return '';

        const emojis = { Coffee: '☕', Food: '🍽️', Dessert: '🍰', Beverage: '🥤', Merch: '👕' };
        let msg = '🛒 *My Blend & Supercar Order:*\n\n';

        this.items.forEach(item => {
            const product = APP_DATA.products.find(p => p.id === item.id);
            const emoji = product ? (emojis[product.category] || '📦') : '📦';
            msg += `${emoji} ${item.name} x${item.qty} - ${Utils.formatPrice(item.price * item.qty)}\n`;
        });

        msg += `\n📊 *Total: ${Utils.formatPrice(this.getTotal())}*\n\n`;
        msg += `📞 Contact: ${APP_DATA.brand.phone}\n`;
        msg += `📧 Email: ${APP_DATA.brand.email}\n\n`;
        msg += `Ready to order? 🚀`;

        return msg;
    },

    shareOnWhatsApp() {
        const msg = this.generateWhatsAppMessage();
        if (!msg) {
            Utils.toast('Cart is empty!', 'error');
            return;
        }
        const url = `https://wa.me/${APP_DATA.brand.phoneRaw}?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
    }
};
