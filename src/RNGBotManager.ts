
import Game from "./Game";
import { TileVector } from "./Maze";
import { UpgradeKey } from "./upgrades/UpgradeConstants";
declare var _: any;

const BASE_MOVEMENT_SPEED = 1000;
const BASE_MOVEMENT_REDUCTION = 0.98;
const AUTO_RE_ENABLE_RNG_BOT_TIMER = 3000;

const DEV_MODE_MOVEMENT_SPEED = 1;

interface RNGBot {
  id: string;
  rngBotMoveInterval: any;
  rngBotReEnableTimer: any
}

class RNGBotManager {
  public game: Game;
  public isDevMode: boolean;
  public rngBotMap: Map<number, RNGBot>;
  
  constructor(game, isDevMode) {
    this.game = game;
    this.isDevMode = isDevMode;

    //TODO: make an object for each rngbot
    this.rngBotMap = new Map();
  }

  manualMovementCancelRngBot(playerId) {
    const rngBot = this.rngBotMap.get(playerId);
    
    this.disableRngBot(rngBot.id);
    clearInterval(rngBot.rngBotReEnableTimer);
    //TODO: we need to handle splitting in the future -- need another signal for this.
    if (this.game.maze.getPlayerCount() === 1) {
      rngBot.rngBotReEnableTimer = setTimeout(() => {
          this.enableRngBot(rngBot.id);
      }, AUTO_RE_ENABLE_RNG_BOT_TIMER);
    }
  }

  moveRandomly(playerId) {
    if (!this.game.maze.playerMap.has(playerId)) return;
    const dirArr = this.chooseRandomDirectionsArr(playerId);
    if (dirArr.length === 0) {
      return;
    }
    
    if (dirArr.length === 1) {
      this.game.maze.movePlayer(playerId, dirArr[0]);
    } else {
      this.game.maze.spawnSplitBot(playerId, dirArr);
    }
  }

  enableRngBot(playerId) {
    if (!this.rngBotMap.has(playerId)) {
      this.rngBotMap.set(playerId, { id: playerId, rngBotMoveInterval: null, rngBotReEnableTimer: null });
    }
    const rngBot = this.rngBotMap.get(playerId);
    let upgradeSpeed = this.game.upgrades.getUpgradeLevel(UpgradeKey.BOT_MOVEMENT_SPEED);
    
    clearInterval(rngBot.rngBotMoveInterval);
    
    rngBot.rngBotMoveInterval = setInterval(() => {
      this.moveRandomly(rngBot.id);
      if (upgradeSpeed !== this.game.upgrades.getUpgradeLevel(UpgradeKey.BOT_MOVEMENT_SPEED)) {
        this.disableRngBot(rngBot.id);
        this.enableRngBot(rngBot.id);
      }
    }, this.getBotMoveInterval(this.isDevMode));
  }

  getBotMoveInterval(isDevMode = false) {
    if (isDevMode) return DEV_MODE_MOVEMENT_SPEED;
    return BASE_MOVEMENT_SPEED * (Math.pow(BASE_MOVEMENT_REDUCTION, this.game.upgrades.getUpgradeLevel(UpgradeKey.BOT_MOVEMENT_SPEED)));
  }

  disableRngBot(playerId) {
    if (!this.rngBotMap.has(playerId)) return;
    clearInterval(this.rngBotMap.get(playerId).rngBotMoveInterval);
    this.rngBotMap.get(playerId).rngBotMoveInterval = null;
    clearInterval(this.rngBotMap.get(playerId).rngBotReEnableTimer);
    this.rngBotMap.get(playerId).rngBotReEnableTimer = null;
  }

  deleteAllRngBot() {
    for (let [id, bot] of this.rngBotMap) {
      this.disableRngBot(id);
    }
    this.rngBotMap.clear();
  }

  deleteRngBot(playerId) {
    if (!this.rngBotMap.has(playerId)) {
      return;
    }
    this.disableRngBot(playerId);
    this.rngBotMap.delete(playerId);
  }

  chooseRandomDirectionsArr(playerId): TileVector[] {
    const validDirs = this.getPossibleDirectionsList(playerId);
    if (!validDirs) {
      return null;
    }

    const possibleNewSplits = this.game.maze.getPossibleSplitBotCount(validDirs)
    if (possibleNewSplits > 0) {
      const numDirectionsToPick = Math.min(possibleNewSplits + 1, validDirs.length);
      return this.getRandomXValues(validDirs, numDirectionsToPick);
    }

    // Randomly pick one.
    const randDirIndex = this.getRandomInt(validDirs.length);
    return [validDirs[randDirIndex]];
  }

  getPossibleDirectionsList(playerId) {
    let validDirs = this.game.maze.getValidDirectionsByPlayerId(playerId);
    if (validDirs.length === 0) {
      return;
    }

    if (this.game.upgrades.isUpgraded(UpgradeKey.AUTO_EXIT_MAZE)) {
      const exitDirsArr = this.game.maze.filterPlayerExitMazeDirection(playerId, validDirs);
      if (exitDirsArr.length > 0) {
        return exitDirsArr;
      }
    }
    
    // Remove all dead end tiles from possible directions.
    if (this.game.upgrades.getUpgradeLevel(UpgradeKey.BOT_REMEMBER_DEADEND_TILES) >= 1) {
      validDirs = this.game.maze.filterDeadEndTiles(playerId, validDirs);
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