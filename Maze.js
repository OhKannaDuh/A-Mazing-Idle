
const DIRECTION_UP = {x: 0, y: -1};
const DIRECTION_DOWN = {x: 0, y: 1};
const DIRECTION_LEFT = {x: -1, y: 0};
const DIRECTION_RIGHT = {x: 1, y: 0};

const DIRECTIONS_ARR = [DIRECTION_UP, DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_RIGHT];
const STARTING_POSITION = {x: 0, y: 0};

const DEFAULT_MAZE_SIZE = 4;

const VISITED_TILE_COLOR = '#7CFCFF';

class Maze {
  constructor(game) {
    this.game = game;
    this.maze = null;
    this.visitedMaze = null;
    this.rngBot = new RNGBot();
    this.currTile = STARTING_POSITION;
    this.prevTile = STARTING_POSITION;
    this.mazeExitTile = null;
  }

  getMazeSize() {
    return DEFAULT_MAZE_SIZE + this.game.points.mazeSizeUpgradeCount;
  }
  
  newMaze() {
    const mazeDimension = this.getMazeSize();
    this.maze = generateNewMaze(mazeDimension, mazeDimension);
    this.visitedMaze = generateIsVisitedArr(mazeDimension, mazeDimension);
    this.mazeExitTile = { x: this.getMazeSize(), y: this.getMazeSize() };
  }

  resetPlayer() {
    this.prevTile = STARTING_POSITION;
    this.currTile = STARTING_POSITION;
    this.movePlayer(STARTING_POSITION);
    this.setTileBackgroundColor(this.currTile.x, this.currTile.y, FILLED_COLOR);
  }

  markVisited(tile) {
    this.game.points.addVisitPoints(this.isVisited(tile.x, tile.y));
    
    this.visitedMaze[tile.y][tile.x] = true;
    this.setTileBackgroundColor(tile, VISITED_TILE_COLOR);
  }

  isVisited(x, y) {
    return this.visitedMaze[y][x];
  }

  setTileBackgroundColor(tile, color) {
    const new_tile_key = this.generateTileKey(tile.x, tile.y);
    $(`#${new_tile_key}`).css('background-color', color);
  }

  getTileCount() {
    return this.maze.length * this.maze[0].length;
  }
  
  movePlayer(dir_vector, isManual=false) {
    // Reset timer for auto-moves
    if (isManual) {
      this.game.rngBot.manualMovementCancelRngBot();
    }
    
    this.updatePlayerTile(dir_vector);
    
    if (this.didPlayerExitMaze()) {
      this.game.completeMaze();
    }
  }
  
  updatePlayerTile(dir_vector) {
    this.setTileBackgroundColor(this.currTile, VISITED_TILE_COLOR);
    const newTile = this.getNewTilePositionByVector(this.currTile, dir_vector);
    
    this.prevTile = { x: this.currTile.x, y: this.currTile.y };
    this.currTile = { x: newTile.x, y: newTile.y };
    
    this.markVisited(this.currTile);
    this.setTileBackgroundColor(this.currTile, FILLED_COLOR);
  }

  getNewTilePositionByVector(tile, vector) {
    return { x: tile.x + vector.x, y: tile.y + vector.y };
  }

  getPreviousTile() {
      return this.prevTile;
  }

  generateTileKey(x, y) {
      return `${x}-${y}`;
  }

  canMove(tile, dir_vector) {
    // console.log('can move');
    // console.log(tile);
    // console.log(dir_vector);
    if (dir_vector === DIRECTION_UP) {
      // console.log('up: ' +  this.maze[tile.y][tile.x][UP]);
      return this.maze[tile.y][tile.x][UP];
    }
    else if (dir_vector === DIRECTION_DOWN) {
      // console.log('down: ' +  this.maze[tile.y][tile.x][DOWN]);
      return this.maze[tile.y][tile.x][DOWN];
    }
    else if (dir_vector === DIRECTION_LEFT) {
      // console.log('left: ' +  this.maze[tile.y][tile.x][LEFT]);
      return this.maze[tile.y][tile.x][LEFT];
    }
    else if (dir_vector === DIRECTION_RIGHT) {
      // console.log('right: ' +  this.maze[tile.y][tile.x][RIGHT]);
      return this.maze[tile.y][tile.x][RIGHT];
    }
    
    return false;
  }

  didPlayerExitMaze() {
    return this.currTile.x >= this.maze[0].length || this.currTile.y >= this.maze.length;
  }

  isTileMazeExit(tile) {
    return tile.x === this.mazeExitTile.x && tile.y === this.mazeExitTile.y;
  }
  
  getValidDirections() {
    const validDirsArr = DIRECTIONS_ARR.filter((dir) => this.canMove(this.currTile, dir));
    return validDirsArr;
  }

  // Check if player is within 1 tile of exit
  filterPlayerExitMazeDirection() {
    const exitMazeDir = DIRECTIONS_ARR.filter((dir) => {
      const newTile = this.getNewTilePositionByVector(this.currTile, dir)
      return this.isTileMazeExit(newTile)
    });
    return exitMazeDir;
  }

  filterAvoidRevisitLastPosition(validDirs) {
    // Find any tiles that are not the previous tile.
    const noRevisitDirsArr = validDirs.filter((dir) => {
      const previousTile = this.getPreviousTile();
      const newTile = this.getNewTilePositionByVector(this.currTile, dir);
      return newTile.x !== previousTile.x || newTile.y !== previousTile.y;
    });
    return noRevisitDirsArr;
  }
  
  prioritizeUnvisitedDirection(validDirs) {
    // Find any unvisited tiles within reach.
    const unvisitedDirsArr = validDirs.filter((dir) => {
      const newTile = this.getNewTilePositionByVector(this.currTile, dir);
      return !this.isVisited(newTile.x, newTile.y);
    });
    return unvisitedDirsArr;
  }
}
