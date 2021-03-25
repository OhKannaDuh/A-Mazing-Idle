import Game from "managers/Game";
import { 
  DEFAULT_MAZE_SIZE,
  DIRECTIONS_ARR,
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
  generateMazeSmartPathingArr, 
  generateTileKey, 
  getInverseDirectionIndex, 
  getNewTilePositionByVector, 
  isTileEqual, 
  MazeDirectionIndex, 
  MazeGridType, 
  MazeWallTypes 
} from "managers/MazeUtils";
import { UpgradeKey } from "constants/UpgradeConstants";
import { StatsKey } from "models/Stats";
import { BacktrackerMaze } from "maze/BackTrackerMaze";
import { BinaryTreeMaze } from "maze/BinaryTreeMaze";
import { PrimsMaze } from "maze/PrimsMaze";
import { MazeCell } from "models/MazeCell";
import { Maze } from "models/Maze";
import { MazeGrid } from "models/MazeGrid";
declare var $: any;


export const DEFAULT_PLAYER_ID = 0;

export type Array2D<T> = Array<Array<T>>;
export type MazeGridArray = Array2D<MazeCell>;

export interface Tile {
  x: number;
  y: number;
}

export interface TileVector {
  x: number;
  y: number;
}

class MazeManager {
  public game: Game;
  public isDevMode;
  public maze: Maze;
  public visitedMaze: Array2D<boolean>;
  public smartPathMaze: Array2D<number>;
  public deadEndTileMap: Map<string, number>;

  constructor(game, isDevMode = false) {
    this.game = game;
    this.isDevMode = isDevMode;
    this.maze = null;
    this.visitedMaze = null;
    this.smartPathMaze = null;
    this.deadEndTileMap = new Map<string, number>();
  }

  public getGrid(): MazeGrid {
    return this.maze.grid;
  }

  public getNextMazeSize() {
    return DEFAULT_MAZE_SIZE + this.game.upgrades.getUpgradeLevel(UpgradeKey.MAZE_SIZE_UPGRADE);
  }
  
  public newMaze() {
    const mazeSize = this.getNextMazeSize();
    //TODO: vary based on time zone
    // this.maze = new BacktrackerMaze(mazeSize, MazeGridType.RECTANGLE);
    this.maze = new PrimsMaze(mazeSize, MazeGridType.RECTANGLE);
    // this.maze = new BinaryTreeMaze(mazeSize, MazeGridType.PLUS_SIGN);
    this.smartPathMaze = generateMazeSmartPathingArr(this.game, this.maze);
    this.deadEndTileMap = new Map();
    this.game.items.generateMazeItems();
  }

  public markVisited(tile: Tile, playerId: number) {
    const isTileVisited = this.getGrid().isVisited(tile);
    this.game.points.addVisitPoints(isTileVisited, playerId);
    
    if (isTileVisited) {
      this.game.stats.addStatsToKey(1, StatsKey.TOTAL_TILES_REVISITED);
    } else {
      this.game.stats.addStatsToKey(1, StatsKey.TOTAL_TILES_VISITED);
    }

    this.getGrid().setVisited(tile);
  }

  public getSmartPathingDistanceFromExit(tile: Tile): number {
    return this.smartPathMaze[tile.y][tile.x];
  }

  public setTileBackgroundColor(tile: Tile, isPlayer: boolean = false): void {
    const tileColor = this.getTileBackgroundColor(tile);
    const new_tile_key = generateTileKey(tile.x, tile.y);
    $(`#${new_tile_key}`).css('background-color', tileColor);
    $(`#${new_tile_key}`).css('-moz-border-radius', isPlayer ? '90%' : '0%');
    $(`#${new_tile_key}`).css('border-radius', isPlayer ? '90%' : '0%');
    $(`#${new_tile_key}`).css('z-index', -1);
  }

  public spawnSplitBot(playerId: number, dirArr, isUnlimitedSplit: boolean): void {
    const currTile = this.game.players.getCurrTile(playerId);
    for (let i = 0; i < dirArr.length; i++) {
      if (i === 0) {
        // Move the original bot
        this.game.players.movePlayer(playerId, dirArr[i]);
        continue;
      }
      // Spawn new split bot in the new tile
      const newTile = getNewTilePositionByVector(currTile, dirArr[i]);
      const newPlayer = this.game.players.createNewPlayerObj(newTile);
      newPlayer.isUnlimitedSplitItemActive = isUnlimitedSplit;
    }
  }
  
  //TODO: move to colormanager
  public getTileBackgroundColor(tile: Tile) {
    // Check for a player in the tile
    const playerColor = this.game.players.getPlayerColorAtTile(tile);
    if (playerColor != null) {
      return playerColor;
    }
    const tileKey = generateTileKey(tile.x, tile.y);
    if (this.deadEndTileMap.has(tileKey)) {
      return this.game.colors.getDeadEndTileColor();
    }
    if (this.getGrid().isVisited(tile)) {
      return this.game.colors.getVisitedTileColor();
    }
    return this.game.colors.getTileColor();
  }

  public updatePlayerTileByTileVector(playerId: number, dirVector: TileVector) {
    const playerCurrTile = this.game.players.getCurrTile(playerId);
    const newTile = getNewTilePositionByVector(playerCurrTile, dirVector);
    this.updatePlayerTile(playerId, newTile);
  }

  public updatePlayerTile(playerId: number, newTile: Tile) {
    const player = this.game.players.getPlayer(playerId);
    if (this.getGrid().isMazeExitTile(newTile)) {
      this.game.completeMaze(playerId);
      return;
    }

    // Clear destructible tiles after they move away from the tile
    this.clearDestructibleTilesFromTile(player.currTile);

    player.prevTile = { x: player.currTile.x, y: player.currTile.y };
    player.currTile = { x: newTile.x, y: newTile.y };
    
    this.markVisited(newTile, playerId);
    this.updateDeadEndTilesMap(newTile);
    
    this.setTileBackgroundColor(player.prevTile);
    this.setTileBackgroundColor(newTile, true);
    
    // Pick up items if any are on the tile
    this.game.items.pickupItem(newTile, playerId);

    if (this.game.upgrades.getUpgradeLevel(UpgradeKey.BOT_SPLIT_BOT_AUTO_MERGE)) {
      const playerIdsAtTileArr = this.game.players.getPlayerIdsAtTile(player.currTile);
      playerIdsAtTileArr.forEach(killPlayerId => {
        const mergedPlayer = this.game.players.getPlayer(killPlayerId);

        if (killPlayerId !== playerId && !mergedPlayer.isManuallyControlled) {
          this.game.stats.addStatsToKey(1, StatsKey.TOTAL_NUMBER_OF_BOT_MERGES);

          // Pass along any bot passives.
          if (mergedPlayer.hasMultiplierItemActive()) {
            player.isMultiplierItemActive = true;
          }
          if (mergedPlayer.hasSmartPathingRemaining()) {
            player.smartPathingTileDistanceRemaining += mergedPlayer.smartPathingTileDistanceRemaining;
          }
          if (mergedPlayer.isPrimaryBot) {
            player.isPrimaryBot = true;
          }
          this.game.players.deletePlayer(killPlayerId);
        }
      });
    }
  }

  public clearDestructibleTilesFromTile(tile: Tile) {
    this.clearDestructibleTileByVector(tile, DIRECTION_UP, MazeDirectionIndex.UP);
    this.clearDestructibleTileByVector(tile, DIRECTION_DOWN, MazeDirectionIndex.DOWN);
    this.clearDestructibleTileByVector(tile, DIRECTION_LEFT, MazeDirectionIndex.LEFT);
    this.clearDestructibleTileByVector(tile, DIRECTION_RIGHT, MazeDirectionIndex.RIGHT);
  }

  public clearDestructibleTileByVector(tile: Tile, direction: TileVector, mazeDirectionIndex: MazeDirectionIndex): void {
    const neighborTile = getNewTilePositionByVector(tile, direction);
    if (!this.maze.grid.isValidTile(neighborTile)) return;
    
    // Neighbor has inverse direction
    const neighborDirectionIndex = getInverseDirectionIndex(mazeDirectionIndex);
    
    if (this.getGrid().getCellWallType(tile, mazeDirectionIndex) === MazeWallTypes.DESTRUCTIBLE_WALL
        && this.getGrid().getCellWallType(tile, neighborDirectionIndex) === MazeWallTypes.DESTRUCTIBLE_WALL) {
        this.maze.getCell(tile).setWallTypeAtIndex(mazeDirectionIndex, MazeWallTypes.NO_WALL);
        this.maze.getCell(neighborTile).setWallTypeAtIndex(neighborDirectionIndex, MazeWallTypes.NO_WALL);
        
        // Update the UI with the new tile border css.
        this.game.ui.setTileCssV2(this.maze, tile);
        this.game.ui.setTileCssV2(this.maze, neighborTile);
    }
  }

  public canMove(tile: Tile, dirVector: TileVector, isExcludeExit: boolean = false, isIgnoreDestructibleWalls: boolean = false, isIgnoreWalls: boolean = false): boolean {
    const newTile = getNewTilePositionByVector(tile, dirVector);
    
    // Check if maze exit and is valid tile
    if (this.getGrid().isMazeExitTile(newTile) && !isExcludeExit) return true;
    if (!this.maze.grid.isValidTile(newTile)) return false;
    if (isIgnoreWalls) return true;

    let tileVal: MazeWallTypes = null;
    // Check for walls in current tile in each direction
    if (dirVector === DIRECTION_UP) {
      tileVal = this.getGrid().getCellWallType(tile, MazeDirectionIndex.UP);
    }
    else if (dirVector === DIRECTION_DOWN) {
      tileVal = this.getGrid().getCellWallType(tile, MazeDirectionIndex.DOWN);
    }
    else if (dirVector === DIRECTION_LEFT) {
      tileVal = this.getGrid().getCellWallType(tile, MazeDirectionIndex.LEFT);
    }
    else if (dirVector === DIRECTION_RIGHT) {
      tileVal = this.getGrid().getCellWallType(tile, MazeDirectionIndex.RIGHT);
    }
    
    return tileVal === MazeWallTypes.NO_WALL 
      || (isIgnoreDestructibleWalls && tileVal === MazeWallTypes.DESTRUCTIBLE_WALL);
  }

  public getPossibleSplitBotCount(validDirs) {
    if (validDirs.length <= 1) {
      return 0;
    }
    
    // Total bots active
    const shouldIgnoreManualPlayer = this.game.upgrades.isUpgraded(UpgradeKey.PLAYER_MOVE_INDEPENDENTLY);
    const rngBotCount = this.game.players.getPlayerCount(shouldIgnoreManualPlayer);
    const splitUpgradeCount = this.game.upgrades.getUpgradeLevel(UpgradeKey.BOT_SPLIT_DIRECTION);
    
    // One bot auto-allowed, and +1 extra bot allowed per upgrade
    return Math.max(0, (splitUpgradeCount + 1 - rngBotCount));
  }

  public teleportPlayerBackToBot(): void {
    const manualPlayer = this.game.players.getManuallyControlledPlayer();
    const primaryBot = this.game.players.getPrimaryBot();
    if (!manualPlayer || !primaryBot) return;
    
    // Move player and delete the bot.
    this.updatePlayerTile(manualPlayer.id, primaryBot.currTile);
    this.game.players.deletePlayer(primaryBot.id);
  }

  public teleportBotBackToPlayer(): void {
    const manualPlayer = this.game.players.getManuallyControlledPlayer();
    const primaryBot = this.game.players.getPrimaryBot();
    if (!manualPlayer || !primaryBot) return;

    // Move player and delete the bot.
    this.updatePlayerTile(primaryBot.id, manualPlayer.currTile);
    this.game.players.deletePlayer(primaryBot.id);
  }
  
  public getValidDirectionsByPlayerId(playerId) {
    const player = this.game.players.getPlayer(playerId);
    return this.getValidDirectionsByTile(player.currTile, player.hasGhostItemActive());
  }

  public getValidDirectionsByTile(tile, isIgnoreWalls = false, isIncludeDestructible = false) {
    const validDirsArr = DIRECTIONS_ARR.filter((dir) => this.canMove(tile, dir, false, isIncludeDestructible, isIgnoreWalls));
    return validDirsArr;
  }

  public getDeadEndValue(tile, validDirsArr) {
    let deadEndCount = 0, deadEndMaxVal = 0;
    const upgradeCount = this.game.upgrades.getUpgradeLevel(UpgradeKey.BOT_REMEMBER_DEADEND_TILES);

    // Count dead ends from valid dirs
    validDirsArr.forEach(dir => {
      const newTile = getNewTilePositionByVector(tile, dir);
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

  public updateDeadEndTilesMap(tile) {
    const upgradeCount = this.game.upgrades.getUpgradeLevel(UpgradeKey.BOT_REMEMBER_DEADEND_TILES);
    if (upgradeCount === 0) {
      return;
    }
    const validDirsArr = this.getValidDirectionsByTile(tile, false, true);
    const tileKey = generateTileKey(tile.x, tile.y);
    
    if (validDirsArr.length === 1) {
      this.game.stats.addStatsToKey(1, StatsKey.TOTAL_NUMBER_DEAD_ENDS_MARKED);
      this.deadEndTileMap.set(tileKey, 1);
      return;
    }
    
    const deadEndDistance = this.getDeadEndValue(tile, validDirsArr);
    if (deadEndDistance != null) {
      this.game.stats.addStatsToKey(1, StatsKey.TOTAL_NUMBER_DEAD_ENDS_MARKED);
      this.deadEndTileMap.set(tileKey, deadEndDistance);
    }
  }

  public filterPlayerExitMazeDirection(playerId, validDirs) {
    if (!this.game.players.playerExists(playerId)) return;
    
    const currTile = this.game.players.getPlayer(playerId).currTile;
    const currDistance = this.getSmartPathingDistanceFromExit(currTile);
    
    const autoExitMazeUpgradeLevel: number = this.game.upgrades.getUpgradeLevel(UpgradeKey.AUTO_EXIT_MAZE);
    const playerHasSmartPathing: boolean = this.game.players.playerHasSmartPathing(playerId);

    // Check if within X tiles of exit (1 per upgrade) and player has no smart pathing
    if (currDistance > autoExitMazeUpgradeLevel && !playerHasSmartPathing) {
      return [];
    }
    
    // Find best direction
    const exitMazeDir = validDirs.filter((dir) => {
      const newTile = getNewTilePositionByVector(currTile, dir);
      // Exit tile or one step closer to exit. If distance 1, MUST be exit tile.
      return this.getGrid().isMazeExitTile(newTile) || (currDistance !== 1 && this.maze.grid.isValidTile(newTile)
          && this.getSmartPathingDistanceFromExit(newTile) === (currDistance - 1));
    });
    return exitMazeDir;
  }

  public filterAvoidRevisitLastPosition(playerId, validDirs) {
    if (!this.game.players.playerExists(playerId)) return;
    // Find any tiles that are not the previous tile.
    const noRevisitDirsArr = validDirs.filter((dir) => {
      const previousTile = this.game.players.getPreviousTile(playerId);
      const newTile = getNewTilePositionByVector(this.game.players.getCurrTile(playerId), dir);
      return !isTileEqual(newTile, previousTile);
    });
    return noRevisitDirsArr;
  }
  
  public prioritizeUnvisitedDirection(playerId, validDirs) {
    if (!this.game.players.playerExists(playerId)) return;
    // Find any unvisited tiles within reach.
    const unvisitedDirsArr = validDirs.filter((dir) => {
      const newTile = getNewTilePositionByVector(this.game.players.getCurrTile(playerId), dir);
      return !this.getGrid().isVisited(newTile);
    });
    return unvisitedDirsArr;
  }

  public filterDeadEndTiles(playerId, validDirs) {
    if (!this.game.players.playerExists(playerId)) return;

    const nonDeadEndTiles = validDirs.filter((dir) => {
      const newTile = getNewTilePositionByVector(this.game.players.getCurrTile(playerId), dir);
      const tileKey = generateTileKey(newTile.x, newTile.y);
      return !this.deadEndTileMap.has(tileKey);
    });
    return nonDeadEndTiles;
  }
}

export default MazeManager;
