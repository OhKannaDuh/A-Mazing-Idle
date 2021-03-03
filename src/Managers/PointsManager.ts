import { IS_FREE_MODE_ENABLED } from "../dev/devUtils";
import Game from "../Game";
import {
  MAZE_COMPLETION_BONUS_BASE_MULTIPLIER, POINTS_PER_VISIT_BASE_AMOUNT, 
  POINTS_PER_VISIT_BASE_AMOUNT_MULTIPLIER, TILE_REVISIT_BASE_MULTIPLIER, TILE_REVISIT_BASE_MULTIPLIER_INCREASE_PERCENT, 
  UpgradeKey 
} from "../upgrades/UpgradeConstants";
import Serializable from "../models/Serializable";
import MultiplierMazeItem from "../items/definitions/MultiplierMazeItem";

const SERIALIZABLE_PROPERTIES: string[] = ['points'];

const BASE_POINT_MULTPLIER = 1;

class Points extends Serializable {
  public game: Game;
  public isDevMode: boolean;
  // Current points
  public points: number;
  // Total points earned in this playthrough
  public totalPoints: number;

  constructor(game: Game, isDevMode = false) {
    super(SERIALIZABLE_PROPERTIES);
    this.game = game;
    this.isDevMode = isDevMode;
    this.points = 0.0;
  }
  
  addPoints(amount: number, playerId: number = null): void {
    const multiplier = this.getPointMultplier(playerId);
    const pointsEarned = amount * multiplier;
    
    this.points += pointsEarned;
    this.totalPoints += pointsEarned;
    this.game.ui.setPointsText();
  }

  getPointMultplier(playerId: number) {
    if (!this.game.players.playerExists(playerId)) {
      return BASE_POINT_MULTPLIER;
    }
    const pointMultplier = MultiplierMazeItem.getMazeItemMultiplierStrength(this.game);
    
    return this.game.players.getPlayer(playerId).hasMultiplierItemActive()
      ? pointMultplier
      : BASE_POINT_MULTPLIER;
  }

  canAffordPointsAmount(cost: number): boolean {
    if (IS_FREE_MODE_ENABLED) return true;
    return cost <= this.points;
  }

  getPointsPerVisit(isVisitedAlready) {
    const upgradeLevel = this.game.upgrades.getUpgradeLevel(UpgradeKey.POINTS_PER_VISIT);
    let pointsPerTile = Math.round(100 * POINTS_PER_VISIT_BASE_AMOUNT * Math.pow(POINTS_PER_VISIT_BASE_AMOUNT_MULTIPLIER, upgradeLevel)) / 100;
    if (isVisitedAlready) {
      pointsPerTile *= this.getPointsPerRevisitMultiplier();
      console.log('RE: ', pointsPerTile);
    }
    return pointsPerTile;
  }

  getPointsPerRevisitMultiplier() {
    const upgradeLevel = this.game.upgrades.getUpgradeLevel(UpgradeKey.POINTS_PER_REVISIT);
    return TILE_REVISIT_BASE_MULTIPLIER + (upgradeLevel * TILE_REVISIT_BASE_MULTIPLIER_INCREASE_PERCENT);
  }

  addVisitPoints(isVisitedAlready: boolean, playerId: number) {
    let points = this.getPointsPerVisit(isVisitedAlready);
    if (points === 0) return;
    this.addPoints(points, playerId);
  }

  addMazeCompletionBonus(playerId: number) {
    const bonus = this.getMazeCompletionBonus();
    this.addPoints(bonus, playerId);
  }

  //TODO: move these as static functions in the upgrade class.
  getMazeCompletionBonus() {
    const tileCount = this.game.maze.getTileCount();
    const upgradeLevel = this.game.upgrades.getUpgradeLevel(UpgradeKey.MAZE_COMPLETION_BONUS);
    return tileCount * (1 + MAZE_COMPLETION_BONUS_BASE_MULTIPLIER * upgradeLevel);
  }

  getDestructibleWallSpawnProbability() {
    if (!this.game.upgrades.isUnlocked(UpgradeKey.DESTRUCTIBLE_WALLS)) {
      return 0;
    }
    return 0.05;
  }
}

export default Points;
