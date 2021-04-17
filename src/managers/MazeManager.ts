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
  MazeWallTypes,
  generateMazeGridAndAlgorithm,
} from "managers/MazeUtils";
import { UpgradeKey } from "constants/UpgradeConstants";
import { StatsKey } from "models/Stats";
import { MazeCell } from "models/MazeCell";
import { Maze } from "models/Maze";
import { MazeGrid } from "models/MazeGrid";
import Player from "models/Player";
declare var $: any;

export const DEFAULT_PLAYER_ID = 0;
const MAX_SPLITS_POSSIBLE = 4;

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

export class MazeManager {
  public game: Game;
  public isDevMode;
  public maze: Maze;
  public smartPathMaze: Array2D<number>;
  private mazeId: number;

  constructor(game, isDevMode = false) {
    this.game = game;
    this.isDevMode = isDevMode;
    this.maze = null;
    this.smartPathMaze = null;
    this.mazeId = 0;
  }

  public getGrid(): MazeGrid {
    return this.maze ? this.maze.grid : null;
  }

  public getNextMazeSize(): number {
    return (DEFAULT_MAZE_SIZE + this.game.upgrades.getUpgradeLevel(UpgradeKey.MAZE_SIZE_UPGRADE));
  }

  public getMazeId(): number {
    return this.mazeId;
  }

  public newMaze(): void {
    this.mazeId++;
    const mazeSize = this.getNextMazeSize();
    this.maze = generateMazeGridAndAlgorithm(this.game, mazeSize);
    this.smartPathMaze = generateMazeSmartPathingArr(this.game, this.maze);
    this.game.items.generateMazeItems();
  }

  public markVisited(tile: Tile, playerId: number): void {
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
    const border_radius_value = isPlayer ? "90%" : "0%";
    $(`#${new_tile_key}`).html(
      `<div style="background-color:${tileColor}; border-radius: ${border_radius_value};-moz-border-radius: ${border_radius_value}; width: 100%; height: 100%; z-index: -1"></div>`
    );
    $(`#${new_tile_key}`).css("background-color", this.game.colors.getVisitedTileColor());
  }

  public spawnSplitBot(player: Player, dirArr: TileVector[]): void {
    const currMazeId = this.game.maze.getMazeId();
    const currTile = this.game.players.getCurrTile(player.id);
    for (let i = 0; i < dirArr.length; i++) {
      // Player must move first to accommodate enforced movement.
      // Enforced movement will be first index of tile vectors
      if (i === 0) {
        // Move the original bot
        this.game.players.movePlayer(player.id, dirArr[i]);
        continue;
      }
      
      // Spawn new split bot in the new tile
      const newTile = getNewTilePositionByVector(currTile, dirArr[i]);
      const newPlayer = this.game.players.createNewPlayerObj(newTile, currMazeId);
      if (newPlayer) {
        this.game.stats.addStatsToKey(1, StatsKey.TOTAL_NUMBER_OF_BOT_SPLITS);
        newPlayer.setIsUnlimitedSplitItemActive(player.isUnlimitedSplitItemActive());
      }
    }
  }

  //TODO: move to colormanager
  public getTileBackgroundColor(tile: Tile): string {
    // Check for a player in the tile
    const playerColor = this.game.players.getPlayerColorAtTile(tile);
    if (playerColor != null) {
      return playerColor;
    }
    
    if (this.maze.grid.getCell(tile).isMarkedAsDeadEnd()) {
      return this.game.colors.getDeadEndTileColor();
    }
    if (this.getGrid().isVisited(tile)) {
      return this.game.colors.getVisitedTileColor();
    }
    return this.game.colors.getTileColor();
  }

  public updatePlayerTileByTileVector(playerId: number, dirVector: TileVector): void {
    const playerCurrTile = this.game.players.getCurrTile(playerId);
    const newTile = getNewTilePositionByVector(playerCurrTile, dirVector);
    this.updatePlayerTile(playerId, newTile);
  }

  public updatePlayerTile(playerId: number, newTile: Tile): void {
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
    this.updateDeadEndTileValue(newTile);
    this.updatePlayerDeadEndPathing(playerId);

    this.setTileBackgroundColor(player.prevTile);
    this.setTileBackgroundColor(newTile, true);

    // Pick up items if any are on the tile
    this.game.items.pickupItem(newTile, playerId);

    this.handlePlayerMerges(newTile);
  }

  private handlePlayerMerges(tile: Tile): void {
    if (!this.game.upgrades.isUpgraded(UpgradeKey.BOT_SPLIT_BOT_AUTO_MERGE)) return;
    
    // Assume only two possible players on a single tile since they all move one at a time
    const playerIdsAtTileArr = this.game.players.getPlayerIdsAtTile(tile);
    if (playerIdsAtTileArr.length <= 1) return;
    if (playerIdsAtTileArr.length > 2) {
      console.error(`False assumption about max number of players per tile: ${playerIdsAtTileArr.length}`);
      return;
    }
    const player1 = this.game.players.getPlayer(playerIdsAtTileArr[0]);
    const player2 = this.game.players.getPlayer(playerIdsAtTileArr[1]);
    
    const playerToMerge: Player = this.pickPlayerToMerge(player1, player2);
    const playerToLive: Player = playerToMerge === player1 ? player2 : player1;
    if (!playerToMerge) return;
    
    // Pass along any bot passives.
    playerToLive.mergePlayerPassives(playerToMerge);

    this.game.stats.addStatsToKey(1, StatsKey.TOTAL_NUMBER_OF_BOT_MERGES);
    this.game.players.deletePlayer(playerToMerge.id);
  }

  private pickPlayerToMerge(player1: Player, player2: Player): Player {
    if (!player1 || !player2) return null;

    // Manual controlled players don't merge
    if (player1.isManuallyControlled) return player2;
    if (player2.isManuallyControlled) return player1;

    if (this.game.upgrades.isUpgraded(UpgradeKey.BOT_SMART_MERGE)) { 
      // If a player is coming from a dead end, don't merge them
      if (player1.isPathingFromDeadEnd()) {
        return player2;
      } else if (player2.isPathingFromDeadEnd()) {
        return player1;
      }
    }
    return player1;
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

    if (this.getGrid().getCellWallType(tile, mazeDirectionIndex) === MazeWallTypes.DESTRUCTIBLE_WALL &&
        this.getGrid().getCellWallType(neighborTile, neighborDirectionIndex) === MazeWallTypes.DESTRUCTIBLE_WALL) {
      this.maze.getCell(tile).setWallTypeAtIndex(mazeDirectionIndex, MazeWallTypes.NO_WALL);
      this.maze.getCell(neighborTile).setWallTypeAtIndex(neighborDirectionIndex, MazeWallTypes.NO_WALL);
        
      // Update the UI with the new tile border css.
      this.game.ui.setTileCssV2(this.maze, tile);
      this.game.ui.setTileCssV2(this.maze, neighborTile);
    }
  }

  public canMove(tile: Tile, dirVector: TileVector, isExcludeExit: boolean = false, 
                 isIgnoreDestructibleWalls: boolean = false, isIgnoreWalls: boolean = false): boolean {
    
    const newTile = getNewTilePositionByVector(tile, dirVector);

    // Check if maze exit and is valid tile
    if (this.getGrid().isMazeExitTile(newTile) && !isExcludeExit) return true;
    if (!this.maze.grid.isValidTile(newTile)) return false;
    if (isIgnoreWalls) return true;

    let tileVal: MazeWallTypes = null;
    // Check for walls in current tile in each direction
    if (dirVector === DIRECTION_UP) {
      tileVal = this.getGrid().getCellWallType(tile, MazeDirectionIndex.UP);
    } else if (dirVector === DIRECTION_DOWN) {
      tileVal = this.getGrid().getCellWallType(tile, MazeDirectionIndex.DOWN);
    } else if (dirVector === DIRECTION_LEFT) {
      tileVal = this.getGrid().getCellWallType(tile, MazeDirectionIndex.LEFT);
    } else if (dirVector === DIRECTION_RIGHT) {
      tileVal = this.getGrid().getCellWallType(tile, MazeDirectionIndex.RIGHT);
    }

    return (tileVal === MazeWallTypes.NO_WALL || (isIgnoreDestructibleWalls && tileVal === MazeWallTypes.DESTRUCTIBLE_WALL));
  }

  public getPossibleSplitBotCount(validDirCount: number, player: Player): number {
    if (validDirCount <= 1) {
      return 0;
    }
    if (player && player.isUnlimitedSplitItemActive()) {
      return Math.min(validDirCount, MAX_SPLITS_POSSIBLE);
    }

    // Total bots active
    const shouldIgnoreManualPlayer = this.game.upgrades.isUpgraded(UpgradeKey.PLAYER_MOVE_INDEPENDENTLY);
    const rngBotCount = this.game.players.getPlayerCount(shouldIgnoreManualPlayer);
    const splitUpgradeCount = this.game.upgrades.getUpgradeLevel(UpgradeKey.BOT_SPLIT_DIRECTION);

    // One bot auto-allowed, and +1 extra bot allowed per upgrade
    const allowedSplits = Math.max(0, splitUpgradeCount + 1 - rngBotCount);
    return Math.min(validDirCount, allowedSplits);
  }

  public teleportPlayerBackToBot(): void {
    const manualPlayer = this.game.players.getManuallyControlledPlayer();
    const primaryBot = this.game.players.getFirstAutoBot();
    if (!manualPlayer || !primaryBot) return;

    // Move player and delete the bot.
    this.updatePlayerTile(manualPlayer.id, primaryBot.currTile);
    this.game.players.deletePlayer(primaryBot.id);
  }

  public teleportBotBackToPlayer(): void {
    const manualPlayer = this.game.players.getManuallyControlledPlayer();
    const primaryBot = this.game.players.getFirstAutoBot();
    if (!manualPlayer || !primaryBot) return;

    // Move player and delete the bot.
    this.updatePlayerTile(primaryBot.id, manualPlayer.currTile);
    this.game.players.deletePlayer(primaryBot.id);
  }

  public getValidDirectionsByPlayerId(playerId: number): TileVector[] {
    const player = this.game.players.getPlayer(playerId);
    return this.getValidDirectionsByTile(player.currTile, player.isGhostItemActive());
  }

  public getValidDirectionsByTile(tile: Tile, isIgnoreWalls: boolean = false, isIncludeDestructible: boolean = false): TileVector[] {
    return DIRECTIONS_ARR.filter((dir) => this.canMove(tile, dir, false, isIncludeDestructible, isIgnoreWalls));
  }

  public getDeadEndValue(tile: Tile, validDirsArr: TileVector[]): number {
    const upgradeCount = this.game.upgrades.getUpgradeLevel(UpgradeKey.BOT_REMEMBER_DEADEND_TILES);
    let deadEndCount = 0, deadEndMaxVal = 0;

    // Count dead ends from valid dirs
    validDirsArr.forEach((dir) => {
      const newTile = getNewTilePositionByVector(tile, dir);
      const cell = this.getGrid().getCell(newTile);
      if (cell && cell.isMarkedAsDeadEnd()) {
        deadEndCount++;
        deadEndMaxVal = Math.max(cell.getDeadEndCelLValue(), deadEndMaxVal);
      }
    });

    // All but one are deadends -- return the max value if within upgrade limit
    if (deadEndCount === (validDirsArr.length - 1) && deadEndMaxVal < upgradeCount) {
      return deadEndMaxVal + 1;
    }
    return null;
  }

  public updateDeadEndTileValue(tile: Tile): void {
    const upgradeCount = this.game.upgrades.getUpgradeLevel(UpgradeKey.BOT_REMEMBER_DEADEND_TILES);
    if (upgradeCount === 0) {
      return;
    }
    const validDirsArr = this.getValidDirectionsByTile(tile, false, true);

    if (validDirsArr.length === 1) {
      this.game.stats.addStatsToKey(1, StatsKey.TOTAL_NUMBER_DEAD_ENDS_MARKED);
      const cell = this.getGrid().getCell(tile);
      if (cell) {
        cell.setDeadEndCellValue(1);
      }
      return;
    }

    const deadEndDistance = this.getDeadEndValue(tile, validDirsArr);
    if (deadEndDistance != null) {
      this.game.stats.addStatsToKey(1, StatsKey.TOTAL_NUMBER_DEAD_ENDS_MARKED);
      const cell = this.getGrid().getCell(tile);
      if (cell) {
        cell.setDeadEndCellValue(deadEndDistance);
      }
    }
  }

  public filterPlayerExitMazeDirection(playerId: number, validDirs: TileVector[]): TileVector {
    if (!this.game.players.playerExists(playerId)) return null;

    const currTile = this.game.players.getPlayer(playerId).currTile;
    const currDistance = this.getSmartPathingDistanceFromExit(currTile);

    // Find best direction
    const exitMazeDir: TileVector = validDirs.find((dir) => {
      const newTile = getNewTilePositionByVector(currTile, dir);
      // Exit tile or one step closer to exit. If distance 1, MUST be exit tile.
      return (this.getGrid().isMazeExitTile(newTile)
          || (currDistance !== 1 &&
              this.maze.grid.isValidTile(newTile) &&
              this.getSmartPathingDistanceFromExit(newTile) === currDistance - 1)
      );
    });
    // This will happen for "luck" because the "expected" directions will not always include the exit pathway
    if (exitMazeDir == null) {
      return null;
    }

    return exitMazeDir;
  }

  public filterAvoidRevisitLastPosition(playerId, validDirs): TileVector[] {
    if (!this.game.players.playerExists(playerId)) return;
    // Find any tiles that are not the previous tile.
    const noRevisitDirsArr = validDirs.filter((dir) => {
      const previousTile = this.game.players.getPreviousTile(playerId);
      const newTile = getNewTilePositionByVector(this.game.players.getCurrTile(playerId), dir);
      return !isTileEqual(newTile, previousTile);
    });
    return noRevisitDirsArr;
  }

  public prioritizeUnvisitedDirection(playerId: number, validDirs: TileVector[]): TileVector[] {
    if (!this.game.players.playerExists(playerId)) return [];
    // Find any unvisited tiles within reach.
    const unvisitedDirsArr = validDirs.filter((dir) => {
      const newTile = getNewTilePositionByVector(this.game.players.getCurrTile(playerId), dir);
      return !this.getGrid().isVisited(newTile);
    });
    return unvisitedDirsArr;
  }

  public filterDeadEndTiles(playerId, validDirs): TileVector[] {
    if (!this.game.players.playerExists(playerId)) return [];

    const nonDeadEndTiles = validDirs.filter((dir) => {
      const newTile = getNewTilePositionByVector(this.game.players.getCurrTile(playerId), dir);
      const cell = this.maze.grid.getCell(newTile);
      //TODO: this is pretty hacky. Exit cells are not actually part of the grid.
      return cell ? !cell.isMarkedAsDeadEnd() : true;
    });
    return nonDeadEndTiles;
  }

  public getTotalPossiblePaths(playerId: number): number {
    if (!this.game.players.playerMap.has(playerId)) return 0;
    const tile = this.game.players.getPlayer(playerId).currTile;

    // Test if there are more than 1 valid directions (assuming pre-visited)
    let validDirs = this.getValidDirectionsByTile(tile, false, true);

    // Filter out dead ends
    if (this.game.upgrades.getUpgradeLevel(UpgradeKey.BOT_REMEMBER_DEADEND_TILES) >= 1) {
      const filteredDirs = this.game.maze.filterDeadEndTiles(playerId, validDirs);
      validDirs = filteredDirs;
    }
    
    return validDirs.length;
  }

  // Dead end pathing is for smart merging purposes.
  // Allows us to keep track if player is moving away from a dead end and prioritizes that player during merges.
  public updatePlayerDeadEndPathing(playerId: number): void {
    const player = this.game.players.getPlayer(playerId);
    if (!player) return;
    const isPathingFromDeadEnd = player.isPathingFromDeadEnd();
    const totalPossiblePaths = this.getTotalPossiblePaths(playerId);
    
    // If only single path (excluding dead-end markings), must be dead end.
    if (totalPossiblePaths === 1) {
      player.setIsPathingFromDeadEnd(true);
    }
    
    // If more than forward/back direction, not a dead end anymore!
    if (totalPossiblePaths > 2) {
      player.setIsPathingFromDeadEnd(false);
    }
  }
}
