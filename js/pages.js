// ===================================================
// BLEND & SUPERCAR - All Page Renderers
// ===================================================

const Pages = {

  // ================================================================
  // PAGE 1: HOME (PREMIUM)
  // ================================================================
  home() {
    return `
    <section class="hero">
      <div class="hero-content">

        <div class="hero-top-accent"></div>

        <div class="hero-crest">
          <span>EST. 2026</span>
          <div class="hero-crest-dot"></div>
          <span>MOSCOW ELITE</span>
          <div class="hero-crest-dot"></div>
          <span>BANGALORE</span>
        </div>

        <h1 class="hero-title animate-fadeInUp">
          BLEND <span class="title-amp">&</span> SUPERCAR
        </h1>

        <p class="hero-subtitle">
          LUXURY COFFEE &nbsp;•&nbsp; SUPERCAR CULTURE &nbsp;•&nbsp; RUSSIAN ELEGANCE
        </p>

        <p class="hero-desc">
          Where the art of premium coffee meets the thrill of supercar culture.
          Every cup is a masterpiece. Every visit, an experience of unmatched luxury.
        </p>

        <div class="hero-buttons">
          <a href="#menu" class="btn btn-gold btn-lg">☕ EXPLORE MENU</a>
          <a href="#photogame" class="btn btn-outline btn-lg">🎮 PHOTO GAME</a>
          <a href="#reservations" class="btn btn-red btn-lg">📅 RESERVE TABLE</a>
          <a href="#vip" class="btn btn-ghost btn-lg">👑 VIP MEMBERSHIP</a>
        </div>

        <div class="stats-bar">
          <div class="stat-item">
            <div class="stat-value">27+</div>
            <div class="stat-label">Premium Items</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">5</div>
            <div class="stat-label">Supercar Themes</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">4.8★</div>
            <div class="stat-label">Average Rating</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">10K+</div>
            <div class="stat-label">Happy Customers</div>
          </div>
        </div>

        <div class="features-grid">
          <div class="feature-box">
            <div class="feature-icon">☕</div>
            <h3>PREMIUM COFFEE</h3>
            <p>8 signature supercar-inspired blends, each crafted with rare beans from around the world.</p>
          </div>
          <div class="feature-box">
            <div class="feature-icon">🎮</div>
            <h3>PHOTO GAME</h3>
            <p>See yourself on our products! Upload your photo, pick a theme, and create shareable custom designs.</p>
          </div>
          <div class="feature-box">
            <div class="feature-icon">🏎️</div>
            <h3>SUPERCAR VIBES</h3>
            <p>5 iconic themes — Ferrari, Lamborghini, Porsche, Bugatti & McLaren. Luxury lifestyle meets coffee art.</p>
          </div>
        </div>

        <div class="supercar-section">
          <div class="section-header">
            <h2 class="text-gold">SUPERCAR SHOWCASE</h2>
            <div class="section-divider"></div>
            <p>Our signature supercar themes — each one tells a story of speed, luxury, and excellence.</p>
          </div>
          <div class="car-carousel" id="carCarousel">
            ${SUPERCAR_IMAGES.map(car => `
              <div class="car-card" style="border: 2px solid ${car.color}20">
                <img src="${car.img}" alt="${car.name}" loading="lazy">
                <div class="car-overlay">
                  <div>
                    <div class="car-name">${car.name}</div>
                    <div class="car-tag">${car.tag}</div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="models-section">
          <div class="section-header">
            <h2 class="text-gold">FEATURED COLLECTION</h2>
            <div class="section-divider"></div>
            <p>Our premium advertising campaign — where style meets substance.</p>
          </div>
          <div class="models-grid">
            ${GALLERY_IMAGES.slice(0, 4).map(m => `
              <div class="model-card">
                <img src="${m.src}" alt="${m.caption}" loading="lazy">
                <div class="model-overlay">
                  <p>${m.caption}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>`;
  },

  // ================================================================
  // PAGE 2: MENU
  // ================================================================
  menu() {
    const sections = [
      { name: 'All', icon: '🍽️' },
      { name: 'Coffee', icon: '☕' },
      { name: 'Food', icon: '🥩' },
      { name: 'Dessert', icon: '🍰' },
      { name: 'Beverage', icon: '🥤' }
    ];

    return `
    <section class="page-section menu-page">
      <div class="container">
        <div class="section-header animate-fadeInUp">
          <h2 class="text-gold">COFFEE & LOUNGE MENU</h2>
          <div class="section-divider"></div>
          <p>Curated by our master chefs — every item is an experience in luxury.</p>
        </div>

        <div class="menu-categories" id="menuCategories">
          ${sections.map((s, i) => `
            <button class="tab-btn ${i === 0 ? 'active' : ''}" data-category="${s.name}" onclick="Pages.filterMenu('${s.name}')">
              ${s.icon} ${s.name}
            </button>
          `).join('')}
        </div>

        <div class="menu-grid" id="menuGrid">
          ${APP_DATA.products.map(p => `
            <div class="menu-card" data-category="${p.category}">
              <img class="menu-img" src="${p.img}" alt="${p.name}" loading="lazy">
              <div class="menu-body">
                <div class="menu-name">${p.name}</div>
                <div class="menu-desc">${p.desc}</div>
                ${p.badge ? `<span class="badge badge-gold" style="margin-bottom:8px">${p.badge}</span>` : ''}
                <div class="menu-bottom">
                  <span class="menu-price">${Utils.formatPrice(p.price)}</span>
                  <div style="display:flex;align-items:center;gap:8px;">
                    ${Utils.starsHTML(p.rating)}
                    <button class="add-to-cart-btn" onclick="Cart.add(${p.id})" title="Add to cart">+</button>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>`;
  },

  filterMenu(category) {
    document.querySelectorAll('#menuCategories .tab-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.category === category);
    });
    document.querySelectorAll('#menuGrid .menu-card').forEach(card => {
      const show = category === 'All' || card.dataset.category === category;
      card.style.display = show ? '' : 'none';
      if (show) { card.style.animation = 'fadeInUp 0.4s ease forwards'; }
    });
  },

  // ================================================================
  // PAGE 3: SUPERCAR STUDIO (Photo Game)
  // ================================================================
  photogame() {
    return `
    <section class="page-section photogame-page">
      <div class="container">

        <!-- GAME BRANDING -->
        <div class="game-brand animate-fadeInUp">
          <div class="game-logo">
            <span class="game-logo-icon">🏎️</span>
            <div class="game-logo-text">
              <span class="game-logo-title">SUPERCAR STUDIO</span>
              <span class="game-logo-sub">BY BLEND & SUPERCAR</span>
            </div>
          </div>
          <p class="game-tagline">Your Face. Our Products. One Legendary Design.</p>
        </div>

        <!-- HOW IT WORKS -->
        <div class="game-how-it-works animate-fadeInUp">
          <div class="hiw-step">
            <div class="hiw-icon">📸</div>
            <div class="hiw-label">Upload Photo</div>
          </div>
          <div class="hiw-arrow">→</div>
          <div class="hiw-step">
            <div class="hiw-icon">✍️</div>
            <div class="hiw-label">Add Your Name</div>
          </div>
          <div class="hiw-arrow">→</div>
          <div class="hiw-step">
            <div class="hiw-icon">🏎️</div>
            <div class="hiw-label">Pick Theme</div>
          </div>
          <div class="hiw-arrow">→</div>
          <div class="hiw-step">
            <div class="hiw-icon">✨</div>
            <div class="hiw-label">Get Design</div>
          </div>
          <div class="hiw-arrow">→</div>
          <div class="hiw-step">
            <div class="hiw-icon">📤</div>
            <div class="hiw-label">Share & Win!</div>
          </div>
        </div>

        <div class="game-steps">
          <div class="game-step animate-fadeInUp">
            <span class="step-num">1</span>
            <h3>📸 Upload Your Star Photo</h3>
            <p class="step-desc">Upload your best shot — you're about to become the face of a supercar brand!</p>
            <div class="dropzone" id="photoDropzone">
              <div class="drop-icon">📤</div>
              <p><strong>Drag & drop</strong> your photo here</p>
              <p>or click to browse your files</p>
              <small class="text-muted">Max 5MB • JPG, PNG, WEBP</small>
            </div>
            <img id="photoPreview" class="photo-preview" alt="Preview">
            <input type="file" id="photoInput" accept="image/*" style="display:none">
          </div>

          <div class="game-step animate-fadeInUp">
            <span class="step-num">2</span>
            <h3>✍️ Your Brand Ambassador Name</h3>
            <p class="step-desc">This name appears on your custom product — make it legendary!</p>
            <div style="position:relative">
              <input type="text" id="gameNameInput" class="form-input" placeholder="Enter your name (max 20 characters)" maxlength="20">
              <span id="charCounter" style="position:absolute;right:12px;top:50%;transform:translateY(-50%);font-size:0.75rem;color:var(--text-muted)">0/20</span>
            </div>
          </div>

          <div class="game-step animate-fadeInUp">
            <span class="step-num">3</span>
            <h3>🏎️ Choose Your Supercar DNA</h3>
            <p class="step-desc">Each supercar has a unique personality. Which one matches yours?</p>
            <div class="theme-buttons">
              ${APP_DATA.supercarThemes.map(t => `
                <button class="theme-btn ${t.id}" data-theme="${t.id}">${t.emoji} ${t.name}</button>
              `).join('')}
            </div>
          </div>

          <div class="game-step animate-fadeInUp">
            <span class="step-num">4</span>
            <h3>🎨 Select Premium Background</h3>
            <p class="step-desc">Set the stage for your masterpiece with a luxury background.</p>
            <div class="blend-buttons">
              ${APP_DATA.blendBackgrounds.map(b => `
                <button class="blend-btn" data-blend="${b.id}">✨ ${b.name}</button>
              `).join('')}
            </div>
          </div>

          <div class="game-step animate-fadeInUp">
            <span class="step-num">5</span>
            <h3>📦 Choose Product Canvas</h3>
            <p class="step-desc">Where do you want your design to live?</p>
            <select id="productType" class="form-select">
              ${APP_DATA.productTypes.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}
            </select>
          </div>

          <div class="game-step animate-fadeInUp" style="text-align:center">
            <button id="generateBtn" class="btn btn-gold btn-lg" style="margin-bottom:20px">✨ Generate Custom Product</button>
            <div class="preview-canvas-wrap" style="display:none">
              <canvas id="previewCanvas"></canvas>
            </div>
            <div class="game-actions" style="display:none;justify-content:center;margin-top:16px">
              <button id="downloadBtn" class="btn btn-gold">⬇️ Download</button>
              <button id="shareWaBtn" class="btn btn-whatsapp">💬 Share on WhatsApp</button>
            </div>
          </div>
        </div>
      </div>
    </section>`;
  },

  // ================================================================
  // PAGE 4: CHATBOT
  // ================================================================
  chat() {
    return `
    <section class="page-section chat-page">
      <div class="container">
        <div class="section-header animate-fadeInUp">
          <h2 class="text-gold">💬 PRIYA SAINI — YOUR ASSISTANT</h2>
          <div class="section-divider"></div>
          <p>Tell me how you're feeling and I'll suggest the perfect products for your mood!</p>
        </div>

        <div class="chatbot-container animate-fadeInUp">
          <div class="chat-header">
            <div class="chat-avatar">👩</div>
            <div class="chat-header-info">
              <h4>Priya Saini</h4>
              <p>Online | Blend & Supercar</p>
            </div>
          </div>

          <div class="mood-buttons">
            <button class="mood-btn" data-mood="happy">😊 Happy</button>
            <button class="mood-btn" data-mood="sad">😢 Sad</button>
            <button class="mood-btn" data-mood="energetic">⚡ Energetic</button>
            <button class="mood-btn" data-mood="calm">😌 Calm</button>
            <button class="mood-btn" data-mood="party">🎉 Party</button>
          </div>

          <div class="chat-messages" id="chatMessages"></div>

          <div class="chat-input-area">
            <input type="text" id="chatInput" class="chat-input" placeholder="Tell me your mood...">
            <button id="chatSendBtn" class="chat-send">➤</button>
          </div>
        </div>
      </div>
    </section>`;
  },

  // ================================================================
  // PAGE 5: CART
  // ================================================================
  cart() {
    const items = Cart.items;
    const total = Cart.getTotal();
    const discount = Auth.getVIPDiscount();
    const discountAmt = Math.round(total * discount);
    const finalTotal = total - discountAmt;

    if (items.length === 0) {
      return `
      <section class="page-section cart-page">
        <div class="container">
          <div class="section-header animate-fadeInUp">
            <h2 class="text-gold">🛒 YOUR CART</h2>
            <div class="section-divider"></div>
          </div>
          <div class="empty-state animate-fadeInUp">
            <div class="empty-icon">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Discover our amazing products and add them to your cart!</p>
            <a href="#menu" class="btn btn-gold">Browse Menu</a>
          </div>
        </div>
      </section>`;
    }

    return `
    <section class="page-section cart-page">
      <div class="container">
        <div class="section-header animate-fadeInUp">
          <h2 class="text-gold">🛒 YOUR CART</h2>
          <div class="section-divider"></div>
          <p>${items.length} item${items.length > 1 ? 's' : ''} in your cart</p>
        </div>

        <div class="cart-layout">
          <div class="cart-items">
            ${items.map(item => `
              <div class="cart-item animate-fadeInUp">
                <img class="cart-item-img" src="${item.img}" alt="${item.name}">
                <div class="cart-item-info">
                  <div class="cart-item-name">${item.name}</div>
                  <div class="cart-item-price">${Utils.formatPrice(item.price)}</div>
                </div>
                <div class="qty-control">
                  <button class="qty-btn" onclick="Cart.updateQty(${item.id}, ${item.qty - 1}); if(${item.qty}<=1){Cart.remove(${item.id})}; location.hash='#cart'">−</button>
                  <span class="qty-value">${item.qty}</span>
                  <button class="qty-btn" onclick="Cart.updateQty(${item.id}, ${item.qty + 1}); location.hash='#cart'">+</button>
                </div>
                <span style="font-weight:700;color:var(--gold);min-width:70px;text-align:right">${Utils.formatPrice(item.price * item.qty)}</span>
                <button class="cart-item-remove" onclick="Cart.remove(${item.id}); location.hash='#cart'" title="Remove">🗑️</button>
              </div>
            `).join('')}
          </div>

          <div class="cart-summary animate-fadeInUp">
            <h3>Order Summary</h3>
            <div class="summary-row"><span>Subtotal</span><span>${Utils.formatPrice(total)}</span></div>
            ${discount > 0 ? `<div class="summary-row" style="color:#4CAF50"><span>VIP Discount (${discount * 100}%)</span><span>-${Utils.formatPrice(discountAmt)}</span></div>` : ''}
            <div class="summary-row"><span>Delivery</span><span style="color:#4CAF50">FREE</span></div>
            <div class="summary-row total"><span>Total</span><span class="total-price">${Utils.formatPrice(finalTotal)}</span></div>
            <div class="cart-actions">
              <button class="btn btn-gold btn-full" onclick="Pages.placeOrder()">✅ Place Order</button>
              <button class="btn btn-whatsapp btn-full" onclick="Cart.shareOnWhatsApp()">💬 Order via WhatsApp</button>
              <button class="btn btn-ghost btn-full btn-sm" onclick="Cart.clear(); location.hash='#cart'">Clear Cart</button>
            </div>
          </div>
        </div>
      </div>
    </section>`;
  },

  placeOrder() {
    if (Cart.items.length === 0) return;
    const order = {
      id: Utils.generateOrderId(),
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      items: Cart.items.map(i => ({ name: i.name, qty: i.qty, price: i.price })),
      total: Cart.getTotal()
    };
    const orders = JSON.parse(localStorage.getItem('bs-orders') || '[]');
    orders.unshift(order);
    localStorage.setItem('bs-orders', JSON.stringify(orders));
    Auth.addLoyaltyPoints(order.total);
    Cart.clear();
    Utils.toast(`Order ${order.id} placed successfully! 🎉`, 'success');
    window.location.hash = '#orders';
  },

  // ================================================================
  // PAGE 6: GALLERY
  // ================================================================
  gallery() {
    return `
    <section class="page-section gallery-page">
      <div class="container">
        <div class="section-header animate-fadeInUp">
          <h2 class="text-gold">📸 PREMIUM GALLERY</h2>
          <div class="section-divider"></div>
          <p>Our exclusive advertising collection — where luxury meets lifestyle.</p>
        </div>

        <div class="gallery-grid">
          ${GALLERY_IMAGES.map(img => `
            <div class="gallery-item animate-fadeInUp" onclick="Pages.openLightbox('${img.src}')">
              <img src="${img.src}" alt="${img.caption}" loading="lazy">
              <div class="gallery-overlay">
                <div>
                  <div class="gallery-caption">${img.caption}</div>
                  <span class="badge badge-gold" style="margin-top:6px">${img.tag}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>`;
  },

  openLightbox(src) {
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = `
      <button class="lightbox-close" onclick="this.parentElement.remove()">✕</button>
      <img src="${src.replace('w=400', 'w=1200').replace('h=500', 'h=900')}" alt="Gallery Image">
    `;
    lb.addEventListener('click', (e) => { if (e.target === lb) lb.remove(); });
    document.body.appendChild(lb);
  },

  // ================================================================
  // PAGE 7: REVIEWS
  // ================================================================
  reviews() {
    const reviews = JSON.parse(localStorage.getItem('bs-reviews') || JSON.stringify(APP_DATA.sampleReviews));
    const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
    const dist = [5, 4, 3, 2, 1].map(star => {
      const count = reviews.filter(r => r.rating === star).length;
      return { star, count, pct: Math.round((count / reviews.length) * 100) };
    });

    return `
    <section class="page-section reviews-page">
      <div class="container">
        <div class="section-header animate-fadeInUp">
          <h2 class="text-gold">⭐ REVIEWS & RATINGS</h2>
          <div class="section-divider"></div>
        </div>

        <div class="reviews-overview animate-fadeInUp">
          <div class="reviews-avg">
            <div class="avg-number">${avg}</div>
            <div class="avg-stars">${Utils.starsHTML(parseFloat(avg))}</div>
            <div class="avg-total">${reviews.length} reviews</div>
          </div>
          <div class="rating-bars">
            ${dist.map(d => `
              <div class="rating-bar">
                <span class="bar-label">${d.star}★</span>
                <div class="bar-track"><div class="bar-fill" style="width:${d.pct}%"></div></div>
                <span class="bar-pct">${d.pct}%</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="margin-bottom:30px">
          <h3 style="margin-bottom:16px">Write a Review</h3>
          <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:24px">
            <div class="form-group">
              <label class="form-label">Your Rating</label>
              <div class="star-input" id="starInput">
                ${[1, 2, 3, 4, 5].map(i => `<span data-star="${i}" onclick="Pages.setReviewStar(${i})">★</span>`).join('')}
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Your Name</label>
              <input type="text" id="reviewName" class="form-input" placeholder="Enter your name">
            </div>
            <div class="form-group">
              <label class="form-label">Your Review</label>
              <textarea id="reviewText" class="form-textarea" placeholder="Share your experience..."></textarea>
            </div>
            <button class="btn btn-gold" onclick="Pages.submitReview()">Submit Review</button>
          </div>
        </div>

        <div id="reviewsList">
          ${reviews.map(r => `
            <div class="review-card">
              <div class="review-header">
                <div class="review-avatar">${r.name.charAt(0)}</div>
                <div class="review-meta">
                  <div class="review-name">${r.name}</div>
                  <div class="review-date">${Utils.formatDate(r.date)}</div>
                </div>
                ${Utils.starsHTML(r.rating)}
              </div>
              <div class="review-text">${r.text}</div>
              <div class="review-helpful">
                <button class="btn btn-ghost btn-sm" onclick="this.textContent='👍 Helpful (${r.helpful + 1})'">👍 Helpful (${r.helpful})</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>`;
  },

  reviewRating: 0,
  setReviewStar(n) {
    this.reviewRating = n;
    document.querySelectorAll('#starInput span').forEach((s, i) => {
      s.classList.toggle('active', i < n);
    });
  },

  submitReview() {
    const name = document.getElementById('reviewName')?.value;
    const text = document.getElementById('reviewText')?.value;
    if (!name || !text || !this.reviewRating) {
      Utils.toast('Please fill all fields and select a rating!', 'error');
      return;
    }
    const reviews = JSON.parse(localStorage.getItem('bs-reviews') || JSON.stringify(APP_DATA.sampleReviews));
    reviews.unshift({
      id: Date.now(), name, rating: this.reviewRating,
      date: new Date().toISOString().split('T')[0], text, helpful: 0
    });
    localStorage.setItem('bs-reviews', JSON.stringify(reviews));
    Utils.toast('Thank you for your review! ⭐', 'success');
    this.reviewRating = 0;
    window.location.hash = '#reviews';
  },

  // ================================================================
  // PAGE 8: ORDERS
  // ================================================================
  orders() {
    const orders = JSON.parse(localStorage.getItem('bs-orders') || JSON.stringify(APP_DATA.sampleOrders));
    const statusLabels = {
      pending: { icon: '🟡', label: 'Pending', class: 'status-pending' },
      confirmed: { icon: '🟢', label: 'Confirmed', class: 'status-confirmed' },
      preparing: { icon: '⚙️', label: 'Preparing', class: 'status-preparing' },
      ready: { icon: '✅', label: 'Ready', class: 'status-ready' },
      delivered: { icon: '🚚', label: 'Delivered', class: 'status-delivered' }
    };

    if (orders.length === 0) {
      return `
      <section class="page-section orders-page">
        <div class="container">
          <div class="section-header animate-fadeInUp">
            <h2 class="text-gold">📋 MY ORDERS</h2>
            <div class="section-divider"></div>
          </div>
          <div class="empty-state animate-fadeInUp">
            <div class="empty-icon">📋</div>
            <h3>No orders yet</h3>
            <p>Start shopping and your order history will appear here!</p>
            <a href="#menu" class="btn btn-gold">Browse Menu</a>
          </div>
        </div>
      </section>`;
    }

    return `
    <section class="page-section orders-page">
      <div class="container">
        <div class="section-header animate-fadeInUp">
          <h2 class="text-gold">📋 MY ORDERS</h2>
          <div class="section-divider"></div>
          <p>Track and manage your orders</p>
        </div>

        ${orders.map(o => {
      const st = statusLabels[o.status] || statusLabels.pending;
      return `
          <div class="order-card animate-fadeInUp">
            <div class="order-header">
              <div>
                <span class="order-id">${o.id}</span>
                <span class="order-date">${Utils.formatDate(o.date)}</span>
              </div>
              <span class="status ${st.class}">${st.icon} ${st.label}</span>
            </div>
            <div class="order-items">
              ${o.items.map(i => `
                <div class="order-item-row">
                  <span>${i.name} x${i.qty}</span>
                  <span>${Utils.formatPrice(i.price * i.qty)}</span>
                </div>
              `).join('')}
            </div>
            <div class="order-total">
              <span>Total</span>
              <span class="total-amount">${Utils.formatPrice(o.total)}</span>
            </div>
            <div class="order-actions">
              <button class="btn btn-ghost btn-sm" onclick="Pages.reorder('${o.id}')">🔄 Reorder</button>
              ${o.status === 'pending' ? `<button class="btn btn-ghost btn-sm" style="color:var(--red)" onclick="Pages.cancelOrder('${o.id}')">❌ Cancel</button>` : ''}
            </div>
          </div>`;
    }).join('')}
      </div>
    </section>`;
  },

  reorder(orderId) {
    const orders = JSON.parse(localStorage.getItem('bs-orders') || '[]');
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.items.forEach(item => {
        const product = APP_DATA.products.find(p => p.name === item.name);
        if (product) Cart.add(product.id, item.qty);
      });
      Utils.toast('Items added to cart! 🛒', 'success');
    }
  },

  cancelOrder(orderId) {
    let orders = JSON.parse(localStorage.getItem('bs-orders') || '[]');
    orders = orders.filter(o => o.id !== orderId);
    localStorage.setItem('bs-orders', JSON.stringify(orders));
    Utils.toast('Order cancelled', 'info');
    window.location.hash = '#orders';
  },

  // ================================================================
  // PAGE 9: RESERVATIONS
  // ================================================================
  reservations() {
    const reservations = JSON.parse(localStorage.getItem('bs-reservations') || '[]');

    return `
    <section class="page-section reservation-page">
      <div class="container">
        <div class="section-header animate-fadeInUp">
          <h2 class="text-gold">📅 RESERVE A TABLE</h2>
          <div class="section-divider"></div>
          <p>Book your premium dining experience at Blend & Supercar</p>
        </div>

        <div class="reservation-form animate-fadeInUp">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Full Name *</label>
              <input type="text" id="resName" class="form-input" placeholder="Your full name">
            </div>
            <div class="form-group">
              <label class="form-label">Email *</label>
              <input type="email" id="resEmail" class="form-input" placeholder="your@email.com">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Phone *</label>
              <input type="tel" id="resPhone" class="form-input" value="+91-9050426493" placeholder="+91-XXXXXXXXXX">
            </div>
            <div class="form-group">
              <label class="form-label">Party Size *</label>
              <input type="number" id="resParty" class="form-input" min="1" max="20" value="2">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Date *</label>
              <input type="date" id="resDate" class="form-input">
            </div>
            <div class="form-group">
              <label class="form-label">Time *</label>
              <input type="time" id="resTime" class="form-input" value="19:00">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Occasion</label>
            <select id="resOccasion" class="form-select">
              <option value="casual">Casual Visit</option>
              <option value="business">Business Meeting</option>
              <option value="celebration">Celebration</option>
              <option value="date">Date Night</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Supercar Theme Preference</label>
            <select id="resCar" class="form-select">
              <option value="">No preference</option>
              ${APP_DATA.supercarThemes.map(t => `<option value="${t.id}">${t.emoji} ${t.name} Section</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Special Requests</label>
            <textarea id="resRequests" class="form-textarea" placeholder="Any special requirements..."></textarea>
          </div>
          <button class="btn btn-gold btn-lg btn-full" onclick="Pages.submitReservation()">📅 Confirm Reservation</button>
        </div>

        ${reservations.length > 0 ? `
          <div style="margin-top:40px">
            <h3 style="margin-bottom:16px">Your Reservations</h3>
            ${reservations.map(r => `
              <div class="order-card" style="margin-bottom:12px">
                <div class="order-header">
                  <div>
                    <span class="order-id">${r.confirmation}</span>
                    <span class="order-date">${Utils.formatDate(r.date)} at ${r.time}</span>
                  </div>
                  <span class="badge badge-gold">${r.partySize} guests</span>
                </div>
                <p style="font-size:0.85rem;color:var(--text-secondary);margin-top:8px">
                  ${r.occasion} • ${r.name}
                  ${r.car ? ` • ${r.car} section` : ''}
                </p>
                <button class="btn btn-ghost btn-sm" style="margin-top:8px;color:var(--red)" onclick="Pages.cancelReservation('${r.confirmation}')">Cancel</button>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    </section>`;
  },

  submitReservation() {
    const name = document.getElementById('resName')?.value;
    const email = document.getElementById('resEmail')?.value;
    const phone = document.getElementById('resPhone')?.value;
    const date = document.getElementById('resDate')?.value;
    const time = document.getElementById('resTime')?.value;
    const partySize = document.getElementById('resParty')?.value;
    const occasion = document.getElementById('resOccasion')?.value;
    const car = document.getElementById('resCar')?.value;
    const requests = document.getElementById('resRequests')?.value;

    if (!name || !email || !phone || !date || !time) {
      Utils.toast('Please fill all required fields!', 'error');
      return;
    }

    const reservation = {
      confirmation: Utils.generateConfirmation(),
      name, email, phone, date, time,
      partySize: parseInt(partySize),
      occasion, car, requests,
      createdAt: new Date().toISOString()
    };

    const reservations = JSON.parse(localStorage.getItem('bs-reservations') || '[]');
    reservations.unshift(reservation);
    localStorage.setItem('bs-reservations', JSON.stringify(reservations));

    Utils.toast(`Reservation confirmed! ${reservation.confirmation} 🎉`, 'success');
    window.location.hash = '#reservations';
  },

  cancelReservation(confirmation) {
    let reservations = JSON.parse(localStorage.getItem('bs-reservations') || '[]');
    reservations = reservations.filter(r => r.confirmation !== confirmation);
    localStorage.setItem('bs-reservations', JSON.stringify(reservations));
    Utils.toast('Reservation cancelled', 'info');
    window.location.hash = '#reservations';
  },

  // ================================================================
  // PAGE 10: CONTACT
  // ================================================================
  contact() {
    return `
    <section class="page-section contact-page">
      <div class="container">
        <div class="section-header animate-fadeInUp">
          <h2 class="text-gold">📞 CONTACT US</h2>
          <div class="section-divider"></div>
          <p>We'd love to hear from you. Reach out anytime!</p>
        </div>

        <div class="contact-layout">
          <div class="contact-form-wrap animate-fadeInUp">
            <h3 style="margin-bottom:20px">Send us a Message</h3>
            <div class="form-group">
              <label class="form-label">Your Name</label>
              <input type="text" id="contactName" class="form-input" placeholder="Your name">
            </div>
            <div class="form-group">
              <label class="form-label">Email</label>
              <input type="email" id="contactEmail" class="form-input" placeholder="your@email.com">
            </div>
            <div class="form-group">
              <label class="form-label">Subject</label>
              <input type="text" id="contactSubject" class="form-input" placeholder="How can we help?">
            </div>
            <div class="form-group">
              <label class="form-label">Message</label>
              <textarea id="contactMsg" class="form-textarea" placeholder="Write your message..."></textarea>
            </div>
            <button class="btn btn-gold btn-full" onclick="Pages.sendContact()">✉️ Send Message</button>
          </div>

          <div class="contact-info-cards animate-fadeInUp">
            <div class="contact-card">
              <div class="contact-icon">📧</div>
              <div>
                <h4>Email</h4>
                <p><a href="mailto:${APP_DATA.brand.email}">${APP_DATA.brand.email}</a></p>
              </div>
            </div>
            <div class="contact-card">
              <div class="contact-icon">📞</div>
              <div>
                <h4>Phone</h4>
                <p><a href="tel:${APP_DATA.brand.phone}">${APP_DATA.brand.phone}</a></p>
              </div>
            </div>
            <div class="contact-card" style="cursor:pointer" onclick="window.open('https://wa.me/${APP_DATA.brand.phoneRaw}','_blank')">
              <div class="contact-icon">💬</div>
              <div>
                <h4>WhatsApp</h4>
                <p>Message us on WhatsApp</p>
              </div>
            </div>
            <div class="contact-card">
              <div class="contact-icon">📍</div>
              <div>
                <h4>Location</h4>
                <p>${APP_DATA.brand.location}</p>
              </div>
            </div>
            <div class="contact-card">
              <div class="contact-icon">🕐</div>
              <div>
                <h4>Hours</h4>
                <p>Mon-Fri: ${APP_DATA.brand.hours.weekday}<br>Sat-Sun: ${APP_DATA.brand.hours.weekend}</p>
              </div>
            </div>
            <div class="contact-card">
              <div class="contact-icon">🏎️</div>
              <div>
                <h4>Parking</h4>
                <p>Premium parking for supercars</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>`;
  },

  sendContact() {
    const name = document.getElementById('contactName')?.value;
    const email = document.getElementById('contactEmail')?.value;
    const subject = document.getElementById('contactSubject')?.value;
    const msg = document.getElementById('contactMsg')?.value;

    if (!name || !email || !msg) {
      Utils.toast('Please fill all required fields!', 'error');
      return;
    }

    Utils.toast('Message sent successfully! We\'ll get back to you soon. ✅', 'success');

    const waMsg = `📩 Contact Form:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${msg}`;
    if (confirm('Would you also like to send this via WhatsApp for instant response?')) {
      window.open(`https://wa.me/${APP_DATA.brand.phoneRaw}?text=${encodeURIComponent(waMsg)}`, '_blank');
    }
  },

  // ================================================================
  // PAGE 11: VIP MEMBERSHIP
  // ================================================================
  vip() {
    const currentTier = Auth.user?.vipTier;
    const points = Auth.user?.loyaltyPoints || 0;

    return `
    <section class="page-section vip-page">
      <div class="container">
        <div class="section-header animate-fadeInUp">
          <h2 class="text-gold">👑 VIP MEMBERSHIP</h2>
          <div class="section-divider"></div>
          <p>Join our exclusive club and enjoy premium benefits!</p>
        </div>

        <div class="vip-grid">
          ${APP_DATA.vipTiers.map(tier => `
            <div class="vip-card ${tier.id} animate-fadeInUp">
              <div class="vip-icon">${tier.icon}</div>
              <div class="vip-tier">${tier.name}</div>
              <div class="vip-price">${Utils.formatPrice(tier.price)} <span>/year</span></div>
              <ul class="vip-benefits">
                ${tier.benefits.map(b => `<li>✅ ${b}</li>`).join('')}
                ${tier.excluded.map(b => `<li style="opacity:0.4">❌ ${b}</li>`).join('')}
              </ul>
              ${currentTier === tier.id
        ? '<button class="btn btn-ghost btn-full" disabled>Current Plan</button>'
        : `<button class="btn ${tier.featured ? 'btn-gold' : 'btn-outline'} btn-full" onclick="${Auth.isLoggedIn() ? `Auth.upgradeVIP('${tier.id}')` : `location.hash='#login'`}">
                    ${Auth.isLoggedIn() ? 'Upgrade Now' : 'Login to Join'}
                  </button>`
      }
            </div>
          `).join('')}
        </div>

        <div class="loyalty-section">
          <h3 style="margin-bottom:8px">🎯 Loyalty Points</h3>
          <p class="text-muted" style="margin-bottom:16px">Earn points with every purchase. 1 point per ₹10 spent.</p>
          <div class="points">${points.toLocaleString()}</div>
          <p style="margin-top:8px;font-size:0.85rem;color:var(--text-muted)">
            ${Auth.isLoggedIn() ? `You're earning ${Auth.user?.vipTier === 'platinum' ? '3x' : Auth.user?.vipTier === 'gold' ? '2x' : '1x'} points!` : 'Login to start earning points!'}
          </p>
        </div>
      </div>
    </section>`;
  },

  // ================================================================
  // AUTH: LOGIN / SIGNUP
  // ================================================================
  login() {
    return `
    <section class="auth-page">
      <div class="auth-card animate-fadeInUp">
        <h2>Welcome Back</h2>
        <p class="auth-subtitle">Sign in to your Blend & Supercar account</p>
        <div id="authForm">
          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" id="loginEmail" class="form-input" placeholder="your@email.com">
          </div>
          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" id="loginPassword" class="form-input" placeholder="Enter password">
          </div>
          <button class="btn btn-gold btn-full btn-lg" onclick="Pages.handleLogin()">Sign In</button>
          <div class="auth-toggle">
            Don't have an account? <a onclick="Pages.showSignup()">Sign Up</a>
          </div>
        </div>
      </div>
    </section>`;
  },

  showSignup() {
    const form = document.getElementById('authForm');
    if (!form) return;
    form.innerHTML = `
      <div class="form-group">
        <label class="form-label">Full Name</label>
        <input type="text" id="signupName" class="form-input" placeholder="Your full name">
      </div>
      <div class="form-group">
        <label class="form-label">Email</label>
        <input type="email" id="signupEmail" class="form-input" placeholder="your@email.com">
      </div>
      <div class="form-group">
        <label class="form-label">Password</label>
        <input type="password" id="signupPassword" class="form-input" placeholder="Create a password">
      </div>
      <button class="btn btn-gold btn-full btn-lg" onclick="Pages.handleSignup()">Create Account</button>
      <div class="auth-toggle">
        Already have an account? <a onclick="location.hash='#login'">Sign In</a>
      </div>
    `;
    document.querySelector('.auth-card h2').textContent = 'Create Account';
    document.querySelector('.auth-subtitle').textContent = 'Join the Blend & Supercar family';
  },

  handleLogin() {
    const email = document.getElementById('loginEmail')?.value;
    const password = document.getElementById('loginPassword')?.value;
    if (!email || !password) { Utils.toast('Please fill all fields!', 'error'); return; }
    if (Auth.login(email, password)) {
      Utils.toast('Welcome back! 🎉', 'success');
      window.location.hash = '#home';
    }
  },

  handleSignup() {
    const name = document.getElementById('signupName')?.value;
    const email = document.getElementById('signupEmail')?.value;
    const password = document.getElementById('signupPassword')?.value;
    if (!name || !email || !password) { Utils.toast('Please fill all fields!', 'error'); return; }
    if (password.length < 4) { Utils.toast('Password must be at least 4 characters!', 'error'); return; }
    if (Auth.register(name, email, password)) {
      window.location.hash = '#home';
    }
  },

  // ================================================================
  // ADMIN PANEL
  // ================================================================
  admin() {
    const orders = JSON.parse(localStorage.getItem('bs-orders') || JSON.stringify(APP_DATA.sampleOrders));
    const reservations = JSON.parse(localStorage.getItem('bs-reservations') || '[]');
    const reviews = JSON.parse(localStorage.getItem('bs-reviews') || JSON.stringify(APP_DATA.sampleReviews));
    const totalRevenue = orders.reduce((s, o) => s + o.total, 0);

    return `
    <section class="page-section admin-page">
      <div class="container">
        <div class="section-header animate-fadeInUp">
          <h2 class="text-gold">🔐 ADMIN DASHBOARD</h2>
          <div class="section-divider"></div>
        </div>

        <div class="admin-stats">
          <div class="stat-card animate-fadeInUp">
            <div class="stat-number">${orders.length}</div>
            <div class="stat-label">Total Orders</div>
          </div>
          <div class="stat-card animate-fadeInUp">
            <div class="stat-number">${Utils.formatPrice(totalRevenue)}</div>
            <div class="stat-label">Revenue</div>
          </div>
          <div class="stat-card animate-fadeInUp">
            <div class="stat-number">${reservations.length}</div>
            <div class="stat-label">Reservations</div>
          </div>
          <div class="stat-card animate-fadeInUp">
            <div class="stat-number">${reviews.length}</div>
            <div class="stat-label">Reviews</div>
          </div>
        </div>

        <h3 style="margin-bottom:16px">Recent Orders</h3>
        <table class="admin-table">
          <thead>
            <tr><th>Order ID</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            ${orders.map(o => `
              <tr>
                <td><strong>${o.id}</strong></td>
                <td>${Utils.formatDate(o.date)}</td>
                <td>${o.items.map(i => i.name).join(', ')}</td>
                <td style="color:var(--gold);font-weight:700">${Utils.formatPrice(o.total)}</td>
                <td><span class="badge badge-gold">${o.status}</span></td>
                <td>
                  <select class="form-select" style="width:auto;padding:6px 8px;font-size:0.75rem" onchange="Pages.updateOrderStatus('${o.id}', this.value)">
                    <option ${o.status === 'pending' ? 'selected' : ''}>pending</option>
                    <option ${o.status === 'confirmed' ? 'selected' : ''}>confirmed</option>
                    <option ${o.status === 'preparing' ? 'selected' : ''}>preparing</option>
                    <option ${o.status === 'ready' ? 'selected' : ''}>ready</option>
                    <option ${o.status === 'delivered' ? 'selected' : ''}>delivered</option>
                  </select>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        ${reservations.length > 0 ? `
          <h3 style="margin:30px 0 16px">Reservations</h3>
          <table class="admin-table">
            <thead>
              <tr><th>Confirmation</th><th>Name</th><th>Date</th><th>Time</th><th>Guests</th><th>Occasion</th></tr>
            </thead>
            <tbody>
              ${reservations.map(r => `
                <tr>
                  <td><strong>${r.confirmation}</strong></td>
                  <td>${r.name}</td>
                  <td>${Utils.formatDate(r.date)}</td>
                  <td>${r.time}</td>
                  <td>${r.partySize}</td>
                  <td>${r.occasion}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        ` : ''}
      </div>
    </section>`;
  },

  updateOrderStatus(orderId, status) {
    const orders = JSON.parse(localStorage.getItem('bs-orders') || '[]');
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      localStorage.setItem('bs-orders', JSON.stringify(orders));
      Utils.toast(`Order ${orderId} updated to ${status}`, 'success');
    }
  }
};
