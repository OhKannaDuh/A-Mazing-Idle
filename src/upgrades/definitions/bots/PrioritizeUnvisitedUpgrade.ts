import Game from "managers/Game";
import Upgrade from "upgrades/Upgrade";
import { PRIORITIZE_UNVISITED_UPGRADE_COST as PRIORITIZE_UNVISITED_UPGRADE_COST, UpgradeKey } from "constants/UpgradeConstants";

const BUTTON_UI_ID = 'buyBotPrioritizeUnvisited';
const TOOLTIP_TEXT = 'Bots will always prioritize an unvisited tile before a previously visited one.';

export class PrioritizeUnvisitedUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel = 0) {
    super(game, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true);
  }
  
  updateUiProperties(): void {
    this.setUiText(`Basic Prioritize Unvisited: ${this.getPrettyPrintCost()} pts`);
  }

  getCost(): number {
    return PRIORITIZE_UNVISITED_UPGRADE_COST;
  }
}
