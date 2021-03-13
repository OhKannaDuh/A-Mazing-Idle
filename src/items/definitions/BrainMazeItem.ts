import Game from "managers/Game";
import { Tile } from "managers/Maze";
import { StatsKey } from "models/Stats";
import { BRAIN_TILE_DISTANCE_UPGRADE_INCREASE_AMOUNT, UpgradeKey } from "constants/UpgradeConstants";
import { BRAIN_SPAWN_BASE_PROBABILITY, BRAIN_STARTING_TILE_DISTANCE, MazeItemKey } from "constants/ItemConstants";
import MazeItem from "items/MazeItem";

const BACKGROUND_IMAGE_PATH: string = 'img/brain.png';


class BrainMazeItem extends MazeItem {
  constructor(game: Game, tile: Tile, mazeItemKey: MazeItemKey) {
    super(game, tile, mazeItemKey, BACKGROUND_IMAGE_PATH, StatsKey.TOTAL_BRAIN_ITEMS_PICKED_UP);
  }

  public triggerPickup(playerId: number): void {
    super.triggerPickup(playerId);

    if (!this.game.players.playerMap.has(playerId)) return;
    const tileDistance = this.getBrainTileDistanceAmount();
    this.game.players.getPlayer(playerId).smartPathingTileDistanceRemaining += tileDistance;
  }
  
  private getBrainTileDistanceAmount(): number {
    const upgradeLevel = this.game.upgrades.getUpgradeLevel(UpgradeKey.BRAIN_TILE_DISTANCE);
    return BRAIN_STARTING_TILE_DISTANCE + (upgradeLevel * BRAIN_TILE_DISTANCE_UPGRADE_INCREASE_AMOUNT);
  }

  public static getItemSpawnProbability(game: Game): number {
    const upgradeLevel = game.upgrades.getUpgradeLevel(UpgradeKey.BRAIN_SPAWN);
    return BRAIN_SPAWN_BASE_PROBABILITY * (1 + upgradeLevel);
  }
}

export default BrainMazeItem;
