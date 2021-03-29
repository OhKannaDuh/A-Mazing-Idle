import Game from "managers/Game";
import Upgrade from "upgrades/Upgrade";
import { SPLIT_DIRECTION_UPGRADE_BASE_COST, SPLIT_DIRECTION_UPGRADE_BASE_MULTIPLIER, UpgradeKey } from "constants/UpgradeConstants";

const BUTTON_UI_ID = 'buyBotSplitDirections';
const TOOLTIP_TEXT = 'Bots will split into two different bots when different pathways are available to it up to X total times.';

export class BotSplitDirectionUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel);
  }
  
  updateUiProperties(): void {
    this.setUiText(`Bot Split Direction (${this.upgradeLevel} splits): ${this.getPrettyPrintCost()} pts`);
  }

  getCost(): number {
    return SPLIT_DIRECTION_UPGRADE_BASE_COST * Math.pow(SPLIT_DIRECTION_UPGRADE_BASE_MULTIPLIER, this.upgradeLevel);
  }
}
