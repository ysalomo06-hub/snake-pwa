const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const grid = 15;
const tileCount = canvas.width / grid;
const SPEED = 250;

let snake = [{ x: 10, y: 10 }]; // posisi grid
let food = spawnFood();
let dx = 1;
let dy = 0;
let score = 0;

// ===== FOOD =====
function spawnFood() {
  return {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount)
  };
}

// ===== CONTROL =====
function setDir(dir) {
  if (dir === "up" && dy === 0) { dx = 0; dy = -1; }
  if (dir === "down" && dy === 0) { dx = 0; dy = 1; }
  if (dir === "left" && dx === 0) { dx = -1; dy = 0; }
  if (dir === "right" && dx === 0) { dx = 1; dy = 0; }
}

// ===== GAME LOOP =====
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const head = {
    x: snake[0].x + dx,
    y: snake[0].y + dy
  };

  // TABRAK
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= tileCount ||
    head.y >= tileCount ||
    snake.some(s => s.x === head.x && s.y === head.y)
  ) {
    alert("Game Over");
    resetGame();
    return;
  }

  snake.unshift(head);

  // MAKAN → SKOR NAIK (PASTI)
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    document.getElementById("score").innerText = score;
    food = spawnFood();
  } else {
    snake.pop();
  }

  // DRAW SNAKE
  ctx.fillStyle = "#000";
  snake.forEach(s =>
    ctx.fillRect(s.x * grid, s.y * grid, grid - 1, grid - 1)
  );

  // DRAW FOOD
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(food.x * grid, food.y * grid, grid - 1, grid - 1);
}

// ===== RESET =====
function resetGame() {
  snake = [{ x: 10, y: 10 }];
  dx = 1;
  dy = 0;
  score = 0;
  document.getElementById("score").innerText = score;
  food = spawnFood();
}

// ===== START =====
setInterval(gameLoop, SPEED);
