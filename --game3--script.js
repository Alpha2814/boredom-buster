// pong.js

const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

// Game settings
const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;
const paddleSpeed = 5;
const ballSpeed = 2;

// Paddle and ball positions
let paddleLeftY = (canvas.height - paddleHeight) / 2;
let paddleRightY = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = ballSpeed;
let ballSpeedY = ballSpeed;

// Draw the paddles and ball
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    ctx.fillStyle = 'green';
    ctx.fillRect(0, paddleLeftY, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth, paddleRightY, paddleWidth, paddleHeight);

    // Draw ball
    ctx.fillStyle = 'white';
    ctx.fillRect(ballX, ballY, ballSize, ballSize);
}

// Move the ball and detect collisions
function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom walls
    if (ballY <= 0 || ballY >= canvas.height - ballSize) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (ballX <= paddleWidth && ballY >= paddleLeftY && ballY <= paddleLeftY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX >= canvas.width - paddleWidth - ballSize && ballY >= paddleRightY && ballY <= paddleRightY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Ball out of bounds (reset position)
    if (ballX <= 0 || ballX >= canvas.width - ballSize) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = -ballSpeedX;
    }
}

// Move paddles based on user input
function movePaddles() {
    if (keyUpPressed && paddleRightY > 0) {
        paddleRightY -= paddleSpeed;
    }

    if (keyDownPressed && paddleRightY < canvas.height - paddleHeight) {
        paddleRightY += paddleSpeed;
    }

    if (keyWPressed && paddleLeftY > 0) {
        paddleLeftY -= paddleSpeed;
    }

    if (keySPressed && paddleLeftY < canvas.height - paddleHeight) {
        paddleLeftY += paddleSpeed;
    }
}

// Key control for paddles
let keyUpPressed = false;
let keyDownPressed = false;
let keyWPressed = false;
let keySPressed = false;

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') keyUpPressed = true;
    if (event.key === 'ArrowDown') keyDownPressed = true;
    if (event.key === 'w') keyWPressed = true;
    if (event.key === 's') keySPressed = true;
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowUp') keyUpPressed = false;
    if (event.key === 'ArrowDown') keyDownPressed = false;
    if (event.key === 'w') keyWPressed = false;
    if (event.key === 's') keySPressed = false;
});

// Update the game state
function update() {
    moveBall();
    movePaddles();
    draw();
}

// Run the game
setInterval(update, 1000 / 60);
