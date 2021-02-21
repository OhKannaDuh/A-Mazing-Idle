import Game from "../../Game";
import Upgrade from "../Upgrade";
import { BOT_MOVEMENT_UPGRADE_BASE_COST, BOT_MOVEMENT_UPGRADE_BASE_COST_MUTLIPLIER, UpgradeKey } from "../UpgradeConstants";

const BUTTON_UI_ID = 'buyBotMoveFaster';
const TOOLTIP_TEXT = 'Bots will avoid revisiting the position that they were just at.';

class BotMovementSpeedUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel);
  }
  
  updateUiProperties(): void {
    this.setUiText(`Bot Movement Speed (${this.upgradeLevel}): ${this.getCost().toLocaleString()} pts`);
  }

  getCost(): number {
    return BOT_MOVEMENT_UPGRADE_BASE_COST * Math.pow(BOT_MOVEMENT_UPGRADE_BASE_COST_MUTLIPLIER, this.upgradeLevel);
  }
}

export default BotMovementSpeedUpgrade;
