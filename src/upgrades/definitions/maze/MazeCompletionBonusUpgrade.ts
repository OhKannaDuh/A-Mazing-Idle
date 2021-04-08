import Game from "managers/Game";
import Upgrade from "upgrades/Upgrade";
import { MAZE_COMPLETION_BONUS_BASE_MULTIPLIER, MAZE_COMPLETION_BONUS_UPGRADE_BASE_COST, MAZE_COMPLETION_BONUS_UPGRADE_BASE_COST_MULTIPLIER, UpgradeKey, UpgradeType } from "constants/UpgradeConstants";
import { UserInterface } from "managers/UserInterface";

const BUTTON_UI_ID = 'buyMazeCompletionBonusUpgrade';
const TOOLTIP_TEXT = 'Each maze completion is worth more points! Larger mazes are worth more points.';

export class MazeCompletionBonusUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, UpgradeType.MAZE, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel);
  }
  
  public updateUiProperties(): void {
    const str = UserInterface.getPrettyPrintNumber(MazeCompletionBonusUpgrade.getMazeCompletionBonus(this.game));
    this.setUiText(`Maze Completion Bonus (${str} pts): ${this.getPrettyPrintCost()} pts`);
  }

  public getCost(): number {
    return MAZE_COMPLETION_BONUS_UPGRADE_BASE_COST * Math.pow(MAZE_COMPLETION_BONUS_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
  }

  public static getMazeCompletionBonus(game: Game) {
    const grid = game.maze.getGrid();
    const tileCount = grid ? grid.getTileCount() : 0;
    const upgradeLevel = game.upgrades.getUpgradeLevel(UpgradeKey.MAZE_COMPLETION_BONUS);
    return tileCount * (1 + MAZE_COMPLETION_BONUS_BASE_MULTIPLIER * upgradeLevel);
  }
}
