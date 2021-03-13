import Game from "managers/Game";
import Upgrade from "upgrades/Upgrade";
import { SPLIT_BOT_AUTO_MERGE_UPGRADE_COST, UpgradeKey } from "constants/UpgradeConstants";

const BUTTON_UI_ID = 'buySplitBotAutoMerge';
const TOOLTIP_TEXT = 'When bots step on the same tile, they will merge together and re-split on the next available opportunity.';

class BotSplitAutoMergeUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true);
  }
  
  updateUiProperties(): void {
    this.setUiText(`Bot Split Auto Merge: ${this.getPrettyPrintCost()} pts`);
  }

  getCost(): number {
    return SPLIT_BOT_AUTO_MERGE_UPGRADE_COST;
  }
}

export default BotSplitAutoMergeUpgrade;
