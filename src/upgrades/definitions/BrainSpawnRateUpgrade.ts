import Game from "../../Game";
import Upgrade from "../Upgrade";
import { BRAIN_SPAWN_UPGRADE_BASE_COST, BRAIN_SPAWN_UPGRADE_BASE_COST_MULTIPLIER, UpgradeKey } from "../UpgradeConstants";

const BUTTON_UI_ID = 'buyBrainSpawnRateUpgrade';
const TOOLTIP_TEXT = 'Brains spawn more frequently. Brains auto-path your bots to the exit up to X distance.';

class FruitPickupPointsMultiplierUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel);
  }
  
  updateUiProperties(): void {
    this.setUiText(`Brain Spawn Rate (${this.upgradeLevel}): ${this.getCost().toLocaleString()} pts`)
  }

  getCost(): number {
    return BRAIN_SPAWN_UPGRADE_BASE_COST * Math.pow(BRAIN_SPAWN_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
  }
}

export default FruitPickupPointsMultiplierUpgrade;
