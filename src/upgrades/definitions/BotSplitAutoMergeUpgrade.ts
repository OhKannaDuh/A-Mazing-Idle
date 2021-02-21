import Game from "../../Game";
import Upgrade from "../Upgrade";
import { SPLIT_BOT_AUTO_MERGE_UPGRADE_COST, UpgradeKey } from "../UpgradeConstants";

const BUTTON_UI_ID = 'buySplitBotAutoMerge';
const TOOLTIP_TEXT = 'When bots step on the same tile, they will merge together and re-split on the next available opportunity.';

class BotSplitAutoMergeUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true);
  }
  
  updateUiProperties(): void {
    this.setUiText(`Bot Split Auto Merge: ${this.getCost().toLocaleString()} pts`);
  }

  getCost(): number {
    return SPLIT_BOT_AUTO_MERGE_UPGRADE_COST;
  }
}

export default BotSplitAutoMergeUpgrade;
