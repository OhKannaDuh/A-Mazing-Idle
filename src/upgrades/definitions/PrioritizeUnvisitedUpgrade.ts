import Game from "../../Game";
import Upgrade from "../Upgrade";
import { PRIORITIZE_UNVISITED_UPGRADE_COST as PRIORITIZE_UNVISITED_UPGRADE_COST, UpgradeKey } from "../UpgradeConstants";

const BUTTON_UI_ID = 'buyBotPrioritizeUnvisited';
const TOOLTIP_TEXT = 'Bots will always prioritize an unvisited tile before a previously visited one.';

class PrioritizeUnvisitedUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel = 0) {
    super(game, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true);
  }
  
  updateUiProperties(): void {
    this.setUiText(`Basic Prioritize Unvisited: ${this.getCost()} pts`)
  }

  getCost(): number {
    return PRIORITIZE_UNVISITED_UPGRADE_COST;
  }
}

export default PrioritizeUnvisitedUpgrade;