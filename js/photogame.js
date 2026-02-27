// ===================================================
// BLEND & SUPERCAR - Supercar Studio (Photo Game)
// Premium Canvas Rendering
// ===================================================

const PhotoGame = {
    uploadedImage: null,
    userName: '',
    selectedTheme: null,
    selectedBlend: null,
    selectedProduct: 'cup',

    init() {
        this.bindEvents();
    },

    bindEvents() {
        const dropzone = document.getElementById('photoDropzone');
        const fileInput = document.getElementById('photoInput');

        if (dropzone && fileInput) {
            dropzone.addEventListener('click', () => fileInput.click());
            dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('dragover'); });
            dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
            dropzone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropzone.classList.remove('dragover');
                if (e.dataTransfer.files[0]) this.handleFile(e.dataTransfer.files[0]);
            });
            fileInput.addEventListener('change', (e) => {
                if (e.target.files[0]) this.handleFile(e.target.files[0]);
            });
        }

        const nameInput = document.getElementById('gameNameInput');
        if (nameInput) {
            nameInput.addEventListener('input', (e) => {
                this.userName = e.target.value.slice(0, 20);
                const counter = document.getElementById('charCounter');
                if (counter) counter.textContent = `${this.userName.length}/20`;
            });
        }

        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                this.selectedTheme = btn.dataset.theme;
            });
        });

        document.querySelectorAll('.blend-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.blend-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                this.selectedBlend = btn.dataset.blend;
            });
        });

        const productSelect = document.getElementById('productType');
        if (productSelect) {
            productSelect.addEventListener('change', (e) => { this.selectedProduct = e.target.value; });
        }

        document.getElementById('generateBtn')?.addEventListener('click', () => this.generate());
        document.getElementById('downloadBtn')?.addEventListener('click', () => this.download());
        document.getElementById('shareWaBtn')?.addEventListener('click', () => this.shareWhatsApp());
    },

    handleFile(file) {
        if (!file.type.startsWith('image/')) { Utils.toast('Please upload an image file!', 'error'); return; }
        if (file.size > 5 * 1024 * 1024) { Utils.toast('File size must be under 5MB!', 'error'); return; }

        const reader = new FileReader();
        reader.onload = (e) => {
            this.uploadedImage = e.target.result;
            const preview = document.getElementById('photoPreview');
            if (preview) { preview.src = e.target.result; preview.style.display = 'block'; }
            Utils.toast('Photo uploaded successfully! 📸', 'success');
        };
        reader.readAsDataURL(file);
    },

    generate() {
        if (!this.uploadedImage) { Utils.toast('Please upload a photo first!', 'error'); return; }
        if (!this.userName) { Utils.toast('Please enter your name!', 'error'); return; }
        if (!this.selectedTheme) { Utils.toast('Please select a supercar theme!', 'error'); return; }
        if (!this.selectedBlend) { Utils.toast('Please select a background!', 'error'); return; }

        const genBtn = document.getElementById('generateBtn');
        if (genBtn) { genBtn.disabled = true; genBtn.textContent = '🏎️ Crafting Your Masterpiece...'; }

        const canvas = document.getElementById('previewCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        canvas.width = 700;
        canvas.height = 900;


        const theme = APP_DATA.supercarThemes.find(t => t.id === this.selectedTheme);
        const themeColor = theme ? theme.color : '#D4AF37';
        const accentColor = theme ? theme.accent : '#FFD700';
        const productLabel = APP_DATA.productTypes.find(p => p.id === this.selectedProduct)?.name || 'Coffee Cup';
        const w = canvas.width, h = canvas.height;

        // ====== DRAW PREMIUM BACKGROUND ======
        this.drawPremiumBg(ctx, w, h, themeColor, accentColor);

        // ====== Load and draw user image ======
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const cx = w / 2;

            // ------ DECORATIVE TOP SECTION ------
            // Gold top bar
            const topGrad = ctx.createLinearGradient(0, 0, w, 0);
            topGrad.addColorStop(0, themeColor);
            topGrad.addColorStop(0.5, accentColor);
            topGrad.addColorStop(1, themeColor);
            ctx.fillStyle = topGrad;
            ctx.fillRect(0, 0, w, 6);

            // Brand logo area
            ctx.fillStyle = themeColor;
            ctx.font = 'bold 36px "Playfair Display", Georgia, serif';
            ctx.textAlign = 'center';
            ctx.shadowColor = themeColor + '60';
            ctx.shadowBlur = 20;
            ctx.fillText('BLEND & SUPERCAR', cx, 60);
            ctx.shadowBlur = 0;

            // Subtitle
            ctx.fillStyle = 'rgba(255,255,255,0.6)';
            ctx.font = '500 12px Inter, sans-serif';
            ctx.letterSpacing = '0.3em';
            ctx.fillText('M O S C O W   E L I T E   •   L U X U R Y   C A F E', cx, 82);

            // Decorative diamond separator
            this.drawDiamond(ctx, cx, 100, 6, themeColor);

            // Product type badge
            ctx.save();
            const badgeW = 200, badgeH = 28;
            const badgeX = cx - badgeW / 2, badgeY = 112;
            ctx.fillStyle = themeColor + '25';
            ctx.strokeStyle = themeColor;
            ctx.lineWidth = 1;
            this.roundRect(ctx, badgeX, badgeY, badgeW, badgeH, 14);
            ctx.fill(); ctx.stroke();
            ctx.fillStyle = themeColor;
            ctx.font = 'bold 11px Inter, sans-serif';
            ctx.fillText(productLabel.toUpperCase(), cx, badgeY + 18);
            ctx.restore();

            // ------ PHOTO SECTION ------
            // Outer glow ring
            ctx.save();
            const photoY = 280;
            const outerR = 135;
            const innerR = 125;

            // Glow effect
            ctx.shadowColor = themeColor;
            ctx.shadowBlur = 30;
            ctx.beginPath();
            ctx.arc(cx, photoY, outerR, 0, Math.PI * 2);
            ctx.strokeStyle = themeColor + '40';
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Hexagonal decorative ring
            this.drawHexRing(ctx, cx, photoY, outerR + 15, themeColor);

            // Photo circle mask
            ctx.beginPath();
            ctx.arc(cx, photoY, innerR, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();

            // Draw photo (cover fit)
            const aspect = img.width / img.height;
            let dw = innerR * 2, dh = innerR * 2;
            if (aspect > 1) { dw = dh * aspect; } else { dh = dw / aspect; }
            ctx.drawImage(img, cx - dw / 2, photoY - dh / 2, dw, dh);
            ctx.restore();

            // Photo border ring
            ctx.beginPath();
            ctx.arc(cx, photoY, innerR + 2, 0, Math.PI * 2);
            const borderGrad = ctx.createLinearGradient(cx - innerR, photoY, cx + innerR, photoY);
            borderGrad.addColorStop(0, themeColor);
            borderGrad.addColorStop(0.5, accentColor);
            borderGrad.addColorStop(1, themeColor);
            ctx.strokeStyle = borderGrad;
            ctx.lineWidth = 4;
            ctx.stroke();

            // ------ NAME SECTION ------
            // Name background strip
            const nameY = 450;
            const stripGrad = ctx.createLinearGradient(0, nameY - 25, 0, nameY + 35);
            stripGrad.addColorStop(0, 'rgba(0,0,0,0)');
            stripGrad.addColorStop(0.5, themeColor + '15');
            stripGrad.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = stripGrad;
            ctx.fillRect(40, nameY - 25, w - 80, 60);

            // Side decorative lines
            ctx.strokeStyle = themeColor + '50';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(40, nameY); ctx.lineTo(cx - 150, nameY); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(cx + 150, nameY); ctx.lineTo(w - 40, nameY); ctx.stroke();
            this.drawDiamond(ctx, cx - 155, nameY, 4, themeColor);
            this.drawDiamond(ctx, cx + 155, nameY, 4, themeColor);

            // User name
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 34px "Playfair Display", Georgia, serif';
            ctx.textAlign = 'center';
            ctx.shadowColor = themeColor + '50';
            ctx.shadowBlur = 15;
            ctx.fillText(this.userName.toUpperCase(), cx, nameY + 12);
            ctx.shadowBlur = 0;

            // Theme edition
            ctx.fillStyle = themeColor;
            ctx.font = 'bold 14px Inter, sans-serif';
            ctx.fillText(`${theme?.emoji || '🏎️'} ${theme?.name || ''} EDITION`, cx, nameY + 40);

            // ------ QUOTE / TAGLINE SECTION ------
            const quoteY = 530;
            ctx.fillStyle = 'rgba(255,255,255,0.45)';
            ctx.font = 'italic 13px "Playfair Display", Georgia, serif';
            ctx.fillText('" Where Luxury Meets the Art of Coffee "', cx, quoteY);

            // ------ BOTTOM DETAILS SECTION ------
            // Bottom decorative bar
            const bottomY = 680;
            ctx.strokeStyle = themeColor + '30';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(60, bottomY); ctx.lineTo(w - 60, bottomY); ctx.stroke();

            // 3-column info grid
            const cols = [
                { icon: '🏎️', label: theme?.name || 'Supercar', sub: 'THEME' },
                { icon: '☕', label: 'Premium', sub: 'QUALITY' },
                { icon: '⭐', label: 'Exclusive', sub: 'EDITION' }
            ];
            const colW = (w - 120) / 3;
            cols.forEach((col, i) => {
                const colX = 60 + colW * i + colW / 2;
                const colY = bottomY + 35;
                ctx.font = '24px Inter, sans-serif';
                ctx.fillStyle = '#ffffff';
                ctx.fillText(col.icon, colX, colY);
                ctx.font = 'bold 12px Inter, sans-serif';
                ctx.fillStyle = '#ffffff';
                ctx.fillText(col.label, colX, colY + 22);
                ctx.font = '10px Inter, sans-serif';
                ctx.fillStyle = themeColor;
                ctx.fillText(col.sub, colX, colY + 36);
            });

            // QR / URL section
            const footerY = h - 80;
            ctx.fillStyle = themeColor + '15';
            ctx.fillRect(0, footerY, w, 80);

            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.font = '11px Inter, sans-serif';
            ctx.fillText('blend-and-supercar.vercel.app', cx, footerY + 25);
            ctx.fillText(`📞 ${APP_DATA.brand.phone}   •   📍 ${APP_DATA.brand.location}`, cx, footerY + 42);

            // Supercar Studio watermark
            ctx.fillStyle = themeColor + '40';
            ctx.font = 'bold 9px Inter, sans-serif';
            ctx.fillText('CREATED WITH SUPERCAR STUDIO', cx, footerY + 62);

            // Bottom gold bar
            const botGrad = ctx.createLinearGradient(0, 0, w, 0);
            botGrad.addColorStop(0, themeColor);
            botGrad.addColorStop(0.5, accentColor);
            botGrad.addColorStop(1, themeColor);
            ctx.fillStyle = botGrad;
            ctx.fillRect(0, h - 6, w, 6);

            // Decorative corner brackets
            this.drawLuxuryCorners(ctx, w, h, themeColor);

            // Show canvas
            const wrap = document.querySelector('.preview-canvas-wrap');
            if (wrap) wrap.style.display = 'flex';
            const actions = document.querySelector('.game-actions');
            if (actions) actions.style.display = 'flex';
            if (genBtn) { genBtn.disabled = false; genBtn.textContent = '✨ Generate Custom Product'; }
            Utils.toast('Your masterpiece is ready! 🏎️🎨', 'success');
        };

        img.onerror = () => {
            // Fallback: draw initial letter instead
            ctx.fillStyle = themeColor;
            ctx.font = 'bold 80px "Playfair Display", Georgia, serif';
            ctx.textAlign = 'center';
            ctx.fillText(this.userName.charAt(0).toUpperCase(), w / 2, 310);
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 28px "Playfair Display", serif';
            ctx.fillText(this.userName.toUpperCase(), w / 2, 480);
            if (genBtn) { genBtn.disabled = false; genBtn.textContent = '✨ Generate Custom Product'; }
        };

        img.src = this.uploadedImage;
    },

    // ====== PREMIUM BACKGROUNDS ======
    drawPremiumBg(ctx, w, h, color, accent) {
        // Base dark fill
        ctx.fillStyle = '#0a0a10';
        ctx.fillRect(0, 0, w, h);

        switch (this.selectedBlend) {
            case 'blur': {
                // Radial glow
                const g = ctx.createRadialGradient(w / 2, h / 3, 0, w / 2, h / 3, w * 0.7);
                g.addColorStop(0, color + '30');
                g.addColorStop(0.4, color + '10');
                g.addColorStop(1, 'transparent');
                ctx.fillStyle = g;
                ctx.fillRect(0, 0, w, h);
                // Secondary glow
                const g2 = ctx.createRadialGradient(w * 0.8, h * 0.7, 0, w * 0.8, h * 0.7, w * 0.4);
                g2.addColorStop(0, accent + '18');
                g2.addColorStop(1, 'transparent');
                ctx.fillStyle = g2;
                ctx.fillRect(0, 0, w, h);
                break;
            }
            case 'gradient': {
                const g = ctx.createLinearGradient(0, 0, w, h);
                g.addColorStop(0, color + '40');
                g.addColorStop(0.3, '#12121a');
                g.addColorStop(0.7, accent + '20');
                g.addColorStop(1, '#0a0a10');
                ctx.fillStyle = g;
                ctx.fillRect(0, 0, w, h);
                break;
            }
            case 'dark': {
                // Pure dark with subtle noise
                for (let i = 0; i < 80; i++) {
                    ctx.fillStyle = color + '06';
                    ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1);
                }
                // Subtle diagonal lines
                ctx.strokeStyle = color + '08';
                ctx.lineWidth = 1;
                for (let i = -h; i < w; i += 40) {
                    ctx.beginPath();
                    ctx.moveTo(i, 0);
                    ctx.lineTo(i + h, h);
                    ctx.stroke();
                }
                break;
            }
            case 'light': {
                const g = ctx.createLinearGradient(0, 0, 0, h);
                g.addColorStop(0, '#f8f6f0');
                g.addColorStop(1, '#ede8dc');
                ctx.fillStyle = g;
                ctx.fillRect(0, 0, w, h);
                // Subtle gold overlay
                ctx.fillStyle = color + '08';
                ctx.fillRect(0, 0, w, h);
                break;
            }
            default: {
                ctx.fillStyle = '#12121a';
                ctx.fillRect(0, 0, w, h);
            }
        }

        // Vignette effect (always)
        const vig = ctx.createRadialGradient(w / 2, h / 2, w * 0.3, w / 2, h / 2, w * 0.8);
        vig.addColorStop(0, 'transparent');
        vig.addColorStop(1, 'rgba(0,0,0,0.4)');
        ctx.fillStyle = vig;
        ctx.fillRect(0, 0, w, h);
    },

    // Helper: draw a diamond shape
    drawDiamond(ctx, x, y, size, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x, y - size);
        ctx.lineTo(x + size, y);
        ctx.lineTo(x, y + size);
        ctx.lineTo(x - size, y);
        ctx.closePath();
        ctx.fill();
    },

    // Helper: hexagonal decorative ring
    drawHexRing(ctx, cx, cy, r, color) {
        ctx.strokeStyle = color + '20';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 6;
            const x = cx + r * Math.cos(angle);
            const y = cy + r * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();

        // Small diamonds at vertices
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 6;
            const x = cx + r * Math.cos(angle);
            const y = cy + r * Math.sin(angle);
            this.drawDiamond(ctx, x, y, 3, color + '40');
        }
    },

    // Helper: rounded rectangle
    roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
    },

    // Helper: luxury corner brackets
    drawLuxuryCorners(ctx, w, h, color) {
        const s = 40, m = 20;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        // Top-left
        ctx.beginPath(); ctx.moveTo(m, m + s); ctx.lineTo(m, m); ctx.lineTo(m + s, m); ctx.stroke();
        // Top-right
        ctx.beginPath(); ctx.moveTo(w - m - s, m); ctx.lineTo(w - m, m); ctx.lineTo(w - m, m + s); ctx.stroke();
        // Bottom-left
        ctx.beginPath(); ctx.moveTo(m, h - m - s); ctx.lineTo(m, h - m); ctx.lineTo(m + s, h - m); ctx.stroke();
        // Bottom-right
        ctx.beginPath(); ctx.moveTo(w - m - s, h - m); ctx.lineTo(w - m, h - m); ctx.lineTo(w - m, h - m - s); ctx.stroke();
        // Corner diamonds
        this.drawDiamond(ctx, m, m, 3, color);
        this.drawDiamond(ctx, w - m, m, 3, color);
        this.drawDiamond(ctx, m, h - m, 3, color);
        this.drawDiamond(ctx, w - m, h - m, 3, color);
    },

    download() {
        const canvas = document.getElementById('previewCanvas');
        if (!canvas) return;
        const link = document.createElement('a');
        link.download = `supercar-studio-${this.userName || 'custom'}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        Utils.toast('Downloaded! 📥', 'success');
    },

    shareWhatsApp() {
        const themeName = APP_DATA.supercarThemes.find(t => t.id === this.selectedTheme)?.name || '';
        const msg = `🏎️ Check out my Supercar Studio creation!\n\n👤 Name: ${this.userName}\n🎨 Theme: ${themeName} Edition\n☕ Product: ${this.selectedProduct}\n\n✨ Create yours at blend-and-supercar.vercel.app\n📞 Contact: ${APP_DATA.brand.phone}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
    }
};
