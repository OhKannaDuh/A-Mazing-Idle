import Game from "managers/Game";
import Upgrade from "upgrades/Upgrade";
import { TELEPORT_PLAYER_BACK_TO_BOT_UPGRADE_COST, UpgradeKey, UpgradeType } from "constants/UpgradeConstants";

const BUTTON_UI_ID = 'buyPlayerTeleportToBot';
const TOOLTIP_TEXT = `Players can teleport their themselves back to the bot by pressing 'e'.`;

export class TeleportPlayerBacktoBotUpgrade extends Upgrade {

  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel = 0) {
    super(game, UpgradeType.MOVEMENT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true);
  }
  
  public updateUiProperties(): void {
    this.setUiText(`Teleport Player Back to Bot: ${this.getPrettyPrintCost()} pts`);
  }

  public getCost(): number {
    return TELEPORT_PLAYER_BACK_TO_BOT_UPGRADE_COST;
  }
  
  public getPreReqUpgradeKeys(): UpgradeKey[] {
    return [UpgradeKey.PLAYER_MOVE_INDEPENDENTLY];
  }
}
