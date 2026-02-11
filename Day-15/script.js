   <script>
        const output = document.getElementById('output');
        function print(text, className = '') {
            const div = document.createElement('div');
            div.className = className;
            div.textContent = text + '\n';
            output.appendChild(div);
            output.scrollTop = output.scrollHeight;
        }

        // Step 1: Boot Sequence
        const MASTER_PIN = '9999';
        let attempts = 0;
        let authenticated = false;
        while (attempts < 3) {
            const pin = prompt('ENTER MASTER PIN:');
            attempts++;
            if (pin === MASTER_PIN) {
                authenticated = true;
                // ASCII Banner using string concatenation
                const banner = '' +
                    '  ___  ____ _____   ____ \n' +
                    ' / _ \\/ ___|_   _| / ___|\n' +
                    '| | | \\___ \\ | |   \\___ \\\n' +
                    '| |_| |___) || |    ___) |\n' +
                    ' \\___/|____/ |_|   |____/ \n' +
                    '     v1.0 - SECURE CORE  \n';
                print(banner, 'banner success');
                print('SYSTEM AUTHENTICATED. ACCESS GRANTED.', 'success');
                break;
            } else if (attempts < 3) {
                print(`INCORRECT PIN. ATTEMPTS REMAINING: ${3 - attempts}`, 'error');
            }
        }
        if (!authenticated) {
            print('SYSTEM SELF-DESTRUCT INITIATED.', 'error');
            print('*** TERMINATING ***', 'error');
            throw new Error('ACCESS DENIED');
        }

        // Global balance for shop/bank sync
        let balance = 1000;

        // Step 3: Banking Module
        function bankingKernel() {
            print('\n=== BANKING KERNEL ===');
            print('Commands: deposit, withdraw, balance, back');
            while (true) {
                const cmd = prompt('[BANK]>').trim().toLowerCase();
                switch (cmd) {
                    case 'deposit':
                        const dep = parseFloat(prompt('Deposit amount:'));
                        if (!isNaN(dep) && dep > 0) {
                            balance += dep;
                            print(`DEPOSITED: $${dep.toFixed(2)}. NEW BALANCE: $${balance.toFixed(2)}`, 'success');
                        } else {
                            print('INVALID AMOUNT.', 'error');
                        }
                        break;
                    case 'withdraw':
                        const wth = parseFloat(prompt('Withdraw amount:'));
                        if (!isNaN(wth) && wth > 0) {
                            if (wth > balance) {
                                print('INSUFFICIENT FUNDS.', 'error');
                            } else {
                                balance -= wth;
                                print(`WITHDRAWN: $${wth.toFixed(2)}. NEW BALANCE: $${balance.toFixed(2)}`, 'success');
                            }
                        } else {
                            print('INVALID AMOUNT.', 'error');
                        }
                        break;
                    case 'balance':
                        print(`CURRENT BALANCE: $${balance.toFixed(2)}`);
                        break;
                    case 'back':
                        print('RETURNING TO MAIN MENU.');
                        return;
                    default:
                        print('UNKNOWN COMMAND.');
                }
            }
        }

        // Step 4: Smart Shop Module
        function smartShop() {
            print('\n=== SMART SHOP ===');
            print('UNIT PRICE: $50');
            const qty = parseInt(prompt('Enter quantity:'));
            if (isNaN(qty) || qty < 0) {
                print('INVALID QUANTITY.', 'error');
                return;
            }
            let discount = 0;
            if (qty >= 11) discount = 0.20;
            else if (qty >= 6) discount = 0.10;
            const unitPrice = 50;
            const total = qty * unitPrice * (1 - discount);
            print(`QTY: ${qty}, DISCOUNT: ${discount * 100}%, TOTAL: $${total.toFixed(2)}`);
            if (total > balance) {
                print('INSUFFICIENT FUNDS FOR PURCHASE.', 'error');
                return;
            }
            balance -= total;
            print(`PURCHASE COMPLETE. NEW BALANCE: $${balance.toFixed(2)}`, 'success');
        }

        // Step 5: Secure Vault
        function secureVault() {
            print('\n=== SECURE VAULT ===');
            const secretWord = 'quantum';
            print('HINT: It relates to computing fundamentals.');
            const guess = prompt('Guess the secret word:').trim().toLowerCase();
            if (guess === secretWord) {
                print('ACCESS GRANTED! EASTER EGG: https://perplexity.ai/grok - Hidden AI core unlocked! 🚀', 'success');
            } else {
                print('INCORRECT. ACCESS DENIED.', 'error');
            }
            print('RETURNING TO MAIN MENU.');
        }

        // Step 2: Command Kernel (Main Loop)
        while (true) {
            const command = prompt('[V-CORE]> Type command: (bank, shop, vault, exit)').trim().toLowerCase();
            switch (command) {
                case 'bank':
                    bankingKernel();
                    break;
                case 'shop':
                    smartShop();
                    break;
                case 'vault':
                    secureVault();
                    break;
                case 'exit':
                    print('SHUTTING DOWN VIRTUAL CORE. Goodbye.');
                    break;
                default:
                    print('UNKNOWN COMMAND. Available: bank, shop, vault, exit');
            }
            if (command === 'exit') break;
            print(''); // Spacer
        }
    </script>