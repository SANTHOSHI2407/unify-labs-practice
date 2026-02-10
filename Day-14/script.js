
    <script>
        const input = document.querySelector('input');
        const guessMsg = document.querySelector('.guess');
        const submitBtn = document.querySelector('button');
        const chancesEl = document.querySelector('.chances');

        let randomNum = Math.floor(Math.random() * 100) + 1; // 1 to 100
        let attempts = 10;

        input.focus();

        function resetGame() {
            randomNum = Math.floor(Math.random() * 100) + 1;
            attempts = 10;
            input.disabled = false;
            input.value = '';
            chancesEl.textContent = attempts;
            guessMsg.textContent = 'Start guessing!';
            guessMsg.className = 'guess';
            submitBtn.textContent = 'Submit';
            input.focus();
        }

        submitBtn.addEventListener('click', () => {
            if (input.disabled) {
                resetGame();
                return;
            }

            attempts--;
            const userGuess = parseInt(input.value);

            if (userGuess === randomNum) {
                guessMsg.textContent = `Congratulations! You guessed it in ${11 - attempts} attempts.`;
                guessMsg.classList.add('win');
                input.disabled = true;
                submitBtn.textContent = 'Play Again';
            } else if (userGuess > randomNum && userGuess <= 100) {
                guessMsg.textContent = 'Too High! Try lower.';
                guessMsg.className = 'guess';
            } else if (userGuess < randomNum && userGuess >= 1) {
                guessMsg.textContent = 'Too Low! Try higher.';
                guessMsg.className = 'guess';
            } else {
                guessMsg.textContent = 'Invalid guess (1-100 only)';
                guessMsg.classList.add('game-over');
                attempts++; // Don't count invalid as attempt
            }

            chancesEl.textContent = attempts;

            if (attempts === 0) {
                guessMsg.textContent = `Game Over! The number was ${randomNum}.`;
                guessMsg.classList.add('game-over');
                input.disabled = true;
                submitBtn.textContent = 'Play Again';
            }

            input.value = '';
            input.focus();
        });

        // Allow Enter key to submit
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitBtn.click();
            }
        });
    </script>