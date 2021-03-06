import Game from "../../Game";
import Upgrade from "../Upgrade";
import { UpgradeKey } from "../../constants/UpgradeConstants";
import { BIOME_UPGRADE_COST } from "../../constants/BiomeConstants";

const BUTTON_UI_ID = 'buyBiomeUpgrade';
const TOOLTIP_TEXT = 'This will bring you to a brand new biome with more difficult mazes, but with new items and much higher point rewards!';

class BiomeUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel);
  }
  
  public updateUiProperties(): void {
    this.setUiText(`Unlock New Biome (${this.upgradeLevel}): ${this.getPrettyPrintCost()} pts`);
  }

  public getCost(): number {
    const nextBiomeKey = this.game.biomes.getNextBiomeKey();
    if (!BIOME_UPGRADE_COST.has(nextBiomeKey)) {
      return 0;
    }
    return BIOME_UPGRADE_COST.get(nextBiomeKey);
  }

  public isMaxUpgradeLevel(): boolean {
    // return this.game.biomes.getMaxBiomeLevel() === this.upgradeLevel;
    return false;
  }
}

export default BiomeUpgrade;
