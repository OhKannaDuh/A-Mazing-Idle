import Game from "../../Game";
import Upgrade from "../Upgrade";
import { SPLIT_DIRECTION_UPGRADE_BASE_COST, SPLIT_DIRECTION_UPGRADE_BASE_MULTIPLIER, UpgradeKey } from "../UpgradeConstants";

const BUTTON_UI_ID = 'buyBotSplitDirections';
const TOOLTIP_TEXT = 'Bots will split into two different bots when different pathways are available to it up to X total times.';

class BotSplitDirectionUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel);
  }
  
  updateUiProperties(): void {
    this.setUiText(`Bot Split Direction (${this.upgradeLevel}): ${this.getCost().toLocaleString()} pts`);
  }

  getCost(): number {
    return SPLIT_DIRECTION_UPGRADE_BASE_COST * Math.pow(SPLIT_DIRECTION_UPGRADE_BASE_MULTIPLIER, this.upgradeLevel);
  }
}

export default BotSplitDirectionUpgrade;
