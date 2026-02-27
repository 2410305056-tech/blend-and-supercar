// ===================================================
// BLEND & SUPERCAR - Product & App Data
// ===================================================

const APP_DATA = {
    brand: {
        name: 'BLEND & SUPERCAR',
        tagline: 'Moscow Elite | Luxury Coffee | Supercar Culture | Bangalore',
        email: '2410305056@geetauniversity.edu.in',
        phone: '+91-9050426493',
        phoneRaw: '919050426493',
        location: 'Premium Supercar District, Bangalore',
        hours: { weekday: '6AM - 11PM', weekend: '8AM - 12AM' }
    },

    // Using standard YouTube video IDs (not music.youtube.com)
    musicTracks: [
        { id: 'jfKfPfyJRdk', title: 'Lofi Coffee Vibes', artist: 'Blend & Supercar Radio' },
        { id: 'rUxyKA_-grg', title: 'Midnight Jazz', artist: 'Blend & Supercar Radio' },
        { id: '5qap5aO4i9A', title: 'Chill Drive', artist: 'Blend & Supercar Radio' },
        { id: 'lTRiuFIWV54', title: 'Elegant Evening', artist: 'Blend & Supercar Radio' }
    ],

    supercarThemes: [
        { id: 'ferrari', name: 'Ferrari', color: '#E53935', accent: '#FF6659', emoji: '🏎️' },
        { id: 'lamborghini', name: 'Lamborghini', color: '#FFD700', accent: '#FFEB3B', emoji: '🐂' },
        { id: 'porsche', name: 'Porsche', color: '#1a1a1a', accent: '#555', emoji: '🚗' },
        { id: 'bugatti', name: 'Bugatti', color: '#0d0d0d', accent: '#D4AF37', emoji: '👑' },
        { id: 'mclaren', name: 'McLaren', color: '#FF6600', accent: '#FF8C00', emoji: '⚡' }
    ],

    blendBackgrounds: [
        { id: 'blur', name: 'Blend Blur', desc: 'Soft blurred background' },
        { id: 'gradient', name: 'Blend Gradient', desc: 'Color gradient background' },
        { id: 'dark', name: 'Blend Dark', desc: 'Dark luxury background' },
        { id: 'light', name: 'Blend Light', desc: 'Light premium background' }
    ],

    productTypes: [
        { id: 'cup', name: 'Coffee Cup' },
        { id: 'tshirt', name: 'Merchandise (T-shirt)' },
        { id: 'poster', name: 'Premium Poster' },
        { id: 'vipcard', name: 'VIP Card' },
        { id: 'billboard', name: 'Billboard' }
    ],

    categories: ['All', 'Coffee', 'Food', 'Dessert', 'Beverage'],

    products: [
        // ---- Coffee Blends ----
        { id: 1, name: 'MOSCOW MIDNIGHT', desc: 'Ethiopian Dark Roast', price: 220, category: 'Coffee', rating: 4.8, img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80', badge: '' },
        { id: 2, name: 'FERRARI RED', desc: 'Italian Espresso Blend', price: 240, category: 'Coffee', rating: 4.7, img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80', badge: '' },
        { id: 3, name: 'LAMBORGHINI GOLD', desc: 'Premium Golden Crema', price: 260, category: 'Coffee', rating: 4.9, img: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400&q=80', badge: 'Popular' },
        { id: 4, name: 'BUGATTI BLACK', desc: 'Ultra-Premium Dark Blend', price: 320, category: 'Coffee', rating: 4.9, img: 'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=400&q=80', badge: 'Premium' },
        { id: 5, name: 'PORSCHE PRECISION', desc: 'Perfectly Balanced', price: 300, category: 'Coffee', rating: 4.6, img: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&q=80', badge: '' },
        { id: 6, name: 'MCLAREN SPEED', desc: 'Fast & Powerful Shot', price: 310, category: 'Coffee', rating: 4.5, img: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?w=400&q=80', badge: '' },
        { id: 7, name: 'RUSSIAN ARISTOCRAT', desc: 'Rare Blend with Gold Leaf', price: 500, category: 'Coffee', rating: 5.0, img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=80', badge: 'Exclusive' },
        { id: 8, name: 'SUPERCAR SYMPHONY', desc: '5-Bean Premium Blend', price: 450, category: 'Coffee', rating: 4.8, img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80', badge: 'New' },

        // ---- Food & Cuisine ----
        { id: 9, name: 'TURBO BREAKFAST', desc: 'Eggs, Bacon, Toast, Fruits', price: 450, category: 'Food', rating: 4.7, img: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=400&q=80', badge: '' },
        { id: 10, name: 'RUSSIAN POWER', desc: 'Caviar Toast, Smoked Salmon', price: 650, category: 'Food', rating: 4.9, img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80', badge: 'Premium' },
        { id: 11, name: 'SPEED PASTA', desc: 'Handmade, Premium Sauce', price: 480, category: 'Food', rating: 4.6, img: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&q=80', badge: '' },
        { id: 12, name: 'LUXURY SALAD', desc: 'Caesar, Premium Cheese', price: 350, category: 'Food', rating: 4.4, img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80', badge: '' },
        { id: 13, name: 'GOURMET SANDWICH', desc: 'Artisan Bread, Premium Fillings', price: 420, category: 'Food', rating: 4.5, img: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&q=80', badge: '' },
        { id: 14, name: 'PREMIUM STEAK', desc: 'Chef Special, Rare Quality', price: 750, category: 'Food', rating: 4.9, img: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&q=80', badge: "Chef's Special" },

        // ---- Desserts & Pastries ----
        { id: 15, name: 'CHOCOLATE TURBO', desc: 'Rich Chocolate, Gold Leaf', price: 200, category: 'Dessert', rating: 4.8, img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80', badge: '' },
        { id: 16, name: 'RUSSIAN HONEY CAKE', desc: 'Traditional Premium Recipe', price: 250, category: 'Dessert', rating: 4.7, img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80', badge: 'Traditional' },
        { id: 17, name: 'TIRAMISU ELITE', desc: 'Premium Mascarpone', price: 220, category: 'Dessert', rating: 4.6, img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80', badge: '' },
        { id: 18, name: 'CROISSANT PERFECTION', desc: 'French Butter Croissant', price: 150, category: 'Dessert', rating: 4.5, img: 'https://images.unsplash.com/photo-1549996647-190b679b33d7?w=400&q=80', badge: '' },
        { id: 19, name: 'BERRY TART LUXURY', desc: 'Fresh Berries, Premium Custard', price: 200, category: 'Dessert', rating: 4.7, img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80', badge: '' },
        { id: 20, name: 'BROWNIE PERFORMANCE', desc: 'Premium Cocoa, Molten Center', price: 180, category: 'Dessert', rating: 4.4, img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80', badge: '' },
        { id: 21, name: 'VANILLA CHEESECAKE', desc: 'Premium Cream Cheese', price: 240, category: 'Dessert', rating: 4.8, img: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=400&q=80', badge: 'Popular' },
        { id: 22, name: 'GOLD LEAF ECLAIR', desc: 'Chocolate, Gold Finish', price: 280, category: 'Dessert', rating: 4.9, img: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=400&q=80', badge: 'Exclusive' },

        // ---- Beverages ----
        { id: 23, name: 'FRESH ORANGE JUICE', desc: 'Freshly Squeezed', price: 150, category: 'Beverage', rating: 4.3, img: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&q=80', badge: '' },
        { id: 24, name: 'PREMIUM ICED TEA', desc: 'Natural Flavors', price: 160, category: 'Beverage', rating: 4.4, img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80', badge: '' },
        { id: 25, name: 'HOT CHOCOLATE ELITE', desc: 'Rich Premium Cocoa', price: 220, category: 'Beverage', rating: 4.7, img: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400&q=80', badge: '' },
        { id: 26, name: 'SMOOTHIE BLEND', desc: 'Fresh Fruits, Premium Yogurt', price: 200, category: 'Beverage', rating: 4.5, img: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&q=80', badge: '' },
        { id: 27, name: 'CHAMPAGNE COCKTAIL', desc: 'Coffee + Luxury Blend', price: 350, category: 'Beverage', rating: 4.8, img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=80', badge: 'Signature' }
    ],

    // ---- Chatbot Mood Responses ----
    chatResponses: {
        happy: {
            greeting: "Amazing! Let's keep the good vibes going! Here are some products perfect for your happy mood! ☀️",
            products: [3, 8, 18, 27]
        },
        sad: {
            greeting: "I'm here for you. Let me suggest some comfort treats to make you feel better... 🤗",
            products: [25, 15, 16, 21]
        },
        energetic: {
            greeting: "You're on fire! Here are some power-packed items to match your energy! ⚡",
            products: [4, 6, 9, 26]
        },
        calm: {
            greeting: "Time to relax and unwind. Here are some soothing choices for you... 🧘",
            products: [5, 24, 17, 12]
        },
        party: {
            greeting: "Let's celebrate! Here are the ultimate party picks! 🎉",
            products: [7, 27, 14, 22]
        }
    },

    timeBasedSuggestions: {
        morning: { text: "Good morning! ☕ Nothing like a great coffee to start your day!", products: [1, 2, 9, 18] },
        afternoon: { text: "Afternoon pick-me-up coming right up! 🌤️", products: [5, 12, 23, 26] },
        evening: { text: "Evening vibes call for something special... 🌅", products: [7, 11, 27, 19] },
        night: { text: "Late night cravings? We've got you covered! 🌙", products: [25, 15, 16, 4] }
    },

    // ---- VIP Tiers ----
    vipTiers: [
        {
            id: 'silver', name: 'SILVER', icon: '🥈', price: 999, color: '#C0C0C0',
            benefits: ['10% discount on all products', 'Free delivery', 'Birthday special treat', 'Earn loyalty points'],
            excluded: ['Priority support', 'Free customization', 'Exclusive products', 'Event invitations']
        },
        {
            id: 'gold', name: 'GOLD', icon: '🥇', price: 1999, color: '#D4AF37', featured: true,
            benefits: ['15% discount on all products', 'Free delivery', 'Priority support', 'Birthday special treat', 'Free product customization', 'Earn 2x loyalty points'],
            excluded: ['Exclusive products', 'Event invitations']
        },
        {
            id: 'platinum', name: 'PLATINUM', icon: '💎', price: 3999, color: '#6c5ce7',
            benefits: ['20% discount on all products', 'Free delivery', 'Priority support', 'Birthday special treat', 'Free customization', 'Exclusive products access', 'Invitation to events', 'Earn 3x loyalty points'],
            excluded: []
        }
    ],

    // ---- Sample Reviews ----
    sampleReviews: [
        { id: 1, name: 'Arjun M.', rating: 5, date: '2026-02-20', text: 'The BUGATTI BLACK coffee is absolutely exceptional! The rich, deep flavor and premium presentation make this place stand out from any cafe I\'ve visited. 5 stars all the way!', helpful: 12 },
        { id: 2, name: 'Priya S.', rating: 5, date: '2026-02-18', text: 'The atmosphere is unmatched. The supercar theme combined with premium Russian elegance creates a truly unique dining experience. The RUSSIAN HONEY CAKE is to die for!', helpful: 8 },
        { id: 3, name: 'Rahul K.', rating: 4, date: '2026-02-15', text: 'Amazing coffee selection and the Photo Game feature is such a creative touch! My friends loved seeing their names on custom products. Great experience overall.', helpful: 6 },
        { id: 4, name: 'Sneha R.', rating: 5, date: '2026-02-12', text: 'VIP Gold membership is worth every penny. The 15% discount, priority service, and birthday treats make you feel like royalty. LAMBORGHINI GOLD coffee is my favorite!', helpful: 15 },
        { id: 5, name: 'Vikram P.', rating: 4, date: '2026-02-10', text: 'The PREMIUM STEAK was cooked to perfection. Loved the luxury ambiance and the music selection playing in the background. Will definitely come back!', helpful: 4 },
        { id: 6, name: 'Ananya D.', rating: 5, date: '2026-02-08', text: 'This cafe redefines luxury dining in Bangalore. Every detail from the supercar-themed decor to the gold-leaf desserts screams premium quality. Absolutely love it!', helpful: 20 }
    ],

    // ---- Sample Orders ----
    sampleOrders: [
        {
            id: 'BS-2026-001', date: '2026-02-25', status: 'delivered',
            items: [{ name: 'BUGATTI BLACK', qty: 2, price: 320 }, { name: 'CROISSANT PERFECTION', qty: 1, price: 150 }],
            total: 790
        },
        {
            id: 'BS-2026-002', date: '2026-02-27', status: 'preparing',
            items: [{ name: 'RUSSIAN ARISTOCRAT', qty: 1, price: 500 }, { name: 'GOLD LEAF ECLAIR', qty: 2, price: 280 }],
            total: 1060
        }
    ]
};

// ---- Gallery Images ----
const GALLERY_IMAGES = [
    { id: 1, src: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=500&fit=crop&q=80', caption: 'Premium Coffee Experience', tag: 'Featured in Our Ads' },
    { id: 2, src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop&q=80', caption: 'Luxury Cafe Moments', tag: 'Featured in Our Ads' },
    { id: 3, src: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=500&fit=crop&q=80', caption: 'Artisan Pastry Collection', tag: 'Featured in Our Ads' },
    { id: 4, src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop&q=80', caption: 'Supercar Lifestyle', tag: 'Featured in Our Ads' },
    { id: 5, src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop&q=80', caption: 'Exclusive Merchandise', tag: 'Featured in Our Ads' },
    { id: 6, src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop&q=80', caption: 'Premium Setting', tag: 'Featured in Our Ads' },
    { id: 7, src: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=500&fit=crop&q=80', caption: 'Celebration Events', tag: 'Featured in Our Ads' },
    { id: 8, src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&q=80', caption: 'Supercar & Cafe Culture', tag: 'Featured in Our Ads' }
];

// ---- Supercar Images ----
const SUPERCAR_IMAGES = [
    { name: 'Ferrari', color: '#E53935', img: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=500&fit=crop&q=80', tag: 'Italian Power' },
    { name: 'Lamborghini', color: '#FFD700', img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=500&fit=crop&q=80', tag: 'Unmatched Speed' },
    { name: 'Porsche', color: '#1a1a1a', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=500&fit=crop&q=80', tag: 'German Precision' },
    { name: 'Bugatti', color: '#0d0d0d', img: 'https://images.unsplash.com/photo-1566473965997-3de9c817e938?w=400&h=500&fit=crop&q=80', tag: 'Ultimate Luxury' },
    { name: 'McLaren', color: '#FF6600', img: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=400&h=500&fit=crop&q=80', tag: 'British Excellence' }
];
