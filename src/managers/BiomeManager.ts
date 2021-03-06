import Game from "../Game";
import { UpgradeKey } from "../constants/UpgradeConstants";
import { 
  BiomeKey, 
  BIOME_BASE_FRUIT_ITEM_PICKUP_VALUE, 
  BIOME_BASE_POINTS_PER_VISIT_VALUE, 
  BIOME_IMAGE_URL_MAP 
} from "../constants/BiomeConstants";

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
}

export default BiomeManager;
