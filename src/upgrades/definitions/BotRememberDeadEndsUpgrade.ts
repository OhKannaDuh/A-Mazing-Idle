import Game from "../../Game";
import Upgrade from "../Upgrade";
import { BOT_REMEMBER_DEADEND_TILES_UPGRADE_BASE_COST, BOT_REMEMBER_DEADEND_TILES_UPGRADE_BASE_COST_MULTIPLIER, UpgradeKey } from "../UpgradeConstants";

const BUTTON_UI_ID = 'buyBotRememberDeadEnds';
const TOOLTIP_TEXT = 'Bots will automatically mark deadends up to X tiles as RED and will not revisit them.';

class BotRememberDeadEndTilesUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel);
  }
  
  updateUiProperties(): void {
    this.setUiText(`Remember Dead Ends (${this.upgradeLevel} Tiles): ${this.getCost().toLocaleString()} pts`)
  }

  getCost(): number {
    return BOT_REMEMBER_DEADEND_TILES_UPGRADE_BASE_COST * Math.pow(BOT_REMEMBER_DEADEND_TILES_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
  }
}

export default BotRememberDeadEndTilesUpgrade;
