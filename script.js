let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 5;

function checkGuess() {
    let guess = Number(document.getElementById("guessInput").value);
    let message = document.getElementById("message");

    if (!guess) {
        message.textContent = "Enter a valid number!";
        return;
    }

    attempts--;
    document.getElementById("attempts").textContent = attempts;

    if (guess === randomNumber) {
        message.textContent = "🎉 Correct! You won!";
        endGame();
    } else if (guess > randomNumber) {
        message.textContent = "📈 Too High!";
    } else {
        message.textContent = "📉 Too Low!";
    }

    if (attempts === 0 && guess !== randomNumber) {
        message.textContent = "❌ Game Over! Number was " + randomNumber;
        endGame();
    }
}

function endGame() {
    document.querySelector(".restart").style.display = "block";
}

function restartGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 5;
    document.getElementById("attempts").textContent = attempts;
    document.getElementById("message").textContent = "";
    document.getElementById("guessInput").value = "";
    document.querySelector(".restart").style.display = "none";
}
