import Game from "managers/Game";
import Upgrade from "upgrades/Upgrade";
import { UpgradeKey, MULTIPLIER_ITEM_EXTRA_BOT_UPGRADE_BASE_COST, MULTIPLIER_ITEM_EXTRA_BOT_UPGRADE_BASE_COST_MULTIPLIER } from "constants/UpgradeConstants";

const BUTTON_UI_ID = 'buyMultiplierItemExtraBotUpgrade';
const TOOLTIP_TEXT = 'Multiplier item applies to +1 extra bot.';

class MultiplierItemExtraBotUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel);
  }
  
  updateUiProperties(): void {
    this.setUiText(`Multiplier Item Extra Bot (${this.upgradeLevel}): ${this.getPrettyPrintCost()} pts`);
  }

  getCost(): number {
    return MULTIPLIER_ITEM_EXTRA_BOT_UPGRADE_BASE_COST * Math.pow(MULTIPLIER_ITEM_EXTRA_BOT_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
  }

  isMaxUpgradeLevel(): boolean {
    return this.upgradeLevel >= this.game.upgrades.getUpgradeLevel(UpgradeKey.BOT_SPLIT_DIRECTION);
  }
}

export default MultiplierItemExtraBotUpgrade;
