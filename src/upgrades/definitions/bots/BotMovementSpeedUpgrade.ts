import Game from "managers/Game";
import Upgrade from "upgrades/Upgrade";
import { BOT_MOVEMENT_UPGRADE_BASE_COST, BOT_MOVEMENT_UPGRADE_BASE_COST_MUTLIPLIER, UpgradeKey, UpgradeType } from "constants/UpgradeConstants";
import { UserInterface } from "managers/UserInterface";

const BUTTON_UI_ID = 'buyBotMoveFaster';
const TOOLTIP_TEXT = 'Bots will move ever so slightly faster.';

export class BotMovementSpeedUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, UpgradeType.BOT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel);
  }
  
  public updateUiProperties(): void {
    const interval = UserInterface.getPrettyPrintNumber(this.game.rngBot.getBotMoveInterval());
    this.setUiText(`Bot Movement Speed (${interval} ms): ${this.getPrettyPrintCost()} pts`);
  }

  public getCost(): number {
    return BOT_MOVEMENT_UPGRADE_BASE_COST * Math.pow(BOT_MOVEMENT_UPGRADE_BASE_COST_MUTLIPLIER, this.upgradeLevel);
  }

  public getPreReqUpgradeKeys(): UpgradeKey[] {
    return [UpgradeKey.AUTO_MOVE];
  }
}
