//get users data
let users = [];

if (localStorage.getItem("users") != null) {
  users = JSON.parse(localStorage.getItem("users"));
}


var canvas = document.getElementById('game');
canvas.width = 480; // Set the width of the canvas
canvas.height = 480; // Set the height of the canvas


var context = canvas.getContext('2d');
 // Set the transparency level for the background

var grid = 32;
var count = 0;
var maxApples=5;
var start_length=4;
var start_position_x=160; // Ensure this is a multiple of grid size
var start_position_y=160; // Ensure this is a multiple of grid size


var snake = {
  x: start_position_x,
  y: start_position_y,
  
  // snake velocity. moves one grid length every frame in either the x or y direction
  dx: grid,
  dy: 0,
  
  // keep track of all grids the snake body occupies
  cells: [],

  // length of the snake. grows when eating an apple
  maxCells: start_length
};

var apples = {
    apple:[],    
};

var paused = false; // Variable to track the paused state

// add apple 
addApple()

// get random whole numbers in a specific range
// @see https://stackoverflow.com/a/1527820/2124254
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
//get random color to draw apples 
function getRandomColor () {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    return "#" + randomColor;
}

function drawApple() {
  for (var i = 0; i < apples.apple.length; i++) {
    context.fillStyle = apples.apple[i].color;
    context.fillRect(apples.apple[i].x, apples.apple[i].y, grid - 1, grid - 1);
  }
}

// place apple randomly on the grid
function addApple() {
  while (apples.apple.length < maxApples) {
    let newApple = {
      x: getRandomInt(0, canvas.width / grid) * grid,
      y: getRandomInt(0, canvas.height / grid) * grid,
      color:getRandomColor()
    };

    // Ensure the new apple is not placed on the snake
    let isOnSnake = snake.cells.some(cell => cell.x === newApple.x && cell.y === newApple.y);

    if (!isOnSnake) {
      apples.apple.push(newApple);
    }
  }
}


// Function to handle game over
function gameOver() {
  const score = snake.maxCells - start_length;
  const highestScore = users[localStorage.getItem("user_i")].highest_score;
  const message = `Game Over! Your score: ${score}\n\n` +
                  `Highest score: ${highestScore}\n\n` +
                  `Press OK to restart the game.`;

  alert(message);

  // Reset the game state
  snake.x = start_position_x;
  snake.y = start_position_y;
  snake.cells = [];
  snake.maxCells = start_length;
  snake.dx = grid;
  snake.dy = 0;

  // Place the first apple
  addApple();
}

// Function to toggle pause state
function togglePause() {
  paused = !paused;
} 

// Event listener for keydown event to toggle pause on spacebar press
document.addEventListener('keydown', function(event) {
  if (event.code === 'Space') {
    togglePause();
  }
});

// game loop
function loop() {
  requestAnimationFrame(loop);

  if (paused) {
    return; // Skip the game loop if the game is paused
  }

  // slow game loop to 6 fps instead of 60 (60/6 = 4)
  if (++count < 10) {
    return;
  }

  count = 0;
  context.clearRect(0,0,canvas.width,canvas.height);

  // move snake by it's velocity
  snake.x += snake.dx;
  snake.y += snake.dy;

  // wrap snake position horizontally on edge of screen
  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  }
  else if (snake.x >= canvas.width) {
    snake.x = 0;
  }
  
  // wrap snake position vertically on edge of screen
  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  }
  else if (snake.y >= canvas.height) {
    snake.y = 0;
  }

  // keep track of where snake has been. front of the array is always the head
  snake.cells.unshift({x: snake.x, y: snake.y});

  // remove cells as we move away from them
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  

  // draw apple on the canvas
  drawApple()
  
  // draw snake one cell at a time
 
  snake.cells.forEach(function(cell, index) {
    if (index==0){
        context.fillStyle = 'orange';
    }else{
    context.fillStyle = 'green';
    }
    // drawing 1 px smaller than the grid creates a grid effect in the snake body so you can see how long it is
    context.fillRect(cell.x, cell.y, grid-1, grid-1);  

    // check collision with all cells after this one (modified bubble sort)
    for (var i = index + 1; i < snake.cells.length; i++) {
      // snake occupies same space as a body part. reset game
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        // Reset the game state
        gameOver()
      }
    }
  });


   // snake ate apple (need to move out of cell recursion)
  for (var i=0; i<apples.apple.length;i++){
    if (snake.x === apples.apple[i].x && snake.y === apples.apple[i].y) {
        snake.maxCells++;

        // remove the apple and add a new one
        apples.apple[i].x = getRandomInt(0, canvas.width / grid) * grid;
        apples.apple[i].y = getRandomInt(0, canvas.height / grid) * grid;
        apples.apple[i].color=getRandomColor()
   

        //update current score AND highest score
        document.getElementById("current_score").textContent="Current Score: "+(snake.maxCells-start_length);
        if (snake.maxCells-start_length>users[localStorage.getItem("user_i")].highest_score){
          //update "users" variable store in browser 
          users[localStorage.getItem("user_i")].highest_score=snake.maxCells-start_length
          localStorage.setItem("users", JSON.stringify(users));
          document.getElementById("highest_score").textContent=user_name+"'s Highest Score: "+users[localStorage.getItem("user_i")].highest_score;
        }
      }
 
}
}

// listen to keyboard events to move the snake
document.addEventListener('keydown', function(e) {
  // prevent snake from backtracking on itself by checking that it's 
  // not already moving on the same axis (pressing left while moving
  // left won't do anything, and pressing right while moving left
  // shouldn't let you collide with your own body)
  
  // left arrow key
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
  // up arrow key
  else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }
  // right arrow key
  else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
  // down arrow key
  else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

//display highest score
var user_name=localStorage.getItem("userName")
document.getElementById("highest_score").textContent=user_name+"'s Highest Score: "+users[localStorage.getItem("user_i")].highest_score;

// Display hint at the start of the game
alert("Hint: Use arrow keys to move the snake.\nPress Space to pause the game.")


// start the game
requestAnimationFrame(loop);
