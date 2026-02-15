let maxRange = 100;
let maxAttempts = 5;

let randomNumber = Math.floor(Math.random() * maxRange) + 1;
let attempts = maxAttempts;

// Score & Rounds
let score = 0;
let rounds = 0;

// 🔥 NEW FLAG
let gameOver = false;

// 🔥 Load saved score & rounds after refresh
window.onload = function () {
    let savedScore = localStorage.getItem("score");
    let savedRounds = localStorage.getItem("rounds");

    if (savedScore !== null) {
        score = Number(savedScore);
        document.getElementById("score").textContent = score;
    }

    if (savedRounds !== null) {
        rounds = Number(savedRounds);
        document.getElementById("rounds").textContent = rounds;
    }
};

// Sound
const clickSound = document.getElementById("clickSound");

function playSound() {
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play();
        clickSound.play().catch(()=>{});
    }
}

// Difficulty logic
function setDifficulty() {
    let level = document.getElementById("difficulty").value;

    if (level === "easy") {
        maxRange = 50;
        maxAttempts = 7;
    } else if (level === "medium") {
        maxRange = 100;
        maxAttempts = 5;
    } else {
        maxRange = 200;
        maxAttempts = 3;
    }

    restartGame();
}

function checkGuess() {

    if (gameOver) {
        const message = document.getElementById("message");
        message.textContent = '⚠️ Click "Play Again" to start a new game!';
        message.style.color = "black";
        return;
    }

    playSound();

    let guess = Number(document.getElementById("guessInput").value);
    let message = document.getElementById("message");

    if (!guess || guess < 1 || guess > maxRange) {
        message.textContent = `Enter number between 1 to ${maxRange}`;
        return;
    }

    attempts--;
    document.getElementById("attempts").textContent = attempts;

    document.getElementById("progressBar").style.width =
        (attempts / maxAttempts) * 100 + "%";

    if (guess === randomNumber) {
        message.textContent = "🎉 Correct! You Won!";
        message.style.color = "black";
        score++;
        rounds++;
        updateScore();
        endGame();
    } 
    else if (guess > randomNumber) {
        message.textContent = "📈 Too High!";
    } 
    else {
        message.textContent = "📉 Too Low!";
    }

    if (attempts === 0 && guess !== randomNumber) {
        message.textContent = "❌ Game Over! Number was " + randomNumber;
        message.style.color = "black";
        rounds++;
        updateScore();
        endGame();
    }
}

function updateScore() {
    document.getElementById("score").textContent = score;
    document.getElementById("rounds").textContent = rounds;

    // 🔥 Save to localStorage
    localStorage.setItem("score", score);
    localStorage.setItem("rounds", rounds);
}

function endGame() {
    gameOver = true;
    document.getElementById("guessInput").disabled = true;
    document.querySelector(".restart").style.display = "block";
}

function restartGame() {
    playSound();

    gameOver = false;

    randomNumber = Math.floor(Math.random() * maxRange) + 1;
    attempts = maxAttempts;

    document.getElementById("attempts").textContent = attempts;
    document.getElementById("progressBar").style.width = "100%";
    document.getElementById("message").textContent = "";
    document.getElementById("guessInput").value = "";

    document.getElementById("guessInput").disabled = false;
    document.querySelector(".restart").style.display = "none";
}
