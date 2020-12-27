import Game from "../../Game";
import Upgrade from "../Upgrade";
import { TELEPORT_PLAYER_BACK_TO_BOT_UPGRADE_COST, UpgradeKey } from "../UpgradeConstants";

const BUTTON_UI_ID = 'buyPlayerTeleportToBot';
const TOOLTIP_TEXT = `Players can teleport their themselves back to the bot by pressing 'q'.`;

class TeleportPlayerBacktoBotUpgrade extends Upgrade {

  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel = 0) {
    super(game, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true);
  }
  
  updateUiProperties(): void {
    this.setUiText('Teleport Player Back to Bot: ' + this.getCost())
  }

  getCost(): number {
    return TELEPORT_PLAYER_BACK_TO_BOT_UPGRADE_COST;
  }
}

export default TeleportPlayerBacktoBotUpgrade;
