import Game from "managers/Game";
import Upgrade from "upgrades/Upgrade";
import { MAZE_COMPLETION_BONUS_UPGRADE_BASE_COST, MAZE_COMPLETION_BONUS_UPGRADE_BASE_COST_MULTIPLIER, UpgradeKey } from "constants/UpgradeConstants";
import { UserInterface } from "managers/UserInterface";

const BUTTON_UI_ID = 'buyMazeCompletionBonusUpgrade';
const TOOLTIP_TEXT = 'Each maze completion is worth more points!';

export class MazeCompletionBonusUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel);
  }
  
  updateUiProperties(): void {
    const str = UserInterface.getPrettyPrintNumber(this.game.points.getMazeCompletionBonus());
    this.setUiText(`Maze Completion Bonus (${str} pts): ${this.getPrettyPrintCost()} pts`);
  }

  getCost(): number {
    return MAZE_COMPLETION_BONUS_UPGRADE_BASE_COST * Math.pow(MAZE_COMPLETION_BONUS_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
  }
}
