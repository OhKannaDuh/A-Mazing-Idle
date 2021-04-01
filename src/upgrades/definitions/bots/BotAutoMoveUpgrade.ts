import Game from "managers/Game";
import Upgrade from "upgrades/Upgrade";
import { BOT_AUTO_MOVE_UPGRADE_COST, UpgradeKey } from "constants/UpgradeConstants";

const BUTTON_UI_ID = 'butBotAutoMove';
const TOOLTIP_TEXT = 'Bot will automatically move on its own!';

export class BotAutoMoveUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true);
  }
  
  updateUiProperties(): void {
    this.setUiText(`Bot Auto Move: ${this.getPrettyPrintCost()} pts`);
  }

  getCost(): number {
    return BOT_AUTO_MOVE_UPGRADE_COST;
  }
}
