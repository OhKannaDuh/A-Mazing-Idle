

const PLAYER_COLOR = '#1ec438';
const RNG_BOT_COLOR = '#000000';
const EMPTY_COLOR = '#FFFFFF';
const DEAD_END_COLOR = '#F13241';

const UP = 0;
const RIGHT = 1
const DOWN = 2;
const LEFT = 3;
const WALL = 0;
const NO_WALL = 1;


//TODO: do not allow 0-0
const generateFruitTileSet = (x, y, prob) => {
  const fruitTileSet = new Set();
  //TODO: calculate global probability and assign randomly
  for (let i = 0; i < y; i++) {
    for (let j = 0; j < x; j++) {
      //generate fruit
      let rand = Math.random();
      if(rand < prob) {
        fruitTileSet.add(generateTileKey(i, j));
      }
    }
  }
  return fruitTileSet;
}

const getNewTilePositionByVector = (tile, vector) => {
  return { x: tile.x + vector.x, y: tile.y + vector.y };
}

const isTileEqual = (tile1, tile2) => {
  return tile1.x === tile2.x && tile1.y === tile2.y;
}

const generateTileKey = (x, y) => {
  return `${x}-${y}`;
}

const generateNewMaze = (x, y) => {
  
  // Establish variables and starting grid
  let totalCells = x * y;
  let cells = new Array();
  let unvis = new Array();
  for (let i = 0; i < y; i++) {
    cells[i] = new Array();
    unvis[i] = new Array();
    for (let j = 0; j < x; j++) {
      cells[i][j] = [0,0,0,0];
      unvis[i][j] = true;
    }
  }
  
  // Set a random position to start from
  let currentCell = [Math.floor(Math.random()*y), Math.floor(Math.random()*x)];
  let path = [currentCell];
  unvis[currentCell[0]][currentCell[1]] = false;
  var visited = 1;
  
  // Loop through all available cell positions
  while (visited < totalCells) {
      // Determine neighboring cells
      var pot = [[currentCell[0]-1, currentCell[1], 0, 2],
            [currentCell[0], currentCell[1]+1, 1, 3],
            [currentCell[0]+1, currentCell[1], 2, 0],
            [currentCell[0], currentCell[1]-1, 3, 1]];
      var neighbors = new Array();
      
      // Determine if each neighboring cell is in game grid, and whether it has already been checked
      for (var l = 0; l < 4; l++) {
          if (pot[l][0] > -1 && pot[l][0] < y && pot[l][1] > -1 && pot[l][1] < x && unvis[pot[l][0]][pot[l][1]]) { neighbors.push(pot[l]); }
      }
      
      // If at least one active neighboring cell has been found
      if (neighbors.length) {
          // Choose one of the neighbors at random
          const next = neighbors[Math.floor(Math.random()*neighbors.length)];
          
          // Remove the wall between the current cell and the chosen neighboring cell
          cells[currentCell[0]][currentCell[1]][next[2]] = NO_WALL;
          cells[next[0]][next[1]][next[3]] = NO_WALL;
          
          // Mark the neighbor as visited, and set it as the current cell
          unvis[next[0]][next[1]] = false;
          visited++;
          currentCell = [next[0], next[1]];
          path.push(currentCell);
      }
      // Otherwise go back up a step and keep going
      else {
          currentCell = path.pop();
      }
  }

  // Set entrance/exit
  // cells[0][0][LEFT] = NO_WALL;
  cells[x-1][y-1][RIGHT] = NO_WALL;

  return cells;
}

const generateIsVisitedArr = (x, y) => {
  const isVisitedArr = new Array();
  for (let i = 0; i < y; i++) {
    isVisitedArr[i] = new Array();
    for (let j = 0; j < x; j++) {
        isVisitedArr[i][j] = false;
    }
  }
  return isVisitedArr;
}