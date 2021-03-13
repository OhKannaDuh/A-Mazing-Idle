import Game from "../Game";
import { TileVector } from "../Maze";
import { getNewTilePositionByVector } from "../MazeGenerator";
import { StatsKey } from "../models/Stats";
import { UpgradeKey } from "../constants/UpgradeConstants";
declare var _: any;

const BASE_MOVEMENT_SPEED = 1000;
const BASE_MOVEMENT_REDUCTION = 0.98;
const AUTO_RE_ENABLE_RNG_BOT_TIMER = 3000;

const DEV_MODE_MOVEMENT_SPEED = 1;


class RNGBotManager {
  public game: Game;
  public isDevMode: boolean;
  public rngBotGlobalInterval: any;
  public rngBotReEnableMovementTimer: any;
  
  constructor(game, isDevMode) {
    this.game = game;
    this.isDevMode = isDevMode;
    this.rngBotGlobalInterval = null;
    this.rngBotReEnableMovementTimer = null;
  }

  enableGlobalRngBot() {
    let upgradeSpeed = this.game.upgrades.getUpgradeLevel(UpgradeKey.BOT_MOVEMENT_SPEED);
    
    clearInterval(this.rngBotGlobalInterval);
    
    this.rngBotGlobalInterval = setInterval(() => {
      // Move each player.
      this.game.players.getPlayerIdList().forEach((playerId: number) => {
        const player = this.game.players.getPlayer(playerId);
        if (player == null || player.isManuallyControlled) return;
        this.moveRandomly(playerId);
      });
      // Reset the interval with the new time interval
      if (upgradeSpeed !== this.game.upgrades.getUpgradeLevel(UpgradeKey.BOT_MOVEMENT_SPEED)) {
        this.disableGlobalRngBot();
        this.enableGlobalRngBot();
      }
    }, this.getBotMoveInterval(this.isDevMode));
  }

  getBotMoveInterval(isDevMode = false) {
    if (isDevMode) return DEV_MODE_MOVEMENT_SPEED;
    return BASE_MOVEMENT_SPEED * (Math.pow(BASE_MOVEMENT_REDUCTION, this.game.upgrades.getUpgradeLevel(UpgradeKey.BOT_MOVEMENT_SPEED)));
  }

  disableGlobalRngBot() {
    clearInterval(this.rngBotGlobalInterval);
    this.rngBotGlobalInterval = null;
    clearInterval(this.rngBotReEnableMovementTimer);
    this.rngBotReEnableMovementTimer = null;
  }

  // After a short delay, manually controlled bots will start moving again.
  enableReEnableBotMovementTimer() {
    this.disableReEnableBotMovementTimer();

    //TODO: this might be better handled within the player class.
    this.rngBotReEnableMovementTimer = setTimeout(() => {
      const player = this.game.players.getManuallyControlledPlayer();
      if (!player) return;
      
      player.isManuallyControlled = false;
      this.disableReEnableBotMovementTimer();
    }, AUTO_RE_ENABLE_RNG_BOT_TIMER);
  }

  disableReEnableBotMovementTimer() {
    clearTimeout(this.rngBotReEnableMovementTimer);
    this.rngBotReEnableMovementTimer = null;
  }

  disableGlobalMovement() {
    clearInterval(this.rngBotGlobalInterval);
    this.rngBotGlobalInterval = null;
  }

  moveRandomly(playerId) {
    if (!this.game.players.playerExists(playerId)) return;
    const dirArr = this.chooseRandomDirectionsArr(playerId);
    if (!dirArr || dirArr.length === 0) {
      return;
    }
    
    if (dirArr.length === 1) {
      this.game.players.movePlayer(playerId, dirArr[0]);
    } else {
      this.game.maze.spawnSplitBot(playerId, dirArr);
    }
  }

  chooseRandomDirectionsArr(playerId): TileVector[] {
    const validDirs = this.getPossibleDirectionsList(playerId);
    if (!validDirs) {
      return null;
    }

    const player = this.game.players.getPlayer(playerId);
    const possibleNewSplits = player.isUnlimitedSplit 
      ? validDirs.length
      : this.game.maze.getPossibleSplitBotCount(validDirs);

    // Only split if both directions are unvisited.
    const unvisitedDirs = this.game.upgrades.isUpgraded(UpgradeKey.PRIORITIZE_UNVISITED) 
      ? this.game.maze.prioritizeUnvisitedDirection(playerId, validDirs)
      : validDirs;
    
    // Must have at least two possible directions and one split available.
    if (possibleNewSplits >= 1 && unvisitedDirs.length >= 2) {
      const numDirectionsToPick = Math.min(possibleNewSplits + 1, unvisitedDirs.length);
      this.game.stats.addStatsToKey(numDirectionsToPick - 1, StatsKey.TOTAL_NUMBER_OF_BOT_SPLITS);
      return this.getRandomXValues(validDirs, numDirectionsToPick);
    }

    // Randomly pick one.
    const randDirIndex = this.getRandomInt(validDirs.length);
    return [validDirs[randDirIndex]];
  }

  getPossibleDirectionsList(playerId) {
    let validDirs = this.game.maze.getValidDirectionsByPlayerId(playerId);
    const player = this.game.players.getPlayer(playerId);
    if (validDirs.length === 0 || !player) {
      return;
    }
    

    if (this.game.upgrades.isUpgraded(UpgradeKey.AUTO_EXIT_MAZE) || this.game.players.playerHasSmartPathing(playerId)) {
      const exitDirsArr = this.game.maze.filterPlayerExitMazeDirection(playerId, validDirs);
      if (exitDirsArr.length > 0) {
        return exitDirsArr;
      }
    }
    
    // Remove all dead end tiles from possible directions.
    if (this.game.upgrades.getUpgradeLevel(UpgradeKey.BOT_REMEMBER_DEADEND_TILES) >= 1) {
      const filteredDirs = this.game.maze.filterDeadEndTiles(playerId, validDirs);
      if (filteredDirs.length > 0) {
        validDirs = filteredDirs;
      }
    }
    
    // Prioritize any adjacent unvisited tiles if any.
    if (this.game.upgrades.isUpgraded(UpgradeKey.PRIORITIZE_UNVISITED)) {
      const unvisitedDirsArr = this.game.maze.prioritizeUnvisitedDirection(playerId, validDirs);
      if (unvisitedDirsArr.length > 0) {
        return unvisitedDirsArr;
      }
    }

    // Avoid revisiting the last position if possible.
    if (this.game.upgrades.isUpgraded(UpgradeKey.AVOID_REVISIT_LAST_POSITION)) {
      const noRevisitDirs = this.game.maze.filterAvoidRevisitLastPosition(playerId, validDirs);
      if (noRevisitDirs.length > 0) {
        return noRevisitDirs;
      }
    }
    
    // No fancy moves, just choose random ones.
    return validDirs;
  }

  getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }

  getRandomXValues = (arr, pickX) => {
    return _.sampleSize(arr, pickX);
  }
}

export default RNGBotManager;