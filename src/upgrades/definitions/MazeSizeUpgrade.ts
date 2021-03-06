import Game from "../../Game";
import Upgrade from "../Upgrade";
import { MAZE_SIZE_UPGRADE_BASE_COST, MAZE_SIZE_UPGRADE_BASE_COST_MULTIPLIER, UpgradeKey } from "../UpgradeConstants";

const BUTTON_UI_ID = 'buyMazeSize';
const TOOLTIP_TEXT = 'Maze is increased in size by 1 for both x/y dimension!';

class MazeSizeUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel);
  }
  
  updateUiProperties(): void {
    this.setUiText(`Maze Size (${this.upgradeLevel}): ${this.getPrettyPrintCost()} pts`);
  }

  getCost(): number {
    return MAZE_SIZE_UPGRADE_BASE_COST * Math.pow(MAZE_SIZE_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
  }
}

export default MazeSizeUpgrade;
