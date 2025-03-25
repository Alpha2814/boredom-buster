// snake.js

const canvas = document.getElementById('snake-game');
const ctx = canvas.getContext('2d');

// Game settings
const gridSize = 20;
const canvasSize = 400;
const snakeColor = 'green';
const foodColor = 'red';

let snake = [{ x: 80, y: 80 }];
let food = { x: 100, y: 100 };
let direction = 'right';
let score = 0;
const scoreElement = document.querySelector('.score');

// Draw everything on the canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    snake.forEach((segment) => {
        ctx.fillStyle = snakeColor;
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });

    // Draw food
    ctx.fillStyle = foodColor;
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    // Display score
    scoreElement.textContent = 'Score: ' + score;
}

// Move the snake based on direction
function moveSnake() {
    const head = { ...snake[0] };

    if (direction === 'up') head.y -= gridSize;
    if (direction === 'down') head.y += gridSize;
    if (direction === 'left') head.x -= gridSize;
    if (direction === 'right') head.x += gridSize;

    snake.unshift(head);

    // Check for food collision
    if (head.x === food.x && head.y === food.y) {
        score += 1;
        placeFood();
    } else {
        snake.pop();
    }
}

// Place food at a random location
function placeFood() {
    food.x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    food.y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
}

// Game over condition
function checkGameOver() {
    const head = snake[0];

    // Check if snake hits the wall
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        alert('Game Over!');
        resetGame();
    }

    // Check if snake hits itself
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            alert('Game Over!');
            resetGame();
        }
    }
}

// Reset the game to the initial state
function resetGame() {
    snake = [{ x: 80, y: 80 }];
    direction = 'right';
    score = 0;
    placeFood();
}

// Listen for key press events to change direction
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && direction !== 'down') direction = 'up';
    if (event.key === 'ArrowDown' && direction !== 'up') direction = 'down';
    if (event.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
    if (event.key === 'ArrowRight' && direction !== 'left') direction = 'right';
});

// Update game state
function update() {
    moveSnake();
    checkGameOver();
    draw();
}

// Run the game
setInterval(update, 100);
