import Game from "../../Game";
import { Tile } from "../../Maze";
import { StatsKey } from "../../models/Stats";
import { UpgradeKey } from "../../constants/UpgradeConstants";
import { MazeItemKey, MULTIPLIER_ITEM_BASE_MULTIPLIER, MULTIPLIER_ITEM_SPAWN_BASE_PROBABILITY } from "../../constants/ItemConstants";
import MazeItem from "../MazeItem";

const BACKGROUND_IMAGE_PATH: string = 'img/multiplierItem.png';


class MultiplierMazeItem extends MazeItem {
  constructor(game: Game, tile: Tile, mazeItemKey: MazeItemKey) {
    super(game, tile, mazeItemKey, BACKGROUND_IMAGE_PATH, StatsKey.TOTAL_MULTIPLIER_ITEMS_PICKED_UP);
  }

  public triggerPickup(playerId: number): void {
    super.triggerPickup(playerId);

    if (!this.game.players.playerMap.has(playerId)) return;
    this.game.players.getPlayer(playerId).isMultiplierItemActive = true;
  }

  public static getMazeItemMultiplierStrength(game: Game) {
    const upgradeLevel = game.upgrades.getUpgradeLevel(UpgradeKey.MULTIPLIER_ITEM_STRENGTH);
    return MULTIPLIER_ITEM_BASE_MULTIPLIER + (upgradeLevel);
  }
  
  public static getMultiplierItemSpawnProbability(game: Game): number {
    const upgradeLevel = game.upgrades.getUpgradeLevel(UpgradeKey.MULTIPLIER_ITEM_SPAWN_RATE);
    return MULTIPLIER_ITEM_SPAWN_BASE_PROBABILITY * (1 + upgradeLevel);
  }
}

export default MultiplierMazeItem;
