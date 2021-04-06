import Game from "managers/Game";
import Upgrade from "upgrades/Upgrade";
import { BRAIN_SPAWN_RATE_UPGRADE_BASE_COST, BRAIN_SPAWN_RATE_UPGRADE_BASE_COST_MULTIPLIER, UpgradeKey, UpgradeType } from "constants/UpgradeConstants";
import BrainMazeItem from "items/definitions/BrainMazeItem";
import { UserInterface } from "managers/UserInterface";

const BUTTON_UI_ID = 'buyBrainSpawnRateUpgrade';
const TOOLTIP_TEXT = 'Brains spawn more frequently. Brains auto-path your bots to the exit up to X distance.';

export class BrainSpawnRateUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, UpgradeType.ITEM, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel);
  }
  
  updateUiProperties(): void {
    const spawnProbability = UserInterface.getDecimalPrettyPrintNumber(BrainMazeItem.getItemSpawnProbability(this.game) * 100, 2);
    this.setUiText(`Brain Item Spawn Rate (${spawnProbability}%): ${this.getPrettyPrintCost()} pts`);
  }

  getCost(): number {
    return BRAIN_SPAWN_RATE_UPGRADE_BASE_COST * Math.pow(BRAIN_SPAWN_RATE_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
  }
}
