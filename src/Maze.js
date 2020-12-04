
const DIRECTION_UP = {x: 0, y: -1};
const DIRECTION_DOWN = {x: 0, y: 1};
const DIRECTION_LEFT = {x: -1, y: 0};
const DIRECTION_RIGHT = {x: 1, y: 0};

const DIRECTIONS_ARR = [DIRECTION_UP, DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_RIGHT];
const STARTING_POSITION = {x: 0, y: 0};

const DEFAULT_MAZE_SIZE = 4;

const VISITED_TILE_COLOR = '#7CFCFF';

class Maze {
  constructor(game, isDevMode = false) {
    this.game = game;
    this.isDevMode = isDevMode;
    this.maze = null;
    this.visitedMaze = null;
    this.rngBot = new RNGBot();
    this.currTile = STARTING_POSITION;
    this.prevTile = STARTING_POSITION;
    this.mazeExitTile = null;
    this.moveCount = 0;
    this.fruitTileSet = new Set();
  }

  getMazeSize() {
    return DEFAULT_MAZE_SIZE + this.game.points.mazeSizeUpgradeCount;
  }
  
  newMaze() {
    const mazeSize = this.getMazeSize();
    this.fruitTileSet = generateFruitTileSet(mazeSize, mazeSize, this.game.points.getFruitSpawnProbability());
    this.visitedMaze = generateIsVisitedArr(mazeSize, mazeSize);
    this.maze = generateNewMaze(mazeSize, mazeSize);
    this.mazeExitTile = { x: this.getMazeSize(), y: this.getMazeSize()-1 };
  }

  resetPlayer() {
    this.prevTile = STARTING_POSITION;
    this.currTile = STARTING_POSITION;
    this.movePlayer(STARTING_POSITION);
    this.moveCount = 0;
    this.setTileBackgroundColor(this.currTile, FILLED_COLOR, true);
  }

  markVisited(tile) {
    this.game.points.addVisitPoints(this.isVisited(tile.x, tile.y));
    
    this.visitedMaze[tile.y][tile.x] = true;
    this.setTileBackgroundColor(tile, VISITED_TILE_COLOR);
  }

  isVisited(x, y) {
    return this.visitedMaze[y][x];
  }

  setTileBackgroundColor(tile, color, isPlayer = false) {
    const new_tile_key = generateTileKey(tile.x, tile.y);
    $(`#${new_tile_key}`).css('background-color', color);
    $(`#${new_tile_key}`).css('-moz-border-radius', isPlayer ? '90%' : '0%');
    $(`#${new_tile_key}`).css('border-radius', isPlayer ? '90%' : '0%');
  }

  getTileCount() {
    return this.maze.length * this.maze[0].length;
  }
  
  movePlayer(dirVector, isManual=false) {
    // Reset timer for auto-moves
    if (isManual) {
      // Only validate moves if manual.
      if (!this.canMove(this.currTile, dirVector)) {
        return;
      }
      this.game.rngBot.manualMovementCancelRngBot();
    }
    
    this.updatePlayerTile(dirVector);
    this.moveCount++;
    
    if (this.didPlayerExitMaze()) {
      this.game.completeMaze();
    }
  }
  
  updatePlayerTile(dirVector) {
    this.setTileBackgroundColor(this.currTile, VISITED_TILE_COLOR);
    const newTile = this.getNewTilePositionByVector(this.currTile, dirVector);
    
    this.prevTile = { x: this.currTile.x, y: this.currTile.y };
    this.currTile = { x: newTile.x, y: newTile.y };
    
    this.markVisited(this.currTile);
    this.setTileBackgroundColor(this.currTile, FILLED_COLOR, true);

    const tile = generateTileKey(newTile.x, newTile.y);
    if (this.fruitTileSet.has(tile)) {
      this.fruitTileSet.delete(tile);
      this.game.ui.removeBanana(tile);
      this.game.points.addFruitPickupPoints();
    }
  }

  getNewTilePositionByVector(tile, vector) {
    return { x: tile.x + vector.x, y: tile.y + vector.y };
  }

  getPreviousTile() {
    return this.prevTile;
  }

  canMove(tile, dir_vector) {
    if (dir_vector === DIRECTION_UP) {
      return this.maze[tile.y][tile.x][UP];
    }
    else if (dir_vector === DIRECTION_DOWN) {
      return this.maze[tile.y][tile.x][DOWN];
    }
    else if (dir_vector === DIRECTION_LEFT) {
      return this.maze[tile.y][tile.x][LEFT];
    }
    else if (dir_vector === DIRECTION_RIGHT) {
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
