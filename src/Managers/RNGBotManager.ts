import { PowerUpKey } from "constants/PowerUpConstants";
import { UpgradeKey } from "constants/UpgradeConstants";
import Game from "managers/Game";
import { TileVector } from "managers/MazeManager";
import { StatsKey } from "models/Stats";
import { BotLuckyGuessUpgrade } from "upgrades/definitions/bots/BotLuckUpgrade";
import { isTileEqual } from "./MazeUtils";

declare var _: any;

const BASE_MOVEMENT_SPEED = 1000;
const BASE_MOVEMENT_REDUCTION = 0.98;
const AUTO_RE_ENABLE_RNG_BOT_TIMER = 3000;

const DEV_MODE_MOVEMENT_SPEED = 1;


export class RNGBotManager {
  public game: Game;
  private isDevMode: boolean;
  private rngBotGlobalInterval: any;
  private rngBotReEnableMovementTimer: any;
  
  constructor(game, isDevMode) {
    this.game = game;
    this.isDevMode = isDevMode;
    this.rngBotGlobalInterval = null;
    this.rngBotReEnableMovementTimer = null;
  }

  public enableGlobalRngBot(): void {
    let upgradeSpeed = this.game.upgrades.getUpgradeLevel(UpgradeKey.BOT_MOVEMENT_SPEED);
    let isSpeedPowerUpActive = this.game.powerUps.isPowerUpActive(PowerUpKey.SPEED_UP);
    
    clearInterval(this.rngBotGlobalInterval);
    
    this.rngBotGlobalInterval = setInterval(() => {
      if (!this.game.upgrades.isUpgraded(UpgradeKey.AUTO_MOVE)) return;
      
      // Move each player.
      this.game.players.getPlayerIdList().forEach((playerId: number) => {
        const player = this.game.players.getPlayer(playerId);
        if (player == null || player.isManuallyControlled) return;
        this.moveRandomly(playerId);
      });
      // Reset the interval with the new time interval
      if (upgradeSpeed !== this.game.upgrades.getUpgradeLevel(UpgradeKey.BOT_MOVEMENT_SPEED)
          || isSpeedPowerUpActive !== this.game.powerUps.isPowerUpActive(PowerUpKey.SPEED_UP)) {
        this.disableGlobalRngBot();
        this.enableGlobalRngBot();
      }
    }, this.getBotMoveInterval(this.isDevMode));
  }

  public getBotMoveInterval(isDevMode = false): number {
    if (isDevMode) return DEV_MODE_MOVEMENT_SPEED;
    const speedPowerUpMultiplier: number = this.game.powerUps.isPowerUpActive(PowerUpKey.SPEED_UP) ? .5 : 1;
    return BASE_MOVEMENT_SPEED * speedPowerUpMultiplier * (Math.pow(BASE_MOVEMENT_REDUCTION, this.game.upgrades.getUpgradeLevel(UpgradeKey.BOT_MOVEMENT_SPEED)));
  }

  public disableGlobalRngBot() {
    clearInterval(this.rngBotGlobalInterval);
    this.rngBotGlobalInterval = null;
    clearInterval(this.rngBotReEnableMovementTimer);
    this.rngBotReEnableMovementTimer = null;
  }

  // After a short delay, manually controlled bots will start moving again.
  public enableReEnableBotMovementTimer(): void {
    this.disableReEnableBotMovementTimer();

    //TODO: this might be better handled within the player class.
    this.rngBotReEnableMovementTimer = setTimeout(() => {
      const player = this.game.players.getManuallyControlledPlayer();
      if (!player) return;
      
      player.isManuallyControlled = false;
      this.disableReEnableBotMovementTimer();
    }, AUTO_RE_ENABLE_RNG_BOT_TIMER);
  }

  public disableReEnableBotMovementTimer(): void {
    clearTimeout(this.rngBotReEnableMovementTimer);
    this.rngBotReEnableMovementTimer = null;
  }

  public disableGlobalMovement(): void {
    clearInterval(this.rngBotGlobalInterval);
    this.rngBotGlobalInterval = null;
  }

  private moveRandomly(playerId: number): void {
    if (!this.game.players.playerExists(playerId)) return;
    const dirArr = this.chooseRandomDirectionsArr(playerId);
    const player = this.game.players.getPlayer(playerId);
    if (dirArr.length === 0) {
      // If player can't move, ensure no destructible tiles are holding them
      if (player != null) this.game.maze.clearDestructibleTilesFromTile(player.currTile);
      return;
    }
    
    if (dirArr.length === 1) {
      this.game.players.movePlayer(playerId, dirArr[0]);
    } else {
      this.game.maze.spawnSplitBot(player, dirArr);
    }
  }

  private chooseRandomDirectionsArr(playerId: number): TileVector[] {
    // All possible directions
    let validDirs = this.game.maze.getValidDirectionsByPlayerId(playerId);
    const player = this.game.players.getPlayer(playerId);
    if (validDirs.length === 0 || !player) {
      return [];
    }

    // Filter all directions based on upgrades applied (excluding luck)
    let filteredValidDirs = this.getFilteredDirectionList(validDirs, playerId);
    // Determine how many splits should be allowed
    const possibleNewSplits = this.game.maze.getPossibleSplitBotCount(validDirs.length, player);

    // Check for Auto-Exit, Smart pathing, and lucky guess
    const enforcedDirection = this.getEnforcedDirection(validDirs, filteredValidDirs, playerId);
    if (enforcedDirection) {
      // Filter out enforced direction from "extra" directions
      filteredValidDirs = filteredValidDirs.filter(dir => !isTileEqual(enforcedDirection, dir));

      //(*) Enforced dirctions MUST BE first in the list. Current player takes first move.
      // Add extra directions for splitting purposes -- allow splitting despite knowing correct direction
      // Prioritize the enforced direction, but allow other unvisited (filtered) directions
      return (possibleNewSplits > 0 && filteredValidDirs.length > 0)
        ? [enforcedDirection].concat(this.getRandomXValues(filteredValidDirs, possibleNewSplits))
        : [enforcedDirection];
    }

    // Determine if there is an unvisited tile -- only allow splitting if so.
    const hasUnvisitedTile = this.game.maze.prioritizeUnvisitedDirection(playerId, filteredValidDirs).length > 0;
    
    if (filteredValidDirs.length === 0) {
      return [];
    }
    // Must have at least two possible directions and one split available.
    else if (hasUnvisitedTile && possibleNewSplits > 0 && filteredValidDirs.length >= 2) {
      const numDirectionsToPick = Math.min(possibleNewSplits + 1, filteredValidDirs.length);
      return this.getRandomXValues(filteredValidDirs, numDirectionsToPick);
    }
    // Randomly pick one.
    else {
      return [filteredValidDirs[this.getRandomInt(filteredValidDirs.length)]];
    }
  }

  private getEnforcedDirection(validDirs: TileVector[], upgradeFilteredDirs: TileVector[], playerId: number): TileVector {
    let enforcedDirection = null;
    // Check for Auto-Exit and Smart pathing
    if (this.game.players.shouldPlayerAutoPath(playerId)) {
      enforcedDirection = this.game.maze.filterPlayerExitMazeDirection(playerId, validDirs);
    }

    // Check for lucky guess moves.  Skip if enforced direction already applied.
    if (!enforcedDirection && this.isMovementLucky(validDirs.length)) {
      // Use FILTERED set of directions such that you don't backtrack randomly based on "luck"
      enforcedDirection = this.game.maze.filterPlayerExitMazeDirection(playerId, upgradeFilteredDirs);
    }
    return enforcedDirection;
  }

  // Filter out directions based on bot upgrades
  private getFilteredDirectionList(validDirs: TileVector[], playerId: number): TileVector[] {
    if (!validDirs) {
      return null;
    }
  
    // // Check for Auto-Exit and Smart pathing
    // if (this.game.upgrades.isUpgraded(UpgradeKey.AUTO_EXIT_MAZE) 
    //     || this.game.players.playerHasSmartPathing(playerId)) {
    //   const exitDirsArr = this.game.maze.filterPlayerExitMazeDirection(playerId, validDirs);
    //   if (exitDirsArr.length > 0) {
    //     return exitDirsArr;
    //   }
    // }
    
    // Remove all dead end tiles from possible directions.
    if (this.game.upgrades.getUpgradeLevel(UpgradeKey.BOT_REMEMBER_DEADEND_TILES) >= 1) {
      const filteredDirs = this.game.maze.filterDeadEndTiles(playerId, validDirs);
      if (filteredDirs.length > 0) {
        validDirs = filteredDirs;
      }
    }
    
    // // Prioritize any adjacent unvisited tiles if any.
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

  private isMovementLucky(dirCount: number): boolean {
    if (!this.game.upgrades.isUpgraded(UpgradeKey.BOT_LUCKY_GUESS)) {
      return false;
    }
    
    const luckOdds = BotLuckyGuessUpgrade.getLuckyGuessIncreasePercentage(this.game);
    // Example (2 dir): 50% + 3% = 53% likely to guess correct
    // Example (3 dir): 33% + 3% = 36% likely to guess correct
    const correctChoiceOdds = (1.0 / dirCount) + luckOdds;
    return correctChoiceOdds > (1-Math.random());
  }

  private getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }

  private getRandomXValues = (arr: any[], pickX: number): any[] => {
    return _.sampleSize(arr, pickX);
  }
}
