import Game from "managers/Game";
import Upgrade from "upgrades/Upgrade";
import { MULTIPLIER_ITEM_STRENGTH_BASE_COST, MULTIPLIER_ITEM_STRENGTH_BASE_COST_MULTIPLIER, UpgradeKey } from "constants/UpgradeConstants";

const BUTTON_UI_ID = 'buyMultiplierItemStrengthUpgrade';
const TOOLTIP_TEXT = 'Multiplier item applies a multiplier to all items and visited tiles. This upgrade will increase the strength.';

export class MultiplierItemStrengthUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel);
  }
  
  updateUiProperties(): void {
    this.setUiText(`Multiplier Item Strength (${this.upgradeLevel}): ${this.getPrettyPrintCost()} pts`);
  }

  getCost(): number {
    return MULTIPLIER_ITEM_STRENGTH_BASE_COST * Math.pow(MULTIPLIER_ITEM_STRENGTH_BASE_COST_MULTIPLIER, this.upgradeLevel);
  }
}
