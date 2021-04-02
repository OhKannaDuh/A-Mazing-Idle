import Game from "managers/Game";
import Upgrade from "upgrades/Upgrade";
import { TELEPORT_PLAYER_BACK_TO_BOT_UPGRADE_COST, UpgradeKey, UpgradeType } from "constants/UpgradeConstants";

const BUTTON_UI_ID = 'buyPlayerTeleportToBot';
const TOOLTIP_TEXT = `Players can teleport their themselves back to the bot by pressing 'q'.`;

export class TeleportPlayerBacktoBotUpgrade extends Upgrade {

  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel = 0) {
    super(game, UpgradeType.MOVEMENT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true);
  }
  
  updateUiProperties(): void {
    this.setUiText(`Teleport Player Back to Bot: ${this.getPrettyPrintCost()} pts`);
  }

  getCost(): number {
    return TELEPORT_PLAYER_BACK_TO_BOT_UPGRADE_COST;
  }
}
