import Game from "../../Game";
import Upgrade from "../Upgrade";
import { BRAIN_TILE_DISTANCE_UPGRADE_BASE_COST, BRAIN_TILE_DISTANCE_UPGRADE_BASE_COST_MULTIPLIER, UpgradeKey } from "../UpgradeConstants";

const BUTTON_UI_ID = 'buyBrainTileDistanceUpgrade';
const TOOLTIP_TEXT = 'Bots with an active brain item will auto path X more tiles.';

class BrainTileDistanceUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel);
  }
  
  updateUiProperties(): void {
    this.setUiText(`Brain Tile Distance (${this.upgradeLevel}): ${this.getPrettyPrintCost()} pts`);
  }

  getCost(): number {
    return BRAIN_TILE_DISTANCE_UPGRADE_BASE_COST * Math.pow(BRAIN_TILE_DISTANCE_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
  }
}

export default BrainTileDistanceUpgrade;
