import Game from "managers/Game";
import { Tile } from "managers/MazeManager";
import { UpgradeKey } from "constants/UpgradeConstants";
import { 
  FRUIT_PICKUP_POINTS_BASE_AMOUNT_MULTIPLIER, 
  FRUIT_SPAWN_BASE_PROBABILITY, 
  FRUIT_SPAWN_UPGRADE_FLAT_INCREASE_PROBABILITY, 
  MazeItemKey 
} from "constants/ItemConstants";
import MazeItem from "items/MazeItem";
import { StatsKey } from "models/Stats";
import { getFruitItemByBiomeKey, getPointsPerVisitBaseAmount } from "constants/BiomeConstants";
import { Fruit } from "constants/FruitConstants";


class FruitMazeItem extends MazeItem {
  constructor(game: Game, tile: Tile, mazeItemKey: MazeItemKey) {
    super(game, tile, mazeItemKey, null, StatsKey.TOTAL_FRUIT_ITEMS_PICKED_UP);
  }

  public getBackgroundImagePath(): string {
    return FruitMazeItem.getCurrentFruitType(this.game).imageUrl;
  }

  public triggerPickup(playerId: number): void {
    super.triggerPickup(playerId);

    const points = FruitMazeItem.getFruitPickupPointsAmount(this.game);
    this.game.points.addPoints(points, playerId, [StatsKey.TOTAL_POINTS_EARNED_FROM_FRUITS]);
  }
  
  private static getCurrentFruitType(game: Game): Fruit {
    return getFruitItemByBiomeKey(game.biomes.getCurrentBiomeKey());
  }
  
  public static getFruitPickupPointsAmount(game: Game): number {
    const upgradeLevelMultiplier = game.upgrades.getUpgradeLevel(UpgradeKey.FRUIT_PICKUP_POINTS);
    const fruitTier = FruitMazeItem.getCurrentFruitType(game).fruitTier;
    // const baseAmount = this.getCurrentFruitType(game).basePoints;
    // return baseAmount * Math.pow(FRUIT_PICKUP_POINTS_BASE_AMOUNT_MULTIPLIER, upgradeLevel);
    const pointsPerVisit = game.points.getPointsPerVisit();
    return (5*upgradeLevelMultiplier + fruitTier * 10 + 10) * pointsPerVisit;
  }
  
  public static getItemSpawnProbability(game: Game): number {
    const upgradeLevel = game.upgrades.getUpgradeLevel(UpgradeKey.FRUIT_SPAWN);
    return FRUIT_SPAWN_BASE_PROBABILITY + (FRUIT_SPAWN_UPGRADE_FLAT_INCREASE_PROBABILITY * upgradeLevel);
  }
}

export default FruitMazeItem;
