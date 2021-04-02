import Game from "managers/Game";
import Upgrade from "upgrades/Upgrade";
import { UpgradeKey, UpgradeType } from "constants/UpgradeConstants";

const BUTTON_UI_ID = 'noop';
const TOOLTIP_TEXT = '';

export class DestructibleWallUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, UpgradeType.MAZE, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel);
  }
  
  updateUiProperties(): void {
  }

  getCost(): number {
    return 0;
  }
}
