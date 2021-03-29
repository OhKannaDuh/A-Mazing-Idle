import Game from "managers/Game";
import Upgrade from "upgrades/Upgrade";
import { FRUIT_PICKUP_POINTS_UPGRADE_BASE_COST, FRUIT_PICKUP_POINTS_UPGRADE_BASE_COST_MULTIPLIER, UpgradeKey } from "constants/UpgradeConstants";
import FruitMazeItem from "items/definitions/FruitMazeItem";
import { UserInterface } from "managers/UserInterface";

const BUTTON_UI_ID = 'buyFruitPickupPointsUpgrade';
const TOOLTIP_TEXT = 'Fruits pickups are worth more points!';

export class FruitPickupPointsMultiplierUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel);
  }
  
  updateUiProperties(): void {
    const pts = UserInterface.getPrettyPrintNumber(FruitMazeItem.getFruitPickupPointsAmount(this.game));
    this.setUiText(`Fruit Pickup Points (${pts} pts): ${this.getPrettyPrintCost()} pts`);
  }

  getCost(): number {
    return FRUIT_PICKUP_POINTS_UPGRADE_BASE_COST * Math.pow(FRUIT_PICKUP_POINTS_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
  }
}
