import Game from "../../Game";
import Upgrade from "../Upgrade";
import { UpgradeKey } from "../../constants/UpgradeConstants";

const BUTTON_UI_ID = 'noop';
const TOOLTIP_TEXT = '';

class DestructibleWallUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel);
  }
  
  updateUiProperties(): void {
  }

  getCost(): number {
    return 0;
  }

  isUnlocked(): boolean {
    return false;
  }
}

export default DestructibleWallUpgrade;
