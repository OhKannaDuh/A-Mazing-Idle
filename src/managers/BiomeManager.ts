import { 
  BiomeKey, 
  BIOME_ITEM_UNLOCKS, 
  BIOME_UPGRADE_UNLOCKS, 
  getPointsPerVisitBaseAmount, 
  POWER_UP_UNLOCKS
} from "constants/BiomeConstants";
import { MazeItemKey } from "constants/ItemConstants";
import { PowerUpKey } from "constants/PowerUpConstants";
import { UpgradeKey } from "constants/UpgradeConstants";
import Game from "managers/Game";

export class BiomeManager {
  private game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  public getBasePointsPerVisitValue(): number {
    return getPointsPerVisitBaseAmount(this.getCurrentBiomeKey());
  }

  public getCurrentBiomeKey(): BiomeKey {
    const biomeLevel = this.game.upgrades.getUpgradeLevel(UpgradeKey.BIOME);
    return biomeLevel as BiomeKey;
  }
  
  public getNextBiomeKey(): BiomeKey {
    const nextBiomeLevel = this.game.upgrades.getUpgradeLevel(UpgradeKey.BIOME) + 1;
    return nextBiomeLevel as BiomeKey;
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

  public isPowerUpUnlocked(powerUpKey: PowerUpKey) {
    const requiredBiomeKey = POWER_UP_UNLOCKS.get(powerUpKey);
    return this.isBiomeKeyUnlocked(requiredBiomeKey);
  }

  public getItemsUnlockBiomeKey(itemKey: MazeItemKey): BiomeKey {
    return BIOME_ITEM_UNLOCKS.has(itemKey)
      ? BIOME_ITEM_UNLOCKS.get(itemKey)
      : 0;
  }

  // Get the number of biomes that a particular item has been unlocked for.
  public getItemUnlockBiomeDiffCount(itemKey: MazeItemKey): number {
    return this.getCurrentBiomeKey() - this.getItemsUnlockBiomeKey(itemKey);
  }

  public getUpgradeUnlockBiomeDiffCount(upgradeKey: UpgradeKey): number {
    return this.getCurrentBiomeKey() - BIOME_UPGRADE_UNLOCKS.get(upgradeKey);
  }
}
