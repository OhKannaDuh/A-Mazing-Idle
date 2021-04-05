import Game from "managers/Game";
import Upgrade from "upgrades/Upgrade";
import { FRUIT_SPAWN_UPGRADE_BASE_COST, FRUIT_SPAWN_UPGRADE_BASE_COST_MULTIPLIER, UpgradeKey, UpgradeType } from "constants/UpgradeConstants";
import FruitMazeItem from "items/definitions/FruitMazeItem";
import { UserInterface } from "managers/UserInterface";

const BUTTON_UI_ID = 'buyFruitSpawnRateUpgrade';
const TOOLTIP_TEXT = 'Fruits spawn more frequently.';

export class FruitSpawnRateUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, UpgradeType.ITEM, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel);
  }
  
  updateUiProperties(): void {
    const spawnProbability = UserInterface.getDecimalPrettyPrintNumber(FruitMazeItem.getItemSpawnProbability(this.game) * 100, 2);
    this.setUiText(`Fruit Spawn Rate (${spawnProbability}%): ${this.getPrettyPrintCost()} pts`);
  }

  getCost(): number {
    return FRUIT_SPAWN_UPGRADE_BASE_COST * Math.pow(FRUIT_SPAWN_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
  }
}
