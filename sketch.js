// make an 2D array
function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}
// create grid
let grid;
let velocityGrid;

// create gravity
let gravity = 0.1;

// size of each pixl(squar)
let w = 5;

let cols, rows;

let hueValue = 15;

function setup() {
  if (screen.width < 460) {
    createCanvas(windowWidth, Math.floor(windowHeight - 160));
  } else {
    createCanvas(Math.floor(windowWidth - 140), Math.floor(windowHeight - 140));
  }
  colorMode(HSL, 360, 255, 255);

  cols = Math.floor(width / w);
  rows = Math.floor(height / w);

  grid = make2DArray(cols, rows);
  velocityGrid = make2DArray(cols, rows);

}



function draw() {
  background(335, 72, 13);

  // draw the pixls
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      noStroke();
      if (grid[i][j] > 0) {
        fill(grid[i][j], 200, 120);

        let x = i * w;
        let y = j * w;
        rect(x, y, w);
      }

    }
  }

  // check every cell 
  getNextGrid();

}
// checking the cells to add gravity
function getNextGrid() {
  let nextGrid = make2DArray(cols, rows);
  let nextVelocityGrid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      let velocity = velocityGrid[i][j];
      let isMove = false;
      if (state > 0) {
        let newPos = int(j + velocity);
        for (let y = newPos; y > j; y--) {

          let below = grid[i][y];
          let belowA, belowB;

          let dir = random([-1, 1]);
          if (i + dir >= 0 && i + dir <= cols - 1) {
            belowA = grid[i + dir][y];
          }
          if (i - dir >= 0 && i - dir <= cols - 1) {
            belowB = grid[i - dir][y];
          }


          if (below === 0 && j < rows - 1) {
            nextGrid[i][y] = state;
            nextVelocityGrid[i][y] = velocity + gravity;
            isMove = true;
            break
          }
          else if (belowA === 0) {
            nextGrid[i + dir][y] = state;
            nextVelocityGrid[i + dir][y] = velocity + gravity;
            isMove = true;
            break
          }
          else if (belowB === 0) {
            nextGrid[i - dir][y] = state;
            nextVelocityGrid[i - dir][y] = velocity + gravity;
            isMove = true;
            break
          }
        }
        if (state > 0 && !isMove) {
          nextGrid[i][j] = state;
          nextVelocityGrid[i][j] = velocity + gravity;
        }
      }
    }
  }
  grid = nextGrid;
  velocityGrid = nextVelocityGrid;
}

// create matrix to drop the sand(pixls)
let matrix = 15;
function mouseDragged() {
  let mouseCol = floor(mouseX / w);
  let mouseRow = floor(mouseY / w);

  let ex = Math.floor(matrix / 2);
  for (let i = -ex; i <= ex; i++) {
    for (let j = -ex; j <= ex; j++) {
      // in every cell make 20% chance to fill it
      if (random(1) >= 0.80) {
        let col = mouseCol + i;
        let row = mouseRow + j;
        if (col >= 0 && col <= cols - 1 && row >= 0 && row <= rows - 1) {
          if (grid[col][row] == 0) {
            grid[col][row] = hueValue;
            velocityGrid[col][row] = 2;
          }
        }
      }
    }
  }
}


// change the color evrey 2 seconds
let isColor = true;
setInterval(() => {
  if (isColor) {
    hueValue += 15
    if (hueValue >= 70) {
      hueValue = 10;
    }
  }

}, 2000)

function getColor(h) {
  hueValue = h
  isColor = false;
}

function changColor() {
  isColor = true;
}

function rest() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = 0;
    }
  }
}

function changSandSize(value) {
  w = value

  cols = Math.floor(width / w);
  rows = Math.floor(height / w);

  grid = make2DArray(cols, rows);
  velocityGrid = make2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = 0;
    }
  }

}

function changMatrixSize(value) {
  matrix = value;
  console.log(matrix)
}

function hideTut() {
  let tut = document.querySelector(`.tut`);
  tut.style.display = `none`;
  console.log(`hi`)
}

let navText = document.querySelector(`.navText`)
navText.style.display = `none`;
function showNav() {

  if (navText.style.display == `flex`) {
    navText.style.display = `none`;
  }

  else if (navText.style.display == `none`) {
    navText.style.display = `flex`;
  }

}