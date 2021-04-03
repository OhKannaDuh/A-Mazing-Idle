import Game from "managers/Game";
import Upgrade from "upgrades/Upgrade";
import { POINTS_PER_REVISIT_UPGRADE_BASE_COST, POINTS_PER_REVISIT_UPGRADE_BASE_COST_MULTIPLIER, UpgradeKey, UpgradeType } from "constants/UpgradeConstants";

const BUTTON_UI_ID = 'buyPointsPerRevisit';
const TOOLTIP_TEXT = 'Get more points when you revisit a tile!';


export class PointsPerRevisitUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, UpgradeType.MAZE, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel);
  }
  
  updateUiProperties(): void {
    this.setUiText(`Points Per Re-Visit (${this.upgradeLevel}%): ${this.getPrettyPrintCost()} pts`);
  }

  getCost(): number {
    return POINTS_PER_REVISIT_UPGRADE_BASE_COST * Math.pow(POINTS_PER_REVISIT_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
  }
}
