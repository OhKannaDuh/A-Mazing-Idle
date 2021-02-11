import { IS_FREE_MODE_ENABLED } from "../dev/devUtils";
import Game from "../Game";
import {
  MAZE_COMPLETION_BONUS_BASE_MULTIPLIER, POINTS_PER_VISIT_BASE_AMOUNT, 
  POINTS_PER_VISIT_BASE_AMOUNT_MULTIPLIER, TILE_REVISIT_MULTIPLIER, 
  UpgradeKey 
} from "../upgrades/UpgradeConstants";
import Serializable from "../models/Serializable";

const SERIALIZABLE_PROPERTIES: string[] = ['points'];


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
  
  addPoints(amount: number): void {
    this.points += amount;
    this.totalPoints += amount;
    this.game.ui.setPointsText();
  }

  canAffordPointsAmount(cost: number): boolean {
    if (IS_FREE_MODE_ENABLED) return true;
    return cost <= this.points;
  }

  getPointsPerVisit(isVisitedAlready) {
    const upgradeLevel = this.game.upgrades.getUpgradeLevel(UpgradeKey.POINTS_PER_VISIT)
    let bonus = Math.round(100 * POINTS_PER_VISIT_BASE_AMOUNT * Math.pow(POINTS_PER_VISIT_BASE_AMOUNT_MULTIPLIER, upgradeLevel)) / 100;
    
    if (isVisitedAlready) {
      bonus *= TILE_REVISIT_MULTIPLIER;
    }
    return bonus;
  }

  addVisitPoints(isVisitedAlready) {
    let points = this.getPointsPerVisit(isVisitedAlready);
    this.addPoints(points);
  }

  addMazeCompletionBonus() {
    const bonus = this.getMazeCompletionBonus();
    this.addPoints(bonus);
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