import Game from "managers/Game";
import Upgrade from "upgrades/Upgrade";
import { BRAIN_TILE_DISTANCE_UPGRADE_BASE_COST, BRAIN_TILE_DISTANCE_UPGRADE_BASE_COST_MULTIPLIER, UpgradeKey } from "constants/UpgradeConstants";
import BrainMazeItem from "items/definitions/BrainMazeItem";
import { UserInterface } from "managers/UserInterface";

const BUTTON_UI_ID = 'buyBrainSpawnRateUpgrade';
const TOOLTIP_TEXT = 'Brains spawn more frequently. Brains auto-path your bots to the exit up to X distance.';

export class BrainSpawnRateUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel);
  }
  
  updateUiProperties(): void {
    const spawnProbability = UserInterface.getPrettyPrintNumber(BrainMazeItem.getItemSpawnProbability(this.game) * 100, 2);
    this.setUiText(`Brain Tile Distance (${spawnProbability}%): ${this.getPrettyPrintCost()} pts`);
  }

  getCost(): number {
    return BRAIN_TILE_DISTANCE_UPGRADE_BASE_COST * Math.pow(BRAIN_TILE_DISTANCE_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
  }
}
