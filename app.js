const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const grid = 15;
let snake = [{x: 150, y: 150}];
let food = spawnFood();
let dx = grid;
let dy = 0;

function spawnFood() {
  return {
    x: Math.floor(Math.random() * 20) * grid,
    y: Math.floor(Math.random() * 20) * grid
  };
}

function setDir(dir) {
  if (dir === 'up' && dy === 0) { dx = 0; dy = -grid; }
  if (dir === 'down' && dy === 0) { dx = 0; dy = grid; }
  if (dir === 'left' && dx === 0) { dx = -grid; dy = 0; }
  if (dir === 'right' && dx === 0) { dx = grid; dy = 0; }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const head = {x: snake[0].x + dx, y: snake[0].y + dy};

  // Tabrak tembok atau badan
  if (
    head.x < 0 || head.y < 0 ||
    head.x >= canvas.width || head.y >= canvas.height ||
    snake.some(s => s.x === head.x && s.y === head.y)
  ) {
    alert("Game Over");
    snake = [{x:150,y:150}];
    dx = grid; dy = 0;
    food = spawnFood();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = spawnFood();
  } else {
    snake.pop();
  }

  ctx.fillStyle = "#000";
  snake.forEach(s => ctx.fillRect(s.x, s.y, grid-1, grid-1));

  ctx.fillStyle = "#ff0000";
  ctx.fillRect(food.x, food.y, grid-1, grid-1);
}

setInterval(gameLoop, 120);
