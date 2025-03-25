// script.js

let score = 0;
const scoreElement = document.getElementById('score');
const box = document.getElementById('box');

// Function to move the box to a random position
function moveBox() {
    const maxX = window.innerWidth - 50;  // Width minus box size
    const maxY = window.innerHeight - 50; // Height minus box size
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    box.style.left = randomX + 'px';
    box.style.top = randomY + 'px';
}

// Event listener for clicking the box
box.addEventListener('click', () => {
    score += 1;  // Increase score
    scoreElement.textContent = score;
    moveBox();   // Move box to new random location
});

// Initial box placement
moveBox();

// Move the box every 1 second (even if it's not clicked)
setInterval(moveBox, 1000);
