
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
    this.moveCount = 0;
    this.fruitTileSet = new Set();
    this.deadEndTileMap = new Map();
  }

  getMazeExitTile() {
    return { x: this.getCurrentMazeSize(), y: this.getCurrentMazeSize() - 1 }; 
  }

  getNextMazeSize() {
    return DEFAULT_MAZE_SIZE + this.game.points.mazeSizeUpgradeCount;
  }

  getCurrentMazeSize() {
    return this.maze.length;
  }
  
  newMaze() {
    const mazeSize = this.getNextMazeSize();
    this.fruitTileSet = generateFruitTileSet(mazeSize, mazeSize, this.game.points.getFruitSpawnProbability());
    this.visitedMaze = generateIsVisitedArr(mazeSize, mazeSize);
    this.maze = generateNewMaze(mazeSize, mazeSize);
    this.deadEndTileMap = new Map();
  }

  resetPlayer() {
    this.prevTile = STARTING_POSITION;
    this.currTile = STARTING_POSITION;
    this.markVisited(STARTING_POSITION);
    this.moveCount = 0;
    this.setTileBackgroundColor(this.currTile, FILLED_COLOR, true);
  }

  markVisited(tile) {
    this.game.points.addVisitPoints(this.isVisited(tile.x, tile.y));
    this.visitedMaze[tile.y][tile.x] = true;
  }

  isValidTile(tile) {
    return tile.x < this.getCurrentMazeSize() && tile.y < this.getCurrentMazeSize();
  }

  isVisited(x, y) {
    return this.visitedMaze[y][x];
  }

  setTileBackgroundColor(tile, isPlayer = false) {
    const tileColor = this.getTileBackgroundColor(tile);
    const new_tile_key = generateTileKey(tile.x, tile.y);
    $(`#${new_tile_key}`).css('background-color', tileColor);
    $(`#${new_tile_key}`).css('-moz-border-radius', isPlayer ? '90%' : '0%');
    $(`#${new_tile_key}`).css('border-radius', isPlayer ? '90%' : '0%');
  }

  getTileCount() {
    return this.maze.length * this.maze[0].length;
  }
  
  movePlayer(dirVector, isManual=false) {
    if (!this.canMove(this.currTile, dirVector)) {
      console.log('cannot move!');
      return;
    }
    // Reset timer for auto-moves
    if (isManual) {
      this.game.rngBot.manualMovementCancelRngBot();
    }
    
    this.moveCount++;
    
    this.updatePlayerTile(dirVector);
  }
  
  getTileBackgroundColor(tile) {
    if (this.currTile.x === tile.x && this.currTile.y === tile.y) {
      return FILLED_COLOR;
    }
    const tileKey = generateTileKey(tile.x, tile.y);
    if (this.deadEndTileMap.has(tileKey)) {
      return DEAD_END_COLOR;
    }
    if (this.isVisited(tile.x, tile.y)) {
      return VISITED_TILE_COLOR;
    }
    return EMPTY_COLOR;
  }

  updatePlayerTile(dirVector) {
    const newTile = this.getNewTilePositionByVector(this.currTile, dirVector);
    if (this.isMazeExitTile(newTile)) {
      this.game.completeMaze();
      return;
    }

    this.prevTile = { x: this.currTile.x, y: this.currTile.y };
    this.currTile = { x: newTile.x, y: newTile.y };
    
    
    this.markVisited(this.currTile);
    this.updateDeadEndTilesMap(this.currTile);
    
    this.setTileBackgroundColor(this.prevTile);
    this.setTileBackgroundColor(this.currTile, true);
    
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

  canMove(tile, dirVector) {
    const newTile = this.getNewTilePositionByVector(tile, dirVector);
    const isMazeExitTile = this.isMazeExitTile(newTile);
    if (isMazeExitTile) return true;
    if (!this.isValidTile(newTile)) return false;
    
    
    if (dirVector === DIRECTION_UP) {
      return this.maze[tile.y][tile.x][UP];
    }
    else if (dirVector === DIRECTION_DOWN) {
      return this.maze[tile.y][tile.x][DOWN];
    }
    else if (dirVector === DIRECTION_LEFT) {
      return this.maze[tile.y][tile.x][LEFT];
    }
    else if (dirVector === DIRECTION_RIGHT) {
      return this.maze[tile.y][tile.x][RIGHT];
    }
    
    return false;
  }

  isMazeExitTile(tile) {
    const exitTile = this.getMazeExitTile();
    return tile.x === exitTile.x && tile.y === exitTile.y;
  }
  
  getValidDirections() {
    const validDirsArr = DIRECTIONS_ARR.filter((dir) => this.canMove(this.currTile, dir));
    return validDirsArr;
  }

  getDeadEndValue(tile, validDirsArr) {
    let deadEndCount = 0, deadEndMaxVal = 0;
    const upgradeCount = this.game.points.rngBotRememberDeadEndTilesUpgrades;

    // Count dead ends from valid dirs
    validDirsArr.forEach(dir => {
      const newTile = this.getNewTilePositionByVector(tile, dir)
      const tileKey = generateTileKey(newTile.x, newTile.y);
      if (this.deadEndTileMap.has(tileKey)) {
        deadEndCount++;
        deadEndMaxVal = Math.max(this.deadEndTileMap.get(tileKey), deadEndMaxVal);
      }
    });

    // All but one are deadends -- return the max value if within upgrade limit
    if (deadEndCount === (validDirsArr.length - 1) && deadEndMaxVal < upgradeCount) {
      return deadEndMaxVal+1;
    }
    return null;
  }

  updateDeadEndTilesMap(tile) {
    const upgradeCount = this.game.points.rngBotRememberDeadEndTilesUpgrades;
    if (upgradeCount === 0) {
      return;
    }
    const validDirsArr = this.getValidDirections(tile);
    const tileKey = generateTileKey(tile.x, tile.y);
    
    if (validDirsArr.length === 1) {
      this.deadEndTileMap.set(tileKey, 1);
      return;
    }
    
    const deadEndDistance = this.getDeadEndValue(tile, validDirsArr);
    if (deadEndDistance != null) {
      this.deadEndTileMap.set(tileKey, deadEndDistance);
    }
  }

  // Check if player is within 1 tile of exit
  filterPlayerExitMazeDirection() {
    const exitMazeDir = DIRECTIONS_ARR.filter((dir) => {
      const newTile = this.getNewTilePositionByVector(this.currTile, dir);
      return this.isMazeExitTile(newTile)
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

  filterDeadEndTiles(validDirs) {
    const nonDeadEndTiles = validDirs.filter((dir) => {
      const newTile = this.getNewTilePositionByVector(this.currTile, dir);
      const tileKey = generateTileKey(newTile.x, newTile.y);
      return !this.deadEndTileMap.has(tileKey);
    });
    return nonDeadEndTiles;
  }
}
