import Game from "managers/Game";
import Upgrade from "upgrades/Upgrade";
import { BOT_REMEMBER_DEADEND_TILES_UPGRADE_BASE_COST, BOT_REMEMBER_DEADEND_TILES_UPGRADE_BASE_COST_MULTIPLIER, UpgradeKey } from "constants/UpgradeConstants";

const BUTTON_UI_ID = 'buyBotRememberDeadEnds';
const TOOLTIP_TEXT = 'Bots will automatically mark deadends up to X tiles as RED and will not revisit them.';

export class BotRememberDeadEndTilesUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel);
  }
  
  updateUiProperties(): void {
    this.setUiText(`Remember Dead Ends (${this.upgradeLevel} Tiles): ${this.getPrettyPrintCost()} pts`);
  }

  getCost(): number {
    return BOT_REMEMBER_DEADEND_TILES_UPGRADE_BASE_COST * Math.pow(BOT_REMEMBER_DEADEND_TILES_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
  }
}
