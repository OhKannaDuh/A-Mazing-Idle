import { UpgradeKey, POINTS_PER_VISIT_BASE_AMOUNT_MULTIPLIER, TILE_REVISIT_BASE_MULTIPLIER, TILE_REVISIT_BASE_MULTIPLIER_INCREASE_PERCENT, MAZE_COMPLETION_BONUS_BASE_MULTIPLIER } from "constants/UpgradeConstants";
import Game from "managers/Game";
import MultiplierMazeItem from "items/definitions/MultiplierMazeItem";
import { Serializable } from "models/Serializable";
import { StatsKey } from "models/Stats";
import { PointsHistoryTracker } from "models/PointsHistoryTracker";

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
  
  public addPoints(baseValue: number, playerId: number = null, statsKeyList: StatsKey[] = null): void {
    const multiplier = this.getPointMultplier(playerId);
    const pointsEarned = baseValue * multiplier;
    
    this.points += pointsEarned;
    
    this.game.stats.addStatsToKeyList(pointsEarned, statsKeyList);
    this.game.stats.addStatsToKey(pointsEarned, StatsKey.TOTAL_POINTS_EARNED);
    this.game.stats.addStatsToKey((pointsEarned - baseValue), StatsKey.TOTAL_POINTS_EARNED_FROM_MULTIPLIER_ITEM);
    this.game.points.pointsHistoryTracker.addNumber(pointsEarned);
    this.game.upgrades.updateAllUpgradeUi();
    
    this.game.ui.setPointsText();
  }

  public spendPoints(amount: number) {
    this.points -= amount;
    this.game.stats.addStatsToKey(amount, StatsKey.TOTAL_POINTS_SPENT);
    this.game.ui.setPointsText();
    this.game.upgrades.updateAllUpgradeUi();
  }

  private getPointMultplier(playerId: number) {
    if (!this.game.players.playerExists(playerId)) {
      return BASE_POINT_MULTPLIER;
    }
    const pointMultplier = MultiplierMazeItem.getMazeItemMultiplierStrength(this.game);
    
    return this.game.players.getPlayer(playerId).isMultiplierPowerUpActive()
      ? pointMultplier
      : BASE_POINT_MULTPLIER;
  }

  private getPointsPerVisit(isVisitedAlready) {
    const upgradeLevel = this.game.upgrades.getUpgradeLevel(UpgradeKey.POINTS_PER_VISIT);
    const basePointsAmount = this.game.biomes.getBasePointsPerVisitValue();
    let pointsPerTile = Math.round(100 * basePointsAmount * Math.pow(POINTS_PER_VISIT_BASE_AMOUNT_MULTIPLIER, upgradeLevel)) / 100;
    if (isVisitedAlready) {
      pointsPerTile *= this.getPointsPerRevisitMultiplier();
    }
    return pointsPerTile;
  }

  private getPointsPerRevisitMultiplier() {
    const upgradeLevel = this.game.upgrades.getUpgradeLevel(UpgradeKey.POINTS_PER_REVISIT);
    return TILE_REVISIT_BASE_MULTIPLIER + (upgradeLevel * TILE_REVISIT_BASE_MULTIPLIER_INCREASE_PERCENT);
  }

  public addVisitPoints(isVisitedAlready: boolean, playerId: number) {
    let points = this.getPointsPerVisit(isVisitedAlready);
    if (points === 0) return;
    const stats = isVisitedAlready 
      ? [StatsKey.TOTAL_POINTS_EARNED_FROM_REVISITED_TILES]
      : [StatsKey.TOTAL_POINTS_EARNED_FROM_VISITED_TILES];
    this.addPoints(points, playerId, stats);
  }

  public addMazeCompletionBonus(playerId: number) {
    const bonus = this.getMazeCompletionBonus();
    this.addPoints(bonus, playerId, [StatsKey.TOTAL_POINTS_EARNED_FROM_MAZE_COMPLETIONS]);
  }

  //TODO: move these as static functions in the upgrade class.
  private getMazeCompletionBonus() {
    const tileCount = this.game.maze.getGrid().getTileCount();
    const upgradeLevel = this.game.upgrades.getUpgradeLevel(UpgradeKey.MAZE_COMPLETION_BONUS);
    return tileCount * (1 + MAZE_COMPLETION_BONUS_BASE_MULTIPLIER * upgradeLevel);
  }

  public getDestructibleWallSpawnProbability() {
    if (!this.game.biomes.isUpgradeUnlocked(UpgradeKey.DESTRUCTIBLE_WALLS)) {
      return 0;
    }
    return 0.03;
  }
}
