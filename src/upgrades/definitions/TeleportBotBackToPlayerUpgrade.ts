import Game from "../../Game";
import Upgrade from "../Upgrade";
import { TELEPORT_BOT_BACK_TO_PLAYER_UPGRADE_COST, UpgradeKey } from "../../constants/UpgradeConstants";

const BUTTON_UI_ID = 'buyBotTeleportToPlayer';
const TOOLTIP_TEXT = `Players can teleport their bot back to the themselves by pressing 'e'.`;

class TeleportBotBackToPlayerUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true);
  }
  
  updateUiProperties(): void {
    this.setUiText(`Teleport Bot Back to Player: ${this.getPrettyPrintCost()} pts`);
  }

  getCost(): number {
    return TELEPORT_BOT_BACK_TO_PLAYER_UPGRADE_COST;
  }
}

export default TeleportBotBackToPlayerUpgrade;
