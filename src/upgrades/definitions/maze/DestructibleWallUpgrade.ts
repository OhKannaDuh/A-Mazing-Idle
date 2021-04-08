import Game from "managers/Game";
import Upgrade from "upgrades/Upgrade";
import { DESTRUCTIBLE_WALL_BASE_SPAWN_RATE, DESTRUCTIBLE_WALL_BASE_SPAWN_RATE_INCREASE_PER_BIOME, UpgradeKey, UpgradeType } from "constants/UpgradeConstants";

const BUTTON_UI_ID = 'noop';
const TOOLTIP_TEXT = '';

export class DestructibleWallUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, UpgradeType.MAZE, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel);
  }
  
  public updateUiProperties(): void {
  }

  public getCost(): number {
    return 0;
  }
  
  // NOTE: this probability is based on the number of connections -- NOT number of tiles
  public static getDestructibleWallSpawnProbability(game: Game) {
    if (!game.biomes.isUpgradeUnlocked(UpgradeKey.DESTRUCTIBLE_WALLS)) {
      return 0;
    }
    // How many biomes has this been unlocked -- increase by some amount each time.
    const biomeDiff = game.biomes.getUpgradeUnlockBiomeDiffCount(UpgradeKey.DESTRUCTIBLE_WALLS);
    return DESTRUCTIBLE_WALL_BASE_SPAWN_RATE + (biomeDiff * DESTRUCTIBLE_WALL_BASE_SPAWN_RATE_INCREASE_PER_BIOME);
  }
}
