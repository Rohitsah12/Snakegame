document.addEventListener('DOMContentLoaded', function () {
    const gameArena = document.getElementById('game-arena');
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');
    const scoreBoard = document.getElementById('score-board');
    
    const arenaSize = 600;
    const cellSize = 20;
    const maxPosition = arenaSize - cellSize;

    let score = 0;
    let gameStarted = false;
    let food = { x: 300, y: 200 };
    let snake = [{ x: 160, y: 200 }, { x: 140, y: 200 }, { x: 120, y: 200 }];
    let dx = cellSize;
    let dy = 0;
    let intervalId;
    let gameSpeed = 200;

    function moveFood() {
        let newX, newY;
        const maxGridX = Math.floor(maxPosition / cellSize);
        const maxGridY = Math.floor(maxPosition / cellSize);

        do {
            newX = Math.floor(Math.random() * (maxGridX + 1)) * cellSize;
            newY = Math.floor(Math.random() * (maxGridY + 1)) * cellSize;
        } while (snake.some(segment => segment.x === newX && segment.y === newY));

        food = { x: newX, y: newY };
    }

    function updateSnake() {
        const newHead = { x: snake[0].x + dx, y: snake[0].y + dy };

        if (isWallCollision(newHead) || isSelfCollision(newHead)) {
            gameOver();
            return;
        }

        snake.unshift(newHead);

        if (newHead.x === food.x && newHead.y === food.y) {
            score += 10;
            moveFood();
            if (gameSpeed > 50) {
                clearInterval(intervalId);
                gameSpeed -= 5;
                gameLoop();
            }
        } else {
            snake.pop();
        }
    }

    function isWallCollision(head) {
        return head.x < 0 || head.x > maxPosition || head.y < 0 || head.y > maxPosition;
    }

    function isSelfCollision(head) {
        return snake.some((segment, index) => index > 0 && segment.x === head.x && segment.y === head.y);
    }

    function changeDirection(e) {
        const isGoingDown = dy === cellSize;
        const isGoingUp = dy === -cellSize;
        const isGoingRight = dx === cellSize;
        const isGoingLeft = dx === -cellSize;

        if (e.key === 'ArrowUp' && !isGoingDown) {
            dx = 0;
            dy = -cellSize;
        } else if (e.key === 'ArrowDown' && !isGoingUp) {
            dx = 0;
            dy = cellSize;
        } else if (e.key === 'ArrowLeft' && !isGoingRight) {
            dx = -cellSize;
            dy = 0;
        } else if (e.key === 'ArrowRight' && !isGoingLeft) {
            dx = cellSize;
            dy = 0;
        }
    }

    function drawDiv(x, y, className) {
        const divElement = document.createElement('div');
        divElement.classList.add(className);
        divElement.style.top = `${y}px`;
        divElement.style.left = `${x}px`;
        return divElement;
    }

    function drawFoodAndSnake() {
        gameArena.innerHTML = '';

        snake.forEach(segment => {
            const snakeElement = drawDiv(segment.x, segment.y, 'snake');
            gameArena.appendChild(snakeElement);
        });

        const foodElement = drawDiv(food.x, food.y, 'food');
        gameArena.appendChild(foodElement);
    }

    function gameLoop() {
        intervalId = setInterval(() => {
            updateSnake();
            drawFoodAndSnake();
            updateScore();
        }, gameSpeed);
    }

    function updateScore() {
        scoreBoard.textContent = `Score: ${score}`;
    }

    function gameOver() {
        clearInterval(intervalId);
        gameStarted = false;
        document.removeEventListener('keydown', changeDirection);
        alert(`Game Over!\nYour Score: ${score}`);
        startButton.style.display = 'none';
        restartButton.style.display = 'block';
    }

    function resetGame() {
        score = 0;
        gameSpeed = 200;
        snake = [{ x: 160, y: 200 }, { x: 140, y: 200 }, { x: 120, y: 200 }];
        dx = cellSize;
        dy = 0;
        food = { x: 300, y: 200 };

        gameArena.innerHTML = '';
        updateScore();
        drawFoodAndSnake();

        startButton.style.display = 'block';
        restartButton.style.display = 'none';
    }

    function startGame() {
        if (!gameStarted) {
            gameStarted = true;
            score = 0;
            updateScore();
            document.addEventListener('keydown', changeDirection);
            startButton.style.display = 'none';
            restartButton.style.display = 'none';
            gameLoop();
        }
    }

    // Event Listeners
    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', resetGame);

    // Initial setup
    drawFoodAndSnake();
    updateScore();
});
