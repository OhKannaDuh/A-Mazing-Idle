import Game from "managers/Game";
import { Tile } from "managers/MazeManager";
import { UpgradeKey } from "constants/UpgradeConstants";
import { FRUIT_PICKUP_POINTS_BASE_AMOUNT_MULTIPLIER, FRUIT_SPAWN_BASE_PROBABILITY, FRUIT_SPAWN_UPGRADE_FLAT_INCREASE_PROBABILITY, MazeItemKey } from "constants/ItemConstants";
import MazeItem from "items/MazeItem";
import { StatsKey } from "models/Stats";
// import { StatsKey } from "models/Stats";


class FruitMazeItem extends MazeItem {
  constructor(game: Game, tile: Tile, mazeItemKey: MazeItemKey) {
    super(game, tile, mazeItemKey, null, StatsKey.TOTAL_FRUIT_ITEMS_PICKED_UP);
  }

  public getBackgroundImagePath(): string {
    return this.game.biomes.getFruitItemImageUrl();
  }

  public triggerPickup(playerId: number): void {
    super.triggerPickup(playerId);

    const points = this.getFruitPickupPointsAmount();
    this.game.points.addPoints(points, playerId, [StatsKey.TOTAL_POINTS_EARNED_FROM_FRUITS]);
  }
  
  private getFruitPickupPointsAmount(): number {
    const upgradeLevel = this.game.upgrades.getUpgradeLevel(UpgradeKey.FRUIT_PICKUP_POINTS);
    const baseAmount = this.game.biomes.getBaseFruitItemPickupValue();
    return baseAmount * Math.pow(FRUIT_PICKUP_POINTS_BASE_AMOUNT_MULTIPLIER, upgradeLevel);
  }
  
  public static getItemSpawnProbability(game: Game): number {
    const upgradeLevel = game.upgrades.getUpgradeLevel(UpgradeKey.FRUIT_SPAWN);
    return FRUIT_SPAWN_BASE_PROBABILITY + (FRUIT_SPAWN_UPGRADE_FLAT_INCREASE_PROBABILITY * upgradeLevel);
  }
}

export default FruitMazeItem;
