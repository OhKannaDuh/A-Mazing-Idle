import Game from "../../Game";
import Upgrade from "../Upgrade";
import { FRUIT_SPAWN_UPGRADE_BASE_COST, FRUIT_SPAWN_UPGRADE_BASE_COST_MULTIPLIER, UpgradeKey } from "../UpgradeConstants";

const BUTTON_UI_ID = 'buyFruitSpawnRateUpgrade';
const TOOLTIP_TEXT = 'Fruits spawn more frequently.';

class FruitPickupPointsMultiplierUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel);
  }
  
  updateUiProperties(): void {
    this.setUiText(`Fruit Spawn Rate (${this.upgradeLevel}): ${this.getCost().toLocaleString()} pts`)
  }

  getCost(): number {
    return FRUIT_SPAWN_UPGRADE_BASE_COST * Math.pow(FRUIT_SPAWN_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
  }
}

export default FruitPickupPointsMultiplierUpgrade;
