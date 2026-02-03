const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const grid = 15;
const SPEED = 250; // makin besar = makin lambat (Nokia style)

let snake = [{ x: 150, y: 150 }];
let food = spawnFood();
let dx = grid;
let dy = 0;
let score = 0;

// ===== SPAWN FOOD =====
function spawnFood() {
  return {
    x: Math.floor(Math.random() * (canvas.width / grid)) * grid,
    y: Math.floor(Math.random() * (canvas.height / grid)) * grid
  };
}

// ===== KONTROL =====
function setDir(dir) {
  if (dir === "up" && dy === 0) { dx = 0; dy = -grid; }
  if (dir === "down" && dy === 0) { dx = 0; dy = grid; }
  if (dir === "left" && dx === 0) { dx = -grid; dy = 0; }
  if (dir === "right" && dx === 0) { dx = grid; dy = 0; }
}

// ===== GAME LOOP =====
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const head = {
    x: snake[0].x + dx,
    y: snake[0].y + dy
  };

  // TABRAK TEMBOK / BADAN
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= canvas.width ||
    head.y >= canvas.height ||
    snake.some(s => s.x === head.x && s.y === head.y)
  ) {
    alert("Game Over");
    resetGame();
    return;
  }

  snake.unshift(head);

  // MAKAN MAKANAN
  if (head.x === food.x && head.y === food.y) {
    score += 10; // NILAI SETIAP MAKAN
    document.getElementById("score").innerText = score;
    food = spawnFood();
  } else {
    snake.pop();
  }

  // GAMBAR ULAR
  ctx.fillStyle = "#000";
  snake.forEach(s => {
    ctx.fillRect(s.x, s.y, grid - 1, grid - 1);
  });

  // GAMBAR MAKANAN
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(food.x, food.y, grid - 1, grid - 1);
}

// ===== RESET =====
function resetGame() {
  snake = [{ x: 150, y: 150 }];
  dx = grid;
  dy = 0;
  score = 0;
  document.getElementById("score").innerText = score;
  food = spawnFood();
}

// ===== START =====
setInterval(gameLoop, SPEED);
