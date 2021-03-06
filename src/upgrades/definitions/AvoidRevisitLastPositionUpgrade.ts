import Game from "../../Game";
import Upgrade from "../Upgrade";
import { AVOID_REVISIT_LAST_POSITION_UPGRADE_COST, UpgradeKey } from "../UpgradeConstants";

const BUTTON_UI_ID = 'buyBotAvoidRevisitLastPosition';
const TOOLTIP_TEXT = 'Bots will avoid revisiting the position that they were just at.';

class AvoidRevisitLastPositionUpgrade extends Upgrade {
  
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

export default AvoidRevisitLastPositionUpgrade;
