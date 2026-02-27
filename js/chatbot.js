// ===================================================
// BLEND & SUPERCAR - Mood Chatbot
// ===================================================

const Chatbot = {
    messages: [],

    init() {
        this.messages = [];
        this.addBotMessage(this.getGreeting());
        this.renderMessages();
        this.bindEvents();
    },

    getGreeting() {
        const time = Utils.getTimeOfDay();
        const greetings = {
            morning: '☀️ Good morning! I\'m Priya Saini, your personal Blend & Supercar assistant. How are you feeling today? I\'ll suggest the perfect products for your mood!',
            afternoon: '🌤️ Good afternoon! I\'m Priya Saini — ready to discover your perfect match? Tell me your mood and I\'ll suggest something amazing!',
            evening: '🌅 Good evening! I\'m Priya Saini. Let me help you find the perfect treat for tonight. How are you feeling?',
            night: '🌙 Late night cravings? I\'m Priya Saini, here to help! Share your mood and I\'ll find you something perfect.'
        };
        return greetings[time] || greetings.morning;
    },

    addBotMessage(text, products = null) {
        this.messages.push({ type: 'bot', text, products, time: new Date() });
    },

    addUserMessage(text) {
        this.messages.push({ type: 'user', text, time: new Date() });
    },

    processInput(input) {
        if (!input.trim()) return;

        this.addUserMessage(input);
        this.renderMessages();

        // Show typing indicator
        this.showTyping();

        setTimeout(() => {
            this.hideTyping();
            const response = this.analyzeMessage(input.toLowerCase());
            this.addBotMessage(response.text, response.products);
            this.renderMessages();
            this.scrollToBottom();
        }, 1000 + Math.random() * 500);
    },

    analyzeMessage(input) {
        // Mood detection
        const moodMap = {
            happy: ['happy', 'great', 'amazing', 'awesome', 'wonderful', 'excited', 'joy', 'glad', 'cheerful', 'fantastic'],
            sad: ['sad', 'down', 'depressed', 'unhappy', 'lonely', 'tired', 'upset', 'blue', 'stressed'],
            energetic: ['energetic', 'active', 'pumped', 'fired', 'motivated', 'power', 'strong', 'workout', 'gym'],
            calm: ['calm', 'relaxed', 'peaceful', 'chill', 'quiet', 'zen', 'meditate', 'easy'],
            party: ['party', 'celebrate', 'fun', 'friends', 'birthday', 'event', 'night out', 'festive']
        };

        let detectedMood = null;
        for (const [mood, keywords] of Object.entries(moodMap)) {
            if (keywords.some(k => input.includes(k))) {
                detectedMood = mood;
                break;
            }
        }

        // Product type detection
        const productKeywords = {
            Coffee: ['coffee', 'espresso', 'latte', 'cappuccino', 'brew', 'caffeine'],
            Food: ['food', 'eat', 'hungry', 'lunch', 'dinner', 'breakfast', 'meal', 'steak', 'pasta'],
            Dessert: ['sweet', 'dessert', 'cake', 'chocolate', 'pastry', 'brownie', 'cookie'],
            Beverage: ['drink', 'juice', 'tea', 'smoothie', 'beverage', 'thirsty']
        };

        let detectedCategory = null;
        for (const [cat, keywords] of Object.entries(productKeywords)) {
            if (keywords.some(k => input.includes(k))) {
                detectedCategory = cat;
                break;
            }
        }

        // Generate response
        if (detectedMood) {
            const moodData = APP_DATA.chatResponses[detectedMood];
            const productIds = moodData.products;
            const products = productIds.map(id => APP_DATA.products.find(p => p.id === id)).filter(Boolean);
            return { text: moodData.greeting, products };
        }

        if (detectedCategory) {
            const products = APP_DATA.products.filter(p => p.category === detectedCategory).slice(0, 4);
            return {
                text: `Here are some amazing ${detectedCategory.toLowerCase()} options for you! 🎯`,
                products
            };
        }


        // Time-based suggestion
        if (input.includes('suggest') || input.includes('recommend') || input.includes('what should')) {
            const time = Utils.getTimeOfDay();
            const timeData = APP_DATA.timeBasedSuggestions[time];
            const products = timeData.products.map(id => APP_DATA.products.find(p => p.id === id)).filter(Boolean);
            return { text: timeData.text, products };
        }

        // Help / menu
        if (input.includes('menu') || input.includes('all') || input.includes('everything')) {
            return {
                text: "Here's a selection of our finest offerings! Use the mood buttons above for personalized suggestions. 🌟",
                products: APP_DATA.products.slice(0, 4)
            };
        }

        // Default response
        return {
            text: "I'd love to help you find something perfect! Try telling me your mood (happy, sad, energetic, calm, party) or what type of product you're looking for (coffee, food, dessert, beverage). You can also use the quick mood buttons above! 😊",
            products: null
        };
    },

    selectMood(mood) {
        this.addUserMessage(`I'm feeling ${mood}`);
        this.renderMessages();
        this.showTyping();

        setTimeout(() => {
            this.hideTyping();
            const moodData = APP_DATA.chatResponses[mood];
            if (moodData) {
                const products = moodData.products.map(id => APP_DATA.products.find(p => p.id === id)).filter(Boolean);
                this.addBotMessage(moodData.greeting, products);
            }
            this.renderMessages();
            this.scrollToBottom();
        }, 800);
    },

    renderMessages() {
        const container = document.getElementById('chatMessages');
        if (!container) return;

        container.innerHTML = this.messages.map(msg => {
            if (msg.type === 'user') {
                return `<div class="chat-bubble user">${msg.text}</div>`;
            }
            let html = `<div class="chat-bubble bot">${msg.text}`;
            if (msg.products && msg.products.length > 0) {
                html += '<div class="chat-products">';
                msg.products.forEach(p => {
                    html += `
            <div class="chat-product-card" onclick="Cart.add(${p.id})">
              <img src="${p.img}" alt="${p.name}" loading="lazy">
              <div class="cp-body">
                <div class="cp-name">${p.name}</div>
                <div class="cp-price">${Utils.formatPrice(p.price)}</div>
              </div>
            </div>`;
                });
                html += '</div>';
            }
            html += '</div>';
            return html;
        }).join('');
    },

    showTyping() {
        const container = document.getElementById('chatMessages');
        if (!container) return;
        const typing = document.createElement('div');
        typing.className = 'chat-bubble bot';
        typing.id = 'typingIndicator';
        typing.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
        container.appendChild(typing);
        this.scrollToBottom();
    },

    hideTyping() {
        document.getElementById('typingIndicator')?.remove();
    },

    scrollToBottom() {
        const container = document.getElementById('chatMessages');
        if (container) {
            setTimeout(() => { container.scrollTop = container.scrollHeight; }, 50);
        }
    },

    bindEvents() {
        const input = document.getElementById('chatInput');
        const sendBtn = document.getElementById('chatSendBtn');

        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') { this.processInput(input.value); input.value = ''; }
            });
        }
        if (sendBtn) {
            sendBtn.addEventListener('click', () => {
                if (input) { this.processInput(input.value); input.value = ''; }
            });
        }

        // Mood buttons
        document.querySelectorAll('.mood-btn').forEach(btn => {
            btn.addEventListener('click', () => this.selectMood(btn.dataset.mood));
        });
    }
};
