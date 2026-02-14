
    <script>
        class Pet {
            #name;
            #type;
            #health;

            constructor(name, type, health = 50) {
                this.#name = name;
                this.#type = type;
                this.#health = Math.max(0, Math.min(100, health));
            }

            // Getter for health
            get health() {
                return this.#health;
            }

            // Private setter logic for health bounds
            #setHealth(value) {
                this.#health = Math.max(0, Math.min(100, value));
            }

            feed() {
                this.#setHealth(this.#health + 20);
                document.getElementById('statusMsg').textContent = `${this.#name} ate happily!`;
                this.#updateDisplay();
            }

            play() {
                this.#setHealth(this.#health - 10);
                document.getElementById('statusMsg').textContent = `${this.#name} played and got tired.`;
                this.#updateDisplay();
            }

            getStatus() {
                document.getElementById('statusMsg').textContent = 
                    `Name: ${this.#name}, Type: ${this.#type}, Health: ${this.#health}`;
            }

            #updateDisplay() {
                document.getElementById('petHealth').textContent = this.#health;
                document.getElementById('healthFill').style.width = this.#health + '%';
            }

            // Public getters for name and type
            get name() { return this.#name; }
            get type() { return this.#type; }
        }

        // Initialize pet
        const myPet = new Pet('Buddy', 'Dog');
        document.getElementById('petName').textContent = myPet.name;
        document.getElementById('petType').textContent = myPet.type;
        document.getElementById('petHealth').textContent = myPet.health;
        document.getElementById('healthFill').style.width = myPet.health + '%';
    </script>