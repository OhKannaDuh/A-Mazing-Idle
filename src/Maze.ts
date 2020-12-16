import Game from "./Game";
import { DEAD_END_COLOR, DOWN, EMPTY_COLOR, generateFruitTileSet, generateIsVisitedArr, generateNewMaze, generateTileKey, getNewTilePositionByVector, isTileEqual, LEFT, PLAYER_COLOR, RIGHT, RNG_BOT_COLOR, UP } from "./MazeGenerator";
declare var $: any;

export const DIRECTION_UP = {x: 0, y: -1};
export const DIRECTION_DOWN = {x: 0, y: 1};
export const DIRECTION_LEFT = {x: -1, y: 0};
export const DIRECTION_RIGHT = {x: 1, y: 0};

export const DIRECTIONS_ARR = [DIRECTION_UP, DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_RIGHT];
export const STARTING_POSITION = {x: 0, y: 0};

export const DEFAULT_MAZE_SIZE = 4;

export const VISITED_TILE_COLOR = '#7CFCFF';
export const DEFAULT_PLAYER_ID = 0;


//TODO: find me a home
interface Player {
  id: number;
  currTile: any;
  prevTile: any;
  isManuallyControlled: boolean;
}


class Maze {
  public game: Game;
  public playerMap: Map<number, Player>;
  public isDevMode;
  public maze;
  public visitedMaze: Array<Array<boolean>>;
  public moveCount: number;
  public fruitTileSet: Set<string>;
  public deadEndTileMap: Map<string, any>;

  constructor(game, isDevMode = false) {
    this.game = game;
    this.playerMap = new Map<number, any>();
    this.isDevMode = isDevMode;
    this.maze = null;
    this.visitedMaze = null;
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

  resetAllPlayers() {
    this.playerMap.clear();
    const newPlayer = this.createNewPlayerObj(STARTING_POSITION);
    this.moveCount = 0;
  }

  getIsPlayerManuallyControlling() {
    for (let [id, player] of this.playerMap) {
      if (player.isManuallyControlled) {
        return true;
      }
    }
    return false;
  }

  getPlayerCount(isExcludeManualControl = false) {
    if (isExcludeManualControl) {
      // If manual controlling, don't count
      return this.playerMap.size - (this.getIsPlayerManuallyControlling() ? -1 : 0)
    }
    return this.playerMap.size;
  }

  isAtPlayerMax() {
    const playerCount = this.getPlayerCount();
    const maxPlayers = this.game.points.rngBotAllowPlayerToMoveIndependently ? 2 : 1;
    return playerCount >= maxPlayers;
  }

  createNewPlayerObj(startTile) {
    //TODO: interface for player
    const newPlayer: Player = { id: this.getPlayerCount(), currTile: startTile, prevTile: startTile, isManuallyControlled: false };
    this.playerMap.set(newPlayer.id, newPlayer);
    
    this.markVisited(startTile);
    this.setTileBackgroundColor(startTile, true);
    return newPlayer;
  }

  getManuallyControlledPlayer() {
    for (let [id, player] of this.playerMap) {
      if (player.isManuallyControlled) {
        return player;
      }
    }
    return null;
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

  deletePlayer(playerId) {
    if (!this.playerMap.has(playerId)) {
      return;
    }
    const currTile = this.getPlayer(playerId).currTile;
    this.game.rngBot.deleteRngBot(playerId);
    this.playerMap.delete(playerId);
    this.setTileBackgroundColor(currTile);
    
  }

  movePlayer(playerId, dirVector, isManual=false) {
    if (!this.canMove(this.getCurrTile(playerId), dirVector)) {
      console.log('cannot move!');
      return;
    }
    
    // Reset timer for auto-moves
    if (isManual) {
      if (this.game.points.rngBotAllowPlayerToMoveIndependently && !this.getIsPlayerManuallyControlling()) {
        // Spawn new rng bot player
        const newPlayer = this.createNewPlayerObj(this.getCurrTile(playerId));
        this.game.rngBot.enableRngBot(newPlayer.id);
      }
      // Disable auto-move on current player
      this.getPlayer(playerId).isManuallyControlled = true;
      this.game.rngBot.manualMovementCancelRngBot(playerId);
    } else {
      this.getPlayer(playerId).isManuallyControlled = false;
    }
    this.updatePlayerTile(playerId, dirVector);
    
    this.moveCount++;
  }

  spawnSplitBot(playerId, dirArr) {
    const currTile = this.getCurrTile(playerId);
    for (let i = 0; i < dirArr.length; i++) {
      if (i === 0) {
        // Move the original bot
        this.movePlayer(playerId, dirArr[i]);
        continue;
      }
      // Spawn new split bot in the new tile
      const newTile = getNewTilePositionByVector(currTile, dirArr[i]);
      const newPlayer = this.createNewPlayerObj(newTile);
      this.game.rngBot.enableRngBot(newPlayer.id);
    }
  }

  getPlayer(playerId) {
    return this.playerMap.get(playerId);
  }

  getPlayerIdsAtTile(tile) {
    const playerIdList = [];
    for (let [id, player] of this.playerMap) {
      if (isTileEqual(tile, player.currTile)) {
        playerIdList.push(player.id);
      }
    }
    return playerIdList;
  }

  getPlayerAtTileColor(tile) {
    for (let [id, player] of this.playerMap) {
      if (isTileEqual(tile, player.currTile)) {
        return player.isManuallyControlled ? PLAYER_COLOR : RNG_BOT_COLOR;
      }
    }
    return null;
  }

  isOccupiedByPlayer(tile) {
    for (let [id, player] of this.playerMap) {
      if (isTileEqual(tile, player.currTile)) {
        return true;
      }
    }
    return false;
  }
  
  getTileBackgroundColor(tile) {
    // Check for a player in the tile
    const playerColor = this.getPlayerAtTileColor(tile);
    if (playerColor != null) {
      return playerColor;
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

  updatePlayerTile(playerId, dirVector) {
    const player = this.getPlayer(playerId);
    const newTile = getNewTilePositionByVector(player.currTile, dirVector);
    if (this.isMazeExitTile(newTile)) {
      this.game.completeMaze();
      return;
    }

    player.prevTile = { x: player.currTile.x, y: player.currTile.y };
    player.currTile = { x: newTile.x, y: newTile.y };
    
    this.markVisited(newTile);
    this.updateDeadEndTilesMap(newTile);
    
    this.setTileBackgroundColor(player.prevTile);
    this.setTileBackgroundColor(newTile, true);
    
    const tileKey = generateTileKey(newTile.x, newTile.y);
    // Pick up fruits if any
    if (this.fruitTileSet.has(tileKey)) {
      this.fruitTileSet.delete(tileKey);
      this.game.ui.removeBanana(tileKey);
      this.game.points.addFruitPickupPoints();
    }

    if (this.game.points.rngBotSplitBotAutoMerge) {
      const playerIdsAtTileArr = this.getPlayerIdsAtTile(player.currTile);
      playerIdsAtTileArr.forEach(killPlayerId => {
        if (killPlayerId !== playerId) {
          this.deletePlayer(killPlayerId);
        }
      });
    }
  }

  getPreviousTile(playerId) {
    return this.getPlayer(playerId).prevTile;
  }

  getCurrTile(playerId) {
    return this.getPlayer(playerId).currTile;
  }

  canMove(tile, dirVector) {
    const newTile = getNewTilePositionByVector(tile, dirVector);
    // Check if maze exit and is valid tile
    if (this.isMazeExitTile(newTile)) return true;
    if (!this.isValidTile(newTile)) return false;
    
    // Check for walls in current tile in each direction
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

  getPossibleSplitBotCount(validDirs) {
    if (validDirs.length <= 1) {
      return 0;
    }
    const splitUpgradeCount = this.game.points.rngBotSplitDirectionUpgrades;
    // Total bots active
    const rngBotCount = this.getPlayerCount(true);
    
    // One bot auto-allowed, and +1 extra bot allowed per upgrade
    return Math.max(0, (splitUpgradeCount + 1 - rngBotCount));
  }

  teleportPlayerBackToBot() {
    if (this.getPlayerCount() < 2) return;

    const player = this.getPlayer(DEFAULT_PLAYER_ID);
    const bot = this.getPlayer(1);
    
    this.updatePlayerTile(player.id, bot.currTile);
  }

  teleportBotBackToPlayer() {
    if (this.getPlayerCount() < 2) return;

    const player = this.getPlayer(DEFAULT_PLAYER_ID);
    const bot = this.getPlayer(1);
    
    this.updatePlayerTile(bot.id, player.currTile);
  }

  isMazeExitTile(tile) {
    return isTileEqual(tile, this.getMazeExitTile());
  }
  
  getValidDirectionsByPlayerId(playerId) {
    const currTile = this.getPlayer(playerId).currTile;
    return this.getValidDirectionsByTile(currTile);
  }

  getValidDirectionsByTile(tile) {
    const validDirsArr = DIRECTIONS_ARR.filter((dir) => this.canMove(tile, dir));
    return validDirsArr;
  }

  getDeadEndValue(tile, validDirsArr) {
    let deadEndCount = 0, deadEndMaxVal = 0;
    const upgradeCount = this.game.points.rngBotRememberDeadEndTilesUpgrades;

    // Count dead ends from valid dirs
    validDirsArr.forEach(dir => {
      const newTile = getNewTilePositionByVector(tile, dir)
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
    const validDirsArr = this.getValidDirectionsByTile(tile);
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

  filterPlayerExitMazeDirection(playerId) {
    // Check if player is within 1 tile of exit
    //TODO: instead, store the tile you exit from?
    const exitMazeDir = DIRECTIONS_ARR.filter((dir) => {
      const newTile = getNewTilePositionByVector(this.getPlayer(playerId).currTile, dir);
      return this.isMazeExitTile(newTile)
    });
    return exitMazeDir;
  }

  filterAvoidRevisitLastPosition(playerId, validDirs) {
    // Find any tiles that are not the previous tile.
    const noRevisitDirsArr = validDirs.filter((dir) => {
      const previousTile = this.getPreviousTile(playerId);
      const newTile = getNewTilePositionByVector(this.getCurrTile(playerId), dir);
      return newTile.x !== previousTile.x || newTile.y !== previousTile.y;
    });
    return noRevisitDirsArr;
  }
  
  prioritizeUnvisitedDirection(playerId, validDirs) {
    // Find any unvisited tiles within reach.
    const unvisitedDirsArr = validDirs.filter((dir) => {
      const newTile = getNewTilePositionByVector(this.getCurrTile(playerId), dir);
      return !this.isVisited(newTile.x, newTile.y);
    });
    return unvisitedDirsArr;
  }

  filterDeadEndTiles(playerId, validDirs) {
    const nonDeadEndTiles = validDirs.filter((dir) => {
      const newTile = getNewTilePositionByVector(this.getCurrTile(playerId), dir);
      const tileKey = generateTileKey(newTile.x, newTile.y);
      return !this.deadEndTileMap.has(tileKey);
    });
    return nonDeadEndTiles;
  }
}

export default Maze;