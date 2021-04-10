import { 
  UpgradeKey, 
  POINTS_PER_VISIT_BASE_AMOUNT_MULTIPLIER, 
  TILE_REVISIT_BASE_MULTIPLIER, 
  TILE_REVISIT_BASE_MULTIPLIER_INCREASE_PERCENT 
} from "constants/UpgradeConstants";
import Game from "managers/Game";
import { Serializable } from "models/Serializable";
import { StatsKey } from "models/Stats";
import { PointsHistoryTracker } from "models/PointsHistoryTracker";
import { PowerUpKey } from "constants/PowerUpConstants";
import { PointsMultiplierStrengthUpgrade } from "upgrades/definitions/powerUps/PointsMultiplierStrengthUpgrade";
import { MazeCompletionBonusUpgrade } from "upgrades/definitions/maze/MazeCompletionBonusUpgrade";

const SERIALIZABLE_PROPERTIES: string[] = ['points'];
const BASE_POINT_MULTPLIER = 1;

export class Points extends Serializable {
  public game: Game;
  public isDevMode: boolean;
  public points: number;
  public pointsHistoryTracker: PointsHistoryTracker;

  constructor(game: Game, isDevMode = false) {
    super(SERIALIZABLE_PROPERTIES);
    this.game = game;
    this.isDevMode = isDevMode;
    this.points = 0.0;
    this.pointsHistoryTracker = new PointsHistoryTracker(this.game, StatsKey.AVERAGE_POINTS_EARNED_PER_SECOND);
  }

  public resetPoints(): void {
    this.points = 0.0;
    this.pointsHistoryTracker.resetHistory();
  }
  
  public addPoints(pointsEarned: number, playerId: number = null, statsKeyList: StatsKey[] = null): void {
    this.points += pointsEarned;
    
    this.game.stats.addStatsToKeyList(pointsEarned, statsKeyList);
    this.game.stats.addStatsToKey(pointsEarned, StatsKey.TOTAL_POINTS_EARNED);
    this.game.points.pointsHistoryTracker.addNumber(pointsEarned);
    this.game.upgrades.updateAllUpgradeUi();
    
    this.game.ui.setPointsText();
  }

  public spendPoints(amount: number) {
    this.points = Math.max(0, this.points - amount);
    this.game.stats.addStatsToKey(amount, StatsKey.TOTAL_POINTS_SPENT);
    this.game.ui.setPointsText();
    this.game.upgrades.updateAllUpgradeUi();
  }

  private getPointMultplier() {
    const pointMultpliers = PointsMultiplierStrengthUpgrade.getPointsMultiplierStrength(this.game);
    return this.game.powerUps.isPowerUpActive(PowerUpKey.POINTS_MULTIPLIER)
      ? pointMultpliers
      : BASE_POINT_MULTPLIER;
  }

  public getPointsPerVisit(isVisitedAlready: boolean = false): number {
    const upgradeLevel = this.game.upgrades.getUpgradeLevel(UpgradeKey.POINTS_PER_VISIT);
    const basePointsAmount = this.game.biomes.getBasePointsPerVisitValue();
    let pointsPerTile = basePointsAmount * Math.pow(POINTS_PER_VISIT_BASE_AMOUNT_MULTIPLIER, upgradeLevel);
    if (isVisitedAlready) {
      pointsPerTile *= this.getPointsPerRevisitMultiplier();
    }
    return pointsPerTile;
  }

  private getPointsPerRevisitMultiplier(): number {
    const upgradeLevel = this.game.upgrades.getUpgradeLevel(UpgradeKey.POINTS_PER_REVISIT);
    return TILE_REVISIT_BASE_MULTIPLIER + (upgradeLevel * TILE_REVISIT_BASE_MULTIPLIER_INCREASE_PERCENT);
  }

  public addVisitPoints(isVisitedAlready: boolean, playerId: number): void {
    let points = this.getPointsPerVisit(isVisitedAlready);
    if (points === 0) return;

    const multipliedPoints = points * this.getPointMultplier();
    this.game.stats.addStatsToKey(multipliedPoints - points, StatsKey.TOTAL_POINTS_EARNED_FROM_MULTIPLIER_ITEM);

    const stats = isVisitedAlready 
      ? [StatsKey.TOTAL_POINTS_EARNED_FROM_REVISITED_TILES]
      : [StatsKey.TOTAL_POINTS_EARNED_FROM_VISITED_TILES];
    this.addPoints(multipliedPoints, playerId, stats);
  }

  public addMazeCompletionBonus(playerId: number): void {
    const bonus = MazeCompletionBonusUpgrade.getMazeCompletionBonus(this.game);
    this.addPoints(bonus, playerId, [StatsKey.TOTAL_POINTS_EARNED_FROM_MAZE_COMPLETIONS]);
  }
}
