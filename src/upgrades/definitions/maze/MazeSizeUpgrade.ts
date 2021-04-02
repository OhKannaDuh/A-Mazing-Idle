import Game from "managers/Game";
import Upgrade from "upgrades/Upgrade";
import { MAZE_SIZE_UPGRADE_BASE_COST, MAZE_SIZE_UPGRADE_BASE_COST_MULTIPLIER, UpgradeKey, UpgradeType } from "constants/UpgradeConstants";

const BUTTON_UI_ID = 'buyMazeSize';
const TOOLTIP_TEXT = 'Maze is increased in size by 1 for both x/y dimension!';

export class MazeSizeUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, UpgradeType.MAZE, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel);
  }
  
  updateUiProperties(): void {
    const mazeSize = this.game.maze.getNextMazeSize();
    this.setUiText(`Maze Size (${mazeSize}x${mazeSize} tiles): ${this.getPrettyPrintCost()} pts`);
  }

  getCost(): number {
    return MAZE_SIZE_UPGRADE_BASE_COST * Math.pow(MAZE_SIZE_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
  }
}
