import Game from "managers/Game";
import Upgrade from "upgrades/Upgrade";
import { TELEPORT_BOT_BACK_TO_PLAYER_UPGRADE_COST, UpgradeKey, UpgradeType } from "constants/UpgradeConstants";

const BUTTON_UI_ID = 'buyBotTeleportToPlayer';
const TOOLTIP_TEXT = `Players can teleport their bot back to the themselves by pressing 'e'.`;

export class TeleportBotBackToPlayerUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, UpgradeType.MOVEMENT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true);
  }
  
  public updateUiProperties(): void {
    this.setUiText(`Teleport Bot Back to Player: ${this.getPrettyPrintCost()} pts`);
  }

  public getCost(): number {
    return TELEPORT_BOT_BACK_TO_PLAYER_UPGRADE_COST;
  }

  public getPreReqUpgradeKeys(): UpgradeKey[] {
    return [UpgradeKey.PLAYER_MOVE_INDEPENDENTLY];
  }
}
