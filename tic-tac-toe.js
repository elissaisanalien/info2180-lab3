document.addEventListener("DOMContentLoaded", function () {
    // ----- Elements -----
    const board = document.getElementById("board");
    const squares = board.getElementsByTagName("div");
    const status = document.getElementById("status");
    const newGameBtn = document.querySelector(".btn") || document.querySelector("button");

    // Remember the original status message so New Game can restore it
    const originalStatus = status.textContent;

    // ----- Game state -----
    let gameState = Array(9).fill(null); // "X", "O" or null for each square
    let currentPlayer = "X";
    let gameOver = false;

    const winningLines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    // ----- Exercise 1: style each square -----
    for (let i = 0; i < squares.length; i++) {
        squares[i].classList.add("square");
    }

    // ----- Helpers -----
    function checkWinner() {
        for (const [a, b, c] of winningLines) {
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return gameState[a];
            }
        }
        return null;
    }

    function declareWinner(winner) {
        status.textContent = "Congratulations! " + winner + " is the Winner!";
        status.classList.add("you-won");
        gameOver = true;
    }

    // ----- Exercises 2, 3 and 6: click and hover handlers -----
    for (let i = 0; i < squares.length; i++) {
        const square = squares[i];

        // Exercise 2 + 6: place X or O, but never overwrite a filled square
        square.addEventListener("click", function () {
            if (gameOver || gameState[i] !== null) {
                return;
            }

            gameState[i] = currentPlayer;
            square.textContent = currentPlayer;
            square.classList.add(currentPlayer);

            // Exercise 4: check for a winner after every move
            const winner = checkWinner();
            if (winner) {
                declareWinner(winner);
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        });

        // Exercise 3: hover effect
        square.addEventListener("mouseover", function () {
            square.classList.add("hover");
        });

        square.addEventListener("mouseout", function () {
            square.classList.remove("hover");
        });
    }

    // ----- Exercise 5: New Game button -----
    newGameBtn.addEventListener("click", function () {
        for (let i = 0; i < squares.length; i++) {
            squares[i].textContent = "";
            squares[i].classList.remove("X", "O", "hover");
        }

        gameState = Array(9).fill(null);
        currentPlayer = "X";
        gameOver = false;

        status.textContent = originalStatus;
        status.classList.remove("you-won");
    });
});