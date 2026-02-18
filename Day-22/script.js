   <script type="module">
        // API.js - Data Module
        const API = {
            BASE_URL: 'https://api.coingecko.com/api/v3/coins/markets',
            async fetchCoins() {
                const params = new URLSearchParams({
                    vs_currency: 'usd',
                    order: 'market_cap_desc',
                    per_page: '50',
                    page: '1',
                    sparkline: 'false',
                    price_change_percentage: '24h'
                });

                try {
                    const response = await fetch(`${this.BASE_URL}?${params}`);
                    if (!response.ok) throw new Error(`API Error: ${response.status}`);
                    return await response.json();
                } catch (error) {
                    throw new Error(`Network error: ${error.message}`);
                }
            }
        };

        // UI.js - Rendering Module
        const UI = {
            elements: {
                loading: document.getElementById('loading'),
                content: document.getElementById('content'),
                error: document.getElementById('error'),
                searchInput: document.getElementById('searchInput'),
                sortSelect: document.getElementById('sortSelect'),
                themeToggle: document.getElementById('themeToggle'),
                favoritesSection: document.getElementById('favoritesSection'),
                favoritesGrid: document.getElementById('favoritesGrid')
            },

            showLoading() {
                this.elements.loading.style.display = 'flex';
                this.elements.content.style.display = 'none';
                this.elements.error.style.display = 'none';
            },

            hideLoading() {
                this.elements.loading.style.display = 'none';
            },

            showError(message) {
                this.elements.error.textContent = `${message}. Please check your connection and try again.`;
                this.elements.error.style.display = 'block';
                this.elements.content.style.display = 'none';
                this.hideLoading();
            },

            showContent() {
                this.elements.content.style.display = 'grid';
                this.elements.error.style.display = 'none';
                this.hideLoading();
            },

            renderCoins(coins) {
                const html = coins.map(coin => `
                    <div class="card" data-id="${coin.id}" data-symbol="${coin.symbol}">
                        <div class="card-header">
                            <div>
                                <h3 class="card-title">${coin.name} (${coin.symbol.toUpperCase()})</h3>
                                <img src="${coin.image}" alt="${coin.name}" style="width: 32px; height: 32px; border-radius: 50%;">
                            </div>
                            <div class="card-price">$${coin.current_price.toLocaleString()}</div>
                        </div>
                        <div class="card-change ${coin.price_change_percentage_24h >= 0 ? 'change-up' : 'change-down'}">
                            ${coin.price_change_percentage_24h >= 0 ? '📈' : '📉'} ${coin.price_change_percentage_24h.toFixed(2)}%
                        </div>
                        <div class="card-actions">
                            <button class="btn btn-primary" onclick="App.addToFavorites('${coin.id}')">
                                 Watchlist
                            </button>
                            <button class="btn btn-secondary" onclick="App.refreshData()">Refresh</button>
                        </div>
                    </div>
                `).join('');
                this.elements.content.innerHTML = html;
                this.showContent();
            },

            renderFavorites(favorites) {
                if (favorites.length === 0) {
                    this.elements.favoritesSection.style.display = 'none';
                    return;
                }
                this.elements.favoritesSection.style.display = 'block';
                const html = favorites.map(id => {
                    const coin = State.coins.find(c => c.id === id);
                    if (!coin) return '';
                    return `
                        <div class="card" data-id="${coin.id}">
                            <div class="card-header">
                                <h3 class="card-title">${coin.name}</h3>
                                <div class="card-price">$${coin.current_price.toLocaleString()}</div>
                            </div>
                            <button class="btn btn-favorite active" onclick="App.removeFromFavorites('${coin.id}')">
                                 Remove
                            </button>
                        </div>
                    `;
                }).join('');
                this.elements.favoritesGrid.innerHTML = html;
            },

            applyTheme(theme) {
                document.documentElement.setAttribute('data-theme', theme);
            }
        };

        // App.js - State & Events Module
        const State = {
            coins: [],
            favorites: [],
            theme: 'light',
            sortBy: 'market_cap_desc',

            init() {
                this.loadState();
                UI.applyTheme(this.theme);
                this.attachEvents();
                this.fetchData();
            },

            async fetchData() {
                UI.showLoading();
                try {
                    this.coins = await API.fetchCoins();
                    this.filterAndSort();
                    UI.renderCoins(this.filteredCoins);
                    UI.renderFavorites(this.favorites);
                } catch (error) {
                    UI.showError(error.message);
                }
            },

            filterAndSort() {
                let filtered = [...this.coins];
                
                // Search filter
                const searchTerm = UI.elements.searchInput.value.toLowerCase();
                if (searchTerm) {
                    filtered = filtered.filter(coin => 
                        coin.name.toLowerCase().includes(searchTerm) ||
                        coin.symbol.toLowerCase().includes(searchTerm)
                    );
                }

                // Sort
                const sortBy = UI.elements.sortSelect.value;
                filtered.sort((a, b) => {
                    switch (sortBy) {
                        case 'market_cap_asc':
                            return a.market_cap - b.market_cap;
                        case 'market_cap_desc':
                            return b.market_cap - a.market_cap;
                        case 'price_asc':
                            return a.current_price - b.current_price;
                        case 'price_desc':
                            return b.current_price - a.current_price;
                        case 'name':
                            return a.name.localeCompare(b.name);
                        default:
                            return 0;
                    }
                });

                this.filteredCoins = filtered;
            },

            addToFavorites(coinId) {
                if (!this.favorites.includes(coinId)) {
                    this.favorites.push(coinId);
                    this.saveState();
                    UI.renderFavorites(this.favorites);
                }
            },

            removeFromFavorites(coinId) {
                this.favorites = this.favorites.filter(id => id !== coinId);
                this.saveState();
                UI.renderFavorites(this.favorites);
            },

            toggleTheme() {
                this.theme = this.theme === 'light' ? 'dark' : 'light';
                UI.applyTheme(this.theme);
                this.saveState();
            },

            saveState() {
                const state = {
                    favorites: this.favorites,
                    theme: this.theme,
                    sortBy: this.sortBy
                };
                localStorage.setItem('cryptoDashboard', JSON.stringify(state));
            },

            loadState() {
                try {
                    const saved = localStorage.getItem('cryptoDashboard');
                    if (saved) {
                        const state = JSON.parse(saved);
                        this.favorites = state.favorites || [];
                        this.theme = state.theme || 'light';
                        this.sortBy = state.sortBy || 'market_cap_desc';
                    }
                } catch (e) {
                    console.error('Failed to load state:', e);
                }
            },

            attachEvents() {
                // Search
                UI.elements.searchInput.addEventListener('input', (e) => {
                    this.filterAndSort();
                    UI.renderCoins(this.filteredCoins);
                });

                // Sort
                UI.elements.sortSelect.addEventListener('change', (e) => {
                    this.sortBy = e.target.value;
                    this.filterAndSort();
                    UI.renderCoins(this.filteredCoins);
                });

                // Theme toggle
                UI.elements.themeToggle.addEventListener('click', () => {
                    this.toggleTheme();
                });

                // Refresh on Enter in search
                UI.elements.searchInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.fetchData();
                    }
                });
            }
        };

        // Global App methods for onclick handlers
        window.App = {
            addToFavorites: State.addToFavorites.bind(State),
            removeFromFavorites: State.removeFromFavorites.bind(State),
            refreshData: State.fetchData.bind(State)
        };

        // Initialize
        State.init();
    </script>