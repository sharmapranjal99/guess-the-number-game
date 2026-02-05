let maxRange = 100;
let maxAttempts = 5;

let randomNumber = Math.floor(Math.random() * maxRange) + 1;
let attempts = maxAttempts;

// Score & Rounds
let score = 0;
let rounds = 0;

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
        rounds++;
        updateScore();
        endGame();
    }
}

function updateScore() {
    document.getElementById("score").textContent = score;
    document.getElementById("rounds").textContent = rounds;
}

function endGame() {
    document.getElementById("guessBtn").disabled = true;
    document.getElementById("guessInput").disabled = true;
    document.querySelector(".restart").style.display = "block";
}

function restartGame() {
    playSound();

    randomNumber = Math.floor(Math.random() * maxRange) + 1;
    attempts = maxAttempts;

    document.getElementById("attempts").textContent = attempts;
    document.getElementById("progressBar").style.width = "100%";
    document.getElementById("message").textContent = "";
    document.getElementById("guessInput").value = "";

    document.getElementById("guessBtn").disabled = false;
    document.getElementById("guessInput").disabled = false;
    document.querySelector(".restart").style.display = "none";
}

function toggleTheme() {
    document.body.classList.toggle("dark");

    const btn = document.getElementById("themeToggle");

    if (document.body.classList.contains("dark")) {
        btn.textContent = "☀️ Light Mode";
    } else {
        btn.textContent = "🌙 Dark Mode";
    }
}
