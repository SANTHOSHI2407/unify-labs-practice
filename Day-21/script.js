
    <script>
        // Settings Module
        const Settings = {
            // Default settings
            defaults: {
                theme: 'light',
                notifications: true,
                language: 'en'
            },

            // Save settings to localStorage
            save(settings) {
                try {
                    const data = JSON.stringify(settings);
                    localStorage.setItem('userSettings', data);
                    this.showStatus('Settings saved successfully!', 'success');
                    return true;
                } catch (error) {
                    console.error('Save error:', error);
                    this.showStatus('Failed to save settings', 'error');
                    return false;
                }
            },

            // Load settings from localStorage
            load() {
                try {
                    const data = localStorage.getItem('userSettings');
                    if (!data) {
                        return this.defaults;
                    }
                    const settings = JSON.parse(data);
                    // Merge with defaults to ensure all keys exist
                    return { ...this.defaults, ...settings };
                } catch (error) {
                    console.error('Load error:', error);
                    return this.defaults;
                }
            },

            // Reset to default settings
            reset() {
                localStorage.removeItem('userSettings');
                this.showStatus('Settings reset to default!', 'success');
                return this.defaults;
            },

            // Show status message
            showStatus(message, type = 'success') {
                const statusEl = document.getElementById('status');
                statusEl.textContent = message;
                statusEl.className = `status ${type} show`;
                setTimeout(() => {
                    statusEl.classList.remove('show');
                }, 3000);
            }
        };

        // Initialize app
        function init() {
            const savedSettings = Settings.load();
            applyTheme(savedSettings.theme);
            setupEventListeners();
        }

        // Apply theme to document
        function applyTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            document.getElementById('themeToggle').classList.toggle('active', theme === 'dark');
        }

        // Setup event listeners
        function setupEventListeners() {
            const toggle = document.getElementById('themeToggle');
            const saveBtn = document.getElementById('saveBtn');
            const loadBtn = document.getElementById('loadBtn');
            const resetBtn = document.getElementById('resetBtn');

            // Theme toggle
            toggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                applyTheme(newTheme);
                
                // Auto-save theme change
                const settings = Settings.load();
                settings.theme = newTheme;
                Settings.save(settings);
            });

            // Save button
            saveBtn.addEventListener('click', () => {
                const settings = {
                    theme: document.documentElement.getAttribute('data-theme'),
                    notifications: true, // Could add more settings here
                    language: 'en'
                };
                Settings.save(settings);
            });

            // Load button
            loadBtn.addEventListener('click', () => {
                const settings = Settings.load();
                applyTheme(settings.theme);
                Settings.showStatus('Settings loaded successfully!', 'success');
            });

            // Reset button
            resetBtn.addEventListener('click', () => {
                const defaults = Settings.reset();
                applyTheme(defaults.theme);
            });
        }

        // Start the app
        init();
    </script>