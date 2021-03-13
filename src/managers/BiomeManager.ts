import { BIOME_BASE_POINTS_PER_VISIT_VALUE, BIOME_IMAGE_URL_MAP, BIOME_BASE_FRUIT_ITEM_PICKUP_VALUE, BiomeKey, BIOME_ITEM_UNLOCKS, BIOME_UPGRADE_UNLOCKS } from "constants/BiomeConstants";
import { MazeItemKey } from "constants/ItemConstants";
import { UpgradeKey } from "constants/UpgradeConstants";
import Game from "managers/Game";

class BiomeManager {
  private game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  public getBasePointsPerVisitValue(): number {
    return BIOME_BASE_POINTS_PER_VISIT_VALUE.get(this.getCurrentBiomeKey());
  }

  public getFruitItemImageUrl(): string {
    return BIOME_IMAGE_URL_MAP.get(this.getCurrentBiomeKey())
  }

  public getBaseFruitItemPickupValue(): number {
    return BIOME_BASE_FRUIT_ITEM_PICKUP_VALUE.get(this.getCurrentBiomeKey());
  }

  public getCurrentBiomeKey(): BiomeKey {
    const biomeLevel = this.game.upgrades.getUpgradeLevel(UpgradeKey.BIOME);
    return biomeLevel as BiomeKey;
  }
  
  public getNextBiomeKey(): BiomeKey {
    const nextBiomeLevel = this.game.upgrades.getUpgradeLevel(UpgradeKey.BIOME) + 1;
    return nextBiomeLevel as BiomeKey;
  }

  public getMaxBiomeLevel(): number {
    return Object.keys(BiomeKey).length;
  }

  public isMazeItemUnlocked(itemKey: MazeItemKey): boolean {
    // Assume unlocked if unlisted.
    return BIOME_ITEM_UNLOCKS.has(itemKey)
      ? this.isBiomeKeyUnlocked(BIOME_ITEM_UNLOCKS.get(itemKey))
      : true;
  }

  public isUpgradeUnlocked(upgradeKey: UpgradeKey): boolean {
    // Assume unlocked if unlisted.
    return BIOME_UPGRADE_UNLOCKS.has(upgradeKey)
      ? this.isBiomeKeyUnlocked(BIOME_UPGRADE_UNLOCKS.get(upgradeKey))
      : true;
  }

  public isBiomeKeyUnlocked(biomeKey: BiomeKey) {
    const currentBiomeKey = this.getCurrentBiomeKey();
    return currentBiomeKey >= biomeKey;
  }
}

export default BiomeManager;
