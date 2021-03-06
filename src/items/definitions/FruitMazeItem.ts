import Game from "../../Game";
import { Tile } from "../../Maze";
import { UpgradeKey } from "../../upgrades/UpgradeConstants";
import { FRUIT_PICKUP_POINTS_BASE_AMOUNT, FRUIT_PICKUP_POINTS_BASE_AMOUNT_MULTIPLIER, FRUIT_SPAWN_BASE_PROBABILITY, FRUIT_SPAWN_UPGRADE_FLAT_INCREASE_PROBABILITY, MazeItemKey } from "../ItemConstants";
import MazeItem from "../MazeItem";
import { StatsKey } from "../../models/Stats";
const BACKGROUND_IMAGE_PATH: string = 'img/banana.png';

// Note: This item will bypass destructible walls.
class FruitMazeItem extends MazeItem {
  constructor(game: Game, tile: Tile, mazeItemKey: MazeItemKey) {
    super(game, tile, mazeItemKey, BACKGROUND_IMAGE_PATH, StatsKey.TOTAL_FRUIT_ITEMS_PICKED_UP);
  }

  public triggerPickup(playerId: number): void {
    super.triggerPickup(playerId);

    const points = this.getFruitPickupPointsAmount();
    this.game.points.addPoints(points, playerId, [StatsKey.TOTAL_POINTS_EARNED_FROM_FRUITS]);
  }
  
  private getFruitPickupPointsAmount(): number {
    const upgradeLevel = this.game.upgrades.getUpgradeLevel(UpgradeKey.FRUIT_PICKUP_POINTS);
    return FRUIT_PICKUP_POINTS_BASE_AMOUNT * Math.pow(FRUIT_PICKUP_POINTS_BASE_AMOUNT_MULTIPLIER, upgradeLevel);
  }

  public static getFruitSpawnProbability(game: Game): number {
    const upgradeLevel = game.upgrades.getUpgradeLevel(UpgradeKey.FRUIT_SPAWN);
    
    return FRUIT_SPAWN_BASE_PROBABILITY + (FRUIT_SPAWN_UPGRADE_FLAT_INCREASE_PROBABILITY * upgradeLevel);
  }

  public static generateFruitItemDrops(game: Game, sizeX: number, sizeY: number) {
    const spawnProb: number = FruitMazeItem.getFruitSpawnProbability(game);
    
    //TODO: calculate global probability and assign randomly
    for (let y = 0; y < sizeY; y++) {
      for (let x = 0; x < sizeX; x++) {
        let rand = Math.random();
        if(rand < spawnProb) {
          const tile: Tile = { x: x, y: y };
          game.items.createMazeItem(tile, MazeItemKey.FRUIT);
        }
      }
    }
  }
}

export default FruitMazeItem;
