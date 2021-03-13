import Game from "managers/Game";
import Upgrade from "upgrades/Upgrade";
import { BOT_MOVEMENT_UPGRADE_BASE_COST, BOT_MOVEMENT_UPGRADE_BASE_COST_MUTLIPLIER, UpgradeKey } from "constants/UpgradeConstants";

const BUTTON_UI_ID = 'buyBotMoveFaster';
const TOOLTIP_TEXT = 'Bots will avoid revisiting the position that they were just at.';

class BotMovementSpeedUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel);
  }
  
  updateUiProperties(): void {
    this.setUiText(`Bot Movement Speed (${this.upgradeLevel}): ${this.getPrettyPrintCost()} pts`);
  }

  getCost(): number {
    return BOT_MOVEMENT_UPGRADE_BASE_COST * Math.pow(BOT_MOVEMENT_UPGRADE_BASE_COST_MUTLIPLIER, this.upgradeLevel);
  }
}

export default BotMovementSpeedUpgrade;
