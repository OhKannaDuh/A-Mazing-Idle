import Game from "../../Game";
import Upgrade from "../Upgrade";
import { BRAIN_TILE_DISTANCE_UPGRADE_BASE_COST, BRAIN_TILE_DISTANCE_UPGRADE_BASE_COST_MULTIPLIER, UpgradeKey } from "../../constants/UpgradeConstants";

const BUTTON_UI_ID = 'buyBrainSpawnRateUpgrade';
const TOOLTIP_TEXT = 'Brains spawn more frequently. Brains auto-path your bots to the exit up to X distance.';

class BrainSpawnRateUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel);
  }
  
  updateUiProperties(): void {
    this.setUiText(`Brain Tile Distance (${this.upgradeLevel}): ${this.getPrettyPrintCost()} pts`);
  }

  getCost(): number {
    return BRAIN_TILE_DISTANCE_UPGRADE_BASE_COST * Math.pow(BRAIN_TILE_DISTANCE_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
  }
}

export default BrainSpawnRateUpgrade;
