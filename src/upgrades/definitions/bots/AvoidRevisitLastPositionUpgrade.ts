import Game from "managers/Game";
import Upgrade from "upgrades/Upgrade";
import { AVOID_REVISIT_LAST_POSITION_UPGRADE_COST, UpgradeKey } from "constants/UpgradeConstants";

const BUTTON_UI_ID = 'buyBotAvoidRevisitLastPosition';
const TOOLTIP_TEXT = 'Bots will avoid revisiting the position that they were just at.';

export class AvoidRevisitLastPositionUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true);
  }
  
  updateUiProperties(): void {
    this.setUiText(`Basic Avoid Revisit: ${this.getPrettyPrintCost()} pts`);
  }

  getCost(): number {
    return AVOID_REVISIT_LAST_POSITION_UPGRADE_COST;
  }
}

