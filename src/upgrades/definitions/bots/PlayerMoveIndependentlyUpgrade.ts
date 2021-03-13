import Game from "managers/Game";
import Upgrade from "upgrades/Upgrade";
import { ALLOW_PLAYER_TO_MOVE_INDEPENDENTLY_UPGRADE_COST, UpgradeKey } from "constants/UpgradeConstants";

const BUTTON_UI_ID = 'buyPlayerMoveIndependently';
const TOOLTIP_TEXT = 'Players can have one bot moving at the same time as they manually move.';

class PlayerMoveIndependentlyUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true);
  }
  
  updateUiProperties(): void {
    this.setUiText(`Player Can Move Independently: ${this.getPrettyPrintCost()} pts`);
  }

  getCost(): number {
    return ALLOW_PLAYER_TO_MOVE_INDEPENDENTLY_UPGRADE_COST;
  }
}

export default PlayerMoveIndependentlyUpgrade;
