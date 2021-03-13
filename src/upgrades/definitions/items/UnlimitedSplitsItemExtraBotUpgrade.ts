import Game from "../../../Game";
import Upgrade from "../../Upgrade";
import { UpgradeKey, UNLIMITED_SPLIT_ITEM_EXTRA_BOT_UPGRADE_BASE_COST_MULTIPLIER, UNLIMITED_SPLIT_ITEM_EXTRA_BOT_UPGRADE_BASE_COST } from "../../../constants/UpgradeConstants";

const BUTTON_UI_ID = 'buyUnlimitedSplitItemExtraBotUpgrade';
const TOOLTIP_TEXT = 'Unlimited split item applies to +1 extra bot.';

class UnlimitedSplitsItemExtraBotUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel);
  }
  
  updateUiProperties(): void {
    this.setUiText(`Unlimited Split Item Extra Bot (${this.upgradeLevel}): ${this.getPrettyPrintCost()} pts`);
  }

  getCost(): number {
    return UNLIMITED_SPLIT_ITEM_EXTRA_BOT_UPGRADE_BASE_COST * Math.pow(UNLIMITED_SPLIT_ITEM_EXTRA_BOT_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
  }
  
  isMaxUpgradeLevel(): boolean {
    return this.game.upgrades.getUpgradeLevel(UpgradeKey.BOT_SPLIT_DIRECTION) >= this.upgradeLevel;
  }
}

export default UnlimitedSplitsItemExtraBotUpgrade;
