import Game from "managers/Game";
import Upgrade from "upgrades/Upgrade";
import { POINTS_PER_VISIT_UPGRADE_BASE_COST, POINTS_PER_VISIT_UPGRADE_BASE_COST_MULTIPLIER, UpgradeKey } from "constants/UpgradeConstants";
import { UserInterface } from "managers/UserInterface";

const BUTTON_UI_ID = 'buyPointsPerVisit';
const TOOLTIP_TEXT = 'Get more points per tile that you visit!';

export class PointsPerVisitUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel);
  }
  
  updateUiProperties(): void {
    const pointsPerVisit = UserInterface.getPrettyPrintNumber(this.game.points.getPointsPerVisit());
    this.setUiText(`Points Per Visit (${pointsPerVisit} pts): ${this.getPrettyPrintCost()} pts`);
  }

  getCost(): number {
    return POINTS_PER_VISIT_UPGRADE_BASE_COST * Math.pow(POINTS_PER_VISIT_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
  }
}
